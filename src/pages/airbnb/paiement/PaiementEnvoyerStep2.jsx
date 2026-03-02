import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import reservations from '../../../data/airbnb/reservations.json'
import properties from '../../../data/airbnb/properties.json'
import { hydrateReservation } from '../../../data/airbnb/dateUtils.js'

const MONTHS_FR = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
    'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']

const MAX_CHARS = 1000

function PaiementEnvoyerStep2() {
    const { reservationId } = useParams()
    const navigate = useNavigate()

    const [motif, setMotif] = useState(null) // 'logement' | 'autres'
    const [montant, setMontant] = useState('')
    const [commentaire, setCommentaire] = useState('')

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
    const prenom = reservation.guestName.split(' ')[0]

    const charsRestants = MAX_CHARS - commentaire.length
    const peutContinuer = motif !== null && parseFloat(montant) > 0

    const handleSuivant = () => {
        if (!peutContinuer) return
        navigate(`/airbnb/paiement/${reservationId}/envoyer/step3`)
    }

    const handleMontant = (e) => {
        const val = e.target.value.replace(/[^0-9.,]/g, '')
        setMontant(val)
    }

    const handleCommentaire = (e) => {
        if (e.target.value.length <= MAX_CHARS) {
            setCommentaire(e.target.value)
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}>

            {/* Header */}
            <header className="border-b border-gray-200">
                {/* Barre de progression */}
                <div className="h-0.5 bg-gray-200">
                    <div className="h-0.5 bg-gray-800 w-2/6" />
                </div>
                <div className="flex items-center justify-between px-8 py-4">
                    <img src="/airbnb-logo-simple.png" alt="Airbnb" className="h-7" />
                    {/* Breadcrumb centré */}
                    <div className="hidden md:flex items-center gap-2 text-sm">
                        <button
                            onClick={() => navigate(`/airbnb/paiement/${reservationId}/step1`)}
                            className="text-gray-500 hover:underline"
                        >
                            Envoyer un paiement
                        </button>
                        <span className="text-gray-400">›</span>
                        <span className="font-semibold text-gray-900">Ajouter des informations</span>
                    </div>
                    <button
                        onClick={() => navigate('/airbnb/dashboard')}
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
                        Envoyer un paiement
                    </h1>

                    {/* Bloc voyageur */}
                    <div className="mb-8">
                        <p className="text-base font-semibold text-gray-900 mb-3">
                            Envoyer à :
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

                    {/* Choix du motif */}
                    <div className="mb-6">
                        <p className="text-base font-semibold text-gray-900 mb-5">
                            À quoi correspond ce paiement ?
                        </p>

                        {/* Option 1 */}
                        <label
                            className="flex items-center gap-4 mb-4 cursor-pointer group"
                            onClick={() => setMotif('logement')}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                motif === 'logement'
                                    ? 'border-gray-900'
                                    : 'border-gray-400 group-hover:border-gray-600'
                            }`}>
                                {motif === 'logement' && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                                )}
                            </div>
                            <span className="text-sm text-gray-900">Logement sale ou annonce inexacte</span>
                        </label>

                        {/* Option 2 */}
                        <label
                            className="flex items-center gap-4 cursor-pointer group"
                            onClick={() => setMotif('autres')}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                motif === 'autres'
                                    ? 'border-gray-900'
                                    : 'border-gray-400 group-hover:border-gray-600'
                            }`}>
                                {motif === 'autres' && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                                )}
                            </div>
                            <span className="text-sm text-gray-900">Autres problèmes liés au voyage</span>
                        </label>
                    </div>

                    {/* Sous-section : montant + commentaire (apparaît quand un motif est sélectionné) */}
                    {motif && (
                        <div className="mt-8 flex flex-col gap-6">

                            {/* Séparateur */}
                            <div className="border-t border-gray-200" />

                            {/* Montant */}
                            <div>
                                <p className="text-base font-semibold text-gray-900 mb-3">
                                    Quel montant souhaitez-vous envoyer à {prenom} ?
                                </p>
                                <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-gray-900 transition-colors">
                                    <span className="text-gray-500 mr-3 text-sm font-medium">€</span>
                                    <div className="flex flex-col flex-1">
                                        <span className="text-xs text-gray-400 leading-none mb-0.5">Montant (EUR)</span>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            value={montant}
                                            onChange={handleMontant}
                                            placeholder=""
                                            className="text-sm text-gray-900 outline-none bg-transparent w-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Commentaire */}
                            <div>
                                <p className="text-base font-semibold text-gray-900 mb-1">
                                    Commentaire à l'attention de {prenom}
                                </p>
                                <p className="text-sm text-gray-500 mb-1">
                                    Expliquez-lui pourquoi vous envoyez un paiement.
                                </p>
                                <p className="text-sm text-gray-400 mb-2">
                                    {charsRestants.toLocaleString('fr-FR')} caractères restants
                                </p>
                                <textarea
                                    value={commentaire}
                                    onChange={handleCommentaire}
                                    rows={6}
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-900 transition-colors resize-none"
                                />
                            </div>

                        </div>
                    )}

                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 px-8 py-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(`/airbnb/paiement/${reservationId}/step1`)}
                    className="text-sm font-semibold text-gray-900 underline hover:text-gray-700 transition-colors flex items-center gap-1"
                >
                    ‹ Retour
                </button>
                <button
                    onClick={handleSuivant}
                    disabled={!peutContinuer}
                    className={`px-6 py-3 rounded-lg text-sm font-semibold transition-colors ${
                        peutContinuer
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

export default PaiementEnvoyerStep2
