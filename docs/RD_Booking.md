# PRD - Clone Booking.com (Certification Sandbox)

**Projet** : Certification Sandbox - Simulateur Booking.com  
**Client** : Letahost / Invest Malin  
**Date de création** : 2026-01-22
**Statut** : Développement en cours v1.0  
**Responsable** : Julien (Product Owner)  
**Supervision** : Victoria (Letahost)

---

## 🎯 Objectif du projet

Créer une réplique fonctionnelle et visuellement fidèle de l'interface Booking.com (extranet propriétaire) pour permettre aux apprenants de la formation "Conciergerie 2.0" de s'entraîner sans risque sur un environnement simulé.

### Public cible
- Apprenants de la certification Invest Malin
- Profil : professionnels en reconversion, pas toujours tech-savvy
- Besoin : interface familière pour faciliter la transition vers la vraie plateforme Booking.com

---

## 📐 Principes de conception

### Fidélité visuelle
- **Niveau requis** : Haute fidélité (pas pixel-perfect, mais très proche de l'original)
- **Objectif** : Les apprenants doivent pouvoir transférer leurs acquis directement sur la vraie plateforme
- **Approche** : Reproduction basée sur screenshots de l'interface réelle Booking.com

### Interactivité
- **Par défaut** : Statique (pas de backend, pas de BDD)
- **Data** : JSON mockés dans `/src/data`
- **Interactions** : Limitées au strict nécessaire pour la formation
  - Redirections entre pages (React Router)
  - Quelques éléments dynamiques si pertinent pédagogiquement
  - Pas de filtres complexes si données insuffisantes (ex: 2 réservations seulement)

### Stack technique
- **Framework** : Vite + React 18
- **Styling** : Tailwind CSS v3
- **Routing** : React Router (à installer)
- **Data** : JSON statiques dans `/src/data/booking/`
- **Déploiement** : Vercel (auto-deploy depuis GitHub)

---

## 🗂️ Architecture des pages

### Structure générale
Le clone Booking se compose de **2 niveaux de navigation** :

1. **Niveau 1 : Dashboard Groupe** (vue globale, tous les appartements)
2. **Niveau 2 : Dashboard Appartement** (vue détaillée d'un appartement spécifique)

---

## 📄 Pages - Niveau 1 : Dashboard Groupe

### Menu principal (6 items, 3 actifs)
| Item | Statut | Description |
|------|--------|-------------|
| Page d'accueil du groupe | ✅ À développer | Dashboard principal avec liste des appartements |
| Réservations | ✅ À développer | Tableau récapitulatif des réservations |
| Commentaires | ✅ À développer | Tableau récapitulatif des commentaires clients |
| Item 4 | ❌ Non prioritaire | (non spécifié) |
| Item 5 | ❌ Non prioritaire | (non spécifié) |
| Item 6 | ❌ Non prioritaire | (non spécifié) |

---

### 1.1 Page d'accueil du groupe

**Route** : `/booking/dashboard`

**Contenu** :
- Vue globale avec liste des appartements (initialement 1 appartement, extensible à 2+)
- Chaque appartement est **cliquable** et redirige vers son dashboard dédié (Niveau 2)
- Statistiques globales (à définir selon screenshots)

**Data mockées** :
- 1 appartement minimum (extensible)
- Nom, adresse, photo de couverture
- Métriques de base (réservations, revenus, notation)

**Fichier JSON** : `/src/data/booking/properties.json`

---

### 1.2 Réservations (vue groupe)

**Route** : `/booking/reservations`

**Contenu** :
- Tableau récapitulatif des réservations tous appartements confondus
- **2 réservations minimum** (données fictives)
- Colonnes attendues (à valider avec screenshots) :
  - Nom du client
  - Dates de séjour
  - Appartement
  - Statut (confirmée, en attente, annulée)
  - Montant
  - Actions possibles (voir détails, annuler, etc.)

**Filtres** :
- À évaluer selon pertinence (seulement 2 réservations = filtres peu utiles)
- Possibilité de filtres visuels (non fonctionnels) si important pour la formation

**Data mockées** :
- 2 réservations fictives minimum

**Fichier JSON** : `/src/data/booking/reservations.json`

---

### 1.3 Commentaires (vue groupe)

**Route** : `/booking/reviews`

**Contenu** :
- Tableau récapitulatif des commentaires clients
- **2 commentaires minimum** (données fictives)
- Vue détaillée par commentaire :
  - Nom du client
  - Note globale (ex: 8.5/10)
  - Texte du commentaire
  - Date de publication
  - Appartement concerné
  - Réponse propriétaire (optionnel)

**Data mockées** :
- 2 commentaires fictifs

**Fichier JSON** : `/src/data/booking/reviews.json`

---

## 📄 Pages - Niveau 2 : Dashboard Appartement

**Accès** : Clic sur un appartement depuis "Page d'accueil du groupe"

**Menu spécifique appartement** (navigation secondaire) :

### Navigation principale
1. **Accueil**
2. **Calendrier et tarifs** (3 sous-pages)
3. **Promotions** (1 sous-page)
4. **Réservations** (2 sous-pages)
5. **Etablissements** (13 sous-pages)
6. **Boite de réception**
7. **Commentaires clients**

---

### 2.1 Accueil (Dashboard Appartement)

**Route** : `/booking/property/:id/dashboard`

**Contenu** :
- Vue d'ensemble de l'appartement sélectionné
- KPIs : taux d'occupation, revenus, prochaines réservations
- Alertes / notifications (optionnel)
- Accès rapides vers autres sections

**Data mockées** :
- Métriques de l'appartement sélectionné

---

### 2.2 Calendrier et tarifs

#### 2.2.1 Calendrier
**Route** : `/booking/property/:id/calendar`

**Contenu** :
- Vue calendrier avec disponibilités
- Prix par nuit affichés
- Réservations existantes marquées

#### 2.2.2 Synchroniser les calendriers
**Route** : `/booking/property/:id/calendar/sync`

**Contenu** :
- Interface pour synchronisation avec autres plateformes (Airbnb, etc.)
- Peut rester visuel/statique (pas de vraie synchronisation)

#### 2.2.3 Plans tarifaires
**Route** : `/booking/property/:id/pricing`

**Contenu** :
- Gestion des tarifs (haute saison, basse saison, tarifs spéciaux)
- Peut être statique avec des exemples de tarifs

---

### 2.3 Promotions

#### 2.3.1 Voir mes promotions actives
**Route** : `/booking/property/:id/promotions`

**Contenu** :
- Liste des promotions en cours
- Exemple : "Réduction 15% pour séjours de 7+ nuits"
- Peut être entièrement mocké avec 1-2 promotions fictives

---

### 2.4 Réservations (niveau appartement)

#### 2.4.1 Liste des réservations
**Route** : `/booking/property/:id/reservations`

**Contenu** :
- Tableau des réservations pour cet appartement spécifique
- **2 réservations minimum**
- Mêmes colonnes que vue groupe, mais filtrées par appartement

#### 2.4.2 Demandes de réservations
**Route** : `/booking/property/:id/reservation-requests`

**Contenu** :
- Réservations en attente de validation
- **1 demande minimum**
- Actions possibles : Accepter / Refuser (peuvent être visuelles/non fonctionnelles)

---

### 2.5 Etablissements (13 sous-pages)

**Note** : Section la plus complexe, développement progressif recommandé

#### 2.5.1 Score de la page de l'établissement
**Route** : `/booking/property/:id/settings/score`

**Contenu** : Métriques de qualité de la page (complétude, photos, descriptions)

#### 2.5.2 Infos sur l'établissement et statut
**Route** : `/booking/property/:id/settings/info`

**Contenu** : Nom, adresse, type de logement, statut de publication

#### 2.5.3 TVA, taxes et frais
**Route** : `/booking/property/:id/settings/taxes`

**Contenu** : Configuration des taxes applicables

#### 2.5.4 Photos
**Route** : `/booking/property/:id/settings/photos`

**Contenu** : Galerie photos de l'appartement (peut utiliser images placeholder)

#### 2.5.5 Conditions de l'établissement
**Route** : `/booking/property/:id/settings/property-rules`

**Contenu** : Règles de la maison (animaux, fumeurs, etc.)

#### 2.5.6 Conditions de réservation
**Route** : `/booking/property/:id/settings/booking-rules`

**Contenu** : Politique d'annulation, arrhes, durée minimum de séjour

#### 2.5.7 Équipements et services
**Route** : `/booking/property/:id/settings/amenities`

**Contenu** : Liste des équipements (WiFi, parking, cuisine, etc.)

#### 2.5.8 Hébergements
**Route** : `/booking/property/:id/settings/accommodations`

**Contenu** : Types de chambres / espaces disponibles

#### 2.5.9 Détails des hébergements
**Route** : `/booking/property/:id/settings/accommodation-details`

**Contenu** : Descriptions détaillées par type d'hébergement

#### 2.5.10 Votre profil
**Route** : `/booking/property/:id/settings/profile`

**Contenu** : Informations sur le propriétaire

#### 2.5.11 Voir vos descriptions
**Route** : `/booking/property/:id/settings/descriptions`

**Contenu** : Descriptions textuelles de l'établissement (FR/EN/etc.)

#### 2.5.12 Préférences des messages
**Route** : `/booking/property/:id/settings/messaging`

**Contenu** : Configuration des notifications et messages automatiques

#### 2.5.13 Durabilité
**Route** : `/booking/property/:id/settings/sustainability`

**Contenu** : Pratiques écologiques mises en place

---

### 2.6 Boite de réception
**Route** : `/booking/property/:id/inbox`

**Contenu** :
- Messages avec clients (peut être mocké avec 2-3 conversations fictives)
- Interface type messagerie

---

### 2.7 Commentaires clients (niveau appartement)
**Route** : `/booking/property/:id/reviews`

**Contenu** :
- Commentaires spécifiques à cet appartement
- Mêmes données que vue groupe, mais filtrées

---

## 🗃️ Structure des données (JSON)

### `/src/data/booking/properties.json`
```json
[
  {
    "id": "prop_001",
    "name": "Appartement T2 Centre-Ville",
    "address": "15 Rue de la République, 75001 Paris",
    "coverImage": "/assets/properties/prop_001.jpg",
    "rating": 8.7,
    "totalReviews": 42,
    "occupancyRate": 78,
    "monthlyRevenue": 2450
  }
]
```

### `/src/data/booking/reservations.json`
```json
[
  {
    "id": "res_001",
    "propertyId": "prop_001",
    "guestName": "Jean Dupont",
    "checkIn": "2026-02-15",
    "checkOut": "2026-02-20",
    "status": "confirmed",
    "totalAmount": 450,
    "nights": 5
  },
  {
    "id": "res_002",
    "propertyId": "prop_001",
    "guestName": "Marie Martin",
    "checkIn": "2026-03-10",
    "checkOut": "2026-03-12",
    "status": "pending",
    "totalAmount": 180,
    "nights": 2
  }
]
```

### `/src/data/booking/reviews.json`
```json
[
  {
    "id": "rev_001",
    "propertyId": "prop_001",
    "guestName": "Sophie L.",
    "rating": 9.2,
    "comment": "Appartement très bien situé, propre et conforme aux photos. Hôte réactif.",
    "date": "2026-01-10",
    "ownerResponse": "Merci Sophie pour votre retour positif !"
  },
  {
    "id": "rev_002",
    "propertyId": "prop_001",
    "guestName": "Thomas B.",
    "rating": 7.8,
    "comment": "Bon rapport qualité-prix, quelques détails à améliorer (WiFi instable).",
    "date": "2026-01-05",
    "ownerResponse": null
  }
]
```

---

## 🚀 Roadmap de développement

### Phase 1 : Fondations (En cours)
- [x] Setup technique (Vite + React + Tailwind)
- [x] Déploiement Vercel
- [x] Repo GitHub
- [x] Installation React Router
- [x] Structure de dossiers finale

### Phase 2 : Dashboard Groupe (Priorité 1)
- [x] Page d'accueil du groupe
- [x] Réservations (vue groupe)
- [x] Commentaires (vue groupe)
- [x] Navigation entre pages

### Phase 3 : Dashboard Appartement (Priorité 2)
- [x] Accueil appartement
- [ ] Calendrier et tarifs (3 sous-pages)
- [ ] Réservations (2 sous-pages)
- [ ] Promotions

### Phase 4 : Pages Etablissements (Priorité 3)
- [ ] 13 sous-pages de configuration
- Développement progressif, validation page par page

### Phase 5 : Pages secondaires (Priorité 4)
- [ ] Boite de réception
- [ ] Commentaires clients (niveau appartement)

### Phase 6 : Polish & Tests
- [ ] Responsive design
- [ ] Tests utilisateurs avec apprenants
- [ ] Corrections/ajustements selon retours Victoria

---

## 📋 Méthodologie de travail

### Approche itérative
1. **Screenshots fournis** : Julien fournit captures d'écran de Booking.com réel
2. **Développement page par page** : Une page à la fois, validation avant de passer à la suite
3. **Code dans Artifacts** : Développement via Claude, pas de modifications directes dans le repo
4. **Validation visuelle** : Comparaison avec screenshots originaux
5. **Ajustements** : Itérations jusqu'à fidélité satisfaisante
6. **Next page** : Passage à la page suivante uniquement après validation

### Principe KISS (Keep It Simple, Stupid)
- Pas de sur-ingénierie
- Statique par défaut
- Interactions uniquement si valeur pédagogique
- Data mockées minimales mais réalistes

---

## 🎓 Critères de succès

### Critère 1 : Fidélité visuelle
- Les apprenants reconnaissent immédiatement l'interface Booking.com
- Layout, couleurs, typographie suffisamment proches
- Pas de confusion avec une autre plateforme

### Critère 2 : Utilisabilité
- Navigation intuitive
- Pas de bugs bloquants
- Temps de chargement acceptable (<2s)

### Critère 3 : Pédagogie
- Les apprenants peuvent s'entraîner efficacement
- Transfert de compétences vers la vraie plateforme
- Retours positifs de Victoria et des formateurs

### Critère 4 : Maintenabilité
- Code propre et documenté
- Facilité d'ajout de nouvelles pages
- Possibilité de modifier les données mockées sans toucher au code


---

## 📞 Contacts & Références

**Product Owner** : Julien (julinhio)  
**Supervision** : Victoria (Letahost)  

**Repo GitHub** : https://github.com/INVESTMALIN/certification-sandbox  
**URL Production** : https://certification-sandbox.vercel.app  

**Références Booking.com** :
- Screenshots à fournir par Julien (accès extranet de Letahost)
- Vidéos Loom de Victoria (disponibles sur demande)

---

## 📝 Notes additionnelles

### Évolutions futures possibles
- Ajout d'un mode "formateur" pour modifier data sans rebuild
- Mode "évaluation" avec scoring des actions

### Hors scope actuel
- Backend réel avec BDD
- Authentification utilisateurs
- Persistance des modifications apprenants
- Intégration API Booking.com réelle
- Clone Airbnb (PRD séparé à venir)

---

**Version** : 1.0 (Draft)  
**Dernière mise à jour** : 2026-01-22