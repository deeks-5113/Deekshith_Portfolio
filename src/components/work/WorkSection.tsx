import React from 'react';
import { StickyScrollStack } from './StickyScrollStack';
import { useLens } from '@/context/LensContext';

export function WorkSection() {
  const { isTyping } = useLens();

  if (isTyping) return null;

  return (
    <section
      id="projects"
      className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:pl-16 relative z-10 min-h-screen disable-scrollbars py-20"
    >
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-bold font-mono tracking-tight text-white text-center md:text-left">
          <span className="text-[#A1A1AA]">Projects</span>
        </h2>
        <p className="mt-4 max-w-3xl text-sm md:text-base text-gray-400 font-mono leading-relaxed text-center md:text-left">
          Scroll through the stack to move project by project. Each card stays pinned while the next one layers over it.
        </p>
      </div>

      <StickyScrollStack />
    </section>
  );
}
