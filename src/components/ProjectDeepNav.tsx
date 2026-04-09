import { ArrowLeft, Home, Waypoints } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ProjectData } from '@/data/projects';

interface ProjectDeepNavProps {
  project: ProjectData;
  onExit: () => void;
}

export function ProjectDeepNav({ project, onExit }: ProjectDeepNavProps) {
  return (
    <div className="sticky top-0 z-40 border-b border-white/8 bg-[#050505]/75 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-8">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-gray-500">
            <Link to="/" className="inline-flex items-center gap-1 transition-colors hover:text-white">
              <Home size={12} />
              Home
            </Link>
            <span>/</span>
            <span>Projects</span>
            <span>/</span>
            <span className="text-white">{project.shortTitle}</span>
            <span>/</span>
            <span style={{ color: project.theme.hud }}>{project.breadcrumbLabel}</span>
          </div>

          <div className="flex items-center gap-3">
            <Waypoints size={18} style={{ color: project.theme.secondary }} />
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500">Deep Dive</p>
              <h1 className="text-lg font-semibold text-white md:text-xl">{project.title}</h1>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onExit}
          aria-label={`Exit ${project.title} deep dive`}
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-white/25 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/20"
        >
          <ArrowLeft size={16} />
          Exit Deep Dive
        </button>
      </div>
    </div>
  );
}
