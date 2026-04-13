import { TelemetryCluster } from '@/components/TelemetryCluster';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { WorkSection } from '@/components/work/WorkSection';
import { BlogShowcase } from '@/components/blogs/BlogShowcase';
import { ContactSimpleForm } from '@/components/ContactSimpleForm';
import { SiteFooter } from '@/components/SiteFooter';
import { useEffect } from 'react';
import { useLocation, type Location } from 'react-router-dom';
import { useSiteVariant } from '@/data/siteContent';

type HomeLocationState = {
  scrollTo?: string;
};

export function HomePage() {
  const location = useLocation() as Location<HomeLocationState>;
  const landingView = useSiteVariant();

  useEffect(() => {
    const targetId = location.state?.scrollTo ?? location.hash.replace('#', '');

    if (!targetId) return;

    const scrollToTarget = () => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

    requestAnimationFrame(scrollToTarget);
  }, [location.hash, location.state]);

  return (
    <>
      <TelemetryCluster />
      <HeroSection />
      <AboutSection />
      <WorkSection view={landingView} />
      <BlogShowcase />
      <ContactSimpleForm />
      <SiteFooter />
    </>
  );
}
