import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { CheckCircle, Circle } from 'lucide-react'

function ScorePage() {
    const tasks = [
        {
            completed: true,
            title: 'Téléchargez au moins 10 photos',
            description: 'C\'est fait !',
            actionText: 'Ajouter plus de photos',
            actionType: 'button'
        },
        {
            completed: false,
            title: 'Assurez-vous que vos photos sont toutes de haute qualité',
            description: '5 de vos photos sont de mauvaise qualité.',
            actionText: 'Remplacer les photos de mauvaise qualité',
            actionType: 'link'
        },
        {
            completed: false,
            title: 'Ajoutez ou marquez une photo de l\'extérieur de votre établissement',
            description: 'Il semblerait que vous n\'ayez aucune photo de l\'extérieur de votre établissement.',
            actionText: 'Télécharger',
            actionType: 'button',
            secondAction: 'marquer des photos'
        },
        {
            completed: true,
            title: 'Ajoutez les langues parlées par votre personnel',
            description: 'C\'est fait !',
            actionText: 'Ajouter des langues',
            actionType: 'link'
        },
        {
            completed: true,
            title: 'Ajoutez ou marquez une photo du salon',
            description: 'C\'est fait !',
            actionText: 'Télécharger',
            actionType: 'button',
            secondAction: 'marquer des photos'
        },
        {
            completed: true,
            title: 'Ajoutez des informations sur la remise des clés',
            description: 'C\'est fait !',
            actionText: 'Ajouter des détails sur la remise des clés',
            actionType: 'link'
        },
        {
            completed: true,
            title: 'Précisez les types de lits de chaque hébergement',
            description: 'C\'est fait !',
            actionText: 'Ajouter des types de lits',
            actionType: 'link'
        },
        {
            completed: true,
            title: 'Précisez la superficie des hébergements',
            description: 'C\'est fait !',
            actionText: 'Ajouter les superficies des hébergements',
            actionType: 'link'
        },
        {
            completed: true,
            title: 'Ajoutez les équipements de vos hébergements',
            description: 'C\'est fait !',
            actionText: 'Ajouter des équipements',
            actionType: 'link'
        },
        {
            completed: true,
            title: 'Ajoutez des informations sur les lits disponibles dans vos hébergements',
            description: 'C\'est fait !',
            actionText: 'Ajouter les informations sur les lits',
            actionType: 'link'
        },
        {
            completed: true,
            title: 'Ajoutez des photos de la salle de bains',
            description: 'C\'est fait !',
            actionText: 'Ajouter des photos de la salle de bains',
            actionType: 'link'
        }
    ]

    const competitorScores = [
        { name: 'Hypercenter - Luxury and light', score: 100 },
        { name: 'Hypercenter - At the foot of the Palais des Papes', score: 100 },
        { name: 'Au spa de LLea Suite rétro', score: 97 },
        { name: 'Sarang Bali - Aux pieds du Palais des Papes', score: 96 },
        { name: 'Appartement IM 12 ds hôtel particulier proche Palais des Papes', score: 96 }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-7xl mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Score de la page de l'établissement</h1>
                <p className="text-sm text-gray-600 mb-6">
                    Effectuez les actions suivantes pour améliorer le score de la page de votre établissement.
                </p>

                <div className="grid grid-cols-3 gap-6">
                    {/* Colonne principale (2/3) */}
                    <div className="col-span-2">
                        {/* Info box */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <p className="text-sm text-gray-700">
                                Avec un score de <span className="font-semibold">100 %</span> pour la page de votre établissement, vous pourriez recevoir <span className="font-semibold">18 % de réservations en plus</span>.
                            </p>
                        </div>

                        {/* Liste de tâches */}
                        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
                            {tasks.map((task, index) => (
                                <div key={index} className="p-6 flex items-start gap-4">
                                    {/* Icône de statut */}
                                    <div className="flex-shrink-0 mt-1">
                                        {task.completed ? (
                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                        ) : (
                                            <Circle className="w-6 h-6 text-gray-300" />
                                        )}
                                    </div>

                                    {/* Contenu */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                            {task.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">
                                            {task.description}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex-shrink-0 flex items-center gap-2">
                                        {task.actionType === 'button' ? (
                                            <>
                                                <button className="px-4 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] transition-colors text-sm font-medium whitespace-nowrap">
                                                    {task.actionText}
                                                </button>
                                                {task.secondAction && (
                                                    <>
                                                        <span className="text-sm text-gray-500">ou</span>
                                                        <a href="#" className="text-[#0071c2] text-sm hover:underline whitespace-nowrap">
                                                            {task.secondAction}
                                                        </a>
                                                    </>
                                                )}
                                            </>
                                        ) : (
                                            <a href="#" className="text-[#0071c2] text-sm hover:underline whitespace-nowrap">
                                                {task.actionText}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar droite (1/3) */}
                    <div className="space-y-6">
                        {/* Score de la page */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-base font-semibold text-gray-900 mb-4">
                                Score de la page de l'établissement
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Indique l'attractivité de votre page Booking.com pour vos clients potentiels, en fonction des informations et des photos que vous ajoutez.
                            </p>

                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-600">Votre score peut encore être amélioré</span>
                                    <span className="text-lg font-bold text-[#008009]">94 %</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-[#008009] h-2 rounded-full" style={{ width: '94%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Comparaison avec concurrents */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h3 className="text-sm font-medium text-gray-700 mb-4">
                                Score de la page d'autres établissements :
                            </h3>
                            <div className="space-y-3">
                                {competitorScores.map((competitor, index) => (
                                    <div key={index} className="flex items-start justify-between gap-3">
                                        <span className="text-sm text-gray-700 flex-1">
                                            {competitor.name}
                                        </span>
                                        <span className="text-sm font-semibold text-gray-900 flex-shrink-0">
                                            {competitor.score} %
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default ScorePage