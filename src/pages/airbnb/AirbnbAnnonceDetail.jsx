import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'
import AirbnbHeader from '../../components/airbnb/AirbnbHeader'
import properties from '../../data/airbnb/properties.json'

// Co-hôtes simulés (identiques pour toutes les annonces dans ce contexte de formation)
const cohotes = [
    {
        id: 'cohost_001',
        name: 'Claudine Podvin',
        role: 'Hôte principal',
        access: 'Accès intégral',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face',
        isMain: true,
    },
    {
        id: 'cohost_002',
        name: 'Arnaud Mathieu Tumerelle',
        role: 'Titulaire de l\'annonce',
        access: null,
        avatar: null,
        isMain: false,
    },
    {
        id: 'cohost_003',
        name: 'Anais Vasselin',
        role: null,
        access: 'Accès au calendrier et aux messages',
        avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=80&h=80&fit=crop',
        isLetahost: true,
        isMain: false,
    },
]

function AvatarCircle({ cohost, size = 'lg' }) {
    const sizeClass = size === 'lg' ? 'w-16 h-16' : 'w-10 h-10'

    if (cohost.isLetahost) {
        return (
            <div className={`${sizeClass} rounded-full overflow-hidden bg-gray-900 flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-bold text-xs tracking-wide">LETAHOST</span>
            </div>
        )
    }

    if (cohost.avatar) {
        return (
            <img
                src={cohost.avatar}
                alt={cohost.name}
                className={`${sizeClass} rounded-full object-cover flex-shrink-0`}
            />
        )
    }

    // Silhouette générique
    return (
        <div className={`${sizeClass} rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0`}>
            <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 text-gray-500 fill-current">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
        </div>
    )
}

function AirbnbAnnonceDetail() {
    const { propertyId } = useParams()
    const navigate = useNavigate()

    const property = properties.find(p => p.propertyId === propertyId)

    if (!property) {
        return (
            <div className="min-h-screen bg-white font-airbnb">
                <AirbnbHeader />
                <div className="max-w-7xl mx-auto px-6 py-16 text-center text-gray-400">
                    Annonce introuvable.
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white font-airbnb">
            <AirbnbHeader />

            <div className="max-w-7xl mx-auto flex gap-0 min-h-[calc(100vh-64px)]">

                {/* ── Panneau gauche ── */}
                <aside className="w-80 border-r border-gray-200 px-6 py-8 flex-shrink-0">
                    {/* Retour */}
                    <button
                        onClick={() => navigate('/airbnb/annonces')}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 -ml-1"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>

                    <h1 className="text-xl font-semibold text-gray-900 leading-snug mb-6">
                        Outil de modification<br />d'annonce
                    </h1>

                    {/* Carte Co-hôtes */}
                    <div className="border border-gray-200 rounded-xl p-4 cursor-default">
                        <p className="text-sm font-medium text-gray-900 mb-3">Co-hôtes</p>
                        <div className="space-y-3">
                            {cohotes.slice(0, 2).map(cohost => (
                                <div key={cohost.id} className="flex items-center gap-3">
                                    <AvatarCircle cohost={cohost} size="sm" />
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-900 leading-tight truncate">{cohost.name}</p>
                                        <p className="text-xs text-gray-500 leading-tight">
                                            {cohost.role || cohost.access}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-[#FF385C] mt-3 font-medium">+ 1 autre</p>
                    </div>
                </aside>

                {/* ── Contenu principal ── */}
                <main className="flex-1 px-10 py-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Co-hôtes</h2>

                    <div className="flex flex-wrap gap-4">
                        {/* Cartes co-hôtes */}
                        {cohotes.map(cohost => (
                            <div
                                key={cohost.id}
                                className="w-44 border border-gray-200 rounded-xl p-4 flex flex-col items-start gap-2 hover:shadow-sm transition-shadow cursor-default"
                            >
                                <AvatarCircle cohost={cohost} size="lg" />
                                <div>
                                    {cohost.isMain && (
                                        <p className="text-xs font-medium text-green-600 mb-0.5">Hôte principal</p>
                                    )}
                                    <p className="text-sm font-semibold text-gray-900 leading-snug">{cohost.name}</p>
                                    {cohost.role && !cohost.isMain && (
                                        <p className="text-xs text-gray-500 mt-0.5">{cohost.role}</p>
                                    )}
                                    {cohost.access && (
                                        <p className="text-xs text-gray-500 mt-0.5">{cohost.access}</p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Carte Inviter */}
                        <div className="w-44 border border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors min-h-[140px]">
                            <div className="w-10 h-10 rounded-full border border-dashed border-gray-400 flex items-center justify-center">
                                <Plus className="w-5 h-5 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-400 text-center leading-snug">Inviter un co-hôte</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AirbnbAnnonceDetail
