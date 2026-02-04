import { X } from 'lucide-react'
import { useState } from 'react'

function RemboursementModal({ isOpen, onClose, reservation }) {
    const [montantRembourse, setMontantRembourse] = useState('')
    const [nomPrenom, setNomPrenom] = useState('')
    const [fonction, setFonction] = useState('')
    const [commentaires, setCommentaires] = useState('')

    if (!isOpen) return null

    const montantMax = reservation.totalAmount

    const handleSubmit = () => {
        // Logique de soumission
        alert('Remboursement envoyé')
        onClose()
    }

    const formatAmount = (amount) => {
        return `€ ${amount.toFixed(2).replace('.', ',')}`
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Rembourser le client</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-sm text-gray-900 font-semibold mb-6">
                        Vous êtes sur le point de rembourser cette réservation :
                    </p>

                    {/* Info réservation */}
                    <div className="flex items-start gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="w-16 h-16 bg-gray-300 rounded flex-shrink-0">
                            {/* Placeholder image */}
                            <div className="w-full h-full bg-gray-400 rounded"></div>
                        </div>
                        <div className="flex-1">
                            <div className="font-semibold text-gray-900 mb-1">
                                Numéro de réservation : {reservation.reservationNumber}
                            </div>
                            <div className="text-sm text-gray-600">
                                {new Date(reservation.checkIn).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                                {' – '}
                                {new Date(reservation.checkOut).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                                {' · '}
                                {Math.ceil((new Date(reservation.checkOut) - new Date(reservation.checkIn)) / (1000 * 60 * 60 * 24))} chambre · {reservation.guestName}
                            </div>
                        </div>
                    </div>

                    {/* Montant remboursable */}
                    <div className="mb-6">
                        <div className="flex items-start gap-2 mb-2">
                            <span className="text-sm text-gray-900">Montant remboursable maximum : {formatAmount(montantMax)}</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                            <svg className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Les frais de commission pour cette réservation restent inchangés après le remboursement du client.</span>
                        </div>
                    </div>

                    {/* Formulaire */}
                    <div className="space-y-4">
                        {/* Montant remboursé */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Montant remboursé (EUR)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">€</span>
                                <input
                                    type="number"
                                    value={montantRembourse}
                                    onChange={(e) => setMontantRembourse(e.target.value)}
                                    placeholder=""
                                    step="0.01"
                                    max={montantMax}
                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Vos nom et prénom */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Vos nom et prénom
                            </label>
                            <input
                                type="text"
                                value={nomPrenom}
                                onChange={(e) => setNomPrenom(e.target.value)}
                                placeholder="Qui soumet ce remboursement ?"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                            />
                        </div>

                        {/* Votre fonction */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Votre fonction
                            </label>
                            <input
                                type="text"
                                value={fonction}
                                onChange={(e) => setFonction(e.target.value)}
                                placeholder="Quelle est votre fonction au sein de l'établissement ?"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent"
                            />
                        </div>

                        {/* Commentaires */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Commentaires <span className="text-gray-500 font-normal">(facultatif)</span>
                            </label>
                            <textarea
                                value={commentaires}
                                onChange={(e) => setCommentaires(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-[#0071c2] hover:underline text-sm font-medium"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!montantRembourse || !nomPrenom || !fonction || parseFloat(montantRembourse) > montantMax}
                        className="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                    >
                        Continuer
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RemboursementModal