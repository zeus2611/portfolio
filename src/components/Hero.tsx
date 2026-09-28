import { hero, identity } from "@/content/profile";
import { Container } from "./Container";
import { WaveCanvas } from "./WaveCanvas";

export function Hero() {
  return (
    <section className="relative h-[560px] overflow-hidden md:h-[640px]">
      <div className="paper-grid absolute inset-0" aria-hidden="true" />
      <WaveCanvas />
      <Container size="wide" className="relative z-10 pt-16 md:pt-24">
        <p className="font-mono text-[13px] uppercase tracking-[0.16em] text-accent">
          {hero.eyebrow}
        </p>
        <h1 className="mt-4 font-display text-[44px] font-semibold leading-none tracking-[-0.02em] md:text-[72px]">
          {hero.heading}
        </h1>
        <p className="mt-6 max-w-[560px] text-[20px] leading-snug text-ink md:text-[26px]">
          {hero.line} <em className="font-display italic text-accent">{hero.accentPhrase}</em>
        </p>
        <nav aria-label="Profile links" className="mt-8 flex flex-wrap gap-6 text-sm">
          <a href={identity.github}>GitHub ↗</a>
          <a href={identity.linkedin}>LinkedIn ↗</a>
          <a href={`mailto:${identity.email}`}>Email</a>
          <a href={identity.resumeHref}>Résumé ↗</a>
        </nav>
      </Container>
    </section>
  );
}
