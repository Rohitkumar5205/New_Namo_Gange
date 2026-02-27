"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosClient from "@/lib/axiosClient";
import { motion } from "framer-motion";

interface EventType {
  title: string;
  image: string;
  text: string;
  link?: string;
  image_alt?: string;
}

const UpcomingEvent = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosClient.get("/events");
        const data = res?.data?.data || [];

        const parser = new DOMParser();

        // Today date (date only, no time)
        const today = new Date();
        const todayDateOnly = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
        );

        const filteredEvents = data
          .filter((item: any) => {
            if (!item.start_date || !item.end_date) return false;

            const start = new Date(item.start_date);
            const end = new Date(item.end_date);

            const startDateOnly = new Date(
              start.getFullYear(),
              start.getMonth(),
              start.getDate(),
            );

            const endDateOnly = new Date(
              end.getFullYear(),
              end.getMonth(),
              end.getDate(),
            );

            return (
              item.status === "Active" &&
              (startDateOnly >= todayDateOnly || // future event
                (startDateOnly <= todayDateOnly &&
                  endDateOnly >= todayDateOnly)) // ongoing event
            );
          })
          .sort(
            (a: any, b: any) =>
              new Date(a.start_date).getTime() -
              new Date(b.start_date).getTime(),
          )
          .map((item: any) => {
            const decoded = parser.parseFromString(
              item.description || "",
              "text/html",
            );

            return {
              title: item.name,
              image: item.image,
              text: decoded.body.textContent || "",
              link: item.link,
              image_alt: item.image_alt,
            };
          });

        setUpcomingEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
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
    <section className="bg-[#f6f6f9] pb-8">
      {/* ----------- STATIC DESIGN SAME ----------- */}
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
              Upcoming Events
            </h2>

            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wide">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              - Upcoming Events
            </p>
          </motion.div>
        </div>
      </div>

      <div className="w-full px-2 md:px-12  lg:px-12 py-1.5 md:py-3  text-center">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm text-center md:text-lg lg:text-lg font-medium text-gray-900 leading-tight">
            <span>
              Explore Our{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
                Upcoming Events
              </span>
            </span>
          </h2>
          <p className="text-gray-600 text-[13px] md:text-sm italic leading-relaxed mt-1">
            "Our events are rooted in spirituality and service, bringing
            together health, culture, nature, and community for collective
            upliftment."
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className=" w-full  h-1 mt-2 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3] rounded-full"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal py-2 md:py-4"
        >
          Our upcoming events are thoughtfully curated to inspire positive
          change and meaningful participation across communities. Each event is
          guided by our vision of nurturing spiritual well-being, promoting
          healthy lifestyles, preserving cultural heritage, protecting the
          environment, and strengthening social responsibility. From wellness
          programs and cultural celebrations to environmental initiatives and
          spiritual gatherings, every event offers a platform to learn, connect,
          and contribute.
        </motion.p>
        {/* STATIC HEADER SAME */}

        {/* Activities List */}
        <div className="space-y-6 md:space-y-12 py-4">
          {loading ? (
            <div className="text-gray-500 py-6">Loading events...</div>
          ) : upcomingEvents.length === 0 ? (
            <div className="text-gray-500 py-6">
              No upcoming events available.
            </div>
          ) : (
            upcomingEvents.map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className={`relative flex flex-col ${
                  i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
                } items-center p-4 md:p-6 rounded-2xl gap-6 md:gap-12 lg:gap-16
                bg-white border border-gray-100 shadow-lg transition-all duration-500
                hover:shadow-2xl group overflow-hidden`}
              >
                {/* Decorative background blob */}
                <div
                  className={`absolute top-0 ${
                    i % 2 === 0 ? "right-0" : "left-0"
                  } w-64 h-64 bg-gradient-to-br from-orange-100/50 to-blue-100/50 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                />

                <div className="flex-1 relative w-full">
                  <div className="absolute -inset-3 bg-gradient-to-r from-[#f36b2a]/20 to-[#1e7ed3]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                  <div className="relative overflow-hidden rounded-xl shadow-md bg-white border border-gray-100 transition-all duration-700 group-hover:shadow-xl w-full aspect-video">
                    <Image
                      src={
                        activity.image?.startsWith("http")
                          ? activity.image
                          : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${activity.image}`
                      }
                      alt={activity.image_alt || activity.title}
                      width={800}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-gray-900 font-bold text-lg md:text-2xl mb-3 relative inline-block">
                    {activity.title}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DF562C] transition-all duration-500 group-hover:w-full"></span>
                  </h3>

                  <p className="text-gray-600 text-justify text-sm md:text-base leading-relaxed mb-6">
                    {stripHtmlTags(activity.text)}
                  </p>

                  {activity.link && (
                    <Link
                      href={activity.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div
                        className="relative overflow-hidden inline-flex items-center justify-center px-6 py-2 rounded-lg text-sm font-medium text-white bg-[#0C55A0] 
                        shadow-md hover:shadow-lg transition-all duration-300 group/btn"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          Learn More{" "}
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
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvent;
