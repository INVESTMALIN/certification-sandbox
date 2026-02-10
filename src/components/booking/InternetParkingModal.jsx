import { X } from 'lucide-react'
import { useState } from 'react'

function InternetParkingModal({ isOpen, onClose, onSave }) {
    const [internetAccess, setInternetAccess] = useState('gratuit')
    const [connexionType, setConnexionType] = useState('wifi')
    const [connexionLieux, setConnexionLieux] = useState('tous')

    const handleSave = () => {
        onSave({ internetAccess, connexionType, connexionLieux })
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Internet</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Question 1 */}
                    <div>
                        <label className="block text-sm font-medium text-gray-900 mb-3">
                            Les clients peuvent-ils bénéficier d'une connexion Internet ?
                        </label>
                        <select
                            value={internetAccess}
                            onChange={(e) => setInternetAccess(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-[#0071c2] rounded text-sm focus:outline-none focus:border-[#0071c2]"
                        >
                            <option value="choisir">Veuillez choisir...</option>
                            <option value="non">Non</option>
                            <option value="supplement">Oui, en supplément</option>
                            <option value="gratuit">Oui, gratuitement</option>
                            <option value="frais">Des frais s'appliquent (non précisés)</option>
                        </select>
                    </div>

                    {/* Question 2 */}
                    {(internetAccess === 'gratuit' || internetAccess === 'supplement') && (
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-3">
                                Type de connexion
                            </label>
                            <select
                                value={connexionType}
                                onChange={(e) => setConnexionType(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-[#0071c2] rounded text-sm focus:outline-none focus:border-[#0071c2]"
                            >
                                <option value="wifi">Wi-Fi</option>
                                <option value="cable">Par câble</option>
                            </select>
                        </div>
                    )}

                    {/* Question 3 */}
                    {(internetAccess === 'gratuit' || internetAccess === 'supplement') && (
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-3">
                                Lieux de connexion
                            </label>
                            <select
                                value={connexionLieux}
                                onChange={(e) => setConnexionLieux(e.target.value)}
                                className="w-full px-4 py-2 border-2 border-[#0071c2] rounded text-sm focus:outline-none focus:border-[#0071c2]"
                            >
                                <option value="parties-communes">Parties communes</option>
                                <option value="certains">Certains hébergements</option>
                                <option value="tous">Tous les hébergements</option>
                                <option value="centre-affaires">Centre d'affaires</option>
                                <option value="etablissement">Tout l'établissement</option>
                            </select>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
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
            </div>
        </div>
    )
}

export default InternetParkingModal