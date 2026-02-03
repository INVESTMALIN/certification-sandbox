import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { useParams } from 'react-router-dom'
import propertiesData from '../../../data/booking/properties.json'
import { Check } from 'lucide-react'
import { useState } from 'react'

function InfosStatut() {
    const { id } = useParams()
    const property = propertiesData.find(p => p.id === id)
    const [wantsToQuit, setWantsToQuit] = useState(false)

    if (!property) {
        return <div>Propriété non trouvée</div>
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-4xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Infos sur l'établissement</h1>

                <div className="space-y-6">
                    {/* Section Informations de base */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                    Nom de l'établissement :
                                </h3>
                                <p className="text-sm text-gray-700 mb-1">
                                    {property.name}
                                </p>
                                <a href="#" className="text-[#0071c2] text-sm hover:underline">
                                    Changer le nom de l'établissement
                                </a>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                    Adresse de l'établissement :
                                </h3>
                                <p className="text-sm text-gray-700">
                                    2 Rue du Four
                                </p>
                            </div>

                            <div className="pt-4 border-t border-gray-200">
                                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                                    Emplacement de l'établissement :
                                </h3>
                                <p className="text-sm text-gray-700">
                                    43.9512078, 4.810324 (sur{' '}
                                    <a href="#" className="text-[#0071c2] hover:underline">Google Maps</a>
                                    {' '}et{' '}
                                    <a href="#" className="text-[#0071c2] hover:underline">OpenStreetMap</a>
                                    )
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section Statut de l'hébergement */}
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Statut de l'hébergement
                        </h2>
                        <div className="inline-block px-3 py-1 bg-green-600 text-white text-sm font-medium rounded mb-4">
                            Ouvert et réservable
                        </div>
                        <p className="text-sm text-gray-700 mb-6">
                            Les clients peuvent voir votre établissement et y réserver des hébergements. Si vous le souhaitez, vous pouvez mettre votre page en pause, puis programmer sa réouverture.
                        </p>
                        <button className="px-6 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                            Mettre ma page en pause
                        </button>
                    </div>

                    {/* Section Assurance responsabilité civile */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Assurance responsabilité civile du partenaire
                        </h2>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Check className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-medium text-gray-900">
                                    Vous participez à ce programme.
                                </span>
                            </div>

                            <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                Notre programme Assurance responsabilité civile du partenaire vous fait bénéficier d'une protection, dont le plafond peut atteindre € 1 000 000, contre les réclamations ou poursuites émanant de tiers pour des dommages corporels ou dommages matériels survenus lors d'un séjour réservé sur Booking.com. Vous pouvez rejoindre ou quitter le programme à n'importe quel moment.{' '}
                                <a href="#" className="text-[#0071c2] hover:underline">
                                    En savoir plus sur l'assurance responsabilité civile du partenaire
                                </a>
                            </p>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <label className="flex items-start gap-3 cursor-pointer mb-4">
                                    <input
                                        type="checkbox"
                                        checked={wantsToQuit}
                                        onChange={(e) => setWantsToQuit(e.target.checked)}
                                        className="mt-0.5 w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">
                                        Je souhaite quitter le programme d'assurance responsabilité civile du partenaire.
                                    </span>
                                </label>
                                <button
                                    disabled={!wantsToQuit}
                                    className={`px-6 py-2 rounded text-sm font-medium transition-colors ${wantsToQuit
                                            ? 'bg-gray-400 text-white hover:bg-gray-500 cursor-pointer'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    Quitter
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Section Référence cadastrale */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Veuillez nous fournir votre référence cadastrale
                        </h2>

                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                Conformément à la{' '}
                                <a href="#" className="text-[#0071c2] hover:underline">
                                    directive fiscale DAC7 mise en place par l'Union européenne
                                </a>
                                , Booking.com a l'obligation de déclarer les références cadastrales de tous les hébergements situés dans l'UE figurant sur la plateforme.
                            </p>

                            <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                Une référence cadastrale est un identifiant unique attribué à un bien immobilier et enregistré dans un registre officiel.
                            </p>

                            <p className="text-sm text-gray-700 leading-relaxed mb-4">
                                Vous trouverez votre référence cadastrale sur votre titre de propriété, auprès de votre commune ou sur le site Internet du cadastre. Si vous avez des questions, vous pouvez consulter cette{' '}
                                <a href="#" className="text-[#0071c2] hover:underline">
                                    page Internet de l'Union européenne
                                </a>
                                {' '}dédiée aux cadastres des pays membres.
                            </p>

                            <p className="text-sm text-gray-700 leading-relaxed mb-6">
                                Si vous gérez plusieurs hébergements, veuillez saisir la référence cadastrale de chacun d'eux dans leur extranef respectif. Si l'un de vos hébergements dispose de plusieurs références cadastrales, vous pouvez les saisir les unes après les autres, en les séparant par une virgule.
                            </p>

                            <button className="px-6 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium">
                                Mettre à jour mes informations
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default InfosStatut