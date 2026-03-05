import { useParams, useNavigate } from 'react-router-dom'
import AirbnbHeader from '../../components/airbnb/AirbnbHeader'

function AircoverDemande() {
    const { reservationId } = useParams()
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}>
            <AirbnbHeader />

            <main className="flex-1 flex flex-col items-center px-6 py-16">
                <div className="w-full max-w-xl">

                    {/* Logo Aircover */}
                    <img
                        src="/aircover.avif"
                        alt="AirCover pour les hôtes"
                        className="h-12 mb-10"
                    />

                    {/* Titre */}
                    <h1 className="text-3xl font-semibold text-gray-900 mb-10">
                        Demandez un remboursement
                    </h1>

                    {/* Étapes explicatives */}
                    <div className="space-y-8 mb-12">

                        <div>
                            <h2 className="text-base font-semibold text-gray-900 mb-1">
                                Vérifiez ce qui est couvert
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Vérifiez si votre problème est couvert par la{' '}
                                <button className="underline text-gray-900 hover:text-gray-700 transition-colors">
                                    Garantie dommages des hôtes
                                </button>{' '}
                                avant de lancer votre demande.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-base font-semibold text-gray-900 mb-1">
                                Dites-nous ce qui s'est passé
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Ajoutez des détails et justificatifs pour chaque élément. Il peut s'agir d'objets situés sur votre propriété et dans votre logement, ou d'éléments structurels comme le plancher ou les murs.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-base font-semibold text-gray-900 mb-1">
                                Envoyez votre demande
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Envoyez votre demande dans les 14 jours suivant le départ du voyageur. Votre demande sera d'abord envoyée au voyageur. Si ce dernier n'effectue pas le paiement ou ne répond pas, nous serons là pour vous aider.
                            </p>
                        </div>

                    </div>

                    {/* Séparateur */}
                    <div className="border-t border-gray-200 mb-8" />

                    {/* CTA */}
                    <button
                        onClick={() => navigate(`/airbnb/aircover/demande/${reservationId}/step1`)}
                        className="px-8 py-4 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 transition-colors"
                    >
                        Commencer
                    </button>

                </div>
            </main>
        </div>
    )
}

export default AircoverDemande
