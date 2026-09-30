import {
  bridgetalkBranch,
  mainCommits,
  mainSpans,
  mtechBranch,
  openSourceBranch,
} from "@/content/timeline";
import { GraphBehavior } from "./GraphBehavior";

const VIEW_W = 1280;
const VIEW_H = 440;
const INNER_LEFT = 120;
const INNER_RIGHT = 1160;
const MAIN_Y = 100;
const LANE_Y = { bridgetalk: 200, "open-source": 290, mtech: 370 } as const;
const DOMAIN_START = 2022.3;
/** x-distance a branch curve takes to go from MAIN_Y to its laneY — matches
 * the "x0+24 laneY" control point in closedBranchPath/openBranchPath below.
 * Anything drawn ON a lane (a dot, say) needs cx >= x0 + this, or it'll sit
 * off the curve, which is still transitioning at x0. */
const BRANCH_CURVE_RUN = 24;

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
  const r = BRANCH_CURVE_RUN;
  return `M ${x0} ${MAIN_Y} C ${x0 + 16} ${MAIN_Y} ${x0 + 8} ${laneY} ${x0 + r} ${laneY} H ${x1 - r} C ${x1 - 8} ${laneY} ${x1 - 16} ${MAIN_Y} ${x1} ${MAIN_Y}`;
}

function openBranchPath(x0: number, endX: number, laneY: number): string {
  const r = BRANCH_CURVE_RUN;
  return `M ${x0} ${MAIN_Y} C ${x0 + 16} ${MAIN_Y} ${x0 + 8} ${laneY} ${x0 + r} ${laneY} H ${endX}`;
}

const YEARS = (() => {
  const years: number[] = [];
  for (let y = Math.ceil(DOMAIN_START); y <= Math.floor(DOMAIN_END); y++) years.push(y);
  return years;
})();

/**
 * A focusable graph node. Tooltip behaviour lives in GraphBehavior, which
 * reads the data-tip-* attributes by event delegation, so this stays a
 * plain server-rendered element with nothing to hydrate.
 */
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
}) {
  const tip = { "data-tip-heading": heading, "data-tip-body": body };
  const visual = (
    <>
      <circle cx={cx} cy={cy} r={r + 6} fill="transparent" />
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} {...tip}>
        {visual}
      </a>
    );
  }

  return (
    <g tabIndex={0} role="button" aria-label={label} {...tip}>
      {visual}
    </g>
  );
}

export function GitGraph() {
  const headX = xScale(headCommit.date);
  // Open branches (still active) run past the reading column into the right
  // bleed, suggesting they continue beyond "now" rather than stopping dead.
  const openEndX = INNER_RIGHT + 40;

  return (
    <GraphBehavior>
      {/* Desktop / horizontal */}
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        // "group", not "img": img makes its children presentational, but the
        // nodes inside are focusable (invalid ARIA; axe: nested-interactive).
        role="group"
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
          data-draw
          d={`M ${xScale(mainCommits[0].date)} ${MAIN_Y} H ${headX}`}
          stroke="var(--ink)"
          strokeWidth={2.5}
          fill="none"
        />

        {/* bridgetalk branch (closed) */}
        <path
          data-draw
          d={closedBranchPath(xScale(bridgetalkBranch.from), xScale(bridgetalkBranch.to), LANE_Y.bridgetalk)}
          stroke="var(--ink)"
          strokeOpacity={0.8}
          strokeWidth={2}
          fill="none"
        />

        {/* open-source branch (open) */}
        <path
          data-draw
          d={openBranchPath(xScale(openSourceBranch.from), openEndX - 8, LANE_Y["open-source"])}
          stroke="var(--accent)"
          strokeWidth={2}
          fill="none"
        />
        <polygon
          points={`${openEndX - 8},${LANE_Y["open-source"] - 5} ${openEndX},${LANE_Y["open-source"]} ${openEndX - 8},${LANE_Y["open-source"] + 5}`}
          fill="var(--accent)"
        />

        {/* mtech branch (open, dashed) — faded in (data-fade) rather than dash-drawn,
            since the dash-reveal trick would overwrite this branch's own "6 5" pattern. */}
        <path
          d={openBranchPath(xScale(mtechBranch.from), openEndX - 8, LANE_Y.mtech)}
          stroke="var(--subtle)"
          strokeWidth={2}
          strokeDasharray="6 5"
          fill="none"
          data-fade
        />
        <polygon
          points={`${openEndX - 8},${LANE_Y.mtech - 5} ${openEndX},${LANE_Y.mtech} ${openEndX - 8},${LANE_Y.mtech + 5}`}
          fill="var(--subtle)"
          data-fade
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

        {/* Open-source PR dots — clamped past the branch curve's run since
            the first PR (2023-01) lands the same month as the branch itself,
            which without this would sit at x0, still on the curve's rise
            toward MAIN_Y rather than on the flat laneY line. */}
        {openSourceBranch.prs.map((pr) => (
          <Node
            key={pr.href}
            cx={Math.max(xScale(pr.date), xScale(openSourceBranch.from) + BRANCH_CURVE_RUN)}
            cy={LANE_Y["open-source"]}
            r={5}
            fill="var(--accent)"
            label={`${pr.repo} ${pr.pr} — ${pr.title}, ${pr.date}`}
            heading={`${pr.repo} ${pr.pr} · ${pr.date}`}
            body={pr.title}
            href={pr.href}
          />
        ))}

        {/* bridgetalk + mtech branch nodes (single representative dot each) —
            cx is shifted past the curve's run so the dot sits where the line
            actually is (flat at laneY), not at x0 where it's still at MAIN_Y. */}
        <Node
          cx={xScale(bridgetalkBranch.from) + BRANCH_CURVE_RUN}
          cy={LANE_Y.bridgetalk}
          r={6}
          fill="var(--surface)"
          stroke="var(--ink)"
          strokeWidth={2}
          label={`bridgetalk, ${bridgetalkBranch.from} to ${bridgetalkBranch.to}: ${bridgetalkBranch.tooltip}`}
          heading={`bridgetalk · ${bridgetalkBranch.from} – ${bridgetalkBranch.to}`}
          body={bridgetalkBranch.tooltip}
        />
        <Node
          cx={xScale(mtechBranch.from) + BRANCH_CURVE_RUN}
          cy={LANE_Y.mtech}
          r={6}
          fill="var(--surface)"
          stroke="var(--subtle)"
          strokeWidth={2}
          label={`m.tech, since ${mtechBranch.from}: ${mtechBranch.tooltip}`}
          heading={`m.tech · nit rourkela`}
          body={mtechBranch.tooltip}
        />
      </svg>

      {/* Mobile / vertical */}
      <MobileGraph />

      <AccessibleList />
    </GraphBehavior>
  );
}

/** Collapsed vertical layout for < 768px: newest first, HEAD at the top. */
function MobileGraph() {
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
                data-tip-heading={`${row.commit.label} · ${row.commit.date}`}
                data-tip-body={row.commit.tooltip}
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
                data-tip-heading={row.label}
                data-tip-body={row.tooltip}
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
