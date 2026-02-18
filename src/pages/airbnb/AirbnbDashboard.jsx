import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import AirbnbHeader from '../../components/airbnb/AirbnbHeader'
import AirbnbFooter from '../../components/airbnb/AirbnbFooter'
import reservations from '../../data/airbnb/reservations.json'
import properties from '../../data/airbnb/properties.json'
import demandes from '../../data/airbnb/demandes.json'
import { hydrateReservation, hydrateDemande, formatDateShort } from '../../data/airbnb/dateUtils.js'

const hydratedReservations = reservations.map(hydrateReservation)
const hydratedDemandes = demandes.map(hydrateDemande)

function AirbnbDashboard() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('today')
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [selectedProperties, setSelectedProperties] = useState([])

    // Créer un mapping propertyName -> propertyImage
    const propertyImages = {}
    reservations.forEach(res => {
        if (!propertyImages[res.propertyName]) {
            propertyImages[res.propertyName] = res.propertyImage
        }
    })

    // Extraire la liste unique des propriétés
    const uniqueProperties = [...new Set(reservations.map(res => res.propertyId))].map((propId) => {
        const property = properties.find(p => p.propertyId === propId)
        return {
            id: propId,
            name: property?.name,
            image: property?.image
        }
    })

    // Filtrer les réservations selon l'onglet actif
    const todayReservations = hydratedReservations.filter(res => res.status === 'confirmed')
    const upcomingReservations = hydratedReservations.filter(res => res.status === 'upcoming')

    let currentReservations = activeTab === 'today' ? todayReservations : upcomingReservations

    // Appliquer le filtre par propriété si des propriétés sont sélectionnées
    if (selectedProperties.length > 0) {
        currentReservations = currentReservations.filter(res =>
            selectedProperties.includes(res.propertyName)
        )
    }

    // Gérer la sélection/désélection des propriétés
    const toggleProperty = (propertyName) => {
        setSelectedProperties(prev => {
            if (prev.includes(propertyName)) {
                return prev.filter(p => p !== propertyName)
            } else {
                return [...prev, propertyName]
            }
        })
    }

    // Effacer tous les filtres
    const clearFilters = () => {
        setSelectedProperties([])
    }

    // Appliquer et fermer
    const applyFilters = () => {
        setIsFilterOpen(false)
    }

    // Formater les dates en français
    const formatDate = (date) => formatDateShort(date)

    // Formater une plage de dates "19-20 fév"
    const formatDateRange = (checkIn, checkOut) => {
        const inDate = new Date(checkIn)
        const outDate = new Date(checkOut)
        const month = outDate.toLocaleDateString('fr-FR', { month: 'short' })
        return `${inDate.getDate()}-${outDate.getDate()} ${month}`
    }

    return (
        <div className="font-airbnb min-h-screen bg-white flex flex-col">
            <AirbnbHeader />

            <main className="flex-1">

                {/* Contenu principal (centré, max-w-4xl) */}

                {/* Alertes en haut (fond gris) */}
                <div className="bg-[#f7f7f7] py-6">
                    <div className="max-w-3xl mx-auto px-6">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Alerte 1 */}
                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-lg">
                                <div className="relative">
                                    <img
                                        src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200&h=200&fit=crop"
                                        alt="Property"
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                        1
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-600 mb-1">Esprit de Montmartre Studio Parisien</p>
                                    <h3 className="font-semibold text-gray-900 mb-1">
                                        Réactivez votre annonce
                                    </h3>
                                    <p className="text-sm text-[#FF385C]">
                                        Action requise pour débloquer...
                                    </p>
                                </div>
                            </div>

                            {/* Alerte 2 */}
                            <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-lg">
                                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-3xl">📊</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-gray-600 mb-1">Votre compte</p>
                                    <h3 className="font-semibold text-gray-900 mb-1">
                                        Ajoutez vos informations fiscales
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        Action requise pour recevoir vos...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto px-6">
                    {/* Toggle Aujourd'hui / À venir (centré) + Bouton Filtrer */}
                    <div className="py-8 flex items-center justify-between">
                        {/* Toggles centrés */}
                        <div className="flex-1 flex justify-center gap-2">
                            <button
                                onClick={() => setActiveTab('today')}
                                className={`px-6 py-2 rounded-full font-semibold transition-colors ${activeTab === 'today'
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                Aujourd'hui
                            </button>
                            <button
                                onClick={() => setActiveTab('upcoming')}
                                className={`px-6 py-2 rounded-full font-semibold transition-colors ${activeTab === 'upcoming'
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                À venir
                            </button>
                        </div>

                        {/* Bouton Filtrer (collé au bord droit) */}
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-semibold text-gray-900 flex items-center gap-2 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            Filtrer
                            {selectedProperties.length > 0 && (
                                <span className="ml-1 px-2 py-0.5 bg-gray-900 text-white text-xs rounded-full">
                                    {selectedProperties.length}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Section Demandes */}
                    <div className="mb-10">
                        <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
                            {demandes.length} demandes
                        </h2>
                        <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
                            {hydratedDemandes.map((demande) => (
                                <div
                                    key={demande.id}
                                    onClick={() => navigate(`/airbnb/demande/${demande.id}`)}
                                    className="bg-white rounded-2xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow text-center"
                                >
                                    <p className="text-xs text-gray-500 mb-4">Il reste {demande.hoursRemaining} heures</p>
                                    <img
                                        src={demande.guestAvatar}
                                        alt={demande.guestName}
                                        className="w-14 h-14 rounded-full object-cover mx-auto mb-4"
                                    />
                                    <p className="text-sm font-semibold text-gray-900 mb-1">Demande pour la...</p>
                                    <p className="text-sm text-gray-700 mb-1">
                                        {formatDateShort(demande.checkIn)}–{formatDateShort(demande.checkOut)}
                                    </p>
                                    <p className="text-xs text-gray-500 line-clamp-1">{demande.propertyName}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Titre avec nombre de réservations (centré) */}
                    <h1 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
                        Vous avez {currentReservations.length} réservation{currentReservations.length > 1 ? 's' : ''} {activeTab === 'today' ? '' : 'à venir'}
                    </h1>

                    {/* Liste des réservations */}
                    <div className="space-y-4 mb-12">
                        {currentReservations.map((reservation) => (
                            <div
                                key={reservation.id}
                                className="flex items-center gap-6 p-6 bg-white rounded-xl shadow-lg cursor-pointer"
                                onClick={() => navigate(`/airbnb/reservation/${reservation.id}`)}
                            >
                                {/* Heure / Date */}
                                <div className="text-left min-w-[100px]">
                                    <p className="text-sm text-gray-900 font-medium">
                                        {activeTab === 'today'
                                            ? (reservation.checkOutOffset === 0
                                                ? reservation.checkOutTime
                                                : reservation.checkInTime)
                                            : formatDateRange(reservation.checkIn, reservation.checkOut)}
                                    </p>
                                </div>

                                {/* Infos principales */}
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900 mb-1">
                                        Le groupe géré par {reservation.guestName} et composé de {reservation.guestCount} {reservation.checkOutOffset === 0 ? 'part' : 'arrive'} aujourd'hui
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {properties.find(p => p.propertyId === reservation.propertyId)?.name}
                                    </p>
                                </div>

                                {/* Avatars */}
                                <div className="flex items-center">
                                    <img
                                        src={reservation.guestAvatar}
                                        alt={reservation.guestName}
                                        className="w-12 h-12 rounded-full border-2 border-white object-cover"
                                    />
                                    <img
                                        src={properties.find(p => p.propertyId === reservation.propertyId)?.image}
                                        alt={reservation.propertyName}
                                        className="w-12 h-12 rounded-full border-2 border-white -ml-4 object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message si aucune réservation après filtre */}
                    {currentReservations.length === 0 && selectedProperties.length > 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-600 mb-4">Aucune réservation ne correspond aux filtres sélectionnés</p>
                            <button
                                onClick={clearFilters}
                                className="text-sm font-medium text-gray-900 underline hover:text-gray-700"
                            >
                                Effacer les filtres
                            </button>
                        </div>
                    )}

                    {/* Section "Vos tâches en attente" (2 colonnes, centré) */}
                    {activeTab === 'today' && (
                        <div className="mb-12">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
                                Vos tâches en attente
                            </h2>
                            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
                                {[
                                    { guest: 'Anaëlle', avatar: 'https://i.pravatar.cc/150?img=10', action: 'Demande de remboursement envoyée à', property: 'Evasion Prestige -...', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=100&h=100&fit=crop' },
                                    { guest: 'Rossy', avatar: 'https://i.pravatar.cc/150?img=11', action: 'Demande de remboursement envoyée à', property: 'Balcon Lumineux &...', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=100&h=100&fit=crop' },
                                    { guest: 'Clotaire', avatar: 'https://i.pravatar.cc/150?img=12', action: 'Laissez un commentaire sur', property: 'La Treille en Cant...', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=100&h=100&fit=crop' },
                                    { guest: 'Logan', avatar: 'https://i.pravatar.cc/150?img=13', action: 'Découvrez l\'évaluation 5 étoile(s) laissée par', property: 'La Paix Occitane', image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&h=100&fit=crop' }
                                ].map((task, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-white border border-gray-200 rounded-xl hover:shadow-sm transition-shadow cursor-pointer"
                                        onClick={() => {
                                            if (index === 0) navigate('/airbnb/remboursement/remb_001')
                                            if (index === 1) navigate('/airbnb/remboursement/remb_002')
                                            if (index === 2) navigate('/airbnb/commentaire/res_airbnb_010/step1')
                                        }}
                                    >
                                        <div className="flex items-start gap-3 mb-3">
                                            <img
                                                src={task.avatar}
                                                alt={task.guest}
                                                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                            />
                                            <img
                                                src={task.image}
                                                alt={task.property}
                                                className="w-12 h-12 rounded-full -ml-4 object-cover flex-shrink-0"
                                            />
                                        </div>
                                        <div>
                                            {index < 2 && (
                                                <p className="text-xs text-gray-600 mb-1">En cours</p>
                                            )}
                                            {index === 2 && (
                                                <p className="text-xs text-gray-600 mb-1">13 jours restants</p>
                                            )}
                                            {index === 3 && (
                                                <p className="text-xs text-gray-600 mb-1">★★★★★</p>
                                            )}
                                            <p className="text-sm text-gray-900 font-medium mb-1">
                                                {task.action} {task.guest}
                                            </p>
                                            <p className="text-xs text-gray-600">{task.property}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 text-center">
                                <button className="text-sm font-medium text-gray-900 underline hover:text-gray-700">
                                    Afficher plus
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Lien "Voir toutes les réservations" */}
                    <div className="text-center pb-12">
                        <button className="text-sm font-medium text-gray-900 underline hover:text-gray-700">
                            Voir toutes les réservations
                        </button>
                    </div>
                </div>
            </main>

            <AirbnbFooter />

            {/* Modal de filtrage */}
            {isFilterOpen && (
                <>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={() => setIsFilterOpen(false)}
                    />

                    {/* Modal */}
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 max-h-[80vh] overflow-hidden flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Filtrer les annonces</h2>
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>

                        {/* Liste des propriétés */}
                        <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <div className="space-y-4">
                                {uniqueProperties.map((property) => (
                                    <label
                                        key={property.id}
                                        className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                                    >
                                        <img
                                            src={property.image || "https://via.placeholder.com/64"}
                                            alt={property.name}
                                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                        />
                                        <span className="flex-1 text-sm text-gray-900">{property.name}</span>
                                        <input
                                            type="checkbox"
                                            checked={selectedProperties.includes(property.name)}
                                            onChange={() => toggleProperty(property.name)}
                                            className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Footer avec boutons */}
                        <div className="flex items-center justify-between p-6 border-t border-gray-200">
                            <button
                                onClick={clearFilters}
                                className="text-sm font-medium text-gray-700 hover:underline"
                            >
                                Effacer
                            </button>
                            <button
                                onClick={applyFilters}
                                className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                            >
                                Appliquer
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default AirbnbDashboard