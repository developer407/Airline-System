import * as React from "react"
import { 
  CreditCard, 
  Receipt, 
  Shield, 
  Plane, 
  Utensils, 
  Luggage,
  MapPin,
  Lock,
  Zap,
  Coffee,
  ChevronDown,
  ChevronUp,
  Tag,
  Gift,
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const PriceSummaryBox = ({ 
  flight, 
  bookingData, 
  searchData, 
  totalPrice, 
  onProceedToPayment, 
  isLoading,
  hasErrors 
}) => {
  const [showBreakdown, setShowBreakdown] = React.useState(true)
  const [couponCode, setCouponCode] = React.useState("")
  const [appliedCoupon, setAppliedCoupon] = React.useState(null)
  const [couponError, setCouponError] = React.useState("")

  // Mock coupons - in real app this would come from API
  const availableCoupons = {
    "FIRST100": { discount: 100, minAmount: 2000, description: "₹100 off on first booking" },
    "SAVE500": { discount: 500, minAmount: 10000, description: "₹500 off on bookings above ₹10,000" },
    "NEWUSER": { discount: 750, minAmount: 5000, description: "₹750 off for new users" }
  }

  const calculateBasePrice = () => {
    let basePrice = flight.price * searchData.passengers
    
    // Add fare upgrade
    if (bookingData.selectedFare === "premium") {
      basePrice += 500 * searchData.passengers
    }
    
    return basePrice
  }

  const calculateTaxes = () => {
    const basePrice = calculateBasePrice()
    return Math.round(basePrice * 0.18) // 18% taxes
  }

  const calculateAddOns = () => {
    let addOnPrice = 0
    
    // Insurance
    if (bookingData.insurance) {
      addOnPrice += 379 * searchData.passengers
    }
    
    // Seats (mock pricing)
    const seatCount = Object.keys(bookingData.seats || {}).length
    addOnPrice += seatCount * 600 // Economy seat price
    
    // Meals
    Object.values(bookingData.meals || {}).forEach(mealId => {
      if (mealId && mealId !== "none") {
        const mealPrices = {
          "veg": 450, "nonveg": 550, "jain": 500, 
          "vegan": 520, "diabetic": 480
        }
        addOnPrice += mealPrices[mealId] || 0
      }
    })
    
    // Other add-ons
    if (bookingData.addOns?.extraBaggage) addOnPrice += 1200
    if (bookingData.addOns?.priorityCheckin) addOnPrice += 600
    if (bookingData.addOns?.fastTrack) addOnPrice += 800
    if (bookingData.addOns?.loungeAccess) addOnPrice += 2500
    if (bookingData.addOns?.lockPrice) addOnPrice += 672
    
    return addOnPrice
  }

  const applyCoupon = () => {
    setCouponError("")
    
    if (!couponCode.trim()) {
      setCouponError("Please enter a coupon code")
      return
    }
    
    const coupon = availableCoupons[couponCode.toUpperCase()]
    if (!coupon) {
      setCouponError("Invalid coupon code")
      return
    }
    
    const subtotal = calculateBasePrice() + calculateTaxes() + calculateAddOns()
    if (subtotal < coupon.minAmount) {
      setCouponError(`Minimum booking amount ₹${coupon.minAmount} required`)
      return
    }
    
    setAppliedCoupon({
      code: couponCode.toUpperCase(),
      ...coupon
    })
    setCouponCode("")
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponError("")
  }

  const getFinalTotal = () => {
    const basePrice = calculateBasePrice()
    const taxes = calculateTaxes()
    const addOns = calculateAddOns()
    const discount = appliedCoupon ? appliedCoupon.discount : 0
    
    return Math.max(0, basePrice + taxes + addOns - discount)
  }

  const getSavingsAmount = () => {
    if (!appliedCoupon) return 0
    return appliedCoupon.discount
  }

  const PriceLineItem = ({ icon: Icon, label, amount, color = "text-gray-700", iconColor = "text-muted-foreground" }) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        {Icon && <Icon className={cn("w-4 h-4", iconColor)} />}
        <span className={cn("text-sm", color)}>{label}</span>
      </div>
      <span className={cn("text-sm font-medium", color)}>
        {amount > 0 ? `₹${amount.toLocaleString()}` : "Free"}
      </span>
    </div>
  )

  return (
    <Card className="sticky top-24 h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5 text-blue-600" />
          <span>Price Summary</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Flight Details Summary */}
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Plane className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              {searchData.from} → {searchData.to}
            </span>
          </div>
          <div className="text-xs text-blue-700 space-y-1">
            <p>{flight.airlineName} • {flight.flightNumber}</p>
            <p>{searchData.passengers} passenger{searchData.passengers > 1 ? 's' : ''} • {bookingData.selectedFare === "premium" ? "Premium" : "Regular"}</p>
            {bookingData.insurance && (
              <p className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Travel Insurance included
              </p>
            )}
          </div>
        </div>

        {/* Price Breakdown Toggle */}
        <Button
          variant="ghost"
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="w-full justify-between p-0 h-auto font-normal"
        >
          <span className="text-sm text-gray-700">Price Breakdown</span>
          {showBreakdown ? 
            <ChevronUp className="w-4 h-4" /> : 
            <ChevronDown className="w-4 h-4" />
          }
        </Button>

        {/* Detailed Breakdown */}
        {showBreakdown && (
          <div className="space-y-1 animate-in slide-in-from-top-2 fade-in duration-200">
            {/* Base Fare */}
            <PriceLineItem
              icon={Plane}
              label={`Base fare (${searchData.passengers} × ₹${flight.price.toLocaleString()})`}
              amount={flight.price * searchData.passengers}
              iconColor="text-blue-600"
            />

            {/* Fare Upgrade */}
            {bookingData.selectedFare === "premium" && (
              <PriceLineItem
                icon={Zap}
                label={`Premium upgrade (${searchData.passengers} passengers)`}
                amount={500 * searchData.passengers}
                iconColor="text-purple-600"
              />
            )}

            {/* Taxes */}
            <PriceLineItem
              icon={Receipt}
              label="Taxes & fees"
              amount={calculateTaxes()}
              iconColor="text-muted-foreground"
            />

            {/* Add-ons */}
            {bookingData.insurance && (
              <PriceLineItem
                icon={Shield}
                label={`Travel insurance (${searchData.passengers} passengers)`}
                amount={379 * searchData.passengers}
                iconColor="text-green-600"
              />
            )}

            {Object.keys(bookingData.seats || {}).length > 0 && (
              <PriceLineItem
                icon={MapPin}
                label={`Seat selection (${Object.keys(bookingData.seats).length} seats)`}
                amount={Object.keys(bookingData.seats).length * 600}
                iconColor="text-blue-600"
              />
            )}

            {Object.values(bookingData.meals || {}).filter(m => m && m !== "none").length > 0 && (
              <PriceLineItem
                icon={Utensils}
                label={`Meal selection (${Object.values(bookingData.meals || {}).filter(m => m && m !== "none").length} meals)`}
                amount={Object.values(bookingData.meals || {}).filter(m => m && m !== "none").length * 500}
                iconColor="text-orange-600"
              />
            )}

            {bookingData.addOns?.extraBaggage && (
              <PriceLineItem
                icon={Luggage}
                label="Extra baggage"
                amount={1200}
                iconColor="text-blue-600"
              />
            )}

            {bookingData.addOns?.priorityCheckin && (
              <PriceLineItem
                icon={Zap}
                label="Priority check-in"
                amount={600}
                iconColor="text-purple-600"
              />
            )}

            {bookingData.addOns?.fastTrack && (
              <PriceLineItem
                icon={Shield}
                label="Fast track security"
                amount={800}
                iconColor="text-green-600"
              />
            )}

            {bookingData.addOns?.loungeAccess && (
              <PriceLineItem
                icon={Coffee}
                label="Airport lounge access"
                amount={2500}
                iconColor="text-orange-600"
              />
            )}

            {bookingData.addOns?.lockPrice && (
              <PriceLineItem
                icon={Lock}
                label="Price lock (24 hours)"
                amount={672}
                iconColor="text-red-600"
              />
            )}

            {/* Discount */}
            {appliedCoupon && (
              <div className="pt-2 border-t border-gray-200">
                <PriceLineItem
                  icon={Gift}
                  label={`Discount (${appliedCoupon.code})`}
                  amount={-appliedCoupon.discount}
                  color="text-green-600"
                  iconColor="text-green-600"
                />
              </div>
            )}
          </div>
        )}

        {/* Coupon Section */}
        <div className="space-y-3">
          {!appliedCoupon ? (
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="flex-1 text-sm"
                />
                <Button 
                  variant="outline" 
                  onClick={applyCoupon}
                  className="px-4 text-blue-600 border-blue-200 hover:bg-blue-50"
                >
                  Apply
                </Button>
              </div>
              {couponError && (
                <p className="text-red-600 text-xs flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {couponError}
                </p>
              )}
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      {appliedCoupon.code} applied
                    </p>
                    <p className="text-xs text-green-700">
                      {appliedCoupon.description}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeCoupon}
                  className="text-green-700 hover:text-green-800 hover:bg-green-100"
                >
                  Remove
                </Button>
              </div>
            </div>
          )}

          {/* Available Coupons Hint */}
          {!appliedCoupon && (
            <div className="text-xs text-muted-foreground">
              <p>💡 Try: FIRST100, SAVE500, NEWUSER</p>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-foreground">Total Amount</p>
              {getSavingsAmount() > 0 && (
                <p className="text-sm text-green-600 font-medium">
                  You save ₹{getSavingsAmount().toLocaleString()}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-foreground">
                ₹{getFinalTotal().toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">
                for {searchData.passengers} passenger{searchData.passengers > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Payment CTA */}
        <Button
          onClick={onProceedToPayment}
          disabled={isLoading || hasErrors}
          className={cn(
            "w-full py-3 text-base font-semibold",
            hasErrors 
              ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          )}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing...
            </>
          ) : hasErrors ? (
            <>
              <AlertTriangle className="h-4 w-4 mr-2" />
              Complete Required Fields
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4 mr-2" />
              Proceed to Payment
            </>
          )}
        </Button>

        {/* Security Note */}
        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p className="flex items-center justify-center gap-1">
            <Shield className="w-3 h-3" />
            Secure payment with 256-bit SSL encryption
          </p>
          <p>Your payment information is safe and secure</p>
        </div>

        {/* Payment Methods Preview */}
        <div className="border-t border-gray-200 pt-3">
          <p className="text-xs text-muted-foreground mb-2">Accepted payment methods:</p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>💳 Credit Card</span>
            <span>•</span>
            <span>💸 Debit Card</span>
            <span>•</span>
            <span>📱 UPI</span>
            <span>•</span>
            <span>🏦 Net Banking</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PriceSummaryBox
