import type { ReactNode } from "react";

/** The one page width. The header, nav and every section align to it. */
export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={`mx-auto w-full max-w-300 px-6 md:px-8 ${className}`}>{children}</div>;
}
