import { todo, type Todo } from "./todo";

export type WorkItem = {
  slug: string;
  title: string;
  role: string;
  dates: string;
  tags: readonly string[];
  oneLiner: string;
  links: readonly { label: string; href: string }[];
  context?: readonly string[];
  problem?: string;
  constraints?: string;
  whatIBuilt: string | readonly string[];
  decisionsAndTradeoffs?: readonly string[] | Todo;
  outcome?: string;
  note?: string;
};

/**
 * Selected work, in display order. `rag-support-agent` is deliberately left
 * out per CONTENT.md — it has no case-study content yet.
 */
export const workItems: readonly WorkItem[] = [
  {
    slug: "editorial-updates",
    title: "Editorial Updates for WordPress AI",
    role: "Open-source contributor",
    dates: "Mar–Jul 2026",
    tags: ["PHP", "TypeScript", "React", "WordPress", "LLMs"],
    oneLiner:
      "An AI feature that applies an editor's unresolved notes to post content, block by block.",
    links: [
      { label: "PR #289", href: "https://github.com/WordPress/ai/pull/289" },
      { label: "PR #861", href: "https://github.com/WordPress/ai/pull/861" },
    ],
    context: [
      'The official WordPress AI plugin had a "Review Notes" feature that adds AI editorial notes to blocks. Issue #250 asked for the next step: apply those notes automatically. It originally shipped as "Refine from Notes" and was later renamed "Editorial Updates" (#528).',
    ],
    problem:
      "Applying feedback note by note is slow. Authors need AI help that they can still review and undo.",
    constraints:
      "WordPress revisions are whole-post snapshots, so per-block rollback wasn't possible. The block-based visual revisions view was behind a private Gutenberg API that plugins can't use. Output had to match the content's language.",
    whatIBuilt:
      "I mapped pending note threads to their blocks, processed blocks in batches of 4 per request with a live progress indicator, saved the result as a revision, and added a success notice that links to review the revision. I covered it with PHPUnit and end-to-end tests.",
    decisionsAndTradeoffs: [
      'I proposed shipping "apply all + revision review" as the MVP and tracking per-change accept/reject as a follow-up (#324), instead of building a custom inline diff UI.',
      "I first used autosave() so the AI wouldn't directly save changes. Review found that this lost changes when users followed the revisions link, so I switched to savePost().",
      "I documented the private-API blocker instead of hacking around it in #289. In a follow-up (#861, after WordPress 7.0) I linked the success notice to the in-editor visual revisions view. setCurrentRevisionId is still private, so it opens the Document Settings sidebar and triggers core's own Revisions button, the same approach WordPress's test utilities use. If the button isn't found, it falls back to the classic revision.php screen.",
      "Language: I removed an English context wrapper that biased the model and added a language-matching rule, following the maintainers' pattern from #357.",
    ],
    outcome:
      "Merged after about 5 weeks and 3 review rounds with the plugin maintainers, in milestone 0.8.0. The visual-revisions follow-up (#861) was merged in July 2026.",
  },
  {
    slug: "media-library-ai",
    title: "AI in the WordPress Media Library",
    role: "Open-source contributor",
    dates: "Feb–May 2026",
    tags: ["PHP", "TypeScript", "React", "WordPress", "Accessibility"],
    oneLiner:
      "Standalone AI image generation and bulk alt-text generation for the Media Library.",
    links: [
      { label: "PR #258", href: "https://github.com/WordPress/ai/pull/258" },
      { label: "PR #330", href: "https://github.com/WordPress/ai/pull/330" },
      { label: "PR #512", href: "https://github.com/WordPress/ai/pull/512" },
    ],
    whatIBuilt: [
      "Standalone image generation (#258, shipped in v0.4.0): an admin page to generate, preview, regenerate and save AI images outside the block editor. I used a capture-phase click listener to work around the media grid's event delegation. It was reviewed by 4 reviewers over multiple rounds.",
      "Bulk \"Generate Alt Text\" (#330): a Media Library bulk action that processes images one after another, keeps going when a single image fails, shows progress, and cleans up the URL with history.replaceState so a refresh can't re-run the job. I added 5 integration tests plus end-to-end coverage.",
      "Follow-up fixes to loading states and button visibility (#512).",
    ],
  },
  {
    slug: "bridgetalk",
    title: "BridgeTalk",
    role: "Founding engineer",
    dates: "Jan 2025–Jun 2026",
    tags: ["Flutter", "FastAPI", "Appwrite", "GCP", "LLMs"],
    oneLiner:
      "An AI speaking coach for IELTS and TOEFL candidates, with consumer and B2B apps on iOS and Android.",
    links: [
      { label: "App Store (consumer)", href: "https://apps.apple.com/us/app/bridgetalk/id6743174081" },
      {
        label: "App Store (enterprise)",
        href: "https://apps.apple.com/us/app/bridgetalk-ai-enterprise/id6749461827",
      },
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.bridgetalk.beta",
      },
    ],
    whatIBuilt:
      "A multi-tenant SaaS backend on Appwrite with role-based access control and real-time subscriptions (500+ users), serverless functions for asynchronous audio transcoding and translation, AI speaking feedback (fluency, pronunciation, pace, vocabulary), and App Store / Play Store releases including StoreKit 2 in-app purchases.",
    decisionsAndTradeoffs: todo("the owner to write 2–3 bullets"),
    note: "The code is closed source, so no repo link.",
  },
];
