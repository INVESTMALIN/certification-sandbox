import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Home, Calendar, Tag, ClipboardList, Pen, Rocket, Mail, Heart, FileText, BarChart3, ChevronDown } from 'lucide-react'
import propertiesData from '../../data/booking/properties.json'
import { useState, useEffect, useRef } from 'react'


function PropertyHeader() {
    const location = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()

    const [openDropdown, setOpenDropdown] = useState(null)
    const dropdownRef = useRef(null)

    // Fermer le dropdown si on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }

        if (openDropdown !== null) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [openDropdown])

    // Récupérer les données de la propriété
    const property = propertiesData.find(p => p.id === id)
    const truncatedName = property ? property.name.substring(0, 35) + '...' : 'Chargement...'

    const navItems = [
        { label: 'Accueil', path: `/booking/property/${id}/accueil`, icon: Home },
        {
            label: 'Tarifs et disponibilités',
            path: `/booking/property/${id}/tarifs`,
            icon: Calendar,
            hasSubmenu: true,
            submenuItems: [
                { label: 'Calendrier', path: `/booking/property/${id}/tarifs/calendrier`, enabled: true },
                { label: 'Ouvrir/fermer des hébergements', path: `/booking/property/${id}/tarifs/ouvrir-fermer`, enabled: true },
                { label: 'Copier les tarifs annuels', path: `/booking/property/${id}/tarifs/copier-tarifs`, enabled: true },
                { label: 'Plans tarifaires', path: `/booking/property/${id}/tarifs/plans`, enabled: true },
                { label: 'Avantages', path: '#', enabled: false },
                { label: 'Problèmes de connectivité', path: '#', enabled: false },
                { label: 'Tarification par client', path: '#', enabled: false },
                { label: 'Tarifs géocibles', path: '#', enabled: false },
                { label: 'Tarifs Mobiles', path: '#', enabled: false }
            ]
        },
        {
            label: 'Promotions',
            path: `/booking/property/${id}/promotions`,
            icon: Tag,
            hasSubmenu: true,
            submenuItems: [
                { label: 'Choisir une nouvelle promotion', path: `/booking/property/${id}/promotions/nouvelle`, enabled: true },
                { label: 'Simuler la réduction maximum', path: `/booking/property/${id}/promotions/simuler`, enabled: true },
                { label: 'Voir mes promotions actives', path: `/booking/property/${id}/promotions/actives`, enabled: true }
            ]
        },
        { label: 'Réservations', path: `/booking/property/${id}/reservations`, icon: ClipboardList },
        { label: 'Établissement', path: `/booking/property/${id}/etablissement`, icon: Pen },
        { label: 'Boostez votre performance', path: `/booking/property/${id}/performance`, icon: Rocket },
        { label: 'Boîte de réception', path: `/booking/property/${id}/inbox`, icon: Mail },
        { label: 'Commentaires clients', path: `/booking/property/${id}/commentaires`, icon: Heart },
        { label: 'Comptabilité', path: `/booking/property/${id}/comptabilite`, icon: FileText },
        { label: 'Analyse', path: `/booking/property/${id}/analyse`, icon: BarChart3 },
    ]

    const handleBackToDashboard = () => {
        navigate('/booking/dashboard')
    }

    const handleBackToPlatforms = () => {
        navigate('/choose-platform')
    }

    return (
        <header className="bg-[#003580]">
            {/* Top bar */}
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 border-b border-[#002855]">
                <div className="flex items-center gap-8">
                    <h1 className="text-white text-2xl font-bold">Booking.com</h1>
                    <span className="text-white/80 text-sm">
                        {truncatedName}
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-white text-xs rounded">
                        14290287
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Recherchez des pages et des réser..."
                            className="px-4 py-2 rounded text-sm w-72 bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:bg-white/20"
                        />
                    </div>

                    {/* Flag FR */}
                    <div className="w-8 h-6 rounded overflow-hidden">
                        <div className="flex h-full">
                            <div className="w-1/3 bg-[#002395]"></div>
                            <div className="w-1/3 bg-white"></div>
                            <div className="w-1/3 bg-[#ED2939]"></div>
                        </div>
                    </div>

                    {/* Icônes */}
                    <button className="text-white hover:bg-[#004494] p-2 rounded">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>

                    <button className="text-white hover:bg-[#004494] p-2 rounded">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </button>

                    {/* Bouton retour dashboard groupe */}
                    <button
                        onClick={handleBackToDashboard}
                        className="text-white hover:bg-[#004494] p-2 rounded transition-colors"
                        title="Retour au dashboard groupe"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Navigation tabs avec icônes au-dessus */}
            <nav className="bg-[#003580]">
                <div className="max-w-7xl mx-auto flex items-center px-6">
                    {navItems.map((item, index) => {
                        const isActive = location.pathname === item.path || (item.submenuItems && item.submenuItems.some(sub => sub.path === location.pathname))
                        const Icon = item.icon

                        // Si l'item a un submenu
                        if (item.hasSubmenu) {
                            return (
                                <div key={index} className="relative" ref={dropdownRef}>
                                    <button
                                        onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                                        className={`
                        px-3 py-3 transition-colors relative
                        flex flex-col items-center justify-center gap-1
                        min-w-[100px]
                        ${isActive ? 'text-white bg-[#004494]' : 'text-white/80 hover:bg-[#004494]'}
                    `}
                                    >
                                        <Icon className="w-6 h-6" strokeWidth={1.5} />
                                        <span className="text-xs font-medium text-center leading-tight flex items-center gap-1">
                                            {item.label}
                                            <ChevronDown className="w-3 h-3" />
                                        </span>
                                        {isActive && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>}
                                    </button>

                                    {/* Dropdown menu */}
                                    {openDropdown === index && (
                                        <div className="absolute top-full left-0 bg-white shadow-lg rounded-b-lg z-50 min-w-[280px]">
                                            {item.submenuItems.map((subItem, subIndex) => (
                                                subItem.enabled ? (
                                                    <Link
                                                        key={subIndex}
                                                        to={subItem.path}
                                                        onClick={() => setIsDropdownOpen(false)}
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                                                    >
                                                        {subItem.label}
                                                    </Link>
                                                ) : (
                                                    <div
                                                        key={subIndex}
                                                        className="block px-4 py-3 text-sm text-gray-400 cursor-not-allowed border-b border-gray-100 last:border-b-0"
                                                    >
                                                        {subItem.label}
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )
                        }

                        // Pour les items normaux (sans submenu)
                        return (
                            <Link
                                key={index}
                                to={item.path}
                                className={`
                px-3 py-3 transition-colors relative
                flex flex-col items-center justify-center gap-1
                min-w-[100px]
                ${isActive ? 'text-white bg-[#004494]' : 'text-white/80 hover:bg-[#004494]'}
            `}
                            >
                                {(item.label === 'Établissement' || item.label === 'Boostez votre performance' || item.label === 'Comptabilité') && (
                                    <span className="absolute top-2 right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                                        {item.label === 'Établissement' ? '1' : item.label === 'Boostez votre performance' ? '25' : '1'}
                                    </span>
                                )}

                                <div className="relative">
                                    <Icon className="w-6 h-6" strokeWidth={1.5} />
                                    {item.label === 'Réservations' && (
                                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#003580]"></span>
                                    )}
                                </div>

                                <span className="text-xs font-medium text-center leading-tight flex items-center gap-1">
                                    {item.label}
                                </span>

                                {isActive && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>}
                            </Link>
                        )
                    })}
                </div>
            </nav>
        </header>
    )
}

export default PropertyHeader