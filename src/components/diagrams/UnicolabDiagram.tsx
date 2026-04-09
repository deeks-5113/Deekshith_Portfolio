import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLens } from '@/context/LensContext';
import { architectureData } from '@/data/architectureMapping';

export function UnicolabDiagram() {
  const { isArchitectMode, setActiveHoverLog } = useLens();
  const data = architectureData['unicolab'];

  const architectColor = "#EF4444"; // aura-rigor (Red)
  const strategistColor = "#A1A1AA";

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
          <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
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
              {/* Paths: Clients -> Sockets */}
              <motion.path d="M 160 150 L 260 150 L 260 250 L 330 250" stroke={architectColor} strokeWidth="2" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
              <motion.path d="M 160 250 L 330 250" stroke={architectColor} strokeWidth="2" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
              <motion.path d="M 160 350 L 260 350 L 260 250 L 330 250" stroke={architectColor} strokeWidth="2" fill="none"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />

              {/* Paths: Sockets -> Nodes */}
              <motion.path d="M 470 250 L 520 250 L 520 150 L 580 150" stroke={architectColor} strokeWidth="2" fill="none" strokeDasharray="4 4"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }} />
              <motion.path d="M 470 250 L 580 250" stroke={architectColor} strokeWidth="2" fill="none" strokeDasharray="4 4"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }} />
              <motion.path d="M 470 250 L 520 250 L 520 350 L 580 350" stroke={architectColor} strokeWidth="2" fill="none" strokeDasharray="4 4"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2 }} />

              {/* Node: Clients */}
              <motion.g 
                layoutId="uni-node-clients"
                onMouseEnter={() => handleHover('clients')}
                className="cursor-crosshair"
              >
                <circle cx="120" cy="150" r="40" fill="#1A1A1A" stroke="white" strokeWidth="1" />
                <circle cx="120" cy="250" r="40" fill="#1A1A1A" stroke="white" strokeWidth="1" />
                <circle cx="120" cy="350" r="40" fill="#1A1A1A" stroke="white" strokeWidth="1" />
                <text x="120" y="254" fill="white" fontSize="12" fontFamily="monospace" textAnchor="middle">1000+</text>
              </motion.g>

              {/* Node: Socket.io Cluster */}
              <motion.g 
                layoutId="uni-node-sockets"
                onMouseEnter={() => handleHover('sockets')}
                className="cursor-crosshair"
              >
                <rect x="330" y="210" width="140" height="80" rx="4" fill="#0A0A0A" stroke={architectColor} strokeWidth="2" filter="url(#glow-red)" />
                <text x="400" y="245" fill={architectColor} fontSize="14" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Socket.io</text>
                <text x="400" y="265" fill={architectColor} fontSize="12" fontFamily="monospace" textAnchor="middle">Event Bus</text>
              </motion.g>

              {/* Node: Distributed Nodes */}
              <motion.g 
                layoutId="uni-node-nodes"
                onMouseEnter={() => handleHover('nodes')}
                className="cursor-crosshair"
              >
                <rect x="580" y="120" width="120" height="60" rx="8" fill="#050505" stroke="gray" strokeWidth="1" />
                <rect x="580" y="220" width="120" height="60" rx="8" fill="#050505" stroke="gray" strokeWidth="1" />
                <rect x="580" y="320" width="120" height="60" rx="8" fill="#050505" stroke="gray" strokeWidth="1" />
                <text x="640" y="250" fill="white" fontSize="12" fontFamily="monospace" textAnchor="middle">Node.js Instances</text>
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
              {/* Strategist Network Center Hub Visual */}
              <motion.g layoutId="uni-node-clients">
                <circle cx="200" cy="150" r="30" fill="gray" opacity="0.4" />
                <circle cx="200" cy="350" r="30" fill="gray" opacity="0.4" />
                <circle cx="600" cy="150" r="30" fill="gray" opacity="0.4" />
                <circle cx="600" cy="350" r="30" fill="gray" opacity="0.4" />
              </motion.g>

              {/* Network Spokes */}
              <motion.path d="M 230 180 L 370 220" stroke="white" strokeWidth="1" opacity="0.3" fill="none" />
              <motion.path d="M 230 320 L 370 280" stroke="white" strokeWidth="1" opacity="0.3" fill="none" />
              <motion.path d="M 570 180 L 430 220" stroke="white" strokeWidth="1" opacity="0.3" fill="none" />
              <motion.path d="M 570 320 L 430 280" stroke="white" strokeWidth="1" opacity="0.3" fill="none" />

              <motion.g layoutId="uni-node-sockets">
                <circle cx="400" cy="250" r="60" fill={architectColor} opacity="0.8" />
                <text x="400" y="255" fill="black" fontSize="14" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">Central Hub</text>
              </motion.g>

              <motion.g layoutId="uni-node-nodes">
                <text x="400" y="340" fill="white" fontSize="14" fontFamily="sans-serif" textAnchor="middle">Silos Eliminated</text>
              </motion.g>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}
