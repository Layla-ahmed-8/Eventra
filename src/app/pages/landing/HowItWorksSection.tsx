import { Search, Ticket, MessageCircle, TrendingUp } from 'lucide-react';
import { cn } from '../../../utils/designSystem';

const steps = [
  {
    title: 'Tell us what you love',
    body: 'Set your interests, and let our AI find perfect matches.',
    icon: Search,
  },
  {
    title: 'RSVP with one click',
    body: 'Add events to your calendar and get ready to attend.',
    icon: Ticket,
  },
  {
    title: 'Connect with the community',
    body: 'Chat, discuss, and build relationships around shared interests.',
    icon: MessageCircle,
  },
  {
    title: 'Level up your experience',
    body: 'Earn badges, unlock perks, and become a community leader.',
    icon: TrendingUp,
  },
] as const;

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-20 bg-[#F7F5FF] py-[140px] dark:bg-primary-950/20 max-md:py-24"
      aria-labelledby="how-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="how-heading" className="mb-4 text-[var(--color-text-heading)]">
            How Eventra works
          </h2>
          <p className="text-body-lg">Four simple steps to better event experiences.</p>
        </div>

        <div className="relative mt-16">
          <div
            className="absolute left-[8%] right-[8%] top-[28px] hidden h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-[var(--color-brand-cyan)] md:block"
            aria-hidden
          />
          <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
            {steps.map(({ title, body, icon: Icon }, idx) => (
              <li key={title} className="relative flex flex-col items-center text-center">
                <div
                  className={cn(
                    'relative z-10 mb-4 flex size-14 items-center justify-center rounded-full',
                    'bg-gradient-to-br from-primary-600 to-primary-700 text-white shadow-lg ring-4 ring-[#F7F5FF] dark:ring-primary-950/50'
                  )}
                >
                  <Icon className="size-6" aria-hidden />
                </div>
                <span className="mb-1 text-xs font-bold text-primary-600">Step {idx + 1}</span>
                <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-heading)]">{title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-body)]">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
