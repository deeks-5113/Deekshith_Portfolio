import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLens } from '@/context/LensContext';
import { architectureData } from '@/data/architectureMapping';

// Lazy load diagrams to optimize bundle
const SakhiDiagram = React.lazy(() => import('./diagrams/SakhiDiagram').then(module => ({ default: module.SakhiDiagram })));
const NavigatorDiagram = React.lazy(() => import('./diagrams/NavigatorDiagram').then(module => ({ default: module.NavigatorDiagram })));
const PresalesDiagram = React.lazy(() => import('./diagrams/PresalesDiagram').then(module => ({ default: module.PresalesDiagram })));
const UnicolabDiagram = React.lazy(() => import('./diagrams/UnicolabDiagram').then(module => ({ default: module.UnicolabDiagram })));

export function ArchitectureGallery() {
  const { isArchitectMode, activeProject, setActiveProject } = useLens();

  const projects = Object.values(architectureData);

  const renderActiveDiagram = () => {
    switch (activeProject) {
      case 'sakhi': return <SakhiDiagram />;
      case 'navigator': return <NavigatorDiagram />;
      case 'presales': return <PresalesDiagram />;
      case 'unicolab': return <UnicolabDiagram />;
      default: return null;
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-8 lg:pl-16 pb-32 pt-16 relative z-10 min-h-screen disable-scrollbars">
      
      {/* Header */}
      <div className="mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-mono tracking-tight text-white mb-4">
          Core <span className={isArchitectMode ? "text-[#22D3EE]" : "text-[#A1A1AA]"}>Systems</span>
        </h2>
        <p className="text-gray-400 font-mono max-w-2xl">
          {isArchitectMode 
            ? "Deep dives into deterministic routing architectures, DOM-level state teleportation, and real-time distributed clusters." 
            : "High-level overviews of how engineered systems reduce enterprise costs, scale human expertise, and eliminate context silos."}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 h-[600px]">
        {/* Left Vertical Scrubber */}
        <div className="w-full lg:w-64 flex flex-shrink-0 flex-col gap-2 border-l border-twin-border/50 pl-4 py-8 relative">
          {/* Active Highlight Line */}
          <div 
            className="absolute left-0 w-[2px] bg-twin-card/50 h-full"
            style={{ top: 0 }}
          />

          {projects.map((project) => {
            const isActive = activeProject === project.id;
            return (
              <button
                key={project.id}
                onClick={() => setActiveProject(project.id)}
                className={`text-left px-4 py-3 rounded-lg transition-all duration-300 relative group font-mono text-sm
                  ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
                `}
              >
                {isActive && (
                  <motion.div 
                    layoutId="activeScrubber"
                    className={`absolute left-[-16px] top-0 bottom-0 w-[2px] ${isArchitectMode ? 'bg-[#22D3EE]' : 'bg-[#A1A1AA]'}`}
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {isActive && (
                   <motion.div 
                   layoutId="activeScrubberBg"
                   className={`absolute inset-0 z-[-1] rounded-lg bg-white/5 border border-white/10`}
                   initial={false}
                   transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                 />
                )}
                {project.title}
              </button>
            );
          })}
        </div>

        {/* Right Stage (Diagram Shell) */}
        <div className="flex-1 bg-twin-bg/50 border border-twin-border rounded-xl backdrop-blur-md relative overflow-hidden flex items-center justify-center min-h-[500px]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeProject}-${isArchitectMode ? 'architect' : 'strategist'}`}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex flex-col p-8"
            >
              {/* Header Title */}
              <h3 className={`text-xl font-bold mb-6 ${isArchitectMode ? 'text-[#22D3EE] font-mono' : 'text-[#A1A1AA] font-sans'}`}>
                {isArchitectMode 
                  ? architectureData[activeProject]?.architectLens.systemHeadline 
                  : architectureData[activeProject]?.strategistLens.roiHeadline}
              </h3>
              
              {/* Interactive SVG Rendering Stage */}
              <div className="flex-1 w-full h-full relative">
                <Suspense fallback={<div className="text-gray-500 font-mono text-sm absolute inset-0 flex items-center justify-center">Loading Architecture...</div>}>
                  {renderActiveDiagram()}
                </Suspense>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
