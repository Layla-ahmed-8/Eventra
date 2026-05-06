import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { Button } from '@/app/components/ui/button'
import { FormField } from '@/app/components/forms/FormField'
import { PasswordInput } from '@/app/components/forms/PasswordInput'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Logo } from '@/app/components/brand/Logo'
import { ThemeToggle } from '@/app/components/ui/theme-toggle'
import { useAuth } from '@/context/AuthContext'
import { UserRole } from '@/types'
import { toast } from 'sonner'
import {
  CheckCircle,
  Users,
  BarChart3,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Mail,
  Lock,
  User,
  Trophy,
  Calendar,
  Heart,
  Zap,
  Target,
  TrendingUp
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

export default function SignupPage() {
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState<UserRole>((searchParams.get('role') as UserRole) || 'attendee')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam && (roleParam === 'attendee' || roleParam === 'organizer')) {
      setRole(roleParam);
      setStep(2); // Skip role selection if coming from landing page
    }
  }, [searchParams]);

  const handleStep1Submit = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords don\'t match. Please try again.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    setLoading(true)

    try {
      await signup(name, email, password, role)
      toast.success('Welcome to Eventra! 🎉')
      navigate('/onboarding')
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
      iconBg: 'bg-primary-100 dark:bg-primary-900/30',
      iconColor: 'text-primary-600 dark:text-primary-400',
      title: 'I Want to Discover Events',
      subtitle: 'Find & attend amazing events',
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
      iconBg: 'bg-secondary-100 dark:bg-secondary-900/30',
      iconColor: 'text-secondary-600 dark:text-secondary-400',
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
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-neutral-50 dark:to-neutral-900/50">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <span className="text-body-small text-neutral-600 dark:text-neutral-400">
              Already have an account?
            </span>
            <Button variant="outline" asChild className="rounded-ds-md">
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
                <Badge className="mb-6 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-800 px-5 py-2.5 rounded-ds-lg">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Step 1 of 2
                </Badge>
                <h1 className="text-heading-2 text-foreground mb-4">
                  How Will You Use{' '}
                  <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    Eventra?
                  </span>
                </h1>
                <p className="text-body text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                  Choose the path that best describes you. Don't worry, you can always change this later!
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
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
                        className="p-8 cursor-pointer transition-all hover:shadow-xl border-2 hover:border-primary-500 rounded-ds-xl group h-full relative overflow-hidden"
                        onClick={() => handleStep1Submit(option.value)}
                      >
                        {/* Badge */}
                        {option.badge && (
                          <Badge className={`absolute top-6 right-6 ${option.iconBg} ${option.iconColor} border-0 shadow-lg`}>
                            {option.badge}
                          </Badge>
                        )}

                        {/* Icon */}
                        <div className={`inline-flex h-20 w-20 items-center justify-center rounded-ds-xl ${option.iconBg} shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                          <Icon className={`h-10 w-10 ${option.iconColor}`} />
                        </div>

                        {/* Content */}
                        <div className="mb-6">
                          <h3 className="text-heading-4 text-foreground mb-2">
                            {option.title}
                          </h3>
                          <p className="text-primary-600 dark:text-primary-400 font-semibold mb-3">
                            {option.subtitle}
                          </p>
                          <p className="text-body-small text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            {option.description}
                          </p>
                        </div>

                        {/* Features */}
                        <ul className="space-y-3 mb-6">
                          {option.features.map((feature, idx) => {
                            const FeatureIcon = feature.icon
                            return (
                              <li key={idx} className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-ds-md bg-neutral-100 dark:bg-neutral-800 group-hover:bg-primary-50 dark:group-hover:bg-primary-950 flex items-center justify-center flex-shrink-0 transition-colors">
                                  <FeatureIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                                </div>
                                <span className="text-body-small text-neutral-700 dark:text-neutral-300">{feature.text}</span>
                              </li>
                            )
                          })}
                        </ul>

                        {/* CTA */}
                        <Button className="w-full h-12 shadow-lg group-hover:shadow-xl transition-all">
                          Choose This Path
                          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              <p className="text-center text-sm text-neutral-600">
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
              <div className="grid md:grid-cols-5 gap-8">
                {/* Left Info Panel */}
                <div className="md:col-span-2 hidden md:block">
                  <div className="sticky top-32">
                    <Badge className="mb-6 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-800 px-4 py-2 rounded-ds-lg">
                      Step 2 of 2
                    </Badge>
                    <h2 className="text-heading-3 text-foreground mb-4">
                      Almost There!
                    </h2>
                    <p className="text-body-small text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                      You're joining as {role === 'attendee' ? 'an Attendee' : 'an Organizer'}. Just a few details and you're in!
                    </p>

                    {/* Benefits */}
                    <div className="space-y-4">
                      {[
                        { icon: CheckCircle, text: 'Free forever, no credit card' },
                        { icon: CheckCircle, text: 'Access to all features' },
                        { icon: CheckCircle, text: 'Cancel anytime' }
                      ].map((item, i) => {
                        const ItemIcon = item.icon;
                        return (
                          <div key={i} className="flex items-center gap-3">
                            <ItemIcon className="w-5 h-5 text-success-600 dark:text-success-400 flex-shrink-0" />
                            <span className="text-body-small text-neutral-700 dark:text-neutral-300">{item.text}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Form */}
                <div className="md:col-span-3">
                  <Card className="p-8 shadow-xl rounded-3xl border-neutral-200">
                    <div className="md:hidden mb-6">
                      <Badge className="mb-4 bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300 border-primary-200 dark:border-primary-800 px-4 py-2 rounded-ds-lg">
                        Step 2 of 2
                      </Badge>
                      <CardTitle className="text-heading-4 text-foreground">
                        Create Your Account
                      </CardTitle>
                      <p className="text-body-small text-neutral-600 dark:text-neutral-400">
                        Joining as {role === 'attendee' ? 'an Attendee' : 'an Organizer'}
                      </p>
                    </div>

                      <form onSubmit={handleStep2Submit} className="space-y-6">
                        {/* Name Field */}
                        <FormField label="Full Name" required>
                          <input
                            type="text"
                            placeholder="Alex Johnson"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="flex h-11 w-full rounded-ds-md border border-border bg-background px-3 py-2 text-body transition-colors placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            required
                            disabled={loading}
                          />
                        </FormField>

                        {/* Email Field */}
                        <FormField label="Email Address" required>
                          <input
                            type="email"
                            placeholder="alex@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex h-11 w-full rounded-ds-md border border-border bg-background px-3 py-2 text-body transition-colors placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            required
                            disabled={loading}
                          />
                          <p className="text-caption text-neutral-500 dark:text-neutral-400 mt-1">
                            We'll never share your email or spam you
                          </p>
                        </FormField>

                        {/* Password Field */}
                        <FormField label="Password" required>
                          <PasswordInput
                            placeholder="Create a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                          />
                        </FormField>

                        {/* Confirm Password Field */}
                        <FormField label="Confirm Password" required>
                          <PasswordInput
                            placeholder="Type it again to be sure"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={loading}
                          />
                          {confirmPassword && password === confirmPassword && (
                            <p className="text-caption text-success-600 dark:text-success-400 flex items-center gap-1 mt-1">
                              <CheckCircle className="w-3 h-3" />
                              Passwords match!
                            </p>
                          )}
                        </FormField>

                        {/* Error Message */}
                        {error && (
                          <div className="text-body-small text-error-600 dark:text-error-400">
                            {error}
                          </div>
                        )}

                        {/* Terms */}
                        <p className="text-caption text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          By creating an account, you agree to our{' '}
                          <a href="#" className="text-primary-600 hover:underline">Terms of Service</a>
                          {' '}and{' '}
                          <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep(1)}
                            className="flex-1 h-11 rounded-ds-md"
                            disabled={loading}
                          >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back
                          </Button>
                          <Button
                            type="submit"
                            className="flex-1 sm:flex-[2] h-11 shadow-lg"
                            loading={loading}
                          >
                            {loading ? 'Creating your account...' : 'Create My Account'}
                          </Button>
                        </div>
                      </form>

                    {/* Divider */}
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-neutral-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-4 text-neutral-600 font-medium">Or sign up with</span>
                      </div>
                    </div>

                    {/* Social Signup */}
                    <div className="grid grid-cols-2 gap-3">
                      <Button 
                        variant="outline" 
                        type="button" 
                        className="h-12 rounded-xl border-2 border-neutral-300 hover:border-[#7C3AED] hover:bg-[#7C3AED]/5 transition-all"
                      >
                        <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Google
                      </Button>
                      <Button 
                        variant="outline" 
                        type="button" 
                        className="h-12 rounded-xl border-2 border-neutral-300 hover:border-[#7C3AED] hover:bg-[#7C3AED]/5 transition-all"
                      >
                        <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                        Apple
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}