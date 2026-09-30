import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import DemandePaiementLayout from '../../../components/airbnb/DemandePaiementLayout'
import { findReservationByCode, getPropertyById, formatStayRange, ELIGIBILITY_MESSAGES } from '../../../data/airbnb/reservationLookup'

const MESSAGES_ERREUR = {
    unknown: 'Aucune réservation ne correspond à ce code.',
    ...ELIGIBILITY_MESSAGES,
}

/**
 * « De quelle réservation s'agit-il ? » : l'apprenant colle le code de confirmation.
 * La suite du parcours porte sur la réservation trouvée (son id passe dans l'URL).
 */
function DemanderPaiementReservation() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [code, setCode] = useState(searchParams.get('code') || '')

    const { reservation, error } = findReservationByCode(code)
    const property = reservation ? getPropertyById(reservation.propertyId) : null

    const changerCode = (value) => {
        setCode(value)
        // Le code reste dans l'URL pour que « Retour » depuis l'écran motif le retrouve
        setSearchParams(value ? { code: value } : {}, { replace: true })
    }

    const handleSelect = () => {
        navigate(`/airbnb/paiement/${reservation.id}/demander/step2?source=litige&code=${encodeURIComponent(reservation.confirmationCode)}`)
    }

    return (
        <DemandePaiementLayout progress="w-2/6" onRetour={() => navigate('/airbnb/demander-paiement')}>
            <h1 className="text-3xl font-semibold text-gray-900 mb-8 leading-tight">
                De quelle réservation s'agit-il ?
            </h1>

            <div className="flex items-center gap-3 border border-gray-300 rounded-full px-4 py-3 focus-within:border-gray-900 transition-colors">
                <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <input
                    type="text"
                    value={code}
                    onChange={e => changerCode(e.target.value)}
                    placeholder="Code de confirmation"
                    aria-label="Code de confirmation"
                    autoFocus
                    className="flex-1 text-sm text-gray-900 focus:outline-none bg-transparent"
                />
                {code && (
                    <button
                        onClick={() => changerCode('')}
                        aria-label="Effacer"
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                    >
                        <X className="w-3 h-3 text-gray-700" />
                    </button>
                )}
            </div>

            {error && error !== 'empty' && (
                <p role="status" className="mt-6 text-sm text-gray-700">{MESSAGES_ERREUR[error]}</p>
            )}

            {reservation && (
                <div className="mt-6 flex items-center gap-4 py-4 border-b border-gray-200">
                    <img
                        src={property?.image}
                        alt={property?.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            Logement entier • {property?.city}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 truncate">{property?.name}</p>
                        <p className="text-sm text-gray-500">{formatStayRange(reservation.checkIn, reservation.checkOut)}</p>
                        <p className="text-sm text-gray-500">Terminée</p>
                    </div>
                    <button
                        onClick={handleSelect}
                        className="px-4 py-2 border border-gray-900 rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex-shrink-0"
                    >
                        Sélectionner
                    </button>
                </div>
            )}
        </DemandePaiementLayout>
    )
}

export default DemanderPaiementReservation
