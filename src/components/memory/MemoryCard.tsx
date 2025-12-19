"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { SceneBackground } from "./SceneBackground";
import { PhotoFrame } from "./PhotoFrame";
import { PoemDisplay } from "./PoemDisplay";
import { useApp } from "@/context/AppContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useAudio } from "@/hooks/useAudio";
import doorsData from "@/data/doors.json";

// Custom variants for the paper-unfold effect
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 300,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export function MemoryCard() {
  const { state, dispatch } = useApp();
  const prefersReducedMotion = useReducedMotion();
  const { play, stop } = useAudio();
  const variants = prefersReducedMotion ? reducedMotionVariants : modalVariants;

  const activeDoor = state.activeDoorId
    ? doorsData.doors.find((d) => d.id === state.activeDoorId)
    : null;

  const handleClose = useCallback(() => {
    stop();
    dispatch({ type: "CLOSE_CARD" });
  }, [dispatch, stop]);

  // Play audio when card opens
  useEffect(() => {
    if (activeDoor && !state.isMuted) {
      play(activeDoor.audioId);
    }
    return () => {
      stop();
    };
  }, [activeDoor, state.isMuted, play, stop]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && state.activeDoorId) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.activeDoorId, handleClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (state.activeDoorId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.activeDoorId]);

  return (
    <AnimatePresence>
      {activeDoor && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop with blur */}
          <motion.div
            className="absolute inset-0"
            onClick={handleClose}
            initial={{ backdropFilter: 'blur(0px)' }}
            animate={{ backdropFilter: 'blur(8px)' }}
            exit={{ backdropFilter: 'blur(0px)' }}
            style={{ background: 'rgba(10, 15, 26, 0.85)' }}
          />

          {/* Floating snowflakes in backdrop */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                initial={{
                  x: `${Math.random() * 100}vw`,
                  y: -10,
                  opacity: 0.3 + Math.random() * 0.4,
                }}
                animate={{
                  y: '110vh',
                  x: `${Math.random() * 100}vw`,
                }}
                transition={{
                  duration: 8 + Math.random() * 8,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: 'linear',
                }}
                style={{
                  width: 2 + Math.random() * 3,
                  height: 2 + Math.random() * 3,
                }}
              />
            ))}
          </div>

          {/* Modal content */}
          <motion.div
            className="relative w-full max-w-[520px] lg:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-2xl"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="memory-title"
            style={{
              boxShadow: `
                0 0 0 1px rgba(253, 248, 240, 0.1),
                0 25px 50px -12px rgba(0, 0, 0, 0.5),
                0 0 100px rgba(252, 211, 77, 0.1)
              `
            }}
          >
            {/* Scene background */}
            <SceneBackground sceneId={activeDoor.sceneId} />

            {/* Close button */}
            <motion.button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 focus-ring"
              style={{
                background: 'rgba(253, 248, 240, 0.9)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
              }}
              whileHover={{ scale: 1.05, background: 'rgba(253, 248, 240, 1)' }}
              whileTap={{ scale: 0.95 }}
              aria-label="Close memory card"
            >
              <X className="w-5 h-5 text-warm-800" />
            </motion.button>

            {/* Day badge */}
            <motion.div
              className="absolute top-4 left-4 z-20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div
                className="px-4 py-2 rounded-full font-display text-sm font-semibold"
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 41, 66, 0.9) 0%, rgba(74, 21, 35, 0.9) 100%)',
                  color: '#fcd34d',
                  boxShadow: '0 2px 8px rgba(74, 21, 35, 0.4)'
                }}
              >
                Day {activeDoor.id}
              </div>
            </motion.div>

            {/* Content */}
            <div className="relative z-[1] p-6 lg:p-8 pt-20 pb-10 flex flex-col items-center gap-6 lg:gap-8">
              {/* Title */}
              <motion.h2
                id="memory-title"
                className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-paper-100 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={{
                  textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 0 40px rgba(252, 211, 77, 0.15)'
                }}
              >
                {activeDoor.title}
              </motion.h2>

              {/* Photo */}
              <PhotoFrame
                imageUrl={activeDoor.imageUrl}
                alt={activeDoor.title}
                caption={activeDoor.caption}
              />

              {/* Decorative divider */}
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-candle-400/30" />
                <div className="w-2 h-2 rounded-full bg-candle-400/40" />
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-candle-400/30" />
              </motion.div>

              {/* Poem */}
              <PoemDisplay poem={activeDoor.poem} />
            </div>

            {/* Bottom glow */}
            <div
              className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(252, 211, 77, 0.05) 0%, transparent 100%)'
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
