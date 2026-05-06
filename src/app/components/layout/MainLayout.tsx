import React from 'react'
import { cn } from '@/lib/utils'
import { UnifiedSidebar } from '@/app/components/layout/UnifiedSidebar'
import { NotificationPanel } from '@/app/components/layout/NotificationPanel'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
  showSidebar?: boolean
  showNotifications?: boolean
}

/**
 * MainLayout - Primary layout wrapper for authenticated pages
 * Provides consistent structure with sidebar, bottom nav, and notifications
 */
export function MainLayout({
  children,
  className,
  showSidebar = true,
  showNotifications = true,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      {showSidebar && (
        <UnifiedSidebar className="hidden lg:flex" />
      )}

      {/* Main Content Area */}
      <main
        className={cn(
          'min-h-screen transition-all duration-ds-normal',
          'lg:ml-60',
          'lg:pb-0',
          className
        )}
      >
        <div className="container mx-auto max-w-ds-container px-4 py-6 lg:px-8 lg:py-8">
          {children}
        </div>
      </main>

      {/* Notification Panel */}
      {showNotifications && <NotificationPanel />}
    </div>
  )
}