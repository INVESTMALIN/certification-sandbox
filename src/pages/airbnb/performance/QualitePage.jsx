import AirbnbHeader from '../../../components/airbnb/AirbnbHeader'
import PerformanceSidebar from '../../../components/airbnb/PerformanceSidebar'
import { useState, useRef, useEffect } from 'react'
import { Search } from 'lucide-react'
import { useParams, Navigate } from 'react-router-dom'
import propertiesData from '../../../data/airbnb/properties.json'
import { QUALITE_DATA } from './qualiteData'

// ── Graphique linéaire ────────────────────────────────────────────────────────
function QualiteChart({ current, previous }) {
    const w = 460, h = 160
    const pL = 48, pB = 28, pT = 8, pR = 10
    const iW = w - pL - pR
    const iH = h - pT - pB

    const getX = (i, total) => pL + (i / (total - 1)) * iW
    const getY = (val)       => pT + iH - (val / 100) * iH
    const toPoints = (pts)   => pts.map((v, i) => `${getX(i, pts.length)},${getY(v)}`).join(' ')

    const xLabels = ['26 janv. -\n1 févr. 2026', '2-8 févr.\n2026', '9-15 févr.\n2026', '16-22 févr.\n2026', '23 févr. -\n1 mars 2026']

    return (
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full">
            {[100, 75, 50, 25, 0].map(val => (
                <g key={val}>
                    <line x1={pL} y1={getY(val)} x2={w - pR} y2={getY(val)} stroke="#e5e7eb" strokeWidth="1" />
                    <text x={pL - 5} y={getY(val) + 4} textAnchor="end" fontSize="10" fill="#9ca3af">
                        {val === 100 ? '100.0%' : val === 0 ? '0.0%' : `${val}%`}
                    </text>
                </g>
            ))}
            <polyline points={toPoints(previous)} fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="6,4" />
            <polyline points={toPoints(current)}  fill="none" stroke="#111827" strokeWidth="2" />
            {xLabels.map((label, i) => (
                <text key={i} x={getX(i, xLabels.length)} y={h - 6} textAnchor="middle" fontSize="9" fill="#9ca3af">
                    {label.split('\n')[0]}
                </text>
            ))}
        </svg>
    )
}

// ── Page générique Qualité ────────────────────────────────────────────────────
export default function QualitePage() {
    const { slug } = useParams()
    const data = QUALITE_DATA[slug]

    // Slug inconnu → redirection vers qualité globale
    if (!data) return <Navigate to="/airbnb/performance/qualite/globale" replace />

    return <QualiteContent data={data} />
}

// Composant interne séparé pour que les hooks soient stables entre slugs
function QualiteContent({ data }) {
    const [isFilterOpen, setIsFilterOpen]         = useState(false)
    const [searchQuery, setSearchQuery]           = useState('')
    const [pendingSelection, setPendingSelection] = useState(new Set())
    const [appliedFilter, setAppliedFilter]       = useState(new Set())
    const filterRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                setIsFilterOpen(false)
            }
        }
        if (isFilterOpen) document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isFilterOpen])

    const openFilter = () => {
        setPendingSelection(new Set(appliedFilter))
        setSearchQuery('')
        setIsFilterOpen(true)
    }

    const toggleProperty = (id) => {
        setPendingSelection(prev => {
            const next = new Set(prev)
            next.has(id) ? next.delete(id) : next.add(id)
            return next
        })
    }

    const effacer  = () => setPendingSelection(new Set())
    const appliquer = () => {
        setAppliedFilter(new Set(pendingSelection))
        setIsFilterOpen(false)
    }

    const filteredProperties = appliedFilter.size === 0
        ? propertiesData
        : propertiesData.filter(p => appliedFilter.has(p.propertyId))

    const visibleInDropdown = propertiesData.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filterLabel = appliedFilter.size === 0
        ? 'Toutes les annonces'
        : `${appliedFilter.size} annonce${appliedFilter.size > 1 ? 's' : ''}`

    return (
        <div className="min-h-screen bg-white font-airbnb">
            <AirbnbHeader />

            <div className="flex">
                <PerformanceSidebar />

                <main className="flex-1 overflow-y-auto">
                    <div className="px-8 py-6 max-w-5xl">

                        {/* Titre */}
                        <div className="flex items-center gap-3 mb-5">
                            <svg width="16" height="14" viewBox="0 0 16 14" className="text-gray-700 flex-shrink-0" fill="currentColor">
                                <rect y="0" width="16" height="1.5" rx="0.75" />
                                <rect y="6" width="16" height="1.5" rx="0.75" />
                                <rect y="12" width="16" height="1.5" rx="0.75" />
                            </svg>
                            <h1 className="text-2xl font-bold text-gray-900">{data.title}</h1>
                        </div>

                        {/* Filtres */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            {/* Dropdown "Toutes les annonces" */}
                            <div className="relative" ref={filterRef}>
                                <button
                                    onClick={openFilter}
                                    className={`px-4 py-2 rounded-full text-sm font-medium border bg-white transition-colors ${appliedFilter.size > 0 ? 'border-gray-900 text-gray-900 font-semibold' : 'border-gray-300 text-gray-700 hover:border-gray-900'}`}
                                >
                                    {filterLabel}
                                </button>

                                {isFilterOpen && (
                                    <div className="absolute left-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 flex flex-col" style={{ maxHeight: '420px' }}>
                                        <div className="p-3 border-b border-gray-100">
                                            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl">
                                                <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <input
                                                    type="text"
                                                    placeholder="Recherchez des logements"
                                                    value={searchQuery}
                                                    onChange={e => setSearchQuery(e.target.value)}
                                                    className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                                                    autoFocus
                                                />
                                            </div>
                                        </div>
                                        <div className="overflow-y-auto flex-1">
                                            {visibleInDropdown.map(p => (
                                                <label key={p.propertyId} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        checked={pendingSelection.has(p.propertyId)}
                                                        onChange={() => toggleProperty(p.propertyId)}
                                                        className="w-4 h-4 rounded accent-gray-900 flex-shrink-0"
                                                    />
                                                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                                                    <div className="min-w-0">
                                                        <div className="text-sm font-semibold text-gray-900 truncate">{p.name}</div>
                                                        <div className="text-xs text-gray-400 truncate">{p.city}</div>
                                                    </div>
                                                </label>
                                            ))}
                                            {visibleInDropdown.length === 0 && (
                                                <div className="px-4 py-6 text-sm text-gray-400 text-center">Aucun logement trouvé</div>
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
                                            <button onClick={effacer} className="text-sm font-semibold text-gray-700 underline hover:text-gray-900">Effacer</button>
                                            <button onClick={appliquer} className="px-5 py-2 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700">Appliquer</button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold border-2 border-gray-900 bg-white text-gray-900">
                                26 janv. <span className="mx-0.5">→</span> 25 févr.
                            </button>
                            <button className="px-4 py-2 rounded-full text-sm border border-gray-300 text-gray-600 hover:border-gray-900">Chambres et lits</button>
                            <button className="px-4 py-2 rounded-full text-sm border border-gray-300 text-gray-600 hover:border-gray-900">Régions</button>
                            <button className="px-4 py-2 rounded-full text-sm border border-gray-300 text-gray-600 hover:border-gray-900">Équipements</button>
                            <span className="ml-auto text-xs text-gray-400">Dernière mise à jour : 25 févr.</span>
                        </div>
                        <div className="h-px bg-gray-200 mb-7" />

                        {/* Stats */}
                        <div className="flex gap-12 mb-8">
                            <div>
                                <div className="text-4xl font-bold text-gray-900 mb-1">{data.stat1}</div>
                                <a href="#" className="text-sm text-gray-900 underline">{data.stat1Label}</a>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-gray-900 mb-1">{data.stat2}</div>
                                <a href="#" className="text-sm text-gray-900 underline">{data.stat2Label}</a>
                            </div>
                        </div>

                        {/* Graphique */}
                        <div className="border border-gray-200 rounded-2xl p-6 mb-8">
                            <div className="flex justify-end gap-6 mb-4 text-xs text-gray-500">
                                <span className="flex items-center gap-2">
                                    <svg width="24" height="4"><line x1="0" y1="2" x2="24" y2="2" stroke="#111827" strokeWidth="2" /></svg>
                                    26 janv. - 23 févr.
                                </span>
                                <span className="flex items-center gap-2">
                                    <svg width="24" height="4"><line x1="0" y1="2" x2="24" y2="2" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4,3" /></svg>
                                    29 déc. 2025 - 26 janv. 2026
                                    <span className="cursor-pointer">···</span>
                                </span>
                            </div>

                            <div className="flex gap-8">
                                <div className="w-56 flex-shrink-0">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                                        {data.chartTitle.split('\n').map((line, i) => (
                                            <span key={i}>{line}{i < data.chartTitle.split('\n').length - 1 && <br />}</span>
                                        ))}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-1">Comparez</p>
                                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm mb-4 bg-white">
                                        <option>Sur la durée</option>
                                    </select>
                                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{data.chartDesc}</p>
                                    <a href="#" className="text-sm text-gray-900 underline">En savoir plus sur vos performances d'hôte</a>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <QualiteChart current={data.current} previous={data.previous} />
                                </div>
                            </div>
                        </div>

                        {/* Commentaires récents */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Commentaires récents</h2>

                            <div className="grid grid-cols-3 gap-4 mb-4">
                                {data.commentaires.map((c, i) => (
                                    <div key={i} className="border border-gray-200 rounded-2xl p-4">
                                        <div className="flex items-start gap-3 mb-3">
                                            <div className={`w-10 h-10 ${c.couleur} rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0`}>
                                                {c.initiale}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-semibold text-sm text-gray-900">{c.name}</div>
                                                <div className="text-xs text-gray-500 leading-snug">{c.dates} • {c.property}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 mb-2">
                                            <span className="text-xs text-gray-700">{data.title}</span>
                                            <span className="text-[#FF385C]">★</span>
                                            <span className="text-sm font-semibold text-gray-900">{c.rating}</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{c.text}</p>
                                        <a href="#" className="text-sm font-semibold text-gray-900 underline">En savoir plus</a>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2 mb-5">
                                <button className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-400 hover:border-gray-900 text-base leading-none">‹</button>
                                <button className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-gray-700 hover:border-gray-900 text-base leading-none">›</button>
                            </div>

                            <button className="px-5 py-2.5 border border-gray-900 rounded-xl text-sm font-semibold text-gray-900 hover:bg-gray-50">
                                Afficher 2999 commentaires
                            </button>
                        </div>

                        {/* Tableau des annonces */}
                        <div>
                            <div className="flex items-center pb-3 border-b border-gray-200">
                                <div className="flex-1 text-xs font-semibold text-gray-400 uppercase tracking-wider">Nom de l'annonce</div>
                                <div className="w-28 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Modifier</div>
                                <div className="w-20 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Taux</div>
                            </div>

                            {filteredProperties.map((property) => (
                                <div key={property.propertyId} className="flex items-center py-4 border-b border-gray-100">
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <img src={property.image} alt={property.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
                                        <div className="min-w-0">
                                            <div className="text-sm text-gray-900 truncate">{property.name}</div>
                                            <div className="text-xs text-gray-400">{property.city}</div>
                                        </div>
                                    </div>
                                    <div className="w-28 text-right text-sm text-gray-400">—</div>
                                    <div className="w-20 text-right">
                                        <span className="inline-block px-2.5 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">0%</span>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-5">
                                <button className="px-5 py-2.5 border border-gray-900 rounded-xl text-sm font-semibold text-gray-900 hover:bg-gray-50">
                                    Afficher {filteredProperties.length} annonce{filteredProperties.length > 1 ? 's' : ''}
                                </button>
                            </div>
                        </div>

                        <div className="mt-10 pt-4 border-t border-gray-100">
                            <a href="#" className="text-sm text-gray-500 underline">Laisser des remarques</a>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
