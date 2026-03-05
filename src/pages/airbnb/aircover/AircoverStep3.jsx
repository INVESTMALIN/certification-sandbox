import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import reservations from '../../../data/airbnb/reservations.json'
import { hydrateReservation } from '../../../data/airbnb/dateUtils'

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

function AircoverStep3() {
    const { reservationId } = useParams()
    const navigate = useNavigate()

    const rawRes = reservations.find(r => r.id === reservationId)
        || reservations.find(r => r.id === 'res_airbnb_008')
    const reservation = rawRes ? hydrateReservation(rawRes) : null

    const claim = getClaim(reservationId)
    const [message, setMessage] = useState(claim.message || '')

    const handleSuivant = () => {
        const updated = { ...claim, reservationId, message }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
        navigate(`/airbnb/aircover/demande/${reservationId}/step4`)
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
                <div className="h-full bg-gray-800 transition-all" style={{ width: '60%' }} />
            </div>

            {/* Main */}
            <main className="flex-1 flex flex-col items-center px-6 py-12">
                <div className="w-full max-w-xl">
                    <div className="mb-8">
                        <img src="/aircover.avif" alt="AirCover pour les hôtes" className="h-9" />
                        <p className="text-xs text-gray-500 mt-1">pour les hôtes</p>
                    </div>

                    <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                        Ajoutez un message à l'attention du voyageur
                    </h1>
                    <p className="text-sm text-gray-600 mb-8">
                        Votre demande sera d'abord envoyée à {reservation?.guestName || 'le voyageur'}.
                        Ajoutez toute information supplémentaire pouvant être utile.
                    </p>

                    <div className="relative">
                        <textarea
                            value={message}
                            onChange={e => e.target.value.length <= 1000 && setMessage(e.target.value)}
                            placeholder=""
                            rows={8}
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors resize-none"
                        />
                        <p className="text-right text-xs text-gray-500 mt-1">
                            {message.length} / 1000
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 px-8 py-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(`/airbnb/aircover/demande/${reservationId}/step2`)}
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

export default AircoverStep3
