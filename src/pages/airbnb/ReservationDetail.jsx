import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, Phone, MessageSquare, Star, ShieldCheck, Home, Award, X } from 'lucide-react'
import AirbnbHeader from '../../components/airbnb/AirbnbHeader'
import AirbnbFooter from '../../components/airbnb/AirbnbFooter'
import reservations from '../../data/airbnb/reservations.json'
import properties from '../../data/airbnb/properties.json'
import { useState } from 'react'
import { hydrateReservation, formatDateShort, formatDateLong } from '../../data/airbnb/dateUtils.js'

function ReservationDetail() {
    const { id } = useParams()
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [selectedProperties, setSelectedProperties] = useState([])

    // Trouver la réservation et la propriété
    const rawReservation = reservations.find(r => r.id === id)
    const reservation = rawReservation ? hydrateReservation(rawReservation) : null
    const property = properties.find(p => p.propertyId === reservation?.propertyId)

    if (!reservation || !property) {
        return <div>Réservation non trouvée</div>
    }

    // Extraire la liste unique des propriétés
    const uniqueProperties = [...new Set(reservations.map(res => res.propertyId))].map((propId) => {
        const prop = properties.find(p => p.propertyId === propId)
        return {
            id: propId,
            name: prop?.name,
            image: prop?.image
        }
    })

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

    // Formater les dates
    const formatDate = (date) => formatDateLong(date)

    return (
        <div className="font-airbnb min-h-screen bg-white flex flex-col">
            <AirbnbHeader />

            <main className="flex-1 flex">
                {/* Panneau gauche - Liste des réservations */}
                <div className="w-[480px] border-r border-gray-200 overflow-y-auto h-[calc(100vh-80px)] sticky top-[80px]">
                    <div className="p-6">

                        <div className="flex items-center justify-between mb-4">
                            <Link
                                to="/airbnb/dashboard"
                                className="flex items-center gap-2 text-gray-900 hover:text-gray-700 mb-4"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                <span className="font-medium">Aujourd'hui</span>
                            </Link>
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="p-2 hover:bg-gray-100 rounded-lg relative"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                                {selectedProperties.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                                        {selectedProperties.length}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Liste des réservations */}
                        <div className="space-y-3">
                            {/* Aujourd'hui */}
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Aujourd'hui</p>
                            {reservations
                                .map(hydrateReservation)
                                .filter(r => r.status === 'confirmed')
                                .filter(r => {
                                    if (selectedProperties.length > 0) {
                                        const prop = properties.find(p => p.propertyId === r.propertyId)
                                        return selectedProperties.includes(prop?.name)
                                    }
                                    return true
                                })
                                .map((res) => {
                                    const prop = properties.find(p => p.propertyId === res.propertyId)
                                    const isActive = res.id === id
                                    return (
                                        <Link
                                            key={res.id}
                                            to={`/airbnb/reservation/${res.id}`}
                                            className={`block p-4 rounded-xl border transition-all ${isActive ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            <p className="text-xs text-gray-600 mb-2">{res.checkOutOffset === 0 ? res.checkOutTime : res.checkInTime}</p>
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1">
                                                    <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                                                        Le groupe géré par {res.guestName} et composé de {res.guestCount} {res.checkOutOffset === 0 ? 'part' : 'arrive'} aujourd'hui
                                                    </h3>
                                                    <p className="text-xs text-gray-600 line-clamp-1">{prop?.address}</p>
                                                </div>
                                                <div className="flex items-center flex-shrink-0">
                                                    <img src={res.guestAvatar} alt={res.guestName} className="w-10 h-10 rounded-full border-2 border-white" />
                                                    <img src={prop?.image} alt={prop?.name} className="w-10 h-10 rounded-full border-2 border-white -ml-3 object-cover" />
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}

                            {/* À venir */}
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-6 mb-2">À venir</p>
                            {reservations
                                .map(hydrateReservation)
                                .filter(r => r.status === 'upcoming')
                                .filter(r => {
                                    if (selectedProperties.length > 0) {
                                        const prop = properties.find(p => p.propertyId === r.propertyId)
                                        return selectedProperties.includes(prop?.name)
                                    }
                                    return true
                                })
                                .map((res) => {
                                    const prop = properties.find(p => p.propertyId === res.propertyId)
                                    const isActive = res.id === id
                                    return (
                                        <Link
                                            key={res.id}
                                            to={`/airbnb/reservation/${res.id}`}
                                            className={`block p-4 rounded-xl border transition-all ${isActive ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'}`}
                                        >
                                            <p className="text-xs text-gray-600 mb-2">{res.checkInTime}</p>
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1">
                                                    <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                                                        Le groupe géré par {res.guestName} et composé de {res.guestCount}
                                                    </h3>
                                                    <p className="text-xs text-gray-600 line-clamp-1">{prop?.address}</p>
                                                </div>
                                                <div className="flex items-center flex-shrink-0">
                                                    <img src={res.guestAvatar} alt={res.guestName} className="w-10 h-10 rounded-full border-2 border-white" />
                                                    <img src={prop?.image} alt={prop?.name} className="w-10 h-10 rounded-full border-2 border-white -ml-3 object-cover" />
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}
                        </div>

                    </div>
                </div>

                {/* Panneau droit - Détail de la réservation */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-2xl mx-auto px-8 py-8">
                        {/* En-tête */}
                        <div className="mb-8">
                            <p className="text-sm text-[#FF385C] font-medium mb-2">{reservation.statusDetail}</p>
                            <h1 className="text-3xl font-semibold text-gray-900 mb-2">{reservation.guestName}</h1>
                            <p className="text-gray-600">
                                {property.address}
                            </p>
                            <p className="text-gray-600">
                                {formatDate(reservation.checkIn)} ({reservation.nights} nuits)
                            </p>
                            <p className="text-gray-600">{reservation.guestCount}</p>
                        </div>

                        <hr className="my-8 border-gray-200" />

                        {/* Tout sur le voyageur */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Tout sur {reservation.guestName.split(' ')[0]}
                            </h2>

                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={reservation.guestAvatar}
                                    alt={reservation.guestName}
                                    className="w-16 h-16 rounded-full"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">{reservation.guestName}</h3>
                                </div>
                            </div>

                            {/* Infos du voyageur */}
                            <div className="space-y-3 mb-6">
                                {reservation.rating && (
                                    <div className="flex items-center gap-3">
                                        <Star className="w-6 h-6 text-gray-700" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 underline">
                                                {reservation.rating}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {reservation.identityVerified && (
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="w-6 h-6 text-gray-700" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 underline">
                                                Identité vérifiée
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-3">
                                    <Award className="w-6 h-6 text-gray-700" />
                                    <div>
                                        <p className="text-sm text-gray-900">
                                            Membre d'Airbnb depuis {property.hostSince}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Home className="w-6 h-6 text-gray-700" />
                                    <div>
                                        <p className="text-sm text-gray-900">
                                            Habite à {property.city}, {property.country}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button className="text-sm font-medium text-gray-900 underline hover:text-gray-700">
                                Afficher le profil
                            </button>

                            {/* Boutons actions */}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <button className="px-6 py-3 border border-gray-900 rounded-lg font-medium text-gray-900 hover:bg-gray-50 flex items-center justify-center gap-2">
                                    <MessageSquare className="w-5 h-5" />
                                    Envoyer un message
                                </button>
                                <button className="px-6 py-3 border border-gray-900 rounded-lg font-medium text-gray-900 hover:bg-gray-50 flex items-center justify-center gap-2">
                                    <Phone className="w-5 h-5" />
                                    Appeler
                                </button>
                            </div>

                            <p className="text-xs text-gray-600 text-center mt-3">
                                Téléphone : {reservation.guestPhone}
                            </p>
                        </div>

                        <hr className="my-8 border-gray-200" />

                        {/* Détails de la réservation */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                Détails de la réservation
                            </h2>

                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <p className="text-gray-900">Voyageurs</p>
                                    <button className="text-gray-900 font-medium underline">Voir</button>
                                </div>
                                <p className="text-gray-600 -mt-4">{reservation.guestCount}</p>

                                <div className="flex justify-between items-start">
                                    <p className="text-gray-900">Code d'accès suggéré</p>
                                    <button className="text-gray-900 font-medium underline">View</button>
                                </div>
                                <p className="text-gray-600 -mt-4">{reservation.suggestedAccessCode}</p>

                                <div>
                                    <p className="text-gray-900 mb-1">Arrivée</p>
                                    <p className="text-gray-600">{formatDate(reservation.checkIn)}</p>
                                </div>

                                <div>
                                    <p className="text-gray-900 mb-1">Départ</p>
                                    <p className="text-gray-600">{formatDate(reservation.checkOut)}</p>
                                </div>

                                <div>
                                    <p className="text-gray-900 mb-1">Date de réservation</p>
                                    <p className="text-gray-600">{formatDate(reservation.bookedOn)}</p>
                                </div>

                                <div>
                                    <p className="text-gray-900 mb-1">Code de confirmation</p>
                                    <p className="text-gray-600">{reservation.confirmationCode}</p>
                                </div>

                                <button className="text-sm font-medium text-gray-900 underline hover:text-gray-700">
                                    Afficher le calendrier
                                </button>
                            </div>
                        </div>

                        <hr className="my-8 border-gray-200" />

                        {/* Assistance */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Assistance</h2>

                            <div className="space-y-4">
                                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">🛡️</span>
                                        <span className="text-gray-900">Assistance sécurité</span>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">❓</span>
                                        <span className="text-gray-900">Consulter le Centre d'aide</span>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <hr className="my-8 border-gray-200" />

                        {/* Questions fréquentes */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Questions fréquentes</h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">
                                        Modifier une réservation de logement en tant qu'hôte
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Vous pouvez envoyer une demande de modification à votre voyageur. Si ce dernier accepte, la réservation sera modifiée.
                                    </p>
                                    <button className="text-sm font-medium text-gray-900 underline hover:text-gray-700">
                                        Lire la suite
                                    </button>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">
                                        Lorsqu'un voyageur ne se présente pas pour une réservation
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Si le voyageur annule ou ne se présente pas, vos conditions d'annulation seront appliquées et tout versement correspondant vous sera remis.
                                    </p>
                                    <button className="text-sm font-medium text-gray-900 underline hover:text-gray-700">
                                        Lire la suite
                                    </button>
                                </div>

                                <div>
                                    <h3 className="font-medium text-gray-900 mb-2">
                                        Si un voyageur vous met mal à l'aise
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Si un voyageur ne respecte pas votre règlement intérieur ou si son comportement vous fait craindre pour votre sécurité, vous pouvez refuser sa...
                                    </p>
                                    <button className="text-sm font-medium text-gray-900 underline hover:text-gray-700">
                                        Lire la suite
                                    </button>
                                </div>

                                <button className="text-sm font-medium text-gray-900 underline hover:text-gray-700">
                                    Afficher plus de sujets
                                </button>
                            </div>
                        </div>
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

export default ReservationDetail