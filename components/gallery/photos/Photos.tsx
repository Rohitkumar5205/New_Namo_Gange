"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";
import { motion } from "framer-motion";

interface CategoryItem {
  _id: string;
  title: string;
  slug: string;
  image: string;
  image_alt?: string;
  order_by: number;
  status: string;
  createdAt: string;
}

const photos = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH CATEGORY IMAGES ================= */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosClient.get("/category-image");
        const data = res?.data?.data || [];

        const activeCategories = data
          .filter((item: CategoryItem) => item.status === "Active")
          .sort((a: CategoryItem, b: CategoryItem) => a.order_by - b.order_by);
        // console.log("🔥 Active Categories...",activeCategories );
        setCategories(activeCategories);
      } catch (error) {
        console.error("❌ Category Image API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  return (
    <section className="w-full bg-gray-50 min-h-screen">
      {/* ================= HERO ================= */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/home/image1.jpg')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-black/40 w-full h-full md:h-[250px] py-10 md:py-16 backdrop-blur-[2px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full px-4 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider drop-shadow-lg">
              Photos Gallery
            </h2>
            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wide">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              - Photos Gallery
            </p>
          </motion.div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="w-full relative py-8 md:py-12 px-4 md:px-12 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight">
            Our Photos{" "}
            <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
              & Gallery
            </span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base italic leading-relaxed mt-2">
            "Our activities and events bring communities together through
            culture, spirituality, health awareness, and meaningful social
            service."
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full h-1 mt-4 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3] rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-700 leading-relaxed text-sm md:text-base text-justify mt-4 mb-8 font-normal">
            Acharya Jagdishji Maharaj is a revered spiritual guide whose life
            and teachings continue to inspire countless individuals on the path
            of inner awakening and self-realization. Blessed by the divine grace
            of
            <strong className="text-[#DF562C]">
              {" "}
              Maa Gange and Lord Krishna
            </strong>
            , he embodies a rare harmony of spiritual wisdom, compassion, and
            disciplined living. Renowned as a profound philosopher and an
            eloquent Bhagwat Kathavachak, Acharya Ji has dedicated his life to
            spreading the timeless values of Sanatan Dharma through
            wisdom-filled discourses and soulful storytelling.
          </p>
        </motion.div>

        {/* ================= GRID ================= */}
        <motion.div
          className="w-full py-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
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
          {/* ===== LOADING ===== */}
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded-2xl overflow-hidden animate-pulse border border-gray-100"
              >
                <div className="w-full h-56 bg-gray-200" />
                <div className="px-4 py-4 bg-white">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-300 rounded w-1/2" />
                </div>
              </div>
            ))}
          {/* ===== DATA ===== */}
          {!loading &&
            categories.map((cat) => (
              <motion.div
                key={cat?.slug}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: "easeOut" },
                  },
                }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="h-full"
              >
                <Link
                  href={`/gallery/photos/${cat?.slug}`}
                  className="group block bg-white shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 h-full flex flex-col relative"
                >
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                  <div className="relative overflow-hidden h-56">
                    <Image
                      src={
                        cat.image?.startsWith("http")
                          ? cat.image
                          : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${cat.image}`
                      }
                      alt={cat?.image_alt || cat.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                  </div>

                  <div className="flex flex-col justify-between p-4 bg-white flex-1 relative z-20">
                    <p className="font-bold text-gray-800 text-lg mb-1 group-hover:text-[#DF562C] transition-colors line-clamp-1 text-left">
                      {cat.title}
                    </p>
                    <p className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                      <span>📅</span>{" "}
                      {new Date(cat.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
};

export default photos;
