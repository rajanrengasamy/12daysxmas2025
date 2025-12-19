// Door content schema
export interface Door {
  id: number;
  title: string;
  imageUrl: string;
  poem: string;
  caption?: string;
  sceneId: string;
  audioId: string;
}

export interface DoorsData {
  doors: Door[];
  metadata: {
    version: string;
    lastUpdated: string;
  };
}

// Scene configuration
export interface Scene {
  id: string;
  name: string;
  backgroundUrl: string;
  textColor: string;
  overlayOpacity: number;
}

// Audio track configuration
export interface AudioTrack {
  id: string;
  name: string;
  url: string;
  duration: number;
  loop: boolean;
}

// Application state
export interface AppState {
  currentScreen: "landing" | "grid";
  openedDoors: number[];
  activeDoorId: number | null;
  isMuted: boolean;
  hasInteracted: boolean;
  showCelebration: boolean;
}

// Action types for reducer
export type AppAction =
  | { type: "START_EXPERIENCE" }
  | { type: "OPEN_DOOR"; doorId: number }
  | { type: "CLOSE_CARD" }
  | { type: "TOGGLE_MUTE" }
  | { type: "SET_INTERACTED" }
  | { type: "DISMISS_CELEBRATION" }
  | { type: "HYDRATE_STATE"; openedDoors: number[]; isMuted: boolean };
