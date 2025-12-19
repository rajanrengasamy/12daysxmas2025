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
