# DESIGN: nischay.live v3

**Direction: "engineering notebook."** Warm paper, precise type, a lot of whitespace, and a single
teal accent. It matches the owner's LinkedIn banner (ivory grid paper, Fraunces + JetBrains Mono,
teal accent), so the site and the banner read as one identity.

Principles: content first; one accent colour; hierarchy comes from type, not boxes; motion only
where it explains something.

## Tokens

Define all tokens as CSS variables on `:root`, override them under `[data-theme="dark"]`, and map
them into Tailwind v4 `@theme`. Never hard-code a hex value in a component.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#F4F1EA` | `#121417` | page background |
| `--surface` | `#FBF9F4` | `#1A1D22` | cards, code blocks |
| `--ink` | `#1B1D22` | `#ECE8DF` | primary text |
| `--muted` | `#4A4D55` | `#A9ADB5` | secondary text |
| `--subtle` | `#6B6E75` | `#8B9099` | meta text, dates (check ≥4.5:1 on `--bg`) |
| `--border` | `#E0DACD` | `#2A2E35` | hairlines, card borders |
| `--grid` | `#E6E1D6` | `#1F2329` | paper-grid lines (hero band only) |
| `--accent` | `#1F6F6A` | `#5FB3AB` | links, focus ring, loop highlight |
| `--accent-ink` | `#FFFFFF` | `#0E1A19` | text on an accent fill (rare) |

Verify every text/background pair against WCAG AA in both themes. If a pair fails, darken or lighten
the token and note the change. Don't swap in a different hue.

## Typography

- **Display:** Fraunces (variable; opsz 9–144, weights 400/600). Use it for h1/h2 and case-study
  titles only.
- **Body/UI:** Geist Sans, weights 400/500.
- **Mono:** JetBrains Mono, weights 400/500. Use it for small labels (section eyebrows, dates, tags)
  and code.

Scale (px, desktop / mobile): `h1` 56/40 Fraunces 600, tracking −0.015em, line-height 1.05 ·
`h2` 32/26 Fraunces 600 · `h3` 20/18 Geist 500 · body 17/16 Geist, line-height 1.65 ·
small 14 · eyebrow 13 JetBrains Mono uppercase, tracking 0.16em, colour `--accent`.

Keep text measure to about 68ch.

## Layout

- Reading column is `max-width: 680px`. Wide column (hero, work grid) is `max-width: 1040px`.
  Gutter is 24px on mobile and 32px on desktop.
- Vertical rhythm is on a 4px base. Section spacing is 120px desktop / 80px mobile.
- Work cards sit in a 2-column grid at ≥ 768px and 1 column below.
- Sections are separated by whitespace plus one hairline (`--border`), not by background colour
  changes.

## Signature element: the loop

The hero shows the design → build → ship → review & iterate diagram. Draw it as an inline SVG
component (`<Loop />`), using exactly this geometry (viewBox `0 0 300 180`):

```svg
<path d="M40 110 H150 H260" stroke="var(--ink)" stroke-width="2"/>
<path d="M260 96 C260 30 40 30 40 96" stroke="var(--accent)" stroke-width="2" stroke-dasharray="6 6"/>
<path d="M34 88 L40 98 L47 89" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round"/>
<circle cx="40"  cy="110" r="12" fill="var(--bg)" stroke="var(--ink)" stroke-width="2"/>
<circle cx="150" cy="110" r="12" fill="var(--bg)" stroke="var(--ink)" stroke-width="2"/>
<circle cx="260" cy="110" r="12" fill="var(--accent)" stroke="var(--ink)" stroke-width="2"/>
<!-- labels in JetBrains Mono 15px: "design" (x40), "build" (x150), "ship" (x260) at y148;
     "review & iterate" 14px centred at x150,y30 -->
```

- Put `aria-hidden="true"` on the SVG. The hero text carries the meaning.
- **Motion (optional, once per page load):** the dashed return arc animates its `stroke-dashoffset`
  over 1.2s ease-out. Under `prefers-reduced-motion: reduce` it doesn't animate at all.
- The paper-grid background (44px squares drawn with two `linear-gradient`s in `--grid`) appears
  **only** behind the hero band. It fades out at the band's bottom edge with a mask, not a colour
  gradient.

## Components

- **Link:** `--accent` colour, 1px underline with 3px offset. On hover the underline thickens to 2px.
  Links that leave the site get a small ↗ glyph.
- **Focus ring:** 2px `--accent` outline with a 2px offset on every interactive element.
- **Work card:** `--surface` background, 1px `--border`, radius 10px, padding 24px. Content: mono
  eyebrow (role · years), Fraunces title (22px), one-line summary in `--muted`, tags. On hover the
  border changes to `--accent` and a → nudges 2px. The whole card is one `<a>`.
- **Tag:** JetBrains Mono 12px, `--muted`, 1px `--border`, radius 4px, padding 2px 8px.
- **OSS row:** project name (Geist 500), description (`--muted`), PR links on the right on desktop
  and below on mobile.
- **Timeline row:** dates in mono `--subtle` in the left column (140px), role and org on the right.
- **Theme toggle:** an icon button in the nav, with `aria-label` "Switch to dark theme" (or light).
  The sun/moon icons are inline stroke SVG.
- **Code block:** `--surface` background, 1px `--border`, radius 8px, JetBrains Mono 14px, with a
  copy button that appears on hover or focus.

## Motion

Durations are 150–250ms with standard easing. The allowed motion is hover states, the one-time loop
draw, and a 200ms fade on route change.

Not allowed: parallax, scroll-jacking, reveal-on-scroll for every section, cursor followers,
animated gradients, and typewriter text.

## Don'ts

- No gradient washes, glassmorphism, neon, or heavy drop shadows. The most you may use is
  `0 1px 0 var(--border)`.
- No Inter/Roboto/Arial, and no emoji.
- No skill bars, percentage meters, or tech-logo walls. Show the stack as plain text.
- No "Hire me" banners. No "Open to work" badge.
- No stock or AI-generated imagery.

## OG image (`next/og`, 1200×630)

`--bg` paper with the grid pattern, the page title in Fraunces 600 at 64px on the left, "nischay.live"
in JetBrains Mono at the bottom left, and a small version of the loop on the right. Case studies and
posts use their own title. Produce light theme only.
