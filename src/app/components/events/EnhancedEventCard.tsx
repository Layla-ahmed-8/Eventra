import { Link } from 'react-router';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  Heart,
  Share2,
  ExternalLink,
  Video,
  Bookmark
} from 'lucide-react';
import { EventBadgeGroup } from './EventBadges';
import { 
  EventMetadata,
  getCapacityStatus,
} from '../../../utils/eventTypes';
import { cn, SPACING, RADIUS } from '../../../utils/designSystem';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface EnhancedEventCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  time?: string;
  location?: string;
  organizerName: string;
  organizerAvatar?: string;
  metadata: EventMetadata;
  price?: number;
  isFavorited?: boolean;
  isRSVPd?: boolean;
  onFavorite?: () => void;
  onShare?: () => void;
  variant?: 'default' | 'compact' | 'featured';
}

export function EnhancedEventCard({
  id,
  title,
  description,
  imageUrl,
  date,
  time,
  location,
  organizerName,
  organizerAvatar,
  metadata,
  price,
  isFavorited = false,
  isRSVPd = false,
  onFavorite,
  onShare,
  variant = 'default',
}: EnhancedEventCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const capacityStatus = getCapacityStatus(
    metadata.attendeeCount || 0,
    metadata.capacity
  );

  const isSoldOut = capacityStatus.status === 'full';
  const isVirtual = metadata.type === 'virtual';
  const isHybrid = metadata.type === 'hybrid';

  // Variant-specific classes
  const cardClasses = {
    default: 'h-full',
    compact: 'h-full',
    featured: 'lg:col-span-2 h-full',
  };

  const imageHeights = {
    default: 'h-48',
    compact: 'h-32',
    featured: 'h-64 md:h-80',
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={cardClasses[variant]}
    >
      <Card 
        className={cn(
          'overflow-hidden h-full flex flex-col transition-all duration-300',
          isHovered && 'shadow-2xl ring-2 ring-[#7C3AED]/20',
          RADIUS.lg
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Section */}
        <Link to={`/events/${id}`} className="relative block overflow-hidden group">
          <div className={cn('relative w-full overflow-hidden bg-neutral-100', imageHeights[variant])}>
            <ImageWithFallback
              src={imageUrl}
              alt={title}
              className={cn(
                'w-full h-full object-cover transition-transform duration-500',
                'group-hover:scale-110',
                !imageLoaded && 'opacity-0'
              )}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
            
            {/* Quick Actions - Top Right */}
            <div className="absolute top-4 right-4 flex gap-2">
              {onFavorite && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.preventDefault();
                    onFavorite();
                  }}
                  className={cn(
                    'p-2 rounded-xl backdrop-blur-md transition-colors',
                    isFavorited 
                      ? 'bg-[#EC4899] text-white' 
                      : 'bg-white/90 text-neutral-700 hover:bg-white'
                  )}
                >
                  <Heart className={cn('h-4 w-4', isFavorited && 'fill-current')} />
                </motion.button>
              )}
              
              {onShare && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.preventDefault();
                    onShare();
                  }}
                  className="p-2 rounded-xl bg-white/90 backdrop-blur-md text-neutral-700 hover:bg-white transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                </motion.button>
              )}
            </div>

            {/* Virtual/Hybrid Indicator */}
            {(isVirtual || isHybrid) && (
              <div className="absolute bottom-4 left-4">
                <Badge className="bg-white/95 backdrop-blur-sm text-neutral-900 border-0 font-semibold">
                  <Video className="mr-1 h-3 w-3" />
                  {isVirtual ? 'Virtual Event' : 'Hybrid Event'}
                </Badge>
              </div>
            )}

            {/* RSVPd Indicator */}
            {isRSVPd && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-[#10B981] text-white border-0 font-semibold">
                  <Bookmark className="mr-1 h-3 w-3 fill-current" />
                  You're Going!
                </Badge>
              </div>
            )}
          </div>
        </Link>

        {/* Content Section - Auto Layout with 8px spacing */}
        <div className={cn('flex flex-col flex-1', 'p-6 gap-4')}>
          {/* Badges Row */}
          <EventBadgeGroup
            type={metadata.type}
            category={metadata.category}
            pricing={metadata.pricing}
            price={price}
            attendeeCount={metadata.attendeeCount || 0}
            capacity={metadata.capacity}
            access={metadata.access}
            size="sm"
            maxBadges={variant === 'featured' ? 5 : 3}
          />

          {/* Title & Description */}
          <Link to={`/events/${id}`} className="space-y-2">
            <h3 className={cn(
              'font-bold text-neutral-900 hover:text-[#7C3AED] transition-colors line-clamp-2',
              variant === 'featured' ? 'text-2xl' : 'text-lg'
            )}>
              {title}
            </h3>
            {variant === 'featured' && (
              <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                {description}
              </p>
            )}
          </Link>

          {/* Event Details - Auto Layout */}
          <div className="space-y-2 text-sm text-neutral-600">
            {/* Date & Time */}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#7C3AED] flex-shrink-0" />
              <span className="font-medium">{date}</span>
              {time && (
                <>
                  <span className="text-neutral-400">•</span>
                  <Clock className="h-4 w-4 text-neutral-400 flex-shrink-0" />
                  <span>{time}</span>
                </>
              )}
            </div>

            {/* Location (for in-person and hybrid) */}
            {location && metadata.type !== 'virtual' && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#F97316] flex-shrink-0" />
                <span className="line-clamp-1">{location}</span>
              </div>
            )}

            {/* Capacity */}
            {metadata.capacity && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#2563EB] flex-shrink-0" />
                <span>
                  {metadata.attendeeCount || 0} / {metadata.capacity} attending
                </span>
                {capacityStatus.status === 'almost-full' && (
                  <Badge className="bg-[#FFF4ED] text-[#F97316] border-0 text-xs">
                    Filling Fast!
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Organizer Info */}
          <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
            {organizerAvatar ? (
              <img 
                src={organizerAvatar} 
                alt={organizerName}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-semibold">
                {organizerName.charAt(0)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-neutral-600 truncate">
                Hosted by <span className="font-semibold text-neutral-900">{organizerName}</span>
              </p>
            </div>
          </div>

          {/* Footer - CTA Section */}
          <div className="flex items-center justify-between gap-3 pt-2 mt-auto">
            {/* Price Display */}
            <div className="flex flex-col">
              {metadata.pricing === 'free' ? (
                <span className="text-2xl font-bold text-[#10B981]">FREE</span>
              ) : (
                <>
                  <span className="text-xs text-neutral-500">From</span>
                  <span className="text-2xl font-bold text-neutral-900">
                    ${price || 0}
                  </span>
                </>
              )}
            </div>

            {/* Action Button */}
            {isSoldOut ? (
              <Button
                disabled
                variant="outline"
                className={cn('rounded-xl flex-1 max-w-[140px]')}
              >
                Sold Out
              </Button>
            ) : isRSVPd ? (
              <Button
                asChild
                variant="outline"
                className={cn(
                  'rounded-xl flex-1 max-w-[140px]',
                  'border-[#10B981] text-[#10B981] hover:bg-[#D1FAE5]'
                )}
              >
                <Link to={`/events/${id}`}>
                  View Details
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                className={cn(
                  'rounded-xl flex-1 max-w-[140px]',
                  'bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6]',
                  'hover:from-[#8B5CF6] hover:to-[#A78BFA]',
                  'shadow-lg shadow-[#7C3AED]/25'
                )}
              >
                <Link to={`/events/${id}`}>
                  {metadata.pricing === 'free' ? 'RSVP Free' : 'Get Tickets'}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Compact variant for list views
export function CompactEventCard(props: EnhancedEventCardProps) {
  return <EnhancedEventCard {...props} variant="compact" />;
}

// Featured variant for hero/spotlight sections
export function FeaturedEventCard(props: EnhancedEventCardProps) {
  return <EnhancedEventCard {...props} variant="featured" />;
}
