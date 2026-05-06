// Form validation utilities

export const validators = {
  required: (value: string) => {
    return value.trim().length === 0 ? 'This field is required' : null;
  },

  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) return 'Email is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return null;
  },

  password: (value: string) => {
    if (!value) return 'Password is required';
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
    if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
    if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
    return null;
  },

  confirmPassword: (value: string, password: string) => {
    if (!value) return 'Please confirm your password';
    if (value !== password) return 'Passwords do not match';
    return null;
  },

  name: (value: string) => {
    if (!value) return 'Name is required';
    if (value.length < 2) return 'Name must be at least 2 characters';
    if (value.length > 50) return 'Name must be less than 50 characters';
    return null;
  },

  phone: (value: string) => {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    if (!value) return null; // Optional field
    if (!phoneRegex.test(value)) return 'Please enter a valid phone number';
    return null;
  },

  url: (value: string) => {
    if (!value) return null; // Optional field
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  eventTitle: (value: string) => {
    if (!value) return 'Event title is required';
    if (value.length < 5) return 'Title must be at least 5 characters';
    if (value.length > 100) return 'Title must be less than 100 characters';
    return null;
  },

  eventDescription: (value: string) => {
    if (!value) return 'Event description is required';
    if (value.length < 20) return 'Description must be at least 20 characters';
    if (value.length > 2000) return 'Description must be less than 2000 characters';
    return null;
  },

  price: (value: string) => {
    const price = parseFloat(value);
    if (isNaN(price)) return 'Please enter a valid price';
    if (price < 0) return 'Price cannot be negative';
    if (price > 100000) return 'Price seems too high. Please verify.';
    return null;
  },

  capacity: (value: string) => {
    const capacity = parseInt(value);
    if (isNaN(capacity)) return 'Please enter a valid number';
    if (capacity < 1) return 'Capacity must be at least 1';
    if (capacity > 100000) return 'Capacity seems too high. Please verify.';
    return null;
  },

  date: (value: string) => {
    if (!value) return 'Date is required';
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) return 'Event date must be in the future';
    return null;
  },

  time: (value: string) => {
    if (!value) return 'Time is required';
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(value)) return 'Please enter a valid time (HH:MM)';
    return null;
  },
};

export const aiSuggestions = {
  eventTitle: (category?: string) => {
    const suggestions: Record<string, string[]> = {
      technology: [
        'Tech Innovation Summit 2026',
        'AI & Machine Learning Conference',
        'Startup Pitch Night',
      ],
      music: [
        'Live Music Festival',
        'Jazz Night Under the Stars',
        'Electronic Music Showcase',
      ],
      arts: [
        'Contemporary Art Exhibition',
        'Digital Art Showcase',
        'Creative Workshop Series',
      ],
      sports: [
        'Community Sports Day',
        'Marathon Challenge 2026',
        'Fitness Bootcamp',
      ],
    };

    const categoryKey = category?.toLowerCase() || 'technology';
    const options = suggestions[categoryKey] || suggestions.technology;
    return options[Math.floor(Math.random() * options.length)];
  },

  eventDescription: (title: string) => {
    return `Join us for ${title}! This exciting event brings together enthusiasts and professionals for an unforgettable experience. Network, learn, and be inspired.`;
  },

  location: () => {
    const locations = [
      'Dubai World Trade Centre',
      'Convention Center',
      'Innovation Hub',
      'Creative Space',
      'Community Center',
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  },

  capacity: (venue?: string) => {
    const capacities: Record<string, number> = {
      'small': 50,
      'medium': 200,
      'large': 500,
      'xlarge': 1000,
    };
    return capacities.medium.toString();
  },
};
