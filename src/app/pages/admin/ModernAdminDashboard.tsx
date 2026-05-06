import { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { AIInsightCard } from '../../components/ai/AIInsightCard';
import { AISection } from '../../components/ai/AISection';
import { StatCard } from '../../components/dashboard/StatCard';
import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';

import {
  Users,
  Calendar,
  AlertTriangle,
  Shield,
  TrendingUp,
  Activity,
  Flag,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  LayoutDashboard,
  FileText,
  Settings,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function ModernAdminDashboard() {
  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'User Management', href: '/admin/users', icon: Users },
    { label: 'Event Moderation', href: '/admin/events', icon: Calendar },
    { label: 'Reports & Analytics', href: '/admin/reports', icon: FileText },
    { label: 'Platform Settings', href: '/admin/settings', icon: Settings },
  ];

  const userActivityData = [
    { month: 'Jan', users: 1200, events: 45 },
    { month: 'Feb', users: 1800, events: 68 },
    { month: 'Mar', users: 2400, events: 92 },
    { month: 'Apr', users: 3200, events: 125 },
  ];

  const aiAlerts = [
    {
      title: 'Suspicious Activity Detected',
      description: 'User "john.doe@email.com" created 15 events in 24 hours. Possible spam behavior detected.',
      type: 'alert' as const,
    },
    {
      title: 'Fraud Pattern Identified',
      description: '3 events with identical payment details from different organizers flagged for review.',
      type: 'alert' as const,
    },
    {
      title: 'Anomaly in User Growth',
      description: '200% spike in new registrations from IP range 192.168.x.x. Potential bot activity.',
      type: 'alert' as const,
    },
  ];

  const recentFlags = [
    {
      id: 1,
      type: 'event',
      title: 'Controversial Political Rally',
      reportedBy: '8 users',
      reason: 'Policy Violation',
      severity: 'high',
      date: '2 hours ago',
    },
    {
      id: 2,
      type: 'user',
      title: 'Spam Account Activity',
      reportedBy: '5 users',
      reason: 'Spam/Harassment',
      severity: 'medium',
      date: '5 hours ago',
    },
    {
      id: 3,
      type: 'event',
      title: 'Fake Workshop Event',
      reportedBy: '3 users',
      reason: 'Fraudulent Content',
      severity: 'high',
      date: '1 day ago',
    },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30';
      case 'medium':
        return 'bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-500/30';
      case 'low':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30';
    }
  };

  return (
    <EventraMainLayout>
        {/* Header */}
        <div className="bg-white dark:bg-dark-bg-secondary border-b border-gray-200 dark:border-dark-border sticky top-0 z-10">
          <div className="px-4 sm:px-6 py-4 sm:py-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                Platform monitoring, moderation, and analytics
              </p>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-6 sm:py-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Users"
              value="3,850"
              change={45}
              changeLabel="vs last month"
              icon={Users}
              gradient="purple"
            />
            <StatCard
              title="Active Events"
              value="125"
              change={36}
              changeLabel="vs last month"
              icon={Calendar}
              gradient="blue"
            />
            <StatCard
              title="Pending Flags"
              value="23"
              icon={AlertTriangle}
              gradient="orange"
            />
            <StatCard
              title="Platform Health"
              value="98%"
              change={2}
              changeLabel="uptime"
              icon={Activity}
              gradient="green"
            />
          </div>

          {/* AI Monitoring Panel - PROMINENT */}
          <AISection
            title="AI Security Alerts"
            subtitle="Real-time fraud detection and anomaly monitoring"
          >
            <div className="grid gap-6 md:grid-cols-3">
              {aiAlerts.map((alert, index) => (
                <AIInsightCard
                  key={index}
                  title={alert.title}
                  description={alert.description}
                  type={alert.type}
                  action={
                    <div className="flex gap-2">
                      <Button size="sm" variant="destructive" className="flex-1">
                        <Ban className="w-4 h-4 mr-1" />
                        Block
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        Review
                      </Button>
                    </div>
                  }
                />
              ))}
            </div>
          </AISection>

          {/* Platform Activity Chart */}
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Platform Activity</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">User growth and event creation trends</p>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userActivityData}>
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
                <Legend />
                <Line
                  key="users-line"
                  type="monotone"
                  dataKey="users"
                  stroke="#6C3BFF"
                  strokeWidth={3}
                  name="Users"
                  dot={{ fill: '#6C3BFF', r: 4 }}
                />
                <Line
                  key="events-line"
                  type="monotone"
                  dataKey="events"
                  stroke="#FF7A1A"
                  strokeWidth={3}
                  name="Events"
                  dot={{ fill: '#FF7A1A', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Recent Flags */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Recent Flags & Reports</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Content requiring moderation</p>
              </div>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {recentFlags.map((flag) => (
                <Card
                  key={flag.id}
                  className={`p-6 border-2 transition-all duration-300 hover:shadow-lg ${
                    flag.severity === 'high' ? 'border-red-500/30' : 'border-gray-200 dark:border-dark-border'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      {/* Header */}
                      <div className="flex items-start gap-3">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                          flag.type === 'event' ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
                        }`}>
                          <Flag className={`w-5 h-5 ${
                            flag.type === 'event' ? 'text-purple-600 dark:text-purple-400' : 'text-blue-600 dark:text-blue-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-semibold">{flag.title}</h4>
                            <Badge className={`border ${getSeverityColor(flag.severity)}`}>
                              {flag.severity}
                            </Badge>
                            <Badge variant="outline">
                              {flag.type}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span>Reported by {flag.reportedBy}</span>
                            <span>•</span>
                            <span>{flag.reason}</span>
                            <span>•</span>
                            <span>{flag.date}</span>
                          </div>
                        </div>
                      </div>

                      {/* Warning for High Severity */}
                      {flag.severity === 'high' && (
                        <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                          <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5" />
                          <p className="text-xs text-red-700 dark:text-red-300">
                            High priority flag - Immediate review recommended
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">System Status</h4>
                <Badge className="bg-green-500 text-white">Operational</Badge>
              </div>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">99.8% Uptime</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Last 30 days</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">API Performance</h4>
                <Badge className="bg-blue-500 text-white">Healthy</Badge>
              </div>
              <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">45ms</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Avg response time</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Database</h4>
                <Badge className="bg-purple-500 text-white">Optimized</Badge>
              </div>
              <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">2.3TB</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total storage</p>
            </Card>
          </div>
        </div>

    </EventraMainLayout>
  );
}
