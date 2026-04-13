import React from 'react';
import { ProjectTile } from './ProjectTile';
import { Bot, LineChart, Code2, Users } from 'lucide-react';

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto py-32 px-4 xl:pl-48">
      {/* Introduction Block (Spans 2 columns) */}
      <div className="col-span-1 md:col-span-2 text-center md:text-left mb-12">
        <h1 className="text-5xl font-black mb-4">Deekshith</h1>
        <p className="text-xl text-twin-accent font-mono mb-8">Twin.V1 // Mode: Operational</p>
      </div>

      <ProjectTile
        id="sakhi"
        title="Sakhi (Healthcare)"
        lensData="Hybrid routing engine, semantic embeddings (SLM vs GPT), Supabase RAG, FastAPI microservices."
        icon={<Bot />}
        className="md:col-span-2"
      />
      
      <ProjectTile
        id="navigator"
        title="Thread Navigator"
        lensData="Context Teleportation Protocol, DOM tree parsing, Chrome Storage API relay logic."
        icon={<Code2 />}
      />

      <ProjectTile
        id="leadership"
        title="Pre-Sales Co-Pilot & Ops"
        lensData="React Generative UI, RAG engine, relational and semantic schemas (PostgreSQL + VectorDB). 'Plan-Flow-Reflect' workflow."
        icon={<Users />}
      />

      <ProjectTile
        id="rigor"
        title="Technical Rigor"
        lensData="8.75 CGPA. 650+ LeetCode problems. Graph traversals, DP optimizations, System Design patterns."
        icon={<LineChart />}
        className="md:col-span-2"
      />
    </div>
  );
}
