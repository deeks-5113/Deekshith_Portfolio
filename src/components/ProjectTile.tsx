
import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLens } from '@/context/LensContext';

interface ProjectTileProps {
  id: string; // Used to identify the active project (e.g., 'sakhi')
  title: string;
  lensData: string;
  className?: string;
  icon?: React.ReactNode;
}

export function ProjectTile({ id, title, lensData, className = '', icon }: ProjectTileProps) {
  const { setActiveProject, setCommentaryProject } = useLens();
  const ref = useRef<HTMLDivElement>(null);

  // Intersection Observer to update the Global activeProject and commentary context
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveProject(id);
            setCommentaryProject(id);
          }
        });
      },
      { threshold: 0.6 } // Update when 60% of the tile is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [id, setActiveProject, setCommentaryProject]);

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-[#22D3EE]/20 bg-[#050505]/80 p-8 transition-all duration-500 hover:border-[#22D3EE]/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] backdrop-blur-xl ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        {icon && (
          <div className="rounded-lg bg-twin-bg p-2 text-[#22D3EE]">
            {icon}
          </div>
        )}
        <h2 className="text-xl font-bold tracking-tight text-gray-100">{title}</h2>
      </div>

      <div className="relative flex-grow h-[120px]">
        <AnimatePresence mode="wait">
          <motion.div
            key="architect"
            initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(8px)', y: -10 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 text-sm font-mono leading-relaxed text-[#22D3EE]"
          >
            {lensData}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
