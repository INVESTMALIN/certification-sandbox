import { FileText } from 'lucide-react'

/** Tuile de fichier joint : vignette si image, sinon icône document, puis nom. */
export function FichierTuile({ fichier }) {
    return (
        <div className="w-28">
            <div className="w-28 h-28 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden flex items-center justify-center">
                {fichier.image
                    ? <img src={fichier.image} alt={fichier.nom} className="w-full h-full object-cover" />
                    : <FileText className="w-8 h-8 text-gray-400" />}
            </div>
            <p className="text-xs text-gray-700 mt-1.5 truncate" title={fichier.nom}>{fichier.nom}</p>
        </div>
    )
}

export function Fichiers({ fichiers }) {
    if (!fichiers || fichiers.length === 0) return <p className="text-sm text-gray-500">Aucune pièce jointe</p>
    return (
        <div className="flex flex-wrap gap-3">
            {fichiers.map(f => <FichierTuile key={f.nom} fichier={f} />)}
        </div>
    )
}

/**
 * Étape de chronologie : coche noire (faite), point gris (en cours)
 * ou icône personnalisée, reliées par un trait vertical.
 */
export function Etape({ type = 'fait', icon: Icon, dernier, children }) {
    return (
        <li className="flex gap-4 relative">
            {!dernier && <span className="absolute left-[11px] top-7 bottom-0 w-0.5 bg-gray-200" />}
            {type === 'attente' ? (
                <span className="w-6 h-6 flex items-center justify-center flex-shrink-0 z-10">
                    <span className="w-3 h-3 rounded-full bg-gray-300" />
                </span>
            ) : Icon ? (
                <span className="w-6 h-6 rounded-full bg-white border border-gray-900 flex items-center justify-center flex-shrink-0 z-10">
                    <Icon className="w-3.5 h-3.5 text-gray-900" />
                </span>
            ) : (
                <span className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 z-10">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </span>
            )}
            <div className="flex-1 min-w-0 pb-6">{children}</div>
        </li>
    )
}
