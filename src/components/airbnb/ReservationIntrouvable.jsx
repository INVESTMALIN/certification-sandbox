import { useNavigate } from 'react-router-dom'

/** Affiché quand l'id de réservation de l'URL ne correspond à aucune réservation. */
function ReservationIntrouvable() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6" style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}>
            <h1 className="text-2xl font-semibold text-gray-900 mb-3">Réservation introuvable</h1>
            <p className="text-sm text-gray-600 mb-8">Cette réservation n'existe pas ou n'est plus disponible.</p>
            <button
                onClick={() => navigate('/airbnb/dashboard')}
                className="px-6 py-3 rounded-xl text-sm font-semibold bg-gray-900 text-white hover:bg-gray-700 transition-colors"
            >
                Retour au tableau de bord
            </button>
        </div>
    )
}

export default ReservationIntrouvable
