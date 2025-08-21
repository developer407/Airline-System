import * as React from "react"
import { 
  ChevronDown, 
  ChevronUp, 
  Plane, 
  Clock, 
  MapPin, 
  Luggage,
  AlertTriangle,
  Info
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const FlightSummarySection = ({ flight, searchData, isActive, onToggle }) => {
  const [expandedSegments, setExpandedSegments] = React.useState({})

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    })
  }

  const formatDate = (timeString) => {
    return new Date(timeString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    })
  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
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

  const toggleSegment = (segmentId) => {
    setExpandedSegments(prev => ({
      ...prev,
      [segmentId]: !prev[segmentId]
    }))
  }

  // Mock multi-segment data - in real app this would come from API
  const flightSegments = [
    {
      id: "outbound",
      type: "Outbound Journey",
      route: `${searchData.from} → ${searchData.to}`,
      date: formatDate(flight.departureTime),
      legs: [
        {
          id: "leg1",
          airline: flight.airlineName,
          airlineCode: flight.airlineCode,
          flightNumber: flight.flightNumber,
          aircraft: "Boeing 737-800",
          departure: {
            time: flight.departureTime,
            airport: flight.fromAirport,
            city: flight.fromCity,
            terminal: "T1"
          },
          arrival: {
            time: flight.arrivalTime,
            airport: flight.toAirport,
            city: flight.toCity,
            terminal: "T2"
          },
          duration: flight.duration,
          stops: flight.stops,
          cabinClass: flight.cabinClass,
          fareType: "Xpress Value",
          baggage: {
            cabin: "7 kg",
            checkin: "15 kg"
          }
        }
      ]
    }
  ]

  // Add return journey if it's a round trip
  if (searchData.returnDate) {
    flightSegments.push({
      id: "return",
      type: "Return Journey", 
      route: `${searchData.to} → ${searchData.from}`,
      date: formatDate(searchData.returnDate),
      legs: [
        {
          id: "leg2",
          airline: flight.airlineName,
          airlineCode: flight.airlineCode,
          flightNumber: flight.flightNumber.replace(/\d+/, match => parseInt(match) + 1),
          aircraft: "Boeing 737-800",
          departure: {
            time: searchData.returnDate,
            airport: flight.toAirport,
            city: flight.toCity,
            terminal: "T2"
          },
          arrival: {
            time: new Date(searchData.returnDate.getTime() + flight.duration * 60000),
            airport: flight.fromAirport,
            city: flight.fromCity,
            terminal: "T1"
          },
          duration: flight.duration,
          stops: flight.stops,
          cabinClass: flight.cabinClass,
          fareType: "Xpress Value",
          baggage: {
            cabin: "7 kg",
            checkin: "15 kg"
          }
        }
      ]
    })
  }

  const FlightLeg = ({ leg, isExpanded, onToggle }) => (
    <div className="border border-border rounded-lg overflow-hidden">
      {/* Leg Header - Always Visible */}
      <div 
        className="p-4 bg-muted/50 cursor-pointer hover:bg-muted transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-xl">{getAirlineLogo(leg.airlineCode)}</div>
            <div>
              <h4 className="font-semibold text-foreground">{leg.airline}</h4>
              <p className="text-sm text-muted-foreground">{leg.flightNumber} • {leg.aircraft}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium text-foreground">
                {formatTime(leg.departure.time)} - {formatTime(leg.arrival.time)}
              </p>
              <p className="text-sm text-muted-foreground">
                {formatDuration(leg.duration)} • {leg.stops > 0 ? `${leg.stops} stop` : 'Non-stop'}
              </p>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="p-4 space-y-4 bg-white animate-in slide-in-from-top-2 fade-in duration-200">
          {/* Flight Route Details */}
          <div className="grid grid-cols-2 gap-6">
            {/* Departure */}
            <div>
              <h5 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <Plane className="h-4 w-4 text-primary" />
                Departure
              </h5>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-foreground">
                  {formatTime(leg.departure.time)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {leg.departure.airport} - {leg.departure.city}
                </p>
                <p className="text-xs text-muted-foreground">Terminal {leg.departure.terminal}</p>
                <p className="text-xs text-muted-foreground">{formatDate(leg.departure.time)}</p>
              </div>
            </div>

            {/* Arrival */}
            <div>
              <h5 className="font-medium text-foreground mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                Arrival
              </h5>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-foreground">
                  {formatTime(leg.arrival.time)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {leg.arrival.airport} - {leg.arrival.city}
                </p>
                <p className="text-xs text-muted-foreground">Terminal {leg.arrival.terminal}</p>
                <p className="text-xs text-muted-foreground">{formatDate(leg.arrival.time)}</p>
              </div>
            </div>
          </div>

          {/* Flight Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Duration</p>
              <p className="font-medium text-foreground">{formatDuration(leg.duration)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Stops</p>
              <p className="font-medium text-foreground">
                {leg.stops > 0 ? `${leg.stops} stop` : 'Non-stop'}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Cabin Class</p>
              <p className="font-medium text-foreground capitalize">{leg.cabinClass}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Fare Type</p>
              <p className="font-medium text-foreground">{leg.fareType}</p>
            </div>
          </div>

          {/* Baggage Allowance */}
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Luggage className="h-4 w-4 text-primary" />
              <div>
                <p className="font-medium text-foreground">Baggage Allowance</p>
                <p className="text-sm text-muted-foreground">
                  Cabin: {leg.baggage.cabin} • Check-in: {leg.baggage.checkin}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-primary border-border hover:bg-muted">
              Add Baggage
            </Button>
          </div>

          {/* Layover Info (if stops > 0) */}
          {leg.stops > 0 && (
            <div className="p-3 bg-muted/30 border border-border rounded-lg">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-orange-600 mt-0.5" />
                <div>
                  <h6 className="font-medium text-foreground">Layover Information</h6>
                  <p className="text-sm text-muted-foreground mt-1">
                    2h 15m layover in Mumbai (BOM) • Self-transfer required
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Minimum connection time: 60 minutes • Airport shuttle available
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )

  return (
    <Card className="overflow-hidden">
      <CardHeader 
        className="cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={onToggle}
      >
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="h-5 w-5 text-primary" />
            <span>Flight Summary</span>
          </div>
          {isActive ? (
            <ChevronUp className="h-5 w-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          )}
        </CardTitle>
      </CardHeader>

      {isActive && (
        <CardContent className="space-y-6 animate-in slide-in-from-top-2 fade-in duration-200">
          {/* Key Notices */}
          <div className="space-y-3">
            {/* Nearby Airport Warning */}
            {searchData.from === "GZB" && (
              <div className="flex items-start gap-2 p-3 bg-muted/30 border border-border rounded-lg">
                <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
                <div>
                  <h6 className="font-medium text-foreground">Nearby Airport Notice</h6>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your flight departs from Indira Gandhi International (IGI), New Delhi - approximately 45 km from Ghaziabad. 
                    Please plan your journey accordingly.
                  </p>
                </div>
              </div>
            )}

            {/* Important Info Bar */}
            <div className="flex items-center justify-between p-3 bg-muted/30 border border-border rounded-lg">
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Web check-in opens 48 hours before departure
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-primary border-border hover:bg-muted">
                  Cancellation Rules
                </Button>
                <Button variant="outline" size="sm" className="text-primary border-border hover:bg-muted">
                  Fare Rules
                </Button>
              </div>
            </div>
          </div>

          {/* Flight Segments */}
          <div className="space-y-4">
            {flightSegments.map((segment) => (
              <div key={segment.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    {segment.type}: {segment.route}
                  </h3>
                  <span className="text-sm text-muted-foreground">({segment.date})</span>
                </div>
                
                <div className="space-y-3">
                  {segment.legs.map((leg) => (
                    <FlightLeg
                      key={leg.id}
                      leg={leg}
                      isExpanded={expandedSegments[leg.id]}
                      onToggle={() => toggleSegment(leg.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}

export default FlightSummarySection
