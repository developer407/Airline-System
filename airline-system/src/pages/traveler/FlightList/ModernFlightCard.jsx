import * as React from "react"
import { 
  Clock, 
  Plane, 
  ArrowRight, 
  ChevronDown,
  ChevronUp,
  MapPin,
  Luggage,
  Utensils,
  Shield,
  Star,
  Wifi,
  Zap,
  Info,
  Bookmark,
  BookmarkCheck
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const ModernFlightCard = ({ 
  flight, 
  onViewDetails, 
  onBook,
  onBookmark,
  isBookmarked = false,
  className,
  viewMode = "list"
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    })
  }

  const formatDate = (timeString) => {
    return new Date(timeString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric"
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
      currency: "USD",
      minimumFractionDigits: 0
    }).format(price)
  }

  const getAirlineLogo = (airlineCode) => {
    const logos = {
      "AA": "🇺🇸",
      "UA": "🇺🇸", 
      "DL": "🇺🇸",
      "BA": "🇬🇧",
      "LH": "🇩🇪",
      "AF": "🇫🇷",
      "KL": "🇳🇱",
      "EK": "🇦🇪",
      "QR": "🇶🇦",
      "SQ": "🇸🇬"
    }
    return logos[airlineCode] || "✈️"
  }

  const getBadges = () => {
    const badges = []
    if (flight.price < 300) badges.push({ text: "Best Price", color: "bg-green-500" })
    if (flight.isRefundable) badges.push({ text: "Refundable", color: "bg-blue-500" })
    if (flight.stops === 0) badges.push({ text: "Non-stop", color: "bg-purple-500" })
    if (flight.seatsAvailable && flight.seatsAvailable < 10) {
      badges.push({ text: "Few seats left", color: "bg-red-500" })
    }
    return badges
  }

  const getStopInfo = () => {
    if (flight.stops === 0) return { text: "Non-stop", color: "text-green-600" }
    if (flight.stops === 1) return { text: "1 Stop", color: "text-orange-600" }
    return { text: `${flight.stops} Stops`, color: "text-red-600" }
  }

  const stopInfo = getStopInfo()
  const badges = getBadges()

  return (
    <Card 
      className={cn(
        "group transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] bg-card border-border mobile-flight-card",
        viewMode === "grid" && "max-w-md",
        "sm:hover:scale-100", // Disable hover scale on mobile
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        {/* Top Row - Airline Info & Badges */}
        <div className="flex items-center justify-between p-4 pb-2 border-b border-border">
          <div className="flex items-center gap-3">
            {/* Airline Logo */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-2xl border-2 border-background shadow-sm">
                {getAirlineLogo(flight.airlineCode)}
              </div>
            </div>
            
            {/* Airline Details */}
            <div>
              <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors">
                {flight.airlineName}
              </h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{flight.flightNumber}</span>
                <span>•</span>
                <span className="capitalize">{flight.cabinClass}</span>
              </div>
            </div>
          </div>

          {/* Badges & Bookmark */}
          <div className="flex items-center gap-2">
            {badges.slice(0, 2).map((badge, index) => (
              <span 
                key={index}
                className={cn(
                  "px-2 py-1 text-xs font-medium text-white rounded-full",
                  badge.color
                )}
              >
                {badge.text}
              </span>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onBookmark?.(flight)}
              className="ml-2 p-1 "
            >
              {isBookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-primary" />
              ) : (
                <Bookmark className="h-4 w-4 text-muted-foreground hover:text-primary" />
              )}
            </Button>
          </div>
        </div>

        {/* Middle Row - Flight Details (3 columns) */}
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4 items-center md:grid-cols-3 sm:grid-cols-1 sm:gap-6 sm:text-center mobile-flight-details">
            {/* Departure Info */}
            <div className="text-left">
              <div className="text-3xl font-bold text-foreground mb-1">
                {formatTime(flight.departureTime)}
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-foreground mb-1">
                <MapPin className="h-3 w-3" />
                <span>{flight.fromAirport}</span>
              </div>
              <div className="text-xs text-muted-foreground">{flight.fromCity}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {formatDate(flight.departureTime)}
              </div>
            </div>

            {/* Duration & Stops */}
            <div className="flex flex-col items-center">
              <div className="text-sm font-medium text-muted-foreground mb-2">
                {formatDuration(flight.duration)}
              </div>
              
              {/* Flight Path Visualization */}
              <div className="relative w-full flex items-center">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <div className="flex-1 relative">
                  <div className="h-0.5 bg-primary w-full"></div>
                  <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-primary bg-background rounded-full p-0.5" />
                  {flight.stops > 0 && (
                    <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full"></div>
                  )}
                </div>
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              </div>
              
              <div className={cn("text-xs font-medium mt-2", stopInfo.color)}>
                {stopInfo.text}
              </div>
            </div>

            {/* Arrival Info */}
            <div className="text-right">
              <div className="text-3xl font-bold text-foreground mb-1">
                {formatTime(flight.arrivalTime)}
              </div>
              <div className="flex items-center justify-end gap-1 text-sm font-semibold text-foreground mb-1">
                <span>{flight.toAirport}</span>
                <MapPin className="h-3 w-3" />
              </div>
              <div className="text-xs text-muted-foreground">{flight.toCity}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {formatDate(flight.arrivalTime)}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & CTA Section */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border sm:flex-col sm:items-stretch sm:gap-4 md:flex-row md:items-center  mobile-price-section">
            {/* Price */}
            <div>
              <div className="text-2xl font-bold text-primary">
                {formatPrice(flight.price)}
              </div>
              <div className="text-xs text-muted-foreground">per person</div>
              <Button
              size={"small"}
              variant={"ghost"}
                className="mt-1"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                Fare breakdown
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 sm:flex-col md:flex-row md:w-auto sm:w-full mobile-action-buttons">
              <Button
                variant="outline"
                onClick={() => {
                  setIsExpanded(!isExpanded)
                  onViewDetails?.(flight)
                }}
                className=""
              >
                View Details
                {isExpanded ? (
                  <ChevronUp className="ml-2 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" />
                )}
              </Button>
              <Button
                onClick={() => onBook?.(flight)}
                className=""
              >
                Book Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Expandable Additional Info */}
        {isExpanded && (
          <div className="border-t border-border bg-muted/50 animate-in slide-in-from-top-2 fade-in duration-300">
            <div className="p-4 space-y-4">
              {/* Fare Breakdown */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">Fare Breakdown</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Base fare</span>
                    <span className="text-foreground">{formatPrice(flight.price * 0.8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes & fees</span>
                    <span className="text-foreground">{formatPrice(flight.price * 0.2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-1">
                    <span>Total</span>
                    <span>{formatPrice(flight.price)}</span>
                  </div>
                </div>
              </div>

              {/* Flight Amenities */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">Included</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Luggage className="h-4 w-4 text-blue-600" />
                    <span>Personal item</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Wifi className="h-4 w-4 text-blue-600" />
                    <span>Free WiFi</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Utensils className="h-4 w-4 text-blue-600" />
                    <span>Snacks included</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>{flight.isRefundable ? 'Refundable' : 'Non-refundable'}</span>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Aircraft:</span>
                  <span className="text-muted-foreground ml-1">Boeing 737-800</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">On-time:</span>
                  <span className="text-green-600 ml-1 font-medium">94%</span>
                </div>
              </div>

              {/* Carbon Footprint */}
              <div className="flex items-center justify-between text-sm text-muted-foreground bg-green-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-600" />
                  <span>Carbon footprint: 285 kg CO₂</span>
                </div>
                <span className="text-green-700 font-medium">22% below average</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default ModernFlightCard
