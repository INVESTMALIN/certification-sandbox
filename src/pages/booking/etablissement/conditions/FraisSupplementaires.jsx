import PropertyHeader from '../../../../components/booking/PropertyHeader'
import BookingFooter from '../../../../components/booking/BookingFooter'
import { ThumbsUp, ThumbsDown, Plus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function FraisSupplementaires() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [fraisSupplementaires, setFraisSupplementaires] = useState(true)
    const [typeFrais, setTypeFrais] = useState('menage')
    const [tarifsInclus, setTarifsInclus] = useState(false)
    const [typePaiement, setTypePaiement] = useState('par-sejour')
    const [montant, setMontant] = useState('50')

    const handleCancel = () => {
        navigate(`/booking/property/${id}/etablissement/conditions-etablissement`)
    }

    const handleSave = () => {
        navigate(`/booking/property/${id}/etablissement/conditions-etablissement`)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-6xl mx-auto px-6 py-8">
                {/* Breadcrumb */}
                <div className="mb-4 text-sm">
                    <button
                        onClick={() => navigate(`/booking/property/${id}/etablissement/conditions-etablissement`)}
                        className="text-gray-600 hover:underline flex items-center gap-2"
                    >
                        <span>←</span>
                        Revenir aux conditions
                    </button>
                </div>

                {/* Titre */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Frais supplémentaires
                </h1>

                <div className="flex gap-6">
                    {/* Contenu principal */}
                    <div className="flex-1">
                        {/* Section principale */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                            {/* Question principale */}
                            <div className="mb-6">
                                <p className="text-sm font-medium text-gray-900 mb-4">
                                    En plus du tarif de leur(s) chambre(s)/appartement(s), les clients devront-ils payer d'autres frais liés à leur réservation ?
                                </p>
                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="fraisSupp"
                                            checked={fraisSupplementaires}
                                            onChange={() => setFraisSupplementaires(true)}
                                            className="w-5 h-5 text-[#0071c2]"
                                        />
                                        <span className="text-sm text-gray-700">Oui</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="fraisSupp"
                                            checked={!fraisSupplementaires}
                                            onChange={() => setFraisSupplementaires(false)}
                                            className="w-5 h-5 text-[#0071c2]"
                                        />
                                        <span className="text-sm text-gray-700">Non</span>
                                    </label>
                                </div>
                            </div>

                            {fraisSupplementaires && (
                                <>
                                    {/* Type de frais */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-900 mb-3">
                                            Type de frais
                                        </label>
                                        <select
                                            value={typeFrais}
                                            onChange={(e) => setTypeFrais(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded text-sm"
                                        >
                                            <option value="">Veuillez sélectionner</option>
                                            <option value="frais-service">Frais de service</option>
                                            <option value="frais-service-complexes">Frais de service (complexes hôteliers)</option>
                                            <option value="menage">Ménage</option>
                                            <option value="serviettes">Serviettes de toilette</option>
                                            <option value="electricite">Consommation d'électricité</option>
                                            <option value="linge">Linge de lit</option>
                                            <option value="gaz">Consommation de gaz</option>
                                            <option value="fioul">Consommation de fioul</option>
                                            <option value="chauffage">Bois de chauffage</option>
                                            <option value="eau">Consommation d'eau</option>
                                            <option value="taxe-environnement">Taxe environnementale</option>
                                            <option value="spa">Spa</option>
                                            <option value="transfert">Frais de transfert</option>
                                        </select>
                                    </div>

                                    {/* Tarifs inclus */}
                                    <div className="mb-6">
                                        <p className="text-sm font-medium text-gray-900 mb-3">
                                            Le tarif de la chambre ou de l'appartement inclut-il déjà ces frais ?
                                        </p>
                                        <div className="flex gap-6">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="tarifsInclus"
                                                    checked={tarifsInclus}
                                                    onChange={() => setTarifsInclus(true)}
                                                    className="w-5 h-5 text-[#0071c2]"
                                                />
                                                <span className="text-sm text-gray-700">Oui</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    name="tarifsInclus"
                                                    checked={!tarifsInclus}
                                                    onChange={() => setTarifsInclus(false)}
                                                    className="w-5 h-5 text-[#0071c2]"
                                                />
                                                <span className="text-sm text-gray-700">Non</span>
                                            </label>
                                        </div>
                                    </div>

                                    {!tarifsInclus && (
                                        <>
                                            {/* Type de paiement */}
                                            <div className="mb-6">
                                                <label className="block text-sm font-medium text-gray-900 mb-3">
                                                    Type de paiement
                                                </label>
                                                <select
                                                    value={typePaiement}
                                                    onChange={(e) => setTypePaiement(e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded text-sm"
                                                >
                                                    <option value="N/A">N/A</option>
                                                    <option value="par-sejour">€/séjour</option>
                                                    <option value="par-nuit">€/nuit</option>
                                                </select>
                                            </div>

                                            {/* Montant */}
                                            <div className="mb-6">
                                                <label className="block text-sm font-medium text-gray-900 mb-3">
                                                    Montant
                                                </label>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-700">€</span>
                                                    <input
                                                        type="number"
                                                        value={montant}
                                                        onChange={(e) => setMontant(e.target.value)}
                                                        className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm"
                                                    />
                                                </div>
                                            </div>
                                        </>
                                    )}

                                    {/* Ajouter un autre type de frais */}
                                    <button className="flex items-center gap-2 text-[#0071c2] text-sm font-medium hover:underline">
                                        <Plus className="w-4 h-4" />
                                        Ajouter un autre type de frais
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex justify-start gap-3">
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium"
                            >
                                Enregistrer
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm font-medium"
                            >
                                Annuler
                            </button>
                        </div>

                        {/* Feedback */}
                        <div className="mt-6 flex items-center gap-2">
                            <p className="text-sm text-gray-700">Cette page contient-elle toutes les informations dont vous avez besoin ?</p>
                            <button className="p-2 hover:bg-gray-100 rounded">
                                <ThumbsUp className="w-4 h-4 text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded">
                                <ThumbsDown className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>
                    </div>

                    {/* Sidebar Aperçu */}
                    <div className="w-80">
                        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 sticky top-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Aperçu de vos conditions
                            </h3>
                            <div>
                                <p className="text-sm font-semibold text-gray-900 mb-2">Frais supplémentaires</p>
                                <ul className="list-disc list-inside text-sm text-gray-700">
                                    <li>Ménage à 50 €/séjour - non compris dans le tarif</li>
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

export default FraisSupplementaires