import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { UserCircle, X } from 'lucide-react'
import { useState } from 'react'

function Profil() {
    const [showCovidAlert, setShowCovidAlert] = useState(true)
    const [profileType, setProfileType] = useState('host') // 'host' or 'company'
    const [hostName, setHostName] = useState('')
    const [aboutAccommodation, setAboutAccommodation] = useState('Appartement chaleureux et lumineux au cœur d\'Avignon, idéal pour un couple.\n\nNous apprécions la hauteur sous plafond, on voyage sinon avec que la salon cosy avec cheminée décorative.')
    const [aboutHost, setAboutHost] = useState('')
    const [aboutNeighborhood, setAboutNeighborhood] = useState("Cet appartement est situé dans les quartiers nord de l'intra-muros, dans le quartier prisé des « hôtels particuliers », à proximité immédiate du Palais des Papes. Vous serez au cœur de la vie active et culturelle d'Avignon, à quelques pas des principales attractions touristiques, des commerces et des restaurants. 1. Attractions à proximité : Palais des Papes : À environ 8 minutes à pied du logement, ce monument emblématique est l'un des plus grands palais gothiques d'Europe et une attraction incontournable à Avignon.")
    const [selectedLanguage, setSelectedLanguage] = useState('Français')
    const [activeTab, setActiveTab] = useState('french')

    const maxCharsHostName = 80
    const maxCharsAboutAccommodation = 4000
    const maxCharsAboutHost = 2000
    const maxCharsAboutNeighborhood = 4000

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-3xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Votre profil</h1>
                <p className="text-sm text-gray-600 mb-8">
                    Ces informations peuvent n'afficher sur notre site pour vos clients potentiels et vous permettront de mettre en avant vos hébergements.
                </p>

                {/* Type de profil */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Type de profil</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Choisissez l'option « Profil de l'hôte » si vous gérez personnellement votre hébergement ou « Profil de la société » si ce rôle l'hôte partie d'une société.
                    </p>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="radio"
                                checked={profileType === 'host'}
                                onChange={() => setProfileType('host')}
                                className="w-4 h-4 text-[#0071c2] focus:ring-[#0071c2]"
                            />
                            <span className="text-sm text-gray-900">Profil de l'hôte</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="radio"
                                checked={profileType === 'company'}
                                onChange={() => setProfileType('company')}
                                className="w-4 h-4 text-[#0071c2] focus:ring-[#0071c2]"
                            />
                            <span className="text-sm text-gray-900">Profil de société</span>
                        </label>
                    </div>
                </div>

                {/* Informations générales */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Informations générales</h2>

                    {/* Nom de l'hôte */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Nom de l'hôte
                        </label>
                        <input
                            type="text"
                            value={hostName}
                            onChange={(e) => setHostName(e.target.value.slice(0, maxCharsHostName))}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                            maxLength={maxCharsHostName}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {hostName.length} caractères restants
                        </p>
                    </div>

                    {/* Photo de profil */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Photo de profil
                        </label>
                        <p className="text-sm text-gray-600 mb-4">
                            Ajouter une photo de vous va vous rendre que qu'utilisés les clients. Pour ajouter une touche personnelle à la page publique de votre profil, privilégiez une photo montrant bien votre visage. Assurez-vous de ne pas utiliser de coordonnées personnelles.
                        </p>
                        <div className="flex flex-col items-center gap-3">
                            <UserCircle className="w-20 h-20 text-gray-300" strokeWidth={1} />
                            <button className="px-4 py-2 text-[#0071c2] border border-[#0071c2] rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                                Ajouter une photo
                            </button>
                        </div>
                    </div>
                </div>

                {/* Informations détaillées */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Informations détaillées</h2>

                    {/* Alerte COVID */}
                    {showCovidAlert && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900 mb-2">
                                    Instructions relatives au coronavirus (COVID-19)
                                </p>
                                <p className="text-sm text-gray-700">
                                    Il vous faudra peut-être inclure une description détaillée de vos processus de nettoyage/santé dans la description de votre établissement ou dans votre profil d'hôte n'est autorisé. Si cela profil en disponible dans plusieurs langues, veuillez noter que dans lequel s'applique également à toutes les traductions.
                                </p>
                                <p className="text-sm text-gray-700 mt-2">
                                    Si vous voulez fournir des informations liées au coronavirus à vos clients, vous pouvez les ajouter à la rubrique « À propos », via votre établissement en cliquant ici.
                                </p>
                            </div>
                            <button
                                onClick={() => setShowCovidAlert(false)}
                                className="ml-4 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* Onglets langue */}
                    <div className="flex gap-4 border-b border-gray-200 mb-6">
                        <button
                            onClick={() => setActiveTab('french')}
                            className={`pb-3 px-2 text-sm font-medium transition-colors relative ${activeTab === 'french'
                                ? 'text-[#0071c2] border-b-2 border-[#0071c2]'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Français
                        </button>
                        <button
                            onClick={() => setActiveTab('add')}
                            className="pb-3 px-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Ajouter une langue
                        </button>
                    </div>

                    {/* Dropdown langue */}
                    <div className="mb-6">
                        <label className="block text-sm text-gray-600 mb-2">
                            Choisissez la langue dans laquelle vous souhaitez rédiger :
                        </label>
                        <select
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                        >
                            <option>Français</option>
                            <option>English</option>
                            <option>Español</option>
                        </select>
                    </div>

                    {/* À propos de l'hébergement */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            À propos de l'hébergement
                        </label>
                        <p className="text-sm text-gray-600 mb-3">
                            Racontez-en sur votre hébergement unique et tout ce qui pourrait ajoutera de charme pour vos clients, comme la décoration, les équipements ou des caractéristiques particulières. Les règles de votre hébergement ne doivent apparaître à cet endroit.
                        </p>
                        <textarea
                            value={aboutAccommodation}
                            onChange={(e) => setAboutAccommodation(e.target.value.slice(0, maxCharsAboutAccommodation))}
                            rows={5}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent resize-y"
                            maxLength={maxCharsAboutAccommodation}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {aboutAccommodation.length}/{maxCharsAboutAccommodation} caractères restants
                        </p>
                    </div>

                    {/* À propos de l'hôte */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            À propos de l'hôte
                        </label>
                        <p className="text-sm text-gray-600 mb-3">
                            Ajoutez ici votre message de bienvenue pour mettre vos clients à l'aise et leur donner envie de séjour chez vous. Détaillez pourquoi vous aimez accueillir des voyageurs ou partagez vos centres d'intérêt.
                        </p>
                        <textarea
                            value={aboutHost}
                            onChange={(e) => setAboutHost(e.target.value.slice(0, maxCharsAboutHost))}
                            rows={5}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent resize-y"
                            maxLength={maxCharsAboutHost}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {aboutHost.length}/{maxCharsAboutHost} caractères restants
                        </p>
                    </div>

                    {/* À propos du quartier */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            À propos du quartier
                        </label>
                        <p className="text-sm text-gray-600 mb-3">
                            Qu'est-ce qui rend le plus à ces clients à proximité ? Ajoutez des recommandations sur le quartier, les attractions locales et les lieux préférés de votre ville pour les amusants en excitant.
                        </p>
                        <textarea
                            value={aboutNeighborhood}
                            onChange={(e) => setAboutNeighborhood(e.target.value.slice(0, maxCharsAboutNeighborhood))}
                            rows={5}
                            className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent resize-y"
                            maxLength={maxCharsAboutNeighborhood}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            {aboutNeighborhood.length}/{maxCharsAboutNeighborhood} caractères restants
                        </p>
                    </div>
                </div>

                {/* À propos de votre établissement */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">À propos de votre établissement</h2>
                    <p className="text-sm text-gray-600 mb-6">
                        Informations supplémentaire sur votre établissement (facultatif)
                    </p>

                    <div className="space-y-4">
                        {/* À quelle date a ouvert votre établissement */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">
                                    À quelle date a ouvert votre établissement ?
                                </label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent">
                                    <option value="">--</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">&nbsp;</label>
                                <input
                                    type="text"
                                    placeholder="ex: 1985"
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Quand l'établissement a-t-il été construit */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">
                                Quand l'établissement a-t-il été construit ?
                            </label>
                            <input
                                type="text"
                                placeholder="ex: 1985"
                                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                            />
                        </div>

                        {/* Vivez-vous sur place */}
                        <div>
                            <label className="block text-sm text-gray-700 mb-2">
                                Vivez-vous sur place ?
                            </label>
                            <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent">
                                <option>Fan sur place</option>
                                <option>Oui</option>
                                <option>Non</option>
                            </select>
                        </div>

                        {/* Quand l'établissement a-t-il été rénové */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">
                                    Quand l'établissement a-t-il été rénové pour la dernière fois ?
                                </label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent">
                                    <option value="">--</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-700 mb-2">&nbsp;</label>
                                <input
                                    type="text"
                                    placeholder="ex: 1985"
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600 mt-6">
                        En enregistrant ce contenu, j'accepte que l'ensemble de mon profil soit utilisé sur Booking.com sur un site web Internet, son app mobile, ses applications ainsi que sur tout autre support de communication.
                    </p>
                </div>

                {/* Bouton Enregistrer */}
                <button className="px-6 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                    Enregistrer
                </button>
            </main>

            <BookingFooter />
        </div>
    )
}

export default Profil