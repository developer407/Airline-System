import * as React from "react"
import { 
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  MapPin,
  Plane,
  User,
  CreditCard,
  Phone,
  Mail,
  MoreVertical,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader,
  Star,
  RefreshCw,
  Receipt,
  Eye
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

// Mock booking data
const mockBookings = [
  {
    id: "BK001",
    pnr: "ABCD123",
    type: "upcoming",
    status: "confirmed",
    airline: {
      name: "IndiGo",
      logo: "6E",
      code: "6E"
    },
    flight: {
      number: "6E 123",
      class: "Economy",
      duration: "2h 35m"
    },
    departure: {
      airport: "DEL",
      city: "New Delhi",
      terminal: "T3",
      date: "2024-02-15",
      time: "14:30"
    },
    arrival: {
      airport: "BLR",
      city: "Bengaluru",
      terminal: "T1",
      date: "2024-02-15",
      time: "17:05"
    },
    passengers: [
      { name: "John Doe", type: "Adult" },
      { name: "Jane Doe", type: "Adult" }
    ],
    payment: {
      total: 8540,
      method: "UPI",
      status: "paid"
    },
    bookingDate: "2024-01-20"
  },
  {
    id: "BK002",
    pnr: "EFGH456",
    type: "upcoming",
    status: "pending_payment",
    airline: {
      name: "Air India",
      logo: "AI",
      code: "AI"
    },
    flight: {
      number: "AI 202",
      class: "Business",
      duration: "2h 15m"
    },
    departure: {
      airport: "BOM",
      city: "Mumbai",
      terminal: "T2",
      date: "2024-02-20",
      time: "08:15"
    },
    arrival: {
      airport: "DEL",
      city: "New Delhi",
      terminal: "T3",
      date: "2024-02-20",
      time: "10:30"
    },
    passengers: [
      { name: "John Doe", type: "Adult" }
    ],
    payment: {
      total: 15200,
      method: "Credit Card",
      status: "pending"
    },
    bookingDate: "2024-02-01"
  },
  {
    id: "BK003",
    pnr: "IJKL789",
    type: "past",
    status: "completed",
    airline: {
      name: "SpiceJet",
      logo: "SG",
      code: "SG"
    },
    flight: {
      number: "SG 515",
      class: "Economy",
      duration: "1h 45m"
    },
    departure: {
      airport: "DEL",
      city: "New Delhi",
      terminal: "T1",
      date: "2024-01-10",
      time: "16:20"
    },
    arrival: {
      airport: "BOM",
      city: "Mumbai",
      terminal: "T1",
      date: "2024-01-10",
      time: "18:05"
    },
    passengers: [
      { name: "John Doe", type: "Adult" },
      { name: "Sarah Doe", type: "Child" }
    ],
    payment: {
      total: 6840,
      method: "Netbanking",
      status: "paid"
    },
    bookingDate: "2023-12-25"
  },
  {
    id: "BK004",
    pnr: "MNOP012",
    type: "past",
    status: "cancelled",
    airline: {
      name: "Vistara",
      logo: "UK",
      code: "UK"
    },
    flight: {
      number: "UK 955",
      class: "Premium Economy",
      duration: "2h 50m"
    },
    departure: {
      airport: "BLR",
      city: "Bengaluru",
      terminal: "T1",
      date: "2024-01-05",
      time: "12:45"
    },
    arrival: {
      airport: "CCU",
      city: "Kolkata",
      terminal: "T1",
      date: "2024-01-05",
      time: "15:35"
    },
    passengers: [
      { name: "John Doe", type: "Adult" }
    ],
    payment: {
      total: 12300,
      method: "Wallet",
      status: "refund_initiated"
    },
    bookingDate: "2023-12-20"
  }
]

const BookingHistory = () => {
  const navigate = useNavigate()
  const [bookings, setBookings] = React.useState(mockBookings)
  const [filteredBookings, setFilteredBookings] = React.useState(mockBookings)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [airlineFilter, setAirlineFilter] = React.useState("all")
  const [dateFilter, setDateFilter] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("newest")
  const [activeTab, setActiveTab] = React.useState("all")

  // Filter and sort logic
  React.useEffect(() => {
    let filtered = [...bookings]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(booking => 
        booking.pnr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.airline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.departure.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.arrival.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Tab filter
    if (activeTab !== "all") {
      if (activeTab === "upcoming") {
        filtered = filtered.filter(booking => booking.type === "upcoming")
      } else if (activeTab === "past") {
        filtered = filtered.filter(booking => booking.type === "past")
      } else if (activeTab === "cancelled") {
        filtered = filtered.filter(booking => booking.status === "cancelled")
      }
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.status === statusFilter)
    }

    // Airline filter
    if (airlineFilter !== "all") {
      filtered = filtered.filter(booking => booking.airline.code === airlineFilter)
    }

    // Date filter
    if (dateFilter !== "all") {
      const now = new Date()
      const filterDate = new Date()
      
      switch (dateFilter) {
        case "30days":
          filterDate.setDate(now.getDate() - 30)
          break
        case "3months":
          filterDate.setMonth(now.getMonth() - 3)
          break
        case "1year":
          filterDate.setFullYear(now.getFullYear() - 1)
          break
      }
      
      if (dateFilter !== "all") {
        filtered = filtered.filter(booking => 
          new Date(booking.bookingDate) >= filterDate
        )
      }
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.bookingDate) - new Date(a.bookingDate)
        case "oldest":
          return new Date(a.bookingDate) - new Date(b.bookingDate)
        case "price_low":
          return a.payment.total - b.payment.total
        case "price_high":
          return b.payment.total - a.payment.total
        default:
          return 0
      }
    })

    setFilteredBookings(filtered)
  }, [bookings, searchQuery, statusFilter, airlineFilter, dateFilter, sortBy, activeTab])

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { label: "Confirmed", variant: "default", icon: CheckCircle, color: "bg-green-100 text-green-800" },
      pending_payment: { label: "Pending Payment", variant: "secondary", icon: AlertCircle, color: "bg-yellow-100 text-yellow-800" },
      cancelled: { label: "Cancelled", variant: "destructive", icon: XCircle, color: "bg-red-100 text-red-800" },
      completed: { label: "Completed", variant: "default", icon: CheckCircle, color: "bg-blue-100 text-blue-800" },
      refund_initiated: { label: "Refund Initiated", variant: "secondary", icon: Loader, color: "bg-purple-100 text-purple-800" }
    }
    
    const config = statusConfig[status] || statusConfig.confirmed
    const Icon = config.icon
    
    return (
      <Badge className={cn("flex items-center gap-1", config.color)}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  const getAirlineLogo = (code) => {
    const logos = {
      "6E": "🔵", // IndiGo
      "AI": "🔴", // Air India
      "SG": "🟡", // SpiceJet
      "UK": "🟣", // Vistara
      "G8": "🟠", // GoAir
      "I5": "🟢"  // AirAsia
    }
    return logos[code] || "✈️"
  }

  const uniqueAirlines = [...new Set(bookings.map(b => b.airline.code))]
    .map(code => bookings.find(b => b.airline.code === code)?.airline)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">My Bookings</h1>
                <p className="text-muted-foreground">Manage your flight bookings and travel history</p>
              </div>
              <Button className="flex items-center gap-2">
                <Plane className="h-4 w-4" />
                Book New Flight
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-muted rounded-lg p-1 w-fit">
              {[
                { id: "all", label: "All Bookings" },
                { id: "upcoming", label: "Upcoming" },
                { id: "past", label: "Past" },
                { id: "cancelled", label: "Cancelled" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-all",
                    activeTab === tab.id
                      ? "bg-background text-primary shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <Label htmlFor="search">Search Bookings</Label>
                  <div className="relative mt-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="PNR, airline, destination..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <Label>Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending_payment">Pending Payment</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="refund_initiated">Refund Initiated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Airline Filter */}
                <div>
                  <Label>Airline</Label>
                  <Select value={airlineFilter} onValueChange={setAirlineFilter}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Airlines</SelectItem>
                      {uniqueAirlines.map((airline) => (
                        <SelectItem key={airline.code} value={airline.code}>
                          {airline.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date Range Filter */}
                <div>
                  <Label>Date Range</Label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="3months">Last 3 Months</SelectItem>
                      <SelectItem value="1year">Last 1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Options */}
                <div>
                  <Label>Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="price_low">Price: Low to High</SelectItem>
                      <SelectItem value="price_high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filteredBookings.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No bookings found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
                  </CardContent>
                </Card>
              ) : (
                filteredBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} getStatusBadge={getStatusBadge} getAirlineLogo={getAirlineLogo} navigate={navigate} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const BookingCard = ({ booking, getStatusBadge, getAirlineLogo, navigate }) => {
  const [showDetails, setShowDetails] = React.useState(false)

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }

  const getActionButtons = (booking) => {
    const buttons = []
    
    if (booking.status === "confirmed" && booking.type === "upcoming") {
      buttons.push(
        <Button 
          key="view" 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => navigate(`/ticket/${booking.pnr}`)}
        >
          <Eye className="h-3 w-3" />
          View Ticket
        </Button>,
        <Button key="download" variant="outline" size="sm" className="flex items-center gap-1">
          <Download className="h-3 w-3" />
          Download
        </Button>
      )
    }
    
    if (booking.status === "pending_payment") {
      buttons.push(
        <Button key="pay" size="sm" className="flex items-center gap-1">
          <CreditCard className="h-3 w-3" />
          Complete Payment
        </Button>
      )
    }
    
    if (booking.type === "past" && booking.status === "completed") {
      buttons.push(
        <Button 
          key="view" 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => navigate(`/ticket/${booking.pnr}`)}
        >
          <Eye className="h-3 w-3" />
          View Ticket
        </Button>,
        <Button key="invoice" variant="outline" size="sm" className="flex items-center gap-1">
          <Receipt className="h-3 w-3" />
          Invoice
        </Button>,
        <Button key="rebook" variant="outline" size="sm" className="flex items-center gap-1">
          <RefreshCw className="h-3 w-3" />
          Rebook
        </Button>,
        <Button key="rate" variant="outline" size="sm" className="flex items-center gap-1">
          <Star className="h-3 w-3" />
          Rate
        </Button>
      )
    }

    return buttons
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Header Row */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{getAirlineLogo(booking.airline.code)}</div>
              <div>
                <h3 className="font-semibold text-foreground">{booking.airline.name}</h3>
                <p className="text-sm text-muted-foreground">{booking.flight.number} • {booking.flight.class}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(booking.status)}
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Flight Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Departure */}
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold text-foreground">{formatTime(booking.departure.time)}</div>
              <div className="text-sm font-medium text-gray-700">{booking.departure.airport}</div>
              <div className="text-xs text-muted-foreground">{booking.departure.city}</div>
              <div className="text-xs text-muted-foreground">Terminal {booking.departure.terminal}</div>
            </div>

            {/* Duration & Route */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="w-3 h-3 border-2 border-gray-400 rounded-full"></div>
                <div className="flex-1 h-px bg-gray-300 relative">
                  <Plane className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              </div>
              <div className="text-sm text-muted-foreground">{booking.flight.duration}</div>
              <div className="text-xs text-muted-foreground">{formatDate(booking.departure.date)}</div>
            </div>

            {/* Arrival */}
            <div className="text-center md:text-right">
              <div className="text-2xl font-bold text-foreground">{formatTime(booking.arrival.time)}</div>
              <div className="text-sm font-medium text-gray-700">{booking.arrival.airport}</div>
              <div className="text-xs text-muted-foreground">{booking.arrival.city}</div>
              <div className="text-xs text-muted-foreground">Terminal {booking.arrival.terminal}</div>
            </div>
          </div>

          {/* Booking Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">PNR</div>
              <div className="font-medium">{booking.pnr}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Passengers</div>
              <div className="font-medium">{booking.passengers[0].name}</div>
              {booking.passengers.length > 1 && (
                <div className="text-xs text-muted-foreground">+{booking.passengers.length - 1} more</div>
              )}
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Total Fare</div>
              <div className="font-medium">₹{booking.payment.total.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">{booking.payment.method}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Booked On</div>
              <div className="font-medium">{formatDate(booking.bookingDate)}</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
            {getActionButtons(booking)}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowDetails(!showDetails)}
              className="ml-auto"
            >
              {showDetails ? "Hide" : "Show"} Details
              <ArrowRight className={cn("h-3 w-3 ml-1 transition-transform", showDetails && "rotate-90")} />
            </Button>
          </div>

          {/* Expandable Details */}
          {showDetails && (
            <div className="pt-4 border-t border-gray-100 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-foreground mb-2">Passenger Details</h4>
                  <div className="space-y-2">
                    {booking.passengers.map((passenger, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{passenger.name}</span>
                        <span className="text-muted-foreground">{passenger.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Payment Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Payment Method:</span>
                      <span>{booking.payment.method}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Status:</span>
                      <span className={cn(
                        "capitalize",
                        booking.payment.status === "paid" ? "text-green-600" : "text-yellow-600"
                      )}>
                        {booking.payment.status.replace("_", " ")}
                      </span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Amount:</span>
                      <span>₹{booking.payment.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>Need help with this booking?</span>
                  <Button variant="link" size="sm" className="p-0 h-auto">
                    Contact Support
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default BookingHistory
