import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, TerminalSquare } from 'lucide-react';
import { useLens } from '@/context/LensContext';
import { SectionContinueCue } from './SectionContinueCue';
import { getOperatingModelContent, type SeniorityPillar } from '@/data/seniorityPillars';
import { useSiteContent, useSiteVariant } from '@/data/siteContent';

const VERIFICATION_DELAY_MS = 5000;

export function OperatingModelSection() {
  const { isTyping, setActiveHoverLog } = useLens();
  const { siteContent } = useSiteContent();
  const siteVariant = useSiteVariant();
  const operatingModel = getOperatingModelContent(siteVariant);
  const [activePillarId, setActivePillarId] = useState(operatingModel.pillars[0]?.id ?? '');
  const [verifiedPillars, setVerifiedPillars] = useState<Record<string, boolean>>({});
  const verificationTimerRef = useRef<number | null>(null);

  const activePillar =
    operatingModel.pillars.find((pillar) => pillar.id === activePillarId) ?? operatingModel.pillars[0];

  useEffect(() => {
    setActivePillarId(operatingModel.pillars[0]?.id ?? '');
    setVerifiedPillars({});
  }, [operatingModel]);

  useEffect(() => {
    return () => {
      if (verificationTimerRef.current !== null) {
        window.clearTimeout(verificationTimerRef.current);
      }
    };
  }, []);

  if (isTyping || !activePillar) return null;

  const clearVerificationTimer = () => {
    if (verificationTimerRef.current !== null) {
      window.clearTimeout(verificationTimerRef.current);
      verificationTimerRef.current = null;
    }
  };

  const startVerificationTimer = (pillarId: string) => {
    if (verifiedPillars[pillarId]) return;

    clearVerificationTimer();
    verificationTimerRef.current = window.setTimeout(() => {
      setVerifiedPillars((current) => ({ ...current, [pillarId]: true }));
      verificationTimerRef.current = null;
    }, VERIFICATION_DELAY_MS);
  };

  const activatePillar = (pillar: SeniorityPillar) => {
    setActivePillarId(pillar.id);
    setActiveHoverLog(pillar.directorCommentary);
    startVerificationTimer(pillar.id);
  };

  return (
    <section
      id="operating-model"
      className="relative z-10 mx-auto w-full max-w-6xl px-4 py-24 md:px-8 lg:pl-16"
      onMouseEnter={() => setActiveHoverLog(activePillar.directorCommentary)}
      onMouseLeave={() => {
        clearVerificationTimer();
        setActiveHoverLog(null);
      }}
    >
      <div className="operating-model-shell rounded-[2rem] border border-white/8 px-6 py-8 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-sm md:px-10 md:py-12">
        <div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#67E8F9]">
            <span>{operatingModel.eyebrow}</span>
            <span className="rounded-full border border-[#22D3EE]/20 bg-[#22D3EE]/10 px-3 py-1 text-[9px] text-[#A5F3FC]">
              {operatingModel.auditStatus}
            </span>
          </div>

          <div className="mt-6 max-w-3xl">
            <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">{operatingModel.title}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300 md:text-base">{operatingModel.intro}</p>
            <p className="mt-4 max-w-2xl font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">
              {operatingModel.summary}
            </p>
          </div>

          <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-black/35 p-4 md:p-5">
            <div className="flex items-center justify-between gap-3 border-b border-white/8 pb-4">
              <div className="flex items-center gap-3">
                <TerminalSquare size={18} className="text-[#22D3EE]" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#67E8F9]">{operatingModel.auditLabel}</p>
                  <p className="mt-1 text-sm text-zinc-400">Condition {'->'} Response {'->'} Evidence</p>
                </div>
              </div>
              <div className="hidden rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400 md:block">
                Hover or tap to inspect
              </div>
            </div>

            <div className="mt-4 space-y-3">
              {operatingModel.pillars.map((pillar) => {
                const isActive = pillar.id === activePillar.id;
                const isVerified = Boolean(verifiedPillars[pillar.id]);

                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onMouseEnter={() => activatePillar(pillar)}
                    onFocus={() => activatePillar(pillar)}
                    onClick={() => activatePillar(pillar)}
                    onMouseLeave={() => clearVerificationTimer()}
                    onBlur={() => clearVerificationTimer()}
                    className={`operating-pillar w-full rounded-[1.35rem] border px-4 py-4 text-left transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/35 ${
                      isActive
                        ? 'border-[#22D3EE]/45 bg-[#071419]/88 shadow-[0_18px_50px_rgba(34,211,238,0.12)]'
                        : 'border-white/8 bg-white/[0.025] hover:border-white/16 hover:bg-white/[0.05]'
                    }`}
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">
                          <span>{pillar.index}</span>
                          <span>{pillar.subtitle}</span>
                          {isVerified ? (
                            <span className="rounded-full border border-emerald-400/25 bg-emerald-400/12 px-2.5 py-1 text-[9px] text-emerald-200">
                              [ VERIFIED ]
                            </span>
                          ) : null}
                        </div>
                        <h3 className="mt-3 text-xl font-semibold text-white">{pillar.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-zinc-300">{pillar.narrative}</p>
                      </div>

                      <div className="rounded-full border border-white/10 bg-black/30 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#A5F3FC]">
                        {pillar.methodology}
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                      <div className="rounded-2xl border border-rose-400/12 bg-rose-400/6 p-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-rose-200/80">Condition</p>
                        <p className="mt-2 text-sm leading-6 text-zinc-300">{pillar.condition}</p>
                      </div>

                      <div className="rounded-2xl border border-[#22D3EE]/12 bg-[#22D3EE]/6 p-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#A5F3FC]">Response</p>
                        <p className="mt-2 text-sm leading-6 text-zinc-200">{pillar.response}</p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/8 bg-black/30 p-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-500">Evidence</p>
                      <p className="mt-2 text-sm leading-6 text-zinc-300">{pillar.evidence}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-[#22D3EE]/12 bg-[#061117]/80 p-5">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.26em] text-[#67E8F9]">
              <ShieldCheck size={14} />
              <span>{operatingModel.proofLabel}</span>
            </div>
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-xl font-semibold text-white">{operatingModel.proofTitle}</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-300">{operatingModel.proofBody}</p>
              </div>
              <Link
                to={operatingModel.proofLink.href}
                className="inline-flex items-center gap-2 self-start rounded-full border border-[#22D3EE]/18 bg-[#22D3EE]/10 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[#A5F3FC] transition hover:border-[#22D3EE]/40 hover:bg-[#22D3EE]/16"
              >
                <span>{operatingModel.proofLink.label}</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">{operatingModel.proofLink.helper}</p>
          </div>
        </div>
      </div>

      <SectionContinueCue
        targetId="projects"
        chapter={siteContent.ui.continueCue.aboutToProjects.chapter}
        title={siteContent.ui.continueCue.aboutToProjects.title}
      />
    </section>
  );
}
