import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { useParams } from 'react-router-dom'
import propertiesData from '../../../data/booking/properties.json'
import photosData from '../../../data/booking/photos.json'
import { Plus } from 'lucide-react'

function Hebergements() {
    const { id } = useParams()
    const property = propertiesData.find(p => p.id === id)
    const propertyPhotos = photosData[id] || []

    // Récupérer une photo de chambre
    const bedroomPhoto = propertyPhotos.find(p => p.category === 'bedroom')

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-6xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Hébergements</h1>

                <div className="grid grid-cols-2 gap-6">
                    {/* Carte hébergement existant */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                        {/* Photo */}
                        <div className="relative h-64 bg-gray-200">
                            {bedroomPhoto ? (
                                <img
                                    src={bedroomPhoto.url}
                                    alt="Chambre"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    Pas de photo disponible
                                </div>
                            )}
                            {/* Overlay avec nom */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                <h3 className="text-white text-xl font-semibold mb-1">
                                    Appartement 1 Chambre
                                </h3>
                                <p className="text-white/80 text-sm">
                                    ({id}01)
                                </p>
                            </div>
                        </div>

                        {/* Infos */}
                        <div className="p-6">
                            <div className="space-y-2 mb-6">
                                <p className="text-sm text-gray-700">
                                    Nombre maximum de personnes: <span className="font-semibold">2 personnes</span>
                                </p>
                                <p className="text-sm text-gray-700">
                                    Nombre d'adultes maximum: <span className="font-semibold">2 adultes</span>
                                </p>
                                <p className="text-sm text-gray-700">
                                    Nombre d'enfants maximum: <span className="font-semibold">1 enfant</span>
                                </p>
                                <p className="text-sm text-gray-700">
                                    Nombre d'hébergements de ce type : <span className="font-semibold">1</span>
                                </p>
                            </div>

                            {/* Boutons */}
                            <div className="flex gap-3">
                                <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium">
                                    Modifier
                                </button>
                                <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                    Télécharger des photos
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Cartes création */}
                    <div className="space-y-6">
                        {/* Créer à la même adresse */}
                        <button className="w-full h-64 bg-[#003580] rounded-lg flex flex-col items-center justify-center gap-4 hover:bg-[#002855] transition-colors">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                <Plus className="w-8 h-8 text-[#003580]" strokeWidth={3} />
                            </div>
                            <div className="text-center">
                                <p className="text-white text-lg font-semibold mb-1">
                                    Créer un nouvel établissement
                                </p>
                                <p className="text-white/80 text-sm">
                                    (7 Rue du Four)
                                </p>
                            </div>
                        </button>

                        {/* Créer à une autre adresse */}
                        <button className="w-full h-64 bg-[#003580] rounded-lg flex flex-col items-center justify-center gap-4 hover:bg-[#002855] transition-colors">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                <Plus className="w-8 h-8 text-[#003580]" strokeWidth={3} />
                            </div>
                            <div className="text-center">
                                <p className="text-white text-lg font-semibold mb-1">
                                    Créer un nouvel établissement
                                </p>
                                <p className="text-white/80 text-sm">
                                    (à une adresse différente)
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default Hebergements