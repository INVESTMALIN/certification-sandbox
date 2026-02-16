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
                setOpenDropdown(null)
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
        { label: 'Accueil', path: `/booking/property/${id}/accueil`, icon: Home, enabled: true },
        {
            label: 'Tarifs et disponibilités',
            path: `/booking/property/${id}/tarifs`,
            icon: Calendar,
            enabled: true,
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
            enabled: true,
            hasSubmenu: true,
            submenuItems: [
                { label: 'Choisir une nouvelle promotion', path: `/booking/property/${id}/promotions/nouvelle`, enabled: true },
                { label: 'Simuler la réduction maximum', path: `/booking/property/${id}/promotions/simuler`, enabled: true },
                { label: 'Voir mes promotions actives', path: `/booking/property/${id}/promotions/actives`, enabled: true }
            ]
        },
        {
            label: 'Réservations',
            path: `/booking/property/${id}/reservations`,
            icon: ClipboardList,
            enabled: true,
            hasSubmenu: true,
            submenuItems: [
                { label: 'Liste des réservations', path: `/booking/property/${id}/reservations/liste`, enabled: true },
                { label: 'Demandes de réservation', path: `/booking/property/${id}/reservations/demandes`, enabled: true }
            ]
        }, {
            label: 'Établissement',
            path: `/booking/property/${id}/etablissement`,
            icon: Pen,
            enabled: true,
            hasSubmenu: true,
            submenuItems: [
                { label: 'Note de qualité', path: `/booking/property/${id}/etablissement/note-qualite`, enabled: true },
                { label: 'Score de la page de l\'établissement', path: `/booking/property/${id}/etablissement/score-page`, enabled: true },
                { label: 'Infos sur l\'établissement et statut de l\'établissement', path: `/booking/property/${id}/etablissement/infos-statut`, enabled: true },
                { label: 'TVA, taxes et frais', path: `/booking/property/${id}/etablissement/tva-taxes`, enabled: true },
                { label: 'Photos', path: `/booking/property/${id}/etablissement/photos`, enabled: true, badge: '1', badgeColor: 'red' },
                { label: 'Conditions de l\'établissement', path: `/booking/property/${id}/etablissement/conditions-etablissement`, enabled: true },
                { label: 'Conditions de réservation', path: `/booking/property/${id}/etablissement/conditions-reservation`, enabled: true },
                { label: 'Équipements et services', path: `/booking/property/${id}/etablissement/equipements-services`, enabled: true },
                { label: 'Hébergements', path: `/booking/property/${id}/etablissement/hebergements`, enabled: true },
                { label: 'Détails des hébergements', path: `/booking/property/${id}/etablissement/details-hebergements`, enabled: true },
                { label: 'Votre profil', path: `/booking/property/${id}/etablissement/profil`, enabled: true },
                { label: 'Voir vos descriptions', path: `/booking/property/${id}/etablissement/descriptions`, enabled: true },
                { label: 'Préférences des messages', path: `/booking/property/${id}/etablissement/preferences-messages`, enabled: true },
                { label: 'Durabilité', path: '#', enabled: false, badge: 'Nouveau', badgeColor: 'green' }
            ]
        },
        { label: 'Boostez votre performance', path: `#`, icon: Rocket, enabled: false },
        {
            label: 'Boîte de réception',
            path: `/booking/property/${id}/inbox`,
            icon: Mail,
            enabled: true,
            hasSubmenu: true,
            submenuItems: [
                { label: 'Messages relatifs aux réservations', path: `/booking/property/${id}/inbox`, enabled: true },
                { label: 'Messages de Booking.com', path: `/booking/property/${id}/inbox/booking-messages`, enabled: true },
                { label: 'Questions des clients', path: '#', enabled: false }
            ]
        }, {
            label: 'Commentaires clients',
            path: `/booking/property/${id}/commentaires`,
            icon: Heart,
            enabled: true,
            hasSubmenu: true,
            submenuItems: [
                { label: 'Commentaires clients', path: `/booking/property/${id}/commentaires/liste`, enabled: true },
                { label: 'Expérience client', path: `/booking/property/${id}/commentaires/experience`, enabled: true }
            ]
        },
        { label: 'Comptabilité', path: `#`, icon: FileText, enabled: false },
        { label: 'Analyse', path: `#`, icon: BarChart3, enabled: false },
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
                        ID: {id}
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBackToDashboard}
                        className="flex items-center gap-2 text-white/80 hover:text-white text-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Retour au groupe
                    </button>
                    <button
                        onClick={handleBackToPlatforms}
                        className="text-white/80 hover:text-white text-sm"
                    >
                        Changer de plateforme
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="max-w-7xl mx-auto">
                <div className="flex items-stretch">
                    {navItems.map((item, index) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/')

                        // Pour les items avec submenu
                        if (item.hasSubmenu) {
                            const isDropdownOpen = openDropdown === item.label

                            return (
                                <div key={index} className="relative" ref={isDropdownOpen ? dropdownRef : null}>
                                    <button
                                        onClick={() => setOpenDropdown(isDropdownOpen ? null : item.label)}
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
                                        </div>

                                        <span className="text-xs font-medium text-center leading-tight flex items-center gap-1">
                                            {item.label}
                                            <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                        </span>

                                        {isActive && <div className="absolute bottom-0 left-0 right-0 h-1 bg-white"></div>}
                                    </button>

                                    {/* Dropdown menu */}
                                    {isDropdownOpen && (
                                        <div className="absolute left-0 top-full bg-white shadow-lg rounded-b-lg overflow-hidden z-50 min-w-[280px]">
                                            {item.submenuItems.map((subItem, subIndex) =>
                                                subItem.enabled ? (
                                                    <Link
                                                        key={subIndex}
                                                        to={subItem.path}
                                                        onClick={() => setOpenDropdown(null)}
                                                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                                                    >
                                                        <span>{subItem.label}</span>
                                                        {subItem.badge && (
                                                            <span className={`
                                                    px-2 py-0.5 rounded-full text-xs font-semibold
                                                    ${subItem.badgeColor === 'red' ? 'bg-red-500 text-white' : ''}
                                                    ${subItem.badgeColor === 'green' ? 'bg-green-600 text-white' : ''}
                                                `}>
                                                                {subItem.badge}
                                                            </span>
                                                        )}
                                                    </Link>
                                                ) : (
                                                    <div
                                                        key={subIndex}
                                                        className="block px-4 py-3 text-sm text-gray-400 cursor-not-allowed border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                                                    >
                                                        <span>{subItem.label}</span>
                                                        {subItem.badge && (
                                                            <span className={`
                                                    px-2 py-0.5 rounded-full text-xs font-semibold
                                                    ${subItem.badgeColor === 'red' ? 'bg-red-500 text-white' : ''}
                                                    ${subItem.badgeColor === 'green' ? 'bg-green-600 text-white' : ''}
                                                `}>
                                                                {subItem.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        }

                        // Pour les items normaux (sans submenu)
                        // SI L'ITEM EST DÉSACTIVÉ
                        if (!item.enabled) {
                            return (
                                <div
                                    key={index}
                                    className="px-3 py-3 flex flex-col items-center justify-center gap-1 min-w-[100px] text-white/30 cursor-not-allowed relative"
                                >
                                    {(item.label === 'Boostez votre performance' || item.label === 'Comptabilité') && (
                                        <span className="absolute top-2 right-2 w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                                            {item.label === 'Boostez votre performance' ? '25' : '1'}
                                        </span>
                                    )}

                                    <div className="relative">
                                        <Icon className="w-6 h-6" strokeWidth={1.5} />
                                    </div>

                                    <span className="text-xs font-medium text-center leading-tight">
                                        {item.label}
                                    </span>
                                </div>
                            )
                        }

                        // SI L'ITEM EST ACTIVÉ
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