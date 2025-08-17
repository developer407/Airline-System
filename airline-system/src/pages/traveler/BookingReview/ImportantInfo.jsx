import * as React from "react"
import { 
  Info, 
  Luggage, 
  Shield, 
  Users, 
  FileText, 
  ChevronDown, 
  ChevronUp,
  AlertTriangle,
  Clock,
  MapPin,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ImportantInfo = ({ flight }) => {
  const [expandedSections, setExpandedSections] = React.useState({})

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  const infoSections = [
    {
      id: "baggage",
      title: "Baggage Rules",
      icon: Luggage,
      color: "text-blue-600",
      summary: "Check baggage allowances and restrictions for your airline",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <h5 className="font-medium text-blue-900 mb-2">Cabin Baggage</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 7 kg per passenger</li>
                <li>• Dimensions: 55cm x 35cm x 25cm</li>
                <li>• Laptop bags allowed separately</li>
                <li>• No liquids above 100ml</li>
              </ul>
            </div>
            <div className="bg-green-50 rounded-lg p-3">
              <h5 className="font-medium text-green-900 mb-2">Check-in Baggage</h5>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• 15 kg for Economy</li>
                <li>• 25 kg for Business</li>
                <li>• Additional bags charged separately</li>
                <li>• Fragile items need special handling</li>
              </ul>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <h5 className="font-medium text-red-900 mb-2">Prohibited Items</h5>
            <p className="text-sm text-red-800">
              Sharp objects, flammable liquids, batteries, and firearms are strictly prohibited. 
              Check airline website for complete list.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "travel",
      title: "Travel Guidelines",
      icon: Globe,
      color: "text-green-600",
      summary: "Important travel requirements and COVID guidelines",
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-3">
            <h5 className="font-medium text-green-900 mb-2">Document Requirements</h5>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Valid government-issued photo ID required</li>
              <li>• Passport required for international travel</li>
              <li>• Check visa requirements for destination</li>
              <li>• Ensure documents are valid for at least 6 months</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <h5 className="font-medium text-blue-900 mb-2">Check-in Guidelines</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Arrive 2 hours early for domestic flights</li>
              <li>• Arrive 3 hours early for international flights</li>
              <li>• Web check-in opens 48 hours before departure</li>
              <li>• Mobile boarding passes accepted</li>
            </ul>
          </div>
          <div className="bg-amber-50 rounded-lg p-3">
            <h5 className="font-medium text-amber-900 mb-2">Health & Safety</h5>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Follow all health protocols at airport and aircraft</li>
              <li>• Carry hand sanitizer and masks</li>
              <li>• Check destination health requirements</li>
              <li>• Travel insurance recommended</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "minors",
      title: "Unaccompanied Minors (UMNR) Policy",
      icon: Users,
      color: "text-purple-600",
      summary: "Special policies for children traveling alone",
      content: (
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-3">
            <h5 className="font-medium text-purple-900 mb-2">Age Requirements</h5>
            <ul className="text-sm text-purple-800 space-y-1">
              <li>• Children 5-12 years: UMNR service mandatory</li>
              <li>• Children 12-18 years: UMNR service optional</li>
              <li>• Additional charges apply for UMNR service</li>
              <li>• Advance booking required (minimum 24 hours)</li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <h5 className="font-medium text-blue-900 mb-2">Required Documents</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Birth certificate or age proof</li>
              <li>• Guardian consent form</li>
              <li>• Contact details of person dropping/receiving</li>
              <li>• Valid ID of authorized person at destination</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "cancellation",
      title: "Cancellation & Refund Policy",
      icon: Shield,
      color: "text-red-600",
      summary: "Understand cancellation charges and refund timelines",
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 rounded-lg p-3">
            <h5 className="font-medium text-red-900 mb-2">Cancellation Charges</h5>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-red-800">
                <span>More than 4 hours before departure:</span>
                <span className="font-medium">₹3,000 + Airline Fee</span>
              </div>
              <div className="flex justify-between text-sm text-red-800">
                <span>0-4 hours before departure:</span>
                <span className="font-medium">₹3,500 + Airline Fee</span>
              </div>
              <div className="flex justify-between text-sm text-red-800">
                <span>After departure/No-show:</span>
                <span className="font-medium">Non-refundable</span>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <h5 className="font-medium text-orange-900 mb-2">Date Change Charges</h5>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-orange-800">
                <span>More than 4 hours before:</span>
                <span className="font-medium">₹2,500 + Fare Difference</span>
              </div>
              <div className="flex justify-between text-sm text-orange-800">
                <span>0-4 hours before:</span>
                <span className="font-medium">₹3,000 + Fare Difference</span>
              </div>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <h5 className="font-medium text-green-900 mb-2">Refund Timeline</h5>
            <ul className="text-sm text-green-800 space-y-1">
              <li>• Credit/Debit Card: 5-7 business days</li>
              <li>• Net Banking: 7-10 business days</li>
              <li>• UPI/Wallet: 3-5 business days</li>
              <li>• Refunds processed after deducting applicable charges</li>
            </ul>
          </div>
        </div>
      )
    }
  ]

  const InfoSection = ({ section }) => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
        onClick={() => toggleSection(section.id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <section.icon className={`h-5 w-5 ${section.color}`} />
            <div>
              <h4 className="font-medium text-gray-900">{section.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{section.summary}</p>
            </div>
          </div>
          {expandedSections[section.id] ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </button>
      
      {expandedSections[section.id] && (
        <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="pt-4">
            {section.content}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-600" />
          <span>Important Information</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Essential guidelines and policies for your journey
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Quick Important Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-amber-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-amber-900">Check-in Timing</h5>
                <p className="text-sm text-amber-800 mt-1">
                  Arrive 2 hours early for domestic flights, 3 hours for international
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-blue-900">Terminal Information</h5>
                <p className="text-sm text-blue-800 mt-1">
                  Check your terminal details before departure. Terminal change may occur.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Sections */}
        <div className="space-y-3">
          {infoSections.map((section) => (
            <InfoSection key={section.id} section={section} />
          ))}
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h5 className="font-medium text-red-900 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Emergency & Support
          </h5>
          <div className="space-y-2 text-sm text-red-800">
            <p>
              <span className="font-medium">24/7 Customer Support:</span> 1800-123-4567
            </p>
            <p>
              <span className="font-medium">Airport Helpdesk:</span> Available at all major airports
            </p>
            <p>
              <span className="font-medium">WhatsApp Support:</span> +91-98765-43210
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>• All policies are subject to airline terms and conditions</p>
          <p>• Rules may vary for international flights and different airlines</p>
          <p>• Please check with airline directly for specific requirements</p>
          <p>• Information is updated regularly but subject to change</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default ImportantInfo
