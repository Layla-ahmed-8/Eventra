import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Slider } from '../../components/ui/slider';
import { EnhancedEventCard, FeaturedEventCard } from '../../components/events/EnhancedEventCard';
import { Logo } from '../../components/brand/Logo';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Calendar,
  Sparkles,
  Bell,
  User,
  X,
  Menu,
  Home,
  Ticket,
  Users,
  Trophy,
  Settings,
  LogOut,
  ChevronDown,
  DollarSign,
  Clock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../utils/designSystem';
import { useAuth } from '../../../context/AuthContext';

export default function MobileFirstDiscoverPage() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [selectedLocation, setSelectedLocation] = useState<string>('all');

  // Mock data
  const featuredEvent = {
    id: '1',
    title: 'Tech Innovation Summit 2026',
    description: 'Join industry leaders and innovators for a day of groundbreaking insights into the future of technology, AI, and digital transformation.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
    date: 'Feb 15, 2026',
    time: '9:00 AM - 6:00 PM',
    location: 'San Francisco Convention Center',
    organizerName: 'TechCon Global',
    organizerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    metadata: {
      type: 'in-person' as const,
      category: 'tech' as const,
      pricing: 'paid' as const,
      access: 'public' as const,
      duration: 'single-day' as const,
      capacity: 500,
      attendeeCount: 423,
    },
    price: 299,
  };

  const mockEvents = [
    {
      id: '2',
      title: 'Summer Music Festival',
      description: 'Experience the best local and international artists in one amazing weekend',
      imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop',
      date: 'Jul 20-22, 2026',
      time: '2:00 PM - 11:00 PM',
      location: 'Central Park, NYC',
      organizerName: 'MusicLive Events',
      metadata: {
        type: 'in-person' as const,
        category: 'music' as const,
        pricing: 'paid' as const,
        access: 'public' as const,
        duration: 'multi-day' as const,
        capacity: 2000,
        attendeeCount: 1847,
        multiDayDates: ['Jul 20', 'Jul 21', 'Jul 22'],
      },
      price: 149,
    },
    {
      id: '3',
      title: 'Virtual Product Design Workshop',
      description: 'Master modern product design principles with hands-on exercises',
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      date: 'Feb 18, 2026',
      time: '10:00 AM - 2:00 PM',
      organizerName: 'Design Academy',
      metadata: {
        type: 'virtual' as const,
        category: 'arts' as const,
        pricing: 'paid' as const,
        access: 'public' as const,
        duration: 'single-day' as const,
        capacity: 50,
        attendeeCount: 32,
      },
      price: 79,
    },
    {
      id: '4',
      title: 'Community Yoga & Wellness',
      description: 'Free community wellness session in the park',
      imageUrl: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?w=800&h=600&fit=crop',
      date: 'Every Sunday',
      time: '8:00 AM - 9:30 AM',
      location: 'Riverside Park',
      organizerName: 'Wellness Community',
      metadata: {
        type: 'in-person' as const,
        category: 'wellness' as const,
        pricing: 'free' as const,
        access: 'public' as const,
        duration: 'recurring' as const,
        attendeeCount: 45,
        recurringSchedule: {
          frequency: 'weekly' as const,
        },
      },
    },
    {
      id: '5',
      title: 'Startup Networking Mixer',
      description: 'Connect with fellow entrepreneurs and investors',
      imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
      date: 'Feb 25, 2026',
      time: '6:00 PM - 9:00 PM',
      location: 'Innovation Hub',
      organizerName: 'Startup Alliance',
      metadata: {
        type: 'hybrid' as const,
        category: 'networking' as const,
        pricing: 'free' as const,
        access: 'public' as const,
        duration: 'single-day' as const,
        capacity: 100,
        attendeeCount: 67,
      },
    },
    {
      id: '6',
      title: 'Food & Wine Tasting Experience',
      description: 'Exclusive tasting menu featuring award-winning wines',
      imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop',
      date: 'Mar 5, 2026',
      time: '7:00 PM - 10:00 PM',
      location: 'The Grand Hall',
      organizerName: 'Culinary Experiences',
      metadata: {
        type: 'in-person' as const,
        category: 'food' as const,
        pricing: 'paid' as const,
        access: 'invite-only' as const,
        duration: 'single-day' as const,
        capacity: 40,
        attendeeCount: 38,
      },
      price: 185,
    },
    {
      id: '7',
      title: 'Basketball Tournament Finals',
      description: 'Championship game with live commentary and fan zone',
      imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop',
      date: 'Mar 10, 2026',
      time: '4:00 PM - 8:00 PM',
      location: 'Sports Arena',
      organizerName: 'City Sports League',
      metadata: {
        type: 'in-person' as const,
        category: 'sports' as const,
        pricing: 'paid' as const,
        access: 'public' as const,
        duration: 'single-day' as const,
        capacity: 5000,
        attendeeCount: 4823,
      },
      price: 45,
    },
  ];

  const categories = [
    { id: 'technology', label: 'Technology', emoji: '💻' },
    { id: 'music', label: 'Music', emoji: '🎵' },
    { id: 'arts', label: 'Arts & Culture', emoji: '🎨' },
    { id: 'food', label: 'Food & Dining', emoji: '🍽️' },
    { id: 'sports', label: 'Sports', emoji: '⚽' },
    { id: 'business', label: 'Business', emoji: '💼' },
    { id: 'wellness', label: 'Health & Wellness', emoji: '🧘' },
    { id: 'education', label: 'Education', emoji: '📚' },
    { id: 'networking', label: 'Networking', emoji: '🤝' },
  ];

  const eventTypes = [
    { id: 'in-person', label: 'In-Person', icon: MapPin },
    { id: 'virtual', label: 'Virtual', icon: Calendar },
    { id: 'hybrid', label: 'Hybrid', icon: Sparkles },
  ];

  const dateFilters = [
    { id: 'all', label: 'All Dates' },
    { id: 'today', label: 'Today' },
    { id: 'tomorrow', label: 'Tomorrow' },
    { id: 'this-week', label: 'This Week' },
    { id: 'this-weekend', label: 'This Weekend' },
    { id: 'next-week', label: 'Next Week' },
    { id: 'this-month', label: 'This Month' },
  ];

  const menuItems = [
    { icon: Home, label: 'Discover', href: '/discover' },
    { icon: Ticket, label: 'My Events', href: '/my-events' },
    { icon: Users, label: 'Communities', href: '/communities' },
    { icon: Trophy, label: 'Achievements', href: '/achievements' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleType = (typeId: string) => {
    setSelectedTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  // Filter events based on selected filters
  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      // Search query
      if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !event.description.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Categories
      if (selectedCategories.length > 0 && !selectedCategories.includes(event.metadata.category)) {
        return false;
      }

      // Types
      if (selectedTypes.length > 0 && !selectedTypes.includes(event.metadata.type)) {
        return false;
      }

      // Pricing
      if (selectedPricing === 'free' && event.metadata.pricing !== 'free') {
        return false;
      }
      if (selectedPricing === 'paid' && event.metadata.pricing !== 'paid') {
        return false;
      }

      // Price range
      if (event.price !== undefined) {
        if (event.price < priceRange[0] || event.price > priceRange[1]) {
          return false;
        }
      }

      return true;
    });
  }, [mockEvents, searchQuery, selectedCategories, selectedTypes, selectedPricing, priceRange]);

  const activeFiltersCount = 
    selectedCategories.length + 
    selectedTypes.length + 
    (selectedPricing !== 'all' ? 1 : 0) + 
    (selectedDate !== 'all' ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedPricing('all');
    setSelectedDate('all');
    setPriceRange([0, 500]);
    setSelectedLocation('all');
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
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

      {/* Filter Panel */}
      <AnimatePresence>
        {filterPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterPanelOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-neutral-900 z-50 overflow-y-auto"
            >
              {/* Filter Header */}
              <div className="sticky top-0 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Filters</h2>
                  {activeFiltersCount > 0 && (
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">{activeFiltersCount} active</p>
                  )}
                </div>
                <button
                  onClick={() => setFilterPanelOpen(false)}
                  className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Filter Content */}
              <div className="p-4 space-y-6">
                {/* Categories */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Categories</Label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category.id}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer",
                          selectedCategories.includes(category.id)
                            ? "border-[#7C3AED] bg-[#EDE9FE] dark:bg-[#7C3AED]/10"
                            : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
                        )}
                      >
                        <Checkbox
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => toggleCategory(category.id)}
                        />
                        <span className="text-xl">{category.emoji}</span>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">{category.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Event Type */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Event Type</Label>
                  <div className="space-y-2">
                    {eventTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <label
                          key={type.id}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer",
                            selectedTypes.includes(type.id)
                              ? "border-[#7C3AED] bg-[#EDE9FE] dark:bg-[#7C3AED]/10"
                              : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
                          )}
                        >
                          <Checkbox
                            checked={selectedTypes.includes(type.id)}
                            onCheckedChange={() => toggleType(type.id)}
                          />
                          <Icon className="h-5 w-5 text-neutral-600 dark:text-neutral-400" />
                          <span className="font-medium text-neutral-900 dark:text-neutral-100">{type.label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Date</Label>
                  <RadioGroup value={selectedDate} onValueChange={setSelectedDate}>
                    <div className="space-y-2">
                      {dateFilters.map((filter) => (
                        <label
                          key={filter.id}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer",
                            selectedDate === filter.id
                              ? "border-[#7C3AED] bg-[#EDE9FE] dark:bg-[#7C3AED]/10"
                              : "border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600"
                          )}
                        >
                          <RadioGroupItem value={filter.id} id={filter.id} />
                          <span className="font-medium text-neutral-900 dark:text-neutral-100">{filter.label}</span>
                        </label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Price */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Price</Label>
                  <RadioGroup value={selectedPricing} onValueChange={setSelectedPricing}>
                    <div className="space-y-2">
                      <label className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer",
                        selectedPricing === 'all'
                          ? "border-[#7C3AED] bg-[#EDE9FE] dark:bg-[#7C3AED]/10"
                          : "border-neutral-200 dark:border-neutral-700"
                      )}>
                        <RadioGroupItem value="all" id="price-all" />
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">All Prices</span>
                      </label>
                      <label className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer",
                        selectedPricing === 'free'
                          ? "border-[#7C3AED] bg-[#EDE9FE] dark:bg-[#7C3AED]/10"
                          : "border-neutral-200 dark:border-neutral-700"
                      )}>
                        <RadioGroupItem value="free" id="price-free" />
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">Free Only</span>
                      </label>
                      <label className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer",
                        selectedPricing === 'paid'
                          ? "border-[#7C3AED] bg-[#EDE9FE] dark:bg-[#7C3AED]/10"
                          : "border-neutral-200 dark:border-neutral-700"
                      )}>
                        <RadioGroupItem value="paid" id="price-paid" />
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">Paid Events</span>
                      </label>
                    </div>
                  </RadioGroup>

                  {selectedPricing === 'paid' && (
                    <div className="mt-4 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <Label className="text-sm font-medium">Price Range</Label>
                        <span className="text-sm font-semibold text-[#7C3AED]">
                          ${priceRange[0]} - ${priceRange[1]}
                        </span>
                      </div>
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        min={0}
                        max={500}
                        step={10}
                        className="py-4"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Filter Footer */}
              <div className="sticky bottom-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 p-4 flex gap-3">
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  className="flex-1 rounded-xl h-12"
                >
                  Clear All
                </Button>
                <Button
                  onClick={() => setFilterPanelOpen(false)}
                  className="flex-1 rounded-xl h-12 bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] shadow-lg shadow-[#7C3AED]/25"
                >
                  Show {filteredEvents.length} Events
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pb-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA] px-4 pt-6 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-[#FDBA74]" />
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 text-xs">
              AI-Powered
            </Badge>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            Discover Events
          </h1>
          <p className="text-white/90 mb-6">
            Find amazing experiences near you
          </p>

          {/* Search Bar and Filter Button */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <Input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-12 pr-4 bg-white dark:bg-neutral-900 border-0 shadow-xl rounded-2xl"
              />
            </div>

            {/* Filter Button */}
            <Button
              onClick={() => setFilterPanelOpen(true)}
              className="h-12 px-4 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 shadow-xl rounded-2xl shrink-0"
            >
              <SlidersHorizontal className="h-5 w-5" />
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-[#F97316] text-white border-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Active Filters Summary */}
        {activeFiltersCount > 0 && (
          <div className="px-4 py-3 bg-[#EDE9FE] dark:bg-[#7C3AED]/10 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {filteredEvents.length} events found
              </p>
              <button
                onClick={clearAllFilters}
                className="text-sm font-medium text-[#7C3AED] hover:text-[#8B5CF6]"
              >
                Clear all
              </button>
            </div>
          </div>
        )}

        {/* Featured Event */}
        <div className="px-4 py-6">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Featured
            </h2>
            <Badge className="bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white border-0 text-xs">
              Don't Miss!
            </Badge>
          </div>
          <FeaturedEventCard {...featuredEvent} />
        </div>

        {/* Event Grid */}
        <div className="px-4 pb-6">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            {searchQuery ? 'Search Results' : 'Recommended For You'}
          </h2>
          
          {filteredEvents.length === 0 ? (
            <Card className="p-8 text-center rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                <Search className="h-8 w-8 text-neutral-400" />
              </div>
              <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">No events found</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                Try adjusting your filters or search terms
              </p>
              <Button
                onClick={clearAllFilters}
                variant="outline"
                className="rounded-xl"
              >
                Clear Filters
              </Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredEvents.map((event) => (
                <EnhancedEventCard key={event.id} {...event} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 px-2 py-2 z-30">
        <div className="flex items-center justify-around">
          <Link to="/discover" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl bg-[#EDE9FE] dark:bg-[#7C3AED]/20 text-[#7C3AED]">
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Discover</span>
          </Link>
          <Link to="/my-events" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
            <Ticket className="h-5 w-5" />
            <span className="text-xs font-medium">Events</span>
          </Link>
          <Link to="/communities" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
            <Users className="h-5 w-5" />
            <span className="text-xs font-medium">Community</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100">
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}