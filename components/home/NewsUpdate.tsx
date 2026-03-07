"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import axiosClient from "@/lib/axiosClient";

interface Blog {
  _id: string;
  title: string;
  image: string;
  description: string;
  createdAt?: string;
  status?: string;
  image_alt?: string;
}

interface BlogCard {
  id: string;
  title: string;
  image: string;
  description: string;
  date: string;
  image_alt?: string;
}

const NewsUpdate = () => {
  const [blogs, setBlogs] = useState<BlogCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosClient.get("/blog");

        const data: Blog[] = res?.data?.data || [];

        const parser = new DOMParser();

        const fetchedData: BlogCard[] = data
          .filter((item) => item.status === "Active")
          .sort(
            (a, b) =>
              new Date(b.createdAt || "").getTime() -
              new Date(a.createdAt || "").getTime(),
          )
          .slice(0, 3)
          .map((item) => {
            let description = item.description || "";
            const decoded = parser.parseFromString(description, "text/html");
            description = decoded.body.textContent || "";

            return {
              id: item._id,
              title: item.title,
              image: item.image,
              image_alt: item.image_alt,
              description: description.replace(/<[^>]+>/g, ""),
              date: new Date(item.createdAt || "").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
            };
          });

        setBlogs(fetchedData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="w-full relative py-6 md:py-12 bg-gray-50 overflow-hidden">
      <div className="w-full px-4 md:px-12 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-sm md:text-lg lg:text-lg font-medium text-gray-900 leading-tight">
            Blogs{" "}
            <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
              Updates
            </span>
          </h2>
          <p className="text-[13px] md:text-[15px] text-medium text-gray-800 italic py-1">
            “Serving Humanity, Preserving Nature, Awakening Divinity.”
          </p>
        </motion.div>

        {/* Top Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex justify-center w-full mt-4 mb-8"
        >
          <div className="w-full mx-auto relative overflow-hidden text-center rounded-lg">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
            <p className="text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal py-2">
              Stay informed with the latest updates, highlights, and impactful
              stories from our Trust. We are committed to maintaining
              transparency and keeping our stakeholders, community members, and
              supporters engaged with regular communications about our ongoing
              projects, achievements, and initiatives. Through comprehensive
              reporting and meaningful narratives, we showcase how our work
              directly contributes to environmental conservation, social
              welfare, and sustainable development.
            </p>
          </div>
        </motion.div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md p-4 animate-pulse"
              >
                <div className="w-full h-40 bg-gray-200 rounded mb-3" />
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-full mb-1" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500 mt-8">
            No blog updates available.
          </p>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
            }}
          >
            {blogs.map((item, i) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.7, ease: "easeOut" },
                  },
                }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative bg-white rounded-xl border border-gray-100 overflow-hidden shadow-md 
                hover:shadow-2xl transition-shadow duration-400 flex flex-col"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={
                      item.image?.startsWith("http")
                        ? item.image
                        : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${item.image}`
                    }
                    alt={item.image_alt || item.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="p-5 text-left flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-[#f36b2a] text-xs md:text-sm lg:text-sm mb-2">
                    <CalendarDays className="w-4 h-4" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="text-sm md:text-lg lg:text-lg font-medium text-gray-900 mb-2 line-clamp-2 hover:text-[#1e7ed3] transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-justify text-xs md:text-sm line-clamp-3 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-2 border-t border-gray-100 text-right">
                    <span className="text-sm font-medium text-[#0C55A0] group-hover:text-[#f36b2a] transition-colors duration-300">
                      Read More →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* View More Button */}
        {/* {blogs.length > 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex justify-center mt-10 md:mt-12"
          >
            <Link href="/communication/blog">
              <button
                className="relative overflow-hidden px-6 md:px-8 py-2 md:py-2.5 rounded text-sm md:text-base text-white font-medium
                bg-gradient-to-r from-[#0C55A0] to-[#1e7ed3] 
                hover:from-[#08467c] hover:to-[#1562aa]
                hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                View More →
              </button>
            </Link>
          </motion.div>
        )} */}
      </div>
    </section>
  );
};

export default NewsUpdate;
