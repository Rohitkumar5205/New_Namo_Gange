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
    description:
      "International Council of AYUSH (ICOA) promotes holistic wellness and traditional health systems worldwide.",
    link: "/initiatives/icoa",
  },
  {
    title: "Ministry of AYUSH",
    image: ourIni2,
    description:
      "We work with the Ministry of AYUSH to support the integration of Ayurveda, Yoga, and natural medicine.",
    link: "/initiatives/ayush",
  },
  {
    title: "Arogya Mantra",
    image: ourIni3,
    description:
      "Arogya Mantra is India’s leading holistic health awareness platform promoting Ayurveda and wellness.",
    link: "/initiatives/arogya-mantra",
  },
  {
    title: "Yogshala Expo 2024",
    image: ourIni4,
    description:
      "An international wellness expo uniting yoga, Ayurveda, and health experts to inspire healthy living.",
    link: "/initiatives/yogshala-expo",
  },
  {
    title: "Yogshala Expo 2025",
    image: ourIni5,
    description:
      "8th edition of the International Health & Wellness Expo – promoting holistic wellbeing globally.",
    link: "/initiatives/yogshala2025",
  },
  {
    title: "Swachh Bharat Sankalp",
    image: ourIni6,
    description:
      "Our contribution to the national Swachh Bharat Mission, spreading cleanliness awareness across India.",
    link: "/initiatives/swachh-bharat",
  },
  {
    title: "ICA",
    image: ourIni7,
    description:
      "Indian Contemporary Art (ICA) celebrates cultural heritage and creativity through art and exhibitions.",
    link: "/initiatives/ica",
  },
];

const WomenEmpowerment = () => {
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
                item.objective_catagory === "Women Empowerment"
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
        console.error("Error fetching initiatives for Women Empowerment:", error);
      }
    };

    fetchInitiatives();
  }, []);

  return (
    <section className="bg-gray-50">
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/objectives/women1.jpg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/20 w-full h-full md:h-[250px] py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
              Women <span className="">Empowerment</span>
            </h2>

            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Women Empowerment
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-2 md:px-12  lg:px-12 text-center">
        {/* HEADER */}
        <div className="">
          <h2 className="text-lg md:text-xl font-semibold  rounded text-gray-900 mt-4 ">
            <span>
              Women{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
                Empowerment
              </span>
            </span>
          </h2>
          <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
            “Empowering women to rise with confidence, dignity, and equal
            opportunity.”
          </p>
        </div>
        <div className=" w-full  h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
        <p className="w-full pb-6 text-sm text-justify md:text-[15px] text-center text-gray-800 leading-relaxed mt-3">
          Women’s Empowerment is a powerful movement dedicated to uplifting
          women through education, opportunities, and equal rights. It focuses
          on building confidence, nurturing leadership qualities, and creating
          safe spaces where women can voice their aspirations freely. By
          enabling access to skill development, financial independence, and
          decision-making roles, we strive to ensure that every woman has the
          freedom to grow, inspire, and achieve her fullest potential. Empowered
          women contribute not only to the progress of their families and
          communities but also lay the foundation for a stronger, more
          compassionate, and inclusive society. When a woman rises, an entire
          generation rises with her — creating lasting change for the world.
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
                  src={typeof item.image === "string" ?
                    item.image?.startsWith("http")
                      ? item.image
                      : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${item.image}`
                    : item.image
                  }
                  alt={item.title}
                  width={100}
                  height={100}
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

export default WomenEmpowerment;
