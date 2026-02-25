import { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Pencil, Link } from 'lucide-react'
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
    const [showPriceSettings, setShowPriceSettings] = useState(false)
    const [showDispoSettings, setShowDispoSettings] = useState(false)
    const [showParNuit, setShowParNuit] = useState(false)
    const [showWeekend, setShowWeekend] = useState(false)
    const [tarifIntelligente, setTarifIntelligente] = useState(false)
    const [showSemaine, setShowSemaine] = useState(false)
    const [reductionSemaine, setReductionSemaine] = useState(31)
    const [showMois, setShowMois] = useState(false)
    const [reductionMois, setReductionMois] = useState(67)
    const [showPlusReductions, setShowPlusReductions] = useState(false)
    const [showAnticipee, setShowAnticipee] = useState(false)
    const [showDerniereMinute, setShowDerniereMinute] = useState(false)
    const [showDureeSejour, setShowDureeSejour] = useState(false)
    const [dureeSejour, setDureeSejour] = useState('')
    const [showPromoVoyageurs, setShowPromoVoyageurs] = useState(false)
    const [showPromoPassees, setShowPromoPassees] = useState(false)
    const [showFrais, setShowFrais] = useState(false)
    const [showFraisMenage, setShowFraisMenage] = useState(false)
    const [showFraisMenageCourt, setShowFraisMenageCourt] = useState(false)
    const [showFraisAnimaux, setShowFraisAnimaux] = useState(false)
    const [showFraisVoyageurs, setShowFraisVoyageurs] = useState(false)
    const [showFraisGestion, setShowFraisGestion] = useState(false)
    const [showFraisDivers, setShowFraisDivers] = useState(false)
    const [showFraisLinge, setShowFraisLinge] = useState(false)
    const [showFraisService, setShowFraisService] = useState(false)
    const [showDispoMin, setShowDispoMin] = useState(false)
    const [showDispoMax, setShowDispoMax] = useState(false)
    const [showPlusParamsDispo, setShowPlusParamsDispo] = useState(false)
    const [arriveeJours, setArriveeJours] = useState(['Dimanche'])
    const [departJours, setDepartJours] = useState([])
    const [sejoursLongs, setSejoursLongs] = useState(true)
    const [openDispoDropdown, setOpenDispoDropdown] = useState(null)
    const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0, width: 280 })
    const [dispoDelai, setDispoDelai] = useState('Le jour même')
    const [dispoHeure, setDispoHeure] = useState('00:00')
    const [dispoPrep, setDispoPrep] = useState('Aucun')
    const [dispoPlage, setDispoPlage] = useState('12 mois en avance')
    const [autoriserJourMeme, setAutoriserJourMeme] = useState(true)
    const monthRefs = useRef({})
    const pickerRef = useRef(null)
    const dispoDropdownRefs = useRef([null, null, null, null])

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

    const handleDispoDropdown = (index) => {
        const newIndex = openDispoDropdown === index ? null : index
        if (newIndex !== null && dispoDropdownRefs.current[newIndex]) {
            const rect = dispoDropdownRefs.current[newIndex].getBoundingClientRect()
            setDropdownStyle({ top: rect.bottom + 4, left: rect.left, width: rect.width })
        }
        setOpenDispoDropdown(newIndex)
    }

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
                <div className="flex-shrink-0 border-l border-gray-200 overflow-hidden relative" style={{ width: 360 }}>

                    {/* Settings panel (default) */}
                    <div className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: selectedDay || selectedRes ? 0 : 1, pointerEvents: selectedDay || selectedRes ? 'none' : 'auto', scrollbarWidth: 'none' }}>
                        <div className="px-5">
                            <button onClick={() => setShowPriceSettings(true)} className="w-full flex items-center justify-between py-8 text-left group">
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">Paramètres de prix</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{property.pricePerNight} € par nuit</p>
                                </div>
                                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gray-100 transition-colors">
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </div>
                            </button>
                            <div className="border-t border-gray-200 mx-2" />
                            <button onClick={() => setShowDispoSettings(true)} className="w-full flex items-center justify-between py-8 text-left group">
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

                    {/* ── Prix settings panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showPriceSettings ? 1 : 0, pointerEvents: showPriceSettings ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        {/* Back button */}
                        <div className="px-4 pt-5 pb-2">
                            <button
                                onClick={() => setShowPriceSettings(false)}
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-700" />
                            </button>
                        </div>

                        <div className="px-5 pb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Paramètres de prix</h2>
                            <p className="text-xs text-gray-500 mb-6 leading-relaxed">Ces paramètres s'appliquent à toutes les nuits, à moins que vous ne personnalisiez certaines dates.</p>

                            {/* Prix de base */}
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-base font-bold text-gray-900">Prix de base</h3>
                                <button className="text-sm text-gray-900 underline">EUR</button>
                            </div>

                            {/* Par nuit */}
                            <div onClick={() => setShowParNuit(true)} className="border border-gray-200 rounded-2xl p-4 mb-2 cursor-pointer hover:border-gray-400 transition-colors">
                                <p className="text-xs text-gray-500 mb-1">Par nuit</p>
                                <p className="text-2xl font-bold text-gray-900">{property.pricePerNight} €</p>
                            </div>

                            {/* Prix spécial week-end */}
                            <div onClick={() => setShowWeekend(true)} className="border border-gray-200 rounded-2xl px-4 py-4 mb-2 flex items-center justify-between cursor-pointer hover:border-gray-400 transition-colors">
                                <span className="text-sm text-gray-900">Prix spécial week-end</span>
                                <button className="text-sm font-semibold text-gray-900 underline">Ajouter</button>
                            </div>

                            {/* Tarification intelligente */}
                            <div className="border border-gray-200 rounded-2xl px-4 py-4 mb-6 flex items-center justify-between">
                                <span className="text-sm text-gray-900">Tarification intelligente</span>
                                <button onClick={() => setTarifIntelligente(v => !v)} className="flex-shrink-0">
                                    <div className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${tarifIntelligente ? 'bg-gray-900' : 'bg-gray-300'}`}>
                                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${tarifIntelligente ? 'left-6' : 'left-0.5'}`} />
                                    </div>
                                </button>
                            </div>

                            {/* Réductions */}
                            <h3 className="text-base font-bold text-gray-900 mb-1">Réductions</h3>
                            <p className="text-xs text-gray-500 mb-3">Ajustez vos tarifs pour attirer plus de voyageurs.</p>

                            {/* À la semaine */}
                            <div onClick={() => setShowSemaine(true)} className="border border-gray-200 rounded-2xl p-4 mb-2 cursor-pointer hover:border-gray-400 transition-colors">
                                <p className="text-sm font-semibold text-gray-900">À la semaine</p>
                                <p className="text-xs text-gray-500 mb-2">Pour 7 nuits ou plus</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-gray-900">{reductionSemaine > 0 ? `${reductionSemaine}%` : '0%'}</span>
                                    <span className="text-xs text-gray-500">Moyenne par semaine : {Math.round(property.pricePerNight * 7 * (1 - reductionSemaine / 100)).toLocaleString('fr-FR')} €</span>
                                </div>
                            </div>

                            {/* Au mois */}
                            <div onClick={() => setShowMois(true)} className="border border-gray-200 rounded-2xl p-4 mb-2 cursor-pointer hover:border-gray-400 transition-colors">
                                <p className="text-sm font-semibold text-gray-900">Au mois</p>
                                <p className="text-xs text-gray-500 mb-2">Pour 28 nuits ou plus</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-gray-900">{reductionMois > 0 ? `${reductionMois}%` : '0%'}</span>
                                    <span className="text-xs text-gray-500">Moyenne par mois : {Math.round(property.pricePerNight * 30 * (1 - reductionMois / 100)).toLocaleString('fr-FR')} €</span>
                                </div>
                            </div>

                            {/* Plus de réductions */}
                            <div onClick={() => setShowPlusReductions(true)} className="border border-gray-200 rounded-2xl px-4 py-4 mb-6 flex items-center justify-between gap-3 cursor-pointer hover:border-gray-400 transition-colors">
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 mb-1">Plus de réductions</p>
                                    <p className="text-xs text-gray-500 leading-relaxed">Réduction en cas de réservation anticipée, réduction en cas de réservation de dernière minute, réduction liée à la durée du séjour</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            </div>

                            {/* Promotions */}
                            <h3 className="text-base font-bold text-gray-900 mb-1">Promotions</h3>
                            <p className="text-xs text-gray-500 mb-3 leading-relaxed">Proposez des réductions pour les séjours courte durée afin de décrocher de nouvelles réservations.</p>

                            {/* Promotion voyageurs mieux notés */}
                            <div onClick={() => setShowPromoVoyageurs(true)} className="border border-gray-200 rounded-2xl p-4 mb-2 cursor-pointer hover:border-gray-400 transition-colors">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                    <p className="text-sm font-semibold text-gray-900">Promotion pour les voyageurs les mieux notés</p>
                                    <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full flex-shrink-0">Nouveau</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-2">Attirez les voyageurs ayant une évaluation de 4,8 ou plus</p>
                                <button className="text-sm font-bold text-gray-900 underline">Commencer</button>
                            </div>

                            {/* Promotions passées */}
                            <div onClick={() => setShowPromoPassees(true)} className="border border-gray-200 rounded-2xl px-4 py-4 mb-6 flex items-center justify-between cursor-pointer hover:border-gray-400 transition-colors">
                                <span className="text-sm text-gray-900">Afficher les promotions passées (2)</span>
                                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            </div>

                            {/* Autres frais */}
                            <h3 className="text-base font-bold text-gray-900 mb-3">Autres frais</h3>

                            {/* Frais */}
                            <div onClick={() => setShowFrais(true)} className="border border-gray-200 rounded-2xl px-4 py-4 flex items-center justify-between gap-3 cursor-pointer hover:border-gray-400 transition-colors">
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 mb-0.5">Frais</p>
                                    <p className="text-xs text-gray-500">Ménage, animaux de compagnie, voyageurs supplémentaires</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            </div>
                        </div>
                    </div>

                    {/* ── Frais panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showFrais ? 1 : 0, pointerEvents: showFrais ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-4 pt-5 pb-2">
                            <button
                                onClick={() => setShowFrais(false)}
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-700" />
                            </button>
                        </div>
                        <div className="px-5 pb-10">

                            {/* Frais de ménage */}
                            <h3 className="text-base font-bold text-gray-900 mb-3">Frais de ménage</h3>
                            <div onClick={() => setShowFraisMenage(true)} className="border border-gray-200 rounded-2xl p-4 mb-2 cursor-pointer hover:border-gray-400 transition-colors">
                                <p className="text-xs text-gray-500 mb-1">Par séjour</p>
                                <p className="text-2xl font-bold text-gray-900">53 €</p>
                            </div>
                            <div onClick={() => setShowFraisMenageCourt(true)} className="border border-gray-200 rounded-2xl p-4 mb-6 cursor-pointer hover:border-gray-400 transition-colors">
                                <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm text-gray-900">Montant pour les séjours courte durée</p>
                                    <button className="text-sm font-bold text-gray-900 underline flex-shrink-0 ml-2">Ajouter</button>
                                </div>
                                <p className="text-xs text-gray-500 leading-relaxed">Attirez les voyageurs qui réservent pour 1 ou 2 nuits en diminuant les frais de ménage.</p>
                            </div>

                            {/* Frais pour les animaux */}
                            <h3 className="text-base font-bold text-gray-900 mb-3">Frais pour les animaux</h3>
                            <div onClick={() => setShowFraisAnimaux(true)} className="border border-gray-200 rounded-2xl p-4 mb-2 cursor-pointer hover:border-gray-400 transition-colors">
                                <p className="text-xs text-gray-500 mb-1">Par séjour</p>
                                <p className="text-2xl font-bold text-gray-900">0 €</p>
                            </div>
                            <p className="text-xs text-gray-500 mb-6 leading-relaxed px-1">
                                Les animaux d'assistance séjournent gratuitement.{' '}
                                <button className="underline text-gray-900">En savoir plus</button>
                            </p>

                            {/* Frais pour les voyageurs supplémentaires */}
                            <h3 className="text-base font-bold text-gray-900 mb-3">Frais pour les voyageurs supplémentaires</h3>
                            <div onClick={() => setShowFraisVoyageurs(true)} className="border border-gray-200 rounded-2xl p-4 mb-6 cursor-pointer hover:border-gray-400 transition-colors">
                                <p className="text-xs text-gray-500 mb-1">Au-delà de 1 voyageur, par nuit</p>
                                <p className="text-2xl font-bold text-gray-900">0 €</p>
                            </div>

                            {/* Frais supplémentaires */}
                            <h3 className="text-base font-bold text-gray-900 mb-3">Frais supplémentaires</h3>
                            {[
                                { label: 'Frais de gestion par séjour', fn: () => setShowFraisGestion(true) },
                                { label: 'Frais divers par séjour', fn: () => setShowFraisDivers(true) },
                                { label: 'Frais de linge de maison par séjour', fn: () => setShowFraisLinge(true) },
                                { label: "Frais de service de l'établissement par séjour", fn: () => setShowFraisService(true) },
                            ].map(({ label, fn }, i) => (
                                <div key={i} onClick={fn} className="border border-gray-200 rounded-2xl p-4 mb-2 cursor-pointer hover:border-gray-400 transition-colors">
                                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                                    <p className="text-2xl font-bold text-gray-900">0 €</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Frais de ménage sub-panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showFraisMenage ? 1 : 0, pointerEvents: showFraisMenage ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-5 pt-8 pb-10 flex flex-col items-center">
                            <h2 className="text-base font-bold text-gray-900 text-center mb-1">Frais de ménage</h2>
                            <p className="text-sm text-[#FF385C] mb-12">Par séjour</p>
                            <div className="flex items-baseline gap-1 mb-12">
                                <span className="text-6xl font-bold text-gray-900">53</span>
                                <span className="text-4xl font-bold text-gray-300 mx-1">|</span>
                                <span className="text-4xl font-bold text-gray-900">€</span>
                            </div>
                            <p className="text-xs text-gray-500 text-center mb-8 leading-relaxed px-2">
                                Des frais de ménage moins élevés pourraient vous permettre d'obtenir davantage de réservations.{' '}
                                <button className="underline text-gray-900">En savoir plus</button>
                            </p>
                            <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-4 rounded-2xl mb-3 cursor-not-allowed">Enregistrer</button>
                            <button onClick={() => setShowFraisMenage(false)} className="w-full border border-gray-300 text-sm font-semibold text-gray-900 py-4 rounded-2xl hover:bg-gray-50 transition-colors">Annuler</button>
                        </div>
                    </div>

                    {/* ── Frais de ménage courte durée sub-panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showFraisMenageCourt ? 1 : 0, pointerEvents: showFraisMenageCourt ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-5 pt-8 pb-10 flex flex-col items-center">
                            <h2 className="text-base font-bold text-gray-900 text-center mb-1 leading-snug">Frais de ménage pour les séjours courte durée</h2>
                            <p className="text-sm text-[#FF385C] mb-12">Montant pour 1 ou 2 nuits</p>
                            <div className="flex items-baseline gap-1 mb-16">
                                <span className="text-4xl font-bold text-gray-900">€</span>
                            </div>
                            <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-4 rounded-2xl mb-3 cursor-not-allowed">Enregistrer</button>
                            <button onClick={() => setShowFraisMenageCourt(false)} className="w-full border border-gray-300 text-sm font-semibold text-gray-900 py-4 rounded-2xl hover:bg-gray-50 transition-colors">Annuler</button>
                        </div>
                    </div>

                    {/* ── Frais pour les animaux sub-panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showFraisAnimaux ? 1 : 0, pointerEvents: showFraisAnimaux ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-5 pt-8 pb-10 flex flex-col items-center">
                            <h2 className="text-base font-bold text-gray-900 text-center mb-10">Frais pour les animaux</h2>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-6xl font-bold text-gray-900">0 €</span>
                            </div>
                            <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-700 mb-10">
                                Par séjour <ChevronRight className="w-3.5 h-3.5 rotate-90 text-gray-500" />
                            </button>
                            <p className="text-xs text-[#FF385C] text-center mb-8 leading-relaxed px-2">
                                Les animaux d'assistance séjournent gratuitement.{' '}
                                <button className="underline">En savoir plus</button>
                            </p>
                            <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-4 rounded-2xl mb-3 cursor-not-allowed">Enregistrer</button>
                            <button onClick={() => setShowFraisAnimaux(false)} className="w-full border border-gray-300 text-sm font-semibold text-gray-900 py-4 rounded-2xl hover:bg-gray-50 transition-colors">Annuler</button>
                        </div>
                    </div>

                    {/* ── Frais voyageurs supplémentaires sub-panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showFraisVoyageurs ? 1 : 0, pointerEvents: showFraisVoyageurs ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-5 pt-8 pb-10 flex flex-col items-center">
                            <h2 className="text-base font-bold text-gray-900 text-center mb-1">Frais pour les voyageurs supplémentaires</h2>
                            <p className="text-sm text-[#FF385C] mb-10">Par nuit</p>
                            <div className="flex items-baseline gap-1 mb-10">
                                <span className="text-6xl font-bold text-gray-900">0</span>
                                <span className="text-4xl font-bold text-gray-300 mx-1">|</span>
                                <span className="text-4xl font-bold text-gray-900">€</span>
                            </div>
                            <div className="w-full border border-gray-200 rounded-2xl px-4 py-4 flex items-center justify-between mb-8">
                                <p className="text-sm text-gray-700 leading-snug">Pour chaque voyageur supplémentaire au-delà de</p>
                                <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                                    <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 text-lg leading-none hover:bg-gray-100">−</button>
                                    <span className="text-sm font-semibold text-gray-900 w-4 text-center">1</span>
                                    <button className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 text-lg leading-none hover:bg-gray-100">+</button>
                                </div>
                            </div>
                            <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-4 rounded-2xl mb-3 cursor-not-allowed">Enregistrer</button>
                            <button onClick={() => setShowFraisVoyageurs(false)} className="w-full border border-gray-300 text-sm font-semibold text-gray-900 py-4 rounded-2xl hover:bg-gray-50 transition-colors">Annuler</button>
                        </div>
                    </div>

                    {/* ── Frais de gestion sub-panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showFraisGestion ? 1 : 0, pointerEvents: showFraisGestion ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-5 pt-8 pb-10 flex flex-col items-center">
                            <h2 className="text-base font-bold text-gray-900 text-center mb-2">Frais de gestion</h2>
                            <p className="text-xs text-gray-500 text-center mb-10 leading-relaxed px-1">Les frais de gestion sont ajoutés au tarif par nuit au moment de la réservation, mais apparaîtront distinctement dans votre relevé de versements.</p>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-6xl font-bold text-gray-900">0</span>
                                <span className="text-4xl font-bold text-gray-300 mx-1">|</span>
                                <span className="text-4xl font-bold text-gray-900">€</span>
                            </div>
                            <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-700 mb-10">
                                Par séjour <ChevronRight className="w-3.5 h-3.5 rotate-90 text-gray-500" />
                            </button>
                            <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-4 rounded-2xl mb-3 cursor-not-allowed">Enregistrer</button>
                            <button onClick={() => setShowFraisGestion(false)} className="w-full border border-gray-300 text-sm font-semibold text-gray-900 py-4 rounded-2xl hover:bg-gray-50 transition-colors">Annuler</button>
                        </div>
                    </div>

                    {/* ── Frais divers sub-panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showFraisDivers ? 1 : 0, pointerEvents: showFraisDivers ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-5 pt-8 pb-10 flex flex-col items-center">
                            <h2 className="text-base font-bold text-gray-900 text-center mb-2">Frais divers</h2>
                            <p className="text-xs text-gray-500 text-center mb-10 leading-relaxed px-1">Les frais divers sont ajoutés au tarif par nuit au moment de la réservation, mais apparaîtront distinctement dans votre relevé de versements.</p>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-6xl font-bold text-gray-900">0 €</span>
                            </div>
                            <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-700 mb-10">
                                Par séjour <ChevronRight className="w-3.5 h-3.5 rotate-90 text-gray-500" />
                            </button>
                            <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-4 rounded-2xl mb-3 cursor-not-allowed">Enregistrer</button>
                            <button onClick={() => setShowFraisDivers(false)} className="w-full border border-gray-300 text-sm font-semibold text-gray-900 py-4 rounded-2xl hover:bg-gray-50 transition-colors">Annuler</button>
                        </div>
                    </div>

                    {/* ── Frais de linge de maison sub-panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showFraisLinge ? 1 : 0, pointerEvents: showFraisLinge ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-5 pt-8 pb-10 flex flex-col items-center">
                            <h2 className="text-base font-bold text-gray-900 text-center mb-2">Frais de linge de maison</h2>
                            <p className="text-xs text-gray-500 text-center mb-10 leading-relaxed px-1">Les frais de linge de maison sont ajoutés aux frais de ménage. Tous les frais standard sont inclus dans le prix des nuits que les voyageurs paient au moment de la réservation. Vous pourrez consulter le décompte complet des frais dans votre rapport de paiement.</p>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-6xl font-bold text-gray-900">0 €</span>
                            </div>
                            <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-700 mb-10">
                                Par séjour <ChevronRight className="w-3.5 h-3.5 rotate-90 text-gray-500" />
                            </button>
                            <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-4 rounded-2xl mb-3 cursor-not-allowed">Enregistrer</button>
                            <button onClick={() => setShowFraisLinge(false)} className="w-full border border-gray-300 text-sm font-semibold text-gray-900 py-4 rounded-2xl hover:bg-gray-50 transition-colors">Annuler</button>
                        </div>
                    </div>

                    {/* ── Frais de service de l'établissement sub-panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showFraisService ? 1 : 0, pointerEvents: showFraisService ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-5 pt-8 pb-10 flex flex-col items-center">
                            <h2 className="text-base font-bold text-gray-900 text-center mb-2">Frais de service de l'établissement</h2>
                            <p className="text-xs text-gray-500 text-center mb-10 leading-relaxed px-1">Les frais de séjour sont ajoutés au tarif par nuit au moment de la réservation, mais apparaîtront distinctement dans votre relevé de versements.</p>
                            <div className="flex items-baseline gap-1 mb-4">
                                <span className="text-6xl font-bold text-gray-900">0 €</span>
                            </div>
                            <button className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-700 mb-10">
                                Par séjour <ChevronRight className="w-3.5 h-3.5 rotate-90 text-gray-500" />
                            </button>
                            <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-4 rounded-2xl mb-3 cursor-not-allowed">Enregistrer</button>
                            <button onClick={() => setShowFraisService(false)} className="w-full border border-gray-300 text-sm font-semibold text-gray-900 py-4 rounded-2xl hover:bg-gray-50 transition-colors">Annuler</button>
                        </div>
                    </div>

                    {/* ── Par nuit sub-panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showParNuit ? 1 : 0, pointerEvents: showParNuit ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 pt-5 pb-4">
                            <button
                                onClick={() => setShowParNuit(false)}
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-700" />
                            </button>
                            <span className="text-sm font-semibold text-gray-900">Par nuit</span>
                            <button className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
                                <span className="text-gray-500 text-base leading-none">?</span>
                            </button>
                        </div>

                        <div className="px-5 flex flex-col items-center pt-8 pb-10">
                            {/* Price display */}
                            <div className="flex items-baseline gap-1 mb-2">
                                <span className="text-6xl font-bold text-gray-900">{property.pricePerNight}</span>
                                <span className="text-4xl font-bold text-gray-300 mx-1">|</span>
                                <span className="text-4xl font-bold text-gray-900">€</span>
                            </div>

                            {/* Vous gagnez */}
                            <button className="flex items-center gap-1 text-sm text-gray-600 mb-12">
                                Vous gagnez {Math.round(property.pricePerNight * 0.815)} €
                                <ChevronRight className="w-4 h-4 rotate-90" />
                            </button>

                            {/* Prix conseillé */}
                            <div className="w-full border border-gray-200 rounded-2xl px-4 py-4 text-center mb-4">
                                <span className="text-sm text-gray-900">Prix conseillé : {Math.round(property.pricePerNight * 0.8)} €</span>
                            </div>

                            <button className="text-sm text-gray-900 underline">Afficher les annonces similaires</button>
                        </div>
                    </div>

                    {/* ── Prix spécial week-end sub-panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showWeekend ? 1 : 0, pointerEvents: showWeekend ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-5 pt-8 pb-10 flex flex-col">
                            {/* Title */}
                            <div className="text-center mb-8">
                                <h2 className="text-base font-semibold text-gray-900 mb-1">Prix spécial week-end</h2>
                                <p className="text-sm text-[#FF385C]">Nuits du vendredi et du samedi</p>
                            </div>

                            {/* Prix 0€ + pencil */}
                            <div className="flex items-baseline justify-center gap-2 mb-2">
                                <span className="text-6xl font-bold text-gray-900">0 €</span>
                                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors">
                                    <Pencil className="w-3.5 h-3.5 text-gray-600" />
                                </button>
                            </div>

                            {/* Vous gagnez */}
                            <button className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-16">
                                Vous gagnez 0 €
                                <ChevronRight className="w-4 h-4 rotate-90" />
                            </button>

                            {/* En savoir plus */}
                            <button className="text-sm text-gray-600 underline text-center mb-6">En savoir plus sur la tarification</button>

                            {/* Enregistrer (disabled) */}
                            <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-4 rounded-2xl mb-3 cursor-not-allowed">
                                Enregistrer
                            </button>

                            {/* Annuler */}
                            <button onClick={() => setShowWeekend(false)} className="w-full border border-gray-300 text-sm font-semibold text-gray-900 py-4 rounded-2xl hover:bg-gray-50 transition-colors">
                                Annuler
                            </button>
                        </div>
                    </div>

                    {/* ── À la semaine sub-panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showSemaine ? 1 : 0, pointerEvents: showSemaine ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-5 pt-8 pb-10 flex flex-col">
                            <div className="text-center mb-6">
                                <h2 className="text-base font-semibold text-gray-900 mb-1">Réduction à la semaine</h2>
                                <p className="text-sm text-[#FF385C]">Moyenne pour un séjour de 7 nuits</p>
                            </div>
                            {(() => {
                                const prix = Math.round(property.pricePerNight * 7 * (1 - reductionSemaine / 100))
                                return (
                                    <>
                                        <div className="flex items-baseline justify-center mb-2">
                                            <span className="text-6xl font-bold text-gray-900">{prix.toLocaleString('fr-FR')} €</span>
                                        </div>
                                        <button className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-8">
                                            Vous gagnez {Math.round(prix * 0.815).toLocaleString('fr-FR')} €
                                            <ChevronRight className="w-4 h-4 rotate-90" />
                                        </button>
                                    </>
                                )
                            })()}
                            <div className="mb-6">
                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 mb-1">Définissez une réduction</p>
                                        <p className="text-xs text-gray-500 leading-relaxed">Conseil : pour décrocher des séjours à la semaine, essayez de proposer une réduction de 31 %</p>
                                        <button className="text-xs text-gray-900 underline font-semibold mt-1">En savoir plus</button>
                                    </div>
                                    <div className="flex-shrink-0 w-16 h-14 border-2 border-gray-200 rounded-2xl flex items-center justify-center">
                                        <span className="text-base font-bold text-gray-900">{reductionSemaine}%</span>
                                    </div>
                                </div>
                                <input
                                    type="range" min="0" max="99" value={reductionSemaine}
                                    onChange={e => setReductionSemaine(Number(e.target.value))}
                                    className="w-full h-1 rounded-full appearance-none cursor-pointer accent-gray-900"
                                    style={{ background: `linear-gradient(to right, #222 ${reductionSemaine}%, #e5e7eb ${reductionSemaine}%)` }}
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>0%</span><span>99%</span>
                                </div>
                            </div>
                            <button className="w-full bg-gray-900 text-white text-sm font-semibold py-4 rounded-2xl mb-3 hover:bg-gray-700 transition-colors">
                                Enregistrer
                            </button>
                            <button onClick={() => setShowSemaine(false)} className="w-full border border-gray-300 text-sm font-semibold text-gray-900 py-4 rounded-2xl hover:bg-gray-50 transition-colors">
                                Annuler
                            </button>
                        </div>
                    </div>

                    {/* ── Au mois sub-panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showMois ? 1 : 0, pointerEvents: showMois ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-5 pt-8 pb-10 flex flex-col">
                            <div className="text-center mb-6">
                                <h2 className="text-base font-semibold text-gray-900 mb-1">Réduction au mois</h2>
                                <p className="text-sm text-[#FF385C]">Moyenne pour un séjour de 30 nuits</p>
                            </div>
                            {(() => {
                                const prix = Math.round(property.pricePerNight * 30 * (1 - reductionMois / 100))
                                return (
                                    <>
                                        <div className="flex items-baseline justify-center mb-2">
                                            <span className="text-6xl font-bold text-gray-900">{prix.toLocaleString('fr-FR')} €</span>
                                        </div>
                                        <button className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-8">
                                            Vous gagnez {Math.round(prix * 0.815).toLocaleString('fr-FR')} €
                                            <ChevronRight className="w-4 h-4 rotate-90" />
                                        </button>
                                    </>
                                )
                            })()}
                            <div className="mb-6">
                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 mb-1">Définissez une réduction</p>
                                        <p className="text-xs text-gray-500 leading-relaxed">Conseil : pour décrocher des séjours au mois, essayez de proposer une réduction de 67 %</p>
                                        <button className="text-xs text-gray-900 underline font-semibold mt-1">En savoir plus</button>
                                    </div>
                                    <div className="flex-shrink-0 w-16 h-14 border-2 border-gray-200 rounded-2xl flex items-center justify-center">
                                        <span className="text-base font-bold text-gray-900">{reductionMois}%</span>
                                    </div>
                                </div>
                                <input
                                    type="range" min="0" max="99" value={reductionMois}
                                    onChange={e => setReductionMois(Number(e.target.value))}
                                    className="w-full h-1 rounded-full appearance-none cursor-pointer accent-gray-900"
                                    style={{ background: `linear-gradient(to right, #222 ${reductionMois}%, #e5e7eb ${reductionMois}%)` }}
                                />
                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                    <span>0%</span><span>99%</span>
                                </div>
                            </div>
                            <button className="w-full bg-gray-900 text-white text-sm font-semibold py-4 rounded-2xl mb-3 hover:bg-gray-700 transition-colors">
                                Enregistrer
                            </button>
                            <button onClick={() => setShowMois(false)} className="w-full border border-gray-300 text-sm font-semibold text-gray-900 py-4 rounded-2xl hover:bg-gray-50 transition-colors">
                                Annuler
                            </button>
                        </div>
                    </div>

                    {/* ── Plus de réductions panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showPlusReductions ? 1 : 0, pointerEvents: showPlusReductions ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-4 pt-5 pb-2">
                            <button
                                onClick={() => setShowPlusReductions(false)}
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-700" />
                            </button>
                        </div>
                        <div className="px-5 pb-10">
                            {/* Réservation anticipée */}
                            <div className="mb-6">
                                <h3 className="text-base font-bold text-gray-900 mb-1">Réductions en cas de réservation anticipée</h3>
                                <p className="text-xs text-gray-500 mb-3 leading-relaxed">Obtenez plus de réservations en proposant des réductions aux voyageurs qui réservent longtemps à l'avance.</p>
                                <button onClick={() => setShowAnticipee(true)} className="w-full border border-gray-200 rounded-2xl py-4 text-sm font-semibold text-gray-900 hover:border-gray-400 transition-colors">
                                    Ajouter une réduction
                                </button>
                            </div>
                            {/* Dernière minute */}
                            <div className="mb-6">
                                <h3 className="text-base font-bold text-gray-900 mb-1">Réductions de dernière minute</h3>
                                <p className="text-xs text-gray-500 mb-3 leading-relaxed">Remplissez votre calendrier en proposant des réductions pour les voyageurs qui réservent au dernier moment.</p>
                                <button onClick={() => setShowDerniereMinute(true)} className="w-full border-2 border-gray-900 rounded-2xl py-4 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                                    Ajouter une réduction
                                </button>
                            </div>
                            {/* Durée du séjour */}
                            <div className="mb-6">
                                <h3 className="text-base font-bold text-gray-900 mb-1">Réductions liées à la durée du séjour</h3>
                                <p className="text-xs text-gray-500 mb-3 leading-relaxed">Proposez des réductions en fonction de la durée des séjours. Si vous proposez plusieurs réductions, celle portant sur la durée la plus longue s'applique.</p>
                                <button onClick={() => setShowDureeSejour(true)} className="w-full border border-gray-200 rounded-2xl py-4 text-sm font-semibold text-gray-900 hover:border-gray-400 transition-colors">
                                    Ajouter une réduction
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Réduction anticipée sub-panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showAnticipee ? 1 : 0, pointerEvents: showAnticipee ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-5 pt-6 pb-10">
                            <div className="flex items-start gap-3 mb-1">
                                <button onClick={() => setShowAnticipee(false)} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors flex-shrink-0 mt-0.5">
                                    <ChevronLeft className="w-4 h-4 text-gray-700" />
                                </button>
                                <h2 className="text-sm font-bold text-gray-900 leading-snug">Réduction en cas de réservation anticipée</h2>
                            </div>
                            <p className="text-xs text-[#FF385C] mb-6 pl-11 leading-relaxed">Pour les réservations effectuées entre 1 et 24 mois avant la date d'arrivée.</p>
                            <div className="border border-gray-200 rounded-2xl overflow-hidden mb-8">
                                <div className="px-4 py-4 border-b border-gray-200">
                                    <p className="text-xs text-gray-500 mb-1">Mois avant l'arrivée</p>
                                    <p className="text-xl font-semibold text-gray-300">0</p>
                                </div>
                                <div className="px-4 py-4">
                                    <p className="text-xs text-gray-500 mb-1">Réduction</p>
                                    <p className="text-xl font-semibold text-gray-300">0 %</p>
                                </div>
                            </div>
                            <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-4 rounded-2xl mb-3 cursor-not-allowed">Enregistrer</button>
                            <button onClick={() => setShowAnticipee(false)} className="w-full border border-gray-300 text-sm font-semibold text-gray-900 py-4 rounded-2xl hover:bg-gray-50 transition-colors">Annuler</button>
                        </div>
                    </div>

                    {/* ── Réduction dernière minute sub-panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showDerniereMinute ? 1 : 0, pointerEvents: showDerniereMinute ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-5 pt-6 pb-10">
                            <div className="flex items-start gap-3 mb-1">
                                <button onClick={() => setShowDerniereMinute(false)} className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors flex-shrink-0 mt-0.5">
                                    <ChevronLeft className="w-4 h-4 text-gray-700" />
                                </button>
                                <h2 className="text-sm font-bold text-gray-900 leading-snug">Réduction de dernière minute</h2>
                            </div>
                            <p className="text-xs text-[#FF385C] mb-6 pl-11 leading-relaxed">Pour les réservations effectuées entre 1 et 28 jours avant la date d'arrivée.</p>
                            <div className="border border-gray-200 rounded-2xl overflow-hidden mb-8">
                                <div className="px-4 py-4 border-b border-gray-200">
                                    <p className="text-xs text-gray-500 mb-1">Jours avant l'arrivée</p>
                                    <p className="text-xl font-semibold text-gray-300">0</p>
                                </div>
                                <div className="px-4 py-4">
                                    <p className="text-xs text-gray-500 mb-1">Réduction</p>
                                    <p className="text-xl font-semibold text-gray-300">0 %</p>
                                </div>
                            </div>
                            <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-4 rounded-2xl mb-3 cursor-not-allowed">Enregistrer</button>
                            <button onClick={() => setShowDerniereMinute(false)} className="w-full border border-gray-300 text-sm font-semibold text-gray-900 py-4 rounded-2xl hover:bg-gray-50 transition-colors">Annuler</button>
                        </div>
                    </div>

                    {/* ── Réduction durée séjour sub-panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showDureeSejour ? 1 : 0, pointerEvents: showDureeSejour ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-5 pt-8 pb-10">
                            <h2 className="text-sm font-bold text-gray-900 text-center mb-6 leading-snug">Réduction liée à la durée du séjour</h2>
                            <div className="border border-gray-200 rounded-2xl overflow-hidden mb-8">
                                <div className="px-4 py-4 border-b border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Durée de séjour</p>
                                            <p className={`text-sm ${dureeSejour ? 'text-gray-900 font-semibold' : 'text-gray-400'}`}>
                                                {dureeSejour || 'Sélectionner une durée'}
                                            </p>
                                        </div>
                                        <div className="relative">
                                            <select
                                                value={dureeSejour}
                                                onChange={e => setDureeSejour(e.target.value)}
                                                className="absolute inset-0 opacity-0 cursor-pointer w-full"
                                            >
                                                <option value="">Sélectionner une durée</option>
                                                {['2 nuits', '3 nuits', '4 nuits', '5 nuits', '6 nuits',
                                                    '2 semaines', '3 semaines', '4 semaines', '5 semaines',
                                                    '6 semaines', '7 semaines', '8 semaines', '9 semaines',
                                                    '10 semaines', '11 semaines', '12 semaines'].map(opt => (
                                                        <option key={opt} value={opt}>{opt}</option>
                                                    ))}
                                            </select>
                                            <ChevronRight className="w-4 h-4 text-gray-400 rotate-90 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-4">
                                    <p className="text-xs text-gray-500 mb-1">Réduction</p>
                                    <p className="text-xl font-semibold text-gray-300">%</p>
                                </div>
                            </div>
                            <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-4 rounded-2xl mb-3 cursor-not-allowed">Enregistrer</button>
                            <button onClick={() => setShowDureeSejour(false)} className="w-full border border-gray-300 text-sm font-semibold text-gray-900 py-4 rounded-2xl hover:bg-gray-50 transition-colors">Annuler</button>
                        </div>
                    </div>

                    {/* ── Promotion voyageurs les mieux notés panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showPromoVoyageurs ? 1 : 0, pointerEvents: showPromoVoyageurs ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-4 pt-5 pb-2">
                            <button
                                onClick={() => setShowPromoVoyageurs(false)}
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-700" />
                            </button>
                        </div>
                        <div className="px-5 pb-10">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 leading-snug">Promotion pour les voyageurs les mieux notés</h2>

                            {/* Titre accrocheur */}
                            <p className="text-base font-semibold text-gray-900 text-center mb-6 leading-snug">
                                Offrez une réduction de 10 % aux voyageurs les mieux notés
                            </p>

                            {/* Vos avantages */}
                            <div className="bg-gray-50 rounded-2xl p-4 mb-4">
                                <p className="text-sm font-bold text-gray-900 mb-3">Vos avantages</p>
                                <div className="flex items-start gap-2 mb-2">
                                    <span className="text-[#1a8a7a] font-bold text-base leading-none mt-0.5">✓</span>
                                    <p className="text-sm text-gray-700">Plus de visibilité dans les résultats de recherche</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-[#1a8a7a] font-bold text-base leading-none mt-0.5">✓</span>
                                    <p className="text-sm text-gray-700">Un badge spécial sur votre annonce</p>
                                </div>
                            </div>

                            {/* Fonctionnement */}
                            <div className="bg-gray-50 rounded-2xl p-4 mb-8">
                                <p className="text-sm font-bold text-gray-900 mb-3">Fonctionnement</p>
                                <div className="flex items-start gap-2 mb-2">
                                    <span className="text-[#1a8a7a] font-bold text-base leading-none mt-0.5">✓</span>
                                    <p className="text-sm text-gray-700">Uniquement disponible pour les voyageurs avec une note de 4,8 ou plus</p>
                                </div>
                                <div className="flex items-start gap-2 mb-2">
                                    <span className="text-[#1a8a7a] font-bold text-base leading-none mt-0.5">✓</span>
                                    <p className="text-sm text-gray-700">Valable pour les dates disponibles dans votre calendrier</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-[#1a8a7a] font-bold text-base leading-none mt-0.5">✓</span>
                                    <p className="text-sm text-gray-700">Cumulable avec vos autres réductions et promotions</p>
                                </div>
                            </div>

                            {/* Appliquer la promotion */}
                            <button className="w-full bg-gray-900 text-white text-sm font-semibold py-4 rounded-2xl mb-4 hover:bg-gray-700 transition-colors">
                                Appliquer la promotion
                            </button>

                            {/* En savoir plus */}
                            <div className="text-center">
                                <button className="text-sm text-gray-900 underline">En savoir plus</button>
                            </div>
                        </div>
                    </div>

                    {/* ── Promotions passées panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showPromoPassees ? 1 : 0, pointerEvents: showPromoPassees ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-4 pt-5 pb-2 flex items-center gap-3">
                            <button
                                onClick={() => setShowPromoPassees(false)}
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors flex-shrink-0"
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-700" />
                            </button>
                            <h2 className="text-base font-bold text-gray-900">Promotions passées</h2>
                        </div>
                        <div className="px-5 pt-4 pb-10">
                            {/* Carte 1 */}
                            <div className="border border-gray-200 rounded-2xl p-4 mb-3">
                                <p className="text-sm text-gray-900 mb-3 leading-snug">
                                    Remplissez votre calendrier avec cette promotion : 10 % de réduction
                                </p>
                                <p className="text-xs text-gray-500 mb-2">0 vue · 0 réservation</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                                    <span className="text-xs text-gray-600 font-medium">Inactive</span>
                                </div>
                            </div>
                            {/* Carte 2 */}
                            <div className="border border-gray-200 rounded-2xl p-4">
                                <p className="text-sm text-gray-900 mb-3 leading-snug">
                                    Remplissez votre calendrier avec cette promotion : 15 % de réduction
                                </p>
                                <p className="text-xs text-gray-500 mb-2">0 vue · 0 réservation</p>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                                    <span className="text-xs text-gray-600 font-medium">Inactive</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Dispo settings panel ── */}
                    <div
                        className="absolute inset-0 bg-white transition-opacity duration-300"
                        style={{ opacity: showDispoSettings ? 1 : 0, pointerEvents: showDispoSettings ? 'auto' : 'none', overflowY: 'auto', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-4 pt-5 pb-2">
                            <button
                                onClick={() => { setShowDispoSettings(false); setOpenDispoDropdown(null) }}
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-700" />
                            </button>
                        </div>

                        <div className="px-5 pb-10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">Paramètres de disponibilité</h2>
                            <p className="text-xs text-gray-500 mb-6 leading-relaxed">Ces paramètres s'appliquent à toutes les nuits, à moins que vous ne personnalisiez certaines dates.</p>

                            {/* Durée du séjour */}
                            <h3 className="text-base font-bold text-gray-900 mb-3">Durée du séjour</h3>

                            <div onClick={() => setShowDispoMin(true)} className="border border-gray-200 rounded-2xl p-4 mb-2 cursor-pointer hover:border-gray-400 transition-colors">
                                <p className="text-xs text-gray-500 mb-1">Nombre minimal de nuits</p>
                                <p className="text-2xl font-bold text-gray-900">1</p>
                            </div>
                            <div onClick={() => setShowDispoMax(true)} className="border border-gray-200 rounded-2xl p-4 mb-6 cursor-pointer hover:border-gray-400 transition-colors">
                                <p className="text-xs text-gray-500 mb-1">Nombre maximal de nuits</p>
                                <p className="text-2xl font-bold text-gray-900">365</p>
                            </div>

                            {/* Disponibilités */}
                            <h3 className="text-base font-bold text-gray-900 mb-3">Disponibilités</h3>

                            {/* Dropdown 1 — Délai de réservation avant l'arrivée */}
                            <div ref={el => dispoDropdownRefs.current[0] = el} className={`relative border rounded-2xl mb-2 ${openDispoDropdown === 0 ? 'border-2 border-gray-900' : 'border-gray-200'}`}>
                                <button onClick={() => handleDispoDropdown(0)} className="w-full px-4 py-4 flex items-start justify-between text-left">
                                    <div className="min-w-0 pr-2">
                                        <p className="text-sm font-semibold text-gray-900">Délai de réservation avant l'arrivée</p>
                                        {openDispoDropdown === 0
                                            ? <p className="text-xs text-gray-500 mt-1 leading-relaxed">Combien de temps avant l'arrivée avez-vous besoin de recevoir la réservation d'un voyageur ?</p>
                                            : <p className="text-sm text-gray-500 mt-0.5">{dispoDelai}</p>
                                        }
                                    </div>
                                    <ChevronRight className={`w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5 transition-transform ${openDispoDropdown === 0 ? 'rotate-[270deg]' : 'rotate-90'}`} />
                                </button>
                            </div>

                            {/* Dropdown 2 — Délai : le jour même (heure) */}
                            <div ref={el => dispoDropdownRefs.current[1] = el} className={`relative border rounded-2xl mb-2 ${openDispoDropdown === 1 ? 'border-2 border-gray-900' : 'border-gray-200'}`}>
                                <button onClick={() => handleDispoDropdown(1)} className="w-full px-4 py-4 flex items-start justify-between text-left">
                                    <div className="min-w-0 pr-2">
                                        <p className="text-sm font-semibold text-gray-900">Délai de réservation avant l'arrivée : le jour même</p>
                                        {openDispoDropdown === 1
                                            ? <p className="text-xs text-gray-500 mt-1 leading-relaxed">Les voyageurs peuvent réserver le jour même de leur arrivée dans le logement jusqu'à cette heure.</p>
                                            : <p className="text-sm text-gray-500 mt-0.5">{dispoHeure}</p>
                                        }
                                    </div>
                                    <ChevronRight className={`w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5 transition-transform ${openDispoDropdown === 1 ? 'rotate-[270deg]' : 'rotate-90'}`} />
                                </button>
                            </div>

                            {/* Dropdown 3 — Temps de préparation */}
                            <div ref={el => dispoDropdownRefs.current[2] = el} className={`relative border rounded-2xl mb-2 ${openDispoDropdown === 2 ? 'border-2 border-gray-900' : 'border-gray-200'}`}>
                                <button onClick={() => handleDispoDropdown(2)} className="w-full px-4 py-4 flex items-start justify-between text-left">
                                    <div className="min-w-0 pr-2">
                                        <p className="text-sm font-semibold text-gray-900">Temps de préparation</p>
                                        {openDispoDropdown === 2
                                            ? <p className="text-xs text-gray-500 mt-1 leading-relaxed">Combien de nuits avant et après chaque réservation devez-vous bloquer ?</p>
                                            : <p className="text-sm text-gray-500 mt-0.5">{dispoPrep}</p>
                                        }
                                    </div>
                                    <ChevronRight className={`w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5 transition-transform ${openDispoDropdown === 2 ? 'rotate-[270deg]' : 'rotate-90'}`} />
                                </button>
                            </div>

                            {/* Dropdown 4 — Plage de disponibilité */}
                            <div ref={el => dispoDropdownRefs.current[3] = el} className={`relative border rounded-2xl mb-2 ${openDispoDropdown === 3 ? 'border-2 border-gray-900' : 'border-gray-200'}`}>
                                <button onClick={() => handleDispoDropdown(3)} className="w-full px-4 py-4 flex items-start justify-between text-left">
                                    <div className="min-w-0 pr-2">
                                        <p className="text-sm font-semibold text-gray-900">Plage de disponibilité</p>
                                        {openDispoDropdown === 3
                                            ? <p className="text-xs text-gray-500 mt-1 leading-relaxed">Combien de temps à l'avance les voyageurs peuvent-ils réserver ?</p>
                                            : <p className="text-sm text-gray-500 mt-0.5">{dispoPlage}</p>
                                        }
                                    </div>
                                    <ChevronRight className={`w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5 transition-transform ${openDispoDropdown === 3 ? 'rotate-[270deg]' : 'rotate-90'}`} />
                                </button>
                            </div>

                            {/* Plus de paramètres — navigation link */}
                            <div onClick={() => setShowPlusParamsDispo(true)} className="border border-gray-200 rounded-2xl px-4 py-4 mb-6 flex items-center justify-between gap-3 cursor-pointer hover:border-gray-400 transition-colors">
                                <div>
                                    <p className="text-sm text-gray-900">Plus de paramètres de disponibilité</p>
                                    <p className="text-sm text-gray-500 mt-0.5">Dates d'arrivée et de départ non autorisées</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            </div>

                            {/* Associer des calendriers */}
                            <h3 className="text-base font-bold text-gray-900 mb-1">Associer des calendriers</h3>
                            <p className="text-xs text-gray-500 mb-3 leading-relaxed">Synchronisez tous vos calendriers d'hôte pour bénéficier de mises à jour automatiques.</p>

                            <div className="border border-gray-200 rounded-2xl px-4 py-4 mb-2 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <Link className="w-4 h-4 text-gray-600 flex-shrink-0" />
                                    <span className="text-sm text-gray-900">Me connecter à un autre site web</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            </div>

                            <div className="border border-gray-200 rounded-2xl px-4 py-4 flex items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <svg className="w-4 h-4 flex-shrink-0 text-[#FF385C]" viewBox="0 0 32 32" fill="currentColor">
                                        <path d="M16 1C10.5 1 2 12.4 2 19.2c0 4.1 2.8 7.8 7 7.8 2.4 0 4.5-1.2 6-3.1a7.2 7.2 0 0 0 6 3.1c4.2 0 7-3.7 7-7.8C28 12.4 21.5 1 16 1zm-7 24c-3.3 0-5-2.8-5-5.8C4 13.6 11.5 3 16 3c1.5 0 2.8.7 3.9 1.8C15.9 8.7 9 16.2 9 25zm7 0c-2.1 0-4-1.4-5.2-3.5C13 17 18.5 10.6 21.8 7A13 13 0 0 1 26 19.2c0 3-1.7 5.8-5 5.8z" />
                                    </svg>
                                    <span className="text-sm text-gray-900">Connecter plusieurs annonces Airbnb</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            </div>
                        </div>
                    </div>

                    {/* ── Plus de paramètres de disponibilité sub-panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showPlusParamsDispo ? 1 : 0, pointerEvents: showPlusParamsDispo ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-4 pt-5 pb-2">
                            <button
                                onClick={() => setShowPlusParamsDispo(false)}
                                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 text-gray-700" />
                            </button>
                        </div>
                        <div className="px-5 pb-10">
                            {/* Arrivée non autorisée */}
                            <h3 className="text-base font-bold text-gray-900 mb-2">Arrivée non autorisée</h3>
                            <p className="text-xs text-gray-500 mb-4 leading-relaxed">Les voyageurs ne pourront pas réserver votre logement si leur séjour commence à ces dates.</p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map(jour => (
                                    <button
                                        key={jour}
                                        onClick={() => setArriveeJours(prev => prev.includes(jour) ? prev.filter(j => j !== jour) : [...prev, jour])}
                                        className={`px-4 py-2 rounded-full text-sm transition-colors ${arriveeJours.includes(jour)
                                            ? 'border-2 border-gray-900 font-semibold text-gray-900'
                                            : 'border border-gray-300 text-gray-700 hover:border-gray-400'
                                            }`}
                                    >
                                        {jour}
                                    </button>
                                ))}
                            </div>

                            {/* Départ non autorisé */}
                            <h3 className="text-base font-bold text-gray-900 mb-2">Départ non autorisé</h3>
                            <p className="text-xs text-gray-500 mb-4 leading-relaxed">Les voyageurs ne pourront pas réserver votre logement si leur séjour prend fin à ces dates.</p>
                            <div className="flex flex-wrap gap-2 mb-8">
                                {['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'].map(jour => (
                                    <button
                                        key={jour}
                                        onClick={() => setDepartJours(prev => prev.includes(jour) ? prev.filter(j => j !== jour) : [...prev, jour])}
                                        className={`px-4 py-2 rounded-full text-sm transition-colors ${departJours.includes(jour)
                                            ? 'border-2 border-gray-900 font-semibold text-gray-900'
                                            : 'border border-gray-300 text-gray-700 hover:border-gray-400'
                                            }`}
                                    >
                                        {jour}
                                    </button>
                                ))}
                            </div>

                            <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-4 rounded-2xl cursor-not-allowed">Enregistrer</button>
                        </div>
                    </div>

                    {/* ── Nombre minimal de nuits sub-panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showDispoMin ? 1 : 0, pointerEvents: showDispoMin ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-5 pt-8 pb-10 flex flex-col items-center">
                            <h2 className="text-base font-bold text-gray-900 text-center mb-16">Nombre minimal de nuits</h2>
                            <span className="text-7xl font-bold text-gray-900 mb-16">1</span>
                            <div className="w-full border border-gray-200 rounded-2xl px-4 py-4 flex items-center justify-between mb-8">
                                <span className="text-sm text-gray-900">Personnaliser par jour d'arrivée</span>
                                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            </div>
                            <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-4 rounded-2xl mb-3 cursor-not-allowed">Enregistrer</button>
                            <button onClick={() => setShowDispoMin(false)} className="w-full border border-gray-300 text-sm font-semibold text-gray-900 py-4 rounded-2xl hover:bg-gray-50 transition-colors">Annuler</button>
                        </div>
                    </div>

                    {/* ── Nombre maximal de nuits sub-panel ── */}
                    <div
                        className="absolute inset-0 bg-white overflow-y-auto transition-opacity duration-300"
                        style={{ opacity: showDispoMax ? 1 : 0, pointerEvents: showDispoMax ? 'auto' : 'none', scrollbarWidth: 'thin' }}
                    >
                        <div className="px-5 pt-8 pb-10 flex flex-col items-center">
                            <h2 className="text-base font-bold text-gray-900 text-center mb-16">Nombre maximal de nuits</h2>
                            <span className="text-7xl font-bold text-gray-900 mb-16">60</span>
                            <div className="w-full border border-gray-200 rounded-2xl px-4 py-4 flex items-start justify-between gap-3 mb-8">
                                <div className="min-w-0">
                                    <p className="text-sm text-gray-900 mb-1 leading-snug">Autorisez les demandes pour des séjours plus longs</p>
                                    <p className="text-xs text-[#FF385C] leading-relaxed">Vous pourrez vérifier les demandes de réservation dont la durée dépasse la durée maximale de séjour que vous avez fixée.</p>
                                </div>
                                <button onClick={() => setSejoursLongs(v => !v)} className="flex-shrink-0 mt-0.5">
                                    <div className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${sejoursLongs ? 'bg-gray-900' : 'bg-gray-300'}`}>
                                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${sejoursLongs ? 'left-6' : 'left-0.5'}`} />
                                    </div>
                                </button>
                            </div>
                            <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-4 rounded-2xl mb-3 cursor-not-allowed">Enregistrer</button>
                            <button onClick={() => setShowDispoMax(false)} className="w-full border border-gray-300 text-sm font-semibold text-gray-900 py-4 rounded-2xl hover:bg-gray-50 transition-colors">Annuler</button>
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

                                    <button className="w-full border border-gray-300 rounded-xl py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors mb-2">
                                        Envoyer ou demander de l'argent
                                    </button>
                                    <button
                                        onClick={() => navigate('/airbnb/messages')}
                                        className="w-full border border-gray-300 rounded-xl py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
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
                {/* ── Fixed dropdown overlays for Disponibilités ── */}
                {openDispoDropdown !== null && (
                    <>
                        <div className="fixed inset-0 z-[199]" onClick={() => setOpenDispoDropdown(null)} />
                        <div
                            className="fixed z-[200] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
                            style={{ top: dropdownStyle.top, left: dropdownStyle.left, width: dropdownStyle.width }}
                        >
                            {openDispoDropdown === 0 && (
                                <>
                                    <div style={{ maxHeight: 220, overflowY: 'auto' }}>
                                        {['Le jour même', '1 jour', '2 jours', '3 jours', '7 jours'].map(opt => (
                                            <button key={opt} onClick={() => { setDispoDelai(opt); setOpenDispoDropdown(null) }} className="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                                <span className="text-sm text-gray-900">{opt}</span>
                                                {opt === dispoDelai && <span className="text-gray-900 text-sm">✓</span>}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="px-4 py-4 border-t border-gray-100 flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-sm text-gray-900 leading-snug">Autoriser les demandes de réservation pour le jour même</p>
                                            <p className="text-xs text-gray-500 mt-1">Vous vérifierez et approuverez chaque demande.</p>
                                        </div>
                                        <button onClick={() => setAutoriserJourMeme(v => !v)} className="flex-shrink-0 mt-0.5">
                                            <div className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${autoriserJourMeme ? 'bg-gray-900' : 'bg-gray-300'}`}>
                                                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-200 ${autoriserJourMeme ? 'left-6' : 'left-0.5'}`} />
                                            </div>
                                        </button>
                                    </div>
                                    <div className="px-4 pb-4">
                                        <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-3 rounded-2xl cursor-not-allowed">Enregistrer</button>
                                    </div>
                                </>
                            )}
                            {openDispoDropdown === 1 && (
                                <>
                                    <div style={{ maxHeight: 220, overflowY: 'auto' }}>
                                        {Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`).map(h => (
                                            <button key={h} onClick={() => { setDispoHeure(h); setOpenDispoDropdown(null) }} className="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                                <span className="text-sm text-gray-900">{h}</span>
                                                {h === dispoHeure && <span className="text-gray-900 text-sm">✓</span>}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="px-4 pb-4 pt-2">
                                        <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-3 rounded-2xl cursor-not-allowed">Enregistrer</button>
                                    </div>
                                </>
                            )}
                            {openDispoDropdown === 2 && (
                                <>
                                    <div style={{ maxHeight: 220, overflowY: 'auto' }}>
                                        {['Aucun', '1 nuit avant et après chaque réservation', '2 nuits avant et après chaque réservation'].map(opt => (
                                            <button key={opt} onClick={() => { setDispoPrep(opt); setOpenDispoDropdown(null) }} className="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                                <span className="text-sm text-gray-900 text-left">{opt}</span>
                                                {opt === dispoPrep && <span className="text-gray-900 text-sm flex-shrink-0 ml-2">✓</span>}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="px-4 pb-4 pt-2">
                                        <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-3 rounded-2xl cursor-not-allowed">Enregistrer</button>
                                    </div>
                                </>
                            )}
                            {openDispoDropdown === 3 && (
                                <>
                                    <div style={{ maxHeight: 220, overflowY: 'auto' }}>
                                        {['24 mois', '12 mois', '9 mois', '6 mois', '3 mois', 'Dates indisponibles par défaut'].map(opt => (
                                            <button key={opt} onClick={() => { setDispoPlage(opt); setOpenDispoDropdown(null) }} className="w-full px-4 py-4 flex items-center justify-between border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                                <span className="text-sm text-gray-900">{opt}</span>
                                                {opt === dispoPlage && <span className="text-gray-900 text-sm">✓</span>}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="px-4 pb-4 pt-2">
                                        <button disabled className="w-full bg-gray-100 text-gray-400 text-sm font-semibold py-3 rounded-2xl cursor-not-allowed">Enregistrer</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}

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