"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosClient from "@/lib/axiosClient";
import { motion } from "framer-motion";

/* ================= TYPES ================= */

interface InitiativeApi {
  title: string;
  image: string;
  desc: string;
  slug?: string;
  status: string;
  objective_catagory?: string;
  logo_alt?: string;
}

interface ObjectiveApi {
  title: string;
  slug: string;
  image: string;
  desc: string;
  meta_desc?: string;
  status: string;
}

interface Initiative {
  title: string;
  image: string;
  description: string;
  link: string;
  logo_alt?: string;
}

interface Objective {
  title: string;
  slug: string;
  image: string;
  desc: string;
  meta_desc?: string;
  status: string;
}

/* ================= LOADING ================= */

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#DF562C]"></div>
  </div>
);

/* ================= SLUG HELPER ================= */

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function ObjectiveSlugClient({ slug }: { slug: string }) {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [objective, setObjective] = useState<Objective | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        /* ===== INITIATIVES ===== */
        const res1 = await axiosClient.get("/initiatives");
        const data1: InitiativeApi[] = res1?.data?.data || [];

        const parser = new DOMParser();

        const filteredInitiatives: Initiative[] = data1
          .filter(
            (item) =>
              item.status === "Active" &&
              item.objective_catagory &&
              toSlug(item.objective_catagory) === slug,
          )
          .map((item) => {
            const decoded = parser.parseFromString(
              item.desc || "",
              "text/html",
            );

            return {
              title: item.title,
              image: item.image,
              description: decoded.body.textContent?.trim() || "",
              link: item.slug ? `/initiatives/${item.slug}` : "#",
              logo_alt: item.logo_alt,
            };
          });

        setInitiatives(filteredInitiatives);

        /* ===== OBJECTIVES ===== */
        const res2 = await axiosClient.get("/objectives");
        const data2: ObjectiveApi[] = res2?.data?.data || [];

        const matchedObjective = data2.find(
          (item) => item.status === "Active" && item.slug === slug,
        );

        setObjective(matchedObjective || null);
      } catch (error) {
        console.error("❌ Error fetching objective page data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const stripHtmlTags = (html: string = ""): string => {
    if (typeof window === "undefined") return html;
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  /* ================= LOADING ================= */

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="bg-gray-50 min-h-screen">
      {/* ================= BANNER ================= */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: objective?.image
            ? `url(${objective.image})`
            : "url('/objectives/moksha1.jpg')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-black/50 w-full h-full md:h-[300px] py-16 md:py-24 backdrop-blur-[2px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-7xl mx-auto px-4 text-center text-white"
          >
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-wider drop-shadow-lg">
              {slug.replace(/-/g, " ")}
            </h2>
            <p className="text-sm md:text-lg mt-3 font-light tracking-wide">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              -{" "}
              {slug
                .replace(/-/g, " ")
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="w-full px-4 md:px-12 lg:px-12 py-8 md:py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
            {slug
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </h1>

          <p className="text-gray-600 text-sm md:text-base italic leading-relaxed mt-2 max-w-3xl mx-auto">
            “The embodies the spirit of selfless service, guiding individuals
            toward inner peace, spiritual growth, and compassionate living.”
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full h-1 mt-4 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3] rounded-full"
        />

        {/* ===== OBJECTIVE DESCRIPTION ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="py-6 md:py-8"
        >
          <p className="text-gray-700 text-sm md:text-base text-justify leading-relaxed font-normal">
            {stripHtmlTags(objective?.desc || "")}
          </p>
        </motion.div>

        {/* ================= GRID ================= */}
        {initiatives.length === 0 ? (
          <p className="text-gray-600 mt-10">
            No initiatives available for this category.
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15 },
              },
            }}
          >
            {initiatives.map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group bg-white rounded-2xl shadow-md border border-gray-100
                hover:shadow-2xl transition-all duration-300
                flex flex-col overflow-hidden relative"
              >
                {/* Shine Effect on Card */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                <div className="w-full h-48 bg-gray-50 flex items-center justify-center p-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    src={
                      item.image?.startsWith("http")
                        ? item.image
                        : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${item.image}`
                    }
                    width={300}
                    height={300}
                    alt={item.logo_alt || item.title}
                    className="object-contain w-full h-full
                    transition-transform duration-500
                    group-hover:scale-110"
                  />
                </div>

                <div className="p-5 flex flex-col flex-1 text-center">
                  <h3 className="text-gray-900 font-bold text-lg mb-2 line-clamp-1 group-hover:text-[#DF562C] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                    {item.description}
                  </p>

                  <Link href={item.link} className="w-full mt-auto">
                    <div
                      className="relative w-full text-center py-2 rounded-lg overflow-hidden
                        text-sm font-medium text-white bg-[#0C55A0]
                        group/btn cursor-pointer shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Read More{" "}
                        <span className="transition-transform group-hover/btn:translate-x-1">
                          →
                        </span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#DF562C] to-[#f89a36] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
