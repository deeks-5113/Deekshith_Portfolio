import type { ComponentType } from 'react';

export type ProjectDiagramKey = 'navigator' | 'sakhi' | 'presales';

export interface LensContent {
  headline: string;
  metrics: string;
  description: string;
}

export interface ProjectDeepDiveMetric {
  label: string;
  value: string;
}

export interface ProjectDeepDiveSection {
  title: string;
  body: string;
}

export interface ProjectTheme {
  primary: string;
  secondary: string;
  tertiary: string;
  accent: string;
  hud: string;
  ringPalette: string[];
  particleStyle: string;
}

export interface ProjectData {
  id: string;
  slug: string;
  commentaryKey: string;
  title: string;
  shortTitle: string;
  domainAura: string;
  tags: string[];
  architectPanelItems: string[];
  strategistLens: LensContent;
  architectLens: LensContent;
  commentaryLogs: Record<string, string>;
  diagramKey: ProjectDiagramKey;
  breadcrumbLabel: string;
  summary: string;
  theme: ProjectTheme;
  telemetry: ProjectDeepDiveMetric[];
  deepDiveSections: ProjectDeepDiveSection[];
}

export const projectsData: ProjectData[] = [
  {
    id: 'thread-navigator',
    slug: 'thread-navigator',
    commentaryKey: 'navigator',
    title: 'Thread Navigator',
    shortTitle: 'Navigator',
    domainAura: 'aura-logic',
    tags: ['JavaScript', 'Chrome Storage API', 'DOM Manipulation', 'Cross-Platform Injection'],
    architectPanelItems: [
      'Context Teleportation Protocol',
      'Zero-Server Architecture',
      'Cross-Platform DOM Interoperability',
      'Client-Side Execution Only',
    ],
    strategistLens: {
      headline: 'Eliminated the Context Fragmentation Tax Across Every Major LLM',
      metrics: '60+ Active Power Users | Zero Backend Dependency',
      description:
        'Power users switching between ChatGPT, Gemini, and Perplexity were losing reasoning continuity every time. Thread Navigator unifies workflows with a reusable prompt library and one-click context transfer.',
    },
    architectLens: {
      headline: 'Context Teleportation Protocol - DOM-Level, Zero Server',
      metrics: '100% Local Privacy | Chrome Storage Relay',
      description:
        'Parses platform-specific DOM trees, compiles selected Q&A pairs into clean Markdown, and auto-injects into any target LLM via Chrome Storage relay with clipboard fallback. No API. No server. No permissions beyond Chrome.',
    },
    commentaryLogs: {
      overall:
        "I built this to solve the 'context tax.' It's an engineering bridge between isolated LLMs, ensuring reasoning moves as fast as you do, with total privacy baked into the architecture.",
      'Context Teleportation Protocol':
        "Copying is easy; preserving reasoning is hard. This protocol packages intent into a 'context packet' for instant injection. It eliminates the tax of switching models.",
      'Zero-Server Architecture':
        'Data leakage kills adoption. I built this with zero backend. Everything lives in Chrome storage with no databases and no APIs. That privacy model is why engineers trusted it immediately.',
      'Cross-Platform DOM Interoperability':
        'Walled gardens lacked APIs, so I used the DOM. The parser navigates HTML trees to extract reasoning threads across platforms and turns structured chaos into portable context.',
      'Client-Side Execution Only':
        "Local execution removes latency and infrastructure overhead. By leaning on Chrome's runtime, the tool scales without servers, operational cost, or data residency risk.",
    },
    diagramKey: 'navigator',
    breadcrumbLabel: 'System View',
    summary:
      'A browser-resident orchestration layer that turns fragmented LLM conversations into portable context packets.',
    theme: {
      primary: '#7C3AED',
      secondary: '#22D3EE',
      tertiary: '#4F46E5',
      accent: '#C084FC',
      hud: '#67E8F9',
      ringPalette: ['#7C3AED', '#22D3EE', '#4F46E5', '#C084FC'],
      particleStyle: 'dom-thread',
    },
    telemetry: [
      { label: 'Privacy Model', value: '100% Local' },
      { label: 'Transfer Time', value: '<1s' },
      { label: 'Supported Targets', value: '3 LLMs' },
      { label: 'Power Users', value: '60+' },
    ],
    deepDiveSections: [
      {
        title: 'System Mission',
        body:
          'Thread Navigator exists to preserve reasoning continuity between isolated model interfaces. The core bet was that context transfer should happen where the user works, not on a remote server.',
      },
      {
        title: 'Execution Model',
        body:
          'Each thread is parsed into a normalized packet, staged in Chrome storage, and rehydrated into the target interface with clipboard fallback. The entire chain is deterministic and client-side.',
      },
      {
        title: 'Strategic Outcome',
        body:
          'The product eliminated manual copy-paste loops for power users and made model switching feel operational rather than disruptive.',
      },
    ],
  },
  {
    id: 'sakhi',
    slug: 'sakhi',
    commentaryKey: 'sakhi',
    title: 'Sakhi - Zero-Trust Clinical AI Agent',
    shortTitle: 'Sakhi',
    domainAura: 'aura-medical',
    tags: ['FastAPI', 'Hybrid HRAG', 'Composite Embeddings', 'SSE Streaming', 'PostgreSQL', 'Confidence Gates'],
    architectPanelItems: [
      '4-Layer Hallucination Shield',
      'Confidence-Gated Hybrid Routing',
      'Self-Improving Knowledge Flywheel',
      'Stream Abort on Drift Detection',
    ],
    strategistLens: {
      headline: 'Clinical-Grade AI That Scales Expert Judgment',
      metrics: 'Functional 0% Hallucination Target',
      description:
        'Deploys on WhatsApp to intercept high volumes of routine medical queries with verified, source-grounded responses. Every failure is logged, analyzed, and fed back into the knowledge base.',
    },
    architectLens: {
      headline: '4-Layer Zero-Trust Medical Reasoning Engine',
      metrics: '<2s Latency | 100% Guardrail Coverage',
      description:
        'Four sequential safety layers, similarity scoring, confidence gating, straightjacket prompting, and a mid-stream entity auditor guarantee zero hallucination exposure before a single token reaches the user.',
    },
    commentaryLogs: {
      overall:
        'Most healthcare copilots optimize for answers. I optimized for failure modes. Sakhi is a zero-trust clinical agent where every architectural layer exists to prevent unsafe reasoning from reaching the patient.',
      '4-Layer Hallucination Shield':
        "Most bots hope LLMs stay on track. I built a stream-level auditor scanning generated tokens against grounded source material. If the stream drifts, it aborts.",
      'Confidence-Gated Hybrid Routing':
        'Local SLMs handle routine queries for low latency and zero cloud exposure. Complex cases hit GPT only after PII scrubbing, balancing privacy, safety, and cost.',
      'Self-Improving Knowledge Flywheel':
        'Every blocked query is logged. Failures are re-ingested as new HRAG nodes with composite embeddings, so the system gets safer as it fails.',
      'Stream Abort on Drift Detection':
        'The agent validates reasoning while it streams. If entities or claims detach from approved evidence, token emission stops before the answer leaves the system.',
    },
    diagramKey: 'sakhi',
    breadcrumbLabel: 'Clinical Engine',
    summary:
      'A healthcare agent with explicit confidence gates, local-first routing, and mid-stream drift detection.',
    theme: {
      primary: '#14B8A6',
      secondary: '#22D3EE',
      tertiary: '#15803D',
      accent: '#99F6E4',
      hud: '#67E8F9',
      ringPalette: ['#14B8A6', '#22D3EE', '#15803D', '#99F6E4'],
      particleStyle: 'neural-node',
    },
    telemetry: [
      { label: 'Guardrail Layers', value: '4' },
      { label: 'Latency', value: '<2s' },
      { label: 'Cloud Exposure', value: 'Selective' },
      { label: 'Hallucination Goal', value: 'Zero' },
    ],
    deepDiveSections: [
      {
        title: 'Risk Architecture',
        body:
          'Sakhi treats uncertainty as a routing problem, not a UI problem. Requests are scored before they are answered, and unsafe branches never emit user-facing language.',
      },
      {
        title: 'Hybrid Runtime',
        body:
          'Local models carry the routine operational load while cloud models are only invited into the loop after confidence drops and structured safeguards are satisfied.',
      },
      {
        title: 'Knowledge Flywheel',
        body:
          'Blocked or uncertain interactions become the fuel for the next retrieval cycle, turning edge cases into structured institutional knowledge.',
      },
    ],
  },
  {
    id: 'presales',
    slug: 'presales',
    commentaryKey: 'presales',
    title: 'Autonomous Pre-Sales Co-Pilot',
    shortTitle: 'Pre-Sales Co-Pilot',
    domainAura: 'aura-gold',
    tags: ['FastAPI', 'PostgreSQL', 'VectorDB', 'React GenUI', 'n8n', 'LangChain', 'Whisper API'],
    architectPanelItems: [
      'Dual-Schema RAG Engine',
      'Multi-Agent Orchestration (n8n)',
      '15-Minute Automated Workflow',
      'Webhook-Triggered Automation Pipeline',
    ],
    strategistLens: {
      headline: 'Turned a 3-Day Sales Prep Cycle Into a 15-Minute Workflow',
      metrics: 'Discovery to PoC to Client Deck in One Session',
      description:
        'Pre-sales teams were burning hours on research, note-taking, and deck building. This agent ingests a client name, runs the full discovery-to-delivery pipeline, and ships a branded point-of-view deck.',
    },
    architectLens: {
      headline: 'Multi-Agent Pipeline: Enrich -> Transcribe -> Reason -> Deliver',
      metrics: 'ACID Integrity | Semantic Retrieval | STT Fallback Chain',
      description:
        'Four chained agents handle client enrichment, call transcription, LLM reasoning, and visual deck generation. PostgreSQL owns relational state. VectorDB handles semantic RFP search. n8n orchestrates the handoffs.',
    },
    commentaryLogs: {
      overall:
        'This was not about making sales research nicer. It was about collapsing an entire pre-sales operating model into one autonomous pipeline where enrichment, reasoning, and delivery happen as a single system.',
      'Multi-Agent Orchestration (n8n)':
        "I traded god-scripts for an observable agent pipeline via n8n. If one stage degrades, the others can still progress with clear state visibility and retry boundaries.",
      'Dual-Schema RAG Engine':
        'Enterprise RFPs mix facts and narratives. PostgreSQL holds strict relational truth while VectorDB handles conceptual retrieval. They merge at the UI into one coherent draft.',
      '15-Minute Automated Workflow':
        'The system compresses discovery, transcription, and deck generation into one accelerated session, turning a multi-day prep cycle into an operational sprint.',
      'Webhook-Triggered Automation Pipeline':
        'The workflow wakes up on external events, pushes context through specialized stages, and produces deliverables without forcing humans to babysit each handoff.',
    },
    diagramKey: 'presales',
    breadcrumbLabel: 'Automation Core',
    summary:
      'A multi-agent revenue engine that automates research, transcription, retrieval, and deck delivery.',
    theme: {
      primary: '#F59E0B',
      secondary: '#6366F1',
      tertiary: '#FCD34D',
      accent: '#FDE68A',
      hud: '#FDE68A',
      ringPalette: ['#F59E0B', '#6366F1', '#FCD34D', '#FDE68A'],
      particleStyle: 'funnel-flow',
    },
    telemetry: [
      { label: 'Prep Cycle', value: '15 min' },
      { label: 'Agent Stages', value: '4' },
      { label: 'Primary Stores', value: '2' },
      { label: 'Delivery Mode', value: 'Autonomous' },
    ],
    deepDiveSections: [
      {
        title: 'Pipeline Design',
        body:
          'The system is built as a handoff chain, not a monolith. Enrichment, transcription, reasoning, and deliverable generation each own a narrow responsibility and exchange explicit state.',
      },
      {
        title: 'Data Strategy',
        body:
          'Relational truth and semantic recall are separated on purpose. This lets the system answer with enterprise-grade precision without sacrificing flexible retrieval.',
      },
      {
        title: 'Commercial Impact',
        body:
          'The result is a pipeline that protects expert time, shortens sales cycles, and makes pre-sales output more consistent under pressure.',
      },
    ],
  },
];

export const projectsBySlug = Object.fromEntries(projectsData.map((project) => [project.slug, project])) as Record<
  string,
  ProjectData
>;

export function getProjectBySlug(slug: string) {
  return projectsBySlug[slug];
}

export type ProjectDiagramComponent = ComponentType;
