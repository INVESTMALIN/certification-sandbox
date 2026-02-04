import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import reservationsData from '../../../data/booking/reservations.json'
import { Link } from 'react-router-dom'


function Reservations() {
    const { id } = useParams()
    const [dateType, setDateType] = useState('Arrivée')
    const [startDate, setStartDate] = useState('2026-01-01')
    const [endDate, setEndDate] = useState('2026-12-31')

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

    // Filtrer les réservations pour cette propriété uniquement
    const propertyReservations = reservationsData.filter(res => res.propertyId === id)

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-7xl mx-auto px-6 py-6">
                {/* Titre */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Réservations</h1>

                {/* Filtres */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-3 gap-4 items-end">
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
                    </div>
                </div>

                {/* Résultats */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-900">
                            {propertyReservations.length} réservation{propertyReservations.length > 1 ? 's' : ''}
                        </h2>
                    </div>

                    {/* Tableau */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
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
                                        Hébergement
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                                        Réservé le
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                                        Statut
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                                        Tarif
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
                                {propertyReservations.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
                                            Aucune réservation pour cette propriété
                                        </td>
                                    </tr>
                                ) : (
                                    propertyReservations.map((res) => (
                                        <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-4">
                                                <Link to={`/booking/property/${id}/reservations/${res.id}`} className="text-[#0071c2] hover:underline font-medium text-sm">
                                                    {res.guestName}
                                                </Link>
                                                <div className="text-xs text-gray-600 mt-1">
                                                    {res.guestDetails}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {formatDate(res.checkIn)}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {formatDate(res.checkOut)}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-900">
                                                {res.accommodation}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                                                {formatDate(res.bookedOn)}
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-sm font-semibold text-gray-900">{res.status}</div>
                                                <div className="text-xs text-gray-600 mt-1">
                                                    {res.statusDetail}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-sm font-semibold text-gray-900">{formatAmount(res.totalAmount)}</div>
                                                <div className="text-xs text-gray-600 mt-1">
                                                    {res.rateDetail}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-900">
                                                {formatAmount(res.commission)}
                                            </td>
                                            <td className="px-4 py-4">
                                                <Link to={`/booking/property/${id}/reservations/${res.id}`} className="text-[#0071c2] hover:underline text-sm">
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

                {/* Footer */}
                <div className="mt-4 text-sm text-gray-600">
                    <p>{propertyReservations.length} réservation{propertyReservations.length > 1 ? 's' : ''} affichée{propertyReservations.length > 1 ? 's' : ''}</p>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default Reservations 