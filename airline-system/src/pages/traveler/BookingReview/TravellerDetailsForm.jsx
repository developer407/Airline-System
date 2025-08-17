import * as React from "react"
import { 
  Users, 
  Plus, 
  Trash2, 
  Save, 
  Phone, 
  Mail, 
  CreditCard,
  AlertCircle,
  Check,
  User,
  Calendar,
  Globe,
  Plane
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const TravellerDetailsForm = ({ 
  travelers, 
  contactInfo, 
  onTravelersChange, 
  onContactChange, 
  validationErrors,
  passengerCount 
}) => {
  const [showSaveProfile, setShowSaveProfile] = React.useState(false)

  const titles = ["Mr", "Ms", "Mrs", "Dr", "Master", "Miss"]
  const genders = [
    { value: "M", label: "Male" },
    { value: "F", label: "Female" },
    { value: "O", label: "Other" }
  ]
  const nationalities = [
    { value: "IN", label: "Indian" },
    { value: "US", label: "American" },
    { value: "GB", label: "British" },
    { value: "CA", label: "Canadian" },
    { value: "AU", label: "Australian" },
    { value: "DE", label: "German" },
    { value: "FR", label: "French" },
    { value: "JP", label: "Japanese" },
    { value: "SG", label: "Singaporean" },
    { value: "AE", label: "UAE" }
  ]
  const countryCodes = [
    { value: "+91", label: "+91 (India)" },
    { value: "+1", label: "+1 (USA/Canada)" },
    { value: "+44", label: "+44 (UK)" },
    { value: "+61", label: "+61 (Australia)" },
    { value: "+65", label: "+65 (Singapore)" },
    { value: "+971", label: "+971 (UAE)" }
  ]

  const updateTraveler = (index, field, value) => {
    const updatedTravelers = [...travelers]
    updatedTravelers[index] = {
      ...updatedTravelers[index],
      [field]: value
    }
    onTravelersChange(updatedTravelers)
  }

  const addTraveler = (type = "ADULT") => {
    const newTraveler = {
      id: Date.now(),
      type,
      title: "",
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      nationality: "IN",
      frequentFlyerNumber: ""
    }
    onTravelersChange([...travelers, newTraveler])
  }

  const removeTraveler = (index) => {
    if (travelers.length > 1) {
      const updatedTravelers = travelers.filter((_, i) => i !== index)
      onTravelersChange(updatedTravelers)
    }
  }

  const updateContactInfo = (field, value) => {
    onContactChange({
      ...contactInfo,
      [field]: value
    })
  }

  const getAgeFromDOB = (dob) => {
    if (!dob) return null
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const getTravelerType = (age) => {
    if (age === null) return "ADULT"
    if (age < 2) return "INFANT"
    if (age < 12) return "CHILD"
    return "ADULT"
  }

  const TravelerCard = ({ traveler, index }) => {
    const age = getAgeFromDOB(traveler.dateOfBirth)
    const detectedType = getTravelerType(age)
    
    return (
      <Card className="overflow-hidden">
        <CardHeader className="bg-gray-50 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              <span>
                Traveler {index + 1} 
                {age !== null && (
                  <span className={cn(
                    "ml-2 px-2 py-1 rounded-full text-xs font-medium",
                    detectedType === "ADULT" && "bg-blue-100 text-blue-800",
                    detectedType === "CHILD" && "bg-green-100 text-green-800",
                    detectedType === "INFANT" && "bg-purple-100 text-purple-800"
                  )}>
                    {detectedType} {age !== null && `(${age}y)`}
                  </span>
                )}
              </span>
            </CardTitle>
            {travelers.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeTraveler(index)}
                className="text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          {index === 0 && (
            <p className="text-sm text-blue-600 font-medium">Primary Traveler</p>
          )}
        </CardHeader>
        
        <CardContent className="space-y-4 pt-4">
          {/* Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor={`title-${index}`}>Title *</Label>
              <select
                id={`title-${index}`}
                value={traveler.title}
                onChange={(e) => updateTraveler(index, 'title', e.target.value)}
                className={cn(
                  "w-full mt-1 p-2 border rounded-md text-sm",
                  validationErrors[`traveler_${index}_title`] && "border-red-300 bg-red-50"
                )}
              >
                <option value="">Select</option>
                {titles.map(title => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor={`firstName-${index}`}>First Name *</Label>
              <Input
                id={`firstName-${index}`}
                value={traveler.firstName}
                onChange={(e) => updateTraveler(index, 'firstName', e.target.value)}
                placeholder="As per passport"
                className={cn(
                  validationErrors[`traveler_${index}_firstName`] && "border-red-300 bg-red-50"
                )}
              />
              {validationErrors[`traveler_${index}_firstName`] && (
                <p className="text-red-600 text-xs mt-1">
                  {validationErrors[`traveler_${index}_firstName`]}
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor={`lastName-${index}`}>Last Name *</Label>
              <Input
                id={`lastName-${index}`}
                value={traveler.lastName}
                onChange={(e) => updateTraveler(index, 'lastName', e.target.value)}
                placeholder="As per passport"
                className={cn(
                  validationErrors[`traveler_${index}_lastName`] && "border-red-300 bg-red-50"
                )}
              />
              {validationErrors[`traveler_${index}_lastName`] && (
                <p className="text-red-600 text-xs mt-1">
                  {validationErrors[`traveler_${index}_lastName`]}
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor={`gender-${index}`}>Gender *</Label>
              <select
                id={`gender-${index}`}
                value={traveler.gender}
                onChange={(e) => updateTraveler(index, 'gender', e.target.value)}
                className={cn(
                  "w-full mt-1 p-2 border rounded-md text-sm",
                  validationErrors[`traveler_${index}_gender`] && "border-red-300 bg-red-50"
                )}
              >
                <option value="">Select</option>
                {genders.map(gender => (
                  <option key={gender.value} value={gender.value}>{gender.label}</option>
                ))}
              </select>
              {validationErrors[`traveler_${index}_gender`] && (
                <p className="text-red-600 text-xs mt-1">
                  {validationErrors[`traveler_${index}_gender`]}
                </p>
              )}
            </div>
          </div>

          {/* Details Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor={`dob-${index}`} className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Date of Birth *
              </Label>
              <Input
                id={`dob-${index}`}
                type="date"
                value={traveler.dateOfBirth}
                onChange={(e) => updateTraveler(index, 'dateOfBirth', e.target.value)}
                className={cn(
                  validationErrors[`traveler_${index}_dob`] && "border-red-300 bg-red-50"
                )}
              />
              {validationErrors[`traveler_${index}_dob`] && (
                <p className="text-red-600 text-xs mt-1">
                  {validationErrors[`traveler_${index}_dob`]}
                </p>
              )}
            </div>
            
            <div>
              <Label htmlFor={`nationality-${index}`} className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Nationality *
              </Label>
              <select
                id={`nationality-${index}`}
                value={traveler.nationality}
                onChange={(e) => updateTraveler(index, 'nationality', e.target.value)}
                className="w-full mt-1 p-2 border rounded-md text-sm"
              >
                {nationalities.map(country => (
                  <option key={country.value} value={country.value}>{country.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor={`ffn-${index}`} className="flex items-center gap-2">
                <Plane className="h-4 w-4" />
                Frequent Flyer Number
              </Label>
              <Input
                id={`ffn-${index}`}
                value={traveler.frequentFlyerNumber}
                onChange={(e) => updateTraveler(index, 'frequentFlyerNumber', e.target.value)}
                placeholder="Optional"
              />
            </div>
          </div>

          {/* Age-based Warnings */}
          {age !== null && (
            <div className="space-y-2">
              {detectedType === "INFANT" && (
                <div className="flex items-start gap-2 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-purple-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-purple-900">Infant Travel Policy</p>
                    <p className="text-purple-800 mt-1">
                      Infants under 2 years travel on adult's lap. Separate seat can be purchased if needed.
                    </p>
                  </div>
                </div>
              )}
              
              {detectedType === "CHILD" && (
                <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-green-900">Child Travel Policy</p>
                    <p className="text-green-800 mt-1">
                      Children between 2-12 years require their own seat. Unaccompanied minor service may be required.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          <span>Traveler Details</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          Enter details for all passengers as per government-issued ID
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Travelers */}
        <div className="space-y-4">
          {travelers.map((traveler, index) => (
            <TravelerCard key={traveler.id} traveler={traveler} index={index} />
          ))}
        </div>

        {/* Add Traveler Buttons */}
        {travelers.length < passengerCount && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Add More Travelers</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => addTraveler("ADULT")}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Adult
              </Button>
              <Button
                variant="outline"
                onClick={() => addTraveler("CHILD")}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Child
              </Button>
              <Button
                variant="outline"
                onClick={() => addTraveler("INFANT")}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Infant
              </Button>
            </div>
          </div>
        )}

        {/* Contact Information */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <span>Contact Information</span>
            </CardTitle>
            <p className="text-sm text-blue-700">
              Booking confirmation and updates will be sent to this contact
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mobile" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Mobile Number *
                </Label>
                <div className="flex gap-2 mt-1">
                  <select
                    value={contactInfo.countryCode}
                    onChange={(e) => updateContactInfo('countryCode', e.target.value)}
                    className="w-32 p-2 border rounded-md text-sm"
                  >
                    {countryCodes.map(code => (
                      <option key={code.value} value={code.value}>{code.label}</option>
                    ))}
                  </select>
                  <Input
                    id="mobile"
                    value={contactInfo.mobile}
                    onChange={(e) => updateContactInfo('mobile', e.target.value)}
                    placeholder="Enter mobile number"
                    className={cn(
                      "flex-1",
                      validationErrors.mobile && "border-red-300 bg-red-50"
                    )}
                  />
                </div>
                {validationErrors.mobile && (
                  <p className="text-red-600 text-xs mt-1">{validationErrors.mobile}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => updateContactInfo('email', e.target.value)}
                  placeholder="Enter email address"
                  className={cn(
                    "mt-1",
                    validationErrors.email && "border-red-300 bg-red-50"
                  )}
                />
                {validationErrors.email && (
                  <p className="text-red-600 text-xs mt-1">{validationErrors.email}</p>
                )}
              </div>
            </div>
            
            <div>
              <Label htmlFor="gst" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                GST Number (Optional)
              </Label>
              <Input
                id="gst"
                value={contactInfo.gstNumber}
                onChange={(e) => updateContactInfo('gstNumber', e.target.value)}
                placeholder="Enter GST number for business travel"
                className="mt-1"
              />
              <p className="text-xs text-gray-600 mt-1">
                GST invoice will be generated if GST number is provided
              </p>
            </div>

            <div className="flex items-center gap-2 p-3 bg-white border border-blue-200 rounded-lg">
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-sm text-gray-700">
                Send booking details and updates to this contact information
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Save Profile Option */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="saveProfile"
              checked={showSaveProfile}
              onChange={(e) => setShowSaveProfile(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div>
              <Label htmlFor="saveProfile" className="font-medium text-gray-900 cursor-pointer">
                Save traveler details to profile
              </Label>
              <p className="text-sm text-gray-600">
                Quick booking for future trips with saved passenger information
              </p>
            </div>
          </div>
          <Save className="h-5 w-5 text-gray-400" />
        </div>

        {/* Important Notes */}
        <div className="space-y-3">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-900">Important Reminders</p>
                <ul className="text-amber-800 mt-1 space-y-1 ml-4">
                  <li>• Names must match exactly as per government-issued photo ID</li>
                  <li>• Passport required for international travel</li>
                  <li>• Check visa requirements for your destination</li>
                  <li>• Arrive at airport 2 hours early for domestic, 3 hours for international</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TravellerDetailsForm
