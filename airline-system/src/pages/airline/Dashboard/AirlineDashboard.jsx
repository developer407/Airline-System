import * as React from "react"
import { 
  Plane,
  Plus,
  Search,
  Filter,
  Calendar,
  Users,
  TrendingUp,
  Settings,
  BarChart3,
  Clock,
  MapPin,
  Edit,
  Eye,
  Trash2,
  Upload,
  Download,
  Bell
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import FlightForm from "./FlightForm"
import AnalyticsDashboard from "./AnalyticsDashboard"
import BookingManagement from "./BookingManagement"
import OffersManagement from "./OffersManagement"
import AirlineSidebar from "../Sidebar/AirlineSidebar"
import AirlineManagement from "./AirlineManagement"
import SeatManagement from "./SeatManagement"

// Mock flight data
const mockFlights = [
  {
    id: "FL001",
    flightNumber: "AI-203",
    airline: {
      name: "Air India",
      code: "AI"
    },
    aircraft: {
      type: "Boeing 737-800",
      capacity: 180,
      layout: "3-3"
    },
    route: {
      departure: {
        airport: "DEL",
        name: "Indira Gandhi International",
        city: "New Delhi"
      },
      arrival: {
        airport: "BOM",
        name: "Chhatrapati Shivaji International",
        city: "Mumbai"
      },
      distance: 1149
    },
    schedule: {
      departureTime: "08:30",
      arrivalTime: "10:45",
      date: "2024-02-15",
      frequency: "Daily",
      duration: "2h 15m",
      timezone: "IST"
    },
    pricing: {
      economy: 4500,
      business: 12000,
      first: null,
      taxes: 650,
      baggage: {
        cabin: "7 kg",
        checkedIn: "15 kg"
      }
    },
    services: {
      meals: ["Vegetarian", "Non-Vegetarian", "Jain"],
      extraBaggage: true,
      priorityCheckin: true,
      wifi: false,
      entertainment: true
    },
    status: "Active",
    realTimeStatus: "On-time",
    bookings: 156,
    occupancy: 87,
    createdBy: "airline_admin_001",
    lastModified: "2024-02-10T14:30:00Z"
  },
  {
    id: "FL002",
    flightNumber: "6E-425",
    airline: {
      name: "IndiGo",
      code: "6E"
    },
    aircraft: {
      type: "Airbus A320",
      capacity: 180,
      layout: "3-3"
    },
    route: {
      departure: {
        airport: "BLR",
        name: "Kempegowda International",
        city: "Bengaluru"
      },
      arrival: {
        airport: "DEL",
        name: "Indira Gandhi International",
        city: "New Delhi"
      },
      distance: 1740
    },
    schedule: {
      departureTime: "14:20",
      arrivalTime: "17:05",
      date: "2024-02-15",
      frequency: "Daily",
      duration: "2h 45m",
      timezone: "IST"
    },
    pricing: {
      economy: 5200,
      business: null,
      first: null,
      taxes: 780,
      baggage: {
        cabin: "7 kg",
        checkedIn: "15 kg"
      }
    },
    services: {
      meals: ["Vegetarian", "Non-Vegetarian"],
      extraBaggage: true,
      priorityCheckin: false,
      wifi: true,
      entertainment: false
    },
    status: "Active",
    realTimeStatus: "Delayed",
    bookings: 164,
    occupancy: 91,
    createdBy: "airline_admin_002",
    lastModified: "2024-02-12T09:15:00Z"
  },
  {
    id: "FL003",
    flightNumber: "UK-955",
    airline: {
      name: "Vistara",
      code: "UK"
    },
    aircraft: {
      type: "Airbus A321",
      capacity: 222,
      layout: "3-3"
    },
    route: {
      departure: {
        airport: "BOM",
        name: "Chhatrapati Shivaji International",
        city: "Mumbai"
      },
      arrival: {
        airport: "BLR",
        name: "Kempegowda International",
        city: "Bengaluru"
      },
      distance: 842
    },
    schedule: {
      departureTime: "19:45",
      arrivalTime: "21:20",
      date: "2024-02-15",
      frequency: "Daily",
      duration: "1h 35m",
      timezone: "IST"
    },
    pricing: {
      economy: 3800,
      business: 9500,
      first: null,
      taxes: 520,
      baggage: {
        cabin: "7 kg",
        checkedIn: "15 kg"
      }
    },
    services: {
      meals: ["Vegetarian", "Non-Vegetarian", "Vegan"],
      extraBaggage: true,
      priorityCheckin: true,
      wifi: true,
      entertainment: true
    },
    status: "Inactive",
    realTimeStatus: "Cancelled",
    bookings: 0,
    occupancy: 0,
    createdBy: "airline_admin_001",
    lastModified: "2024-02-14T16:45:00Z"
  }
]

const AirlineDashboard = () => {
  // Sidebar and navigation state
  const [activeSection, setActiveSection] = React.useState("overview")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)
  
  // Existing flight management state
  const [activeTab, setActiveTab] = React.useState("flights")
  const [flights, setFlights] = React.useState(mockFlights)
  const [filteredFlights, setFilteredFlights] = React.useState(mockFlights)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [routeFilter, setRouteFilter] = React.useState("all")
  const [dateFilter, setDateFilter] = React.useState("all")
  const [showFlightForm, setShowFlightForm] = React.useState(false)
  const [editingFlight, setEditingFlight] = React.useState(null)

  // Filter flights based on search and filters
  React.useEffect(() => {
    let filtered = [...flights]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(flight => 
        flight.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flight.route.departure.airport.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flight.route.arrival.airport.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flight.route.departure.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flight.route.arrival.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(flight => flight.status.toLowerCase() === statusFilter)
    }

    // Route filter
    if (routeFilter !== "all") {
      filtered = filtered.filter(flight => 
        flight.route.departure.airport === routeFilter || 
        flight.route.arrival.airport === routeFilter
      )
    }

    setFilteredFlights(filtered)
  }, [flights, searchQuery, statusFilter, routeFilter, dateFilter])

  const getStatusBadge = (status) => {
    const statusConfig = {
      "Active": { color: "bg-green-100 text-green-800", icon: "✓" },
      "Inactive": { color: "bg-gray-100 text-gray-800", icon: "○" },
      "On-time": { color: "bg-green-100 text-green-800", icon: "✓" },
      "Delayed": { color: "bg-yellow-100 text-yellow-800", icon: "!" },
      "Cancelled": { color: "bg-red-100 text-red-800", icon: "✗" },
      "Boarding": { color: "bg-blue-100 text-blue-800", icon: "→" },
      "Landed": { color: "bg-purple-100 text-purple-800", icon: "↓" }
    }
    
    const config = statusConfig[status] || statusConfig["Active"]
    
    return (
      <Badge className={cn("flex items-center gap-1", config.color)}>
        <span>{config.icon}</span>
        {status}
      </Badge>
    )
  }

  const handleEditFlight = (flight) => {
    setEditingFlight(flight)
    setShowFlightForm(true)
  }

  const handleDeleteFlight = (flightId) => {
    if (window.confirm("Are you sure you want to delete this flight?")) {
      setFlights(flights.filter(f => f.id !== flightId))
    }
  }

  const handleSaveFlight = (flightData) => {
    if (editingFlight) {
      // Update existing flight
      setFlights(flights.map(f => f.id === editingFlight.id ? { ...flightData, id: editingFlight.id } : f))
    } else {
      // Add new flight
      const newFlight = {
        ...flightData,
        id: `FL${String(flights.length + 1).padStart(3, '0')}`,
        bookings: 0,
        occupancy: 0,
        createdBy: "current_admin",
        lastModified: new Date().toISOString()
      }
      setFlights([...flights, newFlight])
    }
    setShowFlightForm(false)
    setEditingFlight(null)
  }

  const dashboardStats = {
    totalFlights: flights.length,
    activeFlights: flights.filter(f => f.status === "Active").length,
    totalBookings: flights.reduce((sum, f) => sum + f.bookings, 0),
    avgOccupancy: Math.round(flights.reduce((sum, f) => sum + f.occupancy, 0) / flights.length),
    revenue: flights.reduce((sum, f) => sum + (f.bookings * f.pricing.economy), 0)
  }

  // Handle sidebar section changes
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId)
    
    // Map sidebar sections to existing tabs for compatibility
    if (sectionId.includes("flights") || sectionId === "overview") {
      setActiveTab("flights")
    } else if (sectionId.includes("bookings")) {
      setActiveTab("bookings")
    } else if (sectionId.includes("reports") || sectionId.includes("analytics")) {
      setActiveTab("analytics")
    } else if (sectionId.includes("pricing") || sectionId.includes("discounts")) {
      setActiveTab("offers")
    }
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const tabItems = [
    { id: "flights", label: "Flight Management", icon: Plane },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "bookings", label: "Booking Management", icon: Users },
    { id: "offers", label: "Offers & Discounts", icon: TrendingUp }
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AirlineSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />

      {/* Main Content Area */}
      <div className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isSidebarCollapsed ? "ml-16" : "ml-80"
      )}>
        {/* Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {activeSection === "overview" ? "Dashboard Overview" :
                   activeSection.includes("flights") ? "Flight Management" :
                   activeSection.includes("bookings") ? "Booking Management" :
                   activeSection.includes("reports") ? "Reports & Analytics" :
                   activeSection.includes("pricing") ? "Pricing & Discounts" :
                   activeSection.includes("airlines") ? "Airline Management" :
                   activeSection.includes("seats") ? "Seat Management" :
                   "Dashboard"}
                </h1>
                <p className="text-gray-600">
                  {activeSection === "overview" ? "Comprehensive overview of your airline operations" :
                   activeSection.includes("flights") ? "Manage your flight schedules and operations" :
                   activeSection.includes("bookings") ? "View and manage passenger bookings" :
                   activeSection.includes("reports") ? "Analytics and performance insights" :
                   activeSection.includes("pricing") ? "Configure pricing and promotional offers" :
                   activeSection.includes("airlines") ? "Manage airline profiles and settings" :
                   activeSection.includes("seats") ? "Configure seat maps and availability" :
                   "Manage your airline operations"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                  <Badge className="ml-1 bg-red-100 text-red-800">3</Badge>
                </Button>
                <Button 
                  onClick={() => {
                    setEditingFlight(null)
                    setShowFlightForm(true)
                  }}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add New Flight
                </Button>
              </div>
            </div>

            {/* Quick Stats - Show on overview */}
            {activeSection === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{dashboardStats.totalFlights}</div>
                  <div className="text-sm text-blue-800">Total Flights</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{dashboardStats.activeFlights}</div>
                  <div className="text-sm text-green-800">Active Flights</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600">{dashboardStats.totalBookings}</div>
                  <div className="text-sm text-purple-800">Total Bookings</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">{dashboardStats.avgOccupancy}%</div>
                  <div className="text-sm text-orange-800">Avg Occupancy</div>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl border border-indigo-200">
                  <div className="text-2xl font-bold text-indigo-600">₹{(dashboardStats.revenue / 100000).toFixed(1)}L</div>
                  <div className="text-sm text-indigo-800">Revenue</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          {/* Render content based on active section */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              {/* Quick Analytics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Flight AI-203 departed on time</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">New booking: PNR ABCD123</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Flight 6E-425 delayed by 30 minutes</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full justify-start" variant="outline">
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Flight
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        View Bookings
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Recent Flights */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Flights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredFlights.slice(0, 3).map((flight) => (
                      <FlightCard 
                        key={flight.id} 
                        flight={flight} 
                        getStatusBadge={getStatusBadge}
                        onEdit={handleEditFlight}
                        onDelete={handleDeleteFlight}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Airline Management Sections */}
          {activeSection.includes("airlines") && (
            <AirlineManagement activeSection={activeSection} />
          )}

          {/* Flight Management Sections */}
          {(activeSection.includes("flights") && activeSection !== "overview") && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Flight Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search flights..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Flight Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={routeFilter} onValueChange={setRouteFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Route" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Routes</SelectItem>
                        <SelectItem value="DEL">Delhi (DEL)</SelectItem>
                        <SelectItem value="BOM">Mumbai (BOM)</SelectItem>
                        <SelectItem value="BLR">Bengaluru (BLR)</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Upload className="h-3 w-3" />
                        Import
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredFlights.map((flight) => (
                      <FlightCard 
                        key={flight.id} 
                        flight={flight} 
                        getStatusBadge={getStatusBadge}
                        onEdit={handleEditFlight}
                        onDelete={handleDeleteFlight}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Seat Management Sections */}
          {activeSection.includes("seats") && (
            <SeatManagement activeSection={activeSection} />
          )}

          {/* Pricing & Discounts Sections */}
          {(activeSection.includes("pricing") || activeSection.includes("discounts")) && (
            <OffersManagement />
          )}

          {/* Booking Management Sections */}
          {activeSection.includes("bookings") && (
            <BookingManagement flights={flights} />
          )}

          {/* Reports & Analytics Sections */}
          {activeSection.includes("reports") && (
            <AnalyticsDashboard flights={flights} />
          )}
        </div>
      </div>

      {/* Flight Form Modal */}
      {showFlightForm && (
        <FlightForm
          flight={editingFlight}
          onSave={handleSaveFlight}
          onClose={() => {
            setShowFlightForm(false)
            setEditingFlight(null)
          }}
        />
      )}
    </div>
  )
}

const FlightCard = ({ flight, getStatusBadge, onEdit, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <Plane className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{flight.flightNumber}</h3>
            <p className="text-sm text-gray-600">{flight.aircraft.type} • {flight.aircraft.capacity} seats</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(flight.status)}
          {getStatusBadge(flight.realTimeStatus)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Route */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Route</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">{flight.route.departure.airport} → {flight.route.arrival.airport}</div>
            <div className="text-gray-600">{flight.route.departure.city} to {flight.route.arrival.city}</div>
          </div>
        </div>

        {/* Schedule */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Schedule</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">{flight.schedule.departureTime} - {flight.schedule.arrivalTime}</div>
            <div className="text-gray-600">{flight.schedule.duration} • {flight.schedule.frequency}</div>
          </div>
        </div>

        {/* Pricing */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Pricing</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">₹{flight.pricing.economy.toLocaleString()}</div>
            <div className="text-gray-600">Economy base fare</div>
          </div>
        </div>

        {/* Bookings */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Bookings</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">{flight.bookings} / {flight.aircraft.capacity}</div>
            <div className="text-gray-600">{flight.occupancy}% occupancy</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          Last modified: {new Date(flight.lastModified).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(flight)}>
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDelete(flight.id)} className="text-red-600 hover:text-red-700">
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AirlineDashboard

