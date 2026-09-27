import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SkipLink } from "@/components/SkipLink";
import "./globals.css";
import { fraunces, geist, jetbrainsMono } from "./fonts";

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
  title: "Nischay",
  description: "Software engineer working on AI products and developer tools.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs before paint to set data-theme and avoid a flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${fraunces.variable} ${geist.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
