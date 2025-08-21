import * as React from "react"
import { Armchair, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const Seat = ({ seatNumber, status, isSelected, onSelect, price, isDisabled }) => {
  const seatClass = cn(
    "flex items-center justify-center w-8 h-8 rounded-lg font-semibold text-xs transition-all duration-200",
    "border-2",
    status === "available" && "bg-white border-gray-300 text-gray-500 hover:bg-blue-100 hover:border-blue-400 cursor-pointer",
    status === "occupied" && "bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed",
    status === "blocked" && "bg-yellow-200 border-yellow-400 text-yellow-700 cursor-not-allowed",
    isSelected && "bg-blue-600 border-blue-800 text-white",
    isDisabled && "opacity-50 cursor-not-allowed"
  )

  return (
    <div className="flex flex-col items-center">
      <Button
        onClick={onSelect}
        className={seatClass}
        disabled={status !== "available" || isDisabled}
      >
        {seatNumber}
      </Button>
      {price > 0 && (
        <span className="text-[10px] text-muted-foreground mt-1">
          ₹{price}
        </span>
      )}
    </div>
  )
}

const SeatMap = ({
  seatMapData,
  selectedSeats,
  onSelectSeat,
  selectedTraveler,
  onClose,
  travelers
}) => {
  const selectedTravelerName = travelers.find(t => t.id === selectedTraveler)?.firstName || ""
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-border">
          <div>
                            <h2 className="text-xl font-bold text-foreground">Select Your Seat</h2>
                <p className="text-sm text-muted-foreground">
                  Choosing for: <span className="font-semibold text-primary">{selectedTravelerName}</span>
                </p>
          </div>
                      <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
        </div>

        {/* Main Content */}
        <div className="flex-grow overflow-y-auto p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Seat Map */}
            <div className="flex-grow">
              <div className="bg-background rounded-xl shadow-inner p-6 border border-border">
                {/* Aircraft Body */}
                <div className="relative">
                  <div className="absolute inset-x-0 top-1/2 h-1/2 bg-muted rounded-full" />
                  <div className="relative space-y-3">
                    {seatMapData.sections.map((section) => (
                      <div key={section.name}>
                        <div className="text-center my-4">
                          <p className="font-semibold text-foreground">{section.name}</p>
                        </div>
                        <div className="space-y-2">
                          {section.rows.map((row) => (
                            <div key={row} className="flex items-center justify-center gap-2">
                              <span className="w-6 text-sm font-semibold text-muted-foreground">{row}</span>
                              <div className="flex-grow grid grid-cols-7 gap-x-2 gap-y-1">
                                {['A', 'B', 'C', 'X', 'D', 'E', 'F'].map((col, idx) => {
                                  if (col === 'X') {
                                    return <div key={idx} className="w-4" /> // Aisle
                                  }
                                  const seatNumber = `${row}${col}`
                                  const seat = seatMapData.seats[seatNumber]
                                  if (!seat) return <div key={idx} className="w-8 h-8" />
                                  
                                  const isSelectedForCurrent = selectedSeats[selectedTraveler] === seatNumber
                                  const isOccupiedByOther = Object.values(selectedSeats).includes(seatNumber) && !isSelectedForCurrent
                                  
                                  return (
                                    <Seat
                                      key={seatNumber}
                                      seatNumber={seatNumber}
                                      status={isOccupiedByOther ? "occupied" : seat.status}
                                      isSelected={isSelectedForCurrent}
                                      onSelect={() => onSelectSeat(selectedTraveler, seatNumber)}
                                      price={seat.price}
                                      isDisabled={isOccupiedByOther}
                                    />
                                  )
                                })}
                              </div>
                              <span className="w-6" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Legend & Summary */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="sticky top-0 space-y-6">
                <div className="bg-card p-4 rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-3">Legend</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md border-2 border-border bg-background" />
                      <span className="text-muted-foreground">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md border-2 border-primary bg-primary" />
                      <span className="text-muted-foreground">Your Selection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md border-2 border-muted bg-muted" />
                      <span className="text-muted-foreground">Occupied</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md border-2 border-yellow-400 bg-yellow-200" />
                      <span className="text-muted-foreground">Extra Legroom</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-xl border border-border">
                  <h3 className="font-semibold text-foreground mb-3">Your Selections</h3>
                  <div className="space-y-2">
                    {travelers.map((traveler) => (
                      <div key={traveler.id} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{traveler.firstName}</span>
                        <span className="font-semibold text-primary">
                          {selectedSeats[traveler.id] || "Not Selected"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-card/50 border-t border-border rounded-b-2xl">
          <Button
            onClick={onClose}
            className="w-full "
          >
            Confirm Seats
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SeatMap
