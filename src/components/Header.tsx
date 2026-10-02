import Link from "next/link";
import { identity } from "@/content/profile";
import { getPublishedPosts } from "@/lib/writing";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

export async function Header() {
  const hasWriting = (await getPublishedPosts()).length > 0;

  return (
    <header className="border-b border-border">
      <Container>
        <div className="flex flex-col gap-1 py-3 md:h-16 md:flex-row md:items-center md:justify-between md:py-0">
          <Link href="/" className="font-display text-h3 font-semibold no-underline">
            {identity.name}
          </Link>
          <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-5 gap-y-1 md:gap-x-6">
            <Link href="/#exp">Experience</Link>
            <Link href="/#work">Work</Link>
            <Link href="/#oss">Open source</Link>
            {hasWriting ? <Link href="/writing">Writing</Link> : null}
            <a href={identity.resumeHref}>Résumé ↗</a>
            <ThemeToggle />
          </nav>
        </div>
      </Container>
    </header>
  );
}
