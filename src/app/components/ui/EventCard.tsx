import { Heart, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

interface EventCardProps {
  id: string;
  title: string;
  imageUrl: string;
  date: string;
  location: string;
  attendees: number;
  capacity: number;
  price?: number;
  category: string;
  isBookmarked?: boolean;
  onBookmark?: () => void;
  onClick?: () => void;
}

export function EventCard({
  title,
  imageUrl,
  date,
  location,
  attendees,
  capacity,
  price,
  category,
  isBookmarked = false,
  onBookmark,
  onClick,
}: EventCardProps) {
  const percentageFilled = (attendees / capacity) * 100;

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onClick={onClick}
    >
      {/* Image */}
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-white/90 text-neutral-900 backdrop-blur-sm">
            {category}
          </Badge>
        </div>
        {percentageFilled > 80 && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-orange-500/90 text-white backdrop-blur-sm">
              Filling Fast
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-neutral-900 line-clamp-2">
          {title}
        </h3>

        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>{date}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <Users className="h-4 w-4 flex-shrink-0" />
            <span>{attendees} / {capacity} attending</span>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="mt-4">
          <div className="h-1.5 w-full rounded-full bg-neutral-200">
            <div
              className="h-full rounded-full bg-primary-600 transition-all duration-300"
              style={{ width: `${percentageFilled}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex -space-x-2">
            {/* Mock avatars */}
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop" />
              <AvatarFallback>MJ</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex items-center gap-3">
            {price && (
              <span className="text-lg font-semibold text-neutral-900">
                ${price}
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark?.();
              }}
              className="rounded-full p-2 transition-colors hover:bg-neutral-100"
            >
              <Heart
                className={`h-5 w-5 transition-colors ${
                  isBookmarked ? 'fill-red-500 text-red-500' : 'text-neutral-400'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}