# 12 Days of Christmas Memory App - Task List

## Project Info
- **Git Remote:** `git@github.com:rajanrengasamy/12daysxmas2025.git`
- **Deploy Target:** Vercel
- **Local Test:** Run `npm run dev` then open http://localhost:3000

---

## Phase 1: Project Initialization & Setup [COMPLETED]

### 1.1 Initialize Next.js Project
- [x] Create Next.js 14 project with TypeScript
- [x] Configure App Router structure
- [x] Remove default boilerplate files and styles
- [x] Verify development server runs correctly

### 1.2 Install Dependencies
- [x] Install Framer Motion
- [x] Install Howler.js
- [x] Install Lucide React

### 1.3 Configure Tailwind CSS
- [x] Extend color palette (cream, warm, gold, primary, secondary)
- [x] Add custom font families (display, body, poem)
- [x] Add custom animations (snow-fall, sparkle)

### 1.4 Configure Google Fonts
- [x] Import Playfair Display, Inter, Crimson Text
- [x] Configure Next.js font optimization

### 1.5 Configure Build & Export
- [x] Set `output: 'export'` in next.config.js
- [x] Test build completes without errors

### 1.6 Git Repository Setup
- [x] Initialize git repository
- [x] Create `.gitignore`
- [x] Add remote origin
- [x] Create initial commit

---

## Phase 2: Asset Preparation & Organization [COMPLETED]

### 2.1 Photo Processing
- [x] Copy 12 photos from `/imgs/` folder
- [x] Name files: `01-memory.jpg` through `12-memory.jpg`
- [x] Move to `/public/assets/photos/`

### 2.2 Background Scene Assets
- [x] Copy all 4 background scenes to `/public/assets/scenes/`

### 2.3 UI Assets
- [x] Copy 12 door decoration images
- [x] Copy frame and UI elements to `/public/assets/ui/`

### 2.4 Audio Assets
- [ ] Find and download royalty-free audio files (pending)
- [ ] Move to `/public/assets/audio/`

---

## Phase 3: Data Layer Setup [COMPLETED]

### 3.1 TypeScript Types
- [x] Create `Door`, `Scene`, `AudioTrack`, `AppState`, `Action` interfaces
- [x] Export from `src/types/index.ts`

### 3.2 Data Files
- [x] Create `doors.json` with correct photo paths
- [x] Create `scenes.json` with 4 scene configurations
- [x] Create `audio.json` with 3 track configurations
- [x] Move JSON files to `src/data/`

### 3.3 Constants
- [x] Create animation timing constants
- [x] Create spring config constants
- [x] Export from `src/lib/constants.ts`

---

## Phase 4: Design System Implementation [COMPLETED]

- [x] Define color palette CSS variables
- [x] Define shadow and border radius variables
- [x] Set body background and text colors
- [x] Add reduced motion media query

---

## Phase 5: Core UI Components [COMPLETED]

- [x] Create `Button.tsx` with variants
- [x] Create `SoundToggle.tsx` with mute/unmute
- [x] Create `Header.tsx` with sticky positioning
- [x] Create `Progress.tsx` with X/12 format

---

## Phase 6: Landing Screen [COMPLETED]

- [x] Create `HeroSection.tsx` with title and CTA
- [x] Create `SnowParticles.tsx` with falling snow animation
- [x] Respect prefers-reduced-motion

---

## Phase 7: Door Grid Screen [COMPLETED]

### 7.1 State Management
- [x] Create `AppContext.tsx` with useReducer
- [x] Implement localStorage persistence

### 7.2 Hooks
- [x] Create `useReducedMotion.ts`

### 7.3 Door Component
- [x] Create `Door.tsx` with unopened/opened states
- [x] Add door number display and sparkle effect
- [x] Ensure 88×88px minimum touch target

### 7.4 DoorGrid Component
- [x] Create `DoorGrid.tsx` with responsive 3×4 / 4×3 layout

---

## Phase 8: Memory Card Modal [COMPLETED]

- [x] Create `SceneBackground.tsx` with overlay
- [x] Create `PhotoFrame.tsx` with Polaroid style
- [x] Create `PoemDisplay.tsx` with poem font
- [x] Create `MemoryCard.tsx` with modal animations
- [x] Add close button and click-outside-to-close
- [x] Add keyboard (Escape) support

---

## Phase 9: Audio System [COMPLETED]

- [x] Create `audioManager.ts` with Howler.js
- [x] Implement play/fadeOut/stop functions
- [x] Create `useAudio.ts` hook
- [x] Connect audio to MemoryCard open/close

---

## Phase 10: Celebration [COMPLETED]

- [x] Create `Confetti.tsx` with falling confetti animation
- [x] Create `CelebrationModal.tsx`
- [x] Trigger on 12/12 completion

---

## Phase 11: Accessibility, Testing & Deployment [IN PROGRESS]

### 11.1 Accessibility
- [x] Add aria-labels to interactive elements
- [x] Add focus-ring utility class
- [ ] Test keyboard navigation
- [ ] Run Lighthouse audit (target > 90)

### 11.2 Local Testing
- [ ] Test landing screen
- [ ] Test door grid and opening doors
- [ ] Test memory card modal
- [ ] Test celebration at 12/12
- [ ] Test mute toggle

### 11.3 Deployment
- [ ] Commit all changes
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Verify live site works

---

## Progress Summary

| Phase | Status |
|-------|--------|
| 1. Project Setup | ✅ DONE |
| 2. Asset Prep | ✅ DONE (audio pending) |
| 3. Data Layer | ✅ DONE |
| 4. Design System | ✅ DONE |
| 5. Core UI | ✅ DONE |
| 6. Landing | ✅ DONE |
| 7. Door Grid | ✅ DONE |
| 8. Memory Card | ✅ DONE |
| 9. Audio | ✅ DONE |
| 10. Celebration | ✅ DONE |
| 11. Deploy | 🔄 IN PROGRESS |

---

## Quick Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Test production build locally
npx serve out
```
