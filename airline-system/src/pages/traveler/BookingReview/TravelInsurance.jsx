import * as React from "react"
import { 
  Shield, 
  Check, 
  X, 
  Plane, 
  Luggage, 
  Heart, 
  Clock,
  Info,
  AlertTriangle,
  FileText,
  Phone
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const TravelInsurance = ({ selected, onChange, passengerCount }) => {
  const [showDetails, setShowDetails] = React.useState(false)
  const [showTerms, setShowTerms] = React.useState(false)

  const pricePerTraveler = 379
  const totalPrice = pricePerTraveler * passengerCount

  const benefits = [
    {
      icon: Plane,
      title: "Flight Delay Protection",
      description: "Compensation up to ₹10,000 for delays over 3 hours",
      coverage: "₹10,000"
    },
    {
      icon: Luggage,
      title: "Baggage Assistance",
      description: "Lost, delayed or damaged baggage coverage",
      coverage: "₹25,000"
    },
    {
      icon: Heart,
      title: "Medical Emergency Cover",
      description: "Emergency medical expenses during travel",
      coverage: "₹2,50,000"
    },
    {
      icon: Clock,
      title: "Trip Cancellation",
      description: "Covers non-refundable trip costs if cancelled",
      coverage: "₹50,000"
    }
  ]

  const additionalBenefits = [
    "Personal accident cover up to ₹5,00,000",
    "Trip interruption coverage",
    "Emergency evacuation assistance", 
    "24/7 travel assistance helpline",
    "Missed connection compensation",
    "Travel document loss support",
    "Hotel accommodation for delays",
    "Alternative transport arrangements"
  ]

  const exclusions = [
    "Pre-existing medical conditions",
    "High-risk activities and sports",
    "Travel against medical advice",
    "Alcohol or drug-related incidents",
    "War, terrorism, or civil unrest",
    "Natural disasters in certain regions"
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span>Travel Insurance - Trip Secure</span>
        </CardTitle>
        <div className="bg-muted/30 border border-border rounded-lg p-3 mt-2">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h6 className="font-medium text-foreground">Protect your trip investment</h6>
              <p className="text-sm text-muted-foreground mt-1">
                Comprehensive coverage against flight delays, cancellations, baggage loss, and medical emergencies during your travel.
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Main Selection */}
        <div className="space-y-4">
          {/* Yes Option */}
          <div 
            className={cn(
              "border-2 rounded-lg p-4 cursor-pointer transition-all duration-200",
              selected 
                ? "border-green-500 bg-green-50/20" 
                : "border-border hover:border-green-300/50 hover:bg-muted/50"
            )}
            onClick={() => onChange(true)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 mt-0.5",
                  selected 
                    ? "border-green-500 bg-green-500" 
                    : "border-border"
                )}>
                  {selected && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="space-y-2">
                  <div>
                                      <h4 className="font-semibold text-foreground">
                    Yes, Secure my trip
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Get comprehensive travel protection for peace of mind
                  </p>
                  </div>
                  
                  {/* Key Benefits Preview */}
                  <div className="grid grid-cols-2 gap-3">
                    {benefits.slice(0, 4).map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <benefit.icon className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-muted-foreground">{benefit.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-xl font-bold text-foreground">
                  ₹{totalPrice.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  ₹{pricePerTraveler} × {passengerCount} traveler{passengerCount > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>

          {/* No Option */}
          <div 
            className={cn(
              "border-2 rounded-lg p-4 cursor-pointer transition-all duration-200",
              !selected 
                ? "border-muted bg-muted/50" 
                : "border-border hover:border-muted"
            )}
            onClick={() => onChange(false)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-5 h-5 rounded-full border-2",
                  !selected 
                    ? "border-muted bg-muted" 
                    : "border-border"
                )}>
                  {!selected && <Check className="w-3 h-3 text-white" />}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    No, book without insurance
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Continue without travel protection
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-amber-600">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">Not recommended</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Benefits (when insurance selected) */}
        {selected && (
          <div className="space-y-4 animate-in slide-in-from-top-2 fade-in duration-300">
            {/* Main Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <benefit.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground">{benefit.title}</h5>
                      <p className="text-sm text-muted-foreground mt-1">{benefit.description}</p>
                      <p className="text-sm font-semibold text-green-600 mt-1">
                        Coverage: {benefit.coverage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Details Button */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => setShowDetails(!showDetails)}
                className="text-primary border-border hover:bg-muted"
              >
                {showDetails ? "Hide Details" : "View All Benefits & Coverage"}
              </Button>
            </div>

            {/* Extended Details */}
            {showDetails && (
              <div className="space-y-4 animate-in slide-in-from-top-2 fade-in duration-300">
                {/* Additional Benefits */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <h5 className="font-medium text-foreground mb-3">Additional Benefits Included:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {additionalBenefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="bg-muted/30 border border-border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-foreground">24/7 Emergency Assistance</h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        Global toll-free helpline for immediate support during emergencies
                      </p>
                      <p className="text-sm font-mono text-foreground mt-2 bg-card px-2 py-1 rounded">
                        +1-800-HELP-NOW (International) | 1800-123-4567 (India)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Important Exclusions */}
                <div className="bg-muted/30 border border-border rounded-lg p-4">
                  <h5 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Important Exclusions
                  </h5>
                  <div className="space-y-1">
                    {exclusions.map((exclusion, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <X className="w-3 h-3 text-amber-600 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{exclusion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Terms & Conditions */}
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Insurance provided by HDFC ERGO General Insurance Co. Ltd.
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTerms(!showTerms)}
                  className="text-primary hover:bg-muted"
                >
                  {showTerms ? "Hide" : "View"} T&Cs
                </Button>
              </div>

              {showTerms && (
                <div className="mt-3 p-3 bg-muted/50 rounded text-xs text-muted-foreground space-y-2 animate-in slide-in-from-top-1 fade-in duration-200">
                  <p>• Insurance coverage is subject to policy terms, conditions, and exclusions.</p>
                  <p>• Claims must be reported within 30 days of the incident with proper documentation.</p>
                  <p>• Pre-existing medical conditions require declaration and may affect coverage.</p>
                  <p>• Coverage is valid for the entire duration of your trip as per the itinerary.</p>
                  <p>• Some benefits may have waiting periods or require pre-authorization.</p>
                  <p>• Full policy wording available at <span className="text-primary">www.hdfcergo.com</span></p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Risk Warning (when not selected) */}
        {!selected && (
          <div className="bg-muted/30 border border-border rounded-lg p-4 animate-in slide-in-from-top-2 fade-in duration-300">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-foreground">Consider the risks</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  Without travel insurance, you'll be personally responsible for:
                </p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1 ml-4">
                  <li>• Flight delays and cancellation costs</li>
                  <li>• Medical emergencies and evacuation expenses</li>
                  <li>• Lost or delayed baggage replacement</li>
                  <li>• Trip interruption and accommodation costs</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TravelInsurance
