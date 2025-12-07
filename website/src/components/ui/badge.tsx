import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default:
          'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
        secondary:
          'bg-secondary-100 text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400',
        accent:
          'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400',
        success:
          'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        warning:
          'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        outline:
          'border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
