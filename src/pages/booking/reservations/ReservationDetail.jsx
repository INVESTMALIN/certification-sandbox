import { useParams, Link } from 'react-router-dom'
import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import reservationsData from '../../../data/booking/reservations.json'
import { ArrowLeft } from 'lucide-react'
import NoShowModal from '../../../components/booking/NoShowModal'
import { useState } from 'react'
import RemboursementModal from '../../../components/booking/RemboursementModal'


function ReservationDetail() {

    const [isNoShowModalOpen, setIsNoShowModalOpen] = useState(false)
    const [isRemboursementModalOpen, setIsRemboursementModalOpen] = useState(false)


    const { id, reservationId } = useParams()

    // Trouver la réservation
    const reservation = reservationsData.find(res => res.id === reservationId)

    // Formater les dates
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    const formatAmount = (amount) => {
        return `€ ${amount.toFixed(2).replace('.', ',')}`
    }

    if (!reservation) {
        return (
            <div className="min-h-screen bg-gray-50">
                <PropertyHeader />
                <main className="max-w-7xl mx-auto px-6 py-6">
                    <p>Réservation non trouvée</p>
                </main>
                <BookingFooter />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="max-w-7xl mx-auto px-6 py-6">
                {/* Bouton retour */}
                <Link
                    to={`/booking/property/${id}/reservations`}
                    className="inline-flex items-center gap-2 text-[#0071c2] hover:underline mb-6 text-sm"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Retour aux réservations
                </Link>

                {/* Titre */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Détail de la réservation {reservation.reservationNumber}
                    </h1>
                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded text-sm font-semibold ${reservation.status === 'OK' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {reservation.status}
                        </span>
                        {reservation.isGenius && (
                            <span className="px-3 py-1 bg-blue-900 text-white text-sm rounded font-semibold">
                                Genius
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* Colonne principale */}
                    <div className="col-span-2 space-y-6">

                        {/* Bloc unique - Informations de réservation */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <div className="grid grid-cols-2 gap-8">
                                {/* Colonne gauche */}
                                <div className="space-y-6">
                                    {/* Date d'arrivée */}
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Date d'arrivée</div>
                                        <div className="text-xl font-bold text-gray-900">
                                            {new Date(reservation.checkIn).toLocaleDateString('fr-FR', {
                                                weekday: 'short',
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </div>

                                    {/* Date de départ */}
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Date de départ</div>
                                        <div className="text-xl font-bold text-gray-900">
                                            {new Date(reservation.checkOut).toLocaleDateString('fr-FR', {
                                                weekday: 'short',
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </div>

                                    {/* Durée de séjour */}
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Durée de séjour :</div>
                                        <div className="text-base text-gray-900">
                                            {Math.ceil((new Date(reservation.checkOut) - new Date(reservation.checkIn)) / (1000 * 60 * 60 * 24))} nuits
                                        </div>
                                    </div>

                                    {/* Nombre de personnes */}
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Nombre de personnes :</div>
                                        <div className="text-base text-gray-900">{reservation.guestDetails}</div>
                                    </div>

                                    {/* Nombre d'hébergements */}
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Nombre d'hébergements</div>
                                        <div className="text-base text-gray-900">1</div>
                                    </div>

                                    {/* Montant total */}
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Montant total</div>
                                        <div className="text-2xl font-bold text-gray-900">{formatAmount(reservation.totalAmount)}</div>
                                    </div>
                                </div>

                                {/* Colonne droite */}
                                <div className="space-y-6">
                                    {/* Nom du client */}
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Nom du client :</div>
                                        <Link to="#" className="text-lg font-semibold text-[#0071c2] hover:underline">
                                            {reservation.guestName}
                                        </Link>
                                        <div className="flex items-center gap-2 mt-1">
                                            <img
                                                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='14' viewBox='0 0 20 14'%3E%3Cg fill='none'%3E%3Cpath fill='%23005bae' d='M0 0h20v4.667H0z'/%3E%3Cpath fill='%23fff' d='M0 4.667h20v4.666H0z'/%3E%3C/g%3E%3C/svg%3E"
                                                alt="gr"
                                                className="w-5 h-3.5"
                                            />
                                            <span className="text-sm text-gray-600">gr</span>
                                        </div>
                                        <Link to="#" className="text-sm text-[#0071c2] hover:underline flex items-center gap-1 mt-2">
                                            Les coordonnées sont masquées
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </Link>
                                    </div>

                                    {/* Langue préférée */}
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Langue préférée</div>
                                        <div className="text-base text-gray-900">grec</div>
                                    </div>

                                    {/* Canal */}
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Canal :</div>
                                        <div className="text-base text-gray-900">Booking.com</div>
                                    </div>

                                    {/* Code IATA/TIDS */}
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Code IATA/TIDS :</div>
                                        <div className="text-base text-gray-900">PC029090</div>
                                    </div>

                                    {/* Numéro de réservation */}
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Numéro de réservation :</div>
                                        <div className="text-base text-gray-900">{reservation.reservationNumber}</div>
                                    </div>

                                    {/* Montant soumis à commission */}
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Montant soumis à commission :</div>
                                        <div className="text-base text-gray-900">{formatAmount(reservation.totalAmount)}</div>
                                    </div>

                                    {/* Reçue */}
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Reçue</div>
                                        <div className="text-base text-gray-900">
                                            {new Date(reservation.bookedOn).toLocaleDateString('fr-FR', {
                                                weekday: 'short',
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </div>
                                    </div>

                                    {/* Commission et frais */}
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Commission et frais :</div>
                                        <div className="text-base text-gray-900 flex items-center gap-1">
                                            {formatAmount(reservation.commission)}
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Paiement du client */}
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Paiement du client</div>
                                        <div className="text-base text-gray-900">
                                            Le paiement est facilité par l'intermédiaire des <strong>Paiements par Booking.com</strong>. Pour en savoir plus, consultez cette{' '}
                                            <Link to="#" className="text-[#0071c2] hover:underline">
                                                Page d'aide (comptabilité)
                                            </Link>.
                                        </div>
                                    </div>

                                    {/* Bloc-notes */}
                                    <div>
                                        <div className="text-sm text-gray-600 mb-1">Bloc-notes (usage interne)</div>
                                        <Link to="#" className="text-[#0071c2] hover:underline text-sm">
                                            Ajoutez une note ici
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Informations de paiement */}
                        <div className="bg-white rounded-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations de paiement</h2>

                            {/* Carte avec icône horloge */}
                            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg mb-6">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 border-2 border-gray-900 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" strokeWidth="2" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Virement bancaire</h3>
                                    <p className="text-sm text-gray-600 mb-1">Pas encore effectué</p>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        Booking.com débitera <strong>{formatAmount(reservation.totalAmount)}</strong> sur le compte du client. Nous vous ferons un virement bancaire pour cette réservation d'ici le 9 avril 2026. En fonction des délais de traitement de votre banque, les fonds peuvent mettre jusqu'à 10 jours à apparaître sur votre compte. Le versement est soumis à vos conditions d'annulation.
                                    </p>
                                </div>
                            </div>

                            {/* Détails de paiement */}
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Montant total</span>
                                    <span className="font-bold text-gray-900 text-lg">{formatAmount(reservation.totalAmount)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Commission</span>
                                    <span className="font-semibold text-gray-900">{formatAmount(reservation.commission)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Mode de paiement</span>
                                    <span className="font-semibold text-gray-900">{reservation.paymentMethod}</span>
                                </div>
                            </div>

                            {/* Conversation avec le client */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-gray-900">Conversation avec le client</h2>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Zone de messages */}
                                <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-96 overflow-y-auto">
                                    {/* Date */}
                                    <div className="text-center text-xs text-gray-500 mb-4">
                                        dim. 1 févr. 22:43
                                    </div>

                                    {/* Message automatique */}
                                    <div className="bg-gray-800 text-white rounded-lg p-4 mb-4">
                                        <p className="mb-3">Bonjour {reservation.guestName.split(' ')[0]},</p>
                                        <p className="mb-3">
                                            Merci pour votre réservation à {reservation.propertyName} — votre séjour est bien confirmé.
                                        </p>
                                        <p className="mb-3">
                                            <strong>Adresse du logement :</strong><br />
                                            {reservation.propertyAddress}
                                        </p>
                                        <p className="mb-3">
                                            <strong>Vos dates : [CHECKIN] → [CHECKOUT]</strong>
                                        </p>
                                        <p className="mb-2 flex items-center gap-2">
                                            🏠 Check-in : à partir de 16:00
                                        </p>
                                        <p className="mb-3 flex items-center gap-2">
                                            🏠 Check-out : avant 10:00
                                        </p>
                                        <p>
                                            Le matin de votre arrivée, vous recevrez un message avec toutes les instructions d'accès.
                                        </p>
                                    </div>
                                </div>

                                {/* Avertissement sécurité */}
                                <div className="flex items-start gap-2 bg-gray-50 rounded-lg p-3 mb-4">
                                    <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <p className="text-xs text-gray-700">
                                        Protégez la sécurité de votre compte : ne partagez pas d'informations sensibles par message ou par e-mail.{' '}
                                        <a href="#" className="text-[#0071c2] hover:underline">En savoir plus</a>
                                    </p>
                                </div>

                                {/* Zone de saisie */}
                                <div className="space-y-3">
                                    <textarea
                                        placeholder="Saisissez votre message..."
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#0071c2] focus:border-transparent resize-none"
                                    />

                                    {/* Boutons actions */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <button className="flex items-center gap-2 text-[#0071c2] hover:underline text-sm">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                Photos
                                            </button>
                                            <button className="flex items-center gap-2 text-[#0071c2] hover:underline text-sm">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                                Modèles
                                            </button>
                                        </div>
                                        <button className="px-6 py-2 bg-[#0071c2] text-white rounded hover:bg-[#005999] text-sm font-medium">
                                            Envoyer
                                        </button>
                                    </div>
                                </div>

                                {/* Footer info */}
                                <p className="text-xs text-gray-600 mt-4">
                                    Booking.com reçoit tous les messages écrits ici et les traite selon sa{' '}
                                    <a href="#" className="text-[#0071c2] hover:underline">Charte de confidentialité et informations sur les cookies</a>
                                </p>
                            </div>

                            {/* Informations sur l'hébergement */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">{reservation.accommodation}</h2>

                                <div className="space-y-6">
                                    {/* Annulation */}
                                    <div className="border-b border-gray-200 pb-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Annulation</h3>
                                        <p className="text-sm text-gray-700">
                                            Le client devra verser le montant total de la réservation s'il annule à tout moment.
                                        </p>
                                    </div>

                                    {/* Conditions de non-présentation */}
                                    <div className="border-b border-gray-200 pb-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Conditions de non-présentation</h3>
                                        <p className="text-sm text-gray-700">
                                            Si le client ne se présente pas, il devra payer le montant total de la réservation.
                                        </p>
                                    </div>

                                    {/* Conditions relatives aux dommages */}
                                    <div className="border-b border-gray-200 pb-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Conditions relatives aux dommages</h3>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Vos clients ne vous paient pas de dépôt de garantie.
                                        </p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Le montant de votre dépôt de garantie s'élève à € 300.
                                        </p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            En cas de dommages constatés dans votre hébergement, vous nous les signalez, et nous demandons au client de payer les frais associés en votre nom.
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            Assurez-vous d'envoyer votre demande de paiement des dommages dans les 14 jours suivant le départ du client de votre hébergement.
                                        </p>
                                    </div>

                                    {/* Internet */}
                                    <div className="border-b border-gray-200 pb-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Internet</h3>
                                        <p className="text-sm text-gray-700">
                                            Une connexion Wi-Fi est disponible dans les chambres gratuitement.
                                        </p>
                                    </div>

                                    {/* Enfants et lits d'appoint */}
                                    <div className="border-b border-gray-200 pb-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Enfants et lits d'appoint</h3>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Les enfants de tous âges sont acceptés.
                                        </p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Vous n'avez ajouté aucun lit bébé.
                                        </p>
                                        <p className="text-sm text-gray-700 mb-2">
                                            Vous n'avez ajouté aucun lit d'appoint.
                                        </p>
                                        <p className="text-sm text-gray-700">
                                            Le nombre maximum de personnes est de 2.
                                        </p>
                                    </div>

                                    {/* Parking */}
                                    <div className="border-b border-gray-200 pb-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Parking</h3>
                                        <p className="text-sm text-gray-700">
                                            L'établissement ne dispose pas de parking.
                                        </p>
                                    </div>

                                    {/* Animaux de compagnie */}
                                    <div className="border-b border-gray-200 pb-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">Animaux de compagnie</h3>
                                        <p className="text-sm text-gray-700">
                                            Les animaux de compagnie ne sont pas admis au sein de l'établissement.
                                        </p>
                                    </div>

                                    {/* Groupes */}
                                    <div>
                                        <h3 className="font-semibold text-gray-900 mb-2">Groupes</h3>
                                        <p className="text-sm text-gray-700">
                                            Aucune condition particulière ne s'applique aux groupes.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Sidebar droite */}
                    <div className="col-span-1 space-y-6">
                        {/* Sidebar droite */}
                        <div className="col-span-1 space-y-6">
                            {/* Bloc Actions sur la réservation */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <button className="w-full px-4 py-3 border-2 border-[#0071c2] text-[#0071c2] rounded hover:bg-blue-50 text-sm font-medium mb-4">
                                    Imprimer cette page
                                </button>

                                <h3 className="text-base font-semibold text-gray-900 mb-4">Actions sur la réservation</h3>

                                <div className="space-y-3">
                                    <button className="w-full px-4 py-3 border border-gray-300 text-gray-400 bg-white rounded cursor-not-allowed text-sm font-medium">
                                        Modifier les dates de séjour
                                    </button>
                                    <button
                                        onClick={() => setIsNoShowModalOpen(true)}
                                        className="w-full px-4 py-3 border border-gray-300 text-[#0071c2] bg-white rounded hover:bg-gray-50 text-sm font-medium"
                                    >
                                        Signaler comme non-présentation
                                    </button>
                                    <button
                                        onClick={() => setIsRemboursementModalOpen(true)}
                                        className="w-full px-4 py-3 border border-gray-300 text-[#0071c2] bg-white rounded hover:bg-gray-50 text-sm font-medium"
                                    >
                                        Rembourser le client
                                    </button>
                                </div>

                                <h3 className="text-base font-semibold text-gray-900 mt-6 mb-4">Problèmes</h3>

                                <div className="space-y-3">
                                    <Link
                                        to={`/booking/property/${id}/reservations/${reservation.id}/report-behavior`}
                                        className="w-full px-4 py-3 border border-gray-300 text-[#0071c2] bg-white rounded hover:bg-gray-50 text-sm font-medium block text-center"
                                    >
                                        Signaler un comportement inapproprié du client
                                    </Link>
                                </div>
                            </div>

                            {/* Bloc aide */}
                            <div className="bg-white rounded-lg border border-gray-200 p-6">
                                <div className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-[#0071c2] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <Link to="#" className="text-[#0071c2] hover:underline text-sm block mb-1">
                                            Le client ne s'est pas présenté ?
                                        </Link>
                                        <Link to="#" className="text-[#0071c2] hover:underline text-sm block">
                                            Que puis-je faire ?
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <BookingFooter />
            {/* Modal Non-présentation */}
            <NoShowModal
                isOpen={isNoShowModalOpen}
                onClose={() => setIsNoShowModalOpen(false)}
                reservation={reservation}
            />
            {/* Modal Remboursement */}
            <RemboursementModal
                isOpen={isRemboursementModalOpen}
                onClose={() => setIsRemboursementModalOpen(false)}
                reservation={reservation}
            />
        </div>
    )
}

export default ReservationDetail