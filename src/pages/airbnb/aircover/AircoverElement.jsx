import { useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { Image as ImageIcon } from 'lucide-react'
import AircoverLayout, { FooterButton } from '../../../components/airbnb/AircoverLayout'
import ReservationIntrouvable from '../../../components/airbnb/ReservationIntrouvable'
import { getReservationById } from '../../../data/airbnb/reservationLookup'
import { getClaim, updateClaim, REPARABLE_LABELS, TYPE_ENDOMMAGE } from '../../../data/airbnb/aircoverClaim'

const TYPE_MANQUANT = 'Élément manquant'
const TYPE_NETTOYAGE = 'Nettoyage imprévu ou odeur de fumée'
const TYPES = [TYPE_ENDOMMAGE, TYPE_MANQUANT, TYPE_NETTOYAGE]

const ANCIENNETES = [
    'Moins d\'un an',
    '1 an',
    '2 ans',
    '3 ans',
    '4 ans',
    '5 ans et plus',
]

const LIBELLES = {
    [TYPE_ENDOMMAGE]: {
        nom: 'Quel élément a été endommagé ?',
        aide: 'Ajoutez un élément. Exemple : une télévision',
        quantite: 'Combien d\'éléments ont été endommagés ?',
    },
    [TYPE_MANQUANT]: {
        nom: 'Quel élément est manquant ?',
        aide: 'Ajoutez un élément. Exemple : une serviette',
        quantite: 'Combien d\'éléments sont manquants ?',
    },
    [TYPE_NETTOYAGE]: {
        nom: 'Décrivez le problème de nettoyage',
        aide: 'Exemple : taches sur le canapé',
    },
}

/** Liste déroulante au style Airbnb (même rendu que l'ancienne fenêtre). */
function Dropdown({ value, placeholder, options, open, onToggle, onSelect, label }) {
    return (
        <div>
            <button
                type="button"
                aria-label={label}
                aria-expanded={open}
                className="w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm text-left cursor-pointer flex items-center justify-between hover:border-gray-500 transition-colors"
                onClick={onToggle}
            >
                <span className={value ? 'text-gray-900' : 'text-gray-400'}>{value || placeholder}</span>
                <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {open && (
                <div className="mt-1 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    {options.map(o => (
                        <button
                            type="button"
                            key={o}
                            className="w-full text-left px-4 py-3.5 text-sm hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                            onClick={() => onSelect(o)}
                        >
                            <span className={o === value ? 'font-medium text-gray-900' : 'text-gray-700'}>{o}</span>
                            {o === value && (
                                <span className="w-4 h-4 rounded-full border-2 border-gray-900 flex items-center justify-center">
                                    <span className="w-2 h-2 rounded-full bg-gray-900" />
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

/**
 * Formulaire pleine page d'un élément (ajout ou modification).
 * Route : .../element/nouveau ou .../element/:index
 */
function AircoverElement() {
    const { reservationId, index } = useParams()
    const navigate = useNavigate()

    const claim = getClaim(reservationId)
    const isNew = index === 'nouveau'
    const editingIndex = isNew ? null : Number(index)
    const existing = isNew ? null : claim.elements[editingIndex]

    const [type, setType] = useState(existing?.type || TYPE_ENDOMMAGE)
    const [openList, setOpenList] = useState(null) // 'type' | 'anciennete' | null
    const [nom, setNom] = useState(existing?.nom || '')
    const [quantite, setQuantite] = useState(existing?.quantite || 1)
    const [reparable, setReparable] = useState(existing?.reparable || '')
    const [anciennete, setAnciennete] = useState(existing?.anciennete || '')
    const [montant, setMontant] = useState(existing && existing.montant !== '' ? String(existing.montant) : '')
    const [url, setUrl] = useState(existing?.url || '')

    const reservation = getReservationById(reservationId)
    if (!reservation) return <ReservationIntrouvable />
    // Index inexistant (brouillon vidé, URL modifiée) : retour à l'aperçu
    if (!isNew && !existing) return <Navigate to={`/airbnb/aircover/demande/${reservationId}/elements`} replace />

    const isFirst = claim.elements.length === 0
    const libelles = LIBELLES[type]
    const avecQuantite = type !== TYPE_NETTOYAGE
    const avecReparation = type === TYPE_ENDOMMAGE
    const complet = nom.trim() !== '' && (!avecReparation || reparable !== '')

    const handleEnregistrer = () => {
        const element = {
            type,
            nom: nom.trim(),
            quantite: avecQuantite ? quantite : 1,
            reparable: avecReparation ? reparable : '',
            anciennete,
            montant: montant !== '' ? parseFloat(montant) : '',
            url,
        }
        const elements = isNew
            ? [...claim.elements, element]
            : claim.elements.map((el, i) => (i === editingIndex ? element : el))
        updateClaim(reservationId, { elements })
        navigate(`/airbnb/aircover/demande/${reservationId}/elements`)
    }

    const handleRetour = () => {
        navigate(isFirst
            ? `/airbnb/aircover/demande/${reservationId}/message`
            : `/airbnb/aircover/demande/${reservationId}/elements`)
    }

    const titre = !isNew ? 'Modifiez cet élément' : isFirst ? 'Ajoutez votre premier élément' : 'Ajoutez un autre élément'

    return (
        <AircoverLayout
            step={3}
            onRetour={handleRetour}
            footerAction={
                <FooterButton onClick={handleEnregistrer} disabled={!complet}>
                    {isNew ? 'Ajouter l\'élément' : 'Enregistrer'}
                </FooterButton>
            }
        >
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">{titre}</h1>
            {isNew && isFirst && (
                <p className="text-sm text-gray-500 mb-8">Vous pourrez ensuite ajouter d'autres éléments.</p>
            )}

            <div className="space-y-8 mt-8">
                {/* Que s'est-il passé ? */}
                <div>
                    <p className="text-base font-semibold text-gray-900 mb-3">Que s'est-il passé ?</p>
                    <Dropdown
                        label="Que s'est-il passé ?"
                        value={type}
                        placeholder="Que s'est-il passé ?"
                        options={TYPES}
                        open={openList === 'type'}
                        onToggle={() => setOpenList(openList === 'type' ? null : 'type')}
                        onSelect={t => { setType(t); setOpenList(null) }}
                    />
                </div>

                {/* Nom de l'élément */}
                <div>
                    <p className="text-base font-semibold text-gray-900 mb-1">{libelles.nom}</p>
                    <p className="text-sm text-gray-500 mb-3">{libelles.aide}</p>
                    <input
                        type="text"
                        value={nom}
                        onChange={e => setNom(e.target.value)}
                        placeholder="Nom de l'élément"
                        aria-label="Nom de l'élément"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                    />
                </div>

                {/* Quantité */}
                {avecQuantite && (
                    <div className="flex items-center justify-between">
                        <p className="text-base font-semibold text-gray-900">{libelles.quantite}</p>
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                aria-label="Diminuer"
                                onClick={() => setQuantite(Math.max(1, quantite - 1))}
                                disabled={quantite <= 1}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-lg leading-none"
                            >
                                −
                            </button>
                            <span className="text-sm font-medium w-4 text-center">{quantite}</span>
                            <button
                                type="button"
                                aria-label="Augmenter"
                                onClick={() => setQuantite(quantite + 1)}
                                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-gray-600 transition-colors text-lg leading-none"
                            >
                                +
                            </button>
                        </div>
                    </div>
                )}

                {/* Photos ou vidéo (envoi simulé, comme les pièces justificatives) */}
                <div>
                    <p className="text-base font-semibold text-gray-900 mb-1">Photos ou vidéo présentant les dommages</p>
                    <p className="text-sm text-gray-500 mb-3">
                        Ajoutez des détails en plan rapproché des dommages, ainsi qu'une vue d'ensemble de l'élément dans votre logement.{' '}
                        <span className="font-medium text-gray-900 underline cursor-default">Obtenir des conseils</span>
                    </p>
                    <div className="inline-flex items-center gap-2 px-5 py-3 border border-gray-900 rounded-xl text-sm font-medium text-gray-900 cursor-default">
                        <ImageIcon className="w-4 h-4" />
                        Envoyer
                    </div>
                </div>

                {/* Réparable ou à remplacer */}
                {avecReparation && (
                    <div>
                        <p className="text-base font-semibold text-gray-900 mb-3">Le bien peut-il être réparé ?</p>
                        <div className="space-y-3">
                            {Object.entries(REPARABLE_LABELS).map(([valeur, label]) => (
                                <label key={valeur} className="flex items-center gap-4 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="reparable"
                                        value={valeur}
                                        checked={reparable === valeur}
                                        onChange={() => setReparable(valeur)}
                                        className="sr-only"
                                    />
                                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${reparable === valeur ? 'border-gray-900' : 'border-gray-400 group-hover:border-gray-600'}`}>
                                        {reparable === valeur && <span className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
                                    </span>
                                    <span className="text-sm text-gray-900">{label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                <div className="border-t border-gray-200" />

                {/* Ancienneté */}
                <div>
                    <p className="text-base font-semibold text-gray-900 mb-3">Quel est l'ancienneté de cet élément ?</p>
                    <Dropdown
                        label="Ancienneté"
                        value={anciennete}
                        placeholder="Ancienneté"
                        options={ANCIENNETES}
                        open={openList === 'anciennete'}
                        onToggle={() => setOpenList(openList === 'anciennete' ? null : 'anciennete')}
                        onSelect={a => { setAnciennete(a); setOpenList(null) }}
                    />
                </div>

                {/* Montant */}
                <div>
                    <p className="text-base font-semibold text-gray-900 mb-1">Quelle est la valeur de cet élément ?</p>
                    <p className="text-sm text-gray-500 mb-3">C'est ce montant qui sera demandé au voyageur.</p>
                    <input
                        type="number"
                        min="0"
                        value={montant}
                        onChange={e => setMontant(e.target.value)}
                        placeholder="Montant (EUR)"
                        aria-label="Montant (EUR)"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                    />
                    <p className="mt-2 text-xs text-gray-500 underline cursor-default">
                        ⓘ Obtenez des conseils pour fixer un montant
                    </p>
                </div>

                {/* Pièces justificatives (simulé) */}
                <div>
                    <p className="text-base font-semibold text-gray-900 mb-3">Pièces justificatives</p>
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

                {/* Lien */}
                <div>
                    <p className="text-base font-semibold text-gray-900 mb-3">
                        Lien vers le même élément ou un élément similaire (facultatif)
                    </p>
                    <input
                        type="url"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        placeholder="URL"
                        aria-label="URL"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                    />
                </div>
            </div>
        </AircoverLayout>
    )
}

// Remonte le formulaire à chaque changement d'élément pour réinitialiser les champs
function AircoverElementRoute() {
    const { reservationId, index } = useParams()
    return <AircoverElement key={`${reservationId}-${index}`} />
}

export default AircoverElementRoute
