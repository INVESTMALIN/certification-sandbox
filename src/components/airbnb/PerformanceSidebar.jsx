import { useState } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const NAV = [
    {
        label: 'Progression',
        path: '/airbnb/performance/progression',
    },
    {
        label: 'Qualité',
        basePath: '/airbnb/performance/qualite',
        children: [
            { label: 'Qualité globale',   path: '/airbnb/performance/qualite/globale' },
            { label: 'Précision',         path: '/airbnb/performance/qualite/precision' },
            { label: 'Arrivée',           path: '/airbnb/performance/qualite/arrivee' },
            { label: 'Propreté',          path: '/airbnb/performance/qualite/proprete' },
            { label: 'Communication',     path: '/airbnb/performance/qualite/communication' },
            { label: 'Emplacement',       path: '/airbnb/performance/qualite/emplacement' },
            { label: 'Qualité-prix',      path: '/airbnb/performance/qualite/qualite-prix' },
        ],
    },
    {
        label: 'Occupation et tarifs',
        basePath: '/airbnb/performance/occupation',
        children: [
            { label: 'Taux d\'occupation', path: '/airbnb/performance/occupation/taux-occupation' },
            { label: 'Taux d\'annulation', path: '/airbnb/performance/occupation/taux-annulation' },
            { label: 'Durée du séjour',   path: '/airbnb/performance/occupation/duree-sejour' },
            { label: 'Tarif par nuit',    path: '/airbnb/performance/occupation/tarif-nuit' },
        ],
    },
    {
        label: 'Conversion',
        basePath: '/airbnb/performance/conversion',
        children: [
            { label: 'Conversion en réservation',          path: '/airbnb/performance/conversion/conversion-reservation' },
            { label: 'Délai entre réservation et arrivée', path: '/airbnb/performance/conversion/delai-arrivee' },
            { label: 'Voyageurs récurrents',               path: '/airbnb/performance/conversion/voyageurs-recurrents' },
            { label: 'Vues',                               path: '/airbnb/performance/conversion/vues' },
            { label: 'Ajouts aux wish lists',              path: '/airbnb/performance/conversion/wish-lists' },
        ],
    },
]

const BOTTOM_LINKS = [
    { label: 'Superhôte',         path: '/airbnb/performance/superhote' },
    { label: 'Problèmes récents', path: '/airbnb/performance/problemes-recents' },
]

export default function PerformanceSidebar() {
    const { pathname } = useLocation()

    // Ouvre automatiquement la section qui contient la route active
    const initialOpen = NAV.reduce((acc, item) => {
        if (item.basePath) {
            acc[item.label] = pathname.startsWith(item.basePath)
        }
        return acc
    }, {})
    // Si aucune section n'est ouverte par défaut, ouvrir Qualité
    if (!Object.values(initialOpen).some(Boolean)) {
        initialOpen['Qualité'] = true
    }

    const [open, setOpen] = useState(initialOpen)

    const toggle = (label) => setOpen(prev => ({ ...prev, [label]: !prev[label] }))

    return (
        <aside className="w-52 border-r border-gray-200 flex-shrink-0 sticky top-[89px] h-[calc(100vh-89px)] overflow-y-auto">
            <div className="px-5 py-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Performances</h2>

                <nav className="space-y-0.5 text-sm">
                    {NAV.map((item) => {
                        // Item simple (pas d'enfants)
                        if (!item.children) {
                            const isActive = pathname === item.path
                            return (
                                <Link
                                    key={item.label}
                                    to={item.path ?? '#'}
                                    className={`block py-2 px-2 rounded-xl transition-colors ${isActive ? 'font-semibold text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    {item.label}
                                </Link>
                            )
                        }

                        // Section expandable
                        const isExpanded = !!open[item.label]
                        return (
                            <div key={item.label}>
                                <button
                                    onClick={() => toggle(item.label)}
                                    className="w-full flex items-center gap-1 py-2 px-2 text-gray-600 hover:text-gray-900 text-left"
                                >
                                    {isExpanded
                                        ? <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" />
                                        : <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />}
                                    <span>{item.label}</span>
                                </button>

                                {isExpanded && item.children.length > 0 && (
                                    <div className="ml-3 mt-0.5 space-y-0.5">
                                        {item.children.map((child) => {
                                            const isActive = pathname === child.path
                                            return (
                                                <Link
                                                    key={child.label}
                                                    to={child.path}
                                                    className={`block py-1.5 px-3 text-xs rounded-full transition-colors ${
                                                        isActive
                                                            ? 'font-semibold bg-gray-900 text-white'
                                                            : 'text-gray-500 hover:text-gray-900'
                                                    }`}
                                                >
                                                    {child.label}
                                                </Link>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )
                    })}

                    <div className="pt-1">
                        {BOTTOM_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                to={link.path}
                                className={`block py-2 px-2 transition-colors ${pathname === link.path ? 'font-semibold text-gray-900' : 'text-gray-500 hover:text-gray-900'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>
        </aside>
    )
}
