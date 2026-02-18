import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, MessageSquare, Phone } from 'lucide-react'
import AirbnbHeader from '../../components/airbnb/AirbnbHeader'
import demandes from '../../data/airbnb/demandes.json'
import properties from '../../data/airbnb/properties.json'
import { hydrateDemande, formatDateShort, formatDateLong as formatDateLongUtil } from '../../data/airbnb/dateUtils.js'

function DemandeDetail() {
    const { id } = useParams()
    const [selectedDemande, setSelectedDemande] = useState(id || demandes[0]?.id)
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [selectedProperties, setSelectedProperties] = useState([])
    const [actionDone, setActionDone] = useState(null) // 'accepted' | 'refused' | null

    const rawDemande = demandes.find(d => d.id === selectedDemande) || demandes[0]
    const demande = rawDemande ? hydrateDemande(rawDemande) : null

    const formatDate = (date) => formatDateShort(date)
    const formatDateLong = (date) => formatDateLongUtil(date)

    // Filtre par propriété
    const toggleProperty = (propertyName) => {
        setSelectedProperties(prev =>
            prev.includes(propertyName)
                ? prev.filter(p => p !== propertyName)
                : [...prev, propertyName]
        )
    }

    const clearFilters = () => setSelectedProperties([])
    const applyFilters = () => setIsFilterOpen(false)

    const filteredDemandes = selectedProperties.length > 0
        ? demandes.filter(d => selectedProperties.includes(d.propertyName))
        : demandes

    // Deadline pour la décision (simulée)
    const getDeadline = (hoursRemaining) => {
        const now = new Date()
        now.setHours(now.getHours() + hoursRemaining)
        return now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    }

    return (
        <div className="font-airbnb min-h-screen bg-white flex flex-col">
            <AirbnbHeader />

            <main className="flex-1 flex">

                {/* ── PANNEAU GAUCHE ─────────────────────────────────────── */}
                <div className="w-[480px] border-r border-gray-200 overflow-y-auto h-[calc(100vh-80px)] sticky top-[80px] flex-shrink-0">
                    <div className="p-6">

                        {/* Retour + titre */}
                        <Link
                            to="/airbnb/dashboard"
                            className="flex items-center gap-2 text-gray-900 hover:text-gray-700 mb-4"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            <span className="font-medium">Aujourd'hui</span>
                        </Link>

                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold">Demandes</h2>
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="p-2 hover:bg-gray-100 rounded-lg relative"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                                {selectedProperties.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-gray-900 text-white text-[10px] rounded-full flex items-center justify-center">
                                        {selectedProperties.length}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Liste des demandes */}
                        <div className="space-y-3">
                            {filteredDemandes.map((d) => (
                                <button
                                    key={d.id}
                                    onClick={() => setSelectedDemande(d.id)}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-colors ${selectedDemande === d.id
                                        ? 'border-gray-900 bg-gray-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    {/* Compte à rebours */}
                                    <p className="text-xs text-gray-500 mb-2">Il reste {d.hoursRemaining} heures</p>

                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-gray-900 mb-1">
                                                Demande pour la période suivante :
                                            </h3>
                                            <p className="text-xs text-gray-600 line-clamp-1">
                                                {d.propertyName}
                                            </p>
                                        </div>

                                        {/* Avatar + image propriété */}
                                        <div className="flex items-center flex-shrink-0">
                                            <img
                                                src={d.guestAvatar}
                                                alt={d.guestName}
                                                className="w-10 h-10 rounded-full border-2 border-white object-cover"
                                            />
                                            <img
                                                src={d.propertyImage}
                                                alt={d.propertyName}
                                                className="w-10 h-10 rounded-full border-2 border-white -ml-3 object-cover"
                                            />
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── PANNEAU DROIT ──────────────────────────────────────── */}
                <div className="flex-1 overflow-y-auto">
                    <div className="max-w-2xl mx-auto px-8 py-8">

                        {/* En-tête */}
                        <div className="mb-8">
                            <p className="text-sm text-gray-500 font-medium mb-1">Voyage demandé</p>
                            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
                                {demande.guestName} souhaite réserver un voyage
                            </h1>
                            <p className="text-gray-600">{demande.propertyAddress}</p>
                            <p className="text-gray-600">
                                {formatDate(demande.checkIn)}–{formatDate(demande.checkOut)} ({demande.nights} nuit{demande.nights > 1 ? 's' : ''})
                            </p>
                            <p className="text-gray-600">
                                {demande.guestCount} · {demande.totalAmount.toFixed(2)} €
                            </p>
                        </div>

                        <hr className="my-8 border-gray-200" />

                        {/* Message du voyageur */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                {demande.guestName} a dit :
                            </h2>
                            <p className="text-sm text-gray-500 mb-2">{demande.messageTimeAgo}</p>
                            <p className="text-gray-900">{demande.guestMessage}</p>

                            <button className="mt-4 text-sm font-medium text-gray-900 underline hover:text-gray-700">
                                Répondre
                            </button>
                        </div>

                        <hr className="my-8 border-gray-200" />

                        {/* Boutons Refuser / Accepter */}
                        {actionDone === null ? (
                            <div className="mb-8">
                                <p className="text-sm text-gray-600 mb-4 text-center">
                                    Prenez une décision sous {getDeadline(demande.hoursRemaining)} pour ne pas affecter votre taux de réponse.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setActionDone('refused')}
                                        className="px-6 py-4 border-2 border-gray-900 rounded-xl font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                                    >
                                        Refuser
                                    </button>
                                    <button
                                        onClick={() => setActionDone('accepted')}
                                        className="px-6 py-4 bg-[#FF385C] text-white rounded-xl font-semibold hover:bg-[#E61E4D] transition-colors"
                                    >
                                        Accepter
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={`mb-8 p-6 rounded-xl text-center ${actionDone === 'accepted' ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'}`}>
                                <p className={`text-lg font-semibold ${actionDone === 'accepted' ? 'text-green-700' : 'text-gray-700'}`}>
                                    {actionDone === 'accepted'
                                        ? `✓ Demande de ${demande.guestName} acceptée`
                                        : `Demande de ${demande.guestName} refusée`
                                    }
                                </p>
                                <button
                                    onClick={() => setActionDone(null)}
                                    className="mt-3 text-sm text-gray-500 underline hover:text-gray-700"
                                >
                                    Annuler
                                </button>
                            </div>
                        )}

                        <hr className="my-8 border-gray-200" />

                        {/* Tout sur le voyageur */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Tout sur {demande.guestName}
                            </h2>

                            <div className="flex items-center gap-4 mb-6">
                                <img
                                    src={demande.guestAvatar}
                                    alt={demande.guestName}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold text-gray-900">{demande.guestName}</h3>
                                    <p className="text-sm text-gray-500">{demande.guestCount}</p>
                                </div>
                            </div>

                            <button className="text-sm font-medium text-gray-900 underline hover:text-gray-700 block mb-6">
                                Afficher le profil
                            </button>

                            {/* Boutons contact */}
                            <div className="grid grid-cols-2 gap-4">
                                <button className="px-6 py-3 border border-gray-900 rounded-lg font-medium text-gray-900 hover:bg-gray-50 flex items-center justify-center gap-2">
                                    <MessageSquare className="w-5 h-5" />
                                    Envoyer un message
                                </button>
                                <button className="px-6 py-3 border border-gray-900 rounded-lg font-medium text-gray-900 hover:bg-gray-50 flex items-center justify-center gap-2">
                                    <Phone className="w-5 h-5" />
                                    Appeler
                                </button>
                            </div>
                        </div>

                        <hr className="my-8 border-gray-200" />

                        {/* Détails du voyage demandé */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                Détails du voyage demandé
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-gray-900 mb-1">Voyageurs</p>
                                    <p className="text-gray-600">{demande.guestCount}</p>
                                </div>

                                <div>
                                    <p className="text-gray-900 mb-1">Arrivée</p>
                                    <p className="text-gray-600">{formatDateLong(demande.checkIn)}</p>
                                </div>

                                <div>
                                    <p className="text-gray-900 mb-1">Départ</p>
                                    <p className="text-gray-600">{formatDateLong(demande.checkOut)}</p>
                                </div>

                                <div>
                                    <p className="text-gray-900 mb-1">Durée</p>
                                    <p className="text-gray-600">{demande.nights} nuit{demande.nights > 1 ? 's' : ''}</p>
                                </div>

                                <div>
                                    <p className="text-gray-900 mb-1">Montant total</p>
                                    <p className="text-gray-600">{demande.totalAmount.toFixed(2)} €</p>
                                </div>

                                <div>
                                    <p className="text-gray-900 mb-1">Logement</p>
                                    <p className="text-gray-600">{demande.propertyName}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* ── MODAL FILTRE ───────────────────────────────────────────── */}
            {isFilterOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={() => setIsFilterOpen(false)}
                    />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 max-h-[80vh] overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-900">Filtrer les annonces</h2>
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="space-y-4">
                                {demandes.map((d) => (
                                    <label
                                        key={d.id}
                                        className="flex items-center gap-4 cursor-pointer p-2 hover:bg-gray-50 rounded-lg"
                                    >
                                        <img
                                            src={d.propertyImage}
                                            alt={d.propertyName}
                                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                        />
                                        <span className="flex-1 text-sm text-gray-900">{d.propertyName}</span>
                                        <input
                                            type="checkbox"
                                            checked={selectedProperties.includes(d.propertyName)}
                                            onChange={() => toggleProperty(d.propertyName)}
                                            className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-6 border-t border-gray-200">
                            <button
                                onClick={clearFilters}
                                className="text-sm font-medium text-gray-700 hover:underline"
                            >
                                Effacer
                            </button>
                            <button
                                onClick={applyFilters}
                                className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                            >
                                Appliquer
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default DemandeDetail