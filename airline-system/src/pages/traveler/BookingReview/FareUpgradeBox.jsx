import * as React from "react"
import { 
  CreditCard, 
  Check, 
  Info, 
  Clock, 
  RefreshCw, 
  Calendar,
  Shield,
  Zap,
  Star
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const FareUpgradeBox = ({ selectedFare, onFareChange, passengerCount }) => {
  const [showTooltip, setShowTooltip] = React.useState("")

  const fareOptions = [
    {
      id: "regular",
      name: "Regular",
      price: 15071,
      originalPrice: null,
      isDefault: true,
      popular: false,
      benefits: [
        "Standard check-in",
        "Basic baggage allowance",
        "Standard seat selection",
        "24/7 customer support"
      ],
      restrictions: [
        "Change fee applies",
        "Cancellation charges apply",
        "No meal included"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      price: 14912,
      originalPrice: 16500,
      discount: "₹1,588 OFF",
      isDefault: false,
      popular: true,
      benefits: [
        "Priority check-in",
        "Extra baggage allowance (+5kg)",
        "Free seat selection", 
        "Delay protection up to ₹5,000",
        "Free date change (once)",
        "Complimentary meal",
        "Airport lounge access",
        "24/7 priority support"
      ],
      restrictions: [
        "Reduced cancellation charges",
        "Flexible rebooking"
      ],
      features: [
        { icon: Shield, text: "Delay Protection", description: "Get compensation up to ₹5,000 for flight delays over 3 hours" },
        { icon: Calendar, text: "Free Date Change", description: "Change your travel date once without any penalty" },
        { icon: Zap, text: "Priority Services", description: "Priority check-in, boarding, and baggage handling" },
        { icon: Star, text: "Lounge Access", description: "Complimentary access to select airport lounges" }
      ]
    }
  ]

  const calculateTotalPrice = (farePrice) => {
    return farePrice * passengerCount
  }

  const FareCard = ({ fare, isSelected, onSelect }) => (
    <div 
      className={cn(
        "relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md",
        isSelected 
          ? "border-primary bg-primary/10 shadow-md" 
          : "border-border hover:border-primary/50",
        fare.popular && "ring-2 ring-orange-200/50 border-orange-300"
      )}
      onClick={onSelect}
    >
      {/* Popular Badge */}
      {fare.popular && (
        <div className="absolute -top-3 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
          Most Popular
        </div>
      )}

      {/* Discount Badge */}
      {fare.discount && (
        <div className="absolute -top-3 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
          {fare.discount}
        </div>
      )}

      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-4 h-4 rounded-full border-2",
              isSelected 
                ? "border-primary bg-primary" 
                : "border-border"
            )}>
              {isSelected && <Check className="w-3 h-3 text-white" />}
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{fare.name}</h4>
              {fare.isDefault && (
                <span className="text-xs text-muted-foreground">Default selection</span>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2">
              {fare.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{calculateTotalPrice(fare.originalPrice).toLocaleString()}
                </span>
              )}
              <span className="text-xl font-bold text-foreground">
                ₹{calculateTotalPrice(fare.price).toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              for {passengerCount} passenger{passengerCount > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-foreground">What's included:</h5>
          <div className="space-y-1">
            {fare.benefits.slice(0, 4).map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
            {fare.benefits.length > 4 && (
              <button 
                className="text-sm text-primary hover:text-primary/80 font-medium"
                onClick={(e) => {
                  e.stopPropagation()
                  setShowTooltip(showTooltip === fare.id ? "" : fare.id)
                }}
              >
                +{fare.benefits.length - 4} more benefits
              </button>
            )}
          </div>
        </div>

        {/* Premium Features */}
        {fare.features && isSelected && (
          <div className="mt-4 space-y-3 animate-in slide-in-from-top-2 fade-in duration-200">
            <h5 className="text-sm font-medium text-foreground">Premium features:</h5>
            <div className="grid grid-cols-2 gap-3">
              {fare.features.map((feature, index) => (
                <div 
                  key={index}
                  className="relative"
                  onMouseEnter={() => setShowTooltip(`${fare.id}-${index}`)}
                  onMouseLeave={() => setShowTooltip("")}
                >
                  <div className="flex items-center gap-2 p-2 bg-card rounded border border-border">
                    <feature.icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-xs font-medium text-foreground">{feature.text}</span>
                    <Info className="w-3 h-3 text-muted-foreground" />
                  </div>
                  
                  {/* Tooltip */}
                  {showTooltip === `${fare.id}-${index}` && (
                    <div className="absolute z-10 bottom-full left-0 mb-2 p-2 bg-gray-900 text-white text-xs rounded shadow-lg max-w-48">
                      {feature.description}
                      <div className="absolute top-full left-2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        {!isSelected && (
          <Button 
            variant="outline" 
            className="w-full mt-3 border-border text-primary hover:bg-muted"
            onClick={(e) => {
              e.stopPropagation()
              onSelect()
            }}
          >
            {fare.id === "premium" ? "Upgrade Now" : "Select This Fare"}
          </Button>
        )}

        {isSelected && (
          <div className="flex items-center gap-2 mt-3 p-2 bg-green-50 border border-green-200 rounded">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700">Selected</span>
          </div>
        )}
      </div>

      {/* Extended Benefits Tooltip */}
      {showTooltip === fare.id && fare.benefits.length > 4 && (
        <div className="absolute z-20 top-full left-0 mt-2 p-4 bg-card border border-border rounded-lg shadow-xl max-w-80">
          <h6 className="font-medium text-foreground mb-2">All benefits included:</h6>
          <div className="space-y-1">
            {fare.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
          <div className="absolute -top-2 left-4 border-8 border-transparent border-b-white"></div>
        </div>
      )}
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          <span>Choose Your Fare</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Select the fare option that best suits your needs
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Fare Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fareOptions.map((fare) => (
            <FareCard
              key={fare.id}
              fare={fare}
              isSelected={selectedFare === fare.id}
              onSelect={() => onFareChange(fare.id)}
            />
          ))}
        </div>

        {/* Price Difference Highlight */}
        {selectedFare === "premium" && (
          <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h6 className="font-semibold text-green-800">Great Choice!</h6>
                  <p className="text-sm text-green-700">
                    You're saving ₹{(15071 - 14912) * passengerCount} and getting premium benefits worth ₹5,000+
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Terms & Conditions */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Fare rules and restrictions apply for all options</p>
          <p>• Premium benefits are subject to airline's terms and conditions</p>
          <p>• Delay protection coverage is provided by third-party insurance</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default FareUpgradeBox
