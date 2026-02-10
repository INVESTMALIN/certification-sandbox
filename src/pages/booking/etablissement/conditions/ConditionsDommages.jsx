import PropertyHeader from '../../../../components/booking/PropertyHeader'
import BookingFooter from '../../../../components/booking/BookingFooter'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ConditionsDommages() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [depotGarantie, setDepotGarantie] = useState(true)
    const [gestionDepot, setGestionDepot] = useState('booking')
    const [montantDepot, setMontantDepot] = useState('300')
    const [accepteConditions, setAccepteConditions] = useState(true)

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
                    Conditions relatives aux dommages
                </h1>

                <div className="flex gap-6">
                    {/* Contenu principal */}
                    <div className="flex-1">
                        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                            {/* Question principale */}
                            <div className="mb-6">
                                <p className="text-sm font-semibold text-gray-900 mb-4">
                                    Vos clients doivent-ils payer un dépôt de garantie ?
                                </p>

                                <div className="space-y-4">
                                    <label className="flex items-start gap-3">
                                        <input
                                            type="radio"
                                            name="depotGarantie"
                                            checked={depotGarantie && gestionDepot === 'booking'}
                                            onChange={() => {
                                                setDepotGarantie(true)
                                                setGestionDepot('booking')
                                            }}
                                            className="w-5 h-5 text-[#0071c2] mt-0.5"
                                        />
                                        <div>
                                            <span className="text-sm font-medium text-gray-900 block mb-1">Oui</span>
                                            <div className="ml-7">
                                                <label className="flex items-start gap-3 mb-3">
                                                    <input
                                                        type="radio"
                                                        name="gestionDepot"
                                                        checked={gestionDepot === 'booking'}
                                                        onChange={() => setGestionDepot('booking')}
                                                        className="w-5 h-5 text-[#0071c2] mt-0.5"
                                                    />
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-900 block mb-1">
                                                            Je souhaite configurer un programme de protection contre les dommages qui sera géré par Booking.com en mon nom
                                                        </span>
                                                        <span className="text-xs text-gray-600">
                                                            Les clients paient uniquement s'ils causent des dommages pendant leur séjour.
                                                        </span>
                                                    </div>
                                                </label>

                                                <label className="flex items-start gap-3">
                                                    <input
                                                        type="radio"
                                                        name="gestionDepot"
                                                        checked={gestionDepot === 'moi-meme'}
                                                        onChange={() => setGestionDepot('moi-meme')}
                                                        className="w-5 h-5 text-[#0071c2] mt-0.5"
                                                    />
                                                    <div>
                                                        <span className="text-sm font-medium text-gray-900 block mb-1">
                                                            Je souhaite gérer moi-même les dépôts de garantie.
                                                        </span>
                                                        <span className="text-xs text-gray-600">
                                                            Les clients vous règlent directement le dépôt de garantie.
                                                        </span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </label>

                                    <label className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="depotGarantie"
                                            checked={!depotGarantie}
                                            onChange={() => setDepotGarantie(false)}
                                            className="w-5 h-5 text-[#0071c2]"
                                        />
                                        <span className="text-sm font-medium text-gray-900">Non</span>
                                    </label>
                                </div>
                            </div>

                            {/* Montant du dépôt */}
                            {depotGarantie && gestionDepot === 'booking' && (
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                                        Indiquez le montant maximum du dépôt de garantie pouvant être facturé au client (par séjour)
                                    </label>
                                    <div className="flex items-center gap-2 max-w-xs">
                                        <span className="text-sm text-gray-700">€ par séjour</span>
                                        <input
                                            type="number"
                                            value={montantDepot}
                                            onChange={(e) => setMontantDepot(e.target.value)}
                                            className="flex-1 px-4 py-2 border-2 border-[#0071c2] rounded text-sm"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Acceptation des conditions */}
                            {depotGarantie && gestionDepot === 'booking' && (
                                <div className="mb-6">
                                    <label className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            checked={accepteConditions}
                                            onChange={(e) => setAccepteConditions(e.target.checked)}
                                            className="w-5 h-5 text-[#0071c2] border-gray-300 rounded mt-0.5"
                                        />
                                        <span className="text-sm text-gray-700">
                                            J'accepte les Conditions générales d'utilisation de la Procédure de demande de paiement des dommages.
                                        </span>
                                    </label>
                                </div>
                            )}

                            {/* Lien conditions */}
                            {depotGarantie && gestionDepot === 'booking' && (
                                <div className="mb-6">
                                    <p className="text-sm text-gray-700">
                                        Pour plus d'informations, veuillez consulter les{' '}
                                        <a href="#" className="text-[#0071c2] hover:underline">
                                            Conditions générales d'utilisation
                                        </a>
                                        .
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex justify-start gap-3">
                            <button
                                onClick={handleSave}
                                disabled={depotGarantie && gestionDepot === 'booking' && !accepteConditions}
                                className="px-6 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
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
                    <div className="w-96">
                        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 sticky top-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                Programme de protection contre les dommages
                            </h3>
                            <p className="text-sm text-gray-700 mb-4">
                                Vos clients ne vous paient pas de dépôt de garantie. En cas de dommages constatés dans votre établissement, vous devez nous faire remonter les problèmes en détail. Nous demanderons au client de payer les frais inhérents. S'il accepte, nous vous transférerons le montant dès sa réception.
                            </p>

                            <h4 className="text-base font-semibold text-gray-900 mb-3">
                                Que verront les clients sur la page de mon hébergement ?
                            </h4>
                            <p className="text-sm text-gray-700 mb-4">
                                Les clients verront le montant maximum que vous pourriez leur facturer en cas de dommages. Ils seront informés que vous pourriez leur demander de payer ce montant (au maximum) s'ils provoquent des dommages à votre hébergement lors de leur séjour.
                            </p>

                            <h4 className="text-base font-semibold text-gray-900 mb-3">
                                Comment puis-je envoyer une demande de paiement pour les dommages occasionnés ?
                            </h4>
                            <p className="text-sm text-gray-700">
                                En cas de dommages dans votre établissement, rendez-vous sur la page « Détails de la réservation » dans les 14 jours suivant le départ et envoyez une demande de paiement des dommages. Nous ferons la liaison avec le client. Si le client accepte de payer, vous devriez être remboursé lors de votre prochain versement.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default ConditionsDommages