import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { ProjectCard } from './ProjectCard';
import { projectsData as sharedProjectsData } from '@/data/projects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const projectsData = [
{
  id: 'thread-navigator',
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
    description:
      'Power users switching between ChatGPT, Gemini, and Perplexity were losing reasoning continuity every time. Thread Navigator unifies workflows with a reusable prompt library and one-click context transfer.',
  },
  architectLens: {
    headline: 'Context Teleportation Protocol — DOM-Level, Zero Server',
    metrics: '100% Local Privacy · Chrome Storage Relay',
    description:
      'Parses platform-specific DOM trees, compiles selected Q&A pairs into clean Markdown, and auto-injects into any target LLM via Chrome Storage relay with clipboard fallback. No API. No server. No permissions beyond Chrome.',
  },
  commentaryLogs: {
    // Triggers when hovering anywhere on the card
    'overall': 
      "I built this to solve the 'context tax.' It's an engineering bridge between isolated LLMs, ensuring reasoning moves as fast as you do, with total privacy baked into the architecture.",
    
    // The 4 Specific Architecture Signals
    'Context Teleportation Protocol':
      "Copying is easy; preserving reasoning is hard. This protocol packages intent into a 'context packet' for instant injection. It eliminates the tax of switching models.",
    'Zero-Server Architecture':
      "Data leakage kills adoption. I built this with 0 backend. Everything lives in Chrome storage—no DBs, no APIs. 100% privacy is why 60+ engineers trusted it on day one.",
    'Cross-Platform DOM Interoperability':
      "Walled gardens lack APIs, so I used the DOM. My parser navigates HTML trees to extract reasoning threads across platforms. It turns structured chaos into portable context.",
    'Client-Side Execution Only':
      "Local execution removes latency and infra overhead. By leveraging Chrome's runtime, the tool scales infinitely with zero operational costs or data risks. It's pure, efficient logic.",
  },
},
{
  id: 'sakhi',
  commentaryKey: 'sakhi',
  title: 'Sakhi - Zero-Trust Clinical AI Agent',
  domainAura: 'aura-medical',
  tags: ['FastAPI', 'Hybrid HRAG', 'Composite Embeddings', 'SSE Streaming', 'PostgreSQL', 'Confidence Gates'],
  architectPanelItems: [
    '4-Layer Hallucination Shield',
    'Confidence-Gated Hybrid Routing',
    'Self-Improving Knowledge Flywheel',
    'Stream Abort on Drift Detection',
  ],
  strategistLens: {
    headline: 'Clinical-Grade AI That Scales Expert Judgment - Not Just Answers',
    metrics: 'Functional 0% Hallucination Target',
    description:
      'Deploys on WhatsApp to intercept high volumes of routine medical queries with verified, source-grounded responses. Every failure is logged, analyzed, and fed back into the knowledge base. The system gets safer as it fails.',
  },
  architectLens: {
    headline: '4-Layer Zero-Trust Medical Reasoning Engine',
    metrics: '<2s Latency · 100% Guardrail Coverage · Functional 0% Hallucination',
    description:
      'Four sequential safety layers - similarity scoring, confidence gating, Straightjacket prompting, and a mid-stream Entity Auditor - guarantee zero hallucination exposure before a single token reaches the user.',
  },
  commentaryLogs: {
    'overall':
      "Most healthcare copilots optimize for answers. I optimized for failure modes. Sakhi is a zero-trust clinical agent where every architectural layer exists to prevent unsafe reasoning from ever reaching the patient.",
    '4-Layer Hallucination Shield':
      "Most bots 'hope' LLMs stay on track. I built a stream-level auditor scanning tokens vs source. If it drifts, it aborts. Safety isn't a prompt; it's an architectural guarantee.",
    'Confidence-Gated Hybrid Routing':
      "Local SLMs handle routine queries for 600ms speeds and zero cloud exposure. Complex cases hit GPT-4 only after PII scrubbing. It’s the perfect balance of privacy and cost.",
    'Self-Improving Knowledge Flywheel':
      "Every blocked query is logged. Weekly, failures are ingested as new HRAG nodes with composite embeddings. The system doesn't just work; it self-heals and gets smarter.",
  },
},
{
  id: 'presales',
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
    description:
      'Pre-sales teams were burning hours on research, note-taking, and deck building. This agent ingests a client name, runs the full discovery-to-delivery pipeline, and ships a branded PoV deck - autonomously.',
  },
  architectLens: {
    headline: 'Multi-Agent Pipeline: Enrich -> Transcribe -> Reason -> Deliver',
    metrics: 'ACID Integrity · Semantic Retrieval · STT Fallback Chain',
    description:
      'Four chained agents handle client enrichment (Clearbit/SerpAPI), call transcription (Whisper -> AssemblyAI fallback), LLM reasoning (GPT-4 + confidence gating), and visual deck generation (Figma API). PostgreSQL owns relational state. VectorDB handles semantic RFP search. n8n orchestrates every handoff.',
  },
  commentaryLogs: {
    'overall':
      "This wasn't about making sales research nicer. It was about collapsing an entire pre-sales operating model into one autonomous pipeline, where enrichment, reasoning, and delivery happen as a single system.",
    'Multi-Agent Orchestration (n8n)':
      "I traded 'god-scripts' for a 4-agent pipeline via n8n for state visibility. If enrichment fails, the STT agent still proceeds. It’s modular, fault-tolerant automation.",
    'Dual-Schema RAG Engine':
      "Enterprise RFPs mix facts and narratives. I use PostgreSQL for ACID pricing and VectorDB for semantic search. They merge at the UI to deliver a coherent, factually grounded draft..",
    '15-Minute Automated Workflow':
      "I killed the 3-day prep cycle. By chaining discovery transcription to branded Figma deck generation, I turned a manual slog into a 15-minute autonomous pipeline. It’s a game-changer for sales velocity.",
  },
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
      {sharedProjectsData.map((project) => (
        <ScrollStackItem key={project.id} itemClassName="mx-auto flex justify-center">
          <ProjectCard data={project} />
        </ScrollStackItem>
      ))}
    </ScrollStack>
  );
}
