"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMemo } from "react";
import { motion } from "framer-motion";

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  shape: 'rect' | 'circle' | 'star';
}

// Paper craft color palette
const COLORS = [
  "#8b2942", // burgundy
  "#c2566a", // light burgundy
  "#2d5a4d", // forest
  "#4d7c6f", // light forest
  "#fcd34d", // candle gold
  "#fde68a", // light gold
  "#fdf8f0", // paper white
  "#d4a574", // copper
];

export function Confetti() {
  const prefersReducedMotion = useReducedMotion();

  const pieces = useMemo(() => {
    const count = 80;
    const confetti: ConfettiPiece[] = [];
    const shapes: ConfettiPiece['shape'][] = ['rect', 'circle', 'star'];

    for (let i = 0; i < count; i++) {
      confetti.push({
        id: i,
        left: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 8 + Math.random() * 8,
        duration: 4 + Math.random() * 3,
        delay: Math.random() * 1.5,
        rotation: Math.random() * 360,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      });
    }

    return confetti;
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  const renderShape = (piece: ConfettiPiece) => {
    switch (piece.shape) {
      case 'circle':
        return (
          <div
            className="rounded-full"
            style={{
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
            }}
          />
        );
      case 'star':
        return (
          <svg
            width={piece.size}
            height={piece.size}
            viewBox="0 0 24 24"
            fill={piece.color}
          >
            <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
          </svg>
        );
      default:
        return (
          <div
            style={{
              width: piece.size,
              height: piece.size * 0.5,
              backgroundColor: piece.color,
              borderRadius: 2,
            }}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[300]">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{ left: `${piece.left}%`, top: -20 }}
          initial={{
            y: -20,
            rotate: piece.rotation,
            opacity: 1,
          }}
          animate={{
            y: '110vh',
            rotate: piece.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {renderShape(piece)}
        </motion.div>
      ))}

      {/* Golden sparkle bursts */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-3 h-3"
          style={{
            left: `${10 + i * 10}%`,
            top: '20%',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 0.8,
            delay: 0.5 + i * 0.15,
            ease: "easeOut",
          }}
        >
          <svg viewBox="0 0 24 24" fill="#fcd34d">
            <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
