import type { Metadata } from "next";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { OpenSource } from "@/components/OpenSource";
import { SelectedWork } from "@/components/SelectedWork";
import { Writing } from "@/components/Writing";
import { pageMetadata, personJsonLd, SITE_NAME, siteDescription } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: SITE_NAME,
    description: siteDescription,
    path: "/",
    socialTitle: `${SITE_NAME} — Software engineer`,
  }),
  title: { absolute: `${SITE_NAME} — Software engineer` },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={personJsonLd()} />
      <Hero />
      <Experience />
      <SelectedWork />
      <OpenSource />
      <Writing />
    </>
  );
}
