import { useEffect, useState, type CSSProperties } from 'react';
import { useLens } from '@/context/LensContext';
import { SectionContinueCue } from './SectionContinueCue';
import { getAboutCommentary, getAboutSkillCommentary } from '@/data/content';
import { useSiteContent } from '@/data/siteContent';

type SkillNode = {
  label: string;
  icon: string;
};

export function AboutSection() {
  const { isTyping, setActiveHoverLog } = useLens();
  const { siteContent } = useSiteContent();
  const { about } = siteContent;
  const orbitSkills: SkillNode[] = siteContent.about.skills;
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const lockedSkill = selectedSkill !== null;

  useEffect(() => {
    if (!selectedSkill) return;

    const timeoutId = window.setTimeout(() => {
      setSelectedSkill(null);
      setActiveHoverLog(getAboutCommentary());
    }, 60000);

    return () => window.clearTimeout(timeoutId);
  }, [selectedSkill, setActiveHoverLog]);

  if (isTyping) return null;

  const orbitRadius = 168;

  return (
    <section
      id="about"
      className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 md:px-8 lg:pl-16"
      onMouseEnter={() => {
        if (lockedSkill) return;
        setActiveHoverLog(getAboutCommentary());
      }}
      onMouseLeave={() => setActiveHoverLog(selectedSkill ? getAboutSkillCommentary(selectedSkill) : null)}
    >
      <div className="grid items-center gap-16 overflow-visible rounded-[2rem] border border-white/8 bg-black/75 px-6 py-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-sm md:px-10 md:py-12 xl:grid-cols-2">
        <div className="relative">
          <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-[#A855F7]/12 blur-3xl" aria-hidden="true" />
          <p className="relative font-mono text-xs uppercase tracking-[0.38em] text-[#A855F7]">{about.eyebrow}</p>
          <h2
            className="relative mt-5 max-w-xl text-3xl font-semibold leading-tight text-white md:text-4xl"
            onMouseEnter={() => {
              if (lockedSkill) return;
              setActiveHoverLog(getAboutCommentary('headline'));
            }}
          >
            {about.title}
          </h2>
          <p className="relative mt-3 inline-block origin-left font-mono text-[11px] uppercase tracking-[0.24em] text-[#C084FC] skill-cta-pulse">
            {about.skillPrompt}
          </p>

          <div
            className="relative mt-7 max-w-xl space-y-4 text-sm leading-7 text-zinc-400 md:text-base"
            onMouseEnter={() => {
              if (lockedSkill) return;
              setActiveHoverLog(getAboutCommentary('summary'));
            }}
          >
            {about.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <p className="relative mt-7 text-base font-medium text-[#C084FC] md:text-lg">{about.closing}</p>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute h-64 w-64 rounded-full bg-[#A855F7]/10 blur-3xl md:h-80 md:w-80" aria-hidden="true" />

          <div className="relative h-[22rem] w-[22rem] md:h-[28rem] md:w-[28rem]">
            <div className="absolute inset-[14%] rounded-full border border-white/8" aria-hidden="true" />
            <div className="absolute inset-[4%] rounded-full border border-dashed border-[#A855F7]/20" aria-hidden="true" />

            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
              <div
                className="pointer-events-auto flex h-28 w-28 items-center justify-center rounded-full border border-[#C084FC]/40 bg-[#7E22CE] px-4 text-center text-sm font-semibold text-white shadow-[0_0_40px_rgba(168,85,247,0.35)] motion-reduce:animate-none center-signal md:h-32 md:w-32 md:text-base"
                onMouseEnter={() => {
                  if (lockedSkill) return;
                  setActiveHoverLog(getAboutCommentary('center'));
                }}
              >
                <span className="max-w-[4.5rem] leading-tight md:max-w-[5rem]">{about.centerLabel}</span>
              </div>
            </div>

            <div className="group absolute inset-0 motion-reduce:animate-none orbit-rotate">
              {orbitSkills.map((skill, index) => {
                const angle = (index / orbitSkills.length) * Math.PI * 2 - Math.PI / 2;
                const x = Math.cos(angle) * orbitRadius;
                const y = Math.sin(angle) * orbitRadius;
                const isActive = selectedSkill === skill.label;
                const isHovered = hoveredSkill === skill.label;
                const skillPositionStyle = {
                  left: '50%',
                  top: '50%',
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                } satisfies CSSProperties;

                return (
                  <div key={skill.label} className="absolute z-30" style={skillPositionStyle}>
                    <div className="relative motion-reduce:animate-none orbit-counter-rotate">
                      <button
                        type="button"
                        aria-label={skill.label}
                        aria-pressed={isActive}
                        onMouseEnter={() => {
                          setHoveredSkill(skill.label);
                          if (lockedSkill) return;
                          setActiveHoverLog(getAboutSkillCommentary(skill.label));
                        }}
                        onMouseLeave={() => {
                          setHoveredSkill(null);
                          setActiveHoverLog(selectedSkill ? getAboutSkillCommentary(selectedSkill) : getAboutCommentary());
                        }}
                        onClick={() => {
                          const nextSkill = isActive ? null : skill.label;
                          setSelectedSkill(nextSkill);
                          setActiveHoverLog(nextSkill ? getAboutSkillCommentary(nextSkill) : getAboutCommentary());
                        }}
                        onFocus={() => {
                          setHoveredSkill(skill.label);
                          if (lockedSkill) return;
                          setActiveHoverLog(getAboutSkillCommentary(skill.label));
                        }}
                        onBlur={() => {
                          setHoveredSkill(null);
                          setActiveHoverLog(selectedSkill ? getAboutSkillCommentary(selectedSkill) : getAboutCommentary());
                        }}
                        className={`relative flex h-[2.8rem] w-[2.8rem] cursor-pointer items-center justify-center rounded-full border bg-[#090909] transition duration-300 motion-reduce:animate-none focus:outline-none md:h-[3.2rem] md:w-[3.2rem] ${
                          isActive
                            ? 'scale-[1.4] border-[#C084FC]/80 bg-[radial-gradient(circle_at_top,_rgba(192,132,252,0.2),_rgba(9,9,9,0.98)_68%)] shadow-[0_0_28px_rgba(168,85,247,0.65),0_0_56px_rgba(126,34,206,0.32)]'
                            : isHovered
                              ? 'scale-[1.12] border-[#C084FC]/60 bg-[radial-gradient(circle_at_top,_rgba(192,132,252,0.12),_rgba(9,9,9,0.98)_68%)] shadow-[0_0_18px_rgba(168,85,247,0.35)]'
                              : 'border-white/10'
                        }`}
                      >
                        <img
                          src={skill.icon}
                          alt={skill.label}
                          loading="lazy"
                          className="h-5 w-5 object-contain md:h-6 md:w-6"
                        />
                      </button>

                      <div
                        className={`pointer-events-none absolute left-1/2 top-full z-40 mt-5 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/95 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-100 shadow-[0_0_24px_rgba(0,0,0,0.45)] transition duration-200 ${
                          isActive ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
                        }`}
                      >
                        {skill.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <SectionContinueCue targetId="operating-model" chapter="Chapter 03" title="The engineering standard" />
    </section>
  );
}
