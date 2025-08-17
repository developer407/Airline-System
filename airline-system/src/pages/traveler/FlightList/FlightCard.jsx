import * as React from "react"
import { Clock, Plane, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const FlightCard = ({ flight, onViewDetails, className }) => {
  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    })
  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(price)
  }

  const getAirlineLogo = (airlineCode) => {
    // In a real app, you'd have actual airline logos
    const logos = {
      "AA": "🇺🇸", // American Airlines
      "UA": "🇺🇸", // United Airlines
      "DL": "🇺🇸", // Delta Air Lines
      "BA": "🇬🇧", // British Airways
      "LH": "🇩🇪", // Lufthansa
      "AF": "🇫🇷", // Air France
      "KL": "🇳🇱", // KLM
      "EK": "🇦🇪", // Emirates
      "QR": "🇶🇦", // Qatar Airways
      "SQ": "🇸🇬", // Singapore Airlines
    }
    return logos[airlineCode] || "✈️"
  }

  return (
    <Card className={cn("hover:shadow-lg transition-shadow cursor-pointer", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          {/* Airline Info */}
          <div className="flex items-center gap-3">
            <div className="text-2xl">
              {getAirlineLogo(flight.airlineCode)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                {flight.airlineName}
              </h3>
              <p className="text-sm text-gray-500">
                {flight.flightNumber}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {formatPrice(flight.price)}
            </div>
            <div className="text-sm text-gray-500">
              per person
            </div>
          </div>
        </div>

        {/* Flight Route and Times */}
        <div className="flex items-center justify-between mb-4">
          {/* Departure */}
          <div className="flex-1 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {formatTime(flight.departureTime)}
            </div>
            <div className="text-sm text-gray-500 font-medium">
              {flight.fromAirport}
            </div>
            <div className="text-xs text-gray-400">
              {flight.fromCity}
            </div>
          </div>

          {/* Flight Duration and Route */}
          <div className="flex-1 flex flex-col items-center px-4">
            <div className="flex items-center gap-2 text-gray-400 mb-1">
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
              <div className="flex-1 h-px bg-gray-300 relative">
                <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 bg-white" />
              </div>
              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
            </div>
            <div className="text-sm text-gray-500">
              {formatDuration(flight.duration)}
            </div>
            {flight.stops > 0 && (
              <div className="text-xs text-orange-600 font-medium">
                {flight.stops} stop{flight.stops > 1 ? 's' : ''}
              </div>
            )}
            {flight.stops === 0 && (
              <div className="text-xs text-green-600 font-medium">
                Non-stop
              </div>
            )}
          </div>

          {/* Arrival */}
          <div className="flex-1 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {formatTime(flight.arrivalTime)}
            </div>
            <div className="text-sm text-gray-500 font-medium">
              {flight.toAirport}
            </div>
            <div className="text-xs text-gray-400">
              {flight.toCity}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Departs: {new Date(flight.departureTime).toLocaleDateString()}</span>
            </div>
            <div className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">
              {flight.cabinClass}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {flight.isRefundable && (
              <span className="text-green-600 text-xs font-medium">Refundable</span>
            )}
            {flight.seatsAvailable && flight.seatsAvailable < 10 && (
              <span className="text-orange-600 text-xs font-medium">
                Only {flight.seatsAvailable} seats left
              </span>
            )}
          </div>
        </div>

        {/* View Details Button */}
        <Button 
          onClick={() => onViewDetails?.(flight)}
          className="w-full"
          variant="outline"
        >
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  )
}

export default FlightCard
