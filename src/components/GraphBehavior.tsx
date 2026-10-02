"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface Tip {
  x: number;
  y: number;
  heading: string;
  body: string;
}

const NODE = "[data-tip-heading]";

/**
 * The only client code in the git graph. The graph itself is server-rendered;
 * this wrapper adds tooltips (by event delegation on data-tip-* attributes)
 * and the one-time draw animation (on [data-draw] / [data-fade] elements), so
 * hydration cost is one small component rather than ~100 SVG nodes.
 */
export function GraphBehavior({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState<Tip | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const paths = wrapper.querySelectorAll<SVGPathElement>("[data-draw]");
    const fades = wrapper.querySelectorAll<SVGElement>("[data-fade]");

    // Hide now (well before the graph scrolls into view), reveal on intersect.
    paths.forEach((path) => {
      try {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
      } catch {
        // Not rendered (the desktop SVG is display:none on mobile): nothing to draw.
      }
    });
    fades.forEach((el) => {
      el.style.opacity = "0";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        paths.forEach((path) => {
          path.style.transition = "stroke-dashoffset 1.8s ease-out";
          path.style.strokeDashoffset = "0";
        });
        fades.forEach((el) => {
          el.style.transition = "opacity 1.8s ease-out";
          el.style.opacity = "1";
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(wrapper);

    return () => {
      observer.disconnect();
      paths.forEach((path) => {
        path.style.strokeDasharray = "";
        path.style.strokeDashoffset = "";
        path.style.transition = "";
      });
      fades.forEach((el) => {
        el.style.opacity = "";
        el.style.transition = "";
      });
    };
  }, []);

  function show(target: EventTarget | null) {
    const wrapper = wrapperRef.current;
    const node = target instanceof Element ? target.closest(NODE) : null;
    if (!wrapper || !node) return;
    const box = node.getBoundingClientRect();
    const frame = wrapper.getBoundingClientRect();
    setTip({
      x: box.left - frame.left + box.width / 2,
      y: box.top - frame.top,
      heading: node.getAttribute("data-tip-heading") ?? "",
      body: node.getAttribute("data-tip-body") ?? "",
    });
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseOver={(e) => show(e.target)}
      onMouseOut={(e) => {
        const next = e.relatedTarget instanceof Element ? e.relatedTarget.closest(NODE) : null;
        if (!next) setTip(null);
      }}
      onFocus={(e) => show(e.target)}
      onBlur={() => setTip(null)}
      onClick={(e) => show(e.target)}
      onKeyDown={(e) => {
        if (e.key === "Escape") setTip(null);
      }}
    >
      {children}
      {tip ? (
        <div
          role="tooltip"
          className="pointer-events-none absolute z-20 w-56 -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-lg border border-border bg-surface p-3 text-base shadow-sm"
          style={{ left: tip.x, top: tip.y }}
        >
          <p className="font-mono text-xs uppercase tracking-wide text-subtle">{tip.heading}</p>
          <p className="mt-1 text-ink">{tip.body}</p>
        </div>
      ) : null}
    </div>
  );
}
