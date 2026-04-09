
import React, { createContext, useContext, useState, ReactNode } from 'react';

type LensContextType = {
  isArchitectMode: boolean;
  setIsArchitectMode: (mode: boolean) => void;
  activeProject: string;
  setActiveProject: (project: string) => void;
  activeHoverLog: string | null;
  setActiveHoverLog: (log: string | null) => void;
  commentaryProject: string;
  setCommentaryProject: (project: string) => void;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
};

const LensContext = createContext<LensContextType | undefined>(undefined);

export function LensProvider({ children }: { children: ReactNode }) {
  const [isArchitectMode, setIsArchitectMode] = useState(true); // Default to Architect
  const [activeProject, setActiveProject] = useState('sakhi'); // Default to Sakhi for the gallery
  const [activeHoverLog, setActiveHoverLog] = useState<string | null>(null);
  const [commentaryProject, setCommentaryProject] = useState('none');
  const [isTyping, setIsTyping] = useState(true); // Start with typing true

  return (
    <LensContext.Provider value={{ isArchitectMode, setIsArchitectMode, activeProject, setActiveProject, activeHoverLog, setActiveHoverLog, commentaryProject, setCommentaryProject, isTyping, setIsTyping }}>
      {children}
    </LensContext.Provider>
  );
}

export function useLens() {
  const context = useContext(LensContext);
  if (context === undefined) {
    throw new Error('useLens must be used within a LensProvider');
  }
  return context;
}
