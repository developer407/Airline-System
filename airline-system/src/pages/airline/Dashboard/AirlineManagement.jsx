import * as React from "react"
import { 
  Building2,
  Plus,
  Search,
  Settings,
  UserCheck,
  Edit,
  Trash2,
  Eye,
  MapPin,
  Phone,
  Mail,
  Globe,
  Users,
  Plane
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Mock airline data
const mockAirlines = [
  {
    id: "AL001",
    name: "Air India",
    code: "AI",
    iataCode: "AI",
    icaoCode: "AIC",
    logo: "🇮🇳",
    headquarters: "New Delhi, India",
    founded: "1932",
    fleet: 123,
    destinations: 102,
    employees: 27000,
    contact: {
      phone: "+91-11-2462-2220",
      email: "info@airindia.in",
      website: "www.airindia.in"
    },
    status: "Active",
    hub: ["DEL", "BOM"],
    alliance: "Star Alliance"
  },
  {
    id: "AL002",
    name: "IndiGo",
    code: "6E",
    iataCode: "6E",
    icaoCode: "IGO",
    logo: "🟦",
    headquarters: "Gurgaon, India",
    founded: "2006",
    fleet: 279,
    destinations: 87,
    employees: 23000,
    contact: {
      phone: "+91-124-4973-838",
      email: "feedback@goindigo.in",
      website: "www.goindigo.in"
    },
    status: "Active",
    hub: ["DEL", "BLR", "BOM"],
    alliance: "Independent"
  }
]

const AirlineManagement = ({ activeSection }) => {
  const [airlines, setAirlines] = React.useState(mockAirlines)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [filteredAirlines, setFilteredAirlines] = React.useState(mockAirlines)

  React.useEffect(() => {
    let filtered = [...airlines]
    if (searchQuery) {
      filtered = filtered.filter(airline => 
        airline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airline.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airline.headquarters.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    setFilteredAirlines(filtered)
  }, [airlines, searchQuery])

  const renderContent = () => {
    switch (activeSection) {
      case "airlines-list":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>All Airlines</CardTitle>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Airline
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search airlines..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  {filteredAirlines.map((airline) => (
                    <AirlineCard key={airline.id} airline={airline} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "airlines-create":
        return <CreateAirlineForm />
      case "airlines-profile":
        return <AirlineProfile />
      case "airlines-settings":
        return <AirlineSettings />
      default:
        return <AirlineOverview airlines={airlines} />
    }
  }

  return <div className="space-y-6">{renderContent()}</div>
}

const AirlineCard = ({ airline }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{airline.logo}</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{airline.name}</h3>
            <p className="text-sm text-gray-600">{airline.code} • {airline.iataCode} / {airline.icaoCode}</p>
            <Badge className="mt-1 bg-green-100 text-green-800">{airline.status}</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Headquarters</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">{airline.headquarters}</div>
            <div className="text-gray-600">Founded: {airline.founded}</div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Plane className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Fleet</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">{airline.fleet} aircraft</div>
            <div className="text-gray-600">{airline.destinations} destinations</div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Team</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">{airline.employees.toLocaleString()} employees</div>
            <div className="text-gray-600">{airline.alliance}</div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Contact</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">{airline.contact.website}</div>
            <div className="text-gray-600">{airline.contact.phone}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          Hub airports: {airline.hub.join(", ")}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

const CreateAirlineForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Airline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Airline Name
            </label>
            <Input placeholder="Enter airline name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Airline Code
            </label>
            <Input placeholder="e.g., AI" />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button>Create Airline</Button>
        </div>
      </CardContent>
    </Card>
  )
}

const AirlineProfile = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Airline Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Manage your airline profile and company information.</p>
      </CardContent>
    </Card>
  )
}

const AirlineSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Airline Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Configure airline-specific settings and preferences.</p>
      </CardContent>
    </Card>
  )
}

const AirlineOverview = ({ airlines }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Airlines</p>
                <p className="text-2xl font-bold text-gray-900">{airlines.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Airlines</p>
                <p className="text-2xl font-bold text-green-600">
                  {airlines.filter(a => a.status === "Active").length}
                </p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Fleet</p>
                <p className="text-2xl font-bold text-purple-600">
                  {airlines.reduce((sum, a) => sum + a.fleet, 0)}
                </p>
              </div>
              <Plane className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AirlineManagement
