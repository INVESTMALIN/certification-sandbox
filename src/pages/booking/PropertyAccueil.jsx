import { useParams, Link } from 'react-router-dom'
import PropertyHeader from '../../components/booking/PropertyHeader'
import BookingFooter from '../../components/booking/BookingFooter'
import propertiesData from '../../data/booking/properties.json'
import reservationsData from '../../data/booking/reservations.json'
import reviewsData from '../../data/booking/reviews.json'
import messagesData from '../../data/booking/messages.json'

function PropertyAccueil() {
    const { id } = useParams()
    const property = propertiesData.find(p => p.id === id)

    // Filtrer les données par propriété
    const propertyReservations = reservationsData.filter(r => r.propertyId === id).slice(0, 3)
    const propertyMessages = messagesData.filter(m => m.propertyId === id && !m.hasResponse).slice(0, 3)
    const propertyReviews = reviewsData.filter(r => r.propertyId === id).slice(0, 4)

    // Formater les dates
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
    }

    const formatDateTime = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    }

    if (!property) {
        return <div>Propriété non trouvée</div>
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="w-full py-6">
                <div className="grid grid-cols-3 gap-32">

                    {/* Colonne gauche (2/3) */}
                    <div className="col-span-2 space-y-6 pl-6 ml-auto max-w-[850px] w-full">
                        {/* Titre établissement */}
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                                {property.name}
                            </h1>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-700">{property.status}</span>
                            </div>
                        </div>



                        {/* Section Réservations avec onglets */}
                        <div className="bg-white border border-gray-200 rounded-lg">
                            {/* Header avec titre et dropdown */}
                            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">Réservations</h2>
                                <div className="relative">
                                    <select className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0071c2] focus:border-transparent cursor-pointer">
                                        <option>Aujourd'hui</option>
                                        <option>7 derniers jours</option>
                                        <option>Hier</option>
                                        <option>Demain</option>
                                        <option>7 prochains jours</option>
                                        <option>30 prochains jours</option>
                                        <option>60 prochains jours</option>
                                        <option>Plus de dates</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Onglets */}
                            <div className="border-b border-gray-200">
                                <nav className="flex px-6">
                                    <button className="px-4 py-3 text-sm font-medium text-[#0071c2] border-b-2 border-[#0071c2] flex items-center gap-2">
                                        Demandes de réservations
                                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#0071c2] rounded-full">0</span>
                                    </button>
                                    <button className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-2">
                                        Arrivées
                                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-gray-600 bg-gray-200 rounded-full">0</span>
                                    </button>
                                    <button className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-2">
                                        Départs
                                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-gray-600 bg-gray-200 rounded-full">0</span>
                                    </button>
                                    <button className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-2">
                                        Séjours en cours
                                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-gray-600 bg-gray-200 rounded-full">0</span>
                                    </button>
                                    <button className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 flex items-center gap-2">
                                        Demandes des clients
                                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-gray-600 bg-gray-200 rounded-full">0</span>
                                    </button>
                                </nav>
                            </div>

                            {/* Contenu */}
                            <div className="p-8 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">
                                    Les informations présentées dans cette section vous aideront à mieux planifier vos journées. Les arrivées, départs et autres évènements peuvent être filtrés par date et par période.
                                </p>
                                <Link to={`/booking/property/${id}/reservations`} className="inline-block px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded text-sm font-medium hover:bg-blue-50">
                                    Voir toutes les réservations
                                </Link>
                            </div>
                        </div>

                        {/* Réservations les plus récentes */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Réservations les plus récentes</h2>
                            <div className="space-y-4">
                                {propertyReservations.map((reservation) => (
                                    <div key={reservation.id} className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100 last:border-b-0">
                                        {/* Colonne 1: Client */}
                                        <div className="flex items-start gap-2">
                                            <div className="w-7 h-6 rounded overflow-hidden">
                                                <div className="flex h-full">
                                                    <div className="w-1/3 bg-[#002395]"></div>
                                                    <div className="w-1/3 bg-white"></div>
                                                    <div className="w-1/3 bg-[#ED2939]"></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">{reservation.guestName}</div>
                                                <div className="text-sm text-[#0071c2]">{reservation.id}</div>
                                            </div>
                                        </div>

                                        {/* Colonne 2: Dates et détails */}
                                        <div>
                                            <div className="text-sm text-gray-900 mb-1">
                                                {formatDate(reservation.checkIn)} – {formatDate(reservation.checkOut)}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {reservation.nights} nuits – {reservation.guestDetails}
                                            </div>
                                            {reservation.arrivalTime && (
                                                <div className="text-sm text-gray-600">
                                                    Heure d'arrivée de vos clients : {reservation.arrivalTime}
                                                </div>
                                            )}
                                        </div>

                                        {/* Colonne 3: Prix et date de réservation */}
                                        <div className="text-right">
                                            <div className="text-lg font-semibold text-gray-900 mb-1">€ {reservation.totalAmount}</div>
                                            <div className="text-sm text-gray-600">    {formatDate(new Date(new Date(reservation.checkIn).getTime() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])}

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-4 text-sm text-[#0071c2] font-medium hover:underline">
                                Afficher plus
                            </button>
                        </div>

                        {/* Messages en attente */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Messages en attente d'une réponse</h2>
                            {propertyMessages.length > 0 ? (
                                <div className="space-y-4">
                                    {propertyMessages.map((message) => (
                                        <div key={message.id} className="py-3 border-b border-gray-100 last:border-b-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{message.guestName}</div>
                                                        <div className="text-xs text-gray-500">{formatDateTime(message.date)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-700 mb-3 line-clamp-2">
                                                {message.message}
                                            </div>
                                            <button className="text-sm text-[#0071c2] font-medium hover:underline">
                                                Répondre
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                        </svg>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        Vous trouverez ici vos messages non lus, ainsi que les demandes des clients concernant les préférences de couchage et d'horaire d'arrivée.
                                    </p>
                                    <button className="mt-4 px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded text-sm font-medium hover:bg-blue-50">
                                        Voir tous les messages
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Commentaires récents */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Commentaires récents</h2>
                            <div className="space-y-4">
                                {propertyReviews.map((review) => (
                                    <div key={review.id} className="py-3 border-b border-gray-100 last:border-b-0">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className={`inline-flex items-center justify-center w-12 h-8 ${review.rating >= 9 ? 'bg-[#003580]' : 'bg-[#0071c2]'} text-white font-bold text-sm rounded`}>
                                                {review.rating.toFixed(1)}
                                            </div>
                                            <span className="text-xs text-gray-500">{formatDate(review.date)}</span>
                                        </div>
                                        <p className="text-sm text-gray-700 mb-2">
                                            {review.comment}
                                        </p>
                                        <div className="text-xs text-gray-500">- {review.guestName}</div>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-4 text-sm text-[#0071c2] font-medium hover:underline">
                                Voir tous les commentaires
                            </button>
                        </div>

                        {/* Vos notes */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">Vos notes</h2>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Score de la page de l'établissement</span>
                                        <span className="text-sm font-bold text-gray-900">98%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Réponses à la demande : 85%</p>
                                    <button className="mt-2 text-sm text-[#0071c2] hover:underline">
                                        Voir la page de l'établissement
                                    </button>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Note des commentaires</span>
                                        <span className="text-sm font-bold text-gray-900">9.5</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                                    </div>
                                    <button className="mt-2 text-sm text-[#0071c2] hover:underline">
                                        Voir les commentaires clients
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Demande pour <ville> */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-1">
                                Demande pour {property.city}
                            </h2>
                            <p className="text-sm text-gray-600 mb-6">
                                Dernière mise à jour le 20 janv.. D'après les données des 14 derniers jours.
                            </p>

                            <div className="grid grid-cols-4 gap-6">
                                {/* Évolution de la demande */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                        Évolution de la demande
                                    </h3>
                                    <p className="text-sm text-gray-700 mb-1">
                                        {property.city} : la demande d'hébergements a
                                    </p>
                                    <p className="text-sm font-semibold text-green-600">
                                        augmenté de 0 %
                                    </p>
                                </div>

                                {/* Période de recherche */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                        Période de recherche
                                    </h3>
                                    <p className="text-sm text-gray-700 mb-1">
                                        La plupart des voyageurs effectuent leur recherche
                                    </p>
                                    <p className="text-sm font-semibold text-gray-900">
                                        91 jours et plus
                                    </p>
                                    <p className="text-sm text-gray-700">avant leur séjour.</p>
                                </div>

                                {/* Durée de séjour */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                        Durée de séjour
                                    </h3>
                                    <p className="text-sm text-gray-700 mb-1">
                                        La durée de séjour la plus populaire est de
                                    </p>
                                    <p className="text-sm font-semibold text-gray-900">1 nuit</p>
                                </div>

                                {/* 5 principaux pays */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                        5 principaux pays
                                    </h3>
                                    <p className="text-sm font-semibold text-gray-900 mb-1">
                                        40.58 %
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        de la demande provient de la France
                                    </p>
                                </div>
                            </div>

                            <button className="mt-6 px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded text-sm font-medium hover:bg-blue-50">
                                Consulter toutes les données relatives à la demande
                            </button>
                        </div>

                        {/* Votre performance */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">Votre performance</h2>
                            <p className="text-sm text-gray-600 mb-4">Au cours des 30 derniers jours</p>
                            <div className="grid grid-cols-4 gap-6">
                                <div>
                                    <div className="text-2xl font-bold text-gray-900 mb-1">€ 76.25</div>
                                    <div className="text-xs text-gray-600">Prix moyen</div>
                                    <div className="text-xs text-green-600 mt-1">↑ 6.65%</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900 mb-1">0.00%</div>
                                    <div className="text-xs text-gray-600">Taux d'annulation</div>
                                    <div className="text-xs text-gray-600 mt-1">0.00%</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900 mb-1">€ 610</div>
                                    <div className="text-xs text-gray-600">Revenus</div>
                                    <div className="text-xs text-gray-600 mt-1">8</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-gray-900 mb-1">8</div>
                                    <div className="text-xs text-gray-600">Nombre d'effectuer</div>
                                </div>
                            </div>
                        </div>

                        {/* Performance dans résultats de recherche */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Votre performance dans les résultats de recherche
                            </h2>
                            <p className="text-sm text-gray-600 mb-4">Au cours des 30 derniers jours</p>
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <div className="text-sm font-medium text-gray-700 mb-2">Vues dans les résultats de recherche</div>
                                    <div className="text-2xl font-bold text-gray-900">269</div>
                                    <div className="text-xs text-gray-600 mt-1">1190%</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-700 mb-2">Vues de la page de votre établissement</div>
                                    <div className="text-2xl font-bold text-gray-900 text-[#0071c2]">
                                        12.40%
                                    </div>
                                    <div className="text-xs text-gray-600 mt-1">Impressions de la page: 6.27%</div>
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-gray-700 mb-2">Réservation reçues</div>
                                    <div className="text-2xl font-bold text-gray-900">3</div>
                                    <div className="text-xs text-gray-600 mt-1">(1.12%)</div>
                                </div>
                            </div>
                        </div>
                        {/* Encadré feedback */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-700">
                                    Votre avis est très important pour nous. Avez-vous trouvé ces données utiles ?
                                </p>
                                <div className="flex items-center gap-3">
                                    <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                        </svg>
                                    </button>
                                    <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                                        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Colonne droite (1/3) - Conteneur unique pleine hauteur */}
                    <div className="bg-white border border-gray-200 rounded-lg h-fit sticky top-6">
                        {/* Actions en attente */}
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Actions en attente</h3>
                            <p className="text-sm text-gray-700">
                                C'est terminé ! Les notifications apparaîtront ici pour chaque nouvelle tâche.
                            </p>
                        </div>

                        {/* Séparateur */}
                        <div className="border-t border-gray-200"></div>

                        {/* Conseils */}
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-gray-900">Conseils</h3>
                                <button className="text-sm text-[#0071c2] hover:underline">
                                    Trouver plus de conseil
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Conseil 1 */}
                                <div className="relative">
                                    <button className="absolute top-0 right-0 text-gray-400 hover:text-gray-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2 pr-6">
                                        Vous souhaitez augmenter votre visibilité sur Booking.com ?
                                    </h4>
                                    <p className="text-sm text-gray-700 mb-3">
                                        Notre outil marketing Genius est fait pour vous ! Des millions de voyageurs recherchent actuellement des établissements Genius, et ils ne peuvent pas vous voir car vous ne participez pas encore au programme. Prenez de l'avance sur vos concurrents en rejoignant Genius dès aujourd'hui.
                                    </p>
                                    <button className="text-sm text-[#0071c2] font-medium hover:underline">
                                        En savoir plus
                                    </button>
                                </div>

                                {/* Conseil 2 */}
                                <div className="relative pt-6 border-t border-gray-200">
                                    <button className="absolute top-6 right-0 text-gray-400 hover:text-gray-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2 pr-6">
                                        Félicitations ! Vous êtes éligible au programme Partenaires Préférés 🎉
                                    </h4>
                                    <p className="text-sm text-gray-700 mb-3">
                                        En devenant Partenaire Préféré, vous recevez en moyenne 65 % de vues supplémentaires et 20 % de réservations en plus. Seuls les 30 % de nos partenaires les plus performants sont éligibles, et vous en faites partie !
                                    </p>
                                    <button className="text-sm text-[#0071c2] font-medium hover:underline">
                                        Découvrez comment
                                    </button>
                                </div>

                                {/* Conseil 3 */}
                                <div className="relative pt-6 border-t border-gray-200">
                                    <button className="absolute top-6 right-0 text-gray-400 hover:text-gray-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <div className="flex items-start gap-2 mb-2">
                                        <svg className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <h4 className="text-sm font-semibold text-gray-900 pr-6">
                                            Ajoutez un nouveau plan tarifaire « Semi-flexible » pour booster vos réservations sans risque
                                        </h4>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-3 ml-7">
                                        Ce plan tarifaire est conçu pour attirer les clients tout en vous offrant des conditions d'annulation sans risque.
                                    </p>
                                    <button className="text-sm text-[#0071c2] font-medium hover:underline ml-7">
                                        Configurer un plan tarifaire semi-flexible
                                    </button>
                                </div>

                                {/* Conseil 4 */}
                                <div className="relative pt-6 border-t border-gray-200">
                                    <button className="absolute top-6 right-0 text-gray-400 hover:text-gray-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2 pr-6">
                                        Vous n'aurez bientôt plus de disponibilités à long terme
                                    </h4>
                                    <p className="text-sm text-gray-700 mb-3">
                                        Ajoutez vos disponibilités au moins 16 mois à l'avance pour attirer les clients réservant tôt.
                                    </p>
                                    <button className="text-sm text-[#0071c2] font-medium hover:underline">
                                        Ajouter des disponibilités
                                    </button>
                                </div>

                                {/* Conseil 5 */}
                                <div className="relative pt-6 border-t border-gray-200">
                                    <button className="absolute top-6 right-0 text-gray-400 hover:text-gray-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2 pr-6">
                                        Augmentez vos réservations de 30 % en moyenne
                                    </h4>
                                    <p className="text-sm text-gray-700 mb-3">
                                        Attirez les clients qui réservent sur mobile et obtenez en moyenne +30 % de réservations.
                                    </p>
                                    <button className="text-sm text-[#0071c2] font-medium hover:underline">
                                        Créer un tarif Mobiles
                                    </button>
                                </div>

                                {/* Conseil 6 */}
                                <div className="relative pt-6 border-t border-gray-200">
                                    <button className="absolute top-6 right-0 text-gray-400 hover:text-gray-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <h4 className="text-sm font-semibold text-gray-900 mb-2 pr-6">
                                        Ajoutez des lits bébé pour booster les réservations de familles
                                    </h4>
                                    <p className="text-sm text-gray-700 mb-3">
                                        Démarquez-vous dans les recherches effectuées par les familles avec des bébés.
                                    </p>
                                    <button className="text-sm text-[#0071c2] font-medium hover:underline">
                                        Ajouter des lits bébé
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </main>

            <BookingFooter />
        </div>
    )
}

export default PropertyAccueil