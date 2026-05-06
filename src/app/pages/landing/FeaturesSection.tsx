import {
  Sparkles,
  MessageCircleQuestion,
  LayoutDashboard,
  UsersRound,
  Trophy,
  BellRing,
} from 'lucide-react';
import { cn } from '../../../utils/designSystem';

const features = [
  {
    title: 'Personalized Discovery',
    body: "Our AI learns your preferences and surfaces events you'll love.",
    icon: Sparkles,
  },
  {
    title: 'Ask, Don\'t Filter',
    body: 'Natural language search powered by AI — just ask what you\'re looking for.',
    icon: MessageCircleQuestion,
  },
  {
    title: 'Data-Driven Insights',
    body: 'Real-time analytics and AI-powered recommendations to grow your events.',
    icon: LayoutDashboard,
  },
  {
    title: 'Build Lasting Connections',
    body: 'Engage before, during, and after events with dedicated community spaces.',
    icon: UsersRound,
  },
  {
    title: 'Earn & Achieve',
    body: 'Collect badges, level up, and unlock exclusive experiences.',
    icon: Trophy,
  },
  {
    title: 'Never Miss Out',
    body: 'Intelligent reminders and suggestions at the perfect moment.',
    icon: BellRing,
  },
] as const;

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="scroll-mt-20 bg-background py-[120px] max-md:py-20"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-10 md:px-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">
            Platform features
          </p>
          <h2 id="features-heading" className="mb-4 text-[var(--color-text-heading)]">
            Everything you need to discover, attend, and connect
          </h2>
          <p className="text-body-lg">Powered by AI, designed for humans.</p>
        </div>
        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, body, icon: Icon }) => (
            <li
              key={title}
              className={cn(
                'rounded-[var(--radius-card)] border border-border/60 bg-card p-6 shadow-[var(--shadow-card)] transition-all duration-300',
                'hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]'
              )}
            >
              <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-[var(--color-brand-cyan)] text-white shadow-md">
                <Icon className="size-8" strokeWidth={1.75} aria-hidden />
              </div>
              <h3 className="mb-2 text-xl font-bold text-[var(--color-text-heading)]">{title}</h3>
              <p className="text-[15px] leading-relaxed text-[var(--color-text-body)]">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
