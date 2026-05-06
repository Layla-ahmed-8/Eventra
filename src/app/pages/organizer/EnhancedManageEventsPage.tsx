import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';

import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import {
  Plus,
  Search,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  Eye,
  TrendingUp,
  Clock,
  CheckCircle,
  Menu,
  Bell,
  X,
  Filter,
  Download,
  Share2,
  LayoutDashboard,
  BarChart3,
  User,
  PlusCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../utils/designSystem';
import { Logo } from '../../components/brand/Logo';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'sonner';


export default function EnhancedManageEventsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const events = [
    {
      id: '1',
      title: 'Tech Innovation Summit 2026',
      date: 'Feb 15, 2026',
      time: '9:00 AM',
      location: 'SF Convention Center',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      attendees: 423,
      capacity: 500,
      revenue: 126570,
      status: 'published',
      views: 2847,
      category: 'tech',
    },
    {
      id: '2',
      title: 'Summer Music Festival',
      date: 'Jul 20, 2026',
      time: '2:00 PM',
      location: 'Central Park, NYC',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop',
      attendees: 1847,
      capacity: 2000,
      revenue: 275203,
      status: 'published',
      views: 5234,
      category: 'music',
    },
    {
      id: '3',
      title: 'Virtual Product Design Workshop',
      date: 'Feb 18, 2026',
      time: '10:00 AM',
      location: 'Online',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      attendees: 32,
      capacity: 50,
      revenue: 2528,
      status: 'published',
      views: 456,
      category: 'workshop',
    },
    {
      id: '4',
      title: 'Business Networking Mixer',
      date: 'Feb 25, 2026',
      time: '6:00 PM',
      location: 'Innovation Hub',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
      attendees: 0,
      capacity: 100,
      revenue: 0,
      status: 'draft',
      views: 0,
      category: 'networking',
    },
    {
      id: '5',
      title: 'Design Thinking Workshop',
      date: 'Jan 15, 2026',
      time: '10:00 AM',
      location: 'Design Studio',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      attendees: 45,
      capacity: 50,
      revenue: 3555,
      status: 'completed',
      views: 823,
      category: 'workshop',
    },
  ];

  const navItems = [
    { label: 'Dashboard', href: '/organizer', icon: LayoutDashboard },
    { label: 'Create Event', href: '/organizer/create', icon: PlusCircle },
    { label: 'My Events', href: '/organizer/events', icon: Calendar },
    { label: 'Analytics', href: '/organizer/analytics', icon: BarChart3 },
    { label: 'Profile', href: '/organizer/profile', icon: User },
  ];

  const menuItems = [
    { icon: TrendingUp, label: 'Dashboard', href: '/organizer' },
    { icon: Calendar, label: 'My Events', href: '/organizer/events' },
    { icon: Plus, label: 'Create Event', href: '/organizer/create' },
  ];

  const statusOptions = [
    { id: 'all', label: 'All Events', count: events.length },
    { id: 'published', label: 'Published', count: events.filter(e => e.status === 'published').length },
    { id: 'draft', label: 'Drafts', count: events.filter(e => e.status === 'draft').length },
    { id: 'completed', label: 'Past Events', count: events.filter(e => e.status === 'completed').length },
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 border-0">Published</Badge>;
      case 'draft':
        return <Badge variant="outline" className="border-neutral-300 dark:border-neutral-600">Draft</Badge>;
      case 'completed':
        return <Badge className="bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 border-0">Completed</Badge>;
      default:
        return null;
    }
  };

  const handleDuplicate = (event: any) => {
    toast.success(`📋 "${event.title}" duplicated!`);
  };

  const handleDelete = (event: any) => {
    toast.error(`🗑️ "${event.title}" deleted`);
  };

  const handleExport = (event: any) => {
    toast.success(`📥 Exporting data for "${event.title}"`);
  };

  return (
    <EventraMainLayout>
        {/* Mobile Header */}
        <header className="md:hidden sticky top-0 z-40 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors lg:hidden"
          >
            <Menu className="h-6 w-6 text-neutral-900 dark:text-neutral-100" />
          </button>

          <Logo size="sm" />

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors relative">
              <Bell className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />
            </button>
            <Button
              onClick={() => navigate('/organizer/create')}
              size="sm"
              className="bg-gradient-to-r from-[#F97316] to-[#FB923C] rounded-xl shadow-lg shadow-[#F97316]/25"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              <span className="hidden sm:inline">Create</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white dark:bg-neutral-900 z-50 overflow-y-auto lg:hidden"
            >
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between mb-4">
                  <Logo size="md" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F97316] to-[#FB923C] flex items-center justify-center text-white font-semibold text-lg">
                    {user?.name?.charAt(0) || 'O'}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">{user?.name || 'Organizer'}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Organizer Account</p>
                  </div>
                </div>
              </div>

              <nav className="p-4">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors mb-1"
                    >
                      <Icon className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto pb-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            My Events
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Manage and track all your events in one place
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-12 pr-4 rounded-2xl"
              />
            </div>
            <Button
              variant="outline"
              className="h-12 px-6 rounded-2xl"
            >
              <Filter className="h-5 w-5 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Status Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
            {statusOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setStatusFilter(option.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap font-medium text-sm transition-all flex-shrink-0",
                  statusFilter === option.id
                    ? "bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white shadow-lg shadow-[#F97316]/25"
                    : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                )}
              >
                {option.label}
                <Badge className={cn(
                  "text-xs",
                  statusFilter === option.id
                    ? "bg-white/20 text-white border-0"
                    : "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border-0"
                )}>
                  {option.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>

        {/* Events List */}
        {filteredEvents.length === 0 ? (
          <Card className="p-12 text-center rounded-3xl">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              <Calendar className="h-10 w-10 text-neutral-400" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              No Events Found
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              {searchQuery ? 'Try adjusting your search terms' : 'Create your first event to get started'}
            </p>
            <Button
              onClick={() => navigate('/organizer/create')}
              className="bg-gradient-to-r from-[#F97316] to-[#FB923C] rounded-2xl"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Event
            </Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-all">
                  <div className="flex flex-col md:flex-row gap-4 p-4">
                    {/* Event Image */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full md:w-48 h-48 rounded-2xl object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => navigate(`/organizer/events/${event.id}`)}
                      />
                      <div className="absolute top-3 left-3">
                        {getStatusBadge(event.status)}
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3
                            className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2 cursor-pointer hover:text-[#F97316] transition-colors line-clamp-2"
                            onClick={() => navigate(`/organizer/events/${event.id}`)}
                          >
                            {event.title}
                          </h3>
                          <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date} • {event.time}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* More Actions */}
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-xl"
                            onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>

                          <AnimatePresence>
                            {selectedEvent === event.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-700 py-2 z-10"
                              >
                                <button
                                  onClick={() => {
                                    navigate(`/organizer/events/${event.id}`);
                                    setSelectedEvent(null);
                                  }}
                                  className="w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center gap-2 text-sm"
                                >
                                  <Eye className="h-4 w-4" />
                                  View Details
                                </button>
                                <button
                                  onClick={() => {
                                    navigate(`/organizer/events/${event.id}/edit`);
                                    setSelectedEvent(null);
                                  }}
                                  className="w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center gap-2 text-sm"
                                >
                                  <Edit className="h-4 w-4" />
                                  Edit Event
                                </button>
                                <button
                                  onClick={() => {
                                    handleDuplicate(event);
                                    setSelectedEvent(null);
                                  }}
                                  className="w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center gap-2 text-sm"
                                >
                                  <Copy className="h-4 w-4" />
                                  Duplicate
                                </button>
                                <button
                                  onClick={() => {
                                    handleExport(event);
                                    setSelectedEvent(null);
                                  }}
                                  className="w-full px-4 py-2 text-left hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center gap-2 text-sm"
                                >
                                  <Download className="h-4 w-4" />
                                  Export Data
                                </button>
                                <div className="h-px bg-neutral-200 dark:bg-neutral-700 my-2" />
                                <button
                                  onClick={() => {
                                    handleDelete(event);
                                    setSelectedEvent(null);
                                  }}
                                  className="w-full px-4 py-2 text-left hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Delete Event
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800">
                          <div className="flex items-center gap-2 mb-1">
                            <Users className="h-4 w-4 text-[#7C3AED]" />
                            <span className="text-xs text-neutral-600 dark:text-neutral-400">Attendees</span>
                          </div>
                          <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                            {event.attendees}/{event.capacity}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800">
                          <div className="flex items-center gap-2 mb-1">
                            <DollarSign className="h-4 w-4 text-[#F97316]" />
                            <span className="text-xs text-neutral-600 dark:text-neutral-400">Revenue</span>
                          </div>
                          <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                            ${(event.revenue / 1000).toFixed(1)}k
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800">
                          <div className="flex items-center gap-2 mb-1">
                            <Eye className="h-4 w-4 text-[#2563EB]" />
                            <span className="text-xs text-neutral-600 dark:text-neutral-400">Views</span>
                          </div>
                          <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                            {event.views.toLocaleString()}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-xs text-neutral-600 dark:text-neutral-400">Fill Rate</span>
                          </div>
                          <p className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                            {Math.round((event.attendees / event.capacity) * 100)}%
                          </p>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/organizer/events/${event.id}`)}
                          className="rounded-xl"
                        >
                          <Eye className="h-4 w-4 mr-1.5" />
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/organizer/events/${event.id}/edit`)}
                          className="rounded-xl"
                        >
                          <Edit className="h-4 w-4 mr-1.5" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl"
                        >
                          <Share2 className="h-4 w-4 mr-1.5" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>

    </EventraMainLayout>
  );
}
