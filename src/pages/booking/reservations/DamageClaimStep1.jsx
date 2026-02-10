import { useParams, Link } from 'react-router-dom'
import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { ArrowLeft, Upload, ChevronDown } from 'lucide-react'
import reservationsData from '../../../data/booking/reservations.json'
import { useState } from 'react'

function DamageClaimStep1() {
    const { id, reservationId } = useParams()
    const reservation = reservationsData.find(res => res.id === reservationId)

    const [openAccordion, setOpenAccordion] = useState(null)

    // Nouveaux states pour capturer les données du formulaire
    const [elementDamaged, setElementDamaged] = useState('')
    const [whatHappened, setWhatHappened] = useState('')
    const [elementAge, setElementAge] = useState('')
    const [amount, setAmount] = useState(0)
    const [calculationMethod, setCalculationMethod] = useState('')
    const [confirmed, setConfirmed] = useState(false)

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index)
    }

    if (!reservation) {
        return (
            <div className="min-h-screen bg-white">
                <PropertyHeader />
                <main className="max-w-7xl mx-auto px-6 py-6">
                    <p>Réservation non trouvée</p>
                </main>
                <BookingFooter />
            </div>
        )
    }

    const handleSubmit = () => {
        const damageData = {
            elementDamaged,
            whatHappened,
            elementAge,
            amount,
            calculationMethod,
            confirmed,
            reservationId,
            propertyId: id
        }

        localStorage.setItem('damageClaimData', JSON.stringify(damageData))

        // Redirection vers Step2
        window.location.href = `/booking/property/${id}/reservations/${reservationId}/damage-claim/step2`
    }

    return (
        <div className="min-h-screen bg-white">
            <PropertyHeader />

            <main className="max-w-7xl mx-auto px-6 py-6">
                {/* Bouton retour */}
                <Link
                    to={`/booking/property/${id}/reservations/${reservationId}/damage-claim`}
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
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0071c2] text-white font-semibold text-sm">
                            1
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-900">Ajout d'éléments</span>
                    </div>
                    <div className="flex-1 h-px bg-gray-300 mx-4"></div>
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-300 text-gray-600 font-semibold text-sm">
                            2
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-600">Vérification et envoi</span>
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
                    {/* Colonne gauche - Formulaire */}
                    <div className="col-span-2">
                        {/* Section Ajoutez votre premier élément */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Ajoutez votre premier élément</h2>
                            <p className="text-sm text-gray-700 mb-6">
                                Décrivez-nous les dommages constatés dans votre hébergement. Ajoutez un élément pour chaque dommage.
                            </p>

                            {/* Champ 1 : Quel élément a été endommagé ? */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Quel élément a été endommagé ?
                                </label>
                                <textarea
                                    placeholder="Par exemple : le canapé, les ustensiles de cuisine, un miroir..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                                    rows="2"
                                    value={elementDamaged}
                                    onChange={(e) => setElementDamaged(e.target.value)}
                                ></textarea>
                                <p className="text-xs text-gray-600 mt-1">300 caractères restants</p>
                            </div>

                            {/* Champ 2 : Qu'a subi cet élément ? */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Qu'a subi cet élément ?
                                </label>
                                <textarea
                                    placeholder="Par exemple : il a été déchiré, cassé, brûlé..."
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                                    rows="2"
                                    value={whatHappened}
                                    onChange={(e) => setWhatHappened(e.target.value)}
                                ></textarea>
                                <p className="text-xs text-gray-600 mt-1">300 caractères restants</p>
                            </div>

                            {/* Champ 3 : Quelle est l'ancienneté de cet élément ? */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Quelle est l'ancienneté de cet élément ?
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                                    value={elementAge}
                                    onChange={(e) => setElementAge(e.target.value)}
                                >
                                    <option>Sélectionnez un âge</option>
                                    <option>Moins d'un an</option>
                                    <option>1 à 3 ans</option>
                                    <option>3 à 5 ans</option>
                                    <option>Plus de 5 ans</option>
                                </select>
                            </div>

                            {/* Champ 4 : Quelle somme demandez-vous ? */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Quelle somme demandez-vous ?
                                </label>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-700">EUR</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(Number(e.target.value))}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Champ 5 : Comment avez-vous calculé ce montant ? */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Comment avez-vous calculé ce montant ?
                                </label>
                                <select
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                                    value={calculationMethod}
                                    onChange={(e) => setCalculationMethod(e.target.value)}
                                >
                                    <option>Sélectionnez une option</option>
                                    <option>J'ai déjà payé pour la réparation ou le remplacement de cet élément</option>
                                    <option>J'ai reçu un devis pour la réparation de cet élément</option>
                                    <option>J'ai trouvé un élément similaire à acheter pour le remplacer</option>
                                    <option>Il s'agit du coût de l'élément d'origine</option>
                                    <option>J'ai fait un calcul approximatif</option>
                                </select>
                            </div>

                            {/* Upload fichiers */}
                            <div className="mb-6">
                                <p className="text-sm text-gray-700 mb-4">
                                    Importez des preuves au format JPG ou PNG de 10 Mo maximum par fichier. Ne partagez aucun fichier contenant des données personnelles ou sensibles, sauf si cela est nécessaire.
                                </p>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <button className="px-4 py-2 bg-[#0071c2] text-white rounded text-sm font-medium hover:bg-[#005999]">
                                        Choisir les fichiers
                                    </button>
                                    <p className="text-sm text-gray-600 mt-2">ou les faire glisser ici</p>
                                </div>
                            </div>
                        </div>

                        {/* Section Ajoutez un autre élément */}
                        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Ajoutez un autre élément</h2>
                            <p className="text-sm text-gray-700 mb-4">
                                Si les dommages concernent plus d'1 élément, veuillez ajouter un nouvel élément pour chaque dommage. Cela permettra de clarifier les choses et sera plus convaincant pour les clients.
                            </p>
                            <button className="w-full px-4 py-3 border-2 border-[#0071c2] text-[#0071c2] rounded text-sm font-medium hover:bg-blue-50 flex items-center justify-center gap-2">
                                <span className="text-xl">+</span>
                                Ajouter un autre élément
                            </button>
                        </div>

                        {/* Checkbox confirmation */}
                        <div className="flex items-start gap-3 mb-6">
                            <input
                                type="checkbox"
                                id="no-personal-data"
                                className="mt-1 w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                checked={confirmed}
                                onChange={(e) => setConfirmed(e.target.checked)}
                            />
                            <label htmlFor="no-personal-data" className="text-sm text-gray-700">
                                Je confirme que les justificatifs ne contiennent aucune donnée personnelle me concernant ou concernant les clients, aucune image extraite d'un enregistrement de vidéosurveillance, ni aucune capture d'écran d'échanges entre le client et moi via des outils de messagerie. *
                            </label>
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex gap-4">
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-3 bg-[#0071c2] text-white rounded hover:bg-[#005999] text-sm font-medium"
                            >
                                Vérifier la demande
                            </button>
                            <Link
                                to={`/booking/property/${id}/reservations/${reservationId}`}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 text-sm font-medium"
                            >
                                Retour aux détails de la réservation
                            </Link>
                        </div>
                    </div>

                    {/* Colonne droite - Sidebar */}
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

export default DamageClaimStep1