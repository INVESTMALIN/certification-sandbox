import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import AirbnbHeader from '../../components/airbnb/AirbnbHeader'
import AirbnbFooter from '../../components/airbnb/AirbnbFooter'
import properties from '../../data/airbnb/properties.json'
import reservations from '../../data/airbnb/reservations.json'
import { hydrateReservation } from '../../data/airbnb/dateUtils.js'

const hydratedReservations = reservations.map(hydrateReservation)

// ── helpers ──────────────────────────────────────────────────────────────────

function addDays(date, n) {
    const d = new Date(date)
    d.setDate(d.getDate() + n)
    return d
}

function isSameDay(a, b) {
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    )
}

function isToday(date) {
    return isSameDay(date, new Date())
}

// Returns the reservation that overlaps this (propertyId, date), or null
function getReservationForDay(propertyId, date) {
    return hydratedReservations.find((res) => {
        if (res.propertyId !== propertyId) return false
        const checkIn = new Date(res.checkIn)
        const checkOut = new Date(res.checkOut)
        checkIn.setHours(0, 0, 0, 0)
        checkOut.setHours(0, 0, 0, 0)
        return date >= checkIn && date < checkOut
    }) || null
}

// Is this date the first *visible* day of a reservation for this property?
// (either the actual checkIn day, or the first day of the visible window if started earlier)
function isFirstVisibleDay(propertyId, date, visibleDays) {
    const firstDay = visibleDays[0]
    return hydratedReservations.some((res) => {
        if (res.propertyId !== propertyId) return false
        const checkIn = new Date(res.checkIn)
        checkIn.setHours(0, 0, 0, 0)
        // It's the first visible day if checkIn == date, OR if checkIn < firstDay and date == firstDay
        return isSameDay(checkIn, date) || (checkIn < firstDay && isSameDay(date, firstDay))
    })
}

// ── Calendar grid ─────────────────────────────────────────────────────────────

const DAY_LABELS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const MONTHS_FR = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']

// Returns array of Date objects for the 14 days starting at `startDate`
function getDays(startDate) {
    return Array.from({ length: 14 }, (_, i) => addDays(startDate, i))
}

// Group days by month for the header
function groupByMonth(days) {
    const groups = []
    days.forEach((d) => {
        const label = `${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`
        if (groups.length === 0 || groups[groups.length - 1].label !== label) {
            groups.push({ label, days: [d] })
        } else {
            groups[groups.length - 1].days.push(d)
        }
    })
    return groups
}

// ── Main component ────────────────────────────────────────────────────────────

function AirbnbCalendar() {
    const navigate = useNavigate()

    // Start the calendar at the Monday of the current week
    const getMonday = () => {
        const d = new Date()
        d.setHours(0, 0, 0, 0)
        const day = d.getDay() // 0=Sun, 1=Mon…
        const diff = day === 0 ? -6 : 1 - day
        d.setDate(d.getDate() + diff)
        return d
    }

    const [startDate, setStartDate] = useState(getMonday())
    const [selectedProperty, setSelectedProperty] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [isDrawerOpen, setIsDrawerOpen] = useState(true)
    const [selectedReservation, setSelectedReservation] = useState(null)
    const [isRuleModalOpen, setIsRuleModalOpen] = useState(false)
    const [ruleName, setRuleName] = useState('')
    const [ruleColor, setRuleColor] = useState(0)
    const [openSection, setOpenSection] = useState(null)
    const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false)
    const [slideDir, setSlideDir] = useState(null) // 'left' | 'right' | null
    const monthPickerRef = useRef(null)
    const calendarRef = useRef(null)

    // Close month picker on outside click
    useEffect(() => {
        const handler = (e) => {
            if (monthPickerRef.current && !monthPickerRef.current.contains(e.target)) {
                setIsMonthPickerOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    // Animated navigation: slide calendar out, update date, slide back in
    const animateToDate = useCallback((newDate, direction) => {
        setSlideDir(direction)
        setTimeout(() => {
            setStartDate(newDate)
            setSlideDir(null)
        }, 220)
    }, [])

    const days = getDays(startDate)
    const monthGroups = groupByMonth(days)

    const filteredProperties = properties.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const goBack = () => animateToDate(addDays(startDate, -7), 'right')
    const goForward = () => animateToDate(addDays(startDate, 7), 'left')
    const goToday = () => {
        const monday = getMonday()
        const dir = monday < startDate ? 'right' : 'left'
        animateToDate(monday, dir)
    }

    // Jump to a specific month (1st Monday of that month)
    const goToMonth = (year, month) => {
        const target = new Date(year, month, 1)
        target.setHours(0, 0, 0, 0)
        // Find first Monday of that month
        const dow = target.getDay()
        const diff = dow === 0 ? 1 : dow === 1 ? 0 : 8 - dow
        target.setDate(target.getDate() + diff)
        const dir = target > startDate ? 'left' : 'right'
        animateToDate(target, dir)
        setIsMonthPickerOpen(false)
    }

    // Build list of next 12 months from today
    const monthOptions = Array.from({ length: 12 }, (_, i) => {
        const d = new Date()
        d.setDate(1)
        d.setMonth(d.getMonth() + i)
        return { year: d.getFullYear(), month: d.getMonth(), label: `${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}` }
    })

    const formatMonthYear = (date) =>
        `${MONTHS_FR[date.getMonth()]} ${date.getFullYear()}`

    return (
        <div className="font-airbnb min-h-screen bg-white flex flex-col">
            <AirbnbHeader />

            <main className="flex-1 flex flex-col overflow-hidden">

                {/* ── Top bar ── */}
                <div className="border-b border-gray-200 px-4 py-3 flex items-center gap-3 bg-white sticky top-0 z-30">
                    {/* Month selector */}
                    <div className="relative" ref={monthPickerRef}>
                        <button
                            onClick={() => setIsMonthPickerOpen(o => !o)}
                            className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-800 cursor-pointer hover:border-gray-400 select-none"
                        >
                            <span>{formatMonthYear(startDate)}</span>
                            <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isMonthPickerOpen ? '-rotate-90' : 'rotate-90'}`} />
                        </button>

                        {/* Dropdown */}
                        {isMonthPickerOpen && (
                            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 py-1 min-w-[180px]">
                                {monthOptions.map((opt) => {
                                    const isCurrent = opt.year === startDate.getFullYear() && opt.month === startDate.getMonth()
                                    return (
                                        <button
                                            key={`${opt.year}-${opt.month}`}
                                            onClick={() => goToMonth(opt.year, opt.month)}
                                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${isCurrent
                                                ? 'bg-gray-900 text-white font-semibold'
                                                : 'text-gray-800 hover:bg-gray-50'
                                                }`}
                                        >
                                            {opt.label}
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>

                    {/* Aujourd'hui */}
                    <button
                        onClick={goToday}
                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-800 hover:border-gray-400"
                    >
                        Aujourd'hui
                    </button>

                    <div className="flex-1" />

                    {/* Opportunités */}
                    <div className="flex items-center gap-2 text-sm text-gray-700 border border-gray-300 rounded-lg px-3 py-1.5">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full inline-block" />
                        <span>21 opportunités disponibles</span>
                    </div>

                    {/* Calques */}
                    <button className="flex items-center gap-1 border border-gray-300 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-800 hover:border-gray-400">
                        Calques
                        <ChevronRight className="w-4 h-4 text-gray-500 rotate-90" />
                    </button>
                </div>

                {/* ── Three-panel layout ── */}
                <div className="flex flex-1 overflow-hidden relative">

                    {/* ── LEFT: property list ── */}
                    <div className="w-64 flex-shrink-0 border-r border-gray-200 flex flex-col overflow-hidden bg-white">
                        {/* Count */}
                        <div className="px-4 pt-4 pb-2">
                            <h2 className="text-2xl font-bold text-gray-900">{properties.length} annonces</h2>
                        </div>

                        {/* Search */}
                        <div className="px-4 pb-3 flex items-center gap-2">
                            <div className="flex-1 flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1.5 text-sm text-gray-500">
                                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Rechercher des logement"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-400"
                                />
                            </div>
                            {/* Filter icon */}
                            <button className="p-1.5 hover:bg-gray-100 rounded-full">
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                </svg>
                            </button>
                        </div>

                        {/* Property rows */}
                        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                            {filteredProperties.map((property) => (
                                <div
                                    key={property.propertyId}
                                    onClick={() => navigate('/airbnb/calendar/' + property.propertyId)}
                                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-gray-100 hover:bg-gray-50 transition-colors ${selectedProperty === property.propertyId ? 'bg-gray-100' : ''}`}
                                >
                                    <div className="relative flex-shrink-0">
                                        <img
                                            src={property.image}
                                            alt={property.name}
                                            className="w-10 h-10 rounded-lg object-cover"
                                        />
                                        {/* Green dot */}
                                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate">{property.name}</p>
                                        <p className="text-xs text-[#FF385C] truncate">+ Ajoutez un nom interne</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Scroll arrows */}
                        <div className="flex justify-center gap-2 py-2 border-t border-gray-100">
                            <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400">▲</button>
                            <button className="p-1 hover:bg-gray-100 rounded-full text-gray-400">▼</button>
                        </div>
                    </div>

                    {/* ── CENTER: calendar ── */}
                    <div className="flex-1 overflow-x-auto overflow-y-auto bg-white">
                        <div
                            ref={calendarRef}
                            className="min-w-[700px] transition-all duration-200 ease-in-out"
                            style={{
                                opacity: slideDir ? 0 : 1,
                                transform: slideDir === 'left'
                                    ? 'translateX(-40px)'
                                    : slideDir === 'right'
                                        ? 'translateX(40px)'
                                        : 'translateX(0)'
                            }}
                        >

                            {/* Calendar header: nav + month groups + day numbers */}
                            <div className="sticky top-0 bg-white z-20 border-b border-gray-200">
                                {/* Month labels row */}
                                <div className="flex items-center">
                                    {/* Left nav arrow */}
                                    <button
                                        onClick={goBack}
                                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full flex-shrink-0 ml-2"
                                    >
                                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                                    </button>

                                    {/* Month groups */}
                                    <div className="flex flex-1">
                                        {monthGroups.map((group) => (
                                            <div
                                                key={group.label}
                                                className="text-center text-sm font-semibold text-gray-700 py-2"
                                                style={{ flex: group.days.length }}
                                            >
                                                {group.label}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Right nav arrow */}
                                    <button
                                        onClick={goForward}
                                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full flex-shrink-0 mr-2"
                                    >
                                        <ChevronRight className="w-4 h-4 text-gray-600" />
                                    </button>
                                </div>

                                {/* Day-of-week + day number row */}
                                <div className="flex items-center">
                                    <div className="w-8 flex-shrink-0 ml-2" />
                                    <div className="flex flex-1">
                                        {days.map((day, i) => {
                                            const dow = DAY_LABELS[(day.getDay() + 6) % 7] // Mon=0
                                            const today = isToday(day)
                                            return (
                                                <div
                                                    key={i}
                                                    className="flex-1 flex flex-col items-center py-1"
                                                >
                                                    <span className="text-xs text-gray-500">{dow}</span>
                                                    <span className={`text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full ${today ? 'bg-[#222222] text-white' : 'text-gray-800'}`}>
                                                        {day.getDate()}
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="w-8 flex-shrink-0 mr-2" />
                                </div>
                            </div>

                            {/* Property rows */}
                            {filteredProperties.map((property) => (
                                <div key={property.propertyId} className="flex border-b border-gray-100 h-16 relative">
                                    {/* Left spacer */}
                                    <div className="w-8 flex-shrink-0 ml-2" />

                                    {/* Day cells */}
                                    <div className="flex flex-1 relative">
                                        {days.map((day, i) => {
                                            const res = getReservationForDay(property.propertyId, day)
                                            const firstVisible = isFirstVisibleDay(property.propertyId, day, days)
                                            const today = isToday(day)

                                            return (
                                                <div
                                                    key={i}
                                                    className={`flex-1 border-r border-gray-100 relative flex items-center justify-center
                                                        ${today ? 'border-l-2 border-l-[#222222]' : ''}
                                                    `}
                                                    style={{
                                                        background: res
                                                            ? 'transparent'
                                                            : `repeating-linear-gradient(
                                                                135deg,
                                                                transparent,
                                                                transparent 6px,
                                                                #e5e7eb 6px,
                                                                #e5e7eb 7px
                                                              )`
                                                    }}
                                                >
                                                    {/* Reservation bar: render only on checkIn day to avoid duplicates */}
                                                    {res && firstVisible && (() => {
                                                        // How many days does this reservation span within our visible window?
                                                        const checkOut = new Date(res.checkOut)
                                                        checkOut.setHours(0, 0, 0, 0)
                                                        const lastVisibleDay = days[days.length - 1]
                                                        const endDay = checkOut <= lastVisibleDay ? checkOut : addDays(lastVisibleDay, 1)
                                                        const spanDays = Math.round((endDay - day) / (1000 * 60 * 60 * 24))
                                                        const widthPct = spanDays * 100

                                                        return (
                                                            <div
                                                                onClick={(e) => { e.stopPropagation(); setSelectedReservation(res); setIsDrawerOpen(true) }}
                                                                className="absolute top-1/2 -translate-y-1/2 left-0 h-9 rounded-lg flex items-center px-3 z-10 overflow-hidden cursor-pointer hover:brightness-110 transition-all"
                                                                style={{
                                                                    width: `${widthPct}%`,
                                                                    backgroundColor: '#1a8a7a',
                                                                    minWidth: '60px'
                                                                }}
                                                            >
                                                                <span className="text-white text-xs font-semibold truncate">
                                                                    {res.statusDetail === 'Séjour en cours' || (res.checkInOffset < 0 && res.checkOutOffset > 0)
                                                                        ? 'Séjour en cours'
                                                                        : res.guestName.split(' ')[0]}
                                                                </span>
                                                            </div>
                                                        )
                                                    })()}
                                                </div>
                                            )
                                        })}
                                    </div>

                                    {/* Right spacer */}
                                    <div className="w-8 flex-shrink-0 mr-2" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── RIGHT: pricing drawer (overlay) ── */}
                    <div
                        className="absolute right-0 bottom-0 z-20 bg-white flex flex-col overflow-y-auto"
                        style={{
                            transition: 'width 500ms cubic-bezier(0.4,0,0.2,1), opacity 500ms cubic-bezier(0.4,0,0.2,1), box-shadow 500ms cubic-bezier(0.4,0,0.2,1)',
                            top: '88px',
                            width: isDrawerOpen ? '18rem' : '0',
                            opacity: isDrawerOpen ? 1 : 0,
                            boxShadow: isDrawerOpen ? '-6px 0 8px -4px rgba(0,0,0,0.18)' : 'none',
                            scrollbarWidth: 'none',
                            pointerEvents: isDrawerOpen ? 'auto' : 'none',
                        }}
                    >
                        {/* Collapse arrow */}
                        <div className="px-4 pt-4 pb-2 flex-shrink-0">
                            <button
                                onClick={() => setIsDrawerOpen(false)}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                title="Fermer le panneau"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>

                        {/* Title */}
                        <div className="px-6 pb-6 flex-shrink-0">
                            <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                                Définissez vos prix et disponibilités pour la saison
                            </h2>
                        </div>

                        {/* Rule card */}
                        <div className="mx-4 mb-4 border border-gray-200 rounded-xl p-4 flex-shrink-0">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 rounded-lg bg-amber-100 flex-shrink-0" />
                                <span className="text-sm font-semibold text-gray-900">Toute saison</span>
                            </div>
                            <p className="text-xs text-gray-600 mb-3">Nuits minimum : 2</p>
                            <div className="flex gap-4">
                                <button className="text-sm font-medium text-gray-900 underline hover:text-gray-700">
                                    Appliquer
                                </button>
                                <button className="text-sm font-medium text-gray-900 underline hover:text-gray-700">
                                    Modifier
                                </button>
                            </div>
                        </div>

                        <div className="flex-1" />

                        {/* CTA button */}
                        <div className="p-4 border-t border-gray-100 flex-shrink-0">
                            <button
                                onClick={() => setIsRuleModalOpen(true)}
                                className="w-full bg-gray-900 text-white font-semibold py-4 rounded-xl hover:bg-gray-800 transition-colors text-sm whitespace-nowrap"
                            >
                                Créer un nouvel ensemble de règles
                            </button>
                        </div>
                    </div>

                    {/* ── Reopen button (visible when drawer is closed) ── */}
                    {!isDrawerOpen && (
                        <button
                            onClick={() => setIsDrawerOpen(true)}
                            className="absolute z-20 p-1.5 hover:bg-gray-100 rounded-full border border-gray-200 bg-white transition-colors shadow-md"
                            style={{ top: '80px', right: '8px' }}
                            title="Ouvrir le panneau"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>
                    )}

                    {/* ── RESERVATION SUMMARY overlay (instant show/hide) ── */}
                    {selectedReservation && (
                        <div
                            className="absolute right-0 bottom-0 z-30 bg-white flex flex-col"
                            style={{
                                top: '88px',
                                width: '18rem',
                                boxShadow: '-6px 0 8px -4px rgba(0,0,0,0.18)',
                                overflow: 'hidden',
                            }}
                        >
                            {selectedReservation && (() => {
                                const res = selectedReservation
                                const checkInDate = new Date(res.checkIn)
                                const checkOutDate = new Date(res.checkOut)
                                const fmtDate = (d) => d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })
                                const initials = res.guestName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
                                const isStayInProgress = res.checkInOffset < 0 && res.checkOutOffset > 0

                                return (
                                    <div className="flex flex-col h-full" style={{ minWidth: '18rem' }}>
                                        {/* Header */}
                                        <div className="px-5 pt-5 pb-4 border-b border-gray-100">
                                            <button
                                                onClick={() => setSelectedReservation(null)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors mb-4"
                                            >
                                                <span className="text-gray-700 text-lg leading-none">&times;</span>
                                            </button>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Réservation</h2>
                                            <p className="text-sm text-gray-600">
                                                {isStayInProgress ? 'Séjour en cours' : 'Confirmée'}
                                                {res.guestCount ? ` · ${res.guestCount}` : ''}
                                                {res.nights ? ` · ${res.nights} nuit${res.nights > 1 ? 's' : ''}` : ''}
                                            </p>
                                        </div>

                                        {/* Guest */}
                                        <div className="px-5 py-4 border-b border-gray-100">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm mb-1">{res.guestName}</p>
                                                    <div className="flex gap-3 text-sm text-gray-700">
                                                        <button onClick={() => navigate('/airbnb/voyageur/' + res.id)} className="underline hover:text-gray-900">Afficher le profil</button>
                                                        <span className="text-gray-300">·</span>
                                                        <button className="underline hover:text-gray-900">Envoyer un message</button>
                                                    </div>
                                                </div>
                                                {res.guestAvatar ? (
                                                    <img src={res.guestAvatar} alt={res.guestName} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                                                        <span className="text-white text-sm font-semibold">{initials}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Dates */}
                                        <div className="px-5 py-4 flex flex-col gap-4 border-b border-gray-100">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Arrivée</span>
                                                <span className="text-sm text-gray-900">{fmtDate(checkInDate)}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Départ</span>
                                                <span className="text-sm text-gray-900">{fmtDate(checkOutDate)}</span>
                                            </div>
                                        </div>

                                        <div className="flex-1" />

                                        {/* CTA */}
                                        <div className="p-4">
                                            <button
                                                onClick={() => navigate('/airbnb/recap/' + res.id)}
                                                className="w-full bg-[#1a8a7a] text-white font-semibold py-4 rounded-xl hover:bg-[#157a6a] transition-colors text-sm"
                                            >
                                                Voir le récapitulatif complet
                                            </button>
                                        </div>
                                    </div>
                                )
                            })()}
                        </div>
                    )}

                </div>
            </main>

            <AirbnbFooter />

            {/* ── RULE SET MODAL ── */}
            {isRuleModalOpen && (() => {
                const COLORS = [
                    { bg: '#f87171', border: '#ef4444' }, // red
                    { bg: '#fca5a5', border: '#fca5a5' }, // light red
                    { bg: '#fdba74', border: '#f97316' }, // orange
                    { bg: '#fcd34d', border: '#f59e0b' }, // yellow
                    { bg: '#86efac', border: '#22c55e' }, // green
                    { bg: '#7dd3fc', border: '#38bdf8' }, // sky
                    { bg: '#c4b5fd', border: '#a78bfa' }, // violet
                    { bg: '#f9a8d4', border: '#ec4899' }, // pink
                ]
                const TARIF_SECTIONS = [
                    'Prix par nuit',
                    'Réductions en fonction de la durée du séjour',
                    'Réductions pour réservation de dernière minute',
                    'Réductions pour réservation anticipée',
                ]
                const DISPO_SECTIONS = [
                    'Durée du séjour',
                    "Jours d'arrivée et de départ",
                ]
                return (
                    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}>
                        <div className="bg-white rounded-2xl shadow-2xl flex flex-col relative overflow-y-auto" style={{ width: 900, maxWidth: '96vw', maxHeight: '92vh' }}>

                            {/* Close button */}
                            <button
                                onClick={() => { setIsRuleModalOpen(false); setRuleName(''); setRuleColor(0); setOpenSection(null) }}
                                className="absolute top-4 left-4 text-gray-500 hover:text-gray-900 text-xl leading-none"
                            >
                                ✕
                            </button>

                            <div className="flex gap-8 p-8 pt-12">

                                {/* ── LEFT: Form ── */}
                                <div className="flex-1 min-w-0">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Créer un nouvel ensemble de règles</h2>
                                    <p className="text-sm text-gray-500 mb-6">Définissez des règles de tarification et de disponibilité à appliquer aux différentes dates et annonces.</p>

                                    {/* Name + Color row */}
                                    <div className="flex gap-8 items-start mb-8">
                                        {/* Name */}
                                        <div className="flex-1">
                                            <label className="text-sm font-medium text-gray-900 block mb-1">
                                                Nom de l'ensemble de règles – <span className="font-normal text-gray-500">champ obligatoire</span>
                                            </label>
                                            <input
                                                type="text"
                                                value={ruleName}
                                                onChange={e => setRuleName(e.target.value)}
                                                placeholder="Exemple : haute saison"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
                                            />
                                        </div>
                                        {/* Color picker */}
                                        <div>
                                            <label className="text-sm font-medium text-gray-900 block mb-1">Couleur (à utiliser sur le calendrier)</label>
                                            <div className="flex gap-2">
                                                {COLORS.map((c, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => setRuleColor(i)}
                                                        className="w-7 h-7 rounded-full border-2 transition-all"
                                                        style={{
                                                            backgroundColor: c.bg,
                                                            borderColor: ruleColor === i ? c.border : 'transparent',
                                                            boxShadow: ruleColor === i ? `0 0 0 2px ${c.border}` : 'none',
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tarif section */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Tarif</h3>
                                    <div className="border-t border-gray-200">
                                        {TARIF_SECTIONS.map((label, i) => (
                                            <div key={i} className="border-b border-gray-200">
                                                <button
                                                    onClick={() => setOpenSection(openSection === `t${i}` ? null : `t${i}`)}
                                                    className="w-full flex items-center justify-between py-4 text-sm text-gray-800 text-left hover:bg-gray-50 transition-colors"
                                                >
                                                    <span>{label}</span>
                                                    <svg className={`w-5 h-5 text-gray-500 transition-transform ${openSection === `t${i}` ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 9l-7 7-7-7" /></svg>
                                                </button>
                                                {openSection === `t${i}` && (
                                                    <div className="pb-4 px-1 text-sm text-gray-500">Configurez les paramètres pour "{label}".</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-3 mb-8">
                                        Les règles de prix n'affectent pas les prix des annonces lorsque la tarification intelligente est activée.{' '}
                                        <span className="underline cursor-pointer">En savoir plus</span>
                                    </p>

                                    {/* Disponibilité section */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Disponibilité</h3>
                                    <div className="border-t border-gray-200">
                                        {DISPO_SECTIONS.map((label, i) => (
                                            <div key={i} className="border-b border-gray-200">
                                                <button
                                                    onClick={() => setOpenSection(openSection === `d${i}` ? null : `d${i}`)}
                                                    className="w-full flex items-center justify-between py-4 text-sm text-gray-800 text-left hover:bg-gray-50 transition-colors"
                                                >
                                                    <span>{label}</span>
                                                    <svg className={`w-5 h-5 text-gray-500 transition-transform ${openSection === `d${i}` ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 9l-7 7-7-7" /></svg>
                                                </button>
                                                {openSection === `d${i}` && (
                                                    <div className="pb-4 px-1 text-sm text-gray-500">Configurez les paramètres pour "{label}".</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* ── RIGHT: Guide card ── */}
                                <div className="w-64 flex-shrink-0">
                                    <div className="border border-gray-200 rounded-xl p-5">
                                        <h4 className="text-base font-bold text-gray-900 mb-4">Voici comment créer des règles</h4>
                                        <div className="flex flex-col gap-5">
                                            {[
                                                "Donnez un nom à votre ensemble de règles et choisissez une couleur pour le symboliser dans votre calendrier.",
                                                "Définissez des réductions de prix, des conditions de disponibilité et des promotions.",
                                                "Choisissez les dates et les annonces auxquelles vous souhaitez appliquer l'ensemble de règles dans votre calendrier.",
                                            ].map((text, i) => (
                                                <div key={i} className="flex gap-3">
                                                    <div className="w-7 h-7 rounded-full bg-[#1a8a7a] flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">{i + 1}</div>
                                                    <p className="text-xs text-gray-700 leading-relaxed">{text}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <button className="text-sm text-[#1a8a7a] underline mt-4 block">En savoir plus sur le règlement</button>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between border-t border-gray-200 px-8 py-4">
                                <button
                                    onClick={() => { setIsRuleModalOpen(false); setRuleName(''); setRuleColor(0); setOpenSection(null) }}
                                    className="text-sm underline text-gray-700 hover:text-gray-900"
                                >
                                    Annuler
                                </button>
                                <button
                                    disabled={!ruleName.trim()}
                                    className={`px-8 py-3 rounded-xl text-sm font-semibold transition-colors ${ruleName.trim() ? 'bg-gray-900 text-white hover:bg-gray-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })()}
        </div>
    )
}

export default AirbnbCalendar