
import React from 'react';
import { motion } from 'framer-motion';
import { useLens } from '@/context/LensContext';
import { Network, PenTool } from 'lucide-react';

export function PerspectiveToggle() {
  const { isArchitectMode, setIsArchitectMode } = useLens();

  return (
    <div className="flex items-center gap-4 bg-twin-card/90 backdrop-blur-md border border-twin-border p-2 rounded-full shadow-md">
      <span 
        className={`text-xs font-bold tracking-wider uppercase transition-colors duration-300 pl-3 ${isArchitectMode ? 'text-[#A1A1AA]' : 'text-[#A1A1AA] opacity-50'}`}
      >
        Strategist
      </span>
      
      <button
        onClick={() => setIsArchitectMode(!isArchitectMode)}
        className="w-16 h-8 rounded-full bg-twin-bg p-1 relative flex items-center border border-twin-border"
        aria-label="Toggle Perspective"
      >
        <motion.div
          animate={{ x: isArchitectMode ? 32 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md ${isArchitectMode ? 'bg-[#22D3EE]' : 'bg-[#A1A1AA]'}`}
        >
          {isArchitectMode ? (
            <Network size={12} className="text-twin-bg" />
          ) : (
            <PenTool size={12} className="text-twin-bg" />
          )}
        </motion.div>
      </button>

      <span 
        className={`text-xs font-bold tracking-wider uppercase transition-colors duration-300 pr-3 ${isArchitectMode ? 'text-[#22D3EE]' : 'text-[#22D3EE] opacity-50'}`}
      >
        Architect
      </span>
    </div>
  );
}
