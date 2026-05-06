import { Button } from './button';
import { Card } from './card';
import { 
  LucideIcon,
  Calendar,
  CalendarX,
  History,
  Heart,
  Users,
  BellOff,
  SearchX,
  Ticket,
  Award,
  AlertCircle,
  Wrench,
  ShieldAlert,
  Ban,
} from 'lucide-react';
import { cn } from '../../../utils/designSystem';
import { motion } from 'motion/react';

interface EnhancedEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  variant?: 'default' | 'minimal' | 'illustration';
  illustration?: React.ReactNode;
}

export function EnhancedEmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  variant = 'default',
  illustration,
}: EnhancedEmptyStateProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-md mx-auto py-12"
    >
      {/* Icon or Illustration */}
      {variant === 'illustration' && illustration ? (
        <div className="mb-8">
          {illustration}
        </div>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            delay: 0.2, 
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] shadow-2xl shadow-[#7C3AED]/25 mb-6"
        >
          <Icon className="w-10 h-10 text-white" />
        </motion.div>
      )}

      {/* Title */}
      <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
        {description}
      </p>

      {/* Actions */}
      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {actionLabel && onAction && (
            <Button
              onClick={onAction}
              size="lg"
              className={cn(
                'rounded-xl',
                'bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6]',
                'hover:from-[#8B5CF6] hover:to-[#A78BFA]',
                'shadow-lg shadow-[#7C3AED]/25'
              )}
            >
              {actionLabel}
            </Button>
          )}
          
          {secondaryActionLabel && onSecondaryAction && (
            <Button
              onClick={onSecondaryAction}
              variant="outline"
              size="lg"
              className="rounded-xl"
            >
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );

  if (variant === 'minimal') {
    return content;
  }

  return (
    <Card className="p-8 rounded-3xl">
      {content}
    </Card>
  );
}

// Specific empty state variants for common scenarios
export function NoEventsFound({
  onClearFilters,
  onBrowseAll,
}: {
  onClearFilters?: () => void;
  onBrowseAll?: () => void;
}) {
  return (
    <EnhancedEmptyState
      icon={Calendar}
      title="No Events Found"
      description="We couldn't find any events matching your criteria. Try adjusting your filters or browse all available events."
      actionLabel={onClearFilters ? "Clear Filters" : undefined}
      onAction={onClearFilters}
      secondaryActionLabel={onBrowseAll ? "Browse All Events" : undefined}
      onSecondaryAction={onBrowseAll}
    />
  );
}

export function NoUpcomingEvents({
  onCreate,
}: {
  onCreate?: () => void;
}) {
  return (
    <EnhancedEmptyState
      icon={CalendarX}
      title="No Upcoming Events"
      description="You haven't RSVPd to any events yet. Discover amazing events happening near you!"
      actionLabel={onCreate ? "Discover Events" : undefined}
      onAction={onCreate}
    />
  );
}

export function NoPastEvents() {
  return (
    <EnhancedEmptyState
      icon={History}
      title="No Past Events"
      description="You haven't attended any events yet. Start exploring and building your event history!"
      variant="minimal"
    />
  );
}

export function NoFavorites({
  onDiscover,
}: {
  onDiscover?: () => void;
}) {
  return (
    <EnhancedEmptyState
      icon={Heart}
      title="No Favorites Yet"
      description="Save events you're interested in by clicking the heart icon. Your favorites will appear here."
      actionLabel={onDiscover ? "Discover Events" : undefined}
      onAction={onDiscover}
    />
  );
}

export function NoCommunities({
  onCreate,
  onDiscover,
}: {
  onCreate?: () => void;
  onDiscover?: () => void;
}) {
  return (
    <EnhancedEmptyState
      icon={Users}
      title="No Communities Yet"
      description="Join communities to connect with people who share your interests and discover exclusive events."
      actionLabel={onDiscover ? "Discover Communities" : undefined}
      onAction={onDiscover}
      secondaryActionLabel={onCreate ? "Create Community" : undefined}
      onSecondaryAction={onCreate}
    />
  );
}

export function NoNotifications() {
  return (
    <EnhancedEmptyState
      icon={BellOff}
      title="All Caught Up!"
      description="You're all up to date. We'll notify you when there's something new."
      variant="minimal"
    />
  );
}

export function NoSearchResults({
  searchQuery,
  onClear,
}: {
  searchQuery?: string;
  onClear?: () => void;
}) {
  return (
    <EnhancedEmptyState
      icon={SearchX}
      title="No Results Found"
      description={
        searchQuery
          ? `We couldn't find anything for "${searchQuery}". Try different keywords or browse all events.`
          : "We couldn't find any results. Try adjusting your search."
      }
      actionLabel={onClear ? "Clear Search" : undefined}
      onAction={onClear}
    />
  );
}

export function NoTickets() {
  return (
    <EnhancedEmptyState
      icon={Ticket}
      title="No Tickets Yet"
      description="Your purchased tickets will appear here. Book your first event to get started!"
      variant="minimal"
    />
  );
}

export function NoBadges() {
  return (
    <EnhancedEmptyState
      icon={Award}
      title="No Badges Earned"
      description="Attend events and complete challenges to earn exclusive badges and unlock rewards!"
      variant="minimal"
    />
  );
}

export function ErrorState({
  onRetry,
  errorMessage,
}: {
  onRetry?: () => void;
  errorMessage?: string;
}) {
  return (
    <EnhancedEmptyState
      icon={AlertCircle}
      title="Something Went Wrong"
      description={
        errorMessage || "We encountered an error loading this content. Please try again."
      }
      actionLabel={onRetry ? "Try Again" : undefined}
      onAction={onRetry}
    />
  );
}

export function MaintenanceMode() {
  return (
    <EnhancedEmptyState
      icon={Wrench}
      title="Under Maintenance"
      description="We're making some improvements. We'll be back shortly. Thanks for your patience!"
      variant="minimal"
    />
  );
}

export function PermissionDenied({
  onGoBack,
}: {
  onGoBack?: () => void;
}) {
  return (
    <EnhancedEmptyState
      icon={ShieldAlert}
      title="Access Denied"
      description="You don't have permission to view this content. Contact support if you think this is a mistake."
      actionLabel={onGoBack ? "Go Back" : undefined}
      onAction={onGoBack}
    />
  );
}

export function AccountSuspended({
  onContactSupport,
}: {
  onContactSupport?: () => void;
}) {
  return (
    <EnhancedEmptyState
      icon={Ban}
      title="Account Suspended"
      description="Your account has been temporarily suspended. Please contact our support team for assistance."
      actionLabel={onContactSupport ? "Contact Support" : undefined}
      onAction={onContactSupport}
      variant="minimal"
    />
  );
}