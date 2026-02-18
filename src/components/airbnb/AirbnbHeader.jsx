import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Bell, Home, Wallet, BarChart3, Settings, Globe, BookOpen, HelpCircle, Users, Plus, UserPlus, LogOut, ArrowLeft } from 'lucide-react'

function AirbnbHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef(null)
    const navigate = useNavigate()
    const location = useLocation()

    const handleBackToPlatforms = () => {
        navigate('/choose-platform')
    }

    // Fermer le menu si on clique en dehors
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false)
            }
        }

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMenuOpen])

    const handleLogout = () => {
        localStorage.removeItem('certification_sandbox_auth')
        navigate('/login')
    }

    return (
        <>
            <header className="font-airbnb bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="w-full px-6 py-6 flex items-center">
                    {/* Logo - tout à gauche */}
                    <div className="flex-shrink-0">
                        <Link to="/airbnb/dashboard" className="flex items-center">
                            <img src="/airbnb-logo.png" alt="Airbnb" className="h-10" />
                        </Link>
                    </div>

                    {/* Navigation centrale - absolument centrée */}
                    <nav className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
                        <Link
                            to="/airbnb/dashboard"
                            className={`font-medium pb-3 border-b-2 transition-colors ${location.pathname === '/airbnb/dashboard'
                                    ? 'text-gray-900 border-gray-900'
                                    : 'text-gray-500 border-transparent hover:text-gray-900'
                                }`}
                        >
                            Aujourd'hui
                        </Link>
                        <Link
                            to="/airbnb/calendrier"
                            className={`font-medium pb-3 border-b-2 transition-colors ${location.pathname === '/airbnb/calendrier'
                                    ? 'text-gray-900 border-gray-900'
                                    : 'text-gray-500 border-transparent hover:text-gray-900'
                                }`}
                        >
                            Calendrier
                        </Link>
                        <Link
                            to="#"
                            className="text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            Annonces
                        </Link>
                        <Link
                            to="#"
                            className="text-gray-500 hover:text-gray-900 transition-colors relative"
                        >
                            Messages
                            <span className="absolute -top-1 -right-2 w-2 h-2 bg-[#FF385C] rounded-full"></span>
                        </Link>
                    </nav>

                    {/* Actions droite - tout à droite */}
                    <div className="ml-auto flex items-center gap-4">
                        <button
                            onClick={() => navigate('/airbnb/home')}
                            className="text-sm font-semibold text-gray-900 hover:text-gray-900 hidden md:block"
                        >
                            Passer en mode voyageur
                        </button>

                        {/* Avatar */}
                        <button className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white text-sm font-semibold hover:opacity-80 transition-opacity">
                            H
                        </button>

                        {/* Menu hamburger */}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="w-10 h-10 border border-gray-300 rounded-full hover:shadow-md transition-shadow flex items-center justify-center"
                        >
                            <Menu className="w-5 h-5 text-gray-700" />
                        </button>

                    </div>
                </div>
            </header>

            {/* Overlay sombre */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 transition-opacity"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}


            {/* Menu latéral coulissant */}
            <div
                ref={menuRef}
                className={`fixed top-0 right-0 h-full w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 rounded-l-3xl ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header du menu */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Bell className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-700" />
                    </button>
                </div>

                {/* Titre */}
                <div className="px-6 py-8">
                    <h2 className="text-4xl font-semibold text-gray-900">Menu</h2>
                </div>

                {/* Items du menu */}
                <nav className="px-6 space-y-1">
                    {/* Item principal avec fond beige */}
                    <Link
                        to="#"
                        className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-start gap-3">
                            <Home className="w-6 h-6 text-gray-700 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-gray-900 mb-1">Créez une annonce</p>
                                <p className="text-sm text-gray-600">
                                    Proposez un logement, une expérience ou un service.
                                </p>
                            </div>
                        </div>
                    </Link>

                    {/* Items simples */}
                    <Link to="#" className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                        <Wallet className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-900">Revenus</span>
                    </Link>

                    <Link to="#" className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                        <BarChart3 className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-900">Points clés</span>
                    </Link>

                    <div className="h-px bg-gray-200 my-4"></div>

                    <Link to="#" className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                        <Settings className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-900">Paramètres du compte</span>
                    </Link>

                    <Link to="#" className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                        <Globe className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-900">Langues et devise</span>
                    </Link>

                    <Link to="#" className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                        <BookOpen className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-900">Ressources pour les hôtes</span>
                    </Link>

                    <Link to="#" className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                        <HelpCircle className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-900">Obtenir de l'aide</span>
                    </Link>

                    <Link to="#" className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                        <Users className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-900">Trouver un co-hôte</span>
                    </Link>

                    <Link to="#" className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                        <Plus className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-900">Créer une annonce</span>
                    </Link>

                    <Link to="#" className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl transition-colors">
                        <UserPlus className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-900">Parrainer un hôte</span>
                    </Link>

                    <div className="h-px bg-gray-200 my-4"></div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 p-4 hover:bg-gray-50 rounded-xl transition-colors w-full text-left"
                    >
                        <LogOut className="w-5 h-5 text-gray-700" />
                        <span className="text-gray-900">Déconnexion</span>
                    </button>
                </nav>
            </div>
        </>
    )
}

export default AirbnbHeader