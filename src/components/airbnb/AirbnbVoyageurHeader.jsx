import { Link } from 'react-router-dom'
import { Menu, CircleUserRound } from 'lucide-react'

/** En-tête côté voyageur (Publier une annonce, Hôte, Listes, Voyages, Aide). */
function AirbnbVoyageurHeader() {
    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between px-8 py-4">
                <Link to="/airbnb/dashboard">
                    <img src="/airbnb-logo.png" alt="Airbnb" className="h-8" />
                </Link>
                <nav className="flex items-center gap-6 text-sm font-medium text-gray-900">
                    <span className="hidden md:inline cursor-default">Publier une annonce</span>
                    <Link to="/airbnb/dashboard" className="hidden md:inline hover:underline">Hôte</Link>
                    <span className="hidden md:inline cursor-default">Listes</span>
                    <span className="hidden md:inline cursor-default">Voyages</span>
                    <Link to="/airbnb/centre-aide" className="hidden md:inline hover:underline">Aide</Link>
                    <span className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1.5">
                        <Menu className="w-4 h-4" />
                        <CircleUserRound className="w-6 h-6 text-gray-500" />
                    </span>
                </nav>
            </div>
        </header>
    )
}

export default AirbnbVoyageurHeader
