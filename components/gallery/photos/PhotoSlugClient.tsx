"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import { motion, AnimatePresence } from "framer-motion";

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

export default function PhotoSlugClient({ slug }: { slug: string }) {
  const [data, setData] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [seoData, setSeoData] = useState<SEOData | null>(null);

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
          axiosClient.get(galleryPath).catch(() => null),
          axiosClient.get(`/seo/page/${encodeURIComponent(fullSEOPath)}?t=${Date.now()}`).catch(() => null)
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

          if (matchedCategory && Array.isArray(matchedCategory.images) && matchedCategory.images.length > 0) {
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
            console.warn(`❌ No matching Active gallery found for slug: ${currentSlug}`);
            setData([]);
          }
        }

        // Process SEO Data
        let seo = seoRes?.data?.data;
        if (!seo) {
          try {
            const baseSeoRes = await axiosClient.get(`/seo/page/${encodeURIComponent("/gallery/photos")}`);
            seo = baseSeoRes.data?.data;
          } catch (err) {}
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

  return (
    <section className="bg-gray-50 min-h-screen">
      {/* ===== HEADER ===== */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('${seoData?.page_banner
            ? seoData.page_banner.startsWith("http")
              ? seoData.page_banner
              : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${seoData.page_banner}`
            : "/ourActivities/ourActivities.jpg"
            }')`,
          backgroundAttachment: "scroll",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative w-full h-42 md:h-56 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
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
          </motion.div>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h1 className="text-xl md:text-2xl font-medium text-gray-900">
            {title} <span className="text-[#DF562C]">Gallery</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#DF562C] to-[#f89a36] mx-auto mt-4 rounded-full" />
        </motion.div>

        {loading && (
          <p className="text-center text-gray-500 mt-6">Loading...</p>
        )}

        {!loading && data.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No active images available for this category.
          </p>
        )}

        <motion.div
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          initial="hidden"
          animate={!loading && data.length > 0 ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {data.map((item, idx) => (
            <motion.div
              key={item._id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { type: "spring", stiffness: 100, damping: 15 },
                },
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onClick={() => setSelected(item.image)}
              className="cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 group relative"
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

              <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    unoptimized
                    priority={idx < 8}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <span className="text-[10px] uppercase font-bold">No Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white bg-black/40 backdrop-blur-md border border-white/30 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide">
                    View Image
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3 }}
              className="absolute top-6 right-6 text-white/80 hover:text-[#DF562C] text-4xl transition-colors z-50"
              onClick={() => setSelected(null)}
            >
              ✕
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-[90vw] max-w-6xl h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selected}
                alt="Selected"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
