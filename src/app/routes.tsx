import type { ReactNode } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

// Pages
import LoginPage from './pages/auth/LoginPage';
import EnhancedSignupPage from './pages/auth/EnhancedSignupPage';
import AdminLoginPage from './pages/auth/AdminLoginPage';
import OnboardingWizard from './pages/OnboardingWizard';
import WelcomePage from './pages/WelcomePage';
import ModernDiscoverPage from './pages/attendee/ModernDiscoverPage';
import EnhancedEventDetailPage from './pages/attendee/EnhancedEventDetailPage';
import EnhancedMyEventsPage from './pages/attendee/EnhancedMyEventsPage';
import CommunitiesPage from './pages/CommunitiesPage';
import EnhancedCommunityDetailPage from './pages/EnhancedCommunityDetailPage';
import EnhancedAchievementsPage from './pages/attendee/EnhancedAchievementsPage';
import ProfilePage from './pages/ProfilePage';
import WalletPage from './pages/WalletPage';
import ModernOrganizerDashboard from './pages/organizer/ModernOrganizerDashboard';
import CreateEventPage from './pages/organizer/CreateEventPage';
import EnhancedManageEventsPage from './pages/organizer/EnhancedManageEventsPage';
import ModernAdminDashboard from './pages/admin/ModernAdminDashboard';
import CalendarPage from './pages/attendee/CalendarPage';
import OrganizerAnalyticsPage from './pages/organizer/OrganizerAnalyticsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminEventsPage from './pages/admin/AdminEventsPage';
import AdminReportsPage from './pages/admin/AdminReportsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

// Layouts
import { EventraMainLayout } from './components/layouts/EventraMainLayout';

// Route Guards
import { ProtectedRoute, RoleRoute, AuthRedirect } from './components/routing/RouteGuards';

function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <EventraMainLayout>{children}</EventraMainLayout>
    </ProtectedRoute>
  );
}

function RoleLayout({ children, allowedRoles }: { children: ReactNode; allowedRoles: string[] }) {
  return (
    <RoleRoute allowedRoles={allowedRoles}>
      <EventraMainLayout>{children}</EventraMainLayout>
    </RoleRoute>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AuthRedirect,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/signup',
    Component: EnhancedSignupPage,
  },
  {
    path: '/admin-login',
    Component: AdminLoginPage,
  },
  {
    path: '/onboarding',
    Component: () => <ProtectedLayout><OnboardingWizard /></ProtectedLayout>,
  },
  {
    path: '/welcome',
    Component: () => <ProtectedLayout><WelcomePage /></ProtectedLayout>,
  },
  // Attendee Routes
  {
    path: '/discover',
    Component: () => <RoleLayout allowedRoles={['attendee']}><ModernDiscoverPage /></RoleLayout>,
  },
  {
    path: '/events/:id',
    Component: () => <ProtectedLayout><EnhancedEventDetailPage /></ProtectedLayout>,
  },
  {
    path: '/my-events',
    Component: () => <RoleLayout allowedRoles={['attendee']}><EnhancedMyEventsPage /></RoleLayout>,
  },
  {
    path: '/calendar',
    Component: () => <RoleLayout allowedRoles={['attendee']}><CalendarPage /></RoleLayout>,
  },
  {
    path: '/achievements',
    Component: () => <RoleLayout allowedRoles={['attendee']}><EnhancedAchievementsPage /></RoleLayout>,
  },
  {
    path: '/communities',
    Component: () => <ProtectedLayout><CommunitiesPage /></ProtectedLayout>,
  },
  {
    path: '/communities/:id',
    Component: () => <ProtectedLayout><EnhancedCommunityDetailPage /></ProtectedLayout>,
  },
  {
    path: '/profile',
    Component: () => <ProtectedLayout><ProfilePage /></ProtectedLayout>,
  },
  {
    path: '/wallet',
    Component: () => <RoleLayout allowedRoles={['attendee']}><WalletPage /></RoleLayout>,
  },
  // Organizer Routes
  {
    path: '/organizer',
    Component: () => <RoleLayout allowedRoles={['organizer']}><ModernOrganizerDashboard /></RoleLayout>,
  },
  {
    path: '/organizer/create',
    Component: () => <RoleLayout allowedRoles={['organizer']}><CreateEventPage /></RoleLayout>,
  },
  {
    path: '/organizer/events',
    Component: () => <RoleLayout allowedRoles={['organizer']}><EnhancedManageEventsPage /></RoleLayout>,
  },
  {
    path: '/organizer/analytics',
    Component: () => <RoleLayout allowedRoles={['organizer']}><OrganizerAnalyticsPage /></RoleLayout>,
  },
  {
    path: '/organizer/profile',
    Component: () => <RoleLayout allowedRoles={['organizer']}><ProfilePage /></RoleLayout>,
  },
  // Admin Routes
  {
    path: '/admin',
    Component: () => <RoleLayout allowedRoles={['admin']}><ModernAdminDashboard /></RoleLayout>,
  },
  {
    path: '/admin/users',
    Component: () => <RoleLayout allowedRoles={['admin']}><AdminUsersPage /></RoleLayout>,
  },
  {
    path: '/admin/events',
    Component: () => <RoleLayout allowedRoles={['admin']}><AdminEventsPage /></RoleLayout>,
  },
  {
    path: '/admin/reports',
    Component: () => <RoleLayout allowedRoles={['admin']}><AdminReportsPage /></RoleLayout>,
  },
  {
    path: '/admin/settings',
    Component: () => <RoleLayout allowedRoles={['admin']}><AdminSettingsPage /></RoleLayout>,
  },
  {
    path: '*',
    Component: () => <Navigate to="/" />,
  },
]);
