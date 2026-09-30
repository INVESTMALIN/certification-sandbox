/**
 * reservationLookup.js
 * Accès unique à la réservation canonique (reservations.json hydratée).
 * Tous les écrans du parcours de litige relisent la réservation ici à partir
 * de son id : aucune copie locale ne circule entre les étapes.
 */
import reservations from './reservations.json'
import properties from './properties.json'
import { hydrateReservation } from './dateUtils'

const MONTHS_FR = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
    'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']

// Délai de dépôt d'une demande après le départ du voyageur (Garantie dommages des hôtes)
export const CLAIM_DELAY_DAYS = 14

/** Réservation hydratée, ou null si l'id est inconnu (jamais de repli silencieux). */
export function getReservationById(id) {
    const raw = reservations.find(r => r.id === id)
    return raw ? hydrateReservation(raw) : null
}

export function getPropertyById(propertyId) {
    return properties.find(p => p.propertyId === propertyId) || null
}

/** Normalise un code collé : espaces retirés, majuscules. */
export function normalizeCode(code) {
    return (code || '').replace(/\s+/g, '').toUpperCase()
}

// Messages affichés quand une réservation ne permet pas de demande d'indemnisation
export const ELIGIBILITY_MESSAGES = {
    not_finished: 'Cette réservation n\'est pas terminée. Une demande ne peut être déposée qu\'après le départ du voyageur.',
    expired: 'Le délai de 14 jours après le départ du voyageur est dépassé. Une demande ne peut plus être déposée pour cette réservation.',
}

/**
 * Une demande d'indemnisation n'est possible qu'après le départ du voyageur
 * et dans les 14 jours. Retourne null si éligible, sinon 'not_finished' | 'expired'.
 */
export function getClaimIneligibility(reservation) {
    if (reservation.status !== 'past') return 'not_finished'
    if (reservation.checkOutOffset < -CLAIM_DELAY_DAYS) return 'expired'
    return null
}

/**
 * Recherche par code de confirmation.
 * Retourne { reservation } si le séjour est terminé et dans le délai,
 * sinon { error: 'unknown' | 'not_finished' | 'expired' }.
 * `checkEligibility: false` (envoi d'argent) ne refuse que les codes inconnus.
 */
export function findReservationByCode(code, { checkEligibility = true } = {}) {
    const normalized = normalizeCode(code)
    if (!normalized) return { error: 'empty' }
    const raw = reservations.find(r => normalizeCode(r.confirmationCode) === normalized)
    if (!raw) return { error: 'unknown' }
    const reservation = hydrateReservation(raw)
    const error = checkEligibility ? getClaimIneligibility(reservation) : null
    return error ? { error } : { reservation }
}

/** "20–24 févr." ou "28 févr.–3 mars" (avec l'année si withYear). */
export function formatStayRange(checkIn, checkOut, withYear = false) {
    const ci = new Date(checkIn)
    const co = new Date(checkOut)
    const year = withYear ? ` ${co.getFullYear()}` : ''
    if (ci.getMonth() === co.getMonth() && ci.getFullYear() === co.getFullYear()) {
        return `${ci.getDate()}–${co.getDate()} ${MONTHS_FR[co.getMonth()]}${year}`
    }
    return `${ci.getDate()} ${MONTHS_FR[ci.getMonth()]}–${co.getDate()} ${MONTHS_FR[co.getMonth()]}${year}`
}

export function getFirstName(guestName) {
    return (guestName || '').split(' ')[0]
}
