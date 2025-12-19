"use client";

import { motion } from "framer-motion";

interface PoemDisplayProps {
  poem: string;
}

export function PoemDisplay({ poem }: PoemDisplayProps) {
  const lines = poem.split("\n");

  return (
    <motion.div
      className="text-center max-w-sm lg:max-w-md mx-auto relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      {/* Decorative quote mark */}
      <div
        className="absolute -top-6 left-1/2 -translate-x-1/2 font-display text-6xl text-candle-400/20"
        style={{ lineHeight: 1 }}
      >
        "
      </div>

      {/* Poem lines */}
      <div className="space-y-1">
        {lines.map((line, index) => (
          <motion.p
            key={index}
            className="font-poem text-lg md:text-xl lg:text-2xl leading-relaxed text-paper-100"
            style={{
              textShadow: '0 2px 8px rgba(0,0,0,0.5), 0 0 30px rgba(252, 211, 77, 0.1)'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
          >
            {line || <span className="block h-4" />}
          </motion.p>
        ))}
      </div>

      {/* Decorative flourish */}
      <motion.div
        className="mt-6 flex items-center justify-center gap-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-candle-400/40 to-transparent" />
        <svg className="w-4 h-4 text-candle-400/50" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
        </svg>
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-candle-400/40 to-transparent" />
      </motion.div>
    </motion.div>
  );
}
