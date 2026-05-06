import React from 'react'
import { cn } from '@/lib/utils'
import { MainLayout } from './MainLayout'

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
  title?: string
  subtitle?: string
  actions?: React.ReactNode
}

/**
 * DashboardLayout - Specialized layout for dashboard pages
 * Includes consistent header with title, subtitle, and action buttons
 */
export function DashboardLayout({
  children,
  className,
  title,
  subtitle,
  actions,
}: DashboardLayoutProps) {
  return (
    <MainLayout className={cn('space-y-8', className)}>
      {/* Dashboard Header */}
      {(title || subtitle || actions) && (
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="space-y-1">
            {title && (
              <h1 className="text-heading-2 text-foreground">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-body text-foreground-secondary">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center space-x-3">
              {actions}
            </div>
          )}
        </div>
      )}

      {/* Dashboard Content */}
      <div className="space-y-6">
        {children}
      </div>
    </MainLayout>
  )
}