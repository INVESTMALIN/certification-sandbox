import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { X, AlertCircle, Info, Plus } from 'lucide-react'
import { useState } from 'react'

function ConditionsReservation() {
    const [showTopAlert, setShowTopAlert] = useState(true)
    const [showInfoBox, setShowInfoBox] = useState(true)
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
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Conditions de réservation</h1>
                <p className="text-sm text-gray-600 mb-8">
                    Vous trouverez sur cette page toutes vos conditions d'annulation et de prépaiement. Vous pourrez ainsi les consulter, les gérer et les modifier, le tout au même endroit.
                </p>

                {/* Info box bleue */}
                {showInfoBox && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 flex items-start gap-4">
                        <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <h3 className="text-base font-semibold text-gray-900 mb-2">
                                Mettez à jour vos conditions
                            </h3>
                            <p className="text-sm text-gray-700 mb-4">
                                Lorsqu'elles sont correctement configurées, les conditions peuvent vous aider à ajuster les attentes des clients. Pour faciliter leur mise à jour, nous avons préparé des conseils pas à pas sur certaines sections clés.
                            </p>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                    Commencer
                                </button>
                                <button
                                    onClick={() => setShowInfoBox(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
                                >
                                    Ignorer
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowInfoBox(false)}
                            className="text-gray-400 hover:text-gray-600 ml-2"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Section Conditions d'annulation */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Conditions d'annulation et de prépaiement
                    </h2>

                    {/* Alerte info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">
                            Vous pouvez désactiver Booking Sponsored Benefit en sélectionnant des conditions d'annulation sans frais et sans prépaiement. Pour les tarifs associés à ces conditions, Booking.com n'appliquera pas d'offre incluable Booking Sponsored Benefit.
                        </p>
                    </div>

                    {/* Grille des conditions */}
                    <div className="grid grid-cols-2 gap-6 mb-6">
                        {/* Condition 1 : Non remboursable (General) */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-base font-semibold text-gray-900 mb-4">
                                Non remboursable (General)
                            </h3>
                            <div className="space-y-3 mb-6">
                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                                    <li>
                                        Le client devra verser le montant total de la réservation s'il annule à tout moment. S'il ne se présente pas, il devra payer le montant total de la réservation.
                                    </li>
                                    <li>
                                        Le client devra verser le montant total 30 par vos clients avant leur arrivée, grâce au service Paiements par Booking.com. Pour plus d'informations à ce sujet, <a href="#" className="text-[#0071c2] hover:underline">cliquez ici</a>.
                                    </li>
                                </ul>
                                <div className="pt-4 border-t border-gray-200">
                                    <p className="text-sm text-gray-600 mb-1">Données du</p>
                                    <p className="text-sm font-semibold text-gray-900">4 nov. 2025 au 2 févr. 2026</p>
                                </div>
                                <div className="pt-2">
                                    <p className="text-sm text-gray-600 mb-1">Nombre total de nuitées</p>
                                    <p className="text-sm font-semibold text-gray-900">8</p>
                                </div>
                                <div className="pt-2">
                                    <p className="text-sm text-gray-600 mb-1">Revenu total</p>
                                    <p className="text-sm font-semibold text-gray-900">€ 610.00</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                    Modifier
                                </button>
                                <button className="px-4 py-2 text-[#0071c2] border border-[#0071c2] rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                                    Appliquer aux autres établissements
                                </button>
                            </div>
                        </div>

                        {/* Condition 2 : Non remboursable (Non refundable) */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-base font-semibold text-gray-900 mb-4">
                                Non remboursable (Non refundable)
                            </h3>
                            <div className="space-y-3 mb-6">
                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                                    <li>
                                        Le client devra verser le montant total de la réservation s'il annule à tout moment.
                                    </li>
                                    <li>
                                        Nous facilitons le prépaiement du montant total où par vos clients avant leur arrivée, grâce au service Paiements par Booking.com. Pour plus d'informations à ce sujet, <a href="#" className="text-[#0071c2] hover:underline">cliquez ici</a>.
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-2">
                                <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium">
                                    Supprimer
                                </button>
                                <button className="px-4 py-2 text-[#0071c2] border border-[#0071c2] rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                                    Appliquer aux autres établissements
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Info + bouton créer */}
                    <div className="text-center mb-4">
                        <p className="text-sm text-gray-600 mb-4">
                            Vous pouvez créer <span className="font-semibold">4 autres conditions</span>
                        </p>
                        <button className="px-6 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium inline-flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Créer de nouvelles conditions d'annulation
                        </button>
                    </div>
                </div>

                {/* Section Exceptions */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        Exceptions de modification et d'annulation
                    </h2>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        {/* Changements de dates */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-base font-semibold text-gray-900 mb-4">
                                Changements de dates pour les réservations non remboursables
                            </h3>
                            <div className="space-y-3 mb-6">
                                <p className="text-sm font-semibold text-gray-900">
                                    Gagnez du temps et facilitez la vie des clients qui souhaitent modifier leurs dates en cas d'imprévus
                                </p>
                                <p className="text-sm text-gray-700">
                                    Si vous activez cette option et si certains tarifs de vos clients sont automatisés les modifications de dates. Vous déciderez toujours de la période à laquelle les clients peuvent effectuer des changements.
                                </p>
                            </div>
                            <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                Modifier
                            </button>
                        </div>

                        {/* Exceptions d'annulation */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-base font-semibold text-gray-900 mb-4">
                                Exceptions d'annulation
                            </h3>
                            <div className="space-y-3 mb-6">
                                <p className="text-sm font-semibold text-gray-900">
                                    Délai de rétractation
                                </p>
                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                    <li>Aucun frais facturé pour les réservations annulées 24 heures après la réservation.</li>
                                </ul>
                                <p className="text-sm font-semibold text-gray-900 mt-4">
                                    Annulation anticipée
                                </p>
                                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                                    <li>Aucune sélection</li>
                                </ul>
                            </div>
                            <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                Modifier
                            </button>
                        </div>
                    </div>

                    {/* Exceptions provisoires */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-base font-semibold text-gray-900 mb-4">
                            Exceptions provisoires aux conditions
                        </h3>
                        <div className="space-y-3 mb-6">
                            <p className="text-sm text-gray-700">
                                Vous pouvez créer des exceptions provisoires pour remplacer les plans tarifaires existants durant une période spécifique (par exemple, pendant les vacances ou lors d'événements particuliers).
                            </p>
                            <p className="text-sm text-gray-700">
                                Vous avez <span className="font-semibold">0 exceptions provisoires actives</span>.
                            </p>
                        </div>
                        <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                            Modifier
                        </button>
                    </div>
                </div>

                {/* Alerte du bas */}
                {showBottomAlert && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex items-start justify-between">
                        <div className="flex-1">
                            <p className="text-sm text-gray-900 font-semibold mb-2">
                                Vous recherchez les conditions de votre établissement ?
                            </p>
                            <p className="text-sm text-gray-700 mb-4">
                                Pour améliorer la navigation, nous avons réorganisé la page « Conditions » et l'avons séparée en 2 sections : « Conditions de l'établissement » et « Conditions de réservation ». Pour gérer vos conditions relatives aux enfants, aux animaux domestiques, à l'enregistrement, etc., veuillez désormais vous rendre dans la section « Conditions de l'établissement » dans le menu « Établissement ».
                            </p>
                            <a href="#" className="text-[#0071c2] text-sm hover:underline">
                                Accéder à la page « Conditions de l'établissement »
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

export default ConditionsReservation