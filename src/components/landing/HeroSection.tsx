"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

// Floating sparkle particle
const Sparkle = ({
  className,
  delay = 0,
  duration = 3
}: {
  className?: string;
  delay?: number;
  duration?: number;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0.5, 1, 0.5],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L13.5 9L22 10.5L13.5 12L12 21L10.5 12L2 10.5L10.5 9L12 0Z" />
    </svg>
  </motion.div>
);

// Decorative holly leaf
const HollyLeaf = ({ className, flip = false }: { className?: string; flip?: boolean }) => (
  <svg
    viewBox="0 0 60 40"
    className={className}
    style={{ transform: flip ? 'scaleX(-1)' : undefined }}
  >
    <ellipse cx="20" cy="20" rx="18" ry="10" fill="currentColor" transform="rotate(-30 20 20)" />
    <ellipse cx="38" cy="22" rx="16" ry="9" fill="currentColor" transform="rotate(20 38 22)" />
    <circle cx="8" cy="28" r="5" fill="#c2566a" />
    <circle cx="16" cy="32" r="4" fill="#a63d50" />
    <circle cx="6" cy="35" r="3" fill="#8b2942" />
  </svg>
);

// Paper-cut pine tree with more detail
const PineTree = ({
  className,
  delay = 0,
  variant = "default"
}: {
  className?: string;
  delay?: number;
  variant?: "default" | "slim" | "wide";
}) => {
  const paths = {
    default: "M50 8 L68 35 L60 35 L78 60 L65 60 L85 90 L15 90 L35 60 L22 60 L40 35 L32 35 Z",
    slim: "M50 5 L62 30 L55 30 L68 55 L58 55 L72 85 L28 85 L42 55 L32 55 L45 30 L38 30 Z",
    wide: "M50 10 L75 40 L65 40 L88 70 L72 70 L95 95 L5 95 L28 70 L12 70 L35 40 L25 40 Z"
  };

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
    >
      <path d={paths[variant]} fill="currentColor" />
      <rect x="42" y="88" width="16" height="12" fill="currentColor" opacity="0.7" />
    </motion.svg>
  );
};

// Small cabin silhouette
const Cabin = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.svg
    viewBox="0 0 80 60"
    className={className}
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
  >
    <path d="M40 8 L72 32 L72 55 L8 55 L8 32 Z" fill="currentColor" />
    <rect x="30" y="35" width="12" height="20" fill="#0f172a" opacity="0.7" />
    <rect x="50" y="38" width="10" height="10" fill="#fcd34d" opacity="0.35" />
    <rect x="14" y="38" width="10" height="10" fill="#fcd34d" opacity="0.25" />
    <path d="M62 20 L62 8 L70 8 L70 26" fill="currentColor" />
  </motion.svg>
);

export function HeroSection() {
  const { dispatch } = useApp();

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 lg:py-12 relative z-10 overflow-hidden">

      {/* Ambient glow - warm light from center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[900px] lg:h-[900px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(252, 211, 77, 0.08) 0%, rgba(252, 211, 77, 0.03) 30%, transparent 70%)',
        }}
      />

      {/* Floating sparkles */}
      <Sparkle className="absolute top-[15%] left-[12%] text-candle-400/70" delay={0} duration={4} />
      <Sparkle className="absolute top-[25%] right-[18%] text-candle-300/50" delay={1.2} duration={3.5} />
      <Sparkle className="absolute top-[10%] right-[28%] text-paper-200/40" delay={0.8} duration={4.5} />
      <Sparkle className="absolute top-[35%] left-[22%] text-candle-400/60" delay={2} duration={3} />
      <Sparkle className="absolute top-[8%] left-[35%] text-candle-300/40" delay={1.5} duration={5} />
      <Sparkle className="absolute top-[20%] right-[10%] text-paper-300/30" delay={0.5} duration={4} />
      <Sparkle className="absolute top-[40%] right-[25%] text-candle-400/50" delay={2.5} duration={3.5} />

      {/* Main content container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative max-w-2xl lg:max-w-3xl mx-auto text-center"
      >
        {/* The massive "12" background element */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] pointer-events-none select-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span
            className="font-display text-[180px] sm:text-[240px] md:text-[300px] lg:text-[380px] font-bold leading-none"
            style={{
              background: 'linear-gradient(180deg, rgba(252, 211, 77, 0.12) 0%, rgba(252, 211, 77, 0.04) 50%, transparent 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            12
          </span>
        </motion.div>

        {/* Decorative frame - top holly */}
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <HollyLeaf className="w-12 h-8 text-forest-600" flip />
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-candle-400/40 to-transparent" />
          <motion.div
            className="w-3 h-3 rounded-full bg-candle-400"
            animate={{
              boxShadow: [
                '0 0 10px rgba(252, 211, 77, 0.4)',
                '0 0 20px rgba(252, 211, 77, 0.6)',
                '0 0 10px rgba(252, 211, 77, 0.4)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-candle-400/40 to-transparent" />
          <HollyLeaf className="w-12 h-8 text-forest-600" />
        </motion.div>

        {/* Main text content */}
        <div className="relative z-10 pt-12 pb-8">
          {/* "Days of" - elegant script-like appearance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-2"
          >
            <span
              className="font-display text-lg sm:text-xl md:text-2xl tracking-[0.3em] uppercase text-candle-400/80"
              style={{ textShadow: '0 0 30px rgba(252, 211, 77, 0.3)' }}
            >
              Twelve Days of
            </span>
          </motion.div>

          {/* "Memories" - the hero word */}
          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <span
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-paper-100 tracking-tight"
              style={{
                textShadow: '0 4px 30px rgba(0,0,0,0.5), 0 0 60px rgba(252, 211, 77, 0.15)'
              }}
            >
              Memories
            </span>
            {/* Decorative underline */}
            <motion.div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-candle-400/60 to-transparent"
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              transition={{ duration: 0.8, delay: 1.2 }}
            />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 text-base sm:text-lg md:text-xl text-paper-300/80 max-w-md mx-auto leading-relaxed font-body"
          >
            A festive journey through our year together.
            <br className="hidden sm:block" />
            <span className="text-paper-400/70">Open each door to discover cherished moments.</span>
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-10"
          >
            <button
              onClick={() => dispatch({ type: "START_EXPERIENCE" })}
              className="group relative px-10 py-4 sm:px-12 sm:py-5 overflow-hidden rounded-full font-display text-lg sm:text-xl tracking-wide transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(139, 41, 66, 0.9) 0%, rgba(109, 31, 51, 0.95) 100%)',
                boxShadow: '0 4px 20px rgba(139, 41, 66, 0.4), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -2px 0 rgba(0,0,0,0.2)'
              }}
            >
              {/* Hover glow effect */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(252, 211, 77, 0.15) 0%, transparent 70%)'
                }}
              />
              {/* Shimmer effect */}
              <span
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)'
                }}
              />
              <span className="relative text-paper-100 drop-shadow-md">
                Begin the Journey
              </span>
            </button>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-12 flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-widest uppercase text-paper-400/50">
              12 Doors Await
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border border-paper-400/30 flex items-start justify-center p-1"
            >
              <motion.div
                className="w-1 h-2 rounded-full bg-candle-400/60"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Paper-cut landscape - layered diorama effect */}
      <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-44 md:h-52 lg:h-64 pointer-events-none overflow-hidden">

        {/* Far mountains - most distant, darkest */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.4, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-full"
          style={{
            clipPath: 'polygon(0% 75%, 8% 60%, 18% 68%, 30% 50%, 42% 62%, 55% 45%, 68% 58%, 80% 42%, 92% 55%, 100% 48%, 100% 100%, 0% 100%)',
            background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.3) 0%, rgba(30, 41, 59, 0.5) 100%)'
          }}
        />

        {/* Mid hills */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute bottom-0 left-0 right-0 h-full"
          style={{
            clipPath: 'polygon(0% 80%, 12% 70%, 25% 78%, 38% 65%, 52% 72%, 65% 60%, 78% 70%, 88% 62%, 100% 72%, 100% 100%, 0% 100%)',
            background: 'linear-gradient(180deg, rgba(29, 73, 60, 0.4) 0%, rgba(20, 56, 48, 0.6) 100%)'
          }}
        />

        {/* Trees and buildings layer */}
        <div className="absolute bottom-0 left-0 right-0 h-full">
          <PineTree className="absolute left-[2%] bottom-2 w-10 h-14 sm:w-14 sm:h-20 text-forest-800/90" delay={0.5} variant="slim" />
          <PineTree className="absolute left-[10%] bottom-4 w-12 h-18 sm:w-16 sm:h-24 text-forest-700" delay={0.55} />
          <Cabin className="absolute left-[22%] bottom-3 w-14 h-10 sm:w-18 sm:h-14 text-paper-400/80" delay={0.6} />
          <PineTree className="absolute left-[35%] bottom-2 w-8 h-12 sm:w-10 sm:h-16 text-forest-800/70" delay={0.58} variant="slim" />

          <PineTree className="absolute right-[35%] bottom-3 w-10 h-14 sm:w-12 sm:h-18 text-forest-700/80" delay={0.52} variant="wide" />
          <PineTree className="absolute right-[22%] bottom-5 w-14 h-20 sm:w-18 sm:h-28 text-forest-800" delay={0.48} />
          <Cabin className="absolute right-[10%] bottom-4 w-12 h-9 sm:w-16 sm:h-12 text-paper-300/70" delay={0.62} />
          <PineTree className="absolute right-[2%] bottom-2 w-10 h-14 sm:w-12 sm:h-18 text-forest-700/90" delay={0.56} variant="slim" />
        </div>

        {/* Snow ground - closest layer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 md:h-20"
          style={{
            background: 'linear-gradient(180deg, rgba(253, 248, 240, 0.08) 0%, rgba(253, 248, 240, 0.15) 100%)',
            clipPath: 'polygon(0% 50%, 5% 40%, 12% 48%, 20% 35%, 30% 45%, 40% 32%, 50% 42%, 60% 30%, 70% 40%, 80% 35%, 90% 45%, 95% 38%, 100% 48%, 100% 100%, 0% 100%)'
          }}
        />

        {/* Foreground glow from "inside" */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(252, 211, 77, 0.06) 0%, transparent 60%)'
          }}
        />
      </div>
    </div>
  );
}
