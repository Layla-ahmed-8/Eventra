import { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { FormField } from '../ux/FormField';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { AlertCircle, CheckCircle, Eye, Calendar, MapPin, DollarSign, Users, Sparkles, Save, AlertTriangle } from 'lucide-react';
import { EventCategory, EventType } from '../../../types';
import { validators, aiSuggestions } from '../../../utils/validation';
import { toast } from 'sonner';
import { motion } from 'motion/react';

interface EventFormData {
  title: string;
  description: string;
  category: EventCategory;
  tags: string[];
  date: string;
  time: string;
  endTime: string;
  eventType: EventType;
  location: string;
  virtualLink: string;
  price: string;
  capacity: string;
}

interface EnhancedEventFormProps {
  onSubmit: (data: EventFormData) => void;
  onSaveDraft: (data: EventFormData) => void;
}

const categories: { id: EventCategory; label: string; icon: string }[] = [
  { id: 'technology', label: 'Technology', icon: '💻' },
  { id: 'business', label: 'Business', icon: '💼' },
  { id: 'arts', label: 'Arts', icon: '🎨' },
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'sports', label: 'Sports', icon: '⚽' },
  { id: 'food', label: 'Food', icon: '🍕' },
  { id: 'education', label: 'Education', icon: '📚' },
  { id: 'health', label: 'Health', icon: '💪' },
  { id: 'networking', label: 'Networking', icon: '🤝' },
];

export function EnhancedEventForm({ onSubmit, onSaveDraft }: EnhancedEventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    category: 'technology',
    tags: [],
    date: '',
    time: '',
    endTime: '',
    eventType: 'in-person',
    location: '',
    virtualLink: '',
    price: '0',
    capacity: '100',
  });

  const [showPreview, setShowPreview] = useState(false);
  const [warnings, setWarnings] = useState<string[]>([]);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (formData.title || formData.description) {
        onSaveDraft(formData);
        toast.success('Draft saved automatically', { duration: 1000 });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [formData, onSaveDraft]);

  // AI-powered validation warnings
  useEffect(() => {
    const newWarnings: string[] = [];

    // Check event timing
    if (formData.date) {
      const eventDate = new Date(formData.date);
      const dayOfWeek = eventDate.getDay();
      if (formData.category === 'business' && (dayOfWeek === 0 || dayOfWeek === 6)) {
        newWarnings.push('Business events typically perform better on weekdays');
      }
    }

    // Check pricing
    const price = parseFloat(formData.price);
    if (price > 200) {
      newWarnings.push('High ticket prices may reduce attendance. Consider offering early bird pricing.');
    }

    // Check capacity
    const capacity = parseInt(formData.capacity);
    if (capacity < 10) {
      newWarnings.push('Small capacity events may have limited visibility');
    }

    setWarnings(newWarnings);
  }, [formData]);

  const updateField = (field: keyof EventFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePublish = () => {
    // Final validation
    const errors: string[] = [];

    if (!formData.title) errors.push('Event title is required');
    if (!formData.description) errors.push('Event description is required');
    if (!formData.date) errors.push('Event date is required');
    if (!formData.time) errors.push('Event time is required');
    if (formData.eventType === 'in-person' && !formData.location) errors.push('Location is required for in-person events');
    if (formData.eventType === 'virtual' && !formData.virtualLink) errors.push('Virtual link is required for online events');

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form Section */}
      <div className="lg:col-span-2 space-y-6">
        {/* Basic Info */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Basic Information</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tell attendees what your event is about</p>
            </div>
          </div>

          <div className="space-y-4">
            <FormField
              label="Event Title"
              name="title"
              value={formData.title}
              onChange={(value) => updateField('title', value)}
              validation={validators.eventTitle}
              required
              placeholder="e.g. AI & Machine Learning Summit 2026"
              aiSuggestion={formData.title === '' ? aiSuggestions.eventTitle(formData.category) : undefined}
              hint="Choose a clear, descriptive title that highlights your event's main theme"
            />

            <div className="space-y-2">
              <Label htmlFor="description">
                Event Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Describe your event in detail..."
                rows={6}
                className="resize-none"
              />
              {formData.description === '' && (
                <button
                  type="button"
                  onClick={() => updateField('description', aiSuggestions.eventDescription(formData.title))}
                  className="flex items-center gap-2 px-3 py-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg text-sm text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors w-full"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate with AI</span>
                </button>
              )}
              <p className="text-xs text-gray-500">{formData.description.length} / 2000 characters</p>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => updateField('category', cat.id)}
                    className={`p-3 rounded-xl border-2 transition-all text-center ${
                      formData.category === cat.id
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                        : 'border-gray-200 dark:border-dark-border hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className="text-xs font-medium">{cat.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Date & Time */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Date & Time</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">When will your event take place?</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Event Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={(value) => updateField('date', value)}
              validation={validators.date}
              required
            />
            <FormField
              label="Start Time"
              name="time"
              type="time"
              value={formData.time}
              onChange={(value) => updateField('time', value)}
              validation={validators.time}
              required
            />
            <FormField
              label="End Time"
              name="endTime"
              type="time"
              value={formData.endTime}
              onChange={(value) => updateField('endTime', value)}
              validation={validators.time}
              required
            />
          </div>
        </Card>

        {/* Location */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Location</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Where will attendees join?</p>
            </div>
          </div>

          <div className="space-y-4">
            <RadioGroup
              value={formData.eventType}
              onValueChange={(value: EventType) => updateField('eventType', value)}
            >
              <div className="grid grid-cols-3 gap-3">
                <div className={`flex items-center space-x-2 p-4 rounded-xl border-2 cursor-pointer ${
                  formData.eventType === 'in-person' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200'
                }`}>
                  <RadioGroupItem value="in-person" id="in-person" />
                  <Label htmlFor="in-person" className="cursor-pointer">In-Person</Label>
                </div>
                <div className={`flex items-center space-x-2 p-4 rounded-xl border-2 cursor-pointer ${
                  formData.eventType === 'virtual' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200'
                }`}>
                  <RadioGroupItem value="virtual" id="virtual" />
                  <Label htmlFor="virtual" className="cursor-pointer">Virtual</Label>
                </div>
                <div className={`flex items-center space-x-2 p-4 rounded-xl border-2 cursor-pointer ${
                  formData.eventType === 'hybrid' ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200'
                }`}>
                  <RadioGroupItem value="hybrid" id="hybrid" />
                  <Label htmlFor="hybrid" className="cursor-pointer">Hybrid</Label>
                </div>
              </div>
            </RadioGroup>

            {(formData.eventType === 'in-person' || formData.eventType === 'hybrid') && (
              <FormField
                label="Venue Location"
                name="location"
                value={formData.location}
                onChange={(value) => updateField('location', value)}
                validation={validators.required}
                required={formData.eventType === 'in-person'}
                placeholder="e.g. Convention Center, Downtown"
                aiSuggestion={formData.location === '' ? aiSuggestions.location() : undefined}
              />
            )}

            {(formData.eventType === 'virtual' || formData.eventType === 'hybrid') && (
              <FormField
                label="Virtual Meeting Link"
                name="virtualLink"
                value={formData.virtualLink}
                onChange={(value) => updateField('virtualLink', value)}
                validation={validators.url}
                required={formData.eventType === 'virtual'}
                placeholder="https://meet.eventra.com/your-event"
              />
            )}
          </div>
        </Card>

        {/* Pricing & Capacity */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Pricing & Capacity</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Set your ticket pricing and limits</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              label="Ticket Price (USD)"
              name="price"
              type="number"
              value={formData.price}
              onChange={(value) => updateField('price', value)}
              validation={validators.price}
              placeholder="0"
              hint="Set to 0 for free events"
            />
            <FormField
              label="Maximum Capacity"
              name="capacity"
              type="number"
              value={formData.capacity}
              onChange={(value) => updateField('capacity', value)}
              validation={validators.capacity}
              placeholder="100"
              hint="Total number of attendees allowed"
            />
          </div>
        </Card>

        {/* AI Warnings */}
        {warnings.length > 0 && (
          <Card className="p-6 border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-orange-900 dark:text-orange-300 mb-2">AI Optimization Suggestions</h4>
                <ul className="space-y-1">
                  {warnings.map((warning, index) => (
                    <li key={index} className="text-sm text-orange-700 dark:text-orange-300">• {warning}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button
            onClick={() => onSaveDraft(formData)}
            variant="outline"
            className="flex-1"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button
            onClick={handlePublish}
            className="flex-1 btn-glow gradient-primary"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Publish Event
          </Button>
        </div>
      </div>

      {/* Live Preview Panel */}
      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Live Preview</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>

            {formData.title || formData.description ? (
              <div className="space-y-4">
                <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm">Event Cover Image</span>
                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    {formData.title || 'Event Title'}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {formData.description || 'Event description will appear here...'}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  {formData.date && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(formData.date).toLocaleDateString()}</span>
                    </div>
                  )}
                  {formData.location && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{formData.location}</span>
                    </div>
                  )}
                  {formData.capacity && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{formData.capacity} spots</span>
                    </div>
                  )}
                  {formData.price !== '0' && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <DollarSign className="w-4 h-4" />
                      <span>${formData.price}</span>
                    </div>
                  )}
                </div>

                <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                  {categories.find(c => c.id === formData.category)?.label || 'Technology'}
                </Badge>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Eye className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-sm">Preview will appear as you fill in the form</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
