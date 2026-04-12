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

export const blogs: BlogPost[] = [
  {
    slug: 'ai-for-vizag-journey',
    title: 'From 5 Minutes to 200+ People',
    href: 'https://www.linkedin.com/feed/update/urn:li:activity:7439871977282129920/?originTrackingId=qZbe2s0jX1gtPoyM%2FKqGsA%3D%3D',
    description:
      'How a spontaneous ask turned into pitching an AI tool to 200+ people and what it taught me about building in public.',
    image: '/images/blog-ai-dev.svg',
    tag: 'Build in Public',
    readTime: '4 min read',
    date: 'April 2026',
    eyebrow: 'Field Note 01',
    heroSummary:
      'A short window turned into a room of 200+ people and a live pitch for an AI product. The useful lesson was not confidence. It was learning how quickly momentum compounds when you ship in public and let the work create the next opportunity.',
    lessons: [
      'Momentum often starts from small asks handled well under pressure.',
      'Public demos create surface area for unexpected opportunities.',
      'Building in public works best when the artifact is concrete, not performative.',
    ],
  },
  {
    slug: 'thread-navigator-v1-3',
    title: 'From Managing to Creating Context',
    href: 'https://www.linkedin.com/feed/update/urn:li:activity:7430800943299870720/?originTrackingId=DociBkdsCXlAHrWGGupJkQ%3D%3D',
    description:
      'Why developers are wasting hours rewriting prompts and how I built a system to engineer inputs instead of repeating them.',
    image: '/images/blog-system-design.svg',
    tag: 'Product Thinking',
    readTime: '3 min read',
    date: 'April 2026',
    eyebrow: 'Field Note 02',
    heroSummary:
      'Prompt repetition is not just annoying. It is a systems problem hidden inside daily workflow. This post traces the shift from manually managing context to intentionally engineering reusable inputs that preserve reasoning quality.',
    lessons: [
      'Context reuse is a product primitive, not a convenience feature.',
      'Developers lose more time to repeated setup than they realize.',
      'The right abstraction is not better prompting. It is better context packaging.',
    ],
  },
  {
    slug: 'ai-workflow-wall',
    title: 'The AI Workflow Wall',
    href: 'https://medium.com/@deekshithsistu/the-ai-workflow-wall-architecting-a-local-first-context-engine-for-llms-1b9f737afd04',
    description:
      'A deep dive into building a local-first context engine to eliminate scroll fatigue, silos, and repeated inputs in LLM workflows.',
    image: '/images/blog-n8n-ai.svg',
    tag: 'System Design',
    readTime: '6 min read',
    date: 'April 2026',
    eyebrow: 'Field Note 03',
    heroSummary:
      'Most AI workflow pain is not model quality. It is the friction of recovering context across long threads, siloed tools, and repeated prompt setup. The piece breaks down the local-first engine designed to remove that wall.',
    lessons: [
      'Local-first architecture can solve workflow friction without adding backend complexity.',
      'Scroll fatigue is a retrieval problem wearing a UX mask.',
      'Context engines matter because inputs shape the entire quality envelope of AI output.',
    ],
  },
];

export const blogsBySlug = Object.fromEntries(blogs.map((blog) => [blog.slug, blog])) as Record<string, BlogPost>;

export function getBlogBySlug(slug: string) {
  return blogsBySlug[slug];
}
