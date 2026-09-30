import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { identity } from "@/content/profile";
import { pageMetadata } from "@/lib/seo";
import { formatPostDate, getPosts, getPublishedPosts } from "@/lib/writing";

export async function generateMetadata(): Promise<Metadata> {
  const published = await getPublishedPosts();
  return {
    ...pageMetadata({
      title: "Writing",
      description: "Engineering write-ups.",
      path: "/writing",
      // Nothing to index until the first post is published.
      noindex: published.length === 0,
    }),
    alternates: {
      canonical: "/writing",
      types: { "application/rss+xml": `${identity.domain}/writing/rss.xml` },
    },
  };
}

export default async function WritingIndexPage() {
  const posts = await getPosts();

  return (
    <Container className="py-16 md:py-20">
      <p className="font-mono text-eyebrow uppercase tracking-[0.16em] text-accent">Writing</p>
      <h1 className="mt-4 font-display text-case-h1 font-semibold leading-tight tracking-[-0.02em]">
        Writing
      </h1>

      {posts.length === 0 ? (
        <p className="mt-10 text-body text-muted">Nothing published yet.</p>
      ) : (
        <ul className="mt-10 flex flex-col divide-y divide-border border-y border-border">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="grid gap-2 py-6 md:grid-cols-[150px_minmax(0,1fr)_auto] md:gap-8"
            >
              <div className="flex flex-col items-start gap-2 md:pt-2">
                <time
                  dateTime={post.date}
                  className="font-mono text-[11px] uppercase tracking-wide text-subtle"
                >
                  {formatPostDate(post.date)}
                </time>
                {post.draft ? (
                  <span className="rounded-full border border-accent px-2 py-px font-mono text-[11px] uppercase tracking-wide text-accent">
                    Draft — dev only
                  </span>
                ) : null}
              </div>
              <div>
                <h2 className="font-display text-card-title font-semibold leading-tight">
                  <Link
                    href={`/writing/${post.slug}`}
                    className="text-ink no-underline hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 max-w-3xl text-support text-muted">{post.summary}</p>
              </div>
              <div className="flex flex-wrap content-start gap-2 md:max-w-56 md:justify-end md:pt-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
