import { useState, type CSSProperties } from 'react';
import { useLens } from '@/context/LensContext';

type SkillNode = {
  label: string;
  icon: string;
};

const orbitSkills: SkillNode[] = [
  { label: 'OpenAI', icon: 'https://cdn.simpleicons.org/openai/FFFFFF' },
  { label: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' },
  { label: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E' },
  { label: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { label: 'n8n', icon: 'https://cdn.simpleicons.org/n8n/EA4B71' },
  { label: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { label: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' },
  { label: 'Supabase', icon: 'https://cdn.simpleicons.org/supabase/3ECF8E' },
  { label: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
  { label: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' },
  { label: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032' },
  { label: 'Chrome', icon: 'https://cdn.simpleicons.org/googlechrome/4285F4' },
];

export function AboutSection() {
  const { isTyping } = useLens();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  if (isTyping) return null;

  const orbitRadius = 168;

  return (
    <section
      id="about"
      className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 md:px-8 lg:pl-16"
    >
      <div
        className="grid items-center gap-16 overflow-hidden rounded-[2rem] border border-white/8 bg-black/75 px-6 py-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-sm md:px-10 md:py-12 xl:grid-cols-2"
      >
        <div className="relative">
          <div className="absolute left-0 top-0 h-32 w-32 rounded-full bg-[#A855F7]/12 blur-3xl" aria-hidden="true" />
          <p className="relative font-mono text-xs uppercase tracking-[0.38em] text-[#A855F7]">About</p>
          <h2 className="relative mt-5 max-w-xl text-3xl font-semibold leading-tight text-white md:text-4xl">
            Turning AI into execution engines
          </h2>

          <div className="relative mt-7 max-w-xl space-y-4 text-sm leading-7 text-zinc-400 md:text-base">
            <p>
              I build agentic AI systems that plan, act, reflect, and coordinate tools instead of stopping at raw output.
            </p>
            <p>
              My focus is context management, routing the right information at the right time so models stay usable inside real workflows.
            </p>
            <p>
              That shows up as automation layers, browser tooling, and execution systems built to operate beyond the prompt box.
            </p>
          </div>

          <p className="relative mt-7 text-base font-medium text-[#C084FC] md:text-lg">
            I don&apos;t just use tools. I design how they work together.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute h-64 w-64 rounded-full bg-[#A855F7]/10 blur-3xl md:h-80 md:w-80" aria-hidden="true" />

          <div className="relative h-[22rem] w-[22rem] md:h-[28rem] md:w-[28rem]">
            <div className="absolute inset-[14%] rounded-full border border-white/8" aria-hidden="true" />
            <div className="absolute inset-[4%] rounded-full border border-dashed border-[#A855F7]/20" aria-hidden="true" />

            <div className="absolute left-1/2 top-1/2 z-20 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#C084FC]/40 bg-[#7E22CE] text-center text-base font-semibold text-white shadow-[0_0_40px_rgba(168,85,247,0.35)] md:h-40 md:w-40 md:text-lg">
              Agentic AI
            </div>

            <div className="group absolute inset-0 motion-reduce:animate-none orbit-rotate">
              {orbitSkills.map((skill, index) => {
                const angle = (index / orbitSkills.length) * Math.PI * 2 - Math.PI / 2;
                const x = Math.cos(angle) * orbitRadius;
                const y = Math.sin(angle) * orbitRadius;
                const isActive = hoveredSkill === skill.label;
                const skillPositionStyle = {
                  left: '50%',
                  top: '50%',
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                } satisfies CSSProperties;

                return (
                  <div key={skill.label} className="absolute" style={skillPositionStyle}>
                    <div className="relative orbit-counter-rotate motion-reduce:animate-none group-hover:[animation-play-state:paused]">
                      <button
                        type="button"
                        aria-label={skill.label}
                        onMouseEnter={() => setHoveredSkill(skill.label)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        onFocus={() => setHoveredSkill(skill.label)}
                        onBlur={() => setHoveredSkill(null)}
                        className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-[#090909] transition duration-300 hover:scale-110 hover:border-[#C084FC]/55 hover:shadow-[0_0_22px_rgba(168,85,247,0.5)] focus:scale-110 focus:border-[#C084FC]/55 focus:shadow-[0_0_22px_rgba(168,85,247,0.5)] focus:outline-none md:h-16 md:w-16"
                      >
                        <img
                          src={skill.icon}
                          alt={skill.label}
                          loading="lazy"
                          className="h-6 w-6 object-contain md:h-7 md:w-7"
                        />
                      </button>

                      <div
                        className={`pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 rounded-full border border-white/10 bg-black/95 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.16em] text-zinc-200 transition duration-200 ${
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
    </section>
  );
}
