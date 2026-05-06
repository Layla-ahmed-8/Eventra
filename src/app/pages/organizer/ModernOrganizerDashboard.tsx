import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { AIInsightCard } from '../../components/ai/AIInsightCard';
import { AISection } from '../../components/ai/AISection';
import { StatCard } from '../../components/dashboard/StatCard';
import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';

import {
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  BarChart3,
  Clock,
  MapPin,
  Eye,
  Edit,
  MoreVertical,
  Target,
  Lightbulb,
  Sparkles,
  AlertCircle,
  LayoutDashboard,
  PlusCircle,
  User,
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export default function ModernOrganizerDashboard() {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', href: '/organizer', icon: LayoutDashboard },
    { label: 'Create Event', href: '/organizer/create', icon: PlusCircle },
    { label: 'My Events', href: '/organizer/events', icon: Calendar },
    { label: 'Analytics', href: '/organizer/analytics', icon: BarChart3 },
    { label: 'Profile', href: '/organizer/profile', icon: User },
  ];

  const revenueData = [
    { month: 'Jan', value: 12000 },
    { month: 'Feb', value: 18000 },
    { month: 'Mar', value: 24000 },
    { month: 'Apr', value: 32000 },
  ];

  const aiInsights = [
    {
      title: '95% Attendance Predicted',
      description: 'Your "Tech Summit 2026" is expected to have exceptional turnout based on current RSVP trends and historical data.',
      type: 'prediction' as const,
    },
    {
      title: 'Optimal Event Timing',
      description: 'Saturday 2PM-6PM shows 40% higher engagement for tech events in your area.',
      type: 'suggestion' as const,
    },
    {
      title: 'Category Performance',
      description: 'Your tech events generate 3x more revenue than other categories. Consider focusing on this niche.',
      type: 'insight' as const,
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Innovation Summit 2026',
      date: 'Apr 28, 2026',
      time: '9:00 AM',
      location: 'SF Convention Center',
      status: 'live',
      rsvps: 423,
      capacity: 500,
      revenue: 24000,
    },
    {
      id: 2,
      title: 'Startup Networking Night',
      date: 'May 5, 2026',
      time: '6:00 PM',
      location: 'Innovation Hub',
      status: 'live',
      rsvps: 89,
      capacity: 150,
      revenue: 4450,
    },
    {
      id: 3,
      title: 'Design Thinking Workshop',
      date: 'May 12, 2026',
      time: '2:00 PM',
      location: 'Creative Space',
      status: 'draft',
      rsvps: 0,
      capacity: 50,
      revenue: 0,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-green-500/20 text-green-700 dark:text-green-300';
      case 'draft':
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-300';
      case 'cancelled':
        return 'bg-red-500/20 text-red-700 dark:text-red-300';
      default:
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-300';
    }
  };

  return (
    <EventraMainLayout>
        {/* Header */}
        <div className="bg-white dark:bg-dark-bg-secondary border-b border-gray-200 dark:border-dark-border sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                  Welcome back! Here's what's happening with your events.
                </p>
              </div>
              <Button
                className="btn-glow gradient-primary self-start sm:self-auto"
                onClick={() => navigate('/organizer/create')}
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-6 sm:py-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Events"
              value="24"
              change={20}
              changeLabel="vs last month"
              icon={Calendar}
              gradient="purple"
            />
            <StatCard
              title="Total RSVPs"
              value="1,847"
              change={35}
              changeLabel="vs last month"
              icon={Users}
              gradient="blue"
            />
            <StatCard
              title="Total Revenue"
              value="$42,350"
              change={28}
              changeLabel="vs last month"
              icon={DollarSign}
              gradient="green"
            />
            <StatCard
              title="Avg Attendance"
              value="89%"
              change={5}
              changeLabel="vs last month"
              icon={TrendingUp}
              gradient="orange"
            />
          </div>

          {/* AI Insights Panel - PROMINENT */}
          <AISection
            title="AI Insights"
            subtitle="Smart recommendations to improve your events"
          >
            <div className="grid gap-6 md:grid-cols-3">
              {aiInsights.map((insight, index) => (
                <AIInsightCard
                  key={index}
                  title={insight.title}
                  description={insight.description}
                  type={insight.type}
                  action={
                    <Button size="sm" variant="outline" className="w-full">
                      Learn More
                    </Button>
                  }
                />
              ))}
            </div>
          </AISection>

          {/* Revenue Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Revenue Overview</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monthly revenue performance</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/organizer/analytics')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="organizerRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop key="gradient-start" offset="0%" stopColor="#6C3BFF" stopOpacity={0.3} />
                    <stop key="gradient-end" offset="100%" stopColor="#6C3BFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" opacity={0.3} />
                <XAxis dataKey="month" stroke="#777" fontSize={12} />
                <YAxis stroke="#777" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #E5E5E5',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  key="revenue-area"
                  type="monotone"
                  dataKey="value"
                  stroke="#6C3BFF"
                  strokeWidth={3}
                  fill="url(#organizerRevenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          {/* Upcoming Events */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Upcoming Events</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage your active and draft events</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/organizer/events')}>
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="p-6 hover:shadow-lg transition-all duration-300 glow-hover">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-semibold">{event.title}</h4>
                            <Badge className={getStatusColor(event.status)}>
                              {event.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5 text-purple-600" />
                          <div>
                            <p className="text-sm font-medium">{event.rsvps} / {event.capacity}</p>
                            <p className="text-xs text-gray-500">RSVPs</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-sm font-medium">${event.revenue.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">Revenue</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium">
                              {Math.round((event.rsvps / event.capacity) * 100)}%
                            </p>
                            <p className="text-xs text-gray-500">Filled</p>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                          <span>Capacity</span>
                          <span>{event.rsvps} / {event.capacity}</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500"
                            style={{ width: `${(event.rsvps / event.capacity) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

    </EventraMainLayout>
  );
}
