import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { identity } from "@/content/profile";
import { formatPostDate, getPosts } from "@/lib/writing";

export const metadata: Metadata = {
  title: `Writing — ${identity.name}`,
  description: "Engineering write-ups.",
  alternates: { types: { "application/rss+xml": `${identity.domain}/writing/rss.xml` } },
};

export default async function WritingIndexPage() {
  const posts = await getPosts();

  return (
    <Container size="reading" className="py-16 md:py-20">
      <p className="font-mono text-eyebrow uppercase tracking-[0.16em] text-accent">Writing</p>
      <h1 className="mt-4 font-display text-case-h1 font-semibold leading-tight tracking-[-0.02em]">
        Writing
      </h1>

      {posts.length === 0 ? (
        <p className="mt-10 text-body text-muted">Nothing published yet.</p>
      ) : (
        <ul className="mt-10 flex flex-col divide-y divide-border border-y border-border">
          {posts.map((post) => (
            <li key={post.slug} className="py-6">
              <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wide text-subtle">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                {post.draft ? (
                  <span className="rounded-full border border-accent px-2 py-px text-accent">
                    Draft — dev only
                  </span>
                ) : null}
              </p>
              <h2 className="mt-2 font-display text-card-title font-semibold leading-tight">
                <Link href={`/writing/${post.slug}`} className="text-ink no-underline hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-support text-muted">{post.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
