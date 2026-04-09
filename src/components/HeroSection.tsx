import React, { useEffect, useState } from 'react';
import { useLens } from '@/context/LensContext';
import { motion, AnimatePresence } from 'framer-motion';
import TextType from './TextType';

const HERO_TYPING_STORAGE_KEY = 'heroTypingCompleted';

export function HeroSection() {
  const { isArchitectMode, setIsTyping } = useLens();
  const [shouldType, setShouldType] = useState(() => {
    if (typeof window === 'undefined') return true;

    try {
      return window.localStorage.getItem(HERO_TYPING_STORAGE_KEY) !== 'true';
    } catch {
      return true;
    }
  });

  const handleTypingComplete = () => {
    setIsTyping(false);
    setShouldType(false);
    try {
      window.localStorage.setItem(HERO_TYPING_STORAGE_KEY, 'true');
    } catch {
      // ignore storage failures
    }
  };

  useEffect(() => {
    setIsTyping(shouldType);
  }, [shouldType, setIsTyping]);

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
                Hi, I'm <span className="text-[#22D3EE]">Deekshith</span>
                {shouldType ? (
                  <TextType
                    text=" — Most AI products guess. Mine verify. I build agents that halt when uncertain, act when confident, and explain every decision in between."
                    as="span"
                    className=""
                    typingSpeed={50}
                    pauseDuration={0}
                    loop={false}
                    showCursor={true}
                    cursorCharacter="_"
                    cursorBlinkDuration={0.5}
                    onTypingComplete={handleTypingComplete}
                  />
                ) : (
                  <span> — Most AI products guess. Mine verify. I build agents that halt when uncertain, act when confident, and explain every decision in between.</span>
                )}
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
                Hi, I'm <span className="text-[#A1A1AA]">Deekshith</span>
                {shouldType ? (
                  <TextType
                    text=" — Your organization already has the expertise. It's trapped in documents, inboxes, and people's heads. I build the systems that set it free."
                    as="span"
                    className=""
                    typingSpeed={50}
                    pauseDuration={0}
                    loop={false}
                    showCursor={true}
                    cursorCharacter="_"
                    cursorBlinkDuration={0.5}
                    onTypingComplete={handleTypingComplete}
                  />
                ) : (
                  <span> — Your organization already has the expertise. It's trapped in documents, inboxes, and people's heads. I build the systems that set it free.</span>
                )}
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
