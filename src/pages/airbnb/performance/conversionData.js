// Données des 5 sous-pages Conversion
// tableColType : 'badge-pct' | 'dash' | 'number'
//   badge-pct → badge circulaire "0%"
//   dash      → tiret "—"
//   number    → valeur entière "0"

export const CONVERSION_DATA = {
    'conversion-reservation': {
        title: 'Conversion en réservation',
        stats: [
            { value: '0.67%',  label: 'Taux de conversion moyen global' },
            { value: '53.3%',  label: 'Taux d\'impression en première page des résultats de recherche' },
            { value: '17.53%', label: 'Moyenne de conversion des recherches vers l\'annonce' },
            { value: '3.80%',  label: 'Moyenne de conversion de l\'annonce à la réservation' },
        ],
        chartTitle: 'Taux de\nconversion\nmoyen global',
        chartDesc:  'Pour 437 annonces, la catégorie taux de conversion moyen global est en hausse de 0,09% par rapport aux 30 jours précédents pour la période suivante : 26 janv. – 25 févr.',
        current:    [0.60, 0.70, 0.65, 0.70, 0.72],
        previous:   [0.50, 0.55, 0.60, 0.58, 0.63],
        yMax:       10,
        yUnit:      '%',
        tableCol:      'Taux',
        tableColType:  'badge-pct',
        modifiers: {
            'prop_airbnb_002': '↓ -4.67%',
            'prop_airbnb_003': '↓ -0.38%',
            'prop_airbnb_006': '↓ -0.84%',
        },
    },

    'delai-arrivee': {
        title: 'Délai entre réservation et arrivée',
        stats: [
            { value: '13.8 jours', label: 'Délai moyen entre réservation et arrivée' },
        ],
        chartTitle: 'Délai moyen\nentre réservation\net arrivée',
        chartDesc:  'Pour 437 annonces, la catégorie délai moyen entre réservation et arrivée était en baisse de 0,9 jours par rapport aux 30 jours précédents pour la période suivante : 26 janv. – 25 févr.',
        current:    [11, 10.5, 10, 13.5, 16],
        previous:   [16, 14, 13, 12.5, 12],
        yMax:       21.4,
        yUnit:      'j',
        tableCol:      'Moyenne',
        tableColType:  'dash',
        modifiers:  {},
    },

    'voyageurs-recurrents': {
        title: 'Voyageurs récurrents',
        stats: [
            { value: '5%', label: 'Taux moyen de récurrence des voyageurs' },
        ],
        chartTitle: 'Taux moyen de\nrécurrence des\nvoyageurs',
        chartDesc:  'Pour 437 annonces, la catégorie taux moyen de voyageurs récurrents était en baisse de 0% par rapport aux 30 jours précédents pour la période suivante : 26 janv. – 25 févr.',
        current:    [5, 5.2, 4.8, 5.1, 5],
        previous:   [7, 9, 10, 8, 7],
        yMax:       20,
        yUnit:      '%',
        tableCol:      'Taux',
        tableColType:  'badge-pct',
        modifiers:  {},
    },

    'vues': {
        title: 'Nombre de vues',
        stats: [
            { value: '230',  label: 'Nombre moyen de vues' },
            { value: '1311', label: 'Moyenne des impressions sur la première page des résultats de recherche' },
        ],
        chartTitle: 'Nombre moyen\nde vues',
        chartDesc:  'Pour 437 annonces, la catégorie nombre moyen de vues était en baisse de 14 485 par rapport aux 30 jours précédents pour la période suivante : 26 janv. – 25 févr.',
        current:    [14000, 15000, 14500, 16000, 15500],
        previous:   [45000, 42000, 25000, 18000, 15000],
        yMax:       59859,
        yUnit:      '',
        tableCol:      'Total',
        tableColType:  'number',
        modifiers: {
            'prop_airbnb_005': '-20',
            'prop_airbnb_006': '-23',
        },
    },

    'wish-lists': {
        title: 'Ajouts aux wish lists',
        stats: [
            { value: '17', label: 'Moyenne des ajouts aux wish lists' },
        ],
        chartTitle: 'Moyenne des\najouts aux\nwish lists',
        chartDesc:  'Pour 437 annonces, la catégorie moyenne des ajouts aux wish lists est en hausse de 1 345 par rapport aux 30 jours précédents pour la période suivante : 26 janv. – 25 févr.',
        current:    [1584, 1600, 1650, 1700, 528],
        previous:   [1056, 1200, 1300, 1500, 1584],
        yMax:       2112,
        yUnit:      '',
        tableCol:      'Total',
        tableColType:  'number',
        modifiers: {
            'prop_airbnb_004': '-7',
            'prop_airbnb_005': '-1',
            'prop_airbnb_006': '-2',
        },
    },
}
