"use client";

import { Howl } from "howler";

interface AudioTrack {
  id: string;
  howl: Howl | null;
}

class AudioManager {
  private tracks: Map<string, Howl> = new Map();
  private currentTrackId: string | null = null;
  private isMuted: boolean = false;
  private isInitialized: boolean = false;

  init() {
    if (this.isInitialized) return;

    const trackConfigs = [
      { id: "snowflake", url: "/assets/audio/snowflake.mp3" },
      { id: "bells-soft", url: "/assets/audio/bells-soft.mp3" },
      { id: "piano-warm", url: "/assets/audio/piano-warm.mp3" },
      { id: "chimes", url: "/assets/audio/chimes.mp3" },
    ];

    trackConfigs.forEach(({ id, url }) => {
      const howl = new Howl({
        src: [url],
        loop: true,
        volume: 0.7,
        preload: true,
        onloaderror: () => {
          console.warn(`Failed to load audio track: ${id}`);
        },
      });
      this.tracks.set(id, howl);
    });

    this.isInitialized = true;
  }

  play(trackId: string) {
    if (this.isMuted) return;

    // Stop current track if different
    if (this.currentTrackId && this.currentTrackId !== trackId) {
      this.fadeOut(this.currentTrackId);
    }

    const track = this.tracks.get(trackId);
    if (!track) return;

    track.volume(0);
    track.play();
    track.fade(0, 0.7, 500);
    this.currentTrackId = trackId;
  }

  fadeOut(trackId: string) {
    const track = this.tracks.get(trackId);
    if (!track) return;

    track.fade(0.7, 0, 500);
    setTimeout(() => track.stop(), 500);
  }

  stop() {
    if (this.currentTrackId) {
      this.fadeOut(this.currentTrackId);
      this.currentTrackId = null;
    }
  }

  setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.currentTrackId) {
      this.stop();
    }
  }

  cleanup() {
    this.tracks.forEach((track) => {
      track.unload();
    });
    this.tracks.clear();
    this.isInitialized = false;
  }
}

// Singleton instance
export const audioManager = new AudioManager();
