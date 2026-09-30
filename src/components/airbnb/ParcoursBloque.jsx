import { AlertCircle } from 'lucide-react'

/**
 * Écran explicatif bloquant affiché quand l'apprenant choisit une réponse
 * hors du parcours de déclaration de litige. Seule sortie : Retour.
 */
function ParcoursBloque({ message, onRetour }) {
    return (
        <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="parcours-bloque-titre"
            className="fixed inset-0 z-50 bg-white flex flex-col"
            style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}
        >
            <header className="flex items-center px-8 py-4 border-b border-gray-200">
                <img src="/airbnb-logo-simple.png" alt="Airbnb" className="h-7" />
            </header>

            <main className="flex-1 flex flex-col items-center justify-center px-6 py-12">
                <div className="w-full max-w-xl">
                    <AlertCircle className="w-10 h-10 text-gray-900 mb-6" strokeWidth={1.5} />
                    <h1 id="parcours-bloque-titre" className="text-2xl font-semibold text-gray-900 mb-4">
                        Vous ne pouvez pas continuer avec cette réponse
                    </h1>
                    <p className="text-base text-gray-600 leading-relaxed">{message}</p>
                </div>
            </main>

            <footer className="border-t border-gray-200 px-8 py-4">
                <button
                    onClick={onRetour}
                    autoFocus
                    className="text-sm font-semibold text-gray-900 underline hover:text-gray-700 transition-colors"
                >
                    ‹ Retour
                </button>
            </footer>
        </div>
    )
}

export default ParcoursBloque
