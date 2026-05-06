import React from 'react'
import { cn } from '@/lib/utils'
import { Logo } from '@/app/components/brand/Logo'

interface AuthLayoutProps {
  children: React.ReactNode
  className?: string
  title?: string
  subtitle?: string
}

/**
 * AuthLayout - Clean layout for authentication pages
 * Centered content with brand elements
 */
export function AuthLayout({
  children,
  className,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-hero-landing dark:bg-neutral-950">
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          {/* Brand Header */}
          <div className="text-center">
            <Logo className="mx-auto justify-center" showTagline />
            {title && (
              <h1 className="mt-6 text-heading-3 text-foreground">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-2 text-body text-foreground-secondary">
                {subtitle}
              </p>
            )}
          </div>

          {/* Auth Form */}
          <div
            className={cn(
              'card-bg rounded-ds-lg p-8 shadow-ds-lg',
              className
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}