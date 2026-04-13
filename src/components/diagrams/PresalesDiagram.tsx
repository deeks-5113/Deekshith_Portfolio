import React from 'react';
import { motion } from 'framer-motion';
import { useLens } from '@/context/LensContext';
import { architectureData } from '@/data/architectureMapping';

export function PresalesDiagram() {
  const { setActiveHoverLog } = useLens();
  const data = architectureData['presales'];

  const architectColor = "#F59E0B"; // aura-gold
  const handleHover = (nodeId: string | null) => {
    if (!nodeId) {
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
          <filter id="glow-gold" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <motion.g
          key="architect-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
              {/* Path: PG -> UI */}
              <motion.path
                d="M 300 150 L 400 150 L 400 210"
                stroke={architectColor}
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
              {/* Path: Vector -> UI */}
              <motion.path
                d="M 300 350 L 400 350 L 400 290"
                stroke={architectColor}
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              />

              {/* Node: PostgreSQL */}
              <motion.g 
                layoutId="ps-node-pg"
                onMouseEnter={() => handleHover('pg')}
                className="cursor-crosshair"
              >
                <path d="M 140 110 C 140 110, 260 110, 280 110 C 300 110, 300 190, 280 190 C 260 190, 140 190, 140 190 C 120 190, 120 110, 140 110 Z" fill="#1A1A1A" stroke="white" strokeWidth="1" />
                <rect x="140" y="110" width="140" height="80" fill="transparent" />
                <text x="210" y="145" fill="white" fontSize="14" fontFamily="monospace" textAnchor="middle">PostgreSQL</text>
                <text x="210" y="165" fill="gray" fontSize="10" fontFamily="monospace" textAnchor="middle">Relational ACID</text>
              </motion.g>

              {/* Node: VectorDB */}
              <motion.g 
                layoutId="ps-node-vector"
                onMouseEnter={() => handleHover('vector')}
                className="cursor-crosshair"
              >
                <path d="M 140 310 C 140 310, 260 310, 280 310 C 300 310, 300 390, 280 390 C 260 390, 140 390, 140 390 C 120 390, 120 310, 140 310 Z" fill="#1A1A1A" stroke="white" strokeWidth="1" />
                <rect x="140" y="310" width="140" height="80" fill="transparent" />
                <text x="210" y="345" fill="white" fontSize="14" fontFamily="monospace" textAnchor="middle">VectorDB</text>
                <text x="210" y="365" fill="gray" fontSize="10" fontFamily="monospace" textAnchor="middle">Semantic RAG</text>
              </motion.g>

              {/* Node: GenUI */}
              <motion.g 
                layoutId="ps-node-ui"
                onMouseEnter={() => handleHover('ui')}
                className="cursor-crosshair"
              >
                <rect x="330" y="210" width="140" height="80" rx="4" fill="#0A0A0A" stroke={architectColor} strokeWidth="2" filter="url(#glow-gold)" />
                <text x="400" y="245" fill={architectColor} fontSize="14" fontFamily="monospace" textAnchor="middle" fontWeight="bold">React GenUI</text>
                <text x="400" y="265" fill={architectColor} fontSize="12" fontFamily="monospace" textAnchor="middle">Dual-Schema Merge</text>
              </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}
