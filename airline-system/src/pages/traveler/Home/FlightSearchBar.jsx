import * as React from "react"
import { Calendar as CalendarIcon, Users, Search, ArrowLeftRight, Plane } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"

const FlightSearchBar = ({ onSearch, className }) => {
  const [tripType, setTripType] = React.useState("roundTrip") // roundTrip, oneWay, multiCity
  const [searchData, setSearchData] = React.useState({
    from: "",
    to: "",
    departureDate: null,
    returnDate: null,
    passengers: 1,
    cabinClass: "economy"
  })

  const [departureDateOpen, setDepartureDateOpen] = React.useState(false)
  const [returnDateOpen, setReturnDateOpen] = React.useState(false)
  const [passengersOpen, setPassengersOpen] = React.useState(false)

  const cabinClasses = [
    { value: "economy", label: "Economy" },
    { value: "premium-economy", label: "Premium Economy" },
    { value: "business", label: "Business" },
    { value: "first", label: "First Class" }
  ]

  const handleSearch = () => {
    if (searchData.from && searchData.to && searchData.departureDate) {
      onSearch?.(searchData)
    }
  }

  const handleSwapAirports = () => {
    setSearchData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }))
  }

  const formatDate = (date) => {
    if (!date) return { day: "--", month: "Month" }
    return {
      day: date.getDate().toString().padStart(2, '0'),
      month: date.toLocaleDateString("en-US", { month: "short" })
    }
  }

  const formatDateFull = (date) => {
    if (!date) return ""
    return date.toLocaleDateString("en-US", { 
      weekday: "short",
      month: "short", 
      day: "numeric" 
    })
  }

  const adjustPassengers = (increment) => {
    setSearchData(prev => ({
      ...prev,
      passengers: Math.max(1, Math.min(9, prev.passengers + increment))
    }))
  }

  return (
    <div className={cn(
      "bg-white rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm",
      className
    )}>
      {/* Trip Type Tabs */}
      <div className="border-b border-gray-100 p-6 pb-4">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 w-fit">
          <Button
            onClick={() => setTripType("roundTrip")}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              tripType === "roundTrip"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Round Trip
          </Button>
          <Button
            onClick={() => setTripType("oneWay")}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              tripType === "oneWay"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            One Way
          </Button>
          <Button
            onClick={() => setTripType("multiCity")}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              tripType === "multiCity"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            Multi City
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* From and To Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
          {/* From */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400">
                <Plane className="h-4 w-4" />
              </div>
              <div className="pl-10">
                <label className="text-xs text-gray-500 font-medium">FROM</label>
                <Input
                  placeholder="Enter city or airport"
                  value={searchData.from}
                  onChange={(e) => setSearchData(prev => ({ ...prev, from: e.target.value.toUpperCase() }))}
                  className="border-0 p-0 text-lg font-semibold placeholder:text-gray-400 focus-visible:ring-0 bg-transparent"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {searchData.from ? `${searchData.from}` : "City or Airport"}
                </div>
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center items-center lg:col-span-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSwapAirports}
              className="h-10 w-10 rounded-full border border-gray-200 hover:bg-blue-50 hover:border-blue-300 p-0"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>

          {/* To */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="absolute left-3 top-3 text-gray-400">
                <Plane className="h-4 w-4 rotate-90" />
              </div>
              <div className="pl-10">
                <label className="text-xs text-gray-500 font-medium">TO</label>
                <Input
                  placeholder="Enter city or airport"
                  value={searchData.to}
                  onChange={(e) => setSearchData(prev => ({ ...prev, to: e.target.value.toUpperCase() }))}
                  className="border-0 p-0 text-lg font-semibold placeholder:text-gray-400 focus-visible:ring-0 bg-transparent"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {searchData.to ? `${searchData.to}` : "City or Airport"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-200 my-4"></div>

        {/* Date and Passenger Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          {/* Departure Date */}
          <div>
            <Dialog open={departureDateOpen} onOpenChange={setDepartureDateOpen}>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <label className="text-xs text-gray-500 font-medium">DEPARTURE</label>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="text-2xl font-bold text-gray-900">
                      {formatDate(searchData.departureDate).day}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {formatDate(searchData.departureDate).month}
                      </div>
                      <div className="text-xs text-gray-500">
                        {searchData.departureDate ? formatDateFull(searchData.departureDate) : "Select Date"}
                      </div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="w-auto p-0">
                <DialogHeader className="p-4 pb-0">
                  <DialogTitle>Select departure date</DialogTitle>
                </DialogHeader>
                <Calendar
                  mode="single"
                  selected={searchData.departureDate}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    console.log("date ",date)
                    setSearchData(prev => ({ ...prev, departureDate: date }))
                    setDepartureDateOpen(false)
                  }}
                  disabled={(date) => date < new Date().setHours(0, 0, 0, 0)}
                  initialFocus
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Return Date */}
          {tripType !== "oneWay" && (
            <div>
              <Dialog open={returnDateOpen} onOpenChange={setReturnDateOpen}>
                <DialogTrigger asChild>
                  <div className="cursor-pointer">
                    <label className="text-xs text-gray-500 font-medium">RETURN</label>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-2xl font-bold text-gray-900">
                        {formatDate(searchData.returnDate).day}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">
                          {formatDate(searchData.returnDate).month}
                        </div>
                        <div className="text-xs text-gray-500">
                          {searchData.returnDate ? formatDateFull(searchData.returnDate) : "Select Date"}
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="w-auto p-0">
                  <DialogHeader className="p-4 pb-0">
                    <DialogTitle>Select return date</DialogTitle>
                  </DialogHeader>
                  <Calendar
                    mode="single"
                    selected={searchData.returnDate}
                    onSelect={(date) => {
                      setSearchData(prev => ({ ...prev, returnDate: date }))
                      setReturnDateOpen(false)
                    }}
                    disabled={(date) => {
                      const minDate = searchData.departureDate || new Date()
                      return date < minDate.setHours(0, 0, 0, 0)
                    }}
                    initialFocus
                  />
                </DialogContent>
              </Dialog>
            </div>
          )}

          {/* Passengers */}
          <div>
            <Dialog open={passengersOpen} onOpenChange={setPassengersOpen}>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <label className="text-xs text-gray-500 font-medium">TRAVELERS</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Users className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="text-lg font-semibold text-gray-900">
                        {searchData.passengers}
                      </div>
                      <div className="text-xs text-gray-500">
                        {searchData.passengers === 1 ? "Passenger" : "Passengers"}
                      </div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="w-80">
                <DialogHeader>
                  <DialogTitle>Select passengers</DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-between py-4">
                  <span className="text-sm font-medium">Passengers</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => adjustPassengers(-1)}
                      disabled={searchData.passengers <= 1}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">
                      {searchData.passengers}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => adjustPassengers(1)}
                      disabled={searchData.passengers >= 9}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={() => setPassengersOpen(false)}
                  className="w-full"
                >
                  Done
                </Button>
              </DialogContent>
            </Dialog>
          </div>

          {/* Cabin Class */}
          <div>
            <label className="text-xs text-gray-500 font-medium">CLASS</label>
            <Select 
              value={searchData.cabinClass} 
              onValueChange={(value) => setSearchData(prev => ({ ...prev, cabinClass: value }))}
            >
              <SelectTrigger className="border-0 p-0 h-auto focus:ring-0 bg-transparent">
                <div className="text-left">
                  <div className="text-lg font-semibold text-gray-900 capitalize">
                    <SelectValue />
                  </div>
                  <div className="text-xs text-gray-500">
                    Travel Class
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent>
                {cabinClasses.map((cabin) => (
                  <SelectItem key={cabin.value} value={cabin.value}>
                    {cabin.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Search Button */}
        <Button 
          onClick={handleSearch}
          className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 rounded-xl"
          disabled={!searchData.from || !searchData.to || !searchData.departureDate}
        >
          <Search className="mr-2 h-5 w-5" />
          Search Flights
        </Button>
      </div>
    </div>
  )
}

export default FlightSearchBar
