import * as React from "react"
import { 
  Crown,
  Building2,
  MapPin,
  Plane,
  Users,
  DollarSign,
  BarChart3,
  Settings,
  Bell,
  Lock,
  Plus,
  Search,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  Globe,
  Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import SuperAdminSidebar from "../Sidebar/SuperAdminSidebar"
import AirlineManagement from "./AirlineManagement"
import AirportManagement from "./AirportManagement"
import FlightInventory from "./FlightInventory"
import BookingManagement from "./BookingManagement"
import UserManagement from "./UserManagement"
import FinancialManagement from "./FinancialManagement"
import ReportsAnalytics from "./ReportsAnalytics"
import SystemConfiguration from "./SystemConfiguration"
import NotificationsManagement from "./NotificationsManagement"
import SecurityCompliance from "./SecurityCompliance"

const SuperAdminDashboard = () => {
  // Sidebar and navigation state
  const [activeSection, setActiveSection] = React.useState("overview")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)

  // Handle sidebar section changes
  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId)
  }

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  // Platform-wide statistics
  const platformStats = {
    totalAirlines: 24,
    activeAirlines: 21,
    totalAirports: 156,
    totalFlights: 1247,
    activeFlights: 89,
    totalBookings: 15643,
    totalUsers: 45678,
    totalAgents: 234,
    systemRevenue: 12450000,
    commissionRevenue: 890000,
    pendingApprovals: 8,
    securityAlerts: 3,
    systemUptime: 99.97
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <SuperAdminSidebar
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
        <div className="bg-background border-b border-border sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Crown className="h-6 w-6 text-primary" />
                  {activeSection === "overview" ? "Platform Overview" :
                   activeSection.includes("airlines") ? "Airline Management" :
                   activeSection.includes("airports") ? "Airport & City Management" :
                   activeSection.includes("flights") ? "Flight Inventory Management" :
                   activeSection.includes("bookings") ? "Booking & Ticket Management" :
                   activeSection.includes("users") ? "User & Agent Management" :
                   activeSection.includes("financial") ? "Financial Management" :
                   activeSection.includes("reports") ? "Reports & Analytics" :
                   activeSection.includes("system") ? "System Configuration" :
                   activeSection.includes("notifications") ? "Notifications & Communication" :
                   activeSection.includes("security") ? "Security & Compliance" :
                   "Super Admin Dashboard"}
                </h1>
                <p className="text-muted-foreground">
                  {activeSection === "overview" ? "Complete platform oversight and management" :
                   activeSection.includes("airlines") ? "Manage airline registrations, compliance, and operations" :
                   activeSection.includes("airports") ? "Maintain airport data, codes, and infrastructure" :
                   activeSection.includes("flights") ? "Monitor and oversee all flight operations across airlines" :
                   activeSection.includes("bookings") ? "System-wide booking management and dispute resolution" :
                   activeSection.includes("users") ? "Manage customers, agents, and platform policies" :
                   activeSection.includes("financial") ? "Revenue management, commissions, and payment oversight" :
                   activeSection.includes("reports") ? "Platform analytics and performance insights" :
                   activeSection.includes("system") ? "Global settings and platform configuration" :
                   activeSection.includes("notifications") ? "System communications and alerts management" :
                   activeSection.includes("security") ? "Platform security, compliance, and audit management" :
                   "Comprehensive platform management and oversight"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <Button variant="outline" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  System Alerts
                  <Badge className="ml-1 bg-red-100 text-red-800">{platformStats.securityAlerts}</Badge>
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Pending Approvals
                  <Badge className="ml-1 bg-yellow-100 text-yellow-800">{platformStats.pendingApprovals}</Badge>
                </Button>
                <Button className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Admin Actions
                </Button>
              </div>
            </div>

            {/* Platform KPIs - Show on overview */}
            {activeSection === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-6">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{platformStats.totalAirlines}</div>
                      <div className="text-sm text-purple-800">Total Airlines</div>
                    </div>
                    <Building2 className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">+2 this month</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{platformStats.totalFlights}</div>
                      <div className="text-sm text-blue-800">Active Flights</div>
                    </div>
                    <Plane className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <Activity className="h-3 w-3 text-blue-500 mr-1" />
                    <span className="text-xs text-blue-600">{platformStats.activeFlights} live now</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{(platformStats.totalBookings / 1000).toFixed(1)}K</div>
                      <div className="text-sm text-green-800">Total Bookings</div>
                    </div>
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">+12% this week</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-orange-600">₹{(platformStats.systemRevenue / 1000000).toFixed(1)}M</div>
                      <div className="text-sm text-orange-800">System Revenue</div>
                    </div>
                    <DollarSign className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">+18% vs last month</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-xl border border-indigo-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-indigo-600">{platformStats.systemUptime}%</div>
                      <div className="text-sm text-indigo-800">System Uptime</div>
                    </div>
                    <Activity className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                    <span className="text-xs text-green-600">All systems operational</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl border border-red-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-red-600">{platformStats.securityAlerts}</div>
                      <div className="text-sm text-red-800">Security Alerts</div>
                    </div>
                    <Shield className="h-8 w-8 text-red-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <AlertTriangle className="h-3 w-3 text-yellow-500 mr-1" />
                    <span className="text-xs text-yellow-600">Requires attention</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <ScrollArea className="flex-1 p-6">
          {/* Platform Overview */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              {/* Quick Actions and Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-blue-600" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full justify-start" variant="outline">
                        <Building2 className="h-4 w-4 mr-2" />
                        Review Pending Airlines ({platformStats.pendingApprovals})
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Security Alerts ({platformStats.securityAlerts})
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Generate Platform Report
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        System Configuration
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-green-600" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">New airline "SkyWings" registered</span>
                        <span className="text-xs text-gray-500 ml-auto">2h ago</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">15 new airports added to system</span>
                        <span className="text-xs text-gray-500 ml-auto">4h ago</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Security alert: Suspicious activity detected</span>
                        <span className="text-xs text-gray-500 ml-auto">6h ago</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">System backup completed successfully</span>
                        <span className="text-xs text-gray-500 ml-auto">8h ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Platform Health Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-green-600" />
                    Platform Health Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">System Performance</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">API Response Time</span>
                          <span className="text-sm font-medium text-green-600">45ms</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Database Load</span>
                          <span className="text-sm font-medium text-green-600">23%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "23%" }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Security Status</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Firewall Active</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">SSL Certificates Valid</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">{platformStats.securityAlerts} Security Alerts</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Backup Systems Active</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Business Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Active Airlines</span>
                          <span className="text-sm font-medium">{platformStats.activeAirlines}/{platformStats.totalAirlines}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Live Flights</span>
                          <span className="text-sm font-medium text-blue-600">{platformStats.activeFlights}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Today's Bookings</span>
                          <span className="text-sm font-medium text-green-600">+2,341</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Revenue Today</span>
                          <span className="text-sm font-medium text-green-600">₹8.4L</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Section-based Content Rendering */}
          {activeSection.includes("airlines") && (
            <AirlineManagement activeSection={activeSection} />
          )}

          {activeSection.includes("airports") && (
            <AirportManagement activeSection={activeSection} />
          )}

          {activeSection.includes("flights") && (
            <FlightInventory activeSection={activeSection} />
          )}

          {activeSection.includes("bookings") && (
            <BookingManagement activeSection={activeSection} />
          )}

          {activeSection.includes("users") && (
            <UserManagement activeSection={activeSection} />
          )}

          {activeSection.includes("financial") && (
            <FinancialManagement activeSection={activeSection} />
          )}

          {activeSection.includes("reports") && (
            <ReportsAnalytics activeSection={activeSection} />
          )}

          {activeSection.includes("system") && (
            <SystemConfiguration activeSection={activeSection} />
          )}

          {activeSection.includes("notifications") && (
            <NotificationsManagement activeSection={activeSection} />
          )}

          {activeSection.includes("security") && (
            <SecurityCompliance activeSection={activeSection} />
          )}
        </ScrollArea>
      </div>
    </div>
  )
}

export default SuperAdminDashboard
