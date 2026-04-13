
import React, { useState } from 'react';
import resumeData from '@/data/resume.json';
import { Search } from 'lucide-react';
import { useLens } from '@/context/LensContext';

export function AskDigitalTwin() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const { setActiveProject, isTyping } = useLens();

  if (isTyping) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setActiveProject('none'); // Reset aura when searching
    const lowerQuery = query.toLowerCase();
    
    // Very basic front-end simulation of matching keywords
    const matchesSkills = resumeData.skills.some(skill => skill.toLowerCase().includes(lowerQuery));
    const matchesExp = resumeData.experience.find(exp => 
      exp.company.toLowerCase().includes(lowerQuery) || 
      exp.project.toLowerCase().includes(lowerQuery) ||
      exp.description.toLowerCase().includes(lowerQuery)
    );

    let output = '';
    
    if (matchesSkills) {
      output = `[Skill Detected]: Present in tech stack graph. Proficiency active.`;
    } else if (matchesExp) {
      output = `[Log: ${matchesExp.project}]: ${matchesExp.description}`;
    } else {
      output = `[404]: Context not found in current embedding space.`;
    }

    setResult(output);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 xl:pl-48 mb-32 relative z-10">
      <div className="w-full rounded-2xl border border-[#22D3EE]/30 bg-[#050505]/80 p-6 backdrop-blur-md transition-all duration-500 shadow-[0_0_25px_rgba(34,211,238,0.05)]">
        <h3 className="text-xl font-bold mb-4">Ask my Digital Twin</h3>
        <form onSubmit={handleSearch} className="relative flex items-center mb-4">
          <Search className="absolute left-4 text-gray-400" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="E.g., 'What did you build for Sakhi?' or 'React'"
            className="w-full rounded-xl border border-[#22D3EE]/30 bg-transparent py-3 pl-12 pr-4 text-[#ededed] transition-colors focus:border-[#22D3EE] focus:outline-none"
          />
          <button 
            type="submit" 
            className="absolute right-2 px-4 py-1.5 bg-twin-accent hover:bg-blue-400 text-white font-semibold rounded-lg text-sm transition-colors"
          >
            Query
          </button>
        </form>
        
        {result && (
          <div className="mt-4 p-4 rounded-xl bg-twin-bg border border-twin-border">
            <p className="font-mono text-sm leading-relaxed text-[#22D3EE]">
              {'>_ '}{result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
