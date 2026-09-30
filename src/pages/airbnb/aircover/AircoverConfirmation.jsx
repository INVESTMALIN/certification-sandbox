import { useEffect } from 'react'
import { useNavigate, useParams, useLocation, Navigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import ReservationIntrouvable from '../../../components/airbnb/ReservationIntrouvable'
import { getReservationById } from '../../../data/airbnb/reservationLookup'
import { clearClaim } from '../../../data/airbnb/aircoverClaim'

function AircoverConfirmation() {
    const navigate = useNavigate()
    const { reservationId } = useParams()
    const location = useLocation()
    const reservation = getReservationById(reservationId)
    // Seul le bouton « Envoyer » du récap mène ici (état de navigation)
    const envoyee = location.state?.envoyee === true

    // Nettoyer le brouillon de CETTE réservation une fois la demande envoyée
    useEffect(() => {
        if (reservation && envoyee) clearClaim(reservationId)
    }, [reservation, envoyee, reservationId])

    if (!reservation) return <ReservationIntrouvable />
    // Accès direct par URL : rien n'a été envoyé, retour au récap
    if (!envoyee) return <Navigate to={`/airbnb/aircover/demande/${reservationId}/recap`} replace />

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}>

            {/* Header */}
            <header className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
                <img src="/airbnb-logo.png" alt="Airbnb" className="h-8" />
            </header>

            {/* Progress bar — complet */}
            <div className="h-0.5 bg-gray-800" />

            {/* Main */}
            <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
                <div className="w-full max-w-xl text-center">
                    <div className="mb-8">
                        <img src="/aircover.avif" alt="AirCover pour les hôtes" className="h-9 mx-auto" />
                        <p className="text-xs text-gray-500 mt-1">pour les hôtes</p>
                    </div>

                    <CheckCircle className="w-16 h-16 text-gray-900 mx-auto mb-6" strokeWidth={1.5} />

                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                        Le problème sera résolu sous peu
                    </h1>

                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        Votre demande a bien été envoyée au voyageur. Ce dernier dispose de 24 heures pour répondre
                        et effectuer le paiement demandé.
                    </p>

                    <p className="text-sm text-gray-600 leading-relaxed mb-10">
                        Si le voyageur ne répond pas ou refuse de payer, Airbnb interviendra pour vous aider
                        à résoudre la situation dans le cadre de la Garantie dommages des hôtes.
                    </p>

                    <button
                        onClick={() => navigate('/airbnb/dashboard')}
                        className="px-8 py-3 rounded-xl text-sm font-semibold bg-gray-900 text-white hover:bg-gray-700 transition-colors"
                    >
                        Retour au tableau de bord
                    </button>
                </div>
            </main>
        </div>
    )
}

export default AircoverConfirmation
