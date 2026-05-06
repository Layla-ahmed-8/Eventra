import React from 'react'
import { SurfaceCard } from '@/app/components/layout/PageShell'
import { Skeleton } from '@/app/components/ui/skeleton'
import { Button } from '@/app/components/ui/button'
import { Alert, AlertDescription } from '@/app/components/ui/alert'
import { Calendar, Search, Plus, AlertCircle } from 'lucide-react'

/**
 * BEFORE: No loading states, inconsistent empty states
 * AFTER: Consistent loading skeletons and empty states using design system
 */

// Loading State Component
export function EventListSkeleton() {
  return (
    <SurfaceCard>
      <div className="space-y-4">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-9 w-24" />
        </div>

        {/* Event item skeletons */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 border border-neutral-200 rounded-ds-md">
            <Skeleton className="h-12 w-12 rounded-ds-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
    </SurfaceCard>
  )
}

// Empty State Component
interface EmptyEventsStateProps {
  onCreateEvent?: () => void
  searchQuery?: string
  onClearSearch?: () => void
}

export function EmptyEventsState({
  onCreateEvent,
  searchQuery,
  onClearSearch
}: EmptyEventsStateProps) {
  const isSearching = Boolean(searchQuery)

  return (
    <SurfaceCard>
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-6">
          {isSearching ? (
            <Search className="w-8 h-8 text-neutral-400" />
          ) : (
            <Calendar className="w-8 h-8 text-neutral-400" />
          )}
        </div>

        <h3 className="text-heading-5 text-foreground mb-2">
          {isSearching ? 'No events found' : 'No events yet'}
        </h3>

        <p className="text-body text-neutral-600 mb-6 max-w-sm mx-auto">
          {isSearching
            ? `We couldn't find any events matching "${searchQuery}". Try adjusting your search terms.`
            : 'Create your first event to get started with Eventra. It only takes a few minutes!'
          }
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {isSearching ? (
            <>
              <Button onClick={onClearSearch} variant="outline">
                Clear Search
              </Button>
              <Button onClick={onCreateEvent}>
                <Plus className="mr-2 h-4 w-4" />
                Create Event
              </Button>
            </>
          ) : (
            <Button onClick={onCreateEvent} className="bg-primary-600 hover:bg-primary-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Event
            </Button>
          )}
        </div>
      </div>
    </SurfaceCard>
  )
}

// Error State Component
interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  showSupport?: boolean
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We encountered an error while loading this content. Please try again.',
  onRetry,
  showSupport = true,
}: ErrorStateProps) {
  return (
    <SurfaceCard>
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">{title}</h3>
              <p className="text-sm">{message}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {onRetry && (
                <Button onClick={onRetry} size="sm">
                  Try Again
                </Button>
              )}
              {showSupport && (
                <Button variant="outline" size="sm">
                  Contact Support
                </Button>
              )}
            </div>
          </div>
        </AlertDescription>
      </Alert>
    </SurfaceCard>
  )
}

// Usage Example Component
export function EventListWithStates() {
  const [isLoading, setIsLoading] = React.useState(true)
  const [events, setEvents] = React.useState<any[]>([])
  const [error, setError] = React.useState<string | null>(null)
  const [searchQuery, setSearchQuery] = React.useState('')

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      // Simulate empty state
      setEvents([])
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <EventListSkeleton />
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={() => {
          setError(null)
          setIsLoading(true)
        }}
      />
    )
  }

  if (events.length === 0) {
    return (
      <EmptyEventsState
        searchQuery={searchQuery}
        onCreateEvent={() => console.log('Create event')}
        onClearSearch={() => setSearchQuery('')}
      />
    )
  }

  return (
    <SurfaceCard>
      <div className="space-y-4">
        {/* Render events */}
        {events.map(event => (
          <div key={event.id}>{event.title}</div>
        ))}
      </div>
    </SurfaceCard>
  )
}