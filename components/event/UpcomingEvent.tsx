"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import OurActivities1 from "@/public/event/organicexpo.jpg";
import OurActivities2 from "@/public/event/arogya.jpg";
import OurActivities3 from "@/public/ourActivities/ourActivities3.jpg";
// import OurActivities4 from "@/public/ourActivities/ourActivities4.jpg";

const activities = [
  {
    title: "5th Organic Expo",
    text: `Organic Expo is India’s leading platform for brands and businesses driving the organic and sustainable revolution. This is the ideal showcase for certified organic product manufacturers, natural food and beverage brands, eco-fashion and textile producers, clean beauty and wellness companies, agri-tech innovators, herbal and ayurvedic product makers, green startups, NGOs, and government initiatives aligned with eco-conscious goals.

    If your offerings support a healthier planet and lifestyle — from organic farming solutions to sustainable consumer goods — this is your opportunity to connect with B2B buyers, conscious consumers, wellness professionals, retailers, and decision-makers.`,
    image: OurActivities1,
    link: "https://organicexpo.namogangewellness.com/",
  },

  {
    title: "16th Arogya Sangoshthi",
    text: `Arogya Sangoshthi promote wisdom of East. The aim of our Arogya Sangoshthi is to provide a common platform for researchers, academician, scholars, professionals, and young researchers and aspirants to discuss and present their views and vision on emerging issues related to lifestyle disorders and the role of the Indian system of medicine to cure & prevention. Our aim is to make the AYUSH system popular by organizing and conducting activities like seminars, conferences, health workshops, health exhibitions, health shows, health camps, health pavilions, etc.`,
    image: OurActivities2,
    link: "https://sangoshthi.namogange.org/",
  },

  {
    title: "9th Health & Wellness",
    text: `Experience the future of healthcare at India Health 2025, proudly presented by the organizers of Arab Health, one of the world’s most influential healthcare exhibitions. Scheduled to take place from August 21–23, 2026, at the iconic Bharat Mandapam, New Delhi (formerly Pragati Maidan), this landmark event brings together the brightest minds, leading innovators, and key decision-makers from across the global healthcare ecosystem.
`,
    image: OurActivities3,
    link: "https://ihwe.namogangewellness.com/",
  },
];

const UpcomingEvent = () => {
  return (
    <section className="bg-[#f6f6f9] pb-16">
      {/* ------------------ BANNER ------------------ */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/events.jpg')" }}
      >
        <div className="bg-black/30 w-full h-full md:h-[250px] py-10 md:py-16">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
              Upcoming Events
            </h2>

            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Upcoming Events
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-2 md:px-12  lg:px-12 text-center">
        {/* HEADER */}
        <div className="">
          <h2 className="text-lg md:text-xl font-semibold  rounded text-gray-900 mt-4 ">
            <span>
              Explore Our{" "}
              <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
                Upcoming Events
              </span>
            </span>
          </h2>
          <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
            "Our events are rooted in spirituality and service, bringing
            together health, culture, nature, and community for collective
            upliftment."
          </p>
        </div>
        <div className=" w-full  h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
        <p className="w-full pb:2 md:pb-10 text-sm md:text-[15px] text-justify text-gray-800 leading-relaxed mt-3">
          Our upcoming events are thoughtfully curated to inspire positive
          change and meaningful participation across communities. Each event is
          guided by our vision of nurturing spiritual well-being, promoting
          healthy lifestyles, preserving cultural heritage, protecting the
          environment, and strengthening social responsibility. From wellness
          programs and cultural celebrations to environmental initiatives and
          spiritual gatherings, every event offers a platform to learn, connect,
          and contribute.
        </p>

        {/* Activities List */}
        <div className="space-y-3 md:space-y-5">
          {activities.map((activity, i) => (
            <div
              key={i}
              className={`relative flex flex-col ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center p-2 md:p-6 rounded-xl gap-5 md:gap-10 lg:gap-10
          bg-white
          border border-transparent
          shadow-sm
          transition-all duration-500
          hover:shadow-xl
          hover:border-[#0C55A0]/30`}
            >
              <div className="flex-1 relative group w-full">
                {/* Gradient glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#f36b2a]/30 to-[#1e7ed3]/30 rounded blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                <div className="overflow-hidden rounded shadow-lg bg-white/50 backdrop-blur-sm border border-gray-100 transition-all duration-700 group-hover:shadow-2xl w-full">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-auto md:h-[300] object-fit group-hover:scale-103 transition-transform duration-700 ease-in-out"
                  />
                </div>
              </div>

              {/* Text Section */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-1">
                  {activity.title}
                </h3>
                <p className="text-gray-700 text-justify text-xs md:text-sm lg:text-sm  leading-relaxed mb-6">
                  {activity.text}
                </p>

                <Link href={activity.link}>
                  <button
                    className=" relative overflow-hidden px-4 py-1 rounded md:py-1.5 lg:py-1.5 text-xs md:text-sm lg:text-sm text-white font-medium 
                     shadow-md bg-[#0C55A0] cursor-pointer
                     hover:bg-sky-700 hover:shadow-lg transition-all duration-300"
                  >
                    Learn More...
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvent;
