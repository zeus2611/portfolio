import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { identity } from "@/content/profile";
import { formatPostDate, getPost, getPosts } from "@/lib/writing";

export const dynamicParams = false;

// `output: "export"` refuses an empty list, and a production build with no
// published posts is the normal state today. This placeholder keeps the route
// valid; the page below 404s for it, so it never renders as content.
const NO_POSTS_SLUG = "no-posts-yet";

export async function generateStaticParams() {
  const params = (await getPosts()).map((post) => ({ slug: post.slug }));
  return params.length > 0 ? params : [{ slug: NO_POSTS_SLUG }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — ${identity.name}`,
    description: post.summary,
    alternates: { types: { "application/rss+xml": `${identity.domain}/writing/rss.xml` } },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article>
      <div className="relative overflow-hidden border-b border-border">
        <div className="paper-grid absolute inset-0" aria-hidden="true" />
        <Container size="reading" className="relative py-16 md:py-20">
          <Link href="/writing" className="text-ui">
            ← All writing
          </Link>
          <p className="mt-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-wide text-subtle">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            {post.draft ? (
              <span className="rounded-full border border-accent px-2 py-px text-accent">
                Draft — dev only
              </span>
            ) : null}
          </p>
          <h1 className="mt-4 font-display text-case-h1 font-semibold leading-tight tracking-[-0.02em]">
            {post.title}
          </h1>
          <p className="mt-4 text-body text-muted">{post.summary}</p>
          {post.tags.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </Container>
      </div>

      <Container size="reading" className="py-12 md:py-16">
        <div className="post-body">{post.content}</div>
        <Link href="/writing" className="mt-12 inline-block text-ui">
          ← All writing
        </Link>
      </Container>
    </article>
  );
}
