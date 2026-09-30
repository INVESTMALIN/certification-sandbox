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

export const TYPE_ENDOMMAGE = 'Élément endommagé'

/**
 * Un élément sans ancienneté, sans valeur ou, s'il est endommagé, sans réponse
 * « réparé / remplacé » (cas des brouillons antérieurs) ne permet pas d'envoyer la demande.
 */
export function isElementIncomplete(el) {
    const sansMontant = el.montant === '' || el.montant === undefined || el.montant === null
    const sansReparation = el.type === TYPE_ENDOMMAGE && !REPARABLE_LABELS[el.reparable]
    return sansMontant || !el.anciennete || sansReparation
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
        return { ...emptyClaim(reservationId), ...c, elements: Array.isArray(c.elements) ? c.elements : [] }
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
