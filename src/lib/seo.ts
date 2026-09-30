import type { Metadata } from "next";
import { education } from "@/content/education";
import { hero, identity } from "@/content/profile";
import { isTodo } from "@/content/todo";

export const SITE_NAME = identity.name;

interface PageMetadataInput {
  /** Bare page title; the root layout's template appends the site name. */
  title: string;
  description: string;
  /** Path beginning with "/", resolved against metadataBase for the canonical URL. */
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
  /** Overrides the "<title> — Nischay" used for social cards. */
  socialTitle?: string;
}

/**
 * Metadata replaces (not merges) per top-level key, so a page that sets
 * openGraph or alternates has to restate them. This keeps that in one place.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  noindex = false,
  socialTitle,
}: PageMetadataInput): Metadata {
  const fullTitle = socialTitle ?? `${title} — ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type, siteName: SITE_NAME, title: fullTitle, description, url: path },
    twitter: { card: "summary_large_image", title: fullTitle, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

export const siteDescription = `${hero.line} ${hero.accentPhrase}`;

/** schema.org Person for Home, built from the same content the page renders. */
export function personJsonLd(): Record<string, unknown> {
  const finished = education.filter((row) => !isTodo(row.endYear));
  const ongoing = education.filter((row) => isTodo(row.endYear));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.name,
    url: identity.domain,
    email: identity.email,
    description: siteDescription,
    jobTitle: "Intern (co-op)",
    worksFor: { "@type": "Organization", name: "AMD" },
    address: { "@type": "PostalAddress", addressLocality: "Hyderabad", addressCountry: "IN" },
    sameAs: [identity.github, identity.linkedin],
    alumniOf: finished.map((row) => ({ "@type": "CollegeOrUniversity", name: row.org })),
    affiliation: ongoing.map((row) => ({ "@type": "CollegeOrUniversity", name: row.org })),
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "Google Cloud Professional Cloud Architect",
    },
  };
}
