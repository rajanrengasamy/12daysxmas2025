"use client";

import { SoundToggle } from "./SoundToggle";
import { useApp } from "@/context/AppContext";

export function Header() {
  const { state } = useApp();
  const isGrid = state.currentScreen === "grid";

  return (
    <header
      className="sticky top-0 z-50 h-14 md:h-16 px-4 md:px-6 lg:px-8 flex items-center justify-between"
      style={{
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.8) 70%, transparent 100%)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div className="flex items-center gap-3">
        {/* Decorative ornament icon */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            background: 'radial-gradient(ellipse at 30% 30%, #c2566a 0%, #6d1f33 100%)',
            boxShadow: '0 2px 8px rgba(109, 31, 51, 0.4)'
          }}
        >
          <svg className="w-4 h-4 text-candle-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.09 8.26L21 9.27L16 14.14L17.18 21.02L12 17.77L6.82 21.02L8 14.14L3 9.27L9.91 8.26L12 2Z" />
          </svg>
        </div>

        <h1 className="font-display text-base md:text-lg lg:text-xl font-semibold text-paper-100 whitespace-nowrap tracking-tight">
          12 Days of Memories
        </h1>
      </div>

      <div className="flex items-center gap-3">
        {isGrid && (
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span className="text-paper-400/60">Progress:</span>
            <span className="font-display font-bold text-candle-400">
              {state.openedDoors.length}
            </span>
            <span className="text-paper-400/40">/</span>
            <span className="text-paper-400/60">12</span>
          </div>
        )}
        <SoundToggle />
      </div>
    </header>
  );
}
