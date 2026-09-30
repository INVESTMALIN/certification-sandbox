/**
 * aircoverClaim.js
 * Brouillon de demande AirCover en localStorage (clé aircover_claim).
 * Le brouillon ne stocke que l'id de la réservation : les infos voyageur,
 * logement et dates sont toujours relues depuis la réservation canonique.
 */
export const STORAGE_KEY = 'aircover_claim'

// Réponse à « Le bien peut-il être réparé ? » (éléments endommagés uniquement)
export const REPARABLE_LABELS = {
    reparer: 'Oui, il peut être réparé',
    remplacer: 'Non, il doit être remplacé',
}

// Réponse à « Avez-vous un reçu… ? » (éléments endommagés ou manquants)
export const RECU_LABELS = {
    oui: 'Oui, j\'ai un reçu',
    non: 'Non, je n\'ai pas de reçu',
}

// Types proposés dans « Que s'est-il passé ? » (libellés de la vraie procédure)
export const TYPE_ENDOMMAGE = 'Élément endommagé'
export const TYPE_MANQUANT = 'Élément manquant'
export const TYPE_NETTOYAGE = 'Nettoyage supplémentaire nécessaire'
export const TYPES = [TYPE_ENDOMMAGE, TYPE_MANQUANT, TYPE_NETTOYAGE]

// Ancien libellé du type nettoyage, converti à la lecture des brouillons
const LEGACY_TYPES = { 'Nettoyage imprévu ou odeur de fumée': TYPE_NETTOYAGE }

/** Question « réparé / remplacé » : éléments endommagés uniquement. */
export function needsReparable(type) {
    return type === TYPE_ENDOMMAGE
}

/** Question du reçu : éléments endommagés ou manquants (pas le nettoyage). */
export function needsRecu(type) {
    return type === TYPE_ENDOMMAGE || type === TYPE_MANQUANT
}

/**
 * Un élément sans ancienneté, sans valeur, ou sans réponse aux questions propres
 * à son type (réparé / remplacé, reçu) ne permet pas d'envoyer la demande.
 * Les brouillons antérieurs sans ces réponses sont donc traités comme incomplets.
 */
export function isElementIncomplete(el) {
    const sansMontant = el.montant === '' || el.montant === undefined || el.montant === null
    const sansReparation = needsReparable(el.type) && !REPARABLE_LABELS[el.reparable]
    const sansRecu = needsRecu(el.type) && !RECU_LABELS[el.recu]
    return !el.nom || sansMontant || !el.anciennete || sansReparation || sansRecu
}

function migrateElement(el) {
    return LEGACY_TYPES[el.type] ? { ...el, type: LEGACY_TYPES[el.type] } : el
}

/** Demande complète : dépôt « Non », au moins un élément, tous complets, date renseignée. */
export function isClaimComplete(claim) {
    return claim.depot === 'non' && claim.elements.length > 0
        && !claim.elements.some(isElementIncomplete) && claim.date !== ''
}

function emptyClaim(reservationId) {
    return { reservationId, depot: '', message: '', elements: [], date: '' }
}

/** Brouillon de la réservation demandée ; un brouillon d'une autre réservation est ignoré. */
export function getClaim(reservationId) {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return emptyClaim(reservationId)
        const c = JSON.parse(raw)
        if (c.reservationId !== reservationId) return emptyClaim(reservationId)
        // Les anciens brouillons n'ont pas les nouveaux champs : on complète
        return {
            ...emptyClaim(reservationId),
            ...c,
            elements: Array.isArray(c.elements) ? c.elements.map(migrateElement) : [],
        }
    } catch {
        return emptyClaim(reservationId)
    }
}

/** Fusionne les champs dans le brouillon de cette réservation et l'enregistre. */
export function updateClaim(reservationId, fields) {
    const updated = { ...getClaim(reservationId), ...fields, reservationId }
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {
        // Stockage indisponible (navigation privée) : le parcours continue sans brouillon
    }
    return updated
}

/** Supprime le brouillon, uniquement s'il appartient à cette réservation. */
export function clearClaim(reservationId) {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw || JSON.parse(raw).reservationId !== reservationId) return
        localStorage.removeItem(STORAGE_KEY)
    } catch {
        // rien à nettoyer
    }
}
