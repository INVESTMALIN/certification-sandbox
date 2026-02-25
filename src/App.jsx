// Booking
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
import ConditionsEnfants from './pages/booking/etablissement/conditions/ConditionsEnfants'
import ConditionsLits from './pages/booking/etablissement/conditions/ConditionsLits'
import FraisSupplementaires from './pages/booking/etablissement/conditions/FraisSupplementaires'
import ConditionsDommages from './pages/booking/etablissement/conditions/ConditionsDommages'
import RemiseCles from './pages/booking/etablissement/conditions/RemiseCles'
import CommentRecevoirReservations from './pages/booking/etablissement/conditions/CommentRecevoirReservations'
import ConditionsReservation from './pages/booking/etablissement/ConditionsReservation'
import EquipementsServices from './pages/booking/etablissement/EquipementsServices'
import Hebergements from './pages/booking/etablissement/Hebergements'
import DetailsHebergements from './pages/booking/etablissement/DetailsHebergements'
import Profil from './pages/booking/etablissement/Profil'
import Descriptions from './pages/booking/etablissement/Descriptions'
import PreferencesMessages from './pages/booking/etablissement/PreferencesMessages'
import CommentairesListe from './pages/booking/commentaires/CommentairesListe'
import ExperienceClient from './pages/booking/commentaires/ExperienceClient'
import ReservationDetail from './pages/booking/reservations/ReservationDetail'
import ReservationsDemandes from './pages/booking/reservations/ReservationsDemandes'
import Inbox from './pages/booking/inbox/Inbox'
import BookingMessages from './pages/booking/inbox/BookingMessages'
import SignalerComportement from './pages/booking/reservations/SignalerComportement'
import DamageClaim from './pages/booking/reservations/DamageClaim'
import DamageClaimStep1 from './pages/booking/reservations/DamageClaimStep1'
import DamageClaimStep2 from './pages/booking/reservations/DamageClaimStep2'
import DamageClaimStep3 from './pages/booking/reservations/DamageClaimStep3'


// Airbnb
import AirbnbHome from './pages/airbnb/AirbnbHome'
import AirbnbDashboard from './pages/airbnb/AirbnbDashboard'
import AirbnbReservationDetail from './pages/airbnb/ReservationDetail'
import DemandeDetail from './pages/airbnb/DemandeDetail'
import RemboursementDetail from './pages/airbnb/RemboursementDetail'
import CommentaireStep1 from './pages/airbnb/CommentaireStep1'
import CommentaireStep2 from './pages/airbnb/CommentaireStep2'
import CommentaireStep3 from './pages/airbnb/CommentaireStep3'
import CommentaireStep4 from './pages/airbnb/CommentaireStep4'
import CommentaireStep5 from './pages/airbnb/CommentaireStep5'
import CommentaireStep6 from './pages/airbnb/CommentaireStep6'
import CommentaireStep7 from './pages/airbnb/CommentaireStep7'
import AirbnbCalendar from './pages/airbnb/AirbnbCalendar'
import AirbnbCalendarMono from './pages/airbnb/AirbnbCalendarMono'
import AirbnbAnnonces from './pages/airbnb/AirbnbAnnonces'
import AirbnbMessages from './pages/airbnb/AirbnbMessages'
import AirbnbCentreAide from './pages/airbnb/AirbnbCentreAide'
import AirbnbVoyageurProfile from './pages/airbnb/AirbnbVoyageurProfile'
import AirbnbReservationRecap from './pages/airbnb/AirbnbReservationRecap'

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

      <Route
        path="/booking/property/:id/reservations/liste"
        element={
          <ProtectedRoute>
            <PropertyReservations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/reservations/demandes"
        element={
          <ProtectedRoute>
            <ReservationsDemandes />
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
        path="/booking/property/:id/etablissement/conditions-etablissement/enfants"
        element={
          <ProtectedRoute>
            <ConditionsEnfants />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/etablissement/conditions-etablissement/lits"
        element={
          <ProtectedRoute>
            <ConditionsLits />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/etablissement/conditions-etablissement/frais"
        element={
          <ProtectedRoute>
            <FraisSupplementaires />
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

      <Route
        path="/booking/property/:id/reservations/:reservationId"
        element={
          <ProtectedRoute>
            <ReservationDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking/property/:id/reservations/:reservationId/report-behavior"
        element={
          <ProtectedRoute>
            <SignalerComportement />
          </ProtectedRoute>
        }
      />


      <Route
        path="/booking/property/:id/inbox"
        element={
          <ProtectedRoute>
            <Inbox />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/inbox/booking-messages"
        element={
          <ProtectedRoute>
            <BookingMessages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking/property/:id/reservations/:reservationId/damage-claim"
        element={
          <ProtectedRoute>
            <DamageClaim />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking/property/:id/reservations/:reservationId/damage-claim/step1"
        element={
          <ProtectedRoute>
            <DamageClaimStep1 />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking/property/:id/reservations/:reservationId/damage-claim/step2"
        element={
          <ProtectedRoute>
            <DamageClaimStep2 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/reservations/:reservationId/damage-claim/step3"
        element={
          <ProtectedRoute>
            <DamageClaimStep3 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/etablissement/conditions-etablissement/dommages"
        element={
          <ProtectedRoute>
            <ConditionsDommages />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/etablissement/conditions-etablissement/remise-cles"
        element={
          <ProtectedRoute>
            <RemiseCles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking/property/:id/etablissement/conditions-etablissement/recevoir-reservations"
        element={
          <ProtectedRoute>
            <CommentRecevoirReservations />
          </ProtectedRoute>
        }
      />




      {/* Routes Airbnb protégées */}

      <Route
        path="/airbnb/home"
        element={
          <ProtectedRoute>
            <AirbnbHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/airbnb/dashboard"
        element={
          <ProtectedRoute>
            <AirbnbDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/airbnb/calendrier"
        element={
          <ProtectedRoute>
            <AirbnbCalendar />
          </ProtectedRoute>
        }
      />

      <Route
        path="/airbnb/calendar/:propertyId"
        element={
          <ProtectedRoute>
            <AirbnbCalendarMono />
          </ProtectedRoute>
        }
      />

      <Route
        path="/airbnb/annonces"
        element={
          <ProtectedRoute>
            <AirbnbAnnonces />
          </ProtectedRoute>
        }
      />

      <Route
        path="/airbnb/messages"
        element={
          <ProtectedRoute>
            <AirbnbMessages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/airbnb/centre-aide"
        element={
          <ProtectedRoute>
            <AirbnbCentreAide />
          </ProtectedRoute>
        }
      />

      <Route
        path="/airbnb/reservation/:id"
        element={
          <ProtectedRoute>
            <AirbnbReservationDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/airbnb/demande/:id"
        element={
          <ProtectedRoute>
            <DemandeDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/airbnb/remboursement/:id"
        element={
          <ProtectedRoute>
            <RemboursementDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/airbnb/commentaire/:reservationId/step1"
        element={
          <ProtectedRoute>
            <CommentaireStep1 />
          </ProtectedRoute>
        }
      />

      <Route
        path="/airbnb/commentaire/:reservationId/step2"
        element={
          <ProtectedRoute>
            <CommentaireStep2 />
          </ProtectedRoute>
        }
      />

      <Route
        path="/airbnb/commentaire/:reservationId/step3"
        element={
          <ProtectedRoute>
            <CommentaireStep3 />
          </ProtectedRoute>
        }
      />

      <Route
        path="/airbnb/commentaire/:reservationId/step4"
        element={
          <ProtectedRoute>
            <CommentaireStep4 />
          </ProtectedRoute>
        }
      />

      <Route
        path="/airbnb/commentaire/:reservationId/step5"
        element={
          <ProtectedRoute>
            <CommentaireStep5 />
          </ProtectedRoute>
        }
      />

      <Route
        path="/airbnb/commentaire/:reservationId/step6"
        element={
          <ProtectedRoute>
            <CommentaireStep6 />
          </ProtectedRoute>
        }
      />

      <Route
        path="/airbnb/commentaire/:reservationId/step7"
        element={
          <ProtectedRoute>
            <CommentaireStep7 />
          </ProtectedRoute>
        }
      />

      <Route
        path="/airbnb/voyageur/:reservationId"
        element={
          <ProtectedRoute>
            <AirbnbVoyageurProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/airbnb/recap/:id"
        element={
          <ProtectedRoute>
            <AirbnbReservationRecap />
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