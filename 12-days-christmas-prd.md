# 12 Days of Christmas Memory Experience

## Product Requirements Document (PRD)

**Version:** 1.0  
**Last Updated:** 2024-12-19  
**Author:** Rajan Rengasamy  
**Status:** Implementation Ready

---

## 1. Executive Summary

### 1.1 Product Vision

A mobile-first web application that presents 12 interactive "doors" in an advent calendar format. Each door, when tapped, animates open to reveal a photo memory embedded in a whimsical, hand-painted anime-style winter scene, accompanied by a short poem and festive audio. The experience evokes warmth, nostalgia, and celebration for a private Christmas gathering.

### 1.2 Success Criteria

| Metric | Target |
|--------|--------|
| Time to first meaningful interaction | < 3 seconds on 4G |
| Time to smile (door tap → full reveal) | < 2 seconds |
| Total page weight (initial load) | < 2 MB |
| Works offline after first load | Yes (optional enhancement) |
| Accessibility score (Lighthouse) | > 90 |

### 1.3 Key Decisions (Locked)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Door availability | Party Mode (all 12 available immediately) | Simpler implementation, better party UX |
| Authentication | None | Private gathering, unlisted URL sufficient |
| Database | None (static JSON) | No dynamic content, zero maintenance |
| Hosting | Vercel or Lovable built-in | Free tier sufficient, global CDN |
| Animation library | Framer Motion | Best React integration, spring physics |
| Audio library | Howler.js | Cross-browser audio handling, simple API |
| Art style | Whimsical hand-painted anime, warm watercolor, cozy winter | Achievable with AI-generated assets |

---

## 2. User Stories & Acceptance Criteria

### 2.1 Guest User Stories

#### US-01: View Landing Page
**As a** guest  
**I want to** see a welcoming landing page  
**So that** I understand what this experience is and how to start

**Acceptance Criteria:**
- [ ] Landing page displays title "12 Days of Memories"
- [ ] Subtitle/intro text explains the experience (max 2 sentences)
- [ ] "Begin" button is prominently displayed and thumb-accessible
- [ ] Sound toggle (mute/unmute) is visible in header
- [ ] Page loads in under 3 seconds on 4G connection
- [ ] Subtle ambient animation (snow particles) plays if motion is enabled

#### US-02: View Door Grid
**As a** guest  
**I want to** see all 12 doors in an organized grid  
**So that** I can choose which memory to explore

**Acceptance Criteria:**
- [ ] 12 doors displayed in 3 columns × 4 rows on mobile (< 768px)
- [ ] 12 doors displayed in 4 columns × 3 rows on tablet/desktop (≥ 768px)
- [ ] Each door shows its number (1-12) clearly
- [ ] Unopened doors have a subtle "glow" or "sparkle" indicator
- [ ] Opened doors are visually distinct (muted, checkmark, or different state)
- [ ] Progress indicator shows "X/12 opened"
- [ ] All doors are tappable with minimum 88px × 88px touch target

#### US-03: Open a Door
**As a** guest  
**I want to** tap a door and watch it animate open  
**So that** I feel delighted by the interaction

**Acceptance Criteria:**
- [ ] Tap feedback occurs within 100ms (scale down effect)
- [ ] Door "jiggles" with anticipation animation (300ms)
- [ ] Door opens with flip/swing animation (500ms)
- [ ] Memory Card appears with fade-in and scale animation (400ms)
- [ ] If sound is enabled, jingle begins playing on reveal
- [ ] Total time from tap to full reveal < 1.5 seconds

#### US-04: View Memory Card
**As a** guest  
**I want to** see the photo, poem, and scene together  
**So that** I can enjoy the memory and feel the emotion

**Acceptance Criteria:**
- [ ] Full-screen modal overlays the grid
- [ ] Background scene (illustrated winter setting) is visible
- [ ] Photo is displayed in a Polaroid-style frame with subtle shadow
- [ ] Poem text is readable (high contrast against background)
- [ ] Optional caption (place/year) is displayed below photo
- [ ] Memory title is displayed at top
- [ ] Close button (X) is clearly visible and thumb-accessible
- [ ] Tapping outside the card or pressing X closes the modal

#### US-05: Close Memory Card
**As a** guest  
**I want to** close the memory card and return to the grid  
**So that** I can explore other memories

**Acceptance Criteria:**
- [ ] Close animation reverses the open animation (300ms)
- [ ] Audio fades out (not abrupt stop)
- [ ] Door on grid now shows "opened" state
- [ ] Progress counter increments
- [ ] Focus returns to the grid (keyboard/screen reader users)

#### US-06: Complete All Doors
**As a** guest  
**I want to** see a celebration when I've opened all 12 doors  
**So that** I feel a sense of completion

**Acceptance Criteria:**
- [ ] After 12th door is opened and closed, celebration triggers
- [ ] Confetti animation plays
- [ ] Celebration message displays (e.g., "Merry Christmas, friends!")
- [ ] Option to "Revisit memories" or return to grid
- [ ] Celebration can be dismissed

#### US-07: Control Audio
**As a** guest  
**I want to** mute/unmute audio at any time  
**So that** I can enjoy the experience without disturbing others

**Acceptance Criteria:**
- [ ] Sound toggle visible on all screens (header position)
- [ ] Toggle state persists across the session (localStorage)
- [ ] Muted state prevents all audio playback
- [ ] Visual indicator clearly shows current state (🔊 / 🔇)
- [ ] First audio only plays after user interaction (iOS compliance)

#### US-08: Reduced Motion Support
**As a** guest with motion sensitivity  
**I want to** experience the app without excessive animation  
**So that** I don't feel discomfort

**Acceptance Criteria:**
- [ ] App detects `prefers-reduced-motion` system setting
- [ ] When enabled: door open is instant (no jiggle/flip)
- [ ] When enabled: snow particles are disabled
- [ ] When enabled: card appears with simple fade only
- [ ] Functionality is fully preserved

---

## 3. Information Architecture

### 3.1 Screen Hierarchy

```
App
├── Landing Screen
│   ├── Header (with sound toggle)
│   ├── Hero Section (title, subtitle, illustration)
│   └── CTA Button ("Begin")
│
├── Grid Screen
│   ├── Header (title, sound toggle, progress)
│   ├── Door Grid (12 doors)
│   └── Background (snow particles, ambient scene)
│
├── Memory Card Modal (overlay)
│   ├── Background Scene
│   ├── Photo Frame (Polaroid style)
│   ├── Content Area (title, poem, caption)
│   └── Close Button
│
└── Completion Celebration (overlay)
    ├── Confetti Animation
    ├── Message
    └── Dismiss Button
```

### 3.2 Navigation Flow

```
┌─────────────┐     tap "Begin"     ┌─────────────┐
│   Landing   │ ──────────────────► │    Grid     │
└─────────────┘                     └─────────────┘
                                           │
                                    tap door│
                                           ▼
                                    ┌─────────────┐
                                    │ Memory Card │◄──┐
                                    │   (Modal)   │   │ tap another
                                    └─────────────┘   │ door
                                           │         │
                                    tap X / │         │
                                    outside │         │
                                           ▼         │
                                    ┌─────────────┐──┘
                                    │    Grid     │
                                    │  (updated)  │
                                    └─────────────┘
                                           │
                                    12/12   │opened
                                           ▼
                                    ┌─────────────┐
                                    │ Celebration │
                                    └─────────────┘
                                           │
                                    dismiss│
                                           ▼
                                    ┌─────────────┐
                                    │    Grid     │
                                    └─────────────┘
```

---

## 4. Data Model

### 4.1 Door Content Schema

**File:** `data/doors.json`

```typescript
interface Door {
  id: number;                    // 1-12, unique identifier
  title: string;                 // Memory title, e.g., "The Bali Night"
  imageUrl: string;              // Path to photo, e.g., "/assets/photos/01-bali.webp"
  imagePlaceholder?: string;     // Low-res placeholder for loading, optional
  poem: string;                  // Multi-line poem text (use \n for line breaks)
  caption?: string;              // Optional place/year, e.g., "Bali, December 2019"
  sceneId: string;               // Reference to background scene, e.g., "cabin"
  audioId: string;               // Reference to audio track, e.g., "bells-soft"
}

interface DoorsData {
  doors: Door[];
  metadata: {
    version: string;
    lastUpdated: string;
  };
}
```

**Example Entry:**

```json
{
  "doors": [
    {
      "id": 1,
      "title": "The Bali Night",
      "imageUrl": "/assets/photos/01-bali.webp",
      "poem": "Under stars we found our way,\nLost but laughing, come what may.\nFriends who wander never stray,\nMemories that forever stay.",
      "caption": "Bali, December 2019",
      "sceneId": "cabin",
      "audioId": "bells-soft"
    }
  ],
  "metadata": {
    "version": "1.0",
    "lastUpdated": "2024-12-19"
  }
}
```

### 4.2 Scene Configuration

**File:** `data/scenes.json`

```typescript
interface Scene {
  id: string;                    // Unique identifier
  name: string;                  // Human-readable name
  backgroundUrl: string;         // Path to background image
  frameStyle: "polaroid" | "wooden" | "gold";  // Photo frame variant
  textColor: string;             // Hex color for poem text
  overlayOpacity: number;        // 0-1, scrim darkness for text readability
}
```

**Predefined Scenes:**

| Scene ID | Name | Use Case |
|----------|------|----------|
| `cabin` | Cozy Cabin Interior | Indoor memories, warm feeling |
| `village` | Snowy Village Street | Town/city memories |
| `train` | Train Window View | Travel memories |
| `fireside` | Fireside Close-up | Intimate, emotional memories |

### 4.3 Audio Configuration

**File:** `data/audio.json`

```typescript
interface AudioTrack {
  id: string;                    // Unique identifier
  name: string;                  // Human-readable name
  url: string;                   // Path to audio file
  duration: number;              // Duration in seconds (for preload decisions)
  loop: boolean;                 // Whether to loop while card is open
}
```

**Predefined Tracks:**

| Audio ID | Name | Duration | Loop |
|----------|------|----------|------|
| `bells-soft` | Soft Jingle Bells | 15s | Yes |
| `piano-warm` | Warm Piano Melody | 20s | Yes |
| `chimes` | Wind Chimes | 12s | Yes |

### 4.4 Application State

```typescript
interface AppState {
  currentScreen: "landing" | "grid" | "memory";
  openedDoors: Set<number>;      // Set of door IDs that have been opened
  activeDoorId: number | null;   // Currently viewing door (null if none)
  isMuted: boolean;              // Global audio mute state
  hasInteracted: boolean;        // True after first user interaction (for iOS audio)
  showCelebration: boolean;      // True when all 12 doors opened
  reducedMotion: boolean;        // From system preference
}
```

**State Persistence:**

| State | Persist? | Storage | Notes |
|-------|----------|---------|-------|
| `openedDoors` | Yes | localStorage | Survives page refresh |
| `isMuted` | Yes | localStorage | User preference |
| `hasInteracted` | No | Memory | Reset on page load |
| `showCelebration` | No | Memory | Derived from openedDoors |

---

## 5. UI/UX Specifications

### 5.1 Design System

#### 5.1.1 Color Palette

```css
:root {
  /* Primary - Warm Reds */
  --color-primary-50: #FEF2F2;
  --color-primary-100: #FEE2E2;
  --color-primary-500: #B91C1C;     /* Primary accent */
  --color-primary-600: #991B1B;
  --color-primary-700: #7F1D1D;

  /* Secondary - Forest Greens */
  --color-secondary-50: #F0FDF4;
  --color-secondary-100: #DCFCE7;
  --color-secondary-500: #166534;   /* Secondary accent */
  --color-secondary-600: #15803D;
  --color-secondary-700: #14532D;

  /* Neutral - Warm Creams & Browns */
  --color-cream-50: #FFFBF5;        /* Background light */
  --color-cream-100: #FFF7ED;
  --color-cream-200: #FFEDD5;
  --color-warm-800: #44403C;        /* Text primary */
  --color-warm-600: #78716C;        /* Text secondary */
  --color-warm-400: #A8A29E;        /* Text muted */

  /* Accent - Gold */
  --color-gold-400: #FACC15;
  --color-gold-500: #EAB308;

  /* Utility */
  --color-white: #FFFFFF;
  --color-black: #0C0A09;
  --color-overlay: rgba(12, 10, 9, 0.6);  /* Modal backdrop */
}
```

#### 5.1.2 Typography

```css
:root {
  /* Font Families */
  --font-display: "Playfair Display", Georgia, serif;   /* Titles, headings */
  --font-body: "Inter", system-ui, sans-serif;          /* Body text, UI */
  --font-poem: "Crimson Text", Georgia, serif;          /* Poem text */

  /* Font Sizes (Mobile-First) */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;   /* For poems */

  /* Font Weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

**Typography Scale Usage:**

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| Page Title | display | 3xl (mobile), 4xl (desktop) | bold | tight |
| Door Number | display | 2xl | bold | tight |
| Memory Title | display | xl (mobile), 2xl (desktop) | semibold | tight |
| Poem Text | poem | lg | normal | relaxed |
| Caption | body | sm | normal | normal |
| Button Text | body | base | medium | normal |
| Progress Text | body | sm | medium | normal |

#### 5.1.3 Spacing Scale

```css
:root {
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
}
```

#### 5.1.4 Border Radius

```css
:root {
  --radius-sm: 0.25rem;   /* 4px - subtle rounding */
  --radius-md: 0.5rem;    /* 8px - buttons, small cards */
  --radius-lg: 1rem;      /* 16px - cards, modals */
  --radius-xl: 1.5rem;    /* 24px - large cards */
  --radius-full: 9999px;  /* Pill shapes */
}
```

#### 5.1.5 Shadows

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
               0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
               0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
               0 8px 10px -6px rgba(0, 0, 0, 0.1);
  --shadow-glow: 0 0 20px rgba(250, 204, 21, 0.3);  /* Gold glow for doors */
  --shadow-polaroid: 0 4px 20px rgba(0, 0, 0, 0.25);
}
```

### 5.2 Component Specifications

#### 5.2.1 Header Component

**Purpose:** Persistent navigation and controls across all screens

**Layout:**
```
┌────────────────────────────────────────────────────┐
│  [Logo/Title]              [Progress]  [🔊 Mute]  │
└────────────────────────────────────────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Height | 56px (mobile), 64px (desktop) |
| Padding | 0 16px |
| Background | var(--color-cream-50) with 95% opacity |
| Backdrop Filter | blur(8px) |
| Position | sticky, top: 0 |
| Z-index | 100 |
| Border Bottom | 1px solid var(--color-cream-200) |

**Child Elements:**

| Element | Specification |
|---------|---------------|
| Logo/Title | Font: display, Size: text-lg, Weight: bold, Color: warm-800 |
| Progress | Font: body, Size: text-sm, Format: "7/12 opened", Color: warm-600 |
| Mute Button | Size: 44px × 44px, Icon: 24px, Border-radius: full |

#### 5.2.2 Door Component

**Purpose:** Interactive door card in the grid

**States:**
1. **Unopened** - Default state, inviting
2. **Hover/Focus** - Visual feedback on interaction
3. **Tapping** - During tap gesture
4. **Opening** - Animation in progress
5. **Opened** - Already viewed

**Visual Specifications:**

| State | Background | Border | Shadow | Scale | Glow |
|-------|------------|--------|--------|-------|------|
| Unopened | Gradient (cream-100 → cream-200) | 2px solid gold-400 | shadow-md | 1.0 | shadow-glow |
| Hover | Same | Same | shadow-lg | 1.02 | Brighter glow |
| Tapping | Same | Same | shadow-sm | 0.95 | None |
| Opening | N/A (animating) | N/A | N/A | N/A | N/A |
| Opened | cream-200 (muted) | 1px solid warm-400 | shadow-sm | 1.0 | None, add ✓ icon |

**Dimensions:**

| Property | Mobile (< 768px) | Desktop (≥ 768px) |
|----------|------------------|-------------------|
| Min Width | 88px | 100px |
| Aspect Ratio | 1:1 (square) | 1:1 (square) |
| Border Radius | var(--radius-lg) | var(--radius-lg) |
| Gap between doors | var(--space-3) | var(--space-4) |

**Door Number Typography:**
- Font: display
- Size: text-2xl
- Weight: bold
- Color: primary-700 (unopened), warm-400 (opened)
- Text Shadow: subtle for legibility

#### 5.2.3 Memory Card Modal

**Purpose:** Full-screen overlay displaying the memory

**Structure:**
```
┌─────────────────────────────────────────────┐
│                                        [X]  │
│  ┌─────────────────────────────────────┐   │
│  │      BACKGROUND SCENE IMAGE         │   │
│  │                                     │   │
│  │    ┌───────────────────────┐        │   │
│  │    │                       │        │   │
│  │    │    PHOTO (Polaroid)   │        │   │
│  │    │                       │        │   │
│  │    └───────────────────────┘        │   │
│  │         Caption Text                │   │
│  │                                     │   │
│  │    ─────────────────────────        │   │
│  │                                     │   │
│  │        Memory Title                 │   │
│  │                                     │   │
│  │    "First line of poem,             │   │
│  │     Second line of poem,            │   │
│  │     Third line of poem,             │   │
│  │     Fourth line of poem."           │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

**Specifications:**

| Property | Value |
|----------|-------|
| Overlay Background | var(--color-overlay) |
| Modal Max Width | 500px |
| Modal Width | 90vw |
| Modal Max Height | 90vh |
| Modal Padding | var(--space-6) |
| Modal Border Radius | var(--radius-xl) |
| Modal Background | Transparent (scene image covers) |
| Z-index | 200 |

**Close Button:**

| Property | Value |
|----------|-------|
| Position | Absolute, top: 16px, right: 16px |
| Size | 44px × 44px |
| Background | var(--color-white) with 90% opacity |
| Border Radius | full |
| Icon | X, 20px, var(--color-warm-800) |
| Shadow | shadow-md |

**Photo Frame (Polaroid Style):**

| Property | Value |
|----------|-------|
| Frame Background | var(--color-white) |
| Frame Padding | 12px 12px 40px 12px (extra bottom for Polaroid look) |
| Frame Border Radius | var(--radius-sm) |
| Frame Shadow | shadow-polaroid |
| Photo Aspect Ratio | 4:5 (portrait) |
| Photo Object Fit | cover |
| Frame Rotation | Random between -3deg and +3deg |

**Poem Text:**

| Property | Value |
|----------|-------|
| Font | var(--font-poem) |
| Size | var(--text-lg) |
| Color | var(--color-white) or scene-specific |
| Line Height | var(--leading-relaxed) |
| Text Align | center |
| Text Shadow | 0 2px 4px rgba(0,0,0,0.5) for legibility |
| Max Width | 400px |
| Margin Top | var(--space-6) |

#### 5.2.4 Progress Indicator

**Purpose:** Show completion status

**Format:** "X/12 opened"

**Visual:**
- Optional: Small progress bar beneath text
- Color: primary-500 for completed, warm-200 for remaining

#### 5.2.5 Celebration Overlay

**Purpose:** Reward completion of all 12 doors

**Elements:**
1. Confetti animation (canvas or CSS-based)
2. Message: "Merry Christmas, friends! 🎄"
3. Subtitle: "Thank you for sharing these memories"
4. Button: "Revisit Memories" → returns to grid

**Specifications:**

| Property | Value |
|----------|-------|
| Overlay | Full screen, var(--color-overlay) darker (0.8 opacity) |
| Content Background | var(--color-cream-50) |
| Content Padding | var(--space-8) |
| Content Border Radius | var(--radius-xl) |
| Content Max Width | 400px |
| Message Font | display, text-3xl, bold |
| Button | Primary style, full width |

#### 5.2.6 Snow Particles (Background Effect)

**Purpose:** Ambient winter atmosphere

**Specifications:**

| Property | Value |
|----------|-------|
| Particle Count | 50 (mobile), 100 (desktop) |
| Particle Size | 2px - 6px (randomized) |
| Particle Color | var(--color-white) with 60-80% opacity |
| Fall Speed | 20-50px per second (randomized) |
| Drift | Subtle horizontal sway |
| Layer | Behind content, above background |
| Disabled When | `prefers-reduced-motion: reduce` |

### 5.3 Layout Specifications

#### 5.3.1 Landing Screen Layout

```
Mobile (< 768px):
┌─────────────────────────┐
│        Header           │ 56px
├─────────────────────────┤
│                         │
│     [Illustration]      │ ~40vh
│                         │
│     12 Days of          │
│       Memories          │ Title
│                         │
│   "A festive journey    │
│    through our year"    │ Subtitle
│                         │
│      [ Begin ]          │ Button
│                         │
│                         │
└─────────────────────────┘

Desktop (≥ 768px):
┌────────────────────────────────────────────────┐
│                    Header                       │
├───────────────────────┬────────────────────────┤
│                       │                        │
│   [Illustration]      │   12 Days of Memories  │
│                       │                        │
│                       │   "A festive journey   │
│                       │    through our year"   │
│                       │                        │
│                       │       [ Begin ]        │
│                       │                        │
└───────────────────────┴────────────────────────┘
```

#### 5.3.2 Grid Screen Layout

```
Mobile (< 768px) - 3 columns:
┌───────────────────────────┐
│          Header           │
├───────────────────────────┤
│   [1]    [2]    [3]      │
│                           │
│   [4]    [5]    [6]      │
│                           │
│   [7]    [8]    [9]      │
│                           │
│  [10]   [11]   [12]      │
│                           │
└───────────────────────────┘

Grid CSS:
- display: grid
- grid-template-columns: repeat(3, 1fr)
- gap: var(--space-3)
- padding: var(--space-4)
- max-width: 400px
- margin: 0 auto

Desktop (≥ 768px) - 4 columns:
┌────────────────────────────────────────┐
│               Header                    │
├────────────────────────────────────────┤
│                                        │
│    [1]    [2]    [3]    [4]           │
│                                        │
│    [5]    [6]    [7]    [8]           │
│                                        │
│    [9]   [10]   [11]   [12]           │
│                                        │
└────────────────────────────────────────┘

Grid CSS:
- grid-template-columns: repeat(4, 1fr)
- gap: var(--space-4)
- max-width: 600px
```

### 5.4 Animation Specifications

#### 5.4.1 Door Open Sequence

**Phase 1: Tap Feedback**
```javascript
{
  property: "scale",
  from: 1.0,
  to: 0.95,
  duration: 100,        // ms
  easing: "ease-out"
}
```

**Phase 2: Anticipation (Jiggle)**
```javascript
{
  property: "rotate",
  keyframes: [0, -3, 3, -2, 2, 0],  // degrees
  duration: 300,        // ms
  easing: "ease-in-out"
}
```

**Phase 3: Door Open (Flip)**
```javascript
{
  property: "rotateY",  // or custom flip
  from: 0,
  to: -180,             // degrees (opens left)
  duration: 500,        // ms
  easing: "spring",
  springConfig: {
    stiffness: 200,
    damping: 20
  }
}
```

**Phase 4: Card Reveal**
```javascript
{
  properties: ["opacity", "scale"],
  from: { opacity: 0, scale: 0.8 },
  to: { opacity: 1, scale: 1.0 },
  duration: 400,        // ms
  easing: "ease-out",
  delay: 400            // ms (starts after door opens)
}
```

**Total Duration:** ~1300ms

#### 5.4.2 Card Close Sequence

```javascript
{
  properties: ["opacity", "scale"],
  from: { opacity: 1, scale: 1.0 },
  to: { opacity: 0, scale: 0.9 },
  duration: 300,        // ms
  easing: "ease-in"
}
```

#### 5.4.3 Reduced Motion Variants

When `prefers-reduced-motion: reduce`:

| Animation | Standard | Reduced Motion |
|-----------|----------|----------------|
| Door Jiggle | 300ms rotation | None |
| Door Open | 500ms flip | Instant (opacity only) |
| Card Reveal | 400ms scale + fade | 200ms fade only |
| Card Close | 300ms scale + fade | 150ms fade only |
| Snow Particles | Falling animation | Static or hidden |

#### 5.4.4 Framer Motion Implementation

```typescript
// Door variants
const doorVariants = {
  initial: { scale: 1, rotateY: 0 },
  tap: { scale: 0.95, transition: { duration: 0.1 } },
  jiggle: {
    rotate: [0, -3, 3, -2, 2, 0],
    transition: { duration: 0.3 }
  },
  open: {
    rotateY: -180,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  }
};

// Card variants
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut", delay: 0.4 }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};
```

### 5.5 Audio Specifications

#### 5.5.1 Audio Files

| Track | Format | Max Size | Sample Rate | Bit Rate |
|-------|--------|----------|-------------|----------|
| All tracks | MP3 | 500KB | 44.1kHz | 128kbps |

**Fallback:** OGG format for browsers with MP3 issues

#### 5.5.2 Audio Behavior

| Event | Behavior |
|-------|----------|
| Card Opens | Start playing track from beginning |
| Card Closes | Fade out over 500ms, then stop |
| Mute Toggled | Immediately mute/unmute (no fade) |
| Another Card Opens | Stop previous track, start new |
| Page Load | No audio until first user interaction |
| Background Tab | Continue playing (don't pause) |

#### 5.5.3 Howler.js Implementation

```typescript
// Audio manager configuration
const audioManager = {
  tracks: {},         // Loaded Howl instances
  currentTrack: null, // Currently playing track ID
  
  init(tracks: AudioTrack[]) {
    tracks.forEach(track => {
      this.tracks[track.id] = new Howl({
        src: [track.url],
        loop: track.loop,
        volume: 0.7,
        preload: true
      });
    });
  },
  
  play(trackId: string) {
    if (this.currentTrack) {
      this.fadeOut(this.currentTrack);
    }
    const track = this.tracks[trackId];
    track.volume(0);
    track.play();
    track.fade(0, 0.7, 500); // Fade in
    this.currentTrack = trackId;
  },
  
  fadeOut(trackId: string) {
    const track = this.tracks[trackId];
    track.fade(0.7, 0, 500);
    setTimeout(() => track.stop(), 500);
  }
};
```

---

## 6. Technical Architecture

### 6.1 Technology Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | Next.js | 14.x | React framework with static export |
| Language | TypeScript | 5.x | Type safety |
| Styling | Tailwind CSS | 3.x | Utility-first CSS |
| Animation | Framer Motion | 10.x | Physics-based animations |
| Audio | Howler.js | 2.x | Cross-browser audio |
| Icons | Lucide React | Latest | Icon library |
| Fonts | Google Fonts | N/A | Playfair Display, Inter, Crimson Text |

### 6.2 Project Structure

```
12-days-of-christmas/
├── public/
│   ├── assets/
│   │   ├── photos/           # Memory photos (01-bali.webp, etc.)
│   │   ├── scenes/           # Background scene images
│   │   ├── audio/            # Jingle audio files
│   │   └── ui/               # UI elements (door texture, frame, etc.)
│   ├── favicon.ico
│   └── og-image.png          # Social sharing image
│
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with fonts, metadata
│   │   ├── page.tsx          # Landing page
│   │   └── memories/
│   │       └── page.tsx      # Grid + memory card page
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── SoundToggle.tsx
│   │   │   └── Progress.tsx
│   │   │
│   │   ├── landing/
│   │   │   └── HeroSection.tsx
│   │   │
│   │   ├── grid/
│   │   │   ├── DoorGrid.tsx
│   │   │   └── Door.tsx
│   │   │
│   │   ├── memory/
│   │   │   ├── MemoryCard.tsx
│   │   │   ├── PhotoFrame.tsx
│   │   │   ├── PoemDisplay.tsx
│   │   │   └── SceneBackground.tsx
│   │   │
│   │   ├── celebration/
│   │   │   ├── Confetti.tsx
│   │   │   └── CelebrationModal.tsx
│   │   │
│   │   └── effects/
│   │       └── SnowParticles.tsx
│   │
│   ├── hooks/
│   │   ├── useAudio.ts       # Audio playback control
│   │   ├── useLocalStorage.ts # Persist state
│   │   └── useReducedMotion.ts # Motion preference detection
│   │
│   ├── lib/
│   │   ├── audioManager.ts   # Howler.js wrapper
│   │   └── constants.ts      # Animation timings, etc.
│   │
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces
│   │
│   └── data/
│       ├── doors.json        # Door content (provided by user)
│       ├── scenes.json       # Scene configurations
│       └── audio.json        # Audio track configurations
│
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── package.json
└── README.md
```

### 6.3 State Management

**Approach:** React Context + useReducer (no external library needed)

```typescript
// src/context/AppContext.tsx

interface AppState {
  currentScreen: "landing" | "grid";
  openedDoors: number[];
  activeDoorId: number | null;
  isMuted: boolean;
  hasInteracted: boolean;
  showCelebration: boolean;
}

type Action =
  | { type: "START_EXPERIENCE" }
  | { type: "OPEN_DOOR"; doorId: number }
  | { type: "CLOSE_CARD" }
  | { type: "TOGGLE_MUTE" }
  | { type: "SET_INTERACTED" }
  | { type: "DISMISS_CELEBRATION" };

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "START_EXPERIENCE":
      return { ...state, currentScreen: "grid" };
    case "OPEN_DOOR":
      const newOpened = state.openedDoors.includes(action.doorId)
        ? state.openedDoors
        : [...state.openedDoors, action.doorId];
      return {
        ...state,
        activeDoorId: action.doorId,
        openedDoors: newOpened,
        showCelebration: newOpened.length === 12
      };
    case "CLOSE_CARD":
      return { ...state, activeDoorId: null };
    case "TOGGLE_MUTE":
      return { ...state, isMuted: !state.isMuted };
    case "SET_INTERACTED":
      return { ...state, hasInteracted: true };
    case "DISMISS_CELEBRATION":
      return { ...state, showCelebration: false };
    default:
      return state;
  }
}
```

### 6.4 Performance Requirements

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Largest Contentful Paint | < 2.5s | Lighthouse |
| Time to Interactive | < 3.0s | Lighthouse |
| Cumulative Layout Shift | < 0.1 | Lighthouse |
| Total Bundle Size (JS) | < 150KB gzipped | Build output |
| Initial HTML + CSS | < 50KB | Network tab |

### 6.5 Image Optimization

| Image Type | Format | Max Dimensions | Max File Size | Loading |
|------------|--------|----------------|---------------|---------|
| Photos | WebP | 800 × 1000 | 200KB | Lazy |
| Scene Backgrounds | WebP | 1200 × 1600 | 300KB | Eager (preload) |
| Door Textures | WebP | 200 × 200 | 30KB | Eager |
| Thumbnails | WebP | 100 × 100 | 10KB | Eager |

**Implementation:**
- Use Next.js `<Image>` component with `placeholder="blur"`
- Generate blur placeholders at build time
- Serve responsive images via Next.js image optimization

### 6.6 Build & Deployment

**Build Command:**
```bash
npm run build  # Generates static export
```

**Output:** Static HTML, CSS, JS files in `/out` directory

**Deployment Options:**
1. **Vercel** (recommended): Push to GitHub, auto-deploys
2. **Cloudflare Pages**: Connect repo, set build command
3. **Lovable**: Built-in hosting

**Environment Variables:** None required (all content is static)

---

## 7. Accessibility Requirements

### 7.1 WCAG 2.1 AA Compliance

| Criterion | Implementation |
|-----------|----------------|
| **1.1.1 Non-text Content** | All images have alt text; decorative images have empty alt |
| **1.4.3 Contrast** | Minimum 4.5:1 for text; 3:1 for large text; use scrims |
| **1.4.11 Non-text Contrast** | UI components have 3:1 contrast against background |
| **2.1.1 Keyboard** | All interactive elements focusable and operable |
| **2.4.3 Focus Order** | Logical tab order through doors, modal traps focus |
| **2.4.7 Focus Visible** | Custom focus rings, visible on all interactive elements |
| **2.5.5 Target Size** | Minimum 44 × 44px touch targets (we use 88px for doors) |
| **4.1.2 Name, Role, Value** | ARIA labels on all buttons, modal has role="dialog" |

### 7.2 Screen Reader Support

```html
<!-- Door button example -->
<button
  aria-label="Open door 3, The Bali Night"
  aria-pressed="false"  <!-- or "true" if opened -->
>
  <span aria-hidden="true">3</span>
</button>

<!-- Memory card modal -->
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="memory-title"
  aria-describedby="memory-poem"
>
  <h2 id="memory-title">The Bali Night</h2>
  <p id="memory-poem">Under stars we found our way...</p>
</div>
```

### 7.3 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**JavaScript detection:**
```typescript
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
```

---

## 8. Error Handling

### 8.1 Error States

| Error | Display | Recovery |
|-------|---------|----------|
| **Photo fails to load** | Placeholder image with message "Memory unavailable" | Retry button |
| **Audio fails to load** | Silent fail, no blocking | None needed |
| **JSON fails to parse** | Full-page error with refresh prompt | Refresh page |
| **localStorage unavailable** | Silent fail, state not persisted | In-memory only |

### 8.2 Loading States

| Element | Loading State |
|---------|---------------|
| Photos | Blur placeholder → sharp image |
| Door Grid | Skeleton grid (gray boxes) |
| Memory Card | Spinner overlay |

### 8.3 Empty States

Not applicable — all 12 doors always have content.

---

## 9. Testing Checklist

### 9.1 Functional Testing

- [ ] Landing page loads and displays correctly
- [ ] "Begin" button navigates to grid
- [ ] All 12 doors are visible and tappable
- [ ] Door open animation plays smoothly
- [ ] Memory card displays correct photo, poem, title, caption
- [ ] Audio plays when card opens (if unmuted)
- [ ] Audio stops/fades when card closes
- [ ] Mute toggle works globally
- [ ] Door shows "opened" state after viewing
- [ ] Progress counter updates correctly
- [ ] Celebration triggers at 12/12
- [ ] Celebration can be dismissed
- [ ] State persists after page refresh

### 9.2 Cross-Browser Testing

| Browser | Version | Priority |
|---------|---------|----------|
| Safari iOS | 15+ | Critical |
| Chrome Android | 100+ | Critical |
| Chrome Desktop | 100+ | High |
| Safari Desktop | 15+ | Medium |
| Firefox | 100+ | Low |

### 9.3 Device Testing

| Device | Screen | Priority |
|--------|--------|----------|
| iPhone 12/13/14 | 390 × 844 | Critical |
| iPhone SE | 375 × 667 | High |
| Samsung Galaxy S21 | 360 × 800 | High |
| iPad | 768 × 1024 | Medium |
| Desktop | 1920 × 1080 | Low |

### 9.4 Performance Testing

- [ ] Lighthouse Performance > 90
- [ ] First load < 2 MB
- [ ] Works on slow 3G (test with throttling)
- [ ] No layout shift during load

### 9.5 Accessibility Testing

- [ ] Lighthouse Accessibility > 90
- [ ] Full keyboard navigation works
- [ ] VoiceOver (iOS) can read all content
- [ ] TalkBack (Android) can read all content
- [ ] Reduced motion mode works

---

## 10. Asset Requirements

### 10.1 Required Assets

| Asset | Quantity | Format | Responsibility |
|-------|----------|--------|----------------|
| Memory Photos | 12 | WebP, 800×1000 max | User (you) |
| Background Scenes | 4 | WebP, 1200×1600 | AI-generated |
| Door Texture | 1 | WebP, 200×200 | AI-generated |
| Frame Graphic | 1 | PNG with transparency | AI-generated |
| Audio Jingles | 3 | MP3, 15-20s | Royalty-free source |
| Hero Illustration | 1 | WebP, 600×400 | AI-generated |

### 10.2 Asset Naming Convention

```
photos/
  01-[short-name].webp    # e.g., 01-bali-night.webp
  02-[short-name].webp
  ...

scenes/
  cabin.webp
  village.webp
  train.webp
  fireside.webp

audio/
  bells-soft.mp3
  piano-warm.mp3
  chimes.mp3

ui/
  door-texture.webp
  polaroid-frame.png
  hero-illustration.webp
```

---

## 11. Open Questions (Resolved)

| Question | Decision |
|----------|----------|
| Door unlock mode | Party Mode (all available immediately) |
| Number of scenes | 4 scenes, reused across 12 doors |
| Photo frame style | Polaroid (single style) |
| Celebration behavior | One-time display, dismissable |
| Password protection | None for v1 (unlisted URL) |

---

## 12. Out of Scope (v1)

- Admin UI for editing content
- User authentication
- Social sharing features
- Comments or reactions
- Analytics dashboard
- Multi-language support
- Countdown mode (unlock 1 per day)
- Custom photo editing

---

## 13. Success Metrics

| Metric | How to Measure | Target |
|--------|----------------|--------|
| Completion Rate | 12/12 doors opened | > 80% of visitors |
| Return Visits | Unique vs repeat loads | Some repeat visits |
| Audio Engagement | Mute toggle usage | < 50% mute |
| Party Success | Verbal feedback | Mates smile and enjoy |

---

## Appendix A: Framer Motion Animation Config

```typescript
// src/lib/constants.ts

export const ANIMATION_CONFIG = {
  // Timing (milliseconds)
  TAP_FEEDBACK_DURATION: 100,
  JIGGLE_DURATION: 300,
  DOOR_OPEN_DURATION: 500,
  CARD_REVEAL_DURATION: 400,
  CARD_REVEAL_DELAY: 400,
  CARD_CLOSE_DURATION: 300,
  AUDIO_FADE_DURATION: 500,

  // Spring config for door flip
  DOOR_SPRING: {
    type: "spring" as const,
    stiffness: 200,
    damping: 20,
  },

  // Easing
  EASE_OUT: [0, 0, 0.2, 1],
  EASE_IN: [0.4, 0, 1, 1],
};

export const REDUCED_MOTION_CONFIG = {
  CARD_REVEAL_DURATION: 200,
  CARD_CLOSE_DURATION: 150,
};
```

---

## Appendix B: Sample doors.json Structure

```json
{
  "doors": [
    {
      "id": 1,
      "title": "The Bali Night",
      "imageUrl": "/assets/photos/01-bali-night.webp",
      "poem": "Under stars we found our way,\nLost but laughing, come what may.\nFriends who wander never stray,\nMemories that forever stay.",
      "caption": "Bali, December 2019",
      "sceneId": "cabin",
      "audioId": "bells-soft"
    },
    {
      "id": 2,
      "title": "Sunday Roast Club",
      "imageUrl": "/assets/photos/02-sunday-roast.webp",
      "poem": "Around the table, stories grow,\nLaughter echoes, warm and slow.\nFriends like family, this we know,\nThese Sunday moments steal the show.",
      "caption": "Sydney, 2023",
      "sceneId": "fireside",
      "audioId": "piano-warm"
    }
  ],
  "metadata": {
    "version": "1.0",
    "lastUpdated": "2024-12-19"
  }
}
```

---

## Appendix C: Tailwind Config Extensions

```typescript
// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FFFBF5",
          100: "#FFF7ED",
          200: "#FFEDD5",
        },
        warm: {
          400: "#A8A29E",
          600: "#78716C",
          800: "#44403C",
        },
        gold: {
          400: "#FACC15",
          500: "#EAB308",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        poem: ["Crimson Text", "Georgia", "serif"],
      },
      animation: {
        "snow-fall": "snowfall 10s linear infinite",
        "sparkle": "sparkle 2s ease-in-out infinite",
      },
      keyframes: {
        snowfall: {
          "0%": { transform: "translateY(-10vh)" },
          "100%": { transform: "translateY(100vh)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

---

**Document End**
