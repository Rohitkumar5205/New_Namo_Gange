"use client";
import React, { useState } from "react";
import { Heart, BookOpen, HandHeart, Leaf, Users } from "lucide-react";
import Link from "next/link";
import AboutNGTrust from "../home/AboutNGTrust";
import Image from "next/image";
import { motion } from "framer-motion";

import axiosClient from "@/lib/axiosClient";
import OurActivities1 from "@/public/ourActivities/ann_sewa.jpg";
import OurActivities2 from "@/public/ourActivities/swachh_bharat.jpg";
import OurActivities3 from "@/public/ourActivities/health_check.jpg";
import NGT from "@/public/ourActivities/NGT_farms.jpg";
import Meri_Beti from "@/public/ourActivities/meri_beti.jpg";

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

const AboutNamoGange = () => {
  const [trustBodies, setTrustBodies] = useState<any[]>([]);

  React.useEffect(() => {
    const fetchTrustBodies = async () => {
      try {
        const res = await axiosClient.get("/trust-bodies");
        if (res.data && Array.isArray(res.data.data)) {
          const parser = new DOMParser();
          const fetchedData = res.data.data
            .filter((item: any) => item.status === "Active")
            .map((item: any) => {
              let description = item.description || "";
              const decoded = parser.parseFromString(description, "text/html");
              description = decoded.body.textContent || "";
              return {
                title: item.name,
                text: description,
                image: item.image,
              };
            });
          if (fetchedData.length > 0) {
            setTrustBodies(fetchedData);
          }
        }
      } catch (error) {
        console.error("Error fetching trust bodies:", error);
      }
    };

    fetchTrustBodies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: "url('/about/about1.jpg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/20 w-full h-full md:h-[250px] flex items-center py-10 md:py-16">
          <div className="w-full px-4 text-center">
            <h2 className="text-xl md:text-3xl font-semibold text-white">
              About <span className="">Us</span>
            </h2>

            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - About Us
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-2 md:px-12  lg:px-12">
        <div className="w-full mt-4 text-center">
          <h2 className="text-sm md:text-lg lg:text-lg font-medium text-gray-900 leading-tight">
            About <span className="text-[#DF562C]">Namo Gange</span>
          </h2>

          <p className="text-[13px] md:text-[15px] text-medium text-gray-800 italic">
            “We serve communities through wellness, culture, women empowerment,
            compassionate service, and environmental care.”
          </p>
        </div>
        <div className=" w-full  h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

        {/* Intro */}
        <div className="w-full py-1 md:py-2 leading-relaxed space-y-2">
          <p className="text-gray-700 text-xs md:text-[15px] leading-relaxed font-normal">
            <span className="font-medium text-[#DF562C]">Namo Gange</span> is a
            non-profit organization established by a group of like-minded
            individuals, supported by dedicated devotees and volunteers. With
            the blessings of His Holiness Acharya Jagdish Ji Maharaj, and the
            guidance of Shri Vijay Sharma, Shri Awadesh Sharma, Shri Brijesh
            Sharma, Shri Dinesh Rathore, Shri Ravi Malla, Shri Ved Priya Pandey,
            Shri Rajesh Aggarwal, and Shri Anoop Sharma, the trust was founded
            on <span className="font-medium">30th March 2015</span>.
          </p>
        </div>
      </div>
      <AboutNGTrust />
      {/* TrustBodies code */}
      <div className="w-full py-1 md:py-3 px-2 md:px-12 lg:px-12">
        <div className="w-full py-1 text-center">
          <h2 className="text-sm md:text-lg lg:text-lg font-medium text-gray-900 leading-tight">
            Trust <span className="text-[#DF562C]">Bodies</span>
          </h2>

          <p className="text-[13px] md:text-[15px] text-medium text-gray-800 italic">
            “Organizations united in service, spirituality, and social
            upliftment.”
          </p>
        </div>

        <div className="w-full h-1  bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

        <p className="text-gray-700 text-xs md:text-[15px] leading-relaxed font-normal py-1">
          The Trust Bodies guided by{" "}
          <span className="font-medium text-[#DF562C]">
            Acharya Jagdishji Maharaj
          </span>{" "}
          work with a shared vision of spiritual growth and social
          responsibility. Inspired by the divine blessings of{" "}
          <span className="font-medium text-[#DF562C]">Maa Ganga</span> and{" "}
          <span className="font-medium text-[#1e7ed3]">Lord Krishna</span>,
          these trusts are dedicated to preserving{" "}
          <span className="font-medium text-[#DF562C]">Dharma</span>, promoting
          cultural values, and serving humanity through education, awareness,
          and seva. With a foundation rooted in faith and compassion, the Trust
          Bodies continue to strengthen society by uniting spirituality with
          meaningful action.
        </p>

        <div className="space-y-2 md:space-y-2 py-2 md:py-6">
          {trustBodies.map((activity, i) => (
            <div
              key={i}
              className={`flex flex-col w-full ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-5 md:gap-10 lg:gap-10`}
            >
              <div className="flex w-full md:w-[30%] relative group ">
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
                    width={500}
                    height={300}
                    alt={activity.title}
                    className="w-full  object-cover hover:scale-103 transition-transform duration-700 ease-in-out"
                  />
                </div>
              </div>

              {/* Text Section */}
              <div className="flex flex-col w-full md:w-[70%] text-center md:text-left">
                <h3 className="text-sm md:text-lg font-normal text-gray-900">
                  {activity.title}
                </h3>
                <p className="text-gray-700 text-justify text-xs md:text-sm lg:text-sm  leading-relaxed mb-6">
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
    </div>
  );
};
export default AboutNamoGange;
