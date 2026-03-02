// Données des 4 sous-pages Occupation et tarifs
// current / previous : 5 points hebdomadaires dans l'unité de yUnit
// modifiers : map propertyId → valeur affichée en rouge dans la colonne Modifier

export const OCCUPATION_DATA = {
    'taux-occupation': {
        title:      'Taux d\'occupation',
        stats: [
            { value: '42.4%', label: 'Taux d\'occupation moyen' },
            { value: '8',     label: 'Nombre moyen de nuits réservées' },
            { value: '11',    label: 'Nombre moyen de nuits bloquées' },
            { value: '11',    label: 'Nombre moyen de nuits non réservées' },
            { value: '2',     label: 'Nombre moyen d\'arrivées' },
        ],
        chartTitle: 'Taux\nd\'occupation\nmoyen',
        chartDesc:  'Pour 437 annonces, la catégorie taux d\'occupation moyen est en hausse de 0,4% par rapport aux 30 jours précédents pour la période suivante : 26 janv. – 25 févr.',
        current:    [42, 39, 37, 38, 37],
        previous:   [60, 50, 43, 38, 36],
        yMax:       80,
        yUnit:      '%',
        tableCol:   'Taux',
        modifiers: {
            'prop_airbnb_002': '↓ -16.1%',
            'prop_airbnb_003': '↓ -10.7%',
            'prop_airbnb_006': '↓ -17.9%',
        },
    },

    'taux-annulation': {
        title:      'Taux d\'annulation',
        stats: [
            { value: '7.1%', label: 'Taux d\'annulation global' },
        ],
        chartTitle: 'Taux\nd\'annulation\nglobal',
        chartDesc:  'Pour 437 annonces, la catégorie taux d\'annulation global était en baisse de 2,7% par rapport aux 30 jours précédents pour la période suivante : 26 janv. – 25 févr.',
        current:    [7, 6.5, 6.2, 5.8, 5],
        previous:   [10, 9.5, 9, 8.5, 8],
        yMax:       20,
        yUnit:      '%',
        tableCol:   'Taux',
        modifiers: {
            'prop_airbnb_002': '↓ -8.7%',
        },
    },

    'duree-sejour': {
        title:      'Durée du séjour',
        stats: [
            { value: '3.4 jours', label: 'Durée moyenne du séjour' },
        ],
        chartTitle: 'Durée\nmoyenne\ndu séjour',
        chartDesc:  'Pour 437 annonces, la catégorie durée moyenne de séjour est en hausse de 0,1 jours par rapport aux 30 jours précédents pour la période suivante : 26 janv. – 25 févr.',
        current:    [3.2, 3.44, 3.0, 3.3, 3.4],
        previous:   [3.44, 3.5, 3.4, 3.35, 3.44],
        yMax:       4.6,
        yUnit:      'j',
        tableCol:   'Moyenne',
        modifiers:  {},
    },

    'tarif-nuit': {
        title:      'Tarif par nuit',
        stats: [
            { value: '87€', label: 'Tarif moyen par nuit' },
        ],
        chartTitle: 'Tarif\nmoyen\npar nuit',
        chartDesc:  'Pour 437 annonces, la catégorie tarif moyen par nuit est en hausse de 3,2€ par rapport aux 30 jours précédents pour la période suivante : 26 janv. – 25 févr.',
        current:    [85, 88, 84, 91, 87],
        previous:   [80, 83, 81, 86, 84],
        yMax:       120,
        yUnit:      '€',
        tableCol:   'Tarif',
        modifiers: {
            'prop_airbnb_003': '↓ -12.3%',
        },
    },
}
