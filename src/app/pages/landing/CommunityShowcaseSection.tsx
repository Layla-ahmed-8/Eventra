import { Heart, Reply } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';

const comments = [
  { name: 'Alex M.', text: 'Anyone grabbing tickets for the warehouse set tonight?', initials: 'AM' },
  { name: 'Jordan', text: 'Going! First time — any tips for parking?', initials: 'J' },
  { name: 'Samira', text: 'Meet at the north entrance at 7:45 🎵', initials: 'S' },
];

export function CommunityShowcaseSection() {
  return (
    <section
      id="community"
      className="scroll-mt-20 bg-[var(--color-surface-secondary)] py-[140px] dark:bg-muted/20 max-md:py-24"
      aria-labelledby="community-heading"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="community-heading" className="mb-4 text-[var(--color-text-heading)]">
            Where connections happen
          </h2>
          <p className="text-body-lg">Real conversations, real relationships.</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          <div className="rounded-[var(--radius-lg)] border border-border/60 bg-card p-6 shadow-[var(--shadow-card)] lg:col-span-3 dark:bg-card">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)]">
              Event discussion
            </p>
            <h3 className="mb-4 text-lg font-bold text-[var(--color-text-heading)]">Indie Night · After-hours thread</h3>
            <ul className="space-y-4">
              {comments.map((c) => (
                <li key={c.name} className="flex gap-3">
                  <Avatar className="size-9">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback className="text-xs">{c.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 rounded-2xl border border-border/50 bg-muted/40 px-4 py-3 dark:bg-muted/20">
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[var(--color-text-heading)]">{c.name}</span>
                      <button type="button" className="text-muted-foreground hover:text-primary-600" aria-label="Like">
                        <Heart className="size-4" />
                      </button>
                    </div>
                    <p className="text-sm text-[var(--color-text-body)]">{c.text}</p>
                    <button
                      type="button"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary-600 hover:underline"
                    >
                      <Reply className="size-3" />
                      Reply
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="gradient" size="default" className="sm:w-auto" asChild>
                <a href="#cta">Join this community</a>
              </Button>
              <p className="text-center text-xs text-[var(--color-text-muted)] sm:text-right">
                Moderation &amp; AI safety on by default
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-6 lg:col-span-2">
            {[
              { k: '50K+', l: 'Active members' },
              { k: '1M+', l: 'Discussions' },
              { k: '10K+', l: 'Communities' },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-[var(--radius-card)] border border-border/60 bg-card px-6 py-5 text-center shadow-[var(--shadow-card)] dark:bg-card"
              >
                <p className="text-3xl font-bold text-primary-600">{s.k}</p>
                <p className="text-sm font-medium text-[var(--color-text-body)]">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
