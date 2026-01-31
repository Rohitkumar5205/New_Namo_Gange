"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import axiosClient from "@/lib/axiosClient";

interface CategoryItem {
  _id: string;
  title: string;
  slug: string;
  image: string;
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
            .sort(
              (a: CategoryItem, b: CategoryItem) => a.order_by - b.order_by
            );
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
    <section className="w-full bg-gray-50">
      {/* ================= HERO ================= */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/image1.jpg')" }}
      >
        <div className="bg-black/20 w-full h-full md:h-[250px] py-10 md:py-16">
          <div className="w-full px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
              Photos Gallery
            </h2>
            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Photos Gallery
            </p>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="w-full px-4 md:px-6 lg:px-6 text-center">
        <div className="text-center">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mt-4">
            Our Photos{" "}
            <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
              & Gallery
            </span>
          </h2>
          <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
            "Our activities and events bring communities together through
            culture, spirituality, health awareness, and meaningful social
            service."
          </p>
        </div>

        <div className="w-full h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
        <div>
          <p className="text-gray-700 leading-relaxed text-sm md:text-[15px] mt-2">
            Acharya Jagdishji Maharaj is a revered spiritual guide whose life
            and teachings continue to inspire countless individuals on the path
            of inner awakening and self-realization. Blessed by the divine grace
            of
            <strong> Maa Gange and Lord Krishna</strong>, he embodies a rare
            harmony of spiritual wisdom, compassion, and disciplined living.
            Renowned as a profound philosopher and an eloquent Bhagwat
            Kathavachak, Acharya Ji has dedicated his life to spreading the
            timeless values of Sanatan Dharma through wisdom-filled discourses
            and soulful storytelling.
          </p>
        </div>

        {/* ================= GRID ================= */}
        <div className="w-full mb-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
          {/* ===== LOADING ===== */}
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white shadow-md rounded overflow-hidden animate-pulse"
              >
                <div className="w-full h-56 bg-gray-200" />
                <div className="px-4 py-3 bg-gray-100">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-300 rounded w-1/2" />
                </div>
              </div>
            ))}
          {/* category-image  */}
          {/* ===== DATA ===== */}
          {!loading &&
            categories.map((cat) => (
              <Link
                key={cat?.slug}
                href={`/gallery/photos/${cat?.slug}`}
                className="group block bg-white shadow-md hover:shadow-lg rounded overflow-hidden transition"
              >
                <div className="relative">
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    width={400}
                    height={300}
                    className="w-full h-56 object-cover transition-transform duration-300"
                  />
                </div>

                <div className="flex justify-between items-center px-4 py-2 bg-gray-100 text-gray-700 text-sm">
                  <p className="font-medium">{cat.title}</p>
                  <p className="flex items-center gap-1">
                    📅{" "}
                    {new Date(cat.createdAt).toLocaleDateString("en-GB")}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  )
}

export default photos
