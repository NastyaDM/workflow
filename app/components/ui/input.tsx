import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: React.ReactNode
  trailingBtn?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, leadingIcon, trailingBtn,  ...props }, ref) => {
    return (
      <div className="relative">
        {leadingIcon ? (
          <span className="absolute inset-y-0 left-0 ml-4 flex items-center justify-center">{leadingIcon}</span>
        ) : null}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder-shown:truncate placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
            {
              "pl-12": !!leadingIcon,
              "pr-12": !!trailingBtn
            },
            className,

          )}
          ref={ref}
          disabled={disabled}
          {...props}
        />
        {trailingBtn ? <span className="absolute inset-y-0 mr-4 right-0 flex items-center justify-center">{trailingBtn}</span> : null}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
