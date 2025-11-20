"use client";
import React from "react";
import { Heart, BookOpen, HandHeart, Leaf, Users } from "lucide-react";
import Link from "next/link";

const AboutNamoGange = () => {
  const pillars = [
    {
      icon: <Leaf className="text-[#f36b2a] w-6 h-6" />,
      title: "Health & Wellness",
      points: [
        "We promote holistic health through Ayurveda, Yoga, and natural healing practices.",
        "Our mission is to inspire a balanced lifestyle that nurtures body, mind, and soul.",
        "We conduct health camps, wellness expos, and awareness drives for community wellbeing.",
        "Prevention through lifestyle discipline — that is our core approach to health.",
      ],
    },
    {
      icon: <Heart className="text-[#f36b2a] w-6 h-6" />,
      title: "Nature & Environment",
      points: [
        "We are committed to protecting the environment through sustainable initiatives.",
        "Our volunteers plant trees, clean rivers, and promote eco-friendly living habits.",
        "We organize awareness programs on water conservation and waste management.",
        "Nature is divine — serving nature is serving the Creator.",
      ],
    },
    {
      icon: <BookOpen className="text-[#f36b2a] w-6 h-6" />,
      title: "Kala & Sanskriti",
      points: [
        "We celebrate and preserve India’s cultural and artistic heritage.",
        "Our events include dance, music, and spiritual art forms inspired by Sanatan Dharma.",
        "We encourage youth participation in cultural preservation and traditional learning.",
        "Through festivals and workshops, we keep our ancient wisdom alive and vibrant.",
      ],
    },
    {
      icon: <HandHeart className="text-[#f36b2a] w-6 h-6" />,
      title: "Women Empowerment",
      points: [
        "We believe empowered women are the foundation of a strong and compassionate society.",
        "Training programs help women gain self-reliance through skill development and education.",
        "We support health, dignity, and safety for women through awareness initiatives.",
        "Every woman has divine strength — our mission is to help her realize it fully.",
      ],
    },
  ];

  return (
    <div
      className="min-h-screen bg-gray-50 text-gray-800"
      // style={{
      //   backgroundImage:
      //     "url('https://www.transparenttextures.com/patterns/white-paper.png')",
      // backgroundImage: "url('/ourActivities/ourActivities5.jpg') ",
      // }}
    >
      {/* Header */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/ourActivities/ourActivities5.jpg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/60 w-full h-full py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white">
              Health <span className="">Wellness</span>
            </h2>

            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Health Wellness
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 text-center">
        <h1 className="text-sm md:text-xl font-medium  mb-3">
          About <span className="text-[#DF562C]">Namo Gange</span>
        </h1>

        <p className="italic  text-sm md:text-[15px] max-w-2xl mx-auto">
          “Protect Gaumata. Feed the Needy. Spread Vedic Wisdom. Serve Humanity.
          Reawaken Bharat’s Soul.”
        </p>
      </div>
      {/* Intro */}
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded p-6 my-8 leading-relaxed">
        <p className="mb-4 text-normal text-sm md:text-[15px]">
          <span className="font-medium text-[#DF562C]">Krishnayan</span> draws
          its essence from the <span className="">Shreemad Bhagavad Gita</span>,
          carrying the divine philosophy of{" "}
          <span className="font-medium">Lord Krishna</span>. It is not just an
          institution but a{" "}
          <span className="text-[#DF562C] font-medium">sacred movement</span>{" "}
          built upon the principles of{" "}
          <span className="">
            seva (service), daan (charity), and dharma (righteous duty)
          </span>
          .
        </p>
        <p className="text-normal text-sm md:text-[15px]">
          Guided by Krishna’s timeless values, Krishnayan is a living testament
          to Bharat’s spiritual heritage. Every step here honors{" "}
          <span className="text-[#DF562C] font-medium">parmarth seva</span> —
          dedicated service to{" "}
          <span className="">Gaumata, Sanatan Dharma,</span> and the soul of
          Bharat.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-base md:text-lg lg:text-lg font-medium text-[#DF562C] border-b-1 border-[#DF562C] inline-block mb-6">
          Our Core Pillars of Service
        </h2>

        <div className="space-y-6">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                {pillar.icon}
                <h3 className="text-sm md:text-lg font-normal text-[#DF562C]">
                  {pillar.title}
                </h3>
              </div>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                {pillar.points.map((point, index) => (
                  <li key={index} className="text-[15px]">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AboutNamoGange;
