# PLAN: build order

Work one phase at a time. At each **checkpoint**, stop, summarise what changed, list any TODOs you
found in CONTENT.md, and wait for the owner's go-ahead.

## Phase 0: Read and propose (no code)
- Read CLAUDE.md and every file in `docs/`. Inspect the current repo (framework, the Go service,
  deployment config, the domain setup on Vercel).
- Reply with: what you'll delete, what you'll keep (for example the Vercel project settings and the
  domain), the folder structure you'll use, and any conflicts you found between the docs.
- **Checkpoint 0**

## Phase 1: Foundation
- Create the `v3` branch and scaffold Next.js (App Router, TypeScript, strict mode) with Tailwind v4,
  ESLint, and pnpm scripts (`dev`, `build`, `lint`, `typecheck`).
- Add the design tokens (light + dark) and the theme script with no flash on load.
- Load the fonts with `next/font`.
- Build the base layout: skip link, nav, footer, reading and wide containers.
- Add `src/content/*.ts` types and data transcribed from CONTENT.md, with TODOs kept as
  `TODO`-typed values.
- Delete the old app and the Go service on this branch.
- **Checkpoint 1:** `pnpm build` passes; show the empty layout in both themes.

## Phase 2: Home
- Build the Hero with the `<Loop />` component and the paper-grid band, then Now, Selected work
  cards, the Open source list, the Experience timeline and Education, and the Footer.
- Hide the Writing section while it has no posts.
- **Checkpoint 2:** screenshots at 390px and 1280px, in light and dark.

## Phase 3: Case studies
- Build the `/work/[slug]` template and generate static params from the content data.
- Create pages for `editorial-updates`, `media-library-ai` and `bridgetalk`. Leave out
  `rag-support-agent` until it has content.
- **Checkpoint 3.**

## Phase 4: Writing infrastructure
- Set up MDX with Shiki themed to the tokens, frontmatter types, draft handling, the `/writing`
  index and the RSS feed.
- Add one `draft: true` sample post so the pipeline can be tested. It must not appear in the
  production build.
- **Checkpoint 4.**

## Phase 5: SEO and polish
- Add metadata, canonical URLs, sitemap, robots.txt, JSON-LD `Person`, `next/og` images, a 404
  page, and `@vercel/analytics`.
- Run an accessibility pass: keyboard walk-through, contrast check in both themes, and
  reduced-motion check.
- Run Lighthouse on mobile for `/` and `/work/editorial-updates`, and fix anything below 95.
- **Checkpoint 5:** Lighthouse scores, plus the remaining TODO list from CONTENT.md.

## Phase 6: Ship
- Open a PR `v3 → main` with a summary and screenshots. The owner merges it, and Vercel deploys to
  nischay.live.
