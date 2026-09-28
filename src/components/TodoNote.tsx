/**
 * A dev-only marker for a fact CONTENT.md doesn't have yet. Renders nothing
 * in production — per CLAUDE.md, a TODO is never shown to real visitors.
 */
export function TodoNote({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <span className="ml-2 rounded border border-dashed border-accent px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent">
      TODO: {children}
    </span>
  );
}
