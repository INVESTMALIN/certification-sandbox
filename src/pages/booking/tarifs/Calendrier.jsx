import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { useState, useRef } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

function Calendrier() {
    // States existants
    const [dateFrom, setDateFrom] = useState('2026-01-22')
    const [dateTo, setDateTo] = useState('2026-02-21')
    const [showClientPricing, setShowClientPricing] = useState(false)
    const [showRestrictions, setShowRestrictions] = useState(false)
    const calendarRef = useRef(null)

    // Nouveaux states pour les vues
    const [viewMode, setViewMode] = useState('month') // 'month', 'list', 'year'
    const [selectedMonth, setSelectedMonth] = useState('2026-02') // Format YYYY-MM
    const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false)
    const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false)
    const [isCalendarParamsOpen, setIsCalendarParamsOpen] = useState(false)
    const [isAvailabilityParamsOpen, setIsAvailabilityParamsOpen] = useState(false)

    // Générer la liste des mois pour le dropdown
    const generateMonthOptions = () => {
        const months = []
        const startDate = new Date('2025-02-01')
        const endDate = new Date('2026-09-01')

        let current = new Date(startDate)
        while (current <= endDate) {
            const year = current.getFullYear()
            const month = String(current.getMonth() + 1).padStart(2, '0')
            const monthKey = `${year}-${month}`
            const monthName = current.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
            const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1)

            months.push({ value: monthKey, label: capitalizedMonth })

            current.setMonth(current.getMonth() + 1)
        }

        return months
    }

    const monthOptions = generateMonthOptions()

    const getViewModeLabel = () => {
        const labels = {
            'month': 'Vue par mois',
            'list': 'Vue par liste',
            'year': 'Vue par année'
        }
        return labels[viewMode]
    }

    // Fonctions pour la vue liste (existantes)
    const generateCalendarDays = () => {
        const start = new Date(dateFrom)
        const end = new Date(dateTo)
        const days = []

        let current = new Date(start)
        while (current <= end) {
            days.push(new Date(current))
            current.setDate(current.getDate() + 1)
        }

        return days
    }

    const days = generateCalendarDays()

    const groupByMonth = (days) => {
        const months = {}
        days.forEach(day => {
            const monthKey = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}`
            if (!months[monthKey]) {
                months[monthKey] = []
            }
            months[monthKey].push(day)
        })
        return months
    }

    const monthGroups = groupByMonth(days)

    const getDayName = (date) => {
        const days = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.']
        return days[date.getDay()]
    }

    const getMonthName = (monthKey) => {
        const [year, month] = monthKey.split('-')
        const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
            'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
        return `${months[parseInt(month) - 1]} ${year}`
    }

    const getPricing = (date) => {
        const day = date.getDate()
        if (day % 7 === 0 || day % 7 === 6) return 95
        return 65
    }

    const hasAvailability = (date) => {
        return date.getDate() % 11 !== 0
    }

    const hasBlockingCriteria = (date) => {
        const day = date.getDate()
        const month = date.getMonth() + 1
        return month === 2 && (day === 7 || day === 8)
    }

    const scrollCalendar = (direction) => {
        if (calendarRef.current) {
            const scrollAmount = 400
            calendarRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PropertyHeader />

            <main className="w-full py-6">
                {/* Header avec titre et filtres */}
                <div className="px-6 mb-6">
                    <div className="flex items-start justify-between mb-6">
                        {/* Titre + Dropdown mois */}
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold text-gray-900">Calendrier</h1>

                            {/* Dropdown sélection mois */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
                                    className="min-w-[180px] px-4 py-2 border border-gray-300 rounded bg-white text-sm text-left flex items-center justify-between hover:border-gray-400"
                                >
                                    <span>{monthOptions.find(m => m.value === selectedMonth)?.label || 'Février 2026'}</span>
                                    <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isMonthDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isMonthDropdownOpen && (
                                    <div className="absolute z-50 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                                        <div className="py-1">
                                            {monthOptions.map(option => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => {
                                                        setSelectedMonth(option.value)
                                                        setIsMonthDropdownOpen(false)
                                                    }}
                                                    className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${selectedMonth === option.value ? 'bg-blue-50 text-[#0071c2]' : 'text-gray-700'
                                                        }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Filtres droite - 2 lignes */}
                        <div className="flex flex-col gap-3">
                            {/* Ligne 1 */}
                            <div className="flex items-center gap-3">
                                {/* Vue par mois */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsViewDropdownOpen(!isViewDropdownOpen)}
                                        className="min-w-[160px] px-4 py-2 border border-gray-300 rounded bg-white text-sm text-left flex items-center justify-between hover:border-gray-400"
                                    >
                                        <span>{getViewModeLabel()}</span>
                                        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isViewDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isViewDropdownOpen && (
                                        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                                            <div className="py-1">
                                                <button
                                                    onClick={() => { setViewMode('month'); setIsViewDropdownOpen(false); }}
                                                    className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${viewMode === 'month' ? 'bg-blue-50 text-[#0071c2]' : 'text-gray-700'}`}
                                                >
                                                    Vue par mois
                                                </button>
                                                <button
                                                    onClick={() => { setViewMode('list'); setIsViewDropdownOpen(false); }}
                                                    className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${viewMode === 'list' ? 'bg-blue-50 text-[#0071c2]' : 'text-gray-700'}`}
                                                >
                                                    Vue par liste
                                                </button>
                                                <button
                                                    onClick={() => { setViewMode('year'); setIsViewDropdownOpen(false); }}
                                                    className={`w-full px-4 py-2 text-sm text-left hover:bg-gray-50 ${viewMode === 'year' ? 'bg-blue-50 text-[#0071c2]' : 'text-gray-700'}`}
                                                >
                                                    Vue par année
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Recommandations (grisé) */}
                                <button
                                    disabled
                                    className="px-4 py-2 border border-gray-300 rounded bg-gray-50 text-sm text-gray-400 cursor-not-allowed flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Recommandations
                                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
                                </button>
                            </div>

                            {/* Ligne 2 */}
                            <div className="flex items-center gap-3">
                                {/* Gérer les paramètres du calendrier */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsCalendarParamsOpen(!isCalendarParamsOpen)}
                                        className="min-w-[240px] px-4 py-2 border border-gray-300 rounded bg-white text-sm text-left flex items-center justify-between hover:border-gray-400"
                                    >
                                        <span>Gérer les paramètres du calendrier</span>
                                        <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isCalendarParamsOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isCalendarParamsOpen && (
                                        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                                            <div className="py-1">
                                                <button
                                                    onClick={() => setIsCalendarParamsOpen(false)}
                                                    className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 text-gray-700"
                                                >
                                                    Connexion du calendrier
                                                </button>
                                                <button
                                                    onClick={() => setIsCalendarParamsOpen(false)}
                                                    className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 text-gray-700"
                                                >
                                                    Donner mon avis
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Paramètres des disponibilités */}
                                <div className="relative">
                                    <button
                                        onClick={() => setIsAvailabilityParamsOpen(!isAvailabilityParamsOpen)}
                                        className="min-w-[240px] px-4 py-2 border border-[#0071c2] text-[#0071c2] rounded bg-white text-sm text-left flex items-center justify-between hover:bg-blue-50"
                                    >
                                        <span>Paramètres des disponibilités</span>
                                        <ChevronDown className={`w-4 h-4 transition-transform ${isAvailabilityParamsOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {isAvailabilityParamsOpen && (
                                        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                                            <div className="py-1">
                                                <button
                                                    onClick={() => setIsAvailabilityParamsOpen(false)}
                                                    className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 text-gray-700"
                                                >
                                                    Mettre ma page en pause
                                                </button>
                                                <button
                                                    onClick={() => setIsAvailabilityParamsOpen(false)}
                                                    className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50 text-gray-700"
                                                >
                                                    Planificateur de disponibilités
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vue par mois */}
                {viewMode === 'month' && (
                    <div className="px-6">
                        {/* Générer le calendrier du mois sélectionné */}
                        {(() => {
                            const [year, month] = selectedMonth.split('-')
                            const firstDay = new Date(parseInt(year), parseInt(month) - 1, 1)
                            const lastDay = new Date(parseInt(year), parseInt(month), 0)
                            const startingDayOfWeek = firstDay.getDay() // 0 = dimanche
                            const daysInMonth = lastDay.getDate()

                            // Générer les jours du calendrier (avec padding pour les jours vides)
                            const calendarDays = []

                            // Jours vides avant le 1er du mois
                            for (let i = 0; i < startingDayOfWeek; i++) {
                                calendarDays.push(null)
                            }

                            // Jours du mois
                            for (let day = 1; day <= daysInMonth; day++) {
                                calendarDays.push(day)
                            }

                            // Check si un jour est réservé (hardcodé)
                            const isReserved = (day) => {
                                return [5, 6, 12, 13, 19, 20].includes(day)
                            }

                            // Check si un jour a des critères bloquants (hardcodé)
                            const hasBlockingCriteria = (day) => {
                                return [7, 8].includes(day)
                            }

                            // Prix du jour (hardcodé)
                            const getPrice = (day) => {
                                if (isReserved(day) || hasBlockingCriteria(day)) return null
                                // Weekend plus cher
                                const date = new Date(parseInt(year), parseInt(month) - 1, day)
                                const dayOfWeek = date.getDay()
                                return dayOfWeek === 0 || dayOfWeek === 6 ? 1200 : 1080
                            }

                            const monthName = firstDay.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
                            const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1)

                            return (
                                <div>
                                    {/* Titre du mois */}
                                    <h2 className="text-xl font-bold text-[#0071c2] mb-4">{capitalizedMonthName}</h2>

                                    {/* En-têtes des jours de la semaine */}
                                    <div className="grid grid-cols-7 gap-0 border-t border-l border-gray-200">
                                        {['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.'].map((day, idx) => (
                                            <div key={idx} className="border-r border-b border-gray-200 bg-gray-50 p-2 text-center">
                                                <span className="text-xs font-medium text-gray-700">{day}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Grille des jours */}
                                    <div className="grid grid-cols-7 gap-0 border-l border-gray-200">
                                        {calendarDays.map((day, index) => {
                                            if (day === null) {
                                                // Cellule vide
                                                return (
                                                    <div
                                                        key={index}
                                                        className="border-r border-b border-gray-200 h-24 bg-gray-50"
                                                    ></div>
                                                )
                                            }

                                            const reserved = isReserved(day)
                                            const blocked = hasBlockingCriteria(day)
                                            const price = getPrice(day)

                                            return (
                                                <div
                                                    key={index}
                                                    className={`border-r border-b border-gray-200 h-24 p-2 ${reserved ? 'bg-gray-100' : blocked ? 'bg-red-50' : 'bg-white hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {/* Numéro du jour */}
                                                    <div className="text-sm font-medium text-gray-900 mb-2">{day}</div>

                                                    {/* Contenu du jour */}
                                                    {blocked ? (
                                                        <div className="bg-red-500 text-white text-xs py-1 px-2 rounded font-medium text-center">
                                                            Critères bloqua...
                                                        </div>
                                                    ) : reserved ? (
                                                        <div className="text-xs text-gray-600 text-center mt-4">
                                                            Réservé
                                                        </div>
                                                    ) : price ? (
                                                        <div className="text-sm font-medium text-gray-900 text-center mt-2">
                                                            € {price.toLocaleString('fr-FR')}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })()}
                    </div>
                )}

                {/* Vue par liste (code existant) */}
                {viewMode === 'list' && (
                    <>
                        {/* Warning Banner */}
                        <div className="px-6 mb-4">
                            <div className="bg-yellow-50 border border-yellow-200 rounded p-3 flex items-start gap-2">
                                <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm text-gray-700">
                                    Votre établissement n'est plus réservable au-delà du 31 déc. 2026. Ajoutez des disponibilités jusqu'à juin 2027 pour continuer à recevoir des réservations.
                                </p>
                                <button className="text-gray-400 hover:text-gray-600 ml-auto">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Calendar Header */}
                        <div className="px-6 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                        XML (non modifiable)
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        Dernière synchronisation : le 22 janv. 2026, 2h42
                                    </span>
                                    <a href="#" className="text-sm text-[#0071c2] hover:underline">
                                        En savoir plus
                                    </a>
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Date Range and Filters */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded bg-white">
                                    <input
                                        type="date"
                                        value={dateFrom}
                                        onChange={(e) => setDateFrom(e.target.value)}
                                        className="border-none outline-none text-sm"
                                    />
                                    <span className="text-gray-400">—</span>
                                    <input
                                        type="date"
                                        value={dateTo}
                                        onChange={(e) => setDateTo(e.target.value)}
                                        className="border-none outline-none text-sm"
                                    />
                                </div>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={showClientPricing}
                                        onChange={() => setShowClientPricing(!showClientPricing)}
                                        className="w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">Tarification par client</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={showRestrictions}
                                        onChange={() => setShowRestrictions(!showRestrictions)}
                                        className="w-4 h-4 text-[#0071c2] border-gray-300 rounded focus:ring-[#0071c2]"
                                    />
                                    <span className="text-sm text-gray-700">Restrictions</span>
                                </label>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="relative">
                            <button
                                onClick={() => scrollCalendar('left')}
                                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-600" />
                            </button>
                            <button
                                onClick={() => scrollCalendar('right')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-600" />
                            </button>

                            <div
                                ref={calendarRef}
                                className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
                                style={{ scrollbarWidth: 'thin' }}
                            >
                                <div className="inline-block min-w-full">
                                    {/* Month Headers */}
                                    <div className="flex bg-white border-b border-gray-200">
                                        <div className="w-48 flex-shrink-0"></div>
                                        {Object.entries(monthGroups).map(([monthKey, monthDays]) => (
                                            <div
                                                key={monthKey}
                                                className="border-l border-gray-200"
                                                style={{ width: `${monthDays.length * 60}px` }}
                                            >
                                                <div className="text-center py-2 font-semibold text-gray-900 text-sm">
                                                    {getMonthName(monthKey)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Day Headers */}
                                    <div className="flex bg-gray-50 border-b border-gray-200 sticky top-0 z-20">
                                        <div className="w-48 flex-shrink-0 border-r border-gray-200"></div>
                                        {days.map((day, index) => (
                                            <div
                                                key={index}
                                                className="w-[60px] flex-shrink-0 border-l border-gray-200 p-1"
                                            >
                                                <div className="text-center">
                                                    <div className="text-xs text-gray-600">{getDayName(day)}</div>
                                                    <div className="text-xs font-medium text-gray-900">{day.getDate()}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Statut de l'hébergement */}
                                    <div className="flex border-t border-gray-100">
                                        <div className="w-48 flex-shrink-0 border-r border-gray-200 px-3 py-2 bg-gray-50">
                                            <div className="text-xs text-gray-600">Statut de l'hébergement</div>
                                        </div>
                                        {days.map((day, index) => {
                                            const available = hasAvailability(day)
                                            const blocked = hasBlockingCriteria(day)
                                            return (
                                                <div
                                                    key={index}
                                                    className="w-[60px] flex-shrink-0 border-l border-gray-200 p-1 text-center relative"
                                                >
                                                    {blocked ? (
                                                        <div className="bg-red-500 text-white text-xs py-1 px-1 rounded font-medium">
                                                            Critères bloqua...
                                                        </div>
                                                    ) : available ? (
                                                        <div className="text-xs text-green-600 font-medium">Réservable</div>
                                                    ) : (
                                                        <div className="text-xs text-gray-400">Réservé</div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div className="flex border-t border-gray-100">
                                        <div className="w-48 flex-shrink-0 border-r border-gray-200 px-3 py-2 bg-gray-50">
                                            <div className="text-xs text-gray-600">Hébergements à vendre</div>
                                        </div>
                                        {days.map((day, index) => {
                                            const available = hasAvailability(day)
                                            return (
                                                <div
                                                    key={index}
                                                    className="w-[60px] flex-shrink-0 border-l border-gray-200 p-1 text-center"
                                                >
                                                    <div className="text-xs text-gray-600">
                                                        {available ? '1' : ''}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>

                                    <div className="flex border-t border-gray-100">
                                        <div className="w-48 flex-shrink-0 border-r border-gray-200 px-3 py-2 bg-gray-50">
                                            <div className="text-xs text-gray-600">Réservations nettes</div>
                                        </div>
                                        {days.map((day, index) => (
                                            <div
                                                key={index}
                                                className="w-[60px] flex-shrink-0 border-l border-gray-200 p-1 text-center"
                                            >
                                                <div className="text-xs text-gray-600"></div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Standard Rate Row */}
                                    <div className="flex border-t border-gray-200">
                                        <div className="w-48 flex-shrink-0 border-r border-gray-200 px-3 py-2 bg-blue-50">
                                            <div className="text-xs font-medium text-gray-900">Standard Rate</div>
                                        </div>
                                        {days.map((day, index) => {
                                            const available = hasAvailability(day)
                                            const price = getPricing(day)
                                            return (
                                                <div
                                                    key={index}
                                                    className="w-[60px] flex-shrink-0 border-l border-gray-200 p-1 bg-blue-50 text-center"
                                                >
                                                    {available && (
                                                        <div className="text-xs text-gray-900 font-medium">
                                                            {price}€
                                                        </div>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Vue par année */}
                {/* Vue par année */}
                {viewMode === 'year' && (
                    <div className="px-6">
                        {/* Filtres année */}
                        <div className="mb-6 flex items-center gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Année</label>
                                <select className="px-4 py-2 border border-gray-300 rounded bg-white text-sm">
                                    <option>Les 12 prochains mois</option>
                                </select>
                            </div>
                            <button className="self-end px-4 py-2 border border-gray-300 rounded bg-white text-sm hover:bg-gray-50">
                                Toutes les dates
                            </button>
                            <button className="self-end px-4 py-2 border border-gray-300 rounded bg-white text-sm hover:bg-gray-50">
                                Dates réservables
                            </button>
                            <button className="self-end px-4 py-2 border border-gray-300 rounded bg-white text-sm hover:bg-gray-50">
                                Dates épuisées
                            </button>
                        </div>

                        {/* Grille 4x3 de mini-calendriers */}
                        <div className="grid grid-cols-4 gap-6">
                            {Array.from({ length: 12 }, (_, monthIndex) => {
                                const currentDate = new Date()
                                const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthIndex, 1)
                                const year = targetDate.getFullYear()
                                const month = targetDate.getMonth()
                                const firstDay = new Date(year, month, 1)
                                const lastDay = new Date(year, month + 1, 0)
                                const startingDayOfWeek = (firstDay.getDay() + 6) % 7 // Ajuster pour lun-dim
                                const daysInMonth = lastDay.getDate()

                                const monthName = targetDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
                                const capitalizedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1)

                                // Générer les jours
                                const calendarDays = []
                                for (let i = 0; i < startingDayOfWeek; i++) {
                                    calendarDays.push(null)
                                }
                                for (let day = 1; day <= daysInMonth; day++) {
                                    calendarDays.push(day)
                                }

                                // Check disponibilité (hardcodé pour demo)
                                const isAvailable = (day) => {
                                    // Jours verts : la plupart des jours
                                    // Jours blancs : quelques jours sans prix
                                    return day % 5 !== 0
                                }

                                return (
                                    <div key={monthIndex} className="border border-gray-200 rounded-lg p-3 bg-white">
                                        {/* Titre du mois */}
                                        <h3 className="text-sm font-bold text-[#0071c2] mb-3">{capitalizedMonthName}</h3>

                                        {/* En-têtes des jours */}
                                        <div className="grid grid-cols-7 gap-1 mb-1">
                                            {['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.'].map((day, idx) => (
                                                <div key={idx} className="text-center text-xs text-gray-600">
                                                    {day}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Grille des jours */}
                                        <div className="grid grid-cols-7 gap-1">
                                            {calendarDays.map((day, index) => {
                                                if (day === null) {
                                                    return <div key={index} className="h-6"></div>
                                                }

                                                const available = isAvailable(day)

                                                return (
                                                    <div
                                                        key={index}
                                                        className={`h-6 flex items-center justify-center text-xs rounded ${available
                                                                ? 'bg-green-100 text-gray-900 hover:bg-green-200'
                                                                : 'bg-white text-gray-400'
                                                            }`}
                                                    >
                                                        {day}
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}
            </main>

            <BookingFooter />
        </div>
    )
}

export default Calendrier