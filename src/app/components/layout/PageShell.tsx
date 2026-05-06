import React from 'react'
import { cn } from '@/lib/utils'

interface PageShellProps {
  children: React.ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  background?: 'default' | 'gradient' | 'card'
}

/**
 * PageShell - Consistent page container with responsive max-width, padding, and background
 */
export function PageShell({
  children,
  className,
  maxWidth = 'xl',
  padding = 'md',
  background = 'default',
}: PageShellProps) {
  const maxWidthClass = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    full: 'max-w-full',
  }[maxWidth]

  const paddingClass = {
    none: '',
    sm: 'px-4 py-4',
    md: 'px-4 py-6 lg:px-6 lg:py-8',
    lg: 'px-4 py-8 lg:px-8 lg:py-12',
  }[padding]

  const backgroundClass = {
    default: 'bg-background',
    gradient: 'bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800',
    card: 'card-bg',
  }[background]

  return (
    <div
      className={cn(
        'mx-auto w-full min-h-screen',
        maxWidthClass,
        paddingClass,
        backgroundClass,
        className
      )}
    >
      {children}
    </div>
  )
}

interface SurfaceCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'outlined'
}

/**
 * SurfaceCard - Consistent card component with design system styling
 */
export function SurfaceCard({
  children,
  className,
  variant = 'default'
}: SurfaceCardProps) {
  const variantClass = {
    default: 'card-bg shadow-ds-md',
    elevated: 'card-bg shadow-ds-lg',
    outlined: 'bg-background border border-border shadow-ds-sm',
  }[variant]

  return (
    <div
      className={cn(
        'rounded-ds-lg p-6 transition-shadow duration-ds-normal',
        variantClass,
        className
      )}
    >
      {children}
    </div>
  )
}
