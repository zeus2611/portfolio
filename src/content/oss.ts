export type OssItem = {
  project: string;
  line: string;
  links: readonly { label: string; href: string }[];
};

/**
 * Never list: Automattic/Jetpack #47018, WordPress/ai-provider-for-openai #15,
 * appwrite/templates #347 — none were merged.
 */
export const ossItems: readonly OssItem[] = [
  {
    project: "WordPress/ai",
    line: "6 merged PRs: Editorial Updates, Media Library image generation, bulk alt text.",
    links: [
      {
        label: "Merged PRs",
        href: "https://github.com/WordPress/ai/pulls?q=is%3Apr+author%3Azeus2611+is%3Amerged",
      },
    ],
  },
  {
    project: "huggingface/transformers",
    line: "Fixed batch-size handling in Trainer.prediction_loop for distributed evaluation.",
    links: [{ label: "PR #34343", href: "https://github.com/huggingface/transformers/pull/34343" }],
  },
  {
    project: "appwrite/templates",
    line: "Python storage-cleaner function template.",
    links: [{ label: "PR #338", href: "https://github.com/appwrite/templates/pull/338" }],
  },
  {
    project: "activist-org/activist",
    line: "Test coverage for group models and an i18n test runner.",
    links: [
      { label: "PR #1020", href: "https://github.com/activist-org/activist/pull/1020" },
      { label: "PR #995", href: "https://github.com/activist-org/activist/pull/995" },
    ],
  },
  {
    project: "open-telemetry/opentelemetry.io",
    line: "Docs: TypeScript exporter examples.",
    links: [
      { label: "PR #2156", href: "https://github.com/open-telemetry/opentelemetry.io/pull/2156" },
    ],
  },
];
