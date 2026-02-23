"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import OurActivities1 from "@/public/ourActivities/ann_sewa.jpg";
import OurActivities2 from "@/public/ourActivities/swachh_bharat.jpg";
import OurActivities3 from "@/public/ourActivities/health_check.jpg";
import NGT from "@/public/ourActivities/NGT_farms.jpg";
import Meri_Beti from "@/public/ourActivities/meri_beti.jpg";
import axiosClient from "@/lib/axiosClient";

const activities = [
  {
    title: "Ann Sewa",
    text: `Ann Sewa is one of our most sacred initiatives, reflecting the values of compassion, dignity, and selfless service.
    Through this program, we provide nutritious meals to the underprivileged, ensuring that hunger never becomes a barrier to human dignity.
    Each meal served carries the message of equality, care, and shared responsibility toward society.
    Our dedicated volunteers prepare and distribute food with devotion, creating an atmosphere of kindness and humanity.

    Ann Sewa also strengthens community bonds by encouraging collective participation and reminding us that true service begins with feeding those in need.`,
    image: OurActivities1,
  },

  {
    title: "Swachh Bharat Sankalp",
    text: `Swachh Bharat Sankalp is our commitment toward building a cleaner, healthier, and more responsible society.
    Through cleanliness drives, awareness campaigns, and community participation, we promote the importance of hygiene and environmental care.
    This initiative inspires citizens to take ownership of public spaces and adopt sustainable waste management practices.
    Each effort contributes to a cleaner nation and a healthier future.

    By collaborating with local communities and volunteers, we work to transform cleanliness into a shared social responsibility.`,
    image: OurActivities2,
  },

  {
    title: "Health Camps",
    text: `Our Health Camps serve as a vital support system for communities with limited access to medical care.
    We organize free health check-ups, wellness sessions, and awareness programs to promote preventive healthcare.
    Qualified doctors, ayurvedic experts, and volunteers work together to address physical, mental, and holistic well-being.
    These camps aim to make quality healthcare accessible and inclusive.

    Along with treatment, we spread awareness about nutrition, hygiene, yoga, and healthy lifestyle practices.`,
    image: OurActivities3,
  },

  {
    title: "Meri Beti Mera Abhiman",
    text: `Meri Beti Mera Abhiman is a heartfelt initiative dedicated to empowering girls and celebrating their role in society.
    Through awareness programs and community engagement, we promote education, confidence, and equal opportunities for every girl child.
    The initiative encourages families to support their daughters’ dreams and aspirations.
    It stands as a voice against discrimination and social bias.

    By nurturing respect and pride for daughters, we aim to build a more inclusive and progressive society.`,
    image: Meri_Beti,
  },

  {
    title: "NGT Farms",
    text: `NGT Farms focuses on promoting sustainable agriculture and environmentally responsible farming practices.
    Through this initiative, we support organic farming, soil conservation, and eco-friendly cultivation methods.
    Farmers are encouraged to adopt natural techniques that protect both health and the environment.
    The program also strengthens rural livelihoods and food security.

    NGT Farms represents our commitment to nurturing the land while ensuring a sustainable future for coming generations.`,
    image: NGT,
  },
];

const OurAchievement = () => {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await axiosClient.get("/achievements");
        if (res.data && Array.isArray(res.data.data)) {
          const parser = new DOMParser();
          const fetchedData = res.data.data
            .filter((item: any) => item.status === "Active")
            .sort(
              (a: any, b: any) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            )
            .map((item: any) => {
              let description = item.desc || "";
              const decoded = parser.parseFromString(description, "text/html");
              description = decoded.body.textContent || "";
              return {
                title: item.title,
                image: item.image,
                text: description.replace(/<[^>]+>/g, ""),
              };
            });
          if (fetchedData.length > 0) {
            setAchievements(fetchedData);
          }
        }
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  return (
    <section className="w-full relative py-1.5 md:py-3 bg-gray-50 overflow-hidden">
      <div className=" px-2 lg:px-12 md:px-12">
        {/* Header */}
        <h2 className="text-sm md:text-lg lg:text-lg font-medium text-gray-900 text-center leading-tight">
          Our{" "}
          <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
            Achievement
          </span>
        </h2>
        <p className="text-[13px] md:text-[15px] text-center text-medium text-gray-800 italic py-1">
          “Serving Humanity, Preserving Nature, Awakening Divinity.”
        </p>
        <div className="flex justify-center w-full mb-6">
          <div className=" w-full py-2 relative overflow-hidden text-center">
            {/* Decorative Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

            <p className="text-gray-700 text-xs md:text-[15px] text-justify leading-relaxed font-normal">
              Each milestone achieved by our Trust is a step toward creating a
              more compassionate and environmentally balanced society. Our
              initiatives continue to grow with the collective support of
              volunteers, partners, and individuals who believe in positive
              change. As we expand our reach, we remain dedicated to empowering
              communities through education, healthcare, spiritual development,
              and environmental conservation. With integrity and transparency as
              our foundation, we strive to build a future that inspires hope,
              unity, and long-lasting transformation, nurturing meaningful
              progress for generations ahead, while continuously embracing
              innovation, inclusiveness, and sustainable growth for all.
            </p>
          </div>
        </div>
        {/* Activities List */}
        <div className="space-y-3 md:space-y-5">
          {achievements.map((activity, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-1 md:gap-10 lg:gap-10`}
            >
              <div className="flex-1 relative group w-full">
                {/* Gradient glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#f36b2a]/30 to-[#1e7ed3]/30 rounded blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                <div className="overflow-hidden rounded shadow-lg bg-white/50 backdrop-blur-sm border border-gray-100 transition-all duration-700 group-hover:shadow-2xl w-full">
                  <Image
                    src={
                      typeof activity.image === "string"
                        ? activity.image.startsWith("http")
                          ? activity.image
                          : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${activity.image}`
                        : activity.image
                    }
                    alt={activity.title}
                    width={100}
                    height={100}
                    className="w-full md:h-75 object-cover hover:scale-103 transition-transform duration-700 ease-in-out"
                  />
                </div>
              </div>

              {/* Text Section */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-base md:text-xl font-normal text-gray-900">
                  {activity.title}
                </h3>
                <p className="text-gray-700 py-0 md:py-4 text-justify text-xs md:text-sm lg:text-sm  leading-relaxed">
                  {activity.text}
                </p>

                {/* <Link href="/"> */}
                {/* <button
                  className=" relative overflow-hidden px-4 py-1 rounded md:py-1.5 lg:py-1.5 text-xs md:text-sm lg:text-sm text-white bg-[#0C55A0] hover:bg-[#08467c]
                    hover:shadow-lg transition-all duration-300"
                >
                  Read More...
                </button> */}
                {/* </Link> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurAchievement;
