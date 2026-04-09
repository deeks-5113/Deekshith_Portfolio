/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type DeepDiveDirection = 'enter' | 'exit' | null;

interface DeepDiveContextValue {
  currentProjectId: string | null;
  isInDeepDive: boolean;
  transitionDirection: DeepDiveDirection;
  enterDeepDive: (projectId: string) => void;
  exitDeepDive: () => void;
}

const DeepDiveContext = createContext<DeepDiveContextValue | undefined>(undefined);

export function DeepDiveProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [transitionDirection, setTransitionDirection] = useState<DeepDiveDirection>(null);
  const routeProjectId = location.pathname.startsWith('/projects/')
    ? location.pathname.split('/')[2] ?? null
    : null;
  const isInDeepDive = routeProjectId !== null;

  const enterDeepDive = useCallback((projectId: string) => {
    void projectId;
    setTransitionDirection('enter');
  }, []);

  const exitDeepDive = useCallback(() => {
    setTransitionDirection('exit');
  }, []);

  const value = useMemo(
    () => ({
      currentProjectId: routeProjectId,
      isInDeepDive,
      transitionDirection,
      enterDeepDive,
      exitDeepDive,
    }),
    [enterDeepDive, exitDeepDive, isInDeepDive, routeProjectId, transitionDirection]
  );

  return <DeepDiveContext.Provider value={value}>{children}</DeepDiveContext.Provider>;
}

export function useDeepDive() {
  const context = useContext(DeepDiveContext);

  if (!context) {
    throw new Error('useDeepDive must be used within a DeepDiveProvider');
  }

  return context;
}
