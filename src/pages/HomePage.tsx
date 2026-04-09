import { TelemetryCluster } from '@/components/TelemetryCluster';
import { HeroSection } from '@/components/HeroSection';
import { WorkSection } from '@/components/work/WorkSection';
import { AskDigitalTwin } from '@/components/AskDigitalTwin';
import { BlogShowcase } from '@/components/blogs/BlogShowcase';

export function HomePage() {
  return (
    <>
      <TelemetryCluster />
      <HeroSection />
      <WorkSection />
      <BlogShowcase />
      <AskDigitalTwin />
    </>
  );
}
