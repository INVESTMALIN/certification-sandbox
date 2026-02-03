import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'

function TvaTaxes() {
    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-6xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-3">TVA, taxes et frais</h1>
                <p className="text-sm text-gray-700 mb-8">
                    Cet aperçu récapitule vos taxes et frais locaux, tels que la TVA, la taxe de séjour et les frais de service. Si vous souhaitez ajuster l'un de ces éléments,{' '}
                    <a href="#" className="text-[#0071c2] hover:underline">
                        n'hésitez pas à nous contacter pour obtenir de l'aide
                    </a>.
                </p>

                {/* Tableau comparatif */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                    {/* En-têtes du tableau */}
                    <div className="grid grid-cols-3 border-b border-gray-200">
                        <div className="p-4"></div>
                        <div className="p-4 bg-gray-50 border-l border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900">Now</h3>
                        </div>
                        <div className="p-4 bg-gray-50 border-l border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900">Most popular in Avignon</h3>
                        </div>
                    </div>

                    {/* Ligne TVA */}
                    <div className="grid grid-cols-3 border-b border-gray-200">
                        <div className="p-4">
                            <span className="text-sm font-medium text-gray-900">TVA</span>
                        </div>
                        <div className="p-4 border-l border-gray-200">
                            <span className="text-sm text-gray-700">TVA of 10 % of net price compris(e)</span>
                        </div>
                        <div className="p-4 border-l border-gray-200">
                            <span className="text-sm text-gray-700">TVA of 10 % of net price compris(e)</span>
                        </div>
                    </div>

                    {/* Ligne Taxe de séjour */}
                    <div className="grid grid-cols-3 border-b border-gray-200">
                        <div className="p-4">
                            <span className="text-sm font-medium text-gray-900">Taxe de séjour</span>
                        </div>
                        <div className="p-4 border-l border-gray-200">
                            <div className="space-y-3">
                                <p className="text-sm text-gray-700">
                                    Taxe de séjour 5.5 % (ce montant ne dépassera pas € 3.63 par personne et par nuit), non compris(e)
                                </p>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 mb-2">Conditions apply</p>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-gray-200">
                                                    <th className="text-left py-2 pr-4 font-semibold text-gray-900">Age of guest</th>
                                                    <th className="text-left py-2 font-semibold text-gray-900">Percentage</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b border-gray-100">
                                                    <td className="py-2 pr-4 text-gray-700">Ages 0 to 17 (inclusive)</td>
                                                    <td className="py-2 text-gray-700">0%</td>
                                                </tr>
                                                <tr>
                                                    <td className="py-2 pr-4 text-gray-700">Age 18 and above</td>
                                                    <td className="py-2 text-gray-700">100%</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-l border-gray-200">
                            <span className="text-sm text-gray-700">
                                Taxe de séjour 5.5 % (ce montant ne dépassera pas par personne et par nuit), non compris(e)
                            </span>
                        </div>
                    </div>

                    {/* Ligne Frais de ménage */}
                    <div className="grid grid-cols-3">
                        <div className="p-4">
                            <span className="text-sm font-medium text-gray-900">Frais de ménage</span>
                        </div>
                        <div className="p-4 border-l border-gray-200">
                            <span className="text-sm text-gray-700">Frais de ménage of € 40 par séjour non compris(e)</span>
                        </div>
                        <div className="p-4 border-l border-gray-200">
                            <span className="text-sm text-gray-700"></span>
                        </div>
                    </div>
                </div>

                {/* Section Informations relatives au calcul des taxes */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                        Informations relatives au calcul des taxes
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4">
                        Renseignez les informations à prendre en compte pour calculer précisément le montant de vos taxes. Pour en savoir plus sur les informations relatives au calcul des taxes, veuillez consulter{' '}
                        <a href="#" className="text-[#0071c2] hover:underline">
                            cet article du Partner Hub
                        </a>.
                    </p>
                    <a href="#" className="text-[#0071c2] text-sm hover:underline">
                        Modifier les informations sur le calcul des taxes
                    </a>
                </div>

                {/* Note en bas */}
                <p className="text-xs text-gray-600">
                    * The most common value (VAT, city tax, service charge) out of a total of 1565 open properties in Avignon.
                </p>
            </main>

            <BookingFooter />
        </div>
    )
}

export default TvaTaxes