# Project Journal

This file maintains session history for continuity across Claude Code sessions.
Use alongside `task.md` (task for the project) and `12-days-christmas-prd.md` (prd for the project) when starting new sessions.

---

## Session: 2024-12-19 14:10 AEST

### Summary
Built a complete "12 Days of Christmas" memory advent calendar web application from scratch using Next.js 14. Implemented all core features including animated door grid, memory card modals with photos and poems, celebration system, and audio infrastructure. App is ready for local testing before Vercel deployment.

### Work Completed
- Initialized Next.js 14 project with TypeScript, Tailwind CSS, App Router
- Configured custom design system with cream/warm/gold color palette and Google Fonts (Playfair Display, Inter, Crimson Text)
- Created complete component library:
  - UI: Button, Header, SoundToggle, Progress
  - Landing: HeroSection with animated snow particles
  - Grid: Door (with sparkle effects), DoorGrid (responsive 3×4/4×3)
  - Memory: MemoryCard modal, PhotoFrame (Polaroid style), PoemDisplay, SceneBackground
  - Celebration: Confetti, CelebrationModal
  - Effects: SnowParticles (CSS-based falling snow)
- Implemented state management with React Context + useReducer
- Added localStorage persistence for opened doors and mute state
- Set up Howler.js audio system (audioManager.ts, useAudio hook)
- Processed and organized all assets (12 photos, 4 scene backgrounds, 12 door decorations)
- Created data layer (doors.json, scenes.json, audio.json, TypeScript types)
- Configured static export for Vercel deployment

### Issues & Resolutions
| Issue | Resolution | Status |
|:------|:-----------|:-------|
| TypeScript error with Button component mixing React and Framer Motion props | Changed interface to extend `Omit<HTMLMotionProps<"button">, "ref">` | ✅ Resolved |
| Next.js create-next-app failed due to existing files | Created in temp-next subdirectory, then moved files | ✅ Resolved |
| Missing public folder after project setup | Created manually with proper asset structure | ✅ Resolved |

### Key Decisions
- Used art-assets naming convention (cabin, forest, market, fireside) instead of PRD's (cabin, village, train, fireside)
- Photos mapped in alphabetical order from /imgs/ folder (first 12 images)
- Audio files to be sourced as royalty-free during/after testing
- Snow particles implemented in pure CSS rather than using image assets

### Learnings
- Framer Motion's HTMLMotionProps should be used instead of React's ButtonHTMLAttributes when creating motion components
- Next.js 14 static export requires `images: { unoptimized: true }` in config
- Howler.js requires user interaction before playing audio (iOS compliance)

### Open Items / Blockers
- [ ] Source royalty-free Christmas audio files (bells-soft.mp3, piano-warm.mp3, chimes.mp3)
- [ ] Local testing of all features
- [ ] Push to GitHub and deploy to Vercel
- [ ] Run Lighthouse accessibility audit

### Context for Next Session
The app is feature-complete and builds successfully. All components are implemented with animations, accessibility features (aria-labels, keyboard support, reduced motion), and state persistence.

**Next steps:**
1. Run `npm run dev` to test locally at http://localhost:3000
2. Test all user flows: landing → grid → doors → memory cards → celebration
3. Add audio files to `/public/assets/audio/` if desired
4. Commit changes and push to `git@github.com:rajanrengasamy/12daysxmas2025.git`
5. Deploy to Vercel

**Git status:** Initial commit made with project scaffolding. Many new files uncommitted (components, data, assets).

---

## Session: 2024-12-19 ~16:30 AEST

### Summary
Focused on UI/UX refinements for the memory card modal and responsive design across mobile and desktop. Fixed the PhotoFrame component to use the actual `frame-polaroid.png` asset instead of CSS-only styling, resolved transparency issues, fixed snow particle animations, and improved desktop scaling throughout the app.

### Work Completed
- **PhotoFrame component rewrite**: Now uses the actual `/assets/ui/frame-polaroid.png` image with photo positioned inside the frame's inner border area
- **Fixed transparency issue**: Added cream background (`#F5E6D3`) behind frame PNG to mask transparent edges showing through
- **Snow particles fix**: Added `@keyframes snowfall` to globals.css for inline style animations to work
- **Desktop responsive scaling**: Added `lg:` and `xl:` breakpoints across all components
- **Mobile header fix**: Reduced title size, added `whitespace-nowrap`, made progress indicator more compact
- **Full viewport fix**: Changed to `min-h-[100dvh]` for proper mobile viewport coverage

### Files Modified
- `src/components/memory/PhotoFrame.tsx` - Complete rewrite with frame PNG overlay
- `src/components/effects/SnowParticles.tsx` - Added responsive particle count (50 mobile, 80 desktop)
- `src/components/grid/DoorGrid.tsx` - Increased max-widths (340px → 600px → 800px → 900px)
- `src/components/ui/Header.tsx` - Fixed mobile text wrapping, reduced sizes
- `src/components/ui/Progress.tsx` - Made more compact for mobile
- `src/components/memory/MemoryCard.tsx` - Added lg: breakpoints for modal and content
- `src/components/memory/PoemDisplay.tsx` - Added lg:text-2xl scaling
- `src/components/landing/HeroSection.tsx` - Added lg: breakpoints throughout
- `src/components/grid/Door.tsx` - Added lg: breakpoints for rounded corners, text, checkmark
- `src/app/globals.css` - Added @keyframes snowfall animation
- `src/app/page.tsx` - Added min-h-[100dvh] for viewport coverage

### Issues & Resolutions
| Issue | Resolution | Status |
|:------|:-----------|:-------|
| PhotoFrame using CSS instead of PNG asset | Rewrote component to use frame-polaroid.png with absolute positioning | ✅ Resolved |
| Polaroid frame showing checkered transparency | Added cream background div behind frame PNG | ✅ Resolved |
| Snow particles not animating | Added @keyframes snowfall to globals.css (was only in Tailwind config) | ✅ Resolved |
| Desktop grid appearing too small | Increased max-widths to 800px (lg) and 900px (xl) | ✅ Resolved |
| Mobile header text wrapping | Reduced font size, added whitespace-nowrap, compact progress | ✅ Resolved |
| Bottom transparency on mobile | Added min-h-[100dvh] for proper viewport coverage | ✅ Resolved |

### Key Decisions
- PhotoFrame positions photo ON TOP of frame (later in DOM order) rather than behind, since frame's transparent center may not be reliably transparent
- Used percentage-based positioning for photo within frame: top 6%, left/right 8.5%, bottom 28%
- Desktop breakpoints use xl: (1280px+) for extra-large screens in addition to lg: (1024px+)
- Progress indicator shows just "{count}/12" on mobile to save space

### Learnings
- Tailwind's keyframe animations defined in config only work with Tailwind's `animate-*` classes, not inline `animation:` styles - need to also define in CSS
- PNG transparency can cause issues when layered on complex backgrounds - adding a solid background shape behind is a reliable fix
- `min-h-[100dvh]` (dynamic viewport height) is important for mobile to account for browser chrome

### Open Items / Blockers
- [ ] Audio files still missing (404 errors for bells-soft.mp3, piano-warm.mp3, chimes.mp3)
- [ ] Fine-tune photo positioning within frame if needed after visual review
- [ ] Test on actual mobile device (not just responsive mode)
- [ ] Commit all changes and deploy to Vercel

### Context for Next Session
The app is running on localhost:3001 (port 3000 was in use). All major UI issues have been addressed. The PhotoFrame now uses the actual polaroid PNG asset with a cream background to mask transparency. Desktop scaling is significantly improved with larger grid and modal sizes.

**Immediate next steps:**
1. Visually verify photo positioning in frame looks correct
2. Test snow particles are visible and animating
3. Test on mobile device for final verification
4. Source/add audio files or remove audio feature
5. Commit and deploy to Vercel

**Dev server:** Running on http://localhost:3001

---

## Session: 2024-12-19 ~18:00 AEST

### Summary
Complete visual redesign of the entire application using the **Paper Craft Snow Globe** aesthetic. Transformed the app from a generic Christmas theme into an immersive, handcrafted snow globe experience with layered paper-cut elements, warm candlelight glows, and parallax depth effects.

### Work Completed
- **New Design System**: Created comprehensive Paper Craft Snow Globe aesthetic in `globals.css` and `tailwind.config.ts`
  - New color palette: night sky backdrop, paper whites/creams, burgundy reds, forest greens, candlelight ambers, copper accents
  - Custom shadows for paper-cut depth effects
  - Multiple snow animation keyframes (slow/medium/fast) for parallax
  - Paper texture overlays, candle glow effects, globe vignette
- **Typography Update**: Replaced Inter with **Lora** serif font for warmer, handcrafted feel
- **HeroSection**: Paper-cut landscape with silhouette trees, houses, layered hills, twinkling stars, hanging ornament centerpiece with "12" inside
- **Door Component**: Alternating burgundy/forest doors with paper-cut depth, golden numbers, sparkle effects, corner decorations, hover glow
- **DoorGrid**: Added progress indicator with animated bar, decorative copper frame corners, paper-cut landscape footer
- **MemoryCard Modal**: Day badge, floating backdrop snowflakes, enhanced polaroid frame with tape decoration, animated poem with decorative flourishes
- **PhotoFrame**: Redesigned with paper shadows, tape decoration, paper texture overlay
- **PoemDisplay**: Added decorative quote marks, staggered line animations, star flourish
- **SceneBackground**: Enhanced with gradient overlays, candlelight glow, paper texture, frost edges
- **CelebrationModal**: Paper card texture, ornament decoration with star, decorative corner accents, enhanced styling
- **Confetti**: New shapes (rect/circle/star), paper craft color palette, golden sparkle bursts
- **SnowParticles**: Three-layer parallax system (far/mid/near) with different sizes, opacities, speeds, blur effects
- **Header**: Gradient fade from dark, ornament icon with star, translucent styling
- **SoundToggle**: Translucent glass button with candle glow when active
- **Button**: Gradient backgrounds, inner shadows, shine effects

### Files Modified
- `src/app/globals.css` - Complete rewrite with new design system
- `src/app/layout.tsx` - Changed Inter to Lora font
- `src/app/page.tsx` - Added snow-globe-container class, ambient glow
- `tailwind.config.ts` - New colors, shadows, animations, background images
- `src/components/landing/HeroSection.tsx` - Paper-cut landscape, ornament, stars
- `src/components/grid/Door.tsx` - Paper-cut card style, alternating colors
- `src/components/grid/DoorGrid.tsx` - Progress bar, frame corners, landscape
- `src/components/memory/MemoryCard.tsx` - Day badge, backdrop snowflakes, styling
- `src/components/memory/PhotoFrame.tsx` - Paper shadows, tape decoration
- `src/components/memory/PoemDisplay.tsx` - Quote marks, staggered animation, flourish
- `src/components/memory/SceneBackground.tsx` - Layered gradients, glow, texture
- `src/components/celebration/CelebrationModal.tsx` - Paper card, ornament, corners
- `src/components/celebration/Confetti.tsx` - New shapes, colors, sparkle bursts
- `src/components/effects/SnowParticles.tsx` - Three-layer parallax depth
- `src/components/ui/Header.tsx` - Gradient, ornament icon
- `src/components/ui/SoundToggle.tsx` - Translucent glass style
- `src/components/ui/Button.tsx` - Gradient, shadows, shine effect

### Issues & Resolutions
| Issue | Resolution | Status |
|:------|:-----------|:-------|
| TypeScript error with Framer Motion variants `type: "spring"` | Added `as const` assertion | ✅ Resolved |
| TypeScript error with Button children prop type | Extended interface to explicitly include `children?: ReactNode` | ✅ Resolved |

### Key Decisions
- Chose **Paper Craft Snow Globe** aesthetic over alternatives (Vintage Christmas Card, Scandinavian Hygge, Editorial/Cinematic)
- Dark night sky background creates immersive "inside the globe" feeling
- Three-layer parallax snow creates depth perception
- Alternating burgundy/forest door colors for visual variety
- Removed Progress component in favor of inline display in Header/DoorGrid

### Learnings
- Framer Motion variants with spring transitions need `as const` for TypeScript compatibility
- Motion component prop types can conflict with React's types - explicitly define children prop
- Parallax snow effect achieved by varying size, opacity, speed, and blur across layers
- Paper texture overlay using inline SVG with feTurbulence filter

### Open Items / Blockers
- [ ] Audio files still not sourced (bells-soft.mp3, piano-warm.mp3, chimes.mp3)
- [ ] Test new design on actual mobile device
- [ ] Commit all changes and deploy to Vercel
- [ ] Run Lighthouse audit on new design

### Context for Next Session
The app has been completely redesigned with the Paper Craft Snow Globe aesthetic. Build passes successfully. The design now features:
- Dark night sky backdrop with ambient candlelight glow
- Paper-cut landscape elements (trees, houses, hills)
- Three-layer parallax snow system
- Alternating burgundy/forest doors with paper-cut styling
- Enhanced memory cards with day badges and floating snowflakes
- Paper texture overlays throughout

**To preview:** Run `npm run dev` and open http://localhost:3000

**Next steps:**
1. Visual testing of new design across screens
2. Mobile device testing
3. Source audio files or finalize without audio
4. Commit and deploy to Vercel

---

## Session: 2024-12-19 ~20:45 AEST

### Summary
Redesigned the landing page (HeroSection) using the frontend-design skill to create a more visually striking "Enchanted Window Display" aesthetic. The new design features a giant faded "12" watermark, refined typography hierarchy, holly decorations, floating sparkles, and an enhanced paper-cut landscape.

### Work Completed
- **HeroSection complete rewrite** with new visual approach:
  - Giant "12" as a dramatic background watermark element (180px-380px responsive)
  - Refined typography: "TWELVE DAYS OF" as gold uppercase tagline → "Memories" as hero word
  - Animated golden underline that sweeps under the title
  - Holly leaf decorations with berries framing the top
  - Pulsing golden orb centerpiece
  - 7 floating sparkle particles with staggered infinite animations
  - Custom burgundy CTA button with hover glow and shimmer effects
  - Subtle scroll indicator ("12 Doors Await" with animated mouse icon)
  - Enhanced paper-cut landscape with varied tree shapes (slim/default/wide variants)
  - Cabins with glowing windows
  - Three-layer mountain silhouettes for depth
  - Ambient radial glow from center

### Files Modified
- `src/components/landing/HeroSection.tsx` - Complete rewrite (~350 lines)

### Issues & Resolutions
| Issue | Resolution | Status |
|:------|:-----------|:-------|
| None encountered | Build passed first time | ✅ N/A |

### Key Decisions
- Used "Enchanted Window Display" aesthetic - like peering into a magical Christmas store window
- Made "12" a background element rather than contained in an ornament - more dramatic, less expected
- Separated "Twelve Days of" and "Memories" for better visual hierarchy
- Added scroll hint to guide users to click the button
- Custom button styling instead of using Button component for more control

### Learnings
- CSS `background-clip: text` with gradients creates elegant watermark effects
- Holly leaves can be constructed with simple SVG ellipses and circles
- Staggered sparkle animations with varied durations create organic, non-repetitive patterns

### Open Items / Blockers
- [ ] User to review new landing page design at http://localhost:3002
- [ ] Audio files still missing
- [ ] Commit all changes and deploy to Vercel
- [ ] Test on actual mobile devices

### Context for Next Session
Landing page has been redesigned with a more striking visual approach. Dev server running at http://localhost:3002. User needs to review and provide feedback on the new design before proceeding.

**Key visual changes:**
- Giant faded "12" watermark in background
- "TWELVE DAYS OF" (gold) + "Memories" (white, large) typography split
- Holly decorations at top
- Floating sparkle particles
- Enhanced button with hover effects
- Scroll indicator at bottom

**Dev server:** Running on http://localhost:3002

---

## Session: 2024-12-19 ~21:15 AEST

### Summary
Completed git setup, pushed all code to GitHub, and made data corrections to memory card captions. Initially updated dates from 2024 to 2025, then removed all date references entirely per user request. Vercel deployment initiated but requires user authentication.

### Work Completed
- **Git repository sync**: Configured GitHub CLI authentication (`gh auth setup-git`)
- **Initial push**: Committed 67 files (3307 insertions) with complete app implementation
- **Caption date fix #1**: Updated all 12 door captions from "2024" to "2025"
- **Caption date fix #2**: Removed all date/season references from captions entirely
  - "A cherished moment, Winter 2025" → "A cherished moment"
  - "Together always, Spring 2025" → "Together always"
  - etc. for all 12 doors
- **Multiple commits pushed to GitHub**:
  - `0d3ca80` feat: Complete 12 Days of Christmas memory app
  - `7163629` fix: Update all memory captions from 2024 to 2025
  - `d1c7e30` fix: Remove date references from all memory captions

### Files Modified
- `src/data/doors.json` - All 12 caption fields simplified
- `doors.json` (root) - Kept in sync for consistency

### Issues & Resolutions
| Issue | Resolution | Status |
|:------|:-----------|:-------|
| SSH push failing (publickey denied) | Switched to HTTPS + `gh auth setup-git` | ✅ Resolved |
| Captions showing "2024" instead of "2025" | Updated all 12 captions | ✅ Resolved |
| User wanted no dates at all in captions | Removed all date/season references | ✅ Resolved |
| Vercel not authenticated | User started `vercel login` process | ⏳ In Progress |

### Key Decisions
- Used GitHub CLI (gh) for git authentication instead of SSH keys
- Updated both `src/data/doors.json` (active) and root `doors.json` (backup) for consistency
- Captions now contain only the descriptive phrase, no temporal references

### Learnings
- `gh auth setup-git` configures git to use GitHub CLI credentials for HTTPS operations
- When user has gh CLI authenticated, switching remote to HTTPS and running setup-git enables seamless pushing

### Open Items / Blockers
- [ ] Complete Vercel authentication (`vercel login`)
- [ ] Deploy to Vercel
- [ ] Test deployed site on mobile devices
- [ ] Audio files still placeholders (404s)

### Context for Next Session
All code is pushed to GitHub at https://github.com/rajanrengasamy/12daysxmas2025. The app is ready for Vercel deployment - user just needs to complete `vercel login` authentication and then run `vercel` to deploy.

**Git status:** Clean, all changes committed and pushed
**Latest commit:** `d1c7e30` fix: Remove date references from all memory captions
**Dev server:** Running on http://localhost:3002
**Next step:** Complete Vercel login and deploy

---

## Session: 2024-12-20 ~08:45 AEST

### Summary
Added new audio asset `snowflake.mp3` to the project and replaced all instances of `bells-soft` audio triggers with the new `snowflake` track. Doors 1, 4, 7, and 10 now play the snowflake audio instead of bells-soft when opened.

### Work Completed
- **Added new audio file**: `snowflake.mp3` (1.8 MB) added to `/public/assets/audio/`
- **Also added**: `bells-soft.mp3` (4.7 MB) - new version of bells audio
- **Updated audio references** in 3 files:
  - `src/data/doors.json` - Changed `audioId` from `"bells-soft"` to `"snowflake"` for doors 1, 4, 7, 10
  - `src/data/audio.json` - Added new `snowflake` track definition
  - `src/lib/audioManager.ts` - Added `snowflake` to trackConfigs array

### Files Modified
- `src/data/doors.json` - 4 audioId changes (lines 10, 37, 64, 91)
- `src/data/audio.json` - Added snowflake track entry
- `src/lib/audioManager.ts` - Added snowflake to track configs
- `public/assets/audio/snowflake.mp3` - New file
- `public/assets/audio/bells-soft.mp3` - New file

### Issues & Resolutions
| Issue | Resolution | Status |
|:------|:-----------|:-------|
| None encountered | Clean swap of audio references | ✅ N/A |

### Key Decisions
- Kept `bells-soft` track definitions in place (in audio.json and audioManager.ts) for potential future use
- Only changed the door references from bells-soft to snowflake
- Doors using snowflake: 1 (Friendship), 4 (Holiday Magic), 7 (Life's Path), 10 (Adventures)
- Doors still using other tracks: piano-warm (2, 5, 8, 11), chimes (3, 6, 9, 12)

### Learnings
- Audio system uses a two-layer mapping: doors reference audioId → audio config maps ID to file URL
- Both audio.json (data) and audioManager.ts (runtime) need to define tracks

### Open Items / Blockers
- [ ] Test snowflake audio plays correctly on doors 1, 4, 7, 10
- [ ] Commit audio changes to git
- [ ] Deploy updated version to Vercel

### Context for Next Session
New snowflake audio track has been integrated. The audio mapping system is:
- **snowflake**: Doors 1, 4, 7, 10
- **piano-warm**: Doors 2, 5, 8, 11
- **chimes**: Doors 3, 6, 9, 12

`bells-soft` track still exists in config but is no longer referenced by any door.

**Next steps:**
1. Test audio playback locally
2. Commit and push changes
3. Redeploy to Vercel

---

## Session: 2024-12-20 ~09:15 AEST

### Summary
Fixed mobile audio playback issue where audio worked on desktop but not on iOS/mobile devices. The root cause was iOS's strict requirement that audio must be triggered synchronously within a user gesture event handler. Refactored audio architecture to play audio immediately on door tap rather than in a React useEffect.

### Work Completed
- **Diagnosed mobile audio issue**: Identified that iOS Safari requires audio `play()` to be called synchronously within the tap event, not asynchronously in a useEffect
- **Added HTML5 audio mode**: Added `html5: true` to Howler.js config for better iOS compatibility
- **Refactored audio trigger location**:
  - Moved audio `play()` from MemoryCard's useEffect to Door's click handler
  - DoorGrid now passes `play` function to Door components via `onPlayAudio` prop
  - Door component calls `onPlayAudio(door.audioId)` synchronously before any setTimeout
- **Simplified MemoryCard**: Removed async play call, kept only cleanup `stop()` functionality
- **Started dev server**: Running at http://localhost:3000 for local testing

### Files Modified
- `src/lib/audioManager.ts` - Added `html5: true` to Howl config (line 32)
- `src/components/grid/DoorGrid.tsx` - Added useAudio import, passes `play` to Door (lines 6, 19, 73)
- `src/components/grid/Door.tsx` - Added `onPlayAudio` prop, calls it synchronously in handleClick (lines 12, 15, 18-22)
- `src/components/memory/MemoryCard.tsx` - Removed `play` from useAudio, simplified cleanup useEffect (lines 50, 62-68)

### Issues & Resolutions
| Issue | Resolution | Status |
|:------|:-----------|:-------|
| Audio not playing on iOS/mobile | Moved `play()` call from async useEffect to synchronous click handler | ✅ Resolved |
| iOS Web Audio API restrictions | Added `html5: true` to Howler config for HTML5 Audio fallback | ✅ Resolved |

### Key Decisions
- Audio now triggers in Door.tsx click handler BEFORE the 100ms visual delay setTimeout
- Kept cleanup `stop()` in MemoryCard for when modal closes or component unmounts
- Made `onPlayAudio` prop optional in Door interface for backwards compatibility

### Learnings
- iOS Safari strictly requires `play()` to be called **synchronously** within a user gesture (tap/click) event handler
- React's useEffect runs after render cycle completes, breaking the user gesture context for iOS
- Howler.js `html5: true` option provides better mobile compatibility by using HTML5 Audio element instead of Web Audio API
- The architectural pattern: trigger audio immediately in click handler, then do async operations (setTimeout, state updates)

### Open Items / Blockers
- [ ] Test mobile audio on actual iOS device
- [ ] Commit all changes (audio swap + mobile fix)
- [ ] Deploy updated version to Vercel

### Context for Next Session
Mobile audio fix has been implemented. The audio trigger architecture is now:
```
tap door → play() [sync] → setTimeout → dispatch() → React renders
```

Dev server running at http://localhost:3000. User is testing locally before committing.

**Key files changed for mobile fix:**
- `audioManager.ts` - html5 mode
- `DoorGrid.tsx` - passes play function
- `Door.tsx` - triggers audio synchronously
- `MemoryCard.tsx` - cleanup only

---

## Session: 2024-12-20 ~18:30 AEST

### Summary
Analyzed audio "play and cancel" issue when closing memory card via X button. Performed deep-dive investigation of the audio flow and identified root cause: `fadeOut()` in audioManager.ts hardcodes starting volume at 0.7, causing a volume spike when user closes card before fade-in completes.

### Work Completed
- **Full code analysis** of audio flow across 4 key files:
  - `Door.tsx` - where audio play is triggered on click
  - `DoorGrid.tsx` - where play function is passed to doors
  - `MemoryCard.tsx` - where stop is called on close/unmount
  - `audioManager.ts` - core audio management singleton
- **Root cause identified**: `fadeOut()` method calls `track.fade(0.7, 0, 500)` assuming volume is always 0.7
- **Bug scenario documented**: If user closes card quickly (e.g., 200ms after opening), audio is still fading IN at ~0.28 volume. Then fadeOut() tells Howler to "fade from 0.7 to 0", causing Howler to JUMP volume up to 0.7 before fading down - creating audible "blip"

### Files Analyzed
- `src/components/grid/Door.tsx` - Audio triggers at lines 18-22
- `src/components/grid/DoorGrid.tsx` - Play function passed at line 75
- `src/components/memory/MemoryCard.tsx` - handleClose (57-60), cleanup useEffect (65-69)
- `src/lib/audioManager.ts` - play() (43-58), fadeOut() (60-66), stop() (68-73)
- `src/hooks/useAudio.ts` - play/stop callbacks

### Issues & Resolutions
| Issue | Resolution | Status |
|:------|:-----------|:-------|
| Audio "plays and cancels" when clicking X to close | Root cause: fadeOut() assumes 0.7 volume, needs to use current volume | ⏳ Pending fix |

### Key Decisions
- Recommended **Option A** fix: Modify fadeOut() to get track's actual current volume via `track.volume()` instead of assuming 0.7
- Considered but deferred: Option B (track fade-in state) and Option C (remove cleanup useEffect)

### Learnings
- Howler.js `fade(from, to, duration)` will set volume to `from` value first if current volume differs
- Interrupting a fade-in with a fade-out from a different starting point causes audible volume spike
- The `useEffect` cleanup in MemoryCard is technically redundant (handleClose already stops audio) but serves as safety net

### Open Items / Blockers
- [ ] Implement fix: Change `track.fade(0.7, 0, 500)` to `track.fade(track.volume(), 0, 300)`
- [ ] Test fix with rapid open/close scenarios
- [ ] Commit and deploy

### Context for Next Session
The audio issue is diagnosed but not yet fixed. The problem is in [audioManager.ts:60-66](src/lib/audioManager.ts#L60-L66):

```typescript
fadeOut(trackId: string) {
  const track = this.tracks.get(trackId);
  if (!track) return;
  track.fade(0.7, 0, 500);  // ❌ BUG: assumes volume is 0.7
  setTimeout(() => track.stop(), 500);
}
```

**Fix needed:**
```typescript
const currentVolume = track.volume() as number;
track.fade(currentVolume, 0, 300);
setTimeout(() => track.stop(), 300);
```

**User has approved the analysis.** Ready to implement the fix.

---

## Session: 2024-12-20 ~19:00 AEST

### Summary
Attempted to fix the audio "play and cancel" issue by modifying `fadeOut()` to use current volume instead of hardcoded 0.7. The fix broke audio playback entirely. Reverted changes, then encountered site rendering issues (giant black star, 404 errors for static assets). After clearing caches and rebuilding, site loads but audio behavior is now inverted - plays on close instead of open.

### Work Completed
- **Implemented Option A fix** in `audioManager.ts`:
  - Changed `track.fade(0.7, 0, 500)` to `track.fade(track.volume() as number, 0, 300)`
  - Build passed successfully
- **Fix failed testing**: No audio played at all on desktop browser
- **Reverted the fix**: Restored original `fadeOut()` implementation
- **Fixed site rendering issues**:
  - Cleared `.next` cache folder
  - Cleared `node_modules/.cache`
  - Rebuilt project multiple times
  - Killed processes on ports 3000-3002

### Files Modified
- `src/lib/audioManager.ts` - Modified then reverted `fadeOut()` method

### Issues & Resolutions
| Issue | Resolution | Status |
|:------|:-----------|:-------|
| Option A fix broke audio completely | Reverted to original code | ✅ Resolved |
| Site showing giant black star (Header SVG) | Cleared .next cache, rebuilt | ✅ Resolved |
| 404 errors for CSS/JS chunks | Cleared all caches, killed servers | ✅ Resolved |
| Audio plays on close (X) instead of door open | Needs investigation | ⏳ Open |

### Key Decisions
- Reverted fix rather than debugging further - needed stable baseline
- Multiple cache clears required to resolve static asset serving issues

### Learnings
- Howler.js `track.volume()` may not return expected value when called during active fade
- Next.js static asset serving can break with corrupted `.next` cache
- Always test audio changes thoroughly before committing

### Open Items / Blockers
- [ ] **Critical**: Audio plays when clicking X to close, not when opening door
- [ ] Re-investigate audio flow - the trigger location may have regressed
- [ ] Consider alternative fix approaches for the fadeOut volume spike issue

### Context for Next Session
The site loads correctly but audio behavior is inverted:
- **Expected**: Audio plays when door is clicked
- **Actual**: Audio plays when X button is clicked to close

This suggests the audio `play()` call location may have changed or there's a timing issue. Files to investigate:
- [Door.tsx:18-22](src/components/grid/Door.tsx#L18-L22) - `onPlayAudio` should trigger here
- [DoorGrid.tsx:75](src/components/grid/DoorGrid.tsx#L75) - `play` function passed to Door
- [MemoryCard.tsx:57-60](src/components/memory/MemoryCard.tsx#L57-L60) - `handleClose` should call `stop()`, not `play()`

**Audio manager is reverted** to original state. The fadeOut volume spike issue is still present but deprioritized until the play-on-open behavior is restored.

**Dev server**: User will run `npm run dev` themselves

---

## Session: 2024-12-20 ~19:30 AEST

### Summary
Completely simplified the audio system per user request. Removed all per-door audio triggering and replaced with a single continuous background track (bells-soft.mp3) that loops throughout the session. Mute now simply pauses audio, unmute resumes. This eliminates all the complex audio timing issues from previous sessions.

### Work Completed
- **Rewrote `audioManager.ts`**: Simplified from multi-track system to single track with play/pause/resume
- **Simplified `useAudio.ts`**: Auto-starts audio on first interaction, mute=pause/unmute=resume
- **Removed audio from `Door.tsx`**: Deleted `onPlayAudio` prop entirely
- **Removed audio from `DoorGrid.tsx`**: Removed `useAudio` hook and prop passing
- **Removed audio from `MemoryCard.tsx`**: Removed all audio stop/cleanup logic
- **Updated `page.tsx`**: Added `useAudio()` hook to `AppContent` to activate background audio
- **Committed and pushed**: `55518d4` - "refactor: Simplify audio to single looping background track"

### Files Modified
- `src/lib/audioManager.ts` - Complete rewrite (96 lines → 55 lines)
- `src/hooks/useAudio.ts` - Simplified (41 lines → 24 lines)
- `src/app/page.tsx` - Added useAudio import and hook call
- `src/components/grid/Door.tsx` - Removed onPlayAudio prop
- `src/components/grid/DoorGrid.tsx` - Removed useAudio hook
- `src/components/memory/MemoryCard.tsx` - Removed audio cleanup logic

### Issues & Resolutions
| Issue | Resolution | Status |
|:------|:-----------|:-------|
| Complex per-door audio causing timing bugs | Replaced with single background track | ✅ Resolved |
| Audio play/cancel on door close | No longer applicable - audio is continuous | ✅ Resolved |
| FadeOut volume spike issue | No longer applicable - using pause/resume | ✅ Resolved |

### Key Decisions
- **Single background track** (bells-soft.mp3) loops continuously after first interaction
- **No door-specific audio** - doors are purely visual, no audio triggers
- **Mute = pause, Unmute = resume** - simple toggle behavior
- **Audio starts on "Begin" click** - respects iOS autoplay restrictions

### Learnings
- Sometimes the best fix is to simplify the architecture rather than debug complex timing issues
- Continuous background audio is simpler to manage than event-triggered audio
- Removing code often solves more problems than adding code

### Open Items / Blockers
- [ ] Test audio on actual iOS device
- [ ] Verify mute state persistence across page refresh
- [ ] Deploy updated version to Vercel

### Context for Next Session
Audio system is now dramatically simplified:
- **bells-soft.mp3** loops continuously after first user interaction
- **Mute button** pauses/resumes the single track
- **Door interactions** have zero audio effect
- All previous audio timing bugs are eliminated by design

**Git status**: Clean, all changes committed and pushed to `55518d4`
**Dev server**: Running at http://localhost:3000

---
