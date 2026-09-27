export type ExperienceRow = {
  dates: string;
  role: string;
  org: string;
  line: string;
  /** CONTENT.md: "show only if the timeline doesn't look crowded." Re-check at Checkpoint 2. */
  optional?: true;
};

export const experience: readonly ExperienceRow[] = [
  {
    dates: "Jul 2026 – now",
    role: "Intern (co-op), Developer Experience",
    org: "AMD",
    line: "Building internal developer tooling for IP engineers.",
  },
  {
    dates: "Jan 2025 – Jun 2026",
    role: "Founding engineer",
    org: "BridgeTalk",
    line: "Built and shipped the consumer and B2B apps of an AI speaking coach on iOS and Android (Flutter, FastAPI, GCP).",
  },
  {
    dates: "Apr 2025 – Aug 2025",
    role: "Cloud Labs Engineer",
    org: "Whizlabs",
    line: "Built a RAG support agent over AWS and GCP docs that automated 65% of support tickets and cut median time-to-resolve by 42%.",
  },
  {
    dates: "May 2024 – Mar 2025",
    role: "Cloud Products Associate",
    org: "Whizlabs",
    line: "Built serverless abuse detection that cut malicious resource incidents by 78%, and reworked lab teardown to cut deletion costs by 35%.",
  },
  {
    dates: "Apr 2023 – May 2024",
    role: "Cloud Computing Intern",
    org: "Whizlabs",
    line: "Built and maintained hands-on GCP and AWS labs; received two Sprint Star awards and a quarterly Outstanding Distinction award.",
  },
  {
    dates: "Jul 2022 – Aug 2022",
    role: "Software Engineer Intern",
    org: "Supista",
    line: "Integrated payment gateways (+14% online transactions) and built Android performance monitoring (−22% crashes).",
    optional: true,
  },
];
