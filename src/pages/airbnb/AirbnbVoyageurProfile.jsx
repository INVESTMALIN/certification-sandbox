import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ShieldCheck, Flag, Ban } from 'lucide-react'
import { useState } from 'react'
import AirbnbHeader from '../../components/airbnb/AirbnbHeader'
import AirbnbFooter from '../../components/airbnb/AirbnbFooter'
import guests from '../../data/airbnb/guests.json'
import reservations from '../../data/airbnb/reservations.json'

export default function AirbnbVoyageurProfile() {
    const { reservationId } = useParams()
    const navigate = useNavigate()
    const [showAll, setShowAll] = useState(false)
    const [showReportModal, setShowReportModal] = useState(false)
    const [selectedReport, setSelectedReport] = useState(null)

    // Find guest by reservationId
    const guest = guests.find(g => g.reservationIds.includes(reservationId))
    const reservation = reservations.find(r => r.id === reservationId)

    if (!guest) {
        return (
            <div className="font-airbnb min-h-screen bg-white flex flex-col">
                <AirbnbHeader />
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-gray-500">Profil introuvable.</p>
                </div>
            </div>
        )
    }

    const visibleComments = showAll ? guest.hostComments : guest.hostComments.slice(0, 3)

    return (
        <div className="font-airbnb min-h-screen bg-white flex flex-col">
            <AirbnbHeader />

            <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-900 hover:text-gray-600 mb-8 transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm font-medium">Retour</span>
                </button>

                {/* ── TOP SECTION: card + infos ── */}
                <div className="flex gap-12 mb-10">

                    {/* Profile card */}
                    <div className="flex-shrink-0 border border-gray-200 rounded-2xl p-6 w-80 shadow-md self-start">
                        <div className="flex gap-4">
                            {/* Colonne gauche: avatar + nom + ville */}
                            <div className="flex flex-col items-center justify-center">
                                <div className="relative mb-2">
                                    <img src={guest.guestAvatar} alt={guest.firstName} className="w-20 h-20 rounded-full object-cover" />
                                    {guest.identityVerified && (
                                        <div className="absolute bottom-1 right-1 w-7 h-7 bg-[#FF385C] rounded-full flex items-center justify-center border-2 border-white">
                                            <ShieldCheck className="w-3.5 h-3.5 text-white" />
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-lg font-bold text-gray-900 text-center">{guest.firstName}</h2>
                                <p className="text-xs text-gray-500 mt-0.5 text-center">{guest.location}</p>
                            </div>

                            {/* Séparateur vertical */}
                            <div className="w-px bg-white-200 mx-1" />

                            {/* Colonne droite: stats */}
                            <div className="flex flex-col justify-center gap-3 flex-1">
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{guest.trips}</p>
                                    <p className="text-xs text-gray-500">voyages</p>
                                </div>
                                <div className="border-t border-gray-100" />
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{guest.reviewsCount}</p>
                                    <p className="text-xs text-gray-500">évaluations</p>
                                </div>
                                <div className="border-t border-gray-100" />
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">{guest.yearsOnAirbnb}</p>
                                    <p className="text-xs text-gray-500">années sur Airbnb</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Infos droite */}
                    <div className="flex-1 min-w-0">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">
                            Quelques informations sur {guest.firstName}
                        </h1>
                        <div className="flex flex-col gap-3 mb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-gray-500 text-lg">🌐</span>
                                <span className="text-sm text-gray-800">Langues parlées : {guest.languages.join(', ')}</span>
                            </div>
                            {guest.identityVerified && (
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-5 h-5 text-gray-500" />
                                    <span className="text-sm text-gray-800 underline font-medium cursor-pointer">Identité vérifiée</span>
                                </div>
                            )}
                            {guest.isHost && (
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 text-lg">🍴</span>
                                    <span className="text-sm text-gray-800">Également hôte</span>
                                </div>
                            )}
                        </div>
                        {guest.bio && <p className="text-sm text-gray-700 leading-relaxed">{guest.bio}</p>}
                    </div>
                </div>

                {/* ── SEPARATOR ── */}
                <div className="border-t border-gray-200 mb-10" />

                {/* ── COMMENTS SECTION ── */}
                {guest.hostComments.length > 0 ? (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900">
                                Commentaires des hôtes sur {guest.firstName}
                            </h3>
                            <div className="flex items-center gap-2">
                                <button className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                                    <ChevronLeft className="w-4 h-4 text-gray-600" />
                                </button>
                                <button className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                                    <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg>
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-6 mb-6">
                            {visibleComments.map((comment, i) => (
                                <div key={i} className="flex flex-col">
                                    <div className="flex items-center gap-2 mb-1">
                                        <img src={comment.hostAvatar} alt={comment.hostName} className="w-8 h-8 rounded-full object-cover" />
                                        <span className="text-sm font-medium text-gray-900">{comment.hostName}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-2">{comment.date}</p>
                                    <p className="text-sm text-gray-700 leading-relaxed">{comment.text}</p>
                                </div>
                            ))}
                        </div>
                        {guest.hostComments.length > 3 && (
                            <button onClick={() => setShowAll(o => !o)} className="border border-gray-900 rounded-xl px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors mb-4">
                                {showAll ? 'Afficher moins' : `Afficher les ${guest.hostComments.length} commentaires`}
                            </button>
                        )}
                        <p className="text-xs text-gray-400 mb-8">
                            Certaines informations ont été traduites automatiquement.{' '}
                            <span className="underline cursor-pointer">Afficher l'original</span>
                        </p>
                        <div className="border-t border-gray-200 mb-6" />
                    </>
                ) : (
                    <p className="text-sm text-gray-500 mb-8">{guest.firstName} n'a pas encore reçu de commentaires.</p>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-4">
                    <button onClick={() => setShowReportModal(true)} className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                        <Flag className="w-5 h-5" />
                        <span>Signaler {guest.firstName}</span>
                    </button>
                    <button className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                        <Ban className="w-5 h-5" />
                        <span>Bloquer {guest.firstName}</span>
                    </button>
                </div>
            </main>

            <AirbnbFooter />

            {/* Report modal */}
            {showReportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-2xl p-6 mx-4" style={{ width: 480 }}>
                        <div className="flex items-start justify-between mb-4">
                            <Flag className="w-6 h-6 text-gray-700" />
                            <button
                                onClick={() => { setShowReportModal(false); setSelectedReport(null) }}
                                className="text-gray-500 text-xl hover:text-gray-800"
                            >×</button>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">Que se passe-t-il ?</h3>
                        <p className="text-sm text-gray-500 mb-5">Ces informations ne seront partagées qu'avec Airbnb.</p>
                        <div className="flex flex-col divide-y divide-gray-100">
                            {[
                                "J'ai l'impression que cet utilisateur essaie de m'arnaquer ou de me spammer",
                                "Cet utilisateur est offensant",
                                "Autre chose"
                            ].map((option, i) => (
                                <button key={i}
                                    onClick={() => setSelectedReport(i)}
                                    className="flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors">
                                    <span className="text-sm text-gray-900 pr-4">{option}</span>
                                    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors ${selectedReport === i ? 'border-gray-900 bg-gray-900' : 'border-gray-300'}`} />
                                </button>
                            ))}
                        </div>
                        <button
                            className={`w-full py-3 rounded-xl mt-4 text-sm font-semibold transition-colors ${selectedReport !== null ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                            onClick={() => selectedReport !== null && setShowReportModal(false)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}