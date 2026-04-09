import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CircleCheckBig } from 'lucide-react';
import { useLens } from '@/context/LensContext';

interface LensContent {
  headline: string;
  metrics: string;
  description: string;
}

export interface ProjectCardData {
  id: string;
  commentaryKey: string;
  title: string;
  domainAura: string;
  tags: string[];
  strategistLens: LensContent;
  architectLens: LensContent;
  architectPanelItems?: string[];
  commentaryLogs?: Record<string, string>;
}

interface ProjectCardProps {
  data: ProjectCardData;
  itemClassName?: string;
}

const auraColors: Record<string, { border: string; glow: string; accent: string }> = {
  'aura-logic': { border: 'rgba(99,102,241,0.42)', glow: 'rgba(99,102,241,0.14)', accent: '#6366F1' },
  'aura-medical': { border: 'rgba(34,211,238,0.42)', glow: 'rgba(34,211,238,0.14)', accent: '#22D3EE' },
  'aura-gold': { border: 'rgba(245,158,11,0.42)', glow: 'rgba(245,158,11,0.14)', accent: '#F59E0B' },
  'aura-rigor': { border: 'rgba(239,68,68,0.42)', glow: 'rgba(239,68,68,0.14)', accent: '#EF4444' },
};

const outsideProjectCommentary =
  "Most portfolios show the 'what.' I want to show the 'why.' Hover over a project to hear the director's commentary on the architectural pivots and engineering decisions that matter.";

export function ProjectCard({
  data,
  itemClassName = '',
}: ProjectCardProps) {
  const {
    isArchitectMode,
    setActiveHoverLog,
    setActiveProject,
    setCommentaryProject,
  } = useLens();
  const cardRef = useRef<HTMLDivElement>(null);

  const lensData = isArchitectMode ? data.architectLens : data.strategistLens;
  const aura = auraColors[data.domainAura] ?? auraColors['aura-logic'];
  const eyebrow = `${data.domainAura.replace('aura-', '').toUpperCase()} SYSTEM`;
  const panelTitle = isArchitectMode ? 'ARCHITECTURE SIGNALS' : 'KEY HIGHLIGHTS';
  const panelItems = isArchitectMode
    ? data.architectPanelItems ?? [...data.tags.slice(0, 2), lensData.metrics, 'Deterministic execution path']
    : [...data.tags.slice(0, 2), lensData.metrics, 'Outcome-led delivery'];

  useEffect(() => {
    const node = cardRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveProject(data.commentaryKey);
          setCommentaryProject(data.commentaryKey);
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [data.commentaryKey, setActiveProject, setCommentaryProject]);

  useEffect(() => {
    setActiveHoverLog(null);
  }, [isArchitectMode, data.commentaryKey, setActiveHoverLog]);

  const handlePanelItemEnter = (item: string) => {
    if (!isArchitectMode) return;
    setActiveHoverLog(data.commentaryLogs?.[item] ?? null);
  };

  const handleCardEnter = () => {
    if (!isArchitectMode) return;
    setActiveHoverLog(data.commentaryLogs?.overall ?? null);
  };

  const handlePanelItemLeave = () => {
    if (!isArchitectMode) return;
    setActiveHoverLog(data.commentaryLogs?.overall ?? null);
  };

  const handleCardLeave = () => {
    setActiveHoverLog(outsideProjectCommentary);
  };

  return (
    <div
      ref={cardRef}
      id={data.id}
      onMouseEnter={handleCardEnter}
      onMouseLeave={handleCardLeave}
      className={`relative min-h-[68vh] w-[93%] max-w-[76rem] overflow-hidden rounded-[1.75rem] border bg-[#171717]/97 ${itemClassName}`.trim()}
      style={{
        borderColor: aura.border,
        boxShadow: `0 48px 90px -45px rgba(0,0,0,0.9), 0 0 60px -12px ${aura.glow}, 0 -2px 0 0 ${aura.border}`,
      }}
    >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.05),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.015),rgba(0,0,0,0))]" />
        <div
          className="absolute top-0 left-0 h-[2px] w-full"
          style={{ background: `linear-gradient(90deg, transparent, ${aura.accent}, transparent)` }}
        />

        <div className="relative grid min-h-[68vh] grid-cols-1 gap-7 p-6 md:p-7 xl:grid-cols-[1.05fr_0.95fr] xl:gap-8 xl:p-8">
          <div className="flex flex-col justify-center pt-3 md:pt-4">
            <span
              className="mb-4 inline-flex w-fit rounded-full border px-3.5 py-2 text-[10px] font-bold tracking-[0.14em]"
              style={{
                color: aura.accent,
                borderColor: `${aura.accent}33`,
                backgroundColor: `${aura.accent}12`,
              }}
            >
              {eyebrow}
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={isArchitectMode ? `arch-${data.id}` : `strat-${data.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-8"
              >
                <div className="space-y-2.5">
                  <h3 className="max-w-[12ch] text-[2rem] font-bold tracking-tight text-white md:text-[2.3rem] xl:text-[2.8rem]">
                    {data.title}
                  </h3>
                  <p
                    className={`max-w-lg text-[13px] leading-relaxed md:text-[14px] xl:text-[15px] ${
                      isArchitectMode ? 'font-mono text-gray-400' : 'text-[#9FA9BF]'
                    }`}
                  >
                    {lensData.description}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div
                    className="inline-flex w-fit min-w-40 items-center justify-between gap-3 rounded-full px-4 py-2 text-[10px] font-bold text-black md:text-[11px]"
                    style={{ backgroundColor: aura.accent }}
                  >
                    <span>{isArchitectMode ? 'VIEW SYSTEM' : 'VIEW FEATURES'}</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white">
                      <ArrowRight size={14} />
                    </span>
                  </div>

                  <div className="rounded-full border border-white/8 bg-black/40 px-3.5 py-2 text-[10px] font-mono text-gray-400 md:text-[11px]">
                    {lensData.metrics}
                  </div>
                </div>

                <div>
                  <h4
                    className="mb-2 text-[10px] font-bold tracking-[0.14em] md:text-[11px]"
                    style={{ color: `${aura.accent}CC` }}
                  >
                    {lensData.headline}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/8 bg-black/40 px-2.5 py-1.5 text-[9px] font-mono tracking-[0.1em] text-gray-300 md:text-[10px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative flex items-center xl:justify-end">
            <div className="absolute inset-3 rounded-[1.75rem] border border-white/5 bg-white/[0.03]" />
            <div className="relative w-full rounded-[1.75rem] border border-white/6 bg-white/[0.04] p-4 md:p-5 xl:min-h-[27rem] xl:max-w-[30rem]">
              <div className="mb-5">
                <h4 className="text-sm font-bold tracking-[0.12em] text-[#6F82A8] md:text-[15px]">
                  {panelTitle}
                </h4>
              </div>

              <div className="space-y-3.5">
                {panelItems.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onMouseEnter={() => handlePanelItemEnter(item)}
                    onMouseLeave={handlePanelItemLeave}
                    onFocus={() => handlePanelItemEnter(item)}
                    onBlur={handlePanelItemLeave}
                    className="flex w-full items-center gap-3 rounded-[1.2rem] bg-[#0a0a0a] px-4 py-3.5 text-left shadow-[0_14px_34px_-24px_rgba(0,0,0,0.9)] transition-colors duration-200 hover:bg-[#101010] focus:outline-none focus:ring-1 focus:ring-white/20"
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${aura.accent}14`, color: aura.accent }}
                    >
                      <CircleCheckBig size={16} />
                    </div>
                    <p className="text-xs font-semibold text-white md:text-sm">{item}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
