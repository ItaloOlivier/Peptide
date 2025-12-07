import * as React from 'react'
import { cn } from '@/lib/utils'

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  variant?: 'default' | 'success' | 'warning' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

const variantClasses = {
  default: 'bg-primary-500',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  accent: 'bg-accent-500',
}

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, variant = 'default', size = 'md', showLabel = false, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))

    return (
      <div className={cn('w-full', className)} ref={ref} {...props}>
        {showLabel && (
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Progress</span>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{Math.round(percentage)}%</span>
          </div>
        )}
        <div
          className={cn(
            'w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700',
            sizeClasses[size]
          )}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500 ease-out',
              variantClasses[variant]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)
Progress.displayName = 'Progress'

export { Progress }
