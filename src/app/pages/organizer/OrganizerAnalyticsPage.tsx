import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, Calendar, DollarSign, Eye, Download, Filter, ChevronDown, LayoutDashboard, PlusCircle, BarChart3, User } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';


const attendanceData = [
  { month: 'Jan', attendees: 1200, rsvps: 1500 },
  { month: 'Feb', attendees: 1800, rsvps: 2100 },
  { month: 'Mar', attendees: 2400, rsvps: 2800 },
  { month: 'Apr', attendees: 3200, rsvps: 3600 },
];

const categoryData = [
  { name: 'Tech', value: 35, color: '#7C3AED' },
  { name: 'Business', value: 25, color: '#2563EB' },
  { name: 'Design', value: 20, color: '#F97316' },
  { name: 'Marketing', value: 12, color: '#10B981' },
  { name: 'Other', value: 8, color: '#6B7280' },
];

const revenueData = [
  { month: 'Jan', revenue: 15000, expenses: 8000 },
  { month: 'Feb', revenue: 22000, expenses: 10000 },
  { month: 'Mar', revenue: 31000, expenses: 12000 },
  { month: 'Apr', revenue: 42000, expenses: 15000 },
];

const topEvents = [
  { id: 1, name: 'Tech Innovation Summit', attendees: 1200, revenue: 24000, rating: 4.8 },
  { id: 2, name: 'Startup Pitch Night', attendees: 850, revenue: 17000, rating: 4.6 },
  { id: 3, name: 'Design Thinking Workshop', attendees: 650, revenue: 13000, rating: 4.9 },
  { id: 4, name: 'AI Meetup Series', attendees: 420, revenue: 8400, rating: 4.7 },
];

export default function OrganizerAnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');

  const navItems = [
    { label: 'Dashboard', href: '/organizer', icon: LayoutDashboard },
    { label: 'Create Event', href: '/organizer/create', icon: PlusCircle },
    { label: 'My Events', href: '/organizer/events', icon: Calendar },
    { label: 'Analytics', href: '/organizer/analytics', icon: BarChart3 },
    { label: 'Profile', href: '/organizer/profile', icon: User },
  ];

  return (
    <EventraMainLayout>
      {/* Header */}
      <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-neutral-800 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1>Analytics</h1>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Revenue</span>
              <DollarSign className="h-4 w-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold">$42,000</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+35% vs last month</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Attendees</span>
              <Users className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">3,200</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+28% vs last month</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Active Events</span>
              <Calendar className="h-4 w-4 text-orange-500" />
            </div>
            <div className="text-2xl font-bold">12</div>
            <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
              <span>4 this month</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Avg Rating</span>
              <Eye className="h-4 w-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold">4.7</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+0.3 vs last month</span>
            </div>
          </Card>
        </div>

        {/* Tabs for Different Analytics Views */}
        <Tabs defaultValue="attendance" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="attendance" className="space-y-4 mt-4">
            {/* Attendance Trend */}
            <Card className="p-4">
              <h3 className="mb-4">Attendance Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={attendanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Line key="attendees-line" type="monotone" dataKey="attendees" stroke="#7C3AED" strokeWidth={2} name="Attended" />
                  <Line key="rsvps-line" type="monotone" dataKey="rsvps" stroke="#2563EB" strokeWidth={2} name="RSVPs" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Event Categories */}
            <Card className="p-4">
              <h3 className="mb-4">Events by Category</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4 mt-4">
            {/* Revenue Chart */}
            <Card className="p-4">
              <h3 className="mb-4">Revenue vs Expenses</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Bar key="revenue-bar" dataKey="revenue" fill="#7C3AED" name="Revenue" />
                  <Bar key="expenses-bar" dataKey="expenses" fill="#F97316" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Revenue Breakdown */}
            <Card className="p-4">
              <h3 className="mb-3">Revenue Breakdown</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ticket Sales</span>
                  <span className="font-medium">$32,400 (77%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500" style={{ width: '77%' }} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Sponsorships</span>
                  <span className="font-medium">$7,200 (17%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '17%' }} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Merchandise</span>
                  <span className="font-medium">$2,400 (6%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: '6%' }} />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4 mt-4">
            {/* AI Insights */}
            <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
              <div className="flex items-start gap-3">
                <div className="bg-purple-500 text-white p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2">AI Recommendation</h3>
                  <p className="text-sm text-gray-700 mb-3">
                    Your tech events show 40% higher engagement than other categories. Consider hosting more tech-focused events to maximize attendance and revenue.
                  </p>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            </Card>

            {/* Top Performing Events */}
            <Card className="p-4">
              <h3 className="mb-4">Top Performing Events</h3>
              <div className="space-y-3">
                {topEvents.map((event, index) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-purple-500 text-white rounded-full font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{event.name}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-600 mt-1">
                        <span>{event.attendees} attendees</span>
                        <span>${event.revenue.toLocaleString()}</span>
                        <span>⭐ {event.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Performance Metrics */}
            <Card className="p-4">
              <h3 className="mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Show-up Rate</span>
                    <span className="text-sm font-medium">89%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '89%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Satisfaction Score</span>
                    <span className="text-sm font-medium">94%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: '94%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Repeat Attendees</span>
                    <span className="text-sm font-medium">67%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '67%' }} />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

    </EventraMainLayout>
  );
}
