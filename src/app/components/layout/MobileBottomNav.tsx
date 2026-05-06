import { Link, useLocation } from 'react-router';
import { useAuth } from '../../../context/AuthContext';
import { Badge } from '../ui/badge';
import {
  LayoutDashboard,
  Compass,
  Calendar,
  Users,
  User,
  PlusCircle,
  BarChart3,
  FileText,
} from 'lucide-react';
import { cn } from '../../../utils/designSystem';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

export function MobileBottomNav() {
  const { user } = useAuth();
  const location = useLocation();

  const attendeeNavItems: NavItem[] = [
    { label: 'Discover', href: '/discover', icon: Compass },
    { label: 'Calendar', href: '/calendar', icon: Calendar },
    { label: 'Community', href: '/communities', icon: Users, badge: 3 },
    { label: 'Profile', href: '/profile', icon: User },
  ];

  const organizerNavItems: NavItem[] = [
    { label: 'Dashboard', href: '/organizer', icon: LayoutDashboard },
    { label: 'Create', href: '/organizer/create', icon: PlusCircle },
    { label: 'Events', href: '/organizer/events', icon: Calendar },
    { label: 'Analytics', href: '/organizer/analytics', icon: BarChart3 },
  ];

  const adminNavItems: NavItem[] = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Users', href: '/admin/users', icon: Users },
    { label: 'Events', href: '/admin/events', icon: Calendar },
    { label: 'Reports', href: '/admin/reports', icon: FileText },
  ];

  const navItems = 
    user?.role === 'organizer' ? organizerNavItems :
    user?.role === 'admin' ? adminNavItems :
    attendeeNavItems;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl shadow-lg">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href || 
                         (item.href !== '/' && location.pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all flex-1',
                isActive
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white shadow-lg shadow-[#7C3AED]/25'
                  : 'text-neutral-600 dark:text-neutral-400'
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge && item.badge > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 bg-[#F97316] text-white border-0 text-[10px]">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className={cn(
                "text-xs font-medium",
                isActive ? "text-white" : "text-neutral-600 dark:text-neutral-400"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileBottomNav;
