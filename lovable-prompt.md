# Lovable Prompt: 12 Days of Christmas Memory App

## Ready-to-Paste Prompt

---

Build a mobile-first "12 Days of Christmas" memory app with a Studio Ghibli-inspired warm, hand-painted aesthetic. This is a personal memory-sharing experience for a holiday gathering.

---

## VISUAL IDENTITY & AESTHETIC

Create a Studio Ghibli-inspired visual style with these specific characteristics:

**Color Palette:**
- Primary background: Soft cream (#FDF6E3, #FAF3E0)
- Warm browns: #8B7355, #A0826D, #C4A77D
- Gentle reds: #C75B5B, #D4847C (muted, not harsh)
- Gentle greens: #7D9B76, #A8C69F (sage-like, not bright)
- Accent gold: #D4A574, #E8C88B
- Text: Warm charcoal (#3D3D3D) or dark brown (#4A3728)

**Ghibli Aesthetic Elements:**
- Soft watercolor edges on all UI elements (use subtle box-shadows with spread, or CSS filters)
- Film grain overlay (subtle noise texture at 3-5% opacity across the entire viewport)
- Warm lighting effect: subtle radial gradient from center (warm cream) fading to edges (slightly darker)
- Hand-painted texture: use subtle paper or canvas texture backgrounds
- Rounded, organic shapes (border-radius: 16-24px on cards, 12px on buttons)
- Soft drop shadows with warm undertones (rgba(139, 115, 85, 0.15))
- No harsh lines or stark contrasts

---

## LAYOUT & STRUCTURE

### Component Hierarchy

```
App
├── Header
│   ├── Title ("12 Days of Memories")
│   └── AudioToggle (mute/unmute button)
├── Main
│   ├── LandingView (initial state)
│   │   ├── HeroSection
│   │   │   ├── Title
│   │   │   ├── Subtitle/intro text
│   │   │   └── StartButton
│   │   └── SnowParticles (optional, toggleable)
│   └── GridView (after start)
│       ├── DoorsGrid (3x4)
│       │   └── DoorCard (x12)
│       │       ├── DoorNumber
│       │       ├── DoorDecoration (holly, ribbon, etc.)
│       │       └── OpenedIndicator (checkmark or glow when opened)
│       └── ProgressIndicator ("4 of 12 memories unlocked")
├── MemoryCardModal (overlay when door opens)
│   ├── BackgroundScene (full-bleed Ghibli-style illustration)
│   ├── ContentContainer
│   │   ├── PolaroidFrame
│   │   │   ├── PhotoImage
│   │   │   └── PhotoCaption
│   │   ├── PoemText
│   │   └── CloseButton
│   └── GrainOverlay
└── Footer (optional: "Made with love for [group name]")
```

### Responsive Breakpoints

```css
/* Mobile-first base styles */
/* Small phones (320px - 374px) */
@media (min-width: 320px) {
  /* Door size: 88px x 110px, gap: 12px */
}

/* Standard phones (375px - 424px) */
@media (min-width: 375px) {
  /* Door size: 100px x 125px, gap: 16px */
}

/* Large phones (425px - 767px) */
@media (min-width: 425px) {
  /* Door size: 110px x 138px, gap: 20px */
}

/* Tablets and larger (768px+) */
@media (min-width: 768px) {
  /* Door size: 140px x 175px, gap: 24px */
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  /* Max container width: 600px centered */
}
```

### Door Grid Specifications

- **Grid layout**: 3 columns x 4 rows (`grid-template-columns: repeat(3, 1fr)`)
- **Minimum door tap target**: 88px x 88px (WCAG AA touch target)
- **Door aspect ratio**: 4:5 (width:height) for visual appeal
- **Gap between doors**: 12-20px depending on viewport
- **Door visual style**:
  - Wooden texture or painted appearance
  - Raised/embossed look with layered shadows
  - Number displayed prominently (hand-drawn or serif font)
  - Subtle decorative elements (holly leaves, ribbon bow)

---

## ANIMATIONS (Framer Motion)

### Door Tap Sequence

```javascript
// Phase 1: Tap Feedback (100ms)
whileTap={{ scale: 0.95 }}
transition={{ duration: 0.1 }}

// Phase 2: Anticipation Jiggle (300ms)
animate={{
  rotate: [0, -3, 3, -2, 2, 0],
}}
transition={{
  duration: 0.3,
  ease: "easeInOut"
}}

// Phase 3: Door Open (500ms)
animate={{
  rotateY: 90,
  opacity: 0
}}
transition={{
  type: "spring",
  stiffness: 100,
  damping: 15,
  duration: 0.5
}}
```

### Memory Card Reveal (400ms)

```javascript
// Modal backdrop
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.3 }}

// Card content
initial={{ opacity: 0, scale: 0.8, y: 20 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
transition={{
  type: "spring",
  stiffness: 200,
  damping: 20,
  delay: 0.1
}}

// Polaroid frame (staggered)
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.2, duration: 0.4 }}

// Poem text (staggered)
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.4, duration: 0.5 }}
```

---

## AUDIO IMPLEMENTATION

### Global Audio State

```javascript
const [isMuted, setIsMuted] = useState(false);
const [audioReady, setAudioReady] = useState(false);

// Initialize audio on first user interaction
useEffect(() => {
  const initAudio = () => {
    setAudioReady(true);
    document.removeEventListener('click', initAudio);
  };
  document.addEventListener('click', initAudio);
}, []);
```

### Jingle Playback on Reveal

```javascript
const playRevealJingle = () => {
  if (isMuted || !audioReady) return;
  const audio = new Howl({
    src: ['/audio/jingle.mp3'],
    volume: 0,
    onplay: () => { audio.fade(0, 0.7, 500); }
  });
  audio.play();
};
```

---

## CONTENT DATA STRUCTURE

```typescript
interface Door {
  number: number;           // 1-12
  title: string;            // Memory title
  imageUrl: string;         // Path to photo
  backgroundScene: string;  // Background identifier
  poem: string;             // 4-8 lines
  caption: string;          // Photo caption
  audioTrack?: string;      // Optional specific jingle
}

interface AppState {
  hasStarted: boolean;
  openedDoors: number[];
  currentlyViewing: number | null;
  isMuted: boolean;
}
```

---

## ACCESSIBILITY (A11Y)

### Keyboard Navigation
- All doors focusable with Tab key
- Enter/Space to open door
- Escape to close modal
- Focus trap inside modal when open

### Screen Reader Support
```jsx
<button
  aria-label={`Open door ${door.number}: ${door.title}`}
  aria-pressed={isOpened}
>
  {door.number}
</button>

<div role="dialog" aria-modal="true" aria-labelledby="memory-title">
  <h2 id="memory-title">{door.title}</h2>
</div>
```

### Motion Preferences
```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
```

---

## TECHNICAL SPECIFICATIONS

### Dependencies

```json
{
  "dependencies": {
    "framer-motion": "^10.x",
    "howler": "^2.2.x",
    "@radix-ui/react-dialog": "^1.x"
  }
}
```

### Performance Targets

- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Total bundle size: < 200KB (gzipped)
- Image optimization: WebP format, max 200KB per photo

---

## IMPLEMENTATION PHASES

### Phase 1: Core Structure (Start Here)
- Landing page with title and start button
- 12-door grid (3x4) with placeholder numbers
- Basic tap interaction
- Warm color palette applied

### Phase 2: Door Interactions
- Framer Motion jiggle + open animation
- Modal overlay appearing on door tap
- Close button functionality
- Opened door visual state

### Phase 3: Memory Card Content
- Polaroid frame component
- Background scene integration
- Poem text display
- Staggered reveal animations

### Phase 4: Audio & Polish
- Mute toggle in header
- Jingle playback on reveal
- Snow particles (optional)
- Film grain overlay

### Phase 5: Content Integration
- Replace placeholders with real photos
- Add all 12 poems
- Final background scenes
- Testing on real devices

---

## TESTING CHECKLIST

- [ ] All 12 doors open correctly
- [ ] Animations feel smooth (60fps)
- [ ] Audio plays on reveal (when not muted)
- [ ] Mute toggle persists across sessions
- [ ] Opened doors show visual distinction
- [ ] Modal closes with X button and Escape key
- [ ] Works on iPhone Safari
- [ ] Works on Android Chrome
- [ ] Images load with fallback for errors
- [ ] Keyboard navigation functions
- [ ] Screen reader announces door states

---

*Ready to paste into Lovable. Start with Phase 1 and iterate.*
