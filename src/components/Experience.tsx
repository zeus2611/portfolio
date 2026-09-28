import { currentlyLine, graphCaption } from "@/content/timeline";
import { Container } from "./Container";
import { GitGraph } from "./GitGraph";

export function Experience() {
  return (
    <section id="exp" className="border-t border-border py-16 md:py-22">
      <Container size="wide">
        <p className="font-mono text-eyebrow uppercase tracking-[0.16em] text-accent">
          Experience
        </p>
        <p className="mt-3 font-mono text-ui text-subtle">{graphCaption}</p>
      </Container>
      {/* Wider than the 1040 reading column on purpose — DESIGN.md draws the
          graph at "the 1040 column plus 120px of bleed on each side"
          (viewBox is 1280 wide). Nesting it inside Container(wide) was
          shrinking the whole graph, text included, by ~23%. */}
      <div className="mt-8 px-6 md:mx-auto md:max-w-7xl md:px-4">
        <GitGraph />
      </div>
      <Container size="wide">
        <p className="mt-8 text-support text-muted">
          <span className="font-mono text-eyebrow uppercase tracking-[0.16em] text-accent">
            Currently
          </span>{" "}
          {currentlyLine}
        </p>
      </Container>
    </section>
  );
}
