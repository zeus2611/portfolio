"use client";

import { useRef, useState } from "react";

/** Copies the text of the <pre> that sits beside it inside the same wrapper. */
export function CopyButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const code = buttonRef.current?.parentElement?.querySelector("pre")?.textContent;
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked (insecure context or denied permission) — the code stays selectable.
    }
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={copy}
      aria-label="Copy code"
      className="absolute top-2 right-2 rounded border border-border bg-surface px-2 py-1 font-mono text-[11px] text-muted opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 focus:opacity-100 [@media(hover:none)]:opacity-100"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
