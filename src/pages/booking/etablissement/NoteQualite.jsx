import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { useParams } from 'react-router-dom'
import propertiesData from '../../../data/booking/properties.json'
import { ExternalLink, ChevronDown, Building2, Coffee, Thermometer, Wine, Wind, Utensils, Shirt, Home, Car, Bike, Microwave } from 'lucide-react'
import { useState } from 'react'

function NoteQualite() {
    const { id } = useParams()
    const property = propertiesData.find(p => p.id === id)

    const [openAccordion, setOpenAccordion] = useState(null)

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index)
    }

    const pointsForts = [
        {
            category: 'Équipements de cuisine',
            items: ['Bouilloire électrique', 'Lave-vaisselle', 'Plaque de cuisson', 'Machine à café', 'Micro-ondes', 'Réfrigérateur']
        },
        {
            category: 'Contrôle de la température',
            items: ['Chauffage']
        },
        {
            category: 'Gourmandises',
            items: ['Verres à vin']
        },
        {
            category: 'Lave-linge/Buanderie',
            items: ['Matériel de repassage', 'Fer à repasser', 'Étendoir']
        },
        {
            category: 'Installations extérieures',
            items: ['Mobilier extérieur', 'Balcon']
        }
    ]

    const recommandations = [
        {
            icon: Coffee,
            title: 'Coffre-fort',
            description: 'On pourrait penser que les coffres-forts sont réservés aux hôtels, mais ils permettent en réalité à vos clients de sortir l\'esprit tranquille.'
        },
        {
            icon: Shirt,
            title: 'Placards',
            description: 'Les placards sont souvent proposés dans les hôtels, mais en mettre à disposition des clients ajoutera une touche de luxe à votre hébergement.'
        },
        {
            icon: Car,
            title: 'Navette aéroport',
            description: ''
        },
        {
            icon: Bike,
            title: 'Livraison de courses',
            description: ''
        },
        {
            icon: Microwave,
            title: 'Four',
            description: ''
        }
    ]

    const faqItems = [
        {
            question: 'Comment ma note de qualité est-elle calculée ?',
            answer: 'Booking.com utilise un algorithme qui prend en compte les équipements et les installations de votre hébergement, sa superficie ainsi que les services disponibles. Cela a été pensé pour assurer que la note de qualité soit fiable pour tous les établissements proposés sur notre site.'
        },
        {
            question: 'Quels sont les avantages d\'une note de qualité ?',
            answer: "Les hébergements indépendants apparaissent désormais en même temps que les hôtels lorsque les clients filtrent les résultats par nombre d'étoiles. Cela vous rend plus visible et vous permet de recevoir plus de réservations."
        },
        {
            question: 'À quels hébergements ce système s\'applique-t-il ?',
            answer: "Cette note de qualité concerne les types d'hébergements suivants sur Booking.com : appartements, villas, maisons de vacances, maisons d'hôtes, B&B/chambres d'hôtes, appart'hôtels, séjours à la campagne, fermes, chalets, riads et gîtes."
        },
        {
            question: 'Ma note des commentaires a-t-elle un impact sur ma note de qualité ?',
            answer: "La note des commentaires de votre hébergement n'est pas directement liée à sa note de qualité. Cependant, si votre note des commentaires est très basse, cela pourrait également faire baisser votre note de qualité si cette dernière se trouve entre 2 notes. Remarque : si votre note de propreté est inférieure à 6, votre hébergement ne se verra pas décerner de note de qualité. Il n'est pas rare qu'un établissement affiche une note de qualité de 3 avec une note des commentaires plus élevée qu'un établissement ayant obtenu une note de qualité de 4 ou 5. Les notes des commentaires reposent en effet sur l'expérience globale des clients, sur la satisfaction de leurs attentes et sur la propreté de votre hébergement. Souvenez-vous qu'il est préférable d'afficher une note de qualité qui reflète la réalité plutôt qu'une note plus élevée qui ne correspondrait pas aux attentes des clients. "
        },
        {
            question: 'Le score de la page de mon établissement a-t-il un impact sur ma note de qualité ?',
            answer: "Un score de page d'établissement élevé n'est pas directement lié à une note de qualité élevée. Cependant, avec un score de page d'établissement élevé, vous gagnerez en attractivité auprès des clients potentiels. Nous vous recommandons de renseigner autant d'informations que possible afin que le score de la page de votre établissement atteigne 90 %, et ce, avant de suivre les mesures proposées ci-dessous pour booster votre note de qualité."
        },
        {
            question: 'Comment puis-je améliorer ma note de qualité ?',
            answer: "Les suggestions proposées sur cette page ont été pensées sur mesure pour votre hébergement. Les adopter améliorera donc la qualité globale de votre hébergement, ce qui pourra ensuite engendrer une note de qualité supérieure. N'oubliez pas qu'il est plus important d'afficher une note qui reflète la réalité plutôt qu'une note plus élevée qui ne correspondrait pas forcément aux attentes des clients. Si votre note de qualité est plus élevée qu'elle ne devrait l'être et que vos clients sont déçus, vous pourriez recevoir des commentaires négatifs et donc obtenir une note des commentaires plus basse."
        }
    ]

    if (!property) {
        return <div>Propriété non trouvée</div>
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Note de qualité</h1>

                <div className="grid grid-cols-3 gap-6">
                    {/* Colonne principale (2/3) */}
                    <div className="col-span-2 space-y-6">
                        {/* Carte propriété */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex gap-4">
                                <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                                    <Building2 className="w-10 h-10 text-gray-400" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h2 className="text-lg font-semibold text-gray-900 mb-1">
                                                {property.name}
                                            </h2>
                                            <div className="flex items-center gap-1 mb-2">
                                                {[...Array(3)].map((_, i) => (
                                                    <span key={i} className="text-yellow-400">★</span>
                                                ))}
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                2 Rue du Plan, 84000 Avignon, France
                                            </p>
                                        </div>
                                        <button className="text-[#0071c2] hover:text-[#005999]">
                                            <ExternalLink className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-700 leading-relaxed">
                                    Cet hébergement a reçu une note de qualité de <span className="font-semibold">3</span>. Cette notation repose sur une comparaison avec d'autres hébergements indépendants sur notre site. Pour effectuer cette notation, Booking.com utilise un algorithme qui prend en compte des facteurs tels que les équipements, la superficie et les services proposés. Cette note, qui est revue périodiquement, <span className="font-semibold">a été mise à jour pour la dernière fois en octobre 2025.</span>
                                </p>
                            </div>
                        </div>

                        {/* Points forts */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Points forts</h2>
                            <p className="text-sm text-gray-600 mb-6">
                                Voici quelques éléments qui vous permettent de vous distinguer des hébergements ayant reçu une note inférieure :
                            </p>

                            <div className="grid grid-cols-3 gap-8">
                                {pointsForts.map((category, index) => (
                                    <div key={index}>
                                        <div className="flex items-start gap-3 mb-4">
                                            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                                                {category.category === 'Équipements de cuisine' && <Utensils className="w-6 h-6 text-gray-700" />}
                                                {category.category === 'Contrôle de la température' && <Thermometer className="w-6 h-6 text-gray-700" />}
                                                {category.category === 'Gourmandises' && <Wine className="w-6 h-6 text-gray-700" />}
                                                {category.category === 'Lave-linge/Buanderie' && <Wind className="w-6 h-6 text-gray-700" />}
                                                {category.category === 'Installations extérieures' && <Home className="w-6 h-6 text-gray-700" />}
                                            </div>
                                            <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                                                {category.category}
                                            </h3>
                                        </div>
                                        <ul className="space-y-2 ml-13">
                                            {category.items.map((item, itemIndex) => (
                                                <li key={itemIndex} className="text-sm text-gray-700">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recommandations */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommandations</h2>
                            <p className="text-sm text-gray-600 mb-6">
                                Les actions que vous entreprendrez pour améliorer la performance de votre hébergement seront prises en compte dans le calcul de votre prochaine note de qualité.
                            </p>

                            <h3 className="text-base font-semibold text-gray-900 mb-4">
                                Équipements et services recommandés
                            </h3>
                            <p className="text-sm text-gray-600 mb-6">
                                En proposant ces équipements, votre hébergement deviendra plus attractif et vos clients pourront bénéficier d'un séjour plus agréable. Cette liste personnalisée repose sur votre note de qualité et sur les attentes de vos clients.
                            </p>

                            <div className="space-y-4">
                                {recommandations.map((item, index) => {
                                    const Icon = item.icon
                                    return (
                                        <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-b-0">
                                            <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-6 h-6 text-gray-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                                                    {item.title}
                                                </h4>
                                                {item.description && (
                                                    <p className="text-sm text-gray-600 leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <button className="px-4 py-2 text-[#0071c2] border border-[#0071c2] rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                                                    Autres actions
                                                </button>
                                                <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                                    Ajouter à mes équipements
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                                <a href="#" className="text-[#0071c2] text-sm hover:underline block">
                                    En savoir plus sur la note de qualité en visitant le Partner Hub
                                </a>
                                <a href="#" className="text-[#0071c2] text-sm hover:underline block">
                                    En savoir plus sur le système des recommandations pour la note de qualité des hébergements
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar droite (1/3) */}
                    <div className="space-y-6">
                        {/* Score de la page */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-base font-semibold text-gray-900 mb-4">
                                Score de la page de l'établissement
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Indique l'attractivité de votre page Booking.com pour vos clients potentiels, en fonction des informations et des photos que vous ajoutez.
                            </p>

                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Votre score peut encore être amélioré</span>
                                    <span className="text-lg font-bold text-[#008009]">94 %</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-[#008009] h-2 rounded-full" style={{ width: '94%' }}></div>
                                </div>
                            </div>

                            <button className="w-full px-4 py-2 text-[#0071c2] border border-[#0071c2] rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                                Ça m'intéresse
                            </button>
                        </div>

                        {/* FAQ Accordéons */}
                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                            {faqItems.map((item, index) => (
                                <div key={index} className="border-b border-gray-200 last:border-b-0">
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="text-sm font-medium text-gray-900 pr-4">
                                            {item.question}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${openAccordion === index ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    {openAccordion === index && (
                                        <div className="px-6 pb-4">
                                            <p className="text-sm text-gray-600 leading-relaxed">
                                                {item.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default NoteQualite