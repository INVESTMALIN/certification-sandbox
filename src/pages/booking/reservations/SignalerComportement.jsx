import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import reservationsData from '../../../data/booking/reservations.json'
import { ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react'

function ReportBehavior() {
    const { id, reservationId } = useParams()
    const navigate = useNavigate()
    const reservation = reservationsData.find(res => res.id === reservationId)

    const [selectedReason, setSelectedReason] = useState('')
    const [details, setDetails] = useState('')
    const [checkbox1, setCheckbox1] = useState(false)
    const [checkbox2, setCheckbox2] = useState(false)

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('fr-FR', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    const formatAmount = (amount) => {
        return `€ ${amount.toFixed(2).replace('.', ',')}`
    }

    const handleSubmit = () => {
        // Logique d'envoi
        alert('Signalement envoyé')
        navigate(`/booking/property/${id}/reservations/${reservationId}`)
    }

    if (!reservation) {
        return (
            <div className="min-h-screen bg-gray-50">
                <PropertyHeader />
                <main className="max-w-7xl mx-auto px-6 py-6">
                    <p>Réservation non trouvée</p>
                </main>
                <BookingFooter />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-7xl mx-auto px-6 py-6">
                {/* Bouton retour */}
                <Link
                    to={`/booking/property/${id}/reservations/${reservationId}`}
                    className="inline-flex items-center gap-2 text-[#0071c2] hover:underline mb-6 text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour à la réservation
                </Link>

                {/* Titre */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Signaler un comportement inapproprié du client
                </h1>

                <div className="grid grid-cols-3 gap-6">
                    {/* Colonne principale */}
                    <div className="col-span-2 space-y-6">
                        {/* Section Motif */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Motif</h2>

                            <p className="text-sm font-semibold text-gray-900 mb-4">
                                Quel type de comportement devez-vous signaler ?
                            </p>

                            <div className="space-y-3">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="reason"
                                        value="payment"
                                        checked={selectedReason === 'payment'}
                                        onChange={(e) => setSelectedReason(e.target.value)}
                                        className="mt-1 w-4 h-4 text-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">Problème de paiement</span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="reason"
                                        value="rules"
                                        checked={selectedReason === 'rules'}
                                        onChange={(e) => setSelectedReason(e.target.value)}
                                        className="mt-1 w-4 h-4 text-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">Enfreinte aux règles de la maison</span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="reason"
                                        value="abusive"
                                        checked={selectedReason === 'abusive'}
                                        onChange={(e) => setSelectedReason(e.target.value)}
                                        className="mt-1 w-4 h-4 text-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">Comportement abusif</span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="reason"
                                        value="noshow"
                                        checked={selectedReason === 'noshow'}
                                        onChange={(e) => setSelectedReason(e.target.value)}
                                        className="mt-1 w-4 h-4 text-[#0071c2]"
                                    />
                                    <div className="flex-1">
                                        <span className="text-sm text-gray-700">
                                            Non-présentation (Vous ne pouvez pas signaler un comportement inapproprié en cas de non-présentation d'un client. Si vous souhaitez signaler une non-présentation, retournez sur la page de la réservation et sélectionnez l'option « Signaler comme non-présentation ».)
                                        </span>
                                    </div>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="reason"
                                        value="dirty"
                                        checked={selectedReason === 'dirty'}
                                        onChange={(e) => setSelectedReason(e.target.value)}
                                        className="mt-1 w-4 h-4 text-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">Hébergement laissé sale</span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="reason"
                                        value="damages"
                                        checked={selectedReason === 'damages'}
                                        onChange={(e) => setSelectedReason(e.target.value)}
                                        className="mt-1 w-4 h-4 text-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">Dommages causés à l'hébergement</span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="reason"
                                        value="illegal"
                                        checked={selectedReason === 'illegal'}
                                        onChange={(e) => setSelectedReason(e.target.value)}
                                        className="mt-1 w-4 h-4 text-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">Activités illégales</span>
                                </label>
                            </div>
                        </div>

                        {/* Section Détails */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Détails</h2>

                            <textarea
                                value={details}
                                onChange={(e) => setDetails(e.target.value)}
                                placeholder="Brève description de l'incident"
                                rows={6}
                                maxLength={240}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent resize-none"
                            />
                            <p className="text-xs text-gray-500 mt-2">{details.length}/240 caractères restants</p>
                        </div>

                        {/* Section Autres demandes */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Autres demandes</h2>

                            <div className="space-y-3">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={checkbox1}
                                        onChange={(e) => setCheckbox1(e.target.checked)}
                                        className="mt-1 w-4 h-4 text-[#0071c2] rounded"
                                    />
                                    <span className="text-sm text-gray-700">
                                        J'aimerais un retour de Booking.com au sujet de cet incident
                                    </span>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={checkbox2}
                                        onChange={(e) => setCheckbox2(e.target.checked)}
                                        className="mt-1 w-4 h-4 text-[#0071c2] rounded"
                                    />
                                    <span className="text-sm text-gray-700">
                                        Je souhaite empêcher ce client de séjourner dans mon hébergement à l'avenir
                                    </span>
                                </label>
                            </div>
                        </div>

                        {/* Boutons */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleSubmit}
                                disabled={!selectedReason || !details}
                                className="px-6 py-3 bg-[#0071c2] text-white rounded hover:bg-[#005999] disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
                            >
                                Envoyer
                            </button>
                            <button
                                onClick={() => navigate(`/booking/property/${id}/reservations/${reservationId}`)}
                                className="px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded hover:bg-gray-50 text-sm font-medium"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>

                    {/* Sidebar droite */}
                    <div className="col-span-1 space-y-6">
                        {/* Informations réservation */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="space-y-4 text-sm">
                                <div>
                                    <div className="text-gray-600 mb-1">Nom du client</div>
                                    <div className="font-semibold text-gray-900">{reservation.guestName}</div>
                                </div>
                                <div>
                                    <div className="text-gray-600 mb-1">Numéro de réservation :</div>
                                    <div className="text-gray-900">{reservation.reservationNumber}</div>
                                </div>
                                <div>
                                    <div className="text-gray-600 mb-1">Arrivée</div>
                                    <div className="text-gray-900">{formatDate(reservation.checkIn)}</div>
                                </div>
                                <div>
                                    <div className="text-gray-600 mb-1">Départ</div>
                                    <div className="text-gray-900">{formatDate(reservation.checkOut)}</div>
                                </div>
                                <div>
                                    <div className="text-gray-600 mb-1">Total de personnes :</div>
                                    <div className="text-gray-900">{reservation.guestDetails}</div>
                                </div>
                                <div>
                                    <div className="text-gray-600 mb-1">Nombre d'hébergements</div>
                                    <div className="text-gray-900">1</div>
                                </div>
                                <div>
                                    <div className="text-gray-600 mb-1">Montant total</div>
                                    <div className="text-gray-900">{formatAmount(reservation.totalAmount)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Feedback */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-base font-semibold text-gray-900 mb-3">
                                Cette page contient-elle toutes les informations dont vous avez besoin ?
                            </h3>
                            <div className="flex gap-3">
                                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                                    <ThumbsUp className="w-5 h-5 text-gray-600" />
                                </button>
                                <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                                    <ThumbsDown className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                            <p className="text-xs text-gray-600 mt-3">Donner mon avis</p>
                        </div>
                    </div>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default ReportBehavior