import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AirbnbVoyageurHeader from '../../../components/airbnb/AirbnbVoyageurHeader'
import ParcoursBloque from '../../../components/airbnb/ParcoursBloque'

const MESSAGES_BLOQUANTS = {
    hote: 'Seul l\'hôte ou un co-hôte disposant d\'un accès intégral à l\'annonce peut déposer une demande de remboursement.',
    dommages: 'Ce formulaire sert uniquement aux dommages ou aux frais de ménage imprévus causés par un voyageur. Pour une autre demande, passez par « Envoyer ou demander de l\'argent ».',
}

function OuiNon({ name, value, onChange }) {
    return (
        <div className="flex items-center gap-8">
            {['oui', 'non'].map(v => (
                <label key={v} className="flex items-center gap-3 cursor-pointer group">
                    <input
                        type="radio"
                        name={name}
                        value={v}
                        checked={value === v}
                        onChange={() => onChange(v)}
                        className="sr-only"
                    />
                    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${value === v ? 'border-gray-900' : 'border-gray-400 group-hover:border-gray-600'}`}>
                        {value === v && <span className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
                    </span>
                    <span className="text-sm text-gray-900">{v === 'oui' ? 'Oui' : 'Non'}</span>
                </label>
            ))}
        </div>
    )
}

/** Formulaire de déclaration de dommages (point de départ côté voyageur, sans réservation). */
function DeclarationDommages() {
    const navigate = useNavigate()
    const [hote, setHote] = useState('')
    const [dommages, setDommages] = useState('')
    const [bloque, setBloque] = useState(null) // 'hote' | 'dommages' | null

    const repondreHote = (v) => {
        if (v === 'non') {
            setHote('')
            setBloque('hote')
            return
        }
        setHote('oui')
    }

    const repondreDommages = (v) => {
        if (v === 'non') {
            setDommages('')
            setBloque('dommages')
            return
        }
        setDommages('oui')
    }

    const peutDeposer = hote === 'oui' && dommages === 'oui'

    return (
        <div className="min-h-screen bg-white flex flex-col" style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}>
            <AirbnbVoyageurHeader />

            <main className="flex-1 flex flex-col items-center px-6 py-12">
                <div className="w-full max-w-2xl">
                    <h1 className="text-3xl font-semibold text-gray-900 mb-10">
                        Formulaire de déclaration de dommages
                    </h1>

                    <fieldset className="mb-8">
                        <legend className="text-base font-semibold text-gray-900 mb-4">
                            Êtes-vous hôte ou co-hôte d'un logement avec accès intégral à l'annonce ?
                        </legend>
                        <OuiNon name="hote" value={hote} onChange={repondreHote} />
                    </fieldset>

                    {hote === 'oui' && (
                        <>
                            <fieldset className="mb-8">
                                <legend className="text-base font-semibold text-gray-900 mb-4">
                                    Vous voulez obtenir un remboursement suite à des dommages dans votre logement ou des frais de ménage imprévus à cause d'un voyageur, d'un de ses invités ou de son animal de compagnie ?
                                </legend>
                                <OuiNon name="dommages" value={dommages} onChange={repondreDommages} />
                            </fieldset>

                            <p className="text-sm text-gray-600 leading-relaxed mb-8">
                                Si les dommages sont causés par le voyageur, vous pourriez avoir droit à un remboursement en vertu de la Garantie dommages des hôtes.{' '}
                                <Link to="/airbnb/aircover" className="font-medium text-gray-900 underline">En savoir plus</Link>
                            </p>

                            <button
                                onClick={() => navigate('/airbnb/demander-paiement')}
                                disabled={!peutDeposer}
                                className={`px-6 py-3 rounded-lg text-sm font-semibold transition-colors ${peutDeposer
                                    ? 'bg-[#FF385C] text-white hover:bg-[#e0314f]'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                            >
                                Déposer une demande de remboursement
                            </button>
                        </>
                    )}
                </div>
            </main>

            {bloque && <ParcoursBloque message={MESSAGES_BLOQUANTS[bloque]} onRetour={() => setBloque(null)} />}
        </div>
    )
}

export default DeclarationDommages
