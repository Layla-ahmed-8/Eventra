import { motion } from 'motion/react';

const logos = ['Pulse City', 'Northline', 'Guild Hall', 'Civic Labs', 'Studio 9', 'Riverfront', 'Orbit FM', 'OpenTable'];

export function SocialProofBar() {
  return (
    <section
      id="social-proof"
      className="border-y border-border/50 bg-[var(--color-surface-secondary)] dark:bg-muted/25"
      aria-labelledby="social-proof-heading"
    >
      <div className="mx-auto flex h-[120px] max-w-[1200px] flex-col items-center justify-center px-5 sm:px-8">
        <motion.p
          id="social-proof-heading"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.35 }}
          className="mb-4 text-center text-sm font-medium text-[var(--color-text-muted)]"
        >
          Trusted by leading communities and organizers
        </motion.p>
        <div className="flex w-full flex-wrap items-center justify-center gap-x-6 gap-y-4 md:justify-between">
          {logos.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              className="flex h-10 w-[140px] max-w-[140px] items-center justify-center rounded-md border border-border/40 bg-background/60 text-center text-xs font-semibold uppercase tracking-wide text-[var(--color-text-muted)] grayscale transition-all hover:grayscale-0 dark:bg-card/40"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
