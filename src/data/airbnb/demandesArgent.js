/**
 * demandesArgent.js
 * Toutes les demandes d'argent de l'hôte, pour le Centre de résolution :
 * - demandes fictives (demandesArgent.json, dates en offsets d'heures) ;
 * - remboursements déjà versés (remboursements.json), affichés comme « Clos » ;
 * - demandes envoyées par l'apprenant (localStorage) ;
 * - brouillon AirCover en cours de l'apprenant.
 * Chaque demande pointe vers sa réservation canonique : voyageur, logement et
 * dates en sont toujours dérivés.
 */
import fictives from './demandesArgent.json'
import remboursements from './remboursements.json'
import { getReservationById, getFirstName } from './reservationLookup'
import { STORAGE_KEY as CLAIM_KEY, getClaim, isElementIncomplete } from './aircoverClaim'

// Identité de l'hôte de la sandbox (déjà « Demande gérée par » dans remboursements.json)
export const HOTE = { nom: 'Agnès Hilaire', avatar: 'https://i.pravatar.cc/150?img=20' }
// Co-hôte présent dans la messagerie
export const COHOTE = { nom: 'Fabien', avatar: null }

export const MOTIFS = {
    degats: 'Dégâts, éléments manquants ou nettoyage imprévu',
    services: 'Services supplémentaires',
    autres: 'Autres problèmes relatifs au voyage',
}

// Délai de réponse du voyageur affiché par Airbnb
export const DELAI_REPONSE_HEURES = 72

const ENVOYEES_KEY = 'airbnb_demandes_envoyees'
const HEURE_MS = 3600 * 1000

/** Date située `offset` heures avant (négatif) ou après maintenant. */
export function dateFromHours(offset, now = new Date()) {
    return new Date(now.getTime() + offset * HEURE_MS)
}

/** Date située `offset` jours avant ou après aujourd'hui, à midi. */
function dateFromDays(offset) {
    const d = new Date()
    d.setDate(d.getDate() + offset)
    d.setHours(12, 0, 0, 0)
    return d
}

/** « 45 », « 199,99 » : format des montants « [montant] € EUR ». */
export function formatMontant(n) {
    const v = Number(n) || 0
    return Number.isInteger(v) ? String(v) : v.toFixed(2).replace('.', ',')
}

/** « Agnès Hilaire a demandé », « Yann & Fanny ont demandé ». */
export function aDemande(nom) {
    return `${nom} ${/ & | et /.test(nom) ? 'ont' : 'a'} demandé`
}

// ─── Demandes envoyées par l'apprenant ─────────────────────────────────────
function readEnvoyees() {
    try {
        const raw = localStorage.getItem(ENVOYEES_KEY)
        const list = raw ? JSON.parse(raw) : []
        return Array.isArray(list) ? list : []
    } catch {
        return []
    }
}

/** Enregistre une demande envoyée par l'apprenant et retourne son id. */
export function addDemandeEnvoyee(demande) {
    const id = `dem_apprenant_${Date.now()}`
    const entry = { ...demande, id, auteur: 'hote', statut: 'en_attente', envoyeeLe: new Date().toISOString() }
    try {
        localStorage.setItem(ENVOYEES_KEY, JSON.stringify([...readEnvoyees(), entry]))
    } catch {
        // Stockage indisponible : la demande n'apparaîtra pas dans le Centre
    }
    return id
}

// ─── Brouillon AirCover ────────────────────────────────────────────────────
function readDraftReservationId() {
    try {
        const raw = localStorage.getItem(CLAIM_KEY)
        return raw ? JSON.parse(raw).reservationId : null
    } catch {
        return null
    }
}

/** Étape où reprendre un brouillon AirCover : la première encore incomplète. */
export function draftResumeUrl(claim) {
    const base = `/airbnb/aircover/demande/${claim.reservationId}`
    if (claim.depot !== 'non') return `${base}/depot`
    if (claim.elements.length === 0) return `${base}/message`
    if (claim.elements.some(isElementIncomplete)) return `${base}/elements`
    if (!claim.date) return `${base}/date`
    return `${base}/recap`
}

// ─── Normalisation ─────────────────────────────────────────────────────────
function statutLabel(statut, prenom, envoyeeLe, now) {
    if (statut === 'en_attente') {
        const restantes = Math.ceil(DELAI_REPONSE_HEURES - (now - envoyeeLe) / HEURE_MS)
        if (restantes <= 0) return 'Délai de réponse écoulé'
        return `${prenom} a ${restantes} heure${restantes > 1 ? 's' : ''} pour répondre`
    }
    if (statut === 'refusee') return `${prenom} a refusé`
    if (statut === 'assistance') return 'L\'assistance Airbnb intervient sur cette demande'
    if (statut === 'brouillon') return 'Terminer la demande de remboursement'
    return 'Clos'
}

/** Heures restantes avant la fin du délai de réponse (0 si écoulé). */
export function heuresRestantes(demande, now = new Date()) {
    return Math.max(0, Math.ceil(DELAI_REPONSE_HEURES - (now - demande.envoyeeLe) / HEURE_MS))
}

function normalize(base, reservation, now) {
    const prenom = getFirstName(reservation.guestName)
    const auteur = base.auteur === 'cohote' ? COHOTE : HOTE
    return {
        ...base,
        reservation,
        prenom,
        auteurNom: base.auteurNom || auteur.nom,
        auteurAvatar: base.auteurAvatar !== undefined ? base.auteurAvatar : auteur.avatar,
        // « Vous avez demandé » dans la liste quand l'auteur est l'hôte du compte
        parVous: base.auteurNom ? base.auteurNom === HOTE.nom : base.auteur !== 'cohote',
        motifLabel: MOTIFS[base.motif] || base.motif,
        statutLabel: statutLabel(base.statut, prenom, base.envoyeeLe, now),
    }
}

function fromFictive(f, now) {
    const reservation = getReservationById(f.reservationId)
    if (!reservation) return null
    return normalize({
        ...f,
        source: 'fictive',
        envoyeeLe: dateFromHours(f.envoyeeOffsetHeures, now),
        dateFaits: f.dateFaitsOffset !== undefined ? dateFromDays(f.dateFaitsOffset) : null,
        lien: `/airbnb/centre-resolution/demande/${f.id}`,
    }, reservation, now)
}

function fromRemboursement(r, now) {
    const reservation = getReservationById(r.reservationId)
    if (!reservation) return null
    return normalize({
        id: r.id,
        source: 'remboursement',
        reservationId: r.reservationId,
        auteurNom: r.managedBy,
        auteurAvatar: r.managedByAvatar,
        motif: 'degats',
        montant: r.totalAmount,
        statut: 'clos',
        envoyeeLe: dateFromDays(r.chronologie[0]?.dateOffset ?? r.incidentDate),
        lien: `/airbnb/remboursement/${r.id}`,
    }, reservation, now)
}

function fromEnvoyee(e, now) {
    const reservation = getReservationById(e.reservationId)
    if (!reservation) return null
    return normalize({
        ...e,
        source: 'apprenant',
        envoyeeLe: new Date(e.envoyeeLe),
        dateFaits: e.date ? new Date(e.date + 'T12:00:00') : null,
        lien: `/airbnb/centre-resolution/demande/${e.id}`,
    }, reservation, now)
}

function fromDraft(now) {
    const reservationId = readDraftReservationId()
    const reservation = reservationId && getReservationById(reservationId)
    if (!reservation) return null
    const claim = getClaim(reservationId)
    return normalize({
        id: 'brouillon',
        source: 'brouillon',
        reservationId,
        auteur: 'hote',
        motif: 'degats',
        montant: claim.elements.reduce((s, el) => s + (parseFloat(el.montant) || 0), 0),
        statut: 'brouillon',
        envoyeeLe: now,
        lien: draftResumeUrl(claim),
    }, reservation, now)
}

/** Liste du Centre de résolution : brouillon en tête, puis de la plus récente à la plus ancienne. */
export function getDemandes(now = new Date()) {
    const envoyees = [
        ...fictives.map(f => fromFictive(f, now)),
        ...remboursements.map(r => fromRemboursement(r, now)),
        ...readEnvoyees().map(e => fromEnvoyee(e, now)),
    ].filter(Boolean).sort((a, b) => b.envoyeeLe - a.envoyeeLe)
    const brouillon = fromDraft(now)
    return brouillon ? [brouillon, ...envoyees] : envoyees
}

/** Demande (fictive ou de l'apprenant) consultable sur la page détail du Centre. */
export function getDemandeById(id, now = new Date()) {
    const fictive = fictives.find(f => f.id === id)
    if (fictive) return fromFictive(fictive, now)
    const envoyee = readEnvoyees().find(e => e.id === id)
    return envoyee ? fromEnvoyee(envoyee, now) : null
}

/** Demande encore ouverte (ni close, ni brouillon) la plus récente pour une réservation. */
export function getDemandeOuverte(reservationId, now = new Date()) {
    return getDemandes(now).find(d =>
        d.reservationId === reservationId && d.statut !== 'clos' && d.statut !== 'brouillon'
    ) || null
}
