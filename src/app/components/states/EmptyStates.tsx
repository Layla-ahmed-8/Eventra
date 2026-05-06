import React from 'react'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { Search, Calendar, Users, Plus, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Card className={cn('text-center', className)}>
      <CardContent className="py-12">
        {icon && (
          <div className="mx-auto w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-6">
            {icon}
          </div>
        )}

        <h3 className="text-heading-4 text-foreground mb-2">
          {title}
        </h3>

        <p className="text-body text-neutral-600 dark:text-neutral-400 mb-6 max-w-sm mx-auto">
          {description}
        </p>

        {action && (
          <div className="flex justify-center">
            {action}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Specific empty states for different contexts

export function EmptyEventsState({
  searchQuery,
  onCreateEvent,
  onClearSearch,
}: {
  searchQuery?: string
  onCreateEvent?: () => void
  onClearSearch?: () => void
}) {
  const isSearching = Boolean(searchQuery)

  return (
    <EmptyState
      icon={
        isSearching ? (
          <Search className="w-8 h-8 text-neutral-400" />
        ) : (
          <Calendar className="w-8 h-8 text-neutral-400" />
        )
      }
      title={isSearching ? 'No events found' : 'No events yet'}
      description={
        isSearching
          ? `We couldn't find any events matching "${searchQuery}". Try adjusting your search terms.`
          : 'Create your first event to get started with Eventra. It only takes a few minutes!'
      }
      action={
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
      }
    />
  )
}

export function EmptyCommunitiesState({
  onCreateCommunity,
  onBrowseCommunities,
}: {
  onCreateCommunity?: () => void
  onBrowseCommunities?: () => void
}) {
  return (
    <EmptyState
      icon={<Users className="w-8 h-8 text-neutral-400" />}
      title="No communities yet"
      description="Join or create communities to connect with people who share your interests and discover amazing events."
      action={
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={onBrowseCommunities} variant="outline">
            Browse Communities
          </Button>
          <Button onClick={onCreateCommunity} className="bg-primary-600 hover:bg-primary-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Community
          </Button>
        </div>
      }
    />
  )
}

export function EmptySearchState({
  query,
  onClearFilters,
}: {
  query: string
  onClearFilters?: () => void
}) {
  return (
    <EmptyState
      icon={<Search className="w-8 h-8 text-neutral-400" />}
      title="No results found"
      description={`We couldn't find anything matching "${query}". Try different keywords or clear your filters.`}
      action={
        <Button onClick={onClearFilters} variant="outline">
          Clear Filters
        </Button>
      }
    />
  )
}