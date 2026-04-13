import React from 'react';
import { motion } from 'framer-motion';
import { useLens } from '@/context/LensContext';
import { architectureData } from '@/data/architectureMapping';

export function SakhiDiagram() {
  const { setActiveHoverLog } = useLens();
  const data = architectureData['sakhi'];

  const architectColor = "#22D3EE";

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
        {/* SVG Defs for glowing effects and markers */}
        <defs>
          <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
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
              {/* Circuit Board Lines (Strict 90 Degree Routes) */}
              <motion.path
                d="M 120 250 L 250 250"
                stroke={architectColor}
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1 }}
              />
              <motion.path
                d="M 350 250 L 450 250 L 450 150 L 520 150"
                stroke={architectColor}
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />
              <motion.path
                d="M 350 250 L 450 250 L 450 350 L 520 350"
                stroke="#6366F1"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
              />

              {/* Node 1: User Query */}
              <motion.g 
                layoutId="node-query"
                onMouseEnter={() => handleHover('query')}
                className="cursor-crosshair"
              >
                <rect x="20" y="220" width="100" height="60" rx="8" fill="#1A1A1A" stroke="white" strokeWidth="1" />
                <text x="70" y="255" fill="white" fontSize="14" fontFamily="monospace" textAnchor="middle">User Query</text>
              </motion.g>

              {/* Node 2: Zero-Trust Gate */}
              <motion.g 
                layoutId="node-gate"
                onMouseEnter={() => handleHover('gate')}
                className="cursor-crosshair"
              >
                <rect x="250" y="210" width="140" height="80" rx="4" fill="#0A0A0A" stroke={architectColor} strokeWidth="2" filter="url(#glow-cyan)" />
                <text x="320" y="245" fill={architectColor} fontSize="14" fontFamily="monospace" textAnchor="middle" fontWeight="bold">Zero-Trust</text>
                <text x="320" y="265" fill={architectColor} fontSize="12" fontFamily="monospace" textAnchor="middle">Auditor Gate</text>
              </motion.g>

              {/* Node 3: Local SLM */}
              <motion.g 
                layoutId="node-slm"
                onMouseEnter={() => handleHover('slm')}
                className="cursor-crosshair"
              >
                <rect x="520" y="110" width="180" height="80" rx="8" fill="#050505" stroke={architectColor} strokeWidth="1.5" />
                <text x="610" y="145" fill="white" fontSize="14" fontFamily="monospace" textAnchor="middle">Local SLM</text>
                <text x="610" y="165" fill={architectColor} fontSize="10" fontFamily="monospace" textAnchor="middle">Confidence {'>'} 90%</text>
                <text x="610" y="180" fill="gray" fontSize="10" fontFamily="monospace" textAnchor="middle">PHI Safe</text>
              </motion.g>

              {/* Node 4: GPT-4 API */}
              <motion.g 
                layoutId="node-api"
                onMouseEnter={() => handleHover('api')}
                className="cursor-crosshair"
              >
                <rect x="520" y="310" width="180" height="80" rx="8" fill="#050505" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="610" y="345" fill="white" fontSize="14" fontFamily="monospace" textAnchor="middle">GPT-4 API</text>
                <text x="610" y="365" fill="#6366F1" fontSize="10" fontFamily="monospace" textAnchor="middle">Confidence {'<'} 90%</text>
                <text x="610" y="380" fill="gray" fontSize="10" fontFamily="monospace" textAnchor="middle">Scrubbed PII</text>
              </motion.g>
        </motion.g>
      </svg>
    </div>
  );
}
