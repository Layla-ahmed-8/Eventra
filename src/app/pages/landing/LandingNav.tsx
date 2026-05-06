import { Link } from 'react-router';
import { Logo } from '../../components/brand/Logo';
import { ThemeToggle } from '../../components/ui/theme-toggle';
import { Button } from '../../components/ui/button';
import { cn } from '../../../utils/designSystem';

const navLink =
  'text-sm font-medium text-[var(--color-text-body)] hover:text-[var(--color-text-heading)] transition-colors';

export function LandingNav({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        'sticky top-0 z-[var(--z-sticky)] h-16 border-b border-border/60 bg-background/85 backdrop-blur-md',
        className
      )}
    >
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <Logo size="sm" showTagline className="hidden min-[380px]:flex" />
        <Logo size="sm" className="min-[380px]:hidden" />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Marketing">
          <a href="#features" className={navLink}>
            Features
          </a>
          <a href="#how-it-works" className={navLink}>
            How it works
          </a>
          <a href="#organizers" className={navLink}>
            Organizers
          </a>
          <a href="#community" className={navLink}>
            Community
          </a>
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button variant="gradient" size="xl" className="hidden sm:inline-flex" asChild>
            <Link to="/signup">Get started free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
