import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Menu, Heart, Star, ChevronRight } from 'lucide-react'
import AirbnbFooter from '../../components/airbnb/AirbnbFooter'

// ─── DATA MOCK ───────────────────────────────────────────────────────────────

const recentListings = [
    {
        id: 1,
        city: 'Paris 1er',
        type: 'Appartement',
        rating: 4.87,
        isNew: false,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    },
    {
        id: 2,
        city: 'Paris 7ème',
        type: 'Appartement',
        rating: 4.95,
        isNew: true,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    },
    {
        id: 3,
        city: 'Paris 11ème',
        type: 'Appartement',
        rating: 4.81,
        isNew: true,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    },
    {
        id: 4,
        city: 'Paris 16ème',
        type: 'Appartement',
        rating: 4.92,
        isNew: false,
        image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop',
    },
    {
        id: 5,
        city: 'Paris 6ème',
        type: 'Studio',
        rating: 4.78,
        isNew: true,
        image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop',
    },
]

const popularListings = [
    {
        id: 1,
        name: 'Appartement · Marais',
        dates: '15-20 févr.',
        guests: '2 adultes',
        price: 89,
        nights: 2,
        rating: 4.94,
        image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=400&h=300&fit=crop',
    },
    {
        id: 2,
        name: 'Appartement · Montmartre',
        dates: '15-20 févr.',
        guests: '2 adultes',
        price: 72,
        nights: 2,
        rating: 4.88,
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&h=300&fit=crop',
    },
    {
        id: 3,
        name: 'Studio · Saint-Germain',
        dates: '15-20 févr.',
        guests: '2 adultes',
        price: 115,
        nights: 2,
        rating: 4.97,
        image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop',
    },
    {
        id: 4,
        name: 'Appartement · Bastille',
        dates: '15-20 févr.',
        guests: '2 adultes',
        price: 65,
        nights: 2,
        rating: 4.79,
        image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=400&h=300&fit=crop',
    },
    {
        id: 5,
        name: 'Loft · Oberkampf',
        dates: '15-20 févr.',
        guests: '2 adultes',
        price: 98,
        nights: 2,
        rating: 4.91,
        image: 'https://images.unsplash.com/photo-1486304873000-235643847519?w=400&h=300&fit=crop',
    },
    {
        id: 6,
        name: 'Appartement · République',
        dates: '15-20 févr.',
        guests: '2 adultes',
        price: 58,
        nights: 2,
        rating: 4.83,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    },
    {
        id: 7,
        name: 'Chambre · Nation',
        dates: '15-20 févr.',
        guests: '1 adulte',
        price: 45,
        nights: 2,
        rating: 4.75,
        image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=300&fit=crop',
    },
]

const weekendListings = [
    {
        id: 1,
        name: 'Appartement · Trocadéro',
        dates: '22-23 févr.',
        guests: '2 adultes',
        price: 134,
        nights: 2,
        rating: 4.96,
        image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    },
    {
        id: 2,
        name: 'Studio · Châtelet',
        dates: '22-23 févr.',
        guests: '2 adultes',
        price: 88,
        nights: 2,
        rating: 4.85,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
    },
    {
        id: 3,
        name: 'Appartement · Pigalle',
        dates: '22-23 févr.',
        guests: '2 adultes',
        price: 74,
        nights: 2,
        rating: 4.82,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    },
    {
        id: 4,
        name: 'Loft · Canal Saint-Martin',
        dates: '22-23 févr.',
        guests: '2 adultes',
        price: 112,
        nights: 2,
        rating: 4.93,
        image: 'https://images.unsplash.com/photo-1587985064135-0366536eab42?w=400&h=300&fit=crop',
    },
    {
        id: 5,
        name: 'Appartement · Invalides',
        dates: '22-23 févr.',
        guests: '2 adultes',
        price: 156,
        nights: 2,
        rating: 4.98,
        image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop',
    },
    {
        id: 6,
        name: 'Studio · Denfert-Rochereau',
        dates: '22-23 févr.',
        guests: '2 adultes',
        price: 67,
        nights: 2,
        rating: 4.77,
        image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop',
    },
    {
        id: 7,
        name: 'Chambre · Belleville',
        dates: '22-23 févr.',
        guests: '1 adulte',
        price: 42,
        nights: 2,
        rating: 4.80,
        image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=400&h=300&fit=crop',
    },
]

// ─── SOUS-COMPOSANTS ──────────────────────────────────────────────────────────

function HeartButton() {
    const [liked, setLiked] = useState(false)
    return (
        <button
            onClick={() => setLiked(!liked)}
            className="absolute top-3 right-3 p-1.5 rounded-full hover:scale-110 transition-transform"
        >
            <Heart
                className={`w-5 h-5 ${liked ? 'fill-[#FF385C] stroke-[#FF385C]' : 'fill-white/60 stroke-white'}`}
            />
        </button>
    )
}

function GuestFavoriteBadge() {
    return (
        <div className="absolute top-3 left-3 bg-white rounded-full px-2.5 py-1 text-xs font-semibold text-gray-800 shadow-sm">
            Coup de cœur voyageurs
        </div>
    )
}

// ─── COMPOSANT PRINCIPAL ──────────────────────────────────────────────────────

function AirbnbHome() {
    const navigate = useNavigate()
    const [searchFocus, setSearchFocus] = useState(null)
    const [destination, setDestination] = useState('')

    return (
        <div className="font-airbnb bg-white min-h-screen flex flex-col">

            {/* ── HEADER ─────────────────────────────────────────────────── */}
            <header className="bg-gray-50 border-b border-gray-200 sticky top-0 z-40">

                {/* Ligne 1 : logo + nav catégories + mode hôte + menu */}
                <div className="max-w-[1400px] mx-auto px-6 pt-4 pb-3 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <img src="/airbnb-logo.png" alt="Airbnb" className="h-8" />
                    </div>

                    {/* Nav catégories (centre) */}
                    <nav className="flex items-center gap-6">
                        <button className="flex flex-col items-center gap-1 group">
                            <div className="flex items-center gap-1.5 text-gray-900">
                                <span className="text-4xl">🏚️</span>
                                <span className="text-sm font-medium">Logements</span>
                            </div>
                            <div className="h-0.5 w-full bg-gray-900 rounded-full"></div>
                        </button>

                        <button className="flex flex-col items-center gap-1 relative group">
                            <div className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 transition-colors">
                                <span className="text-4xl">🎈</span>
                                <span className="text-sm">Expériences</span>
                            </div>
                            <span className="absolute -top-2 -right-6 bg-[#1E3A8A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                                NOUVEAU
                            </span>
                        </button>

                        <button className="flex flex-col items-center gap-1 relative group">
                            <div className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 transition-colors">
                                <span className="text-4xl">🛎️</span>
                                <span className="text-sm">Services</span>
                            </div>
                            <span className="absolute -top-2 -right-6 bg-[#1E3A8A] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                                NOUVEAU
                            </span>
                        </button>
                    </nav>

                    {/* Droite : Mode hôte + icône utilisateur + menu hamburger + retour */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/airbnb/dashboard')}
                            className="text-sm font-semibold text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
                        >
                            Mode hôte
                        </button>

                        {/* Icône utilisateur + menu hamburger */}
                        <div className="flex items-center gap-1 border border-gray-300 rounded-full px-3 py-2 hover:shadow-md transition-shadow cursor-pointer bg-white">
                            <div className="w-7 h-7 bg-gray-700 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                                H
                            </div>
                        </div>
                        {/* Menu hamburger */}
                        <button
                            className="w-10 h-10 border border-gray-300 rounded-full hover:shadow-md transition-shadow flex items-center justify-center"
                        >
                            <Menu className="w-5 h-5 text-gray-700" />
                        </button>

                        {/* Retour aux plateformes */}
                        <button
                            onClick={() => navigate('/choose-platform')}
                            className="text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors"
                        >
                            Retour aux plateformes
                        </button>
                    </div>
                </div>

                {/* Ligne 2 : barre de recherche */}
                <div className="max-w-[1400px] mx-auto px-6 pb-4 flex justify-center">
                    <div className="flex items-center border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow w-full max-w-2xl">

                        {/* Destination */}
                        <div
                            className={`flex-1 px-5 py-3 cursor-pointer rounded-full transition-colors ${searchFocus === 'destination' ? 'bg-white shadow-md' : 'hover:bg-gray-50'}`}
                            onClick={() => setSearchFocus('destination')}
                        >
                            <div className="text-xs font-semibold text-gray-900">Destination</div>
                            <input
                                type="text"
                                placeholder="Rechercher une destination"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className="w-full text-sm text-gray-500 bg-transparent outline-none placeholder-gray-400 mt-0.5"
                                onFocus={() => setSearchFocus('destination')}
                                onBlur={() => setSearchFocus(null)}
                            />
                        </div>

                        <div className="w-px h-8 bg-gray-300"></div>

                        {/* Dates */}
                        <div
                            className={`flex-1 px-5 py-3 cursor-pointer rounded-full transition-colors ${searchFocus === 'dates' ? 'bg-white shadow-md' : 'hover:bg-gray-50'}`}
                            onClick={() => setSearchFocus('dates')}
                        >
                            <div className="text-xs font-semibold text-gray-900">Dates</div>
                            <div className="text-sm text-gray-400 mt-0.5">Quand ?</div>
                        </div>

                        <div className="w-px h-8 bg-gray-300"></div>

                        {/* Voyageurs */}
                        <div
                            className={`flex-1 px-5 py-3 cursor-pointer rounded-full transition-colors ${searchFocus === 'guests' ? 'bg-white shadow-md' : 'hover:bg-gray-50'}`}
                            onClick={() => setSearchFocus('guests')}
                        >
                            <div className="text-xs font-semibold text-gray-900">Voyageurs</div>
                            <div className="text-sm text-gray-400 mt-0.5">Ajouter des...</div>
                        </div>

                        {/* Bouton recherche */}
                        <button className="m-1.5 bg-[#FF385C] text-white p-3 rounded-full hover:bg-[#E61E4D] transition-colors flex-shrink-0">
                            <Search className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </header>

            {/* ── CONTENU PRINCIPAL ──────────────────────────────────────── */}
            <main className="flex-1 max-w-[1400px] mx-auto w-full px-6 py-8">

                {/* Section 1 : Annonces consultées récemment */}
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-1">
                            Annonces consultées récemment
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </h2>
                        <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>

                    <div className="grid grid-cols-5 gap-4">
                        {recentListings.map((listing) => (
                            <div key={listing.id} className="cursor-pointer group">
                                <div className="relative rounded-xl overflow-hidden aspect-square mb-2">
                                    <img
                                        src={listing.image}
                                        alt={listing.city}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <HeartButton />
                                </div>
                                <div className="text-sm font-semibold text-gray-900">{listing.city}</div>
                                <div className="text-sm text-gray-500 flex items-center gap-1">
                                    {listing.isNew ? (
                                        <span>Nouveau</span>
                                    ) : (
                                        <>
                                            <Star className="w-3.5 h-3.5 fill-gray-900 stroke-none" />
                                            <span>{listing.rating}</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 2 : Logements populaires · Paris */}
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-1">
                            Logements populaires · Paris
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </h2>
                        <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>

                    <div className="grid grid-cols-4 gap-5">
                        {popularListings.map((listing) => (
                            <div key={listing.id} className="cursor-pointer group">
                                <div className="relative rounded-xl overflow-hidden mb-2" style={{ aspectRatio: '4/3' }}>
                                    <img
                                        src={listing.image}
                                        alt={listing.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <GuestFavoriteBadge />
                                    <HeartButton />
                                </div>
                                <div className="flex items-start justify-between">
                                    <div className="text-sm font-semibold text-gray-900 leading-tight">{listing.name}</div>
                                    <div className="flex items-center gap-0.5 ml-2 flex-shrink-0">
                                        <Star className="w-3.5 h-3.5 fill-gray-900 stroke-none" />
                                        <span className="text-sm text-gray-900">{listing.rating}</span>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500">{listing.dates}</div>
                                <div className="text-sm text-gray-500">{listing.guests}</div>
                                <div className="text-sm text-gray-900 mt-1">
                                    <span className="font-semibold">{listing.price} €</span>
                                    <span className="text-gray-500"> pour {listing.nights} nuits</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Section 3 : Logements disponibles ce week-end · Paris */}
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-1">
                            Logements disponibles ce week-end · Paris
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </h2>
                        <button className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>

                    <div className="grid grid-cols-4 gap-5">
                        {weekendListings.map((listing) => (
                            <div key={listing.id} className="cursor-pointer group">
                                <div className="relative rounded-xl overflow-hidden mb-2" style={{ aspectRatio: '4/3' }}>
                                    <img
                                        src={listing.image}
                                        alt={listing.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <GuestFavoriteBadge />
                                    <HeartButton />
                                </div>
                                <div className="flex items-start justify-between">
                                    <div className="text-sm font-semibold text-gray-900 leading-tight">{listing.name}</div>
                                    <div className="flex items-center gap-0.5 ml-2 flex-shrink-0">
                                        <Star className="w-3.5 h-3.5 fill-gray-900 stroke-none" />
                                        <span className="text-sm text-gray-900">{listing.rating}</span>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-500">{listing.dates}</div>
                                <div className="text-sm text-gray-500">{listing.guests}</div>
                                <div className="text-sm text-gray-900 mt-1">
                                    <span className="font-semibold">{listing.price} €</span>
                                    <span className="text-gray-500"> pour {listing.nights} nuits</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </main>

            {/* ── FOOTER ─────────────────────────────────────────────────── */}
            <AirbnbFooter />
        </div>
    )
}

export default AirbnbHome