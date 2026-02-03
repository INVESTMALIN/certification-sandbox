import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { useParams } from 'react-router-dom'
import photosData from '../../../data/booking/photos.json'
import { useState } from 'react'
import { ImagePlus, ChevronDown, Trash2 } from 'lucide-react'

function Photos() {
    const { id } = useParams()
    const propertyPhotos = photosData[id] || []

    const [activeTab, setActiveTab] = useState('all')
    const [showAirbnbImport, setShowAirbnbImport] = useState(false)
    const [intelligentSort, setIntelligentSort] = useState(true)

    // Filtrer les photos selon l'onglet actif
    const getFilteredPhotos = () => {
        switch (activeTab) {
            case 'all':
                return propertyPhotos
            case 'bad_quality':
                return propertyPhotos.filter(p => p.quality === 'bad')
            case 'missing':
                return [] // Pas de logements avec photos manquantes
            case 'to_tag':
                return propertyPhotos.filter(p => p.needsTagging)
            default:
                return propertyPhotos
        }
    }

    const filteredPhotos = getFilteredPhotos()

    // Compter les photos par catégorie
    const allCount = propertyPhotos.length
    const badQualityCount = propertyPhotos.filter(p => p.quality === 'bad').length
    const missingCount = 0
    const toTagCount = propertyPhotos.filter(p => p.needsTagging).length

    const tabs = [
        { id: 'all', label: 'Toutes les photos', count: allCount },
        { id: 'bad_quality', label: 'Photos de mauvaise qualité', count: badQualityCount, badge: 'red' },
        { id: 'missing', label: 'Logements avec photos manquantes', count: missingCount, badge: 'red' },
        { id: 'to_tag', label: 'Photos à marquer', count: toTagCount, badge: 'red' }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-6xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Photos de l'établissement</h1>

                {/* Onglets */}
                <div className="flex gap-4 mb-6 border-b border-gray-200">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                pb-3 px-2 text-sm font-medium transition-colors relative
                                ${activeTab === tab.id
                                    ? 'text-[#0071c2] border-b-2 border-[#0071c2]'
                                    : 'text-gray-600 hover:text-gray-900'
                                }
                            `}
                        >
                            {tab.label}
                            <span className={`
                                ml-2 px-2 py-0.5 rounded text-xs font-semibold
                                ${tab.badge === 'red' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}
                            `}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Section import Airbnb */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg mb-6">
                    <button
                        onClick={() => setShowAirbnbImport(!showAirbnbImport)}
                        className="w-full p-4 flex items-center justify-between text-left"
                    >
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                Importez des photos depuis votre page de l'établissement Airbnb
                            </h3>
                            <p className="text-sm text-gray-600">
                                Les voyageurs à la recherche de leur hébergement de vacances idéal se fient principalement aux photos. Vous avez publié de superbes photos de votre hébergement sur Airbnb ? Utilisez-les également sur Booking.com !
                            </p>
                        </div>
                        <ChevronDown
                            className={`w-5 h-5 text-gray-500 flex-shrink-0 ml-4 transition-transform ${showAirbnbImport ? 'rotate-180' : ''
                                }`}
                        />
                    </button>
                    {showAirbnbImport && (
                        <div className="px-4 pb-4">
                            <p className="text-sm text-gray-600">
                                Contenu de l'import Airbnb à développer...
                            </p>
                        </div>
                    )}
                </div>

                {/* Galerie principale */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-900">
                            Galerie principale ({filteredPhotos.length} photos)
                        </h2>
                        <div className="flex items-center gap-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={intelligentSort}
                                    onChange={(e) => setIntelligentSort(e.target.checked)}
                                    className="w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Tri intelligent</span>
                            </label>
                            <div className="w-10 h-10 bg-[#0071c2] rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-semibold">ON</span>
                            </div>
                        </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex items-center gap-3 mb-6">
                        <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium flex items-center gap-2">
                            <ImagePlus className="w-4 h-4" />
                            Ajouter des photos
                        </button>
                        <button className="px-4 py-2 text-[#0071c2] hover:underline text-sm">
                            Tout sélectionner
                        </button>
                        <button className="px-4 py-2 text-gray-600 hover:underline text-sm">
                            Tout désélectionner
                        </button>
                        <button className="px-4 py-2 text-gray-600 hover:underline text-sm">
                            Marquer dans la galerie
                        </button>
                        <button className="px-4 py-2 text-gray-600 hover:underline text-sm flex items-center gap-1">
                            <Trash2 className="w-4 h-4" />
                            Supprimer
                        </button>
                    </div>

                    {/* Grille de photos */}
                    {filteredPhotos.length > 0 ? (
                        <div className="grid grid-cols-4 gap-4">
                            {filteredPhotos.map((photo, index) => (
                                <div key={photo.id} className="relative group">
                                    <div className="aspect-[4/3] bg-gray-100 rounded overflow-hidden">
                                        <img
                                            src={photo.url}
                                            alt={photo.room}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {photo.isMainPhoto && (
                                        <div className="absolute top-2 left-2 px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded">
                                            Photo d'accueil préférée
                                        </div>
                                    )}
                                    {photo.quality === 'bad' && (
                                        <div className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
                                            Mauvaise qualité
                                        </div>
                                    )}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                        <p className="text-white text-xs">{photo.room}</p>
                                    </div>
                                </div>
                            ))}
                            {/* Carte "Ajouter des photos" */}
                            <div className="aspect-[4/3] border-2 border-dashed border-gray-300 rounded flex flex-col items-center justify-center gap-2 hover:border-[#0071c2] hover:bg-blue-50 transition-colors cursor-pointer">
                                <ImagePlus className="w-8 h-8 text-gray-400" />
                                <span className="text-sm text-gray-600">Ajouter des photos</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-600">Aucune photo dans cette catégorie.</p>
                        </div>
                    )}
                </div>

                {/* Section Photos à 360° */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Les photos à 360° arrivent sur la page de votre établissement
                    </h2>
                    <p className="text-sm text-gray-700 mb-6">
                        Nous souhaitons vous aider à offrir une expérience de réservation hors pair à vos clients. C'est pourquoi nous collectons actuellement des photos de haute qualité à 360° afin d'attirer et de surprendre davantage les internautes qui visitent la page de votre établissement.
                    </p>
                    <p className="text-sm text-gray-700 mb-6">
                        Afin de découvrir les bonnes pratiques en matière d'utilisation de photos, veuillez consulter nos{' '}
                        <a href="#" className="text-[#0071c2] hover:underline">
                            conditions relatives aux photos
                        </a>.
                    </p>
                    <button className="px-6 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                        Ajouter des photos
                    </button>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default Photos