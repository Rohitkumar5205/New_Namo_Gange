"use client";
import { useEffect, useState, ReactNode, useRef } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import SuperTopBar from "./SuperTopBar";

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [hideTop, setHideTop] = useState(false);
  const [topHeight, setTopHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const topRef = useRef<HTMLDivElement | null>(null);

  /* ================= GET SUPER TOP BAR HEIGHT ================= */
  useEffect(() => {
    if (!topRef.current) return;

    const updateHeight = () => {
      setTopHeight(topRef.current?.offsetHeight || 0);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(topRef.current);

    return () => observer.disconnect();
  }, []);

  /* ================= DETECT MOBILE / TABLET / DESKTOP ================= */
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // < 768px = mobile
      setIsTablet(width >= 768 && width < 1024); // 768px to 1023px = tablet
    };

    handleResize(); // initial
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ================= HIDE TOP BAR ON SCROLL ================= */
  useEffect(() => {
    const handleScroll = () => {
      setHideTop(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ================= SUPER TOP BAR ================= */}
      <div
        ref={topRef}
        className={`
          fixed top-0 left-0 w-full
          z-[100]
          transition-transform duration-300
          ${hideTop ? "-translate-y-full" : "translate-y-0"}
        `}
      >
        <SuperTopBar />
      </div>

      {/* ================= NAVBAR ================= */}
      <div
        className="fixed left-0 w-full z-[50]"
        style={{
          top: hideTop ? 0 : topHeight,
        }}
      >
        <NavBar />
      </div>

      {/* ================= PAGE CONTENT ================= */}
      <main
        className="flex-1 w-full transition-all duration-300"
        style={{
          paddingTop: isMobile
            ? topHeight + 50 // 📱 Mobile
            : isTablet
              ? topHeight + 50 // 📱 Tablet
              : topHeight + 80, // 💻 Desktop
        }}
      >
        {children}
      </main>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
}
