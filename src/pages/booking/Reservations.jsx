import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Printer, Download } from 'lucide-react'
import BookingHeader from '../../components/booking/BookingHeader'
import reservationsData from '../../data/booking/reservations.json'
import BookingFooter from '../../components/booking/BookingFooter'
import propertiesData from '../../data/booking/properties.json'

function Reservations() {
    const [dateType, setDateType] = useState('Arrivée')
    const [startDate, setStartDate] = useState('2026-01-01')
    const [endDate, setEndDate] = useState('2026-12-31')
    const [cityFilter, setCityFilter] = useState('all')
    const [showMoreFilters, setShowMoreFilters] = useState(false)
    const [searchKeywords, setSearchKeywords] = useState('')
    const [itemsPerPage] = useState(50)
    const [statusFilters, setStatusFilters] = useState({
        ok: false,
        cancelled: false,
        noShow: false,
        paymentByBooking: false
    })
    const [communicationFilters, setCommunicationFilters] = useState({
        pendingRequests: false
    })

    // Extraire les villes uniques depuis properties.json
    const uniqueCities = [...new Set(propertiesData.map(p => p.city))]

    // Formater les dates en français
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    // Formater les montants
    const formatAmount = (amount) => {
        return `€ ${amount.toFixed(2).replace('.', ',')}`
    }

    // Filtrer les réservations
    const filteredReservations = reservationsData.filter(res => {
        // Filtre par ville
        if (cityFilter !== 'all') {
            const property = propertiesData.find(p => p.id === res.propertyId)
            if (!property || property.city !== cityFilter) {
                return false
            }
        }

        // Filtre par date (selon le type de date sélectionné)
        const dateToCheck = dateType === 'Arrivée' ? res.checkIn :
            dateType === 'Départ' ? res.checkOut :
                res.bookingDate

        if (dateToCheck) {
            const checkDate = new Date(dateToCheck)
            const start = new Date(startDate)
            const end = new Date(endDate)

            if (checkDate < start || checkDate > end) {
                return false
            }
        }

        // Filtre par mots-clés (recherche dans nom client, nom property, etc.)
        if (searchKeywords.trim()) {
            const keywords = searchKeywords.toLowerCase()
            const matchesKeywords =
                res.guestName.toLowerCase().includes(keywords) ||
                res.propertyName.toLowerCase().includes(keywords) ||
                res.id.toLowerCase().includes(keywords)

            if (!matchesKeywords) {
                return false
            }
        }

        // Filtre par statut (si au moins un checkbox coché)
        const hasStatusFilter = statusFilters.ok || statusFilters.cancelled || statusFilters.noShow || statusFilters.paymentByBooking
        if (hasStatusFilter) {
            const matchesStatus =
                (statusFilters.ok && res.status === 'OK') ||
                (statusFilters.cancelled && res.status === 'Annulée') ||
                (statusFilters.noShow && res.status === 'Non-présentation') ||
                (statusFilters.paymentByBooking && res.statusDetail === 'Paiement par Booking.com')

            if (!matchesStatus) {
                return false
            }
        }

        // Filtre communication clients (placeholder - à implémenter selon ta data)
        if (communicationFilters.pendingRequests) {
            // Tu peux ajouter une logique ici si tu as ce champ dans tes données
            // Par exemple : if (!res.hasPendingRequest) return false
        }

        return true
    })

    return (
        <div className="min-h-screen bg-gray-50">
            <BookingHeader />

            <main className="max-w-7xl mx-auto px-6 py-6">
                {/* Titre */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Réservations</h1>

                {/* Filtres */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        {/* Filter par ville */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filter par ville
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

                        {/* Date de */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date de
                            </label>
                            <select
                                value={dateType}
                                onChange={(e) => setDateType(e.target.value)}
                                className="w-40 px-4 py-2 border border-gray-300 rounded bg-white text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                            >
                                <option>Arrivée</option>
                                <option>Départ</option>
                                <option>Réservation</option>
                            </select>
                        </div>

                        {/* Filter par dates */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filter par dates
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
                        {/* Boutons Imprimer et Télécharger */}
                        <div className="self-end flex items-center gap-4">
                            <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
                                <Printer className="w-5 h-5" />
                                Imprimer la liste des réservations
                            </button>
                            <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
                                <Download className="w-5 h-5" />
                                Télécharger
                            </button>
                        </div>
                    </div>

                    {/* Boutons Plus de filtres et Voir les réservations */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setShowMoreFilters(!showMoreFilters)}
                            className="px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded font-medium text-sm hover:bg-blue-50 transition-colors flex items-center gap-2"
                        >
                            Plus de filtres
                            <ChevronDown className={`w-4 h-4 transition-transform ${showMoreFilters ? 'rotate-180' : ''}`} />
                        </button>

                        <button className="px-6 py-2 bg-[#0071c2] text-white rounded font-medium text-sm hover:bg-[#005999] transition-colors">
                            Voir les réservations
                        </button>
                    </div>

                    {/* Panel Plus de filtres */}
                    {showMoreFilters && (
                        <div className="bg-white border border-gray-200 rounded-lg p-6 mt-3">
                            {/* Recherche */}
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-gray-900 mb-2">
                                    Rechercher
                                </label>
                                <input
                                    type="text"
                                    placeholder="Mots-clés (facultatif)"
                                    value={searchKeywords}
                                    onChange={(e) => setSearchKeywords(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                {/* Statut de la réservation */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-3">
                                        Statut de la réservation
                                    </label>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={statusFilters.ok}
                                                onChange={(e) => setStatusFilters({ ...statusFilters, ok: e.target.checked })}
                                                className="w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                            />
                                            <span className="text-sm text-gray-700">OK</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={statusFilters.cancelled}
                                                onChange={(e) => setStatusFilters({ ...statusFilters, cancelled: e.target.checked })}
                                                className="w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                            />
                                            <span className="text-sm text-gray-700">Annulée</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={statusFilters.noShow}
                                                onChange={(e) => setStatusFilters({ ...statusFilters, noShow: e.target.checked })}
                                                className="w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                            />
                                            <span className="text-sm text-gray-700">Non-présentation</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={statusFilters.paymentByBooking}
                                                onChange={(e) => setStatusFilters({ ...statusFilters, paymentByBooking: e.target.checked })}
                                                className="w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                            />
                                            <span className="text-sm text-gray-700">Paiement par Booking.com</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Communication clients */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-3">
                                        Communication clients
                                    </label>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={communicationFilters.pendingRequests}
                                                onChange={(e) => setCommunicationFilters({ ...communicationFilters, pendingRequests: e.target.checked })}
                                                className="w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                            />
                                            <span className="text-sm text-gray-700">Demandes de clients en attente uniquement</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Résultats */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                {filteredReservations.length} réservation{filteredReservations.length > 1 ? 's' : ''} trouvée{filteredReservations.length > 1 ? 's' : ''}
                            </h2>
                        </div>
                        <div className="flex items-center gap-4">
                            <label className="text-sm text-gray-600">
                                Afficher par page :
                            </label>
                            <select
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                className="px-3 py-1 border border-gray-300 rounded text-sm"
                            >
                                <option value={10}>10</option>
                                <option value={30}>30</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                    </div>

                    {/* Tableau */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                                        Identifiant de l'établissement
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                                        Nom de l'établissement
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                                        Adresse
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                                        Nom du client
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                                        Arrivée
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                                        Départ
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                                        Statut
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                                        Paiement total
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                                        Commission et frais
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                                        Numéro de réservation
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredReservations.length === 0 ? (
                                    <tr>
                                        <td colSpan="10" className="px-6 py-8 text-center text-gray-500">
                                            Aucune réservation trouvée avec ces filtres
                                        </td>
                                    </tr>
                                ) : (
                                    filteredReservations.slice(0, itemsPerPage).map((res) => (
                                        <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                                            {/* Identifiant de l'établissement */}
                                            <td className="px-4 py-4 text-sm text-gray-900">
                                                {res.propertyId === 'prop_001' ? '14618578' : '14618579'}
                                            </td>

                                            {/* Nom de l'établissement - CLIQUABLE */}
                                            <td className="px-4 py-4">
                                                <Link
                                                    to={`/booking/property/${res.propertyId}/accueil`}
                                                    className="text-[#0071c2] hover:underline text-sm"
                                                >
                                                    {res.propertyName}
                                                </Link>
                                            </td>

                                            {/* Adresse */}
                                            <td className="px-4 py-4 text-sm text-gray-900">
                                                {propertiesData.find(p => p.id === res.propertyId)?.address || 'N/A'}
                                            </td>

                                            {/* Nom du client */}
                                            <td className="px-4 py-4">
                                                <div className="text-sm text-gray-900 font-medium">
                                                    {res.guestName}
                                                </div>
                                                <div className="text-xs text-gray-600 mt-1">
                                                    {res.guestDetails}
                                                </div>
                                            </td>

                                            {/* Arrivée */}
                                            <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {formatDate(res.checkIn)}
                                            </td>

                                            {/* Départ */}
                                            <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {formatDate(res.checkOut)}
                                            </td>

                                            {/* Statut */}
                                            <td className="px-4 py-4">
                                                <div className="text-sm font-semibold text-gray-900">
                                                    {res.status}
                                                </div>
                                                <div className="text-xs text-gray-600 mt-1">
                                                    {res.statusDetail}
                                                </div>
                                            </td>

                                            {/* Paiement total */}
                                            <td className="px-4 py-4 text-sm text-gray-900">
                                                {formatAmount(res.totalAmount)}
                                            </td>

                                            {/* Commission et frais */}
                                            <td className="px-4 py-4 text-sm text-gray-900">
                                                {formatAmount(res.commission)}
                                            </td>

                                            {/* Numéro de réservation - CLIQUABLE */}
                                            <td className="px-4 py-4">
                                                <Link
                                                    to={`/booking/property/${res.propertyId}/accueil`}
                                                    className="text-[#0071c2] hover:underline text-sm"
                                                >
                                                    {res.reservationNumber}
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default Reservations