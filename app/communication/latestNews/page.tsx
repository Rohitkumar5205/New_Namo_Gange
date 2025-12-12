import LatestNews from "@/components/communication/latestNews/LatestNews";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="">
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/Newsletter.jpg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/30 w-full h-full md:h-[250px] py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
              Latest News
            </h2>
            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Latest News
            </p>
          </div>
        </div>
      </div>
      <LatestNews />
    </div>
  );
};

export default page;
