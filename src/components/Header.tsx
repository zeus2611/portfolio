import Link from "next/link";
import { identity } from "@/content/identity";
import { writingPosts } from "@/content/writing";
import { Container } from "./Container";

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
            <Link href="/#work">Work</Link>
            <Link href="/#open-source">Open source</Link>
            {hasWriting ? <Link href="/writing">Writing</Link> : null}
            <a href={identity.resumeHref}>Résumé</a>
          </nav>
        </div>
      </Container>
    </header>
  );
}
