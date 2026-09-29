import Link from "next/link";
import { formatPostDate, getPublishedPosts } from "@/lib/writing";
import { Container } from "./Container";

/** Latest three published posts. Renders nothing until one has `draft: false`. */
export async function Writing() {
  const posts = (await getPublishedPosts()).slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="writing" className="border-t border-border py-16 md:py-22">
      <Container>
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-eyebrow uppercase tracking-[0.16em] text-accent">Writing</p>
          <Link href="/writing" className="text-ui">
            All writing →
          </Link>
        </div>
        <ul className="mt-8 flex flex-col divide-y divide-border">
          {posts.map((post) => (
            <li key={post.slug} className="grid gap-2 py-5 md:grid-cols-[150px_1fr] md:gap-6">
              <time
                dateTime={post.date}
                className="font-mono text-[11px] uppercase tracking-wide text-subtle md:pt-2"
              >
                {formatPostDate(post.date)}
              </time>
              <div>
                <Link
                  href={`/writing/${post.slug}`}
                  className="font-display text-card-title font-semibold leading-tight text-ink no-underline hover:underline"
                >
                  {post.title}
                </Link>
                <p className="mt-1 text-support text-muted">{post.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
