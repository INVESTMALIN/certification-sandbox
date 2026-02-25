# PRD - Clone Airbnb (Certification Sandbox)

**Projet** : Certification Sandbox - Simulateur Booking.com & Airbnb
**Client** : Letahost / Invest Malin
**Date de création** : 2026-02-23
**Statut** : Développement en cours v1.0
**Responsable** : Julien (Product Owner)
**Supervision** : Victoria (Letahost)

---

## 🎯 Objectif du projet

Créer une réplique fonctionnelle et visuellement fidèle de l'interface hôte Airbnb (espace hôte / tableau de bord) pour permettre aux apprenants de la formation "Conciergerie 2.0" de s'entraîner sans risque sur un environnement simulé.

### Public cible
- Apprenants de la certification Invest Malin
- Profil : professionnels en reconversion, pas toujours tech-savvy
- Besoin : interface familière pour faciliter la transition vers Airbnb en tant qu'hôte

---

## 📐 Principes de conception

### Fidélité visuelle
- **Niveau requis** : Haute fidélité (pas pixel-perfect, mais très proche de l'original)
- **Objectif** : Les apprenants doivent pouvoir transférer leurs acquis directement sur la vraie plateforme
- **Approche** : Reproduction basée sur screenshots de l'interface réelle Airbnb (espace hôte)
- **Couleur principale** : Rouge Airbnb `#FF385C`

### Interactivité
- **Par défaut** : Statique (pas de backend, pas de BDD)
- **Data** : JSON mockés dans `/src/data/airbnb/`
- **Interactions** : Limitées au strict nécessaire pour la formation
  - Redirections entre pages (React Router)
  - Système de dates par offsets (relatif à la date du jour)
  - Quelques éléments dynamiques si pertinent pédagogiquement

### Stack technique
- **Framework** : Vite + React 19
- **Styling** : Tailwind CSS v3
- **Routing** : React Router v7
- **Data** : JSON statiques dans `/src/data/airbnb/`
- **Déploiement** : Vercel (auto-deploy depuis GitHub)

---

## 🗂️ Architecture des pages

### Structure générale
Le clone Airbnb reproduit **l'espace hôte** (host dashboard), accessible après connexion.

**Navigation principale** (AirbnbHeader) :
1. **Tableau de bord** — Vue d'ensemble avec réservations en cours et à venir
2. **Calendrier** — Disponibilités multi-propriétés
3. **Annonces** — Gestion des logements
4. **Messages** — Messagerie avec les voyageurs
5. **Centre d'aide** — FAQ et support

**Pages secondaires** (accessibles depuis le tableau de bord) :
- Détail d'une réservation
- Détail d'une demande de réservation
- Détail d'un remboursement / litige
- Profil d'un voyageur
- Récapitulatif de réservation
- Workflow de réponse à un commentaire (7 étapes)
- Calendrier mono-propriété

---

## 📄 Pages - Navigation principale

### 1. Tableau de bord

**Route** : `/airbnb/dashboard`
**Fichier** : `src/pages/airbnb/AirbnbDashboard.jsx`

**Contenu** :
- Vue tabbed : "Aujourd'hui" / "À venir"
- Filtre par propriété (toutes ou une spécifique)
- Liste des réservations avec dates, voyageur, montant
- Alertes visuelles (demandes en attente, etc.)
- Accès rapide aux fiches réservation et aux demandes

**Data mockées** :
- 10 réservations (statuts : passées, en cours, à venir)
- 2 demandes de réservation en attente

**Fichiers JSON** : `/src/data/airbnb/reservations.json`, `/src/data/airbnb/demandes.json`

---

### 2. Calendrier (multi-propriétés)

**Route** : `/airbnb/calendrier`
**Fichier** : `src/pages/airbnb/AirbnbCalendar.jsx`

**Contenu** :
- Vue calendrier avec toutes les propriétés en parallèle
- Période de disponibilité et réservations visualisées
- Navigation entre les mois
- Lien vers le calendrier mono-propriété pour chaque logement

**Data mockées** :
- 6 propriétés avec leurs réservations respectives

**Fichier JSON** : `/src/data/airbnb/properties.json`, `/src/data/airbnb/reservations.json`

---

### 2bis. Calendrier (mono-propriété)

**Route** : `/airbnb/calendar/:propertyId`
**Fichier** : `src/pages/airbnb/AirbnbCalendarMono.jsx`

**Contenu** :
- Vue calendrier détaillée pour un seul logement
- Affichage des prix par nuit
- Réservations existantes marquées
- Gestion des disponibilités (visuelle)

---

### 3. Annonces

**Route** : `/airbnb/annonces`
**Fichier** : `src/pages/airbnb/AirbnbAnnonces.jsx`

**Contenu** :
- Liste des logements gérés par l'hôte (6 propriétés)
- Photo, nom, ville, prix par nuit
- Statut de l'annonce (active, inactive)
- Accès rapide au calendrier de chaque logement

**Data mockées** :
- 6 propriétés (Cannes, Marseille, Les Arcs, Nice, Lyon, Paris)

**Fichier JSON** : `/src/data/airbnb/properties.json`

---

### 4. Messages

**Route** : `/airbnb/messages`
**Fichier** : `src/pages/airbnb/AirbnbMessages.jsx`

**Contenu** :
- Liste des conversations avec les voyageurs
- Interface type messagerie (conversation active à droite)
- Messages mockés avec dates et statuts (lu/non lu)
- Lien vers le profil voyageur et la réservation associée

**Data mockées** :
- Conversations liées aux 10 réservations

---

### 5. Centre d'aide

**Route** : `/airbnb/centre-aide`
**Fichier** : `src/pages/airbnb/AirbnbCentreAide.jsx`

**Contenu** :
- FAQ organisée par catégories (réservations, paiements, règles, etc.)
- Accordéons question/réponse
- Peut rester entièrement statique

---

## 📄 Pages secondaires

### 6. Détail d'une réservation

**Route** : `/airbnb/reservation/:id`
**Fichier** : `src/pages/airbnb/ReservationDetail.jsx`

**Contenu** :
- Informations complètes de la réservation
- Dates, voyageur, montant, code de confirmation, code d'accès
- Lien vers le profil du voyageur
- Lien vers le workflow de commentaire (après séjour)
- Lien vers récap de réservation

---

### 7. Détail d'une demande de réservation

**Route** : `/airbnb/demande/:id`
**Fichier** : `src/pages/airbnb/DemandeDetail.jsx`

**Contenu** :
- Informations de la demande en attente
- Message du voyageur, dates souhaitées, nombre de voyageurs, montant
- Heures restantes pour répondre
- Boutons Accepter / Refuser (visuels)

**Data mockées** :
- 2 demandes en attente (Cannes et Les Arcs)

**Fichier JSON** : `/src/data/airbnb/demandes.json`

---

### 8. Détail d'un remboursement / litige

**Route** : `/airbnb/remboursement/:id`
**Fichier** : `src/pages/airbnb/RemboursementDetail.jsx`

**Contenu** :
- Détail de l'incident signalé (dommage, montant réclamé)
- Chronologie des événements (dates, messages, statuts)
- Statut du remboursement (en attente, versé)
- Justificatifs (photos du dommage)
- Interlocuteurs : hôte (gestionnaire) et voyageur

**Data mockées** :
- 2 litiges avec chronologie complète

**Fichier JSON** : `/src/data/airbnb/remboursements.json`

---

### 9. Profil du voyageur

**Route** : `/airbnb/voyageur/:reservationId`
**Fichier** : `src/pages/airbnb/AirbnbVoyageurProfile.jsx`

**Contenu** :
- Photo, nom, localisation, langues parlées
- Bio, nombre de voyages, avis reçus, ancienneté sur Airbnb
- Badge "Identité vérifiée"
- Commentaires laissés par d'autres hôtes

**Data mockées** :
- 10 profils voyageurs détaillés

**Fichier JSON** : `/src/data/airbnb/guests.json`

---

### 10. Récapitulatif de réservation

**Route** : `/airbnb/recap/:id`
**Fichier** : `src/pages/airbnb/AirbnbReservationRecap.jsx`

**Contenu** :
- Résumé complet de la réservation (style confirmation Airbnb)
- Détail du calcul du prix (prix/nuit × nuits, frais, total)
- Informations logement et voyageur

---

### 11. Workflow de réponse à un commentaire (7 étapes)

**Routes** : `/airbnb/commentaire/:reservationId/step1` → `step7`
**Fichiers** : `src/pages/airbnb/CommentaireStep1.jsx` à `CommentaireStep7.jsx`

**Contenu par étape** :
| Étape | Description |
|-------|-------------|
| Step 1 | Choisir le type d'évaluation (Public / Privé) |
| Step 2 | Évaluer les différents aspects du séjour |
| Step 3 | Rédiger le commentaire principal |
| Step 4 | Évaluation détaillée (propreté, communication, etc.) |
| Step 5 | Question sur le respect des règles |
| Step 6 | Recommandation voyageur (oui/non) |
| Step 7 | Récapitulatif et envoi |

---

## 🗃️ Structure des données (JSON)

### `/src/data/airbnb/properties.json`
```json
{
  "propertyId": "prop_airbnb_001",
  "name": "Appartement lumineux avec vue sur jardin",
  "address": "12 Rue des Mimosas, 06400 Cannes | Piscine & Tennis • Parking",
  "city": "Cannes",
  "country": "France",
  "image": "https://...",
  "hostSince": "2015",
  "pricePerNight": 95
}
```
**6 propriétés** : Cannes (95€), Marseille (75€), Les Arcs (280€), Nice (350€), Lyon (110€), Paris (185€)

---

### `/src/data/airbnb/reservations.json`
```json
{
  "id": "res_airbnb_001",
  "reservationNumber": "HM4AB2C6DE",
  "propertyId": "prop_airbnb_001",
  "guestName": "Anaëlle Fontaine",
  "guestPhone": "+33 6 11 22 33 44",
  "guestCount": "2 voyageurs",
  "guestAvatar": "https://...",
  "checkInOffset": -12,
  "checkOutOffset": -8,
  "nights": 4,
  "bookedOnOffset": -40,
  "totalAmount": 520.00,
  "checkInTime": "15:00",
  "checkOutTime": "10:00",
  "suggestedAccessCode": "2468",
  "confirmationCode": "HM4AB2C6DE",
  "rating": null,
  "identityVerified": true
}
```
**Système d'offsets** : Les champs `*Offset` sont des décalages en jours par rapport à la date du jour (calculés dynamiquement via `dateUtils.js`). Ex: `-12` = il y a 12 jours, `+5` = dans 5 jours.

**10 réservations** sur les 6 propriétés.

---

### `/src/data/airbnb/guests.json`
```json
{
  "guestId": "guest_001",
  "reservationIds": ["res_airbnb_001", "res_airbnb_008"],
  "guestAvatar": "https://...",
  "guestName": "Pascale Andree Claude Pierron",
  "firstName": "Pascale",
  "location": "Lyon, France",
  "languages": ["Français", "Anglais"],
  "bio": "Nous voyageons en famille...",
  "trips": 18,
  "reviewsCount": 8,
  "yearsOnAirbnb": 9,
  "identityVerified": true,
  "isHost": false,
  "hostComments": [
    {
      "hostName": "Aline",
      "hostAvatar": "https://...",
      "date": "janvier 2026",
      "text": "Pascale et sa famille ont été des voyageurs exemplaires..."
    }
  ]
}
```
**10 profils voyageurs** avec commentaires d'autres hôtes.

---

### `/src/data/airbnb/demandes.json`
```json
{
  "id": "dem_airbnb_001",
  "propertyId": "prop_airbnb_001",
  "propertyName": "Vue Marina, Piscine, Terrasse & Fibre",
  "propertyImage": "https://...",
  "guestName": "Clio",
  "guestAvatar": "https://...",
  "guestCount": "2 voyageurs",
  "checkInOffset": 1,
  "checkOutOffset": 2,
  "nights": 1,
  "totalAmount": 154.66,
  "hoursRemaining": 8,
  "guestMessage": "Bonsoir, étape avant de reprendre la route...",
  "messageTimeAgo": "il y a 15 heures",
  "status": "pending"
}
```
**2 demandes en attente** : Cannes (8h restantes) et Les Arcs (23h restantes).

---

### `/src/data/airbnb/remboursements.json`
```json
{
  "id": "remb_001",
  "reservationId": "res_airbnb_008",
  "propertyId": "prop_airbnb_001",
  "guestName": "Anaëlle Fontaine",
  "guestAvatar": "https://...",
  "managedBy": "Agnès Hilaire",
  "managedByAvatar": "https://...",
  "totalAmount": 199.99,
  "currency": "EUR",
  "status": "versé",
  "airbnbPaidTo": "Agnès Hilaire",
  "incidentDate": -14,
  "damagedItem": "Tiroir sur la structure du lit",
  "damagedItemType": "Élément endommagé",
  "damagedItemImage": "https://...",
  "messageToGuest": "Bonjour, Notre équipe de ménage a constaté...",
  "justificatifs": ["photo_dommage_1.jpg", "photo_dommage_2.jpg"],
  "chronologie": [
    {
      "id": 1,
      "label": "Agnès Hilaire a demandé 199,99 € à Anaëlle Fontaine",
      "dateOffset": -14,
      "heure": "09:40 CET",
      "message": null
    }
  ]
}
```
**2 litiges** avec chronologie complète des événements.

---

### `/src/data/airbnb/dateUtils.js`

Utilitaire JavaScript qui convertit les offsets en dates réelles :
- Calcule `new Date()` + offset en jours
- Formate les dates en français
- Utilisé dans toutes les pages pour afficher des dates cohérentes et toujours "actuelles"

---

## 🚀 Roadmap de développement

### Phase 1 : Fondations
- [x] Setup technique (Vite + React + Tailwind)
- [x] Déploiement Vercel
- [x] Repo GitHub
- [x] Installation React Router
- [x] Structure de dossiers finale
- [x] Système d'authentification (localStorage)

### Phase 2 : Navigation principale
- [x] Header Airbnb (AirbnbHeader.jsx)
- [x] Tableau de bord hôte (AirbnbDashboard.jsx)
- [x] Calendrier multi-propriétés (AirbnbCalendar.jsx)
- [x] Calendrier mono-propriété (AirbnbCalendarMono.jsx)
- [x] Annonces (AirbnbAnnonces.jsx)
- [x] Messages (AirbnbMessages.jsx)
- [x] Centre d'aide (AirbnbCentreAide.jsx)

### Phase 3 : Gestion des réservations
- [x] Détail réservation (ReservationDetail.jsx)
- [x] Détail demande de réservation (DemandeDetail.jsx)
- [x] Récapitulatif réservation (AirbnbReservationRecap.jsx)
- [x] Profil voyageur (AirbnbVoyageurProfile.jsx)

### Phase 4 : Interactions avancées
- [x] Workflow commentaire 7 étapes (CommentaireStep1-7.jsx)
- [x] Remboursements / litiges (RemboursementDetail.jsx)
- [x] Accueil public (AirbnbHome.jsx)

### Phase 5 : Polish & Tests
- [ ] Responsive design mobile
- [ ] Tests utilisateurs avec apprenants
- [ ] Corrections/ajustements selon retours Victoria

---

## 📋 Méthodologie de travail

### Approche itérative
1. **Screenshots fournis** : Julien fournit captures d'écran de l'Airbnb hôte réel
2. **Développement page par page** : Une page à la fois, validation avant de passer à la suite
3. **Développement via Claude** : Pas de modifications directes dans le repo
4. **Validation visuelle** : Comparaison avec screenshots originaux
5. **Ajustements** : Itérations jusqu'à fidélité satisfaisante
6. **Next page** : Passage à la page suivante uniquement après validation

### Principe KISS (Keep It Simple, Stupid)
- Pas de sur-ingénierie
- Statique par défaut
- Interactions uniquement si valeur pédagogique
- Data mockées minimales mais réalistes
- Dates calculées dynamiquement via offsets (jamais de dates en dur)

---

## 🎓 Critères de succès

### Critère 1 : Fidélité visuelle
- Les apprenants reconnaissent immédiatement l'interface Airbnb hôte
- Layout, couleurs (rouge `#FF385C`), typographie suffisamment proches
- Pas de confusion avec une autre plateforme

### Critère 2 : Utilisabilité
- Navigation intuitive entre les sections
- Pas de bugs bloquants
- Temps de chargement acceptable (<2s)

### Critère 3 : Pédagogie
- Les apprenants peuvent s'entraîner efficacement sur les workflows clés :
  - Gérer une réservation entrante
  - Répondre à une demande
  - Traiter un litige / remboursement
  - Répondre à un commentaire voyageur
- Transfert de compétences vers la vraie plateforme Airbnb

### Critère 4 : Maintenabilité
- Code propre et documenté
- Facilité d'ajout de nouvelles pages
- Modification des données mockées sans toucher au code

---

## 📞 Contacts & Références

**Product Owner** : Julien (julinhio)
**Supervision** : Victoria (Letahost)

**Repo GitHub** : https://github.com/INVESTMALIN/certification-sandbox
**URL Production** : https://certification-sandbox.vercel.app

**Références Airbnb** :
- Screenshots à fournir par Julien (accès espace hôte de Letahost)
- Vidéos Loom de Victoria (disponibles sur demande)

---

## 📝 Notes additionnelles

### Évolutions futures possibles
- Ajout d'un mode "formateur" pour modifier les données sans rebuild
- Mode "évaluation" avec scoring des actions de l'apprenant
- Intégration n8n pour simuler des workflows automatisés

### Hors scope actuel
- Backend réel avec BDD
- Authentification multi-utilisateurs
- Persistance des modifications apprenants
- Intégration API Airbnb réelle
- Notifications push / temps réel

---

**Version** : 1.0 (Draft)
**Dernière mise à jour** : 2026-02-23
