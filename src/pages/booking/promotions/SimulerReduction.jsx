import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { useState } from 'react'
import { Info } from 'lucide-react'

function SimulerReduction() {
    const [step1Discounts, setStep1Discounts] = useState({
        earlyBird: 0,
        lastMinute: 0,
        mobile: 0,
        geo: 0
    })

    const [step2Discounts, setStep2Discounts] = useState({
        genius1: 0,
        genius2: 0,
        genius3: 0
    })

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-12">
                <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Simulez la réduction<br />maximum après cumul
                        </h1>
                        <button className="px-6 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors font-medium">
                            Commencer
                        </button>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <img
                            src="/stacking_calculator_hero.svg"
                            alt="Calculator illustration"
                            className="w-80 h-auto"
                        />
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-6 py-12">
                {/* Explanation Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Qu'est-ce que le cumul ?</h2>
                    <p className="text-sm text-gray-700 mb-6">
                        Le cumul consiste à combiner des réductions de différents programmes de réduction afin d'obtenir une réduction totale plus importante. Vous pouvez cumuler jusqu'à 3 types de réductions différentes pour un même client. Voici comment cela fonctionne :
                    </p>

                    {/* Table */}
                    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Catégorie</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Réductions disponibles</th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Cumul possible</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-100">
                                    <td className="px-4 py-3 text-sm text-gray-900">Réductions de base</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        Offre Standard, Offre de Réservation Anticipée, Offre de Dernière Minute, Tarif Mobile, Tarif géocible
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">1 seule réduction de base</td>
                                </tr>
                                <tr className="bg-blue-100 border-b border-gray-100">
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Réductions Genius</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">Genius Niveau 1, 2 et 3</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">Cumul avec réductions de base</td>
                                </tr>
                                <tr className="bg-yellow-100">
                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">Offres spéciales</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">Offre à Durée Limitée, Campagnes</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">Cumul avec toutes les autres réductions</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded p-4">
                        <ul className="text-sm text-gray-700 space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                <span>Une seule réduction de base peut être appliquée par réservation, même avec une réduction Genius et une offre spéciale.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                <span>Chaque réduction s'applique sur le tarif de base et non sur le tarif déjà réduit.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-blue-600 mt-1">•</span>
                                <span>Le cumul maximum théorique est donc : Réduction de base + Réduction Genius + Offre spéciale.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Simulator Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Simulateur de réduction maximum</h2>
                    <p className="text-sm text-gray-700 mb-8">
                        Utilisez ce simulateur pour calculer la réduction maximum que vous pouvez offrir en cumulant différentes réductions.
                        Les réductions se cumulent de manière additive sur le tarif de base, et non de manière multiplicative.
                    </p>

                    <div className="grid grid-cols-2 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-[#0071c2] text-white rounded-full flex items-center justify-center font-bold">
                                    1
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Étape 1</h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                                Choisissez UNE réduction de base parmi les options suivantes :
                            </p>

                            <div className="space-y-3">
                                <div>
                                    <label className="flex items-center justify-between text-sm text-gray-700 mb-1">
                                        <span>Offre de Réservation Anticipée</span>
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="30"
                                            value={step1Discounts.earlyBird}
                                            onChange={(e) => setStep1Discounts({ ...step1Discounts, earlyBird: parseInt(e.target.value) })}
                                            className="flex-1"
                                        />
                                        <span className="w-12 text-sm font-medium text-gray-900">{step1Discounts.earlyBird}%</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center justify-between text-sm text-gray-700 mb-1">
                                        <span>Offre de Dernière Minute</span>
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="30"
                                            value={step1Discounts.lastMinute}
                                            onChange={(e) => setStep1Discounts({ ...step1Discounts, lastMinute: parseInt(e.target.value) })}
                                            className="flex-1"
                                        />
                                        <span className="w-12 text-sm font-medium text-gray-900">{step1Discounts.lastMinute}%</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center justify-between text-sm text-gray-700 mb-1">
                                        <span>Tarif Mobile</span>
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="30"
                                            value={step1Discounts.mobile}
                                            onChange={(e) => setStep1Discounts({ ...step1Discounts, mobile: parseInt(e.target.value) })}
                                            className="flex-1"
                                        />
                                        <span className="w-12 text-sm font-medium text-gray-900">{step1Discounts.mobile}%</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center justify-between text-sm text-gray-700 mb-1">
                                        <span>Tarif géocible</span>
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="30"
                                            value={step1Discounts.geo}
                                            onChange={(e) => setStep1Discounts({ ...step1Discounts, geo: parseInt(e.target.value) })}
                                            className="flex-1"
                                        />
                                        <span className="w-12 text-sm font-medium text-gray-900">{step1Discounts.geo}%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                                <p className="text-xs text-gray-700">
                                    <Info className="w-4 h-4 inline mr-1" />
                                    Une seule de ces réductions sera appliquée (la plus élevée)
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 bg-[#0071c2] text-white rounded-full flex items-center justify-center font-bold">
                                    2
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">Étape 2</h3>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">
                                Ajoutez les réductions Genius (cumulables avec l'étape 1) :
                            </p>

                            <div className="space-y-3">
                                <div>
                                    <label className="flex items-center justify-between text-sm text-gray-700 mb-1">
                                        <span>Genius Niveau 1</span>
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="15"
                                            value={step2Discounts.genius1}
                                            onChange={(e) => setStep2Discounts({ ...step2Discounts, genius1: parseInt(e.target.value) })}
                                            className="flex-1"
                                        />
                                        <span className="w-12 text-sm font-medium text-gray-900">{step2Discounts.genius1}%</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center justify-between text-sm text-gray-700 mb-1">
                                        <span>Genius Niveau 2</span>
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="20"
                                            value={step2Discounts.genius2}
                                            onChange={(e) => setStep2Discounts({ ...step2Discounts, genius2: parseInt(e.target.value) })}
                                            className="flex-1"
                                        />
                                        <span className="w-12 text-sm font-medium text-gray-900">{step2Discounts.genius2}%</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-center justify-between text-sm text-gray-700 mb-1">
                                        <span>Genius Niveau 3</span>
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="range"
                                            min="0"
                                            max="25"
                                            value={step2Discounts.genius3}
                                            onChange={(e) => setStep2Discounts({ ...step2Discounts, genius3: parseInt(e.target.value) })}
                                            className="flex-1"
                                        />
                                        <span className="w-12 text-sm font-medium text-gray-900">{step2Discounts.genius3}%</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
                                <div className="text-sm font-semibold text-gray-900 mb-2">Réduction totale calculée :</div>
                                <div className="text-3xl font-bold text-[#0071c2]">
                                    {Math.max(step1Discounts.earlyBird, step1Discounts.lastMinute, step1Discounts.mobile, step1Discounts.geo) +
                                        Math.max(step2Discounts.genius1, step2Discounts.genius2, step2Discounts.genius3)}%
                                </div>
                                <div className="text-xs text-gray-600 mt-2">
                                    Base: {Math.max(step1Discounts.earlyBird, step1Discounts.lastMinute, step1Discounts.mobile, step1Discounts.geo)}% +
                                    Genius: {Math.max(step2Discounts.genius1, step2Discounts.genius2, step2Discounts.genius3)}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-center mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Améliorez vos performances sur Booking.com
                    </h2>
                    <p className="text-blue-100 mb-6">
                        Découvrez comment les promotions et réductions sur notre site peuvent vous aider à augmenter vos réservations.
                    </p>
                    <button className="px-6 py-3 bg-white text-[#0071c2] rounded hover:bg-gray-100 transition-colors font-medium">
                        Créer une nouvelle promotion
                    </button>
                </div>

                {/* Explanation Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Comment les réductions cumulées sont-elles calculées ?
                    </h2>

                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Exemple de calcul</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Tarif de base :</span>
                                    <span className="font-medium text-gray-900">100 €</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Réduction de base (15%) :</span>
                                    <span className="font-medium text-gray-900">- 15 €</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-700">Réduction Genius (10%) :</span>
                                    <span className="font-medium text-gray-900">- 10 €</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3 flex justify-between">
                                    <span className="font-semibold text-gray-900">Prix final :</span>
                                    <span className="font-bold text-[#0071c2] text-lg">75 €</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-600">
                                    <span>Réduction totale :</span>
                                    <span>25% (15% + 10%)</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Points importants</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-1">✓</span>
                                    <span>Les réductions s'appliquent toutes sur le tarif de base</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-1">✓</span>
                                    <span>Le calcul est additif, pas multiplicatif</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-1">✓</span>
                                    <span>Une seule réduction de base maximum</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-blue-600 mt-1">✓</span>
                                    <span>Les réductions Genius se cumulent avec tout</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Visual Stacking Section */}
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                        Toutes les réservations sont-elles effectuées au tarif réduit au maximum ?
                    </h2>
                    <p className="text-sm text-gray-700 text-center mb-8">
                        Non. Seuls les clients éligibles à toutes les réductions cumulées bénéficieront du tarif le plus bas.
                        Voici la répartition typique des réservations par niveau de réduction :
                    </p>

                    <div className="flex items-end justify-center gap-4 h-64">
                        <div className="flex flex-col items-center">
                            <div className="w-24 bg-yellow-400 rounded-t" style={{ height: '200px' }}></div>
                            <div className="text-center mt-2">
                                <div className="text-sm font-semibold text-gray-900">Sans réduction</div>
                                <div className="text-xs text-gray-600">35%</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-24 bg-blue-400 rounded-t" style={{ height: '150px' }}></div>
                            <div className="text-center mt-2">
                                <div className="text-sm font-semibold text-gray-900">1 réduction</div>
                                <div className="text-xs text-gray-600">40%</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-24 bg-blue-200 rounded-t" style={{ height: '100px' }}></div>
                            <div className="text-center mt-2">
                                <div className="text-sm font-semibold text-gray-900">2 réductions</div>
                                <div className="text-xs text-gray-600">20%</div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-24 bg-green-400 rounded-t" style={{ height: '50px' }}></div>
                            <div className="text-center mt-2">
                                <div className="text-sm font-semibold text-gray-900">Maximum</div>
                                <div className="text-xs text-gray-600">5%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default SimulerReduction