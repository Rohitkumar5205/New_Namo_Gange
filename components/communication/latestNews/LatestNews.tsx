"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axiosClient from "@/lib/axiosClient";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LatestNewsPage() {
  const [search, setSearch] = useState("");
  const [publisherFilter, setPublisherFilter] = useState("");
  const [newsList, setNewsList] = useState<any[]>([]);
  const [publishers, setPublishers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, pubRes] = await Promise.all([
          axiosClient.get("/recent-updates"),
          axiosClient.get("/published"),
        ]);

        if (newsRes.data && Array.isArray(newsRes.data.data)) {
          const parser = new DOMParser();
          const mappedNews = newsRes.data.data
            .filter((item: any) => item.status === "Active")
            .map((item: any) => {
              let description = item.description || "";
              const decoded = parser.parseFromString(description, "text/html");
              description = decoded.body.textContent || "";
              return {
                id: item._id,
                title: item.title,
                date: new Date(item.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }),
                publisher: item.published_by || "Namo Gange",
                img: item.image,
                logo: "/logo.png",
                desc: description.replace(/<[^>]+>/g, ""),
              };
            });
          setNewsList(mappedNews);
        }

        if (pubRes.data && Array.isArray(pubRes.data.data)) {
          setPublishers(pubRes.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredNews = newsList.filter((item) => {
    const s = search.toLowerCase();
    const matchSearch =
      item.title.toLowerCase().includes(s) ||
      item.desc.toLowerCase().includes(s);
    const matchPublisher = publisherFilter
      ? item.publisher === publisherFilter
      : true;
    return matchSearch && matchPublisher;
  });

  return (
    <div>
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/home/Newsletter.jpg')",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay */}
        <div className="bg-black/40 w-full h-full md:h-[250px] py-10 md:py-16 backdrop-blur-[2px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-4 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-wider drop-shadow-lg">
              Latest News
            </h2>
            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wide">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              - Latest News
            </p>
          </motion.div>
        </div>
      </div>

      <div className="relative py-8 md:py-12 px-4 md:px-12 lg:px-12 bg-gray-50 overflow-hidden">
        {/* ---------- HEADING ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight">
            Latest News and <span className="text-[#DF562C]">Updates</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base italic leading-relaxed mt-2">
            Stay connected with our latest activities, inspiring stories, and
            important updates that reflect our ongoing mission toward social
            upliftment and community well-being.
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className=" w-full  h-1 mt-4 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3] rounded-full"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-700 mt-4 text-sm md:text-base text-justify leading-relaxed font-normal">
            This initiative reflects a deep commitment to spiritual awareness,
            cultural values, and selfless service. Rooted in the eternal grace
            of
            <strong className="text-[#DF562C]">
              {" "}
              Maa Gange and Lord Krishna
            </strong>
            , it seeks to inspire individuals toward inner awakening,
            compassion, and conscious living. Through thoughtful guidance,
            reflective teachings, and value-based initiatives, this journey
            encourages people to reconnect with the timeless wisdom of Sanatan
            Dharma and apply it meaningfully in everyday life.
          </p>
        </motion.div>

        {/* ---------- FILTERS ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full flex flex-col md:flex-row justify-between gap-4 mt-8 mb-6"
        >
          <select
            className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-white md:w-56 shadow-sm focus:ring-2 focus:ring-[#DF562C]/20 focus:border-[#DF562C] outline-none transition-all"
            value={publisherFilter}
            onChange={(e) => setPublisherFilter(e.target.value)}
          >
            <option value="">Publisher Wise</option>
            {publishers.map((pub: any) => (
              <option key={pub._id} value={pub.name}>
                {pub.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-lg w-full md:w-80 shadow-sm focus:ring-2 focus:ring-[#DF562C]/20 focus:border-[#DF562C] outline-none transition-all"
          />
        </motion.div>

        {/* ---------- NEWS LIST ---------- */}
        <motion.div
          className="w-full space-y-6 py-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {filteredNews.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6 border border-gray-100 transition-all duration-300"
            >
              {/* LEFT IMAGE */}
              <div className="md:w-1/3 w-full h-48 md:h-56 relative rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={
                    item.img?.startsWith("http")
                      ? item.img
                      : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${item.img}`
                  }
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </div>

              {/* RIGHT CONTENT */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-gray-900 font-bold text-lg md:text-xl mb-2 line-clamp-2 group-hover:text-[#DF562C] transition-colors">
                    {item.title}
                  </h3>

                  <div className="w-24 h-6 relative">
                    <Image
                      src={item.logo}
                      alt={item.publisher}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
                  📅 {item.date} &nbsp; | &nbsp; 📰 {item.publisher}
                </p>

                <p className="text-gray-700 text-sm md:text-base text-justify mt-4 line-clamp-3 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredNews.length === 0 && (
          <p className="text-center text-gray-600 mt-10">No results found...</p>
        )}
      </div>
    </div>
  );
}
