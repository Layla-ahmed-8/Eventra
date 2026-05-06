import { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Card } from '../../components/ui/card';
import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';

const mockEvents = [
  {
    id: 1,
    title: 'Tech Innovation Summit 2026',
    date: '2026-04-22',
    time: '09:00 AM',
    location: 'San Francisco Convention Center',
    type: 'Conference',
    attendees: 1200,
    status: 'confirmed',
    color: 'bg-purple-500'
  },
  {
    id: 2,
    title: 'Startup Pitch Night',
    date: '2026-04-24',
    time: '06:00 PM',
    location: 'Innovation Hub',
    type: 'Networking',
    attendees: 150,
    status: 'confirmed',
    color: 'bg-blue-500'
  },
  {
    id: 3,
    title: 'Design Thinking Workshop',
    date: '2026-04-28',
    time: '02:00 PM',
    location: 'Creative Space Downtown',
    type: 'Workshop',
    attendees: 45,
    status: 'waitlist',
    color: 'bg-orange-500'
  },
  {
    id: 4,
    title: 'AI & Machine Learning Meetup',
    date: '2026-05-02',
    time: '07:00 PM',
    location: 'Tech Campus',
    type: 'Meetup',
    attendees: 80,
    status: 'confirmed',
    color: 'bg-purple-500'
  },
];

const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<'month' | 'list'>('month');
  const [selectedDate, setSelectedDate] = useState<number | null>(22);

  const getEventsForDate = (day: number) => {
    return mockEvents.filter(event => {
      const eventDay = parseInt(event.date.split('-')[2]);
      return eventDay === day;
    });
  };

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <EventraMainLayout>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1>My Calendar</h1>
            <Button variant="ghost" size="icon">
              <Filter className="h-5 w-5" />
            </Button>
          </div>

          {/* Month Selector */}
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-base font-medium">April 2026</span>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <Button
              variant={view === 'month' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('month')}
              className="flex-1"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Month
            </Button>
            <Button
              variant={view === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView('list')}
              className="flex-1"
            >
              List
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Content */}
      <div className="px-4 py-4">
        {view === 'month' ? (
          <>
            {/* Calendar Grid */}
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
              {/* Week Days */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {weekDays.map(day => (
                  <div key={day} className="text-center text-xs text-gray-500 font-medium">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-2">
                {daysInMonth.map(day => {
                  const dayEvents = getEventsForDate(day);
                  const isSelected = selectedDate === day;
                  const hasEvents = dayEvents.length > 0;

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center relative transition-colors ${
                        isSelected
                          ? 'bg-purple-500 text-white'
                          : hasEvents
                          ? 'bg-purple-50 text-purple-700'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-sm font-medium">{day}</span>
                      {hasEvents && (
                        <div className="flex gap-0.5 mt-1">
                          {dayEvents.slice(0, 3).map((event, idx) => (
                            <div
                              key={idx}
                              className={`h-1 w-1 rounded-full ${
                                isSelected ? 'bg-white' : event.color
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Events for Selected Date */}
            {selectedDate && (
              <div>
                <h2 className="mb-4">
                  Events on April {selectedDate}
                  <span className="text-gray-500 ml-2">({selectedDateEvents.length})</span>
                </h2>

                {selectedDateEvents.length > 0 ? (
                  <div className="space-y-3">
                    {selectedDateEvents.map(event => (
                      <Card
                        key={event.id}
                        className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => navigate(`/events/${event.id}`)}
                      >
                        <div className="flex gap-3">
                          <div className={`w-1 ${event.color} rounded-full`} />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3>{event.title}</h3>
                              <Badge
                                variant={event.status === 'confirmed' ? 'default' : 'secondary'}
                              >
                                {event.status}
                              </Badge>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="h-4 w-4" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="h-4 w-4" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Users className="h-4 w-4" />
                                <span>{event.attendees} attending</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 text-center">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No events on this day</p>
                  </Card>
                )}
              </div>
            )}
          </>
        ) : (
          /* List View */
          <div className="space-y-4">
            {mockEvents.map(event => (
              <Card
                key={event.id}
                className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                <div className="flex gap-3">
                  <div className={`w-1 ${event.color} rounded-full`} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3>{event.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{event.date}</p>
                      </div>
                      <Badge
                        variant={event.status === 'confirmed' ? 'default' : 'secondary'}
                      >
                        {event.status}
                      </Badge>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} attending</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

    </EventraMainLayout>
  );
}
