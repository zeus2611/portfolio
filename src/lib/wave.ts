/**
 * The wave's maths, shared by the animated hero canvas and the static frame in
 * the OG images. Formulas are fixed by DESIGN.md → "Signature 1: the wave hero".
 */

export const STATIC_FRAME_T = 2.2;

const X_MIN = -11;
const X_MAX = 11;
const D_MIN = -7;
const D_MAX = 4.5;
const CAM_HEIGHT = 3;
const CAM_DIST = 9;
const FOV_DEG = 55;
const CAMERA_PITCH = Math.atan2(CAM_HEIGHT, CAM_DIST);
const HALF_FOV = (FOV_DEG / 2) * (Math.PI / 180);

export function heightField(x: number, d: number, t: number): number {
  return (
    0.45 * Math.sin(0.4 * x + 0.9 * t) +
    0.3 * Math.sin(0.5 * d + 0.65 * t) +
    0.2 * Math.sin(0.28 * (x + d) + 0.5 * t)
  );
}

function linspace(min: number, max: number, steps: number): number[] {
  const points: number[] = [];
  for (let i = 0; i <= steps; i++) {
    points.push(min + ((max - min) * i) / steps);
  }
  return points;
}

/** Grid sample positions: 45 x 23 points on desktop, half the density on mobile. */
export function waveGrid(mobile: boolean): { xs: number[]; ds: number[] } {
  return {
    xs: linspace(X_MIN, X_MAX, mobile ? 22 : 44),
    ds: linspace(D_MIN, D_MAX, mobile ? 11 : 22),
  };
}

export function project(
  x: number,
  d: number,
  z: number,
  width: number,
  height: number,
): [number, number] {
  const up = -1.8 + z - CAM_HEIGHT;
  const fw = CAM_DIST - d;
  const up2 = up * Math.cos(CAMERA_PITCH) + fw * Math.sin(CAMERA_PITCH);
  const fw2 = fw * Math.cos(CAMERA_PITCH) - up * Math.sin(CAMERA_PITCH);
  const focal = height / 2 / Math.tan(HALF_FOV);
  const sx = width / 2 + (focal * x) / fw2;
  const sy = height / 2 - (focal * up2) / fw2 + 60;
  return [sx, sy];
}

/** Every line of the wireframe at time `t`, as screen-space polylines. */
export function wavePolylines(
  t: number,
  width: number,
  height: number,
  mobile = false,
): [number, number][][] {
  const { xs, ds } = waveGrid(mobile);
  const at = (x: number, d: number) => project(x, d, heightField(x, d, t), width, height);
  return [...ds.map((d) => xs.map((x) => at(x, d))), ...xs.map((x) => ds.map((d) => at(x, d)))];
}
