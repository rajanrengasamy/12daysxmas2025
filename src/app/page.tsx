"use client";

import { Header } from "@/components/ui/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { DoorGrid } from "@/components/grid/DoorGrid";
import { MemoryCard } from "@/components/memory/MemoryCard";
import { CelebrationModal } from "@/components/celebration/CelebrationModal";
import { SnowParticles } from "@/components/effects/SnowParticles";
import { AppProvider, useApp } from "@/context/AppContext";
import { useAudio } from "@/hooks/useAudio";

function AppContent() {
  const { state } = useApp();
  useAudio(); // Activates background audio

  return (
    <div className="snow-globe-container min-h-[100dvh] min-h-screen flex flex-col relative overflow-hidden">
      {/* Ambient candlelight glow from center */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(252, 211, 77, 0.08) 0%, transparent 70%)'
        }}
      />

      <Header />

      {state.currentScreen === "landing" ? (
        <HeroSection />
      ) : (
        <DoorGrid />
      )}

      <SnowParticles />
      <MemoryCard />
      <CelebrationModal />
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
