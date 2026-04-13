import React from 'react';
import { Link2, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useDeepDive } from '@/contexts/DeepDiveContext';
import { getProjectBySlug } from '@/data/projects';
import { NarrativeSidebar } from './NarrativeSidebar';

export function Sidebar() {
  const { isInDeepDive, currentProjectId } = useDeepDive();
  const location = useLocation();
  const activeProject = currentProjectId ? getProjectBySlug(currentProjectId) : null;
  const isLandingNarrativeRoute =
    location.pathname === '/' ||
    location.pathname === '/product' ||
    location.pathname === '/consulting' ||
    location.pathname === '/gcc';
  const isHomeNarrative = isLandingNarrativeRoute && !isInDeepDive;

  const railHeader = (
    <div className="mb-1 border-b border-white/8 pb-6">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.32em] text-[#22D3EE]">
        <Sparkles size={12} />
        Narrative Rail
      </div>
      <h1 className="mt-4 text-xl font-bold tracking-tight text-white">Deekshith Sistu</h1>
      <p className="mt-1 text-[11px] leading-tight text-twin-accent">
        Agentic AI Developer | AI-Native Architect
      </p>
    </div>
  );

  const deepDivePanel = isInDeepDive && activeProject?.sidebar ? (
    <>
      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
        <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
          <Link2 size={12} />
          Focused Path
        </div>
        <p className="text-sm leading-relaxed text-zinc-300">
          Deep dive mode keeps only contextual escape hatches. Entry and exit stay task-specific; the rest of the screen stays focused on the case study.
        </p>
      </div>

      <div className="mt-4 px-1">
        <h2 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
          Director&apos;s Commentary
        </h2>
        <div className="rounded-xl border border-twin-border bg-twin-card/80 p-5 shadow-lg">
          <p className="whitespace-pre-line font-mono text-sm leading-relaxed text-gray-300">
            {activeProject.sidebar.commentary}
          </p>
        </div>
      </div>

      <div className="mt-4 px-1">
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
    <div className="sticky top-0">
      <NarrativeSidebar />
    </div>
  );

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden lg:flex lg:w-[var(--narrative-rail-width)] lg:flex-col lg:border-r lg:border-twin-border lg:bg-twin-bg/95 lg:p-5 lg:backdrop-blur-sm">
        {railHeader}
        <div className="flex flex-1 flex-col overflow-y-auto">
          {deepDivePanel}
        </div>
      </aside>

      {isHomeNarrative && (
        <div className="sticky top-[5.25rem] z-40 px-4 pb-2 md:px-8 lg:hidden">
          <div className="rounded-[1.5rem] border border-white/10 bg-[#050505]/90 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <NarrativeSidebar />
          </div>
        </div>
      )}
    </>
  );
}
