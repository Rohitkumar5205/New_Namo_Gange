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
          .map((item) => ({
            title: item.title,
            image: item.image,
            description: item.desc || "",
            link: item.slug ? `/initiatives/${item.slug}` : "#",
            logo_alt: item.logo_alt,
          }));

        setInitiatives(filteredInitiatives);

        /* ===== OBJECTIVES ===== */
        const res2 = await axiosClient.get("/objectives");
        const data2: ObjectiveApi[] = res2?.data?.data || [];

        const matchedObjective = data2.find(
          (item) => item.status === "Active" && item.slug === slug,
        );

        setObjective(matchedObjective || null);
      } catch (error) {
        console.error("Error fetching objective page data:", error);
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
          <div className="bg-black/30 w-full h-42 md:h-56 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-7xl mx-auto px-4 text-center text-white"
          >
            <h1 className="text-xl md:text-2xl font-medium uppercase tracking-wider drop-shadow-lg">
              {slug.replace(/-/g, " ")}
            </h1>
            <p className="text-sm md:text-lg mt-2 font-light tracking-wide">
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
      <div className="w-full px-4 md:px-12 lg:px-12 py-2 md:py-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-lg md:text-xl lg:text-xl font-medium text-gray-900 leading-tight">
            {slug
              .replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </h2>

          <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed mt-1 ">
            “The embodies the spirit of selfless service, guiding individuals
            toward inner peace, spiritual growth, and compassionate living.”
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3] rounded-full"
        />

        {/* ===== OBJECTIVE DESCRIPTION ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="w-full py-2 md:py-3 leading-relaxed space-y-4 text-justify"
        >
          <div
            className="text-gray-700 text-sm md:text-[15px] leading-relaxed font-normal"
            dangerouslySetInnerHTML={{ __html: objective?.desc || "" }}
          />
        </motion.div>

        {/* ================= GRID ================= */}
        {initiatives.length === 0 ? (
          <p className="text-gray-600 mt-10">
            No initiatives available for this category.
          </p>
        ) : (
          <div className="space-y-12 md:space-y-16 py-8">
            {initiatives.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`w-full flex flex-col ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  } items-center gap-5 md:gap-10 lg:gap-10 mb-8`}
                >
                  {/* TEXT SIDE */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex-1 text-center md:text-left"
                  >
                    <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2 leading-tight">
                      {item.title}
                    </h3>

                    <div
                      className="
                        text-gray-700 text-xs md:text-[14px] leading-relaxed font-normal text-justify
                        [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3
                        [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3
                        [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2
                        [&_h4]:text-base [&_h4]:font-semibold [&_h4]:mb-2
                        [&_h5]:text-sm [&_h5]:font-semibold [&_h5]:mb-2
                        [&_h6]:text-xs [&_h6]:font-semibold [&_h6]:mb-2
                        [&_p]:mb-3 [&_p]:leading-relaxed
                        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3
                        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3
                        [&_strong]:font-semibold
                        [&_a]:text-blue-600 [&_a]:underline
                      "
                      dangerouslySetInnerHTML={{ __html: item.description || "" }}
                    />

                    {item.link && item.link !== "#" && (
                      <Link href={item.link}>
                        <button className="mt-2 md:mt-4 relative overflow-hidden px-4 py-1 rounded md:px-6 md:py-1.5 text-xs md:text-sm text-white font-medium shadow-md bg-[#DF562C] hover:bg-orange-600 hover:shadow-lg transition-all duration-300">
                          Read More
                        </button>
                      </Link>
                    )}
                  </motion.div>

                  {/* IMAGE SIDE */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="flex-1 relative w-full"
                  >
                    {item.image && (
                      <div className="overflow-hidden rounded shadow-lg hover:shadow-xl transition-all duration-500 group relative bg-white aspect-video flex items-center justify-center p-4">
                        <Image
                          src={
                            item.image.startsWith("http")
                              ? item.image
                              : `${
                                  process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""
                                }${item.image}`
                          }
                          alt={item.logo_alt || item.title}
                          width={600}
                          height={400}
                          className="max-w-full max-h-full object-contain transform transition-transform duration-700 ease-in-out group-hover:scale-105"
                        />
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      </div>
                    )}

                    <div className="absolute -inset-3 bg-gradient-to-r from-[#DF562C]/20 via-transparent to-[#1e7ed3]/20 blur-2xl rounded-3xl -z-10 opacity-70"></div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
