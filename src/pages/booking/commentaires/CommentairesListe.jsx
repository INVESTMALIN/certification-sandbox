import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { Info, ChevronDown, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useState } from 'react'

function CommentairesListe() {
    const [activeTab, setActiveTab] = useState('apercu')

    const tabs = [
        { id: 'apercu', label: 'Aperçu' },
        { id: 'categories', label: 'Catégories' },
        { id: 'progression', label: 'Votre progression' },
        { id: 'calcul', label: 'Calcul de la note des commentaires', badge: 'Nouveau' }
    ]

    const [openAccordion, setOpenAccordion] = useState(null)

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Commentaires clients</h1>
                    <p className="text-sm text-gray-600">
                        Découvrez ce que les voyageurs ont pensé de leur séjour ! Vous pouvez lire les commentaires laissés par les clients et y répondre.
                        <a href="#" className="text-[#0071c2] hover:underline ml-1">Cliquez ici</a> pour consulter notre politique en matière de commentaires et de réponses à ces commentaires.
                    </p>
                </div>

                {/* Bloc unique : Note + Pondération + Tabs + Contenu onglet */}
                <div className="bg-white rounded-lg border border-gray-200 mb-6">
                    {/* Header avec note */}
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center gap-4">
                        <div className="bg-[#003580] text-white rounded px-3 py-2">
                            <span className="text-2xl font-bold">9.5</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Votre note de commentaires</h2>
                            <p className="text-sm text-gray-600">d'après 6 commentaires</p>
                        </div>
                    </div>

                    {/* Section pondération */}
                    <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                        <p className="text-sm text-gray-900 mb-2">
                            <strong>La pondération des notes des commentaires a été mise en place sur Booking.com</strong>
                            <span className="ml-2 bg-green-500 text-white px-2 py-0.5 rounded text-xs font-semibold">Nouveau</span>
                        </p>
                        <p className="text-sm text-gray-700">
                            Depuis le 23 janvier 2025, une pondération est appliquée lors du calcul de votre note des commentaires, afin de mieux refléter les expériences récentes au sein de votre établissement. Ainsi, plus un commentaire client est récent, plus il pèse dans le calcul de la note finale de votre établissement.{' '}
                            <a href="#" className="text-[#0071c2] hover:underline">En savoir plus</a>
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="px-6">
                        <div className="flex gap-6 border-b border-gray-300">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`pb-3 pt-4 px-2 text-sm font-medium transition-colors relative ${activeTab === tab.id
                                        ? 'text-gray-900 border-b-2 border-[#0071c2]'
                                        : 'text-gray-600 hover:text-gray-900'
                                        }`}
                                >
                                    {tab.label}
                                    {tab.badge && (
                                        <span className="ml-2 bg-green-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                                            {tab.badge}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contenu de l'onglet Aperçu */}
                    {activeTab === 'apercu' && (
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-8">
                                {/* Colonne gauche - Catégories + Progression */}
                                <div className="space-y-6">
                                    {/* Catégories */}
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900 mb-4">Catégories</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-700">Situation géographique</span>
                                                <span className="text-sm font-semibold text-gray-900">10</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                                            </div>

                                            <div className="flex items-center justify-between mt-3">
                                                <span className="text-sm text-gray-700">Rapport qualité/prix</span>
                                                <span className="text-sm font-semibold text-gray-900">9.1</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                                            </div>

                                            <div className="flex items-center justify-between mt-3">
                                                <span className="text-sm text-gray-700">Équipements</span>
                                                <span className="text-sm font-semibold text-gray-900">9.2</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                                            </div>
                                        </div>
                                        <button className="text-[#0071c2] text-sm hover:underline mt-4">
                                            Voir plus
                                        </button>
                                    </div>

                                    {/* Votre progression */}
                                    <div>
                                        <h3 className="text-base font-semibold text-gray-900 mb-4">Votre progression</h3>
                                        <div className="bg-gray-50 rounded p-4">
                                            <p className="text-sm text-gray-600 mb-3">[Placeholder - Graphique ligne]</p>
                                            <div className="flex flex-col gap-2 text-xs text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                                                    <span>Note de l'année dernière</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-[#0071c2]"></div>
                                                    <span>Note des commentaires</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                                    <span>Groupe de concurrents</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="text-[#0071c2] text-sm hover:underline mt-4">
                                            Voir plus
                                        </button>
                                    </div>
                                </div>

                                {/* Colonne droite - Graphique commentaires */}
                                <div>
                                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                                        Nombre de commentaires par évaluation client
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Ce graphique indique le nombre de commentaires par note pour les 3 dernières années.
                                    </p>
                                    <div className="bg-white border border-gray-200 rounded p-6">
                                        <svg width="100%" height="400" viewBox="0 0 600 400" className="overflow-visible">
                                            {/* Axe Y - Label */}
                                            <text x="10" y="20" fontSize="11" fill="#6b7280" transform="rotate(-90 20 200)" textAnchor="middle">
                                                Nombre de commentaires
                                            </text>

                                            {/* Grille horizontale + labels Y */}
                                            <line x1="80" y1="350" x2="580" y2="350" stroke="#e5e7eb" strokeWidth="1" />
                                            <text x="60" y="355" fontSize="12" fill="#6b7280" textAnchor="end">0.0</text>

                                            <line x1="80" y1="280" x2="580" y2="280" stroke="#e5e7eb" strokeWidth="1" />
                                            <text x="60" y="285" fontSize="12" fill="#6b7280" textAnchor="end">1.0</text>

                                            <line x1="80" y1="210" x2="580" y2="210" stroke="#e5e7eb" strokeWidth="1" />
                                            <text x="60" y="215" fontSize="12" fill="#6b7280" textAnchor="end">2.0</text>

                                            <line x1="80" y1="140" x2="580" y2="140" stroke="#e5e7eb" strokeWidth="1" />
                                            <text x="60" y="145" fontSize="12" fill="#6b7280" textAnchor="end">3.0</text>

                                            <line x1="80" y1="70" x2="580" y2="70" stroke="#e5e7eb" strokeWidth="1" />
                                            <text x="60" y="75" fontSize="12" fill="#6b7280" textAnchor="end">4.0</text>

                                            {/* Axe X */}
                                            <line x1="80" y1="350" x2="580" y2="350" stroke="#374151" strokeWidth="2" />
                                            {/* Axe Y */}
                                            <line x1="80" y1="50" x2="80" y2="350" stroke="#374151" strokeWidth="2" />

                                            {/* Barres - Note 8 */}
                                            <rect x="330" y="280" width="35" height="70" fill="#4A90E2" />
                                            <text x="347.5" y="370" fontSize="12" fill="#6b7280" textAnchor="middle">8</text>

                                            {/* Barres - Note 9 */}
                                            <rect x="380" y="280" width="35" height="70" fill="#4A90E2" />
                                            <text x="397.5" y="370" fontSize="12" fill="#6b7280" textAnchor="middle">9</text>

                                            {/* Barres - Note 10 */}
                                            <rect x="430" y="70" width="35" height="280" fill="#4A90E2" />
                                            <text x="447.5" y="370" fontSize="12" fill="#6b7280" textAnchor="middle">10</text>

                                            {/* Labels pour les autres notes (sans barres) */}
                                            <text x="147.5" y="370" fontSize="12" fill="#6b7280" textAnchor="middle">1</text>
                                            <text x="197.5" y="370" fontSize="12" fill="#6b7280" textAnchor="middle">2</text>
                                            <text x="247.5" y="370" fontSize="12" fill="#6b7280" textAnchor="middle">3</text>
                                            <text x="297.5" y="370" fontSize="12" fill="#6b7280" textAnchor="middle">4</text>
                                            <text x="347.5" y="370" fontSize="12" fill="#6b7280" textAnchor="middle">5</text>
                                            <text x="397.5" y="370" fontSize="12" fill="#6b7280" textAnchor="middle">6</text>
                                            <text x="447.5" y="370" fontSize="12" fill="#6b7280" textAnchor="middle">7</text>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Contenu des autres onglets (placeholders) */}
                    {activeTab === 'categories' && (
                        <div className="p-6">
                            {/* Catégories principales */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Catégories principales</h3>
                                <p className="text-sm text-gray-700 mb-6">
                                    Ces catégories représentent des aspects communs à toute expérience client. Les notes correspondantes sont attribuées par vos clients et n'ont pas d'impact sur votre note des commentaires.
                                </p>

                                {/* Grid des catégories principales */}
                                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                    {/* Ligne 1 */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-900">Situation géographique</span>
                                            <span className="text-sm font-semibold text-gray-900">10</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-900">Rapport qualité/prix</span>
                                            <span className="text-sm font-semibold text-gray-900">9.1</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                                        </div>
                                    </div>

                                    {/* Ligne 2 */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-900">Équipements</span>
                                            <span className="text-sm font-semibold text-gray-900">9.2</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-900">Propreté</span>
                                            <span className="text-sm font-semibold text-gray-900">9.7</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '97%' }}></div>
                                        </div>
                                    </div>

                                    {/* Ligne 3 */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-900">Confort</span>
                                            <span className="text-sm font-semibold text-gray-900">9.1</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '91%' }}></div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-900">Personnel</span>
                                            <span className="text-sm font-semibold text-gray-900">8.8</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-400 h-2 rounded-full" style={{ width: '88%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Catégories supplémentaires */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Catégories supplémentaires</h3>
                                <p className="text-sm text-gray-700 mb-6">
                                    Ces questions bonus permettent de connaître la note attribuée par les clients à certains aspects spécifiques. Ces notes n'ont pas d'impact sur votre note des commentaires.
                                </p>

                                {/* Grid des catégories supplémentaires */}
                                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-gray-900">Évaluation du lit</span>
                                            <span className="text-sm font-semibold text-gray-900">10</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'progression' && (
                        <div className="p-6 space-y-8">
                            {/* Graphique 1 : Nombre de commentaires */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Nombre de commentaires</h3>
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-[#4A9EFF]"></div>
                                            <span className="text-gray-700">Cette année</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                                            <span className="text-gray-700">L'année dernière</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Graphique ligne simplifié */}
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <svg width="100%" height="300" viewBox="0 0 1000 300" className="overflow-visible">
                                        {/* Grille horizontale */}
                                        <line x1="50" y1="50" x2="950" y2="50" stroke="#e5e7eb" strokeWidth="1" />
                                        <line x1="50" y1="125" x2="950" y2="125" stroke="#e5e7eb" strokeWidth="1" />
                                        <line x1="50" y1="200" x2="950" y2="200" stroke="#e5e7eb" strokeWidth="1" />
                                        <line x1="50" y1="275" x2="950" y2="275" stroke="#e5e7eb" strokeWidth="1" />

                                        {/* Axe Y */}
                                        <text x="30" y="280" fontSize="12" fill="#6b7280">0.0</text>
                                        <text x="30" y="205" fontSize="12" fill="#6b7280">1.0</text>
                                        <text x="30" y="130" fontSize="12" fill="#6b7280">2.0</text>

                                        {/* Ligne bleue (Cette année) */}
                                        <polyline
                                            points="80,275 150,275 220,275 290,275 360,50 430,275 500,200 570,275 640,150 710,275 780,200 850,260 920,260 990,275"
                                            fill="none"
                                            stroke="#4A9EFF"
                                            strokeWidth="2"
                                        />

                                        {/* Points sur la ligne */}
                                        <circle cx="360" cy="50" r="4" fill="#4A9EFF" />
                                        <circle cx="500" cy="200" r="4" fill="#4A9EFF" />
                                        <circle cx="640" cy="150" r="4" fill="#4A9EFF" />
                                        <circle cx="780" cy="200" r="4" fill="#4A9EFF" />
                                        <circle cx="850" cy="260" r="4" fill="#4A9EFF" />
                                        <circle cx="920" cy="260" r="4" fill="#4A9EFF" />

                                        {/* Labels X */}
                                        <text x="70" y="295" fontSize="11" fill="#6b7280">mars 2025</text>
                                        <text x="200" y="295" fontSize="11" fill="#6b7280">avr. 2025</text>
                                        <text x="280" y="295" fontSize="11" fill="#6b7280">mai 2025</text>
                                        <text x="350" y="295" fontSize="11" fill="#6b7280">juin 2025</text>
                                        <text x="430" y="295" fontSize="11" fill="#6b7280">juil. 2025</text>
                                        <text x="500" y="295" fontSize="11" fill="#6b7280">août 2025</text>
                                        <text x="570" y="295" fontSize="11" fill="#6b7280">sept. 2025</text>
                                        <text x="650" y="295" fontSize="11" fill="#6b7280">oct. 2025</text>
                                        <text x="720" y="295" fontSize="11" fill="#6b7280">nov. 2025</text>
                                        <text x="800" y="295" fontSize="11" fill="#6b7280">déc. 2025</text>
                                        <text x="870" y="295" fontSize="11" fill="#6b7280">janv. 2026</text>
                                        <text x="950" y="295" fontSize="11" fill="#6b7280">févr. 2026</text>
                                    </svg>
                                </div>

                                <p className="text-sm text-gray-700 mt-4">
                                    Observez l'évolution de votre performance dans le temps et comparez-la avec celle de vos concurrents.{' '}
                                    <a href="#" className="text-[#0071c2] hover:underline">Voir mon groupe de concurrents</a>
                                </p>
                            </div>

                            {/* Sélecteur + Boutons */}
                            <div className="flex items-center justify-between">
                                <select className="px-4 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent">
                                    <option>Note globale</option>
                                    <option>Situation géographique</option>
                                    <option>Rapport qualité/prix</option>
                                    <option>Équipements</option>
                                </select>

                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] text-sm font-medium">
                                        Progression de la note
                                    </button>
                                    <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm font-medium">
                                        Moyenne mensuelle
                                    </button>
                                </div>
                            </div>

                            {/* Graphique 2 : Note des commentaires */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Note des commentaires</h3>
                                    <div className="flex items-center gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-[#4A9EFF]"></div>
                                            <span className="text-gray-700">Cette année</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                                            <span className="text-gray-700">L'année dernière</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                            <span className="text-gray-700">Groupe de concurrents</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Graphique avec zone remplie */}
                                <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <svg width="100%" height="300" viewBox="0 0 1000 300" className="overflow-visible">
                                        {/* Grille horizontale */}
                                        <line x1="50" y1="40" x2="950" y2="40" stroke="#e5e7eb" strokeWidth="1" />
                                        <line x1="50" y1="90" x2="950" y2="90" stroke="#e5e7eb" strokeWidth="1" />
                                        <line x1="50" y1="140" x2="950" y2="140" stroke="#e5e7eb" strokeWidth="1" />
                                        <line x1="50" y1="190" x2="950" y2="190" stroke="#e5e7eb" strokeWidth="1" />
                                        <line x1="50" y1="240" x2="950" y2="240" stroke="#e5e7eb" strokeWidth="1" />

                                        {/* Axe Y */}
                                        <text x="20" y="245" fontSize="12" fill="#6b7280">8.1</text>
                                        <text x="20" y="195" fontSize="12" fill="#6b7280">8.5</text>
                                        <text x="20" y="145" fontSize="12" fill="#6b7280">8.9</text>
                                        <text x="20" y="95" fontSize="12" fill="#6b7280">9.2</text>
                                        <text x="20" y="45" fontSize="12" fill="#6b7280">9.6</text>
                                        <text x="10" y="15" fontSize="12" fill="#6b7280">10.0</text>

                                        {/* Zone jaune remplie (Groupe de concurrents) */}
                                        <polygon
                                            points="80,150 150,145 220,140 290,138 360,135 430,133 500,130 570,128 640,125 710,122 780,118 850,115 920,112 990,110 990,240 920,240 850,240 780,240 710,240 640,240 570,240 500,240 430,240 360,240 290,240 220,240 150,240 80,240"
                                            fill="#FDE68A"
                                            opacity="0.6"
                                        />

                                        {/* Ligne jaune supérieure */}
                                        <polyline
                                            points="80,150 150,145 220,140 290,138 360,135 430,133 500,130 570,128 640,125 710,122 780,118 850,115 920,112 990,110"
                                            fill="none"
                                            stroke="#FCD34D"
                                            strokeWidth="2"
                                        />

                                        {/* Ligne bleue (Cette année) */}
                                        <polyline
                                            points="80,160 150,155 220,150 290,145 360,142 430,140 500,138 570,135 640,130 710,128 780,125 850,122 920,118 990,120"
                                            fill="none"
                                            stroke="#4A9EFF"
                                            strokeWidth="2"
                                        />

                                        {/* Points sur ligne bleue */}
                                        <circle cx="500" cy="138" r="3" fill="#4A9EFF" />
                                        <circle cx="640" cy="130" r="3" fill="#4A9EFF" />
                                        <circle cx="780" cy="125" r="3" fill="#4A9EFF" />
                                        <circle cx="850" cy="122" r="3" fill="#4A9EFF" />
                                        <circle cx="920" cy="118" r="3" fill="#4A9EFF" />
                                        <circle cx="990" cy="120" r="3" fill="#4A9EFF" />

                                        {/* Labels X */}
                                        <text x="70" y="270" fontSize="11" fill="#6b7280">mars 2025</text>
                                        <text x="140" y="270" fontSize="11" fill="#6b7280">avr. 2025</text>
                                        <text x="210" y="270" fontSize="11" fill="#6b7280">mai 2025</text>
                                        <text x="280" y="270" fontSize="11" fill="#6b7280">juin 2025</text>
                                        <text x="350" y="270" fontSize="11" fill="#6b7280">juil. 2025</text>
                                        <text x="420" y="270" fontSize="11" fill="#6b7280">août 2025</text>
                                        <text x="490" y="270" fontSize="11" fill="#6b7280">sept. 2025</text>
                                        <text x="560" y="270" fontSize="11" fill="#6b7280">oct. 2025</text>
                                        <text x="630" y="270" fontSize="11" fill="#6b7280">nov. 2025</text>
                                        <text x="710" y="270" fontSize="11" fill="#6b7280">déc. 2025</text>
                                        <text x="790" y="270" fontSize="11" fill="#6b7280">janv. 2026</text>
                                        <text x="870" y="270" fontSize="11" fill="#6b7280">févr. 2026</text>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'calcul' && (
                        <div className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Calcul de la note des commentaires</h3>

                            <ul className="list-disc list-inside space-y-3 text-sm text-gray-700 mb-8">
                                <li>
                                    La note des commentaires de votre établissement est calculée à partir de toutes les notes reçues au cours des <strong>36 derniers mois</strong>. Une <strong>pondération</strong> est appliquée, c'est-à-dire que plus un commentaire client est récent, plus il pèse dans le calcul de la note finale de votre établissement.
                                </li>
                                <li>
                                    Une pondération est également appliquée aux notes par catégorie, telles que les notes associées à l'emplacement et aux équipements.
                                </li>
                                <li>
                                    Nous atténuons également le risque de fluctuations importantes de façon à ce que votre note globale ne soit pas trop affectée par une seule note qui serait très basse ou très haute.
                                </li>
                                <li>
                                    Votre note des commentaires changera uniquement si vous recevez un nouveau commentaire client ou si un commentaire existant dépasse la date de validité de 36 mois.
                                </li>
                                <li>
                                    La pondération des notes des commentaires a été mise en place sur Booking.com depuis le 23 janvier 2025 pour votre établissement.
                                </li>
                            </ul>

                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                Avantages de la pondération des notes des commentaires
                            </h3>

                            <h4 className="text-base font-semibold text-gray-900 mb-2">
                                Une amélioration potentielle plus rapide de votre note des commentaires
                            </h4>
                            <p className="text-sm text-gray-700 mb-6">
                                La pondération des notes vous permet d'améliorer plus facilement votre note des commentaires. Si vous mettez en place des actions au sein de votre établissement ou que vous améliorez la qualité du service, cela se reflétera plus rapidement sur votre note des commentaires qu'avec un calcul moyen.
                            </p>

                            <h4 className="text-base font-semibold text-gray-900 mb-2">
                                Un aperçu plus réaliste pour vos futurs clients
                            </h4>
                            <p className="text-sm text-gray-700 mb-8">
                                Votre note des commentaires reflète désormais une expérience client plus récente, ce qui permet de donner un aperçu plus réaliste de votre établissement.
                            </p>

                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions fréquentes</h3>

                            {/* Accordéon 1 */}
                            <div className="border-b border-gray-200">
                                <button
                                    onClick={() => setOpenAccordion(openAccordion === 1 ? null : 1)}
                                    className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-sm font-semibold text-gray-900">
                                        Ma note des commentaires va-t-elle changer tous les jours avec la mise en place de la pondération ?
                                    </span>
                                    <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${openAccordion === 1 ? 'rotate-180' : ''}`} />
                                </button>
                                {openAccordion === 1 && (
                                    <div className="pb-4 text-sm text-gray-700">
                                        Pas forcément. La pondération des notes accorde une plus grande importance aux commentaires les plus récents. Votre note est calculée quotidiennement, mais changera uniquement si vous recevez un nouveau commentaire client ou si un commentaire existant expire. Nous atténuons également le risque de fluctuations importantes de façon à ce que votre note globale ne soit pas trop affectée par une seule note qui serait très basse ou très haute.
                                    </div>
                                )}
                            </div>

                            {/* Accordéon 2 */}
                            <div className="border-b border-gray-200">
                                <button
                                    onClick={() => setOpenAccordion(openAccordion === 2 ? null : 2)}
                                    className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-sm font-semibold text-gray-900">
                                        Mon établissement reçoit plus de clients lors d'une saison en particulier. Aurai-je donc une moins bonne note en basse saison ?
                                    </span>
                                    <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${openAccordion === 2 ? 'rotate-180' : ''}`} />
                                </button>
                                {openAccordion === 2 && (
                                    <div className="pb-4 text-sm text-gray-700">
                                        Non. Le poids de chaque commentaire changera uniquement si vous recevez un nouveau commentaire client ou si un commentaire existant dépasse la date de validité de 36 mois. Votre note des commentaires ne diminuera pas en basse saison si vous ne recevez pas de nouveaux commentaires clients.
                                    </div>
                                )}
                            </div>

                            {/* Accordéon 3 */}
                            <div className="border-b border-gray-200">
                                <button
                                    onClick={() => setOpenAccordion(openAccordion === 3 ? null : 3)}
                                    className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-sm font-semibold text-gray-900">
                                        Quand la pondération des notes des commentaires sera-t-elle mise en place ?
                                    </span>
                                    <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform ${openAccordion === 3 ? 'rotate-180' : ''}`} />
                                </button>
                                {openAccordion === 3 && (
                                    <div className="pb-4 text-sm text-gray-700">
                                        La pondération des notes des commentaires a été mise en place depuis le 23 janvier 2025 pour votre établissement et sera effective pour tous les partenaires en janvier 2025.
                                    </div>
                                )}
                            </div>

                            {/* Feedback en bas */}
                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-700 mb-3">
                                    Que pensez-vous de cette nouvelle méthode de calcul de la note des commentaires ?
                                </p>
                                <div className="flex gap-3">
                                    <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                                        <ThumbsUp className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <button className="p-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                                        <ThumbsDown className="w-5 h-5 text-gray-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Contenu principal en grid */}
                <div className="grid grid-cols-4 gap-6">
                    {/* Sidebar gauche - Filtres */}
                    <div className="col-span-1 space-y-6">
                        {/* Bloc 1 : Tous les filtres */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-6">
                            {/* Sélectionnez une note */}
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Sélectionnez une note :</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                        <input type="radio" name="note" defaultChecked className="w-4 h-4 text-[#0071c2]" />
                                        <span>Toutes les notes de commentaires</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                        <input type="radio" name="note" className="w-4 h-4 text-[#0071c2]" />
                                        <span>Fabuleux : 9+ (5)</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                        <input type="radio" name="note" className="w-4 h-4 text-[#0071c2]" />
                                        <span>Bien : 7-9 (1)</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                        <input type="radio" name="note" className="w-4 h-4 text-[#0071c2]" />
                                        <span>Moyen: 5-7 (0)</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                        <input type="radio" name="note" className="w-4 h-4 text-[#0071c2]" />
                                        <span>Assez médiocre : 3-5 (0)</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                        <input type="radio" name="note" className="w-4 h-4 text-[#0071c2]" />
                                        <span>Médiocre : 1-3 (0)</span>
                                    </label>
                                </div>
                            </div>

                            {/* Sélectionnez un type de voyageurs */}
                            <div className="pt-6 border-t border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Sélectionnez un type de voyageurs :</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                        <input type="radio" name="voyageurs" defaultChecked className="w-4 h-4 text-[#0071c2]" />
                                        <span>Voyageurs (en général)</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                        <input type="radio" name="voyageurs" className="w-4 h-4 text-[#0071c2]" />
                                        <span>Couples (5)</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                        <input type="radio" name="voyageurs" className="w-4 h-4 text-[#0071c2]" />
                                        <span>Voyageurs d'affaires (1)</span>
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                                        <input type="radio" name="voyageurs" className="w-4 h-4 text-[#0071c2]" />
                                        <span>Voyageurs individuels (0)</span>
                                    </label>
                                </div>
                            </div>

                            {/* Sélectionnez un pays */}
                            <div className="pt-6 border-t border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Sélectionnez un pays :</h3>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent">
                                    <option>Tous les pays</option>
                                    <option>France</option>
                                    <option>Belgique</option>
                                    <option>Suisse</option>
                                    <option>Allemagne</option>
                                </select>
                            </div>

                            {/* Sélectionnez un thème */}
                            <div className="pt-6 border-t border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Sélectionnez un thème :</h3>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        placeholder="Recherchez un thème"
                                        className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button className="px-3 py-1.5 bg-white border border-[#0071c2] text-[#0071c2] rounded text-xs hover:bg-blue-50 transition-colors">
                                        Chauffage +
                                    </button>
                                    <button className="px-3 py-1.5 bg-white border border-[#0071c2] text-[#0071c2] rounded text-xs hover:bg-blue-50 transition-colors">
                                        Personnel +
                                    </button>
                                    <button className="px-3 py-1.5 bg-white border border-[#0071c2] text-[#0071c2] rounded text-xs hover:bg-blue-50 transition-colors">
                                        Propreté +
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bloc 2 : Export commentaires */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                                Vous voulez exporter vos commentaires ?
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Téléchargez tous les commentaires affichés sur votre plateforme.
                            </p>
                            <button className="w-full px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] text-sm font-medium flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Télécharger les commentaires clients
                            </button>
                        </div>

                        {/* Bloc 3 : Influence négative */}
                        <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                                Qu'est-ce qui influence négativement votre note de commentaires ?
                            </h3>
                            <div className="flex items-start gap-2 mb-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-lg">😟</span>
                                </div>
                                <p className="text-sm text-gray-700">
                                    <strong>33.3 %</strong> des commentaires ont fait baisser votre note (2 commentaires)
                                </p>
                            </div>
                            <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] text-sm font-medium">
                                En savoir plus
                            </button>
                        </div>
                    </div>

                    {/* Zone centrale - Graphique + Commentaires */}
                    <div className="col-span-3 space-y-6">

                        {/* Boutons filtres rapides */}
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] text-sm">
                                Tous les commentaires
                            </button>
                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm">
                                Avec un texte du client
                            </button>
                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm">
                                Sans réponse
                            </button>
                        </div>

                        {/* Liste des commentaires */}
                        <div className="space-y-4">
                            {/* Carte commentaire 1 */}
                            <div className="bg-white rounded border border-gray-200 p-6 max-w-4xl font-sans text-[#1a1a1a]">

                                {/* Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#003580] text-white px-3 py-2 rounded font-bold text-xl">10</div>
                                        <div>
                                            <div className="font-bold">Peter, nl</div>
                                            <div className="text-sm text-[#006ce4] cursor-pointer hover:underline">Numéro de réservation 5353376895</div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">22 juil. 2025</div>
                                </div>

                                <hr className="border-t border-gray-200 mb-6" />

                                {/* Catégories principales */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-1 mb-4">
                                        <h3 className="font-bold">Catégories principales</h3>
                                        <span className="text-gray-400 text-sm italic cursor-help">ⓘ</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-x-12 gap-y-6">
                                        {[
                                            { label: "Personnel", score: 10 },
                                            { label: "Propreté", score: 10 },
                                            { label: "Situation géographique", score: 10 },
                                            { label: "Équipements", score: 10 },
                                            { label: "Confort", score: 10 },
                                            { label: "Rapport qualité/prix", score: 10 },
                                        ].map((item, idx) => (
                                            <div key={idx}>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span>{item.label}</span>
                                                    <span className="font-bold">{item.score}</span>
                                                </div>
                                                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#003580]" style={{ width: `${item.score * 10}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Traduction & Commentaire */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                                        <span className="opacity-70">文A</span>
                                        <span>Traduit de le néerlandais par <span className="font-bold text-gray-700">Google</span> - <span className="text-[#006ce4] cursor-pointer">Voir l'original</span></span>
                                    </div>

                                    <h4 className="font-bold text-lg">Délicieux</h4>

                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <span className="text-xl opacity-60">😊</span>
                                            <p className="text-sm">L'ambiance du palais</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-xl opacity-60">☹️</span>
                                            <p className="text-sm">Elle ne dispose pas de la climatisation.</p>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button className="text-[#006ce4] text-sm hover:underline">Votre réponse n'a pas été approuvée</button>
                                    </div>
                                </div>
                            </div>

                            {/* Carte commentaire 2 */}
                            <div className="bg-white rounded border border-gray-200 p-6 max-w-4xl font-sans text-[#1a1a1a]">

                                {/* Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#003580] text-white px-3 py-2 rounded font-bold text-xl leading-none">
                                            8,0
                                        </div>
                                        <div>
                                            <div className="font-bold">Guillaume, fr</div>
                                            <div className="text-[14px] text-gray-500">
                                                Numéro de réservation <span className="text-[#006ce4] cursor-pointer hover:underline">5671290571</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">5 janv. 2026</div>
                                </div>

                                <hr className="border-t border-gray-200 mb-6" />

                                {/* Catégories principales */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-1 mb-4 text-[14px]">
                                        <h3 className="font-bold">Catégories principales</h3>
                                        <span className="text-gray-400 text-xs italic cursor-help">ⓘ</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-x-12 gap-y-6">
                                        {[
                                            { label: "Personnel", score: "7,5", percent: 75 },
                                            { label: "Propreté", score: "10", percent: 100 },
                                            { label: "Situation géographique", score: "10", percent: 100 },
                                            { label: "Équipements", score: "7,5", percent: 75 },
                                            { label: "Confort", score: "5", percent: 50 },
                                            { label: "Rapport qualité/prix", score: "7,5", percent: 75 },
                                        ].map((item, idx) => (
                                            <div key={idx}>
                                                <div className="flex justify-between text-[13px] mb-2">
                                                    <span>{item.label}</span>
                                                    <span className="font-bold">{item.score}</span>
                                                </div>
                                                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#003580]" style={{ width: `${item.percent}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Commentaire Guillaume */}
                                <div className="space-y-4">
                                    <div className="space-y-3 text-[14px] leading-relaxed">
                                        <div className="flex items-start gap-3">
                                            <span className="text-xl opacity-60 mt-[-2px]">😊</span>
                                            <p>Excellent emplacement, très bel appartement, très calme.</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-xl opacity-60 mt-[-2px]">☹️</span>
                                            <p>
                                                Les fenêtres en simple vitrage ne jointent pas parfaitement. Le froid passait à travers et nous avons eu du
                                                mal à avoir chaud. Les radiateurs se mettaient en alarme « fenêtre ouverte » alors que tout était bien
                                                fermé. L'hiver est peut-être court en Avignon, il n'empêche que ce n'était pas très agréable. Dommage,
                                                car pour le reste c'était top.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button className="text-[#006ce4] text-[14px] hover:underline">Consulter votre réponse approuvée</button>
                                    </div>
                                </div>
                            </div>

                            {/* Carte commentaire 3 */}
                            <div className="bg-white rounded border border-gray-200 p-6 max-w-4xl font-sans text-[#1a1a1a]">

                                {/* Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#003580] text-white px-3 py-2 rounded font-bold text-xl leading-none">
                                            10
                                        </div>
                                        <div>
                                            <div className="font-bold text-[16px]">fabia, it</div>
                                            <div className="text-[14px] text-gray-500">
                                                Numéro de réservation <span className="text-[#006ce4] cursor-pointer hover:underline">6266132174</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">30 déc. 2025</div>
                                </div>

                                <hr className="border-t border-gray-200 mb-6" />

                                {/* Catégories principales */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-1 mb-4 text-[14px]">
                                        <h3 className="font-bold">Catégories principales</h3>
                                        <span className="text-gray-400 text-xs italic cursor-help">ⓘ</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-x-12 gap-y-6">
                                        {["Personnel", "Propreté", "Situation géographique", "Équipements", "Confort", "Rapport qualité/prix"].map((label) => (
                                            <div key={label}>
                                                <div className="flex justify-between text-[13px] mb-2">
                                                    <span>{label}</span>
                                                    <span className="font-bold">10</span>
                                                </div>
                                                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#003580] w-full"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Catégories supplémentaires */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-1 mb-4 text-[14px]">
                                        <h3 className="font-bold">Catégories supplémentaires</h3>
                                        <span className="text-gray-400 text-xs italic cursor-help">ⓘ</span>
                                    </div>
                                    <div className="w-1/3 pr-4">
                                        <div className="flex justify-between text-[13px] mb-2">
                                            <span>Évaluation du lit</span>
                                            <span className="font-bold">10</span>
                                        </div>
                                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#003580] w-full"></div>
                                        </div>
                                    </div>
                                </div>

                                <hr className="border-t border-gray-200 mb-6" />

                                {/* Commentaire Fabia */}
                                <div className="space-y-4">
                                    <h4 className="font-bold text-[16px]">Accoglienza adorabile</h4>

                                    <div className="space-y-4 text-[14px] leading-relaxed">
                                        <div className="flex items-start gap-3">
                                            <span className="text-xl opacity-60 mt-[-2px]">😊</span>
                                            <p>
                                                Les instructions pour le Check in autonome sont très claires et détaillées, l'emplacement est exceptionnel
                                                avec une vue sur le palais des papes depuis un magnifique balcon. L'appartement dispose de tout le
                                                confort nécessaire, y compris du café biologique pour le petit-déjeuner. Mme Hines a été incroyablement
                                                gentille et accueillante, nous envoyant chaque jour des messages de courtoisie et de soutien. UN
                                                ACCUEIL ADORABLE.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3 text-gray-400">
                                            <span className="text-xl opacity-60 mt-[-2px]">☹️</span>
                                            <p>-</p>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button className="border border-[#006ce4] text-[#006ce4] px-4 py-2 rounded hover:bg-blue-50 text-[14px]">
                                            Répondre
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Carte commentaire 3 */}
                            <div className="bg-white rounded border border-gray-200 p-6 max-w-4xl font-sans text-[#1a1a1a]">

                                {/* Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#003580] text-white px-3 py-2 rounded font-bold text-xl leading-none">
                                            10
                                        </div>
                                        <div>
                                            <div className="font-bold text-[16px]">Andrea, ch</div>
                                            <div className="text-[14px] text-gray-500">
                                                Numéro de réservation <span className="text-[#006ce4] cursor-pointer hover:underline">6029292133</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">4 nov. 2025</div>
                                </div>

                                <hr className="border-t border-gray-200 mb-6" />

                                {/* Catégories principales */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-1 mb-4 text-[14px]">
                                        <h3 className="font-bold">Catégories principales</h3>
                                        <span className="text-gray-400 text-xs italic cursor-help">ⓘ</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-x-12 gap-y-6">
                                        {["Personnel", "Propreté", "Situation géographique", "Équipements", "Confort", "Rapport qualité/prix"].map((label) => (
                                            <div key={label}>
                                                <div className="flex justify-between text-[13px] mb-2">
                                                    <span>{label}</span>
                                                    <span className="font-bold">10</span>
                                                </div>
                                                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#003580] w-full"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Traduction & Commentaire Andrea */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                                        <span className="border px-1 rounded text-[10px] opacity-70">文A</span>
                                        <span>Traduit de l'allemand par <span className="font-bold text-gray-700">Google</span> - <span className="text-[#006ce4] cursor-pointer">Voir l'original</span></span>
                                    </div>

                                    <h4 className="font-bold text-[16px]">Détente assurée, tout est facilement accessible à pied</h4>

                                    <div className="space-y-3 text-[14px] leading-relaxed">
                                        <div className="flex items-start gap-3">
                                            <span className="text-xl opacity-60 mt-[-2px]">😊</span>
                                            <p>Spacieux, élégant, bien meublé</p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <span className="text-xl opacity-60 mt-[-2px]">☹️</span>
                                            <p>Le chauffage n'était pas toujours réglable de manière satisfaisante.</p>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <button className="border border-[#006ce4] text-[#006ce4] px-4 py-2 rounded hover:bg-blue-50 text-[14px]">
                                            Répondre
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Carte commentaire 3 */}
                            <div className="bg-white rounded border border-gray-200 p-6 max-w-4xl font-sans text-[#1a1a1a]">

                                {/* Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-[#003580] text-white px-3 py-2 rounded font-bold text-xl leading-none">
                                            10
                                        </div>
                                        <div>
                                            <div className="font-bold text-[16px]">Nuno, fr</div>
                                            <div className="text-[14px] text-gray-500">
                                                Numéro de réservation <span className="text-[#006ce4] cursor-pointer hover:underline">6000951270</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">28 sept. 2025</div>
                                </div>

                                <hr className="border-t border-gray-200 mb-6" />

                                {/* Catégories principales */}
                                <div className="mb-2">
                                    <div className="flex items-center gap-1 mb-4 text-[14px]">
                                        <h3 className="font-bold">Catégories principales</h3>
                                        <span className="text-gray-400 text-xs italic cursor-help">ⓘ</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-x-12 gap-y-6">
                                        {[
                                            { label: "Personnel", score: "7,5", percent: 75 },
                                            { label: "Propreté", score: "10", percent: 100 },
                                            { label: "Situation géographique", score: "10", percent: 100 },
                                            { label: "Équipements", score: "10", percent: 100 },
                                            { label: "Confort", score: "10", percent: 100 },
                                            { label: "Rapport qualité/prix", score: "7,5", percent: 75 },
                                        ].map((item, idx) => (
                                            <div key={idx}>
                                                <div className="flex justify-between text-[13px] mb-2">
                                                    <span>{item.label}</span>
                                                    <span className="font-bold">{item.score}</span>
                                                </div>
                                                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#003580]" style={{ width: `${item.percent}%` }}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">1-8 sur 8</p>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 border border-gray-300 rounded text-sm">1</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default CommentairesListe