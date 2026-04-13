import React, { useEffect, useState } from 'react';
import { useLens } from '@/context/LensContext';
import { motion } from 'framer-motion';
import TextType from './TextType';
import { SectionContinueCue } from './SectionContinueCue';
import { getHeroCommentary } from '@/data/content';
import { useSiteContent } from '@/data/siteContent';

const HERO_TYPING_STORAGE_KEY = 'heroTypingCompleted';

export function HeroSection() {
  const { setIsTyping, setActiveHoverLog } = useLens();
  const { siteContent } = useSiteContent();
  const { hero, ui } = siteContent;
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
    <section
      id="hero"
      className="w-full max-w-4xl mx-auto pt-16 pb-20 px-8 lg:pl-16 relative z-10 min-h-[70vh] flex flex-col justify-center"
      onMouseEnter={() => setActiveHoverLog(getHeroCommentary())}
      onMouseLeave={() => setActiveHoverLog(null)}
    >

      <div className="relative">
        <motion.div
          key="hero"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h1
            className="mb-8 text-3xl font-bold leading-tight tracking-tight text-gray-100 md:text-5xl font-mono"
            onMouseEnter={() => setActiveHoverLog(getHeroCommentary('headline'))}
          >
            Hi, I'm <span className="text-[#22D3EE]">{hero.name}</span>
            {shouldType ? (
              <TextType
                text={hero.introSuffix}
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
              <span>{hero.introSuffix}</span>
            )}
          </h1>
          <p
            className="max-w-3xl font-mono text-lg leading-relaxed text-gray-400"
            onMouseEnter={() => setActiveHoverLog(getHeroCommentary('supporting'))}
          >
            {hero.supporting}
          </p>
        </motion.div>
      </div>

      <SectionContinueCue
        targetId="about"
        chapter={ui.continueCue.heroToAbout.chapter}
        title={ui.continueCue.heroToAbout.title}
      />

    </section>
  );
}
