import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { Info, ChevronRight, X } from 'lucide-react'
import { useState } from 'react'

function Descriptions() {
    const [savoirItems, setSavoirItems] = useState([
        { id: 1, text: "Veuillez indiquer que cet appartement lumineux Avignon centre, près le Palais des Papes dispose le logiciel n'interdire d'accepter certaines catégories de clients, vous pouvez indiquer cette information dans votre description d'établissement lors de la réservation du contacter directement l'établissement. Les coordonnées figurent sur votre confirmation de réservation.", checked: false },
        { id: 2, text: "Vous devez informer cet prêt des clients avec précis au sur le ou carte de crédit lors du check-out (c'est-à-dire la confirmation de réservation, un mail de Booking.com, une page de l'extranet, ou en contactant directement l'établissement).", checked: false },
        { id: 3, text: "Vous devez afficher un element bancaire avant votre arrivée, établissement ses coordonnées que vous donnez deut confirmation.", checked: false },
        { id: 4, text: "Conformément aux mesures gouvernementales visant à limiter la propagation du coronavirus (COVID-19), cet établissement n'accepte pas les clients durant les dates comprises par ces mesures.", checked: false },
        { id: 5, text: "Conformément aux mesures gouvernementales visant à limiter la propagation du coronavirus (COVID-19), cet établissement peut demander aux clients de fournir des documents supplémentaires.", checked: false },
        { id: 6, text: "Conformément aux mesures gouvernementales visant à limiter la propagation du coronavirus (COVID-19), cet établissement accepte uniquement des réservations effectuées par des voyageurs autorisés, des autres.", checked: false },
        { id: 7, text: "Du fait de la pandémie de coronavirus (COVID-19), cet établissement a suspendu temporairement son service de navette.", checked: false },
        { id: 8, text: "En raison de la pandémie de coronavirus (COVID-19), cet établissement prend des mesures pour assurer la sécurité de ses clients et de son personnel. Certains services et équipements peuvent être réduits ou indisponibles.", checked: false },
        { id: 9, text: "En raison de la pandémie de coronavirus (COVID-19), cet établissement a réduit les horaires de sa réception et de ses services.", checked: false },
        { id: 10, text: "Conformément aux directives du gouvernement visant à limiter la transmission du coronavirus (COVID-19), cet établissement n'accepte les réservations que de ressortissants de certains pays durant les dates où de telles directives sont en vigueur. En conséquence, il faut que l'information pertinente sur dates concernées soit bien documentée.", checked: false },
        { id: 11, text: "Le spa et la salle de sport de cet établissement sont actuellement fermés en raison de la pandémie de coronavirus (COVID-19).", checked: false },
        { id: 12, text: "En raison des coronavirus (COVID-19), cet établissement applique des mesures strictes en matière de distanciation physique.", checked: false }
    ])

    const handleCheckboxChange = (id) => {
        setSavoirItems(savoirItems.map(item =>
            item.id === id ? { ...item, checked: !item.checked } : item
        ))
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-3 gap-8">
                    {/* Colonne principale */}
                    <div className="col-span-2">
                        <h1 className="text-3xl font-bold text-gray-900 mb-3">Vos descriptions</h1>
                        <p className="text-sm text-gray-600 mb-8">
                            C'est ici que vous pouvez voir les descriptions de votre et autres établissements que vous avez été introduit dans la section « Établissement » de l'extranet seront traduites par nos Éditions. Pour voir un historique de nos services de traduction.
                        </p>

                        {/* Description de l'établissement */}
                        <div className="mb-8">
                            {/* Titre avec fond bleu */}
                            <div className="bg-[#003580] px-4 py-2 rounded-t-lg">
                                <h2 className="text-lg font-semibold text-white">
                                    Description de l'établissement
                                </h2>
                            </div>

                            {/* Contenu avec fond blanc */}
                            <div className="bg-white border border-gray-200 border-t-0 rounded-b-lg p-6">
                                <p className="text-sm text-gray-600 mb-6">
                                    Il s'agit de la description qui présente votre établissement aux clients.
                                </p>

                                <div className="space-y-4 text-sm text-gray-800 mb-6">
                                    <p>
                                        <strong>Modern Comforts:</strong> Bel appartement lumineux-Avignon centre, vue le Palais des Papes depuis la loggia in Avignon offers free WiFi, a balcony, and a fully equipped kitchen. The apartment includes a living room with a sofa, dining area, and tiled and parquet floors.
                                    </p>
                                    <p>
                                        <strong>Convenient Facilities:</strong> Guests benefit from private check-in and check-out services, an outdoor seating area, and family rooms. Additional amenities include a hairdryer, coffee machine, dishwasher, microwave, and TV.
                                    </p>
                                    <p>
                                        <strong>Prime Location:</strong> Located 59 km from Nîmes-Alès-Camargue-Cévennes Airport, the property is a 7-minute walk from the Papal Palace and a 1.2 km from Avignon Central Station. Pont d'Avignon is a 9-minute walk away. Boating is available in the surroundings.
                                    </p>
                                </div>

                                <p className="text-sm text-gray-700 mb-4">
                                    La description de votre hébergement est générée à partir des équipements et installations que vous renseignez. La description est ensuite traduite dans plusieurs langues. Vous pouvez ainsi attirer tous les clients potentiels et obtenir plus de réservations.
                                </p>

                                <p className="text-sm text-gray-700 mb-6">
                                    Vous pouvez facilement mettre à jour votre description en modifiant vos{' '}
                                    <a href="#" className="text-[#0071c2] hover:underline">équipements</a> ou les{' '}
                                    <a href="#" className="text-[#0071c2] hover:underline">détails de vos hébergements</a>.
                                </p>

                                {/* Info box profil d'hôte */}
                                <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-6 flex items-start gap-3">
                                    <Info className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                            Ajoutez une touche personnelle en créant votre profil d'hôte
                                        </h3>
                                        <p className="text-sm text-gray-700 mb-4">
                                            Rédigez une description personnalisée de votre hébergement et de votre quartier, et profitez-en pour y ajouter quelques mots sur vous-même afin de vous présenter à vos futurs clients.
                                        </p>
                                        <button className="px-4 py-2 text-[#0071c2] border border-[#0071c2] rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                                            Aller au profil d'hôte
                                        </button>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <p className="text-sm text-gray-700 mb-2">
                                    Votre description est conçue de manière à vous assurer le plus de réservations possible. Par conséquent, nous ne pouvons pas la modifier sauf en cas de faute de frappe.
                                </p>
                                <p className="text-sm text-gray-700 mb-4">
                                    En moyenne, les demandes sont traitées sous <strong>6 jours</strong>.
                                </p>
                                <p className="text-sm text-gray-700 mb-2">
                                    <a href="#" className="text-[#0071c2] hover:underline">Vous avez constaté une faute de frappe ? Demandez une modification.</a>
                                </p>
                                <p className="text-sm text-gray-600">
                                    À savoir : veuillez signaler les fautes de frappe sous forme de liste à puces.
                                </p>
                            </div>
                        </div>

                        {/* Descriptions d'hébergements */}
                        <div className="mb-8">
                            <div className="bg-white rounded-lg border border-gray-300 overflow-hidden">
                                {/* Header */}
                                <div className="px-6 py-4 border-b border-gray-300">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        Descriptions d'hébergements
                                    </h2>
                                </div>

                                {/* Contenu */}
                                <div className="px-6 py-6">
                                    <p className="text-sm text-gray-600 mb-6">
                                        Il s'agit des descriptions qui présentent vos hébergements aux clients :
                                    </p>

                                    <div className="mb-4">
                                        <h3 className="text-base font-bold text-gray-900 mb-3">
                                            Appartement 1 Chambre
                                        </h3>
                                        <p className="text-sm text-gray-800 leading-relaxed mb-4">
                                            Featuring a private entrance, this apartment is comprised of 1 living room, 1 separate bedroom and 1 bathroom with a shower and a hairdryer. The well-equipped kitchen features a stovetop, a refrigerator, a dishwasher and kitchenware. A seating area with a flat-screen TV, a coffee machine and a balcony are featured in this apartment. The unit offers 1 bed.
                                        </p>
                                        <a href="#" className="text-[#0071c2] text-sm hover:underline inline-flex items-center gap-1">
                                            Demander une modification
                                            <ChevronRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* La rubrique À savoir */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                La rubrique « À savoir »
                            </h2>
                            <p className="text-sm text-gray-700 mb-6">
                                Faites-nous part de conditions spécifiques à votre établissement aux utilisateurs pour le ou dément :
                            </p>

                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <p className="text-sm font-semibold text-gray-900 mb-4">
                                    Conditions supplémentaires:
                                </p>
                                <div className="space-y-3">
                                    {savoirItems.map((item) => (
                                        <label key={item.id} className="flex items-start gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={item.checked}
                                                onChange={() => handleCheckboxChange(item.id)}
                                                className="mt-1 w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                            />
                                            <span className="text-sm text-gray-700 leading-relaxed">
                                                {item.text}
                                            </span>
                                        </label>
                                    ))}
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <p className="text-sm text-[#0071c2] hover:underline cursor-pointer">
                                        L'information que vous recherchez communiquer n'est pas proposée ci-dessus ?
                                    </p>
                                </div>

                                <div className="mt-4">
                                    <p className="text-sm text-gray-600">
                                        Vous recherchez vos paramètres relatifs à la remise des clés ? <a href="#" className="text-[#0071c2] hover:underline">Rendez-vous sur la page Conditions</a>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bouton demander modification */}
                        <button className="w-full px-6 py-3 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-base font-medium">
                            Demander une modification
                        </button>
                    </div>

                    {/* Sidebar droite */}
                    <div className="col-span-1">
                        <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
                            <h3 className="text-base font-semibold text-gray-900 mb-4">
                                Mettez en avant les atouts de votre établissement en quelques clics :
                            </h3>
                            <ul className="space-y-4">
                                <li>
                                    <a href="#" className="text-sm text-[#0071c2] hover:underline flex items-start gap-2">
                                        <span className="text-lg">📝</span>
                                        <span>Insérer des modifications en cas d'erreur. Les demandes listées ici seront traitées par notre équipe de réception.</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-[#0071c2] hover:underline flex items-start gap-2">
                                        <span className="text-lg">📸</span>
                                        <span>Ajouter des photos de votre établissement pour en optimiser la mise en page et attirer les clients</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-[#0071c2] hover:underline flex items-start gap-2">
                                        <span className="text-lg">🏷️</span>
                                        <span>Marquez vos photos pour leur permettre de trouver facilement ce qu'ils veulent voir</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-[#0071c2] hover:underline flex items-start gap-2">
                                        <span className="text-lg">📊</span>
                                        <span>Informez les clients des meilleures disponibles sur place</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-[#0071c2] hover:underline flex items-start gap-2">
                                        <span className="text-lg">💬</span>
                                        <span>Définissez des clients via sur les autres de cette publication</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="text-sm text-[#0071c2] hover:underline flex items-start gap-2">
                                        <span className="text-lg">📧</span>
                                        <span>Rédigez un message de bienvenue et donnez plus de détails sur votre établissement</span>
                                    </a>
                                </li>
                            </ul>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-sm font-medium text-gray-900 mb-3">
                                    Informez vos clients des conditions générales :
                                </p>
                                <ul className="space-y-3">
                                    <li>
                                        <a href="#" className="text-sm text-[#0071c2] hover:underline flex items-start gap-2">
                                            <span className="text-lg">ℹ️</span>
                                            <span>Communiquez aux clients les informations sur les éventuelles taxes et frais local</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-sm text-[#0071c2] hover:underline flex items-start gap-2">
                                            <span className="text-lg">📋</span>
                                            <span>Donnez aux clients des informations sur les partitions personnalisées ou vos tarifications Wi-Fi, et des conditions d'annulation.</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default Descriptions