import { useNavigate } from 'react-router-dom'
import AirbnbVoyageurHeader from '../../../components/airbnb/AirbnbVoyageurHeader'
import { getPropertyById, formatStayRange } from '../../../data/airbnb/reservationLookup'
import { getDemandes, formatMontant, aDemande } from '../../../data/airbnb/demandesArgent'

// Pastille de statut : orange tant que la demande est en cours, rouge pour un brouillon, aucune si close
const PASTILLES = {
    en_attente: 'bg-orange-500',
    refusee: 'bg-orange-500',
    assistance: 'bg-orange-500',
    brouillon: 'bg-[#FF385C]',
}

function LigneDemande({ demande }) {
    const navigate = useNavigate()
    const { reservation } = demande
    const property = getPropertyById(reservation.propertyId)
    const estBrouillon = demande.statut === 'brouillon'
    const titre = estBrouillon
        ? `Vous avez commencé à déposer une demande pour ${demande.prenom}`
        : `${demande.parVous ? 'Vous avez demandé' : aDemande(demande.auteurNom)} ${formatMontant(demande.montant)} € EUR à ${demande.prenom}`
    const pastille = PASTILLES[demande.statut]

    return (
        <li className="flex items-center gap-4 py-6" data-demande={demande.id}>
            <img
                src={reservation.guestAvatar}
                alt={reservation.guestName}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0 self-start"
            />
            <div className="flex-1 min-w-0">
                <p className="text-base font-semibold text-gray-900">{titre}</p>
                <p className="text-sm text-gray-600 mt-0.5">{demande.motifLabel}</p>
                <p className="text-sm text-gray-500 mt-0.5">
                    {reservation.confirmationCode} · {formatStayRange(reservation.checkIn, reservation.checkOut)}
                </p>
                <p className="text-sm text-gray-500 truncate">{property?.name}</p>
            </div>
            <div className="flex flex-col items-end gap-3 flex-shrink-0 w-64">
                <p className={`text-sm text-right ${pastille ? 'text-gray-900' : 'text-gray-500'}`}>
                    {/* Pastille dans le flux du texte pour rester collée au statut s'il passe sur deux lignes */}
                    {pastille && <span className={`inline-block w-2 h-2 rounded-full mr-2 align-middle ${pastille}`} />}
                    {demande.statutLabel}
                </p>
                {estBrouillon ? (
                    <button
                        onClick={() => navigate(demande.lien)}
                        className="px-5 py-2 rounded-lg text-sm font-semibold bg-gray-900 text-white hover:bg-gray-700 transition-colors"
                    >
                        Terminer
                    </button>
                ) : (
                    <button
                        onClick={() => navigate(demande.lien)}
                        className="px-5 py-2 rounded-lg text-sm font-semibold border border-gray-900 text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                        Vérifier les détails
                    </button>
                )}
            </div>
        </li>
    )
}

/** Centre de résolution : toutes les demandes d'argent de l'hôte. */
function CentreResolution() {
    const navigate = useNavigate()
    const demandes = getDemandes()

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}>
            <AirbnbVoyageurHeader />

            <main className="flex-1 flex flex-col items-center px-6 py-12">
                <div className="w-full max-w-4xl">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-2">Centre de résolution</h1>
                    <p className="text-base text-gray-600 mb-8">
                        Envoyez ou demandez de l'argent pour des frais, des services supplémentaires, des dommages ou des remboursements.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-8">
                        <button
                            onClick={() => navigate('/airbnb/demander-paiement/reservation?source=centre')}
                            className="px-6 py-3 rounded-lg text-sm font-semibold bg-gray-900 text-white hover:bg-gray-700 transition-colors"
                        >
                            Demander de l'argent
                        </button>
                        <button
                            onClick={() => navigate('/airbnb/demander-paiement/reservation?source=centre&action=envoyer')}
                            className="px-6 py-3 rounded-lg text-sm font-semibold border border-gray-900 text-gray-900 hover:bg-gray-50 transition-colors"
                        >
                            Envoyer de l'argent
                        </button>
                    </div>

                    <ul className="divide-y divide-gray-200 border-t border-gray-200">
                        {demandes.map(d => <LigneDemande key={`${d.source}-${d.id}`} demande={d} />)}
                    </ul>
                </div>
            </main>
        </div>
    )
}

export default CentreResolution
