import { ossItems } from "@/content/oss";
import { Container } from "./Container";

export function OpenSource() {
  return (
    <section id="oss" className="border-t border-border py-16 md:py-22">
      <Container>
        <p className="font-mono text-eyebrow uppercase tracking-[0.16em] text-accent">
          Open source
        </p>
        <div className="mt-8 flex flex-col divide-y divide-border">
          {ossItems.map((item) => (
            <div
              key={item.project}
              className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[320px_1fr_150px] md:items-center md:gap-6"
            >
              <p className="text-body font-medium text-ink">{item.project}</p>
              <p className="text-support text-muted">{item.line}</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 md:justify-end">
                {item.links.map((link) => (
                  <a key={link.href} href={link.href} className="whitespace-nowrap text-support">
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
