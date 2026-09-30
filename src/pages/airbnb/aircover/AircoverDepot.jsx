import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AircoverLayout, { FooterButton } from '../../../components/airbnb/AircoverLayout'
import ParcoursBloque from '../../../components/airbnb/ParcoursBloque'
import ReservationIntrouvable from '../../../components/airbnb/ReservationIntrouvable'
import { getReservationById } from '../../../data/airbnb/reservationLookup'
import { getClaim, updateClaim } from '../../../data/airbnb/aircoverClaim'

const MESSAGE_DEPOT = 'La Garantie dommages des hôtes ne couvre que les dommages non couverts par votre dépôt de garantie ou votre assurance. Utilisez d\'abord cette couverture, puis revenez si le dommage n\'est pas intégralement remboursé.'

function AircoverDepot() {
    const { reservationId } = useParams()
    const navigate = useNavigate()
    // Seul « Non » permet de continuer : on ne pré-sélectionne que cette valeur
    const [depot, setDepot] = useState(getClaim(reservationId).depot === 'non' ? 'non' : '')
    const [bloque, setBloque] = useState(false)

    const reservation = getReservationById(reservationId)
    if (!reservation) return <ReservationIntrouvable />

    const choisir = (valeur) => {
        if (valeur === 'oui') {
            setDepot('')
            setBloque(true)
            return
        }
        setDepot('non')
    }

    const handleSuivant = () => {
        updateClaim(reservationId, { depot: 'non' })
        navigate(`/airbnb/aircover/demande/${reservationId}/message`)
    }

    const carte = (valeur, label) => (
        <button
            onClick={() => choisir(valeur)}
            aria-pressed={depot === valeur}
            className={`w-full text-left px-5 py-5 rounded-xl border text-base font-medium text-gray-900 transition-colors ${depot === valeur
                ? 'border-gray-900 ring-1 ring-gray-900 bg-gray-50'
                : 'border-gray-300 hover:border-gray-900'
                }`}
        >
            {label}
        </button>
    )

    return (
        <>
            <AircoverLayout
                step={1}
                onRetour={() => navigate(`/airbnb/aircover/demande/${reservationId}`)}
                footerAction={<FooterButton onClick={handleSuivant} disabled={depot !== 'non'}>Suivant →</FooterButton>}
            >
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Avez-vous exigé un dépôt de garantie ou une assurance dommages ?
                </h1>
                <p className="text-sm text-gray-500 mb-8">
                    La Garantie dommages des hôtes ne s'applique qu'aux dommages qui ne sont pas couverts par un dépôt de garantie ou une assurance dommages.
                </p>
                <div className="space-y-3">
                    {carte('non', 'Non')}
                    {carte('oui', 'Oui')}
                </div>
            </AircoverLayout>

            {bloque && <ParcoursBloque message={MESSAGE_DEPOT} onRetour={() => setBloque(false)} />}
        </>
    )
}

export default AircoverDepot
