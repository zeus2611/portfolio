"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import ProjectCard from "@/components/ProjectCard";

const Work = () => {
  const [projects, setProjects] = useState([]);

  console.log(projects);

  useEffect(() => {
    async function fetchProjects() {
      const res = await fetch(
        "https://backend-api-7znngxavwq-uc.a.run.app/projects"
      );
      const data = await res.json();
      setProjects(data.data.data);
    }
    fetchProjects();
  }, []);

  return (
    <section>
      <div className="container mx-auto">
        <h2 className="section-title mb-12 text-center mx-auto">Projects</h2>
        <div className="text-lg xl:mt-4 mt-2 grid grid-cols-1 lg:grid-cols-3 gap-16">
          {projects.slice(0, 2).map((project, index) => {
            return <ProjectCard project={project} />
            // <SwiperSlide key={index}>

            // </SwiperSlide>;
          })}
          <Link href='/projects' className="mx-auto my-auto">
            <Button>All Projects → </Button>
          </Link>
          </div>
      </div>
    </section>
  );
};

export default Work;
