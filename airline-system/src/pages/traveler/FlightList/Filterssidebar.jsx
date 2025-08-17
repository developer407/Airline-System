import * as React from "react"
import { 
  Filter, 
  X, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw,
  Plane,
  Clock,
  DollarSign,
  Star,
  Luggage,
  Shield,
  Users
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const FiltersSidebar = ({ filters, onFiltersChange, airlines, className }) => {
  const [expandedSections, setExpandedSections] = React.useState({
    stops: true,
    price: true,
    airlines: true,
    departure: false,
    arrival: false,
    duration: false,
    other: false
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const updateFilter = (key, value) => {
    onFiltersChange(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearAllFilters = () => {
    onFiltersChange({
      airlines: [],
      priceRange: { min: 0, max: 1000 },
      stops: "any",
      departureTimeRange: "any",
      arrivalTimeRange: "any",
      maxDuration: 1440, // 24 hours
      refundable: false,
      alliance: "any",
      baggageIncluded: false
    })
  }

  const getAirlineLogo = (airlineCode) => {
    const logos = {
      "AA": "🇺🇸",
      "UA": "🇺🇸", 
      "DL": "🇺🇸",
      "BA": "🇬🇧",
      "LH": "🇩🇪",
      "AF": "🇫🇷",
      "KL": "🇳🇱",
      "EK": "🇦🇪",
      "QR": "🇶🇦",
      "SQ": "🇸🇬"
    }
    return logos[airlineCode] || "✈️"
  }

  const timeRanges = [
    { value: "any", label: "Any Time", icon: "🕐" },
    { value: "morning", label: "Morning (6AM - 12PM)", icon: "🌅" },
    { value: "afternoon", label: "Afternoon (12PM - 6PM)", icon: "☀️" },
    { value: "evening", label: "Evening (6PM - 12AM)", icon: "🌆" },
    { value: "night", label: "Night (12AM - 6AM)", icon: "🌙" }
  ]

  const alliances = [
    { value: "any", label: "Any Alliance" },
    { value: "star", label: "Star Alliance" },
    { value: "oneworld", label: "Oneworld" },
    { value: "skyteam", label: "SkyTeam" }
  ]

  const FilterSection = ({ title, id, icon: Icon, children }) => (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-blue-600" />
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        {expandedSections[id] ? (
          <ChevronUp className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </button>
      {expandedSections[id] && (
        <div className="px-4 pb-4 animate-in slide-in-from-top-1 fade-in duration-200">
          {children}
        </div>
      )}
    </div>
  )

  const PriceSlider = ({ min, max, value, onChange }) => (
    <div className="space-y-3">
      <div className="flex justify-between text-sm text-gray-600">
        <span>${min}</span>
        <span>${max}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value.min}
          onChange={(e) => onChange({ ...value, min: parseInt(e.target.value) })}
          className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value.max}
          onChange={(e) => onChange({ ...value, max: parseInt(e.target.value) })}
          className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
        />
      </div>
      <div className="flex justify-between gap-2">
        <Input
          type="number"
          value={value.min}
          onChange={(e) => onChange({ ...value, min: parseInt(e.target.value) || 0 })}
          className="w-20 text-sm"
          min={min}
          max={max}
        />
        <Input
          type="number"
          value={value.max}
          onChange={(e) => onChange({ ...value, max: parseInt(e.target.value) || max })}
          className="w-20 text-sm"
          min={min}
          max={max}
        />
      </div>
      <p className="text-xs text-center text-gray-500">
        ${value.min} - ${value.max}
      </p>
    </div>
  )

  return (
    <Card className={cn("h-fit sticky top-24", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" />
            <span>Filters</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 text-xs"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Clear All
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Stops Filter */}
        <FilterSection title="Stops" id="stops" icon={Plane}>
          <div className="space-y-3">
            {[
              { value: "any", label: "Any number of stops" },
              { value: "0", label: "Non-stop" },
              { value: "1", label: "1 stop" },
              { value: "2", label: "2+ stops" }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="stops"
                  value={option.value}
                  checked={filters.stops === option.value}
                  onChange={(e) => updateFilter('stops', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range Filter */}
        <FilterSection title="Price Range" id="price" icon={DollarSign}>
          <PriceSlider
            min={0}
            max={1000}
            value={filters.priceRange}
            onChange={(value) => updateFilter('priceRange', value)}
          />
        </FilterSection>

        {/* Airlines Filter */}
        <FilterSection title="Airlines" id="airlines" icon={Users}>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {airlines.map((airline) => (
              <label key={airline.code} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-md transition-colors">
                <input
                  type="checkbox"
                  checked={filters.airlines.includes(airline.code)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateFilter('airlines', [...filters.airlines, airline.code])
                    } else {
                      updateFilter('airlines', filters.airlines.filter(a => a !== airline.code))
                    }
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-lg">{getAirlineLogo(airline.code)}</span>
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                    {airline.name}
                  </span>
                  <span className="text-xs text-gray-500 ml-auto">
                    {/* You could add flight counts here */}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Departure Time Filter */}
        <FilterSection title="Departure Time" id="departure" icon={Clock}>
          <div className="space-y-2">
            {timeRanges.map((range) => (
              <label key={range.value} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-md transition-colors">
                <input
                  type="radio"
                  name="departureTime"
                  value={range.value}
                  checked={filters.departureTimeRange === range.value}
                  onChange={(e) => updateFilter('departureTimeRange', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-base">{range.icon}</span>
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Arrival Time Filter */}
        <FilterSection title="Arrival Time" id="arrival" icon={Clock}>
          <div className="space-y-2">
            {timeRanges.map((range) => (
              <label key={range.value} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-md transition-colors">
                <input
                  type="radio"
                  name="arrivalTime"
                  value={range.value}
                  checked={filters.arrivalTimeRange === range.value}
                  onChange={(e) => updateFilter('arrivalTimeRange', e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-base">{range.icon}</span>
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Duration Filter */}
        <FilterSection title="Max Duration" id="duration" icon={Clock}>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>0h</span>
              <span>24h</span>
            </div>
            <input
              type="range"
              min="0"
              max="1440"
              step="60"
              value={filters.maxDuration}
              onChange={(e) => updateFilter('maxDuration', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <p className="text-sm text-center text-gray-700">
              Up to {Math.floor(filters.maxDuration / 60)}h {filters.maxDuration % 60}m
            </p>
          </div>
        </FilterSection>

        {/* Other Filters */}
        <FilterSection title="Other Options" id="other" icon={Star}>
          <div className="space-y-4">
            {/* Refundable Toggle */}
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  Refundable Only
                </span>
              </div>
              <input
                type="checkbox"
                checked={filters.refundable}
                onChange={(e) => updateFilter('refundable', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </label>

            {/* Alliance Filter */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-2 block">Alliance</Label>
              <select
                value={filters.alliance}
                onChange={(e) => updateFilter('alliance', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {alliances.map((alliance) => (
                  <option key={alliance.value} value={alliance.value}>
                    {alliance.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Baggage Included Toggle */}
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-2">
                <Luggage className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  Baggage Included
                </span>
              </div>
              <input
                type="checkbox"
                checked={filters.baggageIncluded}
                onChange={(e) => updateFilter('baggageIncluded', e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            </label>
          </div>
        </FilterSection>
      </CardContent>
    </Card>
  )
}

export default FiltersSidebar
