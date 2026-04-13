"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import fetchClient from "@/lib/fetchClient";
import { notFound } from "next/navigation";

type GalleryItem = {
  _id: string;
  title: string;
  slug: string;
  image: string;
  status: string;
};

interface SEOData {
  page_banner?: string;
  banner_alt?: string;
  h1tag?: string;
}
const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#DF562C]"></div>
  </div>
);
export default function PhotoSlugClient({ slug }: { slug: string }) {
  const [data, setData] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [categoryNotFound, setCategoryNotFound] = useState(false);

  const title = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Gallery";

  /* ================= FETCH ALL DATA BY SLUG ================= */
  useEffect(() => {
    let isMounted = true;
    if (!slug) return;

    const fetchData = async () => {
      try {
        if (isMounted) setLoading(true);

        const currentSlug = slug.trim().toLowerCase();
        const galleryPath = `/galleryImage?t=${Date.now()}`;
        const fullSEOPath = `/gallery/photos/${currentSlug}`;

        const [galleryRes, seoRes] = await Promise.all([
          fetchClient.get(galleryPath).catch(() => null),
          fetchClient.get(`/seo/page/${encodeURIComponent(fullSEOPath)}?t=${Date.now()}`).catch(() => null)
        ]);

        if (!isMounted) return;

        // Process Gallery Data
        if (galleryRes) {
          const rawData = galleryRes.data?.data || galleryRes.data?.gallery || galleryRes.data;
          const galleryArray = Array.isArray(rawData) ? rawData : (rawData ? [rawData] : []);

          const matchedCategory = galleryArray.find(
            (item: any) =>
              item &&
              item.slug?.trim().toLowerCase() === currentSlug &&
              item.status === "Active"
          );

          if (matchedCategory) {
            if (Array.isArray(matchedCategory.images) && matchedCategory.images.length > 0) {
              const formattedImages = matchedCategory.images.map((img: any, index: number) => {
                const url = typeof img === "string" ? img : img.url;
                const alt = typeof img === "object" ? img.alt : null;

                const imageUrl = url.startsWith("http")
                  ? url
                  : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${url}`;

                return {
                  _id: `${matchedCategory._id}-${index}`,
                  title: alt || matchedCategory.category || matchedCategory.image_alt || "Gallery Image",
                  image: imageUrl,
                  slug: matchedCategory.slug,
                  status: matchedCategory.status
                };
              });
              setData(formattedImages);
            } else {
              setData([]);
            }
          } else {
            console.warn(`❌ No matching Active gallery found for slug: ${currentSlug}`);
            setCategoryNotFound(true);
          }
        }

        // Process SEO Data
        let seo = seoRes?.data?.data;
        if (!seo) {
          try {
            const baseSeoRes = await fetchClient.get(`/seo/page/${encodeURIComponent("/gallery/photos")}`);
            seo = baseSeoRes.data?.data;
          } catch (err) { }
        }

        if (seo && isMounted) {
          setSeoData({
            page_banner: seo.page_banner,
            banner_alt: seo.banner_alt,
            h1tag: seo.h1tag,
          });
        }
      } catch (error) {
        console.error("❌ Data Fetch Error:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [slug]);

  // --- LIGHTBOX SCROLL LOCK & KEYBOARD NAV ---
  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null && data.length > 0) {
      setSelectedIndex((selectedIndex + 1) % data.length);
    }
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedIndex !== null && data.length > 0) {
      setSelectedIndex((selectedIndex - 1 + data.length) % data.length);
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
  }, [selectedIndex, data]);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (categoryNotFound) {
    return notFound();
  }

  return (
    <section className="bg-gray-50 min-h-screen">
      {/* ===== HEADER ===== */}
      <div className="w-full relative overflow-hidden">
        {/* Banner Image */}
        <div className="relative w-full h-42 md:h-56">
          <Image
            src={seoData?.page_banner
              ? seoData.page_banner.startsWith("http")
                ? seoData.page_banner
                : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${seoData.page_banner}`
              : "/ourActivities/ourActivities.jpg"
            }
            alt={seoData?.banner_alt || "Photo Gallery Banner"}
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Content */}
          <div className="relative w-full h-full flex items-center justify-center z-10 px-4">
            <div




              className="w-full px-4 text-center z-10"
            >
              <h1 className="text-xl md:text-2xl lg:text-3xl font-medium text-white tracking-wide drop-shadow-lg">
                {seoData?.h1tag || "Photos Gallery"}
              </h1>
              <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wider">
                {" "}
                <Link
                  href="/"
                  className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
                >
                  Home
                </Link>{" "}
                -{" "}
                <Link href="/gallery/photos" className="hover:underline">
                  {seoData?.h1tag || "Photos Gallery"}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div




          className="text-center mb-8"
        >
          <h1 className="text-xl md:text-2xl font-medium text-gray-900">
            {title} <span className="text-[#DF562C]">Gallery</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#DF562C] to-[#f89a36] mx-auto mt-4 rounded-full" />
        </div>

        {loading && (
          <p className="text-center text-gray-500 mt-6">Loading...</p>
        )}

        {!loading && data.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No active images available for this category.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mt-6">
          {data.map((item, idx) => (
            <div
              key={item._id}
              onClick={() => setSelectedIndex(idx)}
              className="cursor-pointer overflow-hidden rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 bg-white border border-gray-100 group relative"
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50 flex items-center justify-center p-2 rounded-3xl">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    priority={idx < 8}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover p-2 md:p-3 transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <span className="text-xs uppercase font-medium tracking-widest">No Image</span>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center z-20">
                  <span className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-white bg-black/30 backdrop-blur-md border border-white/20 px-6 py-2 rounded-full text-sm font-medium tracking-wide shadow-lg">
                    View Image
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== PROFESSIONAL LIGHTBOX ===== */}
      {selectedIndex !== null && data[selectedIndex] && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-[9999] backdrop-blur-xl"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Top Bar with Counter & Close */}
          <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-50">
            <div className="text-white/80 font-medium tracking-widest text-sm bg-black/50 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              {selectedIndex + 1} / {data.length}
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
                src={data[selectedIndex].image}
                alt={data[selectedIndex].title || "Gallery Image"}
                fill
                unoptimized
                className="object-contain drop-shadow-2xl"
              />
            </div>

            {/* Optional Title/Caption Below Image */}
            {data[selectedIndex].title && data[selectedIndex].title.trim() !== "" && data[selectedIndex].title.toLowerCase() !== "test" && data[selectedIndex].title.toLowerCase() !== "test2" && (
              <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 p-3 z-50">
                <span className="text-white text-sm md:text-base font-medium px-6 py-2 bg-black/60 rounded-full backdrop-blur-xl border border-white/10 shadow-2xl tracking-wide max-w-xl text-center inline-block">
                  {data[selectedIndex].title}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
