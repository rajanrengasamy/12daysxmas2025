"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { AppState, AppAction } from "@/types";

const initialState: AppState = {
  currentScreen: "landing",
  openedDoors: [],
  activeDoorId: null,
  isMuted: false,
  hasInteracted: false,
  showCelebration: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "START_EXPERIENCE":
      return { ...state, currentScreen: "grid", hasInteracted: true };
    case "OPEN_DOOR":
      const newOpened = state.openedDoors.includes(action.doorId)
        ? state.openedDoors
        : [...state.openedDoors, action.doorId];
      const isComplete = newOpened.length === 12;
      return {
        ...state,
        activeDoorId: action.doorId,
        openedDoors: newOpened,
        showCelebration: isComplete && !state.openedDoors.includes(action.doorId),
        hasInteracted: true,
      };
    case "CLOSE_CARD":
      return { ...state, activeDoorId: null };
    case "TOGGLE_MUTE":
      return { ...state, isMuted: !state.isMuted };
    case "SET_INTERACTED":
      return { ...state, hasInteracted: true };
    case "DISMISS_CELEBRATION":
      return { ...state, showCelebration: false };
    case "HYDRATE_STATE":
      return {
        ...state,
        openedDoors: action.openedDoors,
        isMuted: action.isMuted,
      };
    default:
      return state;
  }
}

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Hydrate state from localStorage on mount
  useEffect(() => {
    try {
      const savedOpenedDoors = localStorage.getItem("openedDoors");
      const savedIsMuted = localStorage.getItem("isMuted");

      if (savedOpenedDoors || savedIsMuted) {
        dispatch({
          type: "HYDRATE_STATE",
          openedDoors: savedOpenedDoors ? JSON.parse(savedOpenedDoors) : [],
          isMuted: savedIsMuted === "true",
        });
      }
    } catch (error) {
      console.warn("Failed to load state from localStorage:", error);
    }
  }, []);

  // Persist state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("openedDoors", JSON.stringify(state.openedDoors));
      localStorage.setItem("isMuted", String(state.isMuted));
    } catch (error) {
      console.warn("Failed to save state to localStorage:", error);
    }
  }, [state.openedDoors, state.isMuted]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
