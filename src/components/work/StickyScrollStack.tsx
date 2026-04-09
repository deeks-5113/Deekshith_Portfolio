import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { ProjectCard, ProjectCardData } from './ProjectCard';

const projectsData: ProjectCardData[] = [
{
  id: 'thread-navigator',
  slug: 'thread-navigator',
  shortTitle: 'Thread Navigator',
  diagramKey: 'navigator',
  breadcrumbLabel: 'Thread Navigator',
  commentaryKey: 'navigator',
  title: 'Thread Navigator',
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
    metrics: '60+ Active Power Users · Zero Backend Dependency',
    description: 'Power users switching between ChatGPT, Gemini, and Perplexity were losing reasoning continuity every time. Thread Navigator unifies workflows with a reusable prompt library and one-click context transfer.',
  },
  architectLens: {
    headline: 'Context Teleportation Protocol — DOM-Level, Zero Server',
    metrics: '100% Local Privacy · Chrome Storage Relay',
    description: 'Parses platform-specific DOM trees, compiles selected Q&A pairs into clean Markdown, and auto-injects into any target LLM via Chrome Storage relay with clipboard fallback. No API. No server. No permissions beyond Chrome.',
  },
  commentaryLogs: {
    // Triggers when hovering anywhere on the card
    'overall': "I built this to solve the 'context tax.' It’s an engineering bridge between isolated LLMs, ensuring reasoning moves as fast as you do, with total privacy baked into the architecture.",
    // The 4 Specific Architecture Signals
    'Context Teleportation Protocol': "Copying is easy; preserving reasoning is hard. This protocol packages intent into a 'context packet' for instant injection. It eliminates the tax of switching models.",
    'Zero-Server Architecture': "Data leakage kills adoption. I built this with 0 backend. Everything lives in Chrome storage—no DBs, no APIs. 100% privacy is why 60+ engineers trusted it on day one.",
    'Cross-Platform DOM Interoperability': "Walled gardens lack APIs, so I used the DOM. My parser navigates HTML trees to extract reasoning threads across platforms. It turns structured chaos into portable context.",
    'Client-Side Execution Only': "Local execution removes latency and infra overhead. By leveraging Chrome's runtime, the tool scales infinitely with zero operational costs or data risks. It’s pure, efficient logic.",
  },
  summary: '',
  theme: {
    primary: '#7C3AED',
    secondary: '#22D3EE',
    tertiary: '#4F46E5',
    accent: '#C084FC',
    hud: '#67E8F9',
    ringPalette: ['#7C3AED', '#22D3EE', '#4F46E5', '#C084FC'],
    particleStyle: 'dom-thread',
  },
  telemetry: [],
  deepDiveSections: []
},
{
  id: 'sakhi',
  slug: 'sakhi',
  shortTitle: 'Sakhi',
  diagramKey: 'sakhi',
  breadcrumbLabel: 'Sakhi',
  commentaryKey: 'sakhi',
  title: 'Sakhi — Zero-Trust Clinical AI Agent',
  domainAura: 'aura-medical',
  tags: ['FastAPI', 'Hybrid HRAG', 'Composite Embeddings', 'SSE Streaming', 'PostgreSQL', 'Confidence Gates'],
  architectPanelItems: [
    '4-Layer Hallucination Shield',
    'Confidence-Gated Hybrid Routing',
    'Self-Improving Knowledge Flywheel',
    'Stream Abort on Drift Detection',
  ],
  strategistLens: {
    headline: 'Clinical-Grade AI That Scales Expert Judgment — Not Just Answers',
    metrics: 'Functional 0% Hallucination Target',
    description: 'Deploys on WhatsApp to intercept high volumes of routine medical queries with verified, source-grounded responses. Every failure is logged, analyzed, and fed back into the knowledge base. The system gets safer as it fails.',
  },
  architectLens: {
    headline: '4-Layer Zero-Trust Medical Reasoning Engine',
    metrics: '<2s Latency · 100% Guardrail Coverage · Functional 0% Hallucination',
    description: 'Four sequential safety layers — similarity scoring, confidence gating, Straightjacket prompting, and a mid-stream Entity Auditor — guarantee zero hallucination exposure before a single token reaches the user.',
  },
  commentaryLogs: {
    // Triggers when hovering anywhere on the card
    'overall': "Sakhi is a clinical reasoning engine. I built it for high-stakes medical triage, prioritizing deterministic safety over generative freedom with a rigorous zero-trust architecture.",

    // The 4 Specific Architecture Signals
    '4-Layer Hallucination Shield': "Most bots 'hope' LLMs stay on track. I built a stream-level auditor scanning tokens vs source. If it drifts, it aborts. Safety isn't a prompt; it's an architectural guarantee.",
    'Confidence-Gated Hybrid Routing': "Local SLMs handle routine queries for 600ms speeds and zero cloud exposure. Complex cases hit GPT-4 only after PII scrubbing. It’s the perfect balance of privacy and cost.",
    'Self-Improving Knowledge Flywheel': "Every blocked query is logged. Weekly, failures are ingested as new HRAG nodes with composite embeddings. The system doesn't just work; it self-heals and gets smarter.",
    'Stream Abort on Drift Detection': "I built a real-time auditor scanning tokens mid-generation. If a response drifts from verified medical sources, the stream kills the connection. Users never see a hallucination.",
  },
  summary: '',
  theme: {
    primary: '#14B8A6',
    secondary: '#22D3EE',
    tertiary: '#15803D',
    accent: '#99F6E4',
    hud: '#67E8F9',
    ringPalette: ['#14B8A6', '#22D3EE', '#15803D', '#99F6E4'],
    particleStyle: 'neural-node',
  },
  telemetry: [],
  deepDiveSections: []
},
{
  id: 'presales',
  slug: 'presales',
  shortTitle: 'Pre-Sales Co-Pilot',
  diagramKey: 'presales',
  breadcrumbLabel: 'Pre-Sales',
  commentaryKey: 'presales',
  title: 'Autonomous Pre-Sales Co-Pilot',
  domainAura: 'aura-gold',
  tags: ['FastAPI', 'PostgreSQL', 'VectorDB', 'React GenUI', 'n8n', 'LangChain', 'Whisper API'],
  architectPanelItems: [
    'Dual-Schema RAG Engine',
    'Multi-Agent Orchestration (n8n)',
    '15-Minute Automated Workflow',
    'Webhook-Triggered Automation Pipeline',
  ],
  strategistLens: {
    headline: 'Turned a 3-Day Sales Prep Cycle Into a 15-Minute Automated Workflow',
    metrics: 'Discovery -> PoC -> Client Deck in One Session',
    description: 'Pre-sales teams were burning hours on research, note-taking, and deck building. This agent ingests a client name, runs the full discovery-to-delivery pipeline, and ships a branded PoV deck - autonomously.',
  },
  architectLens: {
    headline: 'Multi-Agent Pipeline: Enrich -> Transcribe -> Reason -> Deliver',
    metrics: 'ACID Integrity · Semantic Retrieval · STT Fallback Chain',
    description: 'Four chained agents handle client enrichment (Clearbit/SerpAPI), call transcription (Whisper -> AssemblyAI fallback), LLM reasoning (GPT-4 + confidence gating), and visual deck generation (Figma API). PostgreSQL owns relational state. VectorDB handles semantic RFP search. n8n orchestrates every handoff.',
  },
  commentaryLogs: {
    // Triggers when hovering anywhere on the card
    'overall': "This co-pilot is about collapsing time. I architected an autonomous pipeline that moves from raw research to final client decks in minutes, removing the human bottleneck in enterprise sales.",

    // The 4 Specific Architecture Signals
    'Dual-Schema RAG Engine': "RFPs mix facts and narratives. I use PostgreSQL for ACID pricing and VectorDB for semantic search. They merge at the UI to deliver a coherent, factually grounded draft.",
    'Multi-Agent Orchestration (n8n)': "I traded 'god-scripts' for a 4-agent pipeline via n8n for state visibility. If enrichment fails, the STT agent still proceeds. It’s modular, fault-tolerant automation.",
    '15-Minute Automated Workflow': "I killed the 3-day prep cycle. By chaining discovery transcription to branded Figma deck generation, I turned a manual slog into a 15-minute autonomous pipeline. It's about sales velocity.",
    'Webhook-Triggered Automation Pipeline': "I built this to be reactive. Webhooks bridge external tools—Clearbit, Whisper, Figma—into a unified flow. It isn’t just a tool; it’s an integrated ecosystem for pre-sales operations.",
  },
  summary: '',
  theme: {
    primary: '#F59E0B',
    secondary: '#6366F1',
    tertiary: '#FCD34D',
    accent: '#FDE68A',
    hud: '#FDE68A',
    ringPalette: ['#F59E0B', '#6366F1', '#FCD34D', '#FDE68A'],
    particleStyle: 'funnel-flow',
  },
  telemetry: [],
  deepDiveSections: []
},
];

export function StickyScrollStack() {
  return (
    <ScrollStack
      itemDistance={72}
      itemScale={0.03}
      itemStackDistance={20}
      stackPosition="18%"
      scaleEndPosition="12%"
      baseScale={0.91}
      className="relative w-full"
    >
      {projectsData.map((project) => (
        <ScrollStackItem key={project.id} itemClassName="mx-auto flex justify-center">
          <ProjectCard data={project} />
        </ScrollStackItem>
      ))}
    </ScrollStack>
  );
}
