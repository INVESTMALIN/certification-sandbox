import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { ChevronLeft, ShieldCheck, Shield, HelpCircle, ChevronRight, Printer, Pencil, Ban, Briefcase, Home } from 'lucide-react'
import AirbnbHeader from '../../components/airbnb/AirbnbHeader'
import reservations from '../../data/airbnb/reservations.json'
import guests from '../../data/airbnb/guests.json'
import properties from '../../data/airbnb/properties.json'
import { hydrateReservation } from '../../data/airbnb/dateUtils.js'

const FAQ = [
    {
        q: "Modifier une réservation de logement en tant qu'hôte",
        a: "Vous pouvez envoyer une demande de modification à votre voyageur. Si ce dernier accepte, la réservation sera modifiée.",
    },
    {
        q: "Lorsqu'un voyageur ne se présente pas pour une réservation",
        a: "Si le voyageur annule ou ne se présente pas, vos conditions d'annulation seront appliquées et tout versement correspondant vous sera remis.",
    },
    {
        q: "Si un voyageur vous met mal à l'aise",
        a: "Si un voyageur ne respecte pas votre règlement intérieur ou si son comportement vous a fait craindre pour votre sécurité, vous pouvez refuser sa demande de voyage ou annuler...",
    },
]

export default function AirbnbReservationRecap() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [showCode, setShowCode] = useState(false)
    const [openFaq, setOpenFaq] = useState(null)

    const raw = reservations.find(r => r.id === id)
    if (!raw) {
        return (
            <div className="font-airbnb min-h-screen bg-gray-50 flex flex-col">
                <AirbnbHeader />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500">Réservation introuvable.</p>
                </div>
            </div>
        )
    }

    const res = hydrateReservation(raw)
    const guest = guests.find(g => g.reservationIds.includes(id))
    const property = properties.find(p => p.propertyId === res.propertyId)

    const isStayInProgress = res.checkInOffset < 0 && res.checkOutOffset > 0
    const initials = res.guestName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

    const fmtDate = (d) => new Date(d).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
    const bookedDate = raw.bookedOnOffset !== undefined
        ? fmtDate(new Date(new Date().setDate(new Date().getDate() + raw.bookedOnOffset)))
        : '—'

    return (
        <div className="font-airbnb min-h-screen bg-gray-50 flex flex-col">
            <AirbnbHeader />

            <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6">

                {/* Back + Print row */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Retour
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-800 hover:border-gray-400 transition-colors"
                    >
                        <Printer className="w-4 h-4" />
                        Imprimer
                    </button>
                </div>

                {/* ── CARD 1 : Header réservation ── */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
                    <h1 className="text-xl font-bold text-gray-900 mb-4">Détails de la réservation</h1>

                    {/* Status + guest */}
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold text-[#1a8a7a] mb-1">
                                {isStayInProgress ? 'Séjour en cours' : 'Confirmée'}
                            </p>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{res.guestName}</h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {property?.name || '—'}
                                {property?.description ? ` · ${property.description}` : ''}
                            </p>
                            <p className="text-sm text-gray-600">
                                {fmtDate(res.checkIn)} – {fmtDate(res.checkOut)} ({res.nights} nuit{res.nights > 1 ? 's' : ''})
                            </p>
                            <p className="text-sm text-gray-600">{res.guestCount}</p>
                        </div>
                        {/* Avatar */}
                        {guest?.guestAvatar ? (
                            <img src={guest.guestAvatar} alt={res.guestName} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-sm font-bold">{initials}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── CARD 2 : Tout sur [guest] ── */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Tout sur {guest?.firstName || res.guestName.split(' ')[0]}</h2>
                    <div className="flex flex-col gap-3 mb-4">
                        {guest?.identityVerified && (
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                                <ShieldCheck className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                <span>Identité vérifiée</span>
                            </div>
                        )}
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <Briefcase className="w-5 h-5 text-gray-500 flex-shrink-0" />
                            {guest?.trips ? `${guest.trips} voyage${guest.trips > 1 ? 's' : ''}` : 'Aucun voyage pour le moment'}
                        </div>
                        {guest?.yearsOnAirbnb && (
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                                <Home className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                Membre d'Airbnb depuis {new Date().getFullYear() - guest.yearsOnAirbnb}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => navigate('/airbnb/voyageur/' + id)}
                        className="text-sm font-semibold text-[#000000] underline hover:opacity-80 transition-opacity"
                    >
                        Afficher le profil
                    </button>
                </div>

                {/* ── CARD 3 : Action buttons ── */}
                <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4">
                    <div className="flex gap-3">
                        <button className="flex-1 border border-gray-300 rounded-xl py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                            Envoyer un message
                        </button>
                        <button className="flex-1 border border-gray-300 rounded-xl py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                            Appeler
                        </button>
                    </div>
                    {res.guestPhone && (
                        <p className="text-xs text-gray-400 text-center mt-2">Téléphone : {res.guestPhone}</p>
                    )}
                </div>

                {/* ── CARD 4 : Détails réservation ── */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Détails de la réservation</h2>
                    <div className="flex flex-col divide-y divide-gray-100">

                        <div className="py-3">
                            <p className="text-sm font-medium text-gray-900 mb-0.5">Voyageurs</p>
                            <p className="text-sm text-gray-600">{res.guestCount}</p>
                        </div>

                        <div className="py-3 flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900 mb-0.5">Code d'accès suggéré</p>
                                <p className="text-sm text-gray-600">
                                    {showCode ? raw.suggestedAccessCode : '••••'}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowCode(v => !v)}
                                className="text-sm text-gray-700 underline ml-4"
                            >
                                {showCode ? 'Masquer' : 'Voir'}
                            </button>
                        </div>

                        <div className="py-3">
                            <p className="text-sm font-medium text-gray-900 mb-0.5">Arrivée</p>
                            <p className="text-sm text-gray-600">{fmtDate(res.checkIn)}</p>
                        </div>

                        <div className="py-3">
                            <p className="text-sm font-medium text-gray-900 mb-0.5">Départ</p>
                            <p className="text-sm text-gray-600">{fmtDate(res.checkOut)}</p>
                        </div>

                        <div className="py-3">
                            <p className="text-sm font-medium text-gray-900 mb-0.5">Date de réservation</p>
                            <p className="text-sm text-gray-600">{bookedDate}</p>
                        </div>

                        <div className="py-3">
                            <p className="text-sm font-medium text-gray-900 mb-0.5">Code de confirmation</p>
                            <p className="text-sm text-[#1a8a7a] font-medium">{raw.confirmationCode}</p>
                        </div>

                        <div className="py-3">
                            <button className="text-sm text-gray-700 underline">Afficher le calendrier</button>
                        </div>
                    </div>
                </div>

                {/* ── CARD 5 : Paiement voyageur ── */}
                {(() => {
                    const fmtEur = (v) => v.toFixed(2).replace('.', ',') + '\u00a0€'
                    const nights = res.nights
                    const nightlyRate = 40
                    const cleaningFee = 59
                    const touristTax = parseFloat((nights * 2.59).toFixed(2))
                    const voyageurTotal = parseFloat((nightlyRate * nights + cleaningFee + touristTax).toFixed(2))
                    const hostRoomRate = 50
                    const nightlyAdj = nights * 10
                    const serviceBase = parseFloat((hostRoomRate * nights + cleaningFee - nightlyAdj).toFixed(2))
                    const hostServiceFee = parseFloat((serviceBase * 0.186).toFixed(2))
                    const hostTotal = parseFloat((serviceBase - hostServiceFee).toFixed(2))
                    return (
                        <>
                            {/* Détails du paiement du voyageur */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Détails du paiement du voyageur</h2>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">{fmtEur(nightlyRate)} x {nights} nuit{nights > 1 ? 's' : ''}</span>
                                        <span className="text-gray-900">{fmtEur(nightlyRate * nights)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Frais de ménage</span>
                                        <span className="text-gray-900">{fmtEur(cleaningFee)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Frais de service voyageur</span>
                                        <span className="text-gray-900">{fmtEur(0)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Taxes de séjour</span>
                                        <span className="text-gray-900">{fmtEur(touristTax)}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold pt-2 border-t border-gray-200 mt-2">
                                        <span className="text-gray-900">Total (EUR)</span>
                                        <span className="text-gray-900">{fmtEur(voyageurTotal)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Versement de l'hôte */}
                            <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
                                <h2 className="text-lg font-bold text-gray-900 mb-4">Versement de l'hôte</h2>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Frais de chambre pour {nights} nuit{nights > 1 ? 's' : ''}</span>
                                        <span className="text-gray-900">{fmtEur(hostRoomRate * nights)}</span>
                                    </div>
                                    <button className="text-sm text-gray-900 underline font-medium text-left">Afficher les décomptes</button>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Frais de ménage</span>
                                        <span className="text-gray-900">{fmtEur(cleaningFee)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Ajustement du tarif par nuit</span>
                                        <span className="text-gray-900">-{fmtEur(nightlyAdj)}</span>
                                    </div>
                                    <button className="text-sm text-gray-900 underline font-medium text-left">Afficher les décomptes</button>
                                    <div className="flex justify-between">
                                        <span className="text-gray-700">Frais de service hôte (15,5&nbsp;% + TVA)</span>
                                        <span className="text-gray-900">-{fmtEur(hostServiceFee)}</span>
                                    </div>
                                    <div className="flex justify-between font-semibold pt-2 border-t border-gray-200 mt-2">
                                        <span className="text-gray-900">Total (EUR)</span>
                                        <span className="text-gray-900">{fmtEur(hostTotal)}</span>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 mt-4 divide-y divide-gray-100">
                                    <Link to={`/airbnb/facture/${res.id}`} className="flex items-center justify-between py-4 hover:bg-gray-50 transition-colors w-full">
                                        <span className="text-sm text-gray-900">Facture avec TVA *****</span>
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                    </Link>
                                    <button className="flex items-center justify-between py-4 hover:bg-gray-50 transition-colors text-left w-full">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <line x1="1" y1="10" x2="23" y2="10" strokeWidth="2" />
                                            </svg>
                                            <span className="text-sm text-gray-900">Historique des transactions</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                })()}

                {/* ── CARD 6 : Note calendrier ── */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-3">Note calendrier</h2>
                    <div className="flex items-center gap-2 mb-2">
                        <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M7 11V7a5 5 0 0110 0v4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-xs text-gray-500">Ajoutez un rappel privé pour ces dates, qui ne sera visible que pour vous</p>
                    </div>
                    <textarea
                        className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-gray-300"
                        rows={3}
                        placeholder="Écrivez un message"
                    />
                    <button className="mt-2 w-full py-2 border border-gray-200 rounded-lg text-sm text-gray-400 cursor-default">
                        Enregistrer
                    </button>

                </div>

                {/* ── CARD 7 : Aircover ── */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-4">
                    <img src="/aircover.avif" alt="AirCover" className="h-8 mb-1" />
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                        Une protection complète, à chaque fois que vous accueillez des voyageurs.
                    </p>
                    <Link to="/airbnb/aircover" className="text-sm text-gray-900 underline font-medium hover:text-[#FF385C] transition-colors">En savoir plus</Link>
                </div>

                {/* ── CARD 8 : Assistance ── */}
                <div className="bg-white rounded-2xl border border-gray-200 mb-4 overflow-hidden">
                    <h2 className="text-lg font-bold text-gray-900 px-6 pt-6 pb-3">Assistance</h2>
                    <div className="divide-y divide-gray-100">
                        <button
                            onClick={() => navigate(`/airbnb/reservation/${res.id}/modifier`)}
                            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <Pencil className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                <span className="text-sm text-gray-800">Modifier la réservation</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <Shield className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                <span className="text-sm text-gray-800">Assistance sécurité</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                        <button
                            onClick={() => navigate('/airbnb/centre-aide')}
                            className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <HelpCircle className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                <span className="text-sm text-gray-800">Consulter le Centre d'aide</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                        <button className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <Ban className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                <span className="text-sm text-gray-800">Annuler la réservation</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </button>
                    </div>
                    <div className="px-6 pb-6 pt-2">
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Si vous annulez, des frais pourraient vous être facturés et ces dates pourraient être bloquées. Si vous annulez trop souvent, vous pourriez perdre le statut de Superhôte et votre annonce pourrait être suspendue ou supprimée.
                        </p>
                        <button className="text-sm font-medium text-gray-900 underline mt-3 hover:text-gray-700">
                            En savoir plus sur l'annulation
                        </button>
                    </div>
                </div>

                {/* ── CARD 6 : FAQ ── */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Questions fréquentes</h2>
                    <div className="flex flex-col gap-1">
                        {FAQ.map((item, i) => (
                            <div key={i} className="border-b border-gray-100 last:border-0">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full text-left py-3 flex items-start justify-between gap-4"
                                >
                                    <span className="text-sm font-semibold text-[#1a8a7a]">{item.q}</span>
                                    <ChevronRight className={`w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5 transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                                </button>
                                {openFaq === i && (
                                    <p className="text-sm text-gray-600 pb-3 leading-relaxed">{item.a}</p>
                                )}
                                {openFaq !== i && (
                                    <button className="text-sm text-[#1a8a7a] underline pb-3 block">Lire la suite</button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button className="text-sm text-[#1a8a7a] underline mt-3">Afficher plus de sujets</button>
                </div>

            </main>
        </div>
    )
}
