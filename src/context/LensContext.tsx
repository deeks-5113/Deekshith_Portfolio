
import React, { createContext, useContext, useState, ReactNode } from 'react';

type LensContextType = {
  isArchitectMode: boolean;
  setIsArchitectMode: (mode: boolean) => void;
  activeProject: string;
  setActiveProject: (project: string) => void;
};

const LensContext = createContext<LensContextType | undefined>(undefined);

export function LensProvider({ children }: { children: ReactNode }) {
  const [isArchitectMode, setIsArchitectMode] = useState(true); // Default to Architect
  const [activeProject, setActiveProject] = useState('none');

  return (
    <LensContext.Provider value={{ isArchitectMode, setIsArchitectMode, activeProject, setActiveProject }}>
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
