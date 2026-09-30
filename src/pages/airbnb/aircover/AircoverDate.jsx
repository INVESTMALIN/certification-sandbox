import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AircoverLayout, { FooterButton } from '../../../components/airbnb/AircoverLayout'
import ReservationIntrouvable from '../../../components/airbnb/ReservationIntrouvable'
import { getReservationById } from '../../../data/airbnb/reservationLookup'
import { formatDateLong } from '../../../data/airbnb/dateUtils'
import { getClaim, updateClaim } from '../../../data/airbnb/aircoverClaim'

// YYYY-MM-DD en heure locale (toISOString décalerait d'un jour hors UTC)
function toLocalISO(date) {
    const d = new Date(date)
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    return `${d.getFullYear()}-${mm}-${dd}`
}

function AircoverDate() {
    const { reservationId } = useParams()
    const navigate = useNavigate()
    const reservation = getReservationById(reservationId)
    const [date, setDate] = useState(
        getClaim(reservationId).date || (reservation ? toLocalISO(reservation.checkOut) : '')
    )

    if (!reservation) return <ReservationIntrouvable />

    const handleSuivant = () => {
        updateClaim(reservationId, { date })
        navigate(`/airbnb/aircover/demande/${reservationId}/recap`)
    }

    return (
        <AircoverLayout
            step={4}
            onRetour={() => navigate(`/airbnb/aircover/demande/${reservationId}/elements`)}
            footerAction={<FooterButton onClick={handleSuivant} disabled={!date}>Suivant</FooterButton>}
        >
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">Quand est-ce arrivé ?</h1>

            <div className="relative border border-gray-300 rounded-xl px-4 pt-5 pb-3 hover:border-gray-500 transition-colors">
                <label htmlFor="aircover-date" className="absolute top-2 left-4 text-xs text-gray-500">Date</label>
                <input
                    id="aircover-date"
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full text-sm text-gray-900 focus:outline-none bg-transparent pt-1"
                />
            </div>

            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                La date de départ du voyageur, {reservation.guestName}, était le {formatDateLong(reservation.checkOut)}.
                Modifiez les informations si vous savez que le problème s'est produit à une autre date.
            </p>
        </AircoverLayout>
    )
}

export default AircoverDate
