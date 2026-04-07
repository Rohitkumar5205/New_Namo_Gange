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
  start_date?: string;
  end_date?: string;
  reporting_point?: string;
}

interface SEOData {
  page_banner?: string;
  banner_alt?: string;
  h1tag?: string;
}

const stripHtmlTags = (html: string = ""): string => {
  if (typeof window === "undefined") return html;
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const UpcomingEventItem = ({ item, index }: { item: EventType; index: number }) => {
  const isEven = index % 2 === 0;
  const [isLongText, setIsLongText] = useState(true);
  const textRef = React.useRef<HTMLDivElement>(null);
  const imgRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const checkHeight = () => {
      if (textRef.current && imgRef.current) {
        const textH = textRef.current.offsetHeight;
        const imgH = imgRef.current.offsetHeight;
        if (textH > imgH + 20) {
          setIsLongText(true);
        } else {
          setIsLongText(false);
        }
      }
    };

    timeoutId = setTimeout(checkHeight, 150);
    window.addEventListener("resize", checkHeight);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", checkHeight);
    };
  }, [item]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      className={
        isLongText
          ? "w-full mb-10 md:mb-16 p-4 md:p-6 text-center md:text-left clear-both flow-root transition-all bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl group overflow-hidden relative"
          : "w-full grid grid-cols-1 md:grid-cols-10 items-center p-4 md:p-6 gap-6 md:gap-12 lg:gap-16 mb-8 transition-all bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl group overflow-hidden relative"
      }
    >
      {/* Decorative background blob */}
      <div
        className={`absolute top-0 ${isEven ? "right-0" : "left-0"
          } w-64 h-64 bg-gradient-to-br from-orange-100/50 to-blue-100/50 rounded-full blur-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
      />

      {/* IMAGE SIDE */}
      <div
        ref={imgRef}
        className={
          isLongText
            ? `w-full md:w-[30%] lg:w-[28%] relative mb-5 md:mb-2 md:mt-1 ${isEven ? "md:float-right md:ml-6 lg:ml-8" : "md:float-left md:mr-6 lg:mr-8"
            }`
            : `w-full md:col-span-3 relative ${isEven ? "md:order-2" : "md:order-1"}`
        }
      >
        {item.image && (
          <div className="overflow-hidden rounded-xl transition-all duration-500 relative flex items-center justify-center">
            <Image
              src={
                item.image.startsWith("http")
                  ? item.image
                  : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${item.image}`
              }
              alt={item.image_alt || item.title}
              width={800}
              height={400}
              unoptimized
              onLoad={() => {
                if (textRef.current && imgRef.current) {
                  const textH = textRef.current.offsetHeight;
                  const imgH = imgRef.current.offsetHeight;
                  if (textH > imgH + 20) {
                    setIsLongText(true);
                  } else {
                    setIsLongText(false);
                  }
                }
              }}
              className="w-full h-auto object-cover object-top transform transition-transform duration-700 ease-in-out group-hover:scale-102 rounded-xl"
            />
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>
        )}

        <div className="absolute -inset-3 bg-gradient-to-r from-[#DF562C]/20 via-transparent to-[#1e7ed3]/20 blur-2xl rounded-3xl -z-10 opacity-70"></div>
      </div>

      {/* TEXT SIDE */}
      <div
        ref={textRef}
        className={
          isLongText
            ? ""
            : `w-full md:col-span-7 text-center md:text-left ${isEven ? "md:order-1" : "md:order-2"
            }`
        }
      >
        <h3 className="text-gray-900 font-medium text-base md:text-xl mb-1 relative inline-block">
          {item.title}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#DF562C] transition-all duration-500 group-hover:w-full"></span>
        </h3>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 text-xs md:text-sm text-gray-500 mb-4">
          {(item.start_date || item.end_date) && (
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#DF562C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                {item.start_date ? new Date(item.start_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ""}
                {item.end_date && item.end_date !== item.start_date ? ` - ${new Date(item.end_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}` : ""}
              </span>
            </div>
          )}
          {item.reporting_point && (
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#0C55A0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{item.reporting_point}</span>
            </div>
          )}
        </div>

        <p className="text-gray-600 text-justify text-sm md:text-base leading-relaxed mb-6">
          {stripHtmlTags(item.text)}
        </p>

        {item.link && item.link !== "#" && (
          <Link href={item.link} target="_blank" rel="noopener noreferrer">
            <div
              className="relative overflow-hidden inline-flex items-center justify-center px-6 py-1 rounded text-sm font-normal text-white bg-[#0C55A0] 
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
  );
};

const UpcomingEvent = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [seoLoading, setSeoLoading] = useState<boolean>(true);

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
              start_date: item.start_date,
              end_date: item.end_date,
              reporting_point: item.reporting_point || item.event_reporting_point,
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

  // Separate useEffect for SEO data
  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const res = await axiosClient.get(
          `/seo/page/${encodeURIComponent("/event/upcoming")}`,
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
        console.error("Error fetching SEO data:", error);
      } finally {
        setSeoLoading(false);
      }
    };

    fetchSEOData();
  }, []);



  return (
    <section className="bg-[#f6f6f9] pb-8">
      {/* ----------- STATIC DESIGN SAME ----------- */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('${seoData?.page_banner
            ? seoData.page_banner.startsWith("http")
              ? seoData.page_banner
              : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ""}${seoData.page_banner}`
            : "/home/events.jpg"
            }')`,
          backgroundAttachment: "scroll",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
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
              {seoData?.h1tag || "Upcoming Events"}
            </h1>

            <p className="text-sm md:text-lg text-white mt-2 font-light tracking-wider">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:text-orange-400 transition-colors"
              >
                Home
              </Link>{" "}
              - {seoData?.h1tag || "Upcoming Events"}
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
              <UpcomingEventItem key={i} item={activity} index={i} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvent;
