import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Separator } from '../../components/ui/separator';
import { useApp } from '../../../context/AppContext';
import { useAuth } from '../../../context/AuthContext';
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Share2,
  Heart,
  ChevronLeft,
  CheckCircle,
  Sparkles,
  MessageCircle,
  TrendingUp,
  Navigation,
  Compass,
  Trophy,
  UserCircle,
  Wallet
} from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, rsvpToEvent, cancelRSVP, rsvps } = useApp();
  const { user } = useAuth();
  const [isRSVPing, setIsRSVPing] = useState(false);

  const navItems = [
    { label: 'Discover', href: '/discover', icon: Compass },
    { label: 'My Events', href: '/my-events', icon: Calendar },
    { label: 'Calendar', href: '/calendar', icon: Calendar },
    { label: 'Achievements', href: '/achievements', icon: Trophy },
    { label: 'Communities', href: '/communities', icon: Users },
    { label: 'Profile', href: '/profile', icon: UserCircle },
    { label: 'Wallet', href: '/wallet', icon: Wallet },
  ];

  const event = events.find(e => e.id === id);
  const hasRSVP = rsvps.some(rsvp => rsvp.eventId === id && rsvp.status === 'confirmed');

  if (!event) {
    return (
      <>
        <UnifiedSidebar navItems={navItems} role="attendee" />
        <div className="main-content-area min-h-screen bg-background dark:bg-background pb-20">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">Event Not Found</h2>
              <p className="text-neutral-600 mb-6">The event you're looking for doesn't exist.</p>
              <Button onClick={() => navigate('/discover')}>
                Back to Discover
              </Button>
            </div>
          </div>
        </div>
        <MobileBottomNav />
      </>
    );
  }

  const handleRSVP = async () => {
    if (!user) {
      toast.error('Please login to RSVP');
      return;
    }

    setIsRSVPing(true);
    
    try {
      if (hasRSVP) {
        await cancelRSVP(event.id);
        toast.success('RSVP cancelled', {
          description: 'You can always RSVP again later'
        });
      } else {
        await rsvpToEvent(event.id);
        toast.success('RSVP confirmed! 🎉', {
          description: 'Check your email for event details'
        });
      }
    } catch (error) {
      toast.error('Failed to RSVP');
    } finally {
      setIsRSVPing(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      } catch (error) {
        const input = document.createElement('input');
        input.value = window.location.href;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        try {
          document.execCommand('copy');
          toast.success('Link copied to clipboard!');
        } catch (e) {
          toast.error('Could not copy link. Please copy manually.');
        }
        document.body.removeChild(input);
      }
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      technology: 'bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20',
      music: 'bg-[#F97316]/10 text-[#F97316] border-[#F97316]/20',
      sports: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
      arts: 'bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20',
      food: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
      business: 'bg-[#64748B]/10 text-[#64748B] border-[#64748B]/20',
      networking: 'bg-[#EC4899]/10 text-[#EC4899] border-[#EC4899]/20',
    };
    return colors[category] || 'bg-neutral-100 text-neutral-600 border-neutral-200';
  };

  const attendeePercentage = event.capacity 
    ? Math.round((event.attendeeCount / event.capacity) * 100)
    : 0;

  return (
    <EventraMainLayout>
        <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="hover:bg-neutral-100 rounded-xl -ml-2"
        >
          <ChevronLeft className="mr-1 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden rounded-2xl shadow-xl">
              <div className="relative h-80 bg-gradient-to-br from-[#EDE9FE] via-[#DBEAFE] to-[#FFF4ED]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Calendar className="h-32 w-32 text-[#7C3AED]/20" />
                </div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className={cn("px-3 py-1 border shadow-lg backdrop-blur-sm capitalize", getCategoryColor(event.category))}>
                    {event.category}
                  </Badge>
                  {event.trending && (
                    <Badge className="px-3 py-1 bg-[#F97316]/90 text-white border-0 shadow-lg backdrop-blur-sm">
                      <TrendingUp className="h-3.5 w-3.5 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleShare}
                    className="rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="rounded-xl bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Event Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="p-8 rounded-2xl shadow-lg">
              <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                {event.title}
              </h1>

              {/* Key Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED]/10 flex-shrink-0">
                    <Calendar className="h-5 w-5 text-[#7C3AED]" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{format(new Date(event.date), 'EEEE, MMMM d, yyyy')}</p>
                    <p className="text-sm text-neutral-600">{event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F97316]/10 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[#F97316]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-neutral-900">{event.location || 'Virtual Event'}</p>
                    {event.location && (
                      <Button 
                        variant="link" 
                        size="sm" 
                        className="h-auto p-0 text-[#7C3AED] hover:text-[#8B5CF6]"
                      >
                        <Navigation className="h-3.5 w-3.5 mr-1" />
                        Get Directions
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10B981]/10 flex-shrink-0">
                    <Users className="h-5 w-5 text-[#10B981]" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{event.attendeeCount} attending</p>
                    {event.capacity && (
                      <p className="text-sm text-neutral-600">{event.capacity - event.attendeeCount} spots left</p>
                    )}
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-neutral-900 mb-3">About This Event</h3>
                <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>

              <Separator className="my-6" />

              {/* Organizer */}
              <div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">Organizer</h3>
                <Link to={`/profile/${event.organizer.id}`}>
                  <Card className="p-4 rounded-xl hover:shadow-lg transition-all cursor-pointer border-2 hover:border-[#7C3AED]/20">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-14 w-14 border-2 border-[#7C3AED]/20">
                        <AvatarFallback className="bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] text-white font-semibold">
                          {getInitials(event.organizer.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-neutral-900">{event.organizer.name}</p>
                        <p className="text-sm text-neutral-600">Event Organizer</p>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-xl border-2">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </Card>
                </Link>
              </div>
            </Card>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 rounded-2xl bg-gradient-to-br from-[#DBEAFE] to-[#EDE9FE] border-2 border-[#2563EB]/20">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] shadow-lg flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-[#2563EB] mb-2">AI Insight</h4>
                  <p className="text-sm text-neutral-700">
                    This event matches your interest in {event.category} and is highly rated by attendees with similar preferences. Based on your activity, you'll likely enjoy this experience!
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* RSVP Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:sticky md:top-24"
          >
            <Card className="p-6 rounded-2xl shadow-xl border-2 border-[#7C3AED]/20">
              <div className="mb-4">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-3xl font-bold text-neutral-900">
                    {event.price === 0 ? 'Free' : `$${event.price}`}
                  </span>
                  <span className="text-sm text-neutral-600">• {event.type === 'in-person' ? 'In-Person' : event.type === 'virtual' ? 'Virtual' : 'Hybrid'} Event</span>
                </div>
                {event.capacity && (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-neutral-600">{event.attendeeCount} / {event.capacity} attending</span>
                      <span className="font-semibold text-[#7C3AED]">{attendeePercentage}%</span>
                    </div>
                    <div className="h-2 bg-neutral-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] rounded-full transition-all"
                        style={{ width: `${attendeePercentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {hasRSVP ? (
                <div className="space-y-3">
                  <div className="p-4 bg-[#D1FAE5] rounded-xl">
                    <div className="flex items-center gap-2 text-[#059669] mb-2">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">You're Going!</span>
                    </div>
                    <p className="text-sm text-neutral-700">
                      We'll send you a reminder before the event
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleRSVP}
                    disabled={isRSVPing}
                    className="w-full rounded-xl border-2 hover:border-[#EF4444] hover:text-[#EF4444] hover:bg-[#FEE2E2]"
                  >
                    Cancel RSVP
                  </Button>
                </div>
              ) : (
                <Button
                  size="lg"
                  onClick={handleRSVP}
                  disabled={isRSVPing || (event.capacity && event.attendeeCount >= event.capacity)}
                  className="w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#A78BFA] rounded-xl shadow-lg shadow-[#7C3AED]/25 h-12"
                >
                  {event.capacity && event.attendeeCount >= event.capacity ? 'Event Full' : 'RSVP Now'}
                </Button>
              )}

              <Separator className="my-4" />

              <div className="space-y-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="w-full rounded-xl border-2"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Event
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-xl border-2"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Add to Calendar
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Similar Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="p-6 rounded-2xl">
              <h3 className="font-bold text-neutral-900 mb-4">Similar Events</h3>
              <div className="space-y-3">
                {events
                  .filter(e => e.category === event.category && e.id !== event.id)
                  .slice(0, 3)
                  .map(similarEvent => (
                    <Link key={similarEvent.id} to={`/events/${similarEvent.id}`}>
                      <Card className="p-3 rounded-xl hover:shadow-lg transition-all cursor-pointer border hover:border-[#7C3AED]/30">
                        <div className="flex gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex flex-col items-center justify-center text-white flex-shrink-0">
                            <span className="text-xs font-semibold">{format(new Date(similarEvent.date), 'MMM')}</span>
                            <span className="text-lg font-bold leading-none">{format(new Date(similarEvent.date), 'd')}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm text-neutral-900 line-clamp-2 mb-1">
                              {similarEvent.title}
                            </p>
                            <p className="text-xs text-neutral-600">{similarEvent.attendeeCount} attending</p>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Mobile Sticky RSVP Button */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-neutral-200 shadow-2xl z-40">
        {hasRSVP ? (
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-[#D1FAE5] rounded-xl">
              <CheckCircle className="h-5 w-5 text-[#059669]" />
              <span className="font-semibold text-[#059669]">You're Going!</span>
            </div>
            <Button
              variant="outline"
              onClick={handleRSVP}
              disabled={isRSVPing}
              className="rounded-xl border-2 px-6"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <Button
            size="lg"
            onClick={handleRSVP}
            disabled={isRSVPing || (event.capacity && event.attendeeCount >= event.capacity)}
            className="w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#A78BFA] rounded-xl shadow-lg shadow-[#7C3AED]/25 h-14 text-base"
          >
            {event.capacity && event.attendeeCount >= event.capacity ? 'Event Full' : 'RSVP Now'}
          </Button>
        )}
      </div>
        </div>
      </div>
    </EventraMainLayout>
  );
}
