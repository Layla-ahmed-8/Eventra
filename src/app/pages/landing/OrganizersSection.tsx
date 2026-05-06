import { Link } from 'react-router';
import { Button } from '../../components/ui/button';
import { Check, Sparkles, BarChart3, Users, Wand2 } from 'lucide-react';

const bullets = [
  'Create events in minutes with AI assistance',
  'Reach the right audience with smart promotion',
  'Track engagement with real-time analytics',
  'Get AI-powered insights to improve turnout',
  'Build lasting communities, not just one-time attendees',
] as const;

export function OrganizersSection() {
  return (
    <section
      id="organizers"
      className="scroll-mt-20 bg-background py-[120px] max-md:py-20"
      aria-labelledby="organizers-heading"
    >
      <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-5 sm:px-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-600">For organizers</p>
          <h2 id="organizers-heading" className="mb-6 text-[var(--color-text-heading)]">
            Turn your events into thriving communities
          </h2>
          <ul className="mb-8 space-y-4">
            {bullets.map((text) => (
              <li key={text} className="flex gap-3 text-[var(--color-text-body)]">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-600/10 text-primary-700 dark:text-primary-300">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                </span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <Button variant="gradient" size="xl" asChild>
            <Link to="/signup">Start organizing</Link>
          </Button>
        </div>

        <div
          className="relative overflow-hidden rounded-[var(--radius-lg)] border border-border/60 bg-[var(--color-surface-secondary)] p-6 shadow-[var(--shadow-card)] dark:bg-muted/30"
          aria-hidden
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-[var(--color-text-heading)]">Event workspace</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-600/10 px-2 py-0.5 text-xs font-medium text-primary-700">
              <Sparkles className="size-3" />
              AI
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[var(--radius-md)] border border-dashed border-primary-600/25 bg-card p-4 dark:bg-card">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)]">
                <Wand2 className="size-3.5" />
                Creation wizard
              </div>
              <div className="h-24 rounded-md bg-muted" />
            </div>
            <div className="rounded-[var(--radius-md)] border border-border/60 bg-card p-4 dark:bg-card">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)]">
                <BarChart3 className="size-3.5" />
                Attendance trend
              </div>
              <div className="flex h-24 items-end gap-1 px-1">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm bg-gradient-to-t from-primary-600 to-[var(--color-brand-cyan)]" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <div className="rounded-[var(--radius-md)] border border-border/60 bg-card p-4 sm:col-span-2 dark:bg-card">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-[var(--color-text-muted)]">
                <Users className="size-3.5" />
                Community engagement
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-16 rounded-md bg-primary-600/10" />
                <div className="h-16 rounded-md bg-[var(--color-brand-cyan)]/10" />
                <div className="h-16 rounded-md bg-secondary-500/10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
