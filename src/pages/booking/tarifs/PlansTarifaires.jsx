import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

function PlansTarifaires() {
    const [selectedPeriod, setSelectedPeriod] = useState('30')

    const ratePlans = [
        {
            id: 'ID-3556414',
            name: 'Standard Rate',
            cancellationConditions: 'Non remboursable',
            pricing: 'Majoration à partir de Beds24',
            cancellationRate: 'Données insuffisantes',
            netRevenue: '1 640,0 €',
            badge: 'Non remboursable'
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Plans tarifaires</h1>
                <p className="text-sm text-gray-600 mb-6">
                    Créez et modifiez plusieurs plans tarifaires pour vos clients et gérez les disponibilités ainsi que les tarifs dans votre{' '}
                    <a href="#" className="text-[#0071c2] hover:underline">Calendrier</a>.
                </p>

                {/* Add Plan Button */}
                <div className="mb-6">
                    <button className="px-4 py-2 bg-[#0071c2] text-white font-medium rounded hover:bg-[#005999] transition-colors">
                        Ajouter un plan tarifaire
                    </button>
                </div>

                {/* Period Filters */}
                <div className="mb-6 flex items-center gap-4">
                    <span className="text-sm text-gray-700">Voir les annulations et les revenus nets des :</span>
                    <div className="flex gap-2">
                        {[
                            { value: '30', label: '30 derniers jours' },
                            { value: '90', label: '3 derniers mois' },
                            { value: '180', label: '6 derniers mois' },
                            { value: '365', label: '12 derniers mois' }
                        ].map(period => (
                            <button
                                key={period.value}
                                onClick={() => setSelectedPeriod(period.value)}
                                className={`px-4 py-2 text-sm rounded border transition-colors ${selectedPeriod === period.value
                                        ? 'bg-[#0071c2] text-white border-[#0071c2]'
                                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                                    }`}
                            >
                                {period.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rate Plans Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                    Nom du plan tarifaire
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                    Conditions d'annulation
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                    Tarif
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                    Taux d'annulation
                                </th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                                    Revenus nets
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ratePlans.map((plan) => (
                                <tr key={plan.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <ChevronDown className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <div className="font-medium text-gray-900">{plan.name}</div>
                                                <div className="text-sm text-gray-500">{plan.id}</div>
                                                <span className="inline-block mt-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                                    {plan.badge}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {plan.cancellationConditions}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {plan.pricing}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {plan.cancellationRate}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {plan.netRevenue}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default PlansTarifaires