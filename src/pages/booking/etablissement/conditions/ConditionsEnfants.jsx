import PropertyHeader from '../../../../components/booking/PropertyHeader'
import BookingFooter from '../../../../components/booking/BookingFooter'
import { Info, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ConditionsEnfants() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [showAlert, setShowAlert] = useState(true)
    const [accepteEnfants, setAccepteEnfants] = useState(true)
    const [ageMinimum, setAgeMinimum] = useState('Tous')
    const [tarifType, setTarifType] = useState('standard')

    const handleCancel = () => {
        navigate(`/booking/property/${id}/etablissement/conditions-etablissement`)
    }

    const handleSave = () => {
        // Logique de sauvegarde ici
        navigate(`/booking/property/${id}/etablissement/conditions-etablissement`)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-4xl mx-auto px-6 py-8">
                {/* Breadcrumb */}
                <div className="mb-4 text-sm text-gray-600">
                    <span className="hover:underline cursor-pointer">Retour aux conditions</span>
                </div>

                {/* Titre */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Occupation et conditions relatives aux enfants
                </h1>

                {/* Alerte KYP */}
                {showAlert && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex gap-3">
                        <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm mb-2">
                                Nous avons besoin de plus d'informations dans le cadre du formulaire « Connaître son partenaire » (KYP)
                            </p>
                            <p className="text-sm text-gray-700 mb-3">
                                Vous devez fournir des informations supplémentaires relatives à votre établissement dans le cadre du formulaire KYP, afin d'être en conformité avec les diverses exigences légales et réglementaires. Veuillez utiliser le lien ci-dessous pour ajouter ces informations. Pour plus de détails, consultez <a href="#" className="text-[#0071c2] hover:underline">cet article</a> dans l'Aide aux partenaires.
                            </p>
                            <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                Fournir les informations
                            </button>
                        </div>
                        <button onClick={() => setShowAlert(false)} className="text-gray-400 hover:text-gray-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Section Enfants */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Enfants</h2>

                    {/* Question 1 */}
                    <div className="mb-6">
                        <p className="text-sm font-medium text-gray-900 mb-3">
                            Acceptez-vous les enfants de moins de 18 ans dans votre établissement ?
                        </p>
                        <p className="text-xs text-gray-600 mb-3">
                            Vous pourrez préciser les âges et tarifs plus tard(s)
                        </p>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="accepteEnfants"
                                    checked={accepteEnfants}
                                    onChange={() => setAccepteEnfants(true)}
                                    className="w-4 h-4 text-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Oui</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="accepteEnfants"
                                    checked={!accepteEnfants}
                                    onChange={() => setAccepteEnfants(false)}
                                    className="w-4 h-4 text-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Non</span>
                            </label>
                        </div>
                    </div>

                    {/* Question 2 */}
                    {accepteEnfants && (
                        <div className="mb-6">
                            <p className="text-sm font-medium text-gray-900 mb-3">
                                À partir de quel âge acceptez-vous les enfants dans votre établissement ?
                            </p>
                            <select
                                value={ageMinimum}
                                onChange={(e) => setAgeMinimum(e.target.value)}
                                className="w-32 px-3 py-2 border border-gray-300 rounded text-sm"
                            >
                                <option value="Tous">Tous</option>
                                <option value="1">1 an</option>
                                <option value="2">2 ans</option>
                                <option value="3">3 ans</option>
                                <option value="5">5 ans</option>
                                <option value="10">10 ans</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Section Tarifs enfants */}
                {accepteEnfants && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tarifs enfants</h2>

                        {/* Alerte */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-6 flex gap-2">
                            <Info className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                            <div className="text-sm text-gray-700">
                                <p className="font-semibold mb-1">Sélectionnez les tarifs enfants adaptés à votre établissement</p>
                                <p>Choisissez de configurer des tarifs enfants standard ou flexibles pour votre établissement. Si vous n'en configurez pas du tout, les enfants seront facturés au même tarif que les adultes.</p>
                            </div>
                        </div>

                        {/* Options de tarifs */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* Standard */}
                            <div className="border-2 border-gray-200 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-base font-semibold text-gray-900">Standard</h3>
                                    <button className="px-3 py-1 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50">
                                        Désactivée
                                    </button>
                                </div>
                                <p className="text-xs text-gray-600 mb-3">
                                    Les tarifs enfants standard vous conviennent dans les cas suivants :
                                </p>
                                <ul className="text-xs text-gray-700 space-y-2 mb-4">
                                    <li>• Vous souhaitez proposer un seul tarif enfants pour l'ensemble de votre établissement</li>
                                    <li>• Vous souhaitez que les enfants séjournent gratuitement, qu'ils paient un tarif fixe ou qu'ils paient un pourcentage du tarif adulte.</li>
                                </ul>
                                <button className="px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded hover:bg-blue-50 text-sm font-medium w-full">
                                    Configurer
                                </button>
                            </div>

                            {/* Flexibles */}
                            <div className="border-2 border-gray-200 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-base font-semibold text-gray-900">Flexibles</h3>
                                    <button className="px-3 py-1 border border-gray-300 rounded text-xs text-gray-700 hover:bg-gray-50">
                                        Désactivée
                                    </button>
                                </div>
                                <p className="text-xs text-gray-600 mb-3">
                                    Les tarifs enfants flexibles vous conviennent dans les cas suivants :
                                </p>
                                <ul className="text-xs text-gray-700 space-y-2 mb-4">
                                    <li>• Vous souhaitez proposer différents tarifs en fonction des types d'hébergement et des plans tarifaires.</li>
                                    <li>• Vous souhaitez que les enfants séjournent gratuitement, qu'ils paient un tarif fixe ou qu'ils paient un pourcentage du tarif adulte.</li>
                                    <li>• Vous souhaitez proposer différents tarifs enfants en fonction des tranches d'âge.</li>
                                </ul>
                                <button className="px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded hover:bg-blue-50 text-sm font-medium w-full">
                                    Configurer
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Section Occupation et répartition des tarifs enfants */}
                {accepteEnfants && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">
                            Occupation et répartition des tarifs enfants
                        </h2>

                        {/* Question facturation */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <p className="text-sm font-medium text-gray-900">
                                    Tous les enfants de la réservation sont-ils facturés au tarif enfant ?
                                </p>
                                <button className="text-gray-400 hover:text-gray-600">
                                    <Info className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="facturationEnfants"
                                        defaultChecked
                                        className="w-4 h-4 text-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">Oui, tous les enfants sont facturés au tarif enfant</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="facturationEnfants"
                                        className="w-4 h-4 text-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">Non, certains enfants sont facturés au tarif adulte</span>
                                </label>
                            </div>
                        </div>

                        {/* Question occupation */}
                        <div className="mb-6">
                            <p className="text-sm font-medium text-gray-900 mb-4">
                                Combien de personnes peuvent séjourner dans ces hébergements ?
                            </p>

                            {/* Tableau */}
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left font-medium text-gray-700">
                                                <div className="flex items-center gap-2">
                                                    Nom de l'hébergement
                                                </div>
                                            </th>
                                            <th className="px-4 py-3 text-center font-medium text-gray-700">
                                                <div className="flex items-center justify-center gap-1">
                                                    Nombre de personnes max.
                                                    <Info className="w-4 h-4 text-gray-400" />
                                                </div>
                                            </th>
                                            <th className="px-4 py-3 text-center font-medium text-gray-700">
                                                <div className="flex items-center justify-center gap-1">
                                                    Nombre d'adultes max.
                                                    <Info className="w-4 h-4 text-gray-400" />
                                                </div>
                                            </th>
                                            <th className="px-4 py-3 text-center font-medium text-gray-700">
                                                <div className="flex items-center justify-center gap-1">
                                                    Nombre d'enfants max.
                                                    <Info className="w-4 h-4 text-gray-400" />
                                                </div>
                                            </th>
                                            <th className="px-4 py-3 text-center font-medium text-gray-700 text-gray-400">
                                                <div className="flex items-center justify-center gap-1">
                                                    Nombre d'enfants max. facturés au tarif enfant
                                                    <Info className="w-4 h-4 text-gray-400" />
                                                </div>
                                            </th>
                                            <th className="px-4 py-3 text-center font-medium text-gray-700">
                                                <div className="flex items-center justify-center gap-1">
                                                    Nombre de bébés max.
                                                    <Info className="w-4 h-4 text-gray-400" />
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t border-gray-200">
                                            <td className="px-4 py-4">
                                                <a href="#" className="text-[#0071c2] hover:underline text-sm">
                                                    Appartement 1 Chambre
                                                </a>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button className="w-6 h-6 border border-gray-300 rounded hover:bg-gray-50">-</button>
                                                    <span className="w-8 text-center">4</span>
                                                    <button className="w-6 h-6 border border-gray-300 rounded hover:bg-gray-50">+</button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button className="w-6 h-6 border border-gray-300 rounded hover:bg-gray-50">-</button>
                                                    <span className="w-8 text-center">4</span>
                                                    <button className="w-6 h-6 border border-gray-300 rounded hover:bg-gray-50">+</button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button className="w-6 h-6 border border-gray-300 rounded hover:bg-gray-50">-</button>
                                                    <span className="w-8 text-center">3</span>
                                                    <button className="w-6 h-6 border border-gray-300 rounded hover:bg-gray-50">+</button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <button className="w-6 h-6 border border-gray-300 rounded hover:bg-gray-50 text-gray-300">-</button>
                                                    <span className="w-8 text-center text-gray-400">0</span>
                                                    <button className="w-6 h-6 border border-gray-300 rounded hover:bg-gray-50 text-gray-300">+</button>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="flex items-center gap-1">
                                                        <button className="w-6 h-6 border border-gray-300 rounded hover:bg-gray-50">-</button>
                                                        <span className="w-8 text-center">3</span>
                                                        <button className="w-6 h-6 border border-gray-300 rounded hover:bg-gray-50">+</button>
                                                    </div>
                                                    <label className="flex items-center gap-1 text-xs text-gray-700">
                                                        <input type="checkbox" className="w-4 h-4" />
                                                        Exclure du total max. de personnes
                                                    </label>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Info box */}
                        <div className="bg-gray-50 border border-gray-200 rounded p-3 flex gap-2">
                            <Info className="w-5 h-5 text-gray-600 flex-shrink-0" />
                            <p className="text-xs text-gray-700">
                                Lorsque vous configurez l'occupation de l'hébergement, pensez à tenir compte des options de couchage et de l'espace disponible.
                            </p>
                        </div>
                    </div>
                )}

                {/* Section Aperçu de vos conditions */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                        Aperçu de vos conditions
                    </h2>

                    {/* Au niveau de l'établissement */}
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-gray-900 mb-4">
                            Au niveau de l'établissement
                        </h3>

                        <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-900 mb-2">Enfants</p>
                            <ul className="list-disc list-inside text-sm text-gray-700">
                                <li>Les enfants de tous âges sont acceptés.</li>
                            </ul>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-900 mb-2">Tarifs enfants</p>
                            <ul className="list-disc list-inside text-sm text-gray-700">
                                <li>Vous n'avez pas fixé de tarifs enfants</li>
                            </ul>
                        </div>
                    </div>

                    {/* Au niveau des hébergements */}
                    <div className="mb-6">
                        <h3 className="text-base font-semibold text-gray-900 mb-4">
                            Au niveau des hébergements
                        </h3>

                        <div className="flex gap-6">
                            <div className="w-80">
                                <p className="text-sm text-gray-700 mb-3">
                                    Sélectionnez un hébergement pour voir les paramètres associés
                                </p>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm">
                                    <option>Appartement 1 Chambre</option>
                                </select>
                            </div>

                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900 mb-3">
                                    Appartement 1 Chambre : paramètres liés à l'occupation et au tarif enfant
                                </p>
                                <p className="text-sm text-gray-700 mb-3">
                                    Cet hébergement peut accueillir jusqu'à 4 personnes dont 3 enfants maximum. Tous les enfants sont soumis au tarif adulte.
                                </p>
                                <p className="text-sm text-gray-700">
                                    Cet hébergement peut accueillir 3 bébés, compris dans le nombre total de personnes maximum. Tous les enfants sont soumis au tarif adulte.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Note en bas */}
                    <p className="text-xs text-gray-600 italic">
                        La formulation de vos conditions peut s'afficher différemment pour vos clients potentiels.
                    </p>
                </div>

                {/* Boutons d'action */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={handleCancel}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium"
                    >
                        Sauvegarder
                    </button>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default ConditionsEnfants