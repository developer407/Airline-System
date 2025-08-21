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
  Calendar as CalendarIcon,
  Globe,
  Plane
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

// DatePicker component with dropdown calendar
const DatePickerWithDropdown = ({ value, onChange, className, disabled }) => {
  const [open, setOpen] = React.useState(false)
  const selectedDate = value ? new Date(value) : null

  const handleDateSelect = (date) => {
    if (date) {
      // Format date as YYYY-MM-DD for the form
      const formattedDate = date.toISOString().split('T')[0]
      onChange(formattedDate)
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between font-normal",
            !selectedDate && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          {selectedDate ? selectedDate.toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : "Select date"}
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          captionLayout="dropdown-nav"
          fromYear={1920}
          toYear={new Date().getFullYear()}
          disabled={(date) => date > new Date()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

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
        <CardHeader className="bg-muted/50 pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <span>
                Traveler {index + 1}
                {age !== null && (
                  <span className={cn(
                    "ml-2 px-2 py-1 rounded-full text-xs font-medium",
                    detectedType === "ADULT" && "bg-primary/20 text-primary",
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
            <p className="text-sm text-primary font-medium">Primary Traveler</p>
          )}
        </CardHeader>

        <CardContent className="space-y-4 pt-4">
          {/* Name Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor={`title-${index}`}>Title *</Label>
              <Select
                value={traveler.title}
                onValueChange={(value) => updateTraveler(index, 'title', value)}
              >
                <SelectTrigger className={cn(
                  "w-full mt-1",
                  validationErrors[`traveler_${index}_title`] && "border-red-300 bg-red-50"
                )}>
                  <SelectValue placeholder="Select title" />
                </SelectTrigger>
                <SelectContent>
                  {titles.map(title => (
                    <SelectItem key={title} value={title}>{title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Select
                value={traveler.gender}
                onValueChange={(value) => updateTraveler(index, 'gender', value)}
              >
                <SelectTrigger className={cn(
                  "w-full mt-1",
                  validationErrors[`traveler_${index}_gender`] && "border-red-300 bg-red-50"
                )}>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map(gender => (
                    <SelectItem key={gender.value} value={gender.value}>{gender.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                <CalendarIcon className="h-4 w-4" />
                Date of Birth *
              </Label>
              <div className="mt-1">
                <DatePickerWithDropdown
                  value={traveler.dateOfBirth}
                  onChange={(date) => updateTraveler(index, 'dateOfBirth', date)}
                  className={cn(
                    validationErrors[`traveler_${index}_dob`] && "border-red-300 bg-red-50"
                  )}
                />
              </div>
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
              <Select
                value={traveler.nationality}
                onValueChange={(value) => updateTraveler(index, 'nationality', value)}
              >
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  {nationalities.map(country => (
                    <SelectItem key={country.value} value={country.value}>{country.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          <Users className="h-5 w-5 text-primary" />
          <span>Traveler Details</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
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
            <h4 className="font-medium text-foreground">Add More Travelers</h4>
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
        <Card className="bg-muted/30 border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              <span>Contact Information</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
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
                  <Select
                    value={contactInfo.countryCode}
                    onValueChange={(value) => updateContactInfo('countryCode', value)}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map(code => (
                        <SelectItem key={code.value} value={code.value}>{code.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              <p className="text-xs text-muted-foreground mt-1">
                GST invoice will be generated if GST number is provided
              </p>
            </div>

            <div className="flex items-center gap-2 p-3 bg-card border border-border rounded-lg">
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-sm text-foreground">
                Send booking details and updates to this contact information
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Save Profile Option */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-3">
            <Checkbox
              id="saveProfile"
              checked={showSaveProfile}
              onCheckedChange={setShowSaveProfile}
            />
            <div>
              <Label htmlFor="saveProfile" className="font-medium text-foreground cursor-pointer">
                Save traveler details to profile
              </Label>
              <p className="text-sm text-muted-foreground">
                Quick booking for future trips with saved passenger information
              </p>
            </div>
          </div>
          <Save className="h-5 w-5 text-muted-foreground" />
        </div>

        {/* Important Notes */}
        <div className="space-y-3">
          <div className="bg-muted/30 border border-border rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-foreground">Important Reminders</p>
                <ul className="text-muted-foreground mt-1 space-y-1 ml-4">
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
