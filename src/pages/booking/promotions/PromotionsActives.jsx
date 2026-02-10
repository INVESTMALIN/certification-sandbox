import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { Info, X, Tag } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function PromotionsActives() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [showAlert, setShowAlert] = useState(true)
    const [activeTab, setActiveTab] = useState('actives')
    const [showMoreFilters, setShowMoreFilters] = useState(false)
    const [expandedPromo, setExpandedPromo] = useState(null)
    const [visibleCards, setVisibleCards] = useState({
        card1: true,
        card2: true,
        card3: true
    })

    const handleCloseCard = (cardName) => {
        setVisibleCards(prev => ({ ...prev, [cardName]: false }))
    }

    const handleNewPromotion = () => {
        navigate(`/booking/property/${id}/promotions/nouvelle`)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Header avec titre et bouton */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Promotions</h1>
                        <p className="text-sm text-gray-600">
                            Consultez, gérez et choisissez de nouvelles promotions.
                        </p>
                    </div>
                    <button
                        onClick={handleNewPromotion}
                        className="px-6 py-2.5 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors font-medium text-sm"
                    >
                        Choisir une nouvelle promotion
                    </button>
                </div>

                {/* Alerte info
                {showAlert && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm mb-2">
                                L'Offre Nouvel Hébergement ne sera plus appliquée sur vos prochaines réservations.
                            </p>
                            <p className="text-sm text-gray-700 mb-2">
                                L'Offre Nouvel Hébergement est automatiquement désactivée au bout de 3 réservations ou de 90 jours.
                                Elle est ensuite déplacée dans l'onglet « Terminée(s) » ci-dessous. Elle ne s'affichera plus pour vos
                                clients potentiels ni sur votre calendrier. Les réservations déjà effectuées ne seront pas affectées.
                            </p>
                            <button className="text-[#0071c2] text-sm font-medium hover:underline">
                                Ignorer
                            </button>
                        </div>
                    </div>
                )} */}


                {/* 
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations utiles</h2>
                    <p className="text-xs text-gray-600 mb-6">
                        Les données de performance mentionnées sur cette page concernent votre établissement, votre région et vos concurrents directs.
                    </p>

                    <div className="grid grid-cols-3 gap-6">
                        

                        {visibleCards.card1 && (
                            <div className="bg-white rounded-lg border border-gray-200 p-6 relative">
                                <button
                                    onClick={() => handleCloseCard('card1')}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <h3 className="text-sm font-semibold text-gray-900 mb-6 pr-6">
                                    Vous accueillez moins de clients habitant aux États-Unis que la moyenne
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-gray-600">Vous</span>
                                            <span className="text-sm font-semibold text-gray-900">0 %</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-gray-600">Votre région</span>
                                            <span className="text-sm font-semibold text-gray-900">5 %</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div className="bg-[#0071c2] h-1.5 rounded-full" style={{ width: '5%' }}></div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600 mt-6 mb-4">
                                    Les autres établissements situés à Avignon accueillent environ 5 % de clients habitant aux États-Unis de plus que vous.
                                </p>
                                <button className="text-[#0071c2] text-sm font-medium hover:underline">
                                    Ajouter un tarif géocible (États-Unis)
                                </button>
                            </div>
                        )}

                        
                        {visibleCards.card2 && (
                            <div className="bg-white rounded-lg border border-gray-200 p-6 relative">
                                <button
                                    onClick={() => handleCloseCard('card2')}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <h3 className="text-sm font-semibold text-gray-900 mb-6 pr-6">
                                    Vos concurrents directs reçoivent plus de réservations de dernière minute
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-gray-600">Vous</span>
                                            <span className="text-sm font-semibold text-red-600">-134.3 jour avant l'arrivée</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-gray-600">Vos concurrents directs</span>
                                            <span className="text-sm font-semibold text-gray-900">-92.6 jour avant l'arrivée</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div className="bg-[#0071c2] h-1.5 rounded-full" style={{ width: '69%' }}></div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600 mt-6 mb-4">
                                    Vos concurrents directs reçoivent des réservations environ 41.6 jour plus près de la date d'arrivée que vous.
                                </p>
                                <button className="text-[#0071c2] text-sm font-medium hover:underline">
                                    Ajouter une Offre de Dernière Minute
                                </button>
                            </div>
                        )}

                        
                        {visibleCards.card3 && (
                            <div className="bg-white rounded-lg border border-gray-200 p-6 relative">
                                <button
                                    onClick={() => handleCloseCard('card3')}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <h3 className="text-sm font-semibold text-gray-900 mb-6 pr-6">
                                    Les voyageurs habitant aux États-Unis paient un prix moyen plus élevé que les autres
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-gray-600">Voyageurs habitant aux États-Unis</span>
                                            <span className="text-sm font-semibold text-gray-900">€ 176</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div className="bg-[#0071c2] h-1.5 rounded-full" style={{ width: '100%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs text-gray-600">Vous</span>
                                            <span className="text-sm font-semibold text-gray-900">€ 123</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div className="bg-[#0071c2] h-1.5 rounded-full" style={{ width: '70%' }}></div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-600 mt-6 mb-4">
                                    Le prix moyen des séjours réservés à Avignon par les voyageurs habitant aux États-Unis est 1.4 fois supérieur à la moyenne.
                                </p>
                                <button className="text-[#0071c2] text-sm font-medium hover:underline">
                                    Ajouter un tarif géocible (États-Unis)
                                </button>
                            </div>
                        )}
                    </div>

                    <p className="text-xs text-gray-500 mt-4">
                        Dernière mise à jour : aujourd'hui
                    </p>
                </div> */}


                {/* Section Vos promotions */}
                <div className="mb-8">
                    {/* Header avec titre et télécharger */}
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900">Vos promotions</h2>
                        <button className="flex items-center gap-2 text-[#0071c2] text-sm font-medium hover:underline">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Télécharger
                        </button>
                    </div>

                    {/* Filtres sur fond gris */}
                    <div className="bg-gray-100 p-4 rounded-t-lg">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-700">Statut</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setActiveTab('actives')}
                                        className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'actives'
                                            ? 'bg-white text-gray-900 border border-gray-300 shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        Activée(s)
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('terminees')}
                                        className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'terminees'
                                            ? 'bg-white text-gray-900 border border-gray-300 shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        Terminée(s)
                                    </button>

                                    {/* Dropdown Plus de filtres */}
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowMoreFilters(!showMoreFilters)}
                                            className="px-4 py-2 text-[#0071c2] rounded-full text-sm font-medium hover:bg-gray-200 flex items-center gap-1 border border-[#0071c2]"
                                        >
                                            <svg className={`w-4 h-4 transition-transform ${showMoreFilters ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                            <span>Plus de filtres</span>
                                        </button>

                                        {showMoreFilters && (
                                            <div className="absolute top-full mt-2 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-6 z-10 min-w-[800px]">
                                                <div className="grid grid-cols-3 gap-6">
                                                    {/* Filtrer par */}
                                                    <div>
                                                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Filtrer par</h3>
                                                        <label className="flex items-center gap-2">
                                                            <input type="checkbox" className="w-4 h-4 text-[#0071c2] border-gray-300 rounded" />
                                                            <span className="text-sm text-gray-700">Offres du catalogue</span>
                                                        </label>
                                                    </div>

                                                    {/* Trier par */}
                                                    <div>
                                                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Trier par</h3>
                                                        <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                                                            <option>Nom</option>
                                                        </select>
                                                        <div className="mt-3 space-y-2">
                                                            <label className="flex items-center gap-2">
                                                                <input type="radio" name="order" defaultChecked className="w-4 h-4 text-[#0071c2]" />
                                                                <span className="text-sm text-gray-700">Ordre croissant</span>
                                                            </label>
                                                            <label className="flex items-center gap-2">
                                                                <input type="radio" name="order" className="w-4 h-4 text-[#0071c2]" />
                                                                <span className="text-sm text-gray-700">Ordre décroissant</span>
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {/* Trier les réservations par */}
                                                    <div>
                                                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Trier les réservations par :</h3>
                                                        <div className="space-y-2">
                                                            <label className="flex items-center gap-2">
                                                                <input type="radio" name="reservations" defaultChecked className="w-4 h-4 text-[#0071c2]" />
                                                                <span className="text-sm text-gray-700">Date de réservation</span>
                                                            </label>
                                                            <label className="flex items-center gap-2">
                                                                <input type="radio" name="reservations" className="w-4 h-4 text-[#0071c2]" />
                                                                <span className="text-sm text-gray-700">Date de séjour</span>
                                                            </label>
                                                        </div>
                                                        <p className="text-xs text-gray-600 mt-3">
                                                            Affiche les données brutes pour les réservations effectuées au cours des 12 derniers mois.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-700">Voir ma performance pour :</span>
                                <select className="px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded text-sm bg-white">
                                    <option>Les 12 derniers mois</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Contenu selon l'onglet */}
                    {activeTab === 'actives' && (
                        <div className="bg-white border border-gray-200 rounded-b-lg">
                            {/* Tableau */}
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                                            <button className="flex items-center gap-1">
                                                Nom
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                                </svg>
                                            </button>
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Réduction</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Période réservable</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Dates de séjour</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Réservations</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Nuitées</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Prix moyen</th>
                                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">Revenus</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setExpandedPromo(expandedPromo === 'promo1' ? null : 'promo1')}
                                                    className="text-gray-400 hover:text-gray-600 transition-transform"
                                                >
                                                    <svg
                                                        className={`w-4 h-4 transition-transform ${expandedPromo === 'promo1' ? 'rotate-180' : ''}`}
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </button>
                                                <img
                                                    src="/first_bookings_discount.svg"
                                                    alt="Offre Nouvel Hébergement"
                                                    className="w-12 h-12"
                                                />
                                                <div>
                                                    <div className="text-sm text-gray-600">Offres du catalogue</div>
                                                    <div className="text-sm font-medium text-[#0071c2]">Offre Nouvel Hébergement</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">20 %</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">90 jours ou 3 réservations</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">Promotion toujours active</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">--</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">--</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">--</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">--</td>
                                    </tr>

                                    {/* Détails expandables */}
                                    {expandedPromo === 'promo1' && (
                                        <tr>
                                            <td colSpan="8" className="px-6 py-6 bg-gray-50">
                                                <div className="space-y-4">
                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900 mb-1">Date de création</div>
                                                        <div className="text-sm text-gray-700">6 févr. 2026</div>
                                                    </div>

                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900 mb-1">Plans tarifaires</div>
                                                        <div className="text-sm text-gray-700">Tous les plans tarifaires</div>
                                                    </div>

                                                    <div>
                                                        <div className="text-sm font-semibold text-gray-900 mb-1">Hébergements</div>
                                                        <div className="text-sm text-gray-700">Tous les types d'hébergements</div>
                                                    </div>

                                                    <button className="px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                                                        Désactiver
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                                <div className="flex items-center gap-2">
                                    <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button className="px-3 py-1 bg-[#0071c2] text-white rounded">1</button>
                                    <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-700">
                                    <span>1–1 sur 1</span>
                                    <select className="px-3 py-1 border border-gray-300 rounded">
                                        <option>Voir 20</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'terminees' && (
                        <div className="bg-white border border-gray-200 rounded-b-lg p-16 text-center">
                            <div className="flex justify-center mb-6">
                                <Tag className="w-16 h-16 text-gray-300" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                Vos promotions interrompues ou terminées apparaîtront sur cette page.
                            </h3>
                            <p className="text-sm text-gray-600">
                                Vous n'avez pas encore de promotions terminées.
                            </p>
                        </div>
                    )}
                </div>

                {/* Lien aide */}
                <div className="mt-6 text-center">
                    <a href="#" className="text-[#0071c2] text-sm hover:underline">
                        Vous avez besoin d'aide avec cette page ? Consultez le tutoriel.
                    </a>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default PromotionsActives