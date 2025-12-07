import * as React from 'react'
import { cn } from '@/lib/utils'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false)

    const initials = fallback || alt?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?'

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex shrink-0 overflow-hidden rounded-full bg-primary-100 dark:bg-primary-900/30',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="h-full w-full object-cover"
            onError={() => setHasError(true)}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-medium text-primary-700 dark:text-primary-400">
            {initials}
          </span>
        )}
      </div>
    )
  }
)
Avatar.displayName = 'Avatar'

export { Avatar }
