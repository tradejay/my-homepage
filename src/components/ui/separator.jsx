import * as React from "react"
import { cn } from "../../utils/cn"

const Separator = React.forwardRef(({ className, orientation = 'horizontal', decorative = false, ...props }, ref) => (
  <div
    role={decorative ? undefined : 'separator'}
    data-orientation={orientation}
    ref={ref}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props}
  />
))
Separator.displayName = "Separator"

export { Separator }
