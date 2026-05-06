import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { EventraMainLayout } from '../components/layouts/EventraMainLayout';
import { 
  Search, 
  Users, 
  MessageSquare, 
  Bell,
  Menu,
  X,
  Home,
  Ticket,
  Trophy,
  User,
  Settings,
  LogOut,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mockCommunities } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

export default function CommunitiesPage() {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredCommunities = mockCommunities.filter((community) =>
    community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    community.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const menuItems = [
    { icon: Home, label: 'Discover', href: '/discover' },
    { icon: Ticket, label: 'My Events', href: '/my-events' },
    { icon: Users, label: 'Communities', href: '/communities' },
    { icon: Trophy, label: 'Achievements', href: '/achievements' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  return (
    <EventraMainLayout>
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 -ml-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
          >
            <Menu className="h-6 w-6 text-neutral-900 dark:text-neutral-100" />
          </button>

          <Logo size="sm" />

          <button className="p-2 -mr-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors relative">
            <Bell className="h-6 w-6 text-neutral-900 dark:text-neutral-100" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F97316] rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-80 bg-white dark:bg-neutral-900 z-50 overflow-y-auto"
            >
              {/* Menu Header */}
              <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between mb-4">
                  <Logo size="md" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center text-white font-semibold text-lg">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">{user?.name || 'User'}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="p-4">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors mb-1"
                    >
                      <Icon className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                      <span className="font-medium text-neutral-900 dark:text-neutral-100">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Logout */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors w-full text-red-600 dark:text-red-400"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pb-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#60A5FA] px-4 pt-6 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-[#FDBA74]" />
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 text-xs">
              Growing Daily
            </Badge>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            Communities
          </h1>
          <p className="text-white/90 mb-6">
            Connect with people who share your interests
          </p>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <Input
              type="text"
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-12 pr-4 bg-white dark:bg-neutral-900 border-0 shadow-xl rounded-2xl"
            />
          </div>
        </div>

        {/* Trending Badge */}
        <div className="px-4 py-4 bg-[#DBEAFE] dark:bg-[#2563EB]/10 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#2563EB]" />
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {filteredCommunities.length} communities • {mockCommunities.reduce((sum, c) => sum + c.memberCount, 0).toLocaleString()} total members
            </p>
          </div>
        </div>

        {/* Communities Grid */}
        <div className="px-4 py-6">
          {filteredCommunities.length === 0 ? (
            <Card className="p-8 text-center rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                <Users className="h-8 w-8 text-neutral-400" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">No communities found</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Try adjusting your search terms
              </p>
              <Button
                onClick={() => setSearchQuery('')}
                variant="outline"
                className="rounded-xl"
              >
                Clear Search
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCommunities.map((community) => (
                <Link key={community.id} to={`/communities/${community.id}`}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full rounded-2xl border-2 border-neutral-200 dark:border-neutral-800 hover:border-[#2563EB] dark:hover:border-[#2563EB]">
                    <div className="relative h-40">
                      <img 
                        src={community.coverImage}
                        alt={community.name}
                        className="h-full w-full object-cover"
                      />
                      {community.isPrivate && (
                        <Badge className="absolute top-3 right-3 bg-neutral-900/80 backdrop-blur-sm border-0 text-white">
                          Private
                        </Badge>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-1">
                        {community.name}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2 leading-relaxed">
                        {community.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-[#2563EB]" />
                          <span className="font-medium">{community.memberCount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MessageSquare className="h-4 w-4 text-[#F97316]" />
                          <span className="font-medium">{community.postCount}</span>
                        </div>
                      </div>

                      <Badge 
                        variant="outline" 
                        className="capitalize border-[#2563EB] text-[#2563EB] bg-[#DBEAFE] dark:bg-[#2563EB]/10"
                      >
                        {community.category}
                      </Badge>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 px-2 py-2 z-30">
        <div className="flex items-center justify-around">
          <Link to="/discover" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Discover</span>
          </Link>
          <Link to="/my-events" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
            <Ticket className="h-5 w-5" />
            <span className="text-xs font-medium">Events</span>
          </Link>
          <Link to="/communities" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl bg-[#DBEAFE] dark:bg-[#2563EB]/20 text-[#2563EB]">
            <Users className="h-5 w-5" />
            <span className="text-xs font-medium">Community</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </EventraMainLayout>
  );
}