import { Container } from "@/components/Container";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Experience />
      <Container size="wide" className="py-24">
        <p className="text-sm text-muted">
          Phase 3 checkpoint — git graph wired up. Selected work and Open source land in Phase 4.
        </p>
      </Container>
    </>
  );
}
