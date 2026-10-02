export const graphCaption = "$ git log --graph --all --author=nischay";

export const currentlyLine =
  "Intern (co-op), AMD Developer Experience · M.Tech, NIT Rourkela · contributing to WordPress AI";

export type Lane = "main" | "bridgetalk" | "open-source" | "mtech";

export type MainCommit = {
  date: string; // YYYY-MM
  label: string;
  tooltip: string;
  head?: true;
};

/** Bracket spans drawn above the main line. */
export type MainSpan = {
  label: string;
  from: string;
  to: string | "now";
};

export type OssPr = {
  date: string; // YYYY-MM
  repo: string;
  pr: string;
  title: string;
  href: string;
};

export const mainCommits: readonly MainCommit[] = [
  {
    date: "2022-07",
    label: "supista · swe intern",
    tooltip:
      "Integrated payment gateways (+14% online transactions) and built Android performance monitoring (−22% crashes).",
  },
  {
    date: "2023-04",
    label: "whizlabs · cloud computing intern",
    tooltip:
      "Built and maintained hands-on GCP and AWS labs; two Sprint Star awards and a quarterly Outstanding Distinction award.",
  },
  {
    date: "2024-05",
    label: "whizlabs · cloud products associate",
    tooltip:
      "Serverless abuse detection that cut malicious resource incidents by 78%; lab teardown reworked to cut deletion costs by 35%.",
  },
  {
    date: "2025-04",
    label: "whizlabs · cloud labs engineer",
    tooltip:
      "RAG support agent over AWS and GCP docs: 65% of tickets automated, median time-to-resolve down 42%.",
  },
  {
    date: "2026-07",
    label: "amd · intern (co-op), developer experience",
    tooltip: "Building internal developer tooling for IP engineers.",
    head: true,
  },
];

export const mainSpans: readonly MainSpan[] = [
  { label: "whizlabs · apr 2023 – aug 2025", from: "2023-04", to: "2025-08" },
  { label: "amd · intern (co-op) · jul 2026 –", from: "2026-07", to: "now" },
];

export const bridgetalkBranch = {
  from: "2025-01",
  to: "2026-06",
  label: "bridgetalk · founding engineer · 2 apps shipped",
  tooltip:
    "Built and shipped the consumer and B2B apps of an AI speaking coach on iOS and Android (Flutter, FastAPI, GCP).",
} as const;

export const openSourceBranch = {
  from: "2023-01",
  label: "open-source",
  earlyClusterLabel: "transformers · activist",
  lateClusterLabel: "WordPress AI · 6 merged",
  prs: [
    {
      date: "2023-01",
      repo: "open-telemetry/opentelemetry.io",
      pr: "#2156",
      title: "Docs: TypeScript exporter examples",
      href: "https://github.com/open-telemetry/opentelemetry.io/pull/2156",
    },
    {
      date: "2024-10",
      repo: "activist-org/activist",
      pr: "#995",
      title: "Runner for the i18n test suite",
      href: "https://github.com/activist-org/activist/pull/995",
    },
    {
      date: "2024-10",
      repo: "huggingface/transformers",
      pr: "#34343",
      title: "Fix batch-size handling in Trainer.prediction_loop for DataLoaderShard",
      href: "https://github.com/huggingface/transformers/pull/34343",
    },
    {
      date: "2024-12",
      repo: "activist-org/activist",
      pr: "#1020",
      title: "Test coverage for group models",
      href: "https://github.com/activist-org/activist/pull/1020",
    },
    {
      date: "2026-02",
      repo: "appwrite/templates",
      pr: "#338",
      title: "Python storage-cleaner function template",
      href: "https://github.com/appwrite/templates/pull/338",
    },
    {
      date: "2026-03",
      repo: "WordPress/ai",
      pr: "#258",
      title: "Standalone AI image generation in the Media Library (v0.4.0)",
      href: "https://github.com/WordPress/ai/pull/258",
    },
    {
      date: "2026-04",
      repo: "WordPress/ai",
      pr: "#330",
      title: 'Bulk "Generate Alt Text" action',
      href: "https://github.com/WordPress/ai/pull/330",
    },
    {
      date: "2026-04",
      repo: "WordPress/ai",
      pr: "#289",
      title: "Refine from Notes, later Editorial Updates",
      href: "https://github.com/WordPress/ai/pull/289",
    },
    {
      date: "2026-05",
      repo: "WordPress/ai",
      pr: "#512",
      title: "Image generation loading-state fixes",
      href: "https://github.com/WordPress/ai/pull/512",
    },
    {
      date: "2026-05",
      repo: "WordPress/ai",
      pr: "#528",
      title: "Rename to Editorial Notes / Editorial Updates",
      href: "https://github.com/WordPress/ai/pull/528",
    },
    {
      date: "2026-07",
      repo: "WordPress/ai",
      pr: "#861",
      title: "Link Editorial Updates to visual revisions",
      href: "https://github.com/WordPress/ai/pull/861",
    },
  ] satisfies readonly OssPr[],
} as const;

export const mtechEnd = { month: "May", year: 2027 } as const;

export const mtechBranch = {
  from: "2025-08",
  label: "m.tech · nit rourkela",
  tooltip: `M.Tech in Signal & Image Processing, NIT Rourkela (2025 – ${mtechEnd.month} ${mtechEnd.year}, expected).`,
} as const;
