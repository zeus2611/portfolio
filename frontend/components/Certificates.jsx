"use client";
import { useEffect, useState } from "react";

import "swiper/css";
import Link from "next/link";
import { Button } from "./ui/button";
import "swiper/css/pagination";
import { Card, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";

const Certificates = () => {
  const [certs, setCerts] = useState([]);

  console.log(certs);

  useEffect(() => {
    async function fetchCerts() {
      const res = await fetch(
        "https://backend-api-7znngxavwq-uc.a.run.app/certs"
      );
      const data = await res.json();
      setCerts(data.data.data);
    }
    fetchCerts();
  }, []);

  return (
    <section>
      <div className="container mx-auto mt-16">
        <h2 className="section-title mb-4 text-center mx-auto">
          Certifications
        </h2>
        <div className="text-lg xl:mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {certs.slice(0, 3).map((cert, index) => {
            return (
              // <SwiperSlide key={index}>
              <Card className="bg-tertiary dark:bg-secondary/40 p-8 min-h-[216px]">
                <CardHeader className="p-0">
                  <div className="flex items-center gap-x-8">
                    {/* Image */}
                    <Link href={cert.link}>
                      {
                        <Image
                          src={cert.image}
                          alt={cert.title}
                          width={200}
                          height={200}
                          priority
                        />
                      }
                    </Link>
                    {/* text */}
                    <div className="flex flex-col">
                      <CardTitle>{cert.title}</CardTitle>
                      <p>{cert.issuer}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            );
          })}
        </div>
        <div className="mx-auto xl:mx-auto my-auto text-center xl:text-left mt-6 mb-6 flex flex-col justify-center items-center xl:items-start">
          <Link href="/certificates" className="mx-auto my-auto mt-16px">
            <Button>All Certificates → </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
