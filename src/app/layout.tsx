import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SkipLink } from "@/components/SkipLink";
import { identity } from "@/content/profile";
import { SITE_NAME, siteDescription } from "@/lib/seo";
import "./globals.css";
import { fraunces, frauncesItalic, geist, jetbrainsMono } from "./fonts";

const themeInitScript = `(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();`;

export const metadata: Metadata = {
  metadataBase: new URL(identity.domain),
  title: { default: `${SITE_NAME} — Software engineer`, template: `%s — ${SITE_NAME}` },
  description: siteDescription,
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs before paint to set data-theme and avoid a flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${fraunces.variable} ${frauncesItalic.variable} ${geist.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
