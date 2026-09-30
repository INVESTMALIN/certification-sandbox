/** « 24 sept. 2026 à 10:32 » */
export function formatDateHeure(date) {
    const d = new Date(date)
    return `${d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })} à ${d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`
}

/** « 24 sept. 2026 » */
export function formatDate(date) {
    return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

/** « Sep 24, 2026 » : l'évènement initial est affiché en anglais par Airbnb dans la vraie procédure. */
export function formatDateEn(date) {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
