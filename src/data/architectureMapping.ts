export type DiagramNode = {
  id: string;
  label: string;
  type: string;
};

export type ProjectNode = {
  id: string;
  title: string;
  domainAura: 'aura-medical' | 'aura-logic' | 'aura-gold' | 'aura-rigor';
  strategistLens: {
    roiHeadline: string;
    businessImpact: string[];
    visualType: 'MetricsChart' | 'ValueFlow' | 'Funnel' | 'NetworkMap';
    strategistLog: string;
  };
  architectLens: {
    systemHeadline: string;
    technicalStack: string[];
    diagramNodes: DiagramNode[];
  };
  commentaryLogs: Record<string, string>;
};

export const architectureData: Record<string, ProjectNode> = {
  sakhi: {
    id: 'sakhi',
    title: 'Sakhi',
    domainAura: 'aura-medical',
    strategistLens: {
      roiHeadline: 'Scaled Expert Medical Triage',
      businessImpact: [
        'Thousands of concurrent WhatsApp sessions',
        'Zero compromise on patient privacy',
        'No HIPAA-violating cloud transfers'
      ],
      visualType: 'Funnel',
      strategistLog: '[STRATEGY]: Scaled expert medical triage to handle thousands of concurrent WhatsApp sessions without compromising patient privacy or requiring HIPAA-violating cloud data transfers.'
    },
    architectLens: {
      systemHeadline: 'Hybrid Routing Engine',
      technicalStack: ['Zero-Trust Gateway', 'Local SLM', 'GPT-4 API (PII Scrubbed)'],
      diagramNodes: [
        { id: 'query', label: 'User Query', type: 'input' },
        { id: 'gate', label: 'Zero-Trust Gate', type: 'router' },
        { id: 'slm', label: 'Local SLM (Confidence > 90%)', type: 'processor' },
        { id: 'api', label: 'GPT-4 API (< 90%)', type: 'processor' }
      ]
    },
    commentaryLogs: {
      default: '[SYSTEM LOG]: Implemented Zero-Trust Auditor. In healthcare, hallucination is a liability. By routing high-confidence queries to an SLM, we reduced API costs by 40% and latency by 600ms while maintaining clinical safety.',
      gate: '[AUDITOR ALERT]: The Zero-Trust gateway intercepts every incoming request, calculating a deterministic confidence score before assigning a route. Probabilistic variance is explicitly denied at this layer.',
      slm: '[LOCAL COMPUTE]: 84% of queries hit the Local SLM. Completely isolated from the cloud, eliminating HIPAA risks. Inference latency reduced strictly to local VRAM bandwidth.',
      api: '[EXTERNAL CALL]: Queries requiring broad parametric knowledge fall back to GPT-4 API, but only after strict PII scrubbing. Fallback rate is intentionally capped at ~16%.'
    }
  },
  navigator: {
    id: 'navigator',
    title: 'Thread Navigator',
    domainAura: 'aura-logic',
    strategistLens: {
      roiHeadline: 'Universal Prompt Portability',
      businessImpact: [
        'Eliminated the "Copy-Paste Tax" for power users',
        'Unified workflows across isolated LLMs',
        '60+ active users with high retention'
      ],
      visualType: 'MetricsChart',
      strategistLog: '[STRATEGY]: Eliminated the "Copy-Paste Tax" for power users. Created a universal prompt library that unified workflows across isolated corporate LLM environments.'
    },
    architectLens: {
      systemHeadline: 'Context Teleportation Protocol',
      technicalStack: ['DOM Extractor', 'Chrome Storage API', 'Injection Engine'],
      diagramNodes: [
        { id: 'dom', label: 'DOM Tree Extraction', type: 'input' },
        { id: 'relay', label: 'Storage API Relay', type: 'router' },
        { id: 'inject', label: 'Target LLM Injection', type: 'processor' }
      ]
    },
    commentaryLogs: {
      default: '[SYSTEM LOG]: Solved Context Fragmentation. Standard APIs weren\'t an option across competitor LLMs. Engineered a DOM-level teleportation protocol to universally sync thread state entirely client-side.',
      dom: '[EXTRACTION]: The DOM Extractor bypasses explicit API limits by parsing the raw markup of the active LLM conversation. It builds a localized, universal abstraction tree of the thread context.',
      relay: '[RELAY]: The Chrome Storage API acts as our stateless memory bus. We decouple the active context from the host site constraints, ensuring cross-origin thread persistence.',
      inject: '[INJECTION]: The Injection Engine hydrates the target LLM input interface directly. It reconstitutes the stored context tree into actionable prompts, automating the user\'s physical copy-paste cycle.'
    }
  },
  presales: {
    id: 'presales',
    title: 'Pre-Sales Co-Pilot',
    domainAura: 'aura-gold',
    strategistLens: {
      roiHeadline: 'Automated Sales Workflows',
      businessImpact: [
        'Automated RFP document digestion',
        'Generated context-aware bid responses',
        'Reduced preparation time by hours'
      ],
      visualType: 'ValueFlow',
      strategistLog: '[STRATEGY]: Automated the enterprise sales workflow. Ingests massive, unstructured client documents and generates context-aware bid responses, reducing pre-sales prep time by hours.'
    },
    architectLens: {
      systemHeadline: 'Dual-Schema RAG Engine',
      technicalStack: ['PostgreSQL (Relational)', 'VectorDB (Semantic)', 'React GenUI'],
      diagramNodes: [
        { id: 'pg', label: 'PostgreSQL DB', type: 'database' },
        { id: 'vector', label: 'VectorDB RAG', type: 'database' },
        { id: 'ui', label: 'React Gen-UI', type: 'output' }
      ]
    },
    commentaryLogs: {
      default: '[SYSTEM LOG]: Built a dual-schema RAG engine. Relational data handles the strict enterprise logic (client IDs, pricing), while the VectorDB handles the semantic search (RFP requirements), merged at the UI level.',
      pg: '[RELATIONAL]: Strict enterprise logic demands strict schema. PostgreSQL guarantees ACID compliance for non-negotiable metadata like client IDs, historical pricing tiers, and SLA commitments.',
      vector: '[SEMANTIC]: The VectorDB creates a parametric mapping of all historical RFPs. It allows sales engineers to query past successful proposals using conceptual overlaps rather than keyword matching.',
      ui: '[GENERATIVE UI]: Data from dual sources is merged client-side. The UI dynamically renders custom components based on the incoming JSON payload rather than pure text, enabling interactive bid tuning.'
    }
  },
  unicolab: {
    id: 'unicolab',
    title: 'UniColab',
    domainAura: 'aura-rigor',
    strategistLens: {
      roiHeadline: 'Instant Group Collaboration',
      businessImpact: [
        'Replaced fragmented legacy tools',
        'Centralized organizational communication',
        'Aligned over 1000+ targeted students'
      ],
      visualType: 'NetworkMap',
      strategistLog: '[STRATEGY]: Centralized organizational communication, providing a unified, real-time collaboration hub that replaced fragmented legacy communication tools for over a thousand students.'
    },
    architectLens: {
      systemHeadline: 'Distributed Concurrency',
      technicalStack: ['Socket.io Listeners', 'Multiple Node.js Instances', 'Event-Driven Bus'],
      diagramNodes: [
        { id: 'clients', label: 'Client Nodes (1000+)', type: 'input' },
        { id: 'sockets', label: 'Socket.io Cluster', type: 'router' },
        { id: 'nodes', label: 'Distributed Node.js', type: 'processor' }
      ]
    },
    commentaryLogs: {
      default: '[SYSTEM LOG]: Engineered for concurrency. Shifted from REST polling to a WebSocket event-driven architecture to guarantee real-time sync across 1000+ distributed clients.',
      clients: '[CLIENT LAYER]: Managing 1000+ concurrent clients required dropping standard HTTP polling. We enforce strict WebSocket connection states at the client to ensure immediate data synchronization.',
      sockets: '[EVENT BUS]: The Socket.io cluster acts as the central nervous system. Using a pub/sub mechanism, it immediately broadcasts state changes to relevant organizational rooms without flooding global state.',
      nodes: '[DISTRIBUTED BACKEND]: Workloads are stateless and spread across multiple Node.js instances. The architecture specifically avoids lock contention, allowing scaling strictly based on event volume.'
    }
  }
};
