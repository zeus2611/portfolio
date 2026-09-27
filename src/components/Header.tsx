import Link from "next/link";
import { identity } from "@/content/profile";
import { writingPosts } from "@/content/writing";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const hasWriting = writingPosts.length > 0;

  return (
    <header className="border-b border-border">
      <Container size="wide">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-display text-lg font-semibold no-underline">
            {identity.name}
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-6 text-sm">
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
