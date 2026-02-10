import PropertyHeader from '../../../../components/booking/PropertyHeader'
import BookingFooter from '../../../../components/booking/BookingFooter'
import { Info, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ConditionsLits() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [showAlert, setShowAlert] = useState(true)
    const [litsBebe, setLitsBebe] = useState(0)
    const [litsAppoint, setLitsAppoint] = useState(0)

    const handleCancel = () => {
        navigate(`/booking/property/${id}/etablissement/conditions-etablissement`)
    }

    const handleSave = () => {
        navigate(`/booking/property/${id}/etablissement/conditions-etablissement`)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-4xl mx-auto px-6 py-8">
                {/* Breadcrumb */}
                <div className="mb-4 text-sm">
                    <button
                        onClick={() => navigate(`/booking/property/${id}/etablissement/conditions-etablissement`)}
                        className="text-[#0071c2] hover:underline"
                    >
                        ← Retour aux conditions
                    </button>
                </div>

                {/* Titre */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Options relatives aux lits d'appoint et aux lits bébé
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
                    </div>
                )}

                {/* Section Disponibilité */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Disponibilité des lits bébé et lits d'appoint
                    </h2>

                    <p className="text-sm text-gray-700 mb-6">
                        Combien de lits pouvez-vous fournir par hébergement ?
                    </p>

                    {/* Tableau */}
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nom</th>
                                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Lits bébé</th>
                                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                                        <div className="flex items-center justify-center gap-2">
                                            <input type="radio" name="ou" disabled className="w-4 h-4" />
                                            <span>ou</span>
                                            <input type="radio" name="ou" disabled className="w-4 h-4" />
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Lits d'appoint</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-gray-200">
                                    <td className="px-6 py-4 text-sm text-gray-900">Appartement 1 Chambre</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                onClick={() => setLitsBebe(Math.max(0, litsBebe - 1))}
                                                className="w-6 h-6 border border-gray-300 rounded hover:bg-gray-50"
                                            >
                                                -
                                            </button>
                                            <span className="w-12 text-center text-sm">{litsBebe}</span>
                                            <button
                                                onClick={() => setLitsBebe(litsBebe + 1)}
                                                className="w-6 h-6 border border-gray-300 rounded hover:bg-gray-50"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <input type="radio" name="ou-row1" defaultChecked className="w-4 h-4 text-[#0071c2]" />
                                            <span className="text-sm text-gray-600">ou</span>
                                            <input type="radio" name="ou-row1" className="w-4 h-4 text-[#0071c2]" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-1">
                                            <button
                                                onClick={() => setLitsAppoint(Math.max(0, litsAppoint - 1))}
                                                className="w-6 h-6 border border-gray-300 rounded hover:bg-gray-50"
                                            >
                                                -
                                            </button>
                                            <span className="w-12 text-center text-sm">{litsAppoint}</span>
                                            <button
                                                onClick={() => setLitsAppoint(litsAppoint + 1)}
                                                className="w-6 h-6 border border-gray-300 rounded hover:bg-gray-50"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Section Conditions lits bébé */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Conditions relatives aux lits bébé
                    </h2>

                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3 flex gap-2">
                        <Info className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                        <p className="text-sm text-gray-700">
                            Vous avez indiqué que votre établissement n'acceptait pas les enfants. Vous ne pouvez donc pas configurer de conditions relatives aux lits bébé, sauf si vous modifiez vos conditions concernant les enfants.                        </p>
                    </div>
                </div>

                {/* Section Conditions lits d'appoint */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Conditions relatives aux lits d'appoint
                    </h2>

                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3 flex gap-2 mb-4">
                        <Info className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                        <p className="text-sm text-gray-700">
                            Vous devez indiquer la disponibilité des lits d'appoint avant de pouvoir paramétrer leurs conditions.
                        </p>
                    </div>

                    <p className="text-sm text-gray-600">
                        Configurez vos restrictions d'âge et tarifs relatifs aux lits d'appoint.
                    </p>
                </div>

                {/* Section Aperçu */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">
                        Aperçu de vos conditions
                    </h2>

                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold text-gray-900">Lits bébé</p>
                            <button className="text-[#0071c2] text-sm hover:underline">Modifier</button>
                        </div>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                            <li>Vous n'avez ajouté aucun lit bébé.</li>
                        </ul>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-semibold text-gray-900">Lits d'appoint</p>
                            <button className="text-[#0071c2] text-sm hover:underline">Modifier</button>
                        </div>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                            <li>Vous n'avez ajouté aucun lit d'appoint.</li>
                        </ul>
                    </div>

                    <p className="text-xs text-gray-600 italic">
                        La formulation de vos conditions peut s'afficher différemment pour vos clients potentiels.
                    </p>
                </div>

                {/* Sidebar "Trouvez-vous cette page utile ?" */}
                <div className="fixed right-6 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-lg p-4 shadow-lg w-64">
                    <p className="text-sm font-semibold text-gray-900 mb-3">
                        Trouvez-vous cette page utile ?
                    </p>
                    <div className="flex gap-2">
                        <button className="flex-1 p-2 border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center gap-2">
                            <ThumbsUp className="w-4 h-4" />
                        </button>
                        <button className="flex-1 p-2 border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center gap-2">
                            <ThumbsDown className="w-4 h-4" />
                        </button>
                    </div>
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

export default ConditionsLits