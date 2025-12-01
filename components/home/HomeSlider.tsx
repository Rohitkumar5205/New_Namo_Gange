"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const sliderImages = [
  "/home/banner1.jpg",
  // "/home/bann2.jpg",
  // "/home/bann3.jpg",
  // "/home/banner2.jpg",
  // "/home/banner3.jpg",
  "/home/b1.jpg",
  // "/home/b2.jpg",
  // "/home/b3.jpg",
  // "/home/b4.jpg",
  "/home/b5.jpg",
  "/home/b6.jpg",
  // "/home/b7.jpg",
];

const HomeSlider = () => {
  const sliderRef = React.useRef<any>(null);
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // custom arrows use karenge
    pauseOnHover: false,
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* LEFT ARROW */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="
          absolute left-3 md:left-6 
          top-1/2 -translate-y-1/2 
          z-20 bg-white 
          w-10 h-10 md:w-12 md:h-12 
          flex items-center justify-center 
          rounded-full shadow 
          hover:scale-110 active:scale-95 
          transition
        "
      >
        <ChevronLeft size={24} className="text-gray-700" />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="
          absolute right-3 md:right-6 
          top-1/2 -translate-y-1/2 
          z-20 bg-white 
          w-10 h-10 md:w-12 md:h-12 
          flex items-center justify-center 
          rounded-full shadow 
          hover:scale-110 active:scale-95
          transition
        "
      >
        <ChevronRight size={24} className="text-gray-700" />
      </button>

      {/* MAIN SLIDER */}
      <Slider ref={sliderRef} {...settings}>
        {sliderImages.map((img, i) => (
          <div key={i}>
            <div className="relative w-full h-[220] md:h-[550px] lg:h-[535px]">
              <Image
                src={img}
                alt={`slide-${i}`}
                fill
                sizes="100vw"
                priority
                className="object-fit"
              />
            </div>
          </div>
        ))}
      </Slider>

      {/* (OPTIONAL) TEXT OVERLAY — uncomment if needed */}
      {/* 
      <div className="absolute right-6 bottom-10 md:right-16 md:bottom-16 z-30 max-w-xl">
        <h2 className="text-white text-xl md:text-4xl font-bold leading-snug drop-shadow-xl">
          WOULD YOU CARE TO SPARE JUST ONE DAY’S WORTH OF{" "}
          <span className="text-yellow-400">EARNING OR TIME</span> AND
          CONTRIBUTE TO SOCIAL IMPACT?
        </h2>
      </div> 
      */}

      {/* ORANGE CARD SECTION BELOW SLIDER */}
      <div className="relative bottom-0 md:bottom-10  left-1/2 -translate-x-1/2 w-full max-w-7xl px-2 md:px-4 z-30">
        <div className="bg-[#DF562C] text-white grid grid-cols-1 md:grid-cols-3  overflow-hidden">
          {/* 1 — CSR HEADS */}
          <div className="px-2 py-2 md:px-4 md:py-4 lg:px-4 lg:py-4 border-b md:border-b-0 md:border-r border-white/40 flex gap-4">
            <div className="text-2xl md:text-4xl lg:text-4xl">🤝</div>
            <div>
              <h3 className="font-medium text-sm  lg:text-lg md:text-lg">
                FOR CSR HEADS
              </h3>
              <p className="text-xs md:text-sm lg:text-sm mt-2 leading-relaxed">
                Join us to work with genuine trusted NGOs and CSR veterans
                across India to ensure maximum impact for your CSR budget.
              </p>
            </div>
          </div>

          {/* 2 — NGOs */}
          <div className="px-2 py-2 md:px-4 md:py-4 lg:px-4 lg:py-4 border-b md:border-b-0 md:border-r border-white/40 flex gap-4">
            <div className="text-2xl md:text-4xl lg:text-4xl">💰</div>
            <div>
              <h3 className="font-medium text-sm  lg:text-lg md:text-lg">
                FOR NGOs
              </h3>
              <p className="text-xs md:text-sm lg:text-sm mt-2 leading-relaxed">
                Register with us to build capacity, fundraising support and
                access to professional experts for almost free.
              </p>
            </div>
          </div>

          {/* 3 — DONORS + VOLUNTEERS */}
          <div className="px-2 py-2 md:px-4 md:py-4 lg:px-4 lg:py-4 flex gap-4">
            <div className="text-2xl md:text-4xl lg:text-4xl">😊</div>
            <div>
              <h3 className="ont-medium text-sm  lg:text-lg md:text-lg">
                FOR DONORS/VOLUNTEERS
              </h3>
              <p className="text-xs md:text-sm lg:text-sm mt-2 leading-relaxed">
                Contribute #OneDayForFuture in donation or your time to support
                NGOs and make the World a sustainable abode for all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
