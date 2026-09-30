import { Link } from 'react-router-dom'
import { Menu, CircleUserRound } from 'lucide-react'

/**
 * En-tête côté voyageur (Rechercher, Publier une annonce, Hôte, Listes, Voyages, Aide).
 * `modeHote` affiche « Mode hôte » à la place de « Hôte », comme sur la page
 * d'une demande de remboursement dans la vraie procédure.
 */
function AirbnbVoyageurHeader({ modeHote = false }) {
    return (
        <header className="border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between px-8 py-4">
                <Link to="/airbnb/dashboard">
                    <img src="/airbnb-logo.png" alt="Airbnb" className="h-8" />
                </Link>
                <nav className="flex items-center gap-6 text-sm font-medium text-gray-900">
                    <span className="hidden md:inline cursor-default">Rechercher</span>
                    <span className="hidden md:inline cursor-default">Publier une annonce</span>
                    <Link to="/airbnb/dashboard" className="hidden md:inline hover:underline">
                        {modeHote ? 'Mode hôte' : 'Hôte'}
                    </Link>
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
