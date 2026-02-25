# CLAUDE.md — Certification Sandbox

## Contexte du projet

Réplique visuelle des interfaces hôte **Booking.com** et **Airbnb** pour la formation "Conciergerie 2.0" (Letahost / Invest Malin). Les apprenants s'entraînent sur un environnement simulé avant de gérer de vrais logements.

**Production** : https://certification-sandbox.vercel.app
**Repo** : https://github.com/INVESTMALIN/certification-sandbox
**PRD Booking** : `docs/RD_Booking.md`
**PRD Airbnb** : `docs/RD_Airbnb.md`

---

## Stack & commandes

```bash
npm run dev      # Démarrer le serveur local (Vite)
npm run build    # Build de production
npm run lint     # ESLint
npm run preview  # Prévisualiser le build
```

- **Framework** : Vite + React 19
- **Styling** : Tailwind CSS v3 (pas de CSS custom sauf `src/index.css`)
- **Routing** : React Router v7
- **Icons** : Lucide React
- **Auth** : `localStorage.getItem('certification_sandbox_auth') === 'true'`
- **Déploiement** : Vercel (auto-deploy sur push `main`)

---

## Structure du projet

```
src/
├── components/
│   ├── airbnb/          # AirbnbHeader.jsx, AirbnbFooter.jsx
│   ├── booking/         # BookingHeader, PropertyHeader, modals...
│   └── ProtectedRoute.jsx
├── data/
│   ├── airbnb/          # properties, reservations, guests, demandes, remboursements, dateUtils.js
│   └── booking/         # properties, reservations, reviews, messages, photos
├── pages/
│   ├── airbnb/          # 20+ pages (AirbnbDashboard, ReservationDetail, CommentaireStep1-7...)
│   ├── booking/         # 40+ pages (DashboardGroup, PropertyAccueil, établissement/...)
│   ├── Login.jsx
│   └── ChoosePlatform.jsx
├── App.jsx              # Toutes les routes définies ici
└── index.css
```

---

## Conventions de code

- **Composants** : PascalCase, fonctionnels uniquement (pas de classes)
- **Variables/fonctions** : camelCase
- **Styling** : Tailwind exclusivement — pas de `style={{}}` inline, pas de fichiers `.css` dédiés
- **Langue du code** : commentaires en français pour la logique métier
- **Pas de TypeScript** — JavaScript pur
- **Pas de state management externe** — uniquement `useState` / `useContext`
- **Pas de backend** — tout est statique, data en JSON

---

## Architecture des données

### Airbnb — système d'offsets (IMPORTANT)

Les dates dans `/src/data/airbnb/` ne sont **jamais des dates en dur**. Elles utilisent des offsets relatifs à `new Date()` pour rester toujours "fraîches".

```js
// Dans les JSON : checkInOffset, checkOutOffset, bookedOnOffset, incidentDate
{ "checkInOffset": 2 }   // → dans 2 jours
{ "checkInOffset": -5 }  // → il y a 5 jours
```

**Toujours utiliser `dateUtils.js`** pour convertir :

```js
import { hydrateReservation, hydrateDemande, getDateFromOffset } from '../../data/airbnb/dateUtils'

// Avant d'utiliser une réservation dans un composant :
const reservation = hydrateReservation(rawReservation)
// → ajoute .checkIn, .checkOut, .bookedOn, .status, .statusDetail
```

Fonctions disponibles dans `dateUtils.js` :
- `getDateFromOffset(n)` — retourne un objet Date
- `formatDateShort(date)` — "16 févr."
- `formatDateLong(date)` — "lun. 16 févr. 2026"
- `getStatus(checkInOffset, checkOutOffset)` — `'past' | 'upcoming' | 'confirmed'`
- `getStatusDetail(...)` — "Arrivée aujourd'hui", "À venir", etc.
- `hydrateReservation(res)` — hydrate une réservation complète
- `hydrateDemande(dem)` — hydrate une demande

### Booking — dates en dur

Les JSON Booking utilisent des dates ISO classiques (`"2026-02-15"`), pas d'offsets.

### IDs

| Entité | Format |
|--------|--------|
| Propriété Airbnb | `prop_airbnb_001` |
| Réservation Airbnb | `res_airbnb_001` |
| Voyageur Airbnb | `guest_001` |
| Demande Airbnb | `dem_airbnb_001` |
| Remboursement Airbnb | `remb_001` |
| Propriété Booking | `prop_001` |
| Réservation Booking | `res_001` |

---

## Routing

Toutes les routes sont déclarées dans `src/App.jsx`. Toutes les routes post-login sont wrappées dans `<ProtectedRoute>`.

### Routes Airbnb

| Page | Route |
|------|-------|
| Dashboard hôte | `/airbnb/dashboard` |
| Calendrier multi | `/airbnb/calendrier` |
| Calendrier mono | `/airbnb/calendar/:propertyId` |
| Annonces | `/airbnb/annonces` |
| Messages | `/airbnb/messages` |
| Centre d'aide | `/airbnb/centre-aide` |
| Détail réservation | `/airbnb/reservation/:id` |
| Détail demande | `/airbnb/demande/:id` |
| Remboursement | `/airbnb/remboursement/:id` |
| Profil voyageur | `/airbnb/voyageur/:reservationId` |
| Récap réservation | `/airbnb/recap/:id` |
| Workflow commentaire | `/airbnb/commentaire/:reservationId/step[1-7]` |

### Routes Booking

| Niveau | Pattern |
|--------|---------|
| Groupe | `/booking/dashboard`, `/booking/reservations`, `/booking/reviews` |
| Propriété | `/booking/property/:id/accueil` |
| Tarifs | `/booking/property/:id/tarifs/[calendrier\|ouvrir-fermer\|copier-tarifs\|plans]` |
| Promotions | `/booking/property/:id/promotions/[actives\|nouvelle\|simuler]` |
| Réservations | `/booking/property/:id/reservations/[liste\|demandes]` |
| Établissement | `/booking/property/:id/etablissement/[13 sous-pages]` |
| Inbox | `/booking/property/:id/inbox` |
| Commentaires | `/booking/property/:id/commentaires/[liste\|experience]` |

---

## Règles de développement

### À toujours faire
- Lire les fichiers existants avant de proposer des modifications
- Utiliser `hydrateReservation()` / `hydrateDemande()` pour les données Airbnb
- Utiliser Tailwind pour tout le styling
- Suivre la palette de couleurs existante :
  - Airbnb : `#FF385C` (rouge), `#222222` (titres), fond `#F7F7F7`
  - Booking : `#003580` (bleu foncé), `#009fe3` (bleu clair)
- Ajouter les nouvelles routes dans `src/App.jsx`
- Garder les composants simples et statiques par défaut

### À ne jamais faire
- Ajouter un backend ou une vraie BDD
- Mettre des dates en dur dans les JSON Airbnb (utiliser les offsets)
- Créer des fichiers CSS dédiés (tout dans Tailwind)
- Utiliser TypeScript
- Ajouter Redux ou un state manager externe
- Rendre fonctionnels les boutons si c'est hors scope pédagogique
- Sur-ingénier : statique par défaut, interactions seulement si valeur pédagogique

---

## Ajouter une nouvelle page (checklist)

1. Créer `src/pages/[airbnb|booking]/MaPage.jsx`
2. Importer dans `src/App.jsx`
3. Ajouter la route `<Route path="..." element={<ProtectedRoute><MaPage /></ProtectedRoute>} />`
4. Ajouter un lien dans le header ou la page parente
5. Si données nécessaires : ajouter/étendre le JSON dans `src/data/[airbnb|booking]/`

---

## Contacts

**Product Owner** : Julien
**Supervision** : Victoria (Letahost)
