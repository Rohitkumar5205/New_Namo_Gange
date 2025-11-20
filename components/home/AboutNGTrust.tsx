"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AboutNGTrust3 from "@/public/home/we.jpg";
import MissionImg from "@/public/home/mission1.jpg";
import VisionImg from "@/public/home/vision1.jpg";

const AboutNGTrust = () => {
  return (
    <section className="relative py-4 md:py-6 bg-gradient-to-b from-white via-gray-50 to-[#f8fafc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-0 flex flex-col md:flex-row items-center gap-5 md:gap-10 lg:gap-10">
        {/* ================= LEFT SIDE TEXT ================= */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex-1"
        >
          <h2 className="text-[1rem] md:text-xl lg:text-xl font-semibold text-gray-900 mb-4 leading-tight">
            Who{" "}
            <span className="bg-gradient-to-r from-[#DF562C] to-[#1e7ed3] bg-clip-text text-transparent">
              We Are
            </span>
          </h2>

          <div className="space-y-3 text-gray-700 text-sm md:text-sm lg:text-sm leading-relaxed">
            <p className="">
              <span className="font-normal text-gray-900">
                Namo Gange Trust
              </span>{" "}
              is committed to cleaning and preserving the sacred river Ganga.
              Our mission promotes{" "}
              <span className="font-normal text-[#DF562C]">Aviral</span> and{" "}
              <span className="font-normal text-[#1e7ed3]">Nirmal Ganga</span>{" "}
              through awareness, education, and social action.
            </p>

            <p className="">
              Our activities include{" "}
              <span className="font-normal text-gray-900">
                Spiritual, Educational, Healthcare, Environmental, and Cultural
                programs
              </span>{" "}
              designed to uplift society and strengthen the bond between humans
              and nature.
            </p>

            <p className="">
              Guided by a dedicated team of{" "}
              <span className="font-normal text-[#DF562C]">
                Trustees and Volunteers
              </span>
              , we aim to create a sustainable and spiritually balanced world
              through love, compassion, and service.
            </p>
          </div>
        </motion.div>

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
              src={AboutNGTrust3}
              alt="About Namo Gange Trust"
              className="w-full  md:h-80 object-cover hover:scale-103 transition-transform duration-700 ease-in-out"
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

      <div className="max-w-7xl mx-auto px-4 lg:px-0 mt-2">
        {/* ================== MISSION SECTION ================== */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center gap-5 md:gap-10 lg:gap-10"
        >
          {/* LEFT IMAGE */}
          <div className="flex-1 relative">
            <div className="overflow-hidden rounded shadow-lg hover:shadow-2xl transition-all duration-500">
              <Image
                src={MissionImg}
                alt="Mission - Namo Gange Trust"
                className="w-full  md:h-80 object-cover hover:scale-103 transition-transform duration-700 ease-in-out"
              />
            </div>
            <div className="absolute -inset-3 bg-gradient-to-r from-[#DF562C]/20 via-transparent to-[#1e7ed3]/20 blur-2xl rounded -z-10 opacity-70"></div>
          </div>

          {/* RIGHT TEXT */}
          <div className="flex-1">
            <h2 className="text-[1rem] md:text-xl lg:text-xl font-semibold text-gray-900 mb-2 md:mb-6 lg:mb-6 leading-tight">
              OUR{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#1e7ed3] bg-clip-text text-transparent">
                MISSION
              </span>
            </h2>
            <h4 className="text-[#DF562C] text-[1rem] md:text-lg lg:text-lg font-semibold mb-3">
              सर्वे भवन्तु सुखिनः
            </h4>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Our mission is to support and promote Indian ideology{" "}
              <span className="font-medium text-gray-900">
                सर्वे भवन्तु सुखिनः
              </span>
              — may each and every member of the world family live with health,
              peace, and harmony without boundaries of caste, creed, or color.
            </p>
            <Link href="/joinAsVolunteer">
              <button
                className="relative overflow-hidden px-4 py-1 md:px-6 md:py-2 lg:px-6 lg:py-2 text-xs md:text-sm lg:text-sm text-white font-medium 
                   shadow-md bg-[#DF562C] hover:bg-orange-600
                  hover:shadow-lg transition-all duration-300"
              >
                Join As Volunteer
              </button>
            </Link>
          </div>
        </motion.div>

        {/* ================== VISION SECTION ================== */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row-reverse items-center mt-2 gap-5 md:gap-10 lg:gap-10"
        >
          {/* RIGHT IMAGE */}
          <div className="flex-1 relative">
            <div className="overflow-hidden rounded shadow-lg hover:shadow-2xl transition-all duration-500">
              <Image
                src={VisionImg}
                alt="Vision - Namo Gange Trust"
                className="w-full md:h-80 object-cover hover:scale-105 transition-transform duration-700 ease-in-out"
              />
            </div>
            <div className="absolute -inset-3 bg-gradient-to-l from-[#DF562C]/20 via-transparent to-[#1e7ed3]/20 blur-2xl rounded -z-10 opacity-70"></div>
          </div>

          {/* LEFT TEXT */}
          <div className="flex-1">
            <h2 className="text-[1rem] md:text-xl lg:text-xl font-semibold text-gray-900 mb-2 md:mb-6 lg:mb-6 leading-tight">
              OUR{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#1e7ed3] bg-clip-text text-transparent">
                VISION
              </span>
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Our vision is to educate and inspire people for a{" "}
              <span className="font-medium text-[#1e7ed3]">
                peaceful, healthy
              </span>{" "}
              and{" "}
              <span className="font-medium text-[#DF562C]">
                pollution-free life
              </span>
              , through initiatives, activities, and special attention to{" "}
              <span className="font-medium text-gray-900">
                “Holy Ganga” and water conservation.
              </span>
            </p>
            {/* <Link href="/volunteer">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  background:
                    "linear-gradient(to right, #1e7ed3, #3fa9f5, #1e7ed3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden px-6 py-2 text-sm text-white font-medium 
                  rounded-full shadow-md bg-gradient-to-r from-[#DF562C] to-[#1e7ed3] 
                  hover:shadow-lg transition-all duration-300"
              >
                Join As Volunteer
              </motion.button>
            </Link> */}
            <Link href="/joinAsVolunteer">
              <button
                className="relative overflow-hidden px-4 py-1 md:px-6 md:py-2 lg:px-6 lg:py-2 text-xs md:text-sm lg:text-sm text-white font-medium 
                   shadow-md bg-[#DF562C] hover:bg-orange-600
                  hover:shadow-lg transition-all duration-300"
              >
                Join As Volunteer
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutNGTrust;
