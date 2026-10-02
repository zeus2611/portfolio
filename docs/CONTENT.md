# CONTENT: source of truth

Every fact on the site comes from this file. `TODO` means unknown: render a visible TODO in dev,
omit it in production, and never invent a value. Transcribe this into typed data in
`src/content/*.ts`.

## Identity

- Name: **Nischay** (a single name with no surname; don't add one)
- Location: Hyderabad, India
- Email: itsnischay2604@gmail.com
- GitHub: https://github.com/zeus2611
- LinkedIn: https://www.linkedin.com/in/nischay-2604
- Domain: https://www.nischay.live
- Résumé: `/resume.pdf`
- Certification (footer): Google Cloud Professional Cloud Architect. List only this one; the others
  have expired.

## Hero

- Eyebrow: HYDERABAD, INDIA
- H1: Nischay
- Line: Software engineer working on AI products and developer tools, *from the first design doc to
  production.* (the italic phrase is the accent)
- Links: GitHub · LinkedIn · Email · Résumé

## Experience (the graph section)

- Caption: `$ git log --graph --all --author=nischay`
- Currently line: **CURRENTLY** Intern (co-op), AMD Developer Experience · M.Tech, NIT Rourkela ·
  contributing to WordPress AI

> Don't name AMD internal projects, tools or products. The owner will update this if something
> becomes public.

### Graph data (`src/content/timeline.ts`)

Dates are YYYY-MM. `lane` is one of `main | bridgetalk | open-source | mtech`.

**main** (commits, in order):
| Date | Label | Tooltip |
|---|---|---|
| 2022-07 | supista · swe intern | Integrated payment gateways (+14% online transactions) and built Android performance monitoring (−22% crashes). |
| 2023-04 | whizlabs · cloud computing intern | Built and maintained hands-on GCP and AWS labs; two Sprint Star awards and a quarterly Outstanding Distinction award. |
| 2024-05 | whizlabs · cloud products associate | Serverless abuse detection that cut malicious resource incidents by 78%; lab teardown reworked to cut deletion costs by 35%. |
| 2025-04 | whizlabs · cloud labs engineer | RAG support agent over AWS and GCP docs: 65% of tickets automated, median time-to-resolve down 42%. |
| 2026-07 | amd · intern (co-op), developer experience **(HEAD)** | Building internal developer tooling for IP engineers. |

Span brackets above main: `whizlabs · apr 2023 – aug 2025` (2023-04 → 2025-08) and
`amd · intern (co-op) · jul 2026 –` (2026-07 → now).

**bridgetalk** branch: from 2025-01, merged back into main at 2026-06.
- Label: bridgetalk · founding engineer · 2 apps shipped
- Tooltip: Built and shipped the consumer and B2B apps of an AI speaking coach on iOS and Android
  (Flutter, FastAPI, GCP).

**open-source** branch: from 2023-01, still open. Each merged PR is a dot that links to it:
| Date | Repo | PR | Title |
|---|---|---|---|
| 2023-01 | open-telemetry/opentelemetry.io | #2156 | Docs: TypeScript exporter examples |
| 2024-10 | activist-org/activist | #995 | Runner for the i18n test suite |
| 2024-10 | huggingface/transformers | #34343 | Fix batch-size handling in `Trainer.prediction_loop` for `DataLoaderShard` |
| 2024-12 | activist-org/activist | #1020 | Test coverage for group models |
| 2026-02 | appwrite/templates | #338 | Python storage-cleaner function template |
| 2026-03 | WordPress/ai | #258 | Standalone AI image generation in the Media Library (v0.4.0) |
| 2026-04 | WordPress/ai | #330 | Bulk "Generate Alt Text" action |
| 2026-04 | WordPress/ai | #289 | Refine from Notes, later Editorial Updates |
| 2026-05 | WordPress/ai | #512 | Image generation loading-state fixes |
| 2026-05 | WordPress/ai | #528 | Rename to Editorial Notes / Editorial Updates |
| 2026-07 | WordPress/ai | #861 | Link Editorial Updates to visual revisions |

Branch labels: "open-source"; under the early cluster, "transformers · activist"; under the 2026
cluster, "WordPress AI · 6 merged".

**mtech** branch: from 2025-08, still open, dashed. Label: m.tech · nit rourkela. Tooltip: M.Tech in
Signal & Image Processing, NIT Rourkela (2025 – May 2027, expected).

Accessible list (visually hidden `<ol>`): one item per main commit, per branch, and per PR, in date
order, using the tooltip text.

## Selected work (case studies)

### 1. `editorial-updates`
- Card meta: OPEN SOURCE · 2026 · Status: **Merged**
- Title: Editorial Updates for WordPress AI
- Tagline: AI that applies an editor's unresolved notes to post content, block by block, and lets the
  author review and roll back the result.
- Card tags: PHP · React · LLMs
- **Overview:** The official WordPress AI plugin could already add AI editorial notes to blocks.
  Issue #250 asked for the next step: apply those notes automatically, without taking control away
  from the author. It shipped as "Refine from Notes" and was later renamed Editorial Updates (#528).
- **Key challenges**
  1. *Revisions are whole-post snapshots.* Rolling back one block's AI edit would undo all the
     others. I proposed shipping apply-all with review in revisions as the MVP, and tracking
     per-change accept/reject as a follow-up (#324).
  2. *The view we needed was behind a private API.* The block-based visual revisions view was gated
     to core. I documented the blocker in #289. Then, in #861, I opened the view by triggering
     core's own Revisions button (the same approach WordPress's test utilities use), with a
     fallback to the classic `revision.php` screen.
  3. *Output in the content's language.* An English context wrapper was biasing the model toward
     English. I removed it and added a language-matching rule, following the maintainers' pattern
     from #357.
- **What shipped:** block-by-block refinement in batches of 4 with a live progress indicator ·
  results saved as a revision for review and rollback · provider errors shown to the user instead of
  a generic failure · a link to visual revisions with a classic-screen fallback (#861) · PHPUnit and
  end-to-end tests.
- **Sidebar:** ROLE Open-source contributor · TIMELINE Mar – Jul 2026 · REVIEW 3 rounds with the
  plugin maintainers, 42 commits · RELEASE WordPress AI 0.8.0 · STACK PHP, TypeScript, React,
  Gutenberg, LLMs, PHPUnit · LINKS https://github.com/WordPress/ai/pull/289,
  https://github.com/WordPress/ai/pull/861, https://github.com/WordPress/ai/issues/250

### 2. `media-library-ai`
- Card meta: OPEN SOURCE · 2026 · Status: **Shipped v0.4.0**
- Title: AI in the WordPress Media Library
- Tagline: Standalone AI image generation and bulk alt-text generation for the WordPress Media
  Library.
- Card tags: PHP · React · a11y
- **Overview:** Image generation first existed only inside the block editor, and alt text could only
  be generated one image at a time. I added both workflows to the Media Library, where site owners
  actually manage images.
- **Key challenges**
  1. *The media grid swallows clicks.* WordPress's media grid delegates events, so a normal click
     handler on the injected button never fired. I used a capture-phase listener to handle the click
     before the grid does (#258).
  2. *Bulk jobs that survive failures.* Generating alt text for dozens of images can't stop at the
     first failure. Images are processed one at a time with per-item error handling, and a progress
     notice shows how far along it is (#330).
  3. *A refresh mustn't re-run the job.* The bulk action passes IDs via query parameters, so I clean
     up the URL with `history.replaceState` when the job finishes, and a refresh or back navigation
     can't trigger it again.
- **What shipped:** a standalone image generation page (generate, preview, regenerate, save) in
  v0.4.0 · a bulk "Generate Alt Text" action · loading-state and button-visibility fixes (#512) · 5
  integration tests plus end-to-end coverage.
- **Sidebar:** ROLE Open-source contributor · TIMELINE Feb – May 2026 · REVIEW 4 reviewers on #258 ·
  STACK PHP, TypeScript, React, WordPress · LINKS https://github.com/WordPress/ai/pull/258,
  https://github.com/WordPress/ai/pull/330, https://github.com/WordPress/ai/pull/512

### 3. `bridgetalk`
- Card meta: EDTECH · 2025–26 · Status: **Live**
- Title: BridgeTalk
- Tagline: An AI speaking coach for IELTS and TOEFL candidates, built from zero, with consumer and B2B
  apps on iOS and Android.
- Card tags: Flutter · FastAPI · GCP
- **Overview:** BridgeTalk helps students prepare for the IELTS and TOEFL speaking sections, with AI
  feedback on fluency, pronunciation, pace and vocabulary. As founding engineer I built the product
  from zero: a consumer app, a B2B Enterprise app for institutions, and the backend behind both.
- **Key challenges**
  1. *iOS and Android at the same time.* Both platforms were needed at launch, with a native-feel UX
     and a tight timeline. I used one Flutter codebase for both stores, including StoreKit 2 in-app
     purchases on iOS.
  2. *Two audiences, one platform.* Individual learners and institutions have very different
     journeys. I built a multi-tenant backend on Appwrite with role-based access control and
     real-time subscriptions, serving 500+ users, and shipped a separate Enterprise app for B2B.
  3. *Heavy audio without a frozen UI.* Speech has to be transcoded and processed before AI feedback
     comes back. Serverless functions handle transcoding and translation asynchronously, so the app
     stays responsive.
- **What shipped:** the consumer app on the App Store and Play Store · BridgeTalk AI Enterprise
  (B2B) · a multi-tenant backend with role-based access control · AI speaking feedback · in-app
  purchases.
- **Sidebar:** ROLE Founding engineer · TIMELINE Jan 2025 – Jun 2026 · PLATFORMS iOS, Android ·
  STACK Flutter, Dart, FastAPI, Appwrite, Firebase, GCP, OpenAI, Deepgram · LINKS https://apps.apple.com/us/app/bridgetalk/id6743174081,
  https://apps.apple.com/us/app/bridgetalk-ai-enterprise/id6749461827,
  https://play.google.com/store/apps/details?id=com.bridgetalk.beta
- Closed source, so no repo link. Leave out marketing, video and SEO work; that was the wider team's.

### Not included
- `rag-support-agent` (Whizlabs): leave it out until the owner writes a case study. The facts are
  already in the graph tooltip.
- Journll Insights: not the owner's engineering work, so exclude it.
- Content Gap Suggestions (WordPress/ai #929): add it as a card with status **In review** only if
  the owner asks, and update it once it merges.

## Open source (list section, in this order)

| Project | Line | Links |
|---|---|---|
| WordPress/ai | 6 merged PRs: Editorial Updates, Media Library image generation, bulk alt text. | https://github.com/WordPress/ai/pulls?q=is%3Apr+author%3Azeus2611+is%3Amerged |
| huggingface/transformers | Fixed batch-size handling in `Trainer.prediction_loop` for distributed evaluation. | https://github.com/huggingface/transformers/pull/34343 |
| appwrite/templates | Python storage-cleaner function template. | https://github.com/appwrite/templates/pull/338 |
| activist-org/activist | Test coverage for group models and an i18n test runner. | https://github.com/activist-org/activist/pull/1020 · https://github.com/activist-org/activist/pull/995 |
| open-telemetry/opentelemetry.io | Docs: TypeScript exporter examples. | https://github.com/open-telemetry/opentelemetry.io/pull/2156 |

**Never list** Automattic/Jetpack #47018, WordPress/ai-provider-for-openai #15, or
appwrite/templates #347. They weren't merged.

## Education (graph tooltip plus JSON-LD)

- M.Tech, Signal & Image Processing, NIT Rourkela · 2025–2027 (expected May 2027)
- B.Tech, Electronics & Communication Engineering, Shri Mata Vaishno Devi University · 2020–2024

## Writing (hidden until the first post is published)

- TODO: "Shipping an AI feature into WordPress: designing around a whole-post revision model"
- TODO: "What a RAG support agent taught me about production retrieval"
