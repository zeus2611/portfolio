export type WritingPost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: readonly string[];
  draft?: boolean;
};

/**
 * Populated in Phase 4 from src/content/writing/*.mdx frontmatter. Empty for
 * now, so the nav and Home hide the Writing section per SPEC.
 */
export const writingPosts: readonly WritingPost[] = [];
