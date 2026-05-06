import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useApp } from '../../../context/AppContext';
import { formatDistanceToNow } from 'date-fns';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Link } from 'react-router';

interface NotificationPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NotificationPanel({ open, onOpenChange }: NotificationPanelProps) {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  const getNotificationIcon = (type: string) => {
    const icons: Record<string, string> = {
      reminder: '🔔',
      update: '📢',
      rsvp: '✅',
      community: '💬',
      achievement: '🏆',
      recommendation: '✨',
    };
    return icons[type] || '📬';
  };

  const getNotificationColor = (type: string) => {
    const colors: Record<string, string> = {
      reminder: 'bg-[#1F6BFF]',
      update: 'bg-[#F59E0B]',
      rsvp: 'bg-[#22C55E]',
      community: 'bg-[#6C3BFF]',
      achievement: 'bg-[#FF7A1A]',
      recommendation: 'bg-[#9B7BFF]',
    };
    return colors[type] || 'bg-[#777777]';
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Notifications</span>
            {notifications.some((n) => !n.read) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllNotificationsRead}
                className="text-[#6C3BFF]"
              >
                <Check className="mr-2 h-4 w-4" />
                Mark all read
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-colors ${
                  notification.read ? 'bg-white' : 'bg-[#F1ECFF] border-[#6C3BFF]'
                }`}
              >
                <div className="flex gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${getNotificationColor(
                      notification.type
                    )} flex-shrink-0`}
                  >
                    <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-semibold text-[#111111] text-sm">
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <div className="h-2 w-2 rounded-full bg-[#FF7A1A] flex-shrink-0 ml-2 mt-1" />
                      )}
                    </div>

                    <p className="text-sm text-[#777777] mb-2">{notification.message}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#777777]">
                        {formatDistanceToNow(new Date(notification.createdAt), {
                          addSuffix: true,
                        })}
                      </span>

                      <div className="flex gap-2">
                        {notification.actionUrl && (
                          <Link to={notification.actionUrl} onClick={() => onOpenChange(false)}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 text-xs text-[#6C3BFF]"
                            >
                              View
                            </Button>
                          </Link>
                        )}
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => markNotificationRead(notification.id)}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <Bell className="mx-auto h-12 w-12 text-[#DDDDDD] mb-4" />
              <p className="text-sm text-[#777777]">No notifications yet</p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
