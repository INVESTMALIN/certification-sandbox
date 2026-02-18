import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ThumbsUp } from 'lucide-react'
import reservations from '../../data/airbnb/reservations.json'
import { hydrateReservation } from '../../data/airbnb/dateUtils.js'

function CommentaireStep6() {
    const { reservationId } = useParams()
    const navigate = useNavigate()

    const rawReservation = reservations.find(r => r.id === reservationId) || reservations.find(r => r.id === 'res_airbnb_010')
    const reservation = rawReservation ? hydrateReservation(rawReservation) : null

    const [choice, setChoice] = useState(null) // 'oui' | 'non' | null
    const [reason, setReason] = useState('')

    const canContinue = choice === 'oui' || (choice === 'non' && reason.trim().length > 0)

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
                <div className="h-full bg-gray-900 w-5/6"></div>
            </div>

            {/* Contenu */}
            <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-6 py-12">

                {/* Icône pouce */}
                <div className="mb-4">
                    <ThumbsUp className="w-8 h-8 text-gray-900" strokeWidth={1.5} />
                </div>

                {/* Titre */}
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Recommanderiez-vous {reservation?.guestName} à d'autres hôtes ?
                </h1>
                <p className="text-sm text-gray-500 mb-8">
                    Votre réponse nous aidera à mieux comprendre ce que les hôtes apprécient chez leurs voyageurs. Nous garderons votre commentaire pour nous : il ne sera pas publié, et {reservation?.guestName} ne pourra pas le lire.
                </p>

                {/* Boutons Oui / Non */}
                <div className="flex items-center gap-3 mb-8">
                    <button
                        onClick={() => {
                            setChoice('oui')
                            setReason('')
                        }}
                        className={`px-6 py-2.5 rounded-full border text-sm font-medium transition-colors ${choice === 'oui'
                            ? 'border-gray-900 bg-white text-gray-900 ring-2 ring-gray-900'
                            : 'border-gray-300 text-gray-700 hover:border-gray-500'
                            }`}
                    >
                        Oui
                    </button>
                    <button
                        onClick={() => setChoice('non')}
                        className={`px-6 py-2.5 rounded-full border text-sm font-medium transition-colors ${choice === 'non'
                            ? 'border-gray-900 bg-white text-gray-900 ring-2 ring-gray-900'
                            : 'border-gray-300 text-gray-700 hover:border-gray-500'
                            }`}
                    >
                        Non
                    </button>
                </div>

                {/* Textarea si "Non" sélectionné */}
                {choice === 'non' && (
                    <div>
                        <hr className="mb-6 border-gray-200" />
                        <h2 className="text-base font-semibold text-gray-900 mb-4">
                            Vous ne recommandez pas {reservation?.guestName} ?
                        </h2>
                        <textarea
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder={`Nous aimerions savoir pourquoi, car vous lui avez attribué une bonne évaluation. (Champ requis)`}
                            rows={6}
                            className="w-full border border-gray-300 rounded-xl p-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 resize-none"
                        />
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 px-8 py-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(`/airbnb/commentaire/${reservationId}/step5`)}
                    className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Retour
                </button>
                <button
                    disabled={!canContinue}
                    onClick={() => navigate(`/airbnb/commentaire/${reservationId}/step7`)}
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

export default CommentaireStep6