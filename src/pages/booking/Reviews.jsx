import { useState } from 'react'
import BookingHeader from '../../components/booking/BookingHeader'
import reviewsData from '../../data/booking/reviews.json'
import propertiesData from '../../data/booking/properties.json'
import BookingFooter from '../../components/booking/BookingFooter'


function Reviews() {
    const reviews = reviewsData


    // States pour les filtres
    const [cityFilter, setCityFilter] = useState('all')
    const [startDate, setStartDate] = useState('2026-01-01')
    const [endDate, setEndDate] = useState('2026-12-31')
    const [propertyIdFilter, setPropertyIdFilter] = useState('')

    // Extraire les villes uniques
    const uniqueCities = [...new Set(propertiesData.map(p => p.city))]

    // Filtrer les reviews
    const filteredReviews = reviews.filter(review => {
        // Filtre par ville
        if (cityFilter !== 'all') {
            const property = propertiesData.find(p => p.id === review.propertyId)
            if (!property || property.city !== cityFilter) {
                return false
            }
        }

        // Filtre par dates
        const reviewDate = new Date(review.date)
        const start = new Date(startDate)
        const end = new Date(endDate)

        if (reviewDate < start || reviewDate > end) {
            return false
        }

        // Filtre par identifiant property
        if (propertyIdFilter.trim()) {
            const property = propertiesData.find(p => p.id === review.propertyId)
            if (!property || !property.propertyId.includes(propertyIdFilter.trim())) {
                return false
            }
        }

        return true
    })

    // Formater les dates en français
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    // Déterminer la couleur du badge selon la note
    const getRatingColor = (rating) => {
        if (rating >= 9.5) return 'bg-[#008009]' // Vert foncé pour 9.5+
        if (rating >= 9.0) return 'bg-[#003580]' // Bleu foncé pour 9.0-9.4
        if (rating >= 8.0) return 'bg-[#0071c2]' // Bleu moyen pour 8.0-8.9
        return 'bg-[#febb02]' // Jaune pour moins de 8.0
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <BookingHeader />

            <main className="max-w-7xl mx-auto px-6 py-6">
                {/* Titre */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Commentaires</h1>

                {/* Filtres */}
                <div className="mb-6">
                    <div className="flex items-end gap-3">
                        {/* Filter par ville */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filtrer par ville
                            </label>
                            <select
                                value={cityFilter}
                                onChange={(e) => setCityFilter(e.target.value)}
                                className="w-56 px-4 py-2 border border-gray-300 rounded bg-white text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                            >
                                <option value="all">Toutes les villes</option>
                                {uniqueCities.map(city => {
                                    const count = propertiesData.filter(p => p.city === city).length
                                    return (
                                        <option key={city} value={city}>
                                            {city} ({count} hébergement{count > 1 ? 's' : ''})
                                        </option>
                                    )
                                })}
                            </select>
                        </div>

                        {/* Filter par dates */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filtrer par dates
                            </label>
                            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded bg-white">
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="border-none outline-none text-sm w-32"
                                />
                                <span className="text-gray-400">—</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="border-none outline-none text-sm w-32"
                                />
                            </div>
                        </div>

                        {/* Filter par identifiants */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filtrer par un ou plusieurs identifiants d'hébergement
                            </label>
                            <input
                                type="text"
                                placeholder="Saisissez un ou plusieurs identifiants d'hébergement"
                                value={propertyIdFilter}
                                onChange={(e) => setPropertyIdFilter(e.target.value)}
                                className="w-96 px-4 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                            />
                        </div>

                        {/* Bouton Afficher les commentaires */}
                        <button className="px-6 py-2 bg-[#0071c2] text-white rounded font-medium text-sm hover:bg-[#005999] transition-colors">
                            Afficher les commentaires
                        </button>
                    </div>
                </div>

                {/* Tableau */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                    Date
                                    <button className="ml-1 inline-flex">
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                        </svg>
                                    </button>
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                    Identifiant
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                    Nom de l'établissement
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                    Note des commentaires
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                    Commentaires
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredReviews.map((review) => (
                                <tr key={review.id} className="hover:bg-gray-50 transition-colors">
                                    {/* Date */}
                                    <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap align-top">
                                        {formatDate(review.date)}
                                    </td>

                                    {/* Identifiant */}
                                    <td className="px-6 py-4 text-sm text-gray-900 align-top">
                                        {review.bookingId}
                                    </td>

                                    {/* Nom établissement */}
                                    <td className="px-6 py-4 align-top">
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-4 rounded overflow-hidden flex-shrink-0 mt-0.5">
                                                <div className="flex h-full">
                                                    <div className="w-1/3 bg-[#002395]"></div>
                                                    <div className="w-1/3 bg-white"></div>
                                                    <div className="w-1/3 bg-[#ED2939]"></div>
                                                </div>
                                            </div>
                                            <span className="text-sm text-gray-900 max-w-[250px]">
                                                {review.propertyName}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Note */}
                                    <td className="px-6 py-4 align-top">
                                        <div
                                            className={`inline-flex items-center justify-center w-12 h-8 ${getRatingColor(review.rating)} text-white font-bold text-sm rounded`}
                                        >
                                            {review.rating.toFixed(1)}
                                        </div>
                                    </td>

                                    {/* Commentaires */}
                                    <td className="px-6 py-4 align-top">
                                        <div className="max-w-[500px]">
                                            {/* Commentaire client */}
                                            <div className="mb-3">
                                                <div className="flex items-start gap-2">
                                                    {review.rating >= 9.0 && (
                                                        <span className="text-lg">😊</span>
                                                    )}
                                                    {review.rating < 9.0 && review.rating >= 8.0 && (
                                                        <span className="text-lg">😐</span>
                                                    )}
                                                    <p className="text-sm text-gray-900 leading-relaxed">
                                                        {review.comment}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Réponse propriétaire */}
                                            {review.hasOwnerResponse && review.ownerResponse && (
                                                <div className="pl-4 border-l-2 border-gray-200">
                                                    <p className="text-sm text-gray-600 italic">
                                                        <span className="font-semibold not-italic text-gray-700">
                                                            Votre réponse :{' '}
                                                        </span>
                                                        {review.ownerResponse}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Bouton pour répondre si pas de réponse */}
                                            {!review.hasOwnerResponse && (
                                                <button className="mt-2 text-sm text-[#0071c2] hover:underline font-medium">
                                                    Répondre au commentaire
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Footer simple */}
                <div className="mt-4 text-sm text-gray-600">
                    <p>{filteredReviews.length} commentaire{filteredReviews.length > 1 ? 's' : ''} affiché{filteredReviews.length > 1 ? 's' : ''}</p>                </div>
            </main>
            <BookingFooter />
        </div>
    )
}

export default Reviews