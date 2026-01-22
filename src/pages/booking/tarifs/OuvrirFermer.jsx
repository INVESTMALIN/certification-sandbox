import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { useState } from 'react'

function OuvrirFermer() {
    const [dateFrom, setDateFrom] = useState('2026-01-22')
    const [dateTo, setDateTo] = useState('2026-02-21')
    const [selectedDays, setSelectedDays] = useState({
        lun: true,
        mar: true,
        mer: true,
        jeu: true,
        ven: true,
        sam: true,
        dim: true
    })
    const [selectedAccommodation, setSelectedAccommodation] = useState('entire')
    const [selectedRatePlans, setSelectedRatePlans] = useState(false)
    const [status, setStatus] = useState('open')

    const toggleDay = (day) => {
        setSelectedDays(prev => ({
            ...prev,
            [day]: !prev[day]
        }))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-4xl mx-auto px-6 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">Ouvrir/fermer des hébergements</h1>

                <div className="space-y-6">
                    {/* Section 1: Date Range */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">
                            Quelles sont les dates pour lesquelles vous voulez effectuer des modifications ?
                        </h2>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Du :</label>
                                <input
                                    type="date"
                                    value={dateFrom}
                                    onChange={(e) => setDateFrom(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Au :</label>
                                <input
                                    type="date"
                                    value={dateTo}
                                    onChange={(e) => setDateTo(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Days of week checkboxes */}
                        <div className="flex flex-wrap gap-4">
                            {[
                                { key: 'lun', label: 'lun.' },
                                { key: 'mar', label: 'mar.' },
                                { key: 'mer', label: 'mer.' },
                                { key: 'jeu', label: 'jeu.' },
                                { key: 'ven', label: 'ven.' },
                                { key: 'sam', label: 'sam.' },
                                { key: 'dim', label: 'dim.' }
                            ].map(day => (
                                <label key={day.key} className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedDays[day.key]}
                                        onChange={() => toggleDay(day.key)}
                                        className="w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">{day.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Section 2: Accommodation Type */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">
                            Quels types d'hébergements et de plans tarifaires voulez-vous ouvrir ou fermer ?
                        </h2>
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-3">Appartement 3 Chambres</p>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedAccommodation === 'entire'}
                                        onChange={() => setSelectedAccommodation('entire')}
                                        className="w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">L'hébergement entier</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={selectedRatePlans}
                                        onChange={() => setSelectedRatePlans(!selectedRatePlans)}
                                        className="w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">Des plans tarifaires spécifiques</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Status Selection */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">
                            Appliquez le statut suivant aux hébergements et tarifs sélectionnés :
                        </h2>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="open"
                                    checked={status === 'open'}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-4 h-4 text-[#0071c2] border-gray-300 focus:ring-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Ouvert</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="closed"
                                    checked={status === 'closed'}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-4 h-4 text-[#0071c2] border-gray-300 focus:ring-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Fermé</span>
                            </label>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button className="px-6 py-3 bg-[#0071c2] text-white font-medium rounded hover:bg-[#005999] transition-colors">
                            Enregistrer les modifications
                        </button>
                    </div>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default OuvrirFermer