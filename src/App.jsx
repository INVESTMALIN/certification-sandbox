import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import ChoosePlatform from './pages/ChoosePlatform'
import DashboardGroup from './pages/booking/DashboardGroup'
import Reservations from './pages/booking/Reservations'  // Niveau 1
import Reviews from './pages/booking/Reviews'
import PropertyAccueil from './pages/booking/PropertyAccueil'
import Calendrier from './pages/booking/tarifs/Calendrier'
import OuvrirFermer from './pages/booking/tarifs/OuvrirFermer'
import CopierTarifs from './pages/booking/tarifs/CopierTarifs'
import PlansTarifaires from './pages/booking/tarifs/PlansTarifaires'
import NouvellePromotion from './pages/booking/promotions/NouvellePromotion'
import SimulerReduction from './pages/booking/promotions/SimulerReduction'
import PromotionsActives from './pages/booking/promotions/PromotionsActives'
import PropertyReservations from './pages/booking/reservations/Reservations'  // Niveau 2
import NoteQualite from './pages/booking/etablissement/NoteQualite'
import ScorePage from './pages/booking/etablissement/ScorePage'
import InfosStatut from './pages/booking/etablissement/InfosStatut'
import TvaTaxes from './pages/booking/etablissement/TvaTaxes'
import Photos from './pages/booking/etablissement/Photos'
import ConditionsEtablissement from './pages/booking/etablissement/ConditionsEtablissement'
import ConditionsReservation from './pages/booking/etablissement/ConditionsReservation'
import EquipementsServices from './pages/booking/etablissement/EquipementsServices'
import Hebergements from './pages/booking/etablissement/Hebergements'
import DetailsHebergements from './pages/booking/etablissement/DetailsHebergements'
import Profil from './pages/booking/etablissement/Profil'
import Descriptions from './pages/booking/etablissement/Descriptions'
import PreferencesMessages from './pages/booking/etablissement/PreferencesMessages'
import CommentairesListe from './pages/booking/commentaires/CommentairesListe'
import ExperienceClient from './pages/booking/commentaires/ExperienceClient'

function App() {
  return (
    <Routes>
      {/* Route publique - Login */}
      <Route path="/login" element={<Login />} />

      {/* Route protégée - Choix de plateforme */}
      <Route
        path="/choose-platform"
        element={
          <ProtectedRoute>
            <ChoosePlatform />
          </ProtectedRoute>
        }
      />

      {/* Routes Booking.com protégées */}
      <Route
        path="/booking/dashboard"
        element={
          <ProtectedRoute>
            <DashboardGroup />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/reservations"
        element={
          <ProtectedRoute>
            <Reservations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/reviews"
        element={
          <ProtectedRoute>
            <Reviews />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking/property/:id/accueil"
        element={
          <ProtectedRoute>
            <PropertyAccueil />
          </ProtectedRoute>
        }
      />

      {/* Routes Tarifs */}
      <Route
        path="/booking/property/:id/tarifs/calendrier"
        element={
          <ProtectedRoute>
            <Calendrier />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/tarifs/ouvrir-fermer"
        element={
          <ProtectedRoute>
            <OuvrirFermer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/tarifs/copier-tarifs"
        element={
          <ProtectedRoute>
            <CopierTarifs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/tarifs/plans"
        element={
          <ProtectedRoute>
            <PlansTarifaires />
          </ProtectedRoute>
        }
      />

      {/* Routes Promotions */}
      <Route
        path="/booking/property/:id/promotions/nouvelle"
        element={
          <ProtectedRoute>
            <NouvellePromotion />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/promotions/simuler"
        element={
          <ProtectedRoute>
            <SimulerReduction />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/promotions/actives"
        element={
          <ProtectedRoute>
            <PromotionsActives />
          </ProtectedRoute>
        }
      />

      {/* Routes Réservations */}
      <Route
        path="/booking/property/:id/reservations"
        element={
          <ProtectedRoute>
            <PropertyReservations />
          </ProtectedRoute>
        }
      />

      {/* Routes Établissement */}
      <Route
        path="/booking/property/:id/etablissement/note-qualite"
        element={
          <ProtectedRoute>
            <NoteQualite />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/etablissement/score-page"
        element={
          <ProtectedRoute>
            <ScorePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/etablissement/infos-statut"
        element={
          <ProtectedRoute>
            <InfosStatut />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/etablissement/tva-taxes"
        element={
          <ProtectedRoute>
            <TvaTaxes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/etablissement/photos"
        element={
          <ProtectedRoute>
            <Photos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/etablissement/conditions-etablissement"
        element={
          <ProtectedRoute>
            <ConditionsEtablissement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/etablissement/conditions-reservation"
        element={
          <ProtectedRoute>
            <ConditionsReservation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/etablissement/equipements-services"
        element={
          <ProtectedRoute>
            <EquipementsServices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/etablissement/hebergements"
        element={
          <ProtectedRoute>
            <Hebergements />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/etablissement/details-hebergements"
        element={
          <ProtectedRoute>
            <DetailsHebergements />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/etablissement/profil"
        element={
          <ProtectedRoute>
            <Profil />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/etablissement/descriptions"
        element={
          <ProtectedRoute>
            <Descriptions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/etablissement/preferences-messages"
        element={
          <ProtectedRoute>
            <PreferencesMessages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking/property/:id/commentaires/liste"
        element={
          <ProtectedRoute>
            <CommentairesListe />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking/property/:id/commentaires/experience"
        element={
          <ProtectedRoute>
            <ExperienceClient />
          </ProtectedRoute>
        }
      />

      {/* Redirection racine vers login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Route 404 - Redirection vers login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App