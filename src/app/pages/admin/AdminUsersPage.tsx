import { useState } from 'react';
import { Search, Filter, MoreVertical, Ban, CheckCircle, AlertTriangle, Mail, Shield, LayoutDashboard, Users, Calendar, FileText, Settings } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';


const mockUsers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    role: 'attendee',
    status: 'active',
    joinDate: '2026-01-15',
    eventsAttended: 12,
    flags: 0,
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    role: 'organizer',
    status: 'active',
    joinDate: '2025-11-20',
    eventsCreated: 8,
    flags: 0,
  },
  {
    id: 3,
    name: 'Emma Davis',
    email: 'emma.d@example.com',
    role: 'attendee',
    status: 'suspended',
    joinDate: '2026-02-10',
    eventsAttended: 5,
    flags: 3,
  },
  {
    id: 4,
    name: 'James Wilson',
    email: 'james.w@example.com',
    role: 'organizer',
    status: 'pending',
    joinDate: '2026-04-18',
    eventsCreated: 0,
    flags: 0,
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    email: 'lisa.a@example.com',
    role: 'attendee',
    status: 'active',
    joinDate: '2025-12-05',
    eventsAttended: 24,
    flags: 0,
  },
];

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTab, setSelectedTab] = useState('all');

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'User Management', href: '/admin/users', icon: Users },
    { label: 'Event Moderation', href: '/admin/events', icon: Calendar },
    { label: 'Reports & Analytics', href: '/admin/reports', icon: FileText },
    { label: 'Platform Settings', href: '/admin/settings', icon: Settings },
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (selectedTab === 'all') return matchesSearch;
    if (selectedTab === 'flagged') return matchesSearch && user.flags > 0;
    if (selectedTab === 'suspended') return matchesSearch && user.status === 'suspended';
    if (selectedTab === 'pending') return matchesSearch && user.status === 'pending';

    return matchesSearch;
  });

  const stats = {
    total: mockUsers.length,
    active: mockUsers.filter(u => u.status === 'active').length,
    suspended: mockUsers.filter(u => u.status === 'suspended').length,
    flagged: mockUsers.filter(u => u.flags > 0).length,
  };

  return (
    <EventraMainLayout>
      {/* Header */}
      <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-neutral-800 sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="mb-4">User Management</h1>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users by name or email..."
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
              <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              <div className="text-xs text-gray-600 mt-1">Active</div>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.suspended}</div>
              <div className="text-xs text-gray-600 mt-1">Suspended</div>
            </Card>
            <Card className="p-3 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.flagged}</div>
              <div className="text-xs text-gray-600 mt-1">Flagged</div>
            </Card>
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="flagged">Flagged</TabsTrigger>
            <TabsTrigger value="suspended">Suspended</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="space-y-3 mt-0">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <Card key={user.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="truncate">{user.name}</h3>
                          <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="h-4 w-4 mr-2" />
                              View Activity
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {user.status === 'active' ? (
                              <DropdownMenuItem className="text-red-600">
                                <Ban className="h-4 w-4 mr-2" />
                                Suspend User
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-green-600">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Activate User
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <Badge variant={user.role === 'organizer' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                        <Badge
                          variant={
                            user.status === 'active' ? 'default' :
                            user.status === 'suspended' ? 'destructive' :
                            'secondary'
                          }
                        >
                          {user.status}
                        </Badge>
                        {user.flags > 0 && (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {user.flags} flags
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-600 mt-2">
                        <span>Joined {user.joinDate}</span>
                        {user.role === 'attendee' && (
                          <span>{user.eventsAttended} events attended</span>
                        )}
                        {user.role === 'organizer' && (
                          <span>{user.eventsCreated} events created</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <div className="text-gray-400 mb-2">No users found</div>
                <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

    </EventraMainLayout>
  );
}
