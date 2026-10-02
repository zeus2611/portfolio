# PLAN: build order

Work one phase at a time. At each **checkpoint**, stop, summarise the changes, list any TODOs
found, and wait for the owner's go-ahead.

## Phase 0: Read and propose (no code)
- Read CLAUDE.md, every file in `docs/`, and any screenshots in `docs/mockups/`.
- Inspect the current repo (framework, the Go service, deployment config). Look at
  `github.com/zeus2611/daksha` for the token and theme-provider patterns only.
- Reply with: what you'll delete, what you'll keep (the Vercel project and the domain), the folder
  structure, the component list, and any conflicts you found between the docs.
- **Checkpoint 0**

## Phase 1: Foundation
- Create the `v3` branch and scaffold Next.js (App Router, strict TypeScript, `output: "export"`)
  with Tailwind v4 and pnpm scripts.
- Add the tokens (light and dark) via `@theme inline`, a theme toggle with no flash on load, and the
  fonts via `next/font`.
- Build the layout: skip link, nav (Experience · Work · Open source · Résumé), footer, and the wide
  and reading containers.
- Add `src/content/*.ts` types and data from CONTENT.md: `profile`, `timeline`, `work`, `oss`.
- Delete the old app and the Go service on this branch.
- **Checkpoint 1:** the build passes, and the empty layout works in both themes.

## Phase 2: Wave hero
- Build `WaveCanvas` in Canvas 2D, following DESIGN.md exactly: the maths, the masks, starting on
  idle, pausing when off-screen or hidden, 30 fps, reduced motion, and the mobile grid density.
- Measure: the Lighthouse mobile performance score must not drop by more than 2 points against the
  Phase 1 baseline.
- **Checkpoint 2:** screenshots of the hero in light and dark mode, plus a short screen recording.

## Phase 3: Git graph
- Build `<GitGraph>` driven by `timeline.ts`: time scale, lanes, branch paths, span brackets
  **above** main, commit labels below, HEAD to the right, tooltips (hover and focus, Esc), PR dot
  links, the one-time draw animation, and a visually hidden `<ol>`.
- Build the vertical mobile layout (< 768px) with the collapsed WordPress node, under one screen tall.
- **Checkpoint 3:** screenshots at 1280px and 390px, a keyboard walk-through, and a screen-reader
  check of the list.

## Phase 4: The rest of Home
- Build the Selected work cards (with status pills), the Open source list, the footer, and the
  Currently line.
- **Checkpoint 4.**

## Phase 5: Case studies
- Build `/work/[slug]` with the header band, a two-column body (sticky sidebar), numbered challenge
  blocks, and What shipped.
- Create pages for `editorial-updates`, `media-library-ai` and `bridgetalk`.
- **Checkpoint 5.**

## Phase 6: Writing infrastructure
- Set up MDX with themed Shiki, draft handling, the `/writing` index and RSS. Keep the section
  hidden until at least one post has `draft: false`.
- **Checkpoint 6.**

## Phase 7: SEO and polish
- Add metadata, canonical URLs, sitemap, robots.txt, JSON-LD `Person`, `next/og` images with a
  static wave frame, a 404 page, and `@vercel/analytics`.
- Run an accessibility pass in both themes, and Lighthouse on mobile for `/` and
  `/work/editorial-updates` (≥ 95 on each).
- **Checkpoint 7:** the scores, plus the remaining TODO list.

## Phase 8: Ship
- Open a PR `v3 → main` with a summary and screenshots. The owner merges it, and Vercel deploys to
  nischay.live.
