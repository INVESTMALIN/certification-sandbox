import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { Info } from 'lucide-react'
import { useState } from 'react'

function ReservationsDemandes() {
    const [statusFilter, setStatusFilter] = useState('attente')

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Demandes de réservation</h1>
                    <span className="px-3 py-1 bg-green-600 text-white text-sm font-semibold rounded">
                        Ouvert aux nouvelles demandes
                    </span>
                    <button className="p-2 hover:bg-gray-100 rounded-full">
                        <Info className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Filtres */}
                <div className="mb-6 flex items-center gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Statut des demandes
                        </label>
                        <div className="relative">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-80 px-4 py-2 border-2 border-[#0071c2] rounded bg-white text-sm appearance-none pr-10"
                            >
                                <option value="toutes">Toutes les demandes</option>
                                <option value="attente">En attente de votre réponse</option>
                                <option value="non-finalisee">Réservation non finalisée par le client</option>
                                <option value="finalisee">Réservation finalisée par le client</option>
                                <option value="expiree-vous">Expirée – Vous n'avez pas répondu</option>
                                <option value="expiree-client">Expirée – Le client n'a pas réservé</option>
                                <option value="refusee">Refusée</option>
                            </select>
                            <svg className="w-5 h-5 text-gray-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    <button className="self-end px-6 py-2 border border-[#0071c2] text-[#0071c2] rounded hover:bg-blue-50 transition-colors text-sm font-semibold">
                        Voir le calendrier
                    </button>
                </div>

                {/* État vide */}
                <div className="bg-white border border-gray-200 rounded-lg p-16 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Vous êtes à jour
                    </h2>
                    <p className="text-sm text-gray-600">
                        Vous n'avez aucune demande de réservation en attente pour le moment.
                    </p>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default ReservationsDemandes