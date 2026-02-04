import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { Search, Send } from 'lucide-react'

function Inbox() {
    const { id } = useParams()
    const [selectedConversation, setSelectedConversation] = useState(null)
    const [filterStatus, setFilterStatus] = useState('all')
    const [messageText, setMessageText] = useState('')

    // Mock conversations
    const conversations = [
        {
            id: 1,
            guestName: 'Sophie Lemoine',
            reservationNumber: '50517181',
            lastMessage: 'Merci beaucoup ! À bientôt',
            lastMessageDate: '2026-03-08 14:23',
            unread: false,
            avatar: 'SL',
            checkIn: '10 mars 2026',
            checkOut: '15 mars 2026',
            messages: [
                {
                    id: 1,
                    sender: 'guest',
                    text: 'Bonjour, je voulais savoir s\'il est possible d\'arriver un peu plus tôt, vers 14h ?',
                    timestamp: '2026-03-07 10:15'
                },
                {
                    id: 2,
                    sender: 'host',
                    text: 'Bonjour Sophie, oui bien sûr ! Le logement sera prêt dès 14h. Je vous enverrai les codes d\'accès la veille de votre arrivée.',
                    timestamp: '2026-03-07 11:42'
                },
                {
                    id: 3,
                    sender: 'guest',
                    text: 'Merci beaucoup ! À bientôt',
                    timestamp: '2026-03-08 14:23'
                }
            ]
        },
        {
            id: 2,
            guestName: 'Marc Dubois',
            reservationNumber: '68417842',
            lastMessage: 'Y a-t-il un parking à proximité ?',
            lastMessageDate: '2026-05-10 16:45',
            unread: true,
            avatar: 'MD',
            checkIn: '12 mai 2026',
            checkOut: '14 mai 2026',
            messages: [
                {
                    id: 1,
                    sender: 'guest',
                    text: 'Bonjour, nous arrivons avec notre voiture. Y a-t-il un parking à proximité ?',
                    timestamp: '2026-05-10 16:45'
                }
            ]
        },
        {
            id: 3,
            guestName: 'Laura Bernard',
            reservationNumber: '57692885',
            lastMessage: 'Le logement est parfait, merci !',
            lastMessageDate: '2026-06-16 09:12',
            unread: false,
            avatar: 'LB',
            checkIn: '18 juin 2026',
            checkOut: '25 juin 2026',
            messages: [
                {
                    id: 1,
                    sender: 'guest',
                    text: 'Bonjour ! J\'ai hâte de découvrir le logement. Pouvez-vous me donner quelques recommandations de restaurants dans le quartier ?',
                    timestamp: '2026-06-15 18:30'
                },
                {
                    id: 2,
                    sender: 'host',
                    text: 'Bonjour Laura ! Je vous recommande vivement "Le Jardin des Papes" à 5 minutes à pied, et "La Table du Verger" pour une cuisine provençale authentique. Je vous ai préparé une petite liste que vous trouverez dans le logement.',
                    timestamp: '2026-06-15 20:15'
                },
                {
                    id: 3,
                    sender: 'guest',
                    text: 'Le logement est parfait, merci !',
                    timestamp: '2026-06-16 09:12'
                }
            ]
        }
    ]

    const filteredConversations = filterStatus === 'unread'
        ? conversations.filter(c => c.unread)
        : conversations

    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diff = now - date
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))

        if (days === 0) {
            return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        } else if (days === 1) {
            return 'Hier'
        } else if (days < 7) {
            return date.toLocaleDateString('fr-FR', { weekday: 'short' })
        }
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
    }

    const handleSendMessage = () => {
        if (messageText.trim()) {
            // Logique d'envoi ici
            setMessageText('')
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="h-[calc(100vh-180px)] flex">
                {/* Sidebar - Liste des conversations */}
                <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200">
                        <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>

                        {/* Barre de recherche */}
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Recherchez par nom ou numéro de réservation"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                            />
                        </div>

                        {/* Filtre */}
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-700 mb-2">Trier les messages par :</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                            >
                                <option value="all">Tous les messages</option>
                                <option value="unread">Messages en attente d'une réponse</option>
                            </select>
                        </div>
                    </div>

                    {/* Liste des conversations */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredConversations.map(conv => (
                            <button
                                key={conv.id}
                                onClick={() => setSelectedConversation(conv)}
                                className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left ${selectedConversation?.id === conv.id ? 'bg-blue-50' : ''
                                    } ${conv.unread ? 'bg-blue-50/30' : ''}`}
                            >
                                <div className="flex items-start gap-3">
                                    {/* Avatar */}
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${conv.unread ? 'bg-[#0071c2]' : 'bg-gray-400'
                                        }`}>
                                        {conv.avatar}
                                    </div>

                                    {/* Contenu */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between mb-1">
                                            <h3 className={`font-semibold text-sm truncate ${conv.unread ? 'text-gray-900' : 'text-gray-700'
                                                }`}>
                                                {conv.guestName}
                                            </h3>
                                            <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                                                {formatDate(conv.lastMessageDate)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 mb-1">
                                            Rés. {conv.reservationNumber}
                                        </p>
                                        <p className={`text-sm truncate ${conv.unread ? 'text-gray-900 font-medium' : 'text-gray-600'
                                            }`}>
                                            {conv.lastMessage}
                                        </p>
                                    </div>

                                    {conv.unread && (
                                        <div className="w-2 h-2 bg-[#0071c2] rounded-full flex-shrink-0 mt-1"></div>
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Zone de conversation */}
                {selectedConversation ? (
                    <div className="flex-1 flex flex-col bg-white">
                        {/* Header conversation */}
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {selectedConversation.guestName}
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        Réservation {selectedConversation.reservationNumber} • {selectedConversation.checkIn} → {selectedConversation.checkOut}
                                    </p>
                                </div>
                                <Link
                                    to={`/booking/property/${id}/reservations/res_${selectedConversation.id.toString().padStart(3, '0')}`}
                                    className="text-[#0071c2] hover:underline text-sm"
                                >
                                    Voir la réservation
                                </Link>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {selectedConversation.messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sender === 'host' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-2xl ${msg.sender === 'host' ? 'bg-[#0071c2] text-white' : 'bg-gray-100 text-gray-900'} rounded-lg p-4`}>
                                        <p className="text-sm mb-2">{msg.text}</p>
                                        <p className={`text-xs ${msg.sender === 'host' ? 'text-blue-100' : 'text-gray-500'}`}>
                                            {new Date(msg.timestamp).toLocaleString('fr-FR', {
                                                day: 'numeric',
                                                month: 'short',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Zone de saisie */}
                        <div className="p-4 border-t border-gray-200">
                            <div className="flex items-end gap-3">
                                <textarea
                                    value={messageText}
                                    onChange={(e) => setMessageText(e.target.value)}
                                    placeholder="Saisissez votre message..."
                                    rows={3}
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent resize-none"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="px-6 py-3 bg-[#0071c2] text-white rounded-lg hover:bg-[#005999] transition-colors flex items-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    Envoyer
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                Booking.com reçoit tous les messages écrits ici et les traite selon sa Charte de confidentialité
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center bg-gray-50">
                        <div className="text-center">
                            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Sélectionnez une conversation
                            </h2>
                            <p className="text-gray-600">
                                Choisissez un message dans la liste pour commencer
                            </p>
                        </div>
                    </div>
                )}
            </main>

            <BookingFooter />
        </div>
    )
}

export default Inbox