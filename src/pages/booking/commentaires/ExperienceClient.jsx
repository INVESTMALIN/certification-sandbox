import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'

function ExperienceClient() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-[#1a1a1a]">
            <PropertyHeader />

            <main className="max-w-6xl mx-auto px-6 py-8">
                <h1 className="text-2xl font-bold mb-2">Expérience client</h1>
                <p className="text-[14px] text-gray-600 mb-8">
                    Votre note de commentaires est de 9.5. Pour vous aider à mieux comprendre l'expérience vécue par vos clients, nous avons analysé les commentaires qu'ils vous ont laissés. Nous avons mis en avant les sujets qui reviennent le plus souvent :
                </p>

                <div className="grid grid-cols-3 gap-8 items-start">

                    {/* Colonne de Gauche : Statistiques (2/3) */}
                    <div className="col-span-2 space-y-6">

                        {/* Section Négative */}
                        <div className="bg-white rounded border border-gray-200 p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-2xl opacity-60">☹️</span>
                                <h2 className="text-[18px] font-bold">33.3 % des commentaires ont fait baisser votre note</h2>
                            </div>
                            <p className="text-[14px] mb-4">Voici les catégories les moins performantes selon ces commentaires :</p>
                            <div className="flex gap-2 mb-6">
                                <span className="border border-[#006ce4] text-[#006ce4] px-3 py-1 rounded-full text-sm">Toutes (1)</span>
                                <span className="border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm">Équipements (1)</span>
                            </div>
                            <p className="text-[14px] text-gray-500 italic px-4">Geen airco</p>
                        </div>

                        {/* Section Positive */}
                        <div className="bg-white rounded border border-gray-200 p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-2xl opacity-60">😊</span>
                                <h2 className="text-[18px] font-bold">66.7 % des commentaires ont fait augmenter votre note</h2>
                            </div>
                            <p className="text-[14px] mb-4">Voici les catégories les plus performantes selon ces commentaires :</p>
                            <div className="flex gap-2 mb-6">
                                <span className="bg-[#f0f4fa] border border-[#006ce4] text-[#006ce4] px-3 py-1 rounded-full text-sm font-medium">Toutes (1)</span>
                                <span className="border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm">Personnel (1)</span>
                            </div>
                            <p className="text-[14px] font-bold px-4 uppercase tracking-tight">UN ACCUEIL ADORABLE</p>
                        </div>
                    </div>

                    {/* Colonne de Droite : Sidebar (1/3) */}
                    <div className="space-y-6">

                        {/* Bloc Note */}
                        <div className="bg-white rounded border border-gray-200 p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-[#003580] text-white p-2 rounded font-bold text-lg">9,5</div>
                                <div className="text-[14px]">
                                    <div className="font-bold tracking-tight leading-tight">Votre note de commentaires</div>
                                    <div className="text-gray-500 text-xs">d'après 6 commentaires</div>
                                </div>
                            </div>

                            <div className="bg-[#f2f6fa] p-4 rounded-sm border-l-4 border-[#008009]">
                                <h3 className="font-bold text-[14px] mb-2">La pondération des notes des commentaires a été mise en place sur Booking.com <span className="bg-[#008009] text-white text-[10px] px-1 rounded uppercase">Nouveau</span></h3>
                                <p className="text-[12px] leading-relaxed text-gray-700">
                                    Depuis le 23 janv. 2025, une pondération est appliquée lors du calcul de votre note des commentaires, afin de mieux refléter les expériences récentes au sein de votre établissement. Ainsi, plus un commentaire client est récent, plus il pèse dans le calcul de la note finale de votre établissement.
                                </p>
                                <a href="#" className="text-[#006ce4] text-[12px] block mt-2 hover:underline">En savoir plus</a>
                            </div>
                        </div>

                        {/* Bloc Evolution */}
                        <div className="bg-white rounded border border-gray-200 p-6 space-y-6">
                            <h3 className="font-bold text-[14px]">Comment votre note de commentaires actuelle évolue-t-elle ?</h3>

                            <div className="flex items-start gap-4">
                                <span className="opacity-60">☹️</span>
                                <p className="text-[12px]">33.3 % des clients ont donné à votre établissement une note inférieure à sa note actuelle (2 commentaires)</p>
                            </div>

                            <div className="flex items-start gap-4">
                                <span className="opacity-60">😊</span>
                                <p className="text-[12px]">66.7 % des clients ont donné à votre établissement une note supérieure à sa note actuelle (4 commentaires)</p>
                            </div>

                            <div className="flex items-start gap-4 pt-4 border-t border-gray-100">
                                <span className="opacity-60">💡</span>
                                <p className="text-[12px]">Se pencher sur les catégories de commentaires qui performent le moins peut vous permettre d'améliorer l'expérience de vos clients et d'augmenter votre note de commentaires.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default ExperienceClient