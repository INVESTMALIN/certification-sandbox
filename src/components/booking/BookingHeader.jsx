import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function BookingHeader() {
    const location = useLocation()
    const navigate = useNavigate()

    const navItems = [
        { label: "Page d'accueil du groupe", path: '/booking/dashboard' },
        { label: 'Réservations', path: '/booking/reservations' },
        { label: 'Commentaires', path: '/booking/reviews' },
        { label: 'Modifications multiples', path: '#', disabled: true },
        { label: 'Centre Opportunités Groupes', path: '#', disabled: true },
        { label: 'Données relatives au marché', path: '#', disabled: true },
    ]

    const handleBackToPlatforms = () => {
        navigate('/choose-platform')
    }

    return (
        <header className="bg-[#003580]">
            {/* Top bar */}
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 border-b border-[#002855]">
                <div className="flex items-center gap-8">
                    <h1 className="text-white text-2xl font-bold">Booking.com</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-white text-sm">
                        <span>Recherchez des pages et des réservation</span>
                    </div>

                    {/* Flag FR */}
                    <div className="w-8 h-6 rounded overflow-hidden">
                        <div className="flex h-full">
                            <div className="w-1/3 bg-[#002395]"></div>
                            <div className="w-1/3 bg-white"></div>
                            <div className="w-1/3 bg-[#ED2939]"></div>
                        </div>
                    </div>

                    {/* Bouton retour aux plateformes */}
                    <button
                        onClick={handleBackToPlatforms}
                        className="flex items-center gap-2 text-white hover:bg-[#004494] px-3 py-2 rounded transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-sm font-medium">Retour aux plateformes</span>
                    </button>
                </div>
            </div>

            {/* Navigation tabs */}
            <nav className="max-w-7xl mx-auto flex items-center px-6">
                {navItems.map((item, index) => {
                    const isActive = location.pathname === item.path

                    return (
                        <Link
                            key={index}
                            to={item.disabled ? '#' : item.path}
                            className={`
                px-6 py-4 text-sm font-medium border-b-2 transition-colors
                ${isActive
                                    ? 'text-white border-white bg-[#004494]'
                                    : 'text-white/80 border-transparent hover:bg-[#004494]'
                                }
                ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
                            onClick={(e) => item.disabled && e.preventDefault()}
                        >
                            {item.label}
                        </Link>
                    )
                })}
            </nav>
        </header>
    )
}

export default BookingHeader