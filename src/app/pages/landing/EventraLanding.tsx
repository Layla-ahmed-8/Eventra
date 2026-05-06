import { LandingNav } from './LandingNav';
import { HeroSection } from './HeroSection';
import { SocialProofBar } from './SocialProofBar';
import { FeaturesSection } from './FeaturesSection';
import { HowItWorksSection } from './HowItWorksSection';
import { OrganizersSection } from './OrganizersSection';
import { CommunityShowcaseSection } from './CommunityShowcaseSection';
import { FinalCtaSection } from './FinalCtaSection';
import { LandingSiteFooter } from './LandingSiteFooter';

export default function EventraLanding() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />
      <main>
        <HeroSection />
        <SocialProofBar />
        <FeaturesSection />
        <HowItWorksSection />
        <OrganizersSection />
        <CommunityShowcaseSection />
        <FinalCtaSection />
      </main>
      <LandingSiteFooter />
    </div>
  );
}
