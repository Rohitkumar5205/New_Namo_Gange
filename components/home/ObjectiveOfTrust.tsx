"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosClient from "@/lib/axiosClient";
// import { motion } from "framer-motion";
// import HealthIcon from "@/public/objectives/health.png";
// import NatureIcon from "@/public/objectives/nature.png";
// import CultureIcon from "@/public/objectives/kala.png";
// import WomenIcon from "@/public/objectives/women.png";
// import MokshaIcon from "@/public/objectives/moksha.png";

interface Objective {
  _id: string;
  title: string;
  image: string;
  logo: string;
  description: string;
  link: string;
}

const ObjectiveOfTrust = () => {
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchObjectives = async () => {
      try {
        const res = await axiosClient.get("/objectives");
        if (res.data && Array.isArray(res.data.data)) {
          const fetchedData = res.data.data
            .filter((item: any) => item.status === "Active")
            .map((item: any) => ({
              _id: item._id,
              title: item.title,
              logo: item.logo,
              description: item.desc,
              link: item.slug ? `/objectives/${item.slug}` : "#",
            }));
          setObjectives(fetchedData);
        }
      } catch (error) {
        console.error("Error fetching objectives:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchObjectives();
  }, []);
  return (
    <section className="relative py-4 md:py-8 lg:py-8 bg-gradient-to-b from-white via-gray-50 to-[#f8fafc] overflow-hidden">
      <div className="w-full mx-auto px-2 md:px-12 lg:px-12 text-center">
        {/* Section Header */}
        <h2 className="text-[1rem] md:text-xl lg:text-xl font-semibold text-gray-900 mb-3">
          Objective of{" "}
          <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
            Trust
          </span>
        </h2>

        {/* ✨ Tagline under the header */}
        <p className="text-sm md:text-[15px] text-medium mb-2 text-gray-800 italic">
          “Serving Humanity, Preserving Nature, Awakening Divinity.”
        </p>

        <div className="flex justify-center w-full ">
          <div className=" w-full   mx-auto bg-white py-6  relative   overflow-hidden text-justify">
            <div className="absolute top-1 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

            {/* Gradient Top Highlight Line */}
            <p className="text-gray-700 text-sm md:text-[15px] leading-relaxed font-normal">
              The goal of our Trust is to build a strong, meaningful, and
              lasting connection with our community through{" "}
              <span className="font-semibold text-[#DF562C]">openness</span>,{" "}
              <span className="font-semibold text-[#1e7ed3]">safety</span>, and{" "}
              <span className="font-semibold text-gray-900">reliability</span>.
              We strive to create an environment where every individual feels
              valued, respected, empowered, and confident that their well-being
              and interests remain our highest priority. With every initiative
              we undertake, we stay dedicated to upholding your{" "}
              <span className="font-semibold text-[#DF562C]">trust</span> and
              strengthening the bond that unites us as a community.
            </p>
          </div>
        </div>

        {/* Objective Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col items-center text-center animate-pulse min-h-[320px]"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 mb-4 mt-4"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="w-full space-y-2 mb-4 px-2">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/5 mx-auto"></div>
                </div>
                <div className="h-9 bg-gray-200 rounded w-28 mt-auto mb-2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {objectives.map((item, i) => (
              <div
                key={item?._id || i}
                className="bg-white  rounded-xl border border-gray-200  shadow-sm  hover:shadow-xl transition-all p-3 flex flex-col items-center text-center "
              >
                {/* Icon */}
                <div className="flex items-center justify-center  rounded-full bg-gray-50   border border-gray-200 shadow-inner  mb-4 ">
                  <Image
                    src={typeof item.logo === "string" ?
                      item?.logo?.startsWith("http")
                        ? item.logo
                        : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${item.logo}`
                      : item.image
                    }
                    alt={item.title}
                    width={100}
                    height={100}
                    className="w-14 h-14 md:w-38 md:h-38 p-2 rounded-full border object-cover"
                  />
                </div>

                {/* Title */}
                <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                  {item?.title}
                </h3>

                {/* Description */}
                <div
                  className="text-gray-600 text-sm leading-relaxed mb-1 text-justify line-clamp-4"
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                />

                {/* Read More Button */}
                <Link href={item?.link || "#"} className="flex justify-end">
                  <span
                    className="
      text-sm font-medium
      text-[#0C55A0]
      hover:text-[#08467c]
      hover:underline
      transition
    "
                  >
                    Read More →
                  </span>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ObjectiveOfTrust;
