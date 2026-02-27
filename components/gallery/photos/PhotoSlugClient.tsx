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

export default function PhotoSlugClient({ slug }: { slug: string }) {
  const [data, setData] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const title = slug
    ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Gallery";

  /* ================= FETCH GALLERY BY SLUG ================= */
  useEffect(() => {
    if (!slug) return;

    const fetchGallery = async () => {
      try {
        const res = await axiosClient.get("/galleryImage");

        const gallery = res?.data?.gallery || [];

        const filtered = gallery.filter(
          (item: GalleryItem) => item.slug === slug && item.status === "Active",
        );

        console.log("✅ Slug:", slug);
        console.log("✅ Filtered Gallery:", filtered);

        setData(filtered);
      } catch (error) {
        console.error("❌ Gallery API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [slug]);

  return (
    <section className="bg-gray-50 min-h-screen">
      {/* ===== HEADER ===== */}
      <div
        className="w-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/ourActivities/ourActivities5.jpg')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-black/50 py-10 md:h-[300px] md:py-16 backdrop-blur-[2px] flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-4 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider drop-shadow-lg">
              {title}
            </h2>
            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wide">
              <Link
                href="/gallery/photos"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Back
              </Link>{" "}
              - {title}
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
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
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
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {data.map((item) => (
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

              <div className="relative w-full aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
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
