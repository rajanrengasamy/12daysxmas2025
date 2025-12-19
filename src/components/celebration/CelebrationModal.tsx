"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Confetti } from "./Confetti";
import { useApp } from "@/context/AppContext";

export function CelebrationModal() {
  const { state, dispatch } = useApp();

  const handleDismiss = () => {
    dispatch({ type: "DISMISS_CELEBRATION" });
  };

  return (
    <AnimatePresence>
      {state.showCelebration && (
        <>
          <Confetti />
          <motion.div
            className="fixed inset-0 z-[250] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{ background: 'rgba(10, 15, 26, 0.9)' }}
              onClick={handleDismiss}
              initial={{ backdropFilter: 'blur(0px)' }}
              animate={{ backdropFilter: 'blur(12px)' }}
            />

            {/* Modal content */}
            <motion.div
              className="relative max-w-md mx-4 text-center overflow-hidden rounded-2xl"
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              style={{
                background: 'linear-gradient(180deg, #fdf8f0 0%, #f5ebe0 50%, #e8dcc8 100%)',
                boxShadow: `
                  0 0 0 1px rgba(212, 165, 116, 0.3),
                  0 25px 50px -12px rgba(0, 0, 0, 0.5),
                  0 0 100px rgba(252, 211, 77, 0.2)
                `
              }}
            >
              {/* Paper texture overlay */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")",
                  mixBlendMode: 'multiply'
                }}
              />

              {/* Top decorative border */}
              <div
                className="h-2"
                style={{
                  background: 'linear-gradient(90deg, #8b2942 0%, #2d5a4d 50%, #8b2942 100%)'
                }}
              />

              <div className="p-8 lg:p-10">
                {/* Ornament decoration */}
                <motion.div
                  className="mx-auto mb-6 relative"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15 }}
                >
                  {/* Hanging string */}
                  <div className="absolute left-1/2 -top-8 w-px h-8 bg-gradient-to-b from-copper-400/30 to-copper-500" />

                  {/* Main ornament */}
                  <div
                    className="w-20 h-20 rounded-full mx-auto flex items-center justify-center relative"
                    style={{
                      background: 'radial-gradient(ellipse at 30% 30%, #c2566a 0%, #6d1f33 100%)',
                      boxShadow: '0 4px 20px rgba(109, 31, 51, 0.4), inset 0 -2px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)'
                    }}
                  >
                    {/* Shine */}
                    <div
                      className="absolute top-2 left-3 w-6 h-3 rounded-full bg-white opacity-20"
                      style={{ filter: 'blur(2px)' }}
                    />

                    {/* Star inside */}
                    <svg className="w-10 h-10 text-candle-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
                    </svg>

                    {/* Cap */}
                    <div
                      className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-5 h-3 rounded-t-md"
                      style={{
                        background: 'linear-gradient(180deg, #d4a574 0%, #a66b3d 100%)'
                      }}
                    />
                  </div>
                </motion.div>

                <motion.h2
                  className="font-display text-3xl lg:text-4xl font-bold text-warm-800 mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Merry Christmas!
                </motion.h2>

                <motion.p
                  className="text-warm-600 mb-8 text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Thank you for sharing these precious memories with us.
                  May your holidays be filled with love, laughter, and moments worth cherishing.
                </motion.p>

                {/* Decorative flourish */}
                <motion.div
                  className="flex items-center justify-center gap-3 mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-12 h-px bg-gradient-to-r from-transparent via-copper-500/50 to-transparent" />
                  <div className="w-2 h-2 rounded-full bg-burgundy-500/50" />
                  <div className="w-12 h-px bg-gradient-to-l from-transparent via-copper-500/50 to-transparent" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button onClick={handleDismiss} size="large" className="w-full">
                    Revisit Memories
                  </Button>
                </motion.div>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-6 h-6 opacity-20">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M0 0L24 0L24 4L4 4L4 24L0 24Z" fill="#8b2942" />
                </svg>
              </div>
              <div className="absolute top-4 right-4 w-6 h-6 opacity-20 rotate-90">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M0 0L24 0L24 4L4 4L4 24L0 24Z" fill="#2d5a4d" />
                </svg>
              </div>
              <div className="absolute bottom-4 left-4 w-6 h-6 opacity-20 -rotate-90">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M0 0L24 0L24 4L4 4L4 24L0 24Z" fill="#2d5a4d" />
                </svg>
              </div>
              <div className="absolute bottom-4 right-4 w-6 h-6 opacity-20 rotate-180">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M0 0L24 0L24 4L4 4L4 24L0 24Z" fill="#8b2942" />
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
