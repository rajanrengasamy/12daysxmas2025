"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMemo, useEffect, useState } from "react";

interface Snowflake {
  id: number;
  left: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  layer: 'far' | 'mid' | 'near';
  drift: number;
}

export function SnowParticles() {
  const prefersReducedMotion = useReducedMotion();
  const [particleCount, setParticleCount] = useState(60);

  useEffect(() => {
    const updateCount = () => {
      setParticleCount(window.innerWidth >= 1024 ? 90 : 60);
    };
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const snowflakes = useMemo(() => {
    const flakes: Snowflake[] = [];
    const layers: Snowflake['layer'][] = ['far', 'mid', 'near'];

    for (let i = 0; i < particleCount; i++) {
      const layer = layers[Math.floor(Math.random() * 3)];

      // Layer-based properties for parallax depth effect
      const layerProps = {
        far: { sizeRange: [1, 2], opacityRange: [0.15, 0.3], durationRange: [20, 30] },
        mid: { sizeRange: [2, 4], opacityRange: [0.3, 0.5], durationRange: [12, 20] },
        near: { sizeRange: [3, 6], opacityRange: [0.5, 0.8], durationRange: [8, 14] },
      };

      const props = layerProps[layer];

      flakes.push({
        id: i,
        left: Math.random() * 100,
        size: props.sizeRange[0] + Math.random() * (props.sizeRange[1] - props.sizeRange[0]),
        opacity: props.opacityRange[0] + Math.random() * (props.opacityRange[1] - props.opacityRange[0]),
        duration: props.durationRange[0] + Math.random() * (props.durationRange[1] - props.durationRange[0]),
        delay: Math.random() * 15,
        layer,
        drift: (Math.random() - 0.5) * 30, // Horizontal drift amount
      });
    }

    return flakes;
  }, [particleCount]);

  if (prefersReducedMotion) {
    return null;
  }

  const getAnimationName = (layer: Snowflake['layer']) => {
    switch (layer) {
      case 'far': return 'snowfall-slow';
      case 'mid': return 'snowfall-medium';
      case 'near': return 'snowfall-fast';
    }
  };

  const getZIndex = (layer: Snowflake['layer']) => {
    switch (layer) {
      case 'far': return 5;
      case 'mid': return 10;
      case 'near': return 15;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute rounded-full"
          style={{
            left: `${flake.left}%`,
            width: flake.size,
            height: flake.size,
            opacity: flake.opacity,
            zIndex: getZIndex(flake.layer),
            background: flake.layer === 'near'
              ? 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9) 0%, rgba(253,248,240,0.6) 100%)'
              : 'rgba(255, 255, 255, 0.8)',
            boxShadow: flake.layer === 'near'
              ? '0 0 4px rgba(255,255,255,0.3)'
              : 'none',
            animation: `${getAnimationName(flake.layer)} ${flake.duration}s linear ${flake.delay}s infinite`,
            filter: flake.layer === 'far' ? 'blur(1px)' : 'none',
          }}
        />
      ))}

      {/* Occasional larger "dust" particles for atmosphere */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`dust-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${15 + i * 18}%`,
            width: 1,
            height: 1,
            opacity: 0.2,
            zIndex: 3,
            background: '#fcd34d',
            boxShadow: '0 0 8px rgba(252, 211, 77, 0.4)',
            animation: `snowfall-slow ${25 + i * 3}s linear ${i * 4}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
