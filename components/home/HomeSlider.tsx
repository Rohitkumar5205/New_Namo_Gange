"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { apiService } from "@/lib/apiService";

interface Banner {
  image: string;
  title: string;
  link: string;
}

const HomeSlider = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        // const res = await axiosClient.get("/banner");

        // console.log("🔥 Full API Response:", res.data);

        // ✅ SAFELY extract banners array
        // const bannersList = res?.data?.data || [];

        // // ✅ ONLY Active status filter
        // const activeBanners = bannersList.filter(
        //   (b: any) => b.status === "Active"
        // );

        // console.log("✅ Only Active Banners:", activeBanners);

        // // ✅ Format for slider
        // const formatted = activeBanners.map((b: any) => ({
        //   image: b.image,
        //   title: b.title,
        //   link: b.link,
        // }));

        // console.log("🖼 Final Banner List (Formatted):", formatted);

        // setBanners(formatted);
        const bannersData = await apiService.getActiveBanners();
        setBanners(bannersData);
      } catch (error) {
        console.error("❌ Slider API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderImages();
  }, []);

  const sliderRef = React.useRef<any>(null);

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
    <div className="relative w-full overflow-hidden">
      {/* MAIN SLIDER */}
      {loading ? (
        <div className="relative flex items-center justify-center w-full h-[220px] md:h-[515px] bg-gray-100">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#DF562C] rounded-full animate-spin"></div>
        </div>
      ) : (
        <Slider ref={sliderRef} {...settings}>
          {banners.map((item, i) => (
            <div key={i}>
              <div className="relative w-full h-[220px] md:h-[515px]">
                {/* IMAGE AS LINK */}
                <Link
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                >
                  <Image
                    src={item.image}
                    alt={`slide-${i}`}
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover cursor-pointer"
                  />
                </Link>

                {/* OPTIONAL OVERLAY CONTENT (TEXT / BUTTON) */}
                {/* If you want only image clickable, keep this minimal */}
                <div className="pointer-events-none absolute bottom-6 right-6 md:right-12 z-20 flex flex-col items-end gap-3 max-w-xl">
                  {/* Example title if needed later */}
                  {/* 
          <h2 className="text-white text-lg md:text-4xl font-medium drop-shadow-xl">
            {item.title}
          </h2> 
          */}
                </div>
              </div>
            </div>
          ))}

          {banners.length === 0 && (
            <div className="relative flex items-center justify-center w-full h-[220px] md:h-[550px]">
              <p className="text-center py-20 text-gray-500 text-sm md:text-base">
                No active banners found
              </p>
            </div>
          )}
        </Slider>
      )}

      {/* ORANGE CARD SECTION BELOW SLIDER */}
      <div className="relative bottom-0 md:bottom-10  left-1/2 -translate-x-1/2 w-full px-2 md:px-12 z-30">
        <div className="bg-[#DF562C] text-white grid grid-cols-1 md:grid-cols-3 rounded-xs overflow-hidden">
          {/* 1 — CSR HEADS */}
          <div className="px-2 py-1 md:px-4 md:py-2 lg:px-4 lg:py-2 border-b md:border-b-0 md:border-r border-white/40 flex gap-4">
            <div className="text-2xl md:text-4xl lg:text-4xl">🤝</div>
            <div>
              <h3 className="font-medium text-sm  lg:text-lg md:text-lg">
                FOR CSR HEADS
              </h3>
              <p className="text-xs md:text-sm lg:text-sm mt-1 leading-relaxed">
                Join us to work with genuine trusted NGOs and CSR veterans
                across India to ensure maximum impact for your CSR budget.
              </p>
            </div>
          </div>

          {/* 2 — NGOs */}
          <div className="px-2 py-1 md:px-4 md:py-2 lg:px-4 lg:py-2 border-b md:border-b-0 md:border-r border-white/40 flex gap-4">
            <div className="text-2xl md:text-4xl lg:text-4xl">💰</div>
            <div>
              <h3 className="font-medium text-sm  lg:text-lg md:text-lg">
                FOR NGOs
              </h3>
              <p className="text-xs md:text-sm lg:text-sm mt-1 leading-relaxed">
                Register with us to build capacity, fundraising support and
                access to professional experts for almost free.
              </p>
            </div>
          </div>

          {/* 3 — DONORS + VOLUNTEERS */}
          <div className="px-2 py-1 md:px-4 md:py-2 lg:px-4 lg:py-2 flex gap-4">
            <div className="text-2xl md:text-4xl lg:text-4xl">😊</div>
            <div>
              <h3 className="ont-medium text-sm  lg:text-lg md:text-lg">
                FOR DONORS/VOLUNTEERS
              </h3>
              <p className="text-xs md:text-sm lg:text-sm mt-1 leading-relaxed">
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
