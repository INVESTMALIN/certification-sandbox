// Données des 7 sous-pages Qualité
// current / previous : tableaux de 5 points hebdomadaires (valeurs en %)

export const QUALITE_DATA = {
    globale: {
        title:           'Qualité globale',
        stat1:           '79,9%',
        stat1Label:      'Évaluations 5 étoiles',
        stat2:           '4,74',
        stat2Label:      'Évaluation générale',
        chartTitle:      'Évaluations\n5 étoiles',
        chartDesc:       'Excellent travail ! Votre évaluation pour la catégorie qualité globale est en hausse de 4,7% par rapport aux 30 jours précédents.',
        current:         [79, 80, 78, 81, 80],
        previous:        [74, 76, 75, 76, 75],
        commentaires: [
            { name: 'Benjamin', initiale: 'B', couleur: 'bg-orange-400', dates: '21-22 févr. 2026', property: 'Studio moderne centre-ville avec parking',               rating: 5, text: 'Très bien 👍' },
            { name: 'Chantal',  initiale: 'C', couleur: 'bg-teal-500',   dates: '20-22 févr. 2026', property: 'Appartement lumineux avec vue sur jardin',              rating: 5, text: 'Très agréable séjour avec un espace pour chacun des trois adultes. Merci beaucoup pour ce...' },
            { name: 'Christian',initiale: 'C', couleur: 'bg-blue-500',   dates: '19-21 févr. 2026', property: 'Balnéo Privée Wifi Fibre Chic & Détente Romantique',    rating: 5, text: 'magnifique Airbnb et tres bon cadre' },
        ],
    },

    precision: {
        title:           'Précision',
        stat1:           '82,1%',
        stat1Label:      'Évaluations 5 étoiles',
        stat2:           '4,81',
        stat2Label:      'Note Précision',
        chartTitle:      'Évaluations\n5 étoiles',
        chartDesc:       'Votre précision de description est très appréciée des voyageurs. Les informations de vos annonces correspondent bien aux attentes réelles.',
        current:         [81, 83, 82, 84, 83],
        previous:        [77, 79, 78, 80, 79],
        commentaires: [
            { name: 'Sophie',   initiale: 'S', couleur: 'bg-purple-500', dates: '18-20 févr. 2026', property: 'Studio moderne centre-ville avec parking',               rating: 5, text: 'Le logement correspond exactement aux photos. Aucune mauvaise surprise !' },
            { name: 'Marc',     initiale: 'M', couleur: 'bg-green-500',  dates: '15-18 févr. 2026', property: 'Appartement lumineux avec vue sur jardin',              rating: 5, text: 'Annonce très fidèle à la réalité, description parfaite et très complète.' },
            { name: 'Isabelle', initiale: 'I', couleur: 'bg-rose-500',   dates: '12-14 févr. 2026', property: 'Balnéo Privée Wifi Fibre Chic & Détente Romantique',    rating: 4, text: 'Conforme aux photos, quelques petits détails différents mais rien de rédhibitoire.' },
        ],
    },

    arrivee: {
        title:           'Arrivée',
        stat1:           '91,3%',
        stat1Label:      'Évaluations 5 étoiles',
        stat2:           '4,89',
        stat2Label:      'Note Arrivée',
        chartTitle:      'Évaluations\n5 étoiles',
        chartDesc:       'Votre processus d\'arrivée est l\'un de vos points forts. Les voyageurs apprécient particulièrement la facilité d\'accès et les instructions claires.',
        current:         [90, 92, 91, 93, 92],
        previous:        [85, 87, 86, 88, 87],
        commentaires: [
            { name: 'Éric',     initiale: 'É', couleur: 'bg-indigo-500', dates: '21-23 févr. 2026', property: 'Studio moderne centre-ville avec parking',               rating: 5, text: 'Check-in ultra simple grâce aux instructions très claires. La boîte à clé était parfaite !' },
            { name: 'Nathalie', initiale: 'N', couleur: 'bg-amber-500',  dates: '19-21 févr. 2026', property: 'Appartement lumineux avec vue sur jardin',              rating: 5, text: 'Arrivée sans accroc, tout était expliqué à l\'avance. Je recommande vivement.' },
            { name: 'Laurent',  initiale: 'L', couleur: 'bg-cyan-500',   dates: '16-19 févr. 2026', property: 'Balnéo Privée Wifi Fibre Chic & Détente Romantique',    rating: 5, text: 'Accès rapide et facile. Hôte disponible par message pour toute question.' },
        ],
    },

    proprete: {
        title:           'Propreté',
        stat1:           '76,4%',
        stat1Label:      'Évaluations 5 étoiles',
        stat2:           '4,68',
        stat2Label:      'Note Propreté',
        chartTitle:      'Évaluations\n5 étoiles',
        chartDesc:       'La propreté est légèrement en dessous de votre moyenne habituelle. Quelques ajustements dans votre routine de nettoyage pourraient améliorer ce score.',
        current:         [76, 77, 75, 78, 77],
        previous:        [74, 75, 73, 76, 75],
        commentaires: [
            { name: 'Pauline',  initiale: 'P', couleur: 'bg-lime-600',   dates: '20-22 févr. 2026', property: 'Studio moderne centre-ville avec parking',               rating: 5, text: 'Logement impeccable, tout était propre et bien rangé à notre arrivée.' },
            { name: 'Thomas',   initiale: 'T', couleur: 'bg-orange-500', dates: '17-20 févr. 2026', property: 'Appartement lumineux avec vue sur jardin',              rating: 4, text: 'Globalement propre. Quelques détails dans la salle de bain auraient pu être peaufinés.' },
            { name: 'Camille',  initiale: 'C', couleur: 'bg-violet-500', dates: '14-17 févr. 2026', property: 'Balnéo Privée Wifi Fibre Chic & Détente Romantique',    rating: 5, text: 'Parfait ! L\'appartement sentait très bon et était d\'une propreté irréprochable.' },
        ],
    },

    communication: {
        title:           'Communication',
        stat1:           '88,7%',
        stat1Label:      'Évaluations 5 étoiles',
        stat2:           '4,86',
        stat2Label:      'Note Communication',
        chartTitle:      'Évaluations\n5 étoiles',
        chartDesc:       'Excellent score en communication ! Votre réactivité et la qualité de vos échanges avec les voyageurs sont très appréciées.',
        current:         [88, 90, 88, 91, 89],
        previous:        [83, 85, 84, 86, 85],
        commentaires: [
            { name: 'Julie',    initiale: 'J', couleur: 'bg-pink-500',   dates: '22-24 févr. 2026', property: 'Studio moderne centre-ville avec parking',               rating: 5, text: 'Hôte très réactif, réponses rapides et utiles. Parfait du début à la fin.' },
            { name: 'Romain',   initiale: 'R', couleur: 'bg-teal-600',   dates: '18-21 févr. 2026', property: 'Appartement lumineux avec vue sur jardin',              rating: 5, text: 'Communication irréprochable. Toutes mes questions ont été répondues en moins d\'une heure.' },
            { name: 'Valérie',  initiale: 'V', couleur: 'bg-sky-500',    dates: '15-18 févr. 2026', property: 'Balnéo Privée Wifi Fibre Chic & Détente Romantique',    rating: 5, text: 'Super disponibilité de l\'hôte, très sympathique et à l\'écoute.' },
        ],
    },

    emplacement: {
        title:           'Emplacement',
        stat1:           '84,2%',
        stat1Label:      'Évaluations 5 étoiles',
        stat2:           '4,83',
        stat2Label:      'Note Emplacement',
        chartTitle:      'Évaluations\n5 étoiles',
        chartDesc:       'L\'emplacement de vos logements est très bien noté. Les voyageurs apprécient la proximité des commodités et des centres d\'intérêt locaux.',
        current:         [84, 85, 83, 86, 85],
        previous:        [80, 81, 80, 82, 81],
        commentaires: [
            { name: 'Antoine',  initiale: 'A', couleur: 'bg-emerald-500',dates: '21-23 févr. 2026', property: 'Studio moderne centre-ville avec parking',               rating: 5, text: 'Emplacement idéal en plein centre, à 5 minutes à pied de tout. Parfait !' },
            { name: 'Céline',   initiale: 'C', couleur: 'bg-fuchsia-500',dates: '19-22 févr. 2026', property: 'Appartement lumineux avec vue sur jardin',              rating: 5, text: 'Quartier super agréable, calme la nuit et animé la journée. On a adoré.' },
            { name: 'Pierre',   initiale: 'P', couleur: 'bg-red-500',    dates: '16-19 févr. 2026', property: 'Balnéo Privée Wifi Fibre Chic & Détente Romantique',    rating: 4, text: 'Bon emplacement, bien desservi par les transports. Parking disponible à proximité.' },
        ],
    },

    'qualite-prix': {
        title:           'Qualité-prix',
        stat1:           '71,3%',
        stat1Label:      'Évaluations 5 étoiles',
        stat2:           '4,59',
        stat2Label:      'Note Qualité-prix',
        chartTitle:      'Évaluations\n5 étoiles',
        chartDesc:       'Le rapport qualité-prix est votre axe d\'amélioration principal. Envisagez d\'ajuster vos tarifs ou d\'enrichir l\'expérience proposée pour renforcer ce score.',
        current:         [71, 72, 70, 73, 72],
        previous:        [69, 70, 68, 71, 70],
        commentaires: [
            { name: 'Hugo',     initiale: 'H', couleur: 'bg-yellow-600', dates: '20-22 févr. 2026', property: 'Studio moderne centre-ville avec parking',               rating: 5, text: 'Très bon rapport qualité-prix pour ce quartier. Je reviendrai sans hésiter.' },
            { name: 'Martine',  initiale: 'M', couleur: 'bg-blue-600',   dates: '17-20 févr. 2026', property: 'Appartement lumineux avec vue sur jardin',              rating: 4, text: 'Le prix est un peu élevé pour ce que c\'est, mais les prestations sont de qualité.' },
            { name: 'Franck',   initiale: 'F', couleur: 'bg-gray-500',   dates: '14-17 févr. 2026', property: 'Balnéo Privée Wifi Fibre Chic & Détente Romantique',    rating: 4, text: 'Bon séjour. Le tarif mériterait d\'être revu légèrement à la baisse pour être parfait.' },
        ],
    },
}
