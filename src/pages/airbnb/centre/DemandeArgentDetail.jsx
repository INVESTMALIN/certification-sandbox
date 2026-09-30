import { useParams, Link } from 'react-router-dom'
import { getDemandeById } from '../../../data/airbnb/demandesArgent'
import DemandeEnAttente from './DemandeEnAttente'
import DemandeDossier from './DemandeDossier'

/** Détail d'une demande du Centre de résolution : modèle selon le statut. */
function DemandeArgentDetail() {
    const { id } = useParams()
    const demande = getDemandeById(id)

    if (!demande) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6" style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}>
                <h1 className="text-2xl font-semibold text-gray-900 mb-3">Demande introuvable</h1>
                <Link to="/airbnb/centre-resolution" className="text-sm font-semibold text-gray-900 underline">
                    ‹ Revenir au Centre de résolution
                </Link>
            </div>
        )
    }
    // Refusée ou prise en charge par Airbnb : dossier de remboursement ; sinon demande en attente
    if (demande.statut === 'refusee' || demande.statut === 'assistance') return <DemandeDossier demande={demande} />
    return <DemandeEnAttente demande={demande} />
}

export default DemandeArgentDetail
