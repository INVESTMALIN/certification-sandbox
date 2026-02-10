import { X } from 'lucide-react'
import { useState } from 'react'

function Sejours30NuitsModal({ isOpen, onClose, onSave }) {
    const [accepteSejours30, setAccepteSejours30] = useState(true)
    const [nombreNuitsMax, setNombreNuitsMax] = useState('90')

    const handleSave = () => {
        onSave({
            accepteSejours30,
            nombreNuitsMax
        })
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
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">
                        Séjours de plus de 30 nuits (séjours au mois)
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    <p className="text-sm text-gray-700">
                        Répondez à la demande croissante pour les longs séjours en permettant aux clients de réserver plus de 30 nuits.
                    </p>

                    {/* Question acceptation */}
                    <div>
                        <p className="text-sm font-medium text-gray-900 mb-3">
                            Acceptez-vous les réservations de plus de 30 nuits ?
                        </p>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded cursor-pointer hover:border-[#0071c2] transition-colors">
                                <input
                                    type="radio"
                                    name="sejours30"
                                    checked={accepteSejours30}
                                    onChange={() => setAccepteSejours30(true)}
                                    className="w-5 h-5 text-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Oui</span>
                            </label>
                            <label className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded cursor-pointer hover:border-[#0071c2] transition-colors">
                                <input
                                    type="radio"
                                    name="sejours30"
                                    checked={!accepteSejours30}
                                    onChange={() => setAccepteSejours30(false)}
                                    className="w-5 h-5 text-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Non</span>
                            </label>
                        </div>
                    </div>

                    {/* Nombre de nuits max */}
                    {accepteSejours30 && (
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-3">
                                Quel nombre de nuits maximum souhaitez-vous que les clients puissent réserver ?
                            </label>
                            <select
                                value={nombreNuitsMax}
                                onChange={(e) => setNombreNuitsMax(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded text-sm"
                            >
                                <option value="45">45 nuits</option>
                                <option value="60">60 nuits</option>
                                <option value="75">75 nuits</option>
                                <option value="90">90 nuits</option>
                            </select>
                        </div>
                    )}

                    {/* Lien informations */}
                    {accepteSejours30 && (
                        <div>
                            <a href="#" className="text-[#0071c2] text-sm hover:underline">
                                Découvrir les informations à prendre en compte avant de proposer de longs séjours
                            </a>
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

export default Sejours30NuitsModal