// Event Type System - Complete Coverage
export const EVENT_TYPES = {
  IN_PERSON: 'in-person',
  VIRTUAL: 'virtual',
  HYBRID: 'hybrid',
} as const;

export const EVENT_CATEGORIES = {
  WORKSHOP: 'workshop',
  CONFERENCE: 'conference',
  NETWORKING: 'networking',
  WEBINAR: 'webinar',
  FESTIVAL: 'festival',
  MEETUP: 'meetup',
  CORPORATE: 'corporate',
  UNIVERSITY: 'university',
  RELIGIOUS: 'religious',
  SPORTS: 'sports',
  CULTURAL: 'cultural',
  MUSIC: 'music',
  FOOD: 'food',
  TECH: 'tech',
  ARTS: 'arts',
  FITNESS: 'fitness',
  EDUCATION: 'education',
  WELLNESS: 'wellness',
  SOCIAL: 'social',
} as const;

export const EVENT_PRICING = {
  FREE: 'free',
  PAID: 'paid',
} as const;

export const EVENT_ACCESS = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  INVITE_ONLY: 'invite-only',
} as const;

export const EVENT_DURATION = {
  SINGLE_DAY: 'single-day',
  MULTI_DAY: 'multi-day',
  RECURRING: 'recurring',
} as const;

export type EventType = typeof EVENT_TYPES[keyof typeof EVENT_TYPES];
export type EventCategory = typeof EVENT_CATEGORIES[keyof typeof EVENT_CATEGORIES];
export type EventPricing = typeof EVENT_PRICING[keyof typeof EVENT_PRICING];
export type EventAccess = typeof EVENT_ACCESS[keyof typeof EVENT_ACCESS];
export type EventDuration = typeof EVENT_DURATION[keyof typeof EVENT_DURATION];

export interface EventMetadata {
  type: EventType;
  category: EventCategory;
  pricing: EventPricing;
  access: EventAccess;
  duration: EventDuration;
  capacity?: number;
  attendeeCount?: number;
  multiDayDates?: string[];
  recurringSchedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    endDate?: string;
  };
}

// Visual configurations for event types
export const EVENT_TYPE_CONFIG = {
  [EVENT_TYPES.IN_PERSON]: {
    label: 'In-Person',
    color: 'from-[#7C3AED] to-[#8B5CF6]',
    bgColor: 'bg-[#EDE9FE]',
    textColor: 'text-[#7C3AED]',
    icon: '📍',
  },
  [EVENT_TYPES.VIRTUAL]: {
    label: 'Virtual',
    color: 'from-[#2563EB] to-[#3B82F6]',
    bgColor: 'bg-[#DBEAFE]',
    textColor: 'text-[#2563EB]',
    icon: '💻',
  },
  [EVENT_TYPES.HYBRID]: {
    label: 'Hybrid',
    color: 'from-[#10B981] to-[#059669]',
    bgColor: 'bg-[#D1FAE5]',
    textColor: 'text-[#10B981]',
    icon: '🔄',
  },
} as const;

export const EVENT_CATEGORY_CONFIG = {
  [EVENT_CATEGORIES.WORKSHOP]: { label: 'Workshop', icon: '🛠️', color: '#7C3AED' },
  [EVENT_CATEGORIES.CONFERENCE]: { label: 'Conference', icon: '🎤', color: '#2563EB' },
  [EVENT_CATEGORIES.NETWORKING]: { label: 'Networking', icon: '🤝', color: '#F97316' },
  [EVENT_CATEGORIES.WEBINAR]: { label: 'Webinar', icon: '📹', color: '#2563EB' },
  [EVENT_CATEGORIES.FESTIVAL]: { label: 'Festival', icon: '🎪', color: '#EC4899' },
  [EVENT_CATEGORIES.MEETUP]: { label: 'Meetup', icon: '👥', color: '#8B5CF6' },
  [EVENT_CATEGORIES.CORPORATE]: { label: 'Corporate', icon: '💼', color: '#475569' },
  [EVENT_CATEGORIES.UNIVERSITY]: { label: 'University', icon: '🎓', color: '#6366F1' },
  [EVENT_CATEGORIES.RELIGIOUS]: { label: 'Religious', icon: '🕊️', color: '#8B5CF6' },
  [EVENT_CATEGORIES.SPORTS]: { label: 'Sports', icon: '⚽', color: '#10B981' },
  [EVENT_CATEGORIES.CULTURAL]: { label: 'Cultural', icon: '🎭', color: '#EC4899' },
  [EVENT_CATEGORIES.MUSIC]: { label: 'Music', icon: '🎵', color: '#F97316' },
  [EVENT_CATEGORIES.FOOD]: { label: 'Food', icon: '🍽️', color: '#FB923C' },
  [EVENT_CATEGORIES.TECH]: { label: 'Tech', icon: '💻', color: '#2563EB' },
  [EVENT_CATEGORIES.ARTS]: { label: 'Arts', icon: '🎨', color: '#EC4899' },
  [EVENT_CATEGORIES.FITNESS]: { label: 'Fitness', icon: '💪', color: '#10B981' },
  [EVENT_CATEGORIES.EDUCATION]: { label: 'Education', icon: '📚', color: '#8B5CF6' },
  [EVENT_CATEGORIES.WELLNESS]: { label: 'Wellness', icon: '🧘', color: '#06B6D4' },
  [EVENT_CATEGORIES.SOCIAL]: { label: 'Social', icon: '🎉', color: '#D946EF' },
} as const;

export const EVENT_PRICING_CONFIG = {
  [EVENT_PRICING.FREE]: {
    label: 'Free',
    color: 'from-[#10B981] to-[#059669]',
    bgColor: 'bg-[#D1FAE5]',
    textColor: 'text-[#10B981]',
  },
  [EVENT_PRICING.PAID]: {
    label: 'Paid',
    color: 'from-[#F97316] to-[#FB923C]',
    bgColor: 'bg-[#FFF4ED]',
    textColor: 'text-[#F97316]',
  },
} as const;

export const EVENT_ACCESS_CONFIG = {
  [EVENT_ACCESS.PUBLIC]: {
    label: 'Public',
    icon: '🌐',
  },
  [EVENT_ACCESS.PRIVATE]: {
    label: 'Private',
    icon: '🔒',
  },
  [EVENT_ACCESS.INVITE_ONLY]: {
    label: 'Invite Only',
    icon: '✉️',
  },
} as const;

export const EVENT_DURATION_CONFIG = {
  [EVENT_DURATION.SINGLE_DAY]: {
    label: 'Single Day',
    icon: '📅',
  },
  [EVENT_DURATION.MULTI_DAY]: {
    label: 'Multi-Day',
    icon: '📆',
  },
  [EVENT_DURATION.RECURRING]: {
    label: 'Recurring',
    icon: '🔁',
  },
} as const;

// Helper functions
export const getEventTypeConfig = (type: EventType) => EVENT_TYPE_CONFIG[type];
export const getEventCategoryConfig = (category: EventCategory) => EVENT_CATEGORY_CONFIG[category];
export const getEventPricingConfig = (pricing: EventPricing) => EVENT_PRICING_CONFIG[pricing];
export const getEventAccessConfig = (access: EventAccess) => EVENT_ACCESS_CONFIG[access];
export const getEventDurationConfig = (duration: EventDuration) => EVENT_DURATION_CONFIG[duration];

// Check if event is at capacity
export const isEventAtCapacity = (attendeeCount: number, capacity?: number): boolean => {
  if (!capacity) return false;
  return attendeeCount >= capacity;
};

// Get capacity status
export const getCapacityStatus = (attendeeCount: number, capacity?: number): {
  percentage: number;
  status: 'available' | 'filling' | 'almost-full' | 'full';
  label: string;
} => {
  if (!capacity) {
    return {
      percentage: 0,
      status: 'available',
      label: `${attendeeCount} attending`,
    };
  }

  const percentage = (attendeeCount / capacity) * 100;
  
  if (percentage >= 100) {
    return { percentage: 100, status: 'full', label: 'Sold Out' };
  } else if (percentage >= 90) {
    return { percentage, status: 'almost-full', label: `${capacity - attendeeCount} spots left` };
  } else if (percentage >= 70) {
    return { percentage, status: 'filling', label: `${capacity - attendeeCount} spots left` };
  } else {
    return { percentage, status: 'available', label: `${capacity - attendeeCount} spots available` };
  }
};
