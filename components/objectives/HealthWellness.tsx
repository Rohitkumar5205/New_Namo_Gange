"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosClient from "@/lib/axiosClient";
import ourIni1 from "@/public/OurInitiatives/ourIni1.png";
import ourIni2 from "@/public/OurInitiatives/ourIni2.png";
import ourIni3 from "@/public/OurInitiatives/ourIni3.png";
import ourIni4 from "@/public/OurInitiatives/ourIni4.png";
import ourIni5 from "@/public/OurInitiatives/ourIni5.png";
import ourIni6 from "@/public/OurInitiatives/ourIni6.png";
import ourIni7 from "@/public/OurInitiatives/ourIni7.png";
import ourIni8 from "@/public/OurInitiatives/ourIni8.png";
import ourIni9 from "@/public/OurInitiatives/ourIni9.png";

interface Initiative {
  title: string;
  image: string;
  description: string;
  link: string;
}

const initiatives1: Initiative[] = [
  {
    title: "ICOA",
    image: ourIni1,
    description: "International Council of AYUSH...",
    link: "/initiatives/icoa",
  },
  {
    title: "Ministry of AYUSH",
    image: ourIni2,
    description: "Supporting Ayurveda & natural medicine...",
    link: "/initiatives/ayush",
  },
  {
    title: "Arogya Mantra",
    image: ourIni3,
    description: "India’s holistic health awareness platform.",
    link: "/initiatives/arogya-mantra",
  },
  {
    title: "Yogshala Expo 2024",
    image: ourIni4,
    description: "International wellness expo for healthy living.",
    link: "/initiatives/yogshala-expo",
  },
  {
    title: "Yogshala Expo 2025",
    image: ourIni5,
    description: "8th edition of International Health Expo.",
    link: "/initiatives/yogshala2025",
  },
  {
    title: "Swachh Bharat Sankalp",
    image: ourIni6,
    description: "Cleanliness awareness across India.",
    link: "/initiatives/swachh-bharat",
  },
  {
    title: "ICA",
    image: ourIni7,
    description: "Art & cultural heritage exhibitions.",
    link: "/initiatives/ica",
  },
  {
    title: "Acharya Ji",
    image: ourIni8,
    description: "Spiritual guidance towards peace.",
    link: "/initiatives/acharya",
  },
  {
    title: "Aviral Ganga",
    image: ourIni9,
    description: "Restoring & preserving our sacred Ganga.",
    link: "/initiatives/aviral-ganga",
  },
];

const HealthWellness = () => {
  const [initiatives, setInitiatives] = useState<Initiative[]>(initiatives1);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const res = await axiosClient.get("/initiatives");
        if (res.data && Array.isArray(res.data.data)) {
          const parser = new DOMParser();
          const fetchedData = res.data.data
            .filter(
              (item: any) =>
                item.status === "Active" &&
                item.objective_catagory === "Health & Wellness"
            )
            .map((item: any) => {
              let description = item.desc || "";
              const decoded = parser.parseFromString(description, "text/html");
              description = decoded.body.textContent || "";
              return {
                title: item.title,
                image: item.image,
                description: description.replace(/<[^>]+>/g, ""),
                link: item.slug ? `/initiatives/${item.slug}` : "#",
              };
            });
          setInitiatives(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching initiatives for Health Wellness:", error);
      }
    };

    fetchInitiatives();
  }, []);

  return (
    <section className="bg-gray-50">
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/objectives/health1.jpg')",
        }}
      >
        {/* Overlay */}
        <div className="bg-black/30 w-full h-full md:h-[250px] py-10 md:py-16">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
              Health <span className="">Wellness</span>
            </h2>

            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Health Wellness
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-4 lg:px-6 lg:px-6 text-center">
        {/* HEADER */}
        <div className="">
          <h2 className="text-lg md:text-xl font-semibold  rounded text-gray-900 mt-4 ">
            <span>
              Health{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
                Wellness
              </span>
            </span>
          </h2>
          <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
            “Promoting a healthier tomorrow through mindful living, holistic
            care, and collective well-being.”
          </p>
        </div>
        <div className=" w-full  h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
        <p className="w-full pb-6 text-justify text-sm md:text-[15px] text-center text-gray-800 leading-relaxed mt-3">
          Health Wellness is a commitment to nurturing the body, mind, and
          spirit through natural healing, balanced living, and conscious
          lifestyle choices. Our focus is on promoting preventive care,
          traditional wellness practices, and holistic health solutions that
          strengthen individuals and uplift the community. We encourage people
          to adopt mindful habits, embrace physical fitness, and develop
          emotional resilience for a healthier and happier life. Through
          awareness programs, health camps, and wellness initiatives, we aim to
          empower every individual with the knowledge and support needed to
          achieve long-term well-being. By combining ancient wisdom with modern
          health approaches, we strive to create a harmonious environment where
          wellness becomes a way of life for all.
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-4">
          {initiatives.map((item, i) => (
            <div
              key={i}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 
                 hover:shadow-lg hover:border-blue-500/40 transition-all duration-300 
                 p-5 flex flex-col items-center text-center"
            >
              {/* Image Section */}
              <div
                className="w-full h-28 mb-4 flex items-center justify-center 
                      rounded-md bg-gray-50
                      overflow-hidden shadow-inner"
              >
                <Image
                  src={typeof item.image === "string" ? item.image?.startsWith("http")
                    ? item.image
                    : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${item.image}`
                    : item.image
                  }
                  width={100}
                  height={100}
                  alt={item.title}
                  className="object-contain max-h-24 w-auto transition-transform duration-300
                     group-hover:scale-105"
                />
              </div>

              {/* Description */}
              <h3 className="text-gray-800 font-semibold text-sm mb-2 line-clamp-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-4">
                {item.description}
              </p>

              {/* Button */}
              <Link href={item.link} className="w-full mt-auto">
                <button
                  className="w-full px-3 py-1.5 text-sm font-medium rounded
                     bg-[#0C55A0] text-white shadow-sm 
                     hover:bg-[#0a4786] active:scale-95 transition-all"
                >
                  Read More
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthWellness;
