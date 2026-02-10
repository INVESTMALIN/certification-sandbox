import PropertyHeader from '../../../../components/booking/PropertyHeader'
import BookingFooter from '../../../../components/booking/BookingFooter'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function CommentRecevoirReservations() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [modeReservation, setModeReservation] = useState('instantane')

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
                        className="text-gray-600 hover:underline flex items-center gap-2"
                    >
                        <span>←</span>
                        Revenir aux conditions
                    </button>
                </div>

                {/* Titre */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Comment recevez-vous vos réservations ?
                </h1>

                {/* Contenu */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                    <p className="text-sm font-medium text-gray-900 mb-4">
                        Comment les clients peuvent-ils réserver votre appartement ?
                    </p>

                    <div className="space-y-3">
                        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded hover:border-[#0071c2] cursor-pointer transition-colors">
                            <input
                                type="radio"
                                name="modeReservation"
                                checked={modeReservation === 'instantane'}
                                onChange={() => setModeReservation('instantane')}
                                className="w-5 h-5 text-[#0071c2] mt-0.5"
                            />
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-medium text-gray-900">
                                        Tous les clients peuvent réserver instantanément
                                    </span>
                                    <span className="px-2 py-0.5 bg-green-600 text-white text-xs font-semibold rounded">
                                        Recommandé
                                    </span>
                                </div>
                            </div>
                        </label>

                        <label className="flex items-start gap-3 p-4 border border-gray-200 rounded hover:border-[#0071c2] cursor-pointer transition-colors">
                            <input
                                type="radio"
                                name="modeReservation"
                                checked={modeReservation === 'demande'}
                                onChange={() => setModeReservation('demande')}
                                className="w-5 h-5 text-[#0071c2] mt-0.5"
                            />
                            <div className="flex-1">
                                <span className="text-sm font-medium text-gray-900">
                                    Tous les clients doivent envoyer une demande de réservation
                                </span>
                            </div>
                        </label>
                    </div>

                    {/* Section explicative pour demande de réservation */}
                    {modeReservation === 'demande' && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">
                                Comment fonctionnent les demandes de réservation ?
                            </h3>
                            <p className="text-sm text-gray-700 mb-4">
                                Lorsque vous utilisez la fonctionnalité « Demande de réservation », voici le processus de réservation qui s'applique :
                            </p>
                            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                                <li>Les clients qui souhaitent réserver un séjour commençant plus de 48 heures plus tard pourront voir votre appartement dans les résultats de recherche et vous envoyer une demande de réservation.</li>
                                <li>Vous disposerez de 24 heures pour accepter ou refuser leur demande.</li>
                                <li>Les clients auront 24 heures pour terminer leur réservation et confirmer leur séjour.</li>
                            </ol>
                        </div>
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
            </main>

            <BookingFooter />
        </div>
    )
}

export default CommentRecevoirReservations