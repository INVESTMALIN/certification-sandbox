import { useState } from 'react'
import { Bell, Ban, LifeBuoy } from 'lucide-react'
import AirbnbVoyageurHeader from '../../../components/airbnb/AirbnbVoyageurHeader'
import PersonAvatar from '../../../components/airbnb/PersonAvatar'
import ElementsRecap from '../../../components/airbnb/ElementsRecap'
import { getPropertyById, formatStayRange } from '../../../data/airbnb/reservationLookup'
import { dateFromHours, formatMontant } from '../../../data/airbnb/demandesArgent'
import { Fichiers, Etape } from './demandeCommon'
import { formatDate, formatDateEn } from './demandeFormat'

// Encadré selon le statut : refus en attente d'informations, ou assistance Airbnb en cours
const ENCADRES = {
    refusee: {
        icon: Bell,
        titre: 'Nous avons besoin de plus d\'informations',
        texte: hote => `${hote} peut consulter nos remarques et mettre à jour la demande avant de la soumettre à nouveau.`,
        derniere: 'Airbnb demande plus d\'informations',
    },
    assistance: {
        icon: LifeBuoy,
        titre: 'L\'assistance Airbnb intervient sur cette demande',
        texte: () => 'Un membre de l\'équipe d\'assistance examine la demande et les réponses de chacun. Vous recevrez sa décision par message.',
        derniere: 'Airbnb examine la demande',
    },
}

const EXTRAIT = 140

function ReponseTronquee({ texte }) {
    const [ouverte, setOuverte] = useState(false)
    if (texte.length <= EXTRAIT || ouverte) return <p className="text-sm text-gray-700">{texte}</p>
    return (
        <p className="text-sm text-gray-700">
            {texte.slice(0, EXTRAIT).trimEnd()}…{' '}
            <button onClick={() => setOuverte(true)} className="font-semibold text-gray-900 underline">+ More</button>
        </p>
    )
}

function Section({ titre, children }) {
    return (
        <section className="py-6 border-t border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{titre}</h2>
            {children}
        </section>
    )
}

/** Page détail d'une demande de dommages refusée ou prise en charge par Airbnb (consultation seule). */
function DemandeDossier({ demande }) {
    const [deplie, setDeplie] = useState(false)
    const { reservation, prenom, auteurNom } = demande
    const property = getPropertyById(reservation.propertyId)
    const encadre = ENCADRES[demande.statut] || ENCADRES.refusee
    const Icone = encadre.icon

    // Chronologie : évènements passés, puis étape en cours (point gris)
    const evenements = [{ contenu: (
        <div key="demande">
            <p className="text-sm font-semibold text-gray-900">{auteurNom} requested {formatMontant(demande.montant)} € from {prenom}</p>
            <p className="text-xs text-gray-500 mt-0.5">{formatDateEn(demande.envoyeeLe)}</p>
        </div>
    ) }]
    if (demande.refus) {
        evenements.push({ icon: Ban, contenu: (
            <div key="refus" className="space-y-2">
                <p className="text-sm font-semibold text-gray-900">{prenom} a refusé de payer</p>
                <p className="text-xs text-gray-500">{formatDate(dateFromHours(demande.refus.offsetHeures))}</p>
                <div>
                    <p className="text-sm font-semibold text-gray-900">Motif du refus</p>
                    <p className="text-sm text-gray-700">{demande.refus.motif}</p>
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-900">Réponse formulée par {prenom}</p>
                    <ReponseTronquee texte={demande.refus.reponse} />
                </div>
            </div>
        ) })
    }
    if (demande.examen) {
        evenements.push({ contenu: (
            <div key="examen" className="space-y-2">
                <p className="text-sm font-semibold text-gray-900">{auteurNom} a demandé à Airbnb d'examiner la situation</p>
                <p className="text-xs text-gray-500">{formatDate(dateFromHours(demande.examen.offsetHeures))}</p>
                <div>
                    <p className="text-sm font-semibold text-gray-900">Message privé envoyé par {auteurNom} à Airbnb</p>
                    <p className="text-sm text-gray-700">{demande.examen.message}</p>
                </div>
            </div>
        ) })
    }
    if (demande.verificationOffsetHeures !== undefined) {
        evenements.push({ contenu: (
            <div key="verification">
                <p className="text-sm font-semibold text-gray-900">Informations importantes vérifiées</p>
                <p className="text-xs text-gray-500 mt-0.5">{formatDate(dateFromHours(demande.verificationOffsetHeures))}</p>
            </div>
        ) })
    }
    const etapes = [
        ...evenements,
        { contenu: <p className="text-sm font-semibold text-gray-500">{encadre.derniere}</p>, attente: true },
    ]
    // Repliée : seuls les deux derniers évènements restent visibles
    const masquees = deplie ? 0 : Math.max(0, etapes.length - 2)
    const visibles = etapes.slice(masquees)

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}>
            <AirbnbVoyageurHeader modeHote />

            <main className="flex-1 px-6 py-10">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-6">Demande de remboursement</h1>

                    <div className="flex items-start gap-4 border border-gray-200 rounded-xl p-4 mb-8">
                        <Icone className="w-6 h-6 text-gray-900 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                        <div>
                            <p className="text-sm font-semibold text-gray-900">{encadre.titre}</p>
                            <p className="text-sm text-gray-600 mt-1">{encadre.texte(auteurNom)}</p>
                        </div>
                    </div>

                    <Section titre="Chronologie">
                        {masquees > 0 && (
                            <button
                                onClick={() => setDeplie(true)}
                                className="flex items-center gap-3 mb-6 text-left"
                            >
                                <span className="text-sm font-semibold text-gray-900 underline">Show more</span>
                                <span className="text-sm text-gray-500">{masquees} past events</span>
                            </button>
                        )}
                        <ol>
                            {visibles.map((e, i) => (
                                <Etape key={i} type={e.attente ? 'attente' : 'fait'} icon={e.icon} dernier={i === visibles.length - 1}>
                                    {e.contenu}
                                </Etape>
                            ))}
                        </ol>
                    </Section>

                    <Section titre={`Pièces justificatives envoyées par ${auteurNom}`}>
                        <Fichiers fichiers={demande.piecesJustificatives} />
                    </Section>

                    <Section titre="Voyageur et réservation">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="text-sm font-semibold text-gray-900">{reservation.guestName}</p>
                                <p className="text-sm text-gray-600">{formatStayRange(reservation.checkIn, reservation.checkOut, true)}</p>
                                <p className="text-sm text-gray-600">{property?.name}</p>
                            </div>
                            <img src={reservation.guestAvatar} alt={reservation.guestName} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                        </div>
                    </Section>

                    <Section titre="Dépôt de garantie ou assurance dommages">
                        <p className="text-sm text-gray-700">Non requis</p>
                    </Section>

                    <Section titre="Demande gérée par">
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-sm text-gray-700">{auteurNom}</p>
                            <PersonAvatar src={demande.auteurAvatar} nom={auteurNom} />
                        </div>
                    </Section>

                    <Section titre={`Message envoyé par ${auteurNom} pour ${prenom}`}>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{demande.messageVoyageur}</p>
                    </Section>

                    <Section titre="Date des faits">
                        <p className="text-sm text-gray-700">{demande.dateFaits ? formatDate(demande.dateFaits) : '—'}</p>
                    </Section>

                    <Section titre="Total demandé">
                        <p className="text-sm text-gray-700">{formatMontant(demande.montant)} € EUR</p>
                    </Section>

                    {demande.elements?.length > 0 && (
                        <Section titre={`Récapitulatif des éléments (${demande.elements.length})`}>
                            <ElementsRecap elements={demande.elements} />
                        </Section>
                    )}
                </div>
            </main>
        </div>
    )
}

export default DemandeDossier
