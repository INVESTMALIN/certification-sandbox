import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

// Largeur de la barre de progression par étape (dépôt → récap)
const PROGRESS = ['w-1/6', 'w-2/6', 'w-3/6', 'w-4/6', 'w-5/6']

/**
 * Gabarit commun des écrans AirCover, aligné sur la vraie procédure :
 * flèche retour en haut, barre de progression, logo AirCover pour les hôtes,
 * pied de page « Enregistrer et quitter » à gauche et action à droite.
 */
function AircoverLayout({ step, onRetour, footerAction, children }) {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}>

            <header className="flex items-center px-8 py-4">
                <button
                    type="button"
                    onClick={onRetour}
                    aria-label="Retour"
                    className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-900" />
                </button>
            </header>

            <div className="h-0.5 bg-gray-100">
                <div className={`h-full bg-gray-800 transition-all ${PROGRESS[step - 1]}`} />
            </div>

            <main className="flex-1 flex flex-col items-center px-6 py-12">
                <div className="w-full max-w-xl">
                    <div className="mb-8">
                        <img src="/aircover.avif" alt="AirCover pour les hôtes" className="h-9" />
                        <p className="text-xs text-gray-500 mt-1">pour les hôtes</p>
                    </div>
                    {children}
                </div>
            </main>

            <footer className="border-t border-gray-200 px-8 py-4 flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => navigate('/airbnb/dashboard')}
                    className="text-sm font-semibold text-gray-900 underline hover:text-gray-700 transition-colors"
                >
                    Enregistrer et quitter
                </button>
                {footerAction}
            </footer>
        </div>
    )
}

/** Bouton principal du pied de page, grisé tant que l'étape n'est pas complète. */
export function FooterButton({ onClick, disabled, children, variant = 'dark' }) {
    const enabled = variant === 'rausch'
        ? 'bg-[#FF385C] text-white hover:bg-[#e0314f]'
        : 'bg-gray-900 text-white hover:bg-gray-700'
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={`px-6 py-3 rounded-xl text-sm font-semibold transition-colors ${disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : enabled}`}
        >
            {children}
        </button>
    )
}

export default AircoverLayout
