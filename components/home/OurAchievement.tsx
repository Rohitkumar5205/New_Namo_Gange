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
    title: "Ann Sewa",
    text: `Ann Sewa is one of our most sacred initiatives — a living expression of compassion, generosity, and service. 
    Through this humble act, we aim to serve nutritious meals and provide care to the underprivileged, regardless of caste, creed, or background. 
    Beyond food, Ann Sewa carries the message of equality and dignity for all. Each meal symbolizes our collective responsibility to ensure that no one sleeps hungry. 
    Our volunteers tirelessly prepare and distribute meals with devotion, fostering an atmosphere of kindness and humanity in every corner of society.
    
    This initiative also helps strengthen community bonds by encouraging people to contribute their time, resources, and love in service of those in need. 
    Ann Sewa acts as a bridge between hearts, reminding us that true spirituality lies in serving others selflessly. 
    Through regular food drives, festival-based distributions, and school outreach programs, we strive to create an environment where compassion becomes a natural way of life. 
    As more individuals join hands with us, Ann Sewa continues to grow as a beacon of hope, nurturing kindness and spreading the joy of giving across communities. 
    It teaches us that when we serve food with respect and empathy, we nourish not only bodies but souls as well.`,
    image: OurActivities1,
  },

  {
    title: "Ganga Nadi ko Saaf Karvaya",
    text: `The Ganga River, revered as the lifeline of India and a sacred symbol of purity, has been facing 
    unprecedented ecological challenges due to rapid urbanization and industrial waste. 
    Through our “Clean Ganga Initiative,” we are uniting citizens, saints, students, and environmental experts 
    to restore her divine flow. From riverbank cleaning drives to large-scale awareness campaigns, 
    our movement seeks not only to purify the water but also to rekindle the spiritual connection between humanity and nature. 
    Each action taken under this project echoes our belief that protecting the Ganga is protecting life itself.
    
    Our volunteers conduct regular cleanliness drives, promote responsible waste management, and collaborate with local authorities 
    to implement sustainable eco-friendly solutions. By engaging youth and school communities, we encourage future generations 
    to become guardians of the environment. This mission also includes workshops, tree plantations, and cultural programs 
    that highlight the importance of preserving our rivers. Through collective effort, dialogue, and devotion, we aim to restore 
    the timeless purity of Maa Ganga. As awareness spreads and participation increases, this initiative continues to inspire 
    thousands to take responsibility for nature, strengthening the message that a cleaner Ganga ensures a healthier nation.`,
    image: OurActivities2,
  },

  {
    title: "Health Camps",
    text: `Our Health Camps stand as a pillar of hope for those with limited access to healthcare. 
    By organizing free medical check-ups, awareness programs, and wellness workshops, we bridge the gap between medical resources and rural communities. 
    Experienced doctors, ayurvedic practitioners, and healthcare volunteers collaborate to provide holistic treatment — balancing physical, mental, and spiritual well-being. 
    From addressing chronic illnesses to promoting preventive healthcare, these camps ensure that good health becomes a shared right, not a privilege. 
    Each camp is a step towards building a healthier, happier, and more aware society.
    
    In addition to medical support, our camps focus on spreading knowledge about nutrition, hygiene, yoga, and natural healing practices. 
    We conduct special sessions for women, children, and senior citizens, ensuring that vulnerable groups receive timely care and guidance. 
    Mobile health units also reach remote areas where medical services are scarce, bringing essential treatments directly to the community. 
    With a compassionate approach, our teams encourage people to adopt healthier lifestyles and seek regular health checkups. 
    These efforts not only improve individual well-being but also promote a culture of wellness within the society. 
    Through continuous service and dedication.`,
    image: OurActivities3,
  },
];

const OurAchievement = () => {
  return (
    <section className="w-full relative py-4 md:py-6 bg-gray-50 overflow-hidden">
      <div className=" px-4 lg:px-6 md:px-6">
        {/* Header */}
        <h2 className="text-lg md:text-xl lg:text-xl font-semibold text-center text-gray-900 mb-4">
          Our{" "}
          <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
            Achievement
          </span>
        </h2>
        <div className="flex justify-center w-full mb-6">
          <div
            className=" w-full py-6 relative overflow-hidden text-center"
          >
            {/* Decorative Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

            <p className="text-gray-700 text-sm md:text-[15px] text-justify leading-relaxed font-normal mb-3">
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
          {activities.map((activity, i) => (
            <div
              key={i}
              className={`flex flex-col ${
                i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
              } items-center gap-5 md:gap-10 lg:gap-10`}
            >
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
                <p className="text-gray-700 text-justify text-xs md:text-sm lg:text-sm  leading-relaxed mb-6">
                  {activity.text}
                </p>

                {/* <Link href="/"> */}
                <button
                  className=" relative overflow-hidden px-4 py-1 rounded md:py-1.5 lg:py-1.5 text-xs md:text-sm lg:text-sm text-white font-medium 
                     shadow-md bg-[#DF562C] hover:bg-orange-600
                    hover:shadow-lg transition-all duration-300"
                >
                  Donate Now
                </button>
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
