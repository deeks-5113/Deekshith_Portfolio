import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLens } from '@/context/LensContext';
import { architectureData } from '@/data/architectureMapping';

export function NavigatorDiagram() {
  const { isArchitectMode, setActiveHoverLog } = useLens();
  const data = architectureData['navigator'];

  const architectColor = "#6366F1"; // aura-logic (Indigo)
  const handleHover = (nodeId: string | null) => {
    if (!isArchitectMode || !nodeId) {
      setActiveHoverLog(null);
      return;
    }
    setActiveHoverLog(data.commentaryLogs[nodeId] || null);
  };

  return (
    <div className="w-full h-full relative flex items-center justify-center p-8 bg-black/20 rounded-xl">
      <svg 
        viewBox="0 0 800 500" 
        className="w-full h-full drop-shadow-2xl"
        onMouseLeave={() => handleHover(null)}
      >
        <defs>
          <filter id="glow-indigo" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <AnimatePresence mode="wait">
          {isArchitectMode ? (
            <motion.g
              key="architect-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Path: DOM -> Relay */}
              <motion.path
                d="M 220 250 L 330 250"
                stroke={architectColor}
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
              {/* Path: Relay -> Inject */}
              <motion.path
                d="M 470 250 L 580 250"
                stroke={architectColor}
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              />

              {/* Node: DOM Extraction */}
              <motion.g 
                layoutId="nav-node-dom"
                onMouseEnter={() => handleHover('dom')}
                className="cursor-crosshair"
              >
                <rect x="60" y="210" width="160" height="80" rx="8" fill="#1A1A1A" stroke="white" strokeWidth="1" />
                <text x="140" y="245" fill="white" fontSize="14" fontFamily="monospace" textAnchor="middle">DOM Extractor</text>
                <text x="140" y="265" fill="gray" fontSize="10" fontFamily="monospace" textAnchor="middle">Scrapes LLM UI</text>
              </motion.g>

              {/* Node: Storage API Relay */}
              <motion.g 
                layoutId="nav-node-relay"
                onMouseEnter={() => handleHover('relay')}
                className="cursor-crosshair"
              >
                <rect x="330" y="210" width="140" height="80" rx="4" fill="#0A0A0A" stroke={architectColor} strokeWidth="2" filter="url(#glow-indigo)" />
                <text x="400" y="245" fill={architectColor} fontSize="14" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Chrome Storage</text>
                <text x="400" y="265" fill={architectColor} fontSize="12" fontFamily="monospace" textAnchor="middle">API Relay</text>
              </motion.g>

              {/* Node: Target Injection */}
              <motion.g 
                layoutId="nav-node-inject"
                onMouseEnter={() => handleHover('inject')}
                className="cursor-crosshair"
              >
                <rect x="580" y="210" width="160" height="80" rx="8" fill="#050505" stroke={architectColor} strokeWidth="1.5" strokeDasharray="4 4"/>
                <text x="660" y="245" fill="white" fontSize="14" fontFamily="monospace" textAnchor="middle">Injection Engine</text>
                <text x="660" y="265" fill="gray" fontSize="10" fontFamily="monospace" textAnchor="middle">Hydrates Target</text>
              </motion.g>
            </motion.g>
          ) : (
            <motion.g
              key="strategist-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Strategist Metrics Chart Visual */}
              {/* Bar 1 morphing from dom */}
              <motion.g layoutId="nav-node-dom">
                <rect x="200" y="300" width="80" height="100" fill="gray" opacity="0.6" />
                <text x="240" y="285" fill="white" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Month 1</text>
              </motion.g>
              
              {/* Bar 2 morphing from relay */}
              <motion.g layoutId="nav-node-relay">
                <rect x="340" y="200" width="80" height="200" fill="gray" opacity="0.8" />
                <text x="380" y="185" fill="white" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Month 2</text>
              </motion.g>

              {/* Bar 3 morphing from inject */}
              <motion.g layoutId="nav-node-inject">
                <rect x="480" y="100" width="80" height="300" fill={architectColor} opacity="0.9" />
                <text x="520" y="85" fill="white" fontSize="12" fontFamily="sans-serif" textAnchor="middle">Month 3</text>
                <text x="520" y="55" fill={architectColor} fontSize="14" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">60+ Active Users</text>
              </motion.g>

              {/* X Axis Baseline */}
              <line x1="180" y1="400" x2="600" y2="400" stroke="white" strokeWidth="2" opacity="0.2" />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}
