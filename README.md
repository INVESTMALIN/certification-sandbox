# 🎓 Certification Sandbox - Simulateur Booking & Airbnb

Environnement de simulation pour la formation **"Conciergerie 2.0"** (Letahost / Invest Malin).  
Ce projet reproduit les interfaces de gestion Booking.com et Airbnb pour permettre aux apprenants de s'entraîner sans risque.

---

## 🎯 Objectif

Créer des répliques visuellement fidèles des extranet Booking.com et Airbnb pour que les apprenants :
- Se familiarisent avec les interfaces réelles avant de gérer de vrais établissements
- S'entraînent sur des données fictives sans risque d'erreur
- Acquièrent les réflexes nécessaires pour leur certification

**Public cible** : Apprenants de la certification Letahost / Invest Malin (professionnels en reconversion, pas toujours tech-savvy)

---

## 🚀 Accès rapide

- **Production** : [certification-sandbox.vercel.app](https://certification-sandbox.vercel.app)
- **Repository** : [github.com/INVESTMALIN/certification-sandbox](https://github.com/INVESTMALIN/certification-sandbox)
- **Documentation** : Voir dossier `/docs`

---

## 🛠️ Stack technique

| Composant | Technologie |
|-----------|-------------|
| Framework | Vite + React 18 |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| Déploiement | Vercel |
| Versioning | GitHub (INVESTMALIN) |

**Pourquoi cette stack ?**
- Légère et rapide (pas besoin de Next.js pour du statique)
- Tailwind pour reproduire fidèlement le design
- Pas de backend (data mockées en JSON)

---

## 📂 Structure du projet

```
certification-sandbox/
├── docs/                       # Documentation détaillée
│   ├── PRD_Booking.md         # Spécifications clone Booking
│   └── PRD_Airbnb.md          # Spécifications clone Airbnb (à venir)
├── public/
│   └── assets/                # Images, logos, icônes
├── src/
│   ├── components/            # Composants UI réutilisables
│   ├── data/                  # Data mockées (JSON)
│   │   ├── booking/           # Données Booking (réservations, commentaires, etc.)
│   │   └── airbnb/            # Données Airbnb (à venir)
│   ├── pages/                 # Pages de l'application
│   │   ├── booking/           # Clone Booking.com
│   │   └── airbnb/            # Clone Airbnb (à venir)
│   ├── App.jsx                # Composant racine
│   └── main.jsx               # Point d'entrée
├── README.md                  # Ce fichier
└── package.json
```

---

## 🏃 Installation locale

### Prérequis
- Node.js 18+ et npm
- Git

### Étapes

1. **Cloner le repo**
```bash
git clone https://github.com/INVESTMALIN/certification-sandbox.git
cd certification-sandbox
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Lancer le serveur de développement**
```bash
npm run dev
```

Le projet est accessible sur `http://localhost:5173`

4. **Build de production** (optionnel)
```bash
npm run build
npm run preview
```

---

## 📋 Fonctionnalités actuelles

### ✅ Clone Booking.com (en développement)

#### Niveau 1 : Dashboard Groupe
- [ ] Page d'accueil du groupe (Accueil)
- [ ] Réservations (vue globale)
- [ ] Commentaires (vue globale)

#### Niveau 2 : Dashboard Appartement
- [ ] Accueil appartement
- [ ] Calendrier et tarifs (3 sous-pages)
- [ ] Promotions
- [ ] Réservations (2 sous-pages)
- [ ] Etablissements (13 sous-pages de configuration)
- [ ] Boite de réception
- [ ] Commentaires clients

### ⏳ Clone Airbnb (à venir)
Spécifications en cours de définition (PRD séparé)

---

## 🧪 Données de test

Les données sont mockées en JSON dans `/src/data/booking/` :

- **Appartements** : 1-2 établissements fictifs
- **Réservations** : 2 réservations minimum par appartement
- **Commentaires** : 2 avis clients fictifs
- **Messages** : 2-3 conversations simulées

**Aucune donnée réelle n'est utilisée.**

---

## 🎨 Principes de design

### Fidélité visuelle
- **Objectif** : Haute fidélité (pas pixel-perfect, mais très proche)
- **Approche** : Reproduction basée sur screenshots de Booking.com réel
- **Rationale** : Faciliter le transfert de compétences vers la vraie plateforme

### Interactivité
- **Par défaut** : Statique (pas de backend)
- **Exceptions** : Quelques interactions si valeur pédagogique (navigation, affichage conditionnel)
- **Pas d'interactions complexes** : Filtres, recherche, tri (données insuffisantes)

---

## 🚦 Roadmap

### Phase 1 : Fondations ✅
- [x] Setup Vite + React + Tailwind
- [x] Déploiement Vercel
- [x] Repo GitHub
- [x] PRD Booking.com

### Phase 2 : Dashboard Groupe (en cours)
- [ ] Installation React Router
- [ ] Composants UI de base (Button, Card, Table)
- [ ] Page d'accueil groupe
- [ ] Page réservations
- [ ] Page commentaires

### Phase 3 : Dashboard Appartement
- Développement progressif, page par page
- Validation visuelle avec screenshots Booking.com réel

### Phase 4 : Clone Airbnb
- À définir (PRD séparé)

---

## 👥 Équipe

| Rôle | Personne |
|------|----------|
| Product Owner | Julien |
| Supervision | Victoria (Letahost) |
| Développement n8n | Kevin |

---

## 🔗 Liens utiles

- **Production** : https://certification-sandbox.vercel.app
- **GitHub** : https://github.com/INVESTMALIN/certification-sandbox
- **PRD Booking** : [/docs/PRD_Booking.md](/docs/PRD_Booking.md)
- **Vercel Dashboard** : [vercel.com/julinhios-projects](https://vercel.com/julinhios-projects)

---

## 📄 Licence

Projet propriétaire - © 2026 Letahost / Invest Malin  
Usage exclusif pour la formation "Conciergerie 2.0"

---

## 🐛 Contribuer

### Workflow de développement
1. Créer une branche depuis `main`
2. Développer la fonctionnalité
3. Tester localement
4. Push et créer une PR
5. Review par Julien
6. Merge dans `main` → auto-deploy Vercel

### Standards de code
- Composants fonctionnels React (pas de classes)
- Tailwind pour le styling (pas de CSS custom sauf exception)
- Nommage : PascalCase pour composants, camelCase pour variables
- Commentaires en français pour la logique métier

---

## 📞 Support

Questions ou bugs ? Contactez Julien via :
- GitHub Issues
- Email : [à compléter]
- Slack Letahost : [à compléter]

---

**Version actuelle** : 0.1.0 (Phase 1 - Fondations)  
**Dernière mise à jour** : 2026-01-20