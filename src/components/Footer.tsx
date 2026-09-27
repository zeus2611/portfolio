import { identity } from "@/content/identity";
import { Container } from "./Container";

const REPO_URL = "https://github.com/zeus2611/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-10">
      <Container size="wide">
        <div className="flex flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-4">
            <a href={`mailto:${identity.email}`}>{identity.email}</a>
            <a href={identity.github}>GitHub</a>
            <a href={identity.linkedin}>LinkedIn</a>
          </div>
          <p>
            © {year} {identity.name}. Built with Next.js, hosted on Vercel.{" "}
            <a href={REPO_URL}>Source on GitHub.</a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
