"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { CalendarDays, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import News1 from "@/public/newsUpdate/newsUpdate1.jpg";
import News3 from "@/public/newsUpdate/news3.jpg";
import News2 from "@/public/newsUpdate/news1.jpg";
import axiosClient from "@/lib/axiosClient";

const newsData = [
  {
    id: 1,
    image: News1,
    date: "March 27, 2024",
    title: "Reviving the Spirit of the Ganges",
    description:
      "In the heart of India, where the Ganges River flows, pulses the essence of a nation's spirituality and heritage. Yet this sacred stream faces pollution and modernization challenges. Our initiative works to restore its pristine glory.",
  },
  {
    id: 2,
    image: News2,
    date: "April 15, 2024",
    title: "Arogya Mantra Health Drive",
    description:
      "Our Arogya Health Camps bring wellness and preventive care to rural areas. By combining modern medicine with Ayurvedic principles, we’re transforming the way communities approach health and happiness.",
  },
  {
    id: 3,
    image: News3,
    date: "May 8, 2024",
    title: "Empowering Women for Change",
    description:
      "Through skill training and education programs, we empower women to lead independent, confident, and sustainable lives — building stronger families and communities for the future.",
  },
];
interface Blog {
  id: string;
  title: string;
  image: string;
  description: string;
  date: string;
}
const NewsUpdate = () => {
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosClient.get("/blog");
        if (res.data && Array.isArray(res.data.data)) {
          const parser = new DOMParser();
          const fetchedData = res.data.data
            .filter((item: any) => item.status === "Active")
            .sort(
              (a: any, b: any) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .slice(0, 3)
            .map((item: any) => {
              let description = item.description || "";
              const decoded = parser.parseFromString(description, "text/html");
              description = decoded.body.textContent || "";
              return {
                id: item._id,
                title: item.title,
                image: item.image,
                description: description.replace(/<[^>]+>/g, ""),
                date: new Date(item.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
              };
            });
          setBlogs(fetchedData);
          console.log(fetchedData, "🔥 Blogs Data");
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);
  return (
    <section className="w-full relative py-1.5 md:py-3 bg-gray-50 overflow-hidden">
      <div className="w-full px-4 md:px-12 lg:px-12">
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-sm md:text-lg lg:text-lg font-medium text-gray-900 leading-tight">
            Blogs{" "}
            <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
              Updates
            </span>
          </h2>
          <p className="text-[13px] md:text-[15px] text-medium text-gray-800 italic py-1">
            “Serving Humanity, Preserving Nature, Awakening Divinity.”
          </p>
        </div>

        <div className="flex justify-center w-full ">
          <div className=" w-full mx-auto relative overflow-hidden text-center ">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

            {/* Gradient Top Highlight Line */}
            <p className="text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal py-2">
              Stay informed with the latest updates, highlights, and impactful
              stories from our Trust. Through our{" "}
              <span className="font-semibold text-[#DF562C]">news updates</span>{" "}
              and{" "}
              <span className="font-semibold text-[#1e7ed3]">
                blog articles
              </span>
              , we share important initiatives, community achievements, upcoming
              programs, and inspiring efforts shaping positive change. Each
              update is crafted to keep you connected, aware, and engaged with
              our mission. As we continue working towards social welfare,
              environmental protection, and cultural preservation, we aim to
              provide transparent, meaningful, and insightful information that
              strengthens your trust and deepens your connection with our
              growing community.
            </p>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {blogs.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded border border-gray-100 overflow-hidden shadow-md 
                         hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="w-full h-32 md:h-50 lg:h-58 object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-4 text-left">
                {/* Date */}
                <div className="flex items-center gap-2 text-[#f36b2a] text-xs md:text-sm lg:text-sm mb-2">
                  <CalendarDays className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-sm md:text-lg lg:text-lg font-medium text-gray-900 mb-2 line-clamp-2 hover:text-[#1e7ed3] transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-justisy text-xs md:text-sm line-clamp-4 leading-relaxed">
                  {item.description}
                </p>

                {/* <button
                  className="mt-4 relative rounded overflow-hidden px-6 py-1 md:py-1.5 lg:py-1.5 text-xs md:text-sm lg:text-sm text-white font-normal 
               shadow-md bg-[#0C55A0] cursor-pointer
               hover:bg-sky-700 hover:shadow-lg transition-all duration-300"
                >
                  Learn More...
                </button> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsUpdate;
