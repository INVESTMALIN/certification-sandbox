import { useNavigate } from 'react-router-dom'

/**
 * Gabarit des écrans « Demander un paiement » du parcours de litige :
 * logo, titre centré, Quitter, barre de progression, pied avec ‹ Retour.
 */
function DemandePaiementLayout({ progress, onRetour, titre = 'Demander un paiement', children }) {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}>
            <header className="border-b border-gray-200">
                <div className="h-0.5 bg-gray-200">
                    <div className={`h-0.5 bg-gray-800 ${progress}`} />
                </div>
                <div className="flex items-center justify-between px-8 py-4">
                    <img src="/airbnb-logo-simple.png" alt="Airbnb" className="h-7" />
                    <span className="text-sm font-medium text-gray-700 hidden md:block">{titre}</span>
                    <button
                        onClick={() => navigate('/airbnb/dashboard')}
                        className="text-sm font-semibold text-gray-900 underline hover:text-gray-700 transition-colors"
                    >
                        Quitter
                    </button>
                </div>
            </header>

            <main className="flex-1 flex flex-col items-center px-6 py-12">
                <div className="w-full max-w-xl">{children}</div>
            </main>

            <footer className="border-t border-gray-200 px-8 py-4">
                <button
                    onClick={onRetour}
                    className="text-sm font-semibold text-gray-900 underline hover:text-gray-700 transition-colors"
                >
                    ‹ Retour
                </button>
            </footer>
        </div>
    )
}

export default DemandePaiementLayout
