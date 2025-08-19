
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Header from './pages/traveler/Home/Header'
import HomePage from './pages/traveler/Home/HomePage'
import SearchResults from './pages/traveler/FlightList/SearchResults'
import BookingReview from './pages/traveler/BookingReview/BookingReview'
import PaymentPage from './pages/traveler/Payment/PaymentPage'
import BookingHistory from './pages/traveler/BookingHistory/BookingHistory'
import ETicket from './pages/traveler/Ticket/ETicket'
import AirlineDashboard from './pages/airline/Dashboard/AirlineDashboard'
import SuperAdminDashboard from './pages/super-admin/Dashboard/SuperAdminDashboard'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Traveler Routes */}
          <Route path="/traveler" element={
            <div>
              <Header />
              <HomePage />
            </div>
          } />
          <Route path="/search" element={
            <div>
              <Header />
              <SearchResults />
            </div>
          } />
          <Route path="/search-results" element={
            <div>
              <Header />
              <SearchResults />
            </div>
          } />
          <Route path="/booking-review" element={
            <div>
              <Header />
              <BookingReview />
            </div>
          } />
          <Route path="/payment" element={
            <div>
              <Header />
              <PaymentPage />
            </div>
          } />
          <Route path="/bookings" element={
            <div>
              <Header />
              <BookingHistory />
            </div>
          } />
          <Route path="/ticket/:pnr" element={
            <div>
              <Header />
              <ETicket />
            </div>
          } />
          <Route path="/ticket" element={
            <div>
              <Header />
              <ETicket />
            </div>
          } />
          
          {/* Airline Dashboard Routes */}
          <Route path="/airline/*" element={<AirlineDashboard />} />
          
          {/* Super Admin Dashboard Routes */}
          <Route path="/super-admin/*" element={<SuperAdminDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
