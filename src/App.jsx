import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import ChoosePlatform from './pages/ChoosePlatform'
import DashboardGroup from './pages/booking/DashboardGroup'
import Reservations from './pages/booking/Reservations'
import Reviews from './pages/booking/Reviews'

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

      {/* Redirection racine vers login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Route 404 - Redirection vers login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App