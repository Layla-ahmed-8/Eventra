import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Slider } from '../components/ui/slider';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Music,
  Utensils,
  Code,
  Palette,
  Dumbbell,
  Briefcase,
  GraduationCap,
  Heart,
  Camera,
  Gamepad2,
  Book,
  MapPin,
  Calendar,
  CheckCircle2,
  ThumbsDown,
  ThumbsUp,
} from 'lucide-react';
import { toast } from 'sonner';

interface OnboardingData {
  interests: string[];
  location: { city: string; radius: number };
  calendar: 'skipped' | 'google' | 'apple' | 'outlook' | null;
}

const interestCategories = [
  { id: 'music', label: 'Music & Concerts', icon: Music, color: 'from-primary-600 to-[var(--color-brand-cyan)]' },
  { id: 'food', label: 'Food & Dining', icon: Utensils, color: 'from-secondary-500 to-primary-600' },
  { id: 'tech', label: 'Tech & Innovation', icon: Code, color: 'from-[var(--color-brand-cyan)] to-primary-500' },
  { id: 'arts', label: 'Arts & Culture', icon: Palette, color: 'from-pink-500 to-rose-500' },
  { id: 'fitness', label: 'Sports & Fitness', icon: Dumbbell, color: 'from-emerald-500 to-teal-500' },
  { id: 'business', label: 'Business & Networking', icon: Briefcase, color: 'from-amber-500 to-orange-500' },
  { id: 'education', label: 'Learning & Workshops', icon: GraduationCap, color: 'from-violet-500 to-purple-500' },
  { id: 'wellness', label: 'Wellness', icon: Heart, color: 'from-cyan-500 to-sky-500' },
  { id: 'photography', label: 'Photography', icon: Camera, color: 'from-indigo-500 to-blue-500' },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2, color: 'from-red-500 to-orange-500' },
  { id: 'books', label: 'Books', icon: Book, color: 'from-lime-500 to-green-500' },
];

const feedPreview = [
  { id: '1', title: 'Neighborhood jazz night', tag: 'Music' },
  { id: '2', title: 'AI founders breakfast', tag: 'Tech' },
  { id: '3', title: 'Riverside makers market', tag: 'Community' },
  { id: '4', title: 'Civic tech forum', tag: 'Civic' },
  { id: '5', title: 'Late gallery opening', tag: 'Arts' },
  { id: '6', title: 'Sunrise run club', tag: 'Fitness' },
];

export default function OnboardingWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const loadSaved = (): Partial<OnboardingData> | null => {
    try {
      const raw = localStorage.getItem('onboardingProgress');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const saved = loadSaved();
  const [data, setData] = useState<OnboardingData>({
    interests: saved?.interests ?? [],
    location: saved?.location ?? { city: '', radius: 25 },
    calendar: saved?.calendar ?? null,
  });

  useEffect(() => {
    localStorage.setItem('onboardingProgress', JSON.stringify(data));
  }, [data]);

  const aiSuggestedInterests = ['music', 'tech', 'food'];
  const applySuggestions = () => {
    setData((prev) => ({
      ...prev,
      interests: [...new Set([...prev.interests, ...aiSuggestedInterests])],
    }));
    toast.success('Suggestions applied from your signup signals.');
  };

  const toggleInterest = (id: string) => {
    setData((prev) => ({
      ...prev,
      interests: prev.interests.includes(id) ? prev.interests.filter((i) => i !== id) : [...prev.interests, id],
    }));
  };

  const handleNext = () => {
    if (step === 2 && data.interests.length < 3) {
      toast.error('Pick at least three interests so our AI can personalize your feed.');
      return;
    }
    if (step === 3 && !data.location.city.trim()) {
      toast.message('Add a city for hyper-local picks — or we’ll start broad.');
    }
    if (step < totalSteps) setStep(step + 1);
    else handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('userPreferences', JSON.stringify(data));
    localStorage.removeItem('onboardingProgress');
    toast.success('You’re in! Your AI feed is warming up.');
    navigate('/discover');
  };

  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-hero-landing">
      <div className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-md">
        <div className="h-1.5 bg-muted">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-600 to-[var(--color-brand-cyan)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.25 }}
          />
        </div>
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <span className="text-sm font-medium text-[var(--color-text-body)]">
            Step {step} of {totalSteps}
          </span>
          <Button variant="ghost" size="sm" onClick={() => navigate('/discover')}>
            Skip for now
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-24 pt-28">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <Card className="overflow-hidden border-border/60 p-10 shadow-[var(--shadow-card)]">
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-[var(--color-brand-cyan)] text-white shadow-lg">
                    <Sparkles className="size-10" />
                  </div>
                  <h2 className="mb-3 text-[var(--color-text-heading)]">Let’s personalize your experience</h2>
                  <p className="text-body-lg">Eventra learns what you love so every recommendation feels intentional.</p>
                </div>
                <Button variant="gradient" size="xl" className="w-full" onClick={() => setStep(2)}>
                  Get started
                  <ArrowRight className="size-5" />
                </Button>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <Card className="border-border/60 p-8 shadow-[var(--shadow-card)] md:p-10">
                <div className="mb-8 text-center">
                  <h2 className="mb-2 text-[var(--color-text-heading)]">What are you into?</h2>
                  <p className="text-[var(--color-text-body)]">Select at least three. You can fine-tune anytime.</p>
                  <div className="mt-4 rounded-xl border border-primary-600/20 bg-primary-600/5 p-4 text-sm text-[var(--color-text-body)]">
                    <span className="font-semibold text-primary-700 dark:text-primary-300">AI suggestion: </span>
                    Based on signup data, we think you might like music, tech, and food.
                    <Button variant="outline" size="sm" className="mt-3 w-full sm:w-auto" onClick={applySuggestions}>
                      Apply suggestions
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
                  {interestCategories.map((c) => {
                    const Icon = c.icon;
                    const on = data.interests.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => toggleInterest(c.id)}
                        className={`relative rounded-2xl border-2 p-5 text-left transition-all ${
                          on ? 'border-primary-600 bg-primary-50 dark:bg-primary-950/40' : 'border-border bg-card hover:border-primary-600/30'
                        }`}
                      >
                        {on && <CheckCircle2 className="absolute right-3 top-3 size-5 text-primary-600" />}
                        <div className={`mb-3 inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${c.color} text-white shadow-md`}>
                          <Icon className="size-5" />
                        </div>
                        <p className="text-sm font-semibold text-[var(--color-text-heading)]">{c.label}</p>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    <ArrowLeft className="size-4" /> Back
                  </Button>
                  <Button variant="gradient" size="lg" onClick={handleNext} disabled={data.interests.length < 3}>
                    Continue
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
                <p className="mt-2 text-center text-xs text-[var(--color-text-muted)]">{data.interests.length} selected (min 3)</p>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <Card className="border-border/60 p-8 shadow-[var(--shadow-card)] md:p-10">
                <div className="mb-8 flex flex-col items-center text-center">
                  <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary-500 to-primary-600 text-white shadow-lg">
                    <MapPin className="size-8" />
                  </div>
                  <h2 className="mb-2 text-[var(--color-text-heading)]">Where are you looking for events?</h2>
                  <p className="text-[var(--color-text-body)]">Auto-detect can be enabled later — add your primary city for now.</p>
                </div>
                <div className="mx-auto max-w-md space-y-6">
                  <div>
                    <Label htmlFor="city">City or neighborhood</Label>
                    <Input
                      id="city"
                      className="mt-2 h-12 rounded-[var(--radius-input)]"
                      placeholder="e.g. Austin, TX"
                      value={data.location.city}
                      onChange={(e) => setData((p) => ({ ...p, location: { ...p.location, city: e.target.value } }))}
                    />
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Label>Radius</Label>
                      <Badge variant="secondary">{data.location.radius} mi</Badge>
                    </div>
                    <Slider
                      value={[data.location.radius]}
                      min={5}
                      max={50}
                      step={5}
                      onValueChange={(v) => setData((p) => ({ ...p, location: { ...p.location, radius: v[0] } }))}
                    />
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>5 mi</span>
                      <span>50 mi</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-between border-t border-border pt-6">
                  <Button variant="ghost" onClick={() => setStep(2)}>
                    <ArrowLeft className="size-4" /> Back
                  </Button>
                  <Button variant="gradient" size="lg" onClick={handleNext}>
                    Continue
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="s4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <Card className="border-border/60 p-8 shadow-[var(--shadow-card)] md:p-10">
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-muted">
                    <Calendar className="size-8 text-primary-600" />
                  </div>
                  <h2 className="mb-2 text-[var(--color-text-heading)]">Sync your calendar</h2>
                  <p className="text-[var(--color-text-body)]">Never double-book. Optional — you can connect later in settings.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(['google', 'apple', 'outlook'] as const).map((p) => (
                    <Button
                      key={p}
                      variant={data.calendar === p ? 'default' : 'outline'}
                      className="h-auto flex-col gap-1 py-4 capitalize"
                      onClick={() => setData((d) => ({ ...d, calendar: p }))}
                    >
                      {p === 'google' ? 'Google' : p === 'apple' ? 'Apple' : 'Outlook'}
                      <span className="text-xs font-normal text-muted-foreground">Calendar</span>
                    </Button>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => {
                      setData((d) => ({ ...d, calendar: 'skipped' }));
                      setStep(5);
                    }}
                  >
                    Skip for now
                  </Button>
                  <Button
                    variant="gradient"
                    className="flex-1"
                    disabled={!data.calendar || data.calendar === 'skipped'}
                    onClick={() => {
                      toast.success('Calendar connected (demo).');
                      setStep(5);
                    }}
                  >
                    Sync calendar
                  </Button>
                </div>
                <div className="mt-6 flex justify-start border-t border-border pt-6">
                  <Button variant="ghost" onClick={() => setStep(3)}>
                    <ArrowLeft className="size-4" /> Back
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="s5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
              <Card className="border-border/60 p-8 shadow-[var(--shadow-card)] md:p-10">
                <div className="mb-6 text-center">
                  <h2 className="mb-2 text-[var(--color-text-heading)]">Here’s what we found for you</h2>
                  <p className="text-sm text-[var(--color-text-body)]">
                    Swipe-style feedback teaches the model — tap thumbs up/down to simulate interest.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {feedPreview.map((ev) => (
                    <div key={ev.id} className="flex flex-col rounded-xl border border-border bg-card p-4 shadow-sm">
                      <Badge variant="secondary" className="mb-2 w-fit">
                        {ev.tag}
                      </Badge>
                      <p className="font-semibold text-[var(--color-text-heading)]">{ev.title}</p>
                      <div className="mt-3 flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 gap-1">
                          <ThumbsDown className="size-4" /> Pass
                        </Button>
                        <Button size="sm" variant="gradient" className="flex-1 gap-1">
                          <ThumbsUp className="size-4" /> Interested
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between">
                  <Button variant="ghost" onClick={() => setStep(4)}>
                    <ArrowLeft className="size-4" /> Back
                  </Button>
                  <Button variant="gradient" size="xl" className="sm:min-w-[200px]" onClick={handleComplete}>
                    Start exploring
                    <Sparkles className="size-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
