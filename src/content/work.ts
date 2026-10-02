export type Challenge = {
  title: string;
  body: string;
};

export type WorkSidebar = {
  role: string;
  timeline: string;
  review?: string;
  team?: string;
  release?: string;
  platforms?: string;
  stack: readonly string[];
  links: readonly { label: string; href: string }[];
};

export type WorkItem = {
  slug: string;
  category: string;
  year: string;
  status: string;
  title: string;
  tagline: string;
  cardTags: readonly string[];
  overview: readonly string[];
  keyChallenges: readonly [Challenge, Challenge, Challenge];
  whatShipped: readonly string[];
  sidebar: WorkSidebar;
  /** A short caveat shown near the header, e.g. why there's no repo link. */
  note?: string;
};

/**
 * Selected work, in display order. Left out per CONTENT.md "Not included":
 * rag-support-agent (no case study yet), Journll Insights (not engineering
 * work), and Content Gap Suggestions (#929, in review — add only if asked).
 */
export const workItems: readonly WorkItem[] = [
  {
    slug: "editorial-updates",
    category: "OPEN SOURCE",
    year: "2026",
    status: "Merged",
    title: "Editorial Updates for WordPress AI",
    tagline:
      "AI that applies an editor's unresolved notes to post content, block by block, and lets the author review and roll back the result.",
    cardTags: ["PHP", "React", "LLMs"],
    overview: [
      'The official WordPress AI plugin could already add AI editorial notes to blocks. Issue #250 asked for the next step: apply those notes automatically, without taking control away from the author. It shipped as "Refine from Notes" and was later renamed Editorial Updates (#528).',
    ],
    keyChallenges: [
      {
        title: "Revisions are whole-post snapshots.",
        body: "Rolling back one block's AI edit would undo all the others. I proposed shipping apply-all with review in revisions as the MVP, and tracking per-change accept/reject as a follow-up (#324).",
      },
      {
        title: "The view we needed was behind a private API.",
        body: "The block-based visual revisions view was gated to core. I documented the blocker in #289. Then, in #861, I opened the view by triggering core's own Revisions button (the same approach WordPress's test utilities use), with a fallback to the classic revision.php screen.",
      },
      {
        title: "Output in the content's language.",
        body: "An English context wrapper was biasing the model toward English. I removed it and added a language-matching rule, following the maintainers' pattern from #357.",
      },
    ],
    whatShipped: [
      "Block-by-block refinement in batches of 4 with a live progress indicator",
      "Results saved as a revision for review and rollback",
      "Provider errors shown to the user instead of a generic failure",
      "A link to visual revisions with a classic-screen fallback (#861)",
      "PHPUnit and end-to-end tests",
    ],
    sidebar: {
      role: "Open-source contributor",
      timeline: "Mar – Jul 2026",
      review: "3 rounds with the plugin maintainers, 42 commits",
      release: "WordPress AI 0.8.0",
      stack: ["PHP", "TypeScript", "React", "Gutenberg", "LLMs", "PHPUnit"],
      links: [
        { label: "PR #289", href: "https://github.com/WordPress/ai/pull/289" },
        { label: "PR #861", href: "https://github.com/WordPress/ai/pull/861" },
        { label: "Issue #250", href: "https://github.com/WordPress/ai/issues/250" },
      ],
    },
  },
  {
    slug: "media-library-ai",
    category: "OPEN SOURCE",
    year: "2026",
    status: "Shipped v0.4.0",
    title: "AI in the WordPress Media Library",
    tagline:
      "Standalone AI image generation and bulk alt-text generation for the WordPress Media Library.",
    cardTags: ["PHP", "React", "a11y"],
    overview: [
      "Image generation first existed only inside the block editor, and alt text could only be generated one image at a time. I added both workflows to the Media Library, where site owners actually manage images.",
    ],
    keyChallenges: [
      {
        title: "The media grid swallows clicks.",
        body: "WordPress's media grid delegates events, so a normal click handler on the injected button never fired. I used a capture-phase listener to handle the click before the grid does (#258).",
      },
      {
        title: "Bulk jobs that survive failures.",
        body: "Generating alt text for dozens of images can't stop at the first failure. Images are processed one at a time with per-item error handling, and a progress notice shows how far along it is (#330).",
      },
      {
        title: "A refresh mustn't re-run the job.",
        body: "The bulk action passes IDs via query parameters, so I clean up the URL with history.replaceState when the job finishes, and a refresh or back navigation can't trigger it again.",
      },
    ],
    whatShipped: [
      "A standalone image generation page (generate, preview, regenerate, save) in v0.4.0",
      'A bulk "Generate Alt Text" action',
      "Loading-state and button-visibility fixes (#512)",
      "5 integration tests plus end-to-end coverage",
    ],
    sidebar: {
      role: "Open-source contributor",
      timeline: "Feb – May 2026",
      review: "4 reviewers on #258",
      stack: ["PHP", "TypeScript", "React", "WordPress"],
      links: [
        { label: "PR #258", href: "https://github.com/WordPress/ai/pull/258" },
        { label: "PR #330", href: "https://github.com/WordPress/ai/pull/330" },
        { label: "PR #512", href: "https://github.com/WordPress/ai/pull/512" },
      ],
    },
  },
  {
    slug: "bridgetalk",
    category: "EDTECH",
    year: "2025–26",
    status: "Live",
    title: "BridgeTalk",
    tagline:
      "An AI speaking coach for IELTS and TOEFL candidates, built from zero, with consumer and B2B apps on iOS and Android.",
    cardTags: ["Flutter", "FastAPI", "GCP"],
    overview: [
      "BridgeTalk helps students prepare for the IELTS and TOEFL speaking sections, with AI feedback on fluency, pronunciation, pace and vocabulary. As founding engineer I built the product from zero: a consumer app, a B2B Enterprise app for institutions, and the backend behind both.",
    ],
    keyChallenges: [
      {
        title: "iOS and Android at the same time.",
        body: "Both platforms were needed at launch, with a native-feel UX and a tight timeline. I used one Flutter codebase for both stores, including StoreKit 2 in-app purchases on iOS.",
      },
      {
        title: "Two audiences, one platform.",
        body: "Individual learners and institutions have very different journeys. I built a multi-tenant backend on Appwrite with role-based access control and real-time subscriptions, serving 500+ users, and shipped a separate Enterprise app for B2B.",
      },
      {
        title: "Heavy audio without a frozen UI.",
        body: "Speech has to be transcoded and processed before AI feedback comes back. Serverless functions handle transcoding and translation asynchronously, so the app stays responsive.",
      },
    ],
    whatShipped: [
      "The consumer app on the App Store and Play Store",
      "BridgeTalk AI Enterprise (B2B)",
      "A multi-tenant backend with role-based access control",
      "AI speaking feedback",
      "In-app purchases",
    ],
    sidebar: {
      role: "Founding engineer",
      timeline: "Jan 2025 – Jun 2026",
      platforms: "iOS, Android",
      stack: ["Flutter", "Dart", "FastAPI", "Appwrite", "Firebase", "GCP", "OpenAI", "Deepgram"],
      links: [
        {
          label: "App Store (consumer)",
          href: "https://apps.apple.com/us/app/bridgetalk/id6743174081",
        },
        {
          label: "App Store (enterprise)",
          href: "https://apps.apple.com/us/app/bridgetalk-ai-enterprise/id6749461827",
        },
        {
          label: "Play Store",
          href: "https://play.google.com/store/apps/details?id=com.bridgetalk.beta",
        },
      ],
    },
    note: "Closed source, so no repo link.",
  },
];
