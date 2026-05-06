import { useNavigate } from 'react-router';
import { EventraMainLayout } from '../../components/layouts/EventraMainLayout';

import { Button } from '../../components/ui/button';
import { EnhancedEventForm } from '../../components/organizer/EnhancedEventForm';
import { ArrowLeft, Calendar, LayoutDashboard, PlusCircle, BarChart3, User } from 'lucide-react';
import { toast } from 'sonner';


export default function CreateEventPage() {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', href: '/organizer', icon: LayoutDashboard },
    { label: 'Create Event', href: '/organizer/create', icon: PlusCircle },
    { label: 'My Events', href: '/organizer/events', icon: Calendar },
    { label: 'Analytics', href: '/organizer/analytics', icon: BarChart3 },
    { label: 'Profile', href: '/organizer/profile', icon: User },
  ];

  const handleSubmit = (data: any) => {
    // Save event data
    console.log('Publishing event:', data);
    toast.success('Event created and published successfully! 🎉');
    navigate('/organizer');
  };

  const handleSaveDraft = (data: any) => {
    // Save draft to localStorage
    localStorage.setItem('eventDraft', JSON.stringify(data));
    console.log('Draft saved:', data);
  };

  return (
    <EventraMainLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/organizer')}
              className="mb-4 rounded-xl"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Create New Event</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Fill in the details to create your amazing event. Your progress is auto-saved.
            </p>
          </div>

          {/* Enhanced Form with Live Preview */}
          <EnhancedEventForm onSubmit={handleSubmit} onSaveDraft={handleSaveDraft} />
        </div>

    </EventraMainLayout>
  );
}
