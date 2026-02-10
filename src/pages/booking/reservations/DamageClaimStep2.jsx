import { useParams, Link } from 'react-router-dom'
import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import reservationsData from '../../../data/booking/reservations.json'
import { useState, useEffect } from 'react'

function DamageClaimStep2() {
    const { id, reservationId } = useParams()
    const reservation = reservationsData.find(res => res.id === reservationId)

    const [openAccordion, setOpenAccordion] = useState(null)
    const [damageData, setDamageData] = useState(null)
    const [additionalInfo, setAdditionalInfo] = useState('')
    const [messageToGuest, setMessageToGuest] = useState('')
    const [informationCorrect, setInformationCorrect] = useState(false)
    const [acceptConditions, setAcceptConditions] = useState(false)

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index)
    }

    // Récupérer les données du Step1 depuis localStorage
    useEffect(() => {
        const savedData = localStorage.getItem('damageClaimData')
        if (savedData) {
            setDamageData(JSON.parse(savedData))
        }
    }, [])

    if (!reservation || !damageData) {
        return (
            <div className="min-h-screen bg-white">
                <PropertyHeader />
                <main className="max-w-7xl mx-auto px-6 py-6">
                    <p>Chargement des données...</p>
                </main>
                <BookingFooter />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <PropertyHeader />

            <main className="max-w-7xl mx-auto px-6 py-6">
                {/* Bouton retour */}
                <Link
                    to={`/booking/property/${id}/reservations/${reservationId}/damage-claim/step1`}
                    className="inline-flex items-center gap-2 text-[#0071c2] hover:underline mb-6 text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour à la réservation
                </Link>

                {/* Titre */}
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Effectuez une demande de paiement des dommages
                </h1>

                {/* Stepper */}
                <div className="flex items-center mb-8">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-semibold text-sm">
                            ✓
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-600">Ajout d'éléments</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0071c2] text-white font-semibold text-sm">
                            2
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-900">Vérification et envoi</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600 font-semibold text-sm">
                            3
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-600">Confirmation</span>
                    </div>
                </div>

                {/* Contenu principal avec sidebar */}
                <div className="grid grid-cols-3 gap-8">
                    {/* Colonne gauche - Récapitulatif */}
                    <div className="col-span-2">
                        {/* Section Vérifiez votre demande */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Vérifiez votre demande</h2>
                            <p className="text-sm text-gray-700 mb-6">
                                Relisez votre demande ci-dessous et assurez-vous que toutes les informations sont correctes.
                            </p>

                            {/* Tableau récapitulatif */}
                            <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Élément</th>
                                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Dommage</th>
                                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">Coût</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t border-gray-200">
                                            <td className="px-4 py-3 text-sm text-gray-900">{damageData.elementDamaged}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900">{damageData.whatHappened}</td>
                                            <td className="px-4 py-3 text-sm text-gray-900 text-right">€ {damageData.amount}</td>
                                        </tr>
                                    </tbody>
                                    <tfoot className="bg-gray-50 border-t border-gray-200">
                                        <tr>
                                            <td colSpan="2" className="px-4 py-3 text-sm font-semibold text-gray-900">Total</td>
                                            <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-right">€ {damageData.amount}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            {/* Dites-nous en plus (facultatif) */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Dites-nous en plus (facultatif)
                                </label>
                                <p className="text-sm text-gray-700 mb-2">
                                    Nous utiliserons ces informations pour traiter votre demande.
                                </p>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                                    rows="4"
                                    value={additionalInfo}
                                    onChange={(e) => setAdditionalInfo(e.target.value)}
                                ></textarea>
                                <p className="text-xs text-gray-600 mt-1">1000 caractères restants</p>
                            </div>

                            {/* Laissez un commentaire pour [Guest Name] */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Laissez un commentaire pour {reservation.guestName} (facultatif)
                                </label>
                                <p className="text-sm text-gray-700 mb-2">
                                    Aidez le client à mieux comprendre les dommages survenus lors de son séjour et les frais qui y sont associés.
                                </p>
                                <textarea
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                                    rows="4"
                                    value={messageToGuest}
                                    onChange={(e) => setMessageToGuest(e.target.value)}
                                ></textarea>
                                <p className="text-xs text-gray-600 mt-1">1000 caractères restants</p>
                            </div>
                        </div>

                        {/* Checkboxes de confirmation */}
                        <div className="space-y-4 mb-6">
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="info-correct"
                                    className="mt-1 w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                    checked={informationCorrect}
                                    onChange={(e) => setInformationCorrect(e.target.checked)}
                                />
                                <label htmlFor="info-correct" className="text-sm text-gray-700">
                                    Je confirme que les informations fournies sont exactes.
                                </label>
                            </div>

                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="accept-conditions"
                                    className="mt-1 w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                    checked={acceptConditions}
                                    onChange={(e) => setAcceptConditions(e.target.checked)}
                                />
                                <label htmlFor="accept-conditions" className="text-sm text-gray-700">
                                    J'accepte les Conditions générales d'utilisation de la Procédure de demande de paiement de dommages.
                                </label>
                            </div>
                        </div>

                        {/* Note explicative */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                            <p className="text-sm text-gray-700">
                                Le client peut approuver, refuser ou ignorer votre demande de paiement des dommages. Les clients tendent à payer plus facilement les demandes dont le montant est moins élevé.
                            </p>
                            <p className="text-sm text-gray-700 mt-3">
                                Pour plus d'informations, veuillez consulter les <a href="#" className="text-[#0071c2] hover:underline">Conditions générales d'utilisation</a>.
                            </p>
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex gap-4">
                            <Link
                                to={`/booking/property/${id}/reservations/${reservationId}/damage-claim/step3`}
                                className="px-6 py-3 bg-[#0071c2] text-white rounded hover:bg-[#005999] text-sm font-medium"
                            >
                                Envoyer la demande
                            </Link>
                            <Link
                                to={`/booking/property/${id}/reservations/${reservationId}/damage-claim/step1`}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm font-medium"
                            >
                                Revenir et modifier les informations
                            </Link>
                        </div>
                    </div>

                    {/* Colonne droite - Sidebar (mêmes accordéons que Step1) */}
                    <div className="col-span-1">
                        {/* Accordéon 1 */}
                        <div className="bg-white border border-gray-200 rounded-lg mb-4">
                            <button
                                onClick={() => toggleAccordion(1)}
                                className="w-full px-4 py-3 flex items-center justify-between text-left"
                            >
                                <span className="text-sm font-semibold text-gray-900">
                                    Vous ne pouvez pas demander aux clients de payer pour :
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-600 transition-transform ${openAccordion === 1 ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {openAccordion === 1 && (
                                <div className="px-4 pb-4 text-sm text-gray-700 space-y-2">
                                    <p>• Le ménage quotidien (poubelles non sorties, vaisselle non faite, etc.). Vous pouvez les facturer en configurant des frais de ménage pour de futures réservations.</p>
                                    <p>• Les dommages non physiques tels que le fait de fumer dans l'hébergement, le désordre, etc.</p>
                                    <p>• Le non-respect des règles de la maison qui ont été enfreintes : présence d'animaux domestiques alors qu'ils ne sont pas admis, présence de personnes supplémentaires, arrivées tardives, etc.</p>
                                    <p>• Les frais supplémentaires impayés tels que les frais liés aux animaux domestiques, les taxes de séjour, etc.</p>
                                    <p className="mt-4">
                                        Pour accéder à la liste complète, veuillez consulter les{' '}
                                        <a href="#" className="text-[#0071c2] hover:underline">
                                            Conditions générales d'utilisation
                                        </a>
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Accordéon 2 */}
                        <div className="bg-white border border-gray-200 rounded-lg mb-4">
                            <button
                                onClick={() => toggleAccordion(2)}
                                className="w-full px-4 py-3 flex items-center justify-between text-left"
                            >
                                <span className="text-sm font-semibold text-gray-900">
                                    Vous pouvez demander aux clients de payer pour :
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-600 transition-transform ${openAccordion === 2 ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {openAccordion === 2 && (
                                <div className="px-4 pb-4 text-sm text-gray-700">
                                    <ul className="list-disc list-inside space-y-2">
                                        <li>Les dommages concernant les meubles, les équipements électroniques, la décoration, la vaisselle, etc.</li>
                                        <li>Les dommages liés à l'eau, les installations endommagées, le sol rayé, les trous dans les murs ou dans le plafond, etc.</li>
                                        <li>L'obligation de faire appel à une entreprise tierce de ménage ou d'entretien en cas de désordre considérable (facture demandée).</li>
                                        <li>La perte de clefs ou le vol d'effets personnels (facture d'origine ou reçu de remplacement demandés).</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Accordéon 3 */}
                        <div className="bg-white border border-gray-200 rounded-lg mb-6">
                            <button
                                onClick={() => toggleAccordion(3)}
                                className="w-full px-4 py-3 flex items-center justify-between text-left"
                            >
                                <span className="text-sm font-semibold text-gray-900">
                                    Comment faire en sorte que la demande de paiement des dommages soit acceptée ?
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-gray-600 transition-transform ${openAccordion === 3 ? 'rotate-180' : ''}`}
                                />
                            </button>
                            {openAccordion === 3 && (
                                <div className="px-4 pb-4 text-sm text-gray-700">
                                    <p className="mb-4">
                                        Pour nous aider à traiter rapidement votre demande et à faire comprendre la situation au client pour augmenter ses chances de payer, assurez-vous de :
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 mb-4">
                                        <li>Décrire les dommages de façon exhaustive.</li>
                                        <li>Lister chaque dommage séparément.</li>
                                        <li>Préciser le montant que vous demandez et le justifier.</li>
                                        <li>Fournir des photos nettes et pertinentes des dommages.</li>
                                    </ul>
                                    <p className="font-semibold mb-2">Veuillez ne pas importer :</p>
                                    <ul className="list-disc list-inside space-y-2">
                                        <li>De captures d'écran de conversations impliquant le client, le personnel ou vous-même.</li>
                                        <li>D'images de caméras de sécurité sur lesquelles apparaissent des clients.</li>
                                        <li>De factures comportant des adresses ou des numéros de téléphones privés (sauf si cela a été expressément demandé).</li>
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Infos réservation */}
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Nom du client</h3>
                            <p className="text-sm text-gray-900 mb-4">{reservation.guestName}</p>

                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Numéro de réservation :</h3>
                            <p className="text-sm text-gray-900 mb-4">{reservation.reservationNumber}</p>

                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Arrivée</h3>
                            <p className="text-sm text-gray-900 mb-4">
                                {new Date(reservation.checkIn).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>

                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Départ</h3>
                            <p className="text-sm text-gray-900 mb-4">
                                {new Date(reservation.checkOut).toLocaleDateString('fr-FR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </p>

                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Total de personnes :</h3>
                            <p className="text-sm text-gray-900 mb-4">{reservation.guestDetails}</p>

                            <h3 className="text-sm font-semibold text-gray-900 mb-2">Nombre d'hébergements</h3>
                            <p className="text-sm text-gray-900">1</p>
                        </div>
                    </div>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default DamageClaimStep2