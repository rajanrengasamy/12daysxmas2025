"use client";

import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";

export function SoundToggle() {
  const { state, dispatch } = useApp();

  return (
    <motion.button
      onClick={() => dispatch({ type: "TOGGLE_MUTE" })}
      className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 focus-ring"
      style={{
        background: state.isMuted
          ? 'rgba(253, 248, 240, 0.1)'
          : 'rgba(253, 248, 240, 0.15)',
        border: '1px solid rgba(253, 248, 240, 0.1)',
        boxShadow: state.isMuted
          ? 'none'
          : '0 0 12px rgba(252, 211, 77, 0.15)'
      }}
      whileHover={{
        scale: 1.05,
        background: 'rgba(253, 248, 240, 0.2)',
        borderColor: 'rgba(253, 248, 240, 0.2)'
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={state.isMuted ? "Unmute audio" : "Mute audio"}
      aria-pressed={state.isMuted}
    >
      {state.isMuted ? (
        <VolumeX className="w-5 h-5 text-paper-400/60" />
      ) : (
        <Volume2 className="w-5 h-5 text-candle-400" />
      )}
    </motion.button>
  );
}
