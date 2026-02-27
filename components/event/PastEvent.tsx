"use client";
import React, { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import axiosClient from "@/lib/axiosClient";

/* ================= TYPES ================= */
interface PastEventType {
  id: string;
  title: string;
  image: string;
  fromDate: string;
  toDate: string;
  link?: string;
}

/* ================= HELPERS ================= */
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const PastEvent = () => {
  const [pastEvents, setPastEvents] = useState<PastEventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosClient.get("/events");
        const data = res?.data?.data || [];

        const today = new Date();
        const todayDateOnly = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        );

        const filteredEvents: PastEventType[] = data
          .filter((item: any) => {
            if (!item.end_date) return false;

            const end = new Date(item.end_date);
            const endDateOnly = new Date(
              end.getFullYear(),
              end.getMonth(),
              end.getDate(),
            );

            return (
              item.status === "Active" && endDateOnly < todayDateOnly // ✅ ONLY COMPLETED EVENTS
            );
          })
          .sort(
            (a: any, b: any) =>
              new Date(b.start_date).getTime() -
              new Date(a.start_date).getTime(),
          )
          .map((item: any) => ({
            id: item._id,
            title: item.name,
            image: item.image,
            fromDate: item.start_date,
            toDate: item.end_date,
            link: item.link,
          }));

        setPastEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching past events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const stripHtmlTags = (html: string = ""): string => {
    if (typeof window === "undefined") return html;
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <section className="bg-[#f6f6f9] py-2 md:py-4">
      {/* ------------------ BANNER ------------------ */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/home/events.jpg')",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="bg-black/40 w-full h-full md:h-[250px] py-10 md:py-16 backdrop-blur-[2px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white uppercase tracking-wider drop-shadow-lg">
              Past Events
            </h2>

            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wide">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              - Past Events
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full px-4 md:px-12 lg:px-12 text-center py-6 md:py-10">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm text-center md:text-lg lg:text-lg mt-1 font-medium text-gray-900 leading-tight">
            <span>
              Explore Our{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
                Past Events
              </span>
            </span>
          </h2>
          <p className="text-gray-600 text-[13px] md:text-sm italic leading-relaxed mt-1">
            "Each past event stands as a milestone of our commitment to service,
            spirituality, and community upliftment—creating lasting impact
            across health, culture, and environmental awareness."
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className=" w-full  h-1 md:mt-2 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3] rounded-full"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-700 py-4 text-xs md:text-[15px] text-justify leading-relaxed font-normal"
        >
          Our past events stand as meaningful milestones in our journey of
          service and social commitment. Each initiative reflects our dedication
          to spiritual well-being, healthy living, cultural preservation,
          environmental care, and community upliftment. From wellness programs
          and cultural celebrations to environmental drives and spiritual
          gatherings, these events have brought people together to learn, serve,
          and create lasting positive impact across society.
        </motion.p>

        {/* GRID */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 py-4"
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
          {pastEvents.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-white rounded-2xl border border-gray-200 shadow-md
              hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col relative"
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

              <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-4 text-center flex flex-col flex-1">
                <h5 className="font-bold text-sm md:text-base text-gray-900 mb-2 line-clamp-2 group-hover:text-[#DF562C] transition-colors">
                  {item.title}
                </h5>

                <p className="text-xs text-gray-500 mb-4 font-medium">
                  {formatDate(item.fromDate)} – {formatDate(item.toDate)}
                </p>

                {item.link && (
                  <Link
                    href={item.link}
                    className="mt-auto w-full flex justify-center"
                  >
                    <div
                      className="
                        relative overflow-hidden w-full py-2 text-sm font-medium rounded-lg
                        bg-[#0C55A0] text-white shadow-md group/btn cursor-pointer
                        hover:shadow-lg transition-all duration-300
                      "
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        View Details{" "}
                        <span className="transition-transform group-hover/btn:translate-x-1">
                          →
                        </span>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-[#DF562C] to-[#f89a36] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PastEvent;
