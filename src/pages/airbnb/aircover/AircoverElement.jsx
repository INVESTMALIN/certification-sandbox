import { useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { Upload } from 'lucide-react'
import AircoverLayout, { FooterButton } from '../../../components/airbnb/AircoverLayout'
import ChoixModal from '../../../components/airbnb/ChoixModal'
import ParcoursBloque from '../../../components/airbnb/ParcoursBloque'
import ReservationIntrouvable from '../../../components/airbnb/ReservationIntrouvable'
import { getReservationById } from '../../../data/airbnb/reservationLookup'
import {
    getClaim, updateClaim, isElementIncomplete, needsReparable, needsRecu,
    REPARABLE_LABELS, RECU_LABELS, TYPES, TYPE_ENDOMMAGE, TYPE_MANQUANT, TYPE_NETTOYAGE,
} from '../../../data/airbnb/aircoverClaim'

// Liste défilante de la fenêtre « Ancienneté de l'élément »
const ANCIENNETES = [
    'Moins d\'un an',
    ...Array.from({ length: 9 }, (_, i) => `${i + 1} an${i > 0 ? 's' : ''}`),
    '10 ans ou plus',
]

const MESSAGE_PLUS_OPTIONS = 'Les autres types de demandes ne sont pas disponibles dans cet exercice. Revenez en arrière pour choisir l\'une des catégories couvertes par la Garantie dommages des hôtes.'

// Libellés propres à chaque type (la vidéo ne montre que « Élément endommagé »)
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

/** Champ qui ouvre une fenêtre de choix (rendu d'un select Airbnb). */
function ChampChoix({ label, value, placeholder, onClick }) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 min-h-[52px] text-sm text-left flex items-center justify-between hover:border-gray-500 transition-colors"
        >
            {/* Libellé flottant au-dessus de la valeur, comme les champs Airbnb */}
            {value ? (
                <span className="flex flex-col">
                    <span aria-hidden="true" className="text-xs text-gray-500">{placeholder}</span>
                    <span className="text-gray-900">{value}</span>
                </span>
            ) : (
                <span className="text-gray-400">{placeholder}</span>
            )}
            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
        </button>
    )
}

/** Groupe de boutons radio au style Airbnb. */
function Radios({ name, labels, value, onChange }) {
    return (
        <div className="space-y-3">
            {Object.entries(labels).map(([valeur, label]) => (
                <label key={valeur} className="flex items-center gap-4 cursor-pointer group">
                    <input
                        type="radio"
                        name={name}
                        value={valeur}
                        checked={value === valeur}
                        onChange={() => onChange(valeur)}
                        className="sr-only"
                    />
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${value === valeur ? 'border-gray-900' : 'border-gray-400 group-hover:border-gray-600'}`}>
                        {value === valeur && <span className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
                    </span>
                    <span className="text-sm text-gray-900">{label}</span>
                </label>
            ))}
        </div>
    )
}

/** Bouton d'envoi de fichier simulé (flèche vers le haut). */
function EnvoiSimule() {
    return (
        <div className="inline-flex items-center gap-2 px-5 py-3 border border-gray-900 rounded-xl text-sm font-medium text-gray-900 cursor-default">
            <Upload className="w-4 h-4" />
            Envoyer
        </div>
    )
}

function Question({ titre, aide, children }) {
    return (
        <div>
            <p className="text-base font-semibold text-gray-900 mb-1">{titre}</p>
            {aide && <p className="text-sm text-gray-500 mb-3">{aide}</p>}
            {!aide && <div className="mb-3" />}
            {children}
        </div>
    )
}

/**
 * Formulaire pleine page d'un élément (ajout ou modification), dans l'ordre
 * et avec les textes de la vraie procédure. Route : .../element/nouveau ou .../element/:index
 */
function AircoverElement() {
    const { reservationId, index } = useParams()
    const navigate = useNavigate()

    const claim = getClaim(reservationId)
    const isNew = index === 'nouveau'
    const editingIndex = isNew ? null : Number(index)
    const existing = isNew ? null : claim.elements[editingIndex]

    const [type, setType] = useState(existing?.type || TYPE_ENDOMMAGE)
    const [fenetre, setFenetre] = useState(null) // 'type' | 'anciennete' | null
    const [plusOptions, setPlusOptions] = useState(false)
    const [nom, setNom] = useState(existing?.nom || '')
    const [quantite, setQuantite] = useState(existing?.quantite || 1)
    const [reparable, setReparable] = useState(existing?.reparable || '')
    const [anciennete, setAnciennete] = useState(existing?.anciennete || '')
    const [montant, setMontant] = useState(existing && existing.montant !== '' && existing.montant != null ? String(existing.montant) : '')
    const [recu, setRecu] = useState(existing?.recu || '')
    const [url, setUrl] = useState(existing?.url || '')

    const reservation = getReservationById(reservationId)
    if (!reservation) return <ReservationIntrouvable />
    // Index inexistant (brouillon vidé, URL modifiée) : retour à l'aperçu
    if (!isNew && !existing) return <Navigate to={`/airbnb/aircover/demande/${reservationId}/elements`} replace />

    const isFirst = claim.elements.length === 0
    const libelles = LIBELLES[type]
    const avecQuantite = type !== TYPE_NETTOYAGE
    const avecReparation = needsReparable(type)
    const avecRecu = needsRecu(type)

    const element = {
        type,
        nom: nom.trim(),
        quantite: avecQuantite ? quantite : 1,
        reparable: avecReparation ? reparable : '',
        anciennete,
        montant: montant !== '' ? parseFloat(montant) : '',
        recu: avecRecu ? recu : '',
        // Le lien n'a de sens que sans reçu (ou pour le nettoyage)
        url: !avecRecu || recu === 'non' ? url : '',
    }
    const complet = !isElementIncomplete(element)

    const handleSuivant = () => {
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

    const blocLien = (
        <Question
            titre="Lien vers le même élément ou un élément similaire"
            aide="Ajoutez un lien vers le même élément ou un élément similaire en vente."
        >
            <input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="URL"
                aria-label="URL"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors"
            />
        </Question>
    )

    return (
        <>
            <AircoverLayout
                step={3}
                onRetour={handleRetour}
                footerAction={<FooterButton onClick={handleSuivant} disabled={!complet}>Suivant</FooterButton>}
            >
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">{titre}</h1>
                {isNew && isFirst && (
                    <p className="text-sm text-gray-500">Vous pourrez ensuite ajouter d'autres éléments.</p>
                )}

                <div className="space-y-8 mt-8">
                    {/* 2. Que s'est-il passé ? */}
                    <ChampChoix
                        label="Que s'est-il passé ?"
                        value={type}
                        placeholder="Que s'est-il passé ?"
                        onClick={() => setFenetre('type')}
                    />

                    {/* 3. Nom de l'élément */}
                    <Question titre={libelles.nom} aide={libelles.aide}>
                        <input
                            type="text"
                            value={nom}
                            onChange={e => setNom(e.target.value)}
                            placeholder="Nom de l'élément"
                            aria-label="Nom de l'élément"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                        />
                    </Question>

                    {/* 4. Quantité */}
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

                    {/* 5. Photos ou vidéo (envoi simulé) */}
                    <div>
                        <p className="text-base font-semibold text-gray-900 mb-1">Photos ou vidéo présentant les dommages</p>
                        <p className="text-sm text-gray-500 mb-3">
                            Ajoutez des plans rapprochés des dommages, ainsi qu'une vue d'ensemble de l'élément dans votre logement.{' '}
                            <span className="font-medium text-gray-900 underline cursor-default">Obtenir des conseils</span>
                        </p>
                        <EnvoiSimule />
                    </div>

                    {/* 6. Réparable ou à remplacer */}
                    {avecReparation && (
                        <Question titre="Le bien peut-il être réparé ?">
                            <Radios name="reparable" labels={REPARABLE_LABELS} value={reparable} onChange={setReparable} />
                        </Question>
                    )}

                    {/* 7. Ancienneté */}
                    <Question titre="Quelle est l'ancienneté de cet élément ?">
                        <ChampChoix
                            label="Ancienneté de l'élément"
                            value={anciennete}
                            placeholder="Ancienneté de l'élément"
                            onClick={() => setFenetre('anciennete')}
                        />
                    </Question>

                    {/* 8. Valeur */}
                    <Question
                        titre="Quelle est la valeur de l'élément ?"
                        aide="Estimez la valeur actuelle en tenant compte de l'ancienneté et de l'état de l'élément au moment des dommages."
                    >
                        <input
                            type="number"
                            min="0"
                            value={montant}
                            onChange={e => setMontant(e.target.value)}
                            placeholder="Montant (EUR)"
                            aria-label="Montant (EUR)"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-900 transition-colors"
                        />
                    </Question>

                    {/* 9. Reçu : un seul des deux blocs selon la réponse */}
                    {avecRecu && (
                        <>
                            <Question titre="Avez-vous un reçu précisant le coût de l'élément d'origine ou de remplacement ?">
                                <Radios name="recu" labels={RECU_LABELS} value={recu} onChange={setRecu} />
                            </Question>
                            {recu === 'oui' && (
                                <Question
                                    titre="Pièces justificatives"
                                    aide="Pour justifier le montant demandé, vous devez nous transmettre un reçu d'achat de l'élément d'origine ou de remplacement."
                                >
                                    <EnvoiSimule />
                                </Question>
                            )}
                            {recu === 'non' && blocLien}
                        </>
                    )}

                    {/* Nettoyage : pas de question du reçu, justificatifs et lien comme avant */}
                    {!avecRecu && (
                        <>
                            <Question
                                titre="Pièces justificatives"
                                aide="Exemple : reçu de remplacement, reçu original, preuve de propriété"
                            >
                                <EnvoiSimule />
                            </Question>
                            {blocLien}
                        </>
                    )}
                </div>
            </AircoverLayout>

            {fenetre === 'type' && (
                <ChoixModal
                    titre="Que s'est-il passé ?"
                    options={TYPES}
                    value={type}
                    onSelect={t => { setType(t); setFenetre(null) }}
                    onClose={() => setFenetre(null)}
                    footer={
                        <>
                            <p>La Garantie dommages des hôtes couvre les éléments de ces catégories.</p>
                            <button
                                type="button"
                                onClick={() => { setFenetre(null); setPlusOptions(true) }}
                                className="mt-1 font-semibold text-gray-900 underline"
                            >
                                Plus d'options
                            </button>
                        </>
                    }
                />
            )}
            {fenetre === 'anciennete' && (
                <ChoixModal
                    titre="Ancienneté de l'élément"
                    options={ANCIENNETES}
                    value={anciennete}
                    onSelect={a => { setAnciennete(a); setFenetre(null) }}
                    onClose={() => setFenetre(null)}
                />
            )}
            {plusOptions && <ParcoursBloque message={MESSAGE_PLUS_OPTIONS} onRetour={() => setPlusOptions(false)} />}
        </>
    )
}

// Remonte le formulaire à chaque changement d'élément pour réinitialiser les champs
function AircoverElementRoute() {
    const { reservationId, index } = useParams()
    return <AircoverElement key={`${reservationId}-${index}`} />
}

export default AircoverElementRoute
