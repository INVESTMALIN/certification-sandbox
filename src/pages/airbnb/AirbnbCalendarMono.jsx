import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Pencil } from 'lucide-react'
import AirbnbHeader from '../../components/airbnb/AirbnbHeader'
import properties from '../../data/airbnb/properties.json'
import reservations from '../../data/airbnb/reservations.json'
import { hydrateReservation } from '../../data/airbnb/dateUtils.js'

const hydratedReservations = reservations.map(hydrateReservation)

const MONTHS_FR = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
const DAYS_FR = ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.']

function isSameDay(a, b) {
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
}

function isToday(date) { return isSameDay(date, new Date()) }

function isPast(date) {
    const t = new Date(); t.setHours(0, 0, 0, 0)
    const d = new Date(date); d.setHours(0, 0, 0, 0)
    return d < t
}

function getResForDay(propertyId, date) {
    return hydratedReservations.find(r => {
        if (r.propertyId !== propertyId) return false
        const ci = new Date(r.checkIn); ci.setHours(0, 0, 0, 0)
        const co = new Date(r.checkOut); co.setHours(0, 0, 0, 0)
        return date >= ci && date < co
    }) || null
}

function getDayPrice(base, date) {
    const dow = date.getDay()
    if (dow === 5 || dow === 6) return Math.ceil(base * 1.2)
    if (dow === 1) return Math.floor(base * 0.9)
    return base
}

function buildMonth(year, month) {
    const firstDow = (new Date(year, month, 1).getDay() + 6) % 7
    const daysCount = new Date(year, month + 1, 0).getDate()
    const cells = [
        ...Array(firstDow).fill(null),
        ...Array.from({ length: daysCount }, (_, i) => new Date(year, month, i + 1))
    ]
    while (cells.length % 7 !== 0) cells.push(null)
    const weeks = []
    for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
    return weeks
}

function buildMonths(count = 12) {
    const now = new Date()
    return Array.from({ length: count }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() + i, 1)
        return { year: d.getFullYear(), month: d.getMonth(), weeks: buildMonth(d.getFullYear(), d.getMonth()) }
    })
}

function ReservationBar({ res, date, weekDays }) {
    const checkIn = new Date(res.checkIn); checkIn.setHours(0, 0, 0, 0)
    const checkOut = new Date(res.checkOut); checkOut.setHours(0, 0, 0, 0)
    const lastCheckoutDay = new Date(checkOut.getTime() - 86400000)
    const lastWeekDay = [...weekDays].reverse().find(d => d !== null)
    const barEnd = lastCheckoutDay <= lastWeekDay ? lastCheckoutDay : lastWeekDay
    const span = Math.round((barEnd - date) / 86400000) + 1
    const isStart = isSameDay(date, checkIn)
    const isEnd = isSameDay(barEnd, lastCheckoutDay)

    return (
        <div
            className="absolute z-10 flex items-center overflow-hidden"
            style={{
                top: '50%',
                transform: 'translateY(-50%)',
                left: 0,
                height: 40,
                width: `calc(${span * 100}% + ${(span - 1) * 6}px)`,
                backgroundColor: '#DDDDDD',
                borderRadius: isStart && isEnd ? 20
                    : isStart ? '20px 0 0 20px'
                        : isEnd ? '0 20px 20px 0'
                            : 0,
                paddingLeft: isStart ? 10 : 4,
                paddingRight: isEnd ? 10 : 0,
            }}
        >
            {isStart && res.guestAvatar && (
                <img src={res.guestAvatar} alt={res.guestName}
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0 border-2 border-white mr-2" />
            )}
            {isStart && (
                <span className="text-sm font-semibold text-gray-800 truncate">
                    {res.guestName.split(' ')[0]}
                </span>
            )}
        </div>
    )
}

export default function AirbnbCalendarMono() {
    const { propertyId } = useParams()
    const navigate = useNavigate()
    const scrollRef = useRef(null)
    const panelRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [currentMonth, setCurrentMonth] = useState({ year: new Date().getFullYear(), month: new Date().getMonth() })
    const [isPickerOpen, setIsPickerOpen] = useState(false)
    const [selectedDay, setSelectedDay] = useState(null)
    const [showNoteForm, setShowNoteForm] = useState(false)
    const [showPriceForm, setShowPriceForm] = useState(false)
    const [showParamsForm, setShowParamsForm] = useState(false)
    const [selectedRes, setSelectedRes] = useState(null)
    const [showReportModal, setShowReportModal] = useState(false)
    const [selectedReport, setSelectedReport] = useState(null)
    const [priceText, setPriceText] = useState('')
    const [noteText, setNoteText] = useState('')
    const monthRefs = useRef({})
    const pickerRef = useRef(null)

    // Close on outside click or scroll
    useEffect(() => {
        const close = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) setIsOpen(false)
        }
        const onScroll = () => setIsOpen(false)
        document.addEventListener('mousedown', close)
        scrollRef.current?.addEventListener('scroll', onScroll)
        return () => {
            document.removeEventListener('mousedown', close)
        }
    }, [isOpen])

    // Track visible month via IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const [year, month] = entry.target.dataset.month.split('-').map(Number)
                        setCurrentMonth({ year, month })
                    }
                })
            },
            { root: scrollRef.current, rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        )
        Object.values(monthRefs.current).forEach(el => { if (el) observer.observe(el) })
        return () => observer.disconnect()
    }, [])

    // Close picker on outside click
    useEffect(() => {
        const handler = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) setIsPickerOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const property = properties.find(p => p.propertyId === propertyId)
    const allMonths = buildMonths(12)

    if (!property) {
        return (
            <div className="font-airbnb h-screen bg-white flex flex-col">
                <AirbnbHeader />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-600 mb-4">Annonce introuvable.</p>
                        <button onClick={() => navigate('/airbnb/calendrier')} className="text-[#FF385C] underline text-sm">
                            Retour au calendrier
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="font-airbnb h-screen bg-white flex flex-col overflow-hidden">
            <AirbnbHeader />

            <div className="flex flex-1 min-h-0 overflow-hidden">

                {/* ── LEFT: expandable panel ── */}
                {/* Always 72px in the layout flow — expanded version overlays the calendar absolutely */}
                <div className="relative flex-shrink-0" style={{ width: 72 }}>

                    {/* The panel itself: always visible, expands right over the calendar */}
                    <div
                        ref={panelRef}
                        className="absolute inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-gray-200 overflow-hidden transition-all duration-300 ease-in-out"
                        style={{ width: isOpen ? 300 : 72 }}
                    >
                        {/* Scrollable list */}
                        <div className="flex-1 overflow-y-auto py-3" style={{ scrollbarWidth: 'none' }}>
                            {properties.map(p => (
                                <button
                                    key={p.propertyId}
                                    onClick={() => { navigate(`/airbnb/calendar/${p.propertyId}`); setIsOpen(false) }}
                                    className={`w-full flex items-center gap-3 px-3 py-2 transition-colors text-left
                                        ${p.propertyId === propertyId ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                                >
                                    {/* Avatar — always visible */}
                                    <img
                                        src={p.image}
                                        alt={p.name}
                                        className={`w-12 h-12 rounded-xl object-cover flex-shrink-0 transition-all
                                            ${p.propertyId === propertyId ? 'ring-2 ring-[#FF385C] ring-offset-1' : 'opacity-70'}`}
                                    />
                                    {/* Title — only visible when open */}
                                    <div className="min-w-0 overflow-hidden" style={{ opacity: isOpen ? 1 : 0, transition: 'opacity 0.2s' }}>
                                        <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 whitespace-normal">{p.name}</p>
                                        <p className="text-xs text-green-600 mt-0.5 font-medium whitespace-nowrap">Publiée</p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Toggle button — always at bottom, never scrolls */}
                        <div className="flex-shrink-0 border-t border-gray-100 py-3 flex justify-start pl-4">
                            <button
                                onClick={() => setIsOpen(o => !o)}
                                className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                {isOpen
                                    ? <ChevronLeft className="w-4 h-4 text-gray-600" />
                                    : <ChevronRight className="w-4 h-4 text-gray-600" />
                                }
                            </button>
                        </div>
                    </div>
                </div>

                {/* ── CENTER: monthly calendar ── */}
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                    {/* Top bar */}
                    <div className="flex-shrink-0 bg-white border-b border-gray-200 px-6 py-5 flex items-center gap-4">
                        <div className="relative flex-1" ref={pickerRef}>
                            <button
                                onClick={() => setIsPickerOpen(o => !o)}
                                className="flex items-center gap-1 text-left"
                            >
                                <h2 className="text-3xl font-bold text-gray-900 capitalize">
                                    {MONTHS_FR[currentMonth.month]} {currentMonth.year}
                                </h2>
                                <ChevronRight className="w-5 h-5 ml-1 rotate-90 text-gray-500" />
                            </button>

                            {/* Month picker dropdown */}
                            {isPickerOpen && (
                                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden" style={{ width: 280 }}>
                                    {/* Mini calendar header */}
                                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                                        <button className="p-1 hover:bg-gray-100 rounded-full">
                                            <ChevronLeft className="w-4 h-4 text-gray-600" />
                                        </button>
                                        <span className="text-sm font-semibold text-gray-900">
                                            {MONTHS_FR[currentMonth.month].charAt(0).toUpperCase() + MONTHS_FR[currentMonth.month].slice(1)} {currentMonth.year}
                                        </span>
                                        <button className="p-1 hover:bg-gray-100 rounded-full">
                                            <ChevronRight className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </div>
                                    {/* Day labels */}
                                    <div className="grid grid-cols-7 px-3 py-2">
                                        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
                                            <div key={i} className="text-center text-xs text-gray-400 font-medium py-1">{d}</div>
                                        ))}
                                    </div>
                                    {/* Days grid for current picker month */}
                                    <div className="px-3 pb-3">
                                        {(() => {
                                            const firstDow = (new Date(currentMonth.year, currentMonth.month, 1).getDay() + 6) % 7
                                            const daysCount = new Date(currentMonth.year, currentMonth.month + 1, 0).getDate()
                                            const cells = [...Array(firstDow).fill(null), ...Array.from({ length: daysCount }, (_, i) => i + 1)]
                                            while (cells.length % 7 !== 0) cells.push(null)
                                            const weeks = []
                                            for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7))
                                            return weeks.map((week, wi) => (
                                                <div key={wi} className="grid grid-cols-7">
                                                    {week.map((d, di) => (
                                                        <div key={di} className="flex items-center justify-center">
                                                            {d ? (
                                                                <button
                                                                    onClick={() => {
                                                                        const el = monthRefs.current[`${currentMonth.year}-${currentMonth.month}`]
                                                                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                                                                        setIsPickerOpen(false)
                                                                    }}
                                                                    className="w-8 h-8 text-sm text-gray-800 hover:bg-gray-100 rounded-full flex items-center justify-center"
                                                                >
                                                                    {d}
                                                                </button>
                                                            ) : <div className="w-8 h-8" />}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))
                                        })()}
                                    </div>
                                </div>
                            )}
                        </div>
                        <button className="flex items-center gap-1.5 border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-700 hover:border-gray-400 transition-colors flex-shrink-0">
                            <Pencil className="w-3.5 h-3.5" />
                            Prix conseillés
                        </button>
                        <button className="flex items-center gap-1 border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-700 hover:border-gray-400 transition-colors flex-shrink-0">
                            Mois
                            <ChevronRight className="w-3.5 h-3.5 rotate-90 text-gray-500" />
                        </button>
                        <button className="border border-gray-300 rounded-lg p-2 hover:border-gray-400 transition-colors flex-shrink-0">
                            <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <path d="M16 2v4M8 2v4M3 10h18" />
                            </svg>
                        </button>
                    </div>

                    {/* Scrollable calendar */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                        <div className="max-w-5xl mx-auto px-6 pb-12">
                            {allMonths.map(({ year, month, weeks }) => (
                                <div key={`${year}-${month}`} className="mt-8" data-month={`${year}-${month}`} ref={el => monthRefs.current[`${year}-${month}`] = el}>
                                    <div className="grid grid-cols-7 mb-1">
                                        {DAYS_FR.map((d, i) => (
                                            <div key={i} className={`text-center text-sm font-medium py-2 ${i >= 5 ? 'text-[#FF385C]' : 'text-gray-500'}`}>
                                                {d}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        {weeks.map((week, wi) => (
                                            <div key={wi} className="grid grid-cols-7 gap-1.5">
                                                {week.map((day, di) => {
                                                    if (!day) return <div key={di} />
                                                    const res = getResForDay(propertyId, day)
                                                    const todayCell = isToday(day)
                                                    const past = isPast(day)
                                                    const price = getDayPrice(property.pricePerNight, day)
                                                    const isSun = day.getDay() === 0
                                                    const isSat = day.getDay() === 6
                                                    const isResBarStart = res && (() => {
                                                        const ci = new Date(res.checkIn); ci.setHours(0, 0, 0, 0)
                                                        if (isSameDay(day, ci)) return true
                                                        const firstDayOfRow = week.find(d => d !== null)
                                                        return isSameDay(day, firstDayOfRow)
                                                    })()
                                                    return (
                                                        <div
                                                            key={di}
                                                            onClick={() => {
                                                                if (res) { setSelectedRes(res); setSelectedDay(null) }
                                                                else if (!past) setSelectedDay({ date: day, price: getDayPrice(property.pricePerNight, day) })
                                                            }}
                                                            className={`relative rounded-2xl border flex flex-col p-2.5 cursor-pointer transition-colors
                                                                ${todayCell ? 'border-2 border-gray-900' : 'border-gray-200'}
                                                                ${past && !res ? 'bg-gray-50' : 'bg-white'}
                                                                ${!past && !res ? 'hover:border-gray-400' : ''}
                                                            `}
                                                            style={{ height: 96 }}
                                                        >
                                                            {todayCell ? (
                                                                <span className="w-8 h-8 bg-[#FF385C] text-white text-sm font-bold rounded-full flex items-center justify-center">
                                                                    {day.getDate()}
                                                                </span>
                                                            ) : (
                                                                <span className={`text-sm font-semibold leading-none
                                                                    ${past ? 'line-through text-gray-400'
                                                                        : isSun || isSat ? 'text-[#FF385C]'
                                                                            : 'text-gray-800'}`}>
                                                                    {day.getDate()}
                                                                </span>
                                                            )}
                                                            {!res && (
                                                                <span className={`text-sm mt-auto ${past ? 'text-gray-400' : 'text-gray-700'}`}>
                                                                    {price} €
                                                                </span>
                                                            )}
                                                            {isResBarStart && (
                                                                <ReservationBar res={res} date={day} weekDays={week} />
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: settings panel or day detail ── */}
                <div className="flex-shrink-0 border-l border-gray-200 overflow-hidden relative" style={{ width: 280 }}>

                    {/* Settings panel (default) */}
                    <div className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: selectedDay || selectedRes ? 0 : 1, pointerEvents: selectedDay || selectedRes ? 'none' : 'auto', scrollbarWidth: 'none' }}>
                        <div className="px-5">
                            <button className="w-full flex items-center justify-between py-8 text-left group">
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Paramètres de prix</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{property.pricePerNight} € par nuit</p>
                                </div>
                                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gray-100 transition-colors">
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </div>
                            </button>
                            <div className="border-t border-gray-200 mx-2" />
                            <button className="w-full flex items-center justify-between py-8 text-left group">
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Paramètres de disponibilité</p>
                                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                                        Séjours de 1 à 365 nuits<br />
                                        Délai de réservation avant l'arrivée : le jour même
                                    </p>
                                </div>
                                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-2 group-hover:bg-gray-100 transition-colors">
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Day detail panel (dark) */}
                    <div className="absolute inset-0 bg-white p-4 flex flex-col gap-3 transition-opacity duration-300"
                        style={{ opacity: selectedDay && !selectedRes ? 1 : 0, pointerEvents: selectedDay && !selectedRes ? 'auto' : 'none' }}>
                        {selectedDay && (() => {
                            const d = selectedDay.date
                            const dayNum = d.getDate()
                            const monthShort = MONTHS_FR[d.getMonth()].slice(0, 4) + '.'
                            return (
                                <>
                                    {/* Header: date + close */}
                                    <div className="flex items-center justify-end gap-2 mb-1">
                                        <div className="bg-gray-900 rounded-full px-4 py-2 text-white text-sm font-semibold">
                                            {dayNum} {monthShort}
                                        </div>
                                        <button
                                            onClick={() => { setSelectedDay(null); setShowNoteForm(false); setNoteText(''); setShowPriceForm(false); setShowParamsForm(false) }} className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                        >
                                            <span className="text-white text-lg leading-none">×</span>
                                        </button>
                                    </div>

                                    {/* Bloqué par vous */}
                                    {!showPriceForm && !showParamsForm && (
                                        <div className="bg-black rounded-2xl p-4">
                                            {showNoteForm ? (
                                                <>
                                                    <div className="flex items-center gap-2 mb-3">
                                                        <span className="text-gray-300 text-sm font-medium">Disponible</span>
                                                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                                                    </div>
                                                    <textarea
                                                        value={noteText}
                                                        onChange={e => setNoteText(e.target.value.slice(0, 100))}
                                                        className="w-full bg-transparent border border-gray-600 rounded-xl p-3 text-white text-sm resize-none outline-none focus:border-gray-400"
                                                        rows={3}
                                                        autoFocus
                                                    />
                                                    <p className="text-gray-400 text-xs mt-1 mb-3">
                                                        <span className="font-semibold text-white">{100 - noteText.length}</span> caractères restants
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <button onClick={() => setShowNoteForm(false)} className="text-white text-sm font-semibold">Annuler</button>
                                                        <button onClick={() => setShowNoteForm(false)} className="bg-white text-gray-900 text-sm font-semibold px-5 py-2 rounded-xl">Enregistrer</button>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-gray-300 text-sm font-medium">Disponible</span>
                                                            <span className="w-2 h-2 bg-green-500 rounded-full" />
                                                        </div>
                                                        <div className="flex items-center bg-gray-700 rounded-full p-1 gap-1">
                                                            <button className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                                                                <span className="text-gray-800 text-xs font-bold">×</span>
                                                            </button>
                                                            <button className="w-7 h-7 rounded-full flex items-center justify-center">
                                                                <span className="text-gray-500 text-xs">✓</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <button onClick={() => setShowNoteForm(true)} className="text-white text-sm underline">Ajouter une note</button>
                                                </>
                                            )}
                                        </div>
                                    )}

                                    {!showNoteForm && (
                                        <>
                                            {/* Prix par nuit */}
                                            {!showParamsForm && (
                                                <div onClick={() => !showPriceForm && setShowPriceForm(true)} className="bg-black rounded-2xl p-4 cursor-pointer">
                                                    {showPriceForm ? (
                                                        <>
                                                            <div className="flex items-center justify-between mb-2">
                                                                <div>
                                                                    <p className="text-white text-sm font-semibold">{dayNum} {monthShort}</p>
                                                                    <p className="text-gray-400 text-xs underline">Total voyageur : {selectedDay.price + 78} €</p>
                                                                </div>
                                                                <div className="w-10 h-10 rounded-full border-2 border-gray-500 flex items-center justify-center">
                                                                    <span className="text-gray-400 text-lg">?</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-center gap-3 my-6">
                                                                <span className="text-white text-5xl font-bold">{selectedDay.price} €</span>
                                                                <button className="text-gray-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                                                            </div>
                                                            <div className="flex items-center justify-between mb-6">
                                                                <span className="text-gray-300 text-sm">Tarification intelligente désactivée</span>
                                                                <div className="w-12 h-6 bg-gray-600 rounded-full" />
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <button onClick={(e) => { e.stopPropagation(); setShowPriceForm(false) }} className="text-white text-sm font-semibold">Annuler</button>
                                                                <button className="bg-gray-700 text-gray-400 text-sm font-semibold px-5 py-2 rounded-xl cursor-not-allowed">Enregistrer</button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className="text-gray-300 text-xs mb-2">Prix par nuit</p>
                                                            <p className="text-white text-4xl font-bold">{selectedDay.price} €</p>
                                                        </>
                                                    )}
                                                </div>
                                            )}

                                            {/* Paramètres personnalisés */}
                                            {!showPriceForm && (
                                                <div onClick={() => !showParamsForm && setShowParamsForm(true)} className="bg-black rounded-2xl p-4 cursor-pointer">
                                                    {showParamsForm ? (
                                                        <>
                                                            <p className="text-gray-400 text-xs mb-3">Paramètres personnalisés</p>
                                                            <div className="border border-gray-600 rounded-xl p-4 flex items-center justify-between mb-4">
                                                                <span className="text-white text-sm font-semibold">Nombre minimum de nuits</span>
                                                                <span className="text-white text-sm underline">2 nuits</span>
                                                            </div>
                                                            <button
                                                                onClick={(e) => { e.stopPropagation(); setShowParamsForm(false) }}
                                                                className="w-full bg-white text-gray-900 text-sm font-semibold py-3 rounded-xl"
                                                            >
                                                                Terminé
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className="text-gray-300 text-xs mb-1">Paramètres personnalisés</p>
                                                            <p className="text-[#FF385C] text-sm font-medium">2 nuits minimum</p>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}

                                </>
                            )
                        })()}
                    </div>
                    {/* Reservation detail panel */}
                    <div className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300 p-5"
                        style={{ opacity: selectedRes ? 1 : 0, pointerEvents: selectedRes ? 'auto' : 'none', scrollbarWidth: 'none' }}>
                        {selectedRes && (() => {
                            const ci = new Date(selectedRes.checkIn)
                            const co = new Date(selectedRes.checkOut)
                            const nights = Math.round((co - ci) / 86400000)
                            const fmt = (d) => `${d.getDate()} ${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`
                            return (
                                <>
                                    <div className="flex items-start justify-between mb-4">
                                        <button onClick={() => setSelectedRes(null)}
                                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                                            <span className="text-gray-700 text-lg leading-none">×</span>
                                        </button>
                                    </div>

                                    <p className="text-xs text-gray-500 mb-0.5">Ancien voyageur</p>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-gray-900">{selectedRes.guestName}</h3>
                                        <img
                                            src={selectedRes.guestAvatar}
                                            alt={selectedRes.guestName}
                                            onClick={() => navigate(`/airbnb/voyageur/${selectedRes.id}`)}
                                            className="w-12 h-12 rounded-full object-cover border border-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                                        />
                                    </div>

                                    <p className="text-sm text-gray-600 mb-1">{property.name}</p>
                                    <p className="text-sm text-gray-600 mb-1">
                                        {fmt(ci)}–{fmt(co)} ({nights} nuit{nights > 1 ? 's' : ''})
                                    </p>
                                    <p className="text-sm text-gray-600 mb-6">
                                        {selectedRes.guests || 2} voyageur{(selectedRes.guests || 2) > 1 ? 's' : ''}
                                    </p>

                                    <div className="border-t border-gray-200 my-4" />

                                    <h4 className="text-base font-bold text-gray-900 mb-4">Tout sur {selectedRes.guestName.split(' ')[0]}</h4>

                                    <div className="flex flex-col gap-3 mb-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-400">☆</span>
                                            <span className="text-sm text-gray-800 underline font-medium">Évaluation de 5,0 basée sur 5 commentaires</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-400">🛡</span>
                                            <span className="text-sm text-gray-800 underline font-medium">Identité vérifiée</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-400">🍴</span>
                                            <span className="text-sm text-gray-800">Également hôte</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-400">◇</span>
                                            <span className="text-sm text-gray-800">Membre d'Airbnb depuis 2017</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-gray-400">⌂</span>
                                            <span className="text-sm text-gray-800">Habite à Lyon, France</span>
                                        </div>
                                    </div>

                                    <button className="text-sm text-gray-900 underline font-medium mb-6">Afficher le profil</button>

                                    <div className="border-t border-gray-200 my-4" />

                                    <button className="w-full border border-gray-300 rounded-xl py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                                        Envoyer un message
                                    </button>
                                    <button disabled className="w-full border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-400 cursor-not-allowed mt-2">
                                        Appeler
                                    </button>
                                    <p className="text-xs text-gray-400 text-center mt-2">Numéro de téléphone indisponible</p>

                                    <div className="border-t border-gray-200 my-4" />

                                    <h4 className="text-base font-bold text-gray-900 mb-4">Détails de la réservation</h4>

                                    <div className="flex flex-col divide-y divide-gray-100">
                                        <div className="flex items-start justify-between py-3">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">Voyageurs</p>
                                                <p className="text-sm text-gray-500 mt-0.5">2 adultes, 1 enfant</p>
                                            </div>
                                            <button className="text-sm font-semibold text-gray-900 underline">Voir</button>
                                        </div>
                                        <div className="flex items-start justify-between py-3">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">Code d'accès suggéré</p>
                                                <p className="text-sm text-gray-500 mt-0.5">4485</p>
                                            </div>
                                            <button className="text-sm font-semibold text-gray-900 underline">View</button>
                                        </div>
                                        <div className="py-3">
                                            <p className="text-sm font-semibold text-gray-900">Arrivée</p>
                                            <p className="text-sm text-gray-500 mt-0.5">sam. {ci.getDate()} {MONTHS_FR[ci.getMonth()].slice(0, 4)}. {ci.getFullYear()}</p>
                                        </div>
                                        <div className="py-3">
                                            <p className="text-sm font-semibold text-gray-900">Départ</p>
                                            <p className="text-sm text-gray-500 mt-0.5">sam. {co.getDate()} {MONTHS_FR[co.getMonth()].slice(0, 4)}. {co.getFullYear()}</p>
                                        </div>
                                        <div className="py-3">
                                            <p className="text-sm font-semibold text-gray-900">Date de réservation</p>
                                            <p className="text-sm text-gray-500 mt-0.5">lun. 14 avr. 2025</p>
                                        </div>
                                        <div className="py-3">
                                            <p className="text-sm font-semibold text-gray-900">Code de confirmation</p>
                                            <p className="text-sm text-gray-500 mt-0.5">{selectedRes.confirmationCode || 'HMDAHF9TS8'}</p>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 my-4" />

                                    <h4 className="text-base font-bold text-gray-900 mb-2">Assistance</h4>

                                    <div className="flex flex-col divide-y divide-gray-100">
                                        <button onClick={() => setShowReportModal(true)} className="flex items-center gap-3 py-4 hover:bg-gray-50 transition-colors text-left w-full">
                                            <span className="text-gray-500">🚩</span>
                                            <span className="text-sm text-gray-900 flex-1">Signaler ce voyageur</span>
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </button>
                                        <button
                                            onClick={() => navigate('/airbnb/centre-aide')}
                                            className="flex items-center gap-3 py-4 hover:bg-gray-50 transition-colors text-left w-full"
                                        >
                                            <span className="text-gray-500">❓</span>
                                            <span className="text-sm text-gray-900 flex-1">Consulter le Centre d'aide</span>
                                            <ChevronRight className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                    <div className="border-t border-gray-200 my-4" />

                                    <h4 className="text-base font-bold text-gray-900 mb-4">Questions fréquentes</h4>

                                    <div className="flex flex-col divide-y divide-gray-100">
                                        {[
                                            {
                                                title: "Imprimez les reçus et le détail des versements pour des réservations passées",
                                                desc: "Rendez-vous dans vos réservations pour consulter vos reçus individuels."
                                            },
                                            {
                                                title: "Rembourser un voyageur",
                                                desc: "La procédure par laquelle les hôtes remboursent les voyageurs est différente selon qu'elle intervient..."
                                            },
                                            {
                                                title: "Délai pour laisser un commentaire",
                                                desc: "Vous avez un temps limité après la fin de votre séjour, service ou expérience pour laisser un commentaire...."
                                            }
                                        ].map((faq, i) => (
                                            <div key={i} className="py-4">
                                                <p className="text-sm font-semibold text-gray-900 mb-1">{faq.title}</p>
                                                <p className="text-sm text-gray-500 mb-2">{faq.desc}</p>
                                                <button className="text-sm font-semibold text-gray-900 underline">Lire la suite</button>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )
                        })()}
                    </div>
                </div>
                {showReportModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
                        <div className="bg-white rounded-2xl p-6 mx-4" style={{ width: 480 }}>
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-2xl">🚩</span>
                                <button onClick={() => { setShowReportModal(false); setSelectedReport(null) }}
                                    className="text-gray-500 text-xl hover:text-gray-800">×</button>
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
        </div>
    )
}