// Animation timing constants (from PRD Appendix A)
export const ANIMATION_CONFIG = {
  // Timing (milliseconds)
  TAP_FEEDBACK_DURATION: 100,
  JIGGLE_DURATION: 300,
  DOOR_OPEN_DURATION: 500,
  CARD_REVEAL_DURATION: 400,
  CARD_REVEAL_DELAY: 400,
  CARD_CLOSE_DURATION: 300,
  AUDIO_FADE_DURATION: 500,

  // Spring config for door flip
  DOOR_SPRING: {
    type: "spring" as const,
    stiffness: 200,
    damping: 20,
  },

  // Easing
  EASE_OUT: [0, 0, 0.2, 1] as const,
  EASE_IN: [0.4, 0, 1, 1] as const,
};

// Reduced motion config
export const REDUCED_MOTION_CONFIG = {
  CARD_REVEAL_DURATION: 200,
  CARD_CLOSE_DURATION: 150,
};

// Framer Motion variants for doors
export const doorVariants = {
  initial: { scale: 1, rotateY: 0 },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
  jiggle: {
    rotate: [0, -3, 3, -2, 2, 0],
    transition: { duration: 0.3 },
  },
  open: {
    rotateY: -180,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

// Framer Motion variants for cards
export const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut", delay: 0.4 },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3, ease: "easeIn" },
  },
};

// Reduced motion variants
export const reducedMotionCardVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};
