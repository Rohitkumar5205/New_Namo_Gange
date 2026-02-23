"use client";

import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import axiosClient from "@/lib/axiosClient";

interface Banner {
  image: string;
  title: string;
  link: string;
}

const HomeSlider = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<any>(null);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const res = await axiosClient.get("/banner");
        const bannersList = res?.data?.data || [];

        const activeBanners = bannersList.filter(
          (b: any) => b.status === "Active",
        );

        const formatted = activeBanners.map((b: any) => ({
          image: b.image,
          title: b.title,
          link: b.link,
        }));

        setBanners(formatted);
      } catch (error) {
        console.error("Slider API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderImages();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 800,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <div className="relative w-full">
      {/* ================= SLIDER ================= */}
      <div className="relative w-full overflow-hidden z-0">
        {loading ? (
          <div className="flex items-center justify-center w-full h-[190px] md:h-[530px] bg-gray-100">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-[#DF562C] rounded-full animate-spin" />
          </div>
        ) : (
          <Slider ref={sliderRef} {...settings}>
            {banners.map((item, i) => (
              <div key={i}>
                <div className="relative w-full h-[190px] md:h-[530px]">
                  <Link
                    href={item.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                  >
                    <Image
                      src={item.image}
                      alt={`slide-${i}`}
                      fill
                      priority
                      sizes="100vw"
                      className="object-cover"
                    />
                  </Link>
                </div>
              </div>
            ))}

            {banners.length === 0 && (
              <div className="flex items-center justify-center w-full h-[190px] md:h-[530px]">
                <p className="text-gray-500">No active banners found</p>
              </div>
            )}
          </Slider>
        )}
      </div>

      {/* ================= GLASS INFO CARDS ================= */}
      <div className="relative -mt-1 md:-mt-14 left-1/2 -translate-x-1/2 w-full px-2 md:px-12 z-30">
        <div
          className="
            grid grid-cols-1 md:grid-cols-3
            rounded-md
            overflow-hidden
            bg-[#DF562C]/70
            shadow-md
            border border-white/30
            text-gray-900
          "
        >
          {/* CSR HEADS */}
          <div className="px-4 py-1 md:px-6 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="flex gap-4 items-start">
              <div className="text-2xl md:text-3xl">🤝</div>
              <div>
                <h3 className="font-semibold text-[13px] md:text-[15px] uppercase tracking-wide">
                  For CSR Heads
                </h3>
                <p className="text-xs md:text-sm text-medium text-white">
                  Join us to work with trusted NGOs and experienced CSR leaders
                  across India to ensure transparent governance and maximum
                  social impact.
                </p>
              </div>
            </div>
          </div>

          {/* NGOs */}
          <div className="px-4 py-1 md:px-6 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="flex gap-4 items-start">
              <div className="text-2xl md:text-3xl">💼</div>
              <div>
                <h3 className="font-semibold text-[13px] md:text-[15px] uppercase tracking-wide">
                  For NGOs
                </h3>
                <p className="text-xs md:text-sm text-white">
                  Register with us to enhance capacity, receive fundraising
                  support, and access professional expertise at minimal cost.
                </p>
              </div>
            </div>
          </div>

          {/* DONORS */}
          <div className="px-4 py-1 md:px-6">
            <div className="flex gap-4 items-start">
              <div className="text-2xl md:text-3xl">🌍</div>
              <div>
                <h3 className="font-semibold text-[13px] md:text-[15px] uppercase tracking-wide">
                  For Donors & Volunteers
                </h3>
                <p className="text-xs md:text-sm text-white">
                  Contribute your time or resources through #OneDayForFuture and
                  support verified NGOs working toward a sustainable world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
