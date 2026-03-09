import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { X, FileText } from 'lucide-react'

const STORAGE_KEY = 'aircover_claim'

const TYPES = [
    'Élément endommagé',
    'Élément manquant',
    'Nettoyage imprévu ou odeur de fumée',
]

const ANCIENNETES = [
    'Moins d\'un an',
    '1 an',
    '2 ans',
    '3 ans',
    '4 ans',
    '5 ans et plus',
]

function getClaim(reservationId) {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return { reservationId, elements: [], date: '', message: '' }
        const c = JSON.parse(raw)
        if (c.reservationId !== reservationId) return { reservationId, elements: [], date: '', message: '' }
        return c
    } catch {
        return { reservationId, elements: [], date: '', message: '' }
    }
}

function saveClaim(claim) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(claim))
}

function AircoverStep1() {
    const { reservationId } = useParams()
    const navigate = useNavigate()

    const claim = getClaim(reservationId)
    const [elements, setElements] = useState(claim.elements || [])

    // Modal state
    const [showModal, setShowModal] = useState(false)
    const [editingIndex, setEditingIndex] = useState(null)
    const [type, setType] = useState('')
    const [showTypeOptions, setShowTypeOptions] = useState(false)
    const [nom, setNom] = useState('')
    const [quantite, setQuantite] = useState(1)
    const [anciennete, setAnciennete] = useState('')
    const [showAncOptions, setShowAncOptions] = useState(false)
    const [montant, setMontant] = useState('')
    const [url, setUrl] = useState('')

    const openAddModal = () => {
        setType('')
        setNom('')
        setQuantite(1)
        setAnciennete('')
        setMontant('')
        setUrl('')
        setEditingIndex(null)
        setShowTypeOptions(false)
        setShowAncOptions(false)
        setShowModal(true)
    }

    const openEditModal = (index) => {
        const el = elements[index]
        setType(el.type)
        setNom(el.nom)
        setQuantite(el.quantite)
        setAnciennete(el.anciennete)
        setMontant(el.montant !== '' ? String(el.montant) : '')
        setUrl(el.url || '')
        setEditingIndex(index)
        setShowTypeOptions(false)
        setShowAncOptions(false)
        setShowModal(true)
    }

    const handleAddElement = () => {
        const newEl = {
            type,
            nom,
            quantite,
            anciennete,
            montant: montant !== '' ? parseFloat(montant) : '',
            url,
        }
        const newElements = editingIndex !== null
            ? elements.map((el, i) => i === editingIndex ? newEl : el)
            : [...elements, newEl]
        setElements(newElements)
        saveClaim({ ...getClaim(reservationId), reservationId, elements: newElements })
        setShowModal(false)
    }

    const hasIncomplete = elements.some(el => el.montant === '' || !el.anciennete)

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}>

            {/* Header */}
            <header className="flex items-center justify-between px-8 py-4 border-b border-gray-100">
                <img src="/airbnb-logo.png" alt="Airbnb" className="h-8" />
                <button
                    onClick={() => navigate('/airbnb/dashboard')}
                    className="text-sm font-medium text-gray-900 underline hover:text-gray-700 transition-colors"
                >
                    Enregistrer et quitter
                </button>
            </header>

            {/* Progress bar */}
            <div className="h-0.5 bg-gray-100">
                <div className="h-full bg-gray-800 transition-all" style={{ width: '20%' }} />
            </div>

            {/* Main */}
            <main className="flex-1 flex flex-col items-center px-6 py-12">
                <div className="w-full max-w-xl">
                    <div className="mb-8">
                        <img src="/aircover.avif" alt="AirCover pour les hôtes" className="h-9" />
                        <p className="text-xs text-gray-500 mt-1">pour les hôtes</p>
                    </div>

                    {elements.length === 0 ? (
                        <div className="mb-8">
                            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                                Ajoutons votre premier élément endommagé
                            </h1>
                            <p className="text-sm text-gray-500">
                                Vous pouvez ajouter autant d'éléments que nécessaire.
                            </p>
                        </div>
                    ) : (
                        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Aperçu de l'élément</h1>
                    )}

                    {elements.length > 0 && (
                        <div className="mb-8">
                            {hasIncomplete && (
                                <p className="text-sm font-medium text-gray-700 mb-3">Saisie incomplète des éléments</p>
                            )}
                            <div className="divide-y divide-gray-100">
                                {elements.map((el, i) => (
                                    <div key={i} className="flex items-center gap-4 py-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <FileText className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {el.nom || '(sans nom)'}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {el.type}
                                                {!el.montant
                                                    ? ' · Ajoutez un montant'
                                                    : ` · ${parseFloat(el.montant).toFixed(2)} EUR`}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => openEditModal(i)}
                                            className="text-sm font-medium text-gray-900 underline hover:text-gray-600 flex-shrink-0"
                                        >
                                            Modifier
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={openAddModal}
                        className="px-5 py-3 border border-gray-900 rounded-xl text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                    >
                        {elements.length === 0 ? 'Ajouter un élément' : 'Ajouter un autre élément'}
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 px-8 py-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(`/airbnb/aircover/demande/${reservationId}`)}
                    className="text-sm font-medium text-gray-900 underline hover:text-gray-700 transition-colors"
                >
                    ← Retour
                </button>
                <button
                    onClick={() => elements.length > 0 && navigate(`/airbnb/aircover/demande/${reservationId}/step2`)}
                    className={`px-6 py-3 rounded-xl text-sm font-semibold transition-colors ${elements.length > 0
                            ? 'bg-gray-900 text-white hover:bg-gray-700'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    Suivant →
                </button>
            </footer>

            {/* Modal overlay */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl">

                        {/* Modal header */}
                        <div className="flex items-center px-6 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-4 h-4 text-gray-700" />
                            </button>
                            <h2 className="flex-1 text-center text-base font-semibold text-gray-900 pr-8">
                                Ajoutez un élément
                            </h2>
                        </div>

                        {/* Modal body */}
                        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

                            {/* Type dropdown */}
                            <div>
                                <div
                                    className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm cursor-pointer flex items-center justify-between hover:border-gray-500 transition-colors"
                                    onClick={() => { setShowTypeOptions(!showTypeOptions); setShowAncOptions(false) }}
                                >
                                    <span className={type ? 'text-gray-900' : 'text-gray-400'}>
                                        {type || 'Que s\'est-il passé ?'}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 text-gray-500 transition-transform ${showTypeOptions ? 'rotate-180' : ''}`}
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                {showTypeOptions && (
                                    <div className="mt-1 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                        {TYPES.map(t => (
                                            <button
                                                key={t}
                                                className="w-full text-left px-4 py-3.5 text-sm hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                                                onClick={() => { setType(t); setShowTypeOptions(false) }}
                                            >
                                                <span className={t === type ? 'font-medium text-gray-900' : 'text-gray-700'}>{t}</span>
                                                {t === type && (
                                                    <span className="w-4 h-4 rounded-full border-2 border-gray-900 flex items-center justify-center">
                                                        <span className="w-2 h-2 rounded-full bg-gray-900" />
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                        <div className="px-4 py-3 text-sm text-gray-500">
                                            S'agit-il d'un autre type de problème ?{' '}
                                            <span className="font-medium text-gray-900 underline cursor-default">Plus d'options</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Rest of form — visible only once a type is chosen */}
                            {type && (
                                <>
                                    {/* Nom */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            {type === 'Élément manquant'
                                                ? 'Quel est l\'article manquant ?'
                                                : type === 'Élément endommagé'
                                                    ? 'Quel est l\'élément endommagé ?'
                                                    : 'Décrivez le problème de nettoyage'}
                                        </label>
                                        <input
                                            type="text"
                                            value={nom}
                                            onChange={e => setNom(e.target.value)}
                                            placeholder="Nom de l'élément"
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                                        />
                                    </div>

                                    {/* Quantité */}
                                    {type !== 'Nettoyage imprévu ou odeur de fumée' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                                {type === 'Élément manquant'
                                                    ? 'Combien d\'éléments sont manquants ?'
                                                    : 'Combien d\'éléments sont endommagés ?'}
                                            </label>
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => setQuantite(Math.max(1, quantite - 1))}
                                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-600 transition-colors text-lg leading-none"
                                                >
                                                    −
                                                </button>
                                                <span className="text-sm font-medium w-4 text-center">{quantite}</span>
                                                <button
                                                    onClick={() => setQuantite(quantite + 1)}
                                                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-600 transition-colors text-lg leading-none"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Ancienneté */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Quel est l'ancienneté de cet élément ?
                                        </label>
                                        <div
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm cursor-pointer flex items-center justify-between hover:border-gray-500 transition-colors"
                                            onClick={() => { setShowAncOptions(!showAncOptions); setShowTypeOptions(false) }}
                                        >
                                            <span className={anciennete ? 'text-gray-900' : 'text-gray-400'}>
                                                {anciennete || 'Ancienneté'}
                                            </span>
                                            <svg
                                                className={`w-4 h-4 text-gray-500 transition-transform ${showAncOptions ? 'rotate-180' : ''}`}
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                        {showAncOptions && (
                                            <div className="mt-1 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                                                {ANCIENNETES.map(a => (
                                                    <button
                                                        key={a}
                                                        className="w-full text-left px-4 py-3.5 text-sm hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                                                        onClick={() => { setAnciennete(a); setShowAncOptions(false) }}
                                                    >
                                                        <span className={a === anciennete ? 'font-medium text-gray-900' : 'text-gray-700'}>{a}</span>
                                                        {a === anciennete && (
                                                            <span className="w-4 h-4 rounded-full border-2 border-gray-900 flex items-center justify-center">
                                                                <span className="w-2 h-2 rounded-full bg-gray-900" />
                                                            </span>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Montant */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-1">
                                            Quelle est la valeur de cet élément ?
                                        </label>
                                        <p className="text-xs text-gray-500 mb-2">C'est ce montant qui sera demandé au voyageur.</p>
                                        <input
                                            type="number"
                                            min="0"
                                            value={montant}
                                            onChange={e => setMontant(e.target.value)}
                                            placeholder="Montant (EUR)"
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                                        />
                                        <p className="mt-2 text-xs text-gray-500 underline cursor-default">
                                            ⓘ Obtenez des conseils pour fixer un montant
                                        </p>
                                    </div>

                                    {/* Pièces justificatives */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Pièces justificatives
                                        </label>
                                        <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-3 cursor-default">
                                            <div className="w-9 h-9 flex items-center justify-center">
                                                <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">Télécharger</p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    Exemple : reçu de remplacement, reçu original, preuve de propriété
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* URL */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 mb-2">
                                            Lien vers le même élément ou un élément similaire (facultatif)
                                        </label>
                                        <input
                                            type="url"
                                            value={url}
                                            onChange={e => setUrl(e.target.value)}
                                            placeholder="URL"
                                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Modal footer */}
                        <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
                            <button
                                onClick={() => navigate('/airbnb/dashboard')}
                                className="text-sm font-medium text-gray-700 underline hover:text-gray-900"
                            >
                                Enregistrer et quitter
                            </button>
                            <button
                                onClick={handleAddElement}
                                disabled={!type || !nom}
                                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-colors ${type && nom
                                        ? 'bg-gray-900 text-white hover:bg-gray-700'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Ajoutez un élément
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AircoverStep1
