import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, Calendar, AlertTriangle, Download, Activity, LayoutDashboard, FileText, Settings } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';

const userGrowthData = [
  { month: 'Jan', users: 1200, organizers: 150, admins: 5 },
  { month: 'Feb', users: 1850, organizers: 210, admins: 6 },
  { month: 'Mar', users: 2650, organizers: 290, admins: 7 },
  { month: 'Apr', users: 3850, organizers: 410, admins: 8 },
];

const eventActivityData = [
  { month: 'Jan', created: 45, completed: 42, cancelled: 3 },
  { month: 'Feb', created: 68, completed: 65, cancelled: 3 },
  { month: 'Mar', created: 92, completed: 88, cancelled: 4 },
  { month: 'Apr', created: 125, completed: 118, cancelled: 7 },
];

const topReportedIssues = [
  { issue: 'Spam Events', count: 23, severity: 'high' },
  { issue: 'Fake Profiles', count: 18, severity: 'high' },
  { issue: 'Payment Issues', count: 12, severity: 'medium' },
  { issue: 'Inappropriate Content', count: 9, severity: 'high' },
  { issue: 'Technical Bugs', count: 7, severity: 'low' },
];

const recentFlags = [
  {
    id: 1,
    type: 'event',
    title: 'Controversial Political Rally',
    reportedBy: 'Multiple Users',
    reason: 'Policy Violation',
    date: '2026-04-21',
    status: 'pending',
  },
  {
    id: 2,
    type: 'user',
    title: 'John Spam Account',
    reportedBy: 'Sarah Johnson',
    reason: 'Spam Activity',
    date: '2026-04-20',
    status: 'resolved',
  },
  {
    id: 3,
    type: 'event',
    title: 'Fake Workshop Event',
    reportedBy: 'Michael Chen',
    reason: 'Fraudulent Event',
    date: '2026-04-20',
    status: 'pending',
  },
];

export default function AdminReportsPage() {
  const [timeRange, setTimeRange] = useState('30d');

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'User Management', href: '/admin/users', icon: Users },
    { label: 'Event Moderation', href: '/admin/events', icon: Calendar },
    { label: 'Reports & Analytics', href: '/admin/reports', icon: FileText },
    { label: 'Platform Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <EventraMainLayout>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1>Reports & Analytics</h1>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

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
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Users</span>
              <Users className="h-4 w-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold">3,850</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+45% vs last month</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Active Events</span>
              <Calendar className="h-4 w-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">125</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>+36% vs last month</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Pending Flags</span>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </div>
            <div className="text-2xl font-bold">23</div>
            <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
              <TrendingUp className="h-3 w-3" />
              <span>Requires attention</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Platform Health</span>
              <Activity className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold">98%</div>
            <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
              <span>Excellent</span>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="growth" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="flags">Flags</TabsTrigger>
          </TabsList>

          <TabsContent value="growth" className="space-y-4 mt-4">
            {/* User Growth Chart */}
            <Card className="p-4">
              <h3 className="mb-4">User Growth Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Line key="users-line" type="monotone" dataKey="users" stroke="#7C3AED" strokeWidth={2} name="Attendees" />
                  <Line key="organizers-line" type="monotone" dataKey="organizers" stroke="#2563EB" strokeWidth={2} name="Organizers" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Growth Metrics */}
            <Card className="p-4">
              <h3 className="mb-3">Growth Metrics</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">User Acquisition Rate</span>
                    <span className="text-sm font-medium text-green-600">+45%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '75%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">User Retention Rate</span>
                    <span className="text-sm font-medium text-purple-600">89%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: '89%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Organizer Conversion</span>
                    <span className="text-sm font-medium text-blue-600">11%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '11%' }} />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4 mt-4">
            {/* Event Activity Chart */}
            <Card className="p-4">
              <h3 className="mb-4">Event Activity</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={eventActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Bar key="created-bar" dataKey="created" fill="#7C3AED" name="Created" />
                  <Bar key="completed-bar" dataKey="completed" fill="#10B981" name="Completed" />
                  <Bar key="cancelled-bar" dataKey="cancelled" fill="#F97316" name="Cancelled" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Platform Activity */}
            <Card className="p-4">
              <h3 className="mb-3">Platform Activity (24h)</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm">New Registrations</span>
                  <span className="font-bold text-purple-600">142</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm">Events Created</span>
                  <span className="font-bold text-blue-600">28</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span className="text-sm">Total RSVPs</span>
                  <span className="font-bold text-orange-600">1,245</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm">Active Sessions</span>
                  <span className="font-bold text-green-600">892</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="flags" className="space-y-4 mt-4">
            {/* Top Reported Issues */}
            <Card className="p-4">
              <h3 className="mb-3">Top Reported Issues</h3>
              <div className="space-y-3">
                {topReportedIssues.map((issue, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-purple-500 text-white rounded-full font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{issue.issue}</p>
                        <Badge
                          variant={
                            issue.severity === 'high' ? 'destructive' :
                            issue.severity === 'medium' ? 'secondary' :
                            'outline'
                          }
                          className="mt-1"
                        >
                          {issue.severity}
                        </Badge>
                      </div>
                    </div>
                    <span className="font-bold text-lg">{issue.count}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Flags */}
            <Card className="p-4">
              <h3 className="mb-3">Recent Flags</h3>
              <div className="space-y-3">
                {recentFlags.map(flag => (
                  <div key={flag.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-sm">{flag.title}</h4>
                        <p className="text-xs text-gray-500">Reported by {flag.reportedBy}</p>
                      </div>
                      <Badge
                        variant={flag.status === 'pending' ? 'secondary' : 'default'}
                      >
                        {flag.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Badge variant="outline" className="text-xs">{flag.type}</Badge>
                      <span>{flag.reason}</span>
                      <span>•</span>
                      <span>{flag.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

    </EventraMainLayout>
  );
}
