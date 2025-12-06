"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axiosClient from "@/lib/axiosClient";
import Link from "next/link";

interface Banner {
  image: string;
  title: string;
  link: string;
}

const HomeSlider = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const res = await axiosClient.get("/banner");

        console.log("🔥 Full API Response:", res.data);

        const activeBanners = res.data?.banners?.filter(
          (b: any) => b.status === "Active"
        );

        const formatted = activeBanners?.map((b: any) => ({
          image: b.image,
          title: b.title,
          link: b.link,
        }));

        console.log("🖼 Final Banner List:", formatted);

        if (Array.isArray(formatted) && formatted.length > 0) {
          setBanners(formatted);
        }
      } catch (error) {
        console.error("❌ Slider API Error:", error);
      }
    };

    fetchSliderImages();
  }, []);

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
        {banners.map((item, i) => (
          <div key={i}>
            <div className="relative w-full h-[220px] md:h-[550px] lg:h-[535px]">
              <Image
                src={item.image}
                alt={`slide-${i}`}
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />

              {/* TITLE OVERLAY — per slide */}
              <div className="absolute bottom-40 right-6 md:right-20 z-30 flex flex-col gap-3 max-w-xl">
                {/* Title */}
                <h2 className="text-white text-lg md:text-3xl font-bold leading-snug drop-shadow-xl">
                  {item.title}
                </h2>

                {/* Donate Button */}
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
    inline-block
    px-5 py-1 md:px-6 md:py-1.5
    text-sm md:text-base 
    font-semibold 
    text-white 
    bg-[#DF562C] 
    rounded
    shadow-md 
    hover:bg-orange-600 
    hover:shadow-lg 
    transition-all 
    duration-300
  "
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* (OPTIONAL) TEXT OVERLAY — uncomment if needed */}

      {/* <div className="absolute right-5 top-30 md:right-16 md:bottom-16 z-30 max-w-xl">
        <h2 className="text-white text-xl md:text-3xl font-bold leading-snug drop-shadow-xl">
          WOULD YOU CARE TO SPARE JUST ONE DAY’S WORTH OF{" "}
          <span className="text-yellow-400">EARNING OR TIME</span> AND
          CONTRIBUTE TO SOCIAL IMPACT?
        </h2>
      </div> */}

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
