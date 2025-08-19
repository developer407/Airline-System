import * as React from "react"
import { 
  MapPin,
  Plus,
  Search,
  Globe,
  Building2,
  Clock,
  Target,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Plane,
  Users,
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Mock airport data
const mockAirports = [
  {
    id: "AP001",
    iataCode: "DEL",
    icaoCode: "VIDP",
    name: "Indira Gandhi International Airport",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    timezone: "Asia/Kolkata",
    coordinates: { lat: 28.5562, lng: 77.1000 },
    elevation: 237,
    terminals: [
      { id: "T1", name: "Terminal 1", status: "Active", capacity: 20000000 },
      { id: "T2", name: "Terminal 2", status: "Active", capacity: 8000000 },
      { id: "T3", name: "Terminal 3", status: "Active", capacity: 34000000 }
    ],
    runways: [
      { id: "RW1", name: "09/27", length: 4430, surface: "Asphalt" },
      { id: "RW2", name: "10/28", length: 4430, surface: "Asphalt" },
      { id: "RW3", name: "11/29", length: 2818, surface: "Asphalt" }
    ],
    gates: 78,
    airlines: 65,
    dailyFlights: 1300,
    passengerCapacity: 62000000,
    status: "Active",
    lastUpdated: "2024-02-10"
  },
  {
    id: "AP002",
    iataCode: "BOM",
    icaoCode: "VABB",
    name: "Chhatrapati Shivaji Maharaj International Airport",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    timezone: "Asia/Kolkata",
    coordinates: { lat: 19.0896, lng: 72.8656 },
    elevation: 11,
    terminals: [
      { id: "T1", name: "Terminal 1", status: "Active", capacity: 20000000 },
      { id: "T2", name: "Terminal 2", status: "Active", capacity: 40000000 }
    ],
    runways: [
      { id: "RW1", name: "09/27", length: 3445, surface: "Asphalt" },
      { id: "RW2", name: "14/32", length: 2925, surface: "Asphalt" }
    ],
    gates: 104,
    airlines: 58,
    dailyFlights: 980,
    passengerCapacity: 60000000,
    status: "Active",
    lastUpdated: "2024-02-08"
  },
  {
    id: "AP003",
    iataCode: "BLR",
    icaoCode: "VOBL",
    name: "Kempegowda International Airport",
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    timezone: "Asia/Kolkata",
    coordinates: { lat: 13.1979, lng: 77.7063 },
    elevation: 920,
    terminals: [
      { id: "T1", name: "Terminal 1", status: "Active", capacity: 25000000 },
      { id: "T2", name: "Terminal 2", status: "Under Construction", capacity: 25000000 }
    ],
    runways: [
      { id: "RW1", name: "09/27", length: 4000, surface: "Asphalt" },
      { id: "RW2", name: "14/32", length: 2743, surface: "Asphalt" }
    ],
    gates: 58,
    airlines: 42,
    dailyFlights: 680,
    passengerCapacity: 25000000,
    status: "Active",
    lastUpdated: "2024-02-12"
  }
]

const mockCities = [
  {
    id: "CT001",
    name: "New Delhi",
    state: "Delhi",
    country: "India",
    timezone: "Asia/Kolkata",
    airports: ["DEL"],
    population: 32900000,
    coordinates: { lat: 28.7041, lng: 77.1025 }
  },
  {
    id: "CT002",
    name: "Mumbai",
    state: "Maharashtra",
    country: "India",
    timezone: "Asia/Kolkata",
    airports: ["BOM"],
    population: 20400000,
    coordinates: { lat: 19.0760, lng: 72.8777 }
  },
  {
    id: "CT003",
    name: "Bengaluru",
    state: "Karnataka",
    country: "India",
    timezone: "Asia/Kolkata",
    airports: ["BLR"],
    population: 13600000,
    coordinates: { lat: 12.9716, lng: 77.5946 }
  }
]

const AirportManagement = ({ activeSection }) => {
  const [airports, setAirports] = React.useState(mockAirports)
  const [cities, setCities] = React.useState(mockCities)
  const [filteredAirports, setFilteredAirports] = React.useState(mockAirports)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [countryFilter, setCountryFilter] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")

  React.useEffect(() => {
    let filtered = [...airports]

    if (searchQuery) {
      filtered = filtered.filter(airport => 
        airport.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airport.iataCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airport.icaoCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airport.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (countryFilter !== "all") {
      filtered = filtered.filter(airport => airport.country.toLowerCase() === countryFilter)
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(airport => airport.status.toLowerCase() === statusFilter)
    }

    setFilteredAirports(filtered)
  }, [airports, searchQuery, countryFilter, statusFilter])

  const renderContent = () => {
    switch (activeSection) {
      case "airports-list":
        return <AirportsList />
      case "cities-list":
        return <CitiesList />
      case "airports-codes":
        return <CodesManagement />
      case "airports-terminals":
        return <TerminalsGates />
      case "airports-timezones":
        return <TimezoneManagement />
      default:
        return <AirportsOverview />
    }
  }

  const AirportsOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Airports</p>
                <p className="text-2xl font-bold text-gray-900">{airports.length}</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Cities Served</p>
                <p className="text-2xl font-bold text-green-600">{cities.length}</p>
              </div>
              <Globe className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Terminals</p>
                <p className="text-2xl font-bold text-purple-600">
                  {airports.reduce((sum, a) => sum + a.terminals.length, 0)}
                </p>
              </div>
              <Building2 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Daily Flights</p>
                <p className="text-2xl font-bold text-orange-600">
                  {airports.reduce((sum, a) => sum + a.dailyFlights, 0).toLocaleString()}
                </p>
              </div>
              <Plane className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>
      <AirportsList />
    </div>
  )

  const AirportsList = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Airport Management</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Airport
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search airports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              <SelectItem value="india">India</SelectItem>
              <SelectItem value="usa">USA</SelectItem>
              <SelectItem value="uk">UK</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Bulk Import
          </Button>
        </div>

        <div className="space-y-4">
          {filteredAirports.map((airport) => (
            <AirportCard key={airport.id} airport={airport} />
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const CitiesList = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Cities Management</CardTitle>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add City
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const CodesManagement = () => (
    <Card>
      <CardHeader>
        <CardTitle>IATA/ICAO Codes Management</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Manage and validate airport identification codes.</p>
        <div className="space-y-4">
          {airports.map((airport) => (
            <div key={airport.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{airport.name}</h4>
                  <p className="text-sm text-gray-600">{airport.city}, {airport.country}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <Badge className="bg-blue-100 text-blue-800 mb-1">{airport.iataCode}</Badge>
                    <p className="text-xs text-gray-500">IATA</p>
                  </div>
                  <div className="text-center">
                    <Badge className="bg-green-100 text-green-800 mb-1">{airport.icaoCode}</Badge>
                    <p className="text-xs text-gray-500">ICAO</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const TerminalsGates = () => (
    <Card>
      <CardHeader>
        <CardTitle>Terminals & Gates</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Manage airport terminals and gate configurations.</p>
        <div className="space-y-6">
          {airports.map((airport) => (
            <div key={airport.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium">{airport.name}</h4>
                  <p className="text-sm text-gray-600">{airport.gates} total gates</p>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="h-3 w-3 mr-1" />
                  Add Terminal
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {airport.terminals.map((terminal) => (
                  <div key={terminal.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{terminal.name}</h5>
                      <Badge className={cn(
                        terminal.status === "Active" ? "bg-green-100 text-green-800" :
                        terminal.status === "Under Construction" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      )}>
                        {terminal.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      Capacity: {(terminal.capacity / 1000000).toFixed(1)}M passengers/year
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const TimezoneManagement = () => (
    <Card>
      <CardHeader>
        <CardTitle>Timezone Management</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Configure timezone settings for airports and cities.</p>
        <div className="space-y-4">
          {airports.map((airport) => (
            <div key={airport.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{airport.name}</h4>
                  <p className="text-sm text-gray-600">{airport.city}, {airport.country}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{airport.timezone}</p>
                    <p className="text-sm text-gray-600">
                      {new Date().toLocaleTimeString('en-US', { timeZone: airport.timezone })}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Clock className="h-3 w-3 mr-1" />
                    Update
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  return <div className="space-y-6">{renderContent()}</div>
}

const AirportCard = ({ airport }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{airport.name}</h3>
          <p className="text-sm text-gray-600">{airport.city}, {airport.state}, {airport.country}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge className="bg-blue-100 text-blue-800">{airport.iataCode}</Badge>
            <Badge className="bg-green-100 text-green-800">{airport.icaoCode}</Badge>
            <Badge className={cn(
              airport.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            )}>
              {airport.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Infrastructure</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">{airport.terminals.length} terminals</div>
            <div className="text-gray-600">{airport.runways.length} runways</div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Plane className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Operations</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">{airport.dailyFlights} daily flights</div>
            <div className="text-gray-600">{airport.airlines} airlines</div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Capacity</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">{(airport.passengerCapacity / 1000000).toFixed(1)}M passengers</div>
            <div className="text-gray-600">{airport.gates} gates</div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Location</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">{airport.coordinates.lat.toFixed(4)}°, {airport.coordinates.lng.toFixed(4)}°</div>
            <div className="text-gray-600">{airport.elevation}m elevation</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          Last updated: {new Date(airport.lastUpdated).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Eye className="h-3 w-3 mr-1" />
            View Details
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="h-3 w-3 mr-1" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  )
}

const CityCard = ({ city }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{city.name}</h3>
          <p className="text-sm text-gray-600">{city.state}, {city.country}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Population</p>
          <p className="text-lg font-bold">{(city.population / 1000000).toFixed(1)}M</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <span className="text-sm text-gray-600">Airports</span>
          <div className="flex gap-1 mt-1">
            {city.airports.map((airport) => (
              <Badge key={airport} className="bg-blue-100 text-blue-800">{airport}</Badge>
            ))}
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-600">Timezone</span>
          <p className="font-medium">{city.timezone}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Coordinates</span>
          <p className="font-medium">{city.coordinates.lat.toFixed(4)}°, {city.coordinates.lng.toFixed(4)}°</p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-4">
        <Button variant="outline" size="sm">
          <Edit className="h-3 w-3 mr-1" />
          Edit
        </Button>
      </div>
    </div>
  )
}

export default AirportManagement
