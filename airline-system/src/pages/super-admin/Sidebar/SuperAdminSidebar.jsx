import * as React from "react"
import { 
  Shield,
  Building2,
  MapPin,
  Plane,
  Users,
  UserCheck,
  DollarSign,
  BarChart3,
  Settings,
  Bell,
  Lock,
  ChevronDown,
  ChevronRight,
  Home,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Target,
  CreditCard,
  Gift,
  Clock,
  Menu,
  X,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  TrendingUp,
  PieChart,
  Globe,
  Mail,
  Smartphone,
  Key,
  Database,
  Activity,
  Zap,
  Crown,
  Briefcase
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const SuperAdminSidebar = ({ activeSection, onSectionChange, isCollapsed, onToggleCollapse }) => {
  const [expandedSections, setExpandedSections] = React.useState({
    airlines: true,
    airports: false,
    flights: false,
    bookings: false,
    users: false,
    financial: false,
    reports: true,
    system: false,
    notifications: false,
    security: false
  })

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const sidebarSections = [
    {
      id: "overview",
      title: "Platform Overview",
      icon: Crown,
      color: "from-purple-500 to-purple-600",
      items: [
        { id: "overview", label: "Dashboard", icon: BarChart3, count: null }
      ]
    },
    {
      id: "airlines",
      title: "Airline Management",
      icon: Building2,
      color: "from-blue-500 to-blue-600",
      items: [
        { id: "airlines-list", label: "All Airlines", icon: Building2, count: 24 },
        { id: "airlines-pending", label: "Pending Approval", icon: Clock, count: 3 },
        { id: "airlines-suspended", label: "Suspended", icon: XCircle, count: 2 },
        { id: "airlines-compliance", label: "Compliance", icon: CheckCircle, count: 8 },
        { id: "airlines-commission", label: "Commission Rules", icon: DollarSign, count: null }
      ]
    },
    {
      id: "airports",
      title: "Airport & City Management",
      icon: MapPin,
      color: "from-green-500 to-emerald-500",
      items: [
        { id: "airports-list", label: "All Airports", icon: MapPin, count: 156 },
        { id: "cities-list", label: "Cities", icon: Globe, count: 89 },
        { id: "airports-codes", label: "IATA/ICAO Codes", icon: Target, count: null },
        { id: "airports-terminals", label: "Terminals & Gates", icon: Building2, count: 342 },
        { id: "airports-timezones", label: "Time Zones", icon: Clock, count: null }
      ]
    },
    {
      id: "flights",
      title: "Flight Inventory",
      icon: Plane,
      color: "from-cyan-500 to-blue-500",
      items: [
        { id: "flights-all", label: "All Flights", icon: Plane, count: 1247 },
        { id: "flights-monitoring", label: "Live Monitoring", icon: Activity, count: 89 },
        { id: "flights-delays", label: "Delays & Issues", icon: AlertTriangle, count: 15 },
        { id: "flights-override", label: "Schedule Override", icon: Edit, count: null },
        { id: "flights-availability", label: "Availability", icon: Eye, count: null }
      ]
    },
    {
      id: "bookings",
      title: "Booking & Tickets",
      icon: Users,
      color: "from-orange-500 to-red-500",
      items: [
        { id: "bookings-all", label: "All Bookings", icon: Users, count: 15643 },
        { id: "bookings-disputes", label: "Disputes", icon: AlertTriangle, count: 23 },
        { id: "bookings-refunds", label: "Refunds", icon: CreditCard, count: 45 },
        { id: "bookings-fraud", label: "Fraud Detection", icon: Shield, count: 7 },
        { id: "bookings-logs", label: "System Logs", icon: FileText, count: null }
      ]
    },
    {
      id: "users",
      title: "User & Agent Management",
      icon: UserCheck,
      color: "from-indigo-500 to-purple-500",
      items: [
        { id: "users-customers", label: "Customers", icon: Users, count: 45678 },
        { id: "users-agents", label: "Travel Agents", icon: Briefcase, count: 234 },
        { id: "users-agencies", label: "Agencies", icon: Building2, count: 67 },
        { id: "users-suspended", label: "Suspended Users", icon: XCircle, count: 89 },
        { id: "users-policies", label: "Global Policies", icon: FileText, count: 12 }
      ]
    },
    {
      id: "financial",
      title: "Financial Management",
      icon: DollarSign,
      color: "from-green-500 to-green-600",
      items: [
        { id: "financial-fees", label: "Service Fees", icon: DollarSign, count: null },
        { id: "financial-commissions", label: "Commissions", icon: TrendingUp, count: null },
        { id: "financial-transactions", label: "Transactions", icon: CreditCard, count: 8934 },
        { id: "financial-payouts", label: "Payouts", icon: Gift, count: 156 },
        { id: "financial-gateways", label: "Payment Gateways", icon: Zap, count: 8 },
        { id: "financial-chargebacks", label: "Chargebacks", icon: AlertTriangle, count: 12 }
      ]
    },
    {
      id: "reports",
      title: "Reports & Analytics",
      icon: BarChart3,
      color: "from-pink-500 to-rose-500",
      items: [
        { id: "reports-airlines", label: "Airline Performance", icon: Building2, count: null },
        { id: "reports-airports", label: "Airport Analytics", icon: MapPin, count: null },
        { id: "reports-customers", label: "Customer Insights", icon: Users, count: null },
        { id: "reports-fraud", label: "Fraud Monitoring", icon: Shield, count: null },
        { id: "reports-revenue", label: "Revenue Reports", icon: DollarSign, count: null },
        { id: "reports-custom", label: "Custom Reports", icon: FileText, count: 15 }
      ]
    },
    {
      id: "system",
      title: "System Configuration",
      icon: Settings,
      color: "from-gray-500 to-slate-500",
      items: [
        { id: "system-global", label: "Global Settings", icon: Settings, count: null },
        { id: "system-currencies", label: "Currencies", icon: DollarSign, count: 12 },
        { id: "system-languages", label: "Languages", icon: Globe, count: 8 },
        { id: "system-loyalty", label: "Loyalty Programs", icon: Gift, count: 3 },
        { id: "system-api", label: "API Access", icon: Key, count: 45 },
        { id: "system-integrations", label: "OTA Integrations", icon: Zap, count: 12 }
      ]
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      color: "from-yellow-500 to-orange-500",
      items: [
        { id: "notifications-system", label: "System Alerts", icon: Bell, count: 8 },
        { id: "notifications-airlines", label: "To Airlines", icon: Building2, count: null },
        { id: "notifications-agents", label: "To Agents", icon: UserCheck, count: null },
        { id: "notifications-email", label: "Email Campaigns", icon: Mail, count: 23 },
        { id: "notifications-sms", label: "SMS Alerts", icon: Smartphone, count: 156 },
        { id: "notifications-marketing", label: "Marketing", icon: TrendingUp, count: 7 }
      ]
    },
    {
      id: "security",
      title: "Security & Compliance",
      icon: Lock,
      color: "from-red-500 to-red-600",
      items: [
        { id: "security-rbac", label: "Role Management", icon: Shield, count: 15 },
        { id: "security-kyc", label: "KYC Compliance", icon: CheckCircle, count: 234 },
        { id: "security-gdpr", label: "GDPR Compliance", icon: Lock, count: null },
        { id: "security-pci", label: "PCI Compliance", icon: CreditCard, count: null },
        { id: "security-audit", label: "Audit Logs", icon: FileText, count: 5432 },
        { id: "security-threats", label: "Threat Monitoring", icon: AlertTriangle, count: 3 }
      ]
    }
  ]

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-300 ease-in-out z-50 shadow-2xl",
      isCollapsed ? "w-16" : "w-80"
    )}>
      {/* Header */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Super Admin
              </h1>
              <p className="text-slate-400 text-sm mt-1">Platform Management</p>
            </div>
          )}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onToggleCollapse}
            className="text-slate-400 hover:text-white hover:bg-slate-700/50 p-2"
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 space-y-2">
        {sidebarSections.map((section) => {
          const SectionIcon = section.icon
          const isExpanded = expandedSections[section.id]
          const hasActiveItem = section.items.some(item => item.id === activeSection)

          return (
            <div key={section.id} className="px-3">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group",
                  "hover:bg-gradient-to-r hover:from-slate-700/50 hover:to-slate-600/50",
                  hasActiveItem && "bg-gradient-to-r from-slate-700/70 to-slate-600/70",
                  isCollapsed && "justify-center"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg bg-gradient-to-r transition-all duration-200",
                    section.color,
                    "group-hover:scale-110 group-hover:shadow-lg"
                  )}>
                    <SectionIcon className="h-5 w-5 text-white" />
                  </div>
                  {!isCollapsed && (
                    <span className="font-medium text-slate-200 group-hover:text-white transition-colors">
                      {section.title}
                    </span>
                  )}
                </div>
                {!isCollapsed && (
                  <div className="flex items-center gap-2">
                    {section.items.some(item => item.count) && (
                      <Badge className="bg-slate-600 text-slate-200 text-xs">
                        {section.items.reduce((sum, item) => sum + (item.count || 0), 0)}
                      </Badge>
                    )}
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-slate-400 transition-transform duration-200" />
                    )}
                  </div>
                )}
              </button>

              {/* Section Items */}
              {!isCollapsed && (
                <div className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isExpanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
                )}>
                  <div className="mt-2 space-y-1 pl-4">
                    {section.items.map((item) => {
                      const ItemIcon = item.icon
                      const isActive = item.id === activeSection

                      return (
                        <button
                          key={item.id}
                          onClick={() => onSectionChange(item.id)}
                          className={cn(
                            "w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 group",
                            "hover:bg-slate-700/50 hover:translate-x-1",
                            isActive && "bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg transform translate-x-1"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "p-1.5 rounded-md transition-all duration-200",
                              isActive 
                                ? "bg-white/20" 
                                : "bg-slate-600/50 group-hover:bg-slate-600"
                            )}>
                              <ItemIcon className={cn(
                                "h-4 w-4 transition-colors",
                                isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                              )} />
                            </div>
                            <span className={cn(
                              "text-sm font-medium transition-colors",
                              isActive ? "text-white" : "text-slate-300 group-hover:text-white"
                            )}>
                              {item.label}
                            </span>
                          </div>
                          {item.count && (
                            <Badge className={cn(
                              "text-xs transition-all duration-200",
                              isActive 
                                ? "bg-white/20 text-white" 
                                : "bg-slate-600 text-slate-300 group-hover:bg-slate-500"
                            )}>
                              {item.count > 999 ? "999+" : item.count}
                            </Badge>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Collapsed tooltip items */}
              {isCollapsed && (
                <div className="relative group">
                  <div className="absolute left-full top-0 ml-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                    <div className="bg-slate-800 border border-slate-600 rounded-lg shadow-xl p-3 min-w-48">
                      <h3 className="font-medium text-white mb-2">{section.title}</h3>
                      <div className="space-y-1">
                        {section.items.map((item) => {
                          const ItemIcon = item.icon
                          return (
                            <button
                              key={item.id}
                              onClick={() => onSectionChange(item.id)}
                              className="w-full flex items-center justify-between p-2 rounded hover:bg-slate-700/50 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <ItemIcon className="h-4 w-4 text-slate-300" />
                                <span className="text-sm text-slate-300">{item.label}</span>
                              </div>
                              {item.count && (
                                <Badge className="bg-slate-600 text-slate-300 text-xs">
                                  {item.count > 999 ? "999+" : item.count}
                                </Badge>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-700/50">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-200">Platform Status</span>
            </div>
            <p className="text-xs text-slate-400">All systems operational</p>
            <div className="flex items-center gap-1 mt-1">
              <Crown className="h-3 w-3 text-purple-400" />
              <span className="text-xs text-purple-400">Super Admin Access</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SuperAdminSidebar
