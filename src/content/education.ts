import { todo, type Todo } from "./todo";

export type EducationRow = {
  degree: string;
  field: string;
  org: string;
  startYear: number;
  endYear: number | Todo;
};

export const education: readonly EducationRow[] = [
  {
    degree: "M.Tech",
    field: "Signal & Image Processing",
    org: "NIT Rourkela",
    startYear: 2025,
    endYear: todo("expected graduation year"),
  },
  {
    degree: "B.Tech",
    field: "Electronics & Communication Engineering",
    org: "Shri Mata Vaishno Devi University",
    startYear: 2020,
    endYear: 2024,
  },
];

export const certification = {
  name: "Google Cloud Professional Cloud Architect",
  validThrough: "Sep 2027",
} as const;
