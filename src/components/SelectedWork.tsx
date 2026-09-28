import Link from "next/link";
import { workItems } from "@/content/work";
import { Container } from "./Container";

export function SelectedWork() {
  return (
    <section id="work" className="border-t border-border py-16 md:py-22">
      <Container size="wide">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">
            Selected work
          </p>
          <p className="font-mono text-[13px] text-subtle">{workItems.length} case studies</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workItems.map((item) => (
            <Link
              key={item.slug}
              href={`/work/${item.slug}`}
              className="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-6 no-underline transition-colors hover:border-accent"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-[11px] uppercase tracking-wide text-subtle">
                  {item.category} · {item.year}
                </p>
                <span className="whitespace-nowrap rounded-full border border-accent px-2 py-px font-mono text-[11px] text-accent">
                  {item.status}
                </span>
              </div>
              <h3 className="font-display text-[23px] font-semibold leading-tight text-ink">
                {item.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted">{item.tagline}</p>
              <div className="flex flex-wrap gap-2">
                {item.cardTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-auto text-sm text-accent">
                Read case study{" "}
                <span className="inline-block transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
