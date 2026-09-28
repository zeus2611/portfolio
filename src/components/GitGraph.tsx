"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  bridgetalkBranch,
  mainCommits,
  mainSpans,
  mtechBranch,
  openSourceBranch,
} from "@/content/timeline";

const VIEW_W = 1280;
const VIEW_H = 440;
const INNER_LEFT = 120;
const INNER_RIGHT = 1160;
const MAIN_Y = 100;
const LANE_Y = { bridgetalk: 200, "open-source": 290, mtech: 370 } as const;
const DOMAIN_START = 2022.3;

function toDecimalYear(date: string): number {
  const [y, m] = date.split("-").map(Number);
  return y + (m - 1) / 12;
}

function nowDecimalYear(): number {
  const now = new Date();
  return now.getFullYear() + now.getMonth() / 12;
}

const headCommit = mainCommits.find((c) => c.head) ?? mainCommits[mainCommits.length - 1];
const DOMAIN_END = Math.max(nowDecimalYear(), toDecimalYear(headCommit.date)) + 0.15;

function xScale(date: string): number {
  const year = toDecimalYear(date);
  const t = (year - DOMAIN_START) / (DOMAIN_END - DOMAIN_START);
  return INNER_LEFT + t * (INNER_RIGHT - INNER_LEFT);
}

function closedBranchPath(x0: number, x1: number, laneY: number): string {
  return `M ${x0} ${MAIN_Y} C ${x0 + 16} ${MAIN_Y} ${x0 + 8} ${laneY} ${x0 + 24} ${laneY} H ${x1 - 24} C ${x1 - 8} ${laneY} ${x1 - 16} ${MAIN_Y} ${x1} ${MAIN_Y}`;
}

function openBranchPath(x0: number, endX: number, laneY: number): string {
  return `M ${x0} ${MAIN_Y} C ${x0 + 16} ${MAIN_Y} ${x0 + 8} ${laneY} ${x0 + 24} ${laneY} H ${endX}`;
}

const YEARS = (() => {
  const years: number[] = [];
  for (let y = Math.ceil(DOMAIN_START); y <= Math.floor(DOMAIN_END); y++) years.push(y);
  return years;
})();

type TooltipState = { x: number; y: number; heading: string; body: string } | null;

/** A focusable, hoverable graph node with a tooltip — a circle, or an <a> when `href` is given. */
function Node({
  cx,
  cy,
  r,
  fill,
  stroke,
  strokeWidth,
  label,
  heading,
  body,
  href,
  onActivate,
  onDeactivate,
}: {
  cx: number;
  cy: number;
  r: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  label: string;
  heading: string;
  body: string;
  href?: string;
  onActivate: (e: React.SyntheticEvent, heading: string, body: string) => void;
  onDeactivate: () => void;
}) {
  const shared = {
    onMouseEnter: (e: React.MouseEvent) => onActivate(e, heading, body),
    onMouseLeave: onDeactivate,
    onFocus: (e: React.FocusEvent) => onActivate(e, heading, body),
    onBlur: onDeactivate,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Escape") onDeactivate();
    },
  };

  const visual = (
    <>
      <circle cx={cx} cy={cy} r={r + 6} fill="transparent" />
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} {...shared}>
        {visual}
      </a>
    );
  }

  return (
    <g tabIndex={0} role="button" aria-label={label} {...shared}>
      {visual}
    </g>
  );
}

function useDrawOnView<T extends SVGElement>() {
  const containerRef = useRef<SVGSVGElement>(null);
  const pathRefs = useRef<(T | null)[]>([]);
  const nextIndexRef = useRef(0);
  // Lazy init (not an effect) so the reduced-motion case never needs a
  // synchronous setState-in-effect just to flip a flag that was already
  // knowable at mount.
  const [drawn, setDrawn] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  // Stable identity so React only invokes this at mount/unmount (commit
  // time), never mid-render — indices are assigned once, in JSX order.
  const registerPath = useCallback((el: T | null) => {
    if (!el) return;
    pathRefs.current[nextIndexRef.current] = el;
    nextIndexRef.current += 1;
  }, []);

  useEffect(() => {
    if (drawn) return;
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [drawn]);

  useEffect(() => {
    if (!drawn) return;
    pathRefs.current.forEach((path) => {
      if (!path || !("getTotalLength" in path)) return;
      const length = (path as unknown as SVGPathElement).getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
      path.style.transition = "none";
      // Force a layout flush so the browser registers the starting offset
      // before the transition below animates it back to 0.
      path.getBoundingClientRect();
      path.style.transition = "stroke-dashoffset 1.8s ease-out";
      path.style.strokeDashoffset = "0";
    });
  }, [drawn]);

  return { containerRef, registerPath, drawn };
}

export function GitGraph() {
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { containerRef, registerPath, drawn } = useDrawOnView<SVGPathElement>();

  function activate(e: React.SyntheticEvent, heading: string, body: string) {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const targetRect = (e.currentTarget as Element).getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    setTooltip({
      x: targetRect.left - wrapperRect.left + targetRect.width / 2,
      y: targetRect.top - wrapperRect.top,
      heading,
      body,
    });
  }
  function deactivate() {
    setTooltip(null);
  }

  const headX = xScale(headCommit.date);
  // Open branches (still active) run past the reading column into the right
  // bleed, suggesting they continue beyond "now" rather than stopping dead.
  const openEndX = INNER_RIGHT + 40;

  return (
    <div ref={wrapperRef} className="relative">
      {/* Desktop / horizontal */}
      <svg
        ref={containerRef}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        role="img"
        aria-label={buildAriaLabel()}
        className="hidden w-full md:block"
      >
        {/* Year rules */}
        {YEARS.map((year) => {
          const x = xScale(`${year}-01`);
          return (
            <g key={year}>
              <line x1={x} y1={80} x2={x} y2={400} stroke="var(--border)" strokeWidth={1} />
              <text x={x} y={416} textAnchor="middle" className="graph-year">
                {year}
              </text>
            </g>
          );
        })}

        {/* Span brackets above main */}
        {mainSpans.map((span) => {
          const x0 = xScale(span.from);
          const x1 = span.to === "now" ? headX : xScale(span.to);
          const anchor = span.to === "now" ? "end" : "start";
          const labelX = span.to === "now" ? x1 : x0;
          return (
            <g key={span.label}>
              <line x1={x0} y1={64} x2={x1} y2={64} stroke="var(--border)" strokeWidth={1} />
              <line x1={x0} y1={64} x2={x0} y2={72} stroke="var(--border)" strokeWidth={1} />
              <line x1={x1} y1={64} x2={x1} y2={72} stroke="var(--border)" strokeWidth={1} />
              <text x={labelX} y={58} textAnchor={anchor} className="graph-eyebrow">
                {span.label}
              </text>
            </g>
          );
        })}

        {/* Main line */}
        <path
          ref={registerPath}
          d={`M ${xScale(mainCommits[0].date)} ${MAIN_Y} H ${headX}`}
          stroke="var(--ink)"
          strokeWidth={2.5}
          fill="none"
        />

        {/* bridgetalk branch (closed) */}
        <path
          ref={registerPath}
          d={closedBranchPath(xScale(bridgetalkBranch.from), xScale(bridgetalkBranch.to), LANE_Y.bridgetalk)}
          stroke="var(--ink)"
          strokeOpacity={0.8}
          strokeWidth={2}
          fill="none"
        />

        {/* open-source branch (open) */}
        <path
          ref={registerPath}
          d={openBranchPath(xScale(openSourceBranch.from), openEndX - 8, LANE_Y["open-source"])}
          stroke="var(--accent)"
          strokeWidth={2}
          fill="none"
        />
        <polygon
          points={`${openEndX - 8},${LANE_Y["open-source"] - 5} ${openEndX},${LANE_Y["open-source"]} ${openEndX - 8},${LANE_Y["open-source"] + 5}`}
          fill="var(--accent)"
        />

        {/* mtech branch (open, dashed) — kept out of the draw-reveal path
            registry below since that trick overwrites strokeDasharray, which
            would erase this branch's decorative dash pattern. Faded in via
            opacity instead, still gated on the same `drawn` state. */}
        <path
          d={openBranchPath(xScale(mtechBranch.from), openEndX - 8, LANE_Y.mtech)}
          stroke="var(--subtle)"
          strokeWidth={2}
          strokeDasharray="6 5"
          fill="none"
          style={{ opacity: drawn ? 1 : 0, transition: "opacity 1.8s ease-out" }}
        />
        <polygon
          points={`${openEndX - 8},${LANE_Y.mtech - 5} ${openEndX},${LANE_Y.mtech} ${openEndX - 8},${LANE_Y.mtech + 5}`}
          fill="var(--subtle)"
          style={{ opacity: drawn ? 1 : 0, transition: "opacity 1.8s ease-out" }}
        />

        {/* Branch labels */}
        <text
          x={xScale(bridgetalkBranch.from)}
          y={LANE_Y.bridgetalk + 22}
          className="graph-eyebrow"
        >
          bridgetalk
        </text>
        <text
          x={xScale(bridgetalkBranch.from)}
          y={LANE_Y.bridgetalk + 38}
          className="graph-role"
        >
          founding engineer · 2 apps shipped
        </text>

        <text
          x={xScale(openSourceBranch.from)}
          y={LANE_Y["open-source"] + 22}
          className="graph-eyebrow"
          fill="var(--accent)"
        >
          open-source
        </text>
        <text
          x={xScale("2024-10")}
          y={LANE_Y["open-source"] - 12}
          textAnchor="middle"
          className="graph-role"
        >
          {openSourceBranch.earlyClusterLabel}
        </text>
        <text
          x={xScale("2026-05")}
          y={LANE_Y["open-source"] - 12}
          textAnchor="middle"
          className="graph-role"
        >
          {openSourceBranch.lateClusterLabel}
        </text>

        <text x={xScale(mtechBranch.from)} y={LANE_Y.mtech + 22} className="graph-eyebrow" fill="var(--subtle)">
          m.tech · nit rourkela
        </text>

        {/* Main commits */}
        {mainCommits.map((commit) => {
          const x = xScale(commit.date);
          if (commit.head) {
            return (
              <g key={commit.date}>
                <Node
                  cx={x}
                  cy={MAIN_Y}
                  r={9}
                  fill="var(--accent)"
                  label={`HEAD — ${commit.label}, ${commit.date}: ${commit.tooltip}`}
                  heading={`HEAD · ${commit.date}`}
                  body={commit.tooltip}
                  onActivate={activate}
                  onDeactivate={deactivate}
                />
                <text x={x + 14} y={MAIN_Y + 4} className="graph-eyebrow" fill="var(--accent)">
                  HEAD
                </text>
              </g>
            );
          }
          const isSupista = commit.date.startsWith("2022");
          const role = commit.label.split(" · ").slice(1).join(" · ");
          return (
            <g key={commit.date}>
              <Node
                cx={x}
                cy={MAIN_Y}
                r={7}
                fill="var(--bg)"
                stroke="var(--ink)"
                strokeWidth={2}
                label={`${commit.label}, ${commit.date}: ${commit.tooltip}`}
                heading={`${commit.label} · ${commit.date}`}
                body={commit.tooltip}
                onActivate={activate}
                onDeactivate={deactivate}
              />
              {isSupista ? (
                <>
                  <text x={x} y={130} textAnchor="middle" className="graph-eyebrow">
                    supista
                  </text>
                  <text x={x} y={146} textAnchor="middle" className="graph-role">
                    swe intern · 2022
                  </text>
                </>
              ) : (
                <text x={x} y={130} textAnchor="middle" className="graph-role">
                  {role}
                </text>
              )}
            </g>
          );
        })}

        {/* Open-source PR dots */}
        {openSourceBranch.prs.map((pr) => (
          <Node
            key={pr.href}
            cx={xScale(pr.date)}
            cy={LANE_Y["open-source"]}
            r={5}
            fill="var(--accent)"
            label={`${pr.repo} ${pr.pr} — ${pr.title}, ${pr.date}`}
            heading={`${pr.repo} ${pr.pr} · ${pr.date}`}
            body={pr.title}
            href={pr.href}
            onActivate={activate}
            onDeactivate={deactivate}
          />
        ))}

        {/* bridgetalk + mtech branch nodes (single representative dot each) */}
        <Node
          cx={xScale(bridgetalkBranch.from)}
          cy={LANE_Y.bridgetalk}
          r={6}
          fill="var(--surface)"
          stroke="var(--ink)"
          strokeWidth={2}
          label={`bridgetalk, ${bridgetalkBranch.from} to ${bridgetalkBranch.to}: ${bridgetalkBranch.tooltip}`}
          heading={`bridgetalk · ${bridgetalkBranch.from} – ${bridgetalkBranch.to}`}
          body={bridgetalkBranch.tooltip}
          onActivate={activate}
          onDeactivate={deactivate}
        />
        <Node
          cx={xScale(mtechBranch.from)}
          cy={LANE_Y.mtech}
          r={6}
          fill="var(--surface)"
          stroke="var(--subtle)"
          strokeWidth={2}
          label={`m.tech, since ${mtechBranch.from}: ${mtechBranch.tooltip}`}
          heading={`m.tech · nit rourkela`}
          body={mtechBranch.tooltip}
          onActivate={activate}
          onDeactivate={deactivate}
        />
      </svg>

      {/* Mobile / vertical */}
      <MobileGraph onActivate={activate} onDeactivate={deactivate} />

      {tooltip ? (
        <div
          role="tooltip"
          className="pointer-events-none absolute z-20 w-56 -translate-x-1/2 -translate-y-[calc(100%+10px)] rounded-lg border border-border bg-surface p-3 text-base shadow-sm"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <p className="font-mono text-xs uppercase tracking-wide text-subtle">
            {tooltip.heading}
          </p>
          <p className="mt-1 text-ink">{tooltip.body}</p>
        </div>
      ) : null}

      <AccessibleList />
    </div>
  );
}

/** Collapsed vertical layout for < 768px: newest first, HEAD at the top. */
function MobileGraph({
  onActivate,
  onDeactivate,
}: {
  onActivate: (e: React.SyntheticEvent, heading: string, body: string) => void;
  onDeactivate: () => void;
}) {
  const rows = [
    { key: "head", kind: "main" as const, commit: headCommit },
    ...[...mainCommits].filter((c) => !c.head).reverse().map((commit) => ({
      key: commit.date,
      kind: "main" as const,
      commit,
    })),
    {
      key: "bridgetalk",
      kind: "branch" as const,
      label: "bridgetalk",
      sub: `${bridgetalkBranch.from} – ${bridgetalkBranch.to}`,
      tooltip: bridgetalkBranch.tooltip,
    },
    {
      key: "open-source",
      kind: "branch" as const,
      label: "open-source",
      sub: `${openSourceBranch.prs.length} merged`,
      tooltip: `Open since ${openSourceBranch.from}, still active.`,
    },
    {
      key: "mtech",
      kind: "branch" as const,
      label: "m.tech · nit rourkela",
      sub: `since ${mtechBranch.from}`,
      tooltip: mtechBranch.tooltip,
    },
  ];

  return (
    <ol className="flex flex-col gap-0 md:hidden" aria-hidden="false">
      {rows.map((row, i) => (
        <li key={row.key} className="relative flex gap-4 pb-6 pl-2">
          <div className="relative flex w-4 flex-col items-center">
            <span
              className={
                "kind" in row && row.kind === "main" && (row as { commit: (typeof mainCommits)[number] }).commit.head
                  ? "z-10 h-3 w-3 rounded-full bg-accent"
                  : "z-10 h-2.5 w-2.5 rounded-full border-2 border-ink bg-bg"
              }
            />
            {i < rows.length - 1 ? <span className="mt-1 w-px flex-1 bg-border" /> : null}
          </div>
          <div className="pt-[-2px]">
            {row.kind === "main" ? (
              <button
                type="button"
                className="text-left"
                onFocus={(e) => onActivate(e, `${row.commit.label} · ${row.commit.date}`, row.commit.tooltip)}
                onBlur={onDeactivate}
                onClick={(e) =>
                  onActivate(e, `${row.commit.label} · ${row.commit.date}`, row.commit.tooltip)
                }
              >
                <p className="font-mono text-sm text-subtle">{row.commit.date}</p>
                <p className="text-base text-ink">
                  {row.commit.head ? "HEAD · " : ""}
                  {row.commit.label}
                </p>
              </button>
            ) : (
              <button
                type="button"
                className="text-left"
                onFocus={(e) => onActivate(e, row.label, row.tooltip)}
                onBlur={onDeactivate}
                onClick={(e) => onActivate(e, row.label, row.tooltip)}
              >
                <p className="font-mono text-sm text-accent">{row.label}</p>
                <p className="text-base text-muted">{row.sub}</p>
              </button>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function buildAriaLabel(): string {
  const mainPart = mainCommits
    .map((c) => `${c.head ? "HEAD: " : ""}${c.label} (${c.date})`)
    .join("; ");
  return (
    `Career timeline drawn as a git graph, from 2022 to now. ` +
    `Main line: ${mainPart}. ` +
    `Branch: ${bridgetalkBranch.label}, ${bridgetalkBranch.from} to ${bridgetalkBranch.to}. ` +
    `Branch: open-source, active since ${openSourceBranch.from}, ${openSourceBranch.prs.length} merged pull requests. ` +
    `Branch: ${mtechBranch.label}, active since ${mtechBranch.from}. ` +
    `A full list of every entry follows this graphic.`
  );
}

/** Screen-reader-only list mirroring every node in the graph, in date order. */
function AccessibleList() {
  const entries: { date: string; text: string }[] = [
    ...mainCommits.map((c) => ({
      date: c.date,
      text: `${c.head ? "HEAD — " : ""}${c.label} (${c.date}): ${c.tooltip}`,
    })),
    {
      date: bridgetalkBranch.from,
      text: `Branch bridgetalk (${bridgetalkBranch.from} – ${bridgetalkBranch.to}): ${bridgetalkBranch.tooltip}`,
    },
    {
      date: openSourceBranch.from,
      text: `Branch open-source, active since ${openSourceBranch.from}.`,
    },
    ...openSourceBranch.prs.map((pr) => ({
      date: pr.date,
      text: `${pr.repo} ${pr.pr} (${pr.date}): ${pr.title}`,
    })),
    {
      date: mtechBranch.from,
      text: `Branch ${mtechBranch.label}, active since ${mtechBranch.from}: ${mtechBranch.tooltip}`,
    },
  ].sort((a, b) => (a.date < b.date ? -1 : 1));

  return (
    <ol className="sr-only">
      {entries.map((entry) => (
        <li key={entry.text}>{entry.text}</li>
      ))}
    </ol>
  );
}
