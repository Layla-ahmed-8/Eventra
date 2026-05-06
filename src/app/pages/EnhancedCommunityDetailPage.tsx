import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Textarea } from '../components/ui/textarea';
import { Logo } from '../components/brand/Logo';
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Send,
  Bell,
  Menu,
  X,
  Home,
  Ticket,
  Trophy,
  User,
  LogOut,
  Settings,
  MapPin,
  Calendar,
  Clock,
  TrendingUp,
  Pin,
  Image as ImageIcon,
  ChevronRight,
  UserPlus,
  UserCheck,
  Share2,
  MoreHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../utils/designSystem';
import { mockCommunities, mockPosts, mockMorePosts, mockCommunityMembers, mockCommunityEvents, mockComments } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

export default function EnhancedCommunityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [selectedTab, setSelectedTab] = useState<'posts' | 'events' | 'members'>('posts');
  const [isJoined, setIsJoined] = useState(true);

  const community = mockCommunities.find((c) => c.id === id);
  const allPosts = [...mockPosts, ...mockMorePosts];
  const posts = allPosts.filter((p) => p.communityId === id);
  const members = mockCommunityMembers.filter((m) => m.communityId === id);
  const events = mockCommunityEvents.filter((e) => e.communityId === id);

  const menuItems = [
    { icon: Home, label: 'Discover', href: '/discover' },
    { icon: Ticket, label: 'My Events', href: '/my-events' },
    { icon: Users, label: 'Communities', href: '/communities' },
    { icon: Trophy, label: 'Achievements', href: '/achievements' },
    { icon: User, label: 'Profile', href: '/profile' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  if (!community) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
        <Card className="p-8 text-center rounded-2xl">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Community not found</h3>
          <Button onClick={() => navigate('/communities')} className="mt-4 rounded-xl">
            Back to Communities
          </Button>
        </Card>
      </div>
    );
  }

  const handlePost = () => {
    if (newPost.trim()) {
      toast.success('Post created successfully!');
      setNewPost('');
    }
  };

  const handleJoinToggle = () => {
    setIsJoined(!isJoined);
    toast.success(isJoined ? 'Left community' : 'Joined community!');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/communities')}
            className="p-2 -ml-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-neutral-900 dark:text-neutral-100 rotate-180" />
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
        {/* Cover & Hero */}
        <div className="relative h-48 bg-gradient-to-br from-[#2563EB] via-[#3B82F6] to-[#60A5FA]">
          <img 
            src={community.coverImage}
            alt={community.name}
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        {/* Community Info Card */}
        <div className="px-4 -mt-16 relative z-10">
          <Card className="p-6 rounded-3xl border-2 border-neutral-200 dark:border-neutral-800 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{community.name}</h1>
                  {community.isPrivate && (
                    <Badge className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 border-0">
                      Private
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                  {community.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                    <Users className="h-4 w-4 text-[#2563EB]" />
                    <span className="font-semibold">{community.memberCount.toLocaleString()}</span>
                    <span>members</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                    <MessageSquare className="h-4 w-4 text-[#F97316]" />
                    <span className="font-semibold">{community.postCount}</span>
                    <span>posts</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleJoinToggle}
                className={cn(
                  "flex-1 rounded-xl h-12 font-semibold",
                  isJoined
                    ? "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-300 dark:hover:bg-neutral-600"
                    : "bg-gradient-to-r from-[#2563EB] to-[#3B82F6] shadow-lg shadow-[#2563EB]/25"
                )}
              >
                {isJoined ? (
                  <>
                    <UserCheck className="h-5 w-5 mr-2" />
                    Joined
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Join Community
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="rounded-xl h-12 px-4 border-2"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="px-4 py-4 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-16 z-30 mt-4">
          <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
            <button
              onClick={() => setSelectedTab('posts')}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap font-semibold text-sm transition-all flex-shrink-0",
                selectedTab === 'posts'
                  ? "bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white shadow-lg shadow-[#2563EB]/25"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              )}
            >
              <MessageSquare className="h-4 w-4" />
              Posts
            </button>
            <button
              onClick={() => setSelectedTab('events')}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap font-semibold text-sm transition-all flex-shrink-0",
                selectedTab === 'events'
                  ? "bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white shadow-lg shadow-[#F97316]/25"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              )}
            >
              <Calendar className="h-4 w-4" />
              Events
              <Badge className="bg-white/20 text-white border-0 text-xs">
                {events.length}
              </Badge>
            </button>
            <button
              onClick={() => setSelectedTab('members')}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap font-semibold text-sm transition-all flex-shrink-0",
                selectedTab === 'members'
                  ? "bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white shadow-lg shadow-[#7C3AED]/25"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              )}
            >
              <Users className="h-4 w-4" />
              Members
            </button>
          </div>
        </div>

        {/* Posts Tab */}
        {selectedTab === 'posts' && (
          <div className="px-4 py-6 space-y-4">
            {/* Create Post Card */}
            {isJoined && (
              <Card className="p-5 rounded-3xl">
                <Textarea 
                  placeholder="Share your thoughts with the community..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={3}
                  className="mb-3 border-2 rounded-2xl resize-none"
                />
                <div className="flex justify-between items-center">
                  <Button variant="ghost" size="sm" className="gap-2 text-neutral-600">
                    <ImageIcon className="h-4 w-4" />
                    Add Image
                  </Button>
                  <Button 
                    onClick={handlePost} 
                    className="bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-xl"
                    disabled={!newPost.trim()}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Post
                  </Button>
                </div>
              </Card>
            )}

            {/* Posts List */}
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="p-5 rounded-3xl hover:shadow-xl transition-shadow">
                  <div className="flex gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-[#2563EB] to-[#3B82F6] text-white">
                        {post.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold text-neutral-900 dark:text-neutral-100">{post.author.name}</p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {formatDate(post.createdAt)}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      <p className="text-neutral-700 dark:text-neutral-300 mb-3 leading-relaxed">
                        {post.content}
                      </p>

                      {post.images && post.images.length > 0 && (
                        <div className="mb-3 rounded-2xl overflow-hidden">
                          <img 
                            src={post.images[0]}
                            alt="Post"
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}

                      {post.poll && (
                        <div className="mb-4 p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl">
                          <p className="font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
                            {post.poll.question}
                          </p>
                          <div className="space-y-2">
                            {post.poll.options.map((option) => {
                              const percentage = (option.votes / post.poll!.totalVotes) * 100;
                              return (
                                <button
                                  key={option.id}
                                  className="w-full text-left p-3 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 hover:border-[#2563EB] transition-colors"
                                >
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium">{option.text}</span>
                                    <span className="text-sm font-bold text-[#2563EB]">
                                      {percentage.toFixed(0)}%
                                    </span>
                                  </div>
                                  <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] rounded-full"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-3">
                            {post.poll.totalVotes.toLocaleString()} votes
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="gap-2 text-neutral-600 dark:text-neutral-400">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="font-semibold">{post.upvotes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2 text-neutral-600 dark:text-neutral-400">
                          <MessageSquare className="h-4 w-4" />
                          <span className="font-semibold">{post.commentCount}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Events Tab */}
        {selectedTab === 'events' && (
          <div className="px-4 py-6 space-y-4">
            {events.length > 0 ? (
              events.map((ce, index) => (
                <motion.div
                  key={ce.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link to={`/event/${ce.event.id}`}>
                    <Card className="overflow-hidden rounded-3xl hover:shadow-xl transition-all border-2 border-neutral-200 dark:border-neutral-800 hover:border-[#F97316]">
                      {ce.isPinned && (
                        <div className="bg-gradient-to-r from-[#F97316] to-[#FB923C] px-4 py-2 flex items-center gap-2">
                          <Pin className="h-4 w-4 text-white" />
                          <span className="text-sm font-semibold text-white">Pinned Event</span>
                        </div>
                      )}
                      <div className="relative h-48">
                        <img 
                          src={ce.event.coverImage}
                          alt={ce.event.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold text-lg text-neutral-900 dark:text-neutral-100 mb-2">
                          {ce.event.title}
                        </h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                          {ce.event.description}
                        </p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <Calendar className="h-4 w-4 text-[#F97316]" />
                            <span>{ce.event.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                            <Clock className="h-4 w-4 text-[#2563EB]" />
                            <span>{ce.event.time}</span>
                          </div>
                          {ce.event.location && (
                            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                              <MapPin className="h-4 w-4 text-[#7C3AED]" />
                              <span>{ce.event.location}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge className="bg-gradient-to-r from-[#F97316] to-[#FB923C] text-white border-0">
                            {ce.event.price === 0 ? 'Free' : `AED ${ce.event.price}`}
                          </Badge>
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">
                            {ce.event.attendeeCount} attending
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))
            ) : (
              <Card className="p-8 text-center rounded-2xl">
                <Calendar className="h-12 w-12 mx-auto text-neutral-400 mb-4" />
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">No events yet</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  This community hasn't hosted any events yet
                </p>
              </Card>
            )}
          </div>
        )}

        {/* Members Tab */}
        {selectedTab === 'members' && (
          <div className="px-4 py-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                Community Members
              </h2>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {community.memberCount.toLocaleString()} total
              </span>
            </div>

            <div className="space-y-3">
              {members.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="p-4 rounded-2xl hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-14 h-14">
                        <AvatarImage src={member.user.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] text-white">
                          {member.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-neutral-900 dark:text-neutral-100">
                            {member.user.name}
                          </p>
                          {member.role !== 'member' && (
                            <Badge className="bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white border-0 text-xs">
                              {member.role}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {member.user.bio}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-neutral-500">
                          <span>Joined {new Date(member.joinedAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            <span>{member.contributionScore} points</span>
                          </div>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="rounded-xl">
                        View
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
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
          <Link to="/communities" className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl bg-[#DBEAFE] dark:bg-[#2563EB]/20 text-[#2563EB]">
            <Users className="h-5 w-5" />
            <span className="text-xs font-medium">Community</span>
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
