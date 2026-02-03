import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { Info, X, Tag } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function PromotionsActives() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [showAlert, setShowAlert] = useState(true)
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

                {/* Alerte info */}
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
                )}

                {/* Informations utiles */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations utiles</h2>
                    <p className="text-xs text-gray-600 mb-6">
                        Les données de performance mentionnées sur cette page concernent votre établissement, votre région et vos concurrents directs.
                    </p>

                    <div className="grid grid-cols-3 gap-6">
                        {/* Carte 1 */}
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

                        {/* Carte 2 */}
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

                        {/* Carte 3 */}
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
                </div>

                {/* Section Vos promotions */}
                <div className="bg-white rounded-lg border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Vos promotions</h2>

                        {/* Filtres */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-600">Statut</span>
                                <div className="flex gap-2">
                                    <button className="px-4 py-1.5 bg-gray-100 text-gray-900 rounded-full text-sm font-medium border border-gray-300">
                                        Active(s)
                                    </button>
                                    <button className="px-4 py-1.5 text-gray-600 rounded-full text-sm hover:bg-gray-50">
                                        Terminée(s)
                                    </button>
                                    <button className="px-4 py-1.5 text-gray-600 rounded-full text-sm hover:bg-gray-50 flex items-center gap-1">
                                        <span>Plus de filtres</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Voir ma performance pour :</span>
                                <select className="px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-700">
                                    <option>Les 12 derniers mois</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* État vide */}
                    <div className="p-16 text-center">
                        <div className="flex justify-center mb-6">
                            <Tag className="w-16 h-16 text-gray-300" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                            Vos promotions actives apparaîtront sur cette page.
                        </h3>
                        <p className="text-sm text-gray-600 mb-6">
                            Vous n'avez aucune promotion active pour le moment.<br />
                            Ajoutez-en une pour augmenter votre taux d'occupation.
                        </p>
                        <button
                            onClick={handleNewPromotion}
                            className="px-6 py-2.5 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors font-medium text-sm"
                        >
                            Choisir une nouvelle promotion
                        </button>
                    </div>
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