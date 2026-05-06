import { useState } from 'react';
import { Search, Filter, MoreVertical, CheckCircle, XCircle, AlertTriangle, Eye, Flag, LayoutDashboard, Users, Calendar, FileText, Settings } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';


const mockEvents = [
  {
    id: 1,
    title: 'Tech Innovation Summit 2026',
    organizer: 'Michael Chen',
    status: 'approved',
    date: '2026-04-22',
    attendees: 1200,
    flags: 0,
    category: 'Technology',
    submittedDate: '2026-03-15',
  },
  {
    id: 2,
    title: 'Startup Pitch Night',
    organizer: 'Sarah Johnson',
    status: 'pending',
    date: '2026-04-24',
    attendees: 0,
    flags: 0,
    category: 'Business',
    submittedDate: '2026-04-20',
  },
  {
    id: 3,
    title: 'Controversial Political Rally',
    organizer: 'Unknown User',
    status: 'flagged',
    date: '2026-04-30',
    attendees: 45,
    flags: 8,
    category: 'Politics',
    submittedDate: '2026-04-15',
  },
  {
    id: 4,
    title: 'Design Thinking Workshop',
    organizer: 'Emma Davis',
    status: 'approved',
    date: '2026-04-28',
    attendees: 650,
    flags: 0,
    category: 'Design',
    submittedDate: '2026-03-20',
  },
  {
    id: 5,
    title: 'Community Cleanup Drive',
    organizer: 'Lisa Anderson',
    status: 'rejected',
    date: '2026-05-05',
    attendees: 0,
    flags: 0,
    category: 'Community',
    submittedDate: '2026-04-18',
  },
];

export default function AdminEventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'User Management', href: '/admin/users', icon: Users },
    { label: 'Event Moderation', href: '/admin/events', icon: Calendar },
    { label: 'Reports & Analytics', href: '/admin/reports', icon: FileText },
    { label: 'Platform Settings', href: '/admin/settings', icon: Settings },
  ];

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedTab === 'all') return matchesSearch;
    if (selectedTab === 'pending') return matchesSearch && event.status === 'pending';
    if (selectedTab === 'flagged') return matchesSearch && (event.flags > 0 || event.status === 'flagged');
    if (selectedTab === 'approved') return matchesSearch && event.status === 'approved';

    return matchesSearch;
  });

  const stats = {
    total: mockEvents.length,
    pending: mockEvents.filter(e => e.status === 'pending').length,
    flagged: mockEvents.filter(e => e.flags > 0 || e.status === 'flagged').length,
    approved: mockEvents.filter(e => e.status === 'approved').length,
  };

  return (
    <EventraMainLayout>
      {/* Header */}
      <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-neutral-800 sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="mb-4">Event Moderation</h1>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2">
            <Card className="p-3 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
              <div className="text-xs text-gray-600 mt-1">Total</div>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
              <div className="text-xs text-gray-600 mt-1">Pending</div>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.flagged}</div>
              <div className="text-xs text-gray-600 mt-1">Flagged</div>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
              <div className="text-xs text-gray-600 mt-1">Approved</div>
            </Card>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">
              Pending
              {stats.pending > 0 && (
                <Badge className="ml-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {stats.pending}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="flagged">
              Flagged
              {stats.flagged > 0 && (
                <Badge variant="destructive" className="ml-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {stats.flagged}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="space-y-3 mt-0">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <Card key={event.id} className="p-4">
                  <div className="space-y-3">
                    {/* Event Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="truncate">{event.title}</h3>
                        <p className="text-sm text-gray-500">by {event.organizer}</p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Flag className="h-4 w-4 mr-2" />
                            Flag Event
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-green-600">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    {/* Event Info */}
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant={
                          event.status === 'approved' ? 'default' :
                          event.status === 'pending' ? 'secondary' :
                          event.status === 'flagged' ? 'destructive' :
                          'outline'
                        }
                      >
                        {event.status}
                      </Badge>
                      <Badge variant="outline">{event.category}</Badge>
                      {event.flags > 0 && (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          {event.flags} flags
                        </Badge>
                      )}
                    </div>

                    {/* Event Details */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div>
                        <span className="font-medium">Event Date:</span> {event.date}
                      </div>
                      <div>
                        <span className="font-medium">Attendees:</span> {event.attendees}
                      </div>
                      <div>
                        <span className="font-medium">Submitted:</span> {event.submittedDate}
                      </div>
                      <div>
                        <span className="font-medium">Status:</span> {event.status}
                      </div>
                    </div>

                    {/* Action Buttons for Pending Events */}
                    {event.status === 'pending' && (
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="default" className="flex-1">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    )}

                    {/* Warning for Flagged Events */}
                    {event.flags > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                          <div className="text-xs text-red-700">
                            This event has been flagged {event.flags} times for policy violations. Review required.
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <div className="text-gray-400 mb-2">No events found</div>
                <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

    </EventraMainLayout>
  );
}
