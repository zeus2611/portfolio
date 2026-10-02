# SPEC: nischay.live v3

## Purpose

A calm, fast personal site for a software engineer who works on **AI products and developer tools**.
It should be minimal but memorable. It exists to:

1. Let a recruiter understand in about 10 seconds who Nischay is, where he's been, and where he is
   now.
2. Let a technical reviewer go one level deeper through case studies and linked PRs.
3. Host his engineering writing under his own domain.

**Tone:** understated and factual. The owner explicitly doesn't want copy that oversells. The
evidence (links, shipped work, merged PRs) does the persuading.

**Audiences:** recruiters and hiring managers (general SWE, AI engineer, devtools and remote-first
roles), technical reviewers arriving from a résumé, LinkedIn or GitHub, and campus placement
screeners.

## Information architecture

```
/                     Home (single scrolling page)
/work/[slug]          Case study pages
/writing              Post index (hidden from nav until ≥1 post is published)
/writing/[slug]       Post
/resume.pdf           Static file supplied by the owner
/404                  Minimal not-found page
```

Nav, top right: **Experience · Work · Open source · Résumé ↗**, plus the theme toggle. "Writing"
appears only once posts exist. The first three are anchors on Home. "Nischay" on the left links
home.

## Home, section by section (top to bottom)

1. **Hero** (see DESIGN.md → Wave hero). An eyebrow ("HYDERABAD, INDIA"), the H1 "Nischay", one line
   of description ending in an italic accent phrase, and a row of text links: GitHub, LinkedIn,
   Email, Résumé. Behind it, the paper grid fades into the animated wireframe wave. No CTA buttons.
2. **Experience** (`#exp`). The eyebrow, then the mono caption
   `$ git log --graph --all --author=nischay`, then **the git graph** (DESIGN.md → Git graph), then
   one line: **CURRENTLY** Intern (co-op), AMD Developer Experience · M.Tech, NIT Rourkela ·
   contributing to WordPress AI. There's no separate "Now" section: the graph and this line replace
   it. There are no summary cards under the graph; details go in the graph's tooltips.
3. **Selected work** (`#work`). Three case-study cards in a row on desktop (1 column on mobile).
   Each card has a meta line, a **status pill**, a title, a summary, up to 3 tags, and "Read case
   study →".
4. **Open source** (`#oss`). A compact list, one row per project: name, one line, and PR link(s).
   WordPress/ai comes first.
5. **Writing.** The latest 3 posts. The whole section is hidden while there are no posts.
6. **Footer.** Email, GitHub, LinkedIn, "Google Cloud Professional Cloud Architect", © year, and a
   "Source ↗" link.

## Case study template (`/work/[slug]`), following the Daksha structure

Header band (paper grid, fading out):
- "← All work", then a **meta line** in mono (`CATEGORY · YEAR`) plus a **status pill**
  (Merged / Shipped vX / Live / In review), then the H1 title, then a one-sentence tagline.

Body, as two columns on desktop (a 1fr main column and a 280px sidebar with a left hairline), one
column on mobile with the sidebar moved above the body:
- **Main:** **Overview** (1–2 paragraphs) → **Key challenges** (exactly 3 numbered blocks: `01`,
  `02`, `03`, each with a title and a paragraph covering the problem and what was decided) →
  **What shipped** (a bullet list) → "← All work".
- **Sidebar:** ROLE, TIMELINE, REVIEW or TEAM (optional), RELEASE or PLATFORMS (optional), STACK
  (tags), LINKS.

Every value comes from CONTENT.md. Omit a sidebar row that has no data rather than showing "TODO"
in production.

## Writing

- MDX with frontmatter: `title`, `date`, `summary`, `tags`, `draft`.
- `draft: true` posts are built in dev only.
- RSS feed at `/writing/rss.xml`.
- Shiki code blocks themed to the DESIGN.md tokens in both light and dark mode.

## Non-functional requirements (acceptance criteria)

- **Performance:** Lighthouse ≥ 95 in all four categories on mobile, for `/` and one case study.
  The wave must not block first paint (see DESIGN.md). Client JS is limited to the theme toggle,
  the wave module and the graph tooltips.
- **Accessibility:** WCAG 2.2 AA. Skip link, landmarks, visible focus rings, text contrast ≥ 4.5:1,
  full keyboard access (graph nodes are focusable and show their tooltip on focus), and
  `prefers-reduced-motion` respected (the wave renders one static frame and the graph doesn't
  animate its drawing).
- **Graph semantics:** the SVG has `role="img"` and a full `aria-label`, **plus** a visually hidden
  `<ol>` of the same entries so screen-reader users get the real list.
- **Theme:** light by default, following `prefers-color-scheme`. A manual toggle is persisted in
  `localStorage`, with no flash on load (inline `<head>` script). The wave and graph read their
  colours from CSS variables and re-render when the theme changes.
- **SEO:** per-page metadata, canonical URLs, `sitemap.xml`, `robots.txt`, JSON-LD `Person` on Home,
  and build-time OG images.
- **Responsive:** 360px to 1440px with no horizontal scroll. Under 768px the git graph switches to
  its **vertical** layout (DESIGN.md) and must fit within about one screen height.
- **No layout shift:** `next/font` with size-adjust; the wave canvas has a fixed box.
- **Build:** zero TypeScript and ESLint errors. `output: "export"` succeeds.

## Out of scope for v1

Comments, newsletter, a CMS, i18n, case-study screenshots, a projects filter, WebGL/three.js, cursor
effects, and scroll-triggered reveal animations.
