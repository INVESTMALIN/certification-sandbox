import { useParams, Link } from 'react-router-dom'
import { Printer } from 'lucide-react'
import AirbnbHeader from '../../components/airbnb/AirbnbHeader'
import reservationsData from '../../data/airbnb/reservations.json'
import guestsData from '../../data/airbnb/guests.json'
import { hydrateReservation } from '../../data/airbnb/dateUtils'

// Génère un numéro de facture déterministe à partir de l'ID de réservation
const getInvoiceNumber = (id) => {
    const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    return `AIUC-${39760000 + hash}-FR-${7890000 + hash}`
}

// Génère un code de réservation à partir de l'ID
const getBookingCode = (id) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789'
    const hash = id.split('').reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 0)
    let code = ''
    let h = hash
    for (let i = 0; i < 10; i++) {
        code += chars[h % chars.length]
        h = Math.floor(h / chars.length) + (h % 7)
    }
    return code
}

function AirbnbFacture() {
    const { reservationId } = useParams()

    const raw = reservationsData.find(r => r.id === reservationId)
    const res = raw ? hydrateReservation(raw) : null

    // Lookup guest via reservationIds (les réservations n'ont pas de guestId direct)
    const guest = guestsData.find(g => g.reservationIds?.includes(reservationId)) || null
    const guestName = res?.guestName || guest?.guestName || 'Voyageur'
    const guestLocation = guest?.location || 'France'

    // Données de facturation
    const invoiceNumber = reservationId ? getInvoiceNumber(reservationId) : 'AIUC-39761408-FR-7899850'
    const bookingCode = reservationId ? getBookingCode(reservationId) : 'HM3KD2X4P4'
    const issueDate = res?.checkOut
        ? new Date(res.checkOut).toISOString().split('T')[0]
        : '2026-02-26'

    // Montants frais de service (statiques mais cohérents)
    const serviceBase = 27.75
    const tva = 5.55
    const total = 33.30

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <AirbnbHeader />

            <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
                {/* En-tête de facture */}
                <div className="flex items-center justify-between mb-8">
                    <img src="/airbnb-logo.svg" alt="Airbnb" className="h-8"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none'
                            e.currentTarget.nextSibling.style.display = 'block'
                        }}
                    />
                    <span style={{ display: 'none' }} className="text-2xl font-bold text-[#FF385C]">airbnb</span>

                    <h1 className="text-2xl font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">Facture</h1>

                    <button
                        onClick={() => window.print()}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <Printer className="w-4 h-4" />
                        Imprimer
                    </button>
                </div>

                <hr className="border-gray-200 mb-8" />

                {/* Infos 4 colonnes */}
                <div className="grid grid-cols-4 gap-4 mb-8 text-sm">
                    <div>
                        <p className="font-semibold text-gray-900 mb-2">Facture émise par :</p>
                        <p className="text-gray-700 leading-relaxed">
                            Airbnb Ireland UC<br />
                            25 North Wall Quay,<br />
                            Dublin 1, D01 H104<br />
                            Ireland<br />
                            Numéro de TVA :<br />
                            IE9827384L
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 mb-2">Facture envoyée à :</p>
                        <p className="text-[#0066CC] leading-relaxed">
                            {guestName}<br />
                            {guestLocation}<br />
                            Numéro de TVA : --
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 mb-2">Date d'émission de la facture :</p>
                        <p className="text-gray-700">{issueDate}</p>
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 mb-2">Numéro de facture :</p>
                        <p className="text-gray-700">{invoiceNumber}</p>
                    </div>
                </div>

                <hr className="border-gray-200 mb-8" />

                {/* Description */}
                <section className="mb-8">
                    <h2 className="text-base font-bold text-gray-900 mb-3">Description</h2>
                    <p className="text-sm text-gray-700">
                        Frais d'utilisation de la plateforme en ligne pour la réservation {bookingCode} du {issueDate}
                    </p>
                </section>

                <hr className="border-gray-200 mb-8" />

                {/* Tableau détails */}
                <section className="mb-8">
                    <h2 className="text-base font-bold text-gray-900 mb-4">Détails</h2>

                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left font-semibold text-gray-900 pb-3 pr-4 leading-tight">
                                    Pays de<br />facturation de la<br />TVA
                                </th>
                                <th className="text-left font-semibold text-gray-900 pb-3 pr-4">Taux de TVA</th>
                                <th className="text-left font-semibold text-gray-900 pb-3 pr-4">Frais de base</th>
                                <th className="text-left font-semibold text-gray-900 pb-3 pr-4">Montant</th>
                                <th className="text-left font-semibold text-gray-900 pb-3 pr-4">Montant de la TVA</th>
                                <th className="text-left font-semibold text-gray-900 pb-3">Total des frais, TVA incluse</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-gray-200">
                                <td className="py-4 pr-4 text-gray-700">FR</td>
                                <td className="py-4 pr-4 text-gray-700">20,0 %</td>
                                <td className="py-4 pr-4 text-gray-700">Frais de service</td>
                                <td className="py-4 pr-4 text-gray-700">{serviceBase.toFixed(2).replace('.', ',')} € EUR</td>
                                <td className="py-4 pr-4 text-gray-700">{tva.toFixed(2).replace('.', ',')} € EUR</td>
                                <td className="py-4 text-gray-700">{total.toFixed(2).replace('.', ',')} € EUR</td>
                            </tr>
                            <tr>
                                <td colSpan={4} />
                                <td className="pt-4 pr-4 font-semibold text-gray-900">Sous-total</td>
                                <td className="pt-4 font-semibold text-gray-900">{total.toFixed(2).replace('.', ',')} € EUR</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <hr className="border-gray-200 mb-8" />

                {/* Besoin d'aide */}
                <section className="text-sm text-gray-700">
                    <p className="font-semibold text-gray-900 mb-1">Besoin d'aide ?</p>
                    <p>
                        Consultez le{' '}
                        <Link to="/airbnb/centre-aide" className="underline font-medium text-gray-900 hover:text-[#FF385C] transition-colors">
                            Centre d'aide
                        </Link>
                        {' '}si vous avez la moindre question
                    </p>
                </section>
            </main>
        </div>
    )
}

export default AirbnbFacture
