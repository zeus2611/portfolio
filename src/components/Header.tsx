import Link from "next/link";
import { identity } from "@/content/profile";
import { getPublishedPosts } from "@/lib/writing";
import { Container } from "./Container";
import { ThemeToggle } from "./ThemeToggle";

export async function Header() {
  const hasWriting = (await getPublishedPosts()).length > 0;

  return (
    <header className="border-b border-border">
      <Container size="wide">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-display text-h3 font-semibold no-underline">
            {identity.name}
          </Link>
          <nav aria-label="Primary" className="flex items-center gap-6 text-ui">
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
