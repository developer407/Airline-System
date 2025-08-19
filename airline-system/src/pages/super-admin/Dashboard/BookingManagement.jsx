import * as React from "react"
import { Users, AlertTriangle, CreditCard, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const BookingManagement = ({ activeSection }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-orange-600" />
          Booking & Ticket Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-600">15,643</p>
            <p className="text-sm text-blue-800">Total Bookings</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-yellow-600">23</p>
            <p className="text-sm text-yellow-800">Disputes</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-600">45</p>
            <p className="text-sm text-green-800">Refunds</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-red-600">7</p>
            <p className="text-sm text-red-800">Fraud Alerts</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-4">Recent Booking Issues</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">PNR: ABCD123</p>
                <p className="text-sm text-gray-600">Payment dispute - Customer refund request</p>
              </div>
              <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">PNR: XYZ789</p>
                <p className="text-sm text-gray-600">Suspicious activity detected</p>
              </div>
              <Badge className="bg-red-100 text-red-800">Investigation</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingManagement
