import { useRef } from 'react';
import { Link } from 'react-router';
import { Button } from '../../components/ui/button';
import { Sparkles, Star, Calendar, MessageCircle, Bot } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '../../../utils/designSystem';

function AiConnectionLines({ className }: { className?: string }) {
  return (
    <svg className={cn('pointer-events-none absolute inset-0 text-primary-600/25', className)} aria-hidden>
      <defs>
        <linearGradient id="line-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6c4cf1" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#00c2ff" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path
        d="M8 18 Q 40 8 72 28 T 120 20"
        fill="none"
        stroke="url(#line-g)"
        strokeWidth="1.2"
        strokeDasharray="4 6"
      />
      <circle cx="72" cy="24" r="3" fill="#ff8a00" className="animate-pulse opacity-80" />
      <circle cx="32" cy="40" r="2" fill="#00c2ff" opacity="0.7" />
      <circle cx="96" cy="44" r="2" fill="#6c4cf1" opacity="0.5" />
    </svg>
  );
}

export function HeroSection() {
  const visualRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ['start end', 'end start'],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -14]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -36]);

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-hero-landing"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid min-h-[100svh] max-w-[1280px] grid-cols-1 items-center gap-10 px-5 py-24 md:grid-cols-5 md:gap-12 md:px-8 lg:px-10">
        <div className="relative z-10 md:col-span-3">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-600/15 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700 shadow-sm backdrop-blur dark:bg-card/70 dark:text-primary-300">
            <Sparkles className="size-3.5 text-[var(--color-brand-cyan)]" aria-hidden />
            AI EventHub
          </p>
          <h1 id="hero-heading" className="hero mb-6 max-w-[34rem] text-balance text-[var(--color-text-heading)]">
            Discover Events That Actually{' '}
            <span className="relative inline-block">
              <span className="relative z-10">Matter to You</span>
              <span
                className="animate-gradient-underline absolute -bottom-1 left-0 right-0 z-0 h-3 rounded-sm opacity-90"
                aria-hidden
              />
            </span>
          </h1>
          <p className="mb-8 max-w-[560px] text-body-lg text-[var(--color-text-body)]">
            AI-powered recommendations, vibrant communities, and experiences tailored to your interests.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="gradient" size="xl" asChild>
              <Link to="/signup">Get started free</Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/signup">Explore events</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-col gap-2 text-sm text-[var(--color-text-muted)] sm:flex-row sm:items-center sm:gap-4">
            <span className="font-medium text-[var(--color-text-body)]">Join 50,000+ event enthusiasts</span>
            <div className="flex items-center gap-2" aria-label="4.9 out of 5 stars">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" aria-hidden />
                ))}
              </div>
              <span className="text-[var(--color-text-body)]">4.9/5</span>
            </div>
          </div>
        </div>

        <div ref={visualRef} className="relative md:col-span-2" aria-hidden>
          <AiConnectionLines className="opacity-70" />
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <motion.div style={{ y: y1 }} className="absolute left-0 top-[6%] w-[90%]">
              <div className="rounded-[var(--radius-card)] border border-border/60 bg-card/95 p-4 shadow-[var(--shadow-card)] backdrop-blur-sm dark:bg-card">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--color-text-muted)]">For you</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary-600/10 px-2 py-0.5 text-[10px] font-semibold text-primary-700 dark:text-primary-300">
                    <Bot className="size-3" />
                    AI picks
                  </span>
                </div>
                <p className="text-sm font-semibold text-[var(--color-text-heading)]">Weekend lineup near you</p>
                <div className="mt-3 space-y-2">
                  <div className="h-14 rounded-lg bg-gradient-to-r from-primary-600/10 to-[var(--color-brand-cyan)]/10" />
                  <div className="h-14 rounded-lg bg-muted" />
                </div>
              </div>
            </motion.div>

            <motion.div style={{ y: y2 }} className="absolute right-0 top-[34%] w-[88%]">
              <div className="rounded-[var(--radius-card)] border border-border/60 bg-card p-3 shadow-[var(--shadow-card-hover)] dark:bg-card">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[var(--color-text-heading)]">
                  <MessageCircle className="size-4 text-[var(--color-brand-cyan)]" />
                  Live community
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <div className="size-7 shrink-0 rounded-full bg-muted" />
                    <div className="h-8 flex-1 rounded-lg bg-muted" />
                  </div>
                  <div className="flex gap-2">
                    <div className="size-7 shrink-0 rounded-full bg-primary-600/20" />
                    <div className="h-8 flex-1 rounded-lg bg-primary-600/5" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div style={{ y: y3 }} className="absolute bottom-[4%] left-[4%] w-[82%]">
              <div className="flex items-center gap-3 rounded-[var(--radius-card)] border border-dashed border-primary-600/30 bg-white/90 p-3 shadow-sm backdrop-blur dark:bg-card/90">
                <Calendar className="size-8 shrink-0 text-primary-600" />
                <div>
                  <p className="text-xs font-medium text-[var(--color-text-muted)]">Calendar sync</p>
                  <p className="text-sm font-semibold text-[var(--color-text-heading)]">Never double-book again</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
