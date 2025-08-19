import * as React from "react"
import { 
  X,
  Plane,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Utensils,
  Wifi,
  Luggage,
  Settings,
  Save,
  Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const FlightForm = ({ flight, onSave, onClose }) => {
  const [formData, setFormData] = React.useState({
    // Basic Info
    flightNumber: "",
    airline: {
      name: "Air India",
      code: "AI"
    },
    aircraft: {
      type: "",
      capacity: "",
      layout: "3-3"
    },
    
    // Route Information
    route: {
      departure: {
        airport: "",
        name: "",
        city: ""
      },
      arrival: {
        airport: "",
        name: "",
        city: ""
      },
      distance: ""
    },
    
    // Schedule
    schedule: {
      departureTime: "",
      arrivalTime: "",
      date: "",
      frequency: "Daily",
      duration: "",
      timezone: "IST"
    },
    
    // Pricing
    pricing: {
      economy: "",
      business: "",
      first: "",
      taxes: "",
      baggage: {
        cabin: "7 kg",
        checkedIn: "15 kg"
      }
    },
    
    // Services
    services: {
      meals: [],
      extraBaggage: false,
      priorityCheckin: false,
      wifi: false,
      entertainment: false
    },
    
    // Status
    status: "Active",
    realTimeStatus: "Scheduled",
    
    // Notes
    notes: ""
  })

  const [errors, setErrors] = React.useState({})

  // Populate form if editing existing flight
  React.useEffect(() => {
    if (flight) {
      setFormData(flight)
    }
  }, [flight])

  const airports = [
    { code: "DEL", name: "Indira Gandhi International", city: "New Delhi" },
    { code: "BOM", name: "Chhatrapati Shivaji International", city: "Mumbai" },
    { code: "BLR", name: "Kempegowda International", city: "Bengaluru" },
    { code: "MAA", name: "Chennai International", city: "Chennai" },
    { code: "CCU", name: "Netaji Subhas Chandra Bose International", city: "Kolkata" },
    { code: "HYD", name: "Rajiv Gandhi International", city: "Hyderabad" },
    { code: "PNQ", name: "Pune Airport", city: "Pune" },
    { code: "AMD", name: "Sardar Vallabhbhai Patel International", city: "Ahmedabad" }
  ]

  const aircraftTypes = [
    "Boeing 737-800",
    "Boeing 737-900",
    "Airbus A320",
    "Airbus A321",
    "Boeing 787-8",
    "Boeing 777-300ER",
    "Airbus A330-300"
  ]

  const mealOptions = [
    "Vegetarian",
    "Non-Vegetarian", 
    "Jain",
    "Vegan",
    "Diabetic",
    "Gluten-Free",
    "Halal",
    "Kosher"
  ]

  const handleInputChange = (path, value) => {
    setFormData(prev => {
      const newData = { ...prev }
      const keys = path.split('.')
      let current = newData
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]] = value
      return newData
    })
  }

  const handleMealToggle = (meal) => {
    const currentMeals = formData.services.meals
    const newMeals = currentMeals.includes(meal)
      ? currentMeals.filter(m => m !== meal)
      : [...currentMeals, meal]
    
    handleInputChange('services.meals', newMeals)
  }

  const calculateDuration = (departureTime, arrivalTime) => {
    if (!departureTime || !arrivalTime) return ""
    
    const [depHour, depMin] = departureTime.split(':').map(Number)
    const [arrHour, arrMin] = arrivalTime.split(':').map(Number)
    
    let depTotalMin = depHour * 60 + depMin
    let arrTotalMin = arrHour * 60 + arrMin
    
    // Handle next day arrival
    if (arrTotalMin < depTotalMin) {
      arrTotalMin += 24 * 60
    }
    
    const durationMin = arrTotalMin - depTotalMin
    const hours = Math.floor(durationMin / 60)
    const minutes = durationMin % 60
    
    return `${hours}h ${minutes}m`
  }

  React.useEffect(() => {
    if (formData.schedule.departureTime && formData.schedule.arrivalTime) {
      const duration = calculateDuration(formData.schedule.departureTime, formData.schedule.arrivalTime)
      handleInputChange('schedule.duration', duration)
    }
  }, [formData.schedule.departureTime, formData.schedule.arrivalTime])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.flightNumber) newErrors.flightNumber = "Flight number is required"
    if (!formData.aircraft.type) newErrors.aircraftType = "Aircraft type is required"
    if (!formData.aircraft.capacity) newErrors.aircraftCapacity = "Aircraft capacity is required"
    if (!formData.route.departure.airport) newErrors.departureAirport = "Departure airport is required"
    if (!formData.route.arrival.airport) newErrors.arrivalAirport = "Arrival airport is required"
    if (!formData.schedule.departureTime) newErrors.departureTime = "Departure time is required"
    if (!formData.schedule.arrivalTime) newErrors.arrivalTime = "Arrival time is required"
    if (!formData.schedule.date) newErrors.date = "Flight date is required"
    if (!formData.pricing.economy) newErrors.economyPrice = "Economy fare is required"
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-5xl max-h-[95vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {flight ? "Edit Flight" : "Add New Flight"}
              </h2>
              <p className="text-gray-600">Configure all flight details and settings</p>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Basic Flight Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-blue-600" />
                Flight Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="flightNumber">Flight Number *</Label>
                  <Input
                    id="flightNumber"
                    value={formData.flightNumber}
                    onChange={(e) => handleInputChange('flightNumber', e.target.value)}
                    placeholder="e.g., AI-203"
                    className={errors.flightNumber ? "border-red-300" : ""}
                  />
                  {errors.flightNumber && <p className="text-red-600 text-xs mt-1">{errors.flightNumber}</p>}
                </div>
                <div>
                  <Label htmlFor="airlineName">Airline Name</Label>
                  <Select value={formData.airline.name} onValueChange={(value) => {
                    const codes = { "Air India": "AI", "IndiGo": "6E", "Vistara": "UK", "SpiceJet": "SG" }
                    handleInputChange('airline.name', value)
                    handleInputChange('airline.code', codes[value] || "AI")
                  }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Air India">Air India</SelectItem>
                      <SelectItem value="IndiGo">IndiGo</SelectItem>
                      <SelectItem value="Vistara">Vistara</SelectItem>
                      <SelectItem value="SpiceJet">SpiceJet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="aircraftType">Aircraft Type *</Label>
                  <Select value={formData.aircraft.type} onValueChange={(value) => handleInputChange('aircraft.type', value)}>
                    <SelectTrigger className={errors.aircraftType ? "border-red-300" : ""}>
                      <SelectValue placeholder="Select aircraft" />
                    </SelectTrigger>
                    <SelectContent>
                      {aircraftTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.aircraftType && <p className="text-red-600 text-xs mt-1">{errors.aircraftType}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="capacity">Total Capacity (Seats) *</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.aircraft.capacity}
                    onChange={(e) => handleInputChange('aircraft.capacity', parseInt(e.target.value))}
                    placeholder="e.g., 180"
                    className={errors.aircraftCapacity ? "border-red-300" : ""}
                  />
                  {errors.aircraftCapacity && <p className="text-red-600 text-xs mt-1">{errors.aircraftCapacity}</p>}
                </div>
                <div>
                  <Label htmlFor="layout">Seat Layout</Label>
                  <Select value={formData.aircraft.layout} onValueChange={(value) => handleInputChange('aircraft.layout', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-3">3-3 (Economy)</SelectItem>
                      <SelectItem value="2-2">2-2 (Business)</SelectItem>
                      <SelectItem value="1-2-1">1-2-1 (Premium)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Route Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-600" />
                Route Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Departure */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Departure Airport *</h4>
                  <div className="space-y-3">
                    <Select 
                      value={formData.route.departure.airport} 
                      onValueChange={(value) => {
                        const airport = airports.find(a => a.code === value)
                        if (airport) {
                          handleInputChange('route.departure.airport', airport.code)
                          handleInputChange('route.departure.name', airport.name)
                          handleInputChange('route.departure.city', airport.city)
                        }
                      }}
                    >
                      <SelectTrigger className={errors.departureAirport ? "border-red-300" : ""}>
                        <SelectValue placeholder="Select departure airport" />
                      </SelectTrigger>
                      <SelectContent>
                        {airports.map(airport => (
                          <SelectItem key={airport.code} value={airport.code}>
                            {airport.code} - {airport.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.departureAirport && <p className="text-red-600 text-xs">{errors.departureAirport}</p>}
                  </div>
                </div>

                {/* Arrival */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Arrival Airport *</h4>
                  <div className="space-y-3">
                    <Select 
                      value={formData.route.arrival.airport} 
                      onValueChange={(value) => {
                        const airport = airports.find(a => a.code === value)
                        if (airport) {
                          handleInputChange('route.arrival.airport', airport.code)
                          handleInputChange('route.arrival.name', airport.name)
                          handleInputChange('route.arrival.city', airport.city)
                        }
                      }}
                    >
                      <SelectTrigger className={errors.arrivalAirport ? "border-red-300" : ""}>
                        <SelectValue placeholder="Select arrival airport" />
                      </SelectTrigger>
                      <SelectContent>
                        {airports.map(airport => (
                          <SelectItem key={airport.code} value={airport.code}>
                            {airport.code} - {airport.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.arrivalAirport && <p className="text-red-600 text-xs">{errors.arrivalAirport}</p>}
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="distance">Distance (KM)</Label>
                <Input
                  id="distance"
                  type="number"
                  value={formData.route.distance}
                  onChange={(e) => handleInputChange('route.distance', parseInt(e.target.value))}
                  placeholder="e.g., 1149"
                />
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-600" />
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="date">Flight Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.schedule.date}
                    onChange={(e) => handleInputChange('schedule.date', e.target.value)}
                    className={errors.date ? "border-red-300" : ""}
                  />
                  {errors.date && <p className="text-red-600 text-xs mt-1">{errors.date}</p>}
                </div>
                <div>
                  <Label htmlFor="departureTime">Departure Time *</Label>
                  <Input
                    id="departureTime"
                    type="time"
                    value={formData.schedule.departureTime}
                    onChange={(e) => handleInputChange('schedule.departureTime', e.target.value)}
                    className={errors.departureTime ? "border-red-300" : ""}
                  />
                  {errors.departureTime && <p className="text-red-600 text-xs mt-1">{errors.departureTime}</p>}
                </div>
                <div>
                  <Label htmlFor="arrivalTime">Arrival Time *</Label>
                  <Input
                    id="arrivalTime"
                    type="time"
                    value={formData.schedule.arrivalTime}
                    onChange={(e) => handleInputChange('schedule.arrivalTime', e.target.value)}
                    className={errors.arrivalTime ? "border-red-300" : ""}
                  />
                  {errors.arrivalTime && <p className="text-red-600 text-xs mt-1">{errors.arrivalTime}</p>}
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.schedule.duration}
                    onChange={(e) => handleInputChange('schedule.duration', e.target.value)}
                    placeholder="Auto-calculated"
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={formData.schedule.frequency} onValueChange={(value) => handleInputChange('schedule.frequency', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="One-time">One-time</SelectItem>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={formData.schedule.timezone} onValueChange={(value) => handleInputChange('schedule.timezone', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IST">IST (Indian Standard Time)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Pricing & Fare Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="economyFare">Economy Fare (₹) *</Label>
                  <Input
                    id="economyFare"
                    type="number"
                    value={formData.pricing.economy}
                    onChange={(e) => handleInputChange('pricing.economy', parseInt(e.target.value))}
                    placeholder="e.g., 4500"
                    className={errors.economyPrice ? "border-red-300" : ""}
                  />
                  {errors.economyPrice && <p className="text-red-600 text-xs mt-1">{errors.economyPrice}</p>}
                </div>
                <div>
                  <Label htmlFor="businessFare">Business Fare (₹)</Label>
                  <Input
                    id="businessFare"
                    type="number"
                    value={formData.pricing.business}
                    onChange={(e) => handleInputChange('pricing.business', parseInt(e.target.value))}
                    placeholder="e.g., 12000"
                  />
                </div>
                <div>
                  <Label htmlFor="firstFare">First Class Fare (₹)</Label>
                  <Input
                    id="firstFare"
                    type="number"
                    value={formData.pricing.first}
                    onChange={(e) => handleInputChange('pricing.first', parseInt(e.target.value))}
                    placeholder="e.g., 25000"
                  />
                </div>
                <div>
                  <Label htmlFor="taxes">Taxes & Fees (₹)</Label>
                  <Input
                    id="taxes"
                    type="number"
                    value={formData.pricing.taxes}
                    onChange={(e) => handleInputChange('pricing.taxes', parseInt(e.target.value))}
                    placeholder="e.g., 650"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cabinBaggage">Cabin Baggage</Label>
                  <Input
                    id="cabinBaggage"
                    value={formData.pricing.baggage.cabin}
                    onChange={(e) => handleInputChange('pricing.baggage.cabin', e.target.value)}
                    placeholder="e.g., 7 kg"
                  />
                </div>
                <div>
                  <Label htmlFor="checkedBaggage">Checked-in Baggage</Label>
                  <Input
                    id="checkedBaggage"
                    value={formData.pricing.baggage.checkedIn}
                    onChange={(e) => handleInputChange('pricing.baggage.checkedIn', e.target.value)}
                    placeholder="e.g., 15 kg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-purple-600" />
                Extra Services
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Meal Options */}
              <div>
                <Label className="text-base font-medium">Meal Options</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  {mealOptions.map(meal => (
                    <div key={meal} className="flex items-center space-x-2">
                      <Checkbox
                        id={`meal-${meal}`}
                        checked={formData.services.meals.includes(meal)}
                        onCheckedChange={() => handleMealToggle(meal)}
                      />
                      <Label htmlFor={`meal-${meal}`} className="text-sm">{meal}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Other Services */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="extraBaggage"
                      checked={formData.services.extraBaggage}
                      onCheckedChange={(checked) => handleInputChange('services.extraBaggage', checked)}
                    />
                    <Label htmlFor="extraBaggage">Extra Baggage Purchase</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="priorityCheckin"
                      checked={formData.services.priorityCheckin}
                      onCheckedChange={(checked) => handleInputChange('services.priorityCheckin', checked)}
                    />
                    <Label htmlFor="priorityCheckin">Priority Check-in/Boarding</Label>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="wifi"
                      checked={formData.services.wifi}
                      onCheckedChange={(checked) => handleInputChange('services.wifi', checked)}
                    />
                    <Label htmlFor="wifi">Wi-Fi Availability</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="entertainment"
                      checked={formData.services.entertainment}
                      onCheckedChange={(checked) => handleInputChange('services.entertainment', checked)}
                    />
                    <Label htmlFor="entertainment">In-flight Entertainment</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status & Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-600" />
                Status & Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Flight Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="realTimeStatus">Real-time Status</Label>
                  <Select value={formData.realTimeStatus} onValueChange={(value) => handleInputChange('realTimeStatus', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="On-time">On-time</SelectItem>
                      <SelectItem value="Delayed">Delayed</SelectItem>
                      <SelectItem value="Boarding">Boarding</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                      <SelectItem value="Landed">Landed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Internal Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Add any internal notes or comments..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {flight ? "Update Flight" : "Create Flight"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FlightForm

