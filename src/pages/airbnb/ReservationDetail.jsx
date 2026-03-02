import { useParams, Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, Phone, MessageSquare, Star, ShieldCheck, Home, Award, X, Pencil, Shield, HelpCircle, Ban } from 'lucide-react'
import AirbnbHeader from '../../components/airbnb/AirbnbHeader'
import reservations from '../../data/airbnb/reservations.json'
import properties from '../../data/airbnb/properties.json'
import { useState } from 'react'
import { hydrateReservation, formatDateShort, formatDateLong } from '../../data/airbnb/dateUtils.js'

function ReservationDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
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

                        <div className="my-8 -mx-8 h-3 bg-gray-100" />

                        {/* Tout sur le voyageur */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Tout sur {reservation.guestName.split(' ')[0]}
                            </h2>

                            <div className="flex items-center gap-4 mb-6">
                                <Link to={`/airbnb/voyageur/${reservation.id}`}>
                                    <img
                                        src={reservation.guestAvatar}
                                        alt={reservation.guestName}
                                        className="w-16 h-16 rounded-full hover:opacity-80 transition-opacity"
                                    />
                                </Link>
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
                            <div className="mt-6 flex flex-col gap-3">
                                <button
                                    onClick={() => navigate(`/airbnb/paiement/${reservation.id}/step1`)}
                                    className="w-full px-6 py-3 border border-gray-900 rounded-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                                >
                                    Envoyer ou demander de l'argent
                                </button>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => navigate('/airbnb/messages')}
                                        className="px-6 py-3 border border-gray-900 rounded-lg font-medium text-gray-900 hover:bg-gray-50 flex items-center justify-center gap-2"
                                    >
                                        <MessageSquare className="w-5 h-5" />
                                        Envoyer un message
                                    </button>
                                    <button className="px-6 py-3 border border-gray-900 rounded-lg font-medium text-gray-900 hover:bg-gray-50 flex items-center justify-center gap-2">
                                        <Phone className="w-5 h-5" />
                                        Appeler
                                    </button>
                                </div>
                            </div>

                            <p className="text-xs text-gray-600 text-center mt-3">
                                Téléphone : {reservation.guestPhone}
                            </p>
                        </div>

                        <div className="my-8 -mx-8 h-3 bg-gray-100" />

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

                        <div className="my-8 -mx-8 h-3 bg-gray-100" />

                        {/* Détails du paiement du voyageur + Versement de l'hôte */}
                        {(() => {
                            const fmtEur = (v) => v.toFixed(2).replace('.', ',') + '\u00a0€'
                            const nights = reservation.nights
                            const nightlyRate = 50
                            const voyageurServiceFee = 0
                            const touristTax = parseFloat((nights * 1.65).toFixed(2))
                            const voyageurTotal = parseFloat((nightlyRate * nights + touristTax).toFixed(2))
                            const hostRoomRate = 50
                            const hostServiceFee = parseFloat((hostRoomRate * nights * 0.186).toFixed(2))
                            const hostTotal = parseFloat((hostRoomRate * nights - hostServiceFee).toFixed(2))
                            return (
                                <>
                                    {/* Détails du paiement du voyageur */}
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Détails du paiement du voyageur</h2>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-700">{fmtEur(nightlyRate)} x {nights} nuit{nights > 1 ? 's' : ''}</span>
                                                <span className="text-gray-900">{fmtEur(nightlyRate * nights)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-700">Frais de service voyageur</span>
                                                <span className="text-gray-900">{fmtEur(voyageurServiceFee)}</span>
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

                                    <div className="my-8 -mx-8 h-3 bg-gray-100" />

                                    {/* Versement de l'hôte */}
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Versement de l'hôte</h2>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-700">Frais de chambre pour {nights} nuit{nights > 1 ? 's' : ''}</span>
                                                <span className="text-gray-900">{fmtEur(hostRoomRate * nights)}</span>
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

                                        {/* Facture & historique */}
                                        <div className="border-t border-gray-200 mt-6" />
                                        <div className="flex flex-col divide-y divide-gray-100">
                                            <Link to={`/airbnb/facture/${reservation.id}`} className="flex items-center justify-between py-4 hover:bg-gray-50 transition-colors text-left w-full">
                                                <span className="text-sm text-gray-900">Facture avec TVA *****</span>
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                            </Link>
                                            <button className="flex items-center justify-between py-4 hover:bg-gray-50 transition-colors text-left w-full">
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        <line x1="1" y1="10" x2="23" y2="10" strokeWidth="2" />
                                                    </svg>
                                                    <span className="text-sm text-gray-900">Historique des transactions</span>
                                                </div>
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="my-8 -mx-8 h-3 bg-gray-100" />

                                    {/* Note calendrier */}
                                    <div className="mb-8">
                                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Note calendrier</h2>
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

                                    <div className="my-8 -mx-8 h-3 bg-gray-100" />

                                    {/* Aircover pour les hôtes */}
                                    <div className="mb-8">
                                        <img src="/aircover.avif" alt="AirCover" className="h-8 mb-1" />
                                        <p className="text-sm text-gray-700 leading-relaxed mb-3">
                                            Une protection complète, à chaque fois que vous accueillez des voyageurs.
                                        </p>
                                        <Link to="/airbnb/aircover" className="text-sm text-gray-900 underline font-medium hover:text-[#FF385C] transition-colors">En savoir plus</Link>
                                    </div>

                                    <div className="my-8 -mx-8 h-3 bg-gray-100" />
                                </>
                            )
                        })()}

                        {/* Assistance */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Assistance</h2>

                            <div className="flex flex-col divide-y divide-gray-200">
                                <button onClick={() => navigate(`/airbnb/reservation/${reservation.id}/modifier`)} className="flex items-center justify-between py-5 hover:bg-gray-50 transition-colors text-left w-full">
                                    <div className="flex items-center gap-3">
                                        <Pencil className="w-5 h-5 text-gray-700" />
                                        <span className="text-gray-900">Modifier la réservation</span>
                                    </div>
                                    <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                                </button>

                                <button className="flex items-center justify-between py-5 hover:bg-gray-50 transition-colors text-left w-full">
                                    <div className="flex items-center gap-3">
                                        <Shield className="w-5 h-5 text-gray-700" />
                                        <span className="text-gray-900">Assistance sécurité</span>
                                    </div>
                                    <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                                </button>

                                <button onClick={() => navigate('/airbnb/centre-aide')} className="flex items-center justify-between py-5 hover:bg-gray-50 transition-colors text-left w-full">
                                    <div className="flex items-center gap-3">
                                        <HelpCircle className="w-5 h-5 text-gray-700" />
                                        <span className="text-gray-900">Consulter le Centre d'aide</span>
                                    </div>
                                    <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                                </button>

                                <button className="flex items-center justify-between py-5 hover:bg-gray-50 transition-colors text-left w-full">
                                    <div className="flex items-center gap-3">
                                        <Ban className="w-5 h-5 text-gray-700" />
                                        <span className="text-gray-900">Annuler la réservation</span>
                                    </div>
                                    <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                                </button>
                            </div>

                            <p className="text-sm text-gray-600 mt-6 leading-relaxed">
                                Si vous annulez, des frais pourraient vous être facturés et ces dates pourraient être bloquées. Si vous annulez trop souvent, vous pourriez perdre le statut de Superhôte et votre annonce pourrait être suspendue ou supprimée.
                            </p>
                            <button className="text-sm font-medium text-gray-900 underline mt-3 hover:text-gray-700">
                                En savoir plus sur l'annulation
                            </button>
                        </div>

                        <div className="my-8 -mx-8 h-3 bg-gray-100" />

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