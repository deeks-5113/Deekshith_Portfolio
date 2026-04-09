import React from 'react';
import { Home, FolderGit2, Network, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NarrativeSidebar } from './NarrativeSidebar';
import { useLens } from '@/context/LensContext';
import { useDeepDive } from '@/contexts/DeepDiveContext';
import { projectsData } from '@/data/projects';

export function Sidebar() {
  const { isTyping } = useLens();
  const { isInDeepDive } = useDeepDive();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 hidden w-72 flex-col border-r border-twin-border bg-twin-bg/95 p-5 backdrop-blur-sm transition-all duration-500 lg:flex ${
        isInDeepDive ? 'pointer-events-none opacity-0 -translate-x-6' : 'pointer-events-auto opacity-100 translate-x-0'
      }`}
      aria-hidden={isInDeepDive}
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
            <div className="flex flex-col gap-1 mt-1 p-2 relative">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <FolderGit2 size={16} /> Projects
              </div>
              {!isTyping && (
                <ul className="pl-7 text-[11px] text-gray-400 font-mono mt-1">
                  {projectsData.map((project) => (
                    <li key={project.id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(project.id)}
                        className="block py-1 transition-colors hover:text-twin-accent"
                      >
                        {'-> '}
                        {project.shortTitle}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
          <li>
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              className="flex w-full items-center gap-3 rounded-lg p-2 text-left text-sm text-gray-300 transition-colors hover:bg-twin-card/50 hover:text-white"
            >
              <Network size={16} /> Architecture
            </button>
          </li>
          <li>
            <a href="#leadership" className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-twin-card/50">
              <Users size={16} /> Leadership
            </a>
          </li>
        </ul>
      </nav>

      {/* Narrative Console (System Log) */}
      <div className="flex-grow flex flex-col justify-end">
        <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 px-2">System Log</h2>
        <NarrativeSidebar />
      </div>
    </aside>
  );
}
