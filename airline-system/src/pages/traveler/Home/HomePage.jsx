import * as React from "react"
import { useNavigate } from "react-router-dom"
import { Plane, MapPin, Calendar, Users } from "lucide-react"
import FlightSearchBar from "@/pages/traveler/Home/FlightSearchBar"

const HomePage = () => {
  const navigate = useNavigate()

  const handleSearch = (searchData) => {
    // Navigate to search results page with search parameters
    const searchParams = new URLSearchParams({
      from: searchData.from,
      to: searchData.to,
      departureDate: searchData.departureDate?.toISOString() || "",
      returnDate: searchData.returnDate?.toISOString() || "",
      passengers: searchData.passengers.toString(),
      cabinClass: searchData.cabinClass
    })
    
    navigate(`/search?${searchParams.toString()}`)
  }

  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-blue-600" />,
      title: "Global Coverage",
      description: "Search flights to over 1000 destinations worldwide"
    },
    {
      icon: <Calendar className="h-8 w-8 text-blue-600" />,
      title: "Flexible Booking",
      description: "Easy date changes and flexible cancellation policies"
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Group Bookings",
      description: "Special rates for group bookings and family travel"
    }
  ]

  const popularDestinations = [
    { city: "New York", code: "NYC", image: "🗽" },
    { city: "London", code: "LHR", image: "🇬🇧" },
    { city: "Tokyo", code: "NRT", image: "🇯🇵" },
    { city: "Paris", code: "CDG", image: "🇫🇷" },
    { city: "Dubai", code: "DXB", image: "🇦🇪" },
    { city: "Sydney", code: "SYD", image: "🇦🇺" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-50 to-indigo-100 min-h-[80vh] flex items-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-indigo-200/40 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-blue-300/20 rounded-full blur-lg"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Find & Book 
                  <span className="text-blue-600"> Great Deals</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  Compare prices from 500+ airlines and travel agencies to find the cheapest flights
                </p>
              </div>
              
              <div className="flex flex-wrap gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Free cancellation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Best price guarantee</span>
                </div>
              </div>
            </div>

            {/* Right Content - Search Bar */}
            <div className="lg:pl-12">
              <FlightSearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose SkyBooker?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make travel planning simple, affordable, and stress-free for millions of travelers worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600">
              Explore our most popular flight destinations around the world
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {popularDestinations.map((destination, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleSearch({ 
                  from: "", 
                  to: destination.code, 
                  departureDate: new Date(), 
                  returnDate: null, 
                  passengers: 1, 
                  cabinClass: "economy" 
                })}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {destination.image}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {destination.city}
                </h3>
                <p className="text-sm text-gray-500">
                  {destination.code}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Take Off?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join millions of travelers who trust SkyBooker to find their perfect flight. 
            Start your journey today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => document.querySelector('.flight-search-bar')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Search Flights Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Download Mobile App
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
