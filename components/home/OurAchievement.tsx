"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import OurActivities1 from "@/public/ourActivities/ourActivities5.jpg";
import OurActivities2 from "@/public/ourActivities/ourActivities2.jpg";
import OurActivities3 from "@/public/ourActivities/ourActivities3.jpg";
// import OurActivities4 from "@/public/ourActivities/ourActivities4.jpg";

const activities = [
  {
    title: "Ann Seva",
    text: `Ann Seva is one of our most sacred initiatives — a living expression of compassion, generosity, and service. 
    Through this humble act, we aim to serve nutritious meals and provide care to the underprivileged, regardless of caste, creed, or background. 
    Beyond food, Ann Seva carries the message of equality and dignity for all. Each meal symbolizes our collective responsibility to ensure that no one sleeps hungry. 
    Our volunteers tirelessly prepare and distribute meals with devotion, fostering an atmosphere of kindness and humanity in every corner of society.`,
    image: OurActivities1,
  },
  {
    title: "Ganga Nadi ko Saaf Karvaya",
    text: `The Ganga River, revered as the lifeline of India and a sacred symbol of purity, has been facing 
    unprecedented ecological challenges due to rapid urbanization and industrial waste. 
    Through our “Clean Ganga Initiative,” we are uniting citizens, saints, students, and environmental experts 
    to restore her divine flow. From riverbank cleaning drives to large-scale awareness campaigns, 
    our movement seeks not only to purify the water but also to rekindle the spiritual connection between humanity and nature. 
    Each action taken under this project echoes our belief that protecting the Ganga is protecting life itself.`,
    image: OurActivities2,
  },
  {
    title: "Health Camps",
    text: `Our Health Camps stand as a pillar of hope for those with limited access to healthcare. 
    By organizing free medical check-ups, awareness programs, and wellness workshops, we bridge the gap between medical resources and rural communities. 
    Experienced doctors, ayurvedic practitioners, and healthcare volunteers collaborate to provide holistic treatment — balancing physical, mental, and spiritual well-being. 
    From addressing chronic illnesses to promoting preventive healthcare, these camps ensure that good health becomes a shared right, not a privilege. 
    Each camp is a step towards building a healthier, happier, and more aware society.`,
    image: OurActivities3,
  },
  // {
  //   title: "Gaushala Seva",
  //   text: `Gaushala Seva is our heartfelt tribute to India’s sacred heritage and its eternal bond with nature.
  //   We are devoted to the care, protection, and nurturing of cows — beings revered as symbols of motherhood, gentleness, and sustainability.
  //   Through our gaushalas, we ensure that abandoned and aging cows receive proper shelter, food, and medical attention.
  //   Beyond physical care, our initiative promotes awareness about the ecological and cultural importance of cow conservation.
  //   Gaushala Seva inspires compassion, reconnects people with rural values, and reminds humanity that the path to progress must always include respect for all living beings.`,
  //   image: OurActivities4,
  // },
];

const OurAchievement = () => {
  return (
    <section className="relative py-4 md:py-6 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-0">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-lg md:text-xl lg:text-xl font-semibold text-center text-gray-900 mb-4"
        >
          Our{" "}
          <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
            Achievement
          </span>
        </motion.h2>

        {/* Activities List */}
        <div className="space-y-3 md:space-y-5">
          {activities.map((activity, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: i % 2 === 0 ? -80 : 80,
              }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`flex flex-col ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-5 md:gap-10 lg:gap-10`}
            >
              {/* Image Section */}
              {/* <div className="flex-1 relative group">
           
                <div className="absolute -inset-2 bg-gradient-to-r from-[#f36b2a]/30 to-[#1e7ed3]/30 rounded blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                <div className="overflow-hidden rounded shadow-lg bg-white/50 backdrop-blur-sm border border-gray-100 transition-all duration-700 group-hover:shadow-2xl">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    className="object-fit w-full h-54 md:h-75  transform group-hover:scale-103 transition-transform duration-700 ease-in-out"
                  />
                </div>
              </div> */}
              <div className="flex-1 relative group w-full">
                {/* Gradient glow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-[#f36b2a]/30 to-[#1e7ed3]/30 rounded blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>

                <div className="overflow-hidden rounded shadow-lg bg-white/50 backdrop-blur-sm border border-gray-100 transition-all duration-700 group-hover:shadow-2xl w-full">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-auto object-cover group-hover:scale-103 transition-transform duration-700 ease-in-out"
                  />
                </div>
              </div>

              {/* Text Section */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-1">
                  {activity.title}
                </h3>
                <p className="text-gray-700 text-start text-xs md:text-sm lg:text-sm  leading-relaxed mb-6">
                  {activity.text}
                </p>

                {/* <Link href="/"> */}
                <button
                  className=" relative overflow-hidden px-4 py-1 md:py-1.5 lg:py-1.5 text-xs md:text-sm lg:text-sm text-white font-medium 
                     shadow-md bg-[#DF562C] hover:bg-orange-600
                    hover:shadow-lg transition-all duration-300"
                >
                  Donate Now
                </button>
                {/* </Link> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurAchievement;
