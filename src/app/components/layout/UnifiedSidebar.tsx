import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { ChevronLeft, ChevronRight, LogOut, Compass, Calendar, Users, User, Trophy, LayoutDashboard, PlusCircle, BarChart3, FileText } from 'lucide-react';
import { cn } from '../../../utils/designSystem';
import { Button } from '../ui/button';
import { useAuth } from '../../../context/AuthContext';
import { Logo } from '../brand/Logo';

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

interface UnifiedSidebarProps {
  navItems?: NavItem[];
  role?: 'attendee' | 'organizer' | 'admin';
  className?: string;
}

const roleNavMap: Record<'attendee' | 'organizer' | 'admin', NavItem[]> = {
  attendee: [
    { label: 'Discover', href: '/discover', icon: Compass },
    { label: 'My Events', href: '/my-events', icon: Calendar },
    { label: 'Calendar', href: '/calendar', icon: Calendar },
    { label: 'Achievements', href: '/achievements', icon: Trophy },
    { label: 'Communities', href: '/communities', icon: Users, badge: 3 },
    { label: 'Profile', href: '/profile', icon: User },
    { label: 'Wallet', href: '/wallet', icon: User },
  ],
  organizer: [
    { label: 'Dashboard', href: '/organizer', icon: LayoutDashboard },
    { label: 'Create Event', href: '/organizer/create', icon: PlusCircle },
    { label: 'Events', href: '/organizer/events', icon: Calendar },
    { label: 'Analytics', href: '/organizer/analytics', icon: BarChart3 },
    { label: 'Communities', href: '/communities', icon: Users },
    { label: 'Profile', href: '/profile', icon: User },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Users', href: '/admin/users', icon: Users },
    { label: 'Events', href: '/admin/events', icon: Calendar },
    { label: 'Reports', href: '/admin/reports', icon: FileText },
    { label: 'Settings', href: '/admin/settings', icon: User },
  ],
};

const roleConfig = {
  attendee: {
    subtitle: 'AI EventHub',
  },
  organizer: {
    subtitle: 'Organizer',
  },
  admin: {
    subtitle: 'Admin',
  },
};

export function UnifiedSidebar({ navItems, role, className }: UnifiedSidebarProps) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const currentRole = role || (user?.role as 'attendee' | 'organizer' | 'admin') || 'attendee';
  const items = navItems?.length ? navItems : roleNavMap[currentRole];
  const config = roleConfig[currentRole];

  useEffect(() => {
    if (collapsed) {
      document.body.classList.add('sidebar-collapsed');
      document.body.classList.remove('sidebar-expanded');
    } else {
      document.body.classList.add('sidebar-expanded');
      document.body.classList.remove('sidebar-collapsed');
    }

    return () => {
      document.body.classList.remove('sidebar-collapsed', 'sidebar-expanded');
    };
  }, [collapsed]);

  if (!user) {
    return null;
  }

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col bg-white dark:bg-card border-r border-gray-200 dark:border-border fixed left-0 top-0 bottom-0 z-50 transition-all duration-300',
        collapsed ? 'w-16' : 'w-60',
        className
      )}
    >
      <div
        className={cn(
          'relative border-b border-gray-200 dark:border-border',
          collapsed ? 'px-2 py-6' : 'px-6 py-6'
        )}
      >
        <div className={cn('flex items-center', collapsed ? 'justify-center' : 'gap-3')}>
          {collapsed ? (
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-secondary-500">
              <span className="text-lg font-bold text-white">E</span>
            </div>
          ) : (
            <div className="w-full">
              <Logo size="sm" showTagline asLink={false} />
              <p className="text-xs text-muted-foreground mt-2">{config.subtitle}</p>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            'absolute -right-3 top-8 flex items-center justify-center w-6 h-6 bg-white dark:bg-card border border-gray-200 dark:border-border rounded-full shadow-md hover:shadow-lg transition-all hover:scale-110'
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-muted-foreground" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-muted-foreground" />
          )}
        </button>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href ||
            (item.href !== '/' && location.pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-[10px] transition-all group relative',
                isActive
                  ? 'bg-gradient-to-r from-primary-600 to-secondary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-neutral-800',
                collapsed && 'justify-center px-2'
              )}
            >
              <Icon className={cn('w-5 h-5 flex-shrink-0', collapsed && 'w-6 h-6')} />

              {!collapsed && (
                <>
                  <span className="font-medium flex-1">{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="flex items-center justify-center min-w-[20px] h-5 px-2 text-xs font-semibold bg-secondary text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}

              {collapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                  {item.label}
                  {item.badge && item.badge > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-secondary text-white rounded-full text-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-gray-200 dark:border-border">
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400',
            collapsed && 'justify-center px-0'
          )}
          onClick={() => logout()}
        >
          <LogOut className={cn('w-5 h-5', !collapsed && 'mr-3')} />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  );
}
