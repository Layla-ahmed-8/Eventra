import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  Plus,
  TrendingUp,
  Users,
  Ticket,
  DollarSign,
  Calendar,
  BarChart3,
  Eye,
  UserCheck,
  Clock,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  Bell,
  Settings,
  LogOut,
  X,
  MapPin,
  Activity,
  Zap,
  LayoutDashboard,
  User,
  PlusCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../utils/designSystem';
import { Logo } from '../../components/brand/Logo';
import { useAuth } from '../../../context/AuthContext';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';

export default function EnhancedOrganizerDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const stats = {
    totalEvents: 24,
    totalRevenue: 48750,
    totalAttendees: 1847,
    avgRating: 4.8,
    revenueChange: 12.5,
    attendeeChange: 8.3,
    upcomingEvents: 5,
    activeTickets: 423,
  };

  const revenueData = [
    { name: 'Week 1', revenue: 8500, attendees: 245 },
    { name: 'Week 2', revenue: 12300, attendees: 340 },
    { name: 'Week 3', revenue: 10200, attendees: 298 },
    { name: 'Week 4', revenue: 15750, attendees: 412 },
  ];

  const upcomingEvents = [
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
      status: 'on-sale',
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
      status: 'selling-fast',
    },
    {
      id: '3',
      title: 'Business Networking Mixer',
      date: 'Feb 25, 2026',
      time: '6:00 PM',
      location: 'Innovation Hub',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
      attendees: 67,
      capacity: 100,
      revenue: 0,
      status: 'draft',
    },
  ];

  const recentActivity = [
    { id: '1', type: 'ticket_sale', event: 'Tech Innovation Summit', amount: 299, time: '5 min ago' },
    { id: '2', type: 'new_rsvp', event: 'Summer Music Festival', count: 12, time: '1 hour ago' },
    { id: '3', type: 'review', event: 'Design Workshop', rating: 5, time: '2 hours ago' },
    { id: '4', type: 'ticket_sale', event: 'Summer Music Festival', amount: 149, time: '3 hours ago' },
  ];

  const navItems = [
    { label: 'Dashboard', href: '/organizer', icon: LayoutDashboard },
    { label: 'Create Event', href: '/organizer/create', icon: PlusCircle },
    { label: 'My Events', href: '/organizer/events', icon: Calendar },
    { label: 'Analytics', href: '/organizer/analytics', icon: BarChart3 },
    { label: 'Profile', href: '/organizer/profile', icon: User },
  ];

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/organizer' },
    { icon: Calendar, label: 'My Events', href: '/organizer/events' },
    { icon: Plus, label: 'Create Event', href: '/organizer/create' },
    { icon: Users, label: 'Attendees', href: '/organizer/attendees' },
    { icon: DollarSign, label: 'Revenue', href: '/organizer/revenue' },
    { icon: Settings, label: 'Settings', href: '/organizer/settings' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'on-sale':
        return <Badge className="bg-green-500 text-white border-0">On Sale</Badge>;
      case 'selling-fast':
        return <Badge className="bg-[#F97316] text-white border-0">🔥 Selling Fast</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      default:
        return null;
    }
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
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F97316] rounded-full"></span>
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

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors w-full text-red-600 dark:text-red-400"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto pb-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'Organizer'}! 👋
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Here's what's happening with your events
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 rounded-3xl shadow-lg bg-gradient-to-br from-[#F97316] to-[#FB923C] border-0">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 text-xs">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                {stats.revenueChange}%
              </Badge>
            </div>
            <p className="text-white/80 text-sm mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-white">${(stats.totalRevenue / 1000).toFixed(1)}k</p>
          </Card>

          <Card className="p-6 rounded-3xl shadow-lg bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] border-0">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 text-xs">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                {stats.attendeeChange}%
              </Badge>
            </div>
            <p className="text-white/80 text-sm mb-1">Total Attendees</p>
            <p className="text-3xl font-bold text-white">{stats.totalAttendees.toLocaleString()}</p>
          </Card>

          <Card className="p-6 rounded-3xl shadow-lg border-2 border-neutral-200 dark:border-neutral-800">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#DBEAFE] dark:bg-[#2563EB]/20 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-[#2563EB]" />
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-1">Active Events</p>
            <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{stats.upcomingEvents}</p>
          </Card>

          <Card className="p-6 rounded-3xl shadow-lg border-2 border-neutral-200 dark:border-neutral-800">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF4ED] dark:bg-[#F97316]/20 flex items-center justify-center">
                <Star className="h-6 w-6 text-[#F97316]" />
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-1">Avg Rating</p>
            <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">{stats.avgRating}</p>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <Card className="p-6 rounded-3xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                  Revenue Overview
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Last 30 days performance
                </p>
              </div>
              <div className="flex gap-2">
                {(['7d', '30d', '90d'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                      timeRange === range
                        ? "bg-[#F97316] text-white"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400"
                    )}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="enhancedOrgRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop key="enhanced-gradient-start" offset="0%" stopColor="#F97316" stopOpacity={0.3} />
                    <stop key="enhanced-gradient-end" offset="100%" stopColor="#F97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <Tooltip />
                <Area
                  key="enhanced-revenue-area"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#F97316"
                  strokeWidth={3}
                  fill="url(#enhancedOrgRevenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Attendee Growth */}
          <Card className="p-6 rounded-3xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                  Attendee Growth
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Registration trends
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="attendees"
                  stroke="#7C3AED"
                  strokeWidth={3}
                  dot={{ fill: '#7C3AED', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
              Your Events
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/organizer/events')}
              className="rounded-xl"
            >
              View All
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card
                key={event.id}
                className="overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-all cursor-pointer group"
                onClick={() => navigate(`/organizer/events/${event.id}`)}
              >
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(event.status)}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                      {event.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{event.location}</span>
                  </div>

                  <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">Capacity</span>
                      <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {event.attendees}/{event.capacity}
                      </span>
                    </div>
                    <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] rounded-full transition-all"
                        style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                      />
                    </div>
                  </div>

                  {event.revenue > 0 && (
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-800">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">Revenue</span>
                      <span className="text-lg font-bold text-[#F97316]">
                        ${(event.revenue / 1000).toFixed(1)}k
                      </span>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="p-6 rounded-3xl shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Recent Activity
            </h3>
            <Activity className="h-5 w-5 text-neutral-400" />
          </div>

          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                  activity.type === 'ticket_sale' && "bg-green-100 dark:bg-green-900/20",
                  activity.type === 'new_rsvp' && "bg-blue-100 dark:bg-blue-900/20",
                  activity.type === 'review' && "bg-yellow-100 dark:bg-yellow-900/20"
                )}>
                  {activity.type === 'ticket_sale' && <DollarSign className="h-5 w-5 text-green-600" />}
                  {activity.type === 'new_rsvp' && <UserCheck className="h-5 w-5 text-blue-600" />}
                  {activity.type === 'review' && <Star className="h-5 w-5 text-yellow-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                    {activity.type === 'ticket_sale' && `Ticket sold - $${activity.amount}`}
                    {activity.type === 'new_rsvp' && `${activity.count} new RSVPs`}
                    {activity.type === 'review' && `New ${activity.rating}-star review`}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                    {activity.event}
                  </p>
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 flex-shrink-0">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </main>
    </EventraMainLayout>
  );
}
