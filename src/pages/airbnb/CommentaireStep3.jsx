import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import reservations from '../../data/airbnb/reservations.json'
import { hydrateReservation } from '../../data/airbnb/dateUtils.js'

const LABELS = {
    1: "N'a respecté aucune règle",
    2: "N'a pas respecté la plupart des règles",
    3: 'A respecté quelques règles',
    4: 'A respecté la plupart des règles',
    5: 'A respecté toutes les règles',
}

const TAGS = [
    "A effectué son séjour avec d'autres voyageurs non autorisés",
    'A filmé ou photographié le logement sans autorisation',
    "N'a pas respecté les heures calmes",
    "N'a pas respecté la date ou l'heure de départ",
    'Est arrivé trop tôt',
    'Autre',
]

function CommentaireStep3() {
    const { reservationId } = useParams()
    const navigate = useNavigate()

    const rawReservation = reservations.find(r => r.id === reservationId) || reservations.find(r => r.id === 'res_airbnb_010')
    const reservation = rawReservation ? hydrateReservation(rawReservation) : null

    const [hoveredStar, setHoveredStar] = useState(null)
    const [selectedStar, setSelectedStar] = useState(null)
    const [selectedTags, setSelectedTags] = useState([])
    const [autreText, setAutreText] = useState('')

    const activeStar = hoveredStar ?? selectedStar

    const toggleTag = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        )
    }

    // Suivant actif si note sélectionnée, et si note < 5 au moins un tag sélectionné
    const canContinue = selectedStar === 5 || (selectedStar !== null && selectedTags.length > 0)

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
                <div className="h-full bg-gray-900 w-2/6"></div>
            </div>

            {/* Contenu */}
            <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-6 py-12">

                {/* Icône règlement */}
                <div className="mb-4">
                    <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h7.5M8.25 9.75h7.5M8.25 12.75h4.5M6 3.75A2.25 2.25 0 013.75 6v12A2.25 2.25 0 006 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6z" />
                        <circle cx="5.25" cy="6.75" r="0.5" fill="currentColor" />
                        <circle cx="5.25" cy="9.75" r="0.5" fill="currentColor" />
                        <circle cx="5.25" cy="12.75" r="0.5" fill="currentColor" />
                    </svg>
                </div>

                {/* Titre */}
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                    Quelle a été l'attitude de votre voyageur, {reservation?.guestName}, vis-à-vis de votre règlement intérieur ?
                </h1>
                <p className="text-sm text-gray-500 mb-8">
                    Nous communiquerons ces informations à {reservation?.guestName} et à d'autres hôtes.
                </p>

                {/* Étoiles */}
                <div className="flex items-center gap-3 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(null)}
                            onClick={() => {
                                setSelectedStar(star)
                                // Reset tags si on repasse à 5 étoiles
                                if (star === 5) setSelectedTags([])
                            }}
                            className={`transition-transform hover:scale-110 ${selectedStar === star ? 'ring-2 ring-gray-900 ring-offset-2 rounded' : ''}`}
                        >
                            <svg
                                className="w-12 h-12"
                                viewBox="0 0 24 24"
                                fill={activeStar >= star ? '#FF385C' : 'none'}
                                stroke={activeStar >= star ? '#FF385C' : '#9ca3af'}
                                strokeWidth={1.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                        </button>
                    ))}
                </div>

                {/* Label note */}
                <p className="text-sm text-gray-600 mb-8">
                    {activeStar ? LABELS[activeStar] : 'Sélectionnez une note'}
                </p>

                {/* Section tags - visible uniquement si note < 5 */}
                {selectedStar !== null && selectedStar < 5 && (
                    <div>
                        <hr className="mb-6 border-gray-200" />
                        <h2 className="text-base font-semibold text-gray-900 mb-1">
                            Dites-nous ce qui s'est passé
                        </h2>
                        <p className="text-sm text-gray-500 mb-4">
                            Choisissez une ou plusieurs de ces options pour continuer.
                        </p>
                        <div className="flex flex-wrap gap-3 mb-6">
                            {TAGS.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={`px-4 py-2 rounded-full border text-sm transition-colors ${selectedTags.includes(tag)
                                        ? 'border-gray-900 bg-gray-900 text-white'
                                        : 'border-gray-300 text-gray-900 hover:border-gray-500'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        {/* Champ texte si "Autre" sélectionné */}
                        {selectedTags.includes('Autre') && (
                            <textarea
                                value={autreText}
                                onChange={(e) => setAutreText(e.target.value)}
                                placeholder="Décrivez ce qui s'est passé..."
                                rows={4}
                                className="w-full border border-gray-300 rounded-xl p-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900 resize-none"
                            />
                        )}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 px-8 py-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(`/airbnb/commentaire/${reservationId}/step2`)}
                    className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-700"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Retour
                </button>
                <button
                    disabled={!canContinue}
                    onClick={() => canContinue && navigate(`/airbnb/commentaire/${reservationId}/step4`)}
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

export default CommentaireStep3