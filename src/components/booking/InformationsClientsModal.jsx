import { X } from 'lucide-react'
import { useState } from 'react'

function InformationsClientsModal({ isOpen, onClose, onSave }) {
    const [checkinStart, setCheckinStart] = useState('4:00 PM')
    const [checkinEnd, setCheckinEnd] = useState('')
    const [checkoutStart, setCheckoutStart] = useState('')
    const [checkoutEnd, setCheckoutEnd] = useState('10:00 AM')
    const [checkin24h, setCheckin24h] = useState(false)
    const [checkout24h, setCheckout24h] = useState(false)
    const [demanderHeureArrivee, setDemanderHeureArrivee] = useState(false)
    const [reserverSansAdresse, setReserverSansAdresse] = useState(true)
    const [reserverSansTelephone, setReserverSansTelephone] = useState(false)
    const [limiteAge, setLimiteAge] = useState(false)
    const [couvrefeu, setCouvrefeu] = useState(false)

    // Générer les heures par tranches de 30 minutes
    const generateTimeOptions = () => {
        const times = []
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += 30) {
                const hour = h === 0 ? 12 : h > 12 ? h - 12 : h
                const period = h < 12 ? 'AM' : 'PM'
                const minute = m === 0 ? '00' : m
                times.push(`${hour}:${minute} ${period}`)
            }
        }
        return times
    }

    const timeOptions = generateTimeOptions()

    const handleSave = () => {
        onSave({
            checkinStart,
            checkinEnd,
            checkoutStart,
            checkoutEnd,
            checkin24h,
            checkout24h,
            demanderHeureArrivee,
            reserverSansAdresse,
            reserverSansTelephone,
            limiteAge,
            couvrefeu
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
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Horaires d'arrivée et de départ</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-8">
                    {/* Horaires d'arrivée et de départ */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Horaires d'arrivée et de départ</h3>

                        {/* Check-in */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm text-gray-700">
                                    L'enregistrement peut s'effectuer entre
                                </label>
                                <label className="flex items-center gap-2 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={checkin24h}
                                        onChange={(e) => setCheckin24h(e.target.checked)}
                                        className="w-4 h-4 text-[#0071c2] border-gray-300 rounded"
                                    />
                                    Enregistrement 24h/24
                                </label>
                            </div>
                            <div className="flex items-center gap-3">
                                <select
                                    value={checkinStart}
                                    onChange={(e) => setCheckinStart(e.target.value)}
                                    disabled={checkin24h}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                                >
                                    {timeOptions.map(time => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                                <span className="text-sm text-gray-600">et</span>
                                <select
                                    value={checkinEnd}
                                    onChange={(e) => setCheckinEnd(e.target.value)}
                                    disabled={checkin24h}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                                >
                                    <option value="">Veuillez sélectionner</option>
                                    {timeOptions.map(time => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Check-out */}
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm text-gray-700">
                                    Le départ peut s'effectuer entre
                                </label>
                                <label className="flex items-center gap-2 text-sm text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={checkout24h}
                                        onChange={(e) => setCheckout24h(e.target.checked)}
                                        className="w-4 h-4 text-[#0071c2] border-gray-300 rounded"
                                    />
                                    Départ 24h/24
                                </label>
                            </div>
                            <div className="flex items-center gap-3">
                                <select
                                    value={checkoutStart}
                                    onChange={(e) => setCheckoutStart(e.target.value)}
                                    disabled={checkout24h}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                                >
                                    <option value="">Veuillez sélectionner</option>
                                    {timeOptions.map(time => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                                <span className="text-sm text-gray-600">et</span>
                                <select
                                    value={checkoutEnd}
                                    onChange={(e) => setCheckoutEnd(e.target.value)}
                                    disabled={checkout24h}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded text-sm disabled:bg-gray-100"
                                >
                                    {timeOptions.map(time => (
                                        <option key={time} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Demander heure d'arrivée */}
                        <div>
                            <p className="text-sm text-gray-700 mb-3">
                                Voulez-vous connaître l'heure d'arrivée approximative de vos clients à l'avance ?
                            </p>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="heureArrivee"
                                        checked={demanderHeureArrivee}
                                        onChange={() => setDemanderHeureArrivee(true)}
                                        className="w-4 h-4 text-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">Oui</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="heureArrivee"
                                        checked={!demanderHeureArrivee}
                                        onChange={() => setDemanderHeureArrivee(false)}
                                        className="w-4 h-4 text-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">Non</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Informations client */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations client</h3>

                        {/* Adresse */}
                        <div className="mb-4">
                            <p className="text-sm text-gray-700 mb-3">
                                Les clients peuvent-ils réserver sans indiquer leur adresse ?
                            </p>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="adresse"
                                        checked={reserverSansAdresse}
                                        onChange={() => setReserverSansAdresse(true)}
                                        className="w-4 h-4 text-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">Oui</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="adresse"
                                        checked={!reserverSansAdresse}
                                        onChange={() => setReserverSansAdresse(false)}
                                        className="w-4 h-4 text-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">Non</span>
                                </label>
                            </div>
                        </div>

                        {/* Téléphone */}
                        <div>
                            <p className="text-sm text-gray-700 mb-3">
                                Les clients peuvent-ils réserver sans indiquer leur numéro de téléphone ?
                            </p>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="telephone"
                                        checked={reserverSansTelephone}
                                        onChange={() => setReserverSansTelephone(true)}
                                        className="w-4 h-4 text-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">Oui</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="telephone"
                                        checked={!reserverSansTelephone}
                                        onChange={() => setReserverSansTelephone(false)}
                                        className="w-4 h-4 text-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">Non</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Limite d'âge */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Limite d'âge</h3>
                        <p className="text-sm text-gray-700 mb-3">
                            Y a-t-il une limite d'âge pour l'enregistrement ?
                        </p>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="limiteAge"
                                    checked={limiteAge}
                                    onChange={() => setLimiteAge(true)}
                                    className="w-4 h-4 text-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Oui</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="limiteAge"
                                    checked={!limiteAge}
                                    onChange={() => setLimiteAge(false)}
                                    className="w-4 h-4 text-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Non</span>
                            </label>
                        </div>
                    </div>

                    {/* Couvre-feu */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Couvre-feu</h3>
                        <p className="text-sm text-gray-700 mb-2">
                            Un couvre-feu est une condition limitant les heures d'arrivée et de départ de vos clients.
                        </p>
                        <p className="text-sm font-medium text-gray-900 mb-3">
                            Imposez-vous un couvre-feu à vos clients ?
                        </p>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="couvrefeu"
                                    checked={couvrefeu}
                                    onChange={() => setCouvrefeu(true)}
                                    className="w-4 h-4 text-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Oui</span>
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="couvrefeu"
                                    checked={!couvrefeu}
                                    onChange={() => setCouvrefeu(false)}
                                    className="w-4 h-4 text-[#0071c2]"
                                />
                                <span className="text-sm text-gray-700">Non</span>
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

export default InformationsClientsModal