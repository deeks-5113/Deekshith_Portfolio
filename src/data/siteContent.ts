import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import siteContentJson from './site_content.json';
import consultingContentJson from './consulting_content.json';
import gccContentJson from './gcc_contet.json';

type LensContent = {
  headline: string;
  metrics: string;
  description: string;
};

type MetricContent = {
  label: string;
  value: string;
};

type DeepDiveSectionContent = {
  title: string;
  body: string;
};

type NextBuildContent = {
  status: string;
  title: string;
  body: string[];
};

type SiteContentSchema = {
  ui: {
    telemetry: {
      agentStatus: string;
      uptime: string;
    };
    continueCue: {
      heroToAbout: { chapter: string; title: string };
      aboutToProjects: { chapter: string; title: string };
      projectsToBlogs: { chapter: string; title: string };
    };
  };
  hero: {
    name: string;
    introSuffix: string;
    supporting: string;
  };
  about: {
    eyebrow: string;
    title: string;
    skillPrompt: string;
    body: string[];
    closing: string;
    centerLabel: string;
    skills: Array<{ label: string; icon: string }>;
  };
  projectsSection: {
    title: string;
    intro: string;
    landingStateLabel: string;
    loadedSuffixSingular: string;
    loadedSuffixPlural: string;
  };
  landingViews: Record<
    'all' | 'product' | 'consulting' | 'gcc',
    {
      label: string;
      description: string;
    }
  >;
  projectCards: {
    panelTitle: string;
    fallbackPanelItem: string;
    viewSystemCta: string;
    items: Array<{
      id: string;
      title: string;
      shortTitle: string;
      domainAura: string;
      tags: string[];
      architectPanelItems: string[];
      lens: LensContent;
      summary: string;
      telemetry: MetricContent[];
      deepDiveSections: DeepDiveSectionContent[];
      nextBuild: NextBuildContent;
    }>;
  };
  blogsSection: {
    eyebrow: string;
    title: string;
    intro: string;
    supporting: string;
    cardMeta: string;
    readMore: string;
    post: {
      backToHome: string;
      whyItMattersLabel: string;
      whyItMattersBody: string;
      keyTakeawaysLabel: string;
    };
    items: Array<{
      slug: string;
      title: string;
      description: string;
      image: string;
      href: string | null;
      tag: string;
      readTime: string;
      date: string;
      eyebrow: string;
      heroSummary: string;
      lessons: string[];
    }>;
  };
  contact: {
    eyebrow: string;
    title: string;
    intro: string;
    fields: {
      firstName: { label: string; placeholder: string };
      lastName: { label: string; placeholder: string };
      email: { label: string; placeholder: string };
      phoneNumber: { label: string };
      phoneCountryAria: string;
      phoneAria: string;
      message: { label: string; placeholder: string };
    };
    submitLabel: string;
    mailto: {
      subjectTemplate: string;
      bodyTemplate: string;
    };
    helper: string;
    directEmailPrefix: string;
  };
  footer: {
    name: string;
    copyright: string;
    socialLinks: Array<{ label: string; href: string }>;
  };
  phoneCountryOptions: Array<{
    code: string;
    label: string;
    dialCode: string;
    placeholder: string;
  }>;
};

export type SiteVariant = 'product' | 'consulting' | 'gcc';

const siteContentByVariant: Record<SiteVariant, SiteContentSchema> = {
  product: siteContentJson as SiteContentSchema,
  consulting: consultingContentJson as SiteContentSchema,
  gcc: gccContentJson as SiteContentSchema,
};

export function getSiteContent(variant: SiteVariant = 'product') {
  return siteContentByVariant[variant];
}

export function resolveSiteVariant(pathname: string): SiteVariant {
  if (pathname.startsWith('/consulting')) return 'consulting';
  if (pathname.startsWith('/gcc')) return 'gcc';
  return 'product';
}

export function useSiteVariant() {
  const location = useLocation();
  return useMemo(() => resolveSiteVariant(location.pathname), [location.pathname]);
}

export function useSiteContent() {
  const siteVariant = useSiteVariant();
  const content = useMemo(() => getSiteContent(siteVariant), [siteVariant]);

  return {
    siteVariant,
    siteContent: content,
  };
}

export function getProjectCardContent(projectId: string, variant: SiteVariant = 'product') {
  return getSiteContent(variant).projectCards.items.find((item) => item.id === projectId);
}

export function getBlogContent(slug: string, variant: SiteVariant = 'product') {
  return getSiteContent(variant).blogsSection.items.find((item) => item.slug === slug);
}
