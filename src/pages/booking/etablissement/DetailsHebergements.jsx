import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { X } from 'lucide-react'
import { useState } from 'react'

function DetailsHebergements() {
    const [showAlert, setShowAlert] = useState(true)
    const [unitSystem, setUnitSystem] = useState('meters') // 'meters' or 'feet'
    const [superficie, setSuperficie] = useState('43.88')
    const [superficieUnit, setSuperficieUnit] = useState('m²')

    const [equipments, setEquipments] = useState([
        { id: 1, name: 'Lits double/jumeaux', active: false },
        { id: 2, name: 'Bureau', active: false },
        { id: 3, name: 'Bidet', active: true },
        { id: 4, name: 'Lit pliant', active: false },
        { id: 5, name: 'Canapé-lit', active: false },
        { id: 6, name: 'Penderie', active: true },
        { id: 7, name: "Porte d'accueil", active: false },
        { id: 8, name: "Porte à détecteur d'alarme", active: false },
        { id: 9, name: 'Bavoir porteur', active: false },
        { id: 10, name: 'Couverture de piscine', active: false },
        { id: 11, name: 'Serviettes de piscine', active: false },
        { id: 12, name: 'Piscine avec vue', active: false },
        { id: 13, name: 'Piscine sur le toit', active: false },
        { id: 14, name: "Piscine d'eau salée", active: false },
        { id: 15, name: 'Espace peu profond', active: false },
        { id: 16, name: 'Climatisation', active: false },
        { id: 17, name: 'Piscine privée', active: false },
        { id: 18, name: 'Sèche-linge', active: false },
        { id: 19, name: 'Télévision', active: true },
        { id: 20, name: 'Minibar', active: false },
        { id: 21, name: 'Coffre-fort', active: false },
        { id: 22, name: 'Balcon', active: true },
        { id: 23, name: 'Vue sur jardin', active: false },
        { id: 24, name: 'Machine à café', active: true },
        { id: 25, name: 'Bouilloire électrique', active: true }
    ])

    const handleToggle = (id, value) => {
        setEquipments(equipments.map(eq =>
            eq.id === id ? { ...eq, active: value } : eq
        ))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-4xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Détails des hébergements</h1>

                {/* Alerte info */}
                {showAlert && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start justify-between">
                        <div className="flex-1">
                            <p className="text-sm text-gray-900 font-semibold mb-2">
                                Nous avons ajouté ces nouveaux équipements dans la section High-tech. Veuillez prendre quelques instants pour mettre à jour vos informations si nécessaire.
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs text-[#0071c2] hover:underline cursor-pointer">Appareil installé</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-[#0071c2] hover:underline cursor-pointer">Smartphone</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-[#0071c2] hover:underline cursor-pointer">Service de streaming (ex: Netflix)</span>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowAlert(false)}
                            className="ml-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Section unité de mesure */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <p className="text-sm text-gray-600 mb-4">
                        La superficie sera affichée sur la page de votre hébergement sur Booking.com
                    </p>

                    <h3 className="text-base font-semibold text-gray-900 mb-4">
                        Quelle unité de mesure préférez-vous ?
                    </h3>

                    <div className="flex gap-3 mb-6">
                        <button
                            onClick={() => setUnitSystem('meters')}
                            className={`
                                px-6 py-2 text-sm font-medium rounded transition-colors
                                ${unitSystem === 'meters'
                                    ? 'bg-[#0071c2] text-white'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                }
                            `}
                        >
                            Mètres carrés
                        </button>
                        <button
                            onClick={() => setUnitSystem('feet')}
                            className={`
                                px-6 py-2 text-sm font-medium rounded transition-colors
                                ${unitSystem === 'feet'
                                    ? 'bg-[#0071c2] text-white'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                }
                            `}
                        >
                            Pieds carrés
                        </button>
                    </div>

                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-900 mb-2">
                            Superficie de cet hébergement (optionnel)
                        </label>
                        <p className="text-sm text-gray-600 mb-3">
                            Appartement 1 Chambre
                        </p>
                        <div className="flex gap-2 items-center">
                            <input
                                type="text"
                                value={superficie}
                                onChange={(e) => setSuperficie(e.target.value)}
                                className="w-32 px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                            />
                            <select
                                value={superficieUnit}
                                onChange={(e) => setSuperficieUnit(e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                            >
                                <option value="m²">m²</option>
                                <option value="ft²">ft²</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Section Équipements en chambre */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Équipements en chambre</h2>

                    <div className="bg-white rounded-lg border border-gray-200">
                        <div className="divide-y divide-gray-200">
                            {equipments.map((equipment) => (
                                <div
                                    key={equipment.id}
                                    className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-sm text-gray-900">
                                        {equipment.name}
                                    </span>
                                    <div className="flex gap-0">
                                        <button
                                            onClick={() => handleToggle(equipment.id, true)}
                                            className={`
                                                px-4 py-1.5 text-sm font-medium transition-colors
                                                ${equipment.active
                                                    ? 'bg-[#0071c2] text-white'
                                                    : 'bg-white text-gray-700 border border-gray-300'
                                                }
                                                rounded-l
                                            `}
                                        >
                                            Oui
                                        </button>
                                        <button
                                            onClick={() => handleToggle(equipment.id, false)}
                                            className={`
                                                px-4 py-1.5 text-sm font-medium transition-colors
                                                ${!equipment.active
                                                    ? 'bg-[#0071c2] text-white'
                                                    : 'bg-white text-gray-700 border border-gray-300'
                                                }
                                                rounded-r border-l-0
                                            `}
                                        >
                                            Non
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex gap-3">
                    <button className="px-6 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                        Enregistrer les modifications
                    </button>
                    <button className="px-6 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium">
                        Annuler
                    </button>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default DetailsHebergements