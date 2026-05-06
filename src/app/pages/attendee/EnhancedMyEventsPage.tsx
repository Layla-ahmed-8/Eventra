import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import {
  Search,
  Calendar,
  Clock,
  MapPin,
  Ticket,
  QrCode,
  Download,
  Share2,
  ChevronRight,
  CalendarPlus,
  Bell,
  User,
  Menu,
  Home,
  Users,
  Trophy,
  X,
  History,
  Star,
  MessageCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../utils/designSystem';
import { Logo } from '../../components/brand/Logo';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'sonner';
import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';

export default function EnhancedMyEventsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const upcomingEvents = [
    {
      id: '1',
      title: 'Tech Innovation Summit 2026',
      date: 'Feb 15, 2026',
      time: '9:00 AM',
      location: 'SF Convention Center',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      category: 'tech',
      ticketNumber: 'TKT-001-2026',
      status: 'confirmed',
    },
    {
      id: '2',
      title: 'Summer Music Festival',
      date: 'Jul 20, 2026',
      time: '2:00 PM',
      location: 'Central Park, NYC',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=300&fit=crop',
      category: 'music',
      ticketNumber: 'TKT-002-2026',
      status: 'confirmed',
    },
    {
      id: '3',
      title: 'Startup Networking Mixer',
      date: 'Feb 25, 2026',
      time: '6:00 PM',
      location: 'Innovation Hub',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
      category: 'networking',
      ticketNumber: 'TKT-003-2026',
      status: 'confirmed',
    },
  ];

  const pastEvents = [
    {
      id: '4',
      title: 'Design Thinking Workshop',
      date: 'Jan 15, 2026',
      time: '10:00 AM',
      location: 'Design Studio',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
      category: 'workshop',
      rating: 5,
      attended: true,
    },
    {
      id: '5',
      title: 'Food & Wine Tasting',
      date: 'Jan 5, 2026',
      time: '7:00 PM',
      location: 'The Grand Hall',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop',
      category: 'food',
      rating: 4,
      attended: true,
    },
  ];

  const menuItems = [
    { icon: Home, label: 'Discover', href: '/discover' },
    { icon: Ticket, label: 'My Events', href: '/my-events' },
    { icon: Users, label: 'Communities', href: '/communities' },
    { icon: Trophy, label: 'Achievements', href: '/achievements' },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  const handleViewTicket = (event: any) => {
    toast.success('🎟️ Ticket details loaded!');
  };

  const handleAddToCalendar = (event: any) => {
    toast.success('📅 Added to calendar!');
  };

  const handleShare = (event: any) => {
    toast.success('🔗 Event link copied!');
  };

  const filteredUpcoming = upcomingEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPast = pastEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <EventraMainLayout>
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
          >
            <Menu className="h-6 w-6 text-neutral-900 dark:text-neutral-100" />
          </button>

          <Logo size="sm" />

          <button className="p-2 -mr-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors relative">
            <Bell className="h-6 w-6 text-neutral-900 dark:text-neutral-100" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F97316] rounded-full"></span>
          </button>
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
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white dark:bg-neutral-900 z-50 overflow-y-auto"
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
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center text-white font-semibold text-lg">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">{user?.name || 'User'}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{user?.email}</p>
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
      <main className="pb-24">
        {/* Page Header */}
        <div className="bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA] px-4 pt-6 pb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            My Events
          </h1>
          <p className="text-white/90 mb-6">
            Manage your event tickets and history
          </p>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <Input
              type="text"
              placeholder="Search your events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-12 pr-4 bg-white dark:bg-neutral-900 border-0 shadow-xl rounded-2xl"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 py-4 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-16 z-30">
          <div className="flex gap-2 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-2xl">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all",
                activeTab === 'upcoming'
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400"
              )}
            >
              <Calendar className="h-4 w-4 inline mr-2" />
              Upcoming ({filteredUpcoming.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-xl font-semibold text-sm transition-all",
                activeTab === 'past'
                  ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-sm"
                  : "text-neutral-600 dark:text-neutral-400"
              )}
            >
              <History className="h-4 w-4 inline mr-2" />
              Past ({filteredPast.length})
            </button>
          </div>
        </div>

        {/* Event Lists */}
        <div className="px-4 py-6">
          <AnimatePresence mode="wait">
            {activeTab === 'upcoming' && (
              <motion.div
                key="upcoming"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {filteredUpcoming.length === 0 ? (
                  <Card className="p-12 text-center rounded-3xl">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                      <Ticket className="h-10 w-10 text-neutral-400" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      No Upcoming Events
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                      Discover and RSVP to amazing events near you
                    </p>
                    <Button
                      onClick={() => navigate('/discover')}
                      className="bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] rounded-2xl"
                    >
                      <CalendarPlus className="h-5 w-5 mr-2" />
                      Discover Events
                    </Button>
                  </Card>
                ) : (
                  filteredUpcoming.map((event) => (
                    <Card
                      key={event.id}
                      className="overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <div className="flex gap-4 p-4">
                        {/* Event Image */}
                        <Link to={`/events/${event.id}`} className="relative flex-shrink-0">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-24 h-24 rounded-2xl object-cover"
                          />
                          <Badge className="absolute -top-2 -right-2 bg-green-500 text-white border-0 text-xs">
                            Confirmed
                          </Badge>
                        </Link>

                        {/* Event Info */}
                        <div className="flex-1 min-w-0">
                          <Link to={`/events/${event.id}`}>
                            <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2">
                              {event.title}
                            </h3>
                          </Link>
                          
                          <div className="space-y-1.5 mb-3">
                            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date} • {event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                              <MapPin className="h-4 w-4" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewTicket(event)}
                              className="flex-1 rounded-xl text-xs"
                            >
                              <QrCode className="h-3.5 w-3.5 mr-1.5" />
                              Ticket
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAddToCalendar(event)}
                              className="rounded-xl"
                            >
                              <CalendarPlus className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleShare(event)}
                              className="rounded-xl"
                            >
                              <Share2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Ticket Number */}
                      <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
                        <span className="text-xs text-neutral-600 dark:text-neutral-400">
                          Ticket: {event.ticketNumber}
                        </span>
                        <button className="text-xs font-medium text-[#7C3AED] hover:text-[#8B5CF6]">
                          View Details →
                        </button>
                      </div>
                    </Card>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === 'past' && (
              <motion.div
                key="past"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                {filteredPast.length === 0 ? (
                  <Card className="p-12 text-center rounded-3xl">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                      <History className="h-10 w-10 text-neutral-400" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                      No Past Events
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Your event history will appear here
                    </p>
                  </Card>
                ) : (
                  filteredPast.map((event) => (
                    <Card
                      key={event.id}
                      className="overflow-hidden rounded-3xl shadow-lg"
                    >
                      <div className="flex gap-4 p-4">
                        {/* Event Image */}
                        <Link to={`/events/${event.id}`} className="flex-shrink-0">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-24 h-24 rounded-2xl object-cover opacity-90"
                          />
                        </Link>

                        {/* Event Info */}
                        <div className="flex-1 min-w-0">
                          <Link to={`/events/${event.id}`}>
                            <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-2">
                              {event.title}
                            </h3>
                          </Link>
                          
                          <div className="space-y-1.5 mb-3">
                            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date} • {event.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                              <MapPin className="h-4 w-4" />
                              <span className="truncate">{event.location}</span>
                            </div>
                            {event.attended && (
                              <Badge variant="outline" className="text-green-600 border-green-600">
                                ✓ Attended
                              </Badge>
                            )}
                          </div>

                          {/* Rating */}
                          {event.rating && (
                            <div className="flex items-center gap-1">
                              <span className="text-sm text-neutral-600 dark:text-neutral-400">Your rating:</span>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={cn(
                                      "h-4 w-4",
                                      i < event.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-neutral-300 dark:text-neutral-600"
                                    )}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 rounded-xl text-xs"
                        >
                          <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
                          Review
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 rounded-xl text-xs"
                        >
                          <Download className="h-3.5 w-3.5 mr-1.5" />
                          Receipt
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-t border-neutral-200 dark:border-neutral-800 px-2 py-2 z-30">
        <div className="flex items-center justify-around">
          <Link to="/discover" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Discover</span>
          </Link>
          <Link to="/my-events" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl bg-[#EDE9FE] dark:bg-[#7C3AED]/20 text-[#7C3AED]">
            <Ticket className="h-5 w-5" />
            <span className="text-xs font-medium">Events</span>
          </Link>
          <Link to="/communities" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
            <Users className="h-5 w-5" />
            <span className="text-xs font-medium">Community</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </EventraMainLayout>
  );
}
