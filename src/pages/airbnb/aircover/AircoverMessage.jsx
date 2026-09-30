import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AircoverLayout, { FooterButton } from '../../../components/airbnb/AircoverLayout'
import ReservationIntrouvable from '../../../components/airbnb/ReservationIntrouvable'
import { getReservationById, getFirstName } from '../../../data/airbnb/reservationLookup'
import { getClaim, updateClaim } from '../../../data/airbnb/aircoverClaim'

const MAX_LENGTH = 1000

function AircoverMessage() {
    const { reservationId } = useParams()
    const navigate = useNavigate()
    const claim = getClaim(reservationId)
    const [message, setMessage] = useState(claim.message || '')

    const reservation = getReservationById(reservationId)
    if (!reservation) return <ReservationIntrouvable />

    const handleSuivant = () => {
        const updated = updateClaim(reservationId, { message })
        // Premier élément : directement le formulaire ; sinon l'aperçu des éléments
        navigate(updated.elements.length > 0
            ? `/airbnb/aircover/demande/${reservationId}/elements`
            : `/airbnb/aircover/demande/${reservationId}/element/nouveau`)
    }

    return (
        <AircoverLayout
            step={2}
            onRetour={() => navigate(`/airbnb/aircover/demande/${reservationId}/depot`)}
            footerAction={<FooterButton onClick={handleSuivant}>Suivant</FooterButton>}
        >
            <div className="flex items-start justify-between gap-6 mb-2">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Rédigez un bref message pour votre voyageur
                </h1>
                <img
                    src={reservation.guestAvatar}
                    alt={reservation.guestName}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
            </div>
            <p className="text-sm text-gray-600 mb-2">
                Ce message sera envoyé à {getFirstName(reservation.guestName)} lorsque vous enverrez votre demande de remboursement.
            </p>
            <p className="text-sm font-medium text-gray-900 underline cursor-default mb-6">Obtenir des conseils</p>

            <textarea
                value={message}
                onChange={e => setMessage(e.target.value.slice(0, MAX_LENGTH))}
                rows={8}
                aria-label="Message pour le voyageur"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors resize-none"
            />
            <p className="text-right text-xs text-gray-500 mt-1">
                {message.length} / {MAX_LENGTH}
            </p>
        </AircoverLayout>
    )
}

export default AircoverMessage
