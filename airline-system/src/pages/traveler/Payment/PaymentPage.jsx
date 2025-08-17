import * as React from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ChevronLeft, CreditCard, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const PaymentPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  const { bookingData, flight, searchData, totalPrice } = location.state || {}

  if (!flight) {
    React.useEffect(() => {
      navigate("/")
    }, [navigate])
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/10 to-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="p-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Payment</h1>
              <p className="text-sm text-gray-500">
                Complete your booking securely
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Payment Page</CardTitle>
            <p className="text-gray-600">
              Your booking details have been confirmed
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6 text-center">
              <h3 className="font-semibold text-blue-900 mb-2">Booking Summary</h3>
              <p className="text-blue-800">
                {searchData?.from} → {searchData?.to}
              </p>
              <p className="text-blue-700 text-sm">
                {flight?.airlineName} • {flight?.flightNumber}
              </p>
              <p className="text-2xl font-bold text-blue-900 mt-4">
                Total: ₹{totalPrice?.toLocaleString()}
              </p>
            </div>

            <div className="text-center text-gray-600">
              <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p>This is a demo payment page.</p>
              <p className="text-sm">In a real application, you would integrate with payment gateways like:</p>
              <div className="flex justify-center gap-4 mt-2 text-sm">
                <span>Razorpay</span>
                <span>•</span>
                <span>Stripe</span>
                <span>•</span>
                <span>PayU</span>
                <span>•</span>
                <span>Paytm</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => navigate("/")}>
                Back to Home
              </Button>
              <Button onClick={() => navigate("/")}>
                Complete Booking (Demo)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PaymentPage
