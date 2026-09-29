import { currentlyLine, graphCaption } from "@/content/timeline";
import { Container } from "./Container";
import { GitGraph } from "./GitGraph";

export function Experience() {
  return (
    <section id="exp" className="border-t border-border py-16 md:py-22">
      <Container>
        <p className="font-mono text-eyebrow uppercase tracking-[0.16em] text-accent">
          Experience
        </p>
        <p className="mt-3 font-mono text-ui text-subtle">{graphCaption}</p>
      </Container>
      {/* Wider than the page container on purpose: the graph's viewBox is
          1280 wide (DESIGN.md: the column plus bleed on each side), and
          nesting it inside Container shrinks the graph and its text. */}
      <div className="mt-8 px-6 md:mx-auto md:max-w-7xl md:px-4">
        <GitGraph />
      </div>
      <Container>
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
