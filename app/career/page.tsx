import React from "react";
import Image from "next/image";
import Link from "next/link";
import Career from "@/components/career/Career";

export default function MokshaSewaPage() {
  return (
    <section className="bg-gray-50 pb-16">
      {/* ================= BANNER ================= */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/banner/career.png')" }}
      >
        <div className="bg-black/20 py-12 md:h-[250px] md:py-20">
          <div className="w-full px-4 text-center">
            <h2 className="text-2xl md:text-2xl font-medium uppercase text-white">
              Our <span className="text-[#DF562C]">Career</span>
            </h2>

            <p className="text-sm md:text-base text-white mt-2">
              <Link href="/" className="text-[#DF562C] hover:underline">
                Home
              </Link>{" "}
              / Career
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-4 md:px-6  lg:px-6 text-center">
        {/* HEADER */}
        <div className="">
          <h2 className="text-lg md:text-xl font-semibold  rounded text-gray-900 mt-4 ">
            <span>
              Our{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
                Career
              </span>
            </span>
          </h2>
          <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
            "Explore meaningful career opportunities where passion meets
            purpose, and contribute to impactful social, cultural,
            environmental, and community-driven initiatives."
          </p>
        </div>
        <div className=" w-full  h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

        <p className="w-full pb-6 text-sm md:text-[15px] text-justify text-gray-800 leading-relaxed mt-3">
          At Namo Gange Trust, we believe in creating meaningful career
          opportunities where passion meets purpose. Our work environment
          encourages individuals to grow, innovate, and contribute to impactful
          initiatives across health, culture, education, environment, and
          community service. By joining us, you become a part of a mission
          dedicated to positive societal transformation, personal development,
          and service to humanity with compassion and integrity.
        </p>
      </div>
      <Career />
    </section>
  );
}
