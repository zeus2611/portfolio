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
        <div className="mt-8">
          <GitGraph />
        </div>
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
