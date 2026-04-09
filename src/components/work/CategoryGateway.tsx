import React from 'react';
import { motion } from 'framer-motion';

type Category = 'projects' | 'experience' | null;

interface CategoryGatewayProps {
  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;
}

export function CategoryGateway({ activeCategory, setActiveCategory }: CategoryGatewayProps) {
  const categories = [
    {
      id: 'projects' as const,
      title: 'Projects',
      glowColor: 'rgba(99, 102, 241, 0.2)', // Logic Indigo
      textColor: 'text-indigo-400',
    },
    {
      id: 'experience' as const,
      title: 'Work Experience',
      glowColor: 'rgba(245, 158, 11, 0.2)', // Ops Gold
      textColor: 'text-amber-500',
    }
  ];

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-12 py-12">
      {categories.map((cat) => {
        const isSelected = activeCategory === cat.id;
        const isDimmed = activeCategory !== null && !isSelected;

        return (
          <motion.div
            key={cat.id}
            initial={false}
            animate={{
              opacity: isDimmed ? 0.3 : 1,
              scale: isDimmed ? 0.9 : 1,
              width: isSelected ? '100%' : 'auto',
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={`relative flex-1 max-w-sm ${isSelected ? 'md:max-w-none' : ''}`}
          >
            {/* The Folder Group */}
            <motion.button
              onClick={() => setActiveCategory(cat.id)}
              className="relative w-full h-48 sm:h-64 rounded-xl cursor-pointer outline-none group flex items-center justify-center perspective-1000"
              whileHover="hover"
            >
              {/* Ghost Card 2 */}
              <motion.div
                variants={{
                  hover: { rotate: -6, x: -20, y: 10, opacity: 0.7 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute inset-0 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl shadow-lg z-0"
              />
              
              {/* Ghost Card 1 */}
              <motion.div
                variants={{
                  hover: { rotate: 5, x: 20, y: 5, opacity: 0.85 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute inset-0 bg-[#0B0B0B] border border-[#1A1A1A] rounded-xl shadow-lg z-10"
              />

              {/* Main Folder Cover */}
              <motion.div
                variants={{
                  hover: { 
                    y: -5,
                    boxShadow: `0 20px 40px -10px ${cat.glowColor}`
                  }
                }}
                className="absolute inset-0 bg-[#0D0D0D] border border-[#1A1A1A] rounded-xl shadow-xl z-20 flex items-center justify-center overflow-hidden transition-colors"
              >
                <h3 className={`text-2xl font-bold font-mono tracking-widest ${cat.textColor}`}>
                  [{cat.title.toUpperCase()}]
                </h3>
              </motion.div>
            </motion.button>
          </motion.div>
        );
      })}
    </div>
  );
}
