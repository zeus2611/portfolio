import type { ReactNode } from "react";

const WIDTHS = {
  reading: "max-w-[680px]",
  wide: "max-w-[1040px]",
} as const;

export function Container({
  size = "wide",
  className = "",
  children,
}: {
  size?: keyof typeof WIDTHS;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`mx-auto w-full px-6 md:px-8 ${WIDTHS[size]} ${className}`}>{children}</div>
  );
}
