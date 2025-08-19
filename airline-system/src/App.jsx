
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './pages/traveler/Home/Header'
import HomePage from './pages/traveler/Home/HomePage'
import SearchResults from './pages/traveler/FlightList/SearchResults'
import BookingReview from './pages/traveler/BookingReview/BookingReview'
import PaymentPage from './pages/traveler/Payment/PaymentPage'
import BookingHistory from './pages/traveler/BookingHistory/BookingHistory'
import ETicket from './pages/traveler/Ticket/ETicket'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/booking-review" element={<BookingReview />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/bookings" element={<BookingHistory />} />
          <Route path="/ticket/:pnr" element={<ETicket />} />
          <Route path="/ticket" element={<ETicket />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
