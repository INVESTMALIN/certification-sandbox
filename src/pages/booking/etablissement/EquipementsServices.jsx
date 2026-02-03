import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { useState } from 'react'

function EquipementsServices() {
    const [equipments, setEquipments] = useState([
        { id: 1, name: 'WiFi gratuit', active: true },
        { id: 2, name: 'Climatisation', active: true },
        { id: 3, name: 'Chauffage', active: true },
        { id: 4, name: 'Parking gratuit', active: true },
        { id: 5, name: 'Piscine', active: false },
        { id: 6, name: 'Bar', active: false },
        { id: 7, name: 'Sauna', active: false },
        { id: 8, name: 'Jardin', active: false },
        { id: 9, name: 'Terrasse', active: false },
        { id: 10, name: 'Chambres non-fumeurs', active: true },
        { id: 11, name: 'Chambres familiales', active: true },
        { id: 12, name: 'Ascenseur', active: false },
        { id: 13, name: 'Télévision à écran plat', active: true },
        { id: 14, name: 'Machine à café', active: true },
        { id: 15, name: 'Lave-linge', active: true },
        { id: 16, name: 'Fer à repasser', active: true },
        { id: 17, name: 'Sèche-cheveux', active: true },
        { id: 18, name: 'Réfrigérateur', active: true },
        { id: 19, name: 'Micro-ondes', active: true },
        { id: 20, name: 'Bouilloire électrique', active: true },
        { id: 21, name: 'Ustensiles de cuisine', active: true },
        { id: 22, name: 'Lave-vaisselle', active: true },
        { id: 23, name: 'Balcon', active: true },
        { id: 24, name: 'Vue sur la ville', active: true },
        { id: 25, name: 'Mobilier extérieur', active: true },
        { id: 26, name: 'Articles de toilette gratuits', active: true },
        { id: 27, name: 'Serviettes', active: true },
        { id: 28, name: 'Linge de maison', active: true },
        { id: 29, name: 'Bureau', active: true },
        { id: 30, name: 'Canapé', active: true }
    ])

    const handleToggle = (id, value) => {
        setEquipments(equipments.map(eq =>
            eq.id === id ? { ...eq, active: value } : eq
        ))
    }

    const activeCount = equipments.filter(eq => eq.active).length

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-5xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Équipements et services</h1>
                <p className="text-sm text-gray-600 mb-8">
                    Sélectionnez les équipements et services disponibles dans votre établissement. Ces informations seront affichées aux clients potentiels.
                </p>

                {/* Compteur */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">{activeCount}</span> équipements activés sur <span className="font-semibold">{equipments.length}</span>
                    </p>
                </div>

                {/* Section titre */}
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Les meilleurs équipements</h2>

                {/* Liste des équipements */}
                <div className="bg-white rounded-lg border border-gray-200">
                    <div className="divide-y divide-gray-200">
                        {equipments.map((equipment) => (
                            <div
                                key={equipment.id}
                                className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
                            >
                                <span className="text-base text-gray-900">
                                    {equipment.name}
                                </span>
                                <div className="flex gap-0">
                                    <button
                                        onClick={() => handleToggle(equipment.id, true)}
                                        className={`
                                            px-6 py-2 text-sm font-medium transition-colors
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
                                            px-6 py-2 text-sm font-medium transition-colors
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

                {/* Boutons d'action */}
                <div className="mt-6 flex gap-3">
                    <button className="px-6 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                        Enregistrer les modifications
                    </button>
                    <button className="px-6 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors text-sm font-medium">
                        Annuler
                    </button>
                </div>

                {/* Info supplémentaire */}
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                        <strong>Conseil :</strong> Plus vous ajoutez d'équipements et de services, plus votre établissement sera attractif pour les clients potentiels. Assurez-vous que tous les équipements listés sont réellement disponibles.
                    </p>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default EquipementsServices