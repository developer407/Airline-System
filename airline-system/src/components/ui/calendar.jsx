import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  mode,
  selected,
  onSelect,
  disabled,
  captionLayout,
  initialFocus,
  ...props
}) {
  return (
    <div className={cn("p-3", className)} {...props}>
      <CalendarContent 
        showOutsideDays={showOutsideDays}
        classNames={classNames}
        mode={mode}
        selected={selected}
        onSelect={onSelect}
        disabled={disabled}
        captionLayout={captionLayout}
        initialFocus={initialFocus}
      />
    </div>
  )
}

function CalendarContent({ showOutsideDays, classNames, mode, selected, onSelect, disabled, captionLayout, initialFocus }) {
  const [currentDate, setCurrentDate] = React.useState(selected || new Date())
  // Use controlled state from parent if provided, otherwise use internal state
  const selectedDate = selected || null

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1)
      days.push({
        date: prevMonthDay.getDate(),
        isCurrentMonth: false,
        fullDate: prevMonthDay
      })
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        date: day,
        isCurrentMonth: true,
        fullDate: new Date(year, month, day)
      })
    }

    // Add days from next month to fill the grid
    const remainingCells = 42 - days.length
    for (let day = 1; day <= remainingCells; day++) {
      const nextMonthDay = new Date(year, month + 1, day)
      days.push({
        date: day,
        isCurrentMonth: false,
        fullDate: nextMonthDay
      })
    }

    return days
  }

  const days = getDaysInMonth(currentDate)

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleDateClick = (day) => {
    if (showOutsideDays || day.isCurrentMonth) {
      // Check if the date is disabled
      if (disabled && typeof disabled === 'function' && disabled(day.fullDate)) {
        return
      }
      
      // Call parent's onSelect callback if provided
      if (onSelect) {
        onSelect(day.fullDate)
      }
    }
  }

  const isSelected = (day) => {
    if (!selectedDate) return false
    return day.fullDate.toDateString() === selectedDate.toDateString()
  }

  const isToday = (day) => {
    const today = new Date()
    return day.fullDate.toDateString() === today.toDateString()
  }

  return (
    <div className="space-y-4">
      {/* Header with month/year and navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={goToPreviousMonth}
          className="h-7 w-7 p-0"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <h2 className="text-sm font-medium">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={goToNextMonth}
          className="h-7 w-7 p-0"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="flex h-8 w-8 items-center justify-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const isDisabled = (disabled && typeof disabled === 'function' && disabled(day.fullDate)) || (!day.isCurrentMonth && !showOutsideDays)
          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              className={cn(
                "flex h-8 w-8 items-center justify-center text-xs rounded-md transition-colors",
                day.isCurrentMonth 
                  ? "text-foreground hover:bg-accent hover:text-accent-foreground" 
                  : showOutsideDays 
                    ? "text-muted-foreground/50 hover:bg-accent hover:text-accent-foreground" 
                    : "text-transparent pointer-events-none",
                isSelected(day) && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                isToday(day) && !isSelected(day) && "bg-accent text-accent-foreground",
                isDisabled && "opacity-50 cursor-not-allowed hover:bg-transparent",
                classNames?.day
              )}
              disabled={isDisabled}
            >
              {day.date}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { Calendar }

