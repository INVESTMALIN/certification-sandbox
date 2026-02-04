import { useState } from 'react'
import { Link } from 'react-router-dom'
import BookingHeader from '../../components/booking/BookingHeader'
import reservationsData from '../../data/booking/reservations.json'
import BookingFooter from '../../components/booking/BookingFooter'

function Reservations() {
    const [dateType, setDateType] = useState('Arrivée')
    const [startDate, setStartDate] = useState('2026-01-01')
    const [endDate, setEndDate] = useState('2026-12-31')
    const [statusFilter, setStatusFilter] = useState('all')
    const [propertyFilter, setPropertyFilter] = useState('all')
    const [itemsPerPage, setItemsPerPage] = useState(30)

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
        // Filtre par statut
        if (statusFilter !== 'all' && res.status !== statusFilter) {
            return false
        }

        // Filtre par propriété
        if (propertyFilter !== 'all' && res.propertyId !== propertyFilter) {
            return false
        }

        // Filtre par date (selon le type de date sélectionné)
        const dateToCheck = dateType === 'Arrivée' ? res.checkIn :
            dateType === 'Départ' ? res.checkOut :
                res.bookedOn

        const checkDate = new Date(dateToCheck)
        const start = new Date(startDate)
        const end = new Date(endDate)

        if (checkDate < start || checkDate > end) {
            return false
        }

        return true
    })

    // Obtenir la liste unique des propriétés
    const uniqueProperties = [...new Set(reservationsData.map(res => res.propertyId))]

    return (
        <div className="min-h-screen bg-gray-50">
            <BookingHeader />

            <main className="max-w-7xl mx-auto px-6 py-6">
                {/* Titre */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Réservations</h1>

                {/* Filtres */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-5 gap-4 items-end">
                        {/* Date de */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date de
                            </label>
                            <select
                                value={dateType}
                                onChange={(e) => setDateType(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded bg-white text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                            >
                                <option>Arrivée</option>
                                <option>Départ</option>
                                <option>Réservation</option>
                            </select>
                        </div>

                        {/* Date début */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Du
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                            />
                        </div>

                        {/* Date fin */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Au
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                            />
                        </div>

                        {/* Filtre par statut */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Statut
                            </label>
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded bg-white text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                            >
                                <option value="all">Tous les statuts</option>
                                <option value="OK">OK</option>
                                <option value="pending">En attente</option>
                                <option value="cancelled">Annulée</option>
                            </select>
                        </div>

                        {/* Filtre par propriété */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Établissement
                            </label>
                            <select
                                value={propertyFilter}
                                onChange={(e) => setPropertyFilter(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded bg-white text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                            >
                                <option value="all">Tous les établissements</option>
                                {uniqueProperties.map(propId => (
                                    <option key={propId} value={propId}>
                                        {propId === 'prop_001' ? 'Avignon - Palais des Papes' : 'Marseille - Centre-ville'}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Bouton réinitialiser */}
                    <div className="mt-4">
                        <button
                            onClick={() => {
                                setDateType('Arrivée')
                                setStartDate('2026-01-01')
                                setEndDate('2026-12-31')
                                setStatusFilter('all')
                                setPropertyFilter('all')
                            }}
                            className="text-[#0071c2] text-sm hover:underline"
                        >
                            Réinitialiser les filtres
                        </button>
                    </div>
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
                                                {res.propertyAddress}
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