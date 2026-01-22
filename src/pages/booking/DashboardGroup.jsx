import { Link } from 'react-router-dom'
import BookingHeader from '../../components/booking/BookingHeader'
import propertiesData from '../../data/booking/properties.json'
import BookingFooter from '../../components/booking/BookingFooter'
import { ClipboardList, LogIn, LogOut, XCircle, Star } from 'lucide-react'


function DashboardGroup() {
    const properties = propertiesData

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
                    <button className="bg-[#0071c2] hover:bg-[#005999] text-white px-6 py-3 rounded font-medium transition-colors">
                        Ajouter un nouvel hébergement
                    </button>
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
                                Le programme Genius a boosté les vues de l'établissement Gite De Vacances Jardin Monet Giverny Vernon de 37.17 % dans les résultats de recherche au cours des 30 derniers jours
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
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Filtrer par destination
                        </label>
                        <select className="w-64 px-4 py-2 border border-gray-300 rounded bg-white text-sm">
                            <option value="">France : 8 hébergements</option>
                            <option value="cannes">Cannes (1 hébergement)</option>
                            <option value="marseille">Marseille (3 hébergements)</option>
                            <option value="agde">Agde (1 hébergement)</option>
                            <option value="bordeaux">Bordeaux (2 hébergements)</option>
                            <option value="evian">Evian (1 hébergement)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Filtrer par type d'établissement
                        </label>
                        <select className="w-64 px-4 py-2 border border-gray-300 rounded bg-white text-sm">
                            <option>Aucune option sélectionnée</option>
                        </select>
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
                            {properties.map((property) => (
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

                {/* Footer simple */}
                <div className="mt-8 text-center text-sm text-gray-500">
                    <p>{properties.length} établissement{properties.length > 1 ? 's' : ''} affiché{properties.length > 1 ? 's' : ''}</p>
                </div>
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