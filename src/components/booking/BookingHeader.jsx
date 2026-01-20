import { Link, useLocation } from 'react-router-dom'

function BookingHeader() {
    const location = useLocation()

    const navItems = [
        { label: "Page d'accueil du groupe", path: '/booking/dashboard' },
        { label: 'Réservations', path: '/booking/reservations' },
        { label: 'Commentaires', path: '/booking/reviews' },
        { label: 'Modifications multiples', path: '#', disabled: true },
        { label: 'Centre Opportunités Groupes', path: '#', disabled: true },
        { label: 'Données relatives au marché', path: '#', disabled: true },
    ]

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

                    {/* Icons */}
                    <button className="text-white hover:bg-[#004494] p-2 rounded">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>

                    <button className="text-white hover:bg-[#004494] p-2 rounded">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
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
