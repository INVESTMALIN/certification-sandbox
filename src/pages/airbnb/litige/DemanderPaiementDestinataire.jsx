import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DemandePaiementLayout from '../../../components/airbnb/DemandePaiementLayout'
import ParcoursBloque from '../../../components/airbnb/ParcoursBloque'

const MESSAGE_HOTE = 'Ce parcours concerne les demandes faites en tant que voyageur. Ici, vous êtes l\'hôte : choisissez « Un voyageur ayant récemment séjourné chez moi ».'

/** « À qui demandez-vous un paiement ? » */
function DemanderPaiementDestinataire() {
    const navigate = useNavigate()
    const [bloque, setBloque] = useState(false)

    const options = [
        {
            key: 'hote',
            label: 'L\'hôte d\'un de mes récents séjours, expériences ou services',
            onSelect: () => setBloque(true),
        },
        {
            key: 'voyageur',
            label: 'Un voyageur ayant récemment séjourné chez moi',
            onSelect: () => navigate('/airbnb/demander-paiement/reservation'),
        },
    ]

    return (
        <>
            <DemandePaiementLayout progress="w-1/6" onRetour={() => navigate('/airbnb/declaration-dommages')}>
                <h1 className="text-3xl font-semibold text-gray-900 mb-8 leading-tight">
                    À qui demandez-vous un paiement ?
                </h1>
                <div className="divide-y divide-gray-200 border-y border-gray-200">
                    {options.map(({ key, label, onSelect }) => (
                        <div key={key} className="flex items-center justify-between gap-6 py-5">
                            <p className="text-base text-gray-900">{label}</p>
                            <button
                                onClick={onSelect}
                                className="px-4 py-2 border border-gray-900 rounded-lg text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex-shrink-0"
                            >
                                Sélectionner
                            </button>
                        </div>
                    ))}
                </div>
            </DemandePaiementLayout>

            {bloque && <ParcoursBloque message={MESSAGE_HOTE} onRetour={() => setBloque(false)} />}
        </>
    )
}

export default DemanderPaiementDestinataire
