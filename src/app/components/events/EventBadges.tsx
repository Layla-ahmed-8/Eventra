import { Badge } from '../ui/badge';
import { 
  EventType, 
  EventCategory, 
  EventPricing,
  EventAccess,
  EventDuration,
  getEventTypeConfig,
  getEventCategoryConfig,
  getEventPricingConfig,
  getEventAccessConfig,
  getEventDurationConfig,
  getCapacityStatus,
} from '../../../utils/eventTypes';
import { AlertCircle, Clock, Users } from 'lucide-react';
import { cn } from '../../../utils/designSystem';

interface EventTypeBadgeProps {
  type: EventType;
  size?: 'sm' | 'md';
}

export function EventTypeBadge({ type, size = 'md' }: EventTypeBadgeProps) {
  const config = getEventTypeConfig(type);
  
  // Handle case where config might be undefined
  if (!config) {
    return null;
  }
  
  return (
    <Badge 
      className={cn(
        config.bgColor,
        config.textColor,
        'border-0 font-medium',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'
      )}
    >
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  );
}

interface EventCategoryBadgeProps {
  category: EventCategory;
  size?: 'sm' | 'md';
}

export function EventCategoryBadge({ category, size = 'md' }: EventCategoryBadgeProps) {
  const config = getEventCategoryConfig(category);
  
  // Handle case where config might be undefined
  if (!config) {
    return null;
  }
  
  return (
    <Badge 
      className={cn(
        'bg-neutral-100 text-neutral-700 border-0 font-medium',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'
      )}
    >
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  );
}

interface EventPricingBadgeProps {
  pricing: EventPricing;
  price?: number;
  size?: 'sm' | 'md';
}

export function EventPricingBadge({ pricing, price, size = 'md' }: EventPricingBadgeProps) {
  const config = getEventPricingConfig(pricing);
  
  // Handle case where config might be undefined
  if (!config) {
    return null;
  }
  
  return (
    <Badge 
      className={cn(
        config.bgColor,
        config.textColor,
        'border-0 font-semibold',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'
      )}
    >
      {pricing === 'free' ? 'FREE' : price ? `$${price}` : 'Paid'}
    </Badge>
  );
}

interface EventAccessBadgeProps {
  access: EventAccess;
  size?: 'sm' | 'md';
}

export function EventAccessBadge({ access, size = 'md' }: EventAccessBadgeProps) {
  const config = getEventAccessConfig(access);
  
  // Handle case where config might be undefined
  if (!config) {
    return null;
  }
  
  return (
    <Badge 
      className={cn(
        'bg-neutral-100 text-neutral-700 border-0 font-medium',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'
      )}
    >
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  );
}

interface EventDurationBadgeProps {
  duration: EventDuration;
  size?: 'sm' | 'md';
  daysCount?: number;
}

export function EventDurationBadge({ duration, size = 'md', daysCount }: EventDurationBadgeProps) {
  const config = getEventDurationConfig(duration);
  
  // Handle case where config might be undefined
  if (!config) {
    return null;
  }
  
  const label = duration === 'multi-day' && daysCount 
    ? `${daysCount} Days`
    : config.label;
  
  return (
    <Badge 
      className={cn(
        'bg-neutral-100 text-neutral-700 border-0 font-medium',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'
      )}
    >
      <Clock className="mr-1 h-3 w-3" />
      {label}
    </Badge>
  );
}

interface EventCapacityBadgeProps {
  attendeeCount: number;
  capacity?: number;
  size?: 'sm' | 'md';
}

export function EventCapacityBadge({ attendeeCount, capacity, size = 'md' }: EventCapacityBadgeProps) {
  const capacityStatus = getCapacityStatus(attendeeCount, capacity);
  
  const bgColors = {
    'available': 'bg-[#D1FAE5] text-[#059669]',
    'filling': 'bg-[#FFF4ED] text-[#F97316]',
    'almost-full': 'bg-[#FEE2E2] text-[#DC2626]',
    'full': 'bg-[#FEE2E2] text-[#DC2626]',
  };
  
  return (
    <Badge 
      className={cn(
        bgColors[capacityStatus.status],
        'border-0 font-medium',
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1'
      )}
    >
      {capacityStatus.status === 'full' ? (
        <>
          <AlertCircle className="mr-1 h-3 w-3" />
          {capacityStatus.label}
        </>
      ) : (
        <>
          <Users className="mr-1 h-3 w-3" />
          {capacityStatus.label}
        </>
      )}
    </Badge>
  );
}

// Combined Badge Group for Event Cards
interface EventBadgeGroupProps {
  type: EventType;
  category: EventCategory;
  pricing: EventPricing;
  price?: number;
  attendeeCount: number;
  capacity?: number;
  access?: EventAccess;
  duration?: EventDuration;
  size?: 'sm' | 'md';
  maxBadges?: number;
}

export function EventBadgeGroup({
  type,
  category,
  pricing,
  price,
  attendeeCount,
  capacity,
  access,
  duration,
  size = 'md',
  maxBadges = 4,
}: EventBadgeGroupProps) {
  const badges = [];
  
  // Always show type and pricing
  badges.push(
    <EventTypeBadge key="type" type={type} size={size} />
  );
  
  badges.push(
    <EventPricingBadge key="pricing" pricing={pricing} price={price} size={size} />
  );
  
  // Add category if space allows
  if (maxBadges > 2) {
    badges.push(
      <EventCategoryBadge key="category" category={category} size={size} />
    );
  }
  
  // Show capacity if filling up or full
  const capacityStatus = getCapacityStatus(attendeeCount, capacity);
  if (capacityStatus.status === 'almost-full' || capacityStatus.status === 'full') {
    badges.push(
      <EventCapacityBadge 
        key="capacity" 
        attendeeCount={attendeeCount} 
        capacity={capacity} 
        size={size}
      />
    );
  }
  
  // Add access badge if private or invite-only
  if (access && access !== 'public' && maxBadges > 3) {
    badges.push(
      <EventAccessBadge key="access" access={access} size={size} />
    );
  }
  
  // Limit to maxBadges
  const displayBadges = badges.slice(0, maxBadges);
  
  return (
    <div className="flex flex-wrap gap-2">
      {displayBadges}
    </div>
  );
}