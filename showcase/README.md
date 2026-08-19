# Codex Five

Five original, framework-free web experiences built as a local design and engineering showcase.

## Start

From the repository root:

```powershell
node showcase/server.mjs
```

Open `http://localhost:4173/`. Set another port with `$env:PORT=5000` before starting.

## Routes

- `/` — exhibition index
- `/lumen/` and `/lumen/guide/`
- `/forge/` and `/forge/guide/`
- `/tideline/` and `/tideline/guide/`
- `/pulse/` and `/pulse/guide/`
- `/orbit/` and `/orbit/guide/`

## Asset provenance

All five WebP hero images in `assets/` are original project-bound outputs created with Codex built-in image generation. The prompt set requested: a cyan glass bioluminescent botanical specimen; a chrome mechanism in a vermilion brutalist chamber; a surreal fog-blue ocean, moon, and stair; liquid full-spectrum sound membranes on black; and an apricot dessert planet with orbiting ingredients. Every prompt explicitly excluded people, logos, text, and watermarks.

Each hero also has a locally stored five-second MP4 breathing loop in `assets/`. These videos were animated from the original WebP artwork with Kling 3.0 through the authenticated Higgsfield integration, using the same source artwork as both the locked start and end frame. They autoplay muted and inline, loop continuously without a hard visual reset, and fall back to the WebP poster when playback is unavailable or the visitor requests reduced motion.

All other visual elements, planets, particles, motion, compositing, and interactions are code-native. Higgsfield was verified during preflight but no paid generation was needed for the final runtime.

## Runtime

The server and sites use only Node.js built-ins, semantic HTML, CSS, Canvas 2D, Web Audio, Pointer Events, and vanilla JavaScript. Google Fonts are a progressive enhancement; system fallbacks remain usable offline.
