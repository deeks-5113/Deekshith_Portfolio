import React from 'react';
import { Home, FolderGit2, Network, Users } from 'lucide-react';
import { NarrativeSidebar } from './NarrativeSidebar';
import { useLens } from '@/context/LensContext';

export function Sidebar() {
  const { isTyping } = useLens();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-72 bg-twin-bg/95 border-r border-twin-border p-5 flex flex-col z-40 backdrop-blur-sm hidden lg:flex">
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
            <a href="#" className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-twin-card/50">
              <Home size={16} /> Home
            </a>
          </li>
          <li>
            <div className="flex flex-col gap-1 mt-1 p-2 relative">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <FolderGit2 size={16} /> Projects
              </div>
              {!isTyping && (
                <ul className="pl-7 text-[11px] text-gray-400 font-mono mt-1">
                  <li><button type="button" onClick={() => scrollToSection('thread-navigator')} className="block py-1 hover:text-twin-accent transition-colors">{'-> '}Thread Navigator</button></li>
                  <li><button type="button" onClick={() => scrollToSection('sakhi')} className="block py-1 hover:text-twin-accent transition-colors">{'-> '}Sakhi</button></li>
                  <li><button type="button" onClick={() => scrollToSection('presales')} className="block py-1 hover:text-twin-accent transition-colors">{'-> '}Pre-sales Co-pilot</button></li>
                </ul>
              )}
            </div>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-twin-card/50">
              <Network size={16} /> Architecture
            </a>
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
