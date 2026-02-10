import { useParams, Link } from 'react-router-dom'
import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { ArrowLeft } from 'lucide-react'

function DamageClaim() {
    const { id, reservationId } = useParams()

    return (
        <div className="min-h-screen bg-white">
            <PropertyHeader />

            <main className="max-w-7xl mx-auto px-6 py-6">
                {/* Bouton retour */}
                <Link
                    to={`/booking/property/${id}/reservations/${reservationId}`}
                    className="inline-flex items-center gap-2 text-[#0071c2] hover:underline mb-6 text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour à la réservation
                </Link>

                {/* Titre principal */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Effectuez une demande de paiement des dommages
                </h1>

                {/* Section 1 : Programme de protection - 2 colonnes 50/50 */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                    <div>
                        <p className="text-sm text-gray-600 mb-3">Programme de protection contre les dommages</p>
                        <h2 className="text-5xl font-bold text-gray-900 mb-4">
                            Avant d'effectuer une demande de paiement des dommages
                        </h2>
                        <p className="text-base text-gray-700 leading-relaxed">
                            Nous avons créé le programme de protection contre les dommages sans frais supplémentaires pour vous assister dans les rares cas où des incidents malencontreux se produisent. Voici les différents éléments auxquels vous devez penser avant d'effectuer une demande de paiement des dommages.
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <img
                            src="/public/damage claim 1.png"
                            alt="Illustration programme protection"
                            className="w-full h-auto"
                        />
                    </div>
                </div>

                {/* Section 2 : Incidents non facturables */}
                <div className="mb-12">
                    <h2 className="text-5xl font-bold text-gray-900 mb-4">
                        Vous ne pouvez pas demander aux clients de payer pour certains incidents
                    </h2>
                    <p className="text-base text-gray-700 mb-8">
                        Certains incidents ne sont pas considérés comme des dommages ; vous ne pouvez donc pas demander aux clients de payer pour ces derniers. Pour en savoir plus, consultez l'intégralité des <a href="#" className="text-[#0071c2] hover:underline">Conditions générales d'utilisation</a>.
                    </p>

                    <div className="grid grid-cols-4 gap-6">
                        {/* Card 1 - Le ménage quotidien */}
                        <div className="border border-gray-200 rounded-lg p-6 flex flex-col">
                            <div className="mb-4 flex justify-center">
                                <img
                                    src="/menage quotidien.png"
                                    alt="Ménage quotidien"
                                    className="w-40 h-40 object-contain"
                                />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">Le ménage quotidien</h3>
                            <p className="text-sm text-gray-700 mb-4 flex-grow">
                                Les poubelles oubliées, faire la poussière ou passer l'aspirateur, les restes de nourriture sur les meubles, la vaisselle sale, etc.                            </p>
                            <button className="w-full py-2 border border-gray-300 text-[#0071c2] rounded text-sm font-medium hover:bg-gray-50">
                                En savoir plus
                            </button>
                        </div>

                        {/* Card 2 - Le non-respect des règles */}
                        <div className="border border-gray-200 rounded-lg p-6 flex flex-col">
                            <div className="mb-4 flex justify-center">
                                <img
                                    src="/non-respect des règles.png"
                                    alt="Non-respect des règles"
                                    className="w-40 h-40 object-contain"
                                />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">Le non-respect des règles de la maison</h3>
                            <p className="text-sm text-gray-700 mb-4 flex-grow">
                                Le non-respect des règles de la maison, quelles qu'elles soient, comme la présence d'animaux domestiques alors qu'ils ne sont pas admis, la présence de personnes supplémentaires, les arrivées tardives, etc.                            </p>
                            <button className="w-full py-2 border border-gray-300 text-[#0071c2] rounded text-sm font-medium hover:bg-gray-50">
                                En savoir plus
                            </button>
                        </div>

                        {/* Card 3 - Les frais supplémentaires */}
                        <div className="border border-gray-200 rounded-lg p-6 flex flex-col">
                            <div className="mb-4 flex justify-center">
                                <img
                                    src="/frais supplementaire.png"
                                    alt="Frais supplémentaires"
                                    className="w-40 h-40 object-contain"
                                />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">Les frais supplémentaires</h3>
                            <p className="text-sm text-gray-700 mb-4 flex-grow">
                                Les frais supplémentaires impayés tels que les frais liés aux animaux domestiques, les taxes de séjour, etc.                            </p>
                            <button className="w-full py-2 border border-gray-300 text-[#0071c2] rounded text-sm font-medium hover:bg-gray-50">
                                En savoir plus
                            </button>
                        </div>

                        {/* Card 4 - Les dommages non physiques */}
                        <div className="border border-gray-200 rounded-lg p-6 flex flex-col">
                            <div className="mb-4 flex justify-center">
                                <img
                                    src="/dommages non physiques.png"
                                    alt="Dommages non physiques"
                                    className="w-40 h-40 object-contain"
                                />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-2">Les dommages non physiques</h3>
                            <p className="text-sm text-gray-700 mb-4 flex-grow">
                                Le fait de fumer dans l'hébergement, le désordre, etc.
                            </p>
                            <button className="w-full py-2 border border-gray-300 text-[#0071c2] rounded text-sm font-medium hover:bg-gray-50">
                                En savoir plus
                            </button>
                        </div>
                    </div>
                </div>

                {/* Section 3 : Demandez plutôt aux clients de payer */}
                <div className="mb-12">
                    <h2 className="text-5xl font-bold text-gray-900 mb-4">
                        Demandez plutôt aux clients de payer pour ces incidents
                    </h2>
                    <p className="text-base text-gray-700 mb-8">
                        Même si la majorité des clients font attention lorsqu'ils séjournent dans votre hébergement, certains incidents peuvent parfois se produire. Vous pouvez alors demander au client de payer pour ces derniers.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Card 1 - Les dommages aux équipements */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <div className="mb-4 flex justify-center">
                                <img
                                    src="/dommages equipements.png"
                                    alt="Dommages équipements"
                                    className="w-full h-64 object-contain"
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Les dommages aux équipements
                            </h3>
                            <p className="text-sm text-gray-700">
                                Les meubles, les équipements électroniques, la décoration, la vaisselle, etc.
                            </p>
                        </div>

                        {/* Card 2 - Les dommages aux installations */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <div className="mb-4 flex justify-center">
                                <img
                                    src="/dommages installations.png"
                                    alt="Dommages installations"
                                    className="w-full h-64 object-contain"
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Les dommages aux installations
                            </h3>
                            <p className="text-sm text-gray-700">
                                Les dommages liés à l'eau, les installations endommagées, le sol rayé, les trous dans les murs ou dans le plafond, etc.                            </p>
                        </div>

                        {/* Card 3 - Faire appel à une entreprise tierce */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <div className="mb-4 flex justify-center">
                                <img
                                    src="/entreprise tierce.png"
                                    alt="Entreprise tierce"
                                    className="w-full h-64 object-contain"
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Faire appel à une entreprise tierce
                            </h3>
                            <p className="text-sm text-gray-700">
                                L'obligation de faire appel à une entreprise tierce de ménage ou d'entretien en cas de désordre considérable (facture demandée).                            </p>
                        </div>

                        {/* Card 4 - Les pertes ou les vols */}
                        <div className="border border-gray-200 rounded-lg p-6">
                            <div className="mb-4 flex justify-center">
                                <img
                                    src="/perte vol.png"
                                    alt="Pertes ou vols"
                                    className="w-full h-64 object-contain"
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Les pertes ou les vols
                            </h3>
                            <p className="text-sm text-gray-700">
                                La perte de clefs ou le vol d'effets personnels (facture d'origine ou reçu de remplacement demandés).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Note finale */}
                <div className="mb-8">
                    <p className="text-sm text-gray-700 mb-4">
                        Le client peut approuver, refuser ou ignorer votre demande de paiement des dommages. Les clients tendent à payer plus facilement les demandes dont le montant est moins élevé.
                    </p>

                    <div className="flex items-start gap-3">
                        <input
                            type="checkbox"
                            id="damage-acknowledge"
                            className="mt-1 w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                        />
                        <label htmlFor="damage-acknowledge" className="text-sm text-gray-700">
                            Je déclare avoir pris connaissance de ces informations et que l'incident est lié à des dommages.
                        </label>
                    </div>
                </div>

                {/* Boutons d'action */}
                <div className="flex gap-4">
                    <Link
                        to={`/booking/property/${id}/reservations/${reservationId}/damage-claim/step1`}
                        className="px-6 py-3 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium"
                    >
                        Commencer la demande
                    </Link>
                    <Link
                        to={`/booking/property/${id}/reservations/${reservationId}`}
                        className="px-6 py-3 border border-gray-300 text-gray-700 bg-white rounded hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                        Revenir aux détails de la réservation
                    </Link>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default DamageClaim