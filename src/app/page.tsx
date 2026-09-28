import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Container size="wide" className="py-24">
        <p className="text-sm text-muted">
          Phase 2 checkpoint — wave hero wired up. Experience (git graph), Selected work and Open
          source land in Phases 3–4.
        </p>
      </Container>
    </>
  );
}
