// web/src/app/page.tsx
import { HeroSection } from '@/components/sections/HeroSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { AdaptersPreview } from '@/components/sections/AdaptersPreview';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { ArchitectureDiagram } from '@/components/sections/ArchitectureDiagram';
import { DeveloperSection } from '@/components/sections/DeveloperSection';
import { CTASection } from '@/components/sections/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AdaptersPreview />
      <HowItWorks />
      <ArchitectureDiagram />
      <DeveloperSection />
      <CTASection />
    </>
  );
}
