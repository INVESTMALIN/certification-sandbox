import { useParams, useNavigate } from 'react-router-dom'
import reservations from '../../../data/airbnb/reservations.json'
import properties from '../../../data/airbnb/properties.json'
import { hydrateReservation, formatDateShort, formatDateLong } from '../../../data/airbnb/dateUtils'

const STORAGE_KEY = 'aircover_claim'

function getClaim(reservationId) {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return { reservationId, elements: [], date: '', message: '' }
        const c = JSON.parse(raw)
        if (c.reservationId !== reservationId) return { reservationId, elements: [], date: '', message: '' }
        return c
    } catch {
        return { reservationId, elements: [], date: '', message: '' }
    }
}

function AircoverStep4() {
    const { reservationId } = useParams()
    const navigate = useNavigate()

    const rawRes = reservations.find(r => r.id === reservationId)
        || reservations.find(r => r.id === 'res_airbnb_008')
    const reservation = rawRes ? hydrateReservation(rawRes) : null
    const property = properties.find(p => p.id === rawRes?.propertyId)

    const claim = getClaim(reservationId)

    const total = claim.elements.reduce((sum, el) => sum + (parseFloat(el.montant) || 0), 0)

    // Format the claim date for display
    const claimDateDisplay = (() => {
        if (!claim.date) return ''
        const d = new Date(claim.date + 'T12:00:00')
        return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
    })()

    const handleEnvoyer = () => {
        navigate(`/airbnb/aircover/demande/${reservationId}/step5`)
    }

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}>

            {/* Header */}
            <header className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
                <img src="/airbnb-logo.png" alt="Airbnb" className="h-8" />
                <button
                    onClick={() => navigate('/airbnb/dashboard')}
                    className="text-sm font-medium text-gray-900 underline hover:text-gray-700 transition-colors"
                >
                    Enregistrer et quitter
                </button>
            </header>

            {/* Progress bar */}
            <div className="h-0.5 bg-gray-100">
                <div className="h-full bg-gray-800 transition-all" style={{ width: '80%' }} />
            </div>

            {/* Main */}
            <main className="flex-1 flex flex-col items-center px-6 py-12">
                <div className="w-full max-w-xl">
                    <div className="mb-8">
                        <img src="/aircover.avif" alt="AirCover pour les hôtes" className="h-9" />
                        <p className="text-xs text-gray-500 mt-1">pour les hôtes</p>
                    </div>

                    <h1 className="text-2xl font-semibold text-gray-900 mb-8">
                        Vérifiez et envoyez votre demande
                    </h1>

                    {/* Reservation info */}
                    {reservation && (
                        <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
                            <img
                                src={reservation.guestAvatar}
                                alt={reservation.guestName}
                                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                            />
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{reservation.guestName}</p>
                                {reservation.checkIn && reservation.checkOut && (
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {formatDateShort(reservation.checkIn)} – {formatDateShort(reservation.checkOut)}
                                    </p>
                                )}
                                {property && (
                                    <p className="text-xs text-gray-500 mt-0.5 truncate max-w-xs">{property.name}</p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Total */}
                    <div className="flex items-center justify-between py-4 border-b border-gray-200 mb-2">
                        <span className="text-sm font-semibold text-gray-900">Total demandé</span>
                        <span className="text-sm font-semibold text-gray-900">{total.toFixed(2)} EUR</span>
                    </div>

                    {/* Elements */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-700">
                                Éléments ({claim.elements.length})
                            </span>
                            <button
                                onClick={() => navigate(`/airbnb/aircover/demande/${reservationId}/step1`)}
                                className="text-sm font-medium text-gray-900 underline hover:text-gray-600"
                            >
                                Modifier
                            </button>
                        </div>
                        <div className="space-y-2">
                            {claim.elements.map((el, i) => (
                                <div key={i} className="flex items-center justify-between py-2">
                                    <div>
                                        <p className="text-sm text-gray-900">{el.nom || '(sans nom)'}</p>
                                        <p className="text-xs text-gray-500">{el.type}</p>
                                    </div>
                                    <span className="text-sm text-gray-700">
                                        {el.montant !== '' ? `${parseFloat(el.montant).toFixed(2)} EUR` : '—'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Date */}
                    <div className="py-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-900 mb-0.5">Moment des faits</p>
                                <p className="text-sm text-gray-700">{claimDateDisplay || '—'}</p>
                            </div>
                            <button
                                onClick={() => navigate(`/airbnb/aircover/demande/${reservationId}/step2`)}
                                className="text-sm font-medium text-gray-900 underline hover:text-gray-600"
                            >
                                Modifier
                            </button>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="py-4 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold text-gray-900">
                                Remarque pour {reservation?.guestName?.split(' ')[0] || 'le voyageur'}
                            </p>
                            <button
                                onClick={() => navigate(`/airbnb/aircover/demande/${reservationId}/step3`)}
                                className="text-sm font-medium text-gray-900 underline hover:text-gray-600"
                            >
                                Modifier
                            </button>
                        </div>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                            {claim.message || <span className="italic text-gray-400">Aucun message</span>}
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 px-8 py-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(`/airbnb/aircover/demande/${reservationId}/step3`)}
                    className="text-sm font-medium text-gray-900 underline hover:text-gray-700 transition-colors"
                >
                    ← Retour
                </button>
                <button
                    onClick={handleEnvoyer}
                    className="px-6 py-3 rounded-xl text-sm font-semibold bg-[#FF385C] text-white hover:bg-[#e0314f] transition-colors"
                >
                    Envoyer
                </button>
            </footer>
        </div>
    )
}

export default AircoverStep4
