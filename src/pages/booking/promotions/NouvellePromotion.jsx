import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { Calendar, Clock, Smartphone, Globe, Star, Zap, Gift } from 'lucide-react'

function NouvellePromotion() {
    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-5xl mx-auto px-6 py-8">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-600 mb-4">
                    <span className="hover:underline cursor-pointer">Promotions</span>
                    <span className="mx-2">›</span>
                    <span>Choisissez une nouvelle promotion</span>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Choisissez une nouvelle promotion</h1>
                    <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                        Simuler la réduction maximale
                    </button>
                </div>

                {/* Informations utiles */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Informations utiles</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Les données de performance mentionnées sur cette page concernent votre établissement, votre région et vos concurrents directs.
                    </p>

                    <div className="grid grid-cols-3 gap-4">
                        {/* Card 1 */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                        Vous accueillez moins de clients habitant aux États-Unis que la moyenne
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-600">Vous</span>
                                            <span className="font-medium">9 %</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-600">Votre région</span>
                                            <span className="font-medium">5 %</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-3">
                                        Les autres établissements situés à Avignon et dans les États-Unis de plus de 100 mois.
                                    </p>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600 ml-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-gray-600 mb-1">Tarif géocible</div>
                                    <div className="text-xs text-gray-900">Au moins 15 % de réduction</div>
                                </div>
                                <button className="px-3 py-1.5 border border-[#0071c2] text-[#0071c2] rounded text-xs hover:bg-blue-50">
                                    Ajouter cette promotion
                                </button>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                        Vos concurrents directs reçoivent plus de réservations de Dernière Minute
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-600">Vous</span>
                                            <span className="font-medium text-red-600">-65 jour avant l'arrivée</span>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-600">Vos concurrents directs</span>
                                            <span className="font-medium">-7.5 jour avant l'arrivée</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-3">
                                        Vos concurrents directs reçoivent des réservations environ 57.5 jour plus tôt que la date d'arrivée que vous.
                                    </p>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600 ml-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                    <Clock className="w-5 h-5 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-gray-600 mb-1">Offre de Dernière Minute</div>
                                    <div className="text-xs text-gray-900">Au moins 15 % de réduction</div>
                                </div>
                                <button className="px-3 py-1.5 border border-[#0071c2] text-[#0071c2] rounded text-xs hover:bg-blue-50">
                                    Ajouter cette promotion
                                </button>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                        Les voyageurs habitant aux États-Unis paient un prix moyen plus élevé que les autres
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-600">Voyageurs habitant aux États-Unis</span>
                                            <span className="font-medium">€ 177</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-600"></span>
                                            <span className="font-medium">€ 137</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-3">
                                        Le prix moyen des séjours réservés à voyager par les voyageurs habitant aux États-Unis est de 12 fois supérieur.
                                    </p>
                                </div>
                                <button className="text-gray-400 hover:text-gray-600 ml-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs text-gray-600 mb-1">Tarif géocible</div>
                                    <div className="text-xs text-gray-900">Au moins 15 % de réduction</div>
                                </div>
                                <button className="px-3 py-1.5 border border-[#0071c2] text-[#0071c2] rounded text-xs hover:bg-blue-50">
                                    Ajouter cette promotion
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Campagnes */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Campagnes</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Profitez d'une réduction pour gagner en visibilité dans nos e-mails et nos notifications, mais aussi sur nos sites affiliés et nos autres canaux.
                    </p>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-base font-semibold text-gray-900">Offre Début 2026</h3>
                                    <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-xs font-medium rounded">Nouveau</span>
                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">Durée limitée</span>
                                </div>
                                <div className="text-sm text-gray-900 mb-1">Réduction recommandée : au moins 25 %</div>
                                <div className="text-sm text-gray-600 mb-3">
                                    Offre de séjour : 1er janv. 2026–1er avr. 2026
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-600 mb-2">Distribuez-vous des réservations anticipées et commencez la nouvelle année en beauté !</div>
                                <button className="px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                                    Ajouter cette promotion
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Offres spéciales */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Offres spéciales</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Augmentez votre taux d'occupation et bénéficiez d'une visibilité accrue en configurant vos objectifs via nos outils de tarification. Les offres spéciales se consultent également directement depuis vos objectifs.
                    </p>

                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                                <Zap className="w-8 h-8 text-orange-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base font-semibold text-gray-900 mb-2">Offre à Durée Limitée</h3>
                                <div className="text-sm text-gray-900 mb-1">Au moins 15 % de réduction</div>
                                <div className="text-sm text-gray-600">Toutes les dates</div>
                                <div className="flex gap-2 mt-2">
                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">Durée limitée</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-gray-600 mb-2">
                                    Boostez le classement de votre établissement dans les résultats de recherche, pendant 45 jours.
                                </div>
                                <button className="px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                                    Ajouter cette promotion
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tarifs ciblés */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Tarifs ciblés</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Attirez des voyageurs spécifiques ou de devenir un établissement de choix pour les segments de clients à forte valeur ajoutée.
                    </p>

                    <div className="space-y-4">
                        {/* Tarif Mobiles */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                                    <Smartphone className="w-8 h-8 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-gray-900 mb-2">Tarif Mobiles</h3>
                                    <div className="text-sm text-gray-900 mb-1">Au moins 15 % de réduction</div>
                                    <div className="text-sm text-gray-600">Toutes les dates</div>
                                    <div className="flex gap-2 mt-2">
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">Durée</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-600 mb-2">
                                        Toujours actif (possibilité d'inclure un nombre illimité de pays)
                                    </div>
                                    <button className="px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                                        Ajouter cette promotion
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Tarif géocible */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                                    <Globe className="w-8 h-8 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-gray-900 mb-2">Tarif géocible</h3>
                                    <div className="text-sm text-gray-900 mb-1">Réduction recommandée : au moins 15 %</div>
                                    <div className="text-sm text-gray-600">Toujours actif (possibilité d'inclure un nombre illimité de pays)</div>
                                    <div className="flex gap-2 mt-2">
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">Durée</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-600 mb-2">
                                        Attirez les clients de régions définies et augmentez vos revenus.
                                    </div>
                                    <button className="px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                                        Ajouter cette promotion
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Offres du catalogue */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Offres du catalogue</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Augmentez votre taux d'occupation grâce à des réductions offre personnalisables en fonction de vos besoins.
                    </p>

                    <div className="space-y-4">
                        {/* Offre Standard */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                                    <Star className="w-8 h-8 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-gray-900 mb-2">Offre Standard</h3>
                                    <div className="text-sm text-gray-900 mb-1">Réduction recommandée : au moins 15 %</div>
                                    <div className="text-sm text-gray-600">Toutes les dates</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-600 mb-2">
                                        Récompensez une offre pour l'adapter à vos besoins.
                                    </div>
                                    <button className="px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                                        Ajouter cette promotion
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Offre de Dernière Minute */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-8 h-8 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-gray-900 mb-2">Offre de Dernière Minute</h3>
                                    <div className="text-sm text-gray-900 mb-1">Réduction recommandée : au moins 15 %</div>
                                    <div className="text-sm text-gray-600">Toutes les dates</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-600 mb-2">
                                        Remplissez vos hébergements vides.
                                    </div>
                                    <button className="px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                                        Ajouter cette promotion
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Offre de Réservation Anticipée */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-16 h-16 bg-orange-100 rounded flex items-center justify-center flex-shrink-0">
                                    <Gift className="w-8 h-8 text-orange-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-semibold text-gray-900 mb-2">Offre de Réservation Anticipée</h3>
                                    <div className="text-sm text-gray-900 mb-1">Réduction recommandée : au moins 15 %</div>
                                    <div className="text-sm text-gray-600">Toutes les dates</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-600 mb-2">
                                        Encouragez les clients à augmenter le nombre de réservations effectuées à l'avance.
                                    </div>
                                    <button className="px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                                        Ajouter cette promotion
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer note */}
                <div className="text-sm text-gray-600 border-t border-gray-200 pt-4">
                    <p>
                        Assurez-vous de proposer une réduction assez forte des promotions légales, les promotions affichées sur votre site doivent correspondre à la réduction réellement proposée à vos clients.{' '}
                        <a href="#" className="text-[#0071c2] hover:underline">En savoir plus</a>
                    </p>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default NouvellePromotion