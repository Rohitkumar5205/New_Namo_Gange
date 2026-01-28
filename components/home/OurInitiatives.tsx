"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { apiService, InitiativeFromAPI } from "@/lib/apiService";
import axiosClient from "@/lib/axiosClient";

// ✅ Fixed Interface Type
interface Initiative {
  title: string;
  image: string;
  desc: string;
  link: string;
}

const OurInitiatives = () => {
  const [initiativeList, setInitiativeList] = useState<Initiative[]>([]);

  useEffect(() => {
    const fetchInitiatives = async () => {
      try {
        const res = await axiosClient.get("/initiatives");
        if (res.data && Array.isArray(res.data.data)) {
          const parser = new DOMParser();
          const fetchedData = res.data.data
            .filter((item: any) => item.status === "Active")
            .sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
            .map((item: any) => {
              let description = item.desc || "";
              const decoded = parser.parseFromString(description, "text/html");
              description = decoded.body.textContent || "";
              return {
                title: item.title,
                image: item.image,
                desc: description.replace(/<[^>]+>/g, ""),
                link: item.slug ? `/initiatives/${item.slug}` : "#",
              };
            });
          setInitiativeList(fetchedData);
        }
      }
      catch (error) {
        console.error("Error fetching initiatives:", error);
      }
    };

    fetchInitiatives();
  }, []);

  return (
    <section className="relative py-1.5 md:py-3 px-2 md:px-12  lg:px-12  bg-white overflow-hidden">
      <div className="w-full text-center">
        {/* ========== Section Header ========== */}
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          Our{" "}
          <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
            Initiatives
          </span>
        </h2>
        <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
          “Creating positive change through service, awareness, and sustainable
          community development.”
        </p>

        <div className="flex justify-center w-full mt-2">
          <div className="w-full md:max-w-8xl mx-auto  bg-white py-6 relative overflow-hidden text-cente ">
            <div className="absolute top-1 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
            <p className="text-gray-700 text-sm md:text-[15px] text-justify leading-relaxed font-normal">
              Our initiatives focus on creating meaningful change through
              service, awareness, and community support. Each program is
              designed to uplift society, protect culture, and promote
              sustainable living while encouraging unity, responsibility,
              compassion, and long-term positive transformation. We strive to
              create a harmonious connection between people and nature by
              nurturing values of{" "}
              <span className="font-semibold text-[#1e7ed3]">compassion</span>,{" "}
              <span className="font-semibold text-[#DF562C]">
                responsibility
              </span>
              , and{" "}
              <span className="font-semibold text-gray-900">
                conscious living
              </span>
              . Guided by this purpose, our initiatives empower individuals and
              communities to contribute towards a more balanced, inclusive, and
              spiritually enriched world.
            </p>
          </div>
        </div>

        {/* GRID */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-2">
          {initiatives.map((item, i) => (
            <div
              key={i}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 
                 hover:shadow-lg hover:border-blue-500/40 transition-all duration-300 
                 p-3 flex flex-col items-center text-center"
            >
              <div
                className="w-full mb-4 flex items-center justify-center 
                      rounded-md bg-gray-50
                      overflow-hidden shadow-inner"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  className="object-contain h-16 md:h-32 md:w-32 w-auto transition-transform duration-300
                     group-hover:scale-105"
                />
              </div>

              <h3 className="text-gray-800 font-semibold text-sm md:text-[15px] mb-2 line-clamp-1">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {item.description}
              </p>

              <Link href={item.link} className="w-full mt-auto">
                <button
                  className="w-full px-3 py-1.5 text-sm font-medium rounded
                     bg-[#0C55A0] text-white shadow-sm 
                     hover:bg-[#0a4786] active:scale-95 transition-all"
                >
                  Read More...
                </button>
              </Link>
            </div>
          ))}
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {initiativeList.map((item, i) => (
            <div
              key={i}
              className="
        group relative bg-white rounded-2xl border border-gray-200
        shadow-sm hover:shadow-xl transition-all duration-300
        flex flex-col overflow-hidden
      "
            >
              {/* IMAGE */}
              <div className="w-full h-28 md:h-36 flex items-center justify-center bg-gray-50">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="
            object-contain h-16 md:h-34 md:w-34 w-auto
            transition-transform duration-300
            group-hover:scale-110
          "
                />
              </div>

              {/* CONTENT */}
              <div className="flex flex-col flex-1 py-3 px-2 text-center">
                <h3 className="text-gray-900 font-semibold text-sm md:text-[15px] mb-1 line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-gray-600 text-xs md:text-[13px] leading-relaxed line-clamp-3 mb-4">
                  {item.desc}
                </p>

                {/* CTA */}
                <Link href={item.link} className="mt-auto">
                  <div
                    className="
              w-full text-center py-1.5 rounded-lg
              text-sm font-medium text-[#0C55A0]
              border border-[#0C55A0]/30
              hover:bg-[#0C55A0] hover:text-white
              transition-all duration-300
            "
                  >
                    Explore →
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurInitiatives;
