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

export interface ProjectSidebarContent {
  commentary: string;
  systemLog: string[];
}

export interface ProjectLensAnalysis {
  architect: string;
  strategy: string;
}

export interface ProjectNextBuild {
  status: string;
  title: string;
  body: string[];
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
  sidebar?: ProjectSidebarContent;
  lensAnalysis?: ProjectLensAnalysis;
  nextBuild?: ProjectNextBuild;
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
    sidebar: {
      commentary:
        "Thread Navigator began as a fix for a simple pain: losing the right snippet deep inside long LLM threads. The key insight was not the HUD. It was realizing browser-resident state could persist context across sessions and platforms without any backend at all.",
      systemLog: [
        '[INIT]   chrome.runtime -> content_script injected',
        '[READY]  DOM observer active across 4 platforms',
        '[EVENT]  floating HUD rendered - 0 layout shift',
        '[STORE]  chrome.storage.local -> prompt library loaded',
        '[EXEC]   context packet serialised -> cross-platform relay',
        '[STATUS] extension active - manifest v3 compliant',
      ],
    },
    lensAnalysis: {
      architect:
        "The interesting problem wasn't the UI. It was how to maintain coherent state across four DOM environments you do not control without a backend.\n\nThe answer was to treat chrome.storage as the single source of truth. Every platform reads from and writes to the same local store. The HUD is just a read layer.\n\nManifest V3 forced service workers instead of background pages. That constraint improved the architecture by making it stateless by design.",
      strategy:
        "60+ active users is a proof point, not a vanity metric. It means real distribution, real retention, and real dependency.\n\nThe Chrome Web Store listing is also a forcing function. Public shipping with reviews creates accountability that side projects without distribution never have.\n\nThe multi-platform support is not feature bloat. It is evidence that the abstraction layer generalises, which is the actual hiring signal.",
    },
    nextBuild: {
      status: 'IN PROGRESS - NOT YET BUILT',
      title: 'Enterprise API Layer',
      body: [
        "Right now, Thread Navigator is entirely local. That's a feature, but it is also a ceiling.",
        'The next architectural move is an optional sync layer that maps chrome.storage state to Microsoft Graph API or Notion API, letting enterprise users persist context across devices and share prompt libraries across teams.',
        'The local-first architecture was never a limitation. It was step one of a two-step design.',
      ],
    },
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
        title: 'System Mission',
        body:
          'To eliminate the black-box nature of medical AI by enforcing a strictly context-based extraction model that strips all AI personas.',
      },
      {
        title: 'Execution Model',
        body:
          'The system employs recursive parent hydration. When a granular child chunk is matched, the backend recursively fetches the full H1-H3 hierarchy so the LLM is anchored in expert-verified data.',
      },
      {
        title: 'Strategic Outcome',
        body:
          'Blocked or uncertain interactions are logged as hit lists, turning edge cases into new structured institutional knowledge nodes.',
      },
    ],
    sidebar: {
      commentary:
        'Sakhi was designed around one principle: uncertainty is a routing problem, not a UI problem. The model never gets to improvise clinically. If confidence falls, the system narrows, verifies, or refuses before unsafe language can reach the patient.',
      systemLog: [
        '[TRIAGE] intent classified -> clinical query',
        '[SEARCH] hybrid HRAG pipeline engaged',
        '[GATE] weighted fusion score evaluated',
        '[PROMPT] straightjacket context envelope assembled',
        '[AUDIT] streaming entities verified against source DNA',
        '[STATUS] safe response emitted or fallback triggered',
      ],
    },
    lensAnalysis: {
      architect:
        'Weighted Fusion scoring with a 0.85 gate ensures only high-confidence retrieval reaches the model.\n\nRecursive SQL hydration rebuilds the full H1-H3 context tree from knowledge_nodes when a child chunk is matched, so the LLM reads complete expert context instead of isolated fragments.\n\nA real-time auditor scans streaming tokens against source DNA to catch drift before a clinical answer escapes the pipeline.\n\nPage indexing short-circuits follow-up retrieval into deterministic lookups, driving sub-100ms access for magic-card transactions.',
      strategy:
        'The weighted gate minimizes clinical risk by ensuring only high-confidence evidence reaches the user.\n\nRecursive hydration makes the system feel branch-specialized, giving users trustworthy domain depth across areas like Cardiology and Pediatrics.\n\nReal-time auditing protects institutional liability by turning verification into an automated runtime behavior instead of a manual review burden.\n\nPage indexing dramatically cuts operational API cost while improving speed on follow-up interactions.',
    },
    nextBuild: {
      status: 'IN PROGRESS - NEXT ITERATION',
      title: 'Agentic Self-Correction',
      body: [
        'The next node is transitioning from a deterministic pipeline to a LangGraph-based reflective agent.',
        'Right now, a query below the 0.85 threshold is logged and routed to a safety fallback. The next iteration introduces a Reflect and Retry loop that diagnoses why confidence was low, re-queries with adjusted semantic weights, and attempts to resolve the gap autonomously.',
        'Only after that self-correction loop fails would the system escalate the case into the expert log.',
      ],
    },
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
        title: 'System Mission',
        body:
          'To transform pre-sales from a manual, repetitive task into an intelligent, data-driven digital co-pilot motion that maximizes client impact while minimizing expert grunt work.',
      },
      {
        title: 'Execution Model',
        body:
          'Built as a handoff chain rather than a monolith. Each module owns a narrow responsibility and exchanges explicit state through a shared traceToken.',
      },
      {
        title: 'Strategic Outcome',
        body:
          'Shortens sales cycles by delivering high-fidelity WOW moments with instant technical credibility through auto-generated, ROI-backed point-of-view decks.',
      },
    ],
    sidebar: {
      commentary:
        'This system was built to remove the grunt work from pre-sales without flattening the craft. The real architectural move was not automation in isolation. It was chaining enrichment, reasoning, and delivery into one accountable operating loop.',
      systemLog: [
        '[TRIGGER] zoom/team webhook received',
        '[ENRICH] crm + market context hydrated',
        '[TRANSCRIBE] whisper pipeline generated call intelligence',
        '[REASON] gpt-4o extracted business model and current focus',
        '[GENERATE] pov draft + diagram payload assembled',
        '[STATUS] deck artifact delivered to seller workflow',
      ],
    },
    lensAnalysis: {
      architect:
        'Relational truth and semantic recall are intentionally separated so PostgreSQL owns persistence while retrieval layers remain flexible for context search.\n\nCritical tasks use deterministic fallbacks and rule-based guardrails, while the model handles the generative and synthesizing work.\n\nMulti-model orchestration coordinates OpenAI for reasoning and Whisper for transcription with retries and error monitoring across the chain.',
      strategy:
        'The system makes pitch quality repeatable so every AE or SE can present at a high technical standard.\n\nReal-time enrichment turns discovery into scalable personalization by adapting questions to current market news, company motion, and leadership changes.\n\nHuman-in-the-loop editing keeps experts in control, so the agent amplifies seller output rather than replacing judgment.',
    },
    nextBuild: {
      status: 'NEXT ARCHITECTURAL MOVE',
      title: 'Adaptive Feedback Fine-Tuning',
      body: [
        'Right now, user edits to AI-generated questions or PoC steps are logged, but they are not yet fed back into the generation system.',
        'The next move is a feedback loop layer that treats upvotes, downvotes, and edits as few-shot examples for future prompts and workflow decisions.',
        'That would create a self-optimizing agent that learns the team’s technical preferences and organizational voice over time, pushing the system toward zero-edit deliverable generation.',
      ],
    },
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
