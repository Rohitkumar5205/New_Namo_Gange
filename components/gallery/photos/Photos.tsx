"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import axiosClient from "@/lib/axiosClient";
import { motion } from "framer-motion";
import { Calendar, Image as ImageIcon, Loader2 } from "lucide-react";

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

interface SEOData {
  page_banner?: string;
  banner_alt?: string;
  h1tag?: string;
}

const Photos = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [seoLoading, setSeoLoading] = useState(true);

  /* ================= FETCH CATEGORY IMAGES ================= */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get("/category-image");

        // Add null check for response
        if (!res?.data?.data) {
          console.warn("No data received from category-image endpoint");
          setCategories([]);
          return;
        }

        const data = res.data.data;

        // Ensure data is an array
        const categoryArray = Array.isArray(data) ? data : [];

        const activeCategories = categoryArray
          .filter((item: CategoryItem) => item && item.status === "Active")
          .sort(
            (a: CategoryItem, b: CategoryItem) =>
              (a.order_by || 0) - (b.order_by || 0),
          );

        setCategories(activeCategories);
      } catch (error) {
        console.error("Category Image API Error:", error);
        setCategories([]);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Separate useEffect for SEO data
  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const res = await axiosClient.get(
          `/seo/page/${encodeURIComponent("/gallery/photos")}`,
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
        console.error("Error fetching SEO data for photos:", error);
      } finally {
        setSeoLoading(false);
      }
    };
    fetchSEOData();
  }, []);

  // Handle image error
  const handleImageError = (categoryId: string) => {
    setImageErrors((prev) => ({ ...prev, [categoryId]: true }));
  };

  // Format date safely
  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return "Date not available";
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Date not available";
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return "Date not available";
    }
  };

  // Sort categories by order_by
  const sortedCategories = useMemo(() => {
    return [...categories].sort(
      (a, b) => (a.order_by || 0) - (b.order_by || 0),
    );
  }, [categories]);

  // Loading skeleton component
  const CategorySkeleton = () => (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="w-full h-56 bg-gray-200" />
      <div className="px-4 py-4 bg-white">
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
      </div>
    </div>
  );

  if (initialLoading) {
    return (
      <section className="w-full bg-gray-50 min-h-screen">
        {/* Banner Skeleton */}
        <div className="w-full bg-gray-300 h-[300px] animate-pulse" />

        <div className="w-full relative py-8 md:py-12 px-4 md:px-12 lg:px-12 text-center">
          <div className="space-y-6">
            <div className="h-10 w-96 bg-gray-200 rounded mx-auto" />
            <div className="h-16 w-3/4 bg-gray-200 rounded mx-auto" />
            <div className="h-1 w-full bg-gray-200 rounded" />
            <div className="h-20 w-full bg-gray-200 rounded" />

            {/* Grid Skeletons */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <CategorySkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-gray-50 min-h-screen">
      {/* ================= HERO ================= */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('${seoData?.page_banner
            ? seoData.page_banner.startsWith("http")
              ? seoData.page_banner
              : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${seoData.page_banner}`
            : "/home/image1.jpg"
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
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              - {seoData?.h1tag || "Photos Gallery"}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative py-1.5 md:py-3 px-2 md:px-12 lg:px-12 bg-white overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-lg md:text-xl font-medium text-gray-900 leading-tight">
            Our Photos{" "}
            <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
              & Gallery
            </span>
          </h2>
          <p className="text-gray-600 text-[13px] md:text-sm italic leading-relaxed ">
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
          className="w-full h-1 mt-2 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3] rounded-full"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* <p className="text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal">
            Acharya Jagdishji Maharaj is a revered spiritual guide whose life
            and teachings continue to inspire countless individuals on the path
            of inner awakening and self-realization. Blessed by the divine grace
            of
            <span className="text-[#DF562C] text-medium">
              {" "}
              Maa Gange and Lord Krishna
            </span>
            , he embodies a rare harmony of spiritual wisdom, compassion, and
            disciplined living. Renowned as a profound philosopher and an
            eloquent Bhagwat Kathavachak, Acharya Ji has dedicated his life to
            spreading the timeless values of Sanatan Dharma through
            wisdom-filled discourses and soulful storytelling.
          </p> */}

          <p className="text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal">
  Our Photos & Gallery beautifully capture the spirit of devotion, service, and
  cultural heritage reflected through various activities and events. Each image
  tells a story of dedication, compassion, and collective effort in preserving
  traditions and serving society. From spiritual gatherings and charitable
  initiatives to cultural celebrations, these moments highlight the essence of
  our mission and values.
  <span className="text-[#DF562C] text-medium">
    {" "}
    These glimpses showcase our journey of faith, unity, and meaningful impact
    on the community.
  </span>
</p>
        </motion.div>

        {/* ================= LOADING STATE ================= */}
        {loading && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 mt-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <CategorySkeleton key={i} />
            ))}
          </div>
        )}

        {/* ================= EMPTY STATE ================= */}
        {!loading && sortedCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="flex justify-center mb-4">
              <ImageIcon size={48} className="text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg">
              No gallery categories available.
            </p>
          </motion.div>
        )}

        {/* ================= GRID ================= */}
        {!loading && sortedCategories.length > 0 && (
          <motion.div
            className="w-full py-1 md:py-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
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
            {sortedCategories.map((cat) => (
              <motion.div
                key={cat?._id || cat?.slug || `cat-${Math.random()}`}
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
                  href={`/gallery/photos/${cat?.slug || "#"}`}
                  className="group block bg-white shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 h-full flex flex-col relative"
                >
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

                  <div className="relative overflow-hidden h-56 bg-gray-100">
                    {!imageErrors[cat._id] ? (
                      <Image
                        src={
                          cat.image?.startsWith("http")
                            ? cat.image
                            : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${cat.image || ""}`
                        }
                        alt={cat?.image_alt || cat.title || "Gallery category"}
                        fill
                        unoptimized
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={() => handleImageError(cat._id)}
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400 text-sm">
                          Image not available
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                  </div>

                  <div className="flex flex-row justify-between p-4 bg-white flex-1 relative z-20">
                    <p className="font-normal text-gray-800 text-base md:text-lg mb-2 group-hover:text-[#DF562C] transition-colors line-clamp-1 text-left">
                      {cat.title || "Untitled"}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                      <Calendar size={14} className="text-[#DF562C]" />
                      <span>{formatDate(cat.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Photos;
