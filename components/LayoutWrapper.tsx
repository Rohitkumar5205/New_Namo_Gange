"use client";
import { useEffect, useState, ReactNode, useRef } from "react";
import Footer from "./Footer";
import TopBar from "./TopBar";
import NavBar from "./NavBar";

interface LayoutWrapperProps {
  children: ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [hideTop, setHideTop] = useState<boolean>(false);
  const [topHeight, setTopHeight] = useState<number>(0);

  const topRef = useRef<HTMLDivElement | null>(null);

  // Get TopBar height dynamically
  useEffect(() => {
    if (topRef.current) {
      setTopHeight(topRef.current.offsetHeight);
    }

    const observer = new ResizeObserver(() => {
      if (topRef.current) {
        setTopHeight(topRef.current.offsetHeight);
      }
    });

    if (topRef.current) observer.observe(topRef.current);

    return () => observer.disconnect();
  }, []);

  // Hide TopBar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setHideTop(y > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ================= FIXED HEADER ================= */}
      <div className="fixed top-0 left-0 w-full z-40">
        {/* ---------- TOPBAR ---------- */}
        <div
          ref={topRef}
          className={`
            w-full bg-white shadow-sm 
            transition-transform duration-300
            ${hideTop ? "-translate-y-full" : "translate-y-0"}
          `}
        >
          <TopBar />
        </div>

        {/* ---------- NAVBAR (ALWAYS BELOW TOPBAR) ---------- */}
        <div
          className={`
            fixed left-0 w-full bg-white shadow-md
            transition-all duration-300
          `}
          style={{
            top: hideTop ? 0 : topHeight, // Dynamic height applied here
          }}
        >
          <NavBar />
        </div>
      </div>

      {/* ================= PAGE CONTENT ================= */}
      <main
        className="flex-1 w-full transition-all duration-300"
        style={{
          paddingTop: topHeight + 42, // TopBar + Navbar
        }}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}
