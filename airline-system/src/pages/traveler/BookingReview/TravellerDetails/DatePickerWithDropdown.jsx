import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"


// DatePicker component with dropdown calendar
const DatePickerWithDropdown = ({ value, onChange, className, disabled }) => {
  const [open, setOpen] = useState(false)
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
        //   captionLayout="dropdown-nav"
          fromYear={1920}
          toYear={new Date().getFullYear()}
          disabled={(date) => date > new Date()}
          initialFocus
          captionLayout="dropdown"
        />
        
      </PopoverContent>
    </Popover>
  )
}

export default DatePickerWithDropdown;