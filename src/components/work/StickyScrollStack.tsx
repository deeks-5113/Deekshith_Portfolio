import React from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import { ProjectCard, ProjectCardData } from './ProjectCard';

const projectsData: ProjectCardData[] = [
  {
    id: 'thread-navigator',
    title: 'Thread Navigator',
    domainAura: 'aura-logic',
    tags: ['JavaScript', 'Chrome Storage API', 'DOM Manipulation'],
    strategistLens: {
      headline: 'Universal Context Transfer & Workflow Unification',
      metrics: '60+ Active Power Users',
      description:
        "Solved 'Context Fragmentation' across isolated LLM platforms (ChatGPT, Gemini, Perplexity). Designed a unified prompt library and drag-and-drop workflow that eliminates the copy-paste tax and accelerates enterprise AI utilization.",
    },
    architectLens: {
      headline: 'Context Teleportation Protocol & Client-Side State',
      metrics: '100% Local Privacy',
      description:
        'Engineered a cross-platform protocol that parses platform-specific DOM trees and auto-injects context into target LLMs. Built entirely client-side using the Chrome Storage API relay and clipboard fallbacks to ensure zero data leakage.',
    },
  },
  {
    id: 'sakhi',
    title: 'Sakhi Healthcare Triage',
    domainAura: 'aura-medical',
    tags: ['WhatsApp API', 'Zero-Trust Gateway', 'Local SLM'],
    strategistLens: {
      headline: 'Scaled Expert Medical Triage to Thousands',
      metrics: '84% Automated Load',
      description:
        'Deployed conversational AI to WhatsApp, intercepting massive volumes of routine inquiries and freeing physicians for critical diagnostics - scaling expert care without hiring.',
    },
    architectLens: {
      headline: 'Deterministic Hybrid Routing Engine',
      metrics: 'HIPAA Compliant by Design',
      description:
        'A Zero-Trust Auditor scores every incoming request before routing. High-confidence queries are handled by a fully isolated Local SLM, bypassing cloud infrastructure entirely to guarantee zero PII exposure.',
    },
  },
  {
    id: 'presales',
    title: 'Pre-Sales GenAI Co-Pilot',
    domainAura: 'aura-gold',
    tags: ['PostgreSQL', 'VectorDB', 'React GenUI', 'RAG'],
    strategistLens: {
      headline: 'Automated Enterprise Sales Workflows',
      metrics: 'Hours Saved Per Bid',
      description:
        'Instantly parses massive, unstructured RFP documents and assembles highly accurate, context-aware bid responses - transforming a multi-day process into minutes.',
    },
    architectLens: {
      headline: 'Dual-Schema RAG Architecture',
      metrics: 'ACID + Semantic Retrieval',
      description:
        'Relational constraints (PostgreSQL, ACID) handle strict enterprise metadata. A VectorDB layer applies semantic search across historical RFPs. The React GenUI merges both schemas into dynamic, interactive bid forms.',
    },
  },
];

export function StickyScrollStack() {
  return (
    <ScrollStack
      itemDistance={88}
      itemScale={0.03}
      itemStackDistance={24}
      stackPosition="16%"
      scaleEndPosition="8%"
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
