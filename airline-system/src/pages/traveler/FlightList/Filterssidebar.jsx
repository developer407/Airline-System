import * as React from "react";
import {
  Filter,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Plane,
  Clock,
  DollarSign,
  Star,
  Luggage,
  Shield,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const FiltersSidebar = ({ filters, onFiltersChange, airlines, className }) => {
  const [expandedSections, setExpandedSections] = React.useState({
    stops: true,
    price: true,
    airlines: true,
    departure: false,
    arrival: false,
    duration: false,
    other: false,
  });

  // Debug: Log filters state changes
  React.useEffect(() => {
    console.log("FiltersSidebar - Current filters:", filters);
  }, [filters]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const updateFilter = (key, value) => {
    console.log(`Updating filter ${key} to:`, value);
    onFiltersChange((prev) => {
      const newFilters = {
        ...prev,
        [key]: value,
      };
      console.log("New filters state:", newFilters);
      return newFilters;
    });
  };

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
      baggageIncluded: false,
    });
  };

  const getAirlineLogo = (airlineCode) => {
    const logos = {
      AA: "🇺🇸",
      UA: "🇺🇸",
      DL: "🇺🇸",
      BA: "🇬🇧",
      LH: "🇩🇪",
      AF: "🇫🇷",
      KL: "🇳🇱",
      EK: "🇦🇪",
      QR: "🇶🇦",
      SQ: "🇸🇬",
    };
    return logos[airlineCode] || "✈️";
  };

  const timeRanges = [
    { value: "any", label: "Any Time", icon: "🕐" },
    { value: "morning", label: "Morning (6AM - 12PM)", icon: "🌅" },
    { value: "afternoon", label: "Afternoon (12PM - 6PM)", icon: "☀️" },
    { value: "evening", label: "Evening (6PM - 12AM)", icon: "🌆" },
    { value: "night", label: "Night (12AM - 6AM)", icon: "🌙" },
  ];

  const alliances = [
    { value: "any", label: "Any Alliance" },
    { value: "star", label: "Star Alliance" },
    { value: "oneworld", label: "Oneworld" },
    { value: "skyteam", label: "SkyTeam" },
  ];

  const FilterSection = ({ title, id, icon: Icon, children }) => (
    <div className="border-b border-border last:border-b-0">
      <Button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between p-4 text-left rounded-none"
        variant={"ghost"}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <span className="font-medium text-foreground">{title}</span>
        </div>
        {expandedSections[id] ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>
      {expandedSections[id] && (
        <div className="px-4 pb-4 animate-in slide-in-from-top-1 fade-in duration-200">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <Card className={cn("h-fit sticky top-24", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <span>Filters</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className=" text-xs"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Clear All
          </Button>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {/* Stops Filter */}
        <FilterSection title="Stops" id="stops" icon={Plane}>
          <div className="mb-2 text-xs text-muted-foreground">
            Current value: {filters.stops}
          </div>
          <RadioGroup
            value={filters.stops}
            onValueChange={(value) => {
              console.log("Stops filter changed to:", value);
              updateFilter("stops", value);
            }}
            className="space-y-3"
          >
            {[
              { value: "any", label: "Any number of stops" },
              { value: "0", label: "Non-stop" },
              { value: "1", label: "1 stop" },
              { value: "2", label: "2+ stops" },
            ].map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`stops-${option.value}`}
                />
                <Label
                  htmlFor={`stops-${option.value}`}
                  className="text-sm text-foreground cursor-pointer hover:text-primary transition-colors"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </FilterSection>

        {/* Price Range Filter */}
        <FilterSection title="Price Range" id="price" icon={DollarSign}>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${filters.priceRange.min}</span>
              <span>${filters.priceRange.max}</span>
            </div>
            <Slider
              value={[filters.priceRange.min, filters.priceRange.max]}
              onValueChange={(val) =>
                updateFilter("priceRange", { min: val[0], max: val[1] })
              }
              min={0}
              max={1000}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between gap-2">
              <Input
                type="number"
                value={filters.priceRange.min}
                onChange={(e) =>
                  updateFilter("priceRange", {
                    ...filters.priceRange,
                    min: parseInt(e.target.value) || 0,
                  })
                }
                className="w-20 text-sm"
                min={0}
                max={1000}
              />
              <Input
                type="number"
                value={filters.priceRange.max}
                onChange={(e) =>
                  updateFilter("priceRange", {
                    ...filters.priceRange,
                    max: parseInt(e.target.value) || 1000,
                  })
                }
                className="w-20 text-sm"
                min={0}
                max={1000}
              />
            </div>
            <p className="text-xs text-center text-muted-foreground">
              ${filters.priceRange.min} - ${filters.priceRange.max}
            </p>
          </div>
        </FilterSection>

        {/* Airlines Filter */}
        <FilterSection title="Airlines" id="airlines" icon={Users}>
          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-2">
              {airlines.map((airline) => (
                <div
                  key={airline.code}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    id={`airline-${airline.code}`}
                    checked={filters.airlines.includes(airline.code)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateFilter("airlines", [
                          ...filters.airlines,
                          airline.code,
                        ]);
                      } else {
                        updateFilter(
                          "airlines",
                          filters.airlines.filter((a) => a !== airline.code)
                        );
                      }
                    }}
                  />
                  <Label
                    htmlFor={`airline-${airline.code}`}
                    className="flex items-center gap-2 flex-1 cursor-pointer"
                  >
                    <span className="text-lg">
                      {getAirlineLogo(airline.code)}
                    </span>
                    <span className="text-sm text-foreground hover:text-primary transition-colors">
                      {airline.name}
                    </span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {/* You could add flight counts here */}
                    </span>
                  </Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </FilterSection>

        {/* Departure Time Filter */}
        <FilterSection title="Departure Time" id="departure" icon={Clock}>
          <div className="mb-2 text-xs text-muted-foreground">
            Current value: {filters.departureTimeRange}
          </div>
          <RadioGroup
            value={filters.departureTimeRange}
            onValueChange={(value) => {
              console.log("Departure time filter changed to:", value);
              updateFilter("departureTimeRange", value);
            }}
            className="space-y-2"
          >
            {timeRanges.map((range) => (
              <div
                key={range.value}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
              >
                <RadioGroupItem
                  value={range.value}
                  id={`departure-${range.value}`}
                />
                <Label
                  htmlFor={`departure-${range.value}`}
                  className="flex items-center gap-2 cursor-pointer text-sm text-foreground hover:text-primary transition-colors"
                >
                  <span className="text-base">{range.icon}</span>
                  <span>{range.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </FilterSection>

        {/* Arrival Time Filter */}
        <FilterSection title="Arrival Time" id="arrival" icon={Clock}>
          <div className="mb-2 text-xs text-muted-foreground">
            Current value: {filters.arrivalTimeRange}
          </div>
          <RadioGroup
            value={filters.arrivalTimeRange}
            onValueChange={(value) => {
              console.log("Arrival time filter changed to:", value);
              updateFilter("arrivalTimeRange", value);
            }}
            className="space-y-2"
          >
            {timeRanges.map((range) => (
              <div
                key={range.value}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
              >
                <RadioGroupItem
                  value={range.value}
                  id={`arrival-${range.value}`}
                />
                <Label
                  htmlFor={`arrival-${range.value}`}
                  className="flex items-center gap-2 cursor-pointer text-sm text-foreground hover:text-primary transition-colors"
                >
                  <span className="text-base">{range.icon}</span>
                  <span>{range.label}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </FilterSection>

        {/* Duration Filter */}
        <FilterSection title="Max Duration" id="duration" icon={Clock}>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0h</span>
              <span>24h</span>
            </div>
            <Slider
              value={[filters.maxDuration]}
              onValueChange={(val) => updateFilter("maxDuration", val[0])}
              min="0"
              max="1440"
              step="60"
              className="w-full"
            />
            <p className="text-sm text-center text-foreground">
              Up to {Math.floor(filters.maxDuration / 60)}h{" "}
              {filters.maxDuration % 60}m
            </p>
          </div>
        </FilterSection>

        {/* Other Filters */}
        <FilterSection title="Other Options" id="other" icon={Star}>
          <div className="space-y-4">
            {/* Refundable Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <Label
                  htmlFor="refundable-filter"
                  className="text-sm text-foreground cursor-pointer hover:text-primary transition-colors"
                >
                  Refundable Only
                </Label>
              </div>
              <Checkbox
                id="refundable-filter"
                checked={filters.refundable}
                onCheckedChange={(checked) =>
                  updateFilter("refundable", checked)
                }
              />
            </div>

            {/* Alliance Filter */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-2 block">
                Alliance
              </Label>
              <Select
                value={filters.alliance}
                onValueChange={(value) => updateFilter("alliance", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select alliance" />
                </SelectTrigger>
                <SelectContent>
                  {alliances.map((alliance) => (
                    <SelectItem key={alliance.value} value={alliance.value}>
                      {alliance.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Baggage Included Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Luggage className="h-4 w-4 text-primary" />
                <Label
                  htmlFor="baggage-filter"
                  className="text-sm text-foreground cursor-pointer hover:text-primary transition-colors"
                >
                  Baggage Included
                </Label>
              </div>
              <Checkbox
                id="baggage-filter"
                checked={filters.baggageIncluded}
                onCheckedChange={(checked) =>
                  updateFilter("baggageIncluded", checked)
                }
              />
            </div>
          </div>
        </FilterSection>
      </CardContent>
    </Card>
  );
};

export default FiltersSidebar;
