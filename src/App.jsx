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

      {/* Redirection racine vers login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Route 404 - Redirection vers login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App