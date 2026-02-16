import { useState } from 'react'
import { Link } from 'react-router-dom'
import BookingHeader from '../../components/booking/BookingHeader'
import propertiesData from '../../data/booking/properties.json'
import BookingFooter from '../../components/booking/BookingFooter'
import { ClipboardList, LogIn, LogOut, XCircle, Star, ChevronDown } from 'lucide-react'


function DashboardGroup() {
    const properties = propertiesData

    // Extraire les villes uniques dès le début pour l'initialisation
    const uniqueCities = [...new Set(properties.map(p => p.city))]

    const [activeTab, setActiveTab] = useState('activite')

    // States pour le dropdown de destination
    const [isDestinationOpen, setIsDestinationOpen] = useState(false)
    const [selectedCities, setSelectedCities] = useState(uniqueCities) // Toutes sélectionnées par défaut
    const [tempSelectedCities, setTempSelectedCities] = useState(uniqueCities)

    // States pour le dropdown de type d'établissement
    const [isTypeOpen, setIsTypeOpen] = useState(false)
    const [selectedTypes, setSelectedTypes] = useState([])
    const [tempSelectedTypes, setTempSelectedTypes] = useState([])

    // States pour l'onglet Performance
    const [periodFilter, setPeriodFilter] = useState('month_start')
    const [compareFilter, setCompareFilter] = useState('none')
    const [isPeriodOpen, setIsPeriodOpen] = useState(false)
    const [isCompareOpen, setIsCompareOpen] = useState(false)

    // Textes des filtres Performance
    const getPeriodText = () => {
        const options = {
            'month_start': 'Depuis le début du mois',
            'year_start': 'Depuis le début de l\'année',
            'last_month': 'Le mois dernier',
            'last_3months': '3 derniers mois',
            'custom': 'Personnaliser la période'
        }
        return options[periodFilter] || 'Depuis le début du mois'
    }

    const getCompareText = () => {
        const options = {
            'none': 'Aucune comparaison',
            'previous': 'Période précédente',
            'previous_year': 'Année précédente',
            'custom': 'Personnaliser la période',
            'competitors': 'Groupe de concurrents'
        }
        return options[compareFilter] || 'Aucune comparaison'
    }

    // Types d'établissements hardcodés
    const propertyTypes = [
        'B&B / Chambres d\'hôtes',
        'Ferme',
        'Chalet',
        'Villa',
        'Maison d\'hôtes',
        'Appartement'
    ]

    // Toggle un type spécifique
    const handleToggleType = (type) => {
        if (tempSelectedTypes.includes(type)) {
            setTempSelectedTypes(tempSelectedTypes.filter(t => t !== type))
        } else {
            setTempSelectedTypes([...tempSelectedTypes, type])
        }
    }

    // Appliquer les filtres de type
    const handleApplyTypes = () => {
        setSelectedTypes([...tempSelectedTypes])
        setIsTypeOpen(false)
    }

    // Fermer sans appliquer les types
    const handleCloseTypes = () => {
        setTempSelectedTypes([...selectedTypes])
        setIsTypeOpen(false)
    }

    // Texte à afficher dans le bouton
    const getTypeButtonText = () => {
        if (selectedTypes.length === 0) return 'Aucune option sélectionnée'
        if (selectedTypes.length === 1) return selectedTypes[0]
        return `${selectedTypes.length} types sélectionnés`
    }

    const totalProperties = properties.length

    // Calculer le nombre de propriétés par ville
    const getCityCount = (city) => properties.filter(p => p.city === city).length

    // Toggle tout sélectionner/désélectionner
    const handleToggleAll = () => {
        if (tempSelectedCities.length === uniqueCities.length) {
            setTempSelectedCities([])
        } else {
            setTempSelectedCities([...uniqueCities])
        }
    }

    // Toggle une ville spécifique
    const handleToggleCity = (city) => {
        if (tempSelectedCities.includes(city)) {
            setTempSelectedCities(tempSelectedCities.filter(c => c !== city))
        } else {
            setTempSelectedCities([...tempSelectedCities, city])
        }
    }

    // Appliquer les filtres
    const handleApply = () => {
        setSelectedCities([...tempSelectedCities])
        setIsDestinationOpen(false)
    }

    // Fermer sans appliquer
    const handleClose = () => {
        setTempSelectedCities([...selectedCities])
        setIsDestinationOpen(false)
    }

    // Texte à afficher dans le bouton
    const getButtonText = () => {
        if (selectedCities.length === 0) return 'Aucune destination sélectionnée'
        if (selectedCities.length === uniqueCities.length) {
            return `France : ${totalProperties} hébergement${totalProperties > 1 ? 's' : ''}`
        }
        const count = properties.filter(p => selectedCities.includes(p.city)).length
        return `${selectedCities.join(', ')} : ${count} hébergement${count > 1 ? 's' : ''}`
    }

    // Filtrer les propriétés selon les villes sélectionnées
    const filteredProperties = properties.filter(p => selectedCities.includes(p.city))

    // Calcul des stats "Aujourd'hui" basées sur les données mockées
    const todayStats = {
        reservations: 1,
        arrivals: 2,
        departures: 1,
        comments: 0,
        cancellations: 0
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <BookingHeader />

            <main className="max-w-7xl mx-auto px-6 py-6">
                {/* Header avec titre et bouton */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Page d'accueil du groupe
                    </h1>
                </div>

                {/* Alerte coordonnées bancaires
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3 flex-1">
                            <h3 className="text-sm font-semibold text-gray-900">
                                Action requise : ajoutez les coordonnées bancaires de vos établissements
                            </h3>
                            <p className="mt-1 text-sm text-gray-700">
                                Veuillez ajouter vos coordonnées bancaires pour recevoir des versements dans le cadre des Paiements par Booking.com. Si ces informations ne sont pas enregistrées dans notre système, nous ne pouvons pas vous payer et des conséquences réglementaires pourraient s'ensuivre.
                            </p>
                            <button className="mt-2 text-sm font-medium text-[#0071c2] hover:underline">
                                Ajouter mes coordonnées bancaires
                            </button>
                        </div>
                    </div>
                </div> */}

                {/* Encadré Programme Genius */}
                <div className="bg-white border border-gray-200 rounded p-6 mb-6 relative">
                    <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="flex items-start gap-6">
                        <div className="text-5xl font-bold text-green-600">+37.17 %</div>
                        <div className="flex-1">
                            <p className="text-gray-900 font-medium mb-2">
                                Le programme Genius a boosté les vues de l'établissement Appartement lumineux avec vue sur jardin Cannes de 37.17 % dans les résultats de recherche au cours des 30 derniers jours
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                                Vous avez 26 établissements supplémentaires admissibles au programme Genius qui pourraient bénéficier d'un boost de visibilité similaire.
                            </p>
                            <button className="text-sm font-medium text-[#0071c2] hover:underline">
                                Ajouter plus d'établissements au programme Genius
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filtres */}
                <div className="flex items-center gap-4 mb-6">
                    {/* Filtrer par destination - Dropdown custom */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Filtrer par destination
                        </label>
                        <button
                            onClick={() => setIsDestinationOpen(!isDestinationOpen)}
                            className="w-64 px-4 py-2 border border-gray-300 rounded bg-white text-sm text-left flex items-center justify-between hover:border-gray-400"
                        >
                            <span>{getButtonText()}</span>
                            <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isDestinationOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Panel */}
                        {isDestinationOpen && (
                            <div className="absolute z-50 mt-1 w-80 bg-white border border-gray-300 rounded-lg shadow-lg">
                                <div className="p-4">
                                    {/* Tout sélectionner */}
                                    <label className="flex items-center gap-3 mb-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                                        <input
                                            type="checkbox"
                                            checked={tempSelectedCities.length === uniqueCities.length}
                                            onChange={handleToggleAll}
                                            className="w-5 h-5 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                        />
                                        <span className="text-sm font-medium text-gray-900">Tout sélectionner</span>
                                    </label>

                                    {/* Séparateur */}
                                    <div className="border-t border-gray-200 my-2"></div>

                                    {/* France avec sous-villes */}
                                    <div className="mb-2">
                                        <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                                            <input
                                                type="checkbox"
                                                checked={tempSelectedCities.length === uniqueCities.length}
                                                onChange={handleToggleAll}
                                                className="w-5 h-5 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                            />
                                            <span className="text-sm font-semibold text-gray-900">
                                                France
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                ({totalProperties} hébergement{totalProperties > 1 ? 's' : ''})
                                            </span>
                                        </label>

                                        {/* Villes indentées */}
                                        <div className="ml-8 mt-1 space-y-1">
                                            {uniqueCities.map(city => (
                                                <label
                                                    key={city}
                                                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={tempSelectedCities.includes(city)}
                                                        onChange={() => handleToggleCity(city)}
                                                        className="w-5 h-5 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                                    />
                                                    <span className="text-sm text-gray-700">{city}</span>
                                                    <span className="text-sm text-gray-500">
                                                        ({getCityCount(city)} hébergement{getCityCount(city) > 1 ? 's' : ''})
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Boutons Fermer et Appliquer */}
                                <div className="border-t border-gray-200 p-3 flex items-center justify-end gap-3">
                                    <button
                                        onClick={handleClose}
                                        className="px-4 py-2 text-sm text-[#0071c2] hover:bg-blue-50 rounded font-medium"
                                    >
                                        Fermer
                                    </button>
                                    <button
                                        onClick={handleApply}
                                        className="px-4 py-2 text-sm bg-[#0071c2] text-white rounded hover:bg-[#005999] font-medium"
                                    >
                                        Appliquer
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Filtrer par type d'établissement - Dropdown custom */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Filtrer par type d'établissement
                        </label>
                        <button
                            onClick={() => setIsTypeOpen(!isTypeOpen)}
                            className="w-64 px-4 py-2 border border-gray-300 rounded bg-white text-sm text-left flex items-center justify-between hover:border-gray-400"
                        >
                            <span className={selectedTypes.length === 0 ? 'text-gray-500' : 'text-gray-900'}>
                                {getTypeButtonText()}
                            </span>
                            <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isTypeOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Panel */}
                        {isTypeOpen && (
                            <div className="absolute z-50 mt-1 w-80 bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 flex flex-col">
                                <div className="p-4 overflow-y-auto flex-1">
                                    {/* Liste des types */}
                                    <div className="space-y-1">
                                        {propertyTypes.map(type => (
                                            <label
                                                key={type}
                                                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={tempSelectedTypes.includes(type)}
                                                    onChange={() => handleToggleType(type)}
                                                    className="w-5 h-5 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                                />
                                                <span className="text-sm text-gray-700">{type}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Boutons Effacer et Appliquer */}
                                <div className="border-t border-gray-200 p-3 flex items-center justify-between">
                                    <button
                                        onClick={() => setTempSelectedTypes([])}
                                        className="px-4 py-2 text-sm text-[#0071c2] hover:bg-blue-50 rounded font-medium"
                                    >
                                        Effacer
                                    </button>
                                    <button
                                        onClick={handleApplyTypes}
                                        className="px-4 py-2 text-sm bg-[#0071c2] text-white rounded hover:bg-[#005999] font-medium"
                                    >
                                        Appliquer
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Recherche
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Filtrez par identifiant"
                                className="w-64 px-4 py-2 pr-10 border border-gray-300 rounded text-sm"
                            />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Onglets */}
                <div className="flex gap-1 border-b border-gray-200 mb-6">
                    <button
                        onClick={() => setActiveTab('activite')}
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'activite'
                            ? 'border-[#0071c2] text-[#0071c2]'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Activité
                    </button>
                    <button
                        onClick={() => setActiveTab('performance')}
                        className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'performance'
                            ? 'border-[#0071c2] text-[#0071c2]'
                            : 'border-transparent text-gray-600 hover:text-gray-900'
                            }`}
                    >
                        Performance
                    </button>
                    <button
                        disabled
                        className="px-6 py-3 text-sm font-medium border-b-2 border-transparent text-gray-400 cursor-not-allowed"
                    >
                        Paramètres
                    </button>
                </div>

                {/* Contenu Activité */}
                {activeTab === 'activite' && (
                    <>
                        {/* Section Aujourd'hui */}
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Aujourd'hui</h2>

                            <div className="bg-white border border-gray-200 rounded-lg p-6">
                                <div className="grid grid-cols-5 gap-8">
                                    {/* Réservation */}
                                    <div className="text-center">
                                        <div className="flex justify-center mb-3">
                                            <ClipboardList className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900 mb-1">{todayStats.reservations}</div>
                                        <div className="text-sm text-[#0071c2] font-medium">Réservation</div>
                                    </div>

                                    {/* Arrivées */}
                                    <div className="text-center border-l border-gray-200 pl-8">
                                        <div className="flex justify-center mb-3">
                                            <LogIn className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900 mb-1">{todayStats.arrivals}</div>
                                        <div className="text-sm text-[#0071c2] font-medium">Arrivées</div>
                                    </div>

                                    {/* Départ */}
                                    <div className="text-center border-l border-gray-200 pl-8">
                                        <div className="flex justify-center mb-3">
                                            <LogOut className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900 mb-1">{todayStats.departures}</div>
                                        <div className="text-sm text-[#0071c2] font-medium">Départ</div>
                                    </div>

                                    {/* Commentaire */}
                                    <div className="text-center border-l border-gray-200 pl-8">
                                        <div className="flex justify-center mb-3">
                                            <Star className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900 mb-1">{todayStats.comments}</div>
                                        <div className="text-sm text-[#0071c2] font-medium">Commentaire</div>
                                    </div>

                                    {/* Annulation */}
                                    <div className="text-center border-l border-gray-200 pl-8">
                                        <div className="flex justify-center mb-3">
                                            <XCircle className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900 mb-1">{todayStats.cancellations}</div>
                                        <div className="text-sm text-[#0071c2] font-medium">Annulation</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Filtre par statut */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Filtrer par statut
                            </label>
                            <select className="w-64 px-4 py-2 border border-gray-300 rounded bg-white text-sm">
                                <option>Tous les établissements</option>
                            </select>
                        </div>

                        {/* Actions rapides */}
                        <div className="flex items-center gap-4 mb-4">
                            <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Télécharger
                            </button>

                            <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Données personnalisées
                            </button>

                            <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Vue personnalisée
                            </button>
                        </div>


                        {/* Tableau des établissements */}
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Identifiant
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Établissement
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Statut sur Booking.com
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Arrivées dans les prochaines 48 heures
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Départs dans les prochaines 48 heures
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Messages des clients
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Messages de Booking.com
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredProperties.map((property) => (
                                        <tr key={property.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {property.propertyId}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    to={`/booking/property/${property.id}/accueil`}
                                                    className="block hover:underline"
                                                >
                                                    <div className="font-medium text-gray-900">{property.name}</div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="w-6 h-4 rounded overflow-hidden flex-shrink-0">
                                                            <div className="flex h-full">
                                                                <div className="w-1/3 bg-[#002395]"></div>
                                                                <div className="w-1/3 bg-white"></div>
                                                                <div className="w-1/3 bg-[#ED2939]"></div>
                                                            </div>
                                                        </div>
                                                        <span className="text-sm text-gray-500">{property.address}</span>
                                                    </div>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span className="text-sm text-gray-700">{property.status}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                                {property.upcomingArrivals}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                                {property.upcomingDepartures}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                                {property.unreadMessages}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <button className="text-white bg-[#0071c2] hover:bg-[#005999] rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                                                    ?
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {/* Contenu Performance */}
                {activeTab === 'performance' && (
                    <>
                        {/* Bloc Performance globale */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Votre performance globale cette semaine</h2>

                            <div className="grid grid-cols-4 gap-6 mb-6">
                                {/* Prix moyen par nuitée réservée */}
                                <div className="border-r border-gray-200 pr-6">
                                    <div className="text-sm text-gray-600 mb-3">Prix moyen par nuitée réservée</div>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">€ 85,78</div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded">+12%</span>
                                        <span className="text-sm text-gray-600">par rapport à la semaine précédente</span>
                                    </div>
                                </div>

                                {/* Prix moyen par nuitée effectuée */}
                                <div className="border-r border-gray-200 pr-6">
                                    <div className="text-sm text-gray-600 mb-3">Prix moyen par nuitée effectuée</div>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">€ 86,29</div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded">+8%</span>
                                        <span className="text-sm text-gray-600">par rapport à la semaine précédente</span>
                                    </div>
                                </div>

                                {/* Taux d'annulation */}
                                <div className="border-r border-gray-200 pr-6">
                                    <div className="text-sm text-gray-600 mb-3">Taux d'annulation</div>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">14%</div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">+26%</span>
                                        <span className="text-sm text-gray-600">par rapport à la semaine précédente</span>
                                    </div>
                                </div>

                                {/* Nuitées effectuées */}
                                <div>
                                    <div className="text-sm text-gray-600 mb-3">Nuitées effectuées</div>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">225</div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded">+7%</span>
                                        <span className="text-sm text-gray-600">par rapport à la semaine précédente</span>
                                    </div>
                                </div>
                            </div>

                            {/* Deuxième ligne de stats */}
                            <div className="grid grid-cols-4 gap-6 pt-6 border-t border-gray-200">
                                {/* Revenus associés aux séjours effectués */}
                                <div className="border-r border-gray-200 pr-6">
                                    <div className="text-sm text-gray-600 mb-3">Revenus associés aux séjours effectués</div>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">€ 6 884,25</div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded">+4%</span>
                                        <span className="text-sm text-gray-600">par rapport à la semaine précédente</span>
                                    </div>
                                </div>

                                {/* Fenêtre de réservation moyenne */}
                                <div className="border-r border-gray-200 pr-6">
                                    <div className="text-sm text-gray-600 mb-3">Fenêtre de réservation moyenne</div>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">38</div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded">-3%</span>
                                        <span className="text-sm text-gray-600">par rapport à la semaine précédente</span>
                                    </div>
                                </div>

                                {/* Durée moyenne du séjour */}
                                <div className="border-r border-gray-200 pr-6">
                                    <div className="text-sm text-gray-600 mb-3">Durée moyenne du séjour</div>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">4</div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">+18%</span>
                                        <span className="text-sm text-gray-600">par rapport à la semaine précédente</span>
                                    </div>
                                </div>

                                {/* Ouvert / Réservable */}
                                <div>
                                    <div className="text-sm text-gray-600 mb-3">Ouvert / Réservable</div>
                                    <div className="text-3xl font-bold text-gray-900 mb-2">3/3</div>
                                    <div className="text-sm text-gray-600">établissements dans ce groupe</div>
                                </div>
                            </div>

                            {/* Message d'opportunité */}
                            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
                                <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                </svg>
                                <div className="text-sm text-gray-700">
                                    Nous avons identifié plusieurs opportunités pour booster votre activité lors de la semaine à venir.{' '}
                                    <a href="#" className="text-[#0071c2] hover:underline font-medium">Lancez-vous.</a>
                                </div>
                            </div>
                        </div>

                        {/* Texte au dessus du tableau */}
                        <div className="mb-6">
                            <p className="text-sm text-gray-700">Vous trouverez ci-dessous le détail des performances de vos établissements.</p>
                        </div>

                        <div className="mt-8 text-center text-sm text-gray-500">
                            <p>2 établissements affichés</p>
                        </div>

                        {/* Filtres Performance */}
                        <div className="flex items-end gap-4 mb-6">
                            {/* Filter par période */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Filtrer par période
                                </label>
                                <button
                                    onClick={() => setIsPeriodOpen(!isPeriodOpen)}
                                    className="w-64 px-4 py-2 border border-gray-300 rounded bg-white text-sm text-left flex items-center justify-between hover:border-gray-400"
                                >
                                    <span>{getPeriodText()}</span>
                                    <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isPeriodOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isPeriodOpen && (
                                    <div className="absolute z-50 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg">
                                        <div className="py-2">
                                            <button
                                                onClick={() => { setPeriodFilter('month_start'); setIsPeriodOpen(false); }}
                                                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${periodFilter === 'month_start' ? 'bg-blue-50 text-[#0071c2]' : 'text-gray-700'}`}
                                            >
                                                Depuis le début du mois
                                            </button>
                                            <button
                                                onClick={() => { setPeriodFilter('year_start'); setIsPeriodOpen(false); }}
                                                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${periodFilter === 'year_start' ? 'bg-blue-50 text-[#0071c2]' : 'text-gray-700'}`}
                                            >
                                                Depuis le début de l'année
                                            </button>
                                            <button
                                                onClick={() => { setPeriodFilter('last_month'); setIsPeriodOpen(false); }}
                                                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${periodFilter === 'last_month' ? 'bg-blue-50 text-[#0071c2]' : 'text-gray-700'}`}
                                            >
                                                Le mois dernier
                                            </button>
                                            <button
                                                onClick={() => { setPeriodFilter('last_3months'); setIsPeriodOpen(false); }}
                                                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${periodFilter === 'last_3months' ? 'bg-blue-50 text-[#0071c2]' : 'text-gray-700'}`}
                                            >
                                                3 derniers mois
                                            </button>
                                            <div className="border-t border-gray-200 my-1"></div>
                                            <button
                                                onClick={() => { setPeriodFilter('custom'); setIsPeriodOpen(false); }}
                                                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${periodFilter === 'custom' ? 'bg-blue-50 text-[#0071c2]' : 'text-gray-700'}`}
                                            >
                                                Personnaliser la période
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Comparer avec */}
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Comparer avec
                                </label>
                                <button
                                    onClick={() => setIsCompareOpen(!isCompareOpen)}
                                    className="w-64 px-4 py-2 border border-gray-300 rounded bg-white text-sm text-left flex items-center justify-between hover:border-gray-400"
                                >
                                    <span>{getCompareText()}</span>
                                    <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isCompareOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isCompareOpen && (
                                    <div className="absolute z-50 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg">
                                        <div className="py-2">
                                            <button
                                                onClick={() => { setCompareFilter('none'); setIsCompareOpen(false); }}
                                                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${compareFilter === 'none' ? 'bg-blue-50 text-[#0071c2]' : 'text-gray-700'}`}
                                            >
                                                Aucune comparaison
                                            </button>
                                            <button
                                                onClick={() => { setCompareFilter('previous'); setIsCompareOpen(false); }}
                                                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${compareFilter === 'previous' ? 'bg-blue-50 text-[#0071c2]' : 'text-gray-700'}`}
                                            >
                                                Période précédente
                                            </button>
                                            <button
                                                onClick={() => { setCompareFilter('previous_year'); setIsCompareOpen(false); }}
                                                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${compareFilter === 'previous_year' ? 'bg-blue-50 text-[#0071c2]' : 'text-gray-700'}`}
                                            >
                                                Année précédente
                                            </button>
                                            <div className="border-t border-gray-200 my-1"></div>
                                            <button
                                                onClick={() => { setCompareFilter('custom'); setIsCompareOpen(false); }}
                                                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${compareFilter === 'custom' ? 'bg-blue-50 text-[#0071c2]' : 'text-gray-700'}`}
                                            >
                                                Personnaliser la période
                                            </button>
                                            <button
                                                onClick={() => { setCompareFilter('competitors'); setIsCompareOpen(false); }}
                                                className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${compareFilter === 'competitors' ? 'bg-blue-50 text-[#0071c2]' : 'text-gray-700'}`}
                                            >
                                                Groupe de concurrents
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Bouton Voir la performance */}
                            <button className="px-6 py-2 bg-[#0071c2] text-white rounded font-medium text-sm hover:bg-[#005999] transition-colors">
                                Voir les données
                            </button>
                        </div>

                        {/* Tableau Performance */}
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Identifiant</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Hébergement</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Prix moyen par nuitée réservée</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Prix moyen par nuitée effectuée</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Taux d'annulation</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Nuitées effectuées</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Revenus associés aux séjours effectués</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Note des commentaires</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Réservations d'hébergements</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">
                                                Taux de clics (30 derniers jours)
                                                <span
                                                    className="inline-block ml-1 w-4 h-4 bg-gray-300 rounded-full text-center leading-4 text-white text-xs cursor-help"
                                                    title="Ces données sont seulement disponibles pour les 30 derniers jours, contrairement aux autres données de performance qui concernent la période filtrée."
                                                >
                                                    i
                                                </span>
                                            </th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">
                                                Conversion (30 derniers jours)
                                                <span
                                                    className="inline-block ml-1 w-4 h-4 bg-gray-300 rounded-full text-center leading-4 text-white text-xs cursor-help"
                                                    title="Ces données sont seulement disponibles pour les 30 derniers jours, contrairement aux autres données de performance qui concernent la période filtrée."
                                                >
                                                    i
                                                </span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {/* Property 1 - Cannes */}
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-4 text-sm text-gray-900">15591345</td>
                                            <td className="px-4 py-4">
                                                <Link to="/booking/property/prop_001/accueil" className="text-[#0071c2] hover:underline text-sm font-medium">
                                                    Appartement lumineux avec vue sur jardin
                                                </Link>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="w-6 h-4 rounded overflow-hidden flex-shrink-0">
                                                        <div className="flex h-full">
                                                            <div className="w-1/3 bg-[#002395]"></div>
                                                            <div className="w-1/3 bg-white"></div>
                                                            <div className="w-1/3 bg-[#ED2939]"></div>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-gray-500">12 Rue des Mimosas, Cannes</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-900">€ 95</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-900">€ 98</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-900">2%</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-900">142</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-900">€ 13 916</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-900">8.9</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-900">48</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-900">3.2%</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-900">1.8%</td>
                                        </tr>

                                        {/* Property 2 - Marseille */}
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-4 py-4 text-sm text-gray-900">15555459</td>
                                            <td className="px-4 py-4">
                                                <Link to="/booking/property/prop_002/accueil" className="text-[#0071c2] hover:underline text-sm font-medium">
                                                    Studio moderne centre-ville avec parking
                                                </Link>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <div className="w-6 h-4 rounded overflow-hidden flex-shrink-0">
                                                        <div className="flex h-full">
                                                            <div className="w-1/3 bg-[#002395]"></div>
                                                            <div className="w-1/3 bg-white"></div>
                                                            <div className="w-1/3 bg-[#ED2939]"></div>
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-gray-500">8 Avenue de la Liberté, Marseille</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-900">€ 75</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-900">€ 78</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-900">4%</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-900">83</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-900">€ 6 474</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-900">8.4</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-900">29</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-900">2.8%</td>
                                            <td className="px-4 py-4 text-center text-sm text-gray-900">1.5%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </>
                )}

                {/* Encadré feedback */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700">
                            Votre avis est très important pour nous. Avez-vous trouvé ces données utiles ?
                        </p>
                        <div className="flex items-center gap-3">
                            <button
                                className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                                aria-label="Utile"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                </svg>
                            </button>
                            <button
                                className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                                aria-label="Pas utile"
                            >
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <BookingFooter />
        </div>
    )
}

export default DashboardGroup