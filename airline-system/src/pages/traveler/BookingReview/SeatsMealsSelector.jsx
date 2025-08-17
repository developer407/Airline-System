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

  // Mock seat map data - in real app this would come from airline API
  const seatMap = {
    aircraft: "Boeing 737-800",
    totalSeats: 189,
    layout: "3-3", // seats per row
    sections: [
      {
        name: "Business Class",
        rows: [1, 2, 3],
        price: 2500,
        color: "bg-purple-100 border-purple-300 text-purple-900"
      },
      {
        name: "Premium Economy",
        rows: [4, 5, 6, 7],
        price: 1200,
        color: "bg-blue-100 border-blue-300 text-blue-900"
      },
      {
        name: "Economy",
        rows: Array.from({length: 25}, (_, i) => i + 8), // rows 8-32
        price: 600,
        color: "bg-gray-100 border-gray-300 text-gray-900"
      }
    ]
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

  const updateSeatForTraveler = (travelerId, seatNumber) => {
    const newSeats = {
      ...selectedSeats,
      [travelerId]: seatNumber
    }
    onSeatsChange(newSeats)
  }

  const updateMealForTraveler = (travelerId, mealId) => {
    const newMeals = {
      ...selectedMeals,
      [travelerId]: mealId
    }
    onMealsChange(newMeals)
  }

  const SeatMapModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Select Seat</h3>
              <p className="text-sm text-gray-600">
                {selectedTravelerForSeat && `Selecting for: ${travelers.find(t => t.id === selectedTravelerForSeat)?.firstName} ${travelers.find(t => t.id === selectedTravelerForSeat)?.lastName}`}
              </p>
            </div>
            <Button variant="ghost" onClick={() => setShowSeatMap(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          {/* Aircraft Info */}
          <div className="text-center mb-4">
            <h4 className="font-medium">{seatMap.aircraft}</h4>
            <p className="text-sm text-gray-600">{seatMap.layout} Configuration</p>
          </div>

          {/* Legend */}
          <div className="flex justify-center mb-4 space-x-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-green-200 border border-green-400 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-red-200 border border-red-400 rounded"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-blue-200 border border-blue-400 rounded"></div>
              <span>Selected</span>
            </div>
          </div>

          {/* Seat Map */}
          <div className="space-y-6">
            {seatMap.sections.map((section) => (
              <div key={section.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h5 className="font-medium text-sm">{section.name}</h5>
                  {section.price > 0 && (
                    <span className="text-sm text-gray-600">₹{section.price}</span>
                  )}
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-xs">
                  {/* Header row */}
                  <div className="text-center font-medium">A</div>
                  <div className="text-center font-medium">B</div>
                  <div className="text-center font-medium">C</div>
                  <div className="text-center font-medium">-</div>
                  <div className="text-center font-medium">D</div>
                  <div className="text-center font-medium">E</div>
                  <div className="text-center font-medium">F</div>

                  {/* Seat rows */}
                  {section.rows.slice(0, 5).map((rowNum) => ( // Show only first 5 rows for demo
                    <>
                      {['A', 'B', 'C'].map((letter) => {
                        const seatNum = `${rowNum}${letter}`
                        const isOccupied = Math.random() < 0.3 // 30% occupied for demo
                        const isSelected = Object.values(selectedSeats).includes(seatNum)
                        
                        return (
                          <button
                            key={seatNum}
                            className={cn(
                              "w-8 h-8 border rounded text-xs font-medium transition-colors",
                              isOccupied 
                                ? "bg-red-200 border-red-400 text-red-800 cursor-not-allowed"
                                : isSelected 
                                  ? "bg-blue-200 border-blue-400 text-blue-800"
                                  : "bg-green-200 border-green-400 text-green-800 hover:bg-green-300"
                            )}
                            disabled={isOccupied}
                            onClick={() => {
                              if (selectedTravelerForSeat) {
                                updateSeatForTraveler(selectedTravelerForSeat, seatNum)
                                setShowSeatMap(false)
                              }
                            }}
                          >
                            {rowNum}
                          </button>
                        )
                      })}
                      
                      {/* Aisle */}
                      <div className="w-8 h-8 flex items-center justify-center text-gray-400">
                        {rowNum}
                      </div>
                      
                      {['D', 'E', 'F'].map((letter) => {
                        const seatNum = `${rowNum}${letter}`
                        const isOccupied = Math.random() < 0.3
                        const isSelected = Object.values(selectedSeats).includes(seatNum)
                        
                        return (
                          <button
                            key={seatNum}
                            className={cn(
                              "w-8 h-8 border rounded text-xs font-medium transition-colors",
                              isOccupied 
                                ? "bg-red-200 border-red-400 text-red-800 cursor-not-allowed"
                                : isSelected 
                                  ? "bg-blue-200 border-blue-400 text-blue-800"
                                  : "bg-green-200 border-green-400 text-green-800 hover:bg-green-300"
                            )}
                            disabled={isOccupied}
                            onClick={() => {
                              if (selectedTravelerForSeat) {
                                updateSeatForTraveler(selectedTravelerForSeat, seatNum)
                                setShowSeatMap(false)
                              }
                            }}
                          >
                            {rowNum}
                          </button>
                        )
                      })}
                    </>
                  ))}
                </div>
                
                {section.rows.length > 5 && (
                  <p className="text-center text-sm text-gray-500">
                    ... and {section.rows.length - 5} more rows
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
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
      
      <CardContent className="space-y-6">
        {/* Seat Selection */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Grid3X3 className="h-4 w-4" />
              Seat Selection
            </h4>
            <Button
              variant="outline"
              onClick={() => setShowSeatMap(true)}
              className="text-blue-600 border-blue-200 hover:bg-blue-50"
            >
              View Seat Map
            </Button>
          </div>

          <div className="space-y-3">
            {travelers.map((traveler) => (
              <div key={traveler.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">
                    {traveler.firstName} {traveler.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{traveler.type}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  {selectedSeats[traveler.id] ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-green-600">
                        Seat {selectedSeats[traveler.id]}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedTravelerForSeat(traveler.id)
                          setShowSeatMap(true)
                        }}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedTravelerForSeat(traveler.id)
                        setShowSeatMap(true)
                      }}
                      className="text-blue-600 border-blue-200 hover:bg-blue-50"
                    >
                      Select Seat
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900">Seat Selection Info</p>
                <p className="text-blue-800 mt-1">
                  • Economy seats: ₹600 • Premium Economy: ₹1,200 • Business: ₹2,500
                </p>
                <p className="text-blue-800">
                  • Exit row and window seats may have additional charges
                </p>
              </div>
            </div>
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
                             ? "border-blue-500 bg-blue-50" 
                             : "border-gray-200 hover:border-blue-300 hover:bg-blue-25"
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

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-900">Special Assistance Note</p>
                <p className="text-amber-800 mt-1">
                  Special assistance requests are subject to airline approval and availability. 
                  Please contact the airline directly for complex medical requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Seat Map Modal */}
      {showSeatMap && <SeatMapModal />}
    </Card>
  )
}

export default SeatsMealsSelector
