import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { TodoNote } from "@/components/TodoNote";
import { workItems } from "@/content/work";

export function generateStaticParams() {
  return workItems.map((item) => ({ slug: item.slug }));
}

async function getItem(slug: string) {
  return workItems.find((item) => item.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getItem(slug);
  if (!item) return {};
  return {
    title: `${item.title} — Nischay`,
    description: item.tagline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getItem(slug);
  if (!item) notFound();

  const sidebarRows: { key: string; value: React.ReactNode }[] = [
    { key: "Role", value: item.sidebar.role },
    { key: "Timeline", value: item.sidebar.timeline },
    ...(item.sidebar.review ? [{ key: "Review", value: item.sidebar.review }] : []),
    ...(item.sidebar.team ? [{ key: "Team", value: item.sidebar.team }] : []),
    ...(item.sidebar.release ? [{ key: "Release", value: item.sidebar.release }] : []),
    ...(item.sidebar.platforms ? [{ key: "Platforms", value: item.sidebar.platforms }] : []),
    {
      key: "Stack",
      value: (
        <span className="flex flex-wrap gap-2">
          {item.sidebar.stack.map((tag) => (
            <span
              key={tag}
              className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {tag}
            </span>
          ))}
          {item.sidebar.stackTodo ? <TodoNote>{item.sidebar.stackTodo.note}</TodoNote> : null}
        </span>
      ),
    },
    {
      key: "Links",
      value: (
        <span className="flex flex-col gap-1">
          {item.sidebar.links.map((link) => (
            <a key={link.href} href={link.href} className="text-ui">
              {link.label} ↗
            </a>
          ))}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="relative overflow-hidden border-b border-border">
        <div className="paper-grid absolute inset-0" aria-hidden="true" />
        <Container className="relative py-16 md:py-20">
          <div className="max-w-3xl">
            <Link href="/#work" className="text-ui">
              ← All work
            </Link>
            <div className="mt-6 flex items-center gap-3">
              <p className="font-mono text-[11px] uppercase tracking-wide text-subtle">
                {item.category} · {item.year}
              </p>
              <span className="whitespace-nowrap rounded-full border border-accent px-2 py-px font-mono text-[11px] text-accent">
                {item.status}
              </span>
            </div>
            <h1 className="mt-4 font-display text-case-h1 font-semibold leading-tight tracking-[-0.02em]">
              {item.title}
            </h1>
            <p className="mt-4 text-body text-muted">{item.tagline}</p>
            {item.note ? <p className="mt-2 text-support text-subtle">{item.note}</p> : null}
          </div>
        </Container>
      </div>

      <Container className="py-16 md:py-20">
        <div className="flex flex-col gap-12 md:grid md:grid-cols-[minmax(0,1fr)_300px] md:items-start md:gap-18">
          <div className="order-2 md:order-none">
            <section>
              <h2 className="font-display text-h2 font-semibold">Overview</h2>
              <div className="mt-4 flex flex-col gap-4 text-body leading-relaxed text-ink">
                {item.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="font-display text-h2 font-semibold">Key challenges</h2>
              <div className="mt-4 flex flex-col gap-4">
                {item.keyChallenges.map((challenge, i) => (
                  <div
                    key={challenge.title}
                    className="grid grid-cols-[40px_1fr] gap-4 rounded-xl border border-border bg-surface p-5 md:grid-cols-[56px_1fr] md:p-6"
                  >
                    <p className="font-mono text-xl text-accent md:text-[22px]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <h3 className="font-medium text-h3 text-ink">{challenge.title}</h3>
                      <p className="mt-2 text-support leading-relaxed text-muted">
                        {challenge.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-12">
              <h2 className="font-display text-h2 font-semibold">What shipped</h2>
              <ul className="mt-4 flex flex-col gap-2 text-body text-ink">
                {item.whatShipped.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span aria-hidden="true" className="text-muted">
                      •
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </section>

            <Link href="/#work" className="mt-12 inline-block text-ui">
              ← All work
            </Link>
          </div>

          <aside className="order-1 flex flex-col gap-6 border-border pb-2 md:sticky md:top-24 md:order-none md:border-l md:pl-8">
            {sidebarRows.map((row) => (
              <div key={row.key}>
                <p className="font-mono text-[11px] uppercase tracking-wide text-subtle">
                  {row.key}
                </p>
                <div className="mt-1 text-ui text-ink">{row.value}</div>
              </div>
            ))}
          </aside>
        </div>
      </Container>
    </>
  );
}
