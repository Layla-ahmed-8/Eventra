import { useState } from 'react';
import { Settings, Shield, Bell, Database, DollarSign, Mail, Users, Lock, Globe, Zap, LayoutDashboard, Calendar, FileText } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Switch } from '../../components/ui/switch';
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Separator } from '../../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';

export default function AdminSettingsPage() {
  const [autoApproveEvents, setAutoApproveEvents] = useState(false);
  const [requireEmailVerification, setRequireEmailVerification] = useState(true);
  const [allowPublicEvents, setAllowPublicEvents] = useState(true);
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

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
          <h1>Platform Settings</h1>
        </div>
      </div>

      <div className="px-4 py-4">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-0">
            {/* Platform Configuration */}
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="h-5 w-5 text-purple-500" />
                <h3>Platform Configuration</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="platform-name">Platform Name</Label>
                  <Input id="platform-name" defaultValue="Eventra" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input
                    id="support-email"
                    type="email"
                    defaultValue="support@eventra.com"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="max-attendees">Max Attendees Per Event</Label>
                  <Input
                    id="max-attendees"
                    type="number"
                    defaultValue="5000"
                    className="mt-2"
                  />
                </div>
              </div>
            </Card>

            {/* Notifications */}
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="h-5 w-5 text-blue-500" />
                <h3>Notifications</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-gray-500">Send email notifications to users</p>
                  </div>
                  <Switch
                    checked={enableNotifications}
                    onCheckedChange={setEnableNotifications}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-gray-500">Enable browser push notifications</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Admin Alerts</Label>
                    <p className="text-sm text-gray-500">Get alerts for critical events</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            {/* Payment Settings */}
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <DollarSign className="h-5 w-5 text-green-500" />
                <h3>Payment Settings</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="commission">Platform Commission (%)</Label>
                  <Input id="commission" type="number" defaultValue="10" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="min-payout">Minimum Payout Amount ($)</Label>
                  <Input id="min-payout" type="number" defaultValue="50" className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Enable Refunds</Label>
                    <p className="text-sm text-gray-500">Allow attendees to request refunds</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4 mt-0">
            {/* Authentication */}
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-5 w-5 text-purple-500" />
                <h3>Authentication</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Verification Required</Label>
                    <p className="text-sm text-gray-500">Users must verify email before accessing platform</p>
                  </div>
                  <Switch
                    checked={requireEmailVerification}
                    onCheckedChange={setRequireEmailVerification}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-gray-500">Enable 2FA for organizers and admins</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div>
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    defaultValue="60"
                    className="mt-2"
                  />
                </div>
              </div>
            </Card>

            {/* Privacy & Data */}
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-5 w-5 text-blue-500" />
                <h3>Privacy & Data</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Data Encryption</Label>
                    <p className="text-sm text-gray-500">Encrypt sensitive user data</p>
                  </div>
                  <Switch defaultChecked disabled />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Anonymous Analytics</Label>
                    <p className="text-sm text-gray-500">Collect anonymized usage data</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div>
                  <Label htmlFor="data-retention">Data Retention Period (days)</Label>
                  <Input
                    id="data-retention"
                    type="number"
                    defaultValue="365"
                    className="mt-2"
                  />
                </div>
              </div>
            </Card>

            {/* API Access */}
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="h-5 w-5 text-orange-500" />
                <h3>API Access</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Public API Access</Label>
                    <p className="text-sm text-gray-500">Allow third-party API access</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div>
                  <Label htmlFor="rate-limit">Rate Limit (requests/minute)</Label>
                  <Input
                    id="rate-limit"
                    type="number"
                    defaultValue="100"
                    className="mt-2"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="moderation" className="space-y-4 mt-0">
            {/* Content Moderation */}
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-5 w-5 text-purple-500" />
                <h3>Content Moderation</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Auto-Approve Events</Label>
                    <p className="text-sm text-gray-500">Automatically approve new events without review</p>
                  </div>
                  <Switch
                    checked={autoApproveEvents}
                    onCheckedChange={setAutoApproveEvents}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>AI Content Filtering</Label>
                    <p className="text-sm text-gray-500">Use AI to detect inappropriate content</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div>
                  <Label htmlFor="flag-threshold">Auto-Remove Threshold (flags)</Label>
                  <Input
                    id="flag-threshold"
                    type="number"
                    defaultValue="5"
                    className="mt-2"
                  />
                </div>
              </div>
            </Card>

            {/* User Permissions */}
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-5 w-5 text-blue-500" />
                <h3>User Permissions</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Allow Public Events</Label>
                    <p className="text-sm text-gray-500">Let organizers create public events</p>
                  </div>
                  <Switch
                    checked={allowPublicEvents}
                    onCheckedChange={setAllowPublicEvents}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Enable Comments</Label>
                    <p className="text-sm text-gray-500">Allow users to comment on events</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Enable Community Forums</Label>
                    <p className="text-sm text-gray-500">Allow community discussions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            {/* Maintenance Mode */}
            <Card className="p-4 border-orange-200 bg-orange-50">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="h-5 w-5 text-orange-500" />
                <h3>Maintenance Mode</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Enable Maintenance Mode</Label>
                    <p className="text-sm text-gray-600">Platform will be unavailable to users</p>
                  </div>
                  <Switch
                    checked={maintenanceMode}
                    onCheckedChange={setMaintenanceMode}
                  />
                </div>

                {maintenanceMode && (
                  <>
                    <Separator />
                    <div>
                      <Label htmlFor="maintenance-message">Maintenance Message</Label>
                      <Textarea
                        id="maintenance-message"
                        placeholder="We're performing scheduled maintenance..."
                        className="mt-2"
                        rows={3}
                      />
                    </div>
                  </>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="sticky bottom-20 mt-6">
          <Button className="w-full" size="lg">
            Save All Changes
          </Button>
        </div>
      </div>

    </EventraMainLayout>
  );
}
