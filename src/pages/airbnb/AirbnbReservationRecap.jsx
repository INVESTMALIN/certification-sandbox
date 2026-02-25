import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ChevronLeft, ShieldCheck, Shield, HelpCircle, ChevronRight, Printer } from 'lucide-react'
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
                            <span className="text-lg">🧳</span>
                            {guest?.trips ? `${guest.trips} voyage${guest.trips > 1 ? 's' : ''}` : 'Aucun voyage pour le moment'}
                        </div>
                        {guest?.yearsOnAirbnb && (
                            <div className="flex items-center gap-3 text-sm text-gray-700">
                                <span className="text-lg">🏠</span>
                                Membre d'Airbnb depuis {new Date().getFullYear() - guest.yearsOnAirbnb}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => navigate('/airbnb/voyageur/' + id)}
                        className="text-sm font-semibold text-[#FF385C] underline hover:opacity-80 transition-opacity"
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

                {/* ── CARD 5 : Assistance ── */}
                <div className="bg-white rounded-2xl border border-gray-200 mb-4 overflow-hidden">
                    <h2 className="text-lg font-bold text-gray-900 px-6 pt-6 pb-3">Assistance</h2>
                    <div className="divide-y divide-gray-100">
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
