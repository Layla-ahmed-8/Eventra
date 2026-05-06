import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import {
  Trophy,
  Award,
  Star,
  Zap,
  Target,
  TrendingUp,
  Users,
  Calendar,
  Heart,
  Flame,
  Crown,
  Medal,
  Gift,
  ChevronRight,
  Bell,
  User,
  Menu,
  Home,
  Ticket,
  X,
  Lock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../utils/designSystem';
import { Logo } from '../../components/brand/Logo';
import { useAuth } from '../../../context/AuthContext';

export default function EnhancedAchievementsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTab, setSelectedTab] = useState<'badges' | 'rewards'>('badges');
  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);

  const userStats = {
    totalPoints: 2850,
    level: 12,
    nextLevelPoints: 3000,
    currentStreak: 7,
    eventsAttended: 24,
    badges: 18,
    rank: 342,
    totalUsers: 12000,
  };

  const badges = [
    {
      id: '1',
      name: 'Early Bird',
      description: 'RSVP to 5 events a week before',
      icon: '🐦',
      category: 'milestone',
      earned: true,
      earnedDate: 'Jan 15, 2026',
      progress: 100,
      total: 5,
      rarity: 'common',
      points: 50,
    },
    {
      id: '2',
      name: 'Social Butterfly',
      description: 'Attend 10 networking events',
      icon: '🦋',
      category: 'social',
      earned: true,
      earnedDate: 'Feb 1, 2026',
      progress: 100,
      total: 10,
      rarity: 'rare',
      points: 150,
    },
    {
      id: '3',
      name: 'Tech Enthusiast',
      description: 'Attend 15 tech events',
      icon: '💻',
      category: 'category',
      earned: true,
      earnedDate: 'Feb 5, 2026',
      progress: 100,
      total: 15,
      rarity: 'epic',
      points: 250,
    },
    {
      id: '4',
      name: 'Fitness Guru',
      description: 'Complete 20 fitness events',
      icon: '💪',
      category: 'category',
      earned: false,
      progress: 12,
      total: 20,
      rarity: 'rare',
      points: 200,
    },
    {
      id: '5',
      name: 'Night Owl',
      description: 'Attend 10 evening events',
      icon: '🦉',
      category: 'milestone',
      earned: false,
      progress: 7,
      total: 10,
      rarity: 'common',
      points: 75,
    },
    {
      id: '6',
      name: 'VIP Status',
      description: 'Attend 50 premium events',
      icon: '👑',
      category: 'prestige',
      earned: false,
      progress: 18,
      total: 50,
      rarity: 'legendary',
      points: 500,
    },
    {
      id: '7',
      name: 'Community Leader',
      description: 'Organize 3 community events',
      icon: '🌟',
      category: 'social',
      earned: false,
      progress: 1,
      total: 3,
      rarity: 'epic',
      points: 300,
    },
    {
      id: '8',
      name: 'Streak Master',
      description: 'Maintain 30-day attendance streak',
      icon: '🔥',
      category: 'milestone',
      earned: false,
      progress: 7,
      total: 30,
      rarity: 'legendary',
      points: 600,
    },
  ];

  const categories = [
    { id: 'all', label: 'All Badges', icon: Trophy },
    { id: 'milestone', label: 'Milestones', icon: Target },
    { id: 'social', label: 'Social', icon: Users },
    { id: 'category', label: 'Categories', icon: Star },
    { id: 'prestige', label: 'Prestige', icon: Crown },
  ];

  const menuItems = [
    { icon: Home, label: 'Discover', href: '/discover' },
    { icon: Ticket, label: 'My Events', href: '/my-events' },
    { icon: Users, label: 'Communities', href: '/communities' },
    { icon: Trophy, label: 'Achievements', href: '/achievements' },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  const rewards = [
    {
      id: 'r1',
      name: '20% Off Any Event',
      description: 'Get 20% discount on your next event ticket purchase',
      icon: '🎟️',
      pointsCost: 500,
      category: 'discount',
      validUntil: 'Mar 15, 2026',
      available: 120,
    },
    {
      id: 'r2',
      name: 'Free Premium Event',
      description: 'One free ticket to any premium event under $100',
      icon: '🎫',
      pointsCost: 1000,
      category: 'ticket',
      validUntil: 'Apr 30, 2026',
      available: 50,
    },
    {
      id: 'r3',
      name: '50% Off Virtual Events',
      description: 'Half price on all virtual events for 30 days',
      icon: '💻',
      pointsCost: 750,
      category: 'discount',
      validUntil: 'Mar 30, 2026',
      available: 200,
    },
    {
      id: 'r4',
      name: 'VIP Event Access',
      description: 'Skip the line and get VIP access to one event',
      icon: '⭐',
      pointsCost: 1500,
      category: 'upgrade',
      validUntil: 'May 15, 2026',
      available: 30,
    },
    {
      id: 'r5',
      name: 'Free Event Pass',
      description: 'Free entry to any event (up to $50 value)',
      icon: '🎉',
      pointsCost: 800,
      category: 'ticket',
      validUntil: 'Apr 15, 2026',
      available: 75,
    },
    {
      id: 'r6',
      name: '$25 Event Credit',
      description: 'Apply $25 credit to any event booking',
      icon: '💰',
      pointsCost: 600,
      category: 'credit',
      validUntil: 'Jun 1, 2026',
      available: 100,
    },
  ];

  const handleRedeemReward = (rewardId: string, pointsCost: number) => {
    if (userStats.totalPoints >= pointsCost && !redeemedRewards.includes(rewardId)) {
      setRedeemedRewards([...redeemedRewards, rewardId]);
      // In a real app, this would update the backend
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-neutral-400 to-neutral-500';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-neutral-400 to-neutral-500';
    }
  };

  const getRewardCategoryColor = (category: string) => {
    switch (category) {
      case 'discount': return 'from-[#F97316] to-[#FB923C]';
      case 'ticket': return 'from-[#2563EB] to-[#3B82F6]';
      case 'upgrade': return 'from-[#7C3AED] to-[#8B5CF6]';
      case 'credit': return 'from-[#10B981] to-[#34D399]';
      default: return 'from-neutral-400 to-neutral-500';
    }
  };

  const filteredBadges = selectedCategory === 'all' 
    ? badges 
    : badges.filter(badge => badge.category === selectedCategory);

  const earnedBadges = badges.filter(b => b.earned);
  const progressToNextLevel = ((userStats.totalPoints % 250) / 250) * 100;

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
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">Level {userStats.level}</p>
                  </div>
                </div>
              </div>

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
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pb-24">
        {/* Stats Header */}
        <div className="bg-gradient-to-br from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA] px-4 pt-6 pb-8">
          {/* Level & XP */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">Level {userStats.level}</h1>
                  <p className="text-white/90 text-sm">{userStats.totalPoints} XP</p>
                </div>
              </div>
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
                Rank #{userStats.rank}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/90">Progress to Level {userStats.level + 1}</span>
                <span className="text-white font-semibold">{Math.round(progressToNextLevel)}%</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#F97316] to-[#FB923C] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNextLevel}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <p className="text-white/80 text-xs">{userStats.nextLevelPoints - userStats.totalPoints} XP to next level</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border-white/20">
              <Flame className="h-6 w-6 text-[#F97316] mb-2" />
              <p className="text-2xl font-bold text-white">{userStats.currentStreak}</p>
              <p className="text-xs text-white/80">Day Streak</p>
            </Card>
            <Card className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border-white/20">
              <Calendar className="h-6 w-6 text-[#2563EB] mb-2" />
              <p className="text-2xl font-bold text-white">{userStats.eventsAttended}</p>
              <p className="text-xs text-white/80">Events</p>
            </Card>
            <Card className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border-white/20">
              <Award className="h-6 w-6 text-[#FDBA74] mb-2" />
              <p className="text-2xl font-bold text-white">{earnedBadges.length}</p>
              <p className="text-xs text-white/80">Badges</p>
            </Card>
          </div>
        </div>

        {/* Category Filters */}
        <div className="px-4 py-4 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-16 z-30">
          {/* Tab Switcher */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setSelectedTab('badges')}
              className={cn(
                "flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all",
                selectedTab === 'badges'
                  ? "bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white shadow-lg shadow-[#7C3AED]/25"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              )}
            >
              <Trophy className="h-4 w-4 inline-block mr-2" />
              Badges
            </button>
            <button
              onClick={() => setSelectedTab('rewards')}
              className={cn(
                "flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all relative",
                selectedTab === 'rewards'
                  ? "bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white shadow-lg shadow-[#F97316]/25"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              )}
            >
              <Gift className="h-4 w-4 inline-block mr-2" />
              Rewards
              <Badge className="ml-2 bg-white/20 text-white border-0 text-xs">
                New
              </Badge>
            </button>
          </div>

          {/* Category Filters - Only show for badges */}
          {selectedTab === 'badges' && (
            <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap font-medium text-sm transition-all flex-shrink-0",
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white shadow-lg shadow-[#7C3AED]/25"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {category.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Badges Grid */}
        {selectedTab === 'badges' && (
          <div className="px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {selectedCategory === 'all' ? 'All Badges' : categories.find(c => c.id === selectedCategory)?.label}
              </h2>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {filteredBadges.filter(b => b.earned).length}/{filteredBadges.length} earned
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {filteredBadges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card
                    className={cn(
                      "p-4 rounded-3xl transition-all relative overflow-hidden",
                      badge.earned
                        ? "shadow-lg hover:shadow-xl"
                        : "opacity-60 hover:opacity-80"
                    )}
                  >
                    {/* Rarity Gradient Background */}
                    {badge.earned && (
                      <div className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-5",
                        getRarityColor(badge.rarity)
                      )} />
                    )}

                    {/* Lock Icon for Unearned */}
                    {!badge.earned && (
                      <div className="absolute top-3 right-3">
                        <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                          <Lock className="h-3.5 w-3.5 text-neutral-500" />
                        </div>
                      </div>
                    )}

                    {/* Badge Icon */}
                    <div className="relative z-10">
                      <div className={cn(
                        "w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-3 mx-auto",
                        badge.earned
                          ? `bg-gradient-to-br ${getRarityColor(badge.rarity)}`
                          : "bg-neutral-200 dark:bg-neutral-800"
                      )}>
                        {badge.earned ? badge.icon : '🔒'}
                      </div>

                      {/* Badge Info */}
                      <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-center mb-1 text-sm">
                        {badge.name}
                      </h3>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center mb-3 line-clamp-2">
                        {badge.description}
                      </p>

                      {/* Progress or Earned Date */}
                      {badge.earned ? (
                        <div className="space-y-1">
                          <Badge className={cn(
                            "w-full justify-center bg-gradient-to-r text-white border-0 text-xs",
                            getRarityColor(badge.rarity)
                          )}>
                            +{badge.points} XP
                          </Badge>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
                            {badge.earnedDate}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-neutral-600 dark:text-neutral-400">Progress</span>
                            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                              {badge.progress}/{badge.total}
                            </span>
                          </div>
                          <Progress value={(badge.progress / badge.total) * 100} className="h-2" />
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Rewards Grid */}
        {selectedTab === 'rewards' && (
          <div className="px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                  Redeem Rewards
                </h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  You have {userStats.totalPoints} XP to spend
                </p>
              </div>
            </div>

            <div className="grid gap-4 mb-6">
              {rewards.map((reward, index) => {
                const isRedeemed = redeemedRewards.includes(reward.id);
                const canAfford = userStats.totalPoints >= reward.pointsCost;
                
                return (
                  <motion.div
                    key={reward.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="p-5 rounded-3xl relative overflow-hidden hover:shadow-xl transition-all">
                      {/* Category Gradient Background */}
                      <div className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-5",
                        getRewardCategoryColor(reward.category)
                      )} />

                      <div className="relative z-10 flex gap-4">
                        {/* Reward Icon */}
                        <div className={cn(
                          "w-20 h-20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0 bg-gradient-to-br",
                          getRewardCategoryColor(reward.category)
                        )}>
                          {reward.icon}
                        </div>

                        {/* Reward Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1">
                              <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                                {reward.name}
                              </h3>
                              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2 line-clamp-2">
                                {reward.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-neutral-600 dark:text-neutral-400 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              Valid until {reward.validUntil}
                            </span>
                            <span>•</span>
                            <span>{reward.available} available</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <Badge className={cn(
                              "bg-gradient-to-r text-white border-0 font-semibold",
                              getRewardCategoryColor(reward.category)
                            )}>
                              {reward.pointsCost} XP
                            </Badge>

                            {isRedeemed ? (
                              <Badge className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-0">
                                ✓ Redeemed
                              </Badge>
                            ) : (
                              <Button
                                onClick={() => handleRedeemReward(reward.id, reward.pointsCost)}
                                disabled={!canAfford}
                                className={cn(
                                  "ml-auto rounded-xl h-9 px-4 text-sm font-semibold",
                                  canAfford
                                    ? `bg-gradient-to-r ${getRewardCategoryColor(reward.category)} hover:opacity-90`
                                    : "bg-neutral-300 dark:bg-neutral-700 text-neutral-500 cursor-not-allowed"
                                )}
                              >
                                {canAfford ? 'Redeem' : 'Not Enough XP'}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Leaderboard Teaser */}
        <div className="px-4 pb-6">
          <Card className="p-6 rounded-3xl bg-gradient-to-br from-[#DBEAFE] to-[#EDE9FE] dark:from-[#2563EB]/10 dark:to-[#7C3AED]/10 border-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                  Global Leaderboard
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  You're ranked #{userStats.rank} out of {userStats.totalUsers.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-[#7C3AED]" />
            </div>
            <Button className="w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] rounded-2xl">
              View Leaderboard
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Card>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 px-2 py-2 z-30">
        <div className="flex items-center justify-around">
          <Link to="/discover" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400">
            <Home className="h-5 w-5" />
            <span className="text-xs font-medium">Discover</span>
          </Link>
          <Link to="/my-events" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400">
            <Ticket className="h-5 w-5" />
            <span className="text-xs font-medium">Events</span>
          </Link>
          <Link to="/communities" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400">
            <Users className="h-5 w-5" />
            <span className="text-xs font-medium">Community</span>
          </Link>
          <Link to="/achievements" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl bg-[#EDE9FE] dark:bg-[#7C3AED]/20 text-[#7C3AED]">
            <Trophy className="h-5 w-5" />
            <span className="text-xs font-medium">Achievements</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-neutral-600 dark:text-neutral-400">
            <User className="h-5 w-5" />
            <span className="text-xs font-medium">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}