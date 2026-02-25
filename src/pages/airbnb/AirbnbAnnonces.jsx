import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, LayoutGrid, Plus, ChevronRight, X, List } from 'lucide-react'
import AirbnbHeader from '../../components/airbnb/AirbnbHeader'
import properties from '../../data/airbnb/properties.json'

// Statuts de synchronisation par propriété (simulés)
const syncStatuses = {
    'prop_airbnb_001': { label: 'Connexion effectuée', color: 'green' },
    'prop_airbnb_002': { label: 'Connexion effectuée', color: 'green' },
    'prop_airbnb_003': { label: 'Connexion effectuée', color: 'green' },
    'prop_airbnb_004': { label: 'Connexion effectuée', color: 'green' },
    'prop_airbnb_005': { label: 'Connexion effectuée', color: 'green' },
    'prop_airbnb_006': { label: 'Connexion effectuée', color: 'green' },
}

// Données supplémentaires simulées
const extraData = {
    'prop_airbnb_001': { type: 'Logement', location: 'Cannes, Provence-Alpes-Côte d\'Azur', listingId: '1405' },
    'prop_airbnb_002': { type: 'Logement', location: 'Marseille, Provence-Alpes-Côte d\'Azur', listingId: '1281' },
    'prop_airbnb_003': { type: 'Logement', location: 'Les Arcs, Auvergne-Rhône-Alpes', listingId: '1511' },
    'prop_airbnb_004': { type: 'Logement', location: 'Nice, Provence-Alpes-Côte d\'Azur', listingId: '4545' },
    'prop_airbnb_005': { type: 'Logement', location: 'Lyon, Auvergne-Rhône-Alpes', listingId: '1375' },
    'prop_airbnb_006': { type: 'Logement', location: 'Paris, Île-de-France', listingId: '1655' },
}

function StatusDot({ color }) {
    const colorMap = {
        green: 'bg-green-500',
        orange: 'bg-orange-400',
        red: 'bg-red-500',
    }
    return (
        <span className={`inline-block w-2 h-2 rounded-full ${colorMap[color] || colorMap.green} mr-2`} />
    )
}

function AirbnbAnnonces() {
    const navigate = useNavigate()
    const [hoveredRow, setHoveredRow] = useState(null)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [viewMode, setViewMode] = useState('list') // 'list' | 'grid'
    const inputRef = useRef(null)

    useEffect(() => {
        if (searchOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [searchOpen])

    const handleSearchOpen = () => setSearchOpen(true)
    const handleSearchClose = () => { setSearchOpen(false); setSearchQuery('') }
    const handleClear = () => { setSearchQuery(''); inputRef.current?.focus() }

    // Filtrage par nom ou emplacement
    const filteredProperties = properties.filter((property) => {
        if (!searchQuery.trim()) return true
        const q = searchQuery.toLowerCase()
        const extra = extraData[property.propertyId] || { location: property.city + ', France' }
        return (
            property.name.toLowerCase().includes(q) ||
            extra.location.toLowerCase().includes(q)
        )
    })

    return (
        <div className="min-h-screen bg-white font-airbnb">
            <AirbnbHeader />

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* En-tête de page */}
                <div className="flex items-center justify-between mb-8 gap-4">
                    <h1 className="text-2xl font-semibold text-gray-900 flex-shrink-0">
                        Mes annonces
                    </h1>

                    {/* Zone droite */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        {/* Barre de recherche étendue */}
                        {searchOpen && (
                            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm focus-within:border-gray-500 transition-all duration-200 w-80">
                                <Search className="w-4 h-4 text-gray-400 flex-shrink-0 mr-3" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Rechercher par nom ou emplacement"
                                    className="flex-1 text-sm text-gray-800 placeholder-gray-400 outline-none bg-transparent min-w-0"
                                />
                                {(searchQuery || searchOpen) && (
                                    <button
                                        onClick={searchQuery ? handleClear : handleSearchClose}
                                        className="ml-2 p-0.5 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                                    >
                                        <X className="w-4 h-4 text-gray-500" />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Icône loupe */}
                        <button
                            onClick={searchOpen ? handleSearchClose : handleSearchOpen}
                            className={`p-2 rounded-lg transition-colors ${searchOpen ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100 text-gray-600'}`}
                            aria-label={searchOpen ? 'Fermer la recherche' : 'Ouvrir la recherche'}
                        >
                            <Search className="w-5 h-5" />
                        </button>

                        {/* Icône toggle vue grille / liste */}
                        <button
                            onClick={() => setViewMode(v => v === 'list' ? 'grid' : 'list')}
                            className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-100 text-gray-600'}`}
                            aria-label={viewMode === 'list' ? 'Vue grille' : 'Vue liste'}
                        >
                            {viewMode === 'list' ? (
                                <LayoutGrid className="w-5 h-5" />
                            ) : (
                                <List className="w-5 h-5" />
                            )}
                        </button>

                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                            <Plus className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>

                {/* Message vide */}
                {filteredProperties.length === 0 && (
                    <div className="py-16 text-center text-gray-400 text-sm">
                        Aucune annonce ne correspond à votre recherche.
                    </div>
                )}

                {/* ── VUE LISTE ── */}
                {viewMode === 'list' && filteredProperties.length > 0 && (
                    <div className="w-full">
                        {/* En-têtes */}
                        <div className="grid grid-cols-[2fr_1fr_1.5fr_1fr_1.5fr_auto] gap-4 px-4 pb-3 border-b border-gray-200">
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Annonce</span>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Type</span>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Emplacement</span>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Statut</span>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Statut de la synchronisation</span>
                            <span className="w-6" />
                        </div>

                        {filteredProperties.map((property, index) => {
                            const extra = extraData[property.propertyId] || { type: 'Logement', location: property.city + ', France', listingId: '—' }
                            const sync = syncStatuses[property.propertyId] || { label: 'Connexion effectuée', color: 'green' }
                            const isHovered = hoveredRow === property.propertyId
                            const isFirst = index === 0

                            return (
                                <div
                                    key={property.propertyId}
                                    className={`grid grid-cols-[2fr_1fr_1.5fr_1fr_1.5fr_auto] gap-4 items-center px-4 py-4 border-b border-gray-100 cursor-pointer transition-colors ${isHovered ? 'bg-gray-50' : 'bg-white'}`}
                                    onClick={() => navigate(`/airbnb/annonce/${property.propertyId}`)}
                                    onMouseEnter={() => setHoveredRow(property.propertyId)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    style={isFirst ? { backgroundColor: isHovered ? '#f9fafb' : '#f9fafb' } : {}}
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <img src={property.image} alt={property.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate leading-snug">{property.name}</p>
                                            <p className="text-xs text-[#FF385C] mt-0.5">{extra.listingId}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <span className={`text-sm ${sync.color === 'orange' ? 'text-[#FF385C]' : 'text-gray-500'}`}>{extra.type}</span>
                                    </div>
                                    <div>
                                        <span className={`text-sm ${sync.color === 'orange' ? 'text-[#FF385C]' : 'text-gray-500'}`}>{extra.location}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <StatusDot color="green" />
                                        <span className="text-sm text-gray-800">Publiée</span>
                                    </div>
                                    <div className="flex items-center">
                                        <StatusDot color={sync.color} />
                                        <span className={`text-sm ${sync.color === 'orange' ? 'text-orange-500' : 'text-gray-800'}`}>{sync.label}</span>
                                    </div>
                                    <div className="flex items-center justify-end">
                                        {isHovered && <ChevronRight className="w-4 h-4 text-gray-400" />}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* ── VUE GRILLE ── */}
                {viewMode === 'grid' && filteredProperties.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProperties.map((property) => {
                            const extra = extraData[property.propertyId] || { type: 'Logement', location: property.city + ', France', listingId: '—' }

                            return (
                                <div
                                    key={property.propertyId}
                                    className="cursor-pointer group"
                                    onClick={() => navigate(`/airbnb/annonce/${property.propertyId}`)}
                                >
                                    {/* Photo principale */}
                                    <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-100">
                                        <img
                                            src={property.image}
                                            alt={property.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {/* Badge Publiée */}
                                        <div className="absolute top-3 left-3">
                                            <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                                                Publiée
                                            </span>
                                        </div>
                                    </div>

                                    {/* Infos */}
                                    <div className="mt-3 px-0.5">
                                        <p className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">
                                            {property.name}
                                        </p>
                                        <p className="text-xs text-[#FF385C] mt-0.5">{extra.listingId}</p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {extra.type} · {extra.location}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AirbnbAnnonces
