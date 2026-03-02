import { useParams, useNavigate } from 'react-router-dom'
import { ChevronDown, ArrowLeft } from 'lucide-react'
import reservationsData from '../../data/airbnb/reservations.json'
import propertiesData from '../../data/airbnb/properties.json'
import { hydrateReservation } from '../../data/airbnb/dateUtils'

function ModifierReservation() {
    const { id } = useParams()
    const navigate = useNavigate()

    const raw = reservationsData.find(r => r.id === id)
    const reservation = raw ? hydrateReservation(raw) : null
    const property = reservation ? propertiesData.find(p => p.propertyId === reservation.propertyId) : null

    if (!reservation || !property) {
        return <div className="p-8 text-gray-500">Réservation non trouvée.</div>
    }

    const formatDate = (date) =>
        new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

    const toInputDate = (date) =>
        new Date(date).toISOString().split('T')[0]

    const nightlyRate = property.pricePerNight || 50
    const firstName = reservation.guestName.split(' ')[0]

    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Layout deux colonnes */}
            <div className="flex flex-1">
                {/* Sidebar gauche */}
                <aside className="w-[220px] flex-shrink-0 bg-gray-50 border-r border-gray-200 flex flex-col px-6 pt-8 pb-24">
                    {/* Logo Airbnb */}
                    <svg viewBox="0 0 32 32" className="w-8 h-8 fill-[#FF385C] mb-8">
                        <path d="M16 1C7.163 1 0 8.163 0 17c0 4.233 1.612 8.088 4.254 11.003L1 31l3.396-.84A15.93 15.93 0 0016 33c8.837 0 16-7.163 16-16S24.837 1 16 1z" />
                    </svg>
                    <p className="text-sm font-semibold text-gray-900">Modifier la réservation</p>
                </aside>

                {/* Contenu principal */}
                <main className="flex-1 overflow-y-auto pb-24">
                    <div className="max-w-xl mx-auto px-8 py-12">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Que souhaitez-vous modifier ?</h1>
                        <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                            Après avoir effectué les modifications souhaitées, vous pouvez envoyer une demande à votre voyageur, {firstName}, pour obtenir confirmation.
                        </p>

                        {/* Card propriété */}
                        <div className="border border-gray-200 rounded-2xl p-4 flex items-center gap-4 mb-10">
                            <img
                                src={property.image}
                                alt={property.name}
                                className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                            />
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{property.name}</p>
                                <p className="text-xs text-gray-500 mt-0.5">Logement entier · 2 lits · 1 salle de bain</p>
                            </div>
                        </div>

                        {/* Détails de la réservation */}
                        <section className="mb-8">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails de la réservation</h2>

                            {/* Dates */}
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-900 mb-2">Dates</label>
                                <div className="grid grid-cols-2 gap-0 border border-gray-300 rounded-xl overflow-hidden">
                                    <div className="px-4 py-3 border-r border-gray-300">
                                        <p className="text-xs text-gray-500 mb-1">Arrivée</p>
                                        <input
                                            type="date"
                                            defaultValue={toInputDate(reservation.checkIn)}
                                            className="text-sm text-gray-900 w-full outline-none bg-transparent"
                                        />
                                    </div>
                                    <div className="px-4 py-3">
                                        <p className="text-xs text-gray-500 mb-1">Départ</p>
                                        <input
                                            type="date"
                                            defaultValue={toInputDate(reservation.checkOut)}
                                            className="text-sm text-gray-900 w-full outline-none bg-transparent"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Voyageurs */}
                            <div>
                                <label className="block text-sm font-medium text-gray-900 mb-2">Voyageurs</label>
                                <div className="relative border border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer hover:border-gray-400 transition-colors">
                                    <span className="text-sm text-gray-900">{reservation.guestCount}</span>
                                    <ChevronDown className="w-4 h-4 text-gray-500" />
                                </div>
                            </div>
                        </section>

                        {/* Frais voyageur */}
                        <section>
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Frais voyageur</h2>

                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-900">Coût de l'hébergement</p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {nightlyRate.toFixed(2).replace('.', ',')} € x {reservation.nights} nuit{reservation.nights > 1 ? 's' : ''}
                                    </p>
                                </div>
                                <div className="border border-gray-300 rounded-xl px-4 py-3 w-40 text-sm text-gray-900">
                                    € {(nightlyRate * reservation.nights).toFixed(0)} EUR
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>

            {/* Barre de bas de page fixe */}
            <div className="fixed bottom-0 inset-x-0 border-t border-gray-200 bg-white px-8 py-4 flex items-center justify-between z-10">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Quitter
                </button>
                <button
                    disabled
                    className="px-6 py-3 bg-gray-200 text-gray-400 text-sm font-medium rounded-xl cursor-not-allowed"
                >
                    Envoyer la demande
                </button>
            </div>
        </div>
    )
}

export default ModifierReservation
