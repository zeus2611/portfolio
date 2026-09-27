# CLAUDE.md — nischay.live (v3 rebuild)

You are rebuilding Nischay's personal site from the ground up. It is a small, static, content-first
site. Read these before writing code, in this order:

1. `docs/SPEC.md`: what the site is for, the pages, and the acceptance criteria.
2. `docs/DESIGN.md`: the visual system. Follow it exactly and don't invent a new look.
3. `docs/CONTENT.md`: **the only source of truth for copy and facts.**
4. `docs/PLAN.md`: the build order. Work phase by phase and stop at each checkpoint.

## Hard rules

- **Never invent content.** No made-up metrics, testimonials, project names, dates, employers, or
  links. If something the page needs isn't in `docs/CONTENT.md`, render a visible `TODO` in dev
  and list it in your summary. Don't fill it with plausible-sounding text.
- **Job titles are exact.** The AMD role is "Intern (co-op)", never "Software Engineer at AMD".
  Don't describe AMD internal projects beyond what `docs/CONTENT.md` says.
- **Every claim that can link to evidence does**: PRs, app store listings, repos.
- No lorem ipsum, stock photos, emoji, or decorative gradients.
- Keep dependencies minimal. Ask before adding any runtime dependency that isn't listed in
  `docs/SPEC.md` → Stack.

## Stack (decided)

- Next.js (App Router) + TypeScript, **fully static** (`output: "export"`, or SSG with no server
  runtime).
- Styling: Tailwind CSS v4, with design tokens defined as CSS variables (see DESIGN.md).
- Content: typed data in `src/content/*.ts` for work, open source and timeline; MDX in
  `src/content/writing/*.mdx` for posts.
- Fonts via `next/font` (Fraunces, Geist, JetBrains Mono).
- OG images via `next/og`.
- Hosting: Vercel, with `@vercel/analytics`.
- Package manager: pnpm.

## Working agreements

- Start on a new branch, `v3`. Keep git history. Delete the old app (including the Go service) on
  that branch only after Phase 1 builds.
- Commit per phase with clear messages.
- Before each checkpoint, run `pnpm lint && pnpm typecheck && pnpm build` and fix everything they
  report.
- When you're unsure about a design or content choice, ask. Don't guess.
- Don't generate a new copy of the design → build → ship loop illustration from memory. Its exact
  geometry is in DESIGN.md.

## Commands (set these up in Phase 1)

```
pnpm dev        # local dev
pnpm build      # static build
pnpm lint       # eslint
pnpm typecheck  # tsc --noEmit
```
