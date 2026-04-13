import type { SiteVariant } from './siteContent';

export type SeniorityPillar = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  methodology: string;
  narrative: string;
  condition: string;
  response: string;
  evidence: string;
  directorCommentary: string;
};

export type OperatingModelProofLink = {
  label: string;
  href: string;
  helper: string;
};

export type OperatingModelContent = {
  eyebrow: string;
  title: string;
  intro: string;
  summary: string;
  auditLabel: string;
  auditStatus: string;
  proofLabel: string;
  proofTitle: string;
  proofBody: string;
  proofLink: OperatingModelProofLink;
  pillars: SeniorityPillar[];
};

const sharedPillars: SeniorityPillar[] = [
  {
    id: 'driving-projects',
    index: 'P-01',
    title: 'Driving Projects',
    subtitle: '0 -> 1 Execution',
    methodology: 'End-to-End Ownership',
    narrative:
      "You do not wait for a Jira ticket. You define the system shape while the requirements are still vibes, then carry that shape all the way to a stable release.",
    condition:
      'A useful opportunity exists, but the problem statement is still fuzzy and nobody has translated it into architecture, milestones, or delivery risk.',
    response:
      'Frame the operating model, own the interfaces, and move from whiteboard concept to deployed workflow without waiting for someone else to de-risk the path first.',
    evidence:
      'Took an agentic pre-sales workflow from whiteboard concept to a live multi-agent system in 3 weeks, owning the vector retrieval layer, orchestration handoffs, and frontend state flow.',
    directorCommentary:
      "A 1-year developer waits for requirements to harden before committing to an architecture. A 5-year operator reduces ambiguity into execution primitives early, chooses tradeoffs, and accepts ownership for the system end to end. This pillar exists to show that the work starts before the backlog looks clean.",
  },
  {
    id: 'uncovering-unknowns',
    index: 'P-02',
    title: 'Uncovering Unknowns',
    subtitle: 'Navigating Ambiguity',
    methodology: 'Root Cause Analysis',
    narrative:
      'When the LLM hallucinates, the logs are noisy, or the documentation disappears, the job is not to guess louder. The job is to find ground truth.',
    condition:
      'Outputs become non-deterministic, the obvious fix is unclear, and shallow prompt-tuning would hide the actual defect instead of isolating it.',
    response:
      'Instrument the workflow, build an evaluation harness, and separate model variance from retrieval, prompting, temperature, and chain-level behavior until the fault line is explicit.',
    evidence:
      'Faced non-deterministic reasoning output in a retrieval-heavy agent and built a custom eval harness to isolate temperature variance and chain drift instead of blindly tweaking prompts.',
    directorCommentary:
      "A 1-year developer often treats model weirdness as magic and keeps changing prompts until the failure becomes less visible. A senior engineer builds observability around the ambiguity, proves which layer is unstable, and only then optimizes. That is the difference between vibe debugging and real RCA.",
  },
  {
    id: 'attacking-unfamiliar-territories',
    index: 'P-03',
    title: 'Attacking Unfamiliar Territories',
    subtitle: 'Rapid Adaptation',
    methodology: 'First-Principles Research',
    narrative:
      'A new domain is not an excuse to slow down. It is a schema to decode, pressure-test, and map into a workflow with measurable value.',
    condition:
      'The project lands in a domain with unfamiliar rules, language, and business logic, but the system still has to behave as if it was designed by someone native to that environment.',
    response:
      'Learn the domain through source artifacts, convert jargon into decision trees, and map the business logic into a deterministic workflow before implementation scale begins.',
    evidence:
      'Navigated healthcare and pre-sales contexts without prior exposure, translating operational logic into agentic workflows that removed repetitive work and tightened execution standards.',
    directorCommentary:
      "A 1-year developer usually mistakes unfamiliar vocabulary for complexity and stays trapped at the surface layer. A veteran decomposes the domain into rules, actors, and failure states, then engineers against those primitives. The point is not prior exposure. The point is how fast you can construct a reliable mental model.",
  },
  {
    id: 'pushing-ecosystem-boundaries',
    index: 'P-04',
    title: 'Pushing Ecosystem Boundaries',
    subtitle: 'The Limitations Hack',
    methodology: 'Ecosystem Augmentation',
    narrative:
      'When a tool says no, that is not the end of the design space. It is the start of extension work.',
    condition:
      'The platform has a hard ceiling, whether that is context-window loss, no public API, or a workflow gap large enough to kill adoption for real users.',
    response:
      'Extend the environment directly: build the relay, add the persistence layer, or engineer the missing capability so the system behaves the way the product should have behaved in the first place.',
    evidence:
      'Refused to accept the context siloing of major LLM interfaces and engineered Thread Navigator, a local-first thread extension that creates portable context packets across tools without any backend.',
    directorCommentary:
      "A 1-year developer reports the platform limitation and moves on. A 5-year builder asks whether the limitation is fundamental or merely unowned. When the answer is unowned, they augment the ecosystem and turn a blocker into leverage. This is the clearest seniority tell in the section because it proves product judgment and systems courage at the same time.",
  },
  {
    id: 'collaboration',
    index: 'P-05',
    title: 'Collaboration',
    subtitle: 'Multi-Agent & Human Synergies',
    methodology: 'System Orchestration',
    narrative:
      'Seniority is not solo coding. It is getting humans, agents, and feedback loops to cooperate without losing clarity or accountability.',
    condition:
      'Multiple stakeholders, automation nodes, and UX expectations need to converge, but each one carries a different definition of quality and success.',
    response:
      'Design the handoff system: align agent behavior with brand voice, define human-in-the-loop checkpoints, and keep feedback structured enough to improve the system over time.',
    evidence:
      'Coordinated product goals, workflow automation, and feedback loops so AI outputs stayed aligned with team expectations while improving through structured human review.',
    directorCommentary:
      "A 1-year developer often optimizes for getting their own code to work. A senior engineer optimizes for the entire system to work, including humans inside the loop. That means designing handoffs, failure recovery, and feedback channels so the system stays coherent after multiple people and agents touch it.",
  },
  {
    id: 'architectural-intuition',
    index: 'P-06',
    title: 'Architectural Intuition',
    subtitle: 'Crisis & Ownership',
    methodology: 'Deterministic Problem Solving',
    narrative:
      'Problems are handled when they surface, not when they become assigned tasks. Stability is part of the job, not a separate request.',
    condition:
      'A production path shows early warning signs such as latency growth, brittle routing, or a hidden bottleneck that has not become a visible incident yet.',
    response:
      'Intervene before the issue becomes user-facing. Prioritize system stability, introduce the control layer or cache, and solve the bottleneck with measured architectural changes instead of reactive patchwork.',
    evidence:
      'Identified inference-path latency risk in agent workflows and treated performance as a systems problem, introducing deterministic structure before the bottleneck could mature into user-facing instability.',
    directorCommentary:
      "A 1-year developer reacts when a ticket appears. A veteran notices stress signals earlier, understands which bottlenecks compound, and fixes the architecture before the blast radius reaches users. That pattern is less about heroics and more about disciplined ownership.",
  },
];

const contentByVariant: Record<SiteVariant, OperatingModelContent> = {
  product: {
    eyebrow: 'Operating Model',
    title: 'Core Competency Protocol',
    intro:
      'The chronology is the least interesting part. What matters is the operating standard behind the builds: how ambiguity gets reduced, how architecture gets chosen, and how delivery stays deterministic under pressure.',
    summary:
      'Read this like a system audit, not a skills grid. Each pillar shows the condition, the senior-level response, and the proof pattern behind the output.',
    auditLabel: 'System Audit',
    auditStatus: 'Six pillars online',
    proofLabel: 'Primary Proof Link',
    proofTitle: 'Pushing Ecosystem Boundaries',
    proofBody:
      'Thread Navigator is the cleanest example of refusing a platform ceiling. Instead of accepting siloed context and missing APIs, the workflow was extended locally until the environment behaved the way power users actually needed.',
    proofLink: {
      label: 'Open Thread Navigator System View',
      href: '/projects/thread-navigator/deep',
      helper: 'Primary proof for ecosystem augmentation',
    },
    pillars: sharedPillars,
  },
  consulting: {
    eyebrow: 'Operating Model',
    title: 'Core Competency Protocol',
    intro:
      'Client environments rarely arrive with clean requirements, stable APIs, or shared language. The useful signal is not years listed on paper. It is whether the operating model can turn ambiguity into shipped outcomes repeatedly.',
    summary:
      'This section is structured as a consulting audit. Each pillar names the client-side condition, the engineering response, and the standard of execution expected from senior delivery.',
    auditLabel: 'System Audit',
    auditStatus: 'Six pillars online',
    proofLabel: 'Primary Proof Link',
    proofTitle: 'Pushing Ecosystem Boundaries',
    proofBody:
      'Thread Navigator best demonstrates the bias to engineer past workflow ceilings. It solved a real operational bottleneck by extending the tooling surface itself instead of accepting the limitation as fixed.',
    proofLink: {
      label: 'Open Thread Navigator System View',
      href: '/projects/thread-navigator/deep',
      helper: 'Primary proof for ecosystem augmentation',
    },
    pillars: sharedPillars,
  },
  gcc: {
    eyebrow: 'Operating Model',
    title: 'Core Competency Protocol',
    intro:
      'Enterprise settings do not reward flashy output. They reward judgment under constraint: secure defaults, deterministic architecture, and the ability to stabilize systems before risk becomes visible.',
    summary:
      'This audit surfaces the engineering standards behind the portfolio. Each pillar shows how constraints are interpreted, how ownership is exercised, and why the resulting output reads more senior than the timeline suggests.',
    auditLabel: 'System Audit',
    auditStatus: 'Six pillars online',
    proofLabel: 'Primary Proof Link',
    proofTitle: 'Pushing Ecosystem Boundaries',
    proofBody:
      'Thread Navigator is the strongest proof for this pillar because it converts a platform limitation into an internal capability while preserving local-first governance and zero-server control.',
    proofLink: {
      label: 'Open Thread Navigator System View',
      href: '/projects/thread-navigator/deep',
      helper: 'Primary proof for ecosystem augmentation',
    },
    pillars: sharedPillars,
  },
};

export function getOperatingModelContent(variant: SiteVariant): OperatingModelContent {
  return contentByVariant[variant];
}
