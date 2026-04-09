
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLens } from '@/context/LensContext';
import { Terminal } from 'lucide-react';
import { architectureData } from '@/data/architectureMapping';

const narrativeData: Record<string, { architect: string; strategist: string }> = {
  none: {
    architect: ">_ SYSTEM INITIALIZED. Awaiting user scroll sequences to decode context.",
    strategist: "Welcome. Navigate through the timeline to explore my strategic impact and execution frameworks.",
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
  const { isArchitectMode, activeHoverLog, commentaryProject, isTyping } = useLens();
  const [displayText, setDisplayText] = useState('');

  // Target string based on hover state, commentary project, and lens
  const currentKey = commentaryProject.toLowerCase();
  
  let targetText = "";
  if (isArchitectMode) {
    if (isTyping || commentaryProject === 'none') {
      targetText = 'Hello ! , I am Deekshith here';
    } else if (activeHoverLog) {
      targetText = activeHoverLog;
    } else {
      targetText = architectureData[currentKey]?.commentaryLogs.default || narrativeData[currentKey]?.architect || narrativeData['none'].architect;
    }
  } else {
    if (isTyping || commentaryProject === 'none') {
      targetText = 'Hello ! , I am Deekshith here';
    } else {
      targetText = architectureData[currentKey]?.strategistLens.strategistLog || narrativeData[currentKey]?.strategist || narrativeData['none'].strategist;
    }
  }

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
