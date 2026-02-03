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
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-2">
                    <div className="flex-1">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Simulez la réduction<br />maximum après cumul
                        </h1>
                        <button className="px-6 py-2.5 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors font-medium">
                            Commencer
                        </button>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <img
                            src="/stacking_calculator_hero.svg"
                            alt="Calculator illustration"
                            className="w-[500px] h-auto"
                        />
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row gap-12 items-start bg-grey p-8">

                    {/* Section Gauche : Le Visuel de Cumul */}
                    <div className="w-full lg:w-3/5">
                        <div className="grid grid-cols-3 gap-1 relative border-l border-gray-200">

                            {/* Colonne 1 : Offres Spéciales */}
                            <div className="flex flex-col justify-end min-h-[300px]">
                                <div className="bg-[#66aefb] p-3 h-16 border-r border-white">
                                    <p className="font-bold text-sm">Offres spéciales</p>
                                    <p className="text-xs">Offre Black Friday</p>
                                    <p className="text-xs">Offre à Durée Limitée</p>
                                </div>
                            </div>

                            {/* Colonne 2 : Campagnes */}
                            <div className="flex flex-col justify-end min-h-[300px]">
                                <div className="bg-[#e9eef2] p-3 h-20 border-r border-white">
                                    <p className="font-bold text-sm">Campagnes</p>
                                    <p className="text-xs">Offre Saisonnière, Offre de Fin d'Année, Offre Début 2026</p>
                                </div>
                                <div className="bg-[#66aefb] p-3 h-16 border-r border-t border-white flex items-center">
                                    <p className="font-bold text-sm">Genius</p>
                                </div>
                            </div>

                            {/* Colonne 3 : Catalogue & Tarifs Ciblés */}
                            <div className="flex flex-col justify-end min-h-[300px]">
                                <div className="bg-[#e7f9e9] p-3 h-20 border-r border-white">
                                    <p className="font-bold text-sm">Offres du catalogue</p>
                                    <p className="text-xs">Offre Standard, Offre de Dernière Minute, Offre de Réservation Anticipée</p>
                                </div>
                                <div className="bg-[#e9eef2] p-3 h-20 border-r border-t border-white">
                                    <p className="font-bold text-sm">Tarifs ciblés</p>
                                    <p className="text-xs">Tarif Mobiles, Tarif géociblé, Tarif pour un État des USA</p>
                                </div>
                                <div className="bg-[#66aefb] p-3 h-16 border-t border-white flex items-center">
                                    <p className="font-bold text-sm">Genius</p>
                                </div>
                            </div>

                            {/* Barre de base commune */}
                            <div className="col-span-3 bg-[#f2b203] p-4 mt-1 shadow-sm">
                                <p className="font-bold text-gray-900 tracking-wide">Tarif de base</p>
                            </div>
                        </div>
                    </div>

                    {/* Section Droite : L'explication texte */}
                    <div className="w-full lg:w-2/5">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Qu'est-ce que le cumul ?</h2>
                        <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
                            <p>
                                Le cumul consiste à associer 2 ou 3 réductions pour offrir à la clientèle une réduction combinée plus attractive pour certaines réservations. Cela permet d’optimiser la conversion et le taux d’occupation en proposant aux clients un tarif plus attractif qui les incite à réserver.                            </p>
                            <p>
                                Chaque réduction appartient à une catégorie. Une réduction d’une catégorie peut être cumulée avec une réduction d’une autre catégorie, mais jamais avec une réduction de la même catégorie.
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Les offres spéciales ne se cumulent jamais entre elles.</li>
                                <li>Les offres Genius et les campagnes se cumulent à mesure qu'elles s'appliquent.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Simulateur de réduction maximum */}
                <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-6xl mx-auto my-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Simulateur de réduction maximum</h2>
                    <p className="text-sm text-gray-600 mb-8">
                        Cet outil simule le tarif réduit au maximum pour toute combinaison entre tarif de base et réduction.
                        <span className="font-bold"> Ces tarifs ne reflètent pas les tarifs réels de votre établissement.</span>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Colonne Gauche : Étapes 1 & 2 */}
                        <div className="space-y-10">
                            {/* Étape 1 */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="flex items-center justify-center w-6 h-6 border border-gray-400 rounded-full text-xs font-bold">1</span>
                                    <h3 className="font-bold text-gray-900">Étape 1</h3>
                                </div>
                                <label className="block text-sm text-gray-700 mb-2">Saisissez un tarif de base.</label>
                                <div className="relative max-w-[200px]">
                                    <input
                                        type="number"
                                        className="w-full border-2 border-red-500 rounded p-2 pr-12 focus:outline-none"
                                        placeholder="0"
                                    />
                                    <span className="absolute right-3 top-2 text-gray-500 text-sm">EUR</span>
                                    <p className="text-red-600 text-[10px] mt-1 italic">Saisissez d'abord un tarif de base</p>
                                </div>
                            </div>

                            {/* Étape 2 */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="flex items-center justify-center w-6 h-6 border border-gray-400 rounded-full text-xs font-bold">2</span>
                                    <h3 className="font-bold text-gray-900">Étape 2</h3>
                                </div>
                                <p className="text-xs text-gray-600 mb-4">
                                    Sélectionnez différentes réductions et modifiez les montants. <span className="font-bold">Cela n'active aucune réduction pour votre établissement.</span>
                                </p>

                                {/* Section: Programmes premium */}
                                <div className="space-y-4">
                                    <div className="border-b border-gray-100 pb-1">
                                        <h4 className="text-sm font-bold text-gray-800">Programmes premium</h4>
                                        <p className="text-[11px] text-gray-500">Cumulables avec les tarifs ciblés, les offres du catalogue et les campagnes.</p>
                                    </div>
                                    <div className="flex items-center justify-between py-1">
                                        <div className="flex items-center gap-3">
                                            <button className="w-10 h-5 bg-gray-200 rounded-full relative transition-colors">
                                                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                                            </button>
                                            <span className="text-sm text-gray-700">Genius</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="flex border border-gray-300 rounded overflow-hidden bg-gray-50">
                                                <select className="text-sm px-2 py-1 bg-transparent outline-none appearance-none cursor-pointer">
                                                    <option>10</option>
                                                    <option>15</option>
                                                    <option>20</option>
                                                </select>
                                                <div className="flex items-center px-1 border-l border-gray-300">
                                                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                </div>
                                                <span className="px-3 py-1 text-gray-400 border-l border-gray-300 text-sm">%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Section: Tarifs ciblés */}
                                <div className="space-y-4">
                                    <div className="border-b border-gray-100 pb-1">
                                        <div className="flex items-center gap-1">
                                            <h4 className="text-sm font-bold text-gray-800">Tarifs ciblés</h4>
                                            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <p className="text-[11px] text-gray-500">Cumulables avec les offres Genius et les offres du catalogue uniquement</p>
                                    </div>
                                    {[
                                        { label: 'Tarif Mobiles', value: '10' },
                                        { label: 'Tarif géociblé', value: '10' }
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-center justify-between py-1">
                                            <div className="flex items-center gap-3">
                                                <button className="w-10 h-5 bg-gray-200 rounded-full relative">
                                                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                                                </button>
                                                <span className="text-sm text-gray-700">{item.label}</span>
                                            </div>
                                            <div className="flex border border-gray-200 rounded overflow-hidden bg-gray-50 opacity-50">
                                                <span className="px-4 py-1 text-sm text-gray-600">{item.value}</span>
                                                <span className="px-3 py-1 text-gray-400 border-l border-gray-200 text-sm">%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {/* Section: Offres du catalogue */}
                                <div className="space-y-4">
                                    <div className="border-b border-gray-100 pb-1">
                                        <div className="flex items-center gap-1">
                                            <h4 className="text-sm font-bold text-gray-800">Offres du catalogue</h4>
                                            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        </div>
                                        <p className="text-[11px] text-gray-500">Cumulables avec les offres Genius et les tarifs ciblés uniquement</p>
                                    </div>
                                    {[
                                        'Offre Standard',
                                        'Offre de Dernière Minute',
                                        'Offre de Réservation Anticipée'
                                    ].map((label) => (
                                        <div key={label} className="flex items-center justify-between py-1">
                                            <div className="flex items-center gap-3">
                                                <button className="w-10 h-5 bg-gray-200 rounded-full relative">
                                                    <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
                                                </button>
                                                <span className="text-sm text-gray-700">{label}</span>
                                            </div>
                                            <div className="flex border border-gray-200 rounded overflow-hidden bg-gray-50 opacity-50">
                                                <span className="px-4 py-1 text-sm text-gray-600">10</span>
                                                <span className="px-3 py-1 text-gray-400 border-l border-gray-200 text-sm">%</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Colonne Droite : Étape 3 */}
                        <div className="border-l border-gray-100 pl-8">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="flex items-center justify-center w-6 h-6 border border-gray-400 rounded-full text-xs font-bold">3</span>
                                <h3 className="font-bold text-gray-900">Étape 3</h3>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed">
                                Consultez le tarif réduit au maximum hors taxes. En fonction de leur emplacement, les voyageurs et voyageuses peuvent voir un tarif incluant des taxes et des frais locaux, gouvernementaux ou autres.
                            </p>
                        </div>
                    </div>
                </div>


                {/* Section Améliorez vos performances */}
                <div className="bg-white py-16 border-t border-gray-100 mb-12">
                    <div className="max-w-3xl mx-auto text-center px-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            Améliorez vos performances sur Booking.com
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Parcourez notre liste de promotions et choisissez-en une nouvelle pour obtenir des nuitées supplémentaires.
                        </p>
                        <button className="bg-[#0071c2] hover:bg-[#005999] text-white font-medium py-3 px-6 rounded transition-colors">
                            Choisir une nouvelle promotion
                        </button>
                    </div>
                </div>


                {/* Section Comment les réductions cumulées sont-elles calculées ? */}
                <div className="flex flex-col lg:flex-row gap-12 items-center bg-white p-8 border-t border-gray-100">
                    {/* Section Gauche : Le flux de calcul (Étape par étape) */}
                    <div className="w-full lg:w-3/5">
                        <div className="flex items-end gap-4 min-h-[300px]">

                            {/* 1. Point de départ */}
                            <div className="flex-1 flex flex-col items-center">
                                <span className="text-[10px] text-gray-500 mb-1 text-center">Point de départ</span>
                                <span className="text-xs font-bold mb-4">Tarif de base</span>
                                <div className="w-full bg-[#f2b203] h-48 flex items-center justify-center shadow-sm">
                                    <span className="font-bold text-sm">€ 100</span>
                                </div>
                            </div>

                            {/* 2. Promo 1 */}
                            <div className="flex-1 flex flex-col items-center">
                                <span className="text-[10px] text-gray-500 mb-1 text-center">Promo 1 appliquée</span>
                                <span className="text-xs font-bold mb-4">Genius</span>
                                <div className="w-full flex flex-col h-48">
                                    <div className="border-2 border-dashed border-[#66aefb] text-[#66aefb] text-[10px] h-10 flex items-center justify-center font-medium mb-1">
                                        Réduction de 10 %
                                    </div>
                                    <div className="flex-1 bg-[#66aefb] flex items-center justify-center">
                                        <span className="font-bold text-sm text-white">€ 90</span>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Promo 2 */}
                            <div className="flex-1 flex flex-col items-center">
                                <span className="text-[10px] text-gray-500 mb-1 text-center">Promo 2 appliquée</span>
                                <span className="text-xs font-bold mb-4 text-center">Tarifs ciblés</span>
                                <div className="w-full flex flex-col h-36">
                                    <div className="border-2 border-dashed border-gray-300 text-gray-400 text-[10px] h-10 flex items-center justify-center font-medium mb-1">
                                        Réduction de 10 %
                                    </div>
                                    <div className="flex-1 bg-[#e9eef2] flex items-center justify-center">
                                        <span className="font-bold text-sm text-gray-700">€ 81</span>
                                    </div>
                                </div>
                            </div>

                            {/* 4. Promo 3 */}
                            <div className="flex-1 flex flex-col items-center">
                                <span className="text-[10px] text-gray-500 mb-1 text-center text-center">Promo 3 appliquée</span>
                                <span className="text-xs font-bold mb-4 text-center leading-tight">Offres du catalogue</span>
                                <div className="w-full flex flex-col h-24">
                                    <div className="border-2 border-dashed border-green-200 text-green-400 text-[10px] h-10 flex items-center justify-center font-medium mb-1">
                                        Réduction de 10 %
                                    </div>
                                    <div className="flex-1 bg-[#e7f9e9] flex items-center justify-center">
                                        <span className="font-bold text-sm text-green-800">€ 72,90</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Section Droite : Texte explicatif */}
                    <div className="w-full lg:w-2/5">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                            Comment les réductions cumulées sont-elles calculées ?
                        </h2>
                        <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
                            <p>
                                Lorsque plusieurs réductions peuvent être appliquées à une réservation, le cumul ne sera possible qu’avec la réduction la plus importante de chaque catégorie. Les réductions sont toujours appliquées au tarif une par une.
                            </p>
                            <p>
                                Par exemple, lorsqu’une réservation est éligible à trois réductions cumulables, la première est appliquée au tarif de base pour créer un tarif réduit. Ensuite, la deuxième est appliquée à ce tarif réduit, suivie de la troisième réduction qui s’applique de la même manière.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default SimulerReduction