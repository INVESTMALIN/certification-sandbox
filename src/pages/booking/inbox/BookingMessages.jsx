import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { ChevronDown, ChevronUp, Trash2, Reply } from 'lucide-react'

function BookingMessages() {
    const { id } = useParams()
    const [activeTab, setActiveTab] = useState('all')
    const [expandedMessage, setExpandedMessage] = useState(null)

    // Messages mockés
    const allMessages = [
        {
            id: 1,
            subject: 'Booking.com Customer Service',
            date: '12 janvier 2025 - 20:57:16',
            sender: 'Booking.com',
            senderInitial: 'B',
            content: `Dear partner,

Thank you for contacting Booking.com about what's the best number you can contact.

We apologize for the inconvenience of having to write us an email, we recognize how valuable your time is.

We would like to inform you that due to security reasons, we are unable to provide you information regarding with your request, please contact our partner support team. Here's how you can find a dedicated number to call in order for us to discuss your concern over the phone:

1. Log in to the Extranet.
2. Click 'Inbox'.
3. Select 'Booking.com messages'.
4. Click 'See contact options' and select a 'topic' and 'subtopic'.
5. Click 'See all contact options'.
6. Select 'Call'.

For additional reference to understand how you can contact us, kindly visit the link below:
Understanding how to contact us

If you have any questions, we are here for you.
--
John Florence D.
Booking.com Partner Support Team

Posez une question ou recherchez par mot-clé dans l'Aide aux partenaires`
        },
        {
            id: 2,
            subject: 'Mise en ligne de votre établissement',
            date: '10 janvier 2025 - 17:44:42',
            sender: 'Booking.com',
            senderInitial: 'B',
            content: `Bonjour,

Nous sommes ravis de vous informer que votre établissement a été mis en ligne avec succès sur Booking.com.

Votre établissement est maintenant visible par des millions de voyageurs dans le monde entier.

Prochaines étapes :
- Vérifiez que toutes vos informations sont à jour
- Ajoutez des photos de qualité
- Définissez vos tarifs et disponibilités
- Répondez rapidement aux demandes de réservation

Notre équipe reste à votre disposition pour toute question.

Cordialement,
L'équipe Booking.com Partner Support`
        },
        {
            id: 3,
            subject: 'Emplacement de l\'établissement',
            date: '10 janvier 2025 - 16:27:35',
            sender: 'Booking.com',
            senderInitial: 'B',
            content: `Bonjour,

Nous avons remarqué que les coordonnées GPS de votre établissement nécessitent une vérification.

Un emplacement précis est essentiel pour permettre à vos clients de vous trouver facilement.

Actions requises :
- Vérifiez l'adresse complète dans l'extranet
- Confirmez les coordonnées GPS
- Ajoutez des instructions d'accès si nécessaire

Merci de mettre à jour ces informations dans les 48 heures.

Cordialement,
L'équipe Booking.com`
        }
    ]

    const followedMessages = []

    const sentMessages = [
        {
            id: 3,
            subject: 'Emplacement de l\'établissement',
            date: '10 janvier 2025 - 16:27:35',
            sender: 'Booking.com',
            senderInitial: 'B',
            content: `Bonjour,

Nous avons remarqué que les coordonnées GPS de votre établissement nécessitent une vérification.

Un emplacement précis est essentiel pour permettre à vos clients de vous trouver facilement.

Actions requises :
- Vérifiez l'adresse complète dans l'extranet
- Confirmez les coordonnées GPS
- Ajoutez des instructions d'accès si nécessaire

Merci de mettre à jour ces informations dans les 48 heures.

Cordialement,
L'équipe Booking.com`
        }
    ]

    const tabs = [
        { id: 'all', label: 'Tous les messages', messages: allMessages },
        { id: 'followed', label: 'Suivis', messages: followedMessages },
        { id: 'sent', label: 'Envoyés', messages: sentMessages }
    ]

    const currentMessages = tabs.find(tab => tab.id === activeTab)?.messages || []

    const toggleMessage = (messageId) => {
        setExpandedMessage(expandedMessage === messageId ? null : messageId)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex gap-8">
                    {/* Colonne principale */}
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Boîte de réception</h1>

                        {/* Onglets */}
                        <div className="flex gap-4 border-b border-gray-300 mb-6">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id)
                                        setExpandedMessage(null)
                                    }}
                                    className={`pb-3 px-4 text-sm font-medium transition-colors relative ${activeTab === tab.id
                                            ? 'text-[#0071c2] border-b-2 border-[#0071c2]'
                                            : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Liste des messages */}
                        {currentMessages.length === 0 ? (
                            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <p className="text-gray-600 text-sm">Vous n'avez aucun message</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {currentMessages.map(message => (
                                    <div key={message.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                        {/* Header du message */}
                                        <button
                                            onClick={() => toggleMessage(message.id)}
                                            className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex-1 text-left">
                                                <h3 className="font-medium text-gray-900 mb-1">{message.subject}</h3>
                                                <p className="text-sm text-gray-500">{message.date}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <Trash2 className="w-4 h-4 text-gray-600" />
                                                </button>
                                                {expandedMessage === message.id ? (
                                                    <ChevronUp className="w-5 h-5 text-gray-400" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                                )}
                                            </div>
                                        </button>

                                        {/* Contenu du message (expanded) */}
                                        {expandedMessage === message.id && (
                                            <div className="px-6 py-4 border-t border-gray-200">
                                                <div className="flex items-start gap-4 mb-4">
                                                    <div className="w-10 h-10 rounded-full bg-[#0071c2] flex items-center justify-center text-white font-semibold flex-shrink-0">
                                                        {message.senderInitial}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-gray-900">{message.sender}</p>
                                                        <p className="text-sm text-gray-500">{message.date}</p>
                                                    </div>
                                                </div>

                                                <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed mb-4">
                                                    {message.content}
                                                </div>

                                                <button className="flex items-center gap-2 px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors">
                                                    <Reply className="w-4 h-4" />
                                                    Répondre à ce message
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar droite */}
                    <div className="w-80">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-3">Obtenez rapidement de l'aide</h2>
                            <p className="text-sm text-gray-700 mb-4">
                                Trouvez les réponses à vos questions en quelques clics
                            </p>

                            <input
                                type="text"
                                placeholder="Saisissez votre question"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm mb-6 focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                            />

                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">Articles populaires</h3>
                                <ul className="space-y-2">
                                    <li>
                                        <a href="#" className="text-sm text-[#0071c2] hover:underline">
                                            Vos réservations
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm text-[#0071c2] hover:underline">
                                            Commission, factures et taxes
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm text-[#0071c2] hover:underline">
                                            Vos tarifs et disponibilités
                                        </a>
                                    </li>
                                </ul>
                                <button className="mt-4 px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded text-sm font-medium hover:bg-blue-50 transition-colors w-full">
                                    Voir plus de thèmes
                                </button>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                    Vous ne trouvez pas ce que vous cherchez ?
                                </h3>
                                <button className="px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded text-sm font-medium hover:bg-blue-50 transition-colors w-full">
                                    Voir les options de contact
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default BookingMessages