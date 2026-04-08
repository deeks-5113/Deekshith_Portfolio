
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLens } from '@/context/LensContext';
import { Terminal } from 'lucide-react';

const narrativeData: Record<string, { architect: string; strategist: string }> = {
  none: {
    architect: ">_ SYSTEM INITIALIZED. Awaiting user scroll sequences to decode context.",
    strategist: "Welcome. Navigate through the timeline to explore my strategic impact and execution frameworks.",
  },
  sakhi: {
    architect: ">_ While building Sakhi, I realized that generic LLMs couldn't handle clinical precision, so I built a hybrid routing engine to solve it.",
    strategist: "Sakhi represents a critical bridge between patient needs and rapid healthcare assistance, scaling expert care safely.",
  },
  navigator: {
    architect: ">_ I designed the Context Teleportation Protocol with heavy reliance on Chrome Storage API relay logic to persist state flawlessly.",
    strategist: "Thread Navigator aligned active LLM usages into a single universal platform, capturing significant daily active adoption.",
  },
  leadership: {
    architect: ">_ Containerized deployments scaling across 4 teams, minimizing build bottlenecks by 40% via optimized CI/CD pipelines.",
    strategist: "I established centralized systems to align engineering velocity with company OKRs, standardizing cross-functional processes.",
  },
  rigor: {
    architect: ">_ 650+ LeetCode problems solved. Deep expertise in Graph traversals, DP optimizations, and System Design.",
    strategist: "A consistent dedication to mastering algorithmic complexities perfectly translates into efficient real-world problem solving.",
  }
};

export function NarrativeSidebar() {
  const { isArchitectMode, activeProject } = useLens();
  const [displayText, setDisplayText] = useState('');

  // Target string based on both the project in view and the current lens
  const currentKey = activeProject.toLowerCase();
  const data = narrativeData[currentKey] ? narrativeData[currentKey] : narrativeData['none'];
  const targetText = isArchitectMode ? data.architect : data.strategist;

  // Typewriter effect logic
  useEffect(() => {
    setDisplayText('');
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayText(targetText.substring(0, i + 1));
      i++;
      if (i >= targetText.length) {
        clearInterval(intervalId);
      }
    }, 20); // typing speed
    
    return () => clearInterval(intervalId);
  }, [targetText]);

  return (
    <div className="w-full relative mt-auto">
      <div className="bg-twin-card/80 border border-twin-border rounded-xl p-5 shadow-lg relative overflow-hidden">
        {/* Glow accent */}
        <div className={`absolute top-0 left-0 w-full h-1 ${isArchitectMode ? 'bg-[#22D3EE]' : 'bg-[#A1A1AA]'}`} />
        
        <div className="flex items-center gap-3 mb-4">
          <Terminal size={18} className={isArchitectMode ? 'text-[#22D3EE]' : 'text-[#A1A1AA]'} />
          <h3 className={`text-xs font-bold tracking-widest uppercase ${isArchitectMode ? 'text-[#22D3EE]' : 'text-[#A1A1AA]'}`}>
            Director's Commentary
          </h3>
        </div>
        
        <div className="min-h-[100px]">
          <p className={`font-mono text-sm leading-relaxed ${isArchitectMode ? 'text-gray-300' : 'text-gray-400 font-sans'}`}>
            {displayText}
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className={`inline-block w-2 h-4 align-middle ml-1 ${isArchitectMode ? 'bg-[#22D3EE]' : 'bg-[#A1A1AA]'}`}
            />
          </p>
        </div>
      </div>
    </div>
  );
}
