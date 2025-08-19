import * as React from "react"
import { 
  Building2,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  Edit,
  Ban,
  UserCheck,
  DollarSign,
  FileText,
  Phone,
  Mail,
  Globe,
  MapPin,
  Users,
  Plane,
  Download,
  Upload
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
    status: "Active",
    registrationDate: "2020-01-15",
    headquarters: "New Delhi, India",
    contact: {
      email: "admin@airindia.in",
      phone: "+91-11-2462-2220",
      website: "www.airindia.in"
    },
    compliance: {
      kyc: "Verified",
      insurance: "Active",
      license: "Valid",
      safety: "Grade A"
    },
    business: {
      fleet: 123,
      routes: 102,
      employees: 27000,
      monthlyRevenue: 45000000,
      commission: 2.5
    },
    documents: {
      license: "Valid until 2025-12-31",
      insurance: "Valid until 2024-06-30",
      registration: "Filed 2020-01-15"
    }
  },
  {
    id: "AL002",
    name: "SkyWings Express",
    code: "SW",
    iataCode: "SW",
    icaoCode: "SWE",
    logo: "🟦",
    status: "Pending",
    registrationDate: "2024-02-10",
    headquarters: "Mumbai, India",
    contact: {
      email: "info@skywings.com",
      phone: "+91-22-6789-1234",
      website: "www.skywings.com"
    },
    compliance: {
      kyc: "Under Review",
      insurance: "Pending",
      license: "Submitted",
      safety: "Pending"
    },
    business: {
      fleet: 8,
      routes: 12,
      employees: 450,
      monthlyRevenue: 2800000,
      commission: 3.0
    },
    documents: {
      license: "Under review",
      insurance: "Documents pending",
      registration: "Submitted 2024-02-10"
    }
  },
  {
    id: "AL003",
    name: "IndiGo",
    code: "6E",
    iataCode: "6E",
    icaoCode: "IGO",
    logo: "🔵",
    status: "Active",
    registrationDate: "2019-08-20",
    headquarters: "Gurgaon, India",
    contact: {
      email: "corporate@goindigo.in",
      phone: "+91-124-4973-838",
      website: "www.goindigo.in"
    },
    compliance: {
      kyc: "Verified",
      insurance: "Active",
      license: "Valid",
      safety: "Grade A+"
    },
    business: {
      fleet: 279,
      routes: 87,
      employees: 23000,
      monthlyRevenue: 78000000,
      commission: 2.0
    },
    documents: {
      license: "Valid until 2026-08-20",
      insurance: "Valid until 2024-12-31",
      registration: "Filed 2019-08-20"
    }
  },
  {
    id: "AL004",
    name: "Jet Airways Revival",
    code: "9W",
    iataCode: "9W",
    icaoCode: "JAI",
    logo: "🟡",
    status: "Suspended",
    registrationDate: "2021-03-12",
    headquarters: "Mumbai, India",
    contact: {
      email: "revival@jetairways.com",
      phone: "+91-22-1234-5678",
      website: "www.jetairways.com"
    },
    compliance: {
      kyc: "Expired",
      insurance: "Lapsed",
      license: "Suspended",
      safety: "Under Review"
    },
    business: {
      fleet: 0,
      routes: 0,
      employees: 120,
      monthlyRevenue: 0,
      commission: 0
    },
    documents: {
      license: "Suspended since 2023-06-15",
      insurance: "Lapsed 2023-05-01",
      registration: "Under legal review"
    }
  }
]

const AirlineManagement = ({ activeSection }) => {
  const [airlines, setAirlines] = React.useState(mockAirlines)
  const [filteredAirlines, setFilteredAirlines] = React.useState(mockAirlines)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [complianceFilter, setComplianceFilter] = React.useState("all")
  const [selectedAirline, setSelectedAirline] = React.useState(null)
  const [showDetails, setShowDetails] = React.useState(false)

  // Filter airlines
  React.useEffect(() => {
    let filtered = [...airlines]

    if (searchQuery) {
      filtered = filtered.filter(airline => 
        airline.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airline.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        airline.headquarters.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(airline => airline.status.toLowerCase() === statusFilter)
    }

    if (complianceFilter !== "all") {
      filtered = filtered.filter(airline => {
        const compliance = Object.values(airline.compliance)
        if (complianceFilter === "verified") return compliance.every(c => c === "Verified" || c === "Active" || c === "Valid" || c.includes("Grade"))
        if (complianceFilter === "pending") return compliance.some(c => c === "Pending" || c === "Under Review" || c === "Submitted")
        if (complianceFilter === "issues") return compliance.some(c => c === "Expired" || c === "Lapsed" || c === "Suspended")
        return true
      })
    }

    setFilteredAirlines(filtered)
  }, [airlines, searchQuery, statusFilter, complianceFilter])

  const getStatusBadge = (status) => {
    const statusConfig = {
      "Active": { color: "bg-green-100 text-green-800", icon: CheckCircle },
      "Pending": { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      "Suspended": { color: "bg-red-100 text-red-800", icon: XCircle },
      "Under Review": { color: "bg-blue-100 text-blue-800", icon: AlertTriangle }
    }
    
    const config = statusConfig[status] || statusConfig["Pending"]
    const Icon = config.icon
    
    return (
      <Badge className={cn("flex items-center gap-1", config.color)}>
        <Icon className="h-3 w-3" />
        {status}
      </Badge>
    )
  }

  const getComplianceBadge = (compliance) => {
    const allCompliant = Object.values(compliance).every(c => 
      c === "Verified" || c === "Active" || c === "Valid" || c.includes("Grade")
    )
    const hasPending = Object.values(compliance).some(c => 
      c === "Pending" || c === "Under Review" || c === "Submitted"
    )
    const hasIssues = Object.values(compliance).some(c => 
      c === "Expired" || c === "Lapsed" || c === "Suspended"
    )

    if (hasIssues) return <Badge className="bg-red-100 text-red-800">Non-Compliant</Badge>
    if (hasPending) return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    if (allCompliant) return <Badge className="bg-green-100 text-green-800">Compliant</Badge>
    return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
  }

  const handleApprove = (airlineId) => {
    setAirlines(airlines.map(a => 
      a.id === airlineId ? { ...a, status: "Active" } : a
    ))
  }

  const handleReject = (airlineId) => {
    if (window.confirm("Are you sure you want to reject this airline application?")) {
      setAirlines(airlines.filter(a => a.id !== airlineId))
    }
  }

  const handleSuspend = (airlineId) => {
    if (window.confirm("Are you sure you want to suspend this airline?")) {
      setAirlines(airlines.map(a => 
        a.id === airlineId ? { ...a, status: "Suspended" } : a
      ))
    }
  }

  const handleViewDetails = (airline) => {
    setSelectedAirline(airline)
    setShowDetails(true)
  }

  const renderContent = () => {
    switch (activeSection) {
      case "airlines-list":
        return <AirlinesList />
      case "airlines-pending":
        return <PendingAirlines />
      case "airlines-suspended":
        return <SuspendedAirlines />
      case "airlines-compliance":
        return <ComplianceOverview />
      case "airlines-commission":
        return <CommissionRules />
      default:
        return <AirlinesOverview />
    }
  }

  const AirlinesOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {airlines.filter(a => a.status === "Pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Suspended</p>
                <p className="text-2xl font-bold text-red-600">
                  {airlines.filter(a => a.status === "Suspended").length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <AirlinesList />
    </div>
  )

  const AirlinesList = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>All Airlines</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-1" />
              Import
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search airlines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
          <Select value={complianceFilter} onValueChange={setComplianceFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Compliance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Compliance</SelectItem>
              <SelectItem value="verified">Compliant</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="issues">Non-Compliant</SelectItem>
            </SelectContent>
          </Select>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Airline
          </Button>
        </div>

        <div className="space-y-4">
          {filteredAirlines.map((airline) => (
            <AirlineCard
              key={airline.id}
              airline={airline}
              getStatusBadge={getStatusBadge}
              getComplianceBadge={getComplianceBadge}
              onApprove={handleApprove}
              onReject={handleReject}
              onSuspend={handleSuspend}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const PendingAirlines = () => (
    <Card>
      <CardHeader>
        <CardTitle>Pending Airline Approvals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {airlines.filter(a => a.status === "Pending").map((airline) => (
            <AirlineCard
              key={airline.id}
              airline={airline}
              getStatusBadge={getStatusBadge}
              getComplianceBadge={getComplianceBadge}
              onApprove={handleApprove}
              onReject={handleReject}
              onSuspend={handleSuspend}
              onViewDetails={handleViewDetails}
              showApprovalActions={true}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const SuspendedAirlines = () => (
    <Card>
      <CardHeader>
        <CardTitle>Suspended Airlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {airlines.filter(a => a.status === "Suspended").map((airline) => (
            <AirlineCard
              key={airline.id}
              airline={airline}
              getStatusBadge={getStatusBadge}
              getComplianceBadge={getComplianceBadge}
              onApprove={handleApprove}
              onReject={handleReject}
              onSuspend={handleSuspend}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const ComplianceOverview = () => (
    <Card>
      <CardHeader>
        <CardTitle>Compliance Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Monitor airline compliance status and documentation.</p>
        <div className="space-y-4">
          {airlines.map((airline) => (
            <div key={airline.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{airline.logo}</span>
                  <div>
                    <h4 className="font-medium">{airline.name}</h4>
                    <p className="text-sm text-gray-600">{airline.code}</p>
                  </div>
                </div>
                {getComplianceBadge(airline.compliance)}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-xs text-gray-500">KYC Status</span>
                  <p className="text-sm font-medium">{airline.compliance.kyc}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Insurance</span>
                  <p className="text-sm font-medium">{airline.compliance.insurance}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">License</span>
                  <p className="text-sm font-medium">{airline.compliance.license}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500">Safety Rating</span>
                  <p className="text-sm font-medium">{airline.compliance.safety}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )

  const CommissionRules = () => (
    <Card>
      <CardHeader>
        <CardTitle>Commission Rules Management</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Configure commission rates and GDS fees for airlines.</p>
        <div className="space-y-4">
          {airlines.filter(a => a.status === "Active").map((airline) => (
            <div key={airline.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{airline.logo}</span>
                  <div>
                    <h4 className="font-medium">{airline.name}</h4>
                    <p className="text-sm text-gray-600">Monthly Revenue: ₹{(airline.business.monthlyRevenue / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Commission Rate</p>
                    <p className="text-lg font-bold text-green-600">{airline.business.commission}%</p>
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

  return <div className="space-y-6">{renderContent()}</div>
}

const AirlineCard = ({ 
  airline, 
  getStatusBadge, 
  getComplianceBadge, 
  onApprove, 
  onReject, 
  onSuspend, 
  onViewDetails,
  showApprovalActions = false 
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{airline.logo}</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{airline.name}</h3>
            <p className="text-sm text-gray-600">{airline.code} • {airline.iataCode} / {airline.icaoCode}</p>
            <div className="flex items-center gap-2 mt-1">
              {getStatusBadge(airline.status)}
              {getComplianceBadge(airline.compliance)}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Location</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">{airline.headquarters}</div>
            <div className="text-gray-600">Since {new Date(airline.registrationDate).getFullYear()}</div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Plane className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Operations</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">{airline.business.fleet} aircraft</div>
            <div className="text-gray-600">{airline.business.routes} routes</div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Team</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">{airline.business.employees.toLocaleString()} employees</div>
            <div className="text-gray-600">Commission: {airline.business.commission}%</div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Revenue</span>
          </div>
          <div className="text-sm">
            <div className="font-medium">₹{(airline.business.monthlyRevenue / 1000000).toFixed(1)}M/month</div>
            <div className="text-gray-600">{airline.contact.website}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-sm text-gray-500">
          Registered: {new Date(airline.registrationDate).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(airline)}>
            <Eye className="h-3 w-3 mr-1" />
            View Details
          </Button>
          
          {showApprovalActions && airline.status === "Pending" && (
            <>
              <Button size="sm" onClick={() => onApprove(airline.id)} className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-3 w-3 mr-1" />
                Approve
              </Button>
              <Button variant="outline" size="sm" onClick={() => onReject(airline.id)} className="text-red-600 hover:text-red-700">
                <XCircle className="h-3 w-3 mr-1" />
                Reject
              </Button>
            </>
          )}
          
          {airline.status === "Active" && (
            <Button variant="outline" size="sm" onClick={() => onSuspend(airline.id)} className="text-red-600 hover:text-red-700">
              <Ban className="h-3 w-3 mr-1" />
              Suspend
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AirlineManagement
