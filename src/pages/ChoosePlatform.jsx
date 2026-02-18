import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function ChoosePlatform() {
    const navigate = useNavigate()

    // Vérifier l'authentification
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('certification_sandbox_auth') === 'true'
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem('certification_sandbox_auth')
        navigate('/login')
    }

    return (
        <div className="relative h-screen w-screen overflow-hidden">
            {/* Bouton déconnexion flottant */}
            <button
                onClick={handleLogout}
                className="absolute top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 rounded-lg transition-all border border-white/20"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Déconnexion
            </button>

            {/* Container split */}
            <div className="flex h-full">
                {/* Côté BOOKING (gauche) */}
                <button
                    onClick={() => navigate('/booking/dashboard')}
                    className="relative w-1/2 bg-gradient-to-br from-[#003580] to-[#0071c2] flex items-center justify-center transition-all duration-500 hover:w-[55%] group overflow-hidden"
                >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '50px 50px'
                        }}></div>
                    </div>

                    {/* Contenu */}
                    <div className="relative z-10 text-center px-12 transform transition-all duration-500 group-hover:scale-110">
                        {/* Logo simulé Booking */}
                        <div className="mb-8">
                            <div className="inline-block px-8 py-4 bg-white rounded-lg shadow-2xl">
                                <span className="text-5xl font-bold text-[#003580]">Booking.com</span>
                            </div>
                        </div>

                        {/* Titre */}
                        <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                            Clone Booking.com
                        </h2>

                        {/* Description */}
                        <p className="text-xl text-white/90 mb-8 max-w-md mx-auto">
                            Extranet propriétaire - Gestion des réservations et établissements
                        </p>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#003580] font-semibold rounded-full shadow-xl transform transition-transform group-hover:scale-105">
                            <span>Accéder à l'interface</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>

                        {/* Icône décorative */}
                        <div className="mt-8 text-white/20 text-6xl">
                            🏨
                        </div>
                    </div>

                    {/* Effet de lumière au hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>



                {/* Côté AIRBNB (droite) */}
                <button
                    onClick={() => navigate('/airbnb/home')}
                    className="relative w-1/2 bg-gradient-to-br from-[#FF385C] to-[#E61E4D] flex items-center justify-center transition-all duration-500 hover:w-[55%] group overflow-hidden"
                >
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '50px 50px'
                        }}></div>
                    </div>

                    {/* Contenu */}
                    <div className="relative z-10 text-center px-12 transform transition-all duration-500 group-hover:scale-110">
                        {/* Logo simulé Airbnb */}
                        <div className="mb-8">
                            <div className="inline-block px-8 py-4 bg-white rounded-lg shadow-2xl">
                                <span className="text-5xl font-bold text-[#FF385C]">Airbnb</span>
                            </div>
                        </div>

                        {/* Titre */}
                        <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                            Clone Airbnb
                        </h2>

                        {/* Description */}
                        <p className="text-xl text-white/90 mb-8 max-w-md mx-auto">
                            Tableau de bord hôte - Gestion des annonces et voyageurs
                        </p>

                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#FF385C] font-semibold rounded-full shadow-xl transform transition-transform group-hover:scale-105">
                            <span>Accéder à l'interface</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>

                        {/* Icône décorative */}
                        <div className="mt-8 text-white/20 text-6xl">
                            🏠
                        </div>
                    </div>

                    {/* Effet de lumière au hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
            </div>

            {/* Titre et info en overlay */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 text-center">
                <h1 className="text-4xl font-bold text-white drop-shadow-2xl mb-2">
                    Certification Sandbox
                </h1>
                <p className="text-white/90 text-sm drop-shadow-lg">
                    Letahost / Invest Malin - Choisissez votre plateforme
                </p>
            </div>

            {/* Disclaimer */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 max-w-4xl px-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 text-center">
                    <p className="text-white text-sm leading-relaxed">
                        <span className="font-semibold">                        <svg className="inline w-4 h-4 mr-1 mb-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg> Environnement de simulation pédagogique</span>
                        <br />
                        Cet outil reproduit les interfaces de Booking.com et Airbnb dans un but pédagogique uniquement.
                        <br />
                        Toutes les données affichées sont fictives.
                        <br />
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ChoosePlatform