import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';

import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { Trophy, Star, TrendingUp, Zap, Compass, Calendar, Users, UserCircle, Wallet } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { mockBadges } from '../../../data/mockData';

export default function AchievementsPage() {
  const { user } = useAuth();

  const navItems = [
    { label: 'Discover', href: '/discover', icon: Compass },
    { label: 'My Events', href: '/my-events', icon: Calendar },
    { label: 'Calendar', href: '/calendar', icon: Calendar },
    { label: 'Achievements', href: '/achievements', icon: Trophy },
    { label: 'Communities', href: '/communities', icon: Users },
    { label: 'Profile', href: '/profile', icon: UserCircle },
    { label: 'Wallet', href: '/wallet', icon: Wallet },
  ];

  const earnedBadges = mockBadges.filter((b) => b.earnedAt);
  const lockedBadges = mockBadges.filter((b) => !b.earnedAt);

  const nextLevel = (user?.level || 1) + 1;
  const progressToNextLevel = ((user?.points || 0) % 500) / 500 * 100;

  const rarityColors = {
    common: 'bg-[#777777]',
    rare: 'bg-[#1F6BFF]',
    epic: 'bg-[#9B7BFF]',
    legendary: 'bg-[#FF7A1A]',
  };

  return (
    <EventraMainLayout>

      <div className="container mx-auto px-4 py-6 pb-24 md:pb-6">
        <h1 className="mb-6">Achievements</h1>

        {/* Level Card */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-[#6C3BFF] to-[#9B7BFF] text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Trophy className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <p className="text-white/80 text-sm">Your Level</p>
              <p className="text-3xl font-bold">Level {user?.level}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress to Level {nextLevel}</span>
              <span>{user?.points || 0} / {(user?.level || 1) * 500} XP</span>
            </div>
            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all"
                style={{ width: `${progressToNextLevel}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <Star className="h-8 w-8 text-[#FF7A1A] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#111111]">{user?.points}</p>
            <p className="text-sm text-[#777777]">Total Points</p>
          </Card>
          <Card className="p-4 text-center">
            <Trophy className="h-8 w-8 text-[#6C3BFF] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#111111]">{earnedBadges.length}</p>
            <p className="text-sm text-[#777777]">Badges Earned</p>
          </Card>
          <Card className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-[#22C55E] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#111111]">{user?.level}</p>
            <p className="text-sm text-[#777777]">Current Level</p>
          </Card>
          <Card className="p-4 text-center">
            <Zap className="h-8 w-8 text-[#F59E0B] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[#111111]">7</p>
            <p className="text-sm text-[#777777]">Day Streak</p>
          </Card>
        </div>

        {/* Earned Badges */}
        <section className="mb-8">
          <h2 className="mb-4">Earned Badges ({earnedBadges.length})</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {earnedBadges.map((badge) => (
              <Card key={badge.id} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-5xl mb-3">{badge.icon}</div>
                <h3 className="font-semibold text-[#111111] mb-1">{badge.name}</h3>
                <p className="text-sm text-[#777777] mb-3">{badge.description}</p>
                <Badge className={`${rarityColors[badge.rarity]} border-0 text-white capitalize`}>
                  {badge.rarity}
                </Badge>
                {badge.earnedAt && (
                  <p className="text-xs text-[#777777] mt-2">
                    Earned {new Date(badge.earnedAt).toLocaleDateString()}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Locked Badges */}
        <section>
          <h2 className="mb-4">Locked Badges ({lockedBadges.length})</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lockedBadges.map((badge) => (
              <Card key={badge.id} className="p-6 text-center opacity-60 grayscale hover:opacity-80 transition-opacity">
                <div className="text-5xl mb-3 filter blur-[2px]">{badge.icon}</div>
                <h3 className="font-semibold text-[#111111] mb-1">{badge.name}</h3>
                <p className="text-sm text-[#777777] mb-3">{badge.description}</p>
                <Badge variant="outline" className="capitalize">
                  {badge.rarity}
                </Badge>
              </Card>
            ))}
          </div>
        </section>
      </div>

    </EventraMainLayout>
  );
}
