import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Settings, X, Phone, Star, ShieldCheck, ChevronRight, Plus, Smile, AlertCircle, HelpCircle, Trophy, MapPin, Home } from 'lucide-react'
import AirbnbHeader from '../../components/airbnb/AirbnbHeader'

// ─── DONNÉES DES CONVERSATIONS ────────────────────────────────────────────────
const conversations = [
    {
        id: 'conv_001',
        participants: 'Anaëlle et 2 autres',
        avatar: 'https://i.pravatar.cc/150?img=10',
        time: '08:42',
        preview: 'Nous : Bonjour Anaëlle, Merci pour votre réservation !',
        isUnread: false,
        status: '● Confirmée · 20–24 févr. · 2791',
        reservation: {
            guestName: 'Anaëlle Fontaine',
            listingId: '1405',
            listingName: 'Appartement lumineux avec vue sur jardin',
            nights: 4,
            guestCount: '2 voyageurs',
            checkIn: 'Jeu. 20 févr. 2026',
            checkOut: 'Lun. 24 févr. 2026',
            bookedOn: '5 déc. 2025',
            confirmCode: 'HM4AB2C6DE',
            accessCode: '2468',
            totalAmount: '520 €',
            rating: '4,8 basée sur 3 commentaires',
            identityVerified: true,
            memberSince: '2021',
            hostSince: 'Hôte à Hauts-de-France',
            location: 'Cannes, France',
            avatar: 'https://i.pravatar.cc/150?img=10',
        },
        messages: [
            {
                id: 'm1',
                from: 'host',
                senderName: 'Fabien · Co-hôte',
                time: '07:15',
                text: `Bonjour Anaëlle,\n\nMerci pour votre réservation !\n\nNous sommes ravis de vous accueillir prochainement dans notre appartement à Cannes. Celui-ci est conçu pour offrir une solution pratique, fonctionnelle et accessible, avec un très bon rapport qualité-prix.\n\nNous faisons de notre mieux pour proposer un hébergement simple mais confortable, pensé pour répondre aux besoins essentiels des voyageurs. Si vous recherchez un bon compromis entre localisation, praticité et budget, vous avez fait le bon choix !\n\nNous restons disponibles pour toute question avant ou pendant votre séjour, et nous avons hâte de vous recevoir.\n\nÀ très bientôt !`,
            },
            {
                id: 'm2',
                from: 'guest',
                senderName: 'Anaëlle',
                time: '08:01',
                text: 'Bonjour ! Merci beaucoup pour ce message. Pourriez-vous m\'indiquer les modalités d\'accès au logement ?',
            },
            {
                id: 'm3',
                from: 'host',
                senderName: 'Fabien · Co-hôte',
                time: '08:42',
                text: 'Bien sûr ! Le code d\'accès à la résidence est 2468. L\'appartement se trouve au 3ème étage, porte gauche. Je vous enverrai les informations détaillées 24h avant votre arrivée.',
            },
        ],
    },
    {
        id: 'conv_002',
        participants: 'Rossy et 2 autres',
        avatar: 'https://i.pravatar.cc/150?img=11',
        time: '07:25',
        preview: 'Rossy : Demande d\'information en...',
        isUnread: true,
        status: '● Confirmée · 20–22 févr. · 1281',
        reservation: {
            guestName: 'Rossy',
            listingId: '1281',
            listingName: 'Studio moderne centre-ville avec parking',
            nights: 4,
            guestCount: '3 voyageurs',
            checkIn: 'Jeu. 20 févr. 2026',
            checkOut: 'Dim. 22 févr. 2026',
            bookedOn: '10 janv. 2026',
            confirmCode: 'HM6CD3E7FG',
            accessCode: '1357',
            totalAmount: '480 €',
            rating: null,
            identityVerified: false,
            memberSince: '2023',
            hostSince: null,
            location: 'Marseille, France',
            avatar: 'https://i.pravatar.cc/150?img=11',
        },
        messages: [
            {
                id: 'm1',
                from: 'guest',
                senderName: 'Rossy',
                time: '07:10',
                text: 'Bonjour, est-ce que le parking est inclus dans le tarif ?',
            },
            {
                id: 'm2',
                from: 'host',
                senderName: 'Fabien · Co-hôte',
                time: '07:18',
                text: 'Bonjour Rossy ! Oui, une place de parking est incluse gratuitement avec votre réservation.',
            },
            {
                id: 'm3',
                from: 'guest',
                senderName: 'Rossy',
                time: '07:25',
                text: 'Super merci ! Et est-ce qu\'il y a un ascenseur dans l\'immeuble ?',
            },
        ],
    },
    {
        id: 'conv_003',
        participants: 'Clotaire',
        avatar: 'https://i.pravatar.cc/150?img=12',
        time: 'Hier',
        preview: 'Nous : Merci pour votre séjour, à bientôt !',
        isUnread: false,
        status: '● Séjour terminé · 15–19 févr. · 1511',
        reservation: {
            guestName: 'Clotaire',
            listingId: '1511',
            listingName: 'Vue imprenable à 360° au pied des 3 Vallées',
            nights: 4,
            guestCount: '2 voyageurs',
            checkIn: 'Sam. 15 févr. 2026',
            checkOut: 'Mer. 19 févr. 2026',
            bookedOn: '2 janv. 2026',
            confirmCode: 'HM1CL5T8HI',
            accessCode: '3579',
            totalAmount: '380 €',
            rating: null,
            identityVerified: true,
            memberSince: '2019',
            hostSince: null,
            location: 'Lyon, France',
            avatar: 'https://i.pravatar.cc/150?img=12',
        },
        messages: [
            {
                id: 'm1',
                from: 'guest',
                senderName: 'Clotaire',
                time: 'Hier 09:12',
                text: 'Bonjour, nous venons de quitter le logement. Tout était parfait, merci !',
            },
            {
                id: 'm2',
                from: 'host',
                senderName: 'Fabien · Co-hôte',
                time: 'Hier 09:45',
                text: 'Merci beaucoup Clotaire ! C\'est un plaisir. N\'hésitez pas à laisser un commentaire si vous en avez le temps. À bientôt !',
            },
            {
                id: 'm3',
                from: 'guest',
                senderName: 'Clotaire',
                time: 'Hier 10:02',
                text: 'Avec plaisir, je le ferai dès que possible. Bonne continuation !',
            },
            {
                id: 'm4',
                from: 'host',
                senderName: 'Fabien · Co-hôte',
                time: 'Hier 10:10',
                text: 'Merci pour votre séjour, à bientôt !',
            },
        ],
    },
]

// ─── CONVERSATION ASSISTANCE AIRBNB ──────────────────────────────────────────
const assistanceConv = {
    id: 'conv_assistance',
    participants: 'Assistance Airbnb',
    isAssistance: true,
    time: '09:04',
    preview: 'Ouvrez le fil de discussion pour consulter vos...',
    isUnread: false,
    status: 'En cours',
}

// ─── SOUS-COMPOSANT : BULLE DE MESSAGE ────────────────────────────────────────
function MessageBubble({ msg, guestAvatar }) {
    const isHost = msg.from === 'host'

    return (
        <div className="flex items-start gap-3 mb-5">
            {/* Avatar : voyageur à gauche, hôte sans avatar (juste l'initiale) */}
            {isHost ? (
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 mt-1">
                    F
                </div>
            ) : (
                <img
                    src={guestAvatar}
                    alt="voyageur"
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1"
                />
            )}

            {/* Contenu */}
            <div className="flex-1 max-w-[75%]">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-700">{msg.senderName}</span>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-gray-100 text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
                    {msg.text}
                </div>
            </div>
        </div>
    )
}

// ─── SOUS-COMPOSANT : PANNEAU RÉSERVATION ─────────────────────────────────────
function ReservationPanel({ reservation, onClose, onAssistanceClick }) {
    const navigate = useNavigate()
    if (!reservation) return null
    const r = reservation

    return (
        <div className="w-[380px] flex-shrink-0 border-l border-gray-200 bg-white overflow-y-auto h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-900">Réservation</h2>
                <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-4 h-4 text-gray-500" />
                </button>
            </div>

            <div className="p-4 space-y-5">
                {/* Statut + nom */}
                <div>
                    <p className="text-xs text-gray-500 mb-1">Confirmée</p>
                    <div className="flex items-center justify-between">
                        <p className="text-base font-bold text-gray-900 leading-tight">{r.guestName}</p>
                        <img src={r.avatar} alt={r.guestName} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                    </div>
                    <div className="mt-2 text-xs text-gray-600 space-y-0.5">
                        <p>{r.listingId} · {r.listingName}</p>
                        <p>{r.nights} nuits</p>
                        <p>{r.guestCount}</p>
                    </div>
                </div>

                <hr className="border-2 border-gray-100" />

                {/* Tout sur le voyageur */}
                <div>
                    <p className="text-sm font-semibold text-gray-900 mb-3">Tout sur {r.guestName}</p>
                    <div className="space-y-3">
                        {r.rating && (
                            <div className="flex items-center gap-2.5 text-xs text-gray-700">
                                <Star className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                <span>Évaluation de {r.rating}</span>
                            </div>
                        )}
                        {r.identityVerified && (
                            <div className="flex items-center gap-2.5 text-xs text-gray-700">
                                <ShieldCheck className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                <span>Identité vérifiée</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2.5 text-xs text-gray-700">
                            <Trophy className="w-4 h-4 text-gray-600 flex-shrink-0" />
                            <span>Membre d'Airbnb depuis {r.memberSince}</span>
                        </div>
                        {r.hostSince && (
                            <div className="flex items-center gap-2.5 text-xs text-gray-700">
                                <Home className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                <span>{r.hostSince}</span>
                            </div>
                        )}
                        {r.location && (
                            <div className="flex items-center gap-2.5 text-xs text-gray-700">
                                <MapPin className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                <span>Habite à {r.location}</span>
                            </div>
                        )}
                    </div>
                    <button className="mt-3 text-xs text-gray-900 font-medium underline">Afficher le profil</button>
                </div>

                <hr className="border-gray-100" />

                {/* Bouton Appeler */}
                <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                    <Phone className="w-4 h-4" />
                    Appeler
                </button>

                <hr className="border-gray-100" />

                {/* Détails de la réservation */}
                <div>
                    <p className="text-sm font-semibold text-gray-900 mb-4">Détails de la réservation</p>
                    <div className="text-xs">
                        <div className="pb-4">
                            <p className="text-gray-500 mb-0.5">Voyageurs</p>
                            <p className="text-gray-900 font-medium">{r.guestCount}</p>
                        </div>
                        <hr className="border-gray-200 mb-4" />
                        <div className="pb-4 flex items-start justify-between">
                            <div>
                                <p className="text-gray-500 mb-0.5">Code d'accès suggéré</p>
                                <p className="text-gray-900 font-medium">{r.accessCode}</p>
                            </div>
                            <button className="text-gray-900 text-xs font-medium underline flex-shrink-0 ml-2">Voir</button>
                        </div>
                        <hr className="border-gray-200 mb-4" />
                        <div className="pb-4">
                            <p className="text-gray-500 mb-0.5">Arrivée</p>
                            <p className="text-gray-900 font-medium">{r.checkIn}</p>
                        </div>
                        <hr className="border-gray-200 mb-4" />
                        <div className="pb-4">
                            <p className="text-gray-500 mb-0.5">Départ</p>
                            <p className="text-gray-900 font-medium">{r.checkOut}</p>
                        </div>
                        <hr className="border-gray-200 mb-4" />
                        <div className="pb-4">
                            <p className="text-gray-500 mb-0.5">Date de réservation</p>
                            <p className="text-gray-900 font-medium">{r.bookedOn}</p>
                        </div>
                        <hr className="border-gray-200 mb-4" />
                        <div className="pb-2">
                            <p className="text-gray-500 mb-0.5">Code de confirmation</p>
                            <p className="text-gray-900 font-mono font-medium">{r.confirmCode}</p>
                        </div>
                    </div>
                    <button className="mt-4 text-sm text-gray-900 font-semibold underline">Afficher le calendrier</button>
                </div>

                <hr className="border-gray-100" />

                {/* Assistance */}
                <div>
                    <p className="text-sm font-semibold text-gray-900 mb-3">Assistance</p>
                    <div className="space-y-2">
                        <button
                            onClick={onAssistanceClick}
                            className="w-full flex items-center justify-between text-xs text-gray-700 py-2 hover:bg-gray-50 rounded-lg px-1 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-gray-500" />
                                <span>Assistance sécurité</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                        <button
                            onClick={() => navigate('/airbnb/centre-aide')}
                            className="w-full flex items-center justify-between text-xs text-gray-700 py-2 hover:bg-gray-50 rounded-lg px-1 transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-gray-500" />
                                <span>Consulter le Centre d'aide</span>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Questions fréquentes */}
                <div>
                    <p className="text-sm font-semibold text-gray-900 mb-3">Questions fréquentes</p>
                    <div className="space-y-4">
                        <div>
                            <p className="text-xs font-medium text-gray-900 mb-1">Modifier une réservation de logement en tant qu'hôte</p>
                            <p className="text-xs text-gray-500">Vous pouvez envoyer une demande de modification à votre voyageur. Si ce...</p>
                            <button className="text-xs text-gray-900 font-medium underline mt-1">Lire la suite</button>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-900 mb-1">Conditions d'annulation par l'hôte pour les logements</p>
                            <p className="text-xs text-gray-500">Date d'entrée en vigueur : 9 octobre 2023</p>
                            <button className="text-xs text-gray-900 font-medium underline mt-1">Lire la suite</button>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-gray-900 mb-1">Quand vais-je recevoir mon versement ?</p>
                            <p className="text-xs text-gray-500">Le délai de votre versement dépend du type de réservation, de la durée du séjo...</p>
                            <button className="text-xs text-gray-900 font-medium underline mt-1">Lire la suite</button>
                        </div>
                    </div>
                    <button className="mt-4 text-xs text-gray-900 font-medium underline">Afficher plus de sujets</button>
                </div>
            </div>
        </div>
    )
}

// ─── SOUS-COMPOSANT : CHAT ASSISTANCE AIRBNB ────────────────────────────────
const assistanceTopics = [
    'Questions sur la protection de la vie privée',
    'Fête dans mon logement',
    'Violences ou menaces',
    'Dommages matériels',
    "J'ai besoin d'aide sur un autre sujet",
]

function AssistanceChatPanel() {
    return (
        <>
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-3 border-b border-gray-200 flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-[#FF385C] flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white"><path d="M16 1C7.163 1 0 8.163 0 17c0 4.233 1.612 8.088 4.254 11.003L1 31l3.396-.84A15.93 15.93 0 0016 33c8.837 0 16-7.163 16-16S24.837 1 16 1z" /></svg>
                </div>
                <p className="text-sm font-semibold text-gray-900">Assistance Airbnb</p>
            </div>

            {/* Corps du chat */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="text-center mb-6">
                    <span className="text-xs text-gray-400">Aujourd'hui</span>
                </div>

                {/* Message Assistance Airbnb */}
                <div className="flex items-start gap-3 mb-5">
                    <div className="w-8 h-8 rounded-full bg-[#FF385C] flex items-center justify-center flex-shrink-0 mt-1">
                        <svg viewBox="0 0 32 32" className="w-4 h-4 fill-white"><path d="M16 1C7.163 1 0 8.163 0 17c0 4.233 1.612 8.088 4.254 11.003L1 31l3.396-.84A15.93 15.93 0 0016 33c8.837 0 16-7.163 16-16S24.837 1 16 1z" /></svg>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-gray-700">Assistance Airbnb</span>
                            <span className="text-xs text-gray-400">09:03</span>
                        </div>
                        <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-900 leading-relaxed max-w-[80%] mb-3">
                            <p>Bonjour, s'il s'agit d'une urgence, <span className="text-[#FF385C]">nous vous mettrons immédiatement en relation avec les services d'urgence près de chez vous</span>.</p>
                        </div>
                        {/* Bouton urgence */}
                        <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-900 font-medium hover:bg-gray-50 transition-colors mb-4">
                            Appeler les services d'urgence
                            <ChevronRight className="w-4 h-4" />
                        </button>
                        <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-900 leading-relaxed max-w-[80%] mb-3">
                            <p>Si vous avez besoin d'assistance de la part d'<span className="text-[#FF385C]">Airbnb</span>, sélectionnez le problème que vous rencontrez. Cette information nous permettra de vous orienter vers la bonne personne plus rapidement.</p>
                        </div>
                        {/* Topics */}
                        <div className="space-y-2 max-w-[80%]">
                            {assistanceTopics.map((topic, i) => (
                                <button
                                    key={i}
                                    className="w-full text-left border border-gray-200 rounded-xl px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                                >
                                    <span className={i === 0 || i === 2 || i === 4 ? 'text-[#FF385C]' : 'text-gray-900'}>{topic}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

// ─── SOUS-COMPOSANT : PANNEAU DÉTAILS ASSISTANCE ─────────────────────────────
function AssistanceDetailsPanel({ onClose }) {
    return (
        <div className="w-72 flex-shrink-0 border-l border-gray-200 bg-white h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-900">Détails</h2>
                <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-4 h-4 text-gray-500" />
                </button>
            </div>
            <div className="p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FF385C] flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white"><path d="M16 1C7.163 1 0 8.163 0 17c0 4.233 1.612 8.088 4.254 11.003L1 31l3.396-.84A15.93 15.93 0 0016 33c8.837 0 16-7.163 16-16S24.837 1 16 1z" /></svg>
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-900">Assistance Airbnb</p>
                    <p className="text-xs text-gray-500 mt-0.5">Obtenez l'aide d'un membre de notre équipe.</p>
                </div>
            </div>
        </div>
    )
}

// ─── COMPOSANT PRINCIPAL ──────────────────────────────────────────────────────
function AirbnbMessages() {
    const [selectedConv, setSelectedConv] = useState(conversations[0])
    const [filter, setFilter] = useState('all')
    const [inputValue, setInputValue] = useState('')
    const [showReservation, setShowReservation] = useState(true)
    const [assistanceMode, setAssistanceMode] = useState(false)

    const handleAssistanceClick = () => {
        setAssistanceMode(true)
        setSelectedConv(assistanceConv)
        setShowReservation(true)
    }

    const displayed = filter === 'unread'
        ? conversations.filter(c => c.isUnread)
        : conversations

    const listWithAssistance = assistanceMode
        ? [assistanceConv, ...conversations]
        : conversations

    const displayedList = filter === 'unread'
        ? listWithAssistance.filter(c => c.isUnread || c.isAssistance)
        : listWithAssistance

    const handleSend = () => {
        if (!inputValue.trim()) return
        setInputValue('')
    }

    return (
        <div className="h-screen flex flex-col bg-white font-airbnb overflow-hidden">
            <AirbnbHeader />

            {/* Corps à 3 panneaux */}
            <div className="flex flex-1 overflow-hidden border-t border-gray-200">

                {/* ── PANNEAU GAUCHE : liste des conversations ── */}
                <div className="w-72 flex-shrink-0 border-r border-gray-200 flex flex-col">
                    {/* Header liste */}
                    <div className="px-4 pt-5 pb-3 border-b border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
                            <div className="flex items-center gap-2">
                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Search className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Settings className="w-4 h-4 text-gray-600" />
                                </button>
                            </div>
                        </div>
                        {/* Filtres */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setFilter('all')}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === 'all'
                                    ? 'bg-gray-900 text-white'
                                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Tout
                                {filter === 'all' && <span className="ml-0.5">▾</span>}
                            </button>
                            <button
                                onClick={() => setFilter('unread')}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === 'unread'
                                    ? 'bg-gray-900 text-white'
                                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Non lus
                            </button>
                        </div>
                    </div>

                    {/* Liste scrollable */}
                    <div className="flex-1 overflow-y-auto">
                        {displayedList.map(conv => (
                            <button
                                key={conv.id}
                                onClick={() => {
                                    setSelectedConv(conv)
                                    if (!conv.isAssistance) setAssistanceMode(false)
                                }}
                                className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${selectedConv?.id === conv.id ? 'bg-gray-50' : ''}`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="relative flex-shrink-0">
                                        {conv.isAssistance ? (
                                            <div className="w-10 h-10 rounded-full bg-[#FF385C] flex items-center justify-center">
                                                <svg viewBox="0 0 32 32" className="w-5 h-5 fill-white"><path d="M16 1C7.163 1 0 8.163 0 17c0 4.233 1.612 8.088 4.254 11.003L1 31l3.396-.84A15.93 15.93 0 0016 33c8.837 0 16-7.163 16-16S24.837 1 16 1z" /></svg>
                                            </div>
                                        ) : (
                                            <img src={conv.avatar} alt={conv.participants} className="w-10 h-10 rounded-full object-cover" />
                                        )}
                                        {conv.isUnread && (
                                            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#FF385C] rounded-full border-2 border-white" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-0.5">
                                            <span className={`text-sm truncate pr-2 ${conv.isAssistance ? 'font-semibold text-gray-900' : conv.isUnread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                                                {conv.participants}
                                            </span>
                                            <span className="text-xs text-gray-400 flex-shrink-0">{conv.time}</span>
                                        </div>
                                        <p className={`text-xs truncate ${conv.isAssistance ? 'text-gray-700 font-medium' : conv.isUnread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                            {conv.preview}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5 truncate">{conv.status}</p>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── PANNEAU CENTRE : conversation ── */}
                <div className="flex-1 flex flex-col min-w-0">
                    {assistanceMode ? (
                        <AssistanceChatPanel />
                    ) : selectedConv ? (
                        <>
                            {/* Header conversation */}
                            <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 flex-shrink-0">
                                <div className="flex items-center gap-3">
                                    <img src={selectedConv.avatar} alt={selectedConv.participants} className="w-9 h-9 rounded-full object-cover" />
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{selectedConv.participants}</p>
                                        <p className="text-xs text-gray-500">🌐 Traduction activée</p>
                                    </div>
                                </div>
                                {!showReservation && (
                                    <button
                                        onClick={() => setShowReservation(true)}
                                        className="text-xs text-gray-600 border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Infos réservation
                                    </button>
                                )}
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto px-6 py-6">
                                <div className="text-center mb-6">
                                    <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">19 févr. 2026</span>
                                </div>
                                <div className="text-center mb-6">
                                    <span className="text-xs text-[#FF385C]">
                                        Réservation confirmée · {selectedConv.reservation.nights} jours, {selectedConv.reservation.checkIn} – {selectedConv.reservation.checkOut}
                                    </span>
                                </div>
                                {selectedConv.messages.map(msg => (
                                    <MessageBubble key={msg.id} msg={msg} guestAvatar={selectedConv.reservation.avatar} />
                                ))}
                            </div>

                            {/* Zone de saisie */}
                            <div className="px-6 pb-4 flex-shrink-0 border-t border-gray-100 pt-3">
                                <div className="border border-gray-300 rounded-2xl px-4 py-3 flex flex-col gap-2 focus-within:border-gray-400 transition-colors">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={e => setInputValue(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                                        placeholder="Écrire un message…"
                                        className="text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent w-full"
                                    />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                                                <Plus className="w-4 h-4 text-gray-500" />
                                            </button>
                                            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                                                <Smile className="w-4 h-4 text-gray-500" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={handleSend}
                                            disabled={!inputValue.trim()}
                                            className={`p-1.5 rounded-full transition-colors ${inputValue.trim() ? 'bg-[#FF385C] text-white hover:bg-[#e0314f]' : 'text-gray-300'}`}
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
                            Sélectionnez une conversation
                        </div>
                    )}
                </div>

                {/* ── PANNEAU DROIT ── */}
                {showReservation && assistanceMode && (
                    <AssistanceDetailsPanel onClose={() => setShowReservation(false)} />
                )}
                {showReservation && !assistanceMode && selectedConv && (
                    <ReservationPanel
                        reservation={selectedConv.reservation}
                        onClose={() => setShowReservation(false)}
                        onAssistanceClick={handleAssistanceClick}
                    />
                )}
            </div>
        </div>
    )
}

export default AirbnbMessages
