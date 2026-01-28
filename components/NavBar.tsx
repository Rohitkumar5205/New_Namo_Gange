"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Home, X } from "lucide-react";
import logo from "@/public/logo.png";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ------------ FIXED INTERFACE ------------
interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

// ------------ FIXED MENU ITEMS ------------
const NAV_ITEMS: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },
  // {
  //   label: "ABOUT US",
  //   dropdown: [
  //     { label: "About Us", href: "/about/aboutUs" },
  //     { label: "Acharya Jagdishji", href: "/about/acharyaJagdishji" },
  //     { label: "Trust Bodies", href: "/about/trustBodies" },
  //   ],
  // },
  {
    label: "OBJECTIVES",
    dropdown: [
      { label: "Health & Wellness", href: "/objectives/health" },
      { label: "Nature & Environment", href: "/objectives/nature" },
      { label: "Culture & Sanskriti", href: "/objectives/culture" },
      { label: "Women & Empowerment", href: "/objectives/women" },
      { label: "Moksha Sewa", href: "/objectives/mokshaSewa" },
    ],
  },
  { label: "INITIATIVES", href: "/initiatives" },
  // {
  //   label: "ACTIVITIES",
  //   dropdown: [
  //     { label: "Our Events", href: "/activities/events" },
  //     { label: "Our Missions", href: "/activities/missions" },
  //   ],
  // },
  {
    label: "EVENTS",
    dropdown: [
      { label: "Upcoming Events", href: "/event/upcoming" },
      { label: "Past Events", href: "/event/past" },
    ],
  },
  {
    label: "COMMUNICATION",
    dropdown: [
      { label: "News Letters", href: "/communication/newsLetter" },
      { label: "Our Blogs", href: "/communication/blog" },
      { label: "Resent Updates", href: "/communication/latestNews" },
    ],
  },
  {
    label: "MEDIA",
    dropdown: [
      { label: "Photos Gallery", href: "/gallery/photos" },
      { label: "Videos Gallery", href: "/gallery/videos" },
    ],
  },
  { label: "SUPPORT", href: "/support" },
  { label: "CAREER", href: "/career" },
  { label: "CONTACT", href: "/contact" },
];

const NavBar: React.FC = () => {
  const router = useRouter();

  const [active, setActive] = useState("HOME");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Navigate + Close Sidebar
  const handleNavigate = (href: string, label: string) => {
    setActive(label);
    router.push(href);
    setMobileOpen(false); // close sidebar
  };

  return (
    <>
      {/* ======================= DESKTOP ======================= */}
      <nav className="hidden md:block bg-[#063D8E] text-white shadow">
        <div className="w-full flex items-center justify-between h-11 text-sm px-12 font-normal">
          <div className="flex w-full items-center justify-between">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative group ">
                {/* MAIN DESKTOP BUTTON */}
                <button
                  onClick={() => {
                    if (item.href) handleNavigate(item.href, item.label);
                    else setActive(item.label);
                  }}
                  className={`
                  flex items-center gap-1 px-2 py-3 transition
                  ${
                    active === item.label
                      ? "bg-[#DF562C] text-white"
                      : "hover:text-gray-200"
                  }
                `}
                >
                  {item.label === "HOME" && <Home size={16} />}
                  {item.label}
                  {item.dropdown && <ChevronDown size={14} />}
                </button>

                {/* DESKTOP DROPDOWN */}
                {item.dropdown && (
                  <div className="absolute left-0 mt-0 w-50 bg-white text-gray-800 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    {item.dropdown.map((drop) => (
                      <button
                        key={drop.label}
                        onClick={() => handleNavigate(drop.href, drop.label)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 hover:rounded"
                      >
                        {drop.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="items-center justify-center bg-[#DF562C]">
            <button
              onClick={() => router.push("/donate")}
              className="flex items-center gap-2 px-10 h-11 bg-[#DF562C] text-white text-base font-semibold hover:bg-[#c44b22] transition rounded-none "
            >
              DONATE
              <span className="text-white text-lg">🤝🏻</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ======================= MOBILE ======================= */}
      <nav className="md:hidden bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <Image src={logo} width={120} alt="logo" />

          {/* HAMBURGER */}
          <button onClick={() => setMobileOpen(true)}>
            <div className="space-y-1.5">
              <span className="block w-7 h-1 bg-black"></span>
              <span className="block w-7 h-1 bg-black"></span>
              <span className="block w-7 h-1 bg-black"></span>
            </div>
          </button>
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 bg-black/40 z-50">
            <div className="w-[80%] bg-white h-full shadow-lg p-5 overflow-y-auto">
              {/* TOP BAR */}
              <div className="flex justify-between items-center mb-4">
                <Image src={logo} width={120} alt="logo" />
                <button onClick={() => setMobileOpen(false)}>
                  <X size={32} />
                </button>
              </div>

              {/* MENU LIST */}
              <div className="flex flex-col gap-2 text-[#063D8E] font-medium text-[13px]">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    <button
                      className={`
                        w-full flex items-center justify-between px-4 py-1
                        ${
                          active === item.label ? "bg-[#DF562C] text-white" : ""
                        }
                      `}
                      onClick={() => {
                        if (item.href) handleNavigate(item.href, item.label);
                        if (item.dropdown)
                          setOpenDropdown(
                            openDropdown === item.label ? null : item.label
                          );
                      }}
                    >
                      <span className="flex  items-center gap-2">
                        {item.label === "HOME" && <Home size={16} />}
                        {item.label}
                      </span>

                      {item.dropdown &&
                        (openDropdown === item.label ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        ))}
                    </button>

                    {/* MOBILE DROPDOWN */}
                    {item.dropdown && openDropdown === item.label && (
                      <div className="ml-6 flex flex-col gap-1 mt-1 font-normal text-[12px] text-[#063D8E]">
                        {item.dropdown.map((drop) => (
                          <button
                            key={drop.label}
                            onClick={() =>
                              handleNavigate(drop.href, drop.label)
                            }
                            className="text-left py-1 hover:text-[#DF562C]"
                          >
                            {drop.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
