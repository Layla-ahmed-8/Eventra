import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Avatar } from '../../components/ui/avatar';
import {
  ArrowLeft,
  Share2,
  Heart,
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Ticket,
  Check,
  Star,
  Globe,
  Video,
  ExternalLink,
  MessageCircle,
  Sparkles,
  TrendingUp,
  Award,
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../../utils/designSystem';
import { toast } from 'sonner';
import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';

export default function EnhancedEventDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  // Mock event data
  const event = {
    id: '1',
    title: 'Tech Innovation Summit 2026',
    description: 'Join industry leaders and innovators for a day of groundbreaking insights into the future of technology, AI, and digital transformation. This summit brings together the brightest minds in tech to discuss emerging trends, share insights, and network with peers.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=800&fit=crop',
    date: 'Feb 15, 2026',
    fullDate: 'Saturday, February 15, 2026',
    time: '9:00 AM - 6:00 PM',
    location: 'San Francisco Convention Center',
    fullAddress: '747 Howard St, San Francisco, CA 94103',
    organizerName: 'TechCon Global',
    organizerBio: 'Leading technology conference organizer with 15+ years of experience',
    organizerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    organizerEvents: 24,
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
    tags: ['Technology', 'AI', 'Innovation', 'Networking'],
    schedule: [
      { time: '9:00 AM', title: 'Registration & Coffee', description: 'Check-in and networking' },
      { time: '10:00 AM', title: 'Keynote: The Future of AI', description: 'Dr. Sarah Chen' },
      { time: '11:30 AM', title: 'Panel Discussion', description: 'Industry leaders share insights' },
      { time: '1:00 PM', title: 'Lunch & Networking', description: 'Catered lunch provided' },
      { time: '2:30 PM', title: 'Breakout Sessions', description: 'Choose your track' },
      { time: '5:00 PM', title: 'Closing Remarks', description: 'Key takeaways and networking' },
    ],
    attendees: [
      { id: '1', name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
      { id: '2', name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
      { id: '3', name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop' },
      { id: '4', name: 'Sarah Williams', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
      { id: '5', name: 'David Brown', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
    ],
    similarEvents: [
      { id: '2', title: 'AI Workshop Series', date: 'Mar 1, 2026', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop' },
      { id: '3', title: 'Startup Pitch Night', date: 'Mar 8, 2026', image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop' },
    ],
  };

  const handleRSVP = () => {
    setIsRSVPed(!isRSVPed);
    if (!isRSVPed) {
      toast.success('🎉 You\'re going! We\'ve sent confirmation to your email.');
    } else {
      toast.success('RSVP cancelled. Hope to see you next time!');
    }
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? 'Removed from favorites' : '❤️ Added to favorites!');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled share or share failed
        console.log('Share cancelled');
      }
    } else {
      // Fallback: try clipboard API with error handling
      try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('🔗 Link copied to clipboard!');
      } catch (error) {
        // Clipboard API blocked, create a temporary input element
        const input = document.createElement('input');
        input.value = window.location.href;
        input.style.position = 'fixed';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        try {
          document.execCommand('copy');
          toast.success('🔗 Link copied to clipboard!');
        } catch (e) {
          toast.error('Could not copy link. Please copy manually.');
        }
        document.body.removeChild(input);
      }
    }
  };

  const spotsLeft = event.metadata.capacity - event.metadata.attendeeCount;
  const percentageFilled = (event.metadata.attendeeCount / event.metadata.capacity) * 100;

  return (
    <EventraMainLayout>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
        <div className="px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-neutral-900 dark:text-neutral-100" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
            >
              <Share2 className="h-5 w-5 text-neutral-900 dark:text-neutral-100" />
            </button>
            <button
              onClick={handleFavorite}
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors"
            >
              <Heart className={cn(
                "h-5 w-5 transition-colors",
                isFavorited ? "fill-red-500 text-red-500" : "text-neutral-900 dark:text-neutral-100"
              )} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Badges on Image */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <Badge className="bg-white/90 backdrop-blur-sm text-neutral-900 border-0 shadow-lg">
            <Sparkles className="h-3 w-3 mr-1" />
            Featured
          </Badge>
          {spotsLeft < 50 && (
            <Badge className="bg-red-500/90 backdrop-blur-sm text-white border-0 shadow-lg">
              <TrendingUp className="h-3 w-3 mr-1" />
              Filling Fast
            </Badge>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 -mt-8 relative z-10">
        {/* Title Card */}
        <Card className="p-6 rounded-3xl shadow-2xl mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                {event.title}
              </h1>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="rounded-lg">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Key Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
              <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] dark:bg-[#7C3AED]/20 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-5 w-5 text-[#7C3AED]" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">{event.fullDate}</p>
                <p className="text-sm">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
              <div className="w-10 h-10 rounded-xl bg-[#FFF4ED] dark:bg-[#F97316]/20 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-[#F97316]" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">{event.location}</p>
                <p className="text-sm">{event.fullAddress}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-neutral-700 dark:text-neutral-300">
              <div className="w-10 h-10 rounded-xl bg-[#DBEAFE] dark:bg-[#2563EB]/20 flex items-center justify-center flex-shrink-0">
                <DollarSign className="h-5 w-5 text-[#2563EB]" />
              </div>
              <div>
                <p className="font-semibold text-neutral-900 dark:text-neutral-100">${event.price}</p>
                <p className="text-sm">Per ticket</p>
              </div>
            </div>
          </div>

          {/* Capacity Bar */}
          <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  {event.metadata.attendeeCount} going
                </span>
              </div>
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                {spotsLeft} spots left
              </span>
            </div>
            <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] rounded-full transition-all"
                style={{ width: `${percentageFilled}%` }}
              />
            </div>
          </div>
        </Card>

        {/* About */}
        <Card className="p-6 rounded-3xl shadow-lg mb-6">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            About This Event
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {event.description}
          </p>
        </Card>

        {/* Schedule */}
        <Card className="p-6 rounded-3xl shadow-lg mb-6">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Event Schedule
          </h2>
          <div className="space-y-4">
            {event.schedule.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-[#EDE9FE] dark:bg-[#7C3AED]/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-[#7C3AED]" />
                  </div>
                  {index < event.schedule.length - 1 && (
                    <div className="w-0.5 h-full bg-neutral-200 dark:bg-neutral-700 my-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <p className="text-sm font-semibold text-[#7C3AED] mb-1">{item.time}</p>
                  <p className="font-semibold text-neutral-900 dark:text-neutral-100">{item.title}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Organizer */}
        <Card className="p-6 rounded-3xl shadow-lg mb-6">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
            Organizer
          </h2>
          <div className="flex items-start gap-4">
            <img
              src={event.organizerAvatar}
              alt={event.organizerName}
              className="w-16 h-16 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                {event.organizerName}
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                {event.organizerBio}
              </p>
              <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                <div className="flex items-center gap-1">
                  <Ticket className="h-4 w-4" />
                  <span>{event.organizerEvents} events</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.9</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl">
              Follow
            </Button>
          </div>
        </Card>

        {/* Attendees */}
        <Card className="p-6 rounded-3xl shadow-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Who's Going
            </h2>
            <Button variant="ghost" size="sm" className="text-[#7C3AED]">
              See All
            </Button>
          </div>
          <div className="flex items-center">
            <div className="flex -space-x-3">
              {event.attendees.slice(0, 5).map((attendee) => (
                <img
                  key={attendee.id}
                  src={attendee.avatar}
                  alt={attendee.name}
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-900 object-cover"
                />
              ))}
            </div>
            {event.metadata.attendeeCount > 5 && (
              <div className="ml-3 text-sm text-neutral-600 dark:text-neutral-400">
                +{event.metadata.attendeeCount - 5} others
              </div>
            )}
          </div>
        </Card>

        {/* Community preview */}
        <Card className="mb-6 rounded-3xl p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Join the conversation</h2>
            <Badge className="gap-1 border-0 bg-primary-600/10 text-primary-700 dark:text-primary-300">
              <Sparkles className="h-3 w-3" />
              AI summaries on
            </Badge>
          </div>
          <div className="space-y-3">
            {['Parking tips?', 'Meetup spot at 6:45', 'Afterparty thread'].map((t, i) => (
              <div key={i} className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm dark:border-neutral-700 dark:bg-neutral-800/80">
                <p className="font-medium text-neutral-900 dark:text-neutral-100">{t}</p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Community · just now</p>
              </div>
            ))}
          </div>
          <Button className="mt-4 w-full rounded-xl" variant="gradient">
            Join community
          </Button>
        </Card>

        {/* Similar Events — AI */}
        <div className="mb-6">
          <h2 className="mb-1 flex items-center gap-2 text-xl font-bold text-neutral-900 dark:text-neutral-100">
            <Sparkles className="h-5 w-5 text-primary-600" />
            AI-powered: You might also like
          </h2>
          <p className="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
            Based on this event’s category, your interests, and what similar attendees booked next.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {event.similarEvents.map((similar) => (
              <Link
                key={similar.id}
                to={`/events/${similar.id}`}
                className="block"
              >
                <Card className="overflow-hidden rounded-2xl hover:shadow-xl transition-shadow">
                  <img
                    src={similar.image}
                    alt={similar.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <p className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 mb-1 line-clamp-2">
                      {similar.title}
                    </p>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      {similar.date}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-neutral-200 bg-white/95 p-4 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/95">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div className="flex-1">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">Price</p>
            <p className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">${event.price}</p>
          </div>
          <Button
            variant={isRSVPed ? 'success' : 'gradient'}
            onClick={handleRSVP}
            className="h-14 flex-1 rounded-[var(--radius-md)] font-semibold shadow-lg"
          >
            {isRSVPed ? (
              <>
                <Check className="h-5 w-5 mr-2" />
                You're Going!
              </>
            ) : (
              <>
                <Ticket className="h-5 w-5 mr-2" />
                Get Tickets
              </>
            )}
          </Button>
        </div>
      </div>
    </EventraMainLayout>
  );
}
