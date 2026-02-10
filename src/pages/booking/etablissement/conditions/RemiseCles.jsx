import PropertyHeader from '../../../../components/booking/PropertyHeader'
import BookingFooter from '../../../../components/booking/BookingFooter'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function AccesHebergement() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [modeAcces, setModeAcces] = useState('coffre-securise')
    const [lieuEnregistrement, setLieuEnregistrement] = useState('sur-place')
    const [infosAcces, setInfosAcces] = useState('Vous recevrez toutes les informations d\'accès au logement par email avant votre arrivée.')
    const [marqueCoffre, setMarqueCoffre] = useState('')

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
                        Retour aux conditions
                    </button>
                </div>

                {/* Titre */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Accès à l'hébergement
                </h1>

                <div className="flex gap-6">
                    {/* Contenu principal */}
                    <div className="flex-1">
                        {/* Section Arrivée */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">
                                Arrivée dans l'hébergement
                            </h2>

                            {/* Mode d'accès */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-900 mb-3">
                                    Comment les clients peuvent-ils accéder à l'hébergement ?
                                </label>
                                <div className="relative">
                                    <select
                                        value={modeAcces}
                                        onChange={(e) => setModeAcces(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded text-sm appearance-none pr-10"
                                    >
                                        <option value="">Sélectionnez une option</option>
                                        <option value="cles-reception">Les clés sont à récupérer à la réception</option>
                                        <option value="personne-rencontre">Une personne de l'établissement rencontrera les clients</option>
                                        <option value="porte-code">La porte comporte un code</option>
                                        <option value="coffre-securise">Les clés sont dans un coffre sécurisé</option>
                                        <option value="instructions">Nous enverrons les instructions</option>
                                        <option value="client-contacter">Le client doit nous contacter pour obtenir les instructions</option>
                                        <option value="lieu-secret">Les clés seront cachées dans un lieu secret.</option>
                                        <option value="autre">Autre</option>
                                    </select>
                                    <svg className="w-5 h-5 text-gray-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            {/* Lieu d'enregistrement */}
                            <div className="mb-6">
                                <p className="text-sm font-medium text-gray-900 mb-3">
                                    Où vos clients peuvent-ils s'enregistrer ?
                                </p>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="lieuEnregistrement"
                                            checked={lieuEnregistrement === 'sur-place'}
                                            onChange={() => setLieuEnregistrement('sur-place')}
                                            className="w-5 h-5 text-[#0071c2]"
                                        />
                                        <span className="text-sm text-gray-700">Sur place</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="lieuEnregistrement"
                                            checked={lieuEnregistrement === 'endroit-different'}
                                            onChange={() => setLieuEnregistrement('endroit-different')}
                                            className="w-5 h-5 text-[#0071c2]"
                                        />
                                        <span className="text-sm text-gray-700">À un endroit différent</span>
                                    </label>
                                </div>
                            </div>

                            {/* Informations d'accès */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-900 mb-3">
                                    Que doivent savoir les clients pour entrer dans votre hébergement ?
                                </label>
                                <textarea
                                    value={infosAcces}
                                    onChange={(e) => setInfosAcces(e.target.value)}
                                    rows={4}
                                    maxLength={500}
                                    className="w-full px-4 py-3 border border-gray-300 rounded text-sm resize-none"
                                />
                                <p className="text-xs text-gray-600 mt-2">
                                    {infosAcces.length} caractères restants
                                </p>
                            </div>

                            {/* Marque du coffre */}
                            {modeAcces === 'coffre-securise' && (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-900 mb-3">
                                        Quelle est la marque du coffre sécurisé ou du système de code sur la porte ?
                                    </label>
                                    <input
                                        type="text"
                                        value={marqueCoffre}
                                        onChange={(e) => setMarqueCoffre(e.target.value)}
                                        placeholder="Nom de la société ou de la marque"
                                        className="w-full px-4 py-2 border border-gray-300 rounded text-sm"
                                    />
                                </div>
                            )}

                            {/* Upload photos */}
                            <div>
                                <p className="text-sm font-semibold text-gray-900 mb-2">
                                    Aidez vos clients en téléchargeant des photos
                                </p>
                                <p className="text-xs text-gray-600 mb-3">
                                    Ces photos seront uniquement visibles par les clients ayant réservé chez vous
                                </p>
                                <button className="px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                                    Télécharger des photos
                                </button>
                            </div>
                        </div>

                        {/* Section Option alternative */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                Option d'enregistrement alternative
                            </h2>
                            <p className="text-sm text-gray-700 mb-4">
                                Paramétrez une autre option d'enregistrement au cas où vos clients ne pourraient pas accéder à votre hébergement avec l'option précédente.
                            </p>
                            <button className="px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded hover:bg-blue-50 transition-colors text-sm font-medium">
                                Ajouter une option d'enregistrement
                            </button>
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
                    </div>

                    {/* Sidebar */}
                    <div className="w-80">
                        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 sticky top-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Aperçu de vos options d'enregistrement
                            </h3>
                            <p className="text-sm text-gray-700 mb-2">
                                Vos clients verront ces informations lorsqu'ils auront réservé.
                            </p>

                            <div className="mt-6">
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">
                                    Arrivée dans l'hébergement
                                </h4>
                                <p className="text-sm text-gray-700 mb-2">
                                    Les clés se trouveront dans un coffre sécurisé sur place.
                                </p>
                                <p className="text-sm text-gray-700">
                                    Vous recevrez toutes les informations d'accès au logement par email avant votre arrivée.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default AccesHebergement