"use client";

import { motion } from "framer-motion";
import { Door } from "./Door";
import { useApp } from "@/context/AppContext";
import doorsData from "@/data/doors.json";

// Paper-cut tree for background
const BackgroundTree = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 150" className={className} fill="currentColor">
    <path d="M50 5 L75 45 L65 45 L85 85 L70 85 L90 130 L10 130 L30 85 L15 85 L35 45 L25 45 Z" />
    <rect x="42" y="130" width="16" height="15" opacity="0.8" />
  </svg>
);

export function DoorGrid() {
  const { state, dispatch } = useApp();

  const handleOpenDoor = (doorId: number) => {
    dispatch({ type: "OPEN_DOOR", doorId });
  };

  const openedCount = state.openedDoors.length;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 lg:p-10 relative z-10">
      {/* Progress indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6 lg:mb-8 text-center"
      >
        <p className="text-paper-300/70 text-sm mb-1 tracking-wide uppercase">Memories Discovered</p>
        <div className="flex items-center justify-center gap-2">
          <span className="font-display text-4xl lg:text-5xl font-bold text-candle-400">
            {openedCount}
          </span>
          <span className="text-paper-400/50 text-2xl">/</span>
          <span className="font-display text-2xl text-paper-400/70">12</span>
        </div>

        {/* Progress bar */}
        <div className="mt-3 w-48 h-1.5 bg-night-800 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #8b2942 0%, #fcd34d 100%)'
            }}
            initial={{ width: 0 }}
            animate={{ width: `${(openedCount / 12) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      {/* Main grid container with snow globe frame effect */}
      <div className="relative">
        {/* Decorative frame corners */}
        <div className="absolute -top-3 -left-3 w-8 h-8 border-l-2 border-t-2 border-copper-500/40 rounded-tl-lg" />
        <div className="absolute -top-3 -right-3 w-8 h-8 border-r-2 border-t-2 border-copper-500/40 rounded-tr-lg" />
        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-l-2 border-b-2 border-copper-500/40 rounded-bl-lg" />
        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-r-2 border-b-2 border-copper-500/40 rounded-br-lg" />

        {/* Door grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-5 lg:gap-6 max-w-[340px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[900px] w-full">
          {doorsData.doors.map((door) => (
            <Door
              key={door.id}
              door={door}
              isOpened={state.openedDoors.includes(door.id)}
              onOpen={() => handleOpenDoor(door.id)}
            />
          ))}
        </div>
      </div>

      {/* Paper-cut landscape at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-32 md:h-40 lg:h-48 pointer-events-none overflow-hidden z-0">
        {/* Hills layers */}
        <div
          className="absolute bottom-0 left-0 right-0 h-full"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(30, 41, 59, 0.5) 50%, rgba(30, 41, 59, 0.7) 100%)',
            clipPath: 'polygon(0% 65%, 12% 55%, 25% 62%, 38% 50%, 52% 58%, 65% 48%, 78% 55%, 90% 52%, 100% 60%, 100% 100%, 0% 100%)'
          }}
        />

        {/* Trees scattered */}
        <BackgroundTree className="absolute left-[3%] bottom-2 w-8 h-14 text-forest-800 opacity-60" />
        <BackgroundTree className="absolute left-[12%] bottom-4 w-10 h-18 text-forest-700 opacity-50" />
        <BackgroundTree className="absolute right-[15%] bottom-3 w-9 h-16 text-forest-800 opacity-55" />
        <BackgroundTree className="absolute right-[5%] bottom-5 w-11 h-20 text-forest-700 opacity-45" />

        {/* Snow ground */}
        <div
          className="absolute bottom-0 left-0 right-0 h-12"
          style={{
            background: 'linear-gradient(180deg, rgba(253, 248, 240, 0.08) 0%, rgba(253, 248, 240, 0.15) 100%)',
            clipPath: 'polygon(0% 50%, 8% 42%, 18% 50%, 30% 38%, 42% 48%, 55% 40%, 68% 48%, 82% 42%, 92% 50%, 100% 45%, 100% 100%, 0% 100%)'
          }}
        />
      </div>
    </div>
  );
}
