import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import rehypeShiki from "@shikijs/rehype";
import { createCssVariablesTheme } from "shiki";
import { compileMDX } from "next-mdx-remote/rsc";
import { cache, type ReactElement } from "react";
import { mdxComponents } from "@/components/mdx";

const WRITING_DIR = path.join(process.cwd(), "src/content/writing");

export interface PostMeta {
  slug: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  summary: string;
  tags: readonly string[];
  draft: boolean;
}

export interface Post extends PostMeta {
  content: ReactElement;
}

// Colours come from --shiki-* variables mapped to the design tokens in
// globals.css, so code blocks follow the light/dark theme without a second
// highlighter pass.
const codeTheme = createCssVariablesTheme({
  name: "site-tokens",
  variablePrefix: "--shiki-",
  variableDefaults: {},
  fontStyle: true,
});

const includeDrafts = process.env.NODE_ENV !== "production";

function fail(file: string, problem: string): never {
  throw new Error(`Invalid frontmatter in src/content/writing/${file}: ${problem}`);
}

function parseFrontmatter(file: string, slug: string, data: unknown): PostMeta {
  if (typeof data !== "object" || data === null) fail(file, "missing frontmatter block");
  const fm = data as Record<string, unknown>;

  const text = (key: string): string => {
    const value = fm[key];
    if (typeof value !== "string" || value.trim() === "") {
      fail(file, `"${key}" must be a non-empty string`);
    }
    return value;
  };

  const date = text("date");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) {
    fail(file, `"date" must be a valid YYYY-MM-DD, got "${date}"`);
  }

  const tags = fm.tags ?? [];
  if (!Array.isArray(tags) || tags.some((t) => typeof t !== "string")) {
    fail(file, `"tags" must be a list of strings`);
  }

  if (typeof fm.draft !== "boolean") {
    fail(file, `"draft" must be true or false (never omitted, so nothing publishes by accident)`);
  }

  return {
    slug,
    title: text("title"),
    date,
    summary: text("summary"),
    tags: tags as string[],
    draft: fm.draft,
  };
}

async function loadPost(file: string): Promise<Post> {
  const slug = file.replace(/\.mdx$/, "");
  const source = await readFile(path.join(WRITING_DIR, file), "utf8");

  const { content, frontmatter } = await compileMDX<Record<string, unknown>>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: { rehypePlugins: [[rehypeShiki, { theme: codeTheme }]] },
    },
  });

  return { ...parseFrontmatter(file, slug, frontmatter), content };
}

/** Every post that should exist in this build, newest first. Drafts are dev-only. */
export const getPosts = cache(async (): Promise<Post[]> => {
  let files: string[];
  try {
    files = (await readdir(WRITING_DIR)).filter((f) => f.endsWith(".mdx"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  const posts = await Promise.all(files.map(loadPost));
  return posts
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
});

/**
 * Posts with `draft: false`. This — not `getPosts` — decides whether the Writing
 * nav link and Home section appear, so a dev-only draft never reveals them.
 */
export async function getPublishedPosts(): Promise<Post[]> {
  return (await getPosts()).filter((post) => !post.draft);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return (await getPosts()).find((post) => post.slug === slug);
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}
