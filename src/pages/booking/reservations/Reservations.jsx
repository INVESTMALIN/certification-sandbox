import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'

function Reservations() {
    const { id } = useParams()
    const [dateType, setDateType] = useState('Arrivée')
    const [startDate, setStartDate] = useState('2026-01-22')
    const [endDate, setEndDate] = useState('2026-08-31')

    // Mock de 3 réservations pour cette propriété
    const mockReservations = [
        {
            id: 1,
            guestName: 'Graham Smith',
            guestDetails: '2 adultes',
            checkIn: '30 avr. 2026',
            checkOut: '5 mai 2026',
            accommodation: 'Appartement 1 Chambre',
            bookedOn: '20 janv. 2026',
            status: 'OK',
            statusDetail: 'Paiement par Booking.com',
            rate: '€ 428',
            rateDetail: 'Virement bancaire',
            commission: '€ 79,02',
            reservationNumber: '5028381952'
        },
        {
            id: 2,
            guestName: 'ANNICK LEBOUTET',
            guestDetails: '2 adultes',
            checkIn: '6 juil. 2026',
            checkOut: '10 juil. 2026',
            accommodation: 'Appartement 1 Chambre',
            bookedOn: '21 oct. 2025',
            status: 'OK',
            statusDetail: 'Paiement par Booking.com',
            rate: '€ 918',
            rateDetail: 'Virement bancaire',
            commission: '€ 169,32',
            reservationNumber: '5925817508'
        },
        {
            id: 3,
            guestName: 'Sophie Rufin',
            guestDetails: '2 adultes',
            checkIn: '10 juil. 2026',
            checkOut: '13 juil. 2026',
            accommodation: 'Appartement 1 Chambre',
            bookedOn: '11 janv. 2026',
            status: 'OK',
            statusDetail: 'Paiement par Booking.com',
            rate: '€ 580',
            rateDetail: 'Virement bancaire',
            commission: '€ 107,02',
            reservationNumber: '6248233326'
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Réservations</h1>

                {/* Filtres */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex items-end gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date de
                            </label>
                            <select
                                value={dateType}
                                onChange={(e) => setDateType(e.target.value)}
                                className="w-40 px-4 py-2 border border-gray-300 rounded bg-white text-sm"
                            >
                                <option>Arrivée</option>
                                <option>Départ</option>
                                <option>Réservation</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Du
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Au
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded text-sm"
                            />
                        </div>

                        <button className="px-6 py-2 text-sm text-[#0071c2] border border-[#0071c2] rounded hover:bg-blue-50 transition-colors">
                            Plus de filtres ▼
                        </button>

                        <button className="px-6 py-2 bg-[#0071c2] hover:bg-[#005999] text-white rounded font-medium text-sm transition-colors">
                            Voir
                        </button>

                        <div className="flex-1"></div>

                        <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Télécharger
                        </button>

                        <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Imprimer la liste des réservations
                        </button>
                    </div>
                </div>

                {/* Tableau */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                                        Nom du client
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                                        Arrivée ▲
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                                        Départ
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">
                                        Hébergements
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
                                {mockReservations.map((res) => (
                                    <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-4">
                                            <a href="#" className="text-[#0071c2] hover:underline font-medium text-sm">
                                                {res.guestName}
                                            </a>
                                            <div className="text-xs text-gray-600 mt-1">
                                                {res.guestDetails}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                                            {res.checkIn}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                                            {res.checkOut}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-900">
                                            {res.accommodation}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-900 whitespace-nowrap">
                                            {res.bookedOn}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm font-semibold text-gray-900">{res.status}</div>
                                            <div className="text-xs text-gray-600 mt-1">
                                                {res.statusDetail}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="text-sm font-semibold text-gray-900">{res.rate}</div>
                                            <div className="text-xs text-gray-600 mt-1">
                                                {res.rateDetail}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-900">
                                            {res.commission}
                                        </td>
                                        <td className="px-4 py-4">
                                            <a href="#" className="text-[#0071c2] hover:underline text-sm">
                                                {res.reservationNumber}
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 text-sm text-gray-600">
                    <p>{mockReservations.length} réservation{mockReservations.length > 1 ? 's' : ''} affichée{mockReservations.length > 1 ? 's' : ''}</p>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default Reservations