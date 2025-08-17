import * as React from "react"
import { Calendar, Users, MapPin, Edit3, ArrowRight, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const SearchSummaryBar = ({ searchData, onModifySearch, className }) => {
  const [showModifyForm, setShowModifyForm] = React.useState(false)

  const formatDate = (date) => {
    if (!date) return "Not selected"
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }

  const formatCabinClass = (cabinClass) => {
    const classes = {
      "economy": "Economy",
      "premium-economy": "Premium Economy", 
      "business": "Business",
      "first": "First Class"
    }
    return classes[cabinClass] || cabinClass
  }

  return (
    <div className={cn("sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search Summary */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
            {/* Route */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>{searchData.from || "Any"}</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <span>{searchData.to || "Any"}</span>
              </div>
            </div>

            {/* Dates */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span className="font-medium">{formatDate(searchData.departureDate)}</span>
              {searchData.returnDate && (
                <>
                  <span className="text-gray-400">|</span>
                  <span className="font-medium">{formatDate(searchData.returnDate)}</span>
                </>
              )}
            </div>

            {/* Passengers & Class */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="font-medium">
                {searchData.passengers} passenger{searchData.passengers > 1 ? 's' : ''}
              </span>
              <span className="text-gray-400">|</span>
              <span className="font-medium">{formatCabinClass(searchData.cabinClass)}</span>
            </div>
          </div>

         
        </div>

        {/* Expandable Search Form - could integrate FlightSearchBar here if needed */}
        {showModifyForm && (
          <div className="mt-6 p-6 bg-gray-50 rounded-lg border animate-in slide-in-from-top-2 fade-in duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Plane className="h-5 w-5 text-blue-600" />
                Modify Your Search
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowModifyForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                Cancel
              </Button>
            </div>
            <p className="text-gray-600 text-sm">
              Use the search form above to modify your flight search criteria and find different options.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchSummaryBar
