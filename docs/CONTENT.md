# CONTENT: source of truth

Every fact on the site comes from this file. Anything marked `TODO` is unknown: render it as a
visible TODO in dev and never invent a value for it. The owner edits this file, and the code reads
from typed data derived from it.

## Identity

- Name: **Nischay** (single name, with no surname; don't add one)
- Location: Hyderabad, India
- Email: itsnischay2604@gmail.com
- GitHub: https://github.com/zeus2611
- LinkedIn: https://www.linkedin.com/in/nischay-2604
- Domain: https://www.nischay.live
- Résumé: `/resume.pdf` (TODO: the owner will add the file)

## Hero

- H1: **Nischay**
- Line: **Software engineer working on AI products and developer tools.**
- Sub-line: Backend, mobile and cloud: from the first design doc to production.

## Now

- Intern (co-op) on AMD's Developer Experience team, working on internal developer tooling for IP
  engineers.
- Completing an M.Tech in Signal & Image Processing at NIT Rourkela.
- Contributing to the WordPress AI plugin in my spare time.

> Don't name AMD internal projects, tools or products. The owner will update this section if
> something becomes public.

## Selected work (case studies)

### 1. `editorial-updates`: Editorial Updates for WordPress AI
- Role / dates: Open-source contributor · Mar–Jul 2026
- Tags: PHP · TypeScript · React · WordPress · LLMs
- One-liner: An AI feature that applies an editor's unresolved notes to post content, block by block.
- Links: https://github.com/WordPress/ai/pull/289 · https://github.com/WordPress/ai/pull/861
- Context: The official WordPress AI plugin had a "Review Notes" feature that adds AI editorial notes
  to blocks. Issue #250 asked for the next step: apply those notes automatically. It originally
  shipped as "Refine from Notes" and was later renamed "Editorial Updates" (#528).
- Problem: Applying feedback note by note is slow. Authors need AI help that they can still review
  and undo.
- Constraints: WordPress revisions are whole-post snapshots, so per-block rollback wasn't possible.
  The block-based visual revisions view was behind a private Gutenberg API that plugins can't use.
  Output had to match the content's language.
- What I built: I mapped pending note threads to their blocks, processed blocks in batches of 4 per
  request with a live progress indicator, saved the result as a revision, and added a success notice
  that links to review the revision. I covered it with PHPUnit and end-to-end tests.
- Decisions & trade-offs:
  - I proposed shipping "apply all + revision review" as the MVP and tracking per-change
    accept/reject as a follow-up (#324), instead of building a custom inline diff UI.
  - I first used `autosave()` so the AI wouldn't directly save changes. Review found that this lost
    changes when users followed the revisions link, so I switched to `savePost()`.
  - I documented the private-API blocker instead of hacking around it in #289. In a follow-up
    (#861, after WordPress 7.0) I linked the success notice to the in-editor visual revisions view.
    `setCurrentRevisionId` is still private, so it opens the Document Settings sidebar and triggers
    core's own Revisions button, the same approach WordPress's test utilities use. If the button
    isn't found, it falls back to the classic `revision.php` screen.
  - Language: I removed an English context wrapper that biased the model and added a
    language-matching rule, following the maintainers' pattern from #357.
- Outcome: Merged after about 5 weeks and 3 review rounds with the plugin maintainers, in milestone
  0.8.0. The visual-revisions follow-up (#861) was merged in July 2026.

### 2. `media-library-ai`: AI in the WordPress Media Library
- Role / dates: Open-source contributor · Feb–May 2026
- Tags: PHP · TypeScript · React · WordPress · Accessibility
- One-liner: Standalone AI image generation and bulk alt-text generation for the Media Library.
- Links: https://github.com/WordPress/ai/pull/258 · https://github.com/WordPress/ai/pull/330 ·
  https://github.com/WordPress/ai/pull/512
- What I built:
  - Standalone image generation (#258, shipped in v0.4.0): an admin page to generate, preview,
    regenerate and save AI images outside the block editor. I used a capture-phase click listener to
    work around the media grid's event delegation. It was reviewed by 4 reviewers over multiple
    rounds.
  - Bulk "Generate Alt Text" (#330): a Media Library bulk action that processes images one after
    another, keeps going when a single image fails, shows progress, and cleans up the URL with
    `history.replaceState` so a refresh can't re-run the job. I added 5 integration tests plus
    end-to-end coverage.
  - Follow-up fixes to loading states and button visibility (#512).

### 3. `bridgetalk`: BridgeTalk
- Role / dates: Founding engineer · Jan 2025–Jun 2026
- Tags: Flutter · FastAPI · Appwrite · GCP · LLMs
- One-liner: An AI speaking coach for IELTS and TOEFL candidates, with consumer and B2B apps on iOS
  and Android.
- Links: https://apps.apple.com/us/app/bridgetalk/id6743174081 ·
  https://apps.apple.com/us/app/bridgetalk-ai-enterprise/id6749461827 ·
  https://play.google.com/store/apps/details?id=com.bridgetalk.beta
- What I built: A multi-tenant SaaS backend on Appwrite with role-based access control and real-time
  subscriptions (500+ users), serverless functions for asynchronous audio transcoding and
  translation, AI speaking feedback (fluency, pronunciation, pace, vocabulary), and App Store / Play
  Store releases including StoreKit 2 in-app purchases.
- Decisions & trade-offs: TODO (the owner to write 2–3 bullets)
- Note: the code is closed source, so don't link a repo.

### 4. `rag-support-agent`: AI support agent at Whizlabs
- Role / dates: Cloud Labs Engineer, Whizlabs · 2025
- Tags: Python · RAG · Vector DB · AWS · GCP
- One-liner: A RAG support agent over AWS and GCP documentation.
- Outcome: Automated 65% of support tickets and cut median time-to-resolve by 42%.
- Everything else: TODO (the owner to write it). Internal work, with no public links.
- Show this as a card only once the case study has real content. Until then, leave it out.

## Open source (ordered)

| Project | Line | Links |
|---|---|---|
| WordPress/ai | 6 merged PRs to the official WordPress AI plugin: Editorial Updates, Media Library image generation (v0.4.0), bulk alt text, and more. | https://github.com/WordPress/ai/pulls?q=is%3Apr+author%3Azeus2611+is%3Amerged |
| huggingface/transformers | Fixed batch-size handling in `Trainer.prediction_loop` for `DataLoaderShard`, which caused a `TypeError` during distributed evaluation. | https://github.com/huggingface/transformers/pull/34343 |
| appwrite/templates | Python storage-cleaner function template. | https://github.com/appwrite/templates/pull/338 |
| activist-org/activist | Test coverage for group models and an i18n test runner. | https://github.com/activist-org/activist/pull/1020 · https://github.com/activist-org/activist/pull/995 |
| open-telemetry/opentelemetry.io | Docs: TypeScript exporter examples. | https://github.com/open-telemetry/opentelemetry.io/pull/2156 |

**In review (optional row):** WordPress/ai #929, Content Gap Suggestions: a pluggable analytics
provider layer with an anonymization boundary. Label it "in review" and remove it or update it once
it merges.

Don't list Automattic/Jetpack, WordPress/ai-provider-for-openai, or appwrite/templates #347. Those PRs
weren't merged.

## Experience

| Dates | Role | Org | One line |
|---|---|---|---|
| Jul 2026 – now | Intern (co-op), Developer Experience | AMD | Building internal developer tooling for IP engineers. |
| Jan 2025 – Jun 2026 | Founding engineer | BridgeTalk | Built and shipped the consumer and B2B apps of an AI speaking coach on iOS and Android (Flutter, FastAPI, GCP). |
| Apr 2025 – Aug 2025 | Cloud Labs Engineer | Whizlabs | Built a RAG support agent over AWS and GCP docs that automated 65% of support tickets and cut median time-to-resolve by 42%. |
| May 2024 – Mar 2025 | Cloud Products Associate | Whizlabs | Built serverless abuse detection that cut malicious resource incidents by 78%, and reworked lab teardown to cut deletion costs by 35%. |
| Apr 2023 – May 2024 | Cloud Computing Intern | Whizlabs | Built and maintained hands-on GCP and AWS labs; received two Sprint Star awards and a quarterly Outstanding Distinction award. |
| Jul 2022 – Aug 2022 | Software Engineer Intern | Supista | Integrated payment gateways (+14% online transactions) and built Android performance monitoring (−22% crashes). *(Optional: show only if the timeline doesn't look crowded.)* |

## Education

- M.Tech, Signal & Image Processing, NIT Rourkela · 2025–TODO (expected year)
- B.Tech, Electronics & Communication Engineering, Shri Mata Vaishno Devi University · 2020–2024

## Certification (single line, in the footer or Experience)

- Google Cloud Professional Cloud Architect (valid through Sep 2027). List **only** this one. The
  others have expired.

## Writing (planned; hidden until published)

- TODO: "Shipping an AI feature into WordPress: designing around a whole-post revision model" (#289 story)
- TODO: "What a RAG support agent taught me about production retrieval" (Whizlabs)

## Stack line (plain text, Home footer or Now)

Python · TypeScript/React · PHP · Dart/Flutter · FastAPI · GCP · Docker · Kubernetes · LLM/RAG tooling
