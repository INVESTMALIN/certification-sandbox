import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { FileText, X, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useState } from 'react'

function PreferencesMessages() {
    const [activeTab, setActiveTab] = useState('general')
    const [notifications, setNotifications] = useState({
        newMessage: true,
        autoResponse: true,
        dailyReminder: false
    })

    const tabs = [
        { id: 'general', label: 'Paramètres généraux' },
        { id: 'templates', label: 'Modèles de messages' },
        { id: 'auto', label: 'Réponses automatiques' },
        { id: 'agenda', label: 'Agenda des modèles de message' }
    ]

    const handleToggle = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-6xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Préférences des messages</h1>
                <p className="text-sm text-gray-600 mb-8">
                    Modifiez vos modèles de messages, les réponses destinées à vos clients et vos notifications ici.
                </p>

                {/* Onglets */}
                <div className="flex gap-8 border-b border-gray-300 mb-8">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 px-2 text-sm font-medium transition-colors relative ${activeTab === tab.id
                                ? 'text-gray-900 border-b-2 border-[#0071c2]'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Contenu de l'onglet Paramètres généraux */}
                {activeTab === 'general' && (
                    <div className="grid grid-cols-3 gap-8">
                        {/* Colonne gauche */}
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">Notifications</h2>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Choisissez les notifications que vous souhaitez recevoir pour les nouveaux messages. Nous les enverrons à l'adresse e-mail qui reçoit les réservations.
                            </p>
                        </div>

                        {/* Colonne droite - Tableau */}
                        <div className="col-span-2">
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                {/* Ligne 1 */}
                                <div className="grid grid-cols-3 border-b border-gray-200">
                                    <div className="p-4 text-sm text-gray-900">
                                        Envoyez-moi un e-mail quand...
                                    </div>
                                    <div className="p-4 text-sm text-gray-900">
                                        Un client m'a envoyé un message
                                    </div>
                                    <div className="p-4 flex items-center justify-end">
                                        <button
                                            onClick={() => handleToggle('newMessage')}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.newMessage ? 'bg-[#0071c2]' : 'bg-gray-300'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.newMessage ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                        <span className={`ml-3 text-sm font-medium ${notifications.newMessage ? 'text-gray-900' : 'text-gray-500'
                                            }`}>
                                            {notifications.newMessage ? 'Activé' : 'Désactivé'}
                                        </span>
                                    </div>
                                </div>

                                {/* Ligne 2 */}
                                <div className="grid grid-cols-3 border-b border-gray-200">
                                    <div className="p-4 text-sm text-gray-900">
                                        {/* Vide */}
                                    </div>
                                    <div className="p-4 text-sm text-gray-900">
                                        Une réponse automatique a été envoyée suite à la demande d'un client
                                    </div>
                                    <div className="p-4 flex items-center justify-end">
                                        <button
                                            onClick={() => handleToggle('autoResponse')}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.autoResponse ? 'bg-[#0071c2]' : 'bg-gray-300'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.autoResponse ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                        <span className={`ml-3 text-sm font-medium ${notifications.autoResponse ? 'text-gray-900' : 'text-gray-500'
                                            }`}>
                                            {notifications.autoResponse ? 'Activé' : 'Désactivé'}
                                        </span>
                                    </div>
                                </div>

                                {/* Ligne 3 */}
                                <div className="grid grid-cols-3">
                                    <div className="p-4 text-sm text-gray-900">
                                        E-mail de rappel quotidien
                                    </div>
                                    <div className="p-4 text-sm text-gray-900">
                                        Ne manquez aucun e-mail de client grâce à notre rappel quotidien. Tous les matins, vous recevrez un e-mail indiquant les messages en attente de la veille.
                                    </div>
                                    <div className="p-4 flex items-center justify-end">
                                        <button
                                            onClick={() => handleToggle('dailyReminder')}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.dailyReminder ? 'bg-[#0071c2]' : 'bg-gray-300'
                                                }`}
                                        >
                                            <span
                                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.dailyReminder ? 'translate-x-6' : 'translate-x-1'
                                                    }`}
                                            />
                                        </button>
                                        <span className={`ml-3 text-sm font-medium ${notifications.dailyReminder ? 'text-gray-900' : 'text-gray-500'
                                            }`}>
                                            {notifications.dailyReminder ? 'Activé' : 'Désactivé'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Texte en bas */}
                            <p className="text-sm text-gray-700 mt-6">
                                Recevez vos messages où que vous soyez en activant les notifications dans l'
                                <a href="#" className="text-[#0071c2] hover:underline">appli Pulse</a>.
                            </p>
                        </div>
                    </div>
                )}

                {/* Contenu de l'onglet Modèles de messages */}
                {activeTab === 'templates' && (
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Modèles</h2>
                        <p className="text-sm text-gray-600 mb-8">
                            Créez, mettez à jour et gérez tous vos modèles de messages
                        </p>

                        {/* État vide */}
                        <div className="bg-white rounded-lg border border-gray-200 p-16">
                            <div className="flex flex-col items-center text-center max-w-md mx-auto">
                                <FileText className="w-20 h-20 text-gray-300 mb-6" strokeWidth={1.5} />
                                <p className="text-base text-gray-700 mb-6 leading-relaxed">
                                    Vous n'avez aucun modèle pour le moment. Créez un modèle personnalisé pour gagner du temps lorsque vous répondez à vos clients.
                                </p>
                                <button className="px-6 py-3 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                    Créer un nouveau modèle
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Contenu de l'onglet Réponses automatiques */}
                {activeTab === 'auto' && (
                    <div className="grid grid-cols-3 gap-6">
                        {/* Colonne gauche */}
                        <div className="col-span-2">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Réponses automatiques</h2>
                                <p className="text-sm text-gray-700 mb-6">
                                    Activez les réponses automatiques pour répondre aux questions les plus fréquemment posées par vos clients. Rendez-vous sur l'
                                    <a href="#" className="text-[#0071c2] hover:underline">Aide aux partenaires</a> pour en savoir plus.
                                </p>

                                {/* Liste des réponses */}
                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <X className="w-5 h-5 text-gray-400" />
                                            <span className="text-base text-gray-900">Arrivée</span>
                                        </div>
                                        <a href="#" className="text-[#0071c2] text-sm hover:underline">Paramètres</a>
                                    </div>

                                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <X className="w-5 h-5 text-gray-400" />
                                            <span className="text-base text-gray-900">Départ</span>
                                        </div>
                                        <a href="#" className="text-[#0071c2] text-sm hover:underline">Paramètres</a>
                                    </div>

                                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <X className="w-5 h-5 text-gray-400" />
                                            <span className="text-base text-gray-900">Parking</span>
                                        </div>
                                        <a href="#" className="text-[#0071c2] text-sm hover:underline">Paramètres</a>
                                    </div>

                                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <X className="w-5 h-5 text-gray-400" />
                                            <span className="text-base text-gray-900">Literie souhaitée</span>
                                        </div>
                                        <a href="#" className="text-[#0071c2] text-sm hover:underline">Paramètres</a>
                                    </div>

                                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                                        <div className="flex items-center gap-3">
                                            <X className="w-5 h-5 text-gray-400" />
                                            <span className="text-base text-gray-900">Fumeurs/Non-fumeurs</span>
                                        </div>
                                        <a href="#" className="text-[#0071c2] text-sm hover:underline">Paramètres</a>
                                    </div>
                                </div>

                                <button className="px-6 py-3 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium mb-6">
                                    Créer une réponse automatique
                                </button>

                                {/* Feedback */}
                                <div className="pt-6 border-t border-gray-200">
                                    <p className="text-sm text-gray-700 mb-3">
                                        Nous cherchons actuellement à améliorer les réponses automatiques. Que pensez-vous de cette fonctionnalité ?
                                    </p>
                                    <div className="flex gap-3">
                                        <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                                            <ThumbsUp className="w-5 h-5 text-gray-600" />
                                        </button>
                                        <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                                            <ThumbsDown className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Colonne droite - Sidebar */}
                        <div className="col-span-1">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Comment les réponses automatiques fonctionnent-elles ?
                                </h3>
                                <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                                    <p>
                                        Vous pouvez paramétrer des réponses automatiques pour traiter les demandes ou questions les plus courantes.
                                    </p>
                                    <p>1. Choisissez le thème du message</p>
                                    <p>2. Définissez la façon dont vous souhaitez répondre aux messages sur ce sujet</p>
                                    <p>3. Enregistrez vos préférences</p>
                                    <p>
                                        À chaque fois qu'un client vous envoie un message à ce sujet, il recevra une réponse automatique définie selon vos paramètres.
                                    </p>
                                    <p>
                                        Vous pourrez toujours consulter la conversation complète dans votre boîte de réception et modifier vos paramètres à tout moment.
                                    </p>
                                    <p>
                                        Nous utilisons vos conditions pour vous suggérer des réponses automatiques appropriées. Pensez donc à vérifier vos{' '}
                                        <a href="#" className="text-[#0071c2] hover:underline">conditions</a> pour vous assurer qu'elles sont bien à jour.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Contenu de l'onglet Agenda */}
                {activeTab === 'agenda' && (
                    <div className="grid grid-cols-3 gap-6">
                        {/* Colonne gauche */}
                        <div className="col-span-2">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-3">Agenda des modèles de message</h2>
                                <p className="text-sm text-gray-700 mb-8">
                                    Programmez l'envoi de modèles de message automatiques pour vous assurer que vos clients reçoivent toutes les informations nécessaires à temps.
                                </p>

                                {/* État vide */}
                                <div className="py-16 flex flex-col items-center text-center">
                                    <FileText className="w-20 h-20 text-gray-300 mb-6" strokeWidth={1.5} />
                                    <p className="text-base text-gray-700 mb-8">
                                        Aucun modèle de message programmé...
                                    </p>
                                    <button className="px-6 py-3 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                        Sélectionner un modèle de message
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Colonne droite - Sidebar */}
                        <div className="col-span-1">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Comment programmer un modèle de message
                                </h3>
                                <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                                    <p>
                                        1. Sélectionnez le modèle que vous souhaitez envoyer ou{' '}
                                        <a href="#" className="text-[#0071c2] hover:underline">créez-en un nouveau</a>.
                                    </p>
                                    <p>
                                        2. Sélectionnez la langue par défaut dans laquelle vous souhaitez envoyer ce modèle. Si celui-ci n'est pas disponible dans la langue du client, nous nous assurerons qu'il le reçoive dans la langue que vous avez choisie par défaut.
                                    </p>
                                    <p>
                                        3. Choisissez le moment où vous souhaitez l'envoyer.
                                    </p>
                                    <div className="pt-4 border-t border-gray-200 mt-4">
                                        <p>
                                            <strong>Conseil :</strong> définissez l'anglais comme langue par défaut, sauf si vous savez que la plupart de vos clients parlent une autre langue.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <BookingFooter />
        </div>
    )
}

export default PreferencesMessages