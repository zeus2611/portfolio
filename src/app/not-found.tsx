import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="py-24 md:py-32">
      <p className="font-mono text-eyebrow uppercase tracking-[0.16em] text-accent">404</p>
      <h1 className="mt-4 font-display text-case-h1 font-semibold leading-tight tracking-[-0.02em]">
        Page not found
      </h1>
      <p className="mt-4 max-w-xl text-body text-muted">
        There is nothing at this address. It may have moved, or the link may be mistyped.
      </p>
      <Link href="/" className="mt-8 inline-block text-ui">
        ← Back home
      </Link>
    </Container>
  );
}
