import { mtechEnd } from "./timeline";

export type EducationRow = {
  degree: string;
  field: string;
  org: string;
  startYear: number;
  endYear: number;
  /** endYear is an expected date: the degree is still in progress. */
  expected?: true;
};

export const education: readonly EducationRow[] = [
  {
    degree: "M.Tech",
    field: "Signal & Image Processing",
    org: "NIT Rourkela",
    startYear: 2025,
    endYear: mtechEnd.year,
    expected: true,
  },
  {
    degree: "B.Tech",
    field: "Electronics & Communication Engineering",
    org: "Shri Mata Vaishno Devi University",
    startYear: 2020,
    endYear: 2024,
  },
];
