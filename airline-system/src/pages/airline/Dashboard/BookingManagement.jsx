import * as React from "react"
import { 
  Search,
  Filter,
  Users,
  Phone,
  Mail,
  Calendar,
  MapPin,
  CreditCard,
  Download,
  Eye,
  Edit,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  MoreVertical,
  User,
  Plane
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Mock booking data
const mockBookings = [
  {
    id: "BK001",
    pnr: "ABCD123",
    flightNumber: "AI-203",
    route: "DEL → BOM",
    date: "2024-02-15",
    time: "08:30",
    passenger: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+91 98765 43210",
      count: 2
    },
    booking: {
      class: "Economy",
      fare: 9180,
      status: "Confirmed",
      paymentStatus: "Paid",
      paymentMethod: "UPI",
      bookingDate: "2024-01-20",
      seats: ["12A", "12B"]
    },
    services: {
      meal: "Vegetarian",
      baggage: "15 kg",
      insurance: true
    }
  },
  {
    id: "BK002", 
    pnr: "EFGH456",
    flightNumber: "6E-425",
    route: "BLR → DEL",
    date: "2024-02-15",
    time: "14:20",
    passenger: {
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+91 87654 32109",
      count: 1
    },
    booking: {
      class: "Economy",
      fare: 5980,
      status: "Pending",
      paymentStatus: "Pending",
      paymentMethod: "Credit Card",
      bookingDate: "2024-02-01",
      seats: ["8F"]
    },
    services: {
      meal: "Non-Vegetarian",
      baggage: "15 kg",
      insurance: false
    }
  },
  {
    id: "BK003",
    pnr: "IJKL789", 
    flightNumber: "UK-955",
    route: "BOM → BLR",
    date: "2024-02-15",
    time: "19:45",
    passenger: {
      name: "Mike Johnson",
      email: "mike.j@email.com",
      phone: "+91 76543 21098",
      count: 3
    },
    booking: {
      class: "Business",
      fare: 28500,
      status: "Cancelled",
      paymentStatus: "Refunded",
      paymentMethod: "Netbanking",
      bookingDate: "2024-01-15",
      seats: ["2A", "2B", "2C"]
    },
    services: {
      meal: "Jain",
      baggage: "25 kg",
      insurance: true
    }
  },
  {
    id: "BK004",
    pnr: "MNOP012",
    flightNumber: "AI-203",
    route: "DEL → BOM", 
    date: "2024-02-16",
    time: "08:30",
    passenger: {
      name: "Sarah Williams",
      email: "sarah.w@email.com",
      phone: "+91 65432 10987",
      count: 1
    },
    booking: {
      class: "Economy",
      fare: 4590,
      status: "Confirmed",
      paymentStatus: "Paid",
      paymentMethod: "Wallet",
      bookingDate: "2024-02-05",
      seats: ["15C"]
    },
    services: {
      meal: "Vegan",
      baggage: "15 kg",
      insurance: false
    }
  }
]

const BookingManagement = ({ flights }) => {
  const [bookings, setBookings] = React.useState(mockBookings)
  const [filteredBookings, setFilteredBookings] = React.useState(mockBookings)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [flightFilter, setFlightFilter] = React.useState("all")
  const [dateFilter, setDateFilter] = React.useState("all")
  const [selectedBooking, setSelectedBooking] = React.useState(null)
  const [showBookingDetails, setShowBookingDetails] = React.useState(false)

  // Filter bookings
  React.useEffect(() => {
    let filtered = [...bookings]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(booking => 
        booking.pnr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.passenger.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.passenger.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.flightNumber.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(booking => booking.booking.status.toLowerCase() === statusFilter)
    }

    // Flight filter
    if (flightFilter !== "all") {
      filtered = filtered.filter(booking => booking.flightNumber === flightFilter)
    }

    setFilteredBookings(filtered)
  }, [bookings, searchQuery, statusFilter, flightFilter, dateFilter])

  const getStatusBadge = (status) => {
    const statusConfig = {
      "Confirmed": { color: "bg-green-100 text-green-800", icon: CheckCircle },
      "Pending": { color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
      "Cancelled": { color: "bg-red-100 text-red-800", icon: XCircle },
      "Refunded": { color: "bg-purple-100 text-purple-800", icon: RefreshCw }
    }
    
    const config = statusConfig[status] || statusConfig["Confirmed"]
    const Icon = config.icon
    
    return (
      <Badge className={cn("flex items-center gap-1", config.color)}>
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    )
  }

  const getPaymentStatusBadge = (status) => {
    const statusConfig = {
      "Paid": { color: "bg-green-100 text-green-800" },
      "Pending": { color: "bg-yellow-100 text-yellow-800" },
      "Failed": { color: "bg-red-100 text-red-800" },
      "Refunded": { color: "bg-blue-100 text-blue-800" }
    }
    
    const config = statusConfig[status] || statusConfig["Paid"]
    
    return (
      <Badge className={config.color}>
        {status}
      </Badge>
    )
  }

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking)
    setShowBookingDetails(true)
  }

  const handleModifyBooking = (bookingId) => {
    // In real app, this would open a booking modification form
    console.log("Modify booking:", bookingId)
    alert("Booking modification form would open here")
  }

  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setBookings(bookings.map(b => 
        b.id === bookingId 
          ? { ...b, booking: { ...b.booking, status: "Cancelled", paymentStatus: "Refunded" }}
          : b
      ))
    }
  }

  const bookingStats = {
    total: bookings.length,
    confirmed: bookings.filter(b => b.booking.status === "Confirmed").length,
    pending: bookings.filter(b => b.booking.status === "Pending").length,
    cancelled: bookings.filter(b => b.booking.status === "Cancelled").length,
    totalRevenue: bookings
      .filter(b => b.booking.paymentStatus === "Paid")
      .reduce((sum, b) => sum + b.booking.fare, 0)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Booking Management</h2>
          <p className="text-gray-600">Manage passenger bookings and reservations</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{bookingStats.total}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-green-600">{bookingStats.confirmed}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{bookingStats.pending}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-purple-600">₹{(bookingStats.totalRevenue / 100000).toFixed(1)}L</p>
              </div>
              <CreditCard className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by PNR, passenger, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Booking Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={flightFilter} onValueChange={setFlightFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Flight" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Flights</SelectItem>
                {[...new Set(bookings.map(b => b.flightNumber))].map(flight => (
                  <SelectItem key={flight} value={flight}>{flight}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                getStatusBadge={getStatusBadge}
                getPaymentStatusBadge={getPaymentStatusBadge}
                onView={handleViewBooking}
                onModify={handleModifyBooking}
                onCancel={handleCancelBooking}
              />
            ))}
            
            {filteredBookings.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-600">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Booking Details Modal */}
      {showBookingDetails && selectedBooking && (
        <BookingDetailsModal
          booking={selectedBooking}
          onClose={() => setShowBookingDetails(false)}
          getStatusBadge={getStatusBadge}
          getPaymentStatusBadge={getPaymentStatusBadge}
        />
      )}
    </div>
  )
}

const BookingCard = ({ booking, getStatusBadge, getPaymentStatusBadge, onView, onModify, onCancel }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="bg-muted p-3 rounded-lg">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{booking.passenger.name}</h3>
            <p className="text-sm text-muted-foreground">PNR: {booking.pnr} • {booking.passenger.count} passenger{booking.passenger.count > 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(booking.booking.status)}
          {getPaymentStatusBadge(booking.booking.paymentStatus)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Flight Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Plane className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Flight</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">{booking.flightNumber}</div>
            <div className="text-muted-foreground">{booking.route}</div>
          </div>
        </div>

        {/* Schedule */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Schedule</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">{new Date(booking.date).toLocaleDateString()}</div>
            <div className="text-muted-foreground">{booking.time}</div>
          </div>
        </div>

        {/* Contact */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Contact</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">{booking.passenger.email}</div>
            <div className="text-gray-600">{booking.passenger.phone}</div>
          </div>
        </div>

        {/* Fare */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Fare</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">₹{booking.booking.fare.toLocaleString()}</div>
            <div className="text-gray-600">{booking.booking.class}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          Booked: {new Date(booking.booking.bookingDate).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onView(booking)}>
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button variant="outline" size="sm" onClick={() => onModify(booking.id)}>
            <Edit className="h-3 w-3 mr-1" />
            Modify
          </Button>
          {booking.booking.status !== "Cancelled" && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onCancel(booking.id)}
              className="text-red-600 hover:text-red-700"
            >
              <XCircle className="h-3 w-3 mr-1" />
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

const BookingDetailsModal = ({ booking, onClose, getStatusBadge, getPaymentStatusBadge }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
              <p className="text-gray-600">PNR: {booking.pnr}</p>
            </div>
            <Button variant="ghost" onClick={onClose}>
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex items-center gap-4">
            {getStatusBadge(booking.booking.status)}
            {getPaymentStatusBadge(booking.booking.paymentStatus)}
          </div>

          {/* Flight Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-blue-600" />
                Flight Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-600">Flight Number</Label>
                <p className="font-medium">{booking.flightNumber}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Route</Label>
                <p className="font-medium">{booking.route}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Date</Label>
                <p className="font-medium">{new Date(booking.date).toLocaleDateString()}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Time</Label>
                <p className="font-medium">{booking.time}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Class</Label>
                <p className="font-medium">{booking.booking.class}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Seats</Label>
                <p className="font-medium">{booking.booking.seats.join(", ")}</p>
              </div>
            </CardContent>
          </Card>

          {/* Passenger Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-green-600" />
                Passenger Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-gray-600">Name</Label>
                <p className="font-medium">{booking.passenger.name}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Email</Label>
                <p className="font-medium">{booking.passenger.email}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Phone</Label>
                <p className="font-medium">{booking.passenger.phone}</p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Passenger Count</Label>
                <p className="font-medium">{booking.passenger.count}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment & Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm text-gray-600">Total Fare</Label>
                  <p className="font-medium text-lg">₹{booking.booking.fare.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Payment Method</Label>
                  <p className="font-medium">{booking.booking.paymentMethod}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Booking Date</Label>
                  <p className="font-medium">{new Date(booking.booking.bookingDate).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-sm text-gray-600">Meal Preference</Label>
                  <p className="font-medium">{booking.services.meal}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Baggage</Label>
                  <p className="font-medium">{booking.services.baggage}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Travel Insurance</Label>
                  <p className="font-medium">{booking.services.insurance ? "Yes" : "No"}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

const Label = ({ className, children, ...props }) => (
  <label className={cn("text-sm font-medium", className)} {...props}>
    {children}
  </label>
)

export default BookingManagement

