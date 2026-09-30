import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { STATIC_FRAME_T, wavePolylines } from "@/lib/wave";

const W = 1200;
const H = 630;
const GRID = 44;
const GRID_FADE_END = H * 0.55;

// Satori can't read CSS variables, so the light-theme tokens from DESIGN.md are
// repeated here (OG images are light-theme only).
const BG = "#f4f1ea";
const INK = "#1b1d22";
const GRID_LINE = "#e6e1d6";
const ACCENT = "#1f6f6a";

async function font(pkg: string, file: string): Promise<ArrayBuffer> {
  const data = await readFile(path.join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));
  return Uint8Array.from(data).buffer;
}

/** One 1200x630 card: paper grid, a static wave frame along the bottom third, title and domain. */
export async function renderOgImage(title: string): Promise<ImageResponse> {
  const [fraunces, mono] = await Promise.all([
    font("fraunces", "fraunces-latin-600-normal.woff"),
    font("jetbrains-mono", "jetbrains-mono-latin-400-normal.woff"),
  ]);

  const waveD = wavePolylines(STATIC_FRAME_T, W, H)
    .map((line) => line.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" "))
    .join(" ");

  const verticals = Array.from({ length: Math.floor(W / GRID) + 1 }, (_, i) => i * GRID);
  const horizontals = Array.from({ length: Math.floor(GRID_FADE_END / GRID) + 1 }, (_, i) => i * GRID);

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          display: "flex",
          position: "relative",
          background: BG,
          color: INK,
        }}
      >
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <linearGradient id="gridFade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={GRID_FADE_END}>
              <stop offset="0" stopColor={GRID_LINE} stopOpacity="1" />
              <stop offset="1" stopColor={GRID_LINE} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="waveFade" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2={H}>
              <stop offset="0.45" stopColor={ACCENT} stopOpacity="0" />
              <stop offset="0.75" stopColor={ACCENT} stopOpacity="0.4" />
              <stop offset="0.92" stopColor={ACCENT} stopOpacity="0.4" />
              <stop offset="1" stopColor={ACCENT} stopOpacity="0" />
            </linearGradient>
          </defs>
          {verticals.map((x) => (
            <line key={`v${x}`} x1={x} y1={0} x2={x} y2={GRID_FADE_END} stroke="url(#gridFade)" strokeWidth={1} />
          ))}
          {horizontals.map((y) => (
            <line
              key={`h${y}`}
              x1={0}
              y1={y}
              x2={W}
              y2={y}
              stroke={GRID_LINE}
              strokeWidth={1}
              strokeOpacity={1 - y / GRID_FADE_END}
            />
          ))}
          <path d={waveD} stroke="url(#waveFade)" strokeWidth={1.5} fill="none" />
        </svg>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "72px 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              maxWidth: 980,
              fontFamily: "Fraunces",
              fontWeight: 600,
              fontSize: 64,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              textWrap: "balance",
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 28, color: ACCENT }}>
            nischay.live
          </div>
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
