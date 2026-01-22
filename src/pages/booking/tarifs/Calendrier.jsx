import PropertyHeader from '../../../components/booking/PropertyHeader'
import BookingFooter from '../../../components/booking/BookingFooter'
import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function Calendrier() {
    const [dateFrom, setDateFrom] = useState('2026-01-22')
    const [dateTo, setDateTo] = useState('2026-02-21')
    const [showClientPricing, setShowClientPricing] = useState(false)
    const [showRestrictions, setShowRestrictions] = useState(false)
    const calendarRef = useRef(null)

    // Generate calendar days based on date range
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

    // Group days by month
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

    // Format day name
    const getDayName = (date) => {
        const days = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.']
        return days[date.getDay()]
    }

    // Format month name
    const getMonthName = (monthKey) => {
        const [year, month] = monthKey.split('-')
        const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
            'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
        return `${months[parseInt(month) - 1]} ${year}`
    }

    // Generate mock pricing data
    const getPricing = (date) => {
        const day = date.getDate()
        // Simulate different pricing
        if (day % 7 === 0 || day % 7 === 6) return 95 // Weekend pricing
        return 65 // Weekday pricing
    }

    // Check if date has availability
    const hasAvailability = (date) => {
        // Most days available, some blocked
        return date.getDate() % 11 !== 0
    }

    // Scroll calendar
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
                            <h1 className="text-2xl font-bold text-gray-900">Calendrier</h1>
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
                    {/* Scroll Buttons */}
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

                    {/* Scrollable Calendar Container */}
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
                            <div className="flex bg-gray-50 border-b border-gray-200 sticky top-0 z-5">
                                <div className="w-48 flex-shrink-0"></div>
                                {days.map((day, index) => (
                                    <div
                                        key={index}
                                        className="w-[60px] flex-shrink-0 border-l border-gray-200 text-center py-2"
                                    >
                                        <div className="text-xs text-gray-600">{getDayName(day)}</div>
                                        <div className="text-sm font-medium text-gray-900">{day.getDate()}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Apartment Row */}
                            <div className="bg-white border-b border-gray-200">
                                <div className="flex">
                                    <div className="w-48 flex-shrink-0 border-r border-gray-200 p-3">
                                        <div className="font-semibold text-gray-900 text-sm mb-1">
                                            Appartement 1 Chambre
                                        </div>
                                        <div className="text-xs text-gray-500">(Identifiant: 14280037101)</div>
                                    </div>
                                    {days.map((day, index) => {
                                        const available = hasAvailability(day)
                                        const price = getPricing(day)
                                        return (
                                            <div
                                                key={index}
                                                className={`w-[60px] flex-shrink-0 border-l border-gray-200 p-1 ${available ? 'bg-green-50' : 'bg-gray-100'
                                                    }`}
                                            >
                                                {available && (
                                                    <div className="text-center">
                                                        <div className="text-xs text-green-700 font-medium">
                                                            {price}€
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* Sub-rows */}
                                <div className="flex border-t border-gray-100">
                                    <div className="w-48 flex-shrink-0 border-r border-gray-200 px-3 py-2 bg-gray-50">
                                        <div className="text-xs text-gray-600">Statut de l'hébergement</div>
                                    </div>
                                    {days.map((day, index) => {
                                        const available = hasAvailability(day)
                                        return (
                                            <div
                                                key={index}
                                                className="w-[60px] flex-shrink-0 border-l border-gray-200 p-1 text-center"
                                            >
                                                <div className="text-xs text-gray-600">
                                                    {available ? 'R' : ''}
                                                </div>
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
                </div>
            </main>

            <BookingFooter />
        </div>
    )
}

export default Calendrier