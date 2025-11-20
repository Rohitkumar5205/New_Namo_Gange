import Link from "next/link";
import React from "react";

function AboutJoin() {
  return (
    <div className="w-full bg-white rounded-2xl p-10 flex flex-col items-center text-center shadow-md">
      {/* <h2 className="text-3xl font-semibold mb-4">
        ॐ Join Us in This Sacred Yatra ॐ
      </h2> */}
      <span className="text-sm md:text-base lg:text-lg font-medium mb-4 bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
        ॐ Join Us in This Sacred Yatra ॐ
      </span>
      <p className="text-sm md:text-[15px] lg:text-[15px] max-w-3xl leading-relaxed mb-4">
        Become a part of <span className="font-medium">Namo Gange</span> and
        walk the path of
        <span className="font-medium"> selfless service</span>. Every act of
        giving creates a ripple in the ocean of change.
      </p>

      <p className=" text-sm md:text-[15px] lg:text-[15px] mb-6">
        Protect Gaumata. Feed the Needy. Spread Vedic Wisdom. Serve Humanity.
      </p>

      <Link href="/joinAsVolunteer">
        <button
          className="relative overflow-hidden group border border-[#DF562C] text-[#DF562C] 
             font-medium text-sm sm:text-base px-6 sm:px-8 py-1.5 sm:py-1
             shadow-md transition-all duration-500"
        >
          {/* Button Text */}
          <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
            Join Us
          </span>

          {/* Hover Fill Animation */}
          <span
            className="absolute inset-0 bg-[#DF562C] translate-x-[-100%] 
               group-hover:translate-x-0 
               transition-transform duration-700 ease-in-out "
          ></span>
        </button>
      </Link>
    </div>
  );
}

export default AboutJoin;
