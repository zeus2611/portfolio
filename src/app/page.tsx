import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { OpenSource } from "@/components/OpenSource";
import { SelectedWork } from "@/components/SelectedWork";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Experience />
      <SelectedWork />
      <OpenSource />
    </>
  );
}
