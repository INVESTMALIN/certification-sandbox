import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Settings, Menu, X, ChevronRight, ArrowLeft } from 'lucide-react'

const TABS = [
    { id: 'voyageur', label: 'Voyageur' },
    { id: 'hote', label: 'Hôte d\'un logement', active: true },
    { id: 'experience', label: 'Hôte d\'expérience' },
    { id: 'services', label: 'Hôte de services' },
    { id: 'admin', label: 'Administrateur de voyages' },
]

const RECOMMENDED = [
    {
        tag: 'ACTION REQUISE',
        tagColor: 'text-[#FF385C]',
        title: 'Comment souhaitez-vous recevoir vos paiements ?',
        desc: 'Aucun mode de versement n\'est disponible pour le moment. Ajoutez-en un.',
        cta: 'Ajouter un mode de versement',
    },
    {
        tag: 'LIEN RAPIDE',
        tagColor: 'text-gray-500',
        title: 'Retrouver les détails de la réservation',
        desc: 'Retrouvez toutes vos réservations, actualités et tâches à effectuer dans l\'onglet Aujourd\'hui.',
        cta: 'Accéder à l\'onglet Aujourd\'hui',
    },
]

const GUIDES = [
    {
        img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80',
        title: 'Recevoir des versements en tant que nouvel hôte',
    },
    {
        img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
        title: 'La protection AirCover pour les hôtes',
    },
]

const ARTICLES = [
    {
        title: 'Si le voyageur annule sa réservation',
        desc: 'Si votre voyageur annule sa réservation, vous recevez une notification et votre calendrier...',
    },
    {
        title: 'La protection AirCover pour les hôtes',
        desc: 'AirCover pour les hôtes est une protection complète destinée aux hôtes Airbnb.',
    },
    {
        title: 'Rembourser un voyageur',
        desc: 'La procédure par laquelle les hôtes remboursent les voyageurs est différente...',
    },
    {
        title: 'Annuler une réservation en tant qu\'hôte',
        desc: 'Les voyageurs ou hôtes de profiter de leur séjour, du service et de l\'expérience, mais ne...',
    },
    {
        title: 'Préparez votre logement en l\'équipant de dispositifs de sécurité essentiels',
        desc: 'Installer un détecteur de monoxyde de carbone est une mesure simple qui peut...',
    },
    {
        title: 'Conditions d\'annulation par l\'hôte pour les logements',
        desc: 'Les annulations par l\'hôte peuvent perturber les projets des voyageurs et ternir leur...',
    },
]

const FOOTER_LINKS = {
    'Assistance': ['Centre d\'aide', 'Assistance sécurité', 'AirCover', 'Lutte contre la discrimination', 'Assistance handicap', 'Options d\'annulation', 'J\'ai un problème de voisinage'],
    'Accueil de voyageurs': ['Mettez votre logement sur Airbnb', 'Proposer votre expérience sur Airbnb', 'Proposer votre service sur Airbnb', 'AirCover pour les hôtes', 'Ressources pour les hôtes', 'Forum de la communauté', 'Hébergement responsable', 'Participer à un cours gratuit pour les hôtes', 'Trouver un co-hôte', 'Parrainer un hôte'],
    'Airbnb': ['Édition été 2025', 'Newsroom', 'Carrières', 'Investisseurs', 'Cartes cadeaux', 'Séjours d\'urgence Airbnb.org'],
}

export default function AirbnbCentreAide() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('hote')
    const [searchValue, setSearchValue] = useState('')

    return (
        <div className="min-h-screen bg-white font-airbnb text-gray-900">
            {/* ── TOP BAR */}
            <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="flex items-center gap-2">
                        {/* Airbnb logo */}
                        <svg viewBox="0 0 32 32" className="w-6 h-6 fill-[#FF385C]">
                            <path d="M16 1C7.163 1 0 8.163 0 17c0 4.233 1.612 8.088 4.254 11.003L1 31l3.396-.84A15.93 15.93 0 0016 33c8.837 0 16-7.163 16-16S24.837 1 16 1z" />
                        </svg>
                        <span className="text-sm font-semibold text-gray-900">Centre d'aide</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Settings className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Menu className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white text-xs font-semibold">A</div>
                </div>
            </header>

            {/* ── HERO */}
            <section className="py-14 px-6 text-center bg-white max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold leading-tight mb-8">
                    Bonjour, comment pouvons-nous vous aider ?
                </h1>
                <div className="relative">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                        placeholder="Rechercher des guides pratiques et plus"
                        className="w-full border border-gray-200 rounded-full px-5 py-3 pr-12 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-gray-400 shadow-sm transition-colors"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#FF385C] rounded-full flex items-center justify-center hover:bg-[#e0314f] transition-colors">
                        <Search className="w-4 h-4 text-white" />
                    </button>
                </div>
            </section>

            {/* ── TABS */}
            <div className="border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-6 flex gap-0 overflow-x-auto no-scrollbar">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id
                                ? 'border-gray-900 font-semibold text-gray-900'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10 space-y-12">

                {/* ── RECOMMANDÉ POUR VOUS */}
                <section>
                    <h2 className="text-lg font-semibold mb-4">Recommandé pour vous</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {RECOMMENDED.map((item, i) => (
                            <div key={i} className="border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow cursor-pointer">
                                <p className={`text-[10px] font-bold tracking-wide mb-2 ${item.tagColor}`}>{item.tag}</p>
                                <h3 className="text-sm font-semibold text-gray-900 mb-2 leading-snug">{item.title}</h3>
                                <p className="text-xs text-gray-500 mb-4 leading-relaxed">{item.desc}</p>
                                <div className="flex items-center gap-1 text-xs font-medium text-gray-900 hover:underline">
                                    {item.cta}
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── GUIDES POUR LES HÔTES */}
                <section>
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-lg font-semibold">Guides pour les hôtes</h2>
                        <button className="text-xs font-medium text-gray-900 flex items-center gap-1 hover:underline">
                            Parcourir tous les sujets <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                        {GUIDES.map((guide, i) => (
                            <div key={i} className="cursor-pointer group">
                                <div className="overflow-hidden rounded-2xl mb-3 aspect-video bg-gray-100">
                                    <img
                                        src={guide.img}
                                        alt={guide.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <p className="text-sm font-medium text-gray-900 leading-snug">{guide.title}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── ARTICLES PRINCIPAUX */}
                <section>
                    <h2 className="text-lg font-semibold mb-5">Articles principaux</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                        {ARTICLES.map((article, i) => (
                            <div key={i} className="cursor-pointer">
                                <p className="text-sm font-medium text-[#FF385C] hover:underline mb-1 leading-snug">{article.title}</p>
                                <p className="text-xs text-gray-500 leading-relaxed">{article.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── EN SAVOIR PLUS */}
                <section>
                    <h2 className="text-lg font-semibold mb-5">En savoir plus</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {/* Card 1 */}
                        <div className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-[4/3] col-span-1">
                            <img
                                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80"
                                alt="Politiques"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 p-4">
                                <p className="text-white text-sm font-semibold leading-snug">Les politiques de la communauté</p>
                                <p className="text-white/80 text-xs mt-1">Nos actions pour établir un climat de confiance.</p>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-[4/3] col-span-1">
                            <img
                                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80"
                                alt="Ressources"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                            <div className="absolute bottom-0 p-4">
                                <p className="text-white text-sm font-semibold leading-snug">Ressources et inspiration pour les hôtes</p>
                                <p className="text-white/80 text-xs mt-1">Découvrez des astuces, des conseils pratiques et les dernières actualités.</p>
                            </div>
                        </div>
                        {/* Contact */}
                        <div className="border border-gray-200 rounded-2xl p-5 flex flex-col justify-between">
                            <div>
                                <p className="text-sm font-semibold text-gray-900 mb-2">Besoin de nous joindre ?</p>
                                <p className="text-xs text-gray-500 leading-relaxed mb-4">Commencez par quelques questions afin de mieux vous orienter.</p>
                            </div>
                            <div className="space-y-2">
                                <button className="w-full border border-gray-900 text-gray-900 text-xs font-medium py-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                                    Contactez-nous
                                </button>
                                <p className="text-xs text-gray-500 text-center">
                                    Vous pouvez également{' '}
                                    <button className="text-[#FF385C] underline">nous envoyer vos remarques</button>.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* ── FOOTER */}
            <footer className="border-t border-gray-200 mt-12 bg-white">
                <div className="max-w-4xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                        {Object.entries(FOOTER_LINKS).map(([section, links]) => (
                            <div key={section}>
                                <p className="text-xs font-semibold text-gray-900 mb-3">{section}</p>
                                <ul className="space-y-2">
                                    {links.map(link => (
                                        <li key={link}>
                                            <button className="text-xs text-gray-500 hover:text-gray-900 hover:underline transition-colors text-left">
                                                {link}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-gray-400">© 2026 Airbnb, Inc. · Confidentialité · Conditions générales · Fonctionnement du site · Infos sur l'entreprise</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <button className="hover:underline">Français (FR)</button>
                            <button className="hover:underline">€ EUR</button>
                            <button className="hover:underline">𝕏</button>
                            <button className="hover:underline">f</button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
