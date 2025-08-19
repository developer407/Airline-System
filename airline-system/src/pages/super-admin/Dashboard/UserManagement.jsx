import * as React from "react"
import { UserCheck, Users, Building2, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const UserManagement = ({ activeSection }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-purple-600" />
          User & Agent Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-blue-600">45,678</p>
            <p className="text-sm text-blue-800">Total Customers</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-green-600">234</p>
            <p className="text-sm text-green-800">Travel Agents</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-purple-600">67</p>
            <p className="text-sm text-purple-800">Agencies</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <p className="text-2xl font-bold text-red-600">89</p>
            <p className="text-sm text-red-800">Suspended</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-4">Recent User Activities</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">New travel agency registration</p>
              <p className="text-sm text-gray-600">SkyTravel Agency - Pending verification</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="font-medium">User account suspended</p>
              <p className="text-sm text-gray-600">Suspicious booking patterns detected</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserManagement
