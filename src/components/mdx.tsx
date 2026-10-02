import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import { CopyButton } from "./CopyButton";

// Inline `code` is styled in globals.css (.post-body :not(pre) > code) rather
// than here, because Shiki emits its own <code> inside <pre> and a `code`
// component override would hit both.
function Pre({ className = "", ...props }: ComponentProps<"pre">) {
  return (
    <div className="group relative my-6">
      {/* tabIndex so keyboard users can scroll long lines */}
      <pre
        {...props}
        tabIndex={0}
        className={`${className} overflow-x-auto rounded-lg border border-border p-4 font-mono text-[14px] leading-relaxed`}
      />
      <CopyButton />
    </div>
  );
}

function ExternalAware({ href = "", children, ...props }: ComponentProps<"a">) {
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {external ? " ↗" : null}
    </a>
  );
}

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-12 mb-4 font-display text-h2 font-semibold text-ink" {...props} />
  ),
  h3: (props) => <h3 className="mt-8 mb-3 text-h3 font-medium text-ink" {...props} />,
  p: (props) => <p className="my-5 text-body leading-relaxed text-ink" {...props} />,
  ul: (props) => (
    <ul className="my-5 list-disc space-y-2 pl-6 text-body text-ink marker:text-muted" {...props} />
  ),
  ol: (props) => (
    <ol
      className="my-5 list-decimal space-y-2 pl-6 text-body text-ink marker:text-muted"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-2 border-accent pl-5 text-body text-muted italic"
      {...props}
    />
  ),
  hr: (props) => <hr className="my-10 border-border" {...props} />,
  a: ExternalAware,
  pre: Pre,
};
