/**
 * dateUtils.js
 * Calcule des dates dynamiques à partir d'offsets relatifs à aujourd'hui.
 * Permet aux mock data d'être toujours "fraîches" peu importe la date réelle.
 */

/**
 * Retourne une date ISO (YYYY-MM-DD) décalée de `offsetDays` jours depuis aujourd'hui.
 * offsetDays = 0  → aujourd'hui
 * offsetDays = 2  → dans 2 jours
 * offsetDays = -8 → il y a 8 jours
 */
export function getDateFromOffset(offsetDays) {
    const date = new Date()
    date.setDate(date.getDate() + offsetDays)
    // On remet l'heure à minuit pour éviter les bugs de comparaison
    date.setHours(0, 0, 0, 0)
    return date
}

/**
 * Formate une date (objet Date ou string ISO) en français court.
 * Ex: "16 févr."
 */
export function formatDateShort(date) {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

/**
 * Formate une date (objet Date ou string ISO) en français long.
 * Ex: "lun. 16 févr. 2026"
 */
export function formatDateLong(date) {
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString('fr-FR', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
}

/**
 * Calcule le statusDetail dynamiquement depuis les offsets.
 * checkInOffset = 0  → "Arrivée aujourd'hui"
 * checkOutOffset = 0 → "Départ aujourd'hui"
 * checkInOffset > 0  → "À venir"
 * checkInOffset < 0 && checkOutOffset > 0 → "Séjour en cours"
 */
export function getStatusDetail(checkInOffset, checkOutOffset) {
    if (checkOutOffset === 0) return 'Départ aujourd\'hui'
    if (checkInOffset === 0) return 'Arrivée aujourd\'hui'
    if (checkInOffset > 0) return 'À venir'
    if (checkInOffset < 0 && checkOutOffset > 0) return 'Séjour en cours'
    return 'Passée'
}

/**
 * Calcule le status (confirmed / upcoming / past) depuis les offsets.
 */
export function getStatus(checkInOffset, checkOutOffset) {
    if (checkOutOffset < 0) return 'past'
    if (checkInOffset > 0) return 'upcoming'
    return 'confirmed' // today : arrivée, départ, ou séjour en cours
}

/**
 * Hydrate une réservation brute (avec offsets) en réservation utilisable (avec vraies dates).
 * Appelle cette fonction sur chaque réservation avant de l'utiliser dans un composant.
 */
export function hydrateReservation(res) {
    const checkIn = getDateFromOffset(res.checkInOffset)
    const checkOut = getDateFromOffset(res.checkOutOffset)
    const bookedOn = getDateFromOffset(res.bookedOnOffset)

    return {
        ...res,
        checkIn,
        checkOut,
        bookedOn,
        status: getStatus(res.checkInOffset, res.checkOutOffset),
        statusDetail: getStatusDetail(res.checkInOffset, res.checkOutOffset),
    }
}

/**
 * Hydrate une demande brute (avec offsets) en demande utilisable (avec vraies dates).
 */
export function hydrateDemande(dem) {
    const checkIn = getDateFromOffset(dem.checkInOffset)
    const checkOut = getDateFromOffset(dem.checkOutOffset)

    return {
        ...dem,
        checkIn,
        checkOut,
    }
}

/**
 * Vérifie si une date est bloquée pour une propriété donnée.
 * @param {string} propertyId
 * @param {Date} date
 * @param {Array} blockedDates - tableau importé depuis blockedDates.json
 * @returns {boolean}
 */
export function isBlockedDay(propertyId, date, blockedDates) {
    return blockedDates.some((block) => {
        if (block.propertyId !== propertyId) return false
        const start = new Date(block.start)
        const end = new Date(block.end)
        start.setHours(0, 0, 0, 0)
        end.setHours(0, 0, 0, 0)
        return date >= start && date <= end
    })
}