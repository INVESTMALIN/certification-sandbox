import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import reservations from '../../../data/airbnb/reservations.json'
import properties from '../../../data/airbnb/properties.json'
import { hydrateReservation } from '../../../data/airbnb/dateUtils.js'

const MONTHS_FR = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
    'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']

function PaiementStep1() {
    const { reservationId } = useParams()
    const navigate = useNavigate()
    const [choix, setChoix] = useState(null) // 'envoyer' | 'demander'

    const rawRes = reservations.find(r => r.id === reservationId) || reservations[0]
    const reservation = hydrateReservation(rawRes)
    const property = properties.find(p => p.propertyId === reservation.propertyId) || properties[0]

    const ci = new Date(reservation.checkIn)
    const co = new Date(reservation.checkOut)
    const mois = MONTHS_FR[ci.getMonth()]
    const annee = ci.getFullYear()
    const datesLabel = ci.getMonth() === co.getMonth() && ci.getFullYear() === co.getFullYear()
        ? `${ci.getDate()}–${co.getDate()} ${mois} ${annee}`
        : `${ci.getDate()} ${mois}–${co.getDate()} ${MONTHS_FR[co.getMonth()]} ${annee}`

    const guestCount = parseInt(reservation.guestCount) || 1
    const voyageurLabel = `${guestCount} voyageur${guestCount > 1 ? 's' : ''}`

    const handleSuivant = () => {
        if (!choix) return
        if (choix === 'envoyer') {
            navigate(`/airbnb/paiement/${reservationId}/envoyer/step2`)
        } else {
            navigate(`/airbnb/paiement/${reservationId}/demander/step2`)
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}>

            {/* Header */}
            <header className="border-b border-gray-200">
                {/* Barre de progression */}
                <div className="h-0.5 bg-gray-200">
                    <div className="h-0.5 bg-gray-800 w-1/6" />
                </div>
                <div className="flex items-center justify-between px-8 py-4">
                    <img src="/airbnb-logo-simple.png" alt="Airbnb" className="h-7" />
                    <span className="text-sm font-medium text-gray-700 hidden md:block">
                        Envoyer un paiement ou demander un remboursement
                    </span>
                    <button
                        onClick={() => navigate(-1)}
                        className="text-sm font-semibold text-gray-900 underline hover:text-gray-700 transition-colors"
                    >
                        Quitter
                    </button>
                </div>
            </header>

            {/* Contenu principal */}
            <main className="flex-1 flex flex-col items-center px-6 py-12">
                <div className="w-full max-w-xl">

                    <h1 className="text-3xl font-semibold text-gray-900 mb-8 leading-tight">
                        Envoyer un paiement ou demander un remboursement
                    </h1>

                    {/* Bloc voyageur */}
                    <div className="mb-8">
                        <p className="text-base font-semibold text-gray-900 mb-3">
                            Paiement ou demande à l'intention de :
                        </p>
                        <div className="flex items-center gap-4">
                            <img
                                src={reservation.guestAvatar}
                                alt={reservation.guestName}
                                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                            />
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{reservation.guestName}</p>
                                <p className="text-sm text-gray-500">{datesLabel} • {voyageurLabel}</p>
                                <p className="text-sm text-gray-500">{property.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Séparateur */}
                    <div className="border-t border-gray-200 mb-8" />

                    {/* Choix */}
                    <div className="mb-8">
                        <p className="text-base font-semibold text-gray-900 mb-5">
                            Que souhaitez-vous faire ?
                        </p>

                        <label
                            className="flex items-center gap-4 mb-4 cursor-pointer group"
                            onClick={() => setChoix('envoyer')}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                choix === 'envoyer'
                                    ? 'border-gray-900'
                                    : 'border-gray-400 group-hover:border-gray-600'
                            }`}>
                                {choix === 'envoyer' && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                                )}
                            </div>
                            <span className="text-sm text-gray-900">Envoyer un paiement</span>
                        </label>

                        <label
                            className="flex items-center gap-4 cursor-pointer group"
                            onClick={() => setChoix('demander')}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                choix === 'demander'
                                    ? 'border-gray-900'
                                    : 'border-gray-400 group-hover:border-gray-600'
                            }`}>
                                {choix === 'demander' && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                                )}
                            </div>
                            <span className="text-sm text-gray-900">Demander un paiement</span>
                        </label>
                    </div>

                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 px-8 py-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="text-sm font-semibold text-gray-900 underline hover:text-gray-700 transition-colors flex items-center gap-1"
                >
                    ‹ Retour
                </button>
                <button
                    onClick={handleSuivant}
                    disabled={!choix}
                    className={`px-6 py-3 rounded-lg text-sm font-semibold transition-colors ${
                        choix
                            ? 'bg-gray-900 text-white hover:bg-gray-800'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                    Suivant
                </button>
            </footer>

        </div>
    )
}

export default PaiementStep1
