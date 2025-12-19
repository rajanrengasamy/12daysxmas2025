"use client";

import scenesData from "@/data/scenes.json";

interface SceneBackgroundProps {
  sceneId: string;
}

export function SceneBackground({ sceneId }: SceneBackgroundProps) {
  const scene = scenesData.scenes.find((s) => s.id === sceneId) || scenesData.scenes[0];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Paper texture base */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1a1f2e 0%, #0f141f 50%, #0a0e17 100%)'
        }}
      />

      {/* Background image with vignette */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${scene.backgroundUrl})`,
          opacity: 0.6
        }}
      />

      {/* Gradient overlays for depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 100% 80% at 50% 30%, transparent 30%, rgba(10, 14, 23, 0.7) 100%)`
        }}
      />

      {/* Warm candlelight glow from center-bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 80%, rgba(252, 211, 77, 0.08) 0%, transparent 60%)'
        }}
      />

      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          mixBlendMode: 'overlay'
        }}
      />

      {/* Frost effect at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 80px rgba(253, 248, 240, 0.05)'
        }}
      />
    </div>
  );
}
