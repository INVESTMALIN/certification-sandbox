import { useEffect } from 'react'
import { X } from 'lucide-react'

/**
 * Fenêtre centrée de choix unique à boutons radio (ex. « Que s'est-il passé ? »,
 * « Ancienneté de l'élément »). Choisir une option la sélectionne et ferme la fenêtre.
 */
function ChoixModal({ titre, options, value, onSelect, onClose, footer }) {
    useEffect(() => {
        const onKeyDown = (e) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [onClose])

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div
                role="dialog"
                aria-modal="true"
                aria-label={titre}
                className="bg-white rounded-2xl w-full max-w-md max-h-[80vh] flex flex-col shadow-2xl"
                style={{ fontFamily: 'Circular, -apple-system, BlinkMacSystemFont, Roboto, sans-serif' }}
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center px-6 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Fermer"
                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-4 h-4 text-gray-700" />
                    </button>
                    <h2 className="flex-1 text-center text-base font-semibold text-gray-900 pr-8">{titre}</h2>
                </div>

                <div role="radiogroup" aria-label={titre} className="flex-1 overflow-y-auto px-6 py-2 divide-y divide-gray-100">
                    {options.map(option => (
                        <button
                            type="button"
                            role="radio"
                            aria-checked={option === value}
                            key={option}
                            onClick={() => onSelect(option)}
                            className="w-full flex items-center justify-between py-4 text-left text-sm text-gray-900"
                        >
                            <span>{option}</span>
                            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${option === value ? 'border-gray-900' : 'border-gray-400'}`}>
                                {option === value && <span className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
                            </span>
                        </button>
                    ))}
                </div>

                {footer && (
                    <div className="border-t border-gray-100 px-6 py-4 flex-shrink-0 text-sm text-gray-600">{footer}</div>
                )}
            </div>
        </div>
    )
}

export default ChoixModal
