import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { X, ChevronRight, Banknote, ShieldAlert, Printer } from 'lucide-react'
import { getPropertyById } from '../../data/airbnb/reservationLookup'
import { formatDateLong } from '../../data/airbnb/dateUtils'

/**
 * Fiche imprimable de la réservation. Rendue hors de #root et visible
 * uniquement à l'impression : c'est elle qui sort, pas l'écran courant.
 */
function ReservationPrintSheet({ reservation, property }) {
    return (
        <div className="hidden print:block p-10 text-gray-900" style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}>
            <img src="/airbnb-logo.png" alt="Airbnb" className="h-8 mb-8" />
            <h1 className="text-2xl font-semibold mb-1">Réservation {reservation.confirmationCode}</h1>
            <p className="text-sm text-gray-600 mb-8">{reservation.status === 'past' ? 'Séjour terminé' : reservation.statusDetail}</p>

            <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-200">
                    <tr><td className="py-2 pr-6 font-semibold w-56">Voyageur</td><td className="py-2">{reservation.guestName}</td></tr>
                    <tr><td className="py-2 pr-6 font-semibold">Voyageurs</td><td className="py-2">{reservation.guestCount}</td></tr>
                    <tr><td className="py-2 pr-6 font-semibold">Logement</td><td className="py-2">{property?.name}</td></tr>
                    <tr><td className="py-2 pr-6 font-semibold">Adresse</td><td className="py-2">{property?.address}</td></tr>
                    <tr><td className="py-2 pr-6 font-semibold">Arrivée</td><td className="py-2">{formatDateLong(reservation.checkIn)} à {reservation.checkInTime}</td></tr>
                    <tr><td className="py-2 pr-6 font-semibold">Départ</td><td className="py-2">{formatDateLong(reservation.checkOut)} à {reservation.checkOutTime}</td></tr>
                    <tr><td className="py-2 pr-6 font-semibold">Nuits</td><td className="py-2">{reservation.nights}</td></tr>
                    <tr><td className="py-2 pr-6 font-semibold">Date de réservation</td><td className="py-2">{formatDateLong(reservation.bookedOn)}</td></tr>
                    <tr><td className="py-2 pr-6 font-semibold">Code de confirmation</td><td className="py-2">{reservation.confirmationCode}</td></tr>
                    <tr><td className="py-2 pr-6 font-semibold">Montant total</td><td className="py-2">{reservation.totalAmount.toFixed(2).replace('.', ',')} €</td></tr>
                </tbody>
            </table>
        </div>
    )
}

/**
 * Fenêtre « Gérer la réservation », partagée par le calendrier mono,
 * le détail de réservation et la messagerie.
 * `reservation` doit être la réservation canonique hydratée.
 */
function GererReservationModal({ reservation, onClose }) {
    const navigate = useNavigate()
    const property = getPropertyById(reservation.propertyId)

    useEffect(() => {
        const onKeyDown = (e) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [onClose])

    const handlePrint = () => {
        // On masque l'application pendant l'impression : seule la fiche réservation sort
        const root = document.getElementById('root')
        root?.classList.add('print:hidden')
        const cleanup = () => {
            root?.classList.remove('print:hidden')
            window.removeEventListener('afterprint', cleanup)
            onClose()
        }
        window.addEventListener('afterprint', cleanup)
        window.print()
    }

    const rows = [
        {
            key: 'argent',
            icon: Banknote,
            title: 'Envoyer ou demander de l\'argent',
            subtitle: 'Pour les frais, remboursements ou modifications',
            onClick: () => navigate(`/airbnb/paiement/${reservation.id}/step1`),
        },
        {
            key: 'indemnisation',
            icon: ShieldAlert,
            title: 'Déposer une demande d\'indemnisation',
            onClick: () => navigate('/airbnb/declaration-dommages'),
        },
        {
            key: 'imprimer',
            icon: Printer,
            title: 'Imprimer',
            onClick: handlePrint,
        },
    ]

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="gerer-reservation-titre"
                    className="bg-white rounded-2xl w-full max-w-md shadow-2xl"
                    style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex items-center px-6 pt-5 pb-4 border-b border-gray-100">
                        <button
                            onClick={onClose}
                            aria-label="Fermer"
                            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-4 h-4 text-gray-700" />
                        </button>
                        <h2 id="gerer-reservation-titre" className="flex-1 text-center text-base font-semibold text-gray-900 pr-8">
                            Gérer la réservation
                        </h2>
                    </div>

                    <div className="px-6 py-2 divide-y divide-gray-100">
                        {rows.map(row => {
                            const Icon = row.icon
                            return (
                                <button
                                    key={row.key}
                                    onClick={row.onClick}
                                    className="w-full flex items-center gap-4 py-4 text-left hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
                                >
                                    <Icon className="w-6 h-6 text-gray-800 flex-shrink-0" strokeWidth={1.5} />
                                    <span className="flex-1 min-w-0">
                                        <span className="block text-sm font-semibold text-gray-900">{row.title}</span>
                                        {row.subtitle && <span className="block text-xs text-gray-500 mt-0.5">{row.subtitle}</span>}
                                    </span>
                                    <ChevronRight className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>

            {createPortal(<ReservationPrintSheet reservation={reservation} property={property} />, document.body)}
        </>
    )
}

export default GererReservationModal
