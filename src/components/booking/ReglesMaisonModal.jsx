import { X } from 'lucide-react'
import { useState } from 'react'

function ReglesMaisonModal({ isOpen, onClose, onSave }) {
    const [fumer, setFumer] = useState(false)
    const [fetes, setFetes] = useState(false)
    const [restrictionsBruit, setRestrictionsBruit] = useState(true)
    const [heureDebutBruit, setHeureDebutBruit] = useState('22h00')
    const [heureFinBruit, setHeureFinBruit] = useState('8h00')
    const [animaux, setAnimaux] = useState('non')

    // Générer les heures par tranches de 1h
    const generateHeures = () => {
        const heures = []
        for (let h = 0; h < 24; h++) {
            heures.push(`${h}h00`)
        }
        return heures
    }

    const heuresOptions = generateHeures()

    const handleSave = () => {
        onSave({
            fumer,
            fetes,
            restrictionsBruit,
            heureDebutBruit,
            heureFinBruit,
            animaux
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
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Règles de la maison</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Vous demandez à vos clients de suivre les règles suivantes :
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Fumer */}
                    <div>
                        <p className="text-sm font-medium text-gray-900 mb-3">
                            Est-il possible de fumer dans votre hébergement ?
                        </p>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded cursor-pointer hover:border-[#0071c2] transition-colors">
                                <input
                                    type="radio"
                                    name="fumer"
                                    checked={fumer}
                                    onChange={() => setFumer(true)}
                                    className="w-5 h-5 text-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Oui</span>
                            </label>
                            <label className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded cursor-pointer hover:border-[#0071c2] transition-colors">
                                <input
                                    type="radio"
                                    name="fumer"
                                    checked={!fumer}
                                    onChange={() => setFumer(false)}
                                    className="w-5 h-5 text-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Non</span>
                            </label>
                        </div>
                    </div>

                    {/* Fêtes */}
                    <div>
                        <p className="text-sm font-medium text-gray-900 mb-3">
                            Autorisez-vous les fêtes/événements ?
                        </p>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded cursor-pointer hover:border-[#0071c2] transition-colors">
                                <input
                                    type="radio"
                                    name="fetes"
                                    checked={fetes}
                                    onChange={() => setFetes(true)}
                                    className="w-5 h-5 text-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Oui</span>
                            </label>
                            <label className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded cursor-pointer hover:border-[#0071c2] transition-colors">
                                <input
                                    type="radio"
                                    name="fetes"
                                    checked={!fetes}
                                    onChange={() => setFetes(false)}
                                    className="w-5 h-5 text-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Non</span>
                            </label>
                        </div>
                    </div>

                    {/* Restrictions bruit */}
                    <div>
                        <p className="text-sm font-medium text-gray-900 mb-3">
                            Y a-t-il des restrictions concernant le bruit à certaines heures ?
                        </p>
                        <div className="flex gap-4 mb-4">
                            <label className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded cursor-pointer hover:border-[#0071c2] transition-colors">
                                <input
                                    type="radio"
                                    name="bruit"
                                    checked={restrictionsBruit}
                                    onChange={() => setRestrictionsBruit(true)}
                                    className="w-5 h-5 text-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Oui</span>
                            </label>
                            <label className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded cursor-pointer hover:border-[#0071c2] transition-colors">
                                <input
                                    type="radio"
                                    name="bruit"
                                    checked={!restrictionsBruit}
                                    onChange={() => setRestrictionsBruit(false)}
                                    className="w-5 h-5 text-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Non</span>
                            </label>
                        </div>

                        {restrictionsBruit && (
                            <div>
                                <p className="text-sm text-gray-700 mb-3">
                                    Les clients doivent éviter de faire du bruit entre
                                </p>
                                <div className="flex items-center gap-3">
                                    <select
                                        value={heureDebutBruit}
                                        onChange={(e) => setHeureDebutBruit(e.target.value)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm"
                                    >
                                        {heuresOptions.map(heure => (
                                            <option key={heure} value={heure}>{heure}</option>
                                        ))}
                                    </select>
                                    <span className="text-sm text-gray-600">et</span>
                                    <select
                                        value={heureFinBruit}
                                        onChange={(e) => setHeureFinBruit(e.target.value)}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm"
                                    >
                                        {heuresOptions.map(heure => (
                                            <option key={heure} value={heure}>{heure}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Animaux */}
                    <div>
                        <p className="text-sm font-medium text-gray-900 mb-3">
                            Acceptez-vous les animaux domestiques ?
                        </p>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded cursor-pointer hover:border-[#0071c2] transition-colors">
                                <input
                                    type="radio"
                                    name="animaux"
                                    checked={animaux === 'oui'}
                                    onChange={() => setAnimaux('oui')}
                                    className="w-5 h-5 text-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Oui</span>
                            </label>
                            <label className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded cursor-pointer hover:border-[#0071c2] transition-colors">
                                <input
                                    type="radio"
                                    name="animaux"
                                    checked={animaux === 'non'}
                                    onChange={() => setAnimaux('non')}
                                    className="w-5 h-5 text-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Non</span>
                            </label>
                            <label className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 rounded cursor-pointer hover:border-[#0071c2] transition-colors">
                                <input
                                    type="radio"
                                    name="animaux"
                                    checked={animaux === 'demande'}
                                    onChange={() => setAnimaux('demande')}
                                    className="w-5 h-5 text-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Sur demande</span>
                            </label>
                        </div>
                    </div>
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

export default ReglesMaisonModal