import { REPARABLE_LABELS } from '../../data/airbnb/aircoverClaim'

/** Liste des éléments d'une demande AirCover (présentation du récap AirCover). */
function ElementsRecap({ elements }) {
    return (
        <div className="space-y-2 mt-2">
            {elements.map((el, i) => (
                <div key={i} className="flex items-start justify-between py-1 gap-4">
                    <div className="min-w-0">
                        <p className="text-sm text-gray-900">
                            {el.nom || '(sans nom)'}{el.quantite > 1 ? ` × ${el.quantite}` : ''}
                        </p>
                        <p className="text-xs text-gray-500">
                            {el.type}
                            {el.reparable ? ` · ${REPARABLE_LABELS[el.reparable]}` : ''}
                            {el.recu ? ` · ${el.recu === 'oui' ? 'Avec reçu' : 'Sans reçu'}` : ''}
                        </p>
                    </div>
                    <span className="text-sm text-gray-700 flex-shrink-0">
                        {el.montant !== '' && el.montant !== undefined ? `${parseFloat(el.montant).toFixed(2)} EUR` : '—'}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default ElementsRecap
