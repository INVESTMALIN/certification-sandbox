import { Globe, Facebook, Instagram } from 'lucide-react'

function AirbnbFooter() {
    return (
        <footer className="font-airbnb bg-gray-50 border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Colonnes principales */}
                <div className="grid grid-cols-3 gap-12 mb-8">
                    {/* Colonne Assistance */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Assistance</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Centre d'aide
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Assistance sécurité
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    AirCover
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Lutte contre la discrimination
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Assistance handicap
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Options d'annulation
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    J'ai un problème de voisinage
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne Accueil de voyageurs */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Accueil de voyageurs</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Mettez votre logement sur Airbnb
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Proposez votre expérience sur Airbnb
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Proposez votre service sur Airbnb
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    AirCover pour les hôtes
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Ressources pour les hôtes
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Forum de la communauté
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Hébergement responsable
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Participez à un cours gratuit pour les hôtes
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Trouver un co-hôte
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Parrainer un hôte
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne Airbnb */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Airbnb</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Édition été 2025
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Newsroom
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Carrières
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Investisseurs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Cartes cadeaux
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-gray-700 hover:underline">
                                    Séjours d'urgence Airbnb.org
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Ligne du bas */}
                <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
                    {/* Gauche - Copyright et liens */}
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                        <span>© 2026 Airbnb, Inc.</span>
                        <span>·</span>
                        <a href="#" className="hover:underline">Confidentialité</a>
                        <span>·</span>
                        <a href="#" className="hover:underline">Conditions générales</a>
                        <span>·</span>
                        <a href="#" className="hover:underline">Fonctionnement du site</a>
                        <span>·</span>
                        <a href="#" className="hover:underline">Infos sur l'entreprise</a>
                    </div>

                    {/* Droite - Langue, devise et réseaux sociaux */}
                    <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 text-sm text-gray-700 hover:underline">
                            <Globe className="w-4 h-4" />
                            Français (FR)
                        </button>
                        <button className="text-sm text-gray-700 hover:underline">
                            € EUR
                        </button>
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-gray-700 hover:text-gray-900">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-700 hover:text-gray-900">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="#" className="text-gray-700 hover:text-gray-900">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default AirbnbFooter