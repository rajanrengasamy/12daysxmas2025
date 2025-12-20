"use client";

import { Howl } from "howler";

class AudioManager {
  private track: Howl | null = null;
  private isPlaying: boolean = false;

  init() {
    if (this.track) return;
    this.track = new Howl({
      src: ["/assets/audio/bells-soft.mp3"],
      loop: true,
      volume: 0.7,
      html5: true,
      preload: true,
      onloaderror: () => {
        console.warn("Failed to load background audio");
      },
    });
  }

  play() {
    if (!this.track) this.init();
    if (!this.isPlaying && this.track) {
      this.track.play();
      this.isPlaying = true;
    }
  }

  pause() {
    if (this.track) {
      this.track.pause();
    }
    this.isPlaying = false;
  }

  resume() {
    if (this.track) {
      this.track.play();
      this.isPlaying = true;
    }
  }

  setMuted(muted: boolean) {
    if (muted) {
      this.pause();
    } else if (this.track) {
      this.resume();
    }
  }
}

// Singleton instance
export const audioManager = new AudioManager();
