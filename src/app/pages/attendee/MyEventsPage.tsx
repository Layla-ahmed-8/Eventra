import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { EventCard } from '../../components/events/EventCard';
import { useApp } from '../../../context/AppContext';
import { useAuth } from '../../../context/AuthContext';
import { Calendar, Bookmark, History, Compass, Trophy, Users, UserCircle, Wallet } from 'lucide-react';

export default function MyEventsPage() {
  const { events, rsvps, bookmarkedEvents } = useApp();
  const { user } = useAuth();

  const navItems = [
    { label: 'Discover', href: '/discover', icon: Compass },
    { label: 'My Events', href: '/my-events', icon: Calendar },
    { label: 'Calendar', href: '/calendar', icon: Calendar },
    { label: 'Achievements', href: '/achievements', icon: Trophy },
    { label: 'Communities', href: '/communities', icon: Users },
    { label: 'Profile', href: '/profile', icon: UserCircle },
    { label: 'Wallet', href: '/wallet', icon: Wallet },
  ];

  const upcomingEvents = events.filter((event) =>
    rsvps.some((rsvp) => rsvp.eventId === event.id && rsvp.userId === user?.id && new Date(event.date) >= new Date())
  );

  const pastEvents = events.filter((event) =>
    rsvps.some((rsvp) => rsvp.eventId === event.id && rsvp.userId === user?.id && new Date(event.date) < new Date())
  );

  const savedEvents = events.filter((event) =>
    bookmarkedEvents.includes(event.id)
  );

  return (
    <EventraMainLayout>

      <div className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <h1 className="mb-6">My Events</h1>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="upcoming" className="gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming ({upcomingEvents.length})
            </TabsTrigger>
            <TabsTrigger value="saved" className="gap-2">
              <Bookmark className="h-4 w-4" />
              Saved ({savedEvents.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="gap-2">
              <History className="h-4 w-4" />
              Past ({pastEvents.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingEvents.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Calendar className="mx-auto h-12 w-12 text-[#6C3BFF] mb-4" />
                <h3 className="font-semibold text-[#111111] mb-2">No upcoming events</h3>
                <p className="text-sm text-[#777777]">
                  RSVP to events to see them here
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved">
            {savedEvents.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {savedEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Bookmark className="mx-auto h-12 w-12 text-[#6C3BFF] mb-4" />
                <h3 className="font-semibold text-[#111111] mb-2">No saved events</h3>
                <p className="text-sm text-[#777777]">
                  Bookmark events you're interested in
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastEvents.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <History className="mx-auto h-12 w-12 text-[#6C3BFF] mb-4" />
                <h3 className="font-semibold text-[#111111] mb-2">No past events</h3>
                <p className="text-sm text-[#777777]">
                  Events you've attended will appear here
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

    </EventraMainLayout>
  );
}
