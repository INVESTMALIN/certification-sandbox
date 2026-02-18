import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, MessageSquare } from 'lucide-react'

const MAX_CHARS = 1000

function CommentaireStep7() {
    const { reservationId } = useParams()
    const navigate = useNavigate()
    const [text, setText] = useState('')

    const remaining = MAX_CHARS - text.length

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

            {/* Barre de progression complète */}
            <div className="h-0.5 bg-gray-900"></div>

            {/* Contenu */}
            <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-6 py-12">

                {/* Icône message */}
                <div className="mb-4">
                    <MessageSquare className="w-8 h-8 text-gray-900" strokeWidth={1.5} />
                </div>

                {/* Titre */}
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Rédiger un message privé
                </h1>
                <p className="text-sm text-gray-500 mb-8">
                    Souhaiteriez-vous dire autre chose à {/* nom dynamique pas nécessaire ici */ 'ce voyageur'} ?
                </p>

                {/* Textarea */}
                <textarea
                    value={text}
                    onChange={(e) => {
                        if (e.target.value.length <= MAX_CHARS) {
                            setText(e.target.value)
                        }
                    }}
                    placeholder="Ce message sera uniquement visible par le voyageur (facultatif)"
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
                    onClick={() => navigate(`/airbnb/commentaire/${reservationId}/step6`)}
                    className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Retour
                </button>
                <button
                    onClick={() => navigate('/airbnb/dashboard')}
                    className="px-6 py-3 bg-[#FF385C] text-white font-medium rounded-lg hover:bg-[#E61E4D] transition-colors"
                >
                    Envoyer
                </button>
            </footer>
        </div>
    )
}

export default CommentaireStep7