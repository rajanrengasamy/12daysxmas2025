"use client";

import Image from "next/image";
import { useMemo } from "react";
import { motion } from "framer-motion";

interface PhotoFrameProps {
  imageUrl: string;
  alt: string;
  caption?: string;
}

export function PhotoFrame({ imageUrl, alt, caption }: PhotoFrameProps) {
  const rotation = useMemo(() => Math.random() * 4 - 2, []);

  return (
    <motion.div
      className="relative w-52 sm:w-60 md:w-72 lg:w-80"
      initial={{ opacity: 0, y: 30, rotate: rotation - 5 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
    >
      {/* Paper shadow */}
      <div
        className="absolute inset-0 rounded-sm"
        style={{
          transform: 'translate(6px, 8px)',
          background: 'rgba(0,0,0,0.3)',
          filter: 'blur(12px)'
        }}
      />

      {/* Main polaroid frame */}
      <div
        className="relative rounded-sm overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #fdf8f0 0%, #f5ebe0 50%, #e8dcc8 100%)',
          padding: '12px 12px 48px 12px',
          boxShadow: `
            0 1px 0 rgba(255,255,255,0.8) inset,
            0 -1px 0 rgba(0,0,0,0.05) inset,
            0 4px 20px rgba(0,0,0,0.2)
          `
        }}
      >
        {/* Paper texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            mixBlendMode: 'multiply'
          }}
        />

        {/* Photo container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-night-900">
          {/* Photo */}
          <Image
            src={imageUrl}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, 280px"
          />

          {/* Subtle vignette on photo */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.3)'
            }}
          />
        </div>

        {/* Caption area */}
        {caption && (
          <motion.p
            className="text-center text-sm text-warm-700 font-poem mt-4 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {caption}
          </motion.p>
        )}
      </div>

      {/* Decorative tape pieces */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm opacity-60"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(252, 211, 77, 0.4) 20%, rgba(252, 211, 77, 0.5) 50%, rgba(252, 211, 77, 0.4) 80%, transparent 100%)',
          transform: 'translateX(-50%) rotate(-2deg)'
        }}
      />
    </motion.div>
  );
}
