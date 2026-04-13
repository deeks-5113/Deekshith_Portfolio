import { getSiteContent, type SiteVariant } from './siteContent';

export interface BlogPost {
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
}

export function getBlogs(variant: SiteVariant = 'product'): BlogPost[] {
  return getSiteContent(variant).blogsSection.items;
}

export function getBlogBySlug(slug: string, variant: SiteVariant = 'product') {
  return getBlogs(variant).find((blog) => blog.slug === slug);
}
