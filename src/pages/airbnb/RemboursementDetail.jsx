import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, FileImage } from 'lucide-react'
import AirbnbHeader from '../../components/airbnb/AirbnbHeader'
import remboursements from '../../data/airbnb/remboursements.json'
import reservations from '../../data/airbnb/reservations.json'
import properties from '../../data/airbnb/properties.json'
import { hydrateReservation, formatDateShort } from '../../data/airbnb/dateUtils.js'

function RemboursementDetail() {
    const { id } = useParams()
    const remb = remboursements.find(r => r.id === id) || remboursements[0]

    const rawReservation = reservations.find(r => r.id === remb.reservationId)
    const reservation = rawReservation ? hydrateReservation(rawReservation) : null
    const property = properties.find(p => p.propertyId === remb.propertyId)

    const formatDateFromOffset = (offset) => {
        const date = new Date()
        date.setDate(date.getDate() + offset)
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
    }

    return (
        <div className="font-airbnb min-h-screen bg-white flex flex-col">
            <AirbnbHeader />

            <main className="flex-1">
                <div className="max-w-2xl mx-auto px-6 py-8">

                    {/* Retour */}
                    <Link
                        to="/airbnb/dashboard"
                        className="flex items-center gap-2 text-gray-900 hover:text-gray-700 mb-6"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="font-medium">Retour</span>
                    </Link>

                    {/* Titre */}
                    <h1 className="text-2xl font-semibold text-gray-900 mb-6">
                        Demande de remboursement
                    </h1>

                    {/* Card résumé */}
                    <div className="border border-gray-200 rounded-xl p-4 mb-8 flex items-start gap-4">
                        <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-[#FF385C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth={1.5} />
                                <path d="M2 10h20" strokeWidth={1.5} />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">
                                Airbnb a versé {remb.totalAmount.toFixed(2)} € EUR à {remb.airbnbPaidTo}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                Si vous avez des questions, vous pouvez contacter {remb.guestName} pour en savoir plus.
                            </p>
                        </div>
                    </div>

                    {/* Chronologie */}
                    <div className="mb-8">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">Chronologie</h2>

                        <div className="relative">
                            {remb.chronologie.map((step, index) => (
                                <div key={step.id} className="flex gap-4 mb-6 relative">
                                    {/* Ligne verticale */}
                                    {index < remb.chronologie.length - 1 && (
                                        <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gray-200"></div>
                                    )}

                                    {/* Icône */}
                                    <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>

                                    {/* Contenu */}
                                    <div className="flex-1 pb-2">
                                        <p className="text-sm font-semibold text-gray-900 mb-1">{step.label}</p>
                                        {step.message && (
                                            <div className="mb-2">
                                                <p className="text-xs font-medium text-gray-700 mb-1">
                                                    Message privé envoyé par {remb.managedBy} à Airbnb
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    {step.message.length > 120
                                                        ? <>{step.message.substring(0, 120)}... <button className="underline font-medium text-gray-900">+ Plus</button></>
                                                        : step.message
                                                    }
                                                </p>
                                            </div>
                                        )}
                                        <p className="text-xs text-gray-500">
                                            {formatDateFromOffset(step.dateOffset)} · {step.heure}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className="my-8 border-gray-200" />

                    {/* Pièces justificatives */}
                    <div className="mb-8">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">
                            {remb.managedBy} a ajouté des pièces justificatives
                        </h2>
                        <div className="space-y-3">
                            {remb.justificatifs.map((fichier, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                                >
                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FileImage className="w-5 h-5 text-gray-500" />
                                    </div>
                                    <span className="text-sm text-gray-900">{fichier}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className="my-8 border-gray-200" />

                    {/* Voyageur et réservation */}
                    <div className="mb-8">
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-gray-900 mb-2">Voyageur et réservation</h2>
                                <p className="text-sm text-gray-900">{remb.guestName}</p>
                                {reservation && (
                                    <p className="text-sm text-gray-600">
                                        {formatDateShort(reservation.checkIn)}–{formatDateShort(reservation.checkOut)}
                                    </p>
                                )}
                                <p className="text-sm text-gray-600">{property?.name}</p>
                            </div>
                            <img
                                src={remb.guestAvatar}
                                alt={remb.guestName}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        </div>
                    </div>

                    <hr className="my-8 border-gray-200" />

                    {/* Demande gérée par */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-gray-900 mb-1">Demande gérée par</h2>
                                <p className="text-sm text-gray-600">{remb.managedBy}</p>
                            </div>
                            <img
                                src={remb.managedByAvatar}
                                alt={remb.managedBy}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                        </div>
                    </div>

                    <hr className="my-8 border-gray-200" />

                    {/* Message envoyé au voyageur */}
                    <div className="mb-8">
                        <h2 className="text-base font-semibold text-gray-900 mb-2">
                            Message envoyé par {remb.managedBy} pour {remb.guestName}
                        </h2>
                        <p className="text-sm text-gray-600">{remb.messageToGuest}</p>
                    </div>

                    <hr className="my-8 border-gray-200" />

                    {/* Date des faits */}
                    <div className="mb-8">
                        <h2 className="text-base font-semibold text-gray-900 mb-1">Date des faits</h2>
                        <p className="text-sm text-gray-600">{formatDateFromOffset(remb.incidentDate)}</p>
                    </div>

                    <hr className="my-8 border-gray-200" />

                    {/* Total demandé */}
                    <div className="mb-8">
                        <h2 className="text-base font-semibold text-gray-900 mb-1">Total demandé</h2>
                        <p className="text-sm text-gray-600">{remb.totalAmount.toFixed(2)} € EUR</p>
                    </div>

                    <hr className="my-8 border-gray-200" />

                    {/* Récapitulatif des éléments */}
                    <div className="mb-8">
                        <h2 className="text-base font-semibold text-gray-900 mb-4">
                            Récapitulatif des éléments (1)
                        </h2>
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-3">
                                <img
                                    src={remb.damagedItemImage}
                                    alt={remb.damagedItem}
                                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                                />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{remb.damagedItem}</p>
                                    <p className="text-xs text-gray-500">{remb.damagedItemType} · {remb.totalAmount.toFixed(2)} € EUR</p>
                                </div>
                            </div>
                            <button className="text-sm font-medium text-gray-900 underline hover:text-gray-700">
                                Détails
                            </button>
                        </div>
                    </div>

                    <hr className="my-8 border-gray-200" />

                    {/* Lien Centre de résolution */}
                    <p className="text-sm text-gray-600 mb-12">
                        Pour consulter toutes vos demandes de paiement ou en créer une nouvelle,{' '}
                        <button className="underline font-medium text-gray-900 hover:text-gray-700">
                            Rendez-vous dans le Centre de résolution
                        </button>
                    </p>

                </div>
            </main>
        </div>
    )
}

export default RemboursementDetail