import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        // Vérifier le mot de passe
        const correctPassword = import.meta.env.VITE_APP_PASSWORD

        if (password === correctPassword) {
            // Authentification réussie
            localStorage.setItem('certification_sandbox_auth', 'true')
            navigate('/choose-platform')
        } else {
            // Mot de passe incorrect
            setError('Mot de passe incorrect. Veuillez réessayer.')
            setIsLoading(false)
            setPassword('')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#003580] to-[#0071c2] flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Card */}
                <div className="bg-white rounded-lg shadow-2xl p-8">
                    {/* Logo et titre */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-[#003580] mb-2">
                            Certification Sandbox
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Letahost / Invest Malin
                        </p>
                    </div>

                    {/* Formulaire */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Mot de passe d'accès
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`
                  w-full px-4 py-3 border rounded-lg text-sm
                  focus:outline-none focus:ring-2 focus:ring-[#0071c2] focus:border-transparent
                  ${error ? 'border-red-500' : 'border-gray-300'}
                `}
                                placeholder="Entrez le mot de passe"
                                required
                                disabled={isLoading}
                            />

                            {error && (
                                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                    {error}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !password}
                            className={`
                w-full py-3 rounded-lg font-semibold text-white
                transition-all duration-200
                ${isLoading || !password
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-[#0071c2] hover:bg-[#005999] active:scale-95'
                                }
              `}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Vérification...
                                </span>
                            ) : (
                                'Se connecter'
                            )}
                        </button>
                    </form>

                    {/* Info */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-xs text-gray-600 text-center leading-relaxed">
                            <svg className="inline w-4 h-4 mr-1 text-[#0071c2]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Cet espace est réservé aux apprenants de la certification Conciergerie 2.0.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-white text-xs mt-6 opacity-80">
                    © 2026 Letahost / Invest Malin - Tous droits réservés
                </p>
            </div>
        </div>
    )
}

export default Login