import { useParams, useNavigate } from 'react-router-dom'
import AirbnbHeader from '../../components/airbnb/AirbnbHeader'
import ReservationIntrouvable from '../../components/airbnb/ReservationIntrouvable'
import ParcoursBloque from '../../components/airbnb/ParcoursBloque'
import { getReservationById, getClaimIneligibility, ELIGIBILITY_MESSAGES } from '../../data/airbnb/reservationLookup'

const ETAPES = [
    {
        titre: 'Envoyez une demande dans les 14 jours',
        texte: 'Ajoutez des photos, des vidéos, des captures d\'écran, des reçus et d\'autres documents explicites pour montrer ce qui s\'est passé.',
    },
    {
        titre: 'Trouvez un accord avec votre voyageur',
        texte: 'Vous et votre voyageur aurez la possibilité de fournir des détails et de convenir d\'une solution.',
    },
    {
        titre: 'Vous avez encore besoin d\'aide ?',
        texte: 'Si vous ne parvenez pas à trouver une solution, vous pouvez demander de l\'aide à Airbnb.',
    },
]

function AircoverDemande() {
    const { reservationId } = useParams()
    const navigate = useNavigate()

    const reservation = getReservationById(reservationId)
    if (!reservation) return <ReservationIntrouvable />
    // Accès direct à une réservation non éligible : écran bloquant, retour au motif
    const ineligibilite = getClaimIneligibility(reservation)
    if (ineligibilite) {
        return (
            <ParcoursBloque
                message={ELIGIBILITY_MESSAGES[ineligibilite]}
                onRetour={() => navigate(`/airbnb/paiement/${reservationId}/demander/step2`)}
            />
        )
    }

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}>
            <AirbnbHeader />

            <main className="flex-1 flex flex-col items-center px-6 py-16">
                <div className="w-full max-w-xl">

                    <img
                        src="/aircover.avif"
                        alt="AirCover pour les hôtes"
                        className="h-12 mb-10"
                    />

                    <h1 className="text-3xl font-semibold text-gray-900 mb-10">
                        Fonctionnement de la Garantie dommages des hôtes
                    </h1>

                    <div className="space-y-8 mb-10">
                        {ETAPES.map(({ titre, texte }) => (
                            <div key={titre}>
                                <h2 className="text-base font-semibold text-gray-900 mb-1">{titre}</h2>
                                <p className="text-sm text-gray-600 leading-relaxed">{texte}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed mb-8">
                        Apprenez-en plus sur les informations que nous collectons et communiquons.{' '}
                        <span className="font-medium text-gray-900 underline cursor-default">
                            Consulter notre Politique de confidentialité
                        </span>
                    </p>

                    <div className="border-t border-gray-200 mb-8" />

                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            onClick={() => navigate('/airbnb/aircover')}
                            className="px-8 py-4 border border-gray-900 text-gray-900 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                        >
                            Afficher ce qui est couvert
                        </button>
                        <button
                            onClick={() => navigate(`/airbnb/aircover/demande/${reservationId}/depot`)}
                            className="px-8 py-4 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors"
                        >
                            Commencer
                        </button>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default AircoverDemande
