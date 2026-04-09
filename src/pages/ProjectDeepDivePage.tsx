import { Suspense, type ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Navigate, useParams } from 'react-router-dom';
import { ArrowUpRight, CircuitBoard, Radar, Target } from 'lucide-react';
import { DeepDiveTunnelTransition } from '@/components/DeepDiveTunnelTransition';
import { getProjectBySlug, type ProjectData, type ProjectDiagramKey } from '@/data/projects';
import { NavigatorDiagram } from '@/components/diagrams/NavigatorDiagram';
import { SakhiDiagram } from '@/components/diagrams/SakhiDiagram';
import { PresalesDiagram } from '@/components/diagrams/PresalesDiagram';

const diagramMap: Record<ProjectDiagramKey, ComponentType> = {
  navigator: NavigatorDiagram,
  sakhi: SakhiDiagram,
  presales: PresalesDiagram,
};

const threadTechTags = [
  'Chrome Extension',
  'Manifest V3',
  'Vanilla JS',
  'CSS',
  'chrome.storage',
  'DOM Injection',
];

const threadIdentityMetrics = [
  { value: '100%', label: 'Local' },
  { value: '< 1s', label: 'Inject' },
  { value: '3 LLMs', label: 'Supported' },
  { value: '60+', label: 'Prompts' },
];

const threadSignals = [
  {
    title: 'System Mission',
    icon: Target,
    body:
      "Build a browser-resident layer that persists LLM context across sessions and platforms - without any backend, any server, or any data leaving the user's machine.",
  },
  {
    title: 'Execution Model',
    icon: CircuitBoard,
    body:
      'Manifest V3 content scripts inject a floating HUD via DOM mutation observers. State is managed entirely in chrome.storage.local. Zero network calls. Zero latency.',
  },
  {
    title: 'Strategic Outcome',
    icon: ArrowUpRight,
    body:
      'Proves the ability to ship a complete, production-grade tool that 600+ users depend on daily - built solo, zero infrastructure, zero budget.',
  },
];

const threadArchitecturePhases = [
  {
    title: 'Phase 1 - universal thread navigation',
    shellClassName: 'border-[#6d5bd0]/45 bg-[#312a67]/88',
    cardClassName: 'border-cyan-300/35 bg-[#184a84]',
    titleClassName: 'text-[#d8d0ff]',
    blocks: [
      {
        title: 'DOM parser',
        body: ['Platform-aware CSS', 'selectors per LLM'],
      },
      {
        title: 'MutationObserver',
        body: ['URL change detection', 're-initialises per chat'],
      },
      {
        title: 'Starring + ToC',
        body: ['Persisted per thread', 'in chrome.storage'],
      },
      {
        title: 'Adaptive theming',
        body: ['8 platform x mode'],
      },
    ],
  },
  {
    title: 'Phase 2 - context teleportation protocol',
    shellClassName: 'border-emerald-400/35 bg-[#0f5b4f]/88',
    cardClassName: 'border-lime-300/35 bg-[#315f0f]',
    titleClassName: 'text-[#b8f1dc]',
    blocks: [
      {
        title: 'Select Q&A',
        body: ['Checkbox picks', 'from navigator'],
      },
      {
        title: 'Compile Markdown',
        body: ['Clean payload'],
      },
      {
        title: 'Push to storage',
        body: ['chrome.storage', '+ open new tab'],
      },
      {
        title: 'content.js injection',
        body: ['ContentEditable', 'or textarea'],
      },
    ],
  },
  {
    title: 'Phase 3 - smart prompt library (v1.3)',
    shellClassName: 'border-orange-400/35 bg-[#7b3214]/88',
    cardClassName: 'border-amber-300/35 bg-[#815005]',
    titleClassName: 'text-[#ffd2b0]',
    blocks: [
      {
        title: 'Bento Grid UI',
        body: ['Color-coded tags', 'CRUD + drag/drop'],
      },
      {
        title: 'Template engine',
        body: ['{{Variable}} slots', 'live preview'],
      },
      {
        title: 'Pre-loaded prompts',
        body: ['25 expert templates'],
      },
      {
        title: 'Paste to LLM',
        body: ['Active input', 'auto-injection'],
      },
    ],
  },
];

const threadArchitectureFooters = [
  {
    title: 'Local-first storage',
    body: [
      'chrome.storage.local - zero backend',
      'Stars · prompt library · teleport payload',
      'Manifest V3 · no external API calls',
    ],
  },
  {
    title: 'Dual PDF export',
    body: [
      'Thread export - strips UI noise',
      'preserves code blocks + MathJax',
      'Library export - prompt archive',
    ],
  },
];

function SectionHeader({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-8 md:mb-10">
      <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-gray-500">{index}</p>
      <h2 className="mt-3 text-[28px] font-bold tracking-tight text-white md:text-[32px]">{title}</h2>
      <p className="mt-3 max-w-[30rem] text-[14px] leading-relaxed text-gray-400">{subtitle}</p>
    </div>
  );
}

function ThreadNavigatorArchitectureDiagram() {
  return (
    <div className="rounded-[1.75rem] border border-white/8 bg-[#0a0a0a]/72 p-4 shadow-[0_28px_80px_-52px_rgba(0,0,0,0.95)] md:p-6">
      <div className="space-y-6">
        {threadArchitecturePhases.map((phase, phaseIndex) => (
          <motion.div
            key={phase.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 * phaseIndex }}
            className={`rounded-[1.5rem] border p-5 md:p-6 ${phase.shellClassName}`}
          >
            <h3 className={`text-center text-xl font-semibold tracking-tight ${phase.titleClassName}`}>
              {phase.title}
            </h3>

            <div className="mt-5 grid gap-4 xl:grid-cols-4">
              {phase.blocks.map((block, blockIndex) => (
                <div key={block.title} className="relative">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.32, delay: 0.14 + blockIndex * 0.06 + phaseIndex * 0.06 }}
                    className={`relative flex min-h-[8.75rem] flex-col justify-center rounded-[1rem] border px-4 py-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${phase.cardClassName}`}
                  >
                    <h4 className="text-[1.05rem] font-semibold leading-tight text-white">{block.title}</h4>
                    <div className="mt-3 space-y-1 text-[13px] font-medium leading-snug text-white/72">
                      {block.body.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </motion.div>

                  {blockIndex < phase.blocks.length - 1 && (
                    <svg
                      viewBox="0 0 120 24"
                      className="pointer-events-none absolute left-full top-1/2 z-10 hidden h-6 w-10 -translate-y-1/2 xl:block"
                      aria-hidden="true"
                    >
                      <motion.path
                        d="M 4 12 L 108 12"
                        stroke="rgba(255,255,255,0.72)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0.35 }}
                        animate={{ pathLength: 1, opacity: 0.9 }}
                        transition={{ duration: 0.45, delay: 0.22 + blockIndex * 0.08 + phaseIndex * 0.08 }}
                      />
                      <motion.path
                        d="M 94 5 L 108 12 L 94 19"
                        fill="none"
                        stroke="rgba(255,255,255,0.72)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0.35 }}
                        animate={{ pathLength: 1, opacity: 0.9 }}
                        transition={{ duration: 0.3, delay: 0.34 + blockIndex * 0.08 + phaseIndex * 0.08 }}
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <div className="grid gap-4 xl:grid-cols-2">
          {threadArchitectureFooters.map((footer, footerIndex) => (
            <motion.div
              key={footer.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.28 + footerIndex * 0.08 }}
              className="rounded-[1.35rem] border border-white/18 bg-[#4d4b45]/84 px-5 py-4 text-center text-white/92"
            >
              <h4 className="text-[1.05rem] font-semibold leading-tight">{footer.title}</h4>
              <div className="mt-3 space-y-1 text-[13px] leading-snug text-white/68">
                {footer.body.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ThreadNavigatorDeepDive({ project }: { project: ProjectData }) {
  const lensAnalysis = project.lensAnalysis;
  const nextBuild = project.nextBuild;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-12 md:px-8 lg:pl-16 lg:pr-8">
      <motion.section
        id="identity"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0 }}
        className="scroll-mt-8 pb-20 md:scroll-mt-12"
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-gray-500">Case Study 01</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl">{project.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-300 md:text-lg">
          A browser-resident orchestration layer that turns fragmented LLM conversations into portable context packets.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {threadIdentityMetrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-[1.25rem] border border-white/8 bg-[#0b0b0b]/72 px-5 py-4 transition-all duration-150 hover:-translate-y-0.5 hover:border-cyan-300/55"
            >
              <p className="text-2xl font-bold text-[#22D3EE]">{metric.value}</p>
              <p className="mt-2 text-[11px] font-mono uppercase tracking-[0.12em] text-gray-500">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {threadTechTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-mono tracking-[0.08em] text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.18em] text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            Live on Chrome Web Store
          </span>
        </div>
      </motion.section>

      <motion.section
        id="architecture"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1 }}
        className="scroll-mt-8 pb-24 md:scroll-mt-12"
      >
        <SectionHeader
          index="Section 02"
          title="System Architecture"
          subtitle="How the orchestration layer operates across platform boundaries"
        />
        <ThreadNavigatorArchitectureDiagram />
      </motion.section>

      <motion.section
        id="signals"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.2 }}
        className="scroll-mt-8 pb-24 md:scroll-mt-12"
      >
        <SectionHeader
          index="Section 03"
          title="Deep Dive Signals"
          subtitle="Three lenses for evaluating the system"
        />

        <div className="grid gap-4 xl:grid-cols-3">
          {threadSignals.map((signal) => {
            const Icon = signal.icon;

            return (
              <article
                key={signal.title}
                className="rounded-[1.6rem] border border-white/8 bg-[#0b0b0b]/72 p-6 transition-colors duration-150 hover:border-cyan-300/40"
              >
                <Icon size={20} className="text-[#22D3EE]" />
                <p className="mt-5 text-[11px] font-mono uppercase tracking-[0.12em] text-gray-500">
                  {signal.title}
                </p>
                <div className="mt-3 h-px w-full bg-white/8" />
                <p className="mt-4 text-[15px] leading-[1.7] text-gray-300">{signal.body}</p>
              </article>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        id="lenses"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.3 }}
        className="scroll-mt-8 pb-24 md:scroll-mt-12"
      >
        <SectionHeader
          index="Section 04"
          title="Dual Lens Analysis"
          subtitle="How this project reads depending on who's evaluating it"
        />

        <div className="grid gap-0 overflow-hidden rounded-[1.75rem] border border-white/8 xl:grid-cols-2">
          <div className="border-b border-white/8 bg-[rgba(34,211,238,0.05)] p-6 xl:border-b-0 xl:border-r xl:border-white/8 md:p-8">
            <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-cyan-300">Architect Lens</p>
            <div className="mt-3 h-px w-full bg-white/8" />
            <p className="mt-6 whitespace-pre-line text-[15px] leading-[1.7] text-gray-300">
              {lensAnalysis?.architect}
            </p>
          </div>

          <div className="bg-[rgba(245,158,11,0.05)] p-6 md:p-8">
            <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-amber-300">Strategy Lens</p>
            <div className="mt-3 h-px w-full bg-white/8" />
            <p className="mt-6 whitespace-pre-line text-[15px] leading-[1.7] text-gray-300">
              {lensAnalysis?.strategy}
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="next-build"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.4 }}
        className="scroll-mt-8 pb-16 md:scroll-mt-12"
      >
        <SectionHeader
          index="Section 05"
          title="What I'd Build Next"
          subtitle="The architectural decision that would unlock the next order of magnitude"
        />

        <div className="mx-auto max-w-[700px] rounded-[1.75rem] border border-white/6 bg-[#0a0a0a]/56 p-6 opacity-90 md:p-8">
          <span className="inline-flex items-center rounded-full border border-dashed border-amber-300/35 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.14em] text-amber-200">
            {nextBuild?.status}
          </span>
          <h3 className="mt-6 text-2xl font-semibold text-white">{nextBuild?.title}</h3>
          <div className="mt-3 h-px w-full bg-white/8" />
          <div className="mt-6 space-y-5 text-[15px] leading-[1.7] text-gray-400">
            {nextBuild?.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}

function GenericDeepDiveBody({ project }: { project: ProjectData }) {
  const Diagram = diagramMap[project.diagramKey];

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-12 md:px-8 lg:pl-16 lg:pr-8">
      <section>
        <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-gray-500">Project Deep Dive</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">{project.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-300">{project.summary}</p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[1.75rem] border border-white/8 bg-[#0b0b0b]/72 p-6">
          <div className="mb-5 flex items-center gap-3">
            <Radar size={18} style={{ color: project.theme.secondary }} />
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">System Diagram</h3>
          </div>
          <div className="min-h-[24rem] rounded-[1.25rem] border border-white/8 bg-black/35 p-3">
            <Suspense
              fallback={
                <div className="flex h-[24rem] items-center justify-center text-sm font-mono text-gray-500">
                  Loading diagram...
                </div>
              }
            >
              <Diagram />
            </Suspense>
          </div>
        </div>

        <div className="grid gap-4">
          {project.deepDiveSections.map((section) => (
            <article key={section.title} className="rounded-[1.6rem] border border-white/8 bg-[#0b0b0b]/72 p-6">
              <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-gray-500">{section.title}</p>
              <p className="mt-4 text-[15px] leading-[1.7] text-gray-300">{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export function ProjectDeepDivePage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/" replace />;
  }

  const project = getProjectBySlug(slug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const content = project.slug === 'thread-navigator'
    ? <ThreadNavigatorDeepDive project={project} />
    : <GenericDeepDiveBody project={project} />;

  return (
    <DeepDiveTunnelTransition projectId={project.slug} projectData={project}>
      {content}
    </DeepDiveTunnelTransition>
  );
}
