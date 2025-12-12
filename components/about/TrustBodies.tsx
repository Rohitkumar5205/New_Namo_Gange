import React from "react";
import Link from "next/link";

const TrustBodies = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: "url('/about/aboutus.jpg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/20 w-full h-full md:h-[250px] flex items-center py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-3xl font-semibold text-white">
              TRUST <span className="">BODIES</span>
            </h2>

            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - TRUST BODIES
            </p>
          </div>
        </div>
      </div>

      {/* </div> */}

      {/* ---------- MAIN CONTENT ------------- */}
      <div className="w-full px-2 md:px-6 lg:px-6">
        <div className="w-full mt-4 text-center">
          <h1 className="text-sm md:text-xl font-medium">
            Trust <span className="text-[#DF562C]">Bodies</span>
          </h1>

          <p className="italic text-sm md:text-[15px] w-full text-gray-700">
            “A devoted spiritual leader spreading the message of Shrimad Bhagwat
            and Maa Ganga.”
          </p>
        </div>
        <div className=" w-full  h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
        <p className="text-gray-700 leading-relaxed text-sm md:text-[15px] mt-2 text-justify">
          “Acharya Jagdishji Maharaj is far more than a spiritual mind—he is a
          divine presence whose life is deeply blessed by{" "}
          <strong>Maa Gange</strong> and
          <strong> Lord Krishna</strong>. With profound humility, unwavering
          devotion, and a heart committed to the upliftment of humanity, he has
          dedicated his entire journey to spreading the eternal wisdom of
          Dharma. Recognized as a distinguished Philosopher, a powerful and
          transformative Bhagwat Kathavachak, and a steadfast practitioner of
          Yoga & Meditation, Acharyaji continues to inspire thousands across the
          nation. His teachings blend compassion with knowledge, tradition with
          modern understanding, and spirituality with practical guidance.
          Through his seva, discourses, and divine mission to restore purity to
          Maa Ganga, he has emerged as a guiding light who nurtures faith,
          strengthens cultural values, and enriches the spiritual fabric of
          society.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2  py-4">
          {/* CARD 1 */}
          <div className="bg-white shadow-md rounded-xl p-5 flex flex-col md:flex-col items-center gap-4">
            <img
              src="/about/jagdishji.jpg"
              alt="Acharya Ji"
              className="w-32 h-32 object-cover rounded-lg"
            />

            <div>
              <h2 className="text-sm md:text-[15px] font-medium text-center text-gray-900">
                ACHARYA SHRI JAGDISHJI MAHARAJ
              </h2>
              <p className="text-[#DF562C] text-sm font-medium text-center">
                Founder of Namo Gange Trust
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-1 line-clamp-4 text-justify">
                The founder of Namo Gange Trust Acharya Shri Jagdishji Maharaj
                is a very renowned Shrimad Bhagwat Katha Vachak and practitioner
                of Yoga & Meditation. He has travelled extensively across India
                and the world spreading the message of Lord Krishna.
              </p>
            </div>
            {/* BUTTON BOTTOM-RIGHT */}
            <div className="w-full flex justify-end">
              <button
                className="rounded px-6 py-1 md:py-1.5 text-xs md:text-sm text-white font-normal 
       shadow-md bg-[#0C55A0] cursor-pointer
       hover:bg-sky-700 hover:shadow-lg transition-all duration-300"
              >
                Learn More...
              </button>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white shadow-md rounded-xl p-5 flex flex-col md:flex-col items-center gap-4">
            <img
              src="/about/jagdishji.jpg"
              alt="Spiritual Guru"
              className="w-32 h-32 object-cover rounded-lg"
            />

            <div>
              <h2 className="text-sm md:text-[15px] font-medium text-center text-gray-900">
                SPIRITUAL GUIDANCE & SEWA
              </h2>
              <p className="text-[#DF562C] text-sm font-medium text-center">
                Dedicated to Social & Cultural Service
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-1 line-clamp-4 text-justify">
                Acharya Ji has devoted his life to spiritual awakening, cultural
                upliftment, environmental harmony and guiding people toward the
                path of peace, purity and compassion through divine teachings.
              </p>
            </div>
            {/* BUTTON BOTTOM-RIGHT */}
            <div className="w-full flex justify-end">
              <button
                className="rounded px-6 py-1 md:py-1.5 text-xs md:text-sm text-white font-normal 
       shadow-md bg-[#0C55A0] cursor-pointer
       hover:bg-sky-700 hover:shadow-lg transition-all duration-300"
              >
                Learn More...
              </button>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-white shadow-md rounded-xl p-5 flex flex-col md:flex-col items-center gap-4">
            <img
              src="/about/jagdishji.jpg"
              alt="Mission & Vision"
              className="w-32 h-32 object-cover rounded-lg"
            />

            <div>
              <h2 className="text-sm md:text-[15px] font-medium text-center text-gray-900">
                MISSION & VISION
              </h2>
              <p className="text-[#DF562C] text-sm font-medium text-center">
                Spreading Global Spiritual Awareness
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-1 line-clamp-4 text-justify">
                His mission revolves around promoting spirituality, preserving
                Sanatan culture, restoring the purity of Maa Ganga and inspiring
                millions worldwide through Shrimad Bhagwat Katha and Yoga.
              </p>
            </div>
            {/* BUTTON BOTTOM-RIGHT */}
            <div className="w-full flex justify-end">
              <button
                className="rounded px-6 py-1 md:py-1.5 text-xs md:text-sm text-white font-normal 
       shadow-md bg-[#0C55A0] cursor-pointer
       hover:bg-sky-700 hover:shadow-lg transition-all duration-300"
              >
                Learn More...
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBodies;
