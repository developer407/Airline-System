import * as React from "react"
import { 
  Plus, 
  Luggage, 
  Zap, 
  Shield, 
  Coffee, 
  Lock, 
  Clock, 
  Star,
  Info,
  Check,
  X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const AddOnsSection = ({ selectedAddOns, onChange, flightPrice }) => {
  const [showLockPriceDetails, setShowLockPriceDetails] = React.useState(false)

  const addOns = [
    {
      id: "extraBaggage",
      name: "Extra Baggage",
      description: "Add 10kg additional check-in baggage",
      price: 1200,
      icon: Luggage,
      color: "text-blue-600",
      popular: false,
      benefits: [
        "Additional 10kg check-in allowance",
        "Valid for return journey too",
        "Save money vs. airport rates"
      ],
      savings: "Save ₹800 vs airport rates"
    },
    {
      id: "priorityCheckin", 
      name: "Priority Check-in",
      description: "Skip the queues with priority check-in counters",
      price: 600,
      icon: Zap,
      color: "text-purple-600",
      popular: true,
      benefits: [
        "Dedicated priority check-in counter",
        "Save 30-60 minutes at airport",
        "Priority boarding included"
      ]
    },
    {
      id: "fastTrack",
      name: "Fast Track Security",
      description: "Priority lane through security checkpoint",
      price: 800,
      icon: Shield,
      color: "text-green-600",
      popular: false,
      benefits: [
        "Skip regular security queues",
        "Available at major airports",
        "Perfect for tight connections"
      ]
    },
    {
      id: "loungeAccess",
      name: "Airport Lounge Access",
      description: "Relax in premium airport lounges with complimentary food & beverages",
      price: 2500,
      icon: Coffee,
      color: "text-orange-600",
      popular: false,
      benefits: [
        "Premium lounge access at departure",
        "Complimentary food & beverages",
        "Wi-Fi, newspapers & magazines",
        "Quiet workspace environment",
        "Valid for 3 hours"
      ],
      luxury: true
    }
  ]

  const lockPriceOption = {
    id: "lockPrice",
    name: "Lock This Price",
    description: "Still unsure? Lock this fare for 24 hours",
    price: 672,
    icon: Lock,
    color: "text-red-600",
    timeLimit: "24 hours",
    benefits: [
      "Hold your booking for 24 hours",
      "Price protection against increases",
      "Full refund if you don't book",
      "Continue planning without rush"
    ]
  }

  const updateAddOn = (addOnId, selected) => {
    onChange({
      ...selectedAddOns,
      [addOnId]: selected
    })
  }

  const calculateSavings = () => {
    let totalSavings = 0
    if (selectedAddOns.extraBaggage) totalSavings += 800 // Airport rate difference
    if (selectedAddOns.priorityCheckin) totalSavings += 200 // Time value
    if (selectedAddOns.fastTrack) totalSavings += 300 // Convenience value
    return totalSavings
  }

  const AddOnCard = ({ addOn, isSelected, onToggle }) => (
    <div 
      className={cn(
        "relative border-2 rounded-lg p-4 transition-all duration-200",
        isSelected 
          ? "border-blue-500 bg-blue-50 shadow-md" 
          : "border-gray-200 hover:border-blue-300 hover:shadow-sm",
        addOn.luxury && "bg-gradient-to-br from-amber-50 to-orange-50"
      )}
    >
      {/* Popular Badge */}
      {addOn.popular && (
        <div className="absolute -top-2 left-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          Popular
        </div>
      )}

      {/* Luxury Badge */}
      {addOn.luxury && (
        <div className="absolute -top-2 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium">
          <Star className="w-3 h-3 inline mr-1" />
          Luxury
        </div>
      )}

      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Checkbox
              id={`addon-${addOn.id}`}
              checked={isSelected}
              onCheckedChange={onToggle}
              className="mt-1"
            />
            
            <Label htmlFor={`addon-${addOn.id}`} className="flex-1 cursor-pointer">
              <div className="flex items-center gap-2">
                <addOn.icon className={cn("w-5 h-5", addOn.color)} />
                <h4 className="font-semibold text-gray-900">{addOn.name}</h4>
              </div>
              <p className="text-sm text-gray-600 mt-1">{addOn.description}</p>
            </Label>
          </div>
          
          <div className="text-right">
            <span className="text-xl font-bold text-gray-900">
              ₹{addOn.price.toLocaleString()}
            </span>
            {addOn.timeLimit && (
              <p className="text-xs text-gray-500">for {addOn.timeLimit}</p>
            )}
          </div>
        </div>

        {/* Benefits */}
        {isSelected && addOn.benefits && (
          <div className="space-y-2 animate-in slide-in-from-top-2 fade-in duration-200">
            <h5 className="text-sm font-medium text-gray-700">What you get:</h5>
            <div className="space-y-1">
              {addOn.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Savings Highlight */}
        {addOn.savings && isSelected && (
          <div className="bg-green-50 border border-green-200 rounded p-2">
            <p className="text-sm font-medium text-green-800">{addOn.savings}</p>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-blue-600" />
          <span>Add-ons & Extras</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Enhance your travel experience with these optional services
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Add-ons Grid */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900">Travel Add-ons</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {addOns.map((addOn) => (
              <AddOnCard
                key={addOn.id}
                addOn={addOn}
                isSelected={selectedAddOns[addOn.id]}
                onToggle={() => updateAddOn(addOn.id, !selectedAddOns[addOn.id])}
              />
            ))}
          </div>
        </div>

        {/* Lock Price Section */}
        <div className="space-y-4">
          <div className="border-t border-gray-200 pt-6">
            <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Lock className="h-4 w-4 text-red-600" />
              Price Protection
            </h4>
            
            <div 
              className={cn(
                "border-2 rounded-lg p-4 transition-all duration-200 bg-gradient-to-r from-red-50 to-pink-50",
                selectedAddOns.lockPrice 
                  ? "border-red-500 bg-red-50 shadow-md" 
                  : "border-red-200 hover:border-red-300 hover:shadow-sm"
              )}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="lockPrice"
                      checked={selectedAddOns.lockPrice}
                      onCheckedChange={(checked) => updateAddOn('lockPrice', checked)}
                      className="mt-1"
                    />
                    
                    <Label htmlFor="lockPrice" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <lockPriceOption.icon className={cn("w-5 h-5", lockPriceOption.color)} />
                        <h4 className="font-semibold text-gray-900">{lockPriceOption.name}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 h-auto"
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowLockPriceDetails(!showLockPriceDetails)
                          }}
                        >
                          <Info className="w-4 h-4 text-gray-400" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{lockPriceOption.description}</p>
                    </Label>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-xl font-bold text-gray-900">
                      ₹{lockPriceOption.price}
                    </span>
                    <p className="text-xs text-gray-500">for {lockPriceOption.timeLimit}</p>
                  </div>
                </div>

                {/* Lock Price Benefits */}
                {selectedAddOns.lockPrice && (
                  <div className="space-y-2 animate-in slide-in-from-top-2 fade-in duration-200">
                    <div className="space-y-1">
                      {lockPriceOption.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Countdown Timer Simulation */}
                {selectedAddOns.lockPrice && (
                  <div className="bg-red-100 border border-red-300 rounded p-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-600" />
                      <div>
                        <p className="text-sm font-medium text-red-900">Price locked until:</p>
                        <p className="text-sm text-red-800">
                          {new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Lock Price Details Modal */}
            {showLockPriceDetails && (
              <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm animate-in slide-in-from-top-2 fade-in duration-200">
                <h5 className="font-medium text-gray-900 mb-2">How Price Lock Works:</h5>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">1.</span>
                    <span>Pay ₹672 to lock this exact price for 24 hours</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">2.</span>
                    <span>Continue planning your trip without price worries</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">3.</span>
                    <span>Complete your booking within 24 hours (lock fee adjusted from total)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">4.</span>
                    <span>Or get full refund if you decide not to book</span>
                  </div>
                </div>
                
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm font-medium text-green-900">
                    ✓ 100% refundable if you don't complete booking
                  </p>
                  <p className="text-sm text-green-800">
                    ✓ Protection against fare increases
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {Object.values(selectedAddOns).some(Boolean) && (
          <div className="border-t border-gray-200 pt-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-medium text-blue-900 mb-2">Selected Add-ons Summary</h5>
              <div className="space-y-2">
                {Object.entries(selectedAddOns).map(([key, selected]) => {
                  if (!selected) return null
                  
                  const addOn = [...addOns, lockPriceOption].find(a => a.id === key)
                  if (!addOn) return null
                  
                  return (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <addOn.icon className={cn("w-4 h-4", addOn.color)} />
                        <span className="text-blue-800">{addOn.name}</span>
                      </div>
                      <span className="font-medium text-blue-900">₹{addOn.price.toLocaleString()}</span>
                    </div>
                  )
                })}
              </div>
              
              {calculateSavings() > 0 && (
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-700">You're saving:</span>
                    <span className="font-bold text-green-700">₹{calculateSavings()}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Important Notes */}
        <div className="space-y-3">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-amber-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-900">Important Information</p>
                <ul className="text-amber-800 mt-1 space-y-1 ml-4">
                  <li>• Add-on services are subject to availability and airline policies</li>
                  <li>• Lounge access requires valid boarding pass and ID</li>
                  <li>• Priority services may not be available at all airports</li>
                  <li>• Refunds for unused add-ons as per airline's cancellation policy</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AddOnsSection
