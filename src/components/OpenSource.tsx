import { ossItems } from "@/content/oss";
import { Container } from "./Container";

export function OpenSource() {
  return (
    <section id="oss" className="border-t border-border py-16 md:py-22">
      <Container size="wide">
        <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">
          Open source
        </p>
        <div className="mt-8 flex flex-col divide-y divide-border">
          {ossItems.map((item) => (
            <div
              key={item.project}
              className="grid grid-cols-1 gap-2 py-5 md:grid-cols-[260px_1fr_150px] md:items-center md:gap-6"
            >
              <p className="font-medium text-ink">{item.project}</p>
              <p className="text-sm text-muted">{item.line}</p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 md:justify-end">
                {item.links.map((link) => (
                  <a key={link.href} href={link.href} className="whitespace-nowrap text-sm">
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
