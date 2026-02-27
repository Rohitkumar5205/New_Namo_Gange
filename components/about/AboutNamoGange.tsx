"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosClient from "@/lib/axiosClient";
import AboutNGTrust from "../home/AboutNGTrust";
import { motion } from "framer-motion";

interface TrustBody {
  _id: string;
  name: string;
  description: string;
  image: string;
  image_alt?: string;
  status?: string;
  createdAt?: string;
}

interface TrustBodyCard {
  id: string;
  title: string;
  text: string;
  image: string;
  image_alt?: string;
}

const AboutNamoGange = () => {
  const [trustBodies, setTrustBodies] = useState<TrustBodyCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrustBodies = async () => {
      try {
        const res = await axiosClient.get("/trust-bodies");

        const data: TrustBody[] = res?.data?.data || [];

        const parser = new DOMParser();

        const activeItems: TrustBodyCard[] = data
          .filter((item) => item.status === "Active")
          .sort(
            (a, b) =>
              new Date(a.createdAt || "").getTime() -
              new Date(b.createdAt || "").getTime(),
          )
          .map((item) => {
            const decoded = parser.parseFromString(
              item.description || "",
              "text/html",
            );

            return {
              id: item._id,
              title: item.name,
              text: decoded.body.textContent || "",
              image: item.image,
              image_alt: item.image_alt,
            };
          });

        setTrustBodies(activeItems);
      } catch (error) {
        console.error("Error fetching trust bodies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrustBodies();
  }, []);

  const stripHtmlTags = (html: string = ""): string => {
    if (typeof window === "undefined") return html;
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/about/about1.jpg')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-black/50 w-full h-full md:h-[300px] flex items-center py-10 md:py-16 backdrop-blur-[2px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full px-4 text-center"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white tracking-wide drop-shadow-lg">
              About Us
            </h2>

            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wider">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              - About Us
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full px-4 md:px-12 lg:px-12 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full text-center"
        >
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight">
            About <span className="text-[#DF562C]">Namo Gange</span>
          </h2>

          <p className="text-sm md:text-base text-gray-600 italic mt-2">
            “We serve communities through wellness, culture, women empowerment,
            compassionate service, and environmental care.”
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full h-1 mt-4 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3] rounded-full"
        />

        <motion.div className="w-full py-6 md:py-8 leading-relaxed space-y-4 text-justify">
          <p className="text-gray-700 text-sm md:text-base leading-relaxed font-normal">
            The Trust Bodies guided by{" "}
            <span className="font-medium text-[#DF562C]">
              Acharya Jagdishji Maharaj
            </span>{" "}
            work with a shared vision of spiritual growth and social
            responsibility. Inspired by the divine blessings of{" "}
            <span className="font-medium text-[#DF562C]">Maa Ganga</span> and{" "}
            <span className="font-medium text-[#1e7ed3]">Lord Krishna</span>,
            these trusts are dedicated to preserving{" "}
            <span className="font-medium text-[#DF562C]">Dharma</span>,
            promoting cultural values, and serving humanity through education,
            awareness, and seva. With a foundation rooted in faith and
            compassion, the Trust Bodies continue to strengthen society by
            uniting spirituality with meaningful action.
          </p>
        </motion.div>
      </div>

      <AboutNGTrust />

      {/* Trust Bodies */}
      <div className="w-full py-8 md:py-12 px-4 md:px-12 lg:px-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full py-2 text-center"
        >
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight">
            Trust <span className="text-[#DF562C]">Bodies</span>
          </h2>

          <p className="text-sm md:text-base text-gray-600 italic mt-1">
            “Organizations united in service, spirituality, and social
            upliftment.”
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3] rounded-full mb-8"
        />

        {/* Loading */}
        {loading ? (
          <div className="space-y-6 py-6">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row items-center gap-6 animate-pulse"
              >
                <div className="w-full md:w-[30%] h-48 bg-gray-200 rounded" />
                <div className="w-full md:w-[70%] space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : trustBodies.length === 0 ? (
          <p className="text-center text-gray-500 py-6">
            No trust bodies available.
          </p>
        ) : (
          <div className="space-y-12 md:space-y-16 py-4">
            {trustBodies.map((activity, i) => (
              <div
                key={activity.id}
                className={`flex flex-col w-full ${
                  i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                } items-center gap-8 md:gap-12 lg:gap-16`}
              >
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="flex w-full md:w-[40%] relative group"
                >
                  <div className="absolute -inset-3 bg-gradient-to-r from-[#f36b2a]/20 to-[#1e7ed3]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                  <div className="relative overflow-hidden rounded-xl shadow-lg bg-white border border-gray-100 w-full aspect-video">
                    <Image
                      src={
                        activity.image?.startsWith("http")
                          ? activity.image
                          : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${activity.image}`
                      }
                      fill
                      alt={activity.image_alt || activity.title}
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col w-full md:w-[60%] text-center md:text-left"
                >
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 relative inline-block">
                    {activity.title}
                    <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-[#DF562C] rounded-full"></span>
                  </h1>
                  <p className="text-gray-600 text-justify text-sm md:text-base leading-relaxed">
                    {stripHtmlTags(activity.text)}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutNamoGange;
