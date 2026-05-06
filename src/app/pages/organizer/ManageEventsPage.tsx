import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Calendar, Users, Eye, Edit, Trash2, LayoutDashboard, PlusCircle, BarChart3, User } from 'lucide-react';
import { mockEvents } from '../../../data/mockData';
import { useAuth } from '../../../context/AuthContext';

export default function ManageEventsPage() {
  const { user } = useAuth();
  const myEvents = mockEvents.filter((e) => e.organizerId === user?.id);
  const activeEvents = myEvents.filter((e) => e.status === 'published');
  const draftEvents = myEvents.filter((e) => e.status === 'draft');

  const navItems = [
    { label: 'Dashboard', href: '/organizer', icon: LayoutDashboard },
    { label: 'Create Event', href: '/organizer/create', icon: PlusCircle },
    { label: 'My Events', href: '/organizer/events', icon: Calendar },
    { label: 'Analytics', href: '/organizer/analytics', icon: BarChart3 },
    { label: 'Profile', href: '/organizer/profile', icon: User },
  ];

  return (
    <EventraMainLayout>

      <div className="container mx-auto px-4 py-6">
        <h1 className="mb-6">Manage Events</h1>

        <Tabs defaultValue="active">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Active ({activeEvents.length})</TabsTrigger>
            <TabsTrigger value="draft">Drafts ({draftEvents.length})</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="space-y-4">
              {activeEvents.map((event) => (
                <Card key={event.id} className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <img
                      src={event.coverImage}
                      alt={event.title}
                      className="w-full md:w-48 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-[#111111] mb-1">{event.title}</h3>
                          <Badge variant="outline" className="capitalize">
                            {event.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-[#777777] my-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {event.attendeeCount} / {event.capacity}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          2.5k views
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          View Attendees
                        </Button>
                        <Button size="sm" variant="outline" className="text-[#EF4444]">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="draft">
            <div className="py-12 text-center">
              <p className="text-[#777777]">No draft events</p>
            </div>
          </TabsContent>

          <TabsContent value="past">
            <div className="py-12 text-center">
              <p className="text-[#777777]">No past events</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

    </EventraMainLayout>
  );
}
