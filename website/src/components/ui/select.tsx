import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, children, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            {label}
          </label>
        )}
        <select
          className={cn(
            'flex h-11 w-full rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all',
            error && 'border-accent-500 focus:ring-accent-500',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        {error && (
          <p className="mt-1.5 text-sm text-accent-500">{error}</p>
        )}
      </div>
    )
  }
)
Select.displayName = 'Select'

export { Select }
