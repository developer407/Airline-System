import * as React from "react"
import { 
  Plane,
  Building2,
  Calendar,
  Armchair,
  DollarSign,
  Tag,
  Users,
  BarChart3,
  TrendingUp,
  PieChart,
  FileText,
  Settings,
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
  UserCheck,
  Clock,
  MapPin,
  Menu,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const AirlineSidebar = ({ activeSection, onSectionChange, isCollapsed, onToggleCollapse }) => {
  const [expandedSections, setExpandedSections] = React.useState({
    airlines: false,
    flights: true,
    seats: false,
    pricing: false,
    bookings: false,
    reports: true
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
      title: "Dashboard",
      icon: Home,
      color: "from-blue-500 to-blue-600",
      items: [
        { id: "overview", label: "Overview", icon: BarChart3, count: null }
      ]
    },
    {
      id: "airlines",
      title: "Airline Management",
      icon: Building2,
      color: "from-indigo-500 to-indigo-600",
      items: [
        { id: "airlines-list", label: "All Airlines", icon: Building2, count: 12 },
        { id: "airlines-create", label: "Create Airline", icon: Plus, count: null },
        { id: "airlines-profile", label: "Airline Profile", icon: UserCheck, count: null },
        { id: "airlines-settings", label: "Settings", icon: Settings, count: null }
      ]
    },
    {
      id: "flights",
      title: "Flight Management",
      icon: Plane,
      color: "from-blue-500 to-cyan-500",
      items: [
        { id: "flights-list", label: "All Flights", icon: Plane, count: 45 },
        { id: "flights-create", label: "Create Flight", icon: Plus, count: null },
        { id: "flights-schedule", label: "Flight Schedule", icon: Calendar, count: null },
        { id: "flights-routes", label: "Route Management", icon: MapPin, count: 8 },
        { id: "flights-status", label: "Flight Status", icon: Clock, count: 3 }
      ]
    },
    {
      id: "seats",
      title: "Seat Management",
      icon: Armchair,
      color: "from-purple-500 to-purple-600",
      items: [
        { id: "seats-map", label: "Seat Maps", icon: Armchair, count: 45 },
        { id: "seats-config", label: "Seat Configuration", icon: Settings, count: null },
        { id: "seats-classes", label: "Class Management", icon: Target, count: 3 },
        { id: "seats-availability", label: "Availability", icon: Eye, count: null }
      ]
    },
    {
      id: "pricing",
      title: "Pricing & Discounts",
      icon: DollarSign,
      color: "from-green-500 to-emerald-500",
      items: [
        { id: "pricing-base", label: "Base Pricing", icon: DollarSign, count: null },
        { id: "pricing-dynamic", label: "Dynamic Pricing", icon: TrendingUp, count: null },
        { id: "discounts-list", label: "Discount Codes", icon: Tag, count: 8 },
        { id: "discounts-create", label: "Create Discount", icon: Gift, count: null },
        { id: "pricing-rules", label: "Pricing Rules", icon: FileText, count: 12 }
      ]
    },
    {
      id: "bookings",
      title: "Booking Management",
      icon: Users,
      color: "from-orange-500 to-red-500",
      items: [
        { id: "bookings-list", label: "All Bookings", icon: Users, count: 234 },
        { id: "bookings-pending", label: "Pending Bookings", icon: Clock, count: 12 },
        { id: "bookings-confirmed", label: "Confirmed", icon: UserCheck, count: 198 },
        { id: "bookings-cancelled", label: "Cancelled", icon: X, count: 24 },
        { id: "bookings-payments", label: "Payment Status", icon: CreditCard, count: 5 }
      ]
    },
    {
      id: "reports",
      title: "Reports & Analytics",
      icon: BarChart3,
      color: "from-pink-500 to-rose-500",
      items: [
        { id: "reports-sales", label: "Sales Reports", icon: TrendingUp, count: null },
        { id: "reports-occupancy", label: "Seat Occupancy", icon: PieChart, count: null },
        { id: "reports-revenue", label: "Revenue Analysis", icon: DollarSign, count: null },
        { id: "reports-performance", label: "Performance", icon: BarChart3, count: null },
        { id: "reports-custom", label: "Custom Reports", icon: FileText, count: 3 }
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
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Airline Dashboard
              </h1>
              <p className="text-slate-400 text-sm mt-1">Management Console</p>
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
      <ScrollArea className="flex-1 py-4 space-y-2">
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
                  isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
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
                            isActive && "bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg transform translate-x-1"
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
                              {item.count}
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
                                  {item.count}
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
      </ScrollArea>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-slate-700/50">
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-slate-200">System Status</span>
            </div>
            <p className="text-xs text-slate-400">All systems operational</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AirlineSidebar