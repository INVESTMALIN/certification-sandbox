function BookingFooter() {
    return (
        <>
            {/* Footer principal */}
            <footer className="bg-[#003580] text-white mt-auto">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Liens et bouton */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-6">
                            <a
                                href="#"
                                className="text-sm hover:underline"
                            >
                                À propos de nous
                            </a>
                            <a
                                href="#"
                                className="text-sm hover:underline"
                            >
                                Charte de confidentialité et informations sur les cookies
                            </a>
                            <a
                                href="#"
                                className="text-sm hover:underline"
                            >
                                FAQ
                            </a>
                        </div>

                        <button className="px-6 py-2 bg-[#0071c2] hover:bg-[#005999] text-white rounded font-medium text-sm transition-colors">
                            Donner mon avis
                        </button>
                    </div>

                    {/* Copyright */}
                    <div className="text-sm text-white/80">
                        © Copyright <span className="text-[#0071c2]">Invest Malin</span> 2026 - Simulateur pédagogique
                    </div>
                </div>
            </footer>
        </>
    )
}

export default BookingFooter