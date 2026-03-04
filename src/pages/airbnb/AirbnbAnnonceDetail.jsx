import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
    ArrowLeft, Plus, Minus, Settings, Check, X, ChevronRight, ChevronDown, Eye, MoreHorizontal,
    Wifi, Car, Tv, Droplets, Thermometer, ShieldCheck, TreePine,
    UtensilsCrossed, BedDouble, WashingMachine,
    Accessibility, DoorOpen, Bath, ParkingCircle,
    Flame, Wind, Zap, HeartPulse, Camera,
    Shirt, Trash2, Lightbulb, Lock, Key,
    Clock, Users,
    AlertCircle, Star, Image,
    Utensils, Coffee, Waves, Ruler,
    Info, Link2, Pencil, UserCheck
} from 'lucide-react'
import AirbnbHeader from '../../components/airbnb/AirbnbHeader'
import properties from '../../data/airbnb/properties.json'
import listingDetails from '../../data/airbnb/listingDetails.json'

// ── Co-hôtes (données statiques de formation) ────────────────────────────────
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
        name: 'Jean Dupont',
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

// ── Mapping icônes string → composant Lucide ─────────────────────────────────
const ICON_MAP = {
    Wifi, Car, Tv, Droplets, Thermometer, ShieldCheck, TreePine,
    UtensilsCrossed, BedDouble, WashingMachine,
    Accessibility, DoorOpen, Bath, ParkingCircle,
    Flame, Wind, Zap, HeartPulse, Camera,
    Shirt, Trash2, Lightbulb, Lock, Key,
}

// ── Détails équipements : icône + description par item ───────────────────────
const AMENITY_DETAILS = {
    'Ascenseur dans le bâtiment': { icon: Check },
    'Baignoire': { icon: Bath },
    'Barbecue': { icon: Check },
    'Bureau avec chaise': { icon: Check },
    'Cafetière': { icon: Coffee },
    'Chauffage central': { icon: Thermometer, desc: 'Équipement utilisé pour chauffer un logement.' },
    'Cintres': { icon: Check },
    'Climatisation': { icon: Thermometer, desc: 'Climatisation centrale.' },
    'Couvertures supplémentaires': { icon: BedDouble },
    'Cuisine équipée': { icon: UtensilsCrossed, desc: 'Un espace pour cuisiner des repas avec réfrigérateur, four et surface de cuisson.' },
    'Draps': { icon: BedDouble },
    'Extincteur': { icon: Flame },
    'Fer à repasser': { icon: Check },
    'Gel douche': { icon: Droplets },
    'Lave-linge': { icon: WashingMachine, desc: 'Une machine pour laver les vêtements sales.' },
    'Lave-vaisselle': { icon: Check },
    'Livres et magazines': { icon: Check },
    'Machine Nespresso': { icon: Coffee },
    'Micro-ondes': { icon: Check },
    'Netflix': { icon: Tv },
    'Oreillers supplémentaires': { icon: BedDouble },
    'Parking gratuit sur place': { icon: Car },
    'Prises USB': { icon: Zap },
    'Produits de nettoyage': { icon: Check },
    'Réfrigérateur': { icon: Check },
    'Salon de jardin': { icon: TreePine },
    'Sèche-cheveux': { icon: Wind },
    'Sèche-linge': { icon: WashingMachine },
    'Serrure sur la porte de la chambre': { icon: Lock },
    'Serviettes de bain': { icon: Droplets },
    'Shampoing': { icon: Droplets },
    'Télévision': { icon: Tv },
    'Terrasse': { icon: TreePine },
    'Trousse de premiers secours': { icon: HeartPulse },
    'Ustensiles de cuisine': { icon: Utensils },
    'Ventilateur de plafond': { icon: Wind },
    'Wifi fibre optique': { icon: Wifi },
}

// ── Définition des cartes — "Mon logement" ───────────────────────────────────
const MON_LOGEMENT_CARDS = [
    {
        id: 'photos',
        label: 'Visite photo',
        preview: (d, p) => `${p?.name?.slice(0, 40) || 'Logement'} · ${d.capacity.bedrooms} chambres`,
        hasAlert: true,
    },
    {
        id: 'titre',
        label: 'Titre',
        preview: (d, p) => p?.name || 'Titre de l\'annonce',
    },
    {
        id: 'type',
        label: 'Type de logement',
        preview: (d) => `${d.type.category} · ${d.type.subType}`,
    },
    {
        id: 'voyageurs',
        label: 'Nombre de voyageurs',
        preview: (d) => `${d.capacity.guests} voyageurs`,
    },
    {
        id: 'description',
        label: 'Description',
        preview: (d) => d.description.paragraphs[0].slice(0, 75) + '…',
    },
    {
        id: 'equipements',
        label: 'Équipements',
        previewIcons: (d) => {
            const allItems = d.amenities.categories.flatMap(c => c.items).sort((a, b) => a.localeCompare(b, 'fr'))
            return allItems.slice(0, 3).map(name => ({ icon: (AMENITY_DETAILS[name] || {}).icon || Check, text: name }))
        },
        extra: (d) => `+ ${d.amenities.categories.flatMap(c => c.items).length - 3} autres`,
    },
    {
        id: 'accessibilite',
        label: "Éléments d'accessibilité",
        preview: (d) => d.accessibility.slice(0, 2).map(a => a.label).join(', '),
    },
    {
        id: 'lieu',
        label: 'Lieu',
    },
    {
        id: 'hote',
        label: "À propos de l'hôte",
    },
    {
        id: 'cohotes',
        label: 'Co-hôtes',
    },
    {
        id: 'reservation',
        label: 'Réservation instantanée',
        preview: (d) => d.instantBooking.enabled ? 'Activée : réservation automatique' : 'Désactivée',
    },
    {
        id: 'reglement',
        label: 'Règlement intérieur',
        previewIcons: (d) => [
            { icon: Clock, text: `Arrivée à partir de ${d.rules.checkIn}` },
            { icon: Clock, text: `Départ avant ${d.rules.checkOut}` },
            { icon: Users, text: `${d.rules.maxGuests} voyageurs maximum` },
        ],
    },
    {
        id: 'securite',
        label: 'Sécurité des voyageurs',
        previewIcons: (d) => d.safety.slice(0, 2).map(s => ({
            icon: ICON_MAP[s.icon] || ShieldCheck,
            text: s.present ? `${s.label} installé` : `Aucun ${s.label.toLowerCase()}`,
        })),
    },
    {
        id: 'annulation',
        label: "Conditions d'annulation",
        preview: (d) => d.cancellation.policy,
    },
    {
        id: 'lien',
        label: 'Lien personnalisé',
        preview: (d) => d.customLink.url,
    },
]

// ── Définition des cartes — "Guide d'arrivée" ────────────────────────────────
const GUIDE_CARDS = [
    {
        id: 'horaires',
        isSpecial: true,
        preview: (d) => ({ checkIn: d.guide.horaires.checkIn, checkOut: d.guide.horaires.checkOut }),
    },
    {
        id: 'itineraire',
        label: 'Itinéraire',
        preview: (d) => d.guide.itineraire.slice(0, 80) + '…',
    },
    {
        id: 'procedure',
        label: "Procédure d'arrivée",
        preview: (d) => d.guide.procedure.type,
    },
    {
        id: 'wifi',
        label: 'Informations sur le wifi',
        preview: (d) => `Réseau : ${d.guide.wifi.network}\nMot de passe : ${d.guide.wifi.password}`,
    },
    {
        id: 'manuel',
        label: 'Manuel de la maison',
        preview: () => 'Ajoutez des informations',
    },
    {
        id: 'reglement_guide',
        label: 'Règlement intérieur',
        previewIcons: (d) => [
            { icon: Clock, text: `Arrivée à partir de ${d.rules.checkIn}` },
            { icon: Clock, text: `Départ avant ${d.rules.checkOut}` },
            { icon: Users, text: `${d.rules.maxGuests} voyageurs maximum` },
        ],
        extra: '+ 5 autres',
    },
    {
        id: 'depart',
        label: 'Instructions de départ',
        previewIcons: (d) => d.guide.depart.slice(0, 3).map(item => ({
            icon: ICON_MAP[item.icon] || Key,
            text: item.text,
        })),
        extra: '+ 2 autres',
    },
    {
        id: 'guides',
        label: 'Guides',
    },
    {
        id: 'preferences',
        label: 'Préférences concernant les échanges avec les voyageurs',
        preview: (d) => d.guide.preferences,
    },
]

// ── Sous-composant : avatar co-hôte ──────────────────────────────────────────
function AvatarCircle({ cohost, size = 'lg' }) {
    const cls = size === 'lg' ? 'w-16 h-16' : 'w-9 h-9'
    if (cohost.isLetahost) {
        return (
            <div className={`${cls} rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-bold tracking-wide" style={{ fontSize: size === 'lg' ? 9 : 7 }}>LETAHOST</span>
            </div>
        )
    }
    if (cohost.avatar) {
        return <img src={cohost.avatar} alt={cohost.name} className={`${cls} rounded-full object-cover flex-shrink-0`} />
    }
    return (
        <div className={`${cls} rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0`}>
            <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 text-gray-500 fill-current">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
        </div>
    )
}

// ── En-tête standardisé des panneaux droits ──────────────────────────────────
function PanelHeader({ title, subtitle }) {
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-1">{title}</h2>
            {subtitle && <p className="text-sm text-gray-500 leading-relaxed mt-1">{subtitle}</p>}
        </div>
    )
}

// ── PANNEAUX "Mon logement" ───────────────────────────────────────────────────

function PanelPhotos({ listing }) {
    return (
        <div className="px-8 py-8 max-w-3xl">
            <PanelHeader
                title="Visite photo"
                subtitle="Gérez les photos et ajoutez des informations. Les voyageurs ne verront votre visite photo qu'il y a une photo pour chaque pièce."
            />

            {/* Grille de pièces */}
            <div className="grid grid-cols-2 gap-4">
                {listing.photos.rooms.map(room => (
                    <div key={room.id} className="group relative rounded-2xl overflow-hidden bg-gray-100 cursor-pointer border border-gray-200 hover:border-gray-400 transition-colors">
                        {room.count > 0 ? (
                            <>
                                <img
                                    src={room.photoUrl || `https://images.unsplash.com/photo-${room.photoId}?w=600&h=400&fit=crop`}
                                    alt={room.label}
                                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="p-3">
                                    <p className="text-sm font-medium text-gray-900">{room.label}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{room.count} photo{room.count > 1 ? 's' : ''}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="aspect-[4/3] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 m-2 rounded-xl">
                                    <Image className="w-8 h-8 text-gray-300 mb-2" />
                                    <p className="text-xs text-gray-400">Ajoutez des photos</p>
                                </div>
                                <div className="px-3 pb-3">
                                    <p className="text-sm font-medium text-gray-400">{room.label}</p>
                                    <p className="text-xs text-gray-300 mt-0.5">0 photo</p>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

function PanelTitre({ property, listing }) {
    const titleLen = property?.name?.length || 0
    const internalName = listing?.internalName || '1644'
    return (
        <div className="px-8 py-8 max-w-2xl">
            <PanelHeader title="Titre" />

            {/* Titre public */}
            <div className="border border-gray-300 rounded-xl p-4 bg-white">
                <p className="text-xs text-gray-400 mb-2">Français</p>
                <p className="text-base text-gray-900 leading-snug">{property?.name}</p>
            </div>
            <p className="text-xs text-gray-400 mt-1 text-right">{titleLen}/50</p>

            {/* Nom interne */}
            <div className="border border-gray-300 rounded-xl p-4 bg-white mt-6">
                <p className="text-xs text-gray-400 mb-2">Nom interne</p>
                <p className="text-base text-gray-900 leading-snug">{internalName}</p>
            </div>
            <p className="text-xs text-gray-400 mt-1 text-right">{internalName.length}/40</p>
            <p className="text-xs text-gray-500 mt-2">Le titre interne ne s'affiche que pour vous, les voyageurs ne le voient pas.</p>
        </div>
    )
}

// Dropdown réutilisable pour PanelType
function SelectField({ label, value, options, description }) {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(value)
    return (
        <div>
            {/* Le relative englobe uniquement le trigger + la liste flottante */}
            <div className="relative">
                <div
                    onClick={() => setIsOpen(v => !v)}
                    className={`border rounded-lg px-3 py-2.5 cursor-pointer flex items-center justify-between gap-2 ${isOpen ? 'border-[2px] border-gray-900' : 'border-gray-400'}`}
                >
                    <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-500">{label}</p>
                        <p className="text-sm text-gray-900 mt-0.5">{selected}</p>
                    </div>
                    <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                </div>
                {isOpen && (
                    <div className="absolute left-0 right-0 top-full z-20 bg-white border border-gray-200 rounded-lg shadow-xl mt-0.5 overflow-hidden">
                        {options.map(opt => (
                            <div
                                key={opt}
                                onClick={() => { setSelected(opt); setIsOpen(false) }}
                                className={`px-4 py-3 cursor-pointer text-sm ${opt === selected ? 'bg-[#1a56db] text-white font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                                {opt}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {description && (
                <p className="text-xs text-gray-500 mt-2 leading-snug">{description}</p>
            )}
        </div>
    )
}

function PanelType() {
    const [floors, setFloors] = useState(1)
    const [floor, setFloor] = useState(1)
    return (
        <div className="px-8 py-8 max-w-xl">
            <PanelHeader title="Type de logement" />
            <div className="space-y-5">
                <SelectField
                    label="Quelle catégorie correspond le mieux à votre logement ?"
                    value="Appartement"
                    options={['Appartement', 'Maison', 'Annexe', 'Logement unique', "Chambre d'hôtes", 'Autre logement non résidentiel']}
                />
                <SelectField
                    label="Type de logement"
                    value="Appartement"
                    options={['Appartement', 'Appartement en résidence', 'Résidence de tourisme', 'Loft']}
                    description="Un logement loué dans un immeuble résidentiel comprenant plusieurs logements, ou dans un complexe."
                />
                <SelectField
                    label="Type d'annonce"
                    value="Logement entier"
                    options={['Logement entier', 'Chambre', 'Chambre partagée']}
                    description="Les voyageurs disposent du logement dans son intégralité. Le logement entier comprend généralement une chambre, une salle de bain et une cuisine."
                />

                {/* Nombre d'étages dans l'immeuble */}
                <div className="flex items-center justify-between py-1">
                    <p className="text-sm text-gray-900">Combien y a-t-il d'étages dans l'immeuble ?</p>
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <button onClick={() => setFloors(f => Math.max(1, f - 1))} className="w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center text-sm text-gray-600 hover:border-gray-700">−</button>
                        <span className="text-sm w-4 text-center font-medium">{floors}</span>
                        <button onClick={() => setFloors(f => f + 1)} className="w-7 h-7 rounded-full border border-[#FF385C] flex items-center justify-center text-sm text-gray-900 hover:bg-red-50">+</button>
                    </div>
                </div>

                {/* Étage du logement */}
                <div className="flex items-center justify-between py-1">
                    <p className="text-sm text-gray-900">À quel étage se situe le logement ?</p>
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <button onClick={() => setFloor(f => Math.max(0, f - 1))} className="w-7 h-7 rounded-full border border-gray-400 flex items-center justify-center text-sm text-gray-600 hover:border-gray-700">−</button>
                        <span className="text-sm w-4 text-center font-medium">{floor}</span>
                        <button onClick={() => setFloor(f => f + 1)} className="w-7 h-7 rounded-full border border-[#FF385C] flex items-center justify-center text-sm text-gray-900 hover:bg-red-50">+</button>
                    </div>
                </div>

                {/* Année de construction */}
                <input
                    type="text"
                    placeholder="Année de construction"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-900"
                />

                {/* Taille + Unité */}
                <div className="flex gap-3">
                    <div className="relative w-36 border border-gray-400 rounded-lg px-3 py-2.5 flex-shrink-0">
                        <p className="text-xs text-gray-500">Taille du logement</p>
                        <input
                            type="text"
                            defaultValue="71"
                            className="w-full text-sm text-gray-900 focus:outline-none mt-0.5 bg-transparent"
                        />
                    </div>
                    <div className="flex-1">
                        <SelectField
                            label="Unité"
                            value="Mètres carrés"
                            options={['Mètres carrés', 'Pieds carrés']}
                        />
                    </div>
                </div>
                <p className="text-xs text-gray-500 -mt-1">La surface de l'espace intérieur disponible pour les voyageurs.</p>

                {/* Ma catégorie */}
                <div className="pt-4 mt-2 border-t border-gray-200">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">Ma catégorie</h3>
                    <p className="text-xs text-blue-600 leading-relaxed mb-4">
                        Les catégories aident les voyageurs à trouver des hébergements uniques. Pour faire partie d'une catégorie, une annonce doit répondre à certains critères.{' '}
                        <span className="underline cursor-pointer font-medium">En savoir plus</span>
                    </p>
                    <div className="border border-gray-200 rounded-lg p-8 flex items-center justify-center">
                        <p className="text-sm text-gray-400 text-center">Votre annonce ne fait pas encore partie d'une catégorie.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PanelVoyageurs({ listing }) {
    const [guests, setGuests] = useState(listing.capacity.guests)
    return (
        <div className="flex flex-col items-center justify-center h-full py-12">
            <img
                src="/nb-voyageurs.png"
                alt="Voyageurs"
                className="w-52 mb-8 object-contain"
            />
            <p className="text-center text-lg text-gray-800 mb-10 max-w-xs leading-snug px-4">
                Combien de voyageurs pouvez-vous accueillir confortablement dans votre logement ?
            </p>
            <div className="flex items-center gap-12">
                <button
                    onClick={() => setGuests(g => Math.max(1, g - 1))}
                    className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center text-xl text-gray-700 hover:border-gray-900 transition-colors"
                >
                    −
                </button>
                <span className="text-8xl font-bold text-gray-900 w-32 text-center tabular-nums">{guests}</span>
                <button
                    onClick={() => setGuests(g => g + 1)}
                    className="w-12 h-12 rounded-full border border-gray-400 flex items-center justify-center text-xl text-gray-700 hover:border-gray-900 transition-colors"
                >
                    +
                </button>
            </div>
        </div>
    )
}

function PanelDescription({ listing, onHideAside }) {
    const DESCRIPTION_SECTIONS = [
        { id: 'logement', label: 'Description du logement', text: listing.description.paragraphs[0] },
        { id: 'monLogement', label: 'Mon logement', text: listing.description.paragraphs[1] },
        { id: 'acces', label: 'Accès des voyageurs', text: listing.description.paragraphs[2] },
        { id: 'echanges', label: 'Échanges avec les voyageurs', text: '' },
        { id: 'autres', label: 'Autres informations à noter', text: '' },
    ]
    const [selectedSection, setSelectedSection] = useState(null)

    const handleSelectSection = (section) => {
        setSelectedSection(section)
        onHideAside?.(true)
    }
    const handleBack = () => {
        setSelectedSection(null)
        onHideAside?.(false)
    }

    if (selectedSection) {
        const charsLeft = 500 - (selectedSection.text?.length || 0)
        return (
            <div className="flex h-full">
                {/* Sous-colonne gauche — liste des sections */}
                <div className="w-[300px] flex-shrink-0 border-r border-gray-200 overflow-y-auto">
                    <div className="px-5 py-4 border-b border-gray-200">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Description
                        </button>
                    </div>
                    <div>
                        {DESCRIPTION_SECTIONS.map(section => (
                            <button
                                key={section.id}
                                onClick={() => setSelectedSection(section)}
                                className={`w-full text-left px-5 py-4 border-l-2 transition-colors ${selectedSection.id === section.id
                                    ? 'bg-gray-50 border-l-gray-900'
                                    : 'border-l-transparent hover:bg-gray-50'
                                    }`}
                            >
                                <p className="text-sm font-semibold text-gray-900">{section.label}</p>
                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-snug">
                                    {section.text || 'Ajoutez des informations'}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
                {/* Sous-colonne droite — éditeur */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto px-8 py-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-1">{selectedSection.label}</h2>
                        <p className="text-xs text-gray-500 mb-6">Caractères restants : {charsLeft}/500</p>
                        <div className="border border-gray-300 rounded-xl p-4 bg-white min-h-[160px]">
                            {selectedSection.text
                                ? <p className="text-sm text-gray-700 leading-relaxed">{selectedSection.text}</p>
                                : <p className="text-sm text-gray-400 italic">Aucune description pour le moment.</p>
                            }
                        </div>
                    </div>
                    <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-end gap-3 bg-white">
                        <button
                            onClick={handleBack}
                            className="text-sm font-medium text-gray-900 underline hover:text-gray-600 transition-colors"
                        >
                            Annuler
                        </button>
                        <button disabled className="px-5 py-2.5 bg-gray-200 text-gray-400 text-sm font-medium rounded-xl cursor-not-allowed">
                            Enregistrer
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Vue liste par défaut
    return (
        <div className="px-8 py-8 max-w-2xl">
            <PanelHeader title="Description" />
            <div className="overflow-hidden divide-y divide-gray-200">
                {DESCRIPTION_SECTIONS.map(section => (
                    <button
                        key={section.id}
                        onClick={() => handleSelectSection(section)}
                        className="w-full text-left px-5 py-4 hover:bg-gray-50 flex items-start justify-between gap-3 transition-colors"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900">{section.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-snug">
                                {section.text || 'Ajoutez des informations'}
                            </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    </button>
                ))}
            </div>
        </div>
    )
}

function PanelEquipements({ listing }) {
    const allItems = listing.amenities.categories
        .flatMap(cat => cat.items)
        .sort((a, b) => a.localeCompare(b, 'fr'))
    return (
        <div className="px-8 py-8 max-w-2xl">
            {/* Header avec boutons Modifier et + */}
            <div className="flex items-start justify-between mb-1">
                <h2 className="text-2xl font-semibold text-gray-900">Équipements</h2>
                <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                    <button className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-full hover:bg-gray-50 transition-colors">
                        Modifier
                    </button>
                    <button className="w-7 h-7 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                        <Plus className="w-3.5 h-3.5 text-gray-700" />
                    </button>
                </div>
            </div>
            <p className="text-sm text-gray-500 mb-6">Vous avez ajouté ces équipements à votre annonce.</p>

            {/* Liste plate alphabétique */}
            <div>
                {allItems.map(name => {
                    const details = AMENITY_DETAILS[name] || {}
                    const Icon = details.icon || Check
                    return (
                        <div key={name} className="flex items-start gap-4 py-3 border-b border-gray-100 last:border-0">
                            <Icon className="w-5 h-5 text-gray-700 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-gray-900">{name}</p>
                                {details.desc && (
                                    <p className="text-xs text-gray-500 mt-0.5 leading-snug">{details.desc}</p>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {/* Non inclus */}
            {listing.amenities.notIncluded.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">Non disponibles dans ce logement</h3>
                    {listing.amenities.notIncluded.map(name => (
                        <div key={name} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                            <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                            <p className="text-sm text-gray-400 line-through">{name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

const ACCESSIBILITY_ITEMS = [
    { icon: ParkingCircle, label: 'Stationnement réservé aux personnes handicapées' },
    { icon: Lightbulb, label: 'Accès bien éclairé jusqu\'à l\'entrée' },
    { icon: DoorOpen, label: 'Accès de plain-pied' },
    { icon: Ruler, label: 'Largeur de l\'entrée des voyageurs supérieure à 81 centimètres' },
    { icon: Waves, label: 'Lève-personne pour la piscine ou le jacuzzi' },
    { icon: Accessibility, label: 'Lève-personne mobile ou fixé au plafond' },
]

function PanelAccessibilite() {
    return (
        <div className="px-8 py-8 max-w-2xl">
            <PanelHeader title="Éléments d'accessibilité" />
            <div className="divide-y divide-gray-100">
                {ACCESSIBILITY_ITEMS.map(item => (
                    <div key={item.label} className="flex items-center justify-between py-5">
                        <div className="flex items-center gap-4">
                            <item.icon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-900">{item.label}</span>
                        </div>
                        <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0 hover:bg-gray-50 transition-colors">
                            <Plus className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ── Toggle switch réutilisable ─────────────────────────────────────────────────
function ToggleSwitch({ defaultOn = false }) {
    const [on, setOn] = useState(defaultOn)
    return (
        <button
            onClick={() => setOn(v => !v)}
            className={`w-12 h-6 rounded-full flex-shrink-0 relative transition-colors duration-200 ${on ? 'bg-gray-900' : 'bg-gray-300'}`}
        >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${on ? 'right-1' : 'left-1'}`} />
        </button>
    )
}

// ── Sous-panneaux Lieu ─────────────────────────────────────────────────────────
function LieuAdresse({ property, onBack }) {
    // Décompose l'adresse: "Étoile du matin, 6 All. des Sports, 44420 La Turballe, France"
    const rawAddr = property?.address?.split('|')[0]?.trim() || ''
    // Tente d'extraire: nom, rue, CP + ville
    const parts = rawAddr.split(',').map(s => s.trim())
    const nomBatiment = parts[0] || ''
    const rue = parts.slice(0, 2).join(', ')
    const cpVille = parts[2] || ''
    const cpMatch = cpVille.match(/^(\d{5})\s+(.+)$/)
    const codePostal = cpMatch ? cpMatch[1] : '44420'
    const commune = cpMatch ? cpMatch[2] : 'La Turballe'

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-8 py-8 max-w-2xl">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">Adresse</h2>
                {/* Formulaire Airbnb style — blocs groupés */}
                <div className="border border-gray-300 rounded-xl overflow-hidden">
                    {/* Champ 1 — vide */}
                    <div className="px-4 py-3 border-b border-gray-300">
                        <p className="text-xs text-gray-400">Bâtiment, appartement, résidence, étage (si applicable)</p>
                    </div>
                    {/* Champ 2 — vide */}
                    <div className="px-4 py-3 border-b border-gray-300">
                        <p className="text-xs text-gray-400">Nom du bâtiment (si applicable)</p>
                    </div>
                    {/* Champ 3 — Numéro et libellé de voie */}
                    <div className="px-4 py-3 border-b border-gray-300">
                        <p className="text-xs text-gray-900 mb-0.5">Numéro et libellé de voie</p>
                        <p className="text-sm text-gray-900 font-medium">{rue}</p>
                    </div>
                    {/* Champ 4 — Code postal */}
                    <div className="px-4 py-3 border-b border-gray-300">
                        <p className="text-xs text-gray-900 mb-0.5">Code postal</p>
                        <p className="text-sm text-gray-900 font-medium">{codePostal}</p>
                    </div>
                    {/* Champ 5 — Commune */}
                    <div className="px-4 py-3">
                        <p className="text-xs text-gray-900 mb-0.5">Commune</p>
                        <p className="text-sm text-gray-900 font-medium">{commune}</p>
                    </div>
                </div>
            </div>
            {/* Footer */}
            <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-between bg-white">
                <button onClick={onBack} className="text-sm font-medium text-gray-900 underline hover:text-gray-600">Annuler</button>
                <button className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors">Enregistrer</button>
            </div>
        </div>
    )
}

function LieuPartage({ property, onBack }) {
    const rawAddr = property?.address?.split('|')[0]?.trim() || ''
    const encodedAddr = encodeURIComponent(rawAddr)
    const mapSrc = `https://maps.google.com/maps?q=${encodedAddr}&output=embed&z=11`

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-8 py-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">Partage de l'emplacement</h2>
                {/* Toggle */}
                <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 mb-1">Indiquez l'emplacement précis de votre logement</p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Autorisez les voyageurs à voir l'emplacement exact de votre{' '}
                            <span className="text-gray-900">logement sur la carte avant de réserver</span>. Votre adresse
                            complète ne sera pas communiquée tant que la réservation n'est pas confirmée.{' '}
                            <span className="text-gray-900 underline cursor-pointer">En savoir plus</span>
                        </p>
                    </div>
                    <ToggleSwitch defaultOn={false} />
                </div>
                {/* Map embed */}
                <div className="rounded-xl overflow-hidden border border-gray-200 h-64 relative">
                    <iframe
                        title="map-partage"
                        src={mapSrc}
                        className="w-full h-full border-0"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    {/* Tooltip overlay like Airbnb */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
                        <div className="bg-white rounded-lg shadow-lg px-3 py-2 text-xs text-gray-800 font-medium whitespace-nowrap">
                            Nous communiquerons votre<br />emplacement approximatif
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-between bg-white">
                <button onClick={onBack} className="text-sm font-medium text-gray-900 underline hover:text-gray-600">Annuler</button>
                <button className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors">Enregistrer</button>
            </div>
        </div>
    )
}

function LieuCaracteristiques({ onBack }) {
    const items = [
        { label: 'Accès à la plage', desc: 'Les voyageurs peuvent profiter d\'une plage à proximité', defaultOn: false },
        { label: 'Accès au lac', desc: 'Les voyageurs peuvent se rendre à un lac en empruntant un sentier ou un quai', defaultOn: false },
        { label: 'Laverie automatique à proximité', desc: null, defaultOn: false },
        { label: 'Entrée privée', desc: 'Une entrée réservée aux voyageurs.', defaultOn: false },
        { label: 'Accès au complexe hôtelier', desc: 'Les voyageurs peuvent utiliser les installations du complexe à proximité', defaultOn: false },
        { label: 'Au pied des pistes', desc: 'Les voyageurs peuvent accéder aux remontées mécaniques sans prendre de transport.', defaultOn: false },
        { label: 'Au bord de l\'eau', desc: 'Un logement situé à côté d\'un plan d\'eau.', defaultOn: false },
    ]
    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-8 py-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">Caractéristiques de l'emplacement</h2>
                <div>
                    {items.map((item, i) => (
                        <div key={i} className={`flex items-start justify-between py-5 ${i < items.length - 1 ? 'border-b border-gray-100' : ''}`}>
                            <div className="flex-1 mr-4">
                                <p className="text-sm font-medium text-gray-900">{item.label}</p>
                                {item.desc && <p className="text-xs text-gray-500 mt-0.5 leading-snug">{item.desc}</p>}
                            </div>
                            <ToggleSwitch defaultOn={item.defaultOn} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-between bg-white">
                <button onClick={onBack} className="text-sm font-medium text-gray-900 underline hover:text-gray-600">Annuler</button>
                <button className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors">Enregistrer</button>
            </div>
        </div>
    )
}

function LieuDescriptionQuartier({ listing, onBack }) {
    const text = listing?.location?.neighborhood || 'Profitez de la sérénité d\'un quartier résidentiel, parfait pour se ressourcer après vos journées.\n\nLa sécurité et la tranquillité sont au rendez-vous, avec une vue dégagée pour agrémenter votre séjour.'
    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-8 py-8 max-w-2xl">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">Description du quartier</h2>
                <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-line">{text}</p>
            </div>
            <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-between bg-white">
                <button onClick={onBack} className="text-sm font-medium text-gray-900 underline hover:text-gray-600">Annuler</button>
                <button disabled className="px-5 py-2.5 bg-gray-200 text-gray-400 text-sm font-medium rounded-xl cursor-not-allowed">Enregistrer</button>
            </div>
        </div>
    )
}

function LieuSeDeplacer({ listing, onBack }) {
    const text = listing?.location?.transport || 'Un quartier pensé pour le calme et la praticité, idéal à découvrir à pied ou à vélo pour rejoindre commerces, parcs ou services...'
    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-8 py-8 max-w-2xl">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">Se déplacer</h2>
                <p className="text-sm text-gray-900 leading-relaxed">{text}</p>
            </div>
            <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-between bg-white">
                <button onClick={onBack} className="text-sm font-medium text-gray-900 underline hover:text-gray-600">Annuler</button>
                <button disabled className="px-5 py-2.5 bg-gray-200 text-gray-400 text-sm font-medium rounded-xl cursor-not-allowed">Enregistrer</button>
            </div>
        </div>
    )
}

function LieuVuesPanoramiques({ onBack }) {
    const VUES = [
        'Vue sur la baie', 'Vue sur la plage', 'Vue sur le canal', 'Vue panoramique sur la ville',
        'Vue sur la cour', 'Vue sur le désert', 'Vue sur le jardin', 'Vue sur un parcours de golf',
        'Vue sur le port', 'Vue sur le lac', 'Vue sur le port de plaisance', 'Vue sur la montagne',
        'Vue sur l\'océan', 'Vue sur le parc', 'Vue sur la piscine', 'Vue sur le complexe hôtelier',
        'Vue sur la rivière', 'Vue sur la mer', 'Vue sur la vallée', 'Vue sur le vignoble',
    ]
    const [checked, setChecked] = useState({})
    const toggle = (v) => setChecked(prev => ({ ...prev, [v]: !prev[v] }))
    const hasAny = Object.values(checked).some(Boolean)

    return (
        <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-8 py-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">Vues panoramiques</h2>
                <div className="space-y-4">
                    {VUES.map(vue => (
                        <label key={vue} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={!!checked[vue]}
                                onChange={() => toggle(vue)}
                                className="hidden"
                            />
                            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${checked[vue] ? 'bg-[#FF385C] border-[#FF385C]' : 'border-gray-300 bg-white group-hover:border-gray-400'}`}>
                                {checked[vue] && <Check className="w-3 h-3 text-white" />}
                            </div>
                            <span className="text-sm text-gray-900">{vue}</span>
                        </label>
                    ))}
                </div>
            </div>
            <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-end bg-white">
                <button
                    disabled={!hasAny}
                    className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-colors ${hasAny ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                    Enregistrer
                </button>
            </div>
        </div>
    )
}

// ── Panel principal Lieu ───────────────────────────────────────────────────────
function PanelLieu({ listing, property, onHideAside }) {
    const LIEU_SECTIONS = [
        {
            id: 'adresse',
            label: 'Adresse',
            preview: (prop) => prop?.address?.split('|')[0]?.trim() || 'Ajoutez des informations',
        },
        {
            id: 'partage',
            label: 'Partage de l\'emplacement',
            preview: () => 'Affichez l\'emplacement général du logement',
        },
        {
            id: 'caracteristiques',
            label: 'Caractéristiques de l\'emplacement',
            preview: () => 'Ajoutez des informations',
        },
        {
            id: 'quartier',
            label: 'Description du quartier',
            preview: (_, lst) => lst?.location?.neighborhood
                ? lst.location.neighborhood.slice(0, 80) + '...'
                : 'Profitez de la sérénité d\'un quartier résidentiel, parfait pour se ressourcer après vos journées. La sécurité et la tranquillité sont...',
        },
        {
            id: 'deplacement',
            label: 'Se déplacer',
            preview: (_, lst) => lst?.location?.transport
                ? lst.location.transport.slice(0, 80) + '...'
                : 'Un quartier pensé pour le calme et la praticité, idéal à découvrir à pied ou à vélo pour rejoindre commerces, parcs ou services...',
        },
        {
            id: 'vues',
            label: 'Vues panoramiques',
            preview: () => 'Ajoutez des informations',
        },
    ]

    const [selectedSection, setSelectedSection] = useState(null)

    const handleSelectSection = (section) => {
        setSelectedSection(section)
        onHideAside?.(true)
    }
    const handleBack = () => {
        setSelectedSection(null)
        onHideAside?.(false)
    }

    // ── Vue imbriquée ──────────────────────────────────────────────────────────
    if (selectedSection) {
        const rawAddr = property?.address?.split('|')[0]?.trim() || ''
        const encodedAddr = encodeURIComponent(rawAddr)
        const mapSrc = `https://maps.google.com/maps?q=${encodedAddr}&output=embed&z=13`

        const renderSubPanel = () => {
            switch (selectedSection.id) {
                case 'adresse': return <LieuAdresse property={property} onBack={handleBack} />
                case 'partage': return <LieuPartage property={property} onBack={handleBack} />
                case 'caracteristiques': return <LieuCaracteristiques onBack={handleBack} />
                case 'quartier': return <LieuDescriptionQuartier listing={listing} onBack={handleBack} />
                case 'deplacement': return <LieuSeDeplacer listing={listing} onBack={handleBack} />
                case 'vues': return <LieuVuesPanoramiques onBack={handleBack} />
                default: return null
            }
        }

        return (
            <div className="flex h-full">
                {/* Sous-colonne gauche */}
                <div className="w-[300px] flex-shrink-0 border-r border-gray-200 overflow-y-auto flex flex-col">
                    {/* Bouton retour */}
                    <div className="px-5 py-4 border-b border-gray-200 flex-shrink-0">
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Lieu
                        </button>
                    </div>
                    {/* Mini-carte */}
                    <div className="h-36 flex-shrink-0 overflow-hidden">
                        <iframe
                            title="map-aside"
                            src={mapSrc}
                            className="w-full h-full border-0 pointer-events-none"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                    {/* Liste des sections */}
                    <div className="flex-1">
                        {LIEU_SECTIONS.map(section => (
                            <button
                                key={section.id}
                                onClick={() => setSelectedSection(section)}
                                className={`w-full text-left px-5 py-4 border-l-2 transition-colors ${selectedSection.id === section.id
                                    ? 'bg-gray-50 border-l-gray-900'
                                    : 'border-l-transparent hover:bg-gray-50'
                                    }`}
                            >
                                <p className="text-sm font-semibold text-gray-900">{section.label}</p>
                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-snug">
                                    {section.preview(property, listing)}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
                {/* Sous-colonne droite — contenu du sous-panneau */}
                {renderSubPanel()}
            </div>
        )
    }

    // ── Vue principale Lieu ────────────────────────────────────────────────────
    const rawAddr = property?.address?.split('|')[0]?.trim() || ''
    const encodedAddr = encodeURIComponent(rawAddr)
    const mapSrc = `https://maps.google.com/maps?q=${encodedAddr}&output=embed&z=13`

    return (
        <div className="px-8 py-8 max-w-2xl">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Lieu</h2>

            {/* Google Maps embed */}
            <div className="rounded-xl overflow-hidden border border-gray-200 mb-6 h-56 relative">
                <iframe
                    title="map-lieu"
                    src={mapSrc}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
                <button className="absolute top-3 right-3 bg-white text-xs font-medium text-gray-800 px-3 py-1.5 rounded shadow-md hover:bg-gray-50 transition-colors">
                    Ajuster
                </button>
            </div>

            {/* Bannière "Faites vérifier" - inactive */}
            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 mb-6 opacity-60 cursor-default">
                <AlertCircle className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <p className="text-sm text-gray-600">Faites vérifier l'emplacement de votre logement</p>
            </div>

            {/* 6 sections cliquables */}
            <div className="divide-y divide-gray-200">
                {LIEU_SECTIONS.map(section => (
                    <button
                        key={section.id}
                        onClick={() => handleSelectSection(section)}
                        className="w-full text-left px-0 py-4 hover:bg-gray-50 flex items-start justify-between gap-3 transition-colors"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900">{section.label}</p>
                            <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 leading-snug">
                                {section.preview(property, listing)}
                            </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    </button>
                ))}
            </div>
        </div>
    )
}

function PanelHote({ property }) {
    return (
        <div className="px-8 py-8 max-w-2xl">
            <PanelHeader title="À propos de l'hôte" subtitle="Présentez-vous pour instaurer la confiance avec vos voyageurs." />
            <div className="flex flex-col items-center text-center py-6">
                <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center text-white text-2xl font-bold mb-3">
                    C
                </div>
                <p className="text-base font-semibold text-gray-900">Claudine Podvin</p>
                <p className="text-sm text-gray-500 mt-1">Hôte depuis {property?.hostSince || '2018'}</p>
                <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 text-gray-900 fill-gray-900" />
                    <span className="text-sm font-medium text-gray-900">Superhôte</span>
                </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                    Passionnée par l'accueil et les voyages, je mets tout en œuvre pour que votre séjour soit mémorable. N'hésitez pas à me contacter pour toute question !
                </p>
            </div>
            <button className="mt-6 text-sm font-medium text-gray-900 underline hover:text-gray-700">Modifier mon profil</button>
        </div>
    )
}

function PanelCohotes() {
    return (
        <div className="px-8 py-8 max-w-2xl">
            <PanelHeader title="Co-hôtes" subtitle="Les co-hôtes peuvent vous aider à gérer votre logement." />
            <div className="flex flex-wrap gap-4">
                {cohotes.map(cohost => (
                    <div key={cohost.id} className="w-44 border border-gray-200 rounded-xl p-4 flex flex-col items-start gap-2 hover:shadow-sm transition-shadow cursor-default">
                        <AvatarCircle cohost={cohost} size="lg" />
                        <div>
                            {cohost.isMain && <p className="text-xs font-medium text-green-600 mb-0.5">Hôte principal</p>}
                            <p className="text-sm font-semibold text-gray-900 leading-snug">{cohost.name}</p>
                            {cohost.role && !cohost.isMain && <p className="text-xs text-gray-500 mt-0.5">{cohost.role}</p>}
                            {cohost.access && <p className="text-xs text-gray-500 mt-0.5">{cohost.access}</p>}
                        </div>
                    </div>
                ))}
                <div className="w-44 border border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors min-h-[140px]">
                    <div className="w-10 h-10 rounded-full border border-dashed border-gray-400 flex items-center justify-center">
                        <Plus className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-400 text-center leading-snug">Inviter un co-hôte</p>
                </div>
            </div>
        </div>
    )
}

function PanelReservationInstant() {
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')
    const charsLeft = 400 - message.length

    if (showMessage) {
        return (
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto px-8 py-8 max-w-2xl">
                    <h2 className="text-3xl font-semibold text-gray-900 mb-6 leading-snug">
                        Message préalable à la réservation
                    </h2>
                    <p className="text-sm text-gray-500 mb-3">Caractères restants : {charsLeft}/400</p>
                    <textarea
                        value={message}
                        onChange={e => setMessage(e.target.value.slice(0, 400))}
                        placeholder="Par exemple : Bonjour ! Indiquez-moi quand vous pensez arriver et ajoutez quelques mots sur votre voyage."
                        className="w-full min-h-[160px] text-sm text-gray-900 placeholder-gray-900 placeholder-opacity-70 border-0 outline-none resize-none leading-relaxed"
                    />
                </div>
                <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-between bg-white">
                    <button
                        onClick={() => setShowMessage(false)}
                        className="text-sm font-medium text-gray-900 underline hover:text-gray-600"
                    >
                        Annuler
                    </button>
                    <button
                        disabled={!message.trim()}
                        className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-colors ${message.trim() ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    >
                        Enregistrer
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto px-8 py-8 max-w-2xl">
                <h2 className="text-2xl font-semibold text-gray-900 mb-8">Réservation instantanée</h2>

                {/* Toggle principal */}
                <div className="flex items-start justify-between gap-6 mb-10">
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900 mb-1">Utiliser la réservation instantanée</p>
                        <p className="text-xs text-gray-900 leading-relaxed">
                            Activez cette option pour accepter automatiquement les réservations. Désactivez cette option pour
                            accepter ou refuser manuellement les demandes de réservation.
                        </p>
                    </div>
                    {/* Toggle ON avec checkmark comme sur le screen */}
                    <div className="w-12 h-6 rounded-full bg-gray-900 flex-shrink-0 relative cursor-pointer flex items-center justify-end pr-1">
                        <div className="w-4 h-4 rounded-full bg-white shadow flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-gray-900" />
                        </div>
                    </div>
                </div>

                {/* Section Paramètres facultatifs */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Paramètres facultatifs</h3>
                    <p className="text-xs text-gray-900 leading-relaxed mb-6">
                        Ces paramètres sont disponibles lorsque la réservation instantanée est activée. Les voyageurs qui ne
                        répondent pas à ces critères peuvent envoyer des demandes de réservation.
                    </p>

                    {/* Évaluations positives */}
                    <div className="flex items-start justify-between gap-6 py-4 border-t border-gray-100">
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900 mb-1">Évaluations positives</p>
                            <p className="text-xs text-gray-900 leading-relaxed">
                                Autoriser uniquement les voyageurs ayant déjà séjourné sur Airbnb sans causer de problèmes ni faire l'objet de
                                commentaires négatifs.{' '}
                                <span className="underline cursor-pointer font-medium">En savoir plus</span>
                            </p>
                        </div>
                        <ToggleSwitch defaultOn={false} />
                    </div>

                    {/* Message de pré-réservation */}
                    <button
                        onClick={() => setShowMessage(true)}
                        className="w-full flex items-center justify-between py-4 border-t border-gray-100 hover:bg-gray-50 transition-colors -mx-0 text-left"
                    >
                        <div>
                            <p className="text-sm font-semibold text-gray-900 mb-0.5">Message de pré-réservation</p>
                            <p className="text-xs text-gray-900 leading-relaxed">
                                Exigez des voyageurs qu'ils aient lu et répondu à un message avant de confirmer leur réservation.
                            </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-4" />
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-end bg-white">
                <button disabled className="px-5 py-2.5 bg-gray-200 text-gray-400 text-sm font-medium rounded-xl cursor-not-allowed">
                    Enregistrer
                </button>
            </div>
        </div>
    )
}

function PanelReglement({ listing }) {
    const { rules } = listing
    const [showHeures, setShowHeures] = useState(false)
    const [showRegles, setShowRegles] = useState(false)
    const [voyageurs, setVoyageurs] = useState(rules?.maxGuests || 4)

    // 5 règles toggleables (state local, valeurs par défaut toutes ON)
    const RULE_DEFS = [
        {
            key: 'pets',
            label: 'Animaux acceptés',
            desc: "Vous pouvez refuser les animaux de compagnie, mais vous devez faire le nécessaire, dans la mesure du raisonnable, pour accueillir les animaux d'assistance.",
            link: 'En savoir plus',
        },
        { key: 'parties', label: 'Événements autorisés', desc: null },
        { key: 'smoking', label: 'Autorisation de fumer et de vapoter', desc: null },
        { key: 'quietHours', label: 'Horaires où le calme doit être respecté', desc: null },
        { key: 'commercial', label: 'Photographie commerciale et tournages autorisés', desc: null },
    ]
    const [ruleState, setRuleState] = useState(() =>
        Object.fromEntries(RULE_DEFS.map(r => [r.key, true]))
    )
    const toggleRule = (key) => setRuleState(prev => ({ ...prev, [key]: !prev[key] }))

    if (showHeures) {
        return (
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto px-8 py-8 max-w-2xl">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8">Heures d'arrivée et de départ</h2>
                    <div className="space-y-4">
                        <div className="border border-gray-200 rounded-xl p-4">
                            <p className="text-xs text-gray-500 mb-1">Arrivée</p>
                            <p className="text-sm font-medium text-gray-900">Entre {rules.checkIn} et 23:00</p>
                        </div>
                        <div className="border border-gray-200 rounded-xl p-4">
                            <p className="text-xs text-gray-500 mb-1">Départ</p>
                            <p className="text-sm font-medium text-gray-900">Avant {rules.checkOut}</p>
                        </div>
                    </div>
                </div>
                <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-between bg-white">
                    <button onClick={() => setShowHeures(false)} className="text-sm font-medium text-gray-900 underline hover:text-gray-600">Annuler</button>
                    <button disabled className="px-5 py-2.5 bg-gray-200 text-gray-400 text-sm font-medium rounded-xl cursor-not-allowed">Enregistrer</button>
                </div>
            </div>
        )
    }

    if (showRegles) {
        return (
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto px-8 py-8 max-w-2xl">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8">Règles supplémentaires</h2>
                    <p className="text-xs text-gray-900 mb-4">Dites-en plus sur ce que vous attendez des voyageurs.</p>
                    <textarea
                        placeholder="Ajoutez vos règles supplémentaires..."
                        className="w-full min-h-[160px] text-sm text-gray-700 placeholder-gray-400 border border-gray-200 rounded-xl p-4 resize-none focus:outline-none focus:ring-1 focus:ring-gray-300"
                    />
                </div>
                <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-between bg-white">
                    <button onClick={() => setShowRegles(false)} className="text-sm font-medium text-gray-900 underline hover:text-gray-600">Annuler</button>
                    <button disabled className="px-5 py-2.5 bg-gray-200 text-gray-400 text-sm font-medium rounded-xl cursor-not-allowed">Enregistrer</button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto px-8 py-8 max-w-2xl">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Règlement intérieur</h2>
                <p className="text-xs text-gray-900 leading-relaxed mb-8">
                    Les voyageurs sont tenus de respecter vos règles. En cas de manquement, ils pourraient être exclus d'Airbnb.
                </p>

                {/* 5 règles avec X / ✓ */}
                <div className="divide-y divide-gray-100">
                    {RULE_DEFS.map(rule => (
                        <div key={rule.key} className="py-4">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        {rule.label}
                                    </p>
                                    {rule.desc && ruleState[rule.key] && (
                                        <p className="text-xs text-gray-500 leading-snug mt-1">
                                            {rule.desc}{' '}
                                            {rule.link && <span className="underline font-medium cursor-pointer">{rule.link}</span>}
                                        </p>
                                    )}
                                </div>
                                {/* Boutons X et ✓ */}
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button
                                        onClick={() => !ruleState[rule.key] || toggleRule(rule.key)}
                                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${!ruleState[rule.key] ? 'border-gray-900 text-gray-900' : 'border-gray-300 text-gray-400 hover:border-gray-400'}`}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => ruleState[rule.key] || toggleRule(rule.key)}
                                        className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${ruleState[rule.key] ? 'border-gray-900 text-gray-900' : 'border-gray-300 text-gray-400 hover:border-gray-400'}`}
                                    >
                                        <Check className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Nombre de voyageurs */}
                    <div className="py-4 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Nombre de voyageurs</p>
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <button
                                onClick={() => setVoyageurs(v => Math.max(1, v - 1))}
                                className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 hover:border-gray-700 transition-colors"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{voyageurs}</span>
                            <button
                                onClick={() => setVoyageurs(v => v + 1)}
                                className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 hover:border-gray-700 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Heures d'arrivée et de départ */}
                    <button
                        onClick={() => setShowHeures(true)}
                        className="w-full flex items-start justify-between py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                        <div>
                            <p className="text-sm font-medium text-gray-900">Heures d'arrivée et de départ</p>
                            <p className="text-xs text-gray-900 mt-0.5">Arrivée entre {rules.checkIn} et 23:00</p>
                            <p className="text-xs text-gray-900">Départ avant {rules.checkOut}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    </button>

                    {/* Règles supplémentaires */}
                    <button
                        onClick={() => setShowRegles(true)}
                        className="w-full flex items-start justify-between py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                        <div>
                            <p className="text-sm font-medium text-gray-900">Règles supplémentaires</p>
                            <p className="text-xs text-gray-900 mt-0.5">Dites-en plus sur ce que vous attendez des voyageurs.</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-end bg-white">
                <button disabled className="px-5 py-2.5 bg-gray-200 text-gray-400 text-sm font-medium rounded-xl cursor-not-allowed">
                    Enregistrer
                </button>
            </div>
        </div>
    )
}

function XCheckToggle({ selected }) {
    return (
        <div className="flex items-center gap-1.5 flex-shrink-0">
            <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${selected === 'x' ? 'bg-gray-900 text-white' : 'text-gray-400'}`}>
                <X className="w-4 h-4" />
            </button>
            <button className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${selected === 'check' ? 'bg-gray-900 text-white' : 'text-gray-400'}`}>
                <Check className="w-4 h-4" />
            </button>
        </div>
    )
}

function LieuFooter({ saveActive = false }) {
    return (
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-between">
            <button className="text-sm font-medium text-gray-900">Annuler</button>
            <button className={`px-6 py-2.5 text-sm font-medium rounded-lg ${saveActive ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
                Enregistrer
            </button>
        </div>
    )
}

const SECURITE_SECTIONS = [
    { id: 'consignes', label: 'Consignes de sécurité', preview: 'Ajoutez des informations.' },
    { id: 'dispositifs', label: 'Dispositifs de sécurité', preview: 'Détecteur de fumée' },
    { id: 'infos', label: 'Informations sur le logement', preview: 'Ajoutez des informations.' },
]

const CONSIGNES_ITEMS = [
    { label: 'Ne convient pas aux enfants de 2 à 17 ans', desc: "Ce logement possède des caractéristiques qui risquent de ne pas être sûres pour les enfants.", link: true, selected: 'x' },
    { label: 'Ne convient pas aux bébés (moins de 2 ans)', desc: "Ce logement possède des caractéristiques qui risquent de ne pas être sûres pour les bébés ou les enfants en bas âge.", link: true, selected: 'x' },
    { label: "La piscine ou le jacuzzi n'ont pas de clôture ni de verrou", desc: "Les voyageurs ont accès à une piscine ou un jacuzzi non sécurisé. Renseignez-vous sur la réglementation locale pour connaître toute exigence spécifique.", selected: 'x' },
    { label: "Source d'eau à proximité, comme un lac ou une rivière", desc: "Les voyageurs ont un accès sans restriction à une source d'eau, comme un océan, un étang, un ruisseau ou des marécages, sur les lieux à proximité.", selected: 'x' },
    { label: "Structure(s) d'escalade ou de jeux sur les lieux", desc: "Les voyageurs auront accès à des installations telles qu'une structure de jeux, un toboggan, des balançoires ou des cordes d'escalade.", selected: 'x' },
    { label: 'Endroits surélevés sans rambardes ni protection', desc: "Les voyageurs ont accès à un espace d'une hauteur supérieure à 76 centimètres, comme un balcon, un toit, une terrasse ou une falaise, qui ne dispose d'aucune rambarde ni protection.", selected: 'x' },
    { label: 'Animaux potentiellement dangereux sur les lieux', desc: "Les voyageurs et leurs animaux de compagnie seront en présence d'autres animaux, comme des chevaux, des pumas ou des animaux de la ferme, qui pourraient causer des dommages.", link: true, selected: 'x' },
]

const DISPOSITIFS_ITEMS = [
    { label: "Présence d'une caméra de surveillance à l'extérieur", desc: "Le logement dispose d'une ou plusieurs caméras extérieures qui enregistrent ou transmettent des vidéos, des images ou du son. Vous devez indiquer leur présence, même si elles sont éteintes.\n\nRemarque : les caméras de surveillance qui filment des espaces intérieurs ou extérieurs où les voyageurs s'attendent à avoir plus d'intimité (comme une douche) ne sont pas autorisées.", link: true, selected: 'x' },
    { label: "Présence d'un sonomètre", desc: "Ce logement dispose d'un ou plusieurs appareils qui mesurent le niveau sonore mais n'enregistrent rien.", link: true, selected: 'x' },
    { label: 'Détecteur de monoxyde de carbone', desc: "Un appareil qui alerte les occupants d'un logement en cas de détection d'un taux dangereux de monoxyde de carbone (vérifiez la législation locale : celle-ci peut exiger la présence d'un détecteur de monoxyde de carbone en état de marche dans votre logement).", link: true, coConfirm: true, selected: 'x' },
    { label: 'Détecteur de fumée', desc: "Un appareil qui alerte les occupants d'un logement lorsqu'il détecte de la fumée (vérifiez la législation locale : celle-ci peut exiger la présence d'un détecteur de fumée en état de marche dans votre logement).", link: true, selected: 'check' },
]

const INFOS_ITEMS = [
    { label: 'Les voyageurs doivent monter des escaliers', desc: "Les voyageurs doivent s'attendre à emprunter des escaliers pendant leur séjour.", selected: 'x' },
    { label: 'Nuisances sonores potentielles pendant le séjour', desc: "Il se peut que des nuisances sonores surviennent pendant le séjour des voyageurs. Par exemple, circulation, travaux ou entreprises à proximité.", selected: 'x' },
    { label: 'Des animaux vivent sur place', desc: "Les voyageurs peuvent être en contact avec des animaux de compagnie pendant leur séjour ou interagir avec eux.", selected: 'x' },
    { label: 'Pas de stationnement sur place', desc: "Ce logement ne dispose pas de places de parking réservées aux voyageurs.", selected: 'x' },
    { label: 'Le logement a des espaces partagés', desc: "Les voyageurs doivent s'attendre à partager certains espaces avec d'autres personnes pendant leur séjour, comme une cuisine, une salle de bain ou un patio.", selected: 'x' },
    { label: 'Équipements de base limités', desc: "Certains équipements de base ne sont pas inclus dans ce logement. Par exemple, wifi, eau courante, douche intérieure.", selected: 'x' },
    { label: "Présence d'une ou plusieurs armes dans le logement", desc: "Au moins une arme se trouve dans ce logement. Renseignez-vous sur la réglementation locale pour toute exigence spécifique.\n\nRappel : Airbnb exige que toutes les armes soient stockées en toute sécurité.", link: true, selected: 'x' },
]

function PanelSecurite({ onHideAside }) {
    const [selectedSection, setSelectedSection] = useState(null)

    const handleSelect = (id) => { setSelectedSection(id); onHideAside?.(true) }
    const handleBack = () => { setSelectedSection(null); onHideAside?.(false) }

    const renderItem = (item) => (
        <div key={item.label} className="py-5 border-b border-gray-100 last:border-0">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{item.label}</p>
                    {item.desc && <p className="text-sm text-gray-500 mt-1 leading-relaxed whitespace-pre-line">{item.desc}</p>}
                    {item.link && <p className="text-sm font-semibold underline cursor-pointer text-gray-700 mt-1">En savoir plus</p>}
                    {item.coConfirm && (
                        <label className="flex items-start gap-2 mt-3 cursor-pointer">
                            <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-gray-300 cursor-pointer flex-shrink-0" />
                            <span className="text-sm text-gray-500 leading-snug">Je confirme qu'un détecteur de monoxyde de carbone n'est pas nécessaire pour ce logement (par exemple, si tous les appareils sont électriques).</span>
                        </label>
                    )}
                </div>
                <XCheckToggle selected={item.selected} />
            </div>
        </div>
    )

    const renderSectionContent = (id) => {
        if (id === 'consignes') return (
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto px-8 py-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Consignes de sécurité</h1>
                    {CONSIGNES_ITEMS.map(renderItem)}
                </div>
                <LieuFooter />
            </div>
        )
        if (id === 'dispositifs') return (
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto px-8 py-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dispositifs de sécurité</h1>
                    {DISPOSITIFS_ITEMS.map(renderItem)}
                    <button className="mt-5 px-5 py-2.5 border border-gray-900 rounded-xl text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors">
                        Ajouter des informations
                    </button>
                </div>
                <LieuFooter />
            </div>
        )
        if (id === 'infos') return (
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto px-8 py-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Informations sur le logement</h1>
                    {INFOS_ITEMS.map(renderItem)}
                </div>
                <LieuFooter />
            </div>
        )
        return null
    }

    const mainContent = (compact = false) => (
        <div className={compact ? 'px-5 py-5' : 'px-8 py-8 max-w-2xl'}>
            {!compact && <h2 className="text-2xl font-semibold text-gray-900 mb-2">Sécurité des voyageurs</h2>}
            <p className={`text-gray-900 leading-relaxed mb-6 ${compact ? 'text-xs' : 'text-sm'}`}>
                Les informations liées à la sécurité que vous communiquez s'affichent sur votre annonce aux côtés d'autres renseignements, comme votre règlement intérieur.
            </p>
            <div className="divide-y divide-gray-100">
                {SECURITE_SECTIONS.map(section => (
                    <button
                        key={section.id}
                        onClick={() => handleSelect(section.id)}
                        className={`w-full text-left py-4 flex items-center justify-between hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors ${selectedSection === section.id ? 'bg-gray-50' : ''}`}
                    >
                        <div>
                            <p className={`font-medium text-gray-900 ${compact ? 'text-xs' : 'text-sm'}`}>{section.label}</p>
                            <p className={`text-gray-500 mt-0.5 text-xs`}>{section.preview}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                    </button>
                ))}
            </div>
        </div>
    )

    if (selectedSection) {
        return (
            <div className="flex h-full">
                <div className="w-[320px] flex-shrink-0 border-r border-gray-200 overflow-y-auto">
                    <div className="px-5 py-4 border-b border-gray-200">
                        <button onClick={handleBack} className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Sécurité des voyageurs
                        </button>
                    </div>
                    {mainContent(true)}
                </div>
                <div className="flex-1 overflow-y-auto flex flex-col">
                    {renderSectionContent(selectedSection)}
                </div>
            </div>
        )
    }

    return mainContent()
}

const COURTE_OPTIONS = [
    { id: 'flexibles', label: 'Flexibles', bullets: ["Remboursement intégral au moins 1 jour avant l'arrivée", "Remboursement partiel moins de 1 jour avant l'arrivée"] },
    { id: 'moderees', label: 'Modérées', bullets: ["Remboursement intégral au moins 5 jours avant l'arrivée", "Remboursement partiel moins de 5 jours avant l'arrivée"] },
    { id: 'limitees', label: 'Limitées', bullets: ["Remboursement intégral au moins 14 jours avant l'arrivée", "Remboursement partiel entre 7 et 14 jours avant l'arrivée"] },
    { id: 'fermes', label: 'Fermes', bullets: ["Remboursement intégral au moins 30 jours avant l'arrivée", "Remboursement partiel entre 7 et 30 jours avant l'arrivée"] },
    { id: 'tres_strictes_30', label: 'Très strictes 30 jours', bullets: ["Pas de remboursement intégral", "Remboursement partiel 30 jours ou plus avant l'arrivée"] },
    { id: 'tres_strictes_60', label: 'Très strictes 60 jours', bullets: ["Pas de remboursement intégral", "Remboursement partiel 60 jours ou plus avant l'arrivée"] },
]

const LONGUE_OPTIONS = [
    { id: 'fermes_longue', label: 'Conditions fermes pour les séjours longue durée', bullets: ["Remboursement intégral jusqu'à 30 jours avant l'arrivée", "Passé ce délai, les 30 premiers jours du séjour ne sont pas remboursables"] },
    { id: 'strictes_longue', label: 'Conditions strictes pour les séjours longue durée', bullets: ["Remboursement intégral dans les 48 heures suivant la réservation et au moins 28 jours avant l'arrivée", "Passé ce délai, les 30 premiers jours du séjour ne sont pas remboursables"] },
]

function PanelAnnulation({ onHideAside }) {
    const [selectedSection, setSelectedSection] = useState(null)
    const [selectedCourte, setSelectedCourte] = useState('limitees')
    const [selectedLongue, setSelectedLongue] = useState('fermes_longue')

    const handleSelect = (id) => { setSelectedSection(id); onHideAside?.(true) }
    const handleBack = () => { setSelectedSection(null); onHideAside?.(false) }

    const mainContent = (compact = false) => (
        <div className={compact ? 'px-5 py-5' : 'px-8 py-8 max-w-2xl'}>
            {!compact && (
                <>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Conditions d'annulation</h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-8">
                        Retrouvez l'intégralité des conditions dans{' '}
                        <span className="underline font-medium text-gray-900 cursor-pointer">cet article</span>{' '}
                        du Centre d'aide.
                    </p>
                </>
            )}

            {/* Séjours courte durée */}
            <div className={compact ? 'mb-4' : 'mb-6'}>
                <h3 className={`font-semibold text-gray-900 mb-1 ${compact ? 'text-xs' : 'text-base'}`}>Séjours courte durée</h3>
                {!compact && (
                    <p className="text-sm text-gray-500 leading-relaxed mb-3">
                        Ces conditions s'appliquent aux séjours de moins de 28 nuits. Toutes les conditions de séjour standard incluent une période d'annulation gratuite de 24 heures.
                    </p>
                )}
                <div className={`border border-gray-200 rounded-xl flex items-center justify-between mb-3 ${compact ? 'px-3 py-2.5' : 'px-5 py-4'}`}>
                    <div>
                        <p className="text-xs text-gray-500">Vos conditions</p>
                        <p className={`font-semibold text-gray-900 ${compact ? 'text-xs' : 'text-sm'}`}>Limitées</p>
                    </div>
                    <button
                        onClick={() => handleSelect('courte')}
                        className={`border border-gray-200 rounded-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors ${compact ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-sm'}`}
                    >
                        Modifier
                    </button>
                </div>
                {!compact && (
                    <div className="border border-gray-200 rounded-xl px-5 py-4">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-gray-900">Option non remboursable</p>
                                <p className="text-xs text-gray-500 leading-snug mt-1">
                                    Les voyageurs peuvent bénéficier de 10 % de réduction, mais vous recevez l'intégralité du paiement s'ils annulent.{' '}
                                    <span className="underline font-medium text-gray-900 cursor-pointer">En savoir plus</span>
                                </p>
                            </div>
                            <ToggleSwitch defaultOn={false} />
                        </div>
                    </div>
                )}
            </div>

            {/* Séjours longue durée */}
            <div>
                <h3 className={`font-semibold text-gray-900 mb-1 ${compact ? 'text-xs' : 'text-base'}`}>Séjours longue durée</h3>
                {!compact && (
                    <p className="text-sm text-gray-500 leading-relaxed mb-3">
                        Ces conditions s'appliquent aux séjours de 28 nuits ou plus.
                    </p>
                )}
                <div className={`border border-gray-200 rounded-xl flex items-center justify-between ${compact ? 'px-3 py-2.5' : 'px-5 py-4'}`}>
                    <div>
                        <p className="text-xs text-gray-500">Vos conditions</p>
                        <p className={`font-semibold text-gray-900 ${compact ? 'text-xs' : 'text-sm'}`}>
                            {compact ? 'Cond. fermes longue durée' : 'Conditions fermes pour les séjours longue durée'}
                        </p>
                    </div>
                    <button
                        onClick={() => handleSelect('longue')}
                        className={`border border-gray-200 rounded-lg font-medium text-gray-900 hover:bg-gray-50 transition-colors ${compact ? 'px-2 py-1 text-xs' : 'px-4 py-2 text-sm'}`}
                    >
                        Modifier
                    </button>
                </div>
            </div>
        </div>
    )

    const renderOptionCard = (opt, selected, onSelect) => (
        <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`w-full text-left p-5 border-2 rounded-2xl mb-3 flex items-start justify-between gap-3 transition-colors ${selected === opt.id ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'
                }`}
        >
            <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 mb-1.5">{opt.label}</p>
                {opt.bullets.map((b, i) => (
                    <p key={i} className="text-xs text-gray-500 leading-snug">• {b}</p>
                ))}
            </div>
            <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
        </button>
    )

    const renderSectionContent = (id) => {
        if (id === 'courte') return (
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto px-8 py-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Séjours courte durée</h1>
                    {COURTE_OPTIONS.map(opt => renderOptionCard(opt, selectedCourte, setSelectedCourte))}
                </div>
                <LieuFooter />
            </div>
        )
        if (id === 'longue') return (
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto px-8 py-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Séjours longue durée</h1>
                    {LONGUE_OPTIONS.map(opt => renderOptionCard(opt, selectedLongue, setSelectedLongue))}
                </div>
                <LieuFooter />
            </div>
        )
        return null
    }

    if (selectedSection) {
        return (
            <div className="flex h-full">
                <div className="w-[320px] flex-shrink-0 border-r border-gray-200 overflow-y-auto">
                    <div className="px-5 py-4 border-b border-gray-200">
                        <button onClick={handleBack} className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Conditions d'annulation
                        </button>
                    </div>
                    {mainContent(true)}
                </div>
                <div className="flex-1 overflow-y-auto flex flex-col">
                    {renderSectionContent(selectedSection)}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
                {mainContent(false)}
            </div>
        </div>
    )
}

function PanelLienPersonnalise({ listing }) {
    const BASE = 'airbnb.fr/h/'
    const rawUrl = listing.customLink.url.replace('www.', '')
    const initialSlug = rawUrl.startsWith(BASE) ? rawUrl.slice(BASE.length) : ''
    const [slug, setSlug] = useState(initialSlug)
    const fullUrl = BASE + slug
    const charsUsed = fullUrl.length
    const maxChars = 112
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard?.writeText('https://www.' + fullUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 flex flex-col items-center justify-center px-12">
                <p className="text-sm text-gray-600 mb-10">
                    Caractères restants : <span className="font-semibold">{charsUsed}/{maxChars}</span>
                </p>
                <input
                    value={fullUrl}
                    onChange={e => {
                        const val = e.target.value
                        if (val.startsWith(BASE)) setSlug(val.slice(BASE.length).slice(0, maxChars - BASE.length))
                    }}
                    className="w-full text-center text-5xl font-medium text-gray-900 bg-transparent border-none outline-none focus:outline-none"
                />
            </div>
            <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-between bg-white">
                <button onClick={handleCopy} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    <Link2 className="w-4 h-4" />
                    {copied ? 'Copié !' : 'Copier le lien'}
                </button>
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-orange-300" />
                </div>
                <button disabled className="px-5 py-2.5 bg-gray-100 text-gray-400 text-sm font-medium rounded-xl cursor-not-allowed">
                    Enregistrer
                </button>
            </div>
        </div>
    )
}

// ── PANNEAUX "Guide d'arrivée" ────────────────────────────────────────────────

const HEURES_DEBUT = Array.from({ length: 16 }, (_, i) => `${String(i + 8).padStart(2, '0')}:00`)
const HEURES_FIN = ['Flexible', ...HEURES_DEBUT, '01:00 (jour suivant)', '02:00 (jour suivant)']

function GuideHoraires({ listing }) {
    const { horaires } = listing.guide
    const [debut, setDebut] = useState(horaires.checkIn)
    const [fin, setFin] = useState(horaires.checkInEnd)
    const [depart, setDepart] = useState(horaires.checkOut)
    const [openDropdown, setOpenDropdown] = useState(null)

    const hasChanged = debut !== horaires.checkIn || fin !== horaires.checkInEnd || depart !== horaires.checkOut

    const Dropdown = ({ id, options, value, onChange }) => (
        <div className="relative">
            <div
                onClick={() => setOpenDropdown(openDropdown === id ? null : id)}
                className="px-4 py-3.5 flex items-center justify-between cursor-pointer hover:bg-gray-50"
            >
                <div>
                    <p className="text-xs font-medium text-[#C13515]">
                        {id === 'debut' ? 'Heure de début' : id === 'fin' ? 'Heure de fin' : 'Sélectionnez une heure'}
                    </p>
                    <p className="text-base font-medium text-gray-900 mt-0.5">{value}</p>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-700 transition-transform flex-shrink-0 ${openDropdown === id ? 'rotate-180' : ''}`} />
            </div>
            {openDropdown === id && (
                <div className="absolute left-0 right-0 top-full z-30 bg-white border border-gray-200 rounded-xl shadow-xl max-h-52 overflow-y-auto">
                    {options.map(h => (
                        <div
                            key={h}
                            onClick={() => { onChange(h); setOpenDropdown(null) }}
                            className={`px-4 py-3 cursor-pointer text-sm ${h === value ? 'bg-gray-900 text-white font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                        >
                            {h}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

    return (
        <div className="flex flex-col h-full" onClick={(e) => { if (e.target === e.currentTarget) setOpenDropdown(null) }}>
            <div className="flex-1 overflow-y-auto px-8 py-8 max-w-2xl" onClick={() => setOpenDropdown(null)}>
                <h2 className="text-3xl font-semibold text-gray-900 mb-8">Horaires d'arrivée et de départ</h2>

                {/* Plage horaire arrivées */}
                <p className="text-sm font-semibold text-gray-900 mb-3">Plage horaire pour les arrivées</p>
                <div className="border border-gray-300 rounded-2xl overflow-visible mb-8" onClick={e => e.stopPropagation()}>
                    <Dropdown id="debut" options={HEURES_DEBUT} value={debut} onChange={setDebut} />
                    <div className="h-px bg-gray-200 mx-4" />
                    <Dropdown id="fin" options={HEURES_FIN} value={fin} onChange={setFin} />
                </div>

                {/* Heure du départ */}
                <p className="text-sm font-semibold text-gray-900 mb-3">Heure du départ</p>
                <div className="border border-gray-300 rounded-2xl overflow-visible" onClick={e => e.stopPropagation()}>
                    <Dropdown id="depart" options={HEURES_DEBUT} value={depart} onChange={setDepart} />
                </div>
            </div>

            <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-end bg-white">
                <button
                    disabled={!hasChanged}
                    className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-colors ${hasChanged ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                    Enregistrer
                </button>
            </div>
        </div>
    )
}

function GuideItineraire({ listing }) {
    const [text, setText] = useState(listing.guide.itineraire)
    const hasChanged = text !== listing.guide.itineraire

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto px-8 py-8 max-w-2xl">
                <h2 className="text-3xl font-semibold text-gray-900 mb-8">Itinéraire</h2>
                <textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Décrivez comment accéder au logement étape par étape..."
                    className="w-full min-h-[320px] text-sm text-gray-900 leading-relaxed resize-none border-none outline-none focus:outline-none placeholder-gray-400"
                />
                <div className="flex items-start gap-2 mt-6 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>Informations transmises une fois la réservation confirmée.</span>
                </div>
            </div>
            <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-end bg-white">
                <button
                    disabled={!hasChanged}
                    className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-colors ${hasChanged ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                    Enregistrer
                </button>
            </div>
        </div>
    )
}

const ARRIVAL_METHODS = [
    { id: 'serrure_connectee', Icon: Wifi, label: 'Serrure connectée', desc: "Les voyageurs utiliseront un code ou une application pour ouvrir une serrure connectée au wifi." },
    { id: 'digicode', Icon: Lock, label: 'Serrure à digicode', desc: "Les voyageurs ouvriront la serrure électronique à l'aide du code que vous leur aurez transmis." },
    { id: 'boite_cle', Icon: Key, label: 'Boîte à clé sécurisée', desc: "Les voyageurs utiliseront le code fourni pour ouvrir une boîte sécurisée contenant la clé." },
    { id: 'personnel', Icon: Users, label: "Personnel de l'immeuble", desc: "Une personne est disponible 24h/24 pour permettre aux voyageurs d'accéder au logement." },
    { id: 'en_personne', Icon: UserCheck, label: 'Accueil en personne', desc: "Les voyageurs vous retrouveront, vous ou votre co-hôte, pour récupérer les clés." },
    { id: 'autre', Icon: MoreHorizontal, label: 'Autre', desc: "Les voyageurs utiliseront une autre méthode qui n'est pas indiquée ici." },
]

const PROCEDURE_STEPS = [
    { text: "Depuis la rue, repérez le portail ou la porte d'entrée principale de la résidence.", photoUrl: 'https://images.unsplash.com/photo-1768573264672-5b8947399ebc?w=600&fit=crop' },
    { text: "La boîte à clés est fixée sur le mur à droite de la porte. Composez le code communiqué pour l'ouvrir et récupérez votre clé.", photoUrl: 'https://plus.unsplash.com/premium_photo-1766436243199-7a15abe7b034?w=600&fit=crop' },
    { text: "Montez jusqu'à l'étage indiqué et ouvrez la porte du logement. Bienvenue, vous êtes arrivés !", photoUrl: 'https://plus.unsplash.com/premium_photo-1764173681264-08a48444e645?w=600&fit=crop' },
]

function GuideProcedure({ listing, onHideAside }) {
    const [activePanel, setActivePanel] = useState(null) // null | 'method' | 'instructions' | number (step index)
    const [selectedMethod, setSelectedMethod] = useState('boite_cle')
    const [steps] = useState(PROCEDURE_STEPS)
    const [editText, setEditText] = useState('')

    const handleOpen = (panel) => { setActivePanel(panel); onHideAside?.(true) }
    const handleBack = () => { setActivePanel(null); onHideAside?.(false) }
    const handleStepClick = (i) => { setEditText(steps[i].text); handleOpen(i) }

    const currentMethod = ARRIVAL_METHODS.find(m => m.id === selectedMethod)

    const mainContent = (compact = false) => (
        <div className={compact ? 'px-5 py-5' : 'px-8 py-8 max-w-2xl'}>
            {!compact && <h2 className="text-2xl font-semibold text-gray-900 mb-6">Procédure d'arrivée</h2>}

            {/* Bloc méthode + code */}
            <div className={`border border-gray-200 rounded-2xl overflow-hidden ${compact ? 'mb-4' : 'mb-8'}`}>
                <div className="px-4 py-4 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                        {currentMethod && <currentMethod.Icon className={`flex-shrink-0 text-gray-700 mt-0.5 ${compact ? 'w-4 h-4' : 'w-5 h-5'}`} />}
                        <p className={`font-semibold text-gray-900 ${compact ? 'text-xs' : 'text-sm'}`}>{currentMethod?.label}</p>
                    </div>
                    <button onClick={() => handleOpen('method')} className="text-gray-400 hover:text-gray-700 flex-shrink-0 transition-colors">
                        <Pencil className={compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
                    </button>
                </div>
                <div className="h-px bg-gray-200 mx-4" />
                <button
                    onClick={() => handleOpen('instructions')}
                    className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                    <p className={`text-gray-500 text-left leading-snug ${compact ? 'text-xs' : 'text-sm'}`}>
                        Vous recevrez le code de la boîte à clé dans un second temps
                    </p>
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-3" />
                </button>
            </div>

            {/* Bloc instructions d'arrivée (pas en compact) */}
            {!compact && (
                <>
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-semibold text-gray-900">Instructions d'arrivée</h3>
                        <button className="text-sm text-gray-500 underline hover:text-gray-700">Réorganiser</button>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed mb-4">
                        Aidez vos voyageurs pour une arrivée en toute simplicité. Fournissez des conseils pour entrer dans le logement. Vous pouvez également ajouter des photos.
                    </p>
                    <div className="border border-gray-200 rounded-2xl overflow-hidden mb-4">
                        {steps.map((step, i) => (
                            <button
                                key={i}
                                onClick={() => handleStepClick(i)}
                                className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left ${i < steps.length - 1 ? 'border-b border-gray-100' : ''}`}
                            >
                                <div className="w-12 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                                    <img
                                        src={step.photoUrl}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <p className="flex-1 text-xs text-gray-700 leading-snug line-clamp-2">{step.text}</p>
                                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            </button>
                        ))}
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-6">
                        <Plus className="w-4 h-4" />
                        Ajouter des instructions
                    </button>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Information communiquée 48 heures avant l'arrivée</span>
                    </div>
                </>
            )}
        </div>
    )

    const renderPanel = () => {
        if (activePanel === 'method') return (
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto px-8 py-8">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Choisissez une procédure d'arrivée</h1>
                    <div className="space-y-3">
                        {ARRIVAL_METHODS.map(m => (
                            <button
                                key={m.id}
                                onClick={() => setSelectedMethod(m.id)}
                                className={`w-full text-left p-5 rounded-2xl border-2 transition-colors ${selectedMethod === m.id ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'}`}
                            >
                                <m.Icon className="w-6 h-6 text-gray-700 mb-2" />
                                <p className="text-sm font-semibold text-gray-900 mb-1">{m.label}</p>
                                <p className="text-xs text-gray-500 leading-snug">{m.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 bg-white">
                    <button onClick={handleBack} className="text-sm font-medium text-gray-900 underline hover:text-gray-600">Annuler</button>
                </div>
            </div>
        )

        if (activePanel === 'instructions') return (
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto px-8 py-8 max-w-2xl">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">Instructions d'accès</h1>
                    <textarea
                        defaultValue={listing.guide.procedure.instructions}
                        className="w-full min-h-[200px] text-sm text-gray-900 leading-relaxed resize-none border-none outline-none focus:outline-none"
                    />
                    <div className="flex items-center gap-2 mt-6 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>Information communiquée 48 heures avant l'arrivée</span>
                    </div>
                </div>
                <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-between bg-white">
                    <button onClick={handleBack} className="text-sm font-medium text-gray-900 underline hover:text-gray-600">Annuler</button>
                    <button disabled className="px-5 py-2.5 bg-gray-200 text-gray-400 text-sm font-medium rounded-xl cursor-not-allowed">Enregistrer</button>
                </div>
            </div>
        )

        if (typeof activePanel === 'number') {
            const step = steps[activePanel]
            return (
                <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto px-8 py-8">
                        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Modifiez les instructions</h1>
                        <div className="rounded-2xl overflow-hidden h-64 mb-6 bg-gray-100">
                            <img
                                src={step.photoUrl}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <textarea
                            value={editText}
                            onChange={e => setEditText(e.target.value)}
                            className="w-full min-h-[100px] text-sm text-gray-900 leading-relaxed resize-none border-none outline-none focus:outline-none"
                        />
                    </div>
                    <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-between bg-white">
                        <button onClick={handleBack} className="text-sm font-medium text-gray-900 hover:text-gray-600">Annuler</button>
                        <div className="flex items-center gap-3">
                            <button className="px-5 py-2.5 border border-gray-300 text-sm font-medium text-gray-900 rounded-xl hover:bg-gray-50 transition-colors">Supprimer</button>
                            <button className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors">Enregistrer</button>
                        </div>
                    </div>
                </div>
            )
        }
        return null
    }

    if (activePanel !== null) {
        return (
            <div className="flex h-full">
                <div className="w-[320px] flex-shrink-0 border-r border-gray-200 overflow-y-auto">
                    <div className="px-5 py-4 border-b border-gray-200">
                        <button onClick={handleBack} className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Procédure d'arrivée
                        </button>
                    </div>
                    {mainContent(true)}
                </div>
                <div className="flex-1 overflow-y-auto flex flex-col">
                    {renderPanel()}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
                {mainContent(false)}
            </div>
        </div>
    )
}

function GuideWifi({ listing }) {
    const { wifi } = listing.guide
    const [network, setNetwork] = useState(wifi.network)
    const [password, setPassword] = useState(wifi.password)
    const hasChanged = network !== wifi.network || password !== wifi.password

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto px-8 py-8 max-w-2xl">
                <h2 className="text-3xl font-semibold text-gray-900 mb-8">Informations sur le wifi</h2>
                <div className="space-y-4">
                    <div className="border border-gray-300 rounded-2xl px-4 pt-3 pb-3">
                        <p className="text-xs text-gray-500 mb-1">Nom du réseau wifi</p>
                        <input
                            type="text"
                            value={network}
                            onChange={e => setNetwork(e.target.value)}
                            className="w-full text-base text-gray-900 bg-transparent border-none outline-none focus:outline-none"
                        />
                    </div>
                    <div className="border border-gray-300 rounded-2xl px-4 pt-3 pb-3">
                        <p className="text-xs text-gray-500 mb-1">Mot de passe du wifi</p>
                        <input
                            type="text"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full text-base text-gray-900 bg-transparent border-none outline-none focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2 mt-8 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Informations communiquées 24 à 48 heures avant l'arrivée</span>
                </div>
            </div>
            <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-end bg-white">
                <button
                    disabled={!hasChanged}
                    className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-colors ${hasChanged ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                    Enregistrer
                </button>
            </div>
        </div>
    )
}

function GuideManuel({ listing }) {
    return (
        <div className="px-8 py-8 max-w-2xl">
            <PanelHeader title="Manuel de la maison" subtitle="Partagez des informations pratiques sur votre logement (électroménager, règles spécifiques, etc.)." />
            <textarea
                className="w-full border border-gray-300 rounded-xl p-4 text-sm text-gray-700 placeholder-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-gray-400 min-h-[180px]"
                placeholder="Ajoutez des informations utiles pour vos voyageurs..."
                defaultValue={listing.guide.manuel}
            />
            <div className="flex justify-end mt-4">
                <button disabled className="px-5 py-2.5 bg-gray-200 text-gray-400 text-sm font-medium rounded-xl cursor-not-allowed">
                    Enregistrer
                </button>
            </div>
        </div>
    )
}


function GuideDepart({ listing }) {
    return (
        <div className="px-8 py-8 max-w-2xl">
            <PanelHeader title="Instructions de départ" subtitle="Indiquez aux voyageurs ce qu'ils doivent faire avant de quitter le logement." />
            <div className="space-y-3">
                {listing.guide.depart.map((item, i) => {
                    const Icon = ICON_MAP[item.icon] || Key
                    return (
                        <div key={i} className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl">
                            <Icon className="w-5 h-5 text-gray-600 flex-shrink-0" />
                            <span className="text-sm text-gray-900">{item.text}</span>
                        </div>
                    )
                })}
            </div>
            <button className="mt-6 text-sm font-medium text-gray-900 underline hover:text-gray-700">Modifier</button>
        </div>
    )
}

function GuideAdresses() {
    return (
        <div className="px-8 py-8 max-w-xl">
            <div className="flex items-start justify-between mb-4">
                <h2 className="text-3xl font-semibold text-gray-900">Guides</h2>
                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 flex-shrink-0 mt-1">
                    <Plus className="w-4 h-4 text-gray-700" />
                </button>
            </div>
            <p className="text-sm text-gray-900 leading-relaxed mb-8">
                Créez un guide pour indiquer facilement les meilleures adresses locales à vos voyageurs.{' '}
                <span className="underline font-semibold cursor-pointer">Lisez nos règles en matière de contenu</span>
            </p>

            {/* Tuile guide */}
            <div className="relative w-64 rounded-2xl overflow-hidden bg-gray-500 cursor-pointer select-none">
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors z-10">
                    <Trash2 className="w-4 h-4 text-gray-700" />
                </button>
                <div className="h-44" />
                <div className="px-4 pb-4 pt-1">
                    <p className="text-white font-semibold text-base mb-2">Guide créé par Letahost</p>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold" style={{ fontSize: 5 }}>LETAHOST</span>
                        </div>
                        <span className="text-white text-sm">Letahost</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

const PREFERENCES_OPTIONS = [
    "Je ne serai pas disponible en personne, et je préfère communiquer par le biais de l'application.",
    "J'aime saluer les voyageurs en personne, mais je reste en retrait le reste du temps.",
    "J'aime passer du temps avec les voyageurs et apprendre à les connaitre.",
    "Je n'ai pas de préférence : je m'adapte aux voyageurs.",
]

function GuidePreferences() {
    const [selected, setSelected] = useState(null)

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto px-8 py-8 max-w-2xl">
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">Échanges avec les voyageurs</h2>
                <p className="text-sm text-gray-900 leading-relaxed mb-8">
                    Indiquez aux voyageurs si vous aimez passer du temps avec eux ou plutôt préserver leur tranquillité.
                </p>
                <div className="space-y-3">
                    {PREFERENCES_OPTIONS.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => setSelected(i)}
                            className={`w-full text-left px-5 py-4 border rounded-2xl flex items-center justify-between gap-4 transition-colors ${selected === i ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'}`}
                        >
                            <p className="text-sm text-gray-700 leading-snug">{opt}</p>
                            <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${selected === i ? 'border-gray-900' : 'border-gray-300'}`}>
                                {selected === i && <div className="w-3 h-3 rounded-full bg-gray-900" />}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex-shrink-0 border-t border-gray-200 px-8 py-4 flex items-center justify-end bg-white">
                <button
                    disabled={selected === null}
                    className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-colors ${selected !== null ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                    Enregistrer
                </button>
            </div>
        </div>
    )
}

// ── Map id → composant panneau droit ─────────────────────────────────────────
const PANELS = {
    photos: (props) => <PanelPhotos {...props} />,
    titre: (props) => <PanelTitre {...props} />,
    type: (props) => <PanelType {...props} />,
    voyageurs: (props) => <PanelVoyageurs {...props} />,
    description: (props) => <PanelDescription {...props} />,
    equipements: (props) => <PanelEquipements {...props} />,
    accessibilite: (props) => <PanelAccessibilite {...props} />,
    lieu: (props) => <PanelLieu {...props} />,
    hote: (props) => <PanelHote {...props} />,
    cohotes: (props) => <PanelCohotes {...props} />,
    reservation: (props) => <PanelReservationInstant {...props} />,
    reglement: (props) => <PanelReglement {...props} />,
    securite: (props) => <PanelSecurite {...props} />,
    annulation: (props) => <PanelAnnulation {...props} />,
    lien: (props) => <PanelLienPersonnalise {...props} />,
    horaires: (props) => <GuideHoraires {...props} />,
    itineraire: (props) => <GuideItineraire {...props} />,
    procedure: (props) => <GuideProcedure {...props} />,
    wifi: (props) => <GuideWifi {...props} />,
    manuel: (props) => <GuideManuel {...props} />,
    reglement_guide: (props) => <PanelReglement {...props} />,
    depart: (props) => <GuideDepart {...props} />,
    guides: (props) => <GuideAdresses {...props} />,
    preferences: (props) => <GuidePreferences {...props} />,
}

// ── Composant principal ───────────────────────────────────────────────────────
function AirbnbAnnonceDetail() {
    const { propertyId } = useParams()
    const navigate = useNavigate()

    const [activeTab, setActiveTab] = useState('monLogement')
    const [selectedCard, setSelectedCard] = useState('photos')
    const [hideAside, setHideAside] = useState(false)

    const property = properties.find(p => p.propertyId === propertyId)
    const listing = listingDetails[propertyId] || listingDetails['default']

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

    const handleTabChange = (tab) => {
        setActiveTab(tab)
        setSelectedCard(tab === 'monLogement' ? 'photos' : 'horaires')
    }

    const cards = activeTab === 'monLogement' ? MON_LOGEMENT_CARDS : GUIDE_CARDS
    const renderPanel = PANELS[selectedCard]

    return (
        <div className="min-h-screen bg-white font-airbnb">
            <AirbnbHeader />

            <div className="flex h-[calc(100vh-80px)] px-8">

                {/* ── COLONNE GAUCHE ── */}
                <aside className={`w-1/2 flex-shrink-0 border-r border-gray-200 h-full flex flex-col pl-16${hideAside ? ' hidden' : ''}`}>
                    {/* Retour + titre */}
                    <div className="px-5 pt-6 pb-4 flex-shrink-0">
                        <button
                            onClick={() => navigate('/airbnb/annonces')}
                            className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors mb-4 -ml-1"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <h1 className="text-2xl font-semibold text-gray-900 leading-snug">
                            Outil de modification d'annonce
                        </h1>
                    </div>

                    {/* Tabs toggle — style segmented control */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 flex-shrink-0">
                        <div className="flex-1 flex bg-gray-100 rounded-full p-0.5">
                            {[
                                { id: 'monLogement', label: 'Mon logement' },
                                { id: 'guideArrivee', label: "Guide d'arrivée" },
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`flex-1 py-2 text-xs font-medium rounded-full transition-all ${activeTab === tab.id
                                        ? 'bg-white text-gray-900 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
                            <Settings className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Cartes — scrollable */}
                    <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
                        {cards.map(card => {
                            const isActive = selectedCard === card.id
                            const cardCls = `w-full text-left rounded-xl border transition-colors duration-150 ${isActive
                                ? 'border-gray-900 bg-gray-100 shadow-[0_6px_18px_rgba(0,0,0,0.08)]'
                                : 'border-gray-100 bg-white shadow-[0_6px_18px_rgba(0,0,0,0.08)] hover:bg-gray-100'
                                }`

                            // Carte spéciale horaires (double colonne)
                            if (card.isSpecial) {
                                const times = card.preview(listing)
                                return (
                                    <button key={card.id} onClick={() => setSelectedCard(card.id)} className={cardCls}>
                                        <div className="grid grid-cols-2 divide-x divide-gray-200">
                                            <div className="px-4 py-4">
                                                <p className="text-xs text-gray-500 mb-1">Arrivée</p>
                                                <p className="text-sm font-semibold text-gray-900">{times.checkIn}</p>
                                            </div>
                                            <div className="px-4 py-4">
                                                <p className="text-xs text-gray-500 mb-1">Départ</p>
                                                <p className="text-sm font-semibold text-gray-900">{times.checkOut}</p>
                                            </div>
                                        </div>
                                    </button>
                                )
                            }

                            // Carte avec preview d'icônes
                            if (card.previewIcons) {
                                const items = card.previewIcons(listing)
                                return (
                                    <button key={card.id} onClick={() => setSelectedCard(card.id)} className={`${cardCls} px-4 py-4`}>
                                        <p className="text-sm font-semibold text-gray-900 mb-2">{card.label}</p>
                                        <div className="space-y-1">
                                            {items.map((item, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <item.icon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                                    <p className="text-xs text-gray-500 line-clamp-1">{item.text}</p>
                                                </div>
                                            ))}
                                            {card.extra && <p className="text-xs text-gray-400 pl-5">{typeof card.extra === 'function' ? card.extra(listing) : card.extra}</p>}
                                        </div>
                                    </button>
                                )
                            }

                            // Carte spéciale "Visite photo" — mini-mosaïque
                            if (card.id === 'photos') {
                                const { rooms } = listing.photos
                                const { capacity } = listing
                                const withPhotos = rooms.filter(r => r.count > 0)
                                const totalPhotos = rooms.reduce((sum, r) => sum + r.count, 0)
                                const missingCount = rooms.filter(r => r.count === 0).length
                                const mSrc = (room) => room.photoUrl || `https://images.unsplash.com/photo-${room.photoId}?w=300&h=200&fit=crop`
                                const [l1, l2, mid, r1, r2] = withPhotos
                                return (
                                    <button key={card.id} onClick={() => setSelectedCard(card.id)} className={cardCls}>
                                        <div className="px-4 pt-4 pb-2">
                                            <p className="text-sm font-semibold text-gray-900 mb-0.5">{card.label}</p>
                                            <p className="text-xs text-gray-500">
                                                {capacity.bedrooms} chambres · {capacity.beds} lits · {capacity.bathrooms} salle de bain
                                            </p>
                                        </div>
                                        {withPhotos.length >= 5 && (
                                            <div className="flex gap-1 h-36 mx-4 rounded-xl overflow-hidden mb-2">
                                                <div className="flex flex-col gap-1 w-[22%]">
                                                    {[l1, l2].map(r => (
                                                        <div key={r.id} className="flex-1 overflow-hidden">
                                                            <img src={mSrc(r)} alt={r.label} className="w-full h-full object-cover" />
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="relative flex-1 overflow-hidden">
                                                    <img src={mSrc(mid)} alt={mid.label} className="w-full h-full object-cover" />
                                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full shadow whitespace-nowrap">
                                                        {totalPhotos} photos
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-1 w-[22%]">
                                                    {[r1, r2].map(r => (
                                                        <div key={r.id} className="flex-1 overflow-hidden">
                                                            <img src={mSrc(r)} alt={r.label} className="w-full h-full object-cover" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {missingCount > 0 && (
                                            <div className="flex items-center gap-2 px-4 pb-4">
                                                <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                                                <span className="text-xs font-medium text-gray-900">
                                                    Vous avez {missingCount} tâche{missingCount > 1 ? 's' : ''}
                                                </span>
                                            </div>
                                        )}
                                    </button>
                                )
                            }

                            // Carte spéciale "À propos de l'hôte" — avatar centré
                            if (card.id === 'hote') {
                                const mainHost = cohotes.find(c => c.isMain)
                                return (
                                    <button key={card.id} onClick={() => setSelectedCard(card.id)} className={`${cardCls} px-4 py-4`}>
                                        <p className="text-sm font-semibold text-gray-900 mb-4">{card.label}</p>
                                        <div className="flex flex-col items-center pb-2">
                                            <div className="relative mb-3">
                                                <img src={mainHost.avatar} alt={mainHost.name} className="w-20 h-20 rounded-full object-cover" />
                                                <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#FF385C] flex items-center justify-center border-2 border-white">
                                                    <Check className="w-3.5 h-3.5 text-white" />
                                                </div>
                                            </div>
                                            <p className="text-sm font-semibold text-gray-900">{mainHost.name.split(' ')[0]}</p>
                                            <p className="text-xs text-gray-500 mt-0.5">Hôte depuis {property?.hostSince || '2018'}</p>
                                        </div>
                                    </button>
                                )
                            }

                            // Carte spéciale "Co-hôtes" — liste avec petits avatars
                            if (card.id === 'cohotes') {
                                const nonMain = cohotes.filter(c => !c.isMain)
                                return (
                                    <button key={card.id} onClick={() => setSelectedCard(card.id)} className={`${cardCls} px-4 py-4`}>
                                        <p className="text-sm font-semibold text-gray-900 mb-3">{card.label}</p>
                                        <div className="space-y-3">
                                            {nonMain.map(c => (
                                                <div key={c.id} className="flex items-center gap-3">
                                                    <AvatarCircle cohost={c} size="sm" />
                                                    <div className="min-w-0">
                                                        <p className="text-xs font-semibold text-gray-900 truncate">{c.name}</p>
                                                        <p className="text-xs text-gray-500 truncate">{c.role || c.access}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </button>
                                )
                            }

                            // Carte spéciale "Lieu" — mini map + adresse
                            if (card.id === 'lieu') {
                                const rawAddr = property?.address?.split('|')[0]?.trim() || ''
                                const encodedAddr = encodeURIComponent(rawAddr)
                                const mapSrc = `https://maps.google.com/maps?q=${encodedAddr}&output=embed&z=13`
                                return (
                                    <button key={card.id} onClick={() => setSelectedCard(card.id)} className={cardCls}>
                                        <div className="px-4 pt-4 pb-2">
                                            <p className="text-sm font-semibold text-gray-900">{card.label}</p>
                                        </div>
                                        <div className="mx-4 rounded-xl overflow-hidden h-28 mb-1">
                                            <iframe
                                                title="map-card-preview"
                                                src={mapSrc}
                                                className="w-full h-full border-0 pointer-events-none"
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                            />
                                        </div>
                                        <div className="px-4 pb-4 pt-2">
                                            <p className="text-xs text-gray-600 leading-snug">{rawAddr}</p>
                                        </div>
                                    </button>
                                )
                            }

                            // Carte spéciale "Guides" — mini tuile
                            if (card.id === 'guides') {
                                return (
                                    <button key={card.id} onClick={() => setSelectedCard(card.id)} className={`${cardCls} px-4 py-4`}>
                                        <p className="text-sm font-semibold text-gray-900 mb-2">{card.label}</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-gray-400 flex-shrink-0" />
                                            <p className="text-xs text-gray-500">Guide créé par Letahost</p>
                                        </div>
                                    </button>
                                )
                            }

                            // Carte spéciale "Titre" — grand titre
                            if (card.id === 'titre') {
                                return (
                                    <button key={card.id} onClick={() => setSelectedCard(card.id)} className={`${cardCls} px-4 py-4`}>
                                        <p className="text-xs text-gray-400 mb-2">{card.label}</p>
                                        <p className="text-xl font-semibold text-gray-900 leading-snug">{property?.name}</p>
                                    </button>
                                )
                            }

                            // Carte standard
                            const previewText = card.preview ? card.preview(listing, property) : ''
                            return (
                                <button key={card.id} onClick={() => setSelectedCard(card.id)} className={`${cardCls} px-4 py-4`}>
                                    <div className="flex items-start justify-between gap-2">
                                        <p className="text-sm font-semibold text-gray-900 leading-snug">{card.label}</p>
                                        {card.hasAlert && <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-1" />}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 leading-snug whitespace-pre-line">{previewText}</p>
                                </button>
                            )
                        })}
                    </div>

                    {/* Bouton Aperçu */}
                    <div className="flex-shrink-0 px-5 py-4 border-t border-gray-200 bg-white">
                        <button className="mx-auto flex items-center justify-center gap-2 bg-gray-900 text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-gray-800 transition-colors">                            <Eye className="w-4 h-4" />
                            Aperçu
                        </button>
                    </div>
                </aside>

                {/* ── COLONNE DROITE ── */}
                <main className="flex-1 overflow-y-auto h-full no-scrollbar">
                    {renderPanel
                        ? renderPanel({ listing, property, onHideAside: setHideAside })
                        : <div className="px-8 py-12 text-gray-400 text-sm">Sélectionnez une rubrique dans le menu de gauche.</div>
                    }
                </main>

            </div>
        </div>
    )
}

export default AirbnbAnnonceDetail
