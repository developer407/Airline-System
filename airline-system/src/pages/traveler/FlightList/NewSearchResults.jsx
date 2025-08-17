import * as React from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { 
  SlidersHorizontal, 
  Menu,
  X,
  Bookmark
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Import new components
import SearchSummaryBar from "./SearchSummaryBar"
import FiltersSidebar from "./Filterssidebar"
import SortingBar from "./SortingBar"
import ModernFlightCard from "./ModernFlightCard"
import { 
  SearchResultsLoading, 
  SearchingFlights, 
  NoResultsFound,
  FiltersSkeleton 
} from "./LoadingStates"

import FlightSearchBar from "@/pages/traveler/Home/FlightSearchBar"
import { flights } from "../data/Flights"
import "./animations.css"

const NewSearchResults = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  
  // Extract search parameters
  const searchData = {
    from: searchParams.get("from") || "",
    to: searchParams.get("to") || "",
    departureDate: searchParams.get("departureDate") ? new Date(searchParams.get("departureDate")) : null,
    returnDate: searchParams.get("returnDate") ? new Date(searchParams.get("returnDate")) : null,
    passengers: parseInt(searchParams.get("passengers") || "1"),
    cabinClass: searchParams.get("cabinClass") || "economy"
  }

  // Enhanced state management
  const [filteredFlights, setFilteredFlights] = React.useState(flights)
  const [sortBy, setSortBy] = React.useState("price")
  const [sortOrder, setSortOrder] = React.useState("asc")
  const [viewMode, setViewMode] = React.useState("list")
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSearching, setIsSearching] = React.useState(false)
  const [showMobileFilters, setShowMobileFilters] = React.useState(false)
  const [bookmarkedFlights, setBookmarkedFlights] = React.useState(new Set())
  
  // Enhanced filters state
  const [filters, setFilters] = React.useState({
    airlines: [],
    priceRange: { min: 0, max: 1000 },
    stops: "any",
    departureTimeRange: "any",
    arrivalTimeRange: "any", 
    maxDuration: 1440, // 24 hours in minutes
    refundable: false,
    alliance: "any",
    baggageIncluded: false
  })

  // Enhanced search handler with loading state
  const handleSearch = async (newSearchData) => {
    setIsSearching(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const searchParams = new URLSearchParams({
      from: newSearchData.from,
      to: newSearchData.to,
      departureDate: newSearchData.departureDate?.toISOString() || "",
      returnDate: newSearchData.returnDate?.toISOString() || "",
      passengers: newSearchData.passengers.toString(),
      cabinClass: newSearchData.cabinClass
    })
    
    setIsSearching(false)
    navigate(`/search-results?${searchParams.toString()}`)
  }

  // Enhanced filtering and sorting logic
  React.useEffect(() => {
    setIsLoading(true)
    
    // Simulate processing delay for better UX
    setTimeout(() => {
      let filtered = [...flights]

      // Filter by airlines
      if (filters.airlines.length > 0) {
        filtered = filtered.filter(flight => 
          filters.airlines.includes(flight.airlineCode)
        )
      }

      // Filter by price range
      filtered = filtered.filter(flight => 
        flight.price >= filters.priceRange.min && flight.price <= filters.priceRange.max
      )

      // Filter by stops
      if (filters.stops !== "any") {
        if (filters.stops === "0") {
          filtered = filtered.filter(flight => flight.stops === 0)
        } else if (filters.stops === "1") {
          filtered = filtered.filter(flight => flight.stops === 1)
        } else if (filters.stops === "2") {
          filtered = filtered.filter(flight => flight.stops >= 2)
        }
      }

      // Filter by departure time
      if (filters.departureTimeRange !== "any") {
        filtered = filtered.filter(flight => {
          const hour = new Date(flight.departureTime).getHours()
          switch (filters.departureTimeRange) {
            case "morning": return hour >= 6 && hour < 12
            case "afternoon": return hour >= 12 && hour < 18
            case "evening": return hour >= 18 && hour < 24
            case "night": return hour >= 0 && hour < 6
            default: return true
          }
        })
      }

      // Filter by arrival time
      if (filters.arrivalTimeRange !== "any") {
        filtered = filtered.filter(flight => {
          const hour = new Date(flight.arrivalTime).getHours()
          switch (filters.arrivalTimeRange) {
            case "morning": return hour >= 6 && hour < 12
            case "afternoon": return hour >= 12 && hour < 18
            case "evening": return hour >= 18 && hour < 24
            case "night": return hour >= 0 && hour < 6
            default: return true
          }
        })
      }

      // Filter by max duration
      filtered = filtered.filter(flight => flight.duration <= filters.maxDuration)

      // Filter by refundable
      if (filters.refundable) {
        filtered = filtered.filter(flight => flight.isRefundable)
      }

      // Apply sorting with order
      filtered.sort((a, b) => {
        let comparison = 0
        switch (sortBy) {
          case "price":
            comparison = a.price - b.price
            break
          case "duration":
            comparison = a.duration - b.duration
            break
          case "departure":
            comparison = new Date(a.departureTime) - new Date(b.departureTime)
            break
          case "arrival":
            comparison = new Date(a.arrivalTime) - new Date(b.arrivalTime)
            break
          case "airline":
            comparison = a.airlineName.localeCompare(b.airlineName)
            break
          default:
            comparison = 0
        }
        return sortOrder === "asc" ? comparison : -comparison
      })

      setFilteredFlights(filtered)
      setIsLoading(false)
    }, 300)
  }, [filters, sortBy, sortOrder, flights])

  // Handler functions
  const handleBookmark = (flight) => {
    setBookmarkedFlights(prev => {
      const newSet = new Set(prev)
      if (newSet.has(flight.id)) {
        newSet.delete(flight.id)
      } else {
        newSet.add(flight.id)
      }
      return newSet
    })
  }

  const handleViewDetails = (flight) => {
    console.log("View details for flight:", flight.flightNumber)
    // In a real app, navigate to flight details page or open modal
  }

  const handleBookFlight = (flight) => {
    console.log("Book flight:", flight.flightNumber)
    // In a real app, navigate to booking page
  }

  const clearAllFilters = () => {
    setFilters({
      airlines: [],
      priceRange: { min: 0, max: 1000 },
      stops: "any",
      departureTimeRange: "any",
      arrivalTimeRange: "any",
      maxDuration: 1440,
      refundable: false,
      alliance: "any",
      baggageIncluded: false
    })
  }

  // Get unique airlines for filter
  const airlines = [...new Set(flights.map(f => ({ code: f.airlineCode, name: f.airlineName })))]

  if (isSearching) {
    return <SearchingFlights />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-gray-50 bg-pattern-dots">
      {/* Enhanced Search Bar Section */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <FlightSearchBar 
            onSearch={handleSearch}
            className="max-w-5xl mx-auto"
          />
        </div>
      </div>

      {/* Search Summary Bar */}
      <SearchSummaryBar 
        searchData={searchData}
        onModifySearch={handleSearch}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters & Sort
            {showMobileFilters ? <X className="h-4 w-4 ml-auto" /> : <Menu className="h-4 w-4 ml-auto" />}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Enhanced Filters Sidebar */}
          <div className={cn(
            "lg:col-span-1",
            showMobileFilters ? "block" : "hidden lg:block"
          )}>
            {isLoading ? (
              <FiltersSkeleton />
            ) : (
              <FiltersSidebar
                filters={filters}
                onFiltersChange={setFilters}
                airlines={airlines}
                className="animate-slide-in-left"
              />
            )}
          </div>

          {/* Flight Results Section */}
          <div className="lg:col-span-3 space-y-4">
            {/* Enhanced Sorting Bar */}
            <SortingBar
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={setSortBy}
              onSortOrderChange={setSortOrder}
              resultsCount={filteredFlights.length}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              className="animate-slide-in-top"
            />

            {/* Flight Results */}
            {isLoading ? (
              <SearchResultsLoading count={5} />
            ) : filteredFlights.length === 0 ? (
              <NoResultsFound onClearFilters={clearAllFilters} />
            ) : (
              <div className={cn(
                viewMode === "grid" 
                  ? "grid grid-cols-1 xl:grid-cols-2 gap-4" 
                  : "space-y-4"
              )}>
                {filteredFlights.map((flight, index) => (
                  <div
                    key={flight.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ModernFlightCard
                      flight={flight}
                      onViewDetails={handleViewDetails}
                      onBook={handleBookFlight}
                      onBookmark={handleBookmark}
                      isBookmarked={bookmarkedFlights.has(flight.id)}
                      viewMode={viewMode}
                      className="card-hover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button - for pagination simulation */}
            {filteredFlights.length > 0 && !isLoading && (
              <div className="flex justify-center pt-8">
                <Button
                  variant="outline"
                  className="px-8 py-3 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:shadow-lg"
                >
                  Load more flights
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full w-12 h-12 p-0 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 float-animation"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-lg">⬆️</span>
          </Button>
          
          {bookmarkedFlights.size > 0 && (
            <Button
              variant="secondary"
              size="sm"
              className="rounded-full w-12 h-12 p-0 bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 float-animation"
              style={{ animationDelay: '1s' }}
            >
              <Bookmark className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {bookmarkedFlights.size}
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewSearchResults
