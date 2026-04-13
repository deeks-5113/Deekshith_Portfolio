import React, { useEffect, useMemo, useState } from 'react';
import { useLens } from '@/context/LensContext';
import { Terminal } from 'lucide-react';
import TextType from './TextType';
import { getAboutCommentary, getBlogCommentary, getHeroCommentary, getProjectCommentary } from '@/data/content';

const sectionLabels: Record<string, string> = {
  hero: 'Opening Hook',
  about: 'About',
  'operating-model': 'Operating Model',
  projects: 'Proof',
  blogs: 'Reflection',
  connect: 'Close',
};

export function NarrativeSidebar() {
  const { activeHoverLog, commentaryProject, isTyping } = useLens();
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const sectionIds = Object.keys(sectionLabels);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;

        setActiveSection(visibleEntries[0].target.id);
      },
      {
        rootMargin: '-20% 0px -45% 0px',
        threshold: [0.2, 0.35, 0.5, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateScrollProgress = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)) : 0;
      setScrollProgress(nextProgress);
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  const targetText = useMemo(() => {
    if (isTyping) {
      return 'Trace paused until the opening statement completes.';
    }

    if (activeHoverLog) {
      return activeHoverLog;
    }

    if (activeSection === 'hero') {
      return getHeroCommentary();
    }

    if (activeSection === 'about') {
      return getAboutCommentary();
    }

    if (activeSection === 'operating-model') {
      return 'This section audits the engineering standards behind the portfolio. Hover a pillar to inspect the condition, response, and why the output reads more senior than the timeline suggests.';
    }

    if (activeSection === 'projects') {
      return getProjectCommentary(commentaryProject);
    }

    if (activeSection === 'blogs') {
      return getBlogCommentary();
    }

    return getHeroCommentary();
  }, [activeHoverLog, activeSection, commentaryProject, isTyping]);

  const activeLabel = sectionLabels[activeSection] ?? sectionLabels.hero;
  const narrativeIntegrity = Math.max(8, Math.round(scrollProgress));

  return (
    <div className="relative flex w-full flex-col gap-5">
      <div className="rounded-[1.45rem] border border-white/8 bg-black/25 p-4">
        <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
          <span>Narrative Integrity</span>
          <span>{narrativeIntegrity}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#22D3EE,#67E8F9)] transition-[width] duration-300"
            style={{ width: `${narrativeIntegrity}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-zinc-400">
          <span>Scroll Sync {Math.round(scrollProgress)}%</span>
          <span>{activeLabel}</span>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[1.45rem] border border-twin-border bg-twin-card/80 p-5 shadow-lg">
        <div className="absolute top-0 left-0 h-1 w-full bg-[#22D3EE]" />

        <div className="flex items-center gap-3 mb-4">
          <Terminal size={18} className="text-[#22D3EE]" />
          <h3 className="text-xs font-bold tracking-widest uppercase text-[#22D3EE]">
            Director's Commentary
          </h3>
        </div>

        <div>
          <TextType
            key={`${activeSection}-${commentaryProject}-${targetText}`}
            text={targetText}
            as="p"
            className="font-mono text-sm leading-[1.9] text-gray-300"
            typingSpeed={16}
            pauseDuration={0}
            loop={false}
            showCursor
            cursorCharacter="_"
            cursorClassName="text-[#22D3EE]"
          />
        </div>
      </div>
    </div>
  );
}
