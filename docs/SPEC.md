# SPEC: nischay.live v3

## Purpose

A calm, fast, minimalist personal site for a software engineer who works on **AI products and
developer tools**. It exists to:

1. Let a recruiter or hiring manager understand in about 10 seconds who Nischay is and what he has
   shipped.
2. Let a technical reviewer go one level deeper through case studies and linked PRs.
3. Host his writing (engineering write-ups) under his own domain.

**Tone:** understated and factual. The owner explicitly does not want copy that oversells. Let the
evidence (links, shipped work) do the persuading.

**Audiences:** recruiters and hiring managers (general SWE, AI engineer, devtools roles, remote-first
companies), technical reviewers following links from a résumé, LinkedIn or GitHub, and campus
placement screeners.

## Information architecture

```
/                     Home (single scrolling page)
/work/[slug]          Case study pages
/writing              Index of posts (hidden from nav until ≥1 post is published)
/writing/[slug]       Post
/resume.pdf           Static file supplied by the owner
/404                  Minimal not-found page
```

Nav, top right: **Work · Open source · Writing · Résumé**. "Work" and "Open source" are anchors on
Home. The name "Nischay" on the left links home. Show "Writing" only when posts exist.

## Home, section by section (top to bottom)

1. **Hero.** Name, a one-line description, and a short "now" line. Beside it (below it on mobile) is
   the design → build → ship → review & iterate loop illustration (DESIGN.md → Signature element),
   on the paper-grid band. The only action is a row of text links: GitHub, LinkedIn, Email, Résumé.
   No big CTA buttons.
2. **Now.** Two or three lines: current role and study. Copy is in CONTENT.md.
3. **Selected work.** 3–4 cards linking to `/work/[slug]`. Each card has a title, a one-line
   summary, 3–4 tech tags, and a role/date line. No thumbnails in v1. Text-only cards are more
   minimal and avoid fake screenshots.
4. **Open source.** A compact list, one row per project: project name, one-line description, and a
   link to the merged PR(s). WordPress/ai first.
5. **Experience.** A compact timeline: role, org, dates, one line each. Education sits beneath it as
   two lines.
6. **Writing.** The latest 3 posts. Hide the whole section while there are no posts.
7. **Footer.** Email, GitHub, LinkedIn, © year, and the text "Built with Next.js, hosted on Vercel.
   Source on GitHub." (with a link).

## Case study template (`/work/[slug]`)

Fixed headings, in order. Skip a heading only if CONTENT.md has nothing for it:

- Title, role, dates, tech tags, and links (PRs, store listing, repo)
- **Context:** 1–2 short paragraphs
- **The problem**
- **Constraints**
- **What I built**
- **Decisions & trade-offs:** the most important section
- **Outcome:** only facts from CONTENT.md
- **Links**

Width is the reading column (see DESIGN.md). There's a "← All work" link at the top and bottom.

## Writing

- MDX with frontmatter: `title`, `date`, `summary`, `tags`, `draft`.
- `draft: true` posts build in dev only.
- Include an RSS feed at `/writing/rss.xml`.
- Code blocks use Shiki with a theme that matches DESIGN.md tokens in both light and dark mode.

## Non-functional requirements (acceptance criteria)

- **Performance:** Lighthouse ≥ 95 on all four categories on mobile for `/` and one case study.
  Keep the JS shipped to the client minimal: no client components unless needed. The theme toggle
  and the loop animation are the only expected client code.
- **Accessibility:** WCAG 2.2 AA. Semantic landmarks, a skip link, visible focus rings, colour
  contrast ≥ 4.5:1 for text, fully keyboard-navigable, and `prefers-reduced-motion` respected.
- **Theme:** light by default, following `prefers-color-scheme`. A manual toggle is persisted in
  `localStorage`, with no flash of the wrong theme on load (use an inline script in `<head>`).
- **SEO:** per-page `metadata`, canonical URLs, `sitemap.xml`, `robots.txt`, JSON-LD `Person` on
  Home, and generated OG images for Home, each case study and each post.
- **Responsive:** 360px to 1440px. No horizontal scroll at any width.
- **No layout shift:** fonts use `next/font` with `display: swap` and size-adjust. Declare image
  sizes.
- **Build:** zero TypeScript errors, zero ESLint errors.

## Out of scope for v1

Blog comments, newsletter, a CMS, i18n, case-study thumbnails or screenshots, a projects filter,
3D/WebGL, and cursor effects.
