import { TelemetryCluster } from '@/components/TelemetryCluster';
import { HeroSection } from '@/components/HeroSection';
import { WorkSection } from '@/components/work/WorkSection';
import { BlogShowcase } from '@/components/blogs/BlogShowcase';
import { ContactSimpleForm } from '@/components/ContactSimpleForm';
import { SiteFooter } from '@/components/SiteFooter';

export function HomePage() {
  return (
    <>
      <TelemetryCluster />
      <HeroSection />
      <WorkSection />
      <BlogShowcase />
      <ContactSimpleForm />
      <SiteFooter />
    </>
  );
}
