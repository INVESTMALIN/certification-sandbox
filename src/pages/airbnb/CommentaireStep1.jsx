import { useParams, useNavigate } from 'react-router-dom'
import reservations from '../../data/airbnb/reservations.json'
import { hydrateReservation } from '../../data/airbnb/dateUtils.js'

function CommentaireStep1() {
    const { reservationId } = useParams()
    const navigate = useNavigate()

    const rawReservation = reservations.find(r => r.id === reservationId) || reservations.find(r => r.id === 'res_airbnb_010')
    const reservation = rawReservation ? hydrateReservation(rawReservation) : null

    const daysRemaining = 13

    return (
        <div className="font-airbnb min-h-screen bg-white flex flex-col">

            {/* Header minimal */}
            <header className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
                <img src="/airbnb-logo-simple.png" alt="Airbnb" className="h-8" />
                <button
                    onClick={() => navigate('/airbnb/dashboard')}
                    className="text-sm font-medium text-gray-900 underline hover:text-gray-700"
                >
                    Enregistrer et quitter
                </button>
            </header>

            {/* Contenu */}
            <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-6 py-16">
                <img
                    src={reservation?.guestAvatar}
                    alt={reservation?.guestName}
                    className="w-24 h-24 rounded-full object-cover mb-6"
                />

                <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                    Laissez un commentaire sur {reservation?.guestName}
                </h1>

                <p className="text-gray-600 leading-relaxed">
                    Dites-nous comment le séjour s'est passé avec {reservation?.guestName}. Vos remarques incitent les voyageurs à se comporter de manière respectueuse et aident les autres hôtes à savoir à quoi s'attendre. Nous attendrons {daysRemaining} jours avant de publier votre commentaire ou jusqu'à ce que {reservation?.guestName} en rédige un à votre sujet, selon ce qui se produit en premier.
                </p>
            </main>

            {/* Footer avec bouton Continuer */}
            <footer className="border-t border-gray-200 px-8 py-4 flex justify-end">
                <button
                    onClick={() => navigate(`/airbnb/commentaire/${reservationId}/step2`)}
                    className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                    Continuer
                </button>
            </footer>
        </div>
    )
}

export default CommentaireStep1