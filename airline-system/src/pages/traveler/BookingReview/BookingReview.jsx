import * as React from "react"
import { useSearchParams, useNavigate, useLocation } from "react-router-dom"
import { 
  ChevronLeft,

  CreditCard,
 
  CheckCircle,
 
} from "lucide-react"
import { Button } from "@/components/ui/button"


// Import components
import FlightSummarySection from "./FlightSummarySection"
import FareUpgradeBox from "./FareUpgradeBox"
import TravelInsurance from "./TravelInsurance"
import TravellerDetailsForm from "./TravellerDetails/TravellerDetailsForm"
import SeatsMealsSelector from "./SeatsMealsSelector"
import AddOnsSection from "./AddOnsSection"
import PriceSummaryBox from "./PriceSummaryBox"
import ImportantInfo from "./ImportantInfo"
import TestimonialsSection from "./TestimonialsSection"
import { useEffect } from "react"
import { useMemo } from "react"

const BookingReview = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get flight data from location state (passed from search results)
  const selectedFlight = location.state?.flight
  
  // Booking state management
  const [bookingData, setBookingData] = React.useState({
    selectedFare: "regular",
    insurance: false,
    travelers: [
      {
        id: 1,
        type: "ADULT",
        title: "",
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        nationality: "IN",
        frequentFlyerNumber: ""
      }
    ],
    contactInfo: {
      countryCode: "+91",
      mobile: "",
      email: "",
      gstNumber: ""
    },
    seats: {},
    meals: {},
    addOns: {
      extraBaggage: false,
      priorityCheckin: false,
      fastTrack: false,
      loungeAccess: false,
      lockPrice: false
    }
  })

  const [activeSection, setActiveSection] = React.useState("flight-summary")
  const [isLoading, setIsLoading] = React.useState(false)
  const [validationErrors, setValidationErrors] = React.useState({})

  // Get search data from URL parameters or location state
  const searchData = location.state?.searchData || {
    from: searchParams.get("from") || "GZB",
    to: searchParams.get("to") || "BLR",
    departureDate: searchParams.get("departureDate") ? new Date(searchParams.get("departureDate")) : new Date(),
    returnDate: searchParams.get("returnDate") ? new Date(searchParams.get("returnDate")) : null,
    passengers: parseInt(searchParams.get("passengers") || "1"),
    cabinClass: searchParams.get("cabinClass") || "economy",
    adults: parseInt(searchParams.get("adults") || "1"),
    children: parseInt(searchParams.get("children") || "0"),
    infants: parseInt(searchParams.get("infants") || "0")
  }

  // Get booking-specific parameters
  const bookingParams = {
    itineraryId: searchParams.get("itineraryId"),
    currency: searchParams.get("cur") || searchParams.get("userCurrency") || "INR",
    countryCode: searchParams.get("ccde") || "IN",
    correlationId: searchParams.get("crId"),
    requestKey: searchParams.get("rKey"),
    encodedFlightData: searchParams.get("xflt")
  }

  // Calculate pricing
  const calculateTotalPrice = React.useCallback(() => {
    if (!selectedFlight) return 0
    
    let basePrice = selectedFlight.price * searchData.passengers
    let addOnPrice = 0
    
    // Add fare upgrade
    if (bookingData.selectedFare === "premium") {
      addOnPrice += 500 * searchData.passengers
    }
    
    // Add insurance
    if (bookingData.insurance) {
      addOnPrice += 379 * searchData.passengers
    }
    
    // Add-ons pricing
    if (bookingData.addOns.extraBaggage) addOnPrice += 1200
    if (bookingData.addOns.priorityCheckin) addOnPrice += 600
    if (bookingData.addOns.fastTrack) addOnPrice += 800
    if (bookingData.addOns.loungeAccess) addOnPrice += 2500
    if (bookingData.addOns.lockPrice) addOnPrice += 672
    
    return basePrice + addOnPrice
  }, [selectedFlight, searchData.passengers, bookingData])

  const updateBookingData = (section, data) => {
    setBookingData(prev => ({
      ...prev,
      [section]: data
    }))
  }

  const validateForm = () => {
    const errors = {}
    
    // Validate travelers
    bookingData.travelers.forEach((traveler, index) => {
      if (!traveler.firstName?.trim()) {
        errors[`traveler_${index}_firstName`] = "First name is required"
      }
      if (!traveler.lastName?.trim()) {
        errors[`traveler_${index}_lastName`] = "Last name is required"
      }
      if (!traveler.gender) {
        errors[`traveler_${index}_gender`] = "Gender is required"
      }
      if (!traveler.dateOfBirth) {
        errors[`traveler_${index}_dob`] = "Date of birth is required"
      }
    })
    
    // Validate contact info
    if (!bookingData.contactInfo.mobile?.trim()) {
      errors.mobile = "Mobile number is required"
    }
    if (!bookingData.contactInfo.email?.trim()) {
      errors.email = "Email is required"
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleProceedToPayment = () => {
    if (validateForm()) {
      setIsLoading(true)
      // Simulate API call
      setTimeout(() => {
        // Create payment URL with parameters
        const paymentParams = new URLSearchParams({
          itineraryId: bookingParams.itineraryId,
          cur: bookingParams.currency,
          ccde: bookingParams.countryCode,
          crId: bookingParams.correlationId,
          rKey: bookingParams.requestKey,
          totalAmount: calculateTotalPrice().toString(),
          from: searchData.from,
          to: searchData.to,
          passengers: searchData.passengers.toString()
        })

        navigate(`/payment?${paymentParams.toString()}`, { 
          state: { 
            bookingData, 
            flight: selectedFlight, 
            searchData,
            bookingParams,
            totalPrice: calculateTotalPrice()
          } 
        })
        setIsLoading(false)
      }, 1000)
    }
  }

  // Debug logging for parameters
  useEffect(() => {
    console.log("BookingReview Parameters:", {
      searchData,
      bookingParams,
      selectedFlight: selectedFlight ? `${selectedFlight.airlineName} ${selectedFlight.flightNumber}` : "No flight"
    })
  }, [searchData, bookingParams, selectedFlight])

  // If no flight selected, redirect back
  if (!selectedFlight) {
    useEffect(() => {
      navigate("/search-results")
    }, [navigate])
    return null
  }

  const sectionProgress = useMemo(() => {
    const sections = ["flight-summary", "fare-options", "insurance", "traveler-details", "seats-meals", "addons"]
    const completed = sections.filter(section => {
      switch (section) {
        case "traveler-details":
          return bookingData.travelers.every(t => t.firstName && t.lastName && t.gender && t.dateOfBirth) && 
                 bookingData.contactInfo.mobile && bookingData.contactInfo.email
        default:
          return true
      }
    })
    return { completed: completed.length, total: sections.length }
  }, [bookingData])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="p-2"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Review Your Booking</h1>
                <p className="text-sm text-muted-foreground">
                  {searchData.from} → {searchData.to} • {searchData.passengers} passenger{searchData.passengers > 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            {/* Progress Indicator */}
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span>{sectionProgress.completed}/{sectionProgress.total} sections completed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Flight Summary Section */}
            <FlightSummarySection 
              flight={selectedFlight}
              searchData={searchData}
              isActive={activeSection === "flight-summary"}
              onToggle={() => setActiveSection(activeSection === "flight-summary" ? "" : "flight-summary")}
            />

            {/* Fare Options */}
            <FareUpgradeBox
              selectedFare={bookingData.selectedFare}
              onFareChange={(fare) => updateBookingData("selectedFare", fare)}
              passengerCount={searchData.passengers}
            />

            {/* Travel Insurance */}
            <TravelInsurance
              selected={bookingData.insurance}
              onChange={(selected) => updateBookingData("insurance", selected)}
              passengerCount={searchData.passengers}
            />

            {/* Traveller Details */}
            <TravellerDetailsForm
              travelers={bookingData.travelers}
              contactInfo={bookingData.contactInfo}
              onTravelersChange={(travelers) => updateBookingData("travelers", travelers)}
              onContactChange={(contact) => updateBookingData("contactInfo", contact)}
              validationErrors={validationErrors}
              passengerCount={searchData.passengers}
            />

            {/* Seats & Meals */}
            <SeatsMealsSelector
              flight={selectedFlight}
              travelers={bookingData.travelers}
              selectedSeats={bookingData.seats}
              selectedMeals={bookingData.meals}
              onSeatsChange={(seats) => updateBookingData("seats", seats)}
              onMealsChange={(meals) => updateBookingData("meals", meals)}
            />

            {/* Add-ons */}
            <AddOnsSection
              selectedAddOns={bookingData.addOns}
              onChange={(addOns) => updateBookingData("addOns", addOns)}
              flightPrice={selectedFlight.price}
            />

            {/* Important Info */}
            <ImportantInfo flight={selectedFlight} />

            {/* Testimonials */}
            <TestimonialsSection />
          </div>

          {/* Price Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <PriceSummaryBox
                flight={selectedFlight}
                bookingData={bookingData}
                searchData={searchData}
                totalPrice={calculateTotalPrice()}
                onProceedToPayment={handleProceedToPayment}
                isLoading={isLoading}
                hasErrors={Object.keys(validationErrors).length > 0}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">
              ₹{calculateTotalPrice().toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">Total Amount</p>
          </div>
          <Button
            onClick={handleProceedToPayment}
            disabled={isLoading || Object.keys(validationErrors).length > 0}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Proceed to Payment
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BookingReview
