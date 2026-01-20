import { useState } from 'react'
import BookingHeader from '../../components/booking/BookingHeader'
import reservationsData from '../../data/booking/reservations.json'

function Reservations() {
    const reservations = reservationsData
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

    return (
        <div className="min-h-screen bg-gray-50">
            <BookingHeader />

            <main className="max-w-7xl mx-auto px-6 py-6">
                {/* Titre */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Réservations</h1>

                {/* Filtres */}
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                    <div className="flex items-end gap-4">
                        {/* Date de */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date de
                            </label>
                            <select className="w-40 px-4 py-2 border border-gray-300 rounded bg-white text-sm">
                                <option>Arrivée</option>
                                <option>Départ</option>
                                <option>Réservation</option>
                            </select>
                        </div>

                        {/* Filtrer par dates */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filtrer par dates
                            </label>
                            <input
                                type="text"
                                defaultValue="14 janv. 2026 – 15 janv. 2026"
                                className="w-72 px-4 py-2 border border-gray-300 rounded text-sm"
                                readOnly
                            />
                        </div>

                        {/* Plus de filtres */}
                        <button className="px-6 py-2 border border-[#0071c2] text-[#0071c2] rounded font-medium text-sm hover:bg-blue-50 transition-colors flex items-center gap-2">
                            Plus de filtres
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Voir les réservations */}
                        <button className="px-6 py-2 bg-[#0071c2] hover:bg-[#005999] text-white rounded font-medium text-sm transition-colors">
                            Voir les réservations
                        </button>

                        {/* Spacer */}
                        <div className="flex-1"></div>

                        {/* Imprimer */}
                        <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Imprimer la liste des réservations
                        </button>

                        {/* Télécharger */}
                        <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Télécharger
                        </button>
                    </div>
                </div>

                {/* Tableau */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                                        Identifiant de l'établissement
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                                        Nom de l'établissement
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                                        Adresse
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                                        Nom du client
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                                        Arrivée
                                        <button className="ml-1 inline-flex">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                            </svg>
                                        </button>
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                                        Départ
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                                        Statut
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                                        Paiement total
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                                        Commission et frais
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                                        Numéro réservation
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {reservations.map((reservation) => (
                                    <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                                        {/* Identifiant établissement */}
                                        <td className="px-4 py-4 text-sm text-gray-900">
                                            {reservation.propertyId.replace('prop_00', '1536334')}
                                        </td>

                                        {/* Nom établissement */}
                                        <td className="px-4 py-4">
                                            <div className="font-medium text-gray-900 text-sm max-w-[200px]">
                                                {reservation.propertyName}
                                            </div>
                                        </td>

                                        {/* Adresse */}
                                        <td className="px-4 py-4">
                                            <div className="flex items-start gap-2">
                                                <div className="w-6 h-4 rounded overflow-hidden flex-shrink-0 mt-0.5">
                                                    <div className="flex h-full">
                                                        <div className="w-1/3 bg-[#002395]"></div>
                                                        <div className="w-1/3 bg-white"></div>
                                                        <div className="w-1/3 bg-[#ED2939]"></div>
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-700 max-w-[180px]">
                                                    {reservation.propertyAddress}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Nom du client */}
                                        <td className="px-4 py-4">
                                            <div>
                                                <a
                                                    href="#"
                                                    className="text-sm font-medium text-[#0071c2] hover:underline"
                                                >
                                                    {reservation.guestName}
                                                </a>
                                                {reservation.isGenius && (
                                                    <div className="inline-block ml-2 px-2 py-0.5 bg-[#003580] text-white text-xs font-semibold rounded">
                                                        Genius
                                                    </div>
                                                )}
                                                <div className="text-xs text-gray-600 mt-1">
                                                    {reservation.guestDetails}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Arrivée */}
                                        <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                                            {formatDate(reservation.checkIn)}
                                        </td>

                                        {/* Départ */}
                                        <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                                            {formatDate(reservation.checkOut)}
                                        </td>

                                        {/* Statut */}
                                        <td className="px-4 py-4">
                                            <div className="text-sm text-gray-900">{reservation.status}</div>
                                            <div className="text-xs text-gray-600 mt-1">
                                                {reservation.paymentMethod}
                                            </div>
                                        </td>

                                        {/* Paiement total */}
                                        <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                                            {formatAmount(reservation.totalAmount)}
                                        </td>

                                        {/* Commission */}
                                        <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                                            {formatAmount(reservation.commission)}
                                        </td>

                                        {/* Numéro réservation */}
                                        <td className="px-4 py-4">
                                            <a
                                                href="#"
                                                className="text-sm text-[#0071c2] hover:underline"
                                            >
                                                {reservation.reservationNumber}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer avec pagination */}
                <div className="mt-4 flex items-center justify-between">
                    {/* Pagination */}
                    <div className="flex items-center gap-2">
                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-400 hover:bg-gray-50">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded bg-white text-gray-900 font-medium">
                            1
                        </button>

                        <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-gray-400 hover:bg-gray-50">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Stats et dropdown */}
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                            1-{reservations.length} sur {reservations.length} réservations
                        </span>

                        <div className="relative">
                            <select
                                value={itemsPerPage}
                                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                className="pl-4 pr-10 py-2 border border-gray-300 rounded bg-white text-sm appearance-none cursor-pointer"
                            >
                                <option value={10}>Afficher 10 réservations</option>
                                <option value={30}>Afficher 30 réservations</option>
                                <option value={50}>Afficher 50 réservations</option>
                                <option value={100}>Afficher 100 réservations</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Reservations