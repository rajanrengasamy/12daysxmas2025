1) Refined concept and PRD (functional + technical)
Product vision

A mobile-first “12 Days of Christmas” memory experience for your mates: 12 numbered doors that animate open to reveal a photo memory, a short poem, and a festive jingle, all presented inside a cozy, whimsical, hand-painted, anime-inspired winter world.

Note on theme: It’s safer to describe the art direction as “whimsical hand-painted anime fantasy, warm watercolor, soft light, cozy winter interiors” rather than naming a specific studio style.

PRD
Goals

Make people smile in under 10 seconds.

Each door reveal feels delightful: animation + sound + poem + photo.

Super easy for you to curate content (12 photos, 12 poems, optional captions).

Loads fast on mobile, works on flaky Wi-Fi at a party.

Non-goals

No social network features (comments, likes).

No heavy authentication flows.

No complex photo editing inside the app (unless you want it later).

Target users

Primary: your friends attending the get-together (mobile users).

Admin: you (curator).

Core user flow (guest)

Landing screen: title, short intro, “Start” button, sound toggle.

The “Calendar” screen: 12 doors in a 3x4 grid (thumb-friendly).

Tap a door:

Door jiggles, pops, then opens (flip, slide, or burst animation).

A reveal modal or full-screen “Memory Card” appears.

Memory Card includes:

Photo presented as a Polaroid or framed print.

Poem (4 to 12 lines).

Optional caption: where/when.

Background scene (winter town, cabin, train ride, etc.).

Jingle plays automatically (with mute control).

Close card: returns to grid, door shows “opened” state.

Progress: “7/12 opened” and a subtle completion reward at 12/12.

Door rules (pick one default)

Party mode (recommended): all 12 doors available immediately.

Countdown mode: unlock 1 per day based on Australia/Sydney time.

Hybrid: allow “unlock all” with a passphrase.

Content model (what you need per door)

For each door (1..12):

title: “The Bali Night”, “That Random Tuesday”, etc.

image: photo (preferably portrait-friendly crop)

poem: short poem text

optional caption: place, year

scene: one of N predefined background templates

audio: one of N jingles, or per-door jingle

optional: “inside joke” line for your mates

UX and interaction specs

Grid layout:

3 columns x 4 rows on phones

4 columns x 3 rows on larger screens

Thumb-friendly door size: minimum 88px tap targets.

Motion:

Use one animation library only to keep it simple.

Provide “Reduce motion” support (system setting).

Sound:

Global mute toggle always visible.

On iOS, audio starts after first user interaction (normal browser restriction).

Delight touches:

Subtle snow particle effect (can be disabled for performance).

Tiny “sparkle” on unopened doors.

Completion screen: group toast message, confetti, optionally a “group photo” door 12.

Accessibility

High contrast text over backgrounds (scrim overlay).

All buttons labeled for screen readers.

Reduce motion mode.

Optional captions for audio or a transcript (poem covers most of it).

Privacy and sharing

If you host publicly, assume the URL can leak.

Options:

Simple password gate (one shared password).

Unlisted link + basic rate limiting.

If photos are sensitive: store them behind signed URLs (more effort, more secure).

Technical PRD
Recommended architecture (simple and robust)

Static-first web app (fast, cheap, low maintenance):

Frontend: Next.js or Astro + React

Styling: Tailwind

Animation: Framer Motion (or GSAP, pick one)

Audio: Howler.js (simple audio control)

Content: a single JSON file + assets folder (or small CMS later)

Hosting: Vercel (or Cloudflare Pages)

This avoids databases and auth, perfect for a party app.

More powerful architecture (if you want admin UI and uploads)

Frontend: Next.js

Backend: Supabase (auth optional), storage for photos/audio, table for door content

Admin: protected admin route for uploading images and editing poems

Data structures (example)

doors.json with 12 entries referencing:

image path or remote URL

poem text

scene template id

audio track id

Scene rendering approaches

Template backgrounds (best effort, easiest)

Use a set of 8 to 12 illustrated background images.

Overlay the photo in a “frame” with CSS transforms, shadows, and subtle film grain.

Client-side compositing

Background scene image + photo inside a masked frame

Optional parallax on tilt/scroll

Pre-render composites

You pre-compose each scene in Canva/Figma, export final images

Fastest runtime, least code complexity

Performance budgets (mobile)

First load under ~2 MB if possible (use image compression).

Lazy load door content images, preload only thumbnails.

Use responsive images (AVIF/WebP) and caching headers.

Analytics (optional)

Basic: count opens per door, total completion.

Keep it privacy-friendly, no user tracking needed.

QA checklist

iPhone Safari: audio behavior, safe areas, scroll locking in modal.

Android Chrome: performance, tap latency.

Reduce motion and mute toggle.

Slow network: thumbnails still load quickly.