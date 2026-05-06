export type UserRole = 'attendee' | 'organizer' | 'admin';

export type EventCategory = 
  | 'technology' 
  | 'business' 
  | 'arts' 
  | 'music' 
  | 'sports' 
  | 'food' 
  | 'education' 
  | 'health' 
  | 'networking'
  | 'other';

export type EventType = 'in-person' | 'virtual' | 'hybrid';

export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  location?: string;
  interests?: EventCategory[];
  joinedDate: string;
  verified: boolean;
  points: number;
  level: number;
  badges: Badge[];
  followersCount: number;
  followingCount: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  type: EventType;
  status: EventStatus;
  coverImage: string;
  date: string;
  endDate?: string;
  time: string;
  endTime?: string;
  location?: string;
  virtualLink?: string;
  price: number;
  capacity: number;
  attendeeCount: number;
  organizerId: string;
  organizer: User;
  tags: string[];
  featured: boolean;
  trending: boolean;
  createdAt: string;
  communityId?: string;
}

export interface RSVP {
  id: string;
  eventId: string;
  userId: string;
  status: 'confirmed' | 'cancelled' | 'waitlist';
  checkedIn: boolean;
  createdAt: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  memberCount: number;
  postCount: number;
  category: EventCategory;
  isPrivate: boolean;
  createdAt: string;
}

export interface Post {
  id: string;
  communityId: string;
  authorId: string;
  author: User;
  content: string;
  images?: string[];
  type: 'discussion' | 'poll' | 'qa';
  upvotes: number;
  commentCount: number;
  createdAt: string;
  poll?: {
    question: string;
    options: Array<{
      id: string;
      text: string;
      votes: number;
    }>;
    totalVotes: number;
  };
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author: User;
  content: string;
  upvotes: number;
  createdAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earnedAt?: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'reminder' | 'update' | 'rsvp' | 'community' | 'achievement' | 'recommendation';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: string;
  icon?: string;
}

export interface AnalyticsData {
  eventId: string;
  views: number;
  rsvps: number;
  attendance: number;
  revenue: number;
  engagementScore: number;
  conversionRate: number;
  trafficSources: Array<{
    source: string;
    count: number;
  }>;
  dailyViews: Array<{
    date: string;
    views: number;
  }>;
  demographics: {
    ageGroups: Array<{
      range: string;
      count: number;
    }>;
    locations: Array<{
      city: string;
      count: number;
    }>;
  };
}
