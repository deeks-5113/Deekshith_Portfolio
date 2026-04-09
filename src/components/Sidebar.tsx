import React from 'react';
import { Home, FolderGit2, Newspaper, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NarrativeSidebar } from './NarrativeSidebar';
import { useLens } from '@/context/LensContext';
import { useDeepDive } from '@/contexts/DeepDiveContext';
import { getProjectBySlug } from '@/data/projects';

export function Sidebar() {
  const { isTyping } = useLens();
  const { isInDeepDive, currentProjectId } = useDeepDive();
  const activeProject = currentProjectId ? getProjectBySlug(currentProjectId) : null;
  const deepDiveSections =
    activeProject?.slug === 'thread-navigator'
      ? [
          { id: 'identity', label: 'Project Identity' },
          { id: 'architecture', label: 'System Architecture' },
          { id: 'signals', label: 'Deep Dive Signals' },
          { id: 'lenses', label: 'Dual Lens Analysis' },
          { id: 'next-build', label: "What I'd Build Next" },
        ]
      : [];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 z-40 hidden w-72 flex-col border-r border-twin-border bg-twin-bg/95 p-5 backdrop-blur-sm lg:flex"
    >
      {/* Profile Section */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white mb-1 tracking-tight">Deekshith Sistu</h1>
        <p className="text-[11px] text-twin-accent font-mono leading-tight">Agentic AI Developer | AI-Native Architect</p>
      </div>

      {/* Navigation */}
      <nav className="mb-4">
        <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Navigation</h2>
        <ul className="space-y-0.5">
          <li>
            <Link to="/" className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-twin-card/50">
              <Home size={16} /> Home
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm text-gray-300 transition-colors hover:bg-twin-card/50 hover:text-white"
            >
              <FolderGit2 size={16} /> Projects
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => scrollToSection('blogs')}
              className="flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm text-gray-300 transition-colors hover:bg-twin-card/50 hover:text-white"
            >
              <Newspaper size={16} /> Blogs
            </button>
          </li>
          <li>
            <a href="#leadership" className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-twin-card/50">
              <Users size={16} /> Leadership
            </a>
          </li>
        </ul>
      </nav>

      <div className="flex-grow flex flex-col justify-end gap-4">
        {isInDeepDive && activeProject?.sidebar ? (
          <>
            <div className="px-2">
              <h2 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Director's Commentary
              </h2>
              <div className="rounded-xl border border-twin-border bg-twin-card/80 p-5 shadow-lg">
                <p className="whitespace-pre-line font-mono text-sm leading-relaxed text-gray-300">
                  {activeProject.sidebar.commentary}
                </p>
              </div>
            </div>

            <div className="px-2">
              <h2 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                System Log
              </h2>
              <div className="rounded-xl border border-twin-border bg-twin-card/80 p-5 shadow-lg">
                <div className="space-y-2 font-mono text-[11px] leading-relaxed text-gray-400">
                  {activeProject.sidebar.systemLog.map((entry) => (
                    <p key={entry}>{entry}</p>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 px-2">System Log</h2>
            <NarrativeSidebar />
          </>
        )}
      </div>
    </aside>
  );
}
