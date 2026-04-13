import { ArrowDownRight } from 'lucide-react';

interface SectionContinueCueProps {
  targetId: string;
  chapter: string;
  title: string;
}

export function SectionContinueCue({ targetId, chapter, title }: SectionContinueCueProps) {
  const handleContinue = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="mt-14 flex justify-start">
      <button
        type="button"
        onClick={handleContinue}
        className="group inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-left transition hover:border-white/20 hover:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-white/20"
      >
        <div className="flex flex-col">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
            Continue to {chapter}
          </span>
          <span className="text-sm font-medium text-white">{title}</span>
        </div>
        <ArrowDownRight
          size={16}
          className="text-zinc-500 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-white"
        />
      </button>
    </div>
  );
}
