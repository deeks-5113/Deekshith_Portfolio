import { Suspense, type ComponentType } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Cpu, Radar, ShieldCheck, Workflow } from 'lucide-react';
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

function DeepDiveBody({ project }: { project: ProjectData }) {
  const Diagram = diagramMap[project.diagramKey];

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 md:px-8 md:py-10">
      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_32px_90px_-48px_rgba(0,0,0,0.95)] backdrop-blur-xl md:p-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.28em] text-gray-500">Project Universe</p>
          <h2 className="mt-4 max-w-[13ch] text-4xl font-semibold tracking-tight text-white md:text-6xl">
            {project.title}
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-gray-300 md:text-base">
            {project.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-[11px] font-mono uppercase tracking-[0.14em] text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {project.telemetry.map((metric) => (
            <div
              key={metric.label}
              className="rounded-[1.5rem] border border-white/10 bg-black/40 p-5 shadow-[0_24px_60px_-42px_rgba(0,0,0,0.95)] backdrop-blur-xl"
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-gray-500">{metric.label}</p>
              <p className="mt-4 text-2xl font-semibold text-white">{metric.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
          <div className="mb-5 flex items-center gap-3">
            <Radar size={18} style={{ color: project.theme.secondary }} />
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">System Diagram</h3>
          </div>

          <div className="min-h-[25rem] rounded-[1.5rem] border border-white/8 bg-black/35 p-3">
            <Suspense
              fallback={
                <div className="flex h-[25rem] items-center justify-center text-sm font-mono text-gray-500">
                  Loading diagram...
                </div>
              }
            >
              <Diagram />
            </Suspense>
          </div>
        </div>

        <div className="grid gap-4">
          {project.deepDiveSections.map((section, index) => {
            const Icon = [ShieldCheck, Workflow, Cpu][index] ?? Cpu;

            return (
              <article
                key={section.title}
                className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_28px_80px_-50px_rgba(0,0,0,0.95)] backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl"
                    style={{
                      backgroundColor: `${project.theme.primary}22`,
                      color: project.theme.secondary,
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-gray-500">
                      Deep Dive Signal
                    </p>
                    <h3 className="text-lg font-semibold text-white">{section.title}</h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-[15px]">{section.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-gray-500">Architect Lens</p>
          <h3 className="mt-4 text-2xl font-semibold text-white md:text-3xl">{project.architectLens.headline}</h3>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-300 md:text-base">
            {project.architectLens.description}
          </p>
          <div className="mt-6 rounded-[1.25rem] border border-white/8 bg-black/35 px-4 py-3 text-sm font-mono text-gray-300">
            {project.architectLens.metrics}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
          <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-gray-500">Strategy Lens</p>
          <h3 className="mt-4 text-2xl font-semibold text-white md:text-3xl">{project.strategistLens.headline}</h3>
          <p className="mt-4 text-sm leading-relaxed text-gray-300 md:text-base">
            {project.strategistLens.description}
          </p>
          <div className="mt-6 rounded-[1.25rem] border border-white/8 bg-black/35 px-4 py-3 text-sm font-mono text-gray-300">
            {project.strategistLens.metrics}
          </div>
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

  return (
    <DeepDiveTunnelTransition projectId={project.slug} projectData={project}>
      <DeepDiveBody project={project} />
    </DeepDiveTunnelTransition>
  );
}
