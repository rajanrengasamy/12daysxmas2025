"use client";

import { useEffect } from "react";
import { audioManager } from "@/lib/audioManager";
import { useApp } from "@/context/AppContext";

export function useAudio() {
  const { state } = useApp();

  // Start audio on first interaction (if not muted)
  useEffect(() => {
    if (state.hasInteracted && !state.isMuted) {
      audioManager.init();
      audioManager.play();
    }
  }, [state.hasInteracted]);

  // Mute = pause, Unmute = resume
  useEffect(() => {
    if (state.hasInteracted) {
      audioManager.setMuted(state.isMuted);
    }
  }, [state.isMuted, state.hasInteracted]);
}
