import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { useState } from 'react'

function CopierTarifs() {
    const [selectedYear, setSelectedYear] = useState('2026')
    const [dateFrom, setDateFrom] = useState('2026-01-21')
    const [dateTo, setDateTo] = useState('2026-12-31')
    const [selectedDays, setSelectedDays] = useState({
        lun: true,
        mar: true,
        mer: true,
        jeu: true,
        ven: true,
        sam: true,
        dim: true
    })
    const [selectAllRatePlans, setSelectAllRatePlans] = useState(false)
    const [standardRate, setStandardRate] = useState(false)
    const [pricingOption, setPricingOption] = useState('actual')
    const [copyRestrictions, setCopyRestrictions] = useState(false)

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
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Copier les tarifs annuels</h1>
                <p className="text-sm text-gray-600 mb-8">
                    Ici, vous pouvez facilement copier vos plans tarifaires existants sur la période de votre choix, en toute simplicité.
                </p>

                <div className="space-y-6">
                    {/* Section 1: Date Selection */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">
                            Quelles dates souhaitez-vous utiliser pour copier vos plans tarifaires ?
                        </h2>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sélectionnez une période
                            </label>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                            >
                                <option value="2026">Année complète (2026)</option>
                                <option value="2027">Année complète (2027)</option>
                                <option value="custom">Période personnalisée</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <input
                                    type="date"
                                    value={dateFrom}
                                    onChange={(e) => setDateFrom(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <input
                                    type="date"
                                    value={dateTo}
                                    onChange={(e) => setDateTo(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Info banner */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 flex items-start gap-2">
                            <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-gray-700">
                                Les tarifs seront copiés pour l'année 2027
                            </p>
                        </div>
                    </div>

                    {/* Section 2: Days of Week */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">
                            Quels jours de la semaine souhaitez-vous utiliser pour copier vos plans tarifaires ?
                        </h2>

                        <div className="flex flex-wrap gap-4 mb-4">
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

                        {/* Warning banner */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 flex items-start gap-2">
                            <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm text-gray-700">
                                Vos tarifs seront copiés et utilisés sur les mêmes jours de la semaine de l'année à venir. Ainsi, les premiers lundi de la période que vous avez choisie en 2025 sera copié sur le premier lundi de la même période en 2027, etc.
                            </p>
                        </div>
                    </div>

                    {/* Section 3: Rate Plans */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">
                            Quels plans tarifaires et types d'hébergements souhaitez-vous copier ?
                        </h2>

                        <div className="mb-4">
                            <label className="flex items-center gap-2 cursor-pointer mb-3">
                                <input
                                    type="checkbox"
                                    checked={selectAllRatePlans}
                                    onChange={() => setSelectAllRatePlans(!selectAllRatePlans)}
                                    className="w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Sélectionner tous les plans tarifaires pour tous les types d'hébergements</span>
                            </label>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <p className="text-sm font-medium text-gray-900 mb-3">Appartement 1 Chambre</p>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={standardRate}
                                    onChange={() => setStandardRate(!standardRate)}
                                    className="w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Standard rate</span>
                            </label>
                        </div>
                    </div>

                    {/* Section 4: Pricing Options */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">
                            Souhaitez-vous modifier les tarifs ?
                        </h2>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="pricing"
                                    value="actual"
                                    checked={pricingOption === 'actual'}
                                    onChange={(e) => setPricingOption(e.target.value)}
                                    className="w-4 h-4 text-[#0071c2] border-gray-300 focus:ring-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Utiliser les tarifs actuels</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="pricing"
                                    value="increase-fixed"
                                    checked={pricingOption === 'increase-fixed'}
                                    onChange={(e) => setPricingOption(e.target.value)}
                                    className="w-4 h-4 text-[#0071c2] border-gray-300 focus:ring-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Augmenter les tarifs d'un montant fixe</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="pricing"
                                    value="increase-percent"
                                    checked={pricingOption === 'increase-percent'}
                                    onChange={(e) => setPricingOption(e.target.value)}
                                    className="w-4 h-4 text-[#0071c2] border-gray-300 focus:ring-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Augmenter les tarifs d'un montant sous forme de pourcentage</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="pricing"
                                    value="lower-percent"
                                    checked={pricingOption === 'lower-percent'}
                                    onChange={(e) => setPricingOption(e.target.value)}
                                    className="w-4 h-4 text-[#0071c2] border-gray-300 focus:ring-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Baisser les tarifs d'un montant sous forme de pourcentage</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="pricing"
                                    value="lower-fixed"
                                    checked={pricingOption === 'lower-fixed'}
                                    onChange={(e) => setPricingOption(e.target.value)}
                                    className="w-4 h-4 text-[#0071c2] border-gray-300 focus:ring-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Baisser les tarifs d'un montant fixe</span>
                            </label>
                        </div>
                    </div>

                    {/* Section 5: Restrictions */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">
                            Souhaitez-vous copier les restrictions pour ces dates ?
                        </h2>
                        <p className="text-sm text-gray-600 mb-4">
                            Il peut s'agir de restrictions que vous avez paramétrées et qui sont relatives à la durée de séjour, aux dates d'arrivée et de départ ou au délai de réservation.
                        </p>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={copyRestrictions}
                                onChange={() => setCopyRestrictions(!copyRestrictions)}
                                className="w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                            />
                            <span className="text-sm text-gray-700">Oui, copier toutes mes restrictions pour cette période</span>
                        </label>
                    </div>

                    {/* Warning banner */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3 flex items-start gap-2">
                        <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm text-gray-700">
                            Vous pourrez vérifier tous les éléments sélectionnés sur la page suivante avant de confirmer vos choix
                        </p>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button className="px-6 py-3 bg-[#0071c2] text-white font-medium rounded hover:bg-[#005999] transition-colors">
                            Vérifier
                        </button>
                    </div>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default CopierTarifs