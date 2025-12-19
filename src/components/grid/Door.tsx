"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Door as DoorType } from "@/types";

interface DoorProps {
  door: DoorType;
  isOpened: boolean;
  onOpen: () => void;
}

export function Door({ door, isOpened, onOpen }: DoorProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleClick = async () => {
    if (!prefersReducedMotion) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    onOpen();
  };

  // Alternate door colors for visual variety
  const doorColors = [
    { from: 'from-burgundy-600', to: 'to-burgundy-800', accent: 'burgundy' },
    { from: 'from-forest-600', to: 'to-forest-800', accent: 'forest' },
  ];
  const colorScheme = doorColors[(door.id - 1) % 2];

  return (
    <motion.button
      onClick={handleClick}
      className="relative aspect-square min-w-[88px] min-h-[88px] focus-ring group"
      whileHover={!prefersReducedMotion ? { scale: 1.03, y: -4 } : undefined}
      whileTap={!prefersReducedMotion ? { scale: 0.97, y: 0 } : undefined}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        delay: door.id * 0.06,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      aria-label={`Open door ${door.id}, ${door.title}`}
      aria-pressed={isOpened}
    >
      {/* Paper card shadow */}
      <div
        className="absolute inset-0 rounded-xl lg:rounded-2xl transition-all duration-300"
        style={{
          boxShadow: isOpened
            ? '0 2px 8px rgba(36, 31, 26, 0.15)'
            : '0 4px 20px rgba(36, 31, 26, 0.25), 0 8px 40px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(4px)'
        }}
      />

      {/* Main door card */}
      <div
        className={`
          absolute inset-0 rounded-xl lg:rounded-2xl overflow-hidden
          transition-all duration-300
          ${isOpened
            ? 'bg-gradient-to-br from-paper-200 to-paper-300'
            : `bg-gradient-to-br ${colorScheme.from} ${colorScheme.to}`
          }
        `}
        style={{
          boxShadow: isOpened
            ? 'inset 0 2px 4px rgba(0,0,0,0.1)'
            : 'inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -2px 8px rgba(0,0,0,0.2)'
        }}
      >
        {/* Paper texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            mixBlendMode: 'overlay'
          }}
        />

        {/* Decorative frame border */}
        {!isOpened && (
          <div
            className="absolute inset-2 rounded-lg border-2 opacity-20 pointer-events-none"
            style={{
              borderColor: 'rgba(252, 211, 77, 0.5)',
              borderStyle: 'double'
            }}
          />
        )}

        {/* Inner glow for unopened doors */}
        {!isOpened && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(252, 211, 77, 0.15) 0%, transparent 70%)'
            }}
          />
        )}

        {/* Door number or checkmark */}
        <div className="relative z-10 h-full flex items-center justify-center">
          {isOpened ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #3d6b5e 0%, #1d493c 100%)',
                boxShadow: '0 2px 8px rgba(29, 73, 60, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
              }}
            >
              <Check className="w-5 h-5 lg:w-6 lg:h-6 text-paper-100" strokeWidth={3} />
            </motion.div>
          ) : (
            <div className="relative">
              {/* Number shadow/depth */}
              <span
                className="absolute inset-0 font-display text-4xl lg:text-5xl font-bold text-black/20 blur-[1px]"
                style={{ transform: 'translate(2px, 2px)' }}
              >
                {door.id}
              </span>
              {/* Main number */}
              <span
                className="font-display text-4xl lg:text-5xl font-bold relative"
                style={{
                  color: '#fcd34d',
                  textShadow: '0 0 20px rgba(252, 211, 77, 0.4)'
                }}
              >
                {door.id}
              </span>
            </div>
          )}
        </div>

        {/* Corner decorations for unopened */}
        {!isOpened && (
          <>
            <div className="absolute top-3 left-3 w-3 h-3 opacity-40">
              <svg viewBox="0 0 12 12" fill="none">
                <path d="M0 0L12 0L12 2L2 2L2 12L0 12Z" fill="#fcd34d" />
              </svg>
            </div>
            <div className="absolute bottom-3 right-3 w-3 h-3 opacity-40 rotate-180">
              <svg viewBox="0 0 12 12" fill="none">
                <path d="M0 0L12 0L12 2L2 2L2 12L0 12Z" fill="#fcd34d" />
              </svg>
            </div>
          </>
        )}

        {/* Sparkle effects */}
        {!isOpened && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-candle-400"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-5 left-5 w-1 h-1 rounded-full bg-candle-300"
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.1, 0.8],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.7
              }}
            />
            <motion.div
              className="absolute top-1/2 right-5 w-1 h-1 rounded-full bg-paper-100"
              animate={{
                opacity: [0.1, 0.5, 0.1],
                scale: [0.9, 1.15, 0.9],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2
              }}
            />
          </div>
        )}
      </div>
    </motion.button>
  );
}
