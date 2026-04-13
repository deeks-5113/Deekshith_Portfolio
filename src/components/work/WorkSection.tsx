import React, { useEffect, useMemo } from 'react';
import { FilteredStickyScrollStack } from './FilteredStickyScrollStack';
import { useLens } from '@/context/LensContext';
import { SectionContinueCue } from '@/components/SectionContinueCue';
import {
  getProjectsForLandingView,
  getLandingViewMeta,
  type LandingView,
} from '@/data/projects';
import { useSiteContent } from '@/data/siteContent';

interface WorkSectionProps {
  view: LandingView;
}

export function WorkSection({ view }: WorkSectionProps) {
  const { isTyping, setActiveProject, setCommentaryProject, setActiveHoverLog } = useLens();
  const { siteVariant, siteContent } = useSiteContent();
  const projects = useMemo(() => getProjectsForLandingView(view, siteVariant), [view, siteVariant]);
  const viewMeta = useMemo(() => getLandingViewMeta(view, siteVariant), [view, siteVariant]);
  const { projectsSection, ui } = siteContent;

  useEffect(() => {
    const firstProject = projects[0];

    if (!firstProject) return;

    setActiveProject(firstProject.commentaryKey);
    setCommentaryProject(firstProject.commentaryKey);
    setActiveHoverLog(null);
  }, [projects, setActiveHoverLog, setActiveProject, setCommentaryProject]);

  if (isTyping) return null;

  return (
    <section
      id="projects"
      className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:pl-16 relative z-10 min-h-screen disable-scrollbars py-20"
    >
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-bold font-mono tracking-tight text-white text-center md:text-left">
          <span className="text-[#A1A1AA]">{projectsSection.title}</span>
        </h2>
        <p className="mt-4 max-w-3xl text-sm md:text-base text-gray-400 font-mono leading-relaxed text-center md:text-left">
          {projectsSection.intro}
        </p>
      </div>

      <div className="mb-8 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 md:p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#67E8F9]">{projectsSection.landingStateLabel}</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{viewMeta.label}</h3>
          </div>
          <div className="rounded-full border border-white/10 bg-black/30 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-300">
            {projects.length} {projects.length === 1 ? projectsSection.loadedSuffixSingular : projectsSection.loadedSuffixPlural}
          </div>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-400">{viewMeta.description}</p>
      </div>

      <FilteredStickyScrollStack projects={projects} />
      <SectionContinueCue
        targetId="blogs"
        chapter={ui.continueCue.projectsToBlogs.chapter}
        title={ui.continueCue.projectsToBlogs.title}
      />
    </section>
  );
}
