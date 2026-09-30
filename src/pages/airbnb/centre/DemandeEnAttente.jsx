import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Hourglass } from 'lucide-react'
import AirbnbVoyageurHeader from '../../../components/airbnb/AirbnbVoyageurHeader'
import ParcoursBloque from '../../../components/airbnb/ParcoursBloque'
import ElementsRecap from '../../../components/airbnb/ElementsRecap'
import { getPropertyById, formatStayRange } from '../../../data/airbnb/reservationLookup'
import { formatMontant, aDemande, heuresRestantes } from '../../../data/airbnb/demandesArgent'
import { Fichiers, Etape } from './demandeCommon'
import { formatDateHeure } from './demandeFormat'

const MESSAGE_ANNULER = 'L\'annulation d\'une demande n\'est pas disponible dans cet exercice. Revenez en arrière pour consulter la demande.'

function Bloc({ titre, children }) {
    return (
        <div className="py-5 border-t border-gray-200">
            <p className="text-base font-semibold text-gray-900 mb-2">{titre}</p>
            {children}
        </div>
    )
}

/** Page détail d'une demande en attente de la réponse du voyageur. */
function DemandeEnAttente({ demande }) {
    const navigate = useNavigate()
    const [bloque, setBloque] = useState(false)
    const { reservation, prenom } = demande
    const property = getPropertyById(reservation.propertyId)
    const montant = `${formatMontant(demande.montant)} € EUR`
    const restantes = heuresRestantes(demande)

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}>
            <AirbnbVoyageurHeader />

            <main className="flex-1 px-6 py-10">
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
                    {/* Colonne principale */}
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
                            {aDemande(demande.auteurNom)} {montant} à {prenom}
                        </h1>

                        <div className="flex items-start gap-4 border border-gray-200 rounded-xl p-4 mb-8">
                            <Hourglass className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                            <div>
                                <p className="text-sm font-semibold text-gray-900">En attente</p>
                                <p className="text-sm text-gray-600 mt-1">
                                    En attente de la réponse de {prenom}. Si {prenom} refuse de payer la totalité du montant ou ne répond pas dans un délai de 72 heures, vous pouvez demander à Airbnb d'intervenir.
                                </p>
                            </div>
                        </div>

                        {/* Carte voyageur */}
                        <div className="flex items-center gap-4 mb-2">
                            <img src={reservation.guestAvatar} alt={reservation.guestName} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                            <div>
                                <p className="text-base font-semibold text-gray-900">{prenom}</p>
                                <p className="text-sm text-gray-600">
                                    {formatStayRange(reservation.checkIn, reservation.checkOut, true)} • {reservation.guestCount}
                                </p>
                                <p className="text-sm text-gray-600">{property?.name}</p>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Bloc titre="Motif"><p className="text-sm text-gray-700">{demande.motifLabel}</p></Bloc>
                            <Bloc titre="Montant"><p className="text-sm text-gray-700">{montant}</p></Bloc>
                            {demande.elements?.length > 0 && (
                                <Bloc titre={`Récapitulatif des éléments (${demande.elements.length})`}>
                                    <ElementsRecap elements={demande.elements} />
                                </Bloc>
                            )}
                            <Bloc titre="Pièces jointes"><Fichiers fichiers={demande.piecesJointes} /></Bloc>
                            <Bloc titre="Remarque">
                                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                                    {demande.remarque || <span className="italic text-gray-400">Aucune remarque</span>}
                                </p>
                            </Bloc>
                        </div>

                        <div className="border-t border-gray-200 pt-6 flex flex-col items-start gap-4">
                            <button
                                onClick={() => navigate(`/airbnb/messages?reservation=${reservation.id}`)}
                                className="px-6 py-3 rounded-lg text-sm font-semibold border border-gray-900 text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                                Envoyer un message au voyageur
                            </button>
                            <button
                                onClick={() => setBloque(true)}
                                className="text-sm font-semibold text-gray-900 underline"
                            >
                                Annuler la demande
                            </button>
                            <Link to="/airbnb/centre-resolution" className="text-sm font-semibold text-gray-900 underline">
                                ‹ Revenir au Centre de résolution
                            </Link>
                        </div>
                    </div>

                    {/* Résumé */}
                    <aside>
                        <div className="border border-gray-200 rounded-xl p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Résumé</h2>
                            <ol>
                                <Etape>
                                    <p className="text-sm font-semibold text-gray-900">{aDemande(demande.auteurNom)} {montant} à {prenom}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{formatDateHeure(demande.envoyeeLe)}</p>
                                </Etape>
                                <Etape>
                                    <p className="text-sm font-semibold text-gray-900">Demande envoyée à {prenom}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{formatDateHeure(demande.envoyeeLe)}</p>
                                </Etape>
                                <Etape type="attente" dernier>
                                    <p className="text-sm font-semibold text-gray-500">En attente de la réponse de {prenom}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {restantes > 0 ? `${restantes} heure${restantes > 1 ? 's' : ''} restante${restantes > 1 ? 's' : ''}` : 'Délai de réponse écoulé'}
                                    </p>
                                </Etape>
                            </ol>
                        </div>
                    </aside>
                </div>
            </main>

            {bloque && <ParcoursBloque message={MESSAGE_ANNULER} onRetour={() => setBloque(false)} />}
        </div>
    )
}

export default DemandeEnAttente
