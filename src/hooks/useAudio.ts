"use client";

import { useEffect, useCallback } from "react";
import { audioManager } from "@/lib/audioManager";
import { useApp } from "@/context/AppContext";

export function useAudio() {
  const { state, dispatch } = useApp();

  // Initialize audio on first user interaction
  useEffect(() => {
    if (state.hasInteracted) {
      audioManager.init();
    }
  }, [state.hasInteracted]);

  // Update mute state
  useEffect(() => {
    audioManager.setMuted(state.isMuted);
  }, [state.isMuted]);

  const play = useCallback(
    (trackId: string) => {
      if (!state.hasInteracted) {
        dispatch({ type: "SET_INTERACTED" });
      }
      // Ensure audio is initialized before playing
      audioManager.init();
      if (!state.isMuted) {
        audioManager.play(trackId);
      }
    },
    [state.hasInteracted, state.isMuted, dispatch]
  );

  const stop = useCallback(() => {
    audioManager.stop();
  }, []);

  return { play, stop };
}
