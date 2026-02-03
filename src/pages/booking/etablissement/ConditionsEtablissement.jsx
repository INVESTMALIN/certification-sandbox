import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { X, AlertCircle } from 'lucide-react'
import { useState } from 'react'

function ConditionsEtablissement() {
    const [showTopAlert, setShowTopAlert] = useState(true)
    const [showBottomAlert, setShowBottomAlert] = useState(true)

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-6xl mx-auto px-6 py-8">
                {/* Alerte du haut */}
                {showTopAlert && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start justify-between">
                        <div className="flex-1">
                            <p className="text-sm text-gray-900 font-semibold mb-1">
                                Nous avons réorganisé la page « Conditions »
                            </p>
                            <p className="text-sm text-gray-700">
                                Pour vous aider à trouver plus facilement ce dont vous avez besoin, nous avons divisé la page « Conditions » en 2 sections : « Conditions de l'établissement » et « Conditions de réservation ». Ces pages sont accessibles depuis le menu « Établissement ».
                            </p>
                        </div>
                        <button
                            onClick={() => setShowTopAlert(false)}
                            className="ml-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-3 mb-6">
                    <button className="text-[#0071c2] text-sm hover:underline">
                        Donner mon avis
                    </button>
                    <button className="text-gray-600 text-sm hover:underline">
                        Partager
                    </button>
                </div>

                {/* Titre */}
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Conditions de l'établissement</h1>
                <p className="text-sm text-gray-600 mb-8">
                    Vous trouverez sur cette page toutes les informations relatives aux conditions de votre établissement. Vous pouvez ainsi les consulter, les gérer et les modifier, le tout au même endroit.
                </p>

                {/* Section Enfants et lits d'appoint */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Enfants et lits d'appoint</h2>

                    {/* Alerte jaune */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-900">
                            Vous pouvez créer encore plus de tarifs enfants personnalisés grâce aux{' '}
                            <a href="#" className="text-[#0071c2] hover:underline font-semibold">
                                nouveaux tarifs enfants flexibles
                            </a>.{' '}
                            <a href="#" className="text-[#0071c2] hover:underline">
                                Cliquez ici
                            </a>{' '}
                            pour en savoir plus.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Conditions relatives aux enfants */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-base font-semibold text-gray-900 mb-4">
                                Conditions relatives aux enfants
                            </h3>
                            <div className="space-y-3 mb-6">
                                <p className="text-sm text-gray-700">Conditions relatives aux enfants</p>
                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                    <li>Les enfants de tous âges sont acceptés.</li>
                                </ul>
                                <p className="text-sm text-gray-700">Tarifs enfants</p>
                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                    <li>Vous n'avez pas fixé de tarifs enfants.</li>
                                </ul>
                            </div>
                            <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                Modifier
                            </button>
                        </div>

                        {/* Options relatives aux lits d'appoint */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-base font-semibold text-gray-900 mb-4">
                                Options relatives aux lits d'appoint et aux lits bébé
                            </h3>
                            <div className="space-y-3 mb-6">
                                <p className="text-sm text-gray-700">Lits bébé</p>
                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                    <li>Vous n'avez ajouté aucun lit bébé.</li>
                                </ul>
                                <p className="text-sm text-gray-700">Lits d'appoint</p>
                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                    <li>Vous n'avez ajouté aucun lit d'appoint.</li>
                                </ul>
                            </div>
                            <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                Modifier
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section Autres conditions */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Autres conditions</h2>

                    <div className="space-y-6">
                        {/* Ligne 1 : Moyens de paiement + Internet et parking */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-base font-semibold text-gray-900 mb-4">
                                    Moyens de paiement des clients
                                </h3>
                                <div className="space-y-3 mb-6">
                                    <p className="text-sm text-gray-700">
                                        Vous utilisez le service Paiements par Booking.com.
                                    </p>
                                    <p className="text-sm text-gray-600 italic">
                                        Qu'est-ce que cela signifie ?
                                    </p>
                                    <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1 ml-2">
                                        <li>On client réserve un séjour dans votre établissement.</li>
                                        <li>Booking.com coordonne le paiement en ligne pour le client.*</li>
                                        <li>Vous recevez le paiement par virement bancaire.</li>
                                    </ol>
                                    <p className="text-sm text-gray-600">
                                        Pour en savoir plus, rendez-vous sur la{' '}
                                        <a href="#" className="text-[#0071c2] hover:underline">
                                            page d'informations (s'ouvre par Booking.com)
                                        </a>.
                                    </p>
                                    <p className="text-xs text-gray-500 italic">
                                        * Nous devons toujours sécuriser directement certains Frais + sur demande à partir de vos clients lors de l'enregistrement.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-base font-semibold text-gray-900 mb-4">
                                    Internet et parking
                                </h3>
                                <div className="space-y-3 mb-6">
                                    <p className="text-sm font-medium text-gray-900">Internet</p>
                                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                        <li>Une connexion Wi-Fi est disponible dans les chambres gratuitement.</li>
                                    </ul>
                                    <p className="text-sm font-medium text-gray-900">Parking</p>
                                    <p className="text-sm text-gray-600">
                                        <AlertCircle className="w-4 h-4 inline mr-1 text-orange-500" />
                                        Les informations relatives au parking se trouvent désormais sur la page{' '}
                                        <a href="#" className="text-[#0071c2] hover:underline">
                                            Équipements et services
                                        </a>.
                                    </p>
                                </div>
                                <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                    Modifier
                                </button>
                            </div>
                        </div>

                        {/* Ligne 2 : Informations clients + Frais supplémentaires */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-base font-semibold text-gray-900 mb-4">
                                    Informations clients
                                </h3>
                                <div className="space-y-3 mb-6">
                                    <p className="text-sm font-medium text-gray-900">Horaires d'arrivée et de départ</p>
                                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                        <li>Arrivée de 16h00 à 0h00</li>
                                        <li>Départ jusqu'à 10h00</li>
                                    </ul>
                                    <p className="text-sm font-medium text-gray-900">Adresse du client</p>
                                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                        <li>Vos clients n'ont pas à fournir d'adresse lorsqu'ils font une réservation.</li>
                                    </ul>
                                    <p className="text-sm font-medium text-gray-900">Numéro de téléphone du client</p>
                                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                        <li>Vos clients doivent fournir un numéro de téléphone lorsqu'ils font une réservation.</li>
                                    </ul>
                                    <p className="text-sm font-medium text-gray-900">Limite d'âge</p>
                                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                        <li>Aucune limite d'âge</li>
                                    </ul>
                                    <p className="text-sm font-medium text-gray-900">Couvre-feu</p>
                                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                        <li>Pas de couvre-feu</li>
                                    </ul>
                                </div>
                                <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                    Modifier
                                </button>
                            </div>

                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-base font-semibold text-gray-900 mb-4">
                                    Frais supplémentaires
                                </h3>
                                <div className="space-y-3 mb-6">
                                    <p className="text-sm text-gray-700">Vous facturez des frais supplémentaires aux clients</p>
                                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                        <li>Ménage à 40 €/séjour - non compris dans le tarif</li>
                                    </ul>
                                </div>
                                <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                    Modifier
                                </button>
                            </div>
                        </div>

                        {/* Ligne 3 : Conditions relatives aux dommages + Remise des clés */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-base font-semibold text-gray-900 mb-4">
                                    Conditions relatives aux dommages
                                </h3>
                                <div className="space-y-3 mb-6">
                                    <p className="text-sm text-gray-700">
                                        Booking.com damage programme faciliterait vos damage payments
                                    </p>
                                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                        <li>Les clients ne vous signerez pas de dépôt de garantie.</li>
                                        <li>Utilisez la technologie d'identification de Booking.com pour facturer leur séjour.</li>
                                        <li>Si vous soumettez une demande de paiement de dommages causés, vérifiez.</li>
                                    </ul>
                                    <p className="text-sm text-gray-700">
                                        Si vous prévoyez demander jusqu'à €200 par séjour pour les frais refusés aux clients dans votre hébergement, envisagez une demande de paiement. Les documents couvrant la charge suivants ce départ du client de votre hébergement ou recevoir la confirmation en votre nom.
                                    </p>
                                </div>
                                <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                    Modifier
                                </button>
                            </div>

                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-base font-semibold text-gray-900 mb-4">
                                    Remise des clés
                                </h3>
                                <div className="space-y-3 mb-6">
                                    <p className="text-sm text-gray-700">
                                        Vos clients verront vos informations lorsqu'ils auront réservé
                                    </p>
                                    <p className="text-sm font-medium text-gray-900">Arrivée dans l'hébergement</p>
                                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                        <li>Arrivée à l'adresse, entrée avec le code sur l'interphone. Dans la cour, trouvez le bâtiment, puis la grande porte d'entrée. Utilisez le pont-clé pour l'appartement n° 7 au 2e étage. Vidéo d'accès: https://drive.google.com/drive/folders/1yC5C-xH_cwjgeKA0yY7i5c4J5rJaD3</li>
                                    </ul>
                                </div>
                                <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                    Modifier
                                </button>
                            </div>
                        </div>

                        {/* Ligne 4 : Règles de la maison + Réservations sans risque */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-base font-semibold text-gray-900 mb-4">
                                    Règles de la maison
                                </h3>
                                <div className="space-y-3 mb-6">
                                    <p className="text-sm text-gray-700">Vous demandez à vos clients de suivre les règles suivantes:</p>
                                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                        <li>Cet hébergement est non-fumeur.</li>
                                        <li>Les animaux domestiques ne sont pas acceptés.</li>
                                        <li>Les fêtes/événements ne sont pas autorisés.</li>
                                        <li>Il n'y a pas d'heures silencieuses.</li>
                                    </ul>
                                </div>
                                <div className="flex gap-3">
                                    <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                        Modifier
                                    </button>
                                    <button className="px-4 py-2 text-[#0071c2] border border-[#0071c2] rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                                        Appliquer aux autres établissements
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-base font-semibold text-gray-900 mb-4">
                                    Réservations sans risque
                                </h3>
                                <div className="space-y-3 mb-6">
                                    <p className="text-sm text-gray-700">
                                        Rejoignez le programme de aujourd'hui et obtenez plus de réservations à moindre risque !
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Selon une étude récente, près de 75 % des clients considèrent l'annulation gratuite comme l'un des facteurs déterminants lorsqu'il s'agit de réserver. Grâce au programme Réservations sans risque, vous pouvez mettre des conditions plus flexibles pour attirer davantage de clients en général peu de risque.
                                    </p>
                                </div>
                                <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                    En savoir plus
                                </button>
                            </div>
                        </div>

                        {/* Ligne 5 : Séjours de plus de 30 nuits + Comment recevez-vous vos réservations */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-base font-semibold text-gray-900 mb-4">
                                    Séjours de plus de 30 nuits (séjours de 30 mois)
                                </h3>
                                <div className="space-y-3 mb-6">
                                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                        <li>Vous acceptez les réservations pour des séjours de plus de 30 nuits (jusqu'à 90 nuits).</li>
                                    </ul>
                                </div>
                                <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                    Modifier
                                </button>
                            </div>

                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h3 className="text-base font-semibold text-gray-900 mb-4">
                                    Comment recevez-vous vos réservations ?
                                </h3>
                                <div className="space-y-3 mb-6">
                                    <p className="text-sm text-gray-700">
                                        Tous les clients peuvent réserver instantanément
                                    </p>
                                </div>
                                <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                    Modifier
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Alerte du bas */}
                {showBottomAlert && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex items-start justify-between">
                        <div className="flex-1">
                            <p className="text-sm text-gray-900 font-semibold mb-2">
                                Vous recherchez vos conditions de réservation ?
                            </p>
                            <p className="text-sm text-gray-700 mb-4">
                                Pour améliorer la navigation, nous avons séparé les « Conditions de l'établissement » et « Conditions de réservation » en 2 sections : « Conditions de l'établissement » et « Conditions de réservation ». Pour gérer vos conditions d'annulation et de paiement, les exceptions, etc., veuillez désormais vous rendre dans la section « Conditions de réservation » dans « Établissement ».
                            </p>
                            <a href="#" className="text-[#0071c2] text-sm hover:underline">
                                Accéder à la page « Conditions de réservation »
                            </a>
                        </div>
                        <button
                            onClick={() => setShowBottomAlert(false)}
                            className="ml-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </main>

            <BookingFooter />
        </div>
    )
}

export default ConditionsEtablissement