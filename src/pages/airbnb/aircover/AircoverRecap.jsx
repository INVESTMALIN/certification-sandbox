import { useParams, useNavigate } from 'react-router-dom'
import AircoverLayout, { FooterButton } from '../../../components/airbnb/AircoverLayout'
import ReservationIntrouvable from '../../../components/airbnb/ReservationIntrouvable'
import { getReservationById, getPropertyById, getFirstName, formatStayRange, getClaimIneligibility } from '../../../data/airbnb/reservationLookup'
import { getClaim, isClaimComplete, clearClaim } from '../../../data/airbnb/aircoverClaim'
import { addDemandeEnvoyee } from '../../../data/airbnb/demandesArgent'
import ElementsRecap from '../../../components/airbnb/ElementsRecap'

function Section({ titre, onModifier, children }) {
    return (
        <div className="py-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-gray-900">{titre}</p>
                <button
                    onClick={onModifier}
                    className="text-sm font-medium text-gray-900 underline hover:text-gray-600"
                >
                    Modifier
                </button>
            </div>
            {children}
        </div>
    )
}

function AircoverRecap() {
    const { reservationId } = useParams()
    const navigate = useNavigate()

    const reservation = getReservationById(reservationId)
    if (!reservation) return <ReservationIntrouvable />
    const property = getPropertyById(reservation.propertyId)
    const claim = getClaim(reservationId)
    const base = `/airbnb/aircover/demande/${reservationId}`

    // Envoi possible seulement si tout est renseigné (sinon le total compterait 0 €)
    const complete = isClaimComplete(claim) && !getClaimIneligibility(reservation)
    const total = claim.elements.reduce((sum, el) => sum + (parseFloat(el.montant) || 0), 0)
    const claimDateDisplay = claim.date
        ? new Date(claim.date + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
        : ''

    // Envoi : la demande rejoint le Centre de résolution, puis le brouillon est supprimé
    const handleEnvoyer = () => {
        if (!complete) return
        const demandeId = addDemandeEnvoyee({
            reservationId,
            motif: 'degats',
            montant: total,
            depot: claim.depot,
            elements: claim.elements,
            date: claim.date,
            remarque: claim.message,
        })
        clearClaim(reservationId)
        navigate(`${base}/confirmation`, { state: { envoyee: true, demandeId } })
    }

    return (
        <AircoverLayout
            step={5}
            onRetour={() => navigate(`${base}/date`)}
            footerAction={
                <FooterButton variant="rausch" onClick={handleEnvoyer} disabled={!complete}>
                    Envoyer
                </FooterButton>
            }
        >
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">Vérifiez et envoyez votre demande</h1>

            {/* Réservation concernée (toujours relue depuis la réservation canonique) */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
                <img
                    src={reservation.guestAvatar}
                    alt={reservation.guestName}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{reservation.guestName}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                        {formatStayRange(reservation.checkIn, reservation.checkOut, true)} · {reservation.confirmationCode}
                    </p>
                    {property && <p className="text-xs text-gray-500 mt-0.5 truncate">{property.name}</p>}
                </div>
            </div>

            <div className="flex items-center justify-between py-4 mb-2">
                <span className="text-sm font-semibold text-gray-900">Total demandé</span>
                <span className="text-sm font-semibold text-gray-900">{total.toFixed(2)} EUR</span>
            </div>

            <Section titre="Dépôt de garantie ou assurance dommages" onModifier={() => navigate(`${base}/depot`)}>
                <p className="text-sm text-gray-700">{claim.depot === 'non' ? 'Non' : '—'}</p>
            </Section>

            <Section titre={`Remarque pour ${getFirstName(reservation.guestName)}`} onModifier={() => navigate(`${base}/message`)}>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {claim.message || <span className="italic text-gray-400">Aucun message</span>}
                </p>
            </Section>

            <Section titre={`Éléments (${claim.elements.length})`} onModifier={() => navigate(`${base}/elements`)}>
                <ElementsRecap elements={claim.elements} />
            </Section>

            <Section titre="Moment des faits" onModifier={() => navigate(`${base}/date`)}>
                <p className="text-sm text-gray-700">{claimDateDisplay || '—'}</p>
            </Section>
        </AircoverLayout>
    )
}

export default AircoverRecap
