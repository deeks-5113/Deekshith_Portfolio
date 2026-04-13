import contentJson from './dir_content.json';

export type AboutContentKey = 'default' | 'headline' | 'summary' | 'center';
export type BlogContentKey = 'default' | 'intro';

type ContentSchema = {
  hero: Record<string, string>;
  about: Record<AboutContentKey, string> & { skills: Record<string, string> };
  projects: {
    default: string;
    items: Record<
      string,
      {
        default: string;
        signals: Record<string, string>;
      }
    >;
  };
  blogs: {
    default: string;
    intro: string;
    items: Record<string, string>;
  };
};

export const content = contentJson as ContentSchema;

const projectAliases: Record<string, string> = {
  navigator: 'thread-navigator',
  'thread-navigator': 'thread-navigator',
  sakhi: 'sakhi',
  presales: 'presales',
};

export function getHeroCommentary(key: string = 'default') {
  return content.hero[key] ?? content.hero.default;
}

export function getAboutCommentary(key: AboutContentKey = 'default') {
  return content.about[key];
}

export function getAboutSkillCommentary(skill: string) {
  return content.about.skills[skill] ?? content.about.default;
}

export function getProjectCommentary(projectId: string, signal?: string) {
  const project = content.projects.items[projectAliases[projectId] ?? projectId];
  if (!project) return content.projects.default;
  if (signal) return project.signals[signal] ?? project.default;
  return project.default;
}

export function getBlogCommentary(slug?: string | null, key: BlogContentKey = 'default') {
  if (slug) return content.blogs.items[slug] ?? content.blogs.default;
  return content.blogs[key];
}
