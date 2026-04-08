import React from 'react';
import { Home, FolderGit2, Network, Users, BookMarked, Layers } from 'lucide-react';
import { NarrativeSidebar } from './NarrativeSidebar';

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-72 bg-twin-bg/95 border-r border-twin-border p-6 flex flex-col z-40 backdrop-blur-sm hidden lg:flex">
      {/* Profile Section */}
      <div className="mb-10">
        <h1 className="text-xl font-bold text-white mb-1 tracking-tight">Deekshith Sistu</h1>
        <p className="text-xs text-twin-accent font-mono">Agentic AI Developer | AI-Native Architect</p>
      </div>

      {/* Navigation */}
      <nav className="mb-8">
        <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Navigation</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-twin-card/50">
              <Home size={16} /> Home
            </a>
          </li>
          <li>
            <div className="flex flex-col gap-2 mt-2 p-2 relative">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <FolderGit2 size={16} /> Projects
              </div>
              <ul className="pl-7 space-y-2 text-xs text-gray-400 font-mono">
                <li><a href="#sakhi" className="hover:text-twin-accent transition-colors">↳ Sakhi</a></li>
                <li><a href="#navigator" className="hover:text-twin-accent transition-colors">↳ Thread Navigator</a></li>
              </ul>
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

      {/* Resources */}
      <div className="mb-8">
        <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Resources</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-twin-card/50">
              <BookMarked size={16} /> Research Vault
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-twin-card/50">
              <Layers size={16} /> System Stack
            </a>
          </li>
        </ul>
      </div>

      {/* Narrative Console (System Log) */}
      <div className="flex-grow flex flex-col justify-end">
        <h2 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 px-2">System Log</h2>
        <NarrativeSidebar />
      </div>
    </aside>
  );
}
