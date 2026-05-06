import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Card } from '../../components/ui/card';
import { AIInsightCard } from '../../components/ai/AIInsightCard';
import { AISection } from '../../components/ai/AISection';
import { AISearchModal } from '../../components/ai/AISearchModal';
import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';
import { Search, Sparkles, TrendingUp, ArrowRight, MapPin, Calendar, Users, Zap } from 'lucide-react';
import { EventSummary, getTrendingEvents } from '../../services/eventService';

const filterChips = ['Date', 'Category', 'Location', 'Price'] as const;

export default function ModernDiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [trendingEvents, setTrendingEvents] = useState<EventSummary[]>([]);
  const [aiSearchOpen, setAiSearchOpen] = useState(false);

  const aiSuggestions = [
    {
      title: 'Perfect Match for You',
      description: 'Based on your attendance at "Design Summit", we think you\'ll love the "UX Conference 2026"',
      type: 'suggestion' as const,
    },
    {
      title: 'Rising Popularity',
      description: '"Tech Startup Weekend" is trending with 40% more RSVPs this week',
      type: 'prediction' as const,
    },
    {
      title: 'Nearby This Weekend',
      description: '5 tech events happening within 10 miles of you',
      type: 'recommendation' as const,
    },
  ];

  useEffect(() => {
    getTrendingEvents().then(setTrendingEvents);
  }, []);

  const handleEventClick = (id: string | number) => {
    window.location.href = `/events/${String(id)}`;
  };

  return (
    <EventraMainLayout>
      <AISearchModal open={aiSearchOpen} onOpenChange={setAiSearchOpen} />

      {/* Top Bar */}
      <div className="mb-8 space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-neutral-900">Discover events</h1>
            <p className="mt-2 text-neutral-600">AI-ranked feed based on your event goals</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
          <Input
            placeholder="Search events, venues, or vibes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setAiSearchOpen(true)}
            className="h-12 pl-12 pr-12"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            onClick={() => setAiSearchOpen(true)}
          >
            <Sparkles className="h-4 w-4" />
          </Button>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-3">
          {filterChips.map((chip) => (
            <Badge
              key={chip}
              variant="outline"
              className="cursor-pointer px-4 py-2 text-sm hover:bg-neutral-50"
            >
              {chip}
            </Badge>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <AISection
        title="For You"
        subtitle="AI-powered recommendations based on your interests"
        className="mb-12"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {aiSuggestions.map((suggestion, index) => (
            <AIInsightCard
              key={index}
              title={suggestion.title}
              description={suggestion.description}
              type={suggestion.type}
              action={
                <Button size="sm" className="w-full">
                  View Details
                </Button>
              }
            />
          ))}
        </div>
      </AISection>

      {/* Trending Events */}
      <div className="space-y-6 mb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/30">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">Trending Now</h2>
              <p className="text-sm text-neutral-600">Most popular events this week</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trendingEvents.map((event) => (
            <Card
              key={event.id}
              className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              onClick={() => handleEventClick(event.id)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex max-w-[85%] flex-wrap gap-2">
                  <Badge
                    className="border-0 bg-primary-600/95 text-white backdrop-blur-sm"
                    title="Because you liked similar events and your interests match this host."
                  >
                    Recommended for you
                  </Badge>
                  <Badge className="bg-white/90 text-primary-700 backdrop-blur-sm">
                    {event.category}
                  </Badge>
                  {event.trending && (
                    <Badge className="flex items-center gap-1 bg-secondary-500 text-white animate-pulse">
                      <TrendingUp className="w-3 h-3" />
                      Trending
                    </Badge>
                  )}
                </div>

                {/* Price */}
                {event.price > 0 ? (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-gray-900">
                    ${event.price}
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 px-3 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                    Free
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <h4 className="font-semibold text-lg line-clamp-2">{event.title}</h4>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{event.attendeeCount.toLocaleString()} attending</span>
                  </div>
                </div>

                <Button className="w-full">
                  RSVP now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <Button variant="outline" size="lg">
            Load More Events
          </Button>
        </div>
      </div>

      {/* Near You Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-900">Near You</h2>
            <p className="text-sm text-neutral-600">Events happening in your area</p>
          </div>
        </div>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500 text-white">
              <Zap className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-2">Enable Location for Better Suggestions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Get personalized event recommendations based on your location
              </p>
              <Button variant="default">
                Enable Location
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </EventraMainLayout>
  );
}