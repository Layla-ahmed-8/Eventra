import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Logo } from '../../components/brand/Logo';
import { useAuth } from '../../../context/AuthContext';
import { UserRole } from '../../../types';
import { toast } from 'sonner';
import { 
  Loader2, 
  CheckCircle, 
  Users, 
  BarChart3, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Trophy,
  Calendar,
  Heart,
  Zap,
  Target,
  TrendingUp,
  Shield,
  Music,
  Utensils,
  Code,
  Palette,
  Dumbbell,
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
  Key,
  Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../../utils/designSystem';
import { PageShell } from '../../components/layout/PageShell';

interface PersonalizedData {
  // Attendee specific
  interests?: string[];
  location?: string;
  availability?: string[];
  
  // Organizer specific
  organizationName?: string;
  organizationType?: string;
  yearsExperience?: string;
  eventTypes?: string[];
  
  // Admin specific
  adminCode?: string;
  department?: string;
  permissions?: string[];
}

export default function EnhancedSignupPage() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState<UserRole>((searchParams.get('role') as UserRole) || 'attendee');
  const [loading, setLoading] = useState(false);
  const [personalizedData, setPersonalizedData] = useState<PersonalizedData>({});
  const { signup } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam && ['attendee', 'organizer', 'admin'].includes(roleParam)) {
      setRole(roleParam as UserRole);
      setStep(2); // Skip role selection if coming from landing page
    }
  }, [searchParams]);

  const handleStep1Submit = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords don\'t match. Give it another try! 🔄');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password needs at least 6 characters. Make it strong! 💪');
      return;
    }

    // Move to personalization step
    setStep(3);
  };

  const handlePersonalizationSubmit = async () => {
    // Validate based on role
    if (role === 'attendee') {
      if (!personalizedData.interests || personalizedData.interests.length === 0) {
        toast.error('Please select at least one interest! 🎯');
        return;
      }
      if (!personalizedData.location) {
        toast.error('Please enter your location! 📍');
        return;
      }
    } else if (role === 'organizer') {
      if (!personalizedData.organizationName) {
        toast.error('Please enter your organization name! 🏢');
        return;
      }
      if (!personalizedData.organizationType) {
        toast.error('Please select organization type! 🎨');
        return;
      }
    } else if (role === 'admin') {
      if (!personalizedData.adminCode) {
        toast.error('Please enter admin access code! 🔑');
        return;
      }
      if (personalizedData.adminCode !== 'EVENTRA_ADMIN_2026') {
        toast.error('Invalid admin code. Please contact support! ❌');
        return;
      }
    }

    setLoading(true);

    try {
      await signup(name, email, password, role);
      
      // Save personalized data
      localStorage.setItem('userPersonalization', JSON.stringify({
        role,
        ...personalizedData
      }));
      
      toast.success(`Welcome to Eventra, ${name}! 🎉`);
      
      // Navigate based on role
      if (role === 'attendee') {
        navigate('/discover');
      } else if (role === 'organizer') {
        navigate('/organizer');
      } else if (role === 'admin') {
        navigate('/admin');
      }
    } catch (error) {
      toast.error('Oops! Something went wrong. Try again? 🤔');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return { strength: 0, label: '', color: '' };
    if (pass.length < 6) return { strength: 33, label: 'Weak', color: '#EF4444' };
    if (pass.length < 10) return { strength: 66, label: 'Good', color: '#F59E0B' };
    return { strength: 100, label: 'Strong', color: '#10B981' };
  };

  const passwordStrength = getPasswordStrength(password);

  const roleOptions = [
    {
      value: 'attendee' as UserRole,
      icon: Users,
      iconBg: 'from-primary-600 to-[var(--color-brand-cyan)]',
      title: 'I Want to Discover Events',
      subtitle: 'AI EventHub — personalized discovery',
      description: 'Perfect for anyone who wants to explore events, meet people, and have great experiences',
      features: [
        { icon: Sparkles, text: 'AI finds events you\'ll love' },
        { icon: Calendar, text: 'One-tap RSVP & reminders' },
        { icon: Trophy, text: 'Earn badges & rewards' },
        { icon: Heart, text: 'Join communities' }
      ],
      badge: 'Most Popular'
    },
    {
      value: 'organizer' as UserRole,
      icon: BarChart3,
      iconBg: 'from-secondary-500 to-primary-600',
      title: 'I Want to Create Events',
      subtitle: 'Organize & grow your events',
      description: 'Ideal for event organizers who want to create, manage, and grow their events with powerful tools',
      features: [
        { icon: Zap, text: 'Create events in minutes' },
        { icon: TrendingUp, text: 'Real-time analytics' },
        { icon: Target, text: 'QR code check-in' },
        { icon: Users, text: 'Attendee management' }
      ],
      badge: 'For Pros'
    },
    {
      value: 'admin' as UserRole,
      icon: Shield,
      iconBg: 'from-[#2563EB] to-[#3B82F6]',
      title: 'I Want to Moderate Platform',
      subtitle: 'Admin & platform management',
      description: 'For administrators who need to moderate content, manage users, and oversee the platform',
      features: [
        { icon: Shield, text: 'Full platform access' },
        { icon: Users, text: 'User management' },
        { icon: BarChart3, text: 'Analytics dashboard' },
        { icon: Target, text: 'Content moderation' }
      ],
      badge: 'Restricted'
    }
  ];

  const interestCategories = [
    { id: 'music', label: 'Music & Concerts', icon: Music, color: 'from-[#7C3AED] to-[#8B5CF6]' },
    { id: 'food', label: 'Food & Dining', icon: Utensils, color: 'from-[#F97316] to-[#FB923C]' },
    { id: 'tech', label: 'Tech & Innovation', icon: Code, color: 'from-[#2563EB] to-[#3B82F6]' },
    { id: 'arts', label: 'Arts & Culture', icon: Palette, color: 'from-[#EC4899] to-[#F472B6]' },
    { id: 'fitness', label: 'Sports & Fitness', icon: Dumbbell, color: 'from-[#10B981] to-[#059669]' },
    { id: 'business', label: 'Business & Networking', icon: Briefcase, color: 'from-[#F59E0B] to-[#FBBF24]' },
    { id: 'education', label: 'Learning & Workshops', icon: GraduationCap, color: 'from-[#8B5CF6] to-[#A78BFA]' },
    { id: 'wellness', label: 'Wellness & Health', icon: Heart, color: 'from-[#06B6D4] to-[#22D3EE]' }
  ];

  const toggleInterest = (interest: string) => {
    setPersonalizedData(prev => ({
      ...prev,
      interests: prev.interests?.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...(prev.interests || []), interest]
    }));
  };

  return (
    <PageShell>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border-b border-neutral-200 dark:border-neutral-800">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Already have an account?</span>
            <Button variant="outline" asChild className="rounded-xl">
              <Link to="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <AnimatePresence mode="wait">
          {/* Step 1: Role Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-6xl mx-auto"
            >
              {/* Progress */}
              <div className="text-center mb-12">
                <Badge className="mb-6 bg-[#EDE9FE] dark:bg-[#7C3AED]/20 text-[#7C3AED] border-0 px-5 py-2.5 rounded-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Step 1 of 3
                </Badge>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  How Will You Use{' '}
                  <span className="bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
                    Eventra?
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Choose the path that best describes you. Don't worry, you can always change this later!
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {roleOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <motion.div
                      key={option.value}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={cn(
                          "p-8 cursor-pointer transition-all hover:shadow-2xl border-2 rounded-3xl group h-full relative overflow-hidden",
                          option.value === 'admin' 
                            ? "hover:border-[#2563EB]" 
                            : option.value === 'organizer' 
                            ? "hover:border-[#F97316]" 
                            : "hover:border-[#7C3AED]"
                        )}
                        onClick={() => handleStep1Submit(option.value)}
                      >
                        {/* Badge */}
                        {option.badge && (
                          <Badge className={`absolute top-6 right-6 bg-gradient-to-r ${option.iconBg} text-white border-0 shadow-lg`}>
                            {option.badge}
                          </Badge>
                        )}

                        {/* Icon */}
                        <div className={`inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${option.iconBg} shadow-2xl mb-6 group-hover:scale-110 transition-transform`}>
                          <Icon className="h-10 w-10 text-white" />
                        </div>
                        
                        {/* Content */}
                        <div className="mb-6">
                          <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                            {option.title}
                          </h3>
                          <p className={cn(
                            "font-semibold mb-3",
                            option.value === 'admin' ? "text-[#2563EB]" :
                            option.value === 'organizer' ? "text-[#F97316]" : "text-[#7C3AED]"
                          )}>
                            {option.subtitle}
                          </p>
                          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm">
                            {option.description}
                          </p>
                        </div>

                        {/* Features */}
                        <ul className="space-y-3 mb-6">
                          {option.features.map((feature, idx) => {
                            const FeatureIcon = feature.icon;
                            return (
                              <li key={idx} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 group-hover:bg-[#EDE9FE] dark:group-hover:bg-[#7C3AED]/20 flex items-center justify-center flex-shrink-0 transition-colors">
                                  <FeatureIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-[#7C3AED] transition-colors" />
                                </div>
                                <span className="text-sm text-neutral-700 dark:text-neutral-300">{feature.text}</span>
                              </li>
                            );
                          })}
                        </ul>

                        {/* CTA */}
                        <Button className={`w-full bg-gradient-to-r ${option.iconBg} hover:opacity-90 rounded-xl h-12 shadow-lg group-hover:shadow-xl transition-all`}>
                          Choose This Path
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-[#7C3AED] hover:text-[#8B5CF6] transition-colors">
                  Sign in instead
                </Link>
              </p>
            </motion.div>
          )}

          {/* Step 2: Account Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="text-center mb-8">
                <Badge className="mb-6 bg-[#EDE9FE] dark:bg-[#7C3AED]/20 text-[#7C3AED] border-0 px-5 py-2.5 rounded-full">
                  <User className="mr-2 h-4 w-4" />
                  Step 2 of 3
                </Badge>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  Create Your Account
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400">
                  Let's get you set up with your{' '}
                  <span className="font-semibold text-[#7C3AED]">
                    {role === 'attendee' ? 'Attendee' : role === 'organizer' ? 'Organizer' : 'Admin'}
                  </span>
                  {' '}account
                </p>
              </div>

              <Card className="p-8 md:p-10 rounded-3xl shadow-xl border-2 border-neutral-200 dark:border-neutral-800">
                <form onSubmit={handleStep2Submit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-base font-semibold mb-2">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-14 pl-12 text-base rounded-xl border-neutral-300 dark:border-neutral-700"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-base font-semibold mb-2">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-14 pl-12 text-base rounded-xl border-neutral-300 dark:border-neutral-700"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-base font-semibold mb-2">Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-14 pl-12 pr-12 text-base rounded-xl border-neutral-300 dark:border-neutral-700"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {password && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-neutral-600 dark:text-neutral-400">Password Strength</span>
                          <span className="text-sm font-semibold" style={{ color: passwordStrength.color }}>
                            {passwordStrength.label}
                          </span>
                        </div>
                        <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ backgroundColor: passwordStrength.color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${passwordStrength.strength}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-base font-semibold mb-2">Confirm Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="h-14 pl-12 pr-12 text-base rounded-xl border-neutral-300 dark:border-neutral-700"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {confirmPassword && password !== confirmPassword && (
                      <p className="mt-2 text-sm text-red-500 flex items-center gap-2">
                        <span className="text-lg">⚠️</span>
                        Passwords don't match
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-neutral-200 dark:border-neutral-800">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="rounded-xl"
                      size="lg"
                    >
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#A78BFA] rounded-xl shadow-lg shadow-[#7C3AED]/25"
                      size="lg"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Personalization (Role-specific) */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <Badge className="mb-6 bg-[#EDE9FE] dark:bg-[#7C3AED]/20 text-[#7C3AED] border-0 px-5 py-2.5 rounded-full">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Step 3 of 3
                </Badge>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                  {role === 'attendee' && "Let's Personalize Your Experience"}
                  {role === 'organizer' && "Tell Us About Your Organization"}
                  {role === 'admin' && "Verify Admin Access"}
                </h1>
                <p className="text-lg text-neutral-600 dark:text-neutral-400">
                  {role === 'attendee' && "Help us recommend the perfect events for you"}
                  {role === 'organizer' && "We'll tailor your dashboard to your needs"}
                  {role === 'admin' && "Enter your admin credentials to proceed"}
                </p>
              </div>

              <Card className="p-8 md:p-10 rounded-3xl shadow-xl border-2 border-neutral-200 dark:border-neutral-800">
                {/* Attendee Personalization */}
                {role === 'attendee' && (
                  <div className="space-y-8">
                    <div>
                      <Label className="text-base font-semibold mb-4 block">What Are You Interested In? *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {interestCategories.map((category) => {
                          const Icon = category.icon;
                          const isSelected = personalizedData.interests?.includes(category.id);
                          
                          return (
                            <motion.button
                              key={category.id}
                              onClick={() => toggleInterest(category.id)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={cn(
                                "relative p-4 rounded-2xl border-2 transition-all text-left",
                                isSelected 
                                  ? 'border-[#7C3AED] bg-[#EDE9FE] dark:bg-[#7C3AED]/20' 
                                  : 'border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-600'
                              )}
                            >
                              {isSelected && (
                                <CheckCircle className="absolute top-3 right-3 w-5 h-5 text-[#7C3AED]" />
                              )}
                              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} shadow-lg mb-2`}>
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="font-semibold text-neutral-900 dark:text-neutral-100 text-xs">
                                {category.label}
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3">
                        {personalizedData.interests?.length || 0} selected
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="location" className="text-base font-semibold mb-2">Your Location *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                        <Input
                          id="location"
                          type="text"
                          placeholder="e.g., San Francisco, CA"
                          value={personalizedData.location || ''}
                          onChange={(e) => setPersonalizedData(prev => ({ ...prev, location: e.target.value }))}
                          className="h-14 pl-12 text-base rounded-xl border-neutral-300 dark:border-neutral-700"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Organizer Personalization */}
                {role === 'organizer' && (
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="orgName" className="text-base font-semibold mb-2">Organization Name *</Label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                        <Input
                          id="orgName"
                          type="text"
                          placeholder="e.g., TechCorp Events"
                          value={personalizedData.organizationName || ''}
                          onChange={(e) => setPersonalizedData(prev => ({ ...prev, organizationName: e.target.value }))}
                          className="h-14 pl-12 text-base rounded-xl border-neutral-300 dark:border-neutral-700"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-4 block">Organization Type *</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {['Corporate', 'Non-Profit', 'Individual', 'Agency', 'Community', 'Other'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setPersonalizedData(prev => ({ ...prev, organizationType: type }))}
                            className={cn(
                              "p-4 rounded-xl border-2 transition-all text-center font-medium",
                              personalizedData.organizationType === type
                                ? 'border-[#F97316] bg-[#FFF4ED] dark:bg-[#F97316]/20 text-[#F97316]'
                                : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
                            )}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-4 block">Years of Experience</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['< 1 year', '1-3 years', '3-5 years', '5+ years'].map((exp) => (
                          <button
                            key={exp}
                            onClick={() => setPersonalizedData(prev => ({ ...prev, yearsExperience: exp }))}
                            className={cn(
                              "p-4 rounded-xl border-2 transition-all text-center font-medium",
                              personalizedData.yearsExperience === exp
                                ? 'border-[#F97316] bg-[#FFF4ED] dark:bg-[#F97316]/20 text-[#F97316]'
                                : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
                            )}
                          >
                            {exp}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Admin Verification */}
                {role === 'admin' && (
                  <div className="space-y-6">
                    <div className="p-6 bg-gradient-to-br from-[#DBEAFE] to-[#EDE9FE] dark:from-[#2563EB]/10 dark:to-[#7C3AED]/10 rounded-2xl border border-[#2563EB]/20">
                      <div className="flex items-start gap-4">
                        <Shield className="h-8 w-8 text-[#2563EB] flex-shrink-0" />
                        <div>
                          <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">Admin Access Required</h3>
                          <p className="text-sm text-neutral-700 dark:text-neutral-300">
                            This role requires special permissions. Please enter your admin access code provided by the Eventra team.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="adminCode" className="text-base font-semibold mb-2">Admin Access Code *</Label>
                      <div className="relative">
                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                        <Input
                          id="adminCode"
                          type="password"
                          placeholder="Enter your admin code"
                          value={personalizedData.adminCode || ''}
                          onChange={(e) => setPersonalizedData(prev => ({ ...prev, adminCode: e.target.value }))}
                          className="h-14 pl-12 text-base rounded-xl border-neutral-300 dark:border-neutral-700 font-mono"
                        />
                      </div>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                        Don't have a code? Contact support at admin@eventra.com
                      </p>
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-4 block">Department</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {['Operations', 'Support', 'Marketing', 'Development', 'Management', 'Other'].map((dept) => (
                          <button
                            key={dept}
                            onClick={() => setPersonalizedData(prev => ({ ...prev, department: dept }))}
                            className={cn(
                              "p-4 rounded-xl border-2 transition-all text-center font-medium",
                              personalizedData.department === dept
                                ? 'border-[#2563EB] bg-[#DBEAFE] dark:bg-[#2563EB]/20 text-[#2563EB]'
                                : 'border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300 dark:hover:border-neutral-600'
                            )}
                          >
                            {dept}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-8 border-t border-neutral-200 dark:border-neutral-800 mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="rounded-xl"
                    size="lg"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handlePersonalizationSubmit}
                    disabled={loading}
                    className={cn(
                      "rounded-xl shadow-lg",
                      role === 'admin' 
                        ? "bg-gradient-to-r from-[#2563EB] to-[#3B82F6] hover:from-[#3B82F6] hover:to-[#60A5FA] shadow-[#2563EB]/25"
                        : role === 'organizer'
                        ? "bg-gradient-to-r from-[#F97316] to-[#FB923C] hover:from-[#FB923C] hover:to-[#FDBA74] shadow-[#F97316]/25"
                        : "bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#A78BFA] shadow-[#7C3AED]/25"
                    )}
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Complete Setup
                        <CheckCircle className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageShell>
  );
}
