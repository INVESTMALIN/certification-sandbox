/** Avatar rond : photo si disponible, sinon initiale sur fond sombre (co-hôte de la messagerie). */
function PersonAvatar({ src, nom, className = 'w-12 h-12' }) {
    if (src) return <img src={src} alt={nom} className={`${className} rounded-full object-cover flex-shrink-0`} />
    return (
        <span aria-label={nom} className={`${className} rounded-full bg-gray-700 text-white text-sm font-semibold flex items-center justify-center flex-shrink-0`}>
            {(nom || '?').charAt(0)}
        </span>
    )
}

export default PersonAvatar
