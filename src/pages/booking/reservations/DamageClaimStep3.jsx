import { useParams, Link } from 'react-router-dom'
import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { CheckCircle, Clock, ThumbsUp, ThumbsDown } from 'lucide-react'
import reservationsData from '../../../data/booking/reservations.json'

function DamageClaimStep3() {
    const { id, reservationId } = useParams()
    const reservation = reservationsData.find(res => res.id === reservationId)

    if (!reservation) {
        return (
            <div className="min-h-screen bg-white">
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
                {/* Titre */}
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Effectuez une demande de paiement des dommages
                </h1>

                {/* Stepper */}
                <div className="flex items-center mb-8">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-600">Ajout d'éléments</span>
                    </div>
                    <div className="flex-1 h-px bg-green-600 mx-4"></div>
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-600">Vérification et envoi</span>
                    </div>
                    <div className="flex-1 h-px bg-green-600 mx-4"></div>
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0071c2] text-white font-semibold text-sm">
                            3
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-900">Confirmation</span>
                    </div>
                </div>

                {/* Contenu principal avec sidebar */}
                <div className="grid grid-cols-3 gap-8">
                    {/* Colonne gauche - Confirmation */}
                    <div className="col-span-2">
                        {/* Message de confirmation */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 flex items-start gap-4">
                            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 mb-2">
                                    Nous avons bien reçu votre demande de paiement des dommages
                                </h2>
                                <p className="text-sm text-gray-700">
                                    Son traitement peut prendre jusqu'à 14 jours. En attendant, n'hésitez pas à suivre le statut de votre demande sur la page « Détails de la réservation ».
                                </p>
                            </div>
                        </div>

                        {/* Statut de la demande */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-gray-600" />
                                Statut de la demande de paiement des dommages
                            </h2>
                            <p className="text-sm text-gray-600 mb-6">En cours de vérification</p>

                            {/* Timeline */}
                            <div className="space-y-6">
                                {/* Étape 1 : Demande envoyée */}
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                                        <div className="w-px h-full bg-gray-300 mt-2"></div>
                                    </div>
                                    <div className="flex-1 pb-6">
                                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                                            Demande envoyée
                                        </h3>
                                        <p className="text-sm text-gray-700">
                                            Vous avez envoyé une demande de paiement des dommages pour cette réservation le <strong>14 décembre 2023</strong>.
                                        </p>
                                    </div>
                                </div>

                                {/* Étape 2 : Demande en cours de vérification */}
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                                        <div className="w-px h-full bg-gray-300 mt-2"></div>
                                    </div>
                                    <div className="flex-1 pb-6">
                                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                                            Demande en cours de vérification
                                        </h3>
                                        <p className="text-sm text-gray-700">
                                            Nous évaluons votre demande et contacterons le client en votre nom pour l'informer des dommages. Veuillez noter que cela peut prendre jusqu'à 14 jours.
                                        </p>
                                    </div>
                                </div>

                                {/* Étape 3 : Demande acceptée ou refusée */}
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-base font-semibold text-gray-900 mb-1">
                                            Demande acceptée ou refusée
                                        </h3>
                                        <p className="text-sm text-gray-700">
                                            Si votre demande est acceptée, vous recevrez <strong>34,9 €</strong> avec votre prochain paiement.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bouton retour */}
                        <Link
                            to={`/booking/property/${id}/reservations/${reservationId}`}
                            className="inline-block px-6 py-3 bg-[#0071c2] text-white rounded hover:bg-[#005999] text-sm font-medium"
                        >
                            Retour aux détails de la réservation
                        </Link>
                    </div>

                    {/* Colonne droite - Sidebar */}
                    <div className="col-span-1">
                        {/* Infos réservation */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Numéro de réservation :</h3>
                            <p className="text-sm text-gray-900 mb-4">{reservation.reservationNumber}</p>

                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Arrivée</h3>
                            <p className="text-sm text-gray-900 mb-4">
                                {new Date(reservation.checkIn).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                })}
                            </p>

                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Départ</h3>
                            <p className="text-sm text-gray-900 mb-4">
                                {new Date(reservation.checkOut).toLocaleDateString('fr-FR', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                })}
                            </p>

                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Total de personnes :</h3>
                            <p className="text-sm text-gray-900 mb-4">{reservation.guestDetails}</p>

                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Nombre d'hébergements</h3>
                            <p className="text-sm text-gray-900">1</p>
                        </div>

                        {/* Feedback */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                Cette page contient-elle toutes les informations dont vous avez besoin ?
                            </h3>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                                    <span>Donner mon avis</span>
                                    <ThumbsUp className="w-4 h-4" />
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 text-sm">
                                    <ThumbsDown className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default DamageClaimStep3