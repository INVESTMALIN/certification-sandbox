import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import reservations from '../../../data/airbnb/reservations.json'
import { hydrateReservation, formatDateLong } from '../../../data/airbnb/dateUtils'

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

function AircoverStep2() {
    const { reservationId } = useParams()
    const navigate = useNavigate()

    const rawRes = reservations.find(r => r.id === reservationId)
        || reservations.find(r => r.id === 'res_airbnb_008')
    const reservation = rawRes ? hydrateReservation(rawRes) : null

    const checkoutISO = reservation?.checkOut
        ? reservation.checkOut.toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0]

    const claim = getClaim(reservationId)
    const [date, setDate] = useState(claim.date || checkoutISO)

    const handleSuivant = () => {
        const updated = { ...claim, reservationId, date }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        navigate(`/airbnb/aircover/demande/${reservationId}/step3`)
    }

    const checkoutLabel = reservation?.checkOut ? formatDateLong(reservation.checkOut) : ''

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
                <div className="h-full bg-gray-800 transition-all" style={{ width: '40%' }} />
            </div>

            {/* Main */}
            <main className="flex-1 flex flex-col items-center px-6 py-12">
                <div className="w-full max-w-xl">
                    <div className="mb-8">
                        <img src="/aircover.avif" alt="AirCover pour les hôtes" className="h-9" />
                        <p className="text-xs text-gray-500 mt-1">pour les hôtes</p>
                    </div>

                    <h1 className="text-2xl font-semibold text-gray-900 mb-8">Quand est-ce arrivé ?</h1>

                    {/* Date field */}
                    <div className="relative border border-gray-300 rounded-xl px-4 pt-5 pb-3 hover:border-gray-500 transition-colors">
                        <label className="absolute top-2 left-4 text-xs text-gray-500">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className="w-full text-sm text-gray-900 focus:outline-none bg-transparent pt-1"
                        />
                    </div>

                    {checkoutLabel && (
                        <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                            La date de départ du voyageur, {reservation?.guestName}, était le {checkoutLabel}.
                            Modifiez les informations si vous savez que le problème s'est produit à une autre date.
                        </p>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 px-8 py-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(`/airbnb/aircover/demande/${reservationId}/step1`)}
                    className="text-sm font-medium text-gray-900 underline hover:text-gray-700 transition-colors"
                >
                    ← Retour
                </button>
                <button
                    onClick={handleSuivant}
                    className="px-6 py-3 rounded-xl text-sm font-semibold bg-gray-900 text-white hover:bg-gray-700 transition-colors"
                >
                    Suivant →
                </button>
            </footer>
        </div>
    )
}

export default AircoverStep2
