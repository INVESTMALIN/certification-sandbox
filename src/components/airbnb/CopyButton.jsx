import { useEffect, useRef, useState } from 'react'

// Copie dans le presse-papiers, avec repli pour les contextes sans API Clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text)
        return true
    } catch {
        const area = document.createElement('textarea')
        area.value = text
        area.setAttribute('readonly', '')
        area.className = 'fixed -left-[9999px]'
        document.body.appendChild(area)
        area.select()
        const ok = document.execCommand('copy')
        document.body.removeChild(area)
        return ok
    }
}

/**
 * Bouton qui copie `value` au clic et affiche une petite bulle « Copié ».
 * `children` est le contenu cliquable (le code lui-même, ou une icône).
 */
function CopyButton({ value, label, className = '', children }) {
    const [copied, setCopied] = useState(false)
    const timer = useRef(null)

    useEffect(() => () => clearTimeout(timer.current), [])

    const handleClick = async (e) => {
        e.stopPropagation()
        if (!(await copyToClipboard(value))) return
        setCopied(true)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setCopied(false), 1500)
    }

    return (
        <span className="relative inline-flex">
            <button
                type="button"
                onClick={handleClick}
                aria-label={label || `Copier ${value}`}
                title="Copier"
                className={`cursor-pointer hover:underline ${className}`}
            >
                {children || value}
            </button>
            {copied && (
                <span
                    role="status"
                    className="absolute left-1/2 -translate-x-1/2 -top-8 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white shadow"
                >
                    Copié
                </span>
            )}
        </span>
    )
}

export default CopyButton
