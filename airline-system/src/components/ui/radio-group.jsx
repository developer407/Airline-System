import * as React from "react"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef(({ className, value, onValueChange, children, ...props }, ref) => {
  return (
    <div
      className={cn("grid gap-2", className)}
      role="radiogroup"
      ref={ref}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...child.props,
            name: props.name || "radio-group",
            checked: child.props.value === value,
            onChange: () => onValueChange?.(child.props.value)
          })
        }
        return child
      })}
    </div>
  )
})
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef(({ className, value, id, checked, onChange, ...props }, ref) => {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
        ref={ref}
        className={cn(
          "h-4 w-4 rounded-full border border-primary text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    </div>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }