import AirbnbHeader from '../../../components/airbnb/AirbnbHeader'
import PerformanceSidebar from '../../../components/airbnb/PerformanceSidebar'
import { useState } from 'react'

// ── Données des opportunités ──────────────────────────────────────────────────
const OPPORTUNITES = [
    {
        titre: 'Permettez aux voyageurs de réserver instantanément',
        description: 'Profitez des réservations de dernière minute en permettant aux voyageurs de réserver votre logement plus facilement.',
        pct: 83,
    },
    {
        titre: 'Mettez à disposition le nécessaire pour cuisiner',
        description: 'Indiquez à vos voyageurs qu\'ils auront à leur disposition tout le nécessaire de base pour cuisiner.',
        pct: 89,
    },
    {
        titre: 'Autorisez les animaux de compagnie',
        description: 'Si vous le jugez approprié, indiquez que les animaux de compagnie sont les bienvenus dans vos logements.',
        pct: 15,
    },
    {
        titre: 'Proposez une arrivée autonome',
        description: 'Les boîtes à clé sécurisées sont abordables, permettant un accès facile et vous font gagner du temps.',
        pct: 58,
    },
    {
        titre: 'Ajoutez une télévision',
        description: 'Donnez aux voyageurs la possibilité de se détendre en regardant leurs émissions préférées.',
        pct: 95,
    },
    {
        titre: 'Indiquez tout stationnement gratuit',
        description: 'Indiquez à vos voyageurs si votre logement dispose d\'une place de parking.',
        pct: 58,
    },
    {
        titre: 'Ajoutez un lit pour bébé',
        description: 'Envisagez d\'ajouter un lit pour bébé. C\'est un incontournable pour de nombreux parents qui voyagent avec un bébé.',
        pct: 12,
    },
    {
        titre: 'Autorisez la réservation avec un court préavis',
        description: 'Compte tenu de la forte demande en voyages de dernière minute, vous avez plus de chances de remplir votre calendrier en acceptant un préavis court.',
        pct: 97,
    },
    {
        titre: 'Accueillez des voyageurs pour des séjours courte durée',
        description: 'Apparaissez dans les résultats de recherche des voyageurs qui partent pour un court voyage en réduisant votre durée minimale de séjour.',
        pct: 86,
    },
    {
        titre: 'Recevez des demandes pour des séjours plus longs',
        description: 'Permettez aux voyageurs de s\'informer même si le voyage dépasse votre durée maximale de séjour.',
        pct: 46,
    },
    {
        titre: 'Accueillez les voyageurs pour des séjours plus longs',
        description: 'Autorisez des séjours plus longs pourrait vous aider à remplir votre calendrier et à gagner plus.',
        pct: 56,
    },
    {
        titre: 'Autorisez les voyageurs à réserver 6 mois à l\'avance',
        description: 'Remplissez votre calendrier sur une période suffisamment longue pour attirer les voyageurs qui prévoient leur séjour à l\'avance.',
        pct: 58,
    },
    {
        titre: 'Ajoutez le chauffage',
        description: 'Faites savoir aux voyageurs que le logement est chauffé.',
        pct: 97,
    },
    {
        titre: 'Proposez des réductions à la semaine',
        description: 'Attirez les voyageurs à la recherche d\'un séjour de 7 nuits ou plus.',
        pct: 17,
    },
    {
        titre: 'Ajoutez une réduction en cas de réservation anticipée',
        description: 'Définissez une réduction pour attirer les voyageurs qui s\'organisent à l\'avance.',
        pct: 3,
    },
    {
        titre: 'Proposez des réductions au mois',
        description: 'Encouragez les voyageurs à rester plus longtemps en proposant une réduction au mois. Passez ainsi moins de temps à préparer votre logement entre les séjours.',
        pct: 17,
    },
    {
        titre: 'Ajoutez un fer à repasser',
        description: 'Indiquez à vos voyageurs que votre logement est équipé d\'un fer à repasser.',
        pct: 51,
    },
    {
        titre: 'Ajoutez la climatisation',
        description: 'Indiquez à vos voyageurs qu\'ils peuvent rester au frais chez vous.',
        pct: 26,
    },
    {
        titre: 'Organisez un espace de travail pour ordinateur',
        description: 'Les voyageurs cherchent des logements avec une table ou un bureau et une chaise confortable pour rester productifs lors de leurs déplacements.',
        pct: 43,
    },
    {
        titre: 'Ajoutez une réduction de réservation de dernière minute',
        description: 'Démarquez-vous auprès des voyageurs de dernière minute.',
        pct: 5,
    },
    {
        titre: 'Ajoutez une connexion wifi',
        description: 'Les voyageurs souhaitent avoir accès à Internet et disposer d\'une connexion fiable.',
        pct: 89,
    },
    {
        titre: 'Ajoutez un sèche-cheveux',
        description: 'Indiquez à vos voyageurs que votre logement est équipé d\'un sèche-cheveux pour qu\'ils n\'aient pas à emporter le leur.',
        pct: 86,
    },
]

const TABS = ['Annonces attrayantes', 'Réservation flexible', 'Tarification', 'Outils pour un accueil de qualité']

// ── Indicateur circulaire ─────────────────────────────────────────────────────
function CircleProgress({ pct }) {
    const r = 14
    const circ = 2 * Math.PI * r
    const filled = (pct / 100) * circ
    return (
        <svg width="36" height="36" viewBox="0 0 36 36" className="flex-shrink-0 -rotate-90">
            {/* Track */}
            <circle cx="18" cy="18" r={r} fill="none" stroke="#e5e7eb" strokeWidth="3.5" />
            {/* Fill */}
            <circle
                cx="18" cy="18" r={r}
                fill="none"
                stroke="#FF385C"
                strokeWidth="3.5"
                strokeDasharray={`${filled} ${circ}`}
                strokeLinecap="round"
            />
        </svg>
    )
}

// ── Graphique en barres ───────────────────────────────────────────────────────
function BarChart() {
    const barData = [
        { label: 'Annonces\nsimilaires', value: 55, color: '#111827' },
        { label: 'Toutes les\nannonces',  value: 44, color: '#6b7280' },
        { label: 'Mes annonces', value: 65, color: '#FF385C' },
    ]
    const w = 260, h = 180
    const pL = 40, pB = 36, pT = 8, pR = 10
    const iW = w - pL - pR
    const iH = h - pT - pB
    const barW = 46
    const gap = (iW - barData.length * barW) / (barData.length + 1)

    const getY    = (val) => pT + iH - (val / 100) * iH
    const getBarH = (val) => (val / 100) * iH
    const getX    = (i)   => pL + gap + i * (barW + gap)

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-xs">
            {/* Gridlines + Y labels */}
            {[100, 75, 50, 25, 0].map(val => (
                <g key={val}>
                    <line x1={pL} y1={getY(val)} x2={w - pR} y2={getY(val)} stroke="#e5e7eb" strokeWidth="1" />
                    <text x={pL - 5} y={getY(val) + 4} textAnchor="end" fontSize="9" fill="#9ca3af">
                        {val}%
                    </text>
                </g>
            ))}

            {/* Bars */}
            {barData.map((bar, i) => {
                const x = getX(i)
                const bh = getBarH(bar.value)
                const y = getY(bar.value)
                const parts = bar.label.split('\n')
                return (
                    <g key={i}>
                        <rect x={x} y={y} width={barW} height={bh} fill={bar.color} rx="3" />
                        {parts.map((part, j) => (
                            <text
                                key={j}
                                x={x + barW / 2}
                                y={h - pB + 13 + j * 11}
                                textAnchor="middle"
                                fontSize="8"
                                fill="#6b7280"
                            >
                                {part}
                            </text>
                        ))}
                    </g>
                )
            })}
        </svg>
    )
}

// ── Page principale ───────────────────────────────────────────────────────────
export default function Progression() {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <div className="min-h-screen bg-white font-airbnb">
            <AirbnbHeader />

            <div className="flex">
                <PerformanceSidebar />

                <main className="flex-1 overflow-y-auto">
                    <div className="px-8 py-6 max-w-5xl">

                        {/* Title */}
                        <div className="flex items-center gap-3 mb-8">
                            <svg width="16" height="14" viewBox="0 0 16 14" className="text-gray-700 flex-shrink-0" fill="currentColor">
                                <rect y="0" width="16" height="1.5" rx="0.75" />
                                <rect y="6" width="16" height="1.5" rx="0.75" />
                                <rect y="12" width="16" height="1.5" rx="0.75" />
                            </svg>
                            <h1 className="text-2xl font-bold text-gray-900">Progression</h1>
                        </div>

                        {/* Hero : stat + chart */}
                        <div className="flex gap-12 items-start mb-10">
                            {/* Left */}
                            <div className="flex-1 max-w-xs">
                                <h2 className="text-3xl font-bold text-gray-900 leading-snug mb-5">
                                    40% de vos opportunités ne sont pas mises à profit.
                                </h2>
                                <p className="text-sm text-gray-500 mb-2">Comparez</p>
                                <div className="relative inline-block mb-5">
                                    <select className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white cursor-pointer focus:outline-none">
                                        <option>Toutes les opportunités</option>
                                        <option>Annonces attractives</option>
                                        <option>Réservation flexible</option>
                                    </select>
                                    <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 text-xs">▾</span>
                                </div>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    Vous avez saisi de nombreuses opportunités et vous vous classez au-dessus de la moyenne mondiale pour l'ensemble des annonces.
                                </p>
                            </div>

                            {/* Right : bar chart */}
                            <div className="flex-shrink-0 w-64">
                                <BarChart />
                            </div>
                        </div>

                        <div className="h-px bg-gray-200 mb-8" />

                        {/* Comment booster */}
                        <h2 className="text-xl font-bold text-gray-900 mb-5">Comment booster votre activité ?</h2>

                        {/* Tabs */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {TABS.map((tab, i) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(i)}
                                    className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                                        activeTab === i
                                            ? 'border-gray-900 text-gray-900 font-semibold bg-white'
                                            : 'border-gray-300 text-gray-600 bg-white hover:border-gray-900'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Liste des opportunités */}
                        <div>
                            {OPPORTUNITES.map((item, i) => (
                                <div key={i} className="flex items-center gap-4 py-4 border-b border-gray-100">
                                    <div className="flex-1 min-w-0">
                                        <a href="#" className="text-sm font-semibold text-gray-900 hover:underline block mb-0.5">
                                            {item.titre}
                                        </a>
                                        <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                                    </div>
                                    <div className="flex-shrink-0 flex flex-col items-center gap-0.5">
                                        <CircleProgress pct={item.pct} />
                                        <span className="text-xs text-gray-500">{item.pct}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}
