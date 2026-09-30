import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { FileText } from 'lucide-react'
import AircoverLayout, { FooterButton } from '../../../components/airbnb/AircoverLayout'
import ReservationIntrouvable from '../../../components/airbnb/ReservationIntrouvable'
import { getReservationById } from '../../../data/airbnb/reservationLookup'
import { getClaim, isElementIncomplete } from '../../../data/airbnb/aircoverClaim'

/** Aperçu des éléments déjà ajoutés ; chaque ajout ou modification ouvre la page élément. */
function AircoverElements() {
    const { reservationId } = useParams()
    const navigate = useNavigate()

    const reservation = getReservationById(reservationId)
    if (!reservation) return <ReservationIntrouvable />

    const { elements } = getClaim(reservationId)
    // Aucun élément encore : on passe directement au formulaire du premier
    if (elements.length === 0) {
        return <Navigate to={`/airbnb/aircover/demande/${reservationId}/element/nouveau`} replace />
    }

    const hasIncomplete = elements.some(isElementIncomplete)

    return (
        <AircoverLayout
            step={3}
            onRetour={() => navigate(`/airbnb/aircover/demande/${reservationId}/message`)}
            footerAction={
                <FooterButton
                    onClick={() => navigate(`/airbnb/aircover/demande/${reservationId}/date`)}
                    disabled={hasIncomplete}
                >
                    Suivant
                </FooterButton>
            }
        >
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">Aperçu de l'élément</h1>

            <div className="mb-8">
                {hasIncomplete && (
                    <p className="text-sm font-medium text-gray-700 mb-3">
                        Saisie incomplète des éléments : complétez chaque élément (ancienneté, valeur, réparation et reçu selon le type) pour continuer.
                    </p>
                )}
                <div className="divide-y divide-gray-100">
                    {elements.map((el, i) => (
                        <div key={i} className="flex items-center gap-4 py-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <FileText className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {el.nom || '(sans nom)'}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {el.type}
                                    {el.montant === '' || el.montant === undefined
                                        ? ' · Ajoutez un montant'
                                        : ` · ${parseFloat(el.montant).toFixed(2)} EUR`}
                                </p>
                            </div>
                            <button
                                onClick={() => navigate(`/airbnb/aircover/demande/${reservationId}/element/${i}`)}
                                className="text-sm font-medium text-gray-900 underline hover:text-gray-600 flex-shrink-0"
                            >
                                Modifier
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={() => navigate(`/airbnb/aircover/demande/${reservationId}/element/nouveau`)}
                className="px-5 py-3 border border-gray-900 rounded-xl text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
            >
                Ajouter un autre élément
            </button>
        </AircoverLayout>
    )
}

export default AircoverElements
