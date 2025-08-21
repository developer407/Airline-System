import * as React from "react"
import { 
  Utensils, 
  MapPin, 
  Baby, 
  Heart, 
  Eye,
  Info,
  Check,
  X,
  Grid3X3,
  Armchair
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import SeatMap from "./SeatMap"

const SeatsMealsSelector = ({ 
  flight, 
  travelers, 
  selectedSeats, 
  selectedMeals, 
  onSeatsChange, 
  onMealsChange 
}) => {
  const [showSeatMap, setShowSeatMap] = React.useState(false)
  const [selectedTravelerForSeat, setSelectedTravelerForSeat] = React.useState(null)

  // Generate a more detailed seat map
  const generateSeatMap = () => {
    const sections = [
      { name: "Business Class", rows: [1, 2, 3], price: 2500 },
      { name: "Premium Economy", rows: [4, 5, 6, 7, 8, 9, 10], price: 1200 },
      { name: "Economy", rows: Array.from({ length: 15 }, (_, i) => i + 11), price: 0 },
    ]
    const seats = {}
    sections.forEach(section => {
      section.rows.forEach(row => {
        ['A', 'B', 'C', 'D', 'E', 'F'].forEach(col => {
          const seatNumber = `${row}${col}`
          let status = "available"
          if (Math.random() < 0.2) status = "occupied" // 20% occupied
          if (row === 10 || row === 11) status = "blocked" // Exit row

          seats[seatNumber] = {
            status,
            price: (row === 10 || row === 11) ? 800 : section.price,
          }
        })
      })
    })
    return { sections, seats }
  }

  const seatMapData = React.useMemo(() => generateSeatMap(), [])

  const handleSelectSeat = (travelerId, seatNumber) => {
    // Check if the seat is already selected by another traveler
    const isSeatTaken = Object.entries(selectedSeats).some(
      ([id, seat]) => seat === seatNumber && id !== travelerId
    )

    if (!isSeatTaken) {
      onSeatsChange({
        ...selectedSeats,
        [travelerId]: seatNumber,
      })
    }
  }

  const openSeatMapForTraveler = (travelerId) => {
    setSelectedTravelerForSeat(travelerId)
    setShowSeatMap(true)
  }

  const updateMealForTraveler = (travelerId, mealId) => {
    const newMeals = {
      ...selectedMeals,
      [travelerId]: mealId
    }
    onMealsChange(newMeals)
  }
  
  const mealOptions = [
    {
      id: "none",
      name: "No Meal Preference",
      description: "Standard meal service as per airline policy",
      price: 0,
      icon: "🍽️",
      dietary: null
    },
    {
      id: "veg",
      name: "Vegetarian Meal",
      description: "Indian vegetarian meal with dairy products",
      price: 450,
      icon: "🥗",
      dietary: "Vegetarian"
    },
    {
      id: "nonveg",
      name: "Non-Vegetarian Meal",
      description: "Chicken or mutton based meal with sides",
      price: 550,
      icon: "🍗",
      dietary: "Non-Vegetarian"
    },
    {
      id: "jain",
      name: "Jain Meal",
      description: "Pure vegetarian without onion, garlic, or root vegetables",
      price: 500,
      icon: "🌿",
      dietary: "Jain"
    },
    {
      id: "vegan",
      name: "Vegan Meal",
      description: "Plant-based meal without any animal products",
      price: 520,
      icon: "🥑",
      dietary: "Vegan"
    },
    {
      id: "diabetic",
      name: "Diabetic Meal",
      description: "Low sugar, high fiber meal suitable for diabetics",
      price: 480,
      icon: "🍎",
      dietary: "Diabetic"
    }
  ]

  const specialAssistance = [
    {
      id: "wheelchair",
      name: "Wheelchair Assistance",
      description: "Airport wheelchair service from check-in to aircraft",
      icon: Armchair
    },
    {
      id: "infant",
      name: "Infant Assistance",
      description: "Bassinet request and infant care assistance",
      icon: Baby
    },
    {
      id: "medical",
      name: "Medical Assistance",
      description: "Special medical needs or equipment assistance",
      icon: Heart
    },
    {
      id: "vision",
      name: "Vision Assistance",
      description: "Assistance for visually impaired passengers",
      icon: Eye
    }
  ]

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <span>Seats & Meals</span>
          </CardTitle>
          <p className="text-sm text-gray-600">
            Select your preferred seats and meals for a comfortable journey
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Seat Selection */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
              <Grid3X3 className="h-5 w-5 text-blue-600" />
              Seat Selection
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {travelers.map((traveler) => (
                <div key={traveler.id} className="bg-muted/50 p-4 rounded-lg border border-gray-200 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{traveler.firstName} {traveler.lastName}</p>
                    <p className="text-sm text-muted-foreground">{traveler.type}</p>
                  </div>
                  <Button
                    variant={selectedSeats[traveler.id] ? "outline" : "default"}
                    onClick={() => openSeatMapForTraveler(traveler.id)}
                    className="w-32"
                  >
                    {selectedSeats[traveler.id] ? (
                      <span className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        {selectedSeats[traveler.id]}
                      </span>
                    ) : "Select Seat"}
                  </Button>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-3 text-sm flex items-center gap-2">
              <Info className="h-5 w-5 flex-shrink-0" />
              <p>You can select or change your seats from the seat map. Additional charges may apply for certain seats.</p>
            </div>
          </div>

          {/* Meal Selection */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Utensils className="h-4 w-4" />
              Meal Preferences
            </h4>

            <div className="space-y-4">
              {travelers.map((traveler) => (
                <div key={traveler.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">
                      {traveler.firstName} {traveler.lastName}
                    </p>
                  </div>
                  
                  <RadioGroup
                    value={selectedMeals[traveler.id] || "none"}
                    onValueChange={(value) => updateMealForTraveler(traveler.id, value)}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
                  >
                    {mealOptions.map((meal) => (
                      <div key={meal.id} className="relative">
                        <Label
                          htmlFor={`meal-${traveler.id}-${meal.id}`}
                          className={cn(
                            "border-2 rounded-lg p-3 cursor-pointer transition-all block",
                            selectedMeals[traveler.id] === meal.id
                              ? "border-primary bg-primary/10" 
                              : "border-border hover:border-primary/50 hover:bg-primary/5"
                          )}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-2">
                              <span className="text-lg">{meal.icon}</span>
                              <div>
                                <h5 className="font-medium text-gray-900 text-sm">{meal.name}</h5>
                                <p className="text-xs text-gray-600 mt-1">{meal.description}</p>
                                {meal.dietary && (
                                  <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                                    {meal.dietary}
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            <div className="text-right">
                              {meal.price > 0 ? (
                                <span className="text-sm font-medium text-gray-900">
                                  ₹{meal.price}
                                </span>
                              ) : (
                                <span className="text-xs text-green-600 font-medium">Free</span>
                              )}
                              
                              <RadioGroupItem 
                                value={meal.id} 
                                id={`meal-${traveler.id}-${meal.id}`}
                                className="mt-2 ml-auto"
                              />
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </div>
          </div>

          {/* Special Assistance */}
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Armchair className="h-4 w-4" />
              Special Assistance
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specialAssistance.map((assistance) => (
                <div key={assistance.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                  <Checkbox
                    id={assistance.id}
                    className="mt-0.5"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <assistance.icon className="h-4 w-4 text-blue-600" />
                      <Label htmlFor={assistance.id} className="font-medium text-gray-900 text-sm cursor-pointer">
                        {assistance.name}
                      </Label>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{assistance.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-muted/30 border border-border rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground">Special Assistance Note</p>
                  <p className="text-muted-foreground mt-1">
                    Special assistance requests are subject to airline approval and availability. 
                    Please contact the airline directly for complex medical requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showSeatMap && (
        <SeatMap
          seatMapData={seatMapData}
          selectedSeats={selectedSeats}
          onSelectSeat={handleSelectSeat}
          selectedTraveler={selectedTravelerForSeat}
          onClose={() => setShowSeatMap(false)}
          travelers={travelers}
        />
      )}
    </>
  )
}

export default SeatsMealsSelector
