"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Moksha from "@/public/home/gangaji.jpg";

const MokshaVoyage = () => {
  return (
    <section className="relative mt-3 py-2 md:py-4 lg:py-4  bg-gradient-to-b from-white via-gray-50 to-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* ================= LEFT SIDE TEXT ================= */}
        <div className="flex-1">
          <h2 className="text-[1rem] md:text-xl lg:text-xl font-semibold text-gray-900 mb-6 leading-tight">
            Moksha{" "}
            <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
              Voyage
            </span>
          </h2>

          <div className="space-y-3 text-gray-700 text-base md:text-sm leading-relaxed">
            <p className="text-sm md:text-lg lg:text-lg text-gray-500 italic mb-3">
              “A soulful journey from self to salvation — आत्मा से मोक्ष तक की
              यात्रा”
            </p>

            <p className="text-sm md:text-[14px]">
              <span className="font-normal text-gray-900">Moksha Voyage</span>{" "}
              is an initiative by{" "}
              <span className="font-normal text-[#DF562C]">
                Namo Gange Trust
              </span>{" "}
              that represents a sacred journey — a voyage towards inner
              purification, spiritual awakening, and harmony with nature.
            </p>

            <p className="text-sm md:text-[14px]">
              Through this divine mission, we strive to inspire people to live
              with{" "}
              <span className="font-normal text-[#1e7ed3]">
                awareness, compassion,
              </span>{" "}
              and{" "}
              <span className="font-normal text-[#DF562C]">
                selfless service
              </span>
              . Each step of this journey unites individuals with the eternal
              flow of spirituality, wellness, and cultural values rooted in
              Indian tradition.
            </p>

            <p className="text-sm md:text-[14px]">
              <span className="font-normal text-gray-900">Moksha Voyage</span>{" "}
              is not just an event — it’s a movement that connects hearts, heals
              the planet, and guides humanity toward the ultimate goal of{" "}
              <span className="font-normal text-[#1e7ed3]">peace, purity,</span>{" "}
              and <span className="font-normal text-[#DF562C]">liberation</span>
              .
            </p>
          </div>

          {/* Read More Button */}
          <Link href="/about">
            <button
              className="mt-4 md:mt-8 lg:mt-8 relative overflow-hidden px-4 md:px-6 py-2 text-[12px] md:text-sm text-white font-normal 
               shadow-md bg-[#0C55A0] cursor-pointer
               hover:bg-sky-700 hover:shadow-lg transition-all duration-300"
            >
              Read More...
            </button>
          </Link>
        </div>

        {/* ================= RIGHT SIDE IMAGE ================= */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1 relative"
        >
          <div className="overflow-hidden rounded shadow-lg hover:shadow-xl transition-all duration-500">
            <Image
              src={Moksha}
              alt="About Namo Gange Trust"
              className="w-full md:h-96 object-cover hover:scale-103 transition-transform duration-700 ease-in-out"
            />
          </div>

          {/* Gradient Glow Effect */}
          <div
            className="absolute -inset-3 bg-gradient-to-r 
              from-[#DF562C]/20 via-transparent to-[#1e7ed3]/20 
              blur-2xl rounded-3xl -z-10 opacity-70"
          ></div>
        </motion.div>
      </div>
    </section>
  );
};

export default MokshaVoyage;
