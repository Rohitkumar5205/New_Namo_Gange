import Contact from "@/components/contact/Contact";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/contact.jpg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/30 w-full h-full py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white">
              Connect
            </h2>
            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Connect
            </p>
          </div>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default page;
