"use client";

import { useApp } from "@/context/AppContext";

export function Progress() {
  const { state } = useApp();
  const count = state.openedDoors.length;

  return (
    <div className="flex items-center gap-1.5 md:gap-2">
      <span className="text-xs md:text-sm font-medium text-warm-600 whitespace-nowrap">
        {count}/12
      </span>
      <div className="w-12 md:w-16 h-1.5 bg-cream-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-500 rounded-full transition-all duration-300"
          style={{ width: `${(count / 12) * 100}%` }}
        />
      </div>
    </div>
  );
}
