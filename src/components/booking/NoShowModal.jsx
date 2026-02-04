import { X } from 'lucide-react'
import { useState } from 'react'

function NoShowModal({ isOpen, onClose, reservation }) {
    const [selectedOption, setSelectedOption] = useState('facturer')

    if (!isOpen) return null

    const handleSubmit = () => {
        // Logique de soumission
        alert('Non-présentation signalée')
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Signaler une non-présentation</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        {reservation.accommodation}
                    </h3>

                    <p className="text-sm text-gray-700 mb-6">
                        Voulez-vous annuler les frais de non-présentation pour cette réservation ?
                    </p>

                    {/* Radio buttons */}
                    <div className="space-y-4 mb-6">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="radio"
                                name="noshow"
                                value="supprimer"
                                checked={selectedOption === 'supprimer'}
                                onChange={(e) => setSelectedOption(e.target.value)}
                                className="mt-1 w-4 h-4 text-[#0071c2]"
                            />
                            <span className="text-sm text-gray-900">Oui, supprimer les frais</span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="radio"
                                name="noshow"
                                value="facturer"
                                checked={selectedOption === 'facturer'}
                                onChange={(e) => setSelectedOption(e.target.value)}
                                className="mt-1 w-4 h-4 text-[#0071c2]"
                            />
                            <span className="text-sm text-gray-900">Non, facturer les frais</span>
                        </label>
                    </div>

                    {/* Info text */}
                    <p className="text-sm text-gray-700 mb-4">
                        Nous informerons les clients en conséquence.
                    </p>

                    <p className="text-sm text-gray-700 mb-6">
                        Si vous facturez des frais d'annulation ou de non-présentation pour une réservation, Booking.com vous facturera une commission sur ces frais.
                    </p>
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
                        className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                        Signaler comme non-présentation
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NoShowModal