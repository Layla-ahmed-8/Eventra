import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';
import {
  Users,
  Calendar,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Activity,
  Shield,
  Flag,
  UserCog,
  BarChart3,
  Clock,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  LayoutDashboard,
  FileText,
  Settings,
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../../utils/designSystem';

export default function EnhancedAdminDashboard() {
  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'User Management', href: '/admin/users', icon: Users },
    { label: 'Event Moderation', href: '/admin/events', icon: Calendar },
    { label: 'Reports & Analytics', href: '/admin/reports', icon: FileText },
    { label: 'Platform Settings', href: '/admin/settings', icon: Settings },
  ];

  // Mock data
  const stats = [
    {
      label: 'Total Users',
      value: '50,234',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'from-[#7C3AED] to-[#8B5CF6]',
    },
    {
      label: 'Active Events',
      value: '1,842',
      change: '+8.2%',
      trend: 'up',
      icon: Calendar,
      color: 'from-[#F97316] to-[#FB923C]',
    },
    {
      label: 'Revenue',
      value: '$284K',
      change: '+23.1%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-[#10B981] to-[#059669]',
    },
    {
      label: 'Reports',
      value: '23',
      change: '-15.3%',
      trend: 'down',
      icon: Flag,
      color: 'from-[#DC2626] to-[#EF4444]',
    },
  ];

  const pendingReports = [
    {
      id: 1,
      type: 'User Report',
      target: 'john.doe@email.com',
      reason: 'Inappropriate content in profile',
      reporter: 'user_12345',
      timestamp: '2 hours ago',
      severity: 'medium',
    },
    {
      id: 2,
      type: 'Event Report',
      target: 'Fake Concert Event',
      reason: 'Suspected fraud/scam event',
      reporter: 'user_98765',
      timestamp: '5 hours ago',
      severity: 'high',
    },
    {
      id: 3,
      type: 'Community Report',
      target: 'Tech Meetup Group',
      reason: 'Spam posts',
      reporter: 'user_45678',
      timestamp: '1 day ago',
      severity: 'low',
    },
  ];

  const recentUsers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      role: 'Attendee',
      joined: '2 hours ago',
      status: 'active',
    },
    {
      id: 2,
      name: 'TechEvents Co.',
      email: 'contact@techevents.com',
      role: 'Organizer',
      joined: '5 hours ago',
      status: 'pending',
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@email.com',
      role: 'Attendee',
      joined: '1 day ago',
      status: 'active',
    },
  ];

  return (
    <EventraMainLayout>
        <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-[#DC2626] to-[#EF4444] shadow-lg shadow-[#DC2626]/25">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Admin Dashboard
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400">
              Platform monitoring and management
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-xl transition-all border-2 hover:border-[#7C3AED]/20 rounded-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br shadow-lg",
                    stat.color
                  )}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge className={cn(
                    "border-0",
                    stat.trend === 'up'
                      ? "bg-[#D1FAE5] text-[#059669]"
                      : "bg-[#FEE2E2] text-[#DC2626]"
                  )}>
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {stat.label}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Reports */}
        <div className="lg:col-span-2">
          <Card className="p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Flag className="h-5 w-5 text-[#DC2626]" />
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  Pending Reports
                </h2>
                <Badge className="bg-[#DC2626] text-white border-0">
                  {pendingReports.length}
                </Badge>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl">
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {pendingReports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 rounded-xl border-2 border-neutral-200 dark:border-neutral-800 hover:border-[#7C3AED]/20 dark:hover:border-[#8B5CF6]/20 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge className={cn(
                        "border-0",
                        report.severity === 'high'
                          ? "bg-[#DC2626] text-white"
                          : report.severity === 'medium'
                          ? "bg-[#F97316] text-white"
                          : "bg-[#F59E0B] text-white"
                      )}>
                        {report.severity}
                      </Badge>
                      <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                        {report.type}
                      </span>
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">
                      {report.timestamp}
                    </span>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-1">
                      <span className="font-semibold">Target:</span> {report.target}
                    </p>
                    <p className="text-sm text-neutral-700 dark:text-neutral-300">
                      <span className="font-semibold">Reason:</span> {report.reason}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] rounded-xl"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 rounded-xl hover:bg-[#FEE2E2] hover:text-[#DC2626] hover:border-[#DC2626]"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="rounded-xl"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl hover:bg-[#EDE9FE] hover:text-[#7C3AED] hover:border-[#7C3AED]"
              >
                <UserCog className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl hover:bg-[#FFF4ED] hover:text-[#F97316] hover:border-[#F97316]"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Review Events
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl hover:bg-[#DBEAFE] hover:text-[#2563EB] hover:border-[#2563EB]"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl hover:bg-[#FEE2E2] hover:text-[#DC2626] hover:border-[#DC2626]"
              >
                <Shield className="h-4 w-4 mr-2" />
                Security Logs
              </Button>
            </div>
          </Card>

          {/* System Status */}
          <Card className="p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-[#10B981]" />
              <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                System Status
              </h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  API Status
                </span>
                <Badge className="bg-[#D1FAE5] text-[#059669] border-0">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  Database
                </span>
                <Badge className="bg-[#D1FAE5] text-[#059669] border-0">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Healthy
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  Payments
                </span>
                <Badge className="bg-[#D1FAE5] text-[#059669] border-0">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                  Email Service
                </span>
                <Badge className="bg-[#FFF4ED] text-[#F97316] border-0">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Degraded
                </Badge>
              </div>
            </div>
          </Card>

          {/* Recent Users */}
          <Card className="p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-4">
              Recent Users
            </h3>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <Badge className={cn(
                    "text-xs border-0",
                    user.status === 'active'
                      ? "bg-[#D1FAE5] text-[#059669]"
                      : "bg-[#FFF4ED] text-[#F97316]"
                  )}>
                    {user.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
        </div>
      </div>
      <MobileBottomNav />
    </>
  );
}
