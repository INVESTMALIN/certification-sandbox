import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, Pencil } from 'lucide-react'
import reservations from '../../data/airbnb/reservations.json'
import { hydrateReservation } from '../../data/airbnb/dateUtils.js'

const MAX_CHARS = 1000

function CommentaireStep5() {
    const { reservationId } = useParams()
    const navigate = useNavigate()

    const rawReservation = reservations.find(r => r.id === reservationId) || reservations.find(r => r.id === 'res_airbnb_010')
    const reservation = rawReservation ? hydrateReservation(rawReservation) : null

    const [text, setText] = useState('')

    const remaining = MAX_CHARS - text.length
    const canContinue = text.length > 0

    return (
        <div className="font-airbnb min-h-screen bg-white flex flex-col">

            {/* Header minimal */}
            <header className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
                <img src="/airbnb-logo-simple.png" alt="Airbnb" className="h-8" />
                <button
                    onClick={() => navigate('/airbnb/dashboard')}
                    className="text-sm font-medium text-gray-900 underline hover:text-gray-700"
                >
                    Enregistrer et quitter
                </button>
            </header>

            {/* Barre de progression */}
            <div className="h-0.5 bg-gray-200">
                <div className="h-full bg-gray-900 w-4/6"></div>
            </div>

            {/* Contenu */}
            <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-6 py-12">

                {/* Icône crayon */}
                <div className="mb-4">
                    <Pencil className="w-8 h-8 text-gray-900" strokeWidth={1.5} />
                </div>

                {/* Titre */}
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Rédiger un commentaire public
                </h1>
                <p className="text-sm text-gray-500 mb-8">
                    Votre commentaire sera visible par {reservation?.guestName} et par d'autres hôtes.
                </p>

                {/* Textarea */}
                <textarea
                    value={text}
                    onChange={(e) => {
                        if (e.target.value.length <= MAX_CHARS) {
                            setText(e.target.value)
                        }
                    }}
                    rows={8}
                    className="w-full border border-gray-300 rounded-xl p-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 resize-none"
                />

                {/* Compteur */}
                <p className="text-xs text-gray-500 mt-2">
                    <span className="font-semibold">{remaining}</span> caractères restants
                </p>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 px-8 py-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(`/airbnb/commentaire/${reservationId}/step4`)}
                    className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Retour
                </button>
                <button
                    disabled={!canContinue}
                    onClick={() => navigate(`/airbnb/commentaire/${reservationId}/step6`)}
                    className={`px-6 py-3 font-medium rounded-lg transition-colors ${canContinue
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

export default CommentaireStep5