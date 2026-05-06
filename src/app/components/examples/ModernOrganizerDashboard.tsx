import React from 'react'
import { DashboardLayout } from '@/app/components/layout/DashboardLayout'
import { SurfaceCard } from '@/app/components/layout/PageShell'
import { StatCard } from '@/app/components/dashboard/StatCard'
import { AIInsightCard } from '@/app/components/ai/AIInsightCard'
import { Button } from '@/app/components/ui/button'
import { Plus, Calendar, Users, TrendingUp } from 'lucide-react'

/**
 * BEFORE: Inconsistent layout, hardcoded colors, no design system usage
 * AFTER: Clean dashboard using design system, proper layout, consistent spacing
 */
export function ModernOrganizerDashboard() {
  // Mock data - in real app, this would come from API
  const stats = [
    {
      title: 'Total Events',
      value: '24',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Calendar,
    },
    {
      title: 'Total Attendees',
      value: '1,247',
      change: '+8%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Revenue',
      value: '$12,450',
      change: '+23%',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
  ]

  const aiInsights = [
    {
      type: 'prediction' as const,
      title: 'Event Attendance Prediction',
      description: 'Your next event "Tech Conference 2024" is expected to have 85% attendance rate based on current registrations.',
      actionLabel: 'View Details',
      onAction: () => console.log('View prediction details'),
    },
    {
      type: 'recommendation' as const,
      title: 'Pricing Optimization',
      description: 'Consider increasing VIP ticket prices by 15% - similar events in your area have seen 20% higher conversion.',
      actionLabel: 'Adjust Pricing',
      onAction: () => console.log('Adjust pricing'),
    },
    {
      type: 'alert' as const,
      title: 'Low Registration Warning',
      description: 'Your "Workshop Series" has only 12 registrations. Consider promoting it more aggressively.',
      actionLabel: 'Promote Event',
      onAction: () => console.log('Promote event'),
    },
  ]

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Manage your events and track performance"
      actions={
        <Button className="bg-primary-600 hover:bg-primary-700">
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      }
    >
      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* AI Insights Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-heading-4 text-foreground">
            AI Insights
          </h2>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {aiInsights.map((insight, index) => (
            <AIInsightCard key={index} {...insight} />
          ))}
        </div>
      </div>

      {/* Recent Events */}
      <SurfaceCard>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-heading-5 text-foreground">
            Recent Events
          </h3>
          <Button variant="ghost" size="sm">
            View All Events
          </Button>
        </div>

        <div className="space-y-4">
          {/* Event items would go here */}
          <div className="text-center py-8 text-body text-neutral-500">
            Recent events will appear here
          </div>
        </div>
      </SurfaceCard>
    </DashboardLayout>
  )
}