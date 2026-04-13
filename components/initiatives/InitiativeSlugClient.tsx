"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import fetchClient from "@/lib/fetchClient";

interface PageImage {
  _id?: string;
  url: string;
  alt?: string;
}

interface Initiative {
  _id: string;
  title: string;
  slug: string;
  image: string;
  desc: string;
  status: string;
  createdAt: string;
  image_alt?: string;
  page_description?: string;
  pages_images?: PageImage[];
}

interface SEOData {
  page_banner?: string;
  banner_alt?: string;
  h1tag?: string;
}

export default function InitiativeSlugClient({ slug }: { slug: string }) {
  const [initiative, setInitiative] = useState<Initiative | null>(null);
  const [loading, setLoading] = useState(true);
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  /* ================= FETCH INITIATIVE BY SLUG ================= */
  useEffect(() => {
    if (!slug) return;

    const fetchInitiative = async () => {
      try {
        const res = await fetchClient.get("/initiatives");
        const data = res?.data?.data || [];

        const matched = data.find(
          (item: Initiative) => item.slug === slug && item.status === "Active",
        );

        setInitiative(matched || null);
      } catch (error) {
        console.error("Initiative Slug API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitiative();
  }, [slug]);

  // Separate useEffect for SEO data
  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const res = await fetchClient.get(
          `/seo/page/${encodeURIComponent("/initiatives")}`,
        );
        const seo = res?.data?.data;
        if (seo) {
          setSeoData({
            page_banner: seo.page_banner,
            banner_alt: seo.banner_alt,
            h1tag: seo.h1tag,
          });
        }
      } catch (error) {
        console.error("Error fetching SEO data for initiative:", error);
      }
    };
    fetchSEOData();
  }, []);

  // --- LIGHTBOX SCROLL LOCK & KEYBOARD NAV ---
  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null && initiative?.pages_images && initiative.pages_images.length > 0) {
      setSelectedIndex((selectedIndex + 1) % initiative.pages_images.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null && initiative?.pages_images && initiative.pages_images.length > 0) {
      setSelectedIndex((selectedIndex - 1 + initiative.pages_images.length) % initiative.pages_images.length);
    }
  };

  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, initiative?.pages_images]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading initiative...
      </div>
    );
  }

  /* ================= NOT FOUND ================= */
  if (!initiative) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold text-gray-800">Initiative not found</h2>
        <Link
          href="/initiatives"
          className="mt-3 text-sm text-[#7a0d0d] hover:underline"
        >
          ← Back to Initiatives
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ================= TOP BREADCRUMB BANNER ================= */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('${seoData?.page_banner
            ? seoData.page_banner.startsWith("http")
              ? seoData.page_banner
              : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${seoData.page_banner}`
            : "/OurInitiatives/initbanner.jpg"
            }')`,
          backgroundAttachment: "scroll",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative w-full h-42 md:h-56 flex items-center justify-center">
          <div className="w-full px-4 text-center z-10 text-white">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-wide drop-shadow-lg">
              {seoData?.h1tag || "Our Initiatives"}
            </h1>
            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wider">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              -{" "}
              <Link href="/initiatives" className="hover:underline">
                {seoData?.h1tag || "Our Initiatives"}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full py-8 md:py-12 px-4 md:px-12 lg:px-12 bg-white overflow-hidden">
        <div className="w-full py-2 text-center">
          <h2 className="text-lg md:text-xl font-medium text-gray-900 leading-tight">
            {initiative.title} <span className="text-[#DF562C]">Overview</span>
          </h2>
        </div>

        <div className="w-full h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3] rounded-full" />

        {/* Short Desc at the top like AboutNamoGange intro */}
        {/* {initiative.desc && (
          <div className="w-full py-4 md:py-6 leading-relaxed space-y-4 text-justify">
            <div
              className="text-gray-700 text-sm md:text-[15px] leading-relaxed font-normal"
              dangerouslySetInnerHTML={{ __html: initiative.desc }}
            />
          </div>
        )} */}

        {/* Main Content Layout with Float for proper text wrapping */}
        <div className="w-full mt-2 lg:mt-4 block clear-both">

          {/* TEXT HEADER */}
          <h3 className="text-lg md:text-xl font-medium text-gray-900 relative pb-2 border-b-2 border-[#DF562C] inline-block tracking-wide">
            Detailed Information
          </h3>

          <div className="w-full block text-justify">
            {/* FLOATED IMAGE (Right side on desktop) */}
            <div className="w-full md:w-[60%] lg:w-[50%] xl:w-[50%] float-none lg:float-right lg:ml-8 lg:mb-6 mb-6 mx-auto lg:mx-0 relative group">
              <div className="relative overflow-hidden rounded-xl shadow-lg bg-white border border-gray-100 w-full aspect-video">
                <Image
                  src={
                    initiative.image?.startsWith("http")
                      ? initiative.image
                      : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${initiative.image}`
                  }
                  alt={initiative.image_alt || initiative.title}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 70vw, 45vw"
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-102"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>
            </div>

            {/* TEXT WRAPPER */}
            {initiative.page_description ? (
              <div
                className="
                  text-xs md:text-[15px] text-gray-700 font-normal leading-relaxed
                  [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-3 [&_h1]:mt-6
                  [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-3 [&_h2]:mt-5
                  [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4
                  [&_h4]:text-base [&_h4]:font-semibold [&_h4]:mb-2 [&_h4]:mt-4
                  [&_p]:mb-5 [&_p]:leading-relaxed
                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-5
                  [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-5
                  [&_strong]:font-semibold [&_strong]:text-gray-900
                  [&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800
                "
                dangerouslySetInnerHTML={{ __html: initiative.page_description }}
              />
            ) : (
              <p className="text-gray-500 italic text-sm">Detailed content unavailable.</p>
            )}

            <div className="clear-both"></div>
          </div>
        </div>

        {/* ================= PREMIUM IMAGE GALLERY ================= */}
        {initiative.pages_images && initiative.pages_images.length > 0 && (
          <div className="w-full mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-100 bg-gradient-to-b from-white to-gray-50/50 rounded-b-3xl">
            <div className="w-full py-2 text-center mb-4">
              <h2 className="text-xl md:text-2xl font-medium text-gray-900 leading-tight">
                Initiative <span className="text-[#DF562C]">Glimpses</span>
              </h2>

              <div className="w-auto h-1 bg-gradient-to-r from-[#DF562C] to-[#1e7ed3] rounded-full mx-auto mt-3 mb-3" />

              <p className="lg:text-base text-sm text-gray-600 text-justify font-normal max-w-7xl mx-auto px-4 leading-relaxed">
                A glimpse of <span className="text-[#DF562C] font-semibold">impactful moments</span> and
                <span className="text-[#1e7ed3] font-semibold"> meaningful efforts</span> captured during this initiative,
                reflecting our continuous commitment towards <span className="text-[#DF562C] font-semibold">positive change</span>,
                social responsibility, and overall community development. These visuals highlight the dedication,
                planning, and execution behind every step taken to bring real transformation and create a meaningful difference.
                Each moment showcases how collective efforts and strong values can lead to sustainable progress and inspire others
                to contribute towards a better tomorrow.
              </p>

              {/* <p className="text-[15px] md:text-[15px] lg:text-base text-gray-500 mt-2 max-w-7xl mx-auto px-4">
                Every image represents not just an activity, but a story of dedication, teamwork, and shared vision.
                It reflects the passion, hard work, and unity of people working together towards a common goal.
                These glimpses stand as a reminder that even small actions can create a
                <span className="text-[#1e7ed3] font-medium"> big impact</span> and lead to a
                <span className="text-[#DF562C] font-medium"> brighter and better future</span> for everyone.
              </p> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] md:auto-rows-[230px] gap-4 md:gap-5 px-4 lg:px-8 pb-4">
              {initiative.pages_images.map((img, idx) => {

                // Advanced Bento-Box Grid Pattern
                const total = initiative.pages_images!.length;
                let spanClass = "col-span-1 row-span-1";

                if (total === 1) spanClass = "col-span-1 sm:col-span-2 lg:col-span-4 row-span-2";
                else if (total === 2) spanClass = "col-span-1 sm:col-span-2 lg:col-span-2 row-span-2";
                else if (total === 3) {
                  if (idx === 0) spanClass = "col-span-1 sm:col-span-2 lg:col-span-2 row-span-2";
                  else spanClass = "col-span-1 sm:col-span-1 lg:col-span-2 row-span-1";
                } else {
                  // Repeating modern bento pattern for 4+ images
                  const mod = idx % 5;
                  if (mod === 0) spanClass = "col-span-1 sm:col-span-2 lg:col-span-2 row-span-2";     // Big square
                  else if (mod === 3) spanClass = "col-span-1 sm:col-span-2 lg:col-span-2 row-span-1"; // Wide horizontal
                  else spanClass = "col-span-1 row-span-1";                                            // Standard square
                }

                return (
                  <div
                    key={img._id || img.url}
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative overflow-hidden rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 bg-gray-50 group cursor-pointer border border-gray-100 flex items-center justify-center isolate ${spanClass}`}
                  >
                    <Image
                      src={
                        img.url?.startsWith("http")
                          ? img.url
                          : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${img.url}`
                      }
                      alt={img.alt || "Initiative Gallery Image"}
                      fill
                      unoptimized
                      className="object-fill w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110"
                    />

                    {/* Elegant Dark Gradient on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    {/* Glassmorphism View Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className="scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 transform">
                        <span className="text-gray-900 bg-white/80 backdrop-blur-lg px-6 py-2.5 rounded-full text-sm font-bold tracking-widest shadow-[0_0_30px_rgba(255,255,255,0.6)] uppercase border border-white/60">
                          View
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= BACK LINK ================= */}
        <div className="w-full mt-4 md:mt-6 pb-4 md:pb-6 flex justify-center">
          <Link
            href="/initiatives"
            className="inline-flex items-center gap-2 px-6 py-1 md:py-1.5 lg:py-1.5 rounded-full bg-white hover:bg-[#DF562C] hover:text-white text-[#DF562C] font-semibold transition-all duration-300 shadow-sm border border-[#DF562C] hover:border-transparent focus:ring-2 focus:ring-[#DF562C] focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Initiatives
          </Link>
        </div>
      </div>

      {/* ===== PROFESSIONAL LIGHTBOX ===== */}
      {selectedIndex !== null && initiative?.pages_images && initiative.pages_images[selectedIndex] && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-[9999] backdrop-blur-xl"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Top Bar with Counter & Close */}
          <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-50">
            <div className="text-white/80 font-medium tracking-widest text-sm bg-black/50 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              {selectedIndex + 1} / {initiative.pages_images.length}
            </div>
            <button
              className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-[#DF562C] hover:scale-110 text-white rounded-full transition-all duration-300 backdrop-blur-md shadow-lg"
              onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Previous Button */}
          <button
            className="absolute left-2 md:left-6 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white/10 hover:bg-white/20 hover:scale-110 border border-white/10 text-white rounded-full transition-all duration-300 z-50 backdrop-blur-md shadow-lg"
            onClick={handlePrev}
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            className="absolute right-2 md:right-6 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white/10 hover:bg-white/20 hover:scale-110 border border-white/10 text-white rounded-full transition-all duration-300 z-50 backdrop-blur-md shadow-lg"
            onClick={handleNext}
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="relative w-full h-full p-4 sm:p-12 md:p-20 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-7xl max-h-[85vh]">
              <Image
                src={
                  initiative.pages_images[selectedIndex].url?.startsWith("http")
                    ? initiative.pages_images[selectedIndex].url
                    : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${initiative.pages_images[selectedIndex].url}`
                }
                alt={initiative.pages_images[selectedIndex].alt || "Gallery Image"}
                fill
                unoptimized
                className="object-contain drop-shadow-2xl"
              />
            </div>

            {/* Optional Title/Caption Below Image */}
            {initiative.pages_images[selectedIndex].alt && initiative.pages_images[selectedIndex].alt.trim() !== "" && initiative.pages_images[selectedIndex].alt.toLowerCase() !== "test" && initiative.pages_images[selectedIndex].alt.toLowerCase() !== "test2" && (
              <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 p-3 z-50">
                <span className="text-white text-sm md:text-base font-medium px-6 py-2 bg-black/60 rounded-full backdrop-blur-xl border border-white/10 shadow-2xl tracking-wide max-w-xl text-center inline-block">
                  {initiative.pages_images[selectedIndex].alt}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}