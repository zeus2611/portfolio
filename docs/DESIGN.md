# DESIGN: nischay.live v3

**Direction: "engineering notebook, alive."** Warm graph paper, precise serif display type, one teal
accent, and two signature pieces: a wireframe wave that grows out of the paper grid in the hero, and
the career drawn as a git graph. It matches the owner's LinkedIn banner (ivory grid paper,
Fraunces + JetBrains Mono, teal).

Principles: content first; one accent colour; hierarchy through type rather than boxes; motion only
in the two signature pieces.

## Tokens

Define these as CSS variables on `:root`, override them under `[data-theme="dark"]`, and map them
into Tailwind v4 via `@theme inline` (the same pattern as the daksha repo's `globals.css`). Never
hard-code a hex value in a component. The wave and graph read tokens at runtime with
`getComputedStyle`.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F4F1EA` | `#121417` | page background |
| `--surface` | `#FBF9F4` | `#1A1D22` | cards, challenge blocks, code |
| `--ink` | `#1B1D22` | `#ECE8DF` | primary text, graph main line |
| `--muted` | `#4A4D55` | `#A9ADB5` | secondary text |
| `--subtle` | `#6B6E75` | `#8B9099` | meta text, dates, education branch |
| `--border` | `#E0DACD` | `#2A2E35` | hairlines, card borders, graph year rules |
| `--grid` | `#E6E1D6` | `#1F2329` | paper-grid lines |
| `--accent` | `#1F6F6A` | `#5FB3AB` | links, pills, focus ring, wave, OSS branch, HEAD |
| `--accent-ink` | `#FFFFFF` | `#0E1A19` | text on an accent fill (rare) |

All the text pairs above were checked against WCAG AA in both themes. The lowest is `--subtle` on
`--bg` in light mode, at 4.53:1. Don't lighten `--subtle`.

## Typography

- **Display:** Fraunces (variable; opsz 9–144, weights 400/600, plus italic 400). Use it for H1/H2,
  card titles, and the hero's italic accent phrase.
- **Body/UI:** Geist, weights 400/500.
- **Mono:** JetBrains Mono, weights 400/500. Use it for eyebrows, meta lines, dates, tags, pills,
  graph labels and code.

Scale (desktop / mobile): H1 hero 72/44 Fraunces 600, tracking −0.02em, line-height 1.0 ·
case-study H1 60/38 · H2 28/24 Fraunces 600 · card title 23/21 Fraunces 600 · body 17/16 Geist,
line-height 1.65 · hero line 26/20 · small 14–15 · eyebrow 13/12 JetBrains Mono uppercase,
tracking 0.16em, `--accent`.

Keep the text measure to about 68ch.

## Layout

- Wide column is `max-width: 1040px`. Reading column is `max-width: 680px`. Gutter is 24px on mobile
  and 32px on desktop.
- Sections are separated by 88px (desktop) / 64px (mobile) of padding plus one `--border` hairline.
  No background-colour bands.
- Work cards: `grid-template-columns: repeat(3, minmax(0,1fr))` at ≥ 1024px, 2 columns at ≥ 768px,
  1 column below that.

## Signature 1: the wave hero

The hero is 640px tall on desktop and about 560px on mobile. It has three layers, back to front:

1. **Paper grid.** Two `linear-gradient`s in `--grid`, 44px squares, masked with
   `mask-image: linear-gradient(to bottom, #000 0%, transparent 55%)` so the grid fades out
   downward.
2. **Wave.** A `<canvas>` filling the hero, masked with
   `linear-gradient(to bottom, transparent 45%, #000 75%, #000 92%, transparent 100%)` so it fades
   in where the grid fades out. It never sits behind the text block.
3. **Content** on top, with `position: relative`.

**Wave maths (a Canvas 2D port of the daksha `HeroWave`). Don't use three.js.**

```ts
// Height field (world units), t in seconds:
z(x, d, t) = 0.45*sin(0.4x + 0.9t) + 0.30*sin(0.5d + 0.65t) + 0.20*sin(0.28(x+d) + 0.5t)

// Grid: x ∈ [-11, 11] in 44 steps; d (depth) ∈ [-7, 4.5] in 22 steps.
// Camera at height 3, distance 9, pitched down by a = atan2(3, 9). FOV 55°.
up  = (-1.8 + z) - 3;    fw  = 9 - d
up2 = up*cos(a) + fw*sin(a);  fw2 = fw*cos(a) - up*sin(a)
F   = (H/2) / tan(27.5°)
sx  = W/2 + F * x / fw2
sy  = H/2 - F * up2 / fw2 + 60        // +60 px shifts the plane lower in the hero
```

- Draw 23 depth lines (along x) and 45 cross lines (along d) as polylines. Stroke is `--accent` at
  1px, with globalAlpha 0.42 in light mode and 0.5 in dark.
- Render on a DPR-aware canvas, with `devicePixelRatio` capped at 1.5.
- **Loading:** start the animation after `requestIdleCallback` (falling back to
  `setTimeout(…, 200)`). Pause it with `IntersectionObserver` when the hero is off-screen and on
  `visibilitychange`.
- **Frame rate:** at most 30 fps. Advance t by `dt * 1.0` with no speed-up. Motion should be slow
  and calm.
- **Reduced motion:** draw a single static frame at t = 2.2.
- **Mobile (< 768px):** use the same canvas at half the grid density (x in 22 steps, d in 11 steps).
- Budget: under 3 KB gzipped. No dependencies.

Hero content: an eyebrow; the H1; the line "Software engineer working on AI products and developer
tools, *from the first design doc to production.*" with the italic phrase in Fraunces italic and
`--accent`; then the link row.

## Signature 2: Experience as a git graph

This is a data-driven SVG component, `<GitGraph data={timeline} />`, fed by `src/content/timeline.ts`
(see CONTENT.md → Graph data). It isn't hand-drawn. Draw it at the width of the 1040 column plus
120px of bleed on each side, using a time scale from 2022.3 to "now".

**Lanes (desktop, horizontal).** Top to bottom, the y values are 100, 200, 290 and 370 in a 440-high
viewBox.
- `main` is `--ink` at 2.5px. It runs Supista → Whizlabs → AMD, and **AMD is `HEAD`**, drawn as an
  8px `--accent` dot with the mono label "HEAD" to its **right**.
- `bridgetalk` is `--ink` at 2px and 0.8 opacity. It branches off in Jan 2025 and merges back into
  main in Jun 2026.
- `open-source` is `--accent` at 2px. It branches off in 2023 and stays open, ending in an arrow.
  Each merged PR is a 4px `--accent` dot at its merge date.
- `m.tech` is `--subtle` at 2px, dashed 6/5. It branches off in Aug 2025 and stays open, ending in an
  arrow.
- Branch shape: `M x0 100 C x0+16 100 x0+8 laneY x0+24 laneY H x1-24 C x1-8 laneY x1-16 100 x1 100`.

**Labels:**
- **Spans on main are labelled ABOVE the line with a bracket**: a hairline at y=64 with 8px end
  ticks, and the mono label at y=58. This applies to "whizlabs · apr 2023 – aug 2025" and "amd ·
  intern (co-op) · jul 2026 –", the latter right-aligned to HEAD. Labels must never sit on top of,
  or be crossed by, a branch line.
- Commits on main (Supista, and the three Whizlabs role changes) are 6px `--bg` dots with a 2px
  `--ink` stroke. Their labels sit **below** the line at y=130 (role, in Geist 12, `--muted`).
  Supista gets a two-line label: "supista" (mono) and "swe intern · 2022".
- Branch labels sit under the start of each lane: a mono name, plus one Geist line for
  bridgetalk.
- Year rules are vertical hairlines in `--border`, with the year in mono `--subtle` at the bottom.

**Interaction:** every commit, PR dot and HEAD is a focusable element (`tabindex="0"`) with a
tooltip (surface card, 1px border, radius 8px, 12px padding) showing the date, title and one line
from CONTENT.md. PR dots link to their PR. The tooltip opens on hover and focus and closes on Esc
or blur.

**Motion:** once, when the graph is 30% in view, draw the paths with `stroke-dashoffset` over 1.8s
using ease-out. Under reduced motion, don't animate.

**Mobile (< 768px, vertical):** rotate the graph so time runs top to bottom (newest at the top,
with HEAD first). Main is a vertical line on the left and branches are columns to its right. Labels
sit to the right of each node. Keep it under about 1 screen tall: collapse the WordPress PR dots
into one "6 merged" node.

**Below the graph:** a single "CURRENTLY" line (mono eyebrow inline, then Geist text in `--muted`).

## Selected work cards

`--surface` background, 1px `--border`, radius 12px, padding 24px, laid out as a flex column with a
16px gap:
- Top row: mono meta (11px, `--subtle`) on the left and a **status pill** on the right (mono 11px,
  `--accent` text, 1px `--accent` border, radius 999px, padding 1px 8px).
- Fraunces title, a summary in `--muted`, tags, and "Read case study →" in `--accent`.
- The whole card is one `<a>`. On hover the border turns `--accent` and the → nudges 2px.

## Case study layout

- **Header band:** the paper grid fades out downward behind it. It holds "← All work", the meta line
  plus pill, the H1 and the tagline.
- **Body grid:** `minmax(0,1fr) 280px`, with a 72px gap and a hairline above.
- **Key challenge block:** a grid of `56px 1fr` on `--surface`, with a 1px border, radius 12px and
  padding 22px 24px. The number (`01`) is JetBrains Mono 22px in `--accent`, then a title (Geist 500
  18px) and a paragraph in `--muted`.
- **Sidebar:** a left hairline, then stacked rows, each a mono 11px `--subtle` key with a value
  underneath. STACK uses tags and LINKS uses a list of accent links. It's sticky from `top: 96px`.

## Other components

- **Links:** `--accent` with a 1px underline at a 3px offset, thickening to 2px on hover. External
  links get ↗.
- **Focus ring:** 2px `--accent` outline with a 2px offset everywhere.
- **Tags:** JetBrains Mono 11–12px, `--muted`, 1px `--border`, radius 4px.
- **OSS row:** a grid of `260px 1fr 150px` on desktop, stacked on mobile.
- **Theme toggle:** a 44×44 icon button with the `aria-label` "Switch to dark/light theme".
- **Code blocks:** `--surface` background, 1px border, radius 8px, JetBrains Mono 14px, with a copy
  button that appears on hover or focus.

## Motion rules

Allowed: the wave, the one-time graph draw, hover states (150–250ms), and a 200ms fade on route
change. Not allowed: parallax, scroll-jacking, reveal-on-scroll, cursor effects, animated gradients,
and typewriter text. Everything obeys `prefers-reduced-motion`.

## Don'ts

No three.js/WebGL, glassmorphism, neon or heavy shadows. No Inter, Roboto, Arial or Syne, and no
emoji. No skill bars, logo walls, "Hire me" or "Open to work" badges, stats rows, or stock and AI
imagery.

## OG image (`next/og`, 1200×630, light theme)

`--bg` paper with the grid, and a static wave frame across the bottom third in `--accent` at 0.4
opacity. The title is Fraunces 600 at 64px on the left, with "nischay.live" in JetBrains Mono at the
bottom left. Case studies and posts use their own title.
