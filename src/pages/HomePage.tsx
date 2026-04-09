import { TelemetryCluster } from '@/components/TelemetryCluster';
import { HeroSection } from '@/components/HeroSection';
import { WorkSection } from '@/components/work/WorkSection';
import { AskDigitalTwin } from '@/components/AskDigitalTwin';

export function HomePage() {
  return (
    <>
      <TelemetryCluster />
      <HeroSection />
      <WorkSection />
      <AskDigitalTwin />
    </>
  );
}
