import { Link } from 'react-router';
import { Button } from '../../components/ui/button';

export function FinalCtaSection() {
  return (
    <section
      id="cta"
      className="scroll-mt-20 min-h-[200px] bg-gradient-cta py-16 text-center text-white md:py-20"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-[720px] px-5">
        <h2 id="cta-heading" className="mb-3 text-3xl font-bold tracking-tight text-white md:text-4xl">
          Start discovering smarter events today
        </h2>
        <p className="mb-8 text-lg text-white/80">
          Join thousands of event enthusiasts using AI to find their perfect experiences.
        </p>
        <Button
          size="xl"
          className="bg-white px-8 font-semibold text-primary-700 shadow-lg hover:bg-white/95 hover:text-primary-800"
          asChild
        >
          <Link to="/signup">Get started free</Link>
        </Button>
        <p className="mt-4 text-sm text-white/75">No credit card required · Free forever</p>
      </div>
    </section>
  );
}
