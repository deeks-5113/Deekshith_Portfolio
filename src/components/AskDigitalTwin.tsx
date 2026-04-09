
import React, { useState } from 'react';
import resumeData from '@/data/resume.json';
import { Search } from 'lucide-react';
import { useLens } from '@/context/LensContext';

export function AskDigitalTwin() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const { isArchitectMode, setActiveProject, isTyping } = useLens();

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
      output = isArchitectMode 
        ? `[Skill Detected]: Present in tech stack graph. Proficiency active.`
        : `Yes, I have extensive experience with that technology, utilizing it to drive high-value outcomes.`;
    } else if (matchesExp) {
      output = isArchitectMode
        ? `[Log: ${matchesExp.project}]: ${matchesExp.description}`
        : `During my time at ${matchesExp.company}, I worked on ${matchesExp.project}. ${matchesExp.description}`;
    } else {
      output = isArchitectMode
        ? `[404]: Context not found in current embedding space.`
        : `I don't have that specific information in my digital memory vault. Connect with me directly to learn more!`;
    }

    setResult(output);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 xl:pl-48 mb-32 relative z-10">
      <div className={`backdrop-blur-md p-6 rounded-2xl w-full transition-all duration-500 ${isArchitectMode ? 'bg-[#050505]/80 border border-[#22D3EE]/30 shadow-[0_0_25px_rgba(34,211,238,0.05)]' : 'bg-twin-card/50 border border-twin-border'}`}>
        <h3 className="text-xl font-bold mb-4">Ask my Digital Twin</h3>
        <form onSubmit={handleSearch} className="relative flex items-center mb-4">
          <Search className="absolute left-4 text-gray-400" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="E.g., 'What did you build for Sakhi?' or 'React'"
            className={`w-full bg-transparent border rounded-xl py-3 pl-12 pr-4 text-[#ededed] focus:outline-none transition-colors ${
              isArchitectMode ? 'border-[#22D3EE]/30 focus:border-[#22D3EE]' : 'border-twin-border focus:border-twin-accent'
            }`}
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
            <p className={`${isArchitectMode ? 'font-mono text-[#22D3EE] text-sm' : 'font-sans text-[#A1A1AA]'} leading-relaxed`}>
              {isArchitectMode ? '>_ ' : ''}{result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
