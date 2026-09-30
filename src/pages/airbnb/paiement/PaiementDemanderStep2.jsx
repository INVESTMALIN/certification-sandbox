import { useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { CloudUpload } from 'lucide-react'
import ParcoursBloque from '../../../components/airbnb/ParcoursBloque'
import ReservationIntrouvable from '../../../components/airbnb/ReservationIntrouvable'
import { getReservationById, getPropertyById, getClaimIneligibility, getFirstName, ELIGIBILITY_MESSAGES } from '../../../data/airbnb/reservationLookup'
import { addDemandeEnvoyee } from '../../../data/airbnb/demandesArgent'

const REMARQUE_MAX = 1000

const MONTHS_FR = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin',
    'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.']

function PaiementDemanderStep2() {
    const { reservationId } = useParams()
    const navigate = useNavigate()

    const [searchParams] = useSearchParams()

    const [motif, setMotif] = useState(null) // 'services' | 'degats' | 'modifier'
    const [bloque, setBloque] = useState(null) // message de l'écran bloquant
    // Formulaire « Services supplémentaires », déplié sous l'option
    const [montantServices, setMontantServices] = useState('')
    const [remarque, setRemarque] = useState('')

    // Recherche par code (parcours litige ou Centre de résolution) : retour à la recherche ;
    // sinon au choix envoyer / demander
    const source = searchParams.get('source')
    const codeParam = encodeURIComponent(searchParams.get('code') || '')
    const retourUrl = source === 'centre'
        ? `/airbnb/demander-paiement/reservation?source=centre&code=${codeParam}`
        : source === 'litige'
            ? `/airbnb/demander-paiement/reservation?code=${codeParam}`
            : `/airbnb/paiement/${reservationId}/step1`

    const reservation = getReservationById(reservationId)
    if (!reservation) return <ReservationIntrouvable />
    const property = getPropertyById(reservation.propertyId)

    const ci = new Date(reservation.checkIn)
    const co = new Date(reservation.checkOut)
    const mois = MONTHS_FR[ci.getMonth()]
    const annee = ci.getFullYear()
    const datesLabel = ci.getMonth() === co.getMonth() && ci.getFullYear() === co.getFullYear()
        ? `${ci.getDate()}–${co.getDate()} ${mois} ${annee}`
        : `${ci.getDate()} ${mois}–${co.getDate()} ${MONTHS_FR[co.getMonth()]} ${annee}`

    const guestCount = parseInt(reservation.guestCount) || 1
    const voyageurLabel = `${guestCount} voyageur${guestCount > 1 ? 's' : ''}`

    const prenom = getFirstName(reservation.guestName)
    const servicesComplet = parseFloat(montantServices) > 0 && remarque.trim() !== ''
    const peutContinuer = motif === 'services' ? servicesComplet : motif !== null

    const choisirMotif = (valeur) => setMotif(valeur)

    const handleSuivant = () => {
        // Services supplémentaires : la demande est envoyée, puis sa page détail s'ouvre
        if (motif === 'services') {
            if (!servicesComplet) return
            const id = addDemandeEnvoyee({
                reservationId,
                motif: 'services',
                montant: parseFloat(montantServices),
                remarque: remarque.trim(),
                piecesJointes: [],
            })
            navigate(`/airbnb/centre-resolution/demande/${id}`)
            return
        }
        // Modification des dates ou des voyageurs : page de modification existante
        if (motif === 'modifier') {
            navigate(`/airbnb/reservation/${reservationId}/modifier`)
            return
        }
        if (motif !== 'degats') return
        // Même règle que la recherche par code : séjour terminé depuis 14 jours au plus
        const ineligibilite = getClaimIneligibility(reservation)
        if (ineligibilite) {
            setBloque(ELIGIBILITY_MESSAGES[ineligibilite])
            return
        }
        navigate(`/airbnb/aircover/demande/${reservationId}`)
    }

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}>

            {/* Header */}
            <header className="border-b border-gray-200">
                {/* Barre de progression */}
                <div className="h-0.5 bg-gray-200">
                    <div className="h-0.5 bg-gray-800 w-2/6" />
                </div>
                <div className="flex items-center justify-between px-8 py-4">
                    <img src="/airbnb-logo-simple.png" alt="Airbnb" className="h-7" />
                    {/* Breadcrumb centré */}
                    <div className="hidden md:flex items-center gap-2 text-sm">
                        <button
                            onClick={() => navigate(retourUrl)}
                            className="text-gray-500 hover:underline"
                        >
                            Demander un paiement
                        </button>
                        <span className="text-gray-400">›</span>
                        <span className="font-semibold text-gray-900">Ajouter des informations</span>
                    </div>
                    <button
                        onClick={() => navigate('/airbnb/dashboard')}
                        className="text-sm font-semibold text-gray-900 underline hover:text-gray-700 transition-colors"
                    >
                        Quitter
                    </button>
                </div>
            </header>

            {/* Contenu principal */}
            <main className="flex-1 flex flex-col items-center px-6 py-12">
                <div className="w-full max-w-xl">

                    <h1 className="text-3xl font-semibold text-gray-900 mb-8 leading-tight">
                        Demander un paiement
                    </h1>

                    {/* Bloc voyageur */}
                    <div className="mb-8">
                        <p className="text-base font-semibold text-gray-900 mb-3">
                            Demande à l'intention de :
                        </p>
                        <div className="flex items-center gap-4">
                            <img
                                src={reservation.guestAvatar}
                                alt={reservation.guestName}
                                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                            />
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{reservation.guestName}</p>
                                <p className="text-sm text-gray-500">{datesLabel} • {voyageurLabel}</p>
                                <p className="text-sm text-gray-500">{property?.name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Séparateur */}
                    <div className="border-t border-gray-200 mb-8" />

                    {/* Choix du motif */}
                    <div className="mb-6">
                        <p className="text-base font-semibold text-gray-900 mb-5">
                            À quoi correspond cette demande ?
                        </p>

                        {/* Option 1 */}
                        <label
                            className="flex items-center gap-4 mb-4 cursor-pointer group"
                            onClick={() => choisirMotif('services')}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${motif === 'services'
                                    ? 'border-gray-900'
                                    : 'border-gray-400 group-hover:border-gray-600'
                                }`}>
                                {motif === 'services' && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                                )}
                            </div>
                            <span className="text-sm text-gray-900">Services supplémentaires</span>
                        </label>

                        {/* Formulaire déplié sous l'option, comme dans la vraie procédure */}
                        {motif === 'services' && (
                            <div className="ml-9 mb-6 space-y-6">
                                <p className="text-sm text-gray-600">
                                    Demandez un paiement pour des services ou des articles fournis en plus de la réservation (par exemple : repas, frais de transport ou équipements non compris dans la description de l'annonce).
                                </p>

                                <div>
                                    <p className="text-sm font-semibold text-gray-900 mb-2">
                                        Quel montant souhaitez-vous demander à {prenom} ?
                                    </p>
                                    <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-3 focus-within:border-gray-900 transition-colors">
                                        <span className="text-sm text-gray-900">€</span>
                                        <input
                                            type="number"
                                            min="0"
                                            value={montantServices}
                                            onChange={e => setMontantServices(e.target.value)}
                                            placeholder="Montant (EUR)"
                                            aria-label="Montant (EUR)"
                                            className="flex-1 text-sm text-gray-900 focus:outline-none bg-transparent"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-900 mb-1">Pièces jointes</p>
                                    <p className="text-sm text-gray-500 mb-3">
                                        (Facultatif) Ajoutez des photos pertinentes, notamment celles de reçus ou de toute autre pièce justificative. Assurez-vous que les photos soient claires et le texte bien lisible, notamment le prix et le nom des articles. Formats acceptés : PNG, JPG ou PDF
                                    </p>
                                    {/* Zone d'envoi simulée */}
                                    <div className="border border-dashed border-gray-400 rounded-xl py-8 flex flex-col items-center gap-1 cursor-default">
                                        <CloudUpload className="w-6 h-6 text-gray-600" />
                                        <p className="text-sm font-semibold text-gray-900 underline">Télécharger les fichiers</p>
                                        <p className="text-sm text-gray-500">ou faites-les glisser ici</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-semibold text-gray-900 mb-1">Remarque</p>
                                    <p className="text-sm text-gray-500 mb-3">Expliquez à {prenom} pourquoi vous demandez un paiement.</p>
                                    <textarea
                                        value={remarque}
                                        onChange={e => setRemarque(e.target.value.slice(0, REMARQUE_MAX))}
                                        rows={5}
                                        aria-label="Remarque"
                                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors resize-none"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">{REMARQUE_MAX - remarque.length} caractères restants</p>
                                </div>
                            </div>
                        )}

                        {/* Option 2 */}
                        <label
                            className="flex items-center gap-4 mb-4 cursor-pointer group"
                            onClick={() => choisirMotif('degats')}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${motif === 'degats'
                                    ? 'border-gray-900'
                                    : 'border-gray-400 group-hover:border-gray-600'
                                }`}>
                                {motif === 'degats' && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                                )}
                            </div>
                            <span className="text-sm text-gray-900">Dégâts, éléments manquants ou nettoyage imprévu</span>
                        </label>

                        {/* Option 3 */}
                        <label
                            className="flex items-center gap-4 cursor-pointer group"
                            onClick={() => choisirMotif('modifier')}
                        >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${motif === 'modifier'
                                    ? 'border-gray-900'
                                    : 'border-gray-400 group-hover:border-gray-600'
                                }`}>
                                {motif === 'modifier' && (
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />
                                )}
                            </div>
                            <span className="text-sm text-gray-900">Modifier les dates ou les voyageurs</span>
                        </label>
                    </div>

                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 px-8 py-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(retourUrl)}
                    className="text-sm font-semibold text-gray-900 underline hover:text-gray-700 transition-colors flex items-center gap-1"
                >
                    ‹ Retour
                </button>
                <button
                    onClick={handleSuivant}
                    disabled={!peutContinuer}
                    className={`px-6 py-3 rounded-lg text-sm font-semibold transition-colors ${peutContinuer
                            ? 'bg-gray-900 text-white hover:bg-gray-800'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    Suivant
                </button>
            </footer>

            {bloque && <ParcoursBloque message={bloque} onRetour={() => setBloque(null)} />}
        </div>
    )
}

export default PaiementDemanderStep2
