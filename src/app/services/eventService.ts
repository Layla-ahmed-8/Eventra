export interface EventSummary {
  id: number | string;
  title: string;
  imageUrl: string;
  date: string;
  location: string;
  attendeeCount: number;
  capacity: number;
  category: string;
  price: number;
  trending: boolean;
}

const mockTrendingEvents: EventSummary[] = [
  {
    id: 1,
    title: 'AI Innovation Summit 2026',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    date: 'Apr 28, 2026',
    location: 'San Francisco',
    attendeeCount: 1200,
    capacity: 1500,
    category: 'Technology',
    price: 299,
    trending: true,
  },
  {
    id: 2,
    title: 'Music Festival Weekend',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&h=400&fit=crop',
    date: 'May 15-17, 2026',
    location: 'Central Park NYC',
    attendeeCount: 5000,
    capacity: 6000,
    category: 'Music',
    price: 149,
    trending: true,
  },
  {
    id: 3,
    title: 'Design Thinking Workshop',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
    date: 'Apr 30, 2026',
    location: 'Online',
    attendeeCount: 450,
    capacity: 500,
    category: 'Design',
    price: 0,
    trending: false,
  },
];

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getTrendingEvents(): Promise<EventSummary[]> {
  await wait(250);
  return mockTrendingEvents;
}
