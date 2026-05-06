import { Link } from 'react-router';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Calendar, MapPin, Users, Clock, TrendingUp, Sparkles } from 'lucide-react';
import { Event } from '../../../types';
import { format } from 'date-fns';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface EventCardProps {
  event: Event;
  variant?: 'default' | 'compact' | 'featured';
  showAIBadge?: boolean;
  className?: string;
}

export function EventCard({ event, variant = 'default', showAIBadge = false, className }: EventCardProps) {
  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (isCompact) {
    return (
      <Link to={`/events/${event.id}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className={cn(
            "p-4 hover:shadow-xl transition-all border-2 hover:border-[#7C3AED]/20 rounded-2xl cursor-pointer group",
            className
          )}>
            <div className="flex gap-4">
              {/* Date Badge */}
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex flex-col items-center justify-center text-white shadow-lg">
                <span className="text-xs font-medium">{format(new Date(event.date), 'MMM')}</span>
                <span className="text-2xl font-bold leading-none">{format(new Date(event.date), 'd')}</span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-neutral-900 mb-1 line-clamp-1 group-hover:text-[#7C3AED] transition-colors">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
                  <Clock className="h-3.5 w-3.5 flex-shrink-0" />
                  <span className="truncate">{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={cn("text-xs px-2 py-0.5 border capitalize", getCategoryColor(event.category))}>
                    {event.category}
                  </Badge>
                  {event.attendeeCount >= 50 && (
                    <Badge className="text-xs px-2 py-0.5 bg-[#F97316]/10 text-[#F97316] border-[#F97316]/20">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link to={`/events/${event.id}`}>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <Card className={cn(
          "overflow-hidden hover:shadow-2xl transition-all border-2 hover:border-[#7C3AED]/20 rounded-2xl cursor-pointer group",
          isFeatured && "border-[#F97316]/30 bg-gradient-to-br from-white to-[#FFF4ED]",
          className
        )}>
          {/* Image */}
          <div className="relative h-48 bg-gradient-to-br from-[#EDE9FE] via-[#DBEAFE] to-[#FFF4ED] overflow-hidden">
            {/* Placeholder for event image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Calendar className="h-20 w-20 text-[#7C3AED]/20" />
            </div>
            
            {/* Category Badge - Top Left */}
            <div className="absolute top-3 left-3">
              <Badge className={cn("px-3 py-1 border font-medium shadow-lg backdrop-blur-sm capitalize", getCategoryColor(event.category))}>
                {event.category}
              </Badge>
            </div>

            {/* AI Badge - Top Right */}
            {showAIBadge && (
              <div className="absolute top-3 right-3">
                <Badge className="px-3 py-1 bg-[#2563EB]/90 text-white border-0 font-medium shadow-lg backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  AI Pick
                </Badge>
              </div>
            )}

            {/* Trending Badge - Bottom Right */}
            {event.trending && (
              <div className="absolute bottom-3 right-3">
                <Badge className="px-3 py-1 bg-[#F97316]/90 text-white border-0 font-medium shadow-lg backdrop-blur-sm">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  Trending
                </Badge>
              </div>
            )}

            {/* Date Badge - Bottom Left */}
            <div className="absolute bottom-3 left-3">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                <div className="text-[#7C3AED] text-xs font-semibold">{format(new Date(event.date), 'MMM')}</div>
                <div className="text-neutral-900 text-2xl font-bold leading-none">{format(new Date(event.date), 'd')}</div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-[#7C3AED] transition-colors">
              {event.title}
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Clock className="h-4 w-4 flex-shrink-0 text-[#7C3AED]" />
                <span>{format(new Date(event.date), 'EEEE, MMM d, yyyy')} • {event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <MapPin className="h-4 w-4 flex-shrink-0 text-[#F97316]" />
                <span className="truncate">{event.location || 'Virtual Event'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-600">
                <Users className="h-4 w-4 flex-shrink-0 text-[#10B981]" />
                <span>{event.attendeeCount} attending</span>
                {event.capacity && (
                  <span className="text-neutral-500">• {event.capacity} max</span>
                )}
              </div>
            </div>

            {/* Organizer */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 border-2 border-[#7C3AED]/20">
                  <AvatarFallback className="bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] text-white text-xs font-semibold">
                    {getInitials(event.organizer.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-neutral-900">{event.organizer.name}</p>
                  <p className="text-xs text-neutral-600">Organizer</p>
                </div>
              </div>

              <Button
                size="sm"
                className="bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#A78BFA] rounded-xl shadow-lg shadow-[#7C3AED]/20 group-hover:shadow-xl transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  // Handle RSVP
                }}
              >
                RSVP
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
