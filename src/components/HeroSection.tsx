import React from 'react';
import { useLens } from '@/context/LensContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

export function HeroSection() {
  const { isArchitectMode } = useLens();

  return (
    <section className="w-full max-w-4xl mx-auto pt-16 pb-20 px-8 lg:pl-16 relative z-10 min-h-[70vh] flex flex-col justify-center">

      <div className="relative">
        <AnimatePresence mode="wait">
          {isArchitectMode ? (
            <motion.div
              key="architect"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-gray-100 font-mono tracking-tight">
                Hi, I'm <span className="text-[#22D3EE]">Deekshith</span> — Most AI products guess. Mine verify. I build agents that halt when uncertain, act when confident, and explain every decision in between.
              </h1>
              <p className="text-lg text-gray-400 font-mono leading-relaxed max-w-3xl">
                I move AI from probabilistic guessing to verified execution using the Plan-Flow-Reflect framework and hybrid routing engines.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="strategist"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-8 text-gray-100 tracking-tight">
                Hi, I'm <span className="text-[#A1A1AA]">Deekshith</span> — Your organization already has the expertise. It's trapped in documents, inboxes, and people's heads. I build the systems that set it free.
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed max-w-3xl">
                I help organizations scale their "Expert DNA" by transforming manual workflows into high-fidelity AI agents.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}
