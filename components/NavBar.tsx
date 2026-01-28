"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Home,
  X,
} from "lucide-react";
import logo from "@/public/logo.png";
import { useRouter } from "next/navigation";
import axiosClient from "@/lib/axiosClient";

/* ================= TYPES ================= */
interface DropdownItem {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

/* ================= STATIC NAV ITEMS ================= */
const NAV_ITEMS: NavItem[] = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/about" },

  {
    label: "OBJECTIVES",
    dropdown: [], // 🔥 API se fill hoga
  },

  { label: "INITIATIVES", href: "/initiatives" },

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

  // 🔥 OBJECTIVES API STATE
  const [objectiveDropdown, setObjectiveDropdown] = useState<DropdownItem[]>([]);

  /* ================= FETCH OBJECTIVES ================= */
  useEffect(() => {
    const fetchObjectives = async () => {
      try {
        const res = await axiosClient.get("/objectives");

        if (res.data && Array.isArray(res.data.data)) {
          const list = res.data.data
            .filter((item: any) => item.status === "Active")
            .map((item: any) => ({
              label: item.title,
              href: `/objectives/${item.slug}`,
            }));

          setObjectiveDropdown(list);
        }
      } catch (error) {
        console.error("❌ Objectives API Error:", error);
      }
    };

    fetchObjectives();
  }, []);

  /* ================= NAVIGATE ================= */
  const handleNavigate = (href: string, label: string) => {
    setActive(label);
    router.push(href);
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  return (
    <>
      {/* ======================= DESKTOP ======================= */}
      <nav className="hidden md:block bg-[#063D8E] text-white shadow">
        <div className="w-full flex items-center justify-between h-11 text-sm px-12 font-normal">
          <div className="flex w-full items-center justify-between">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="relative group">
                {/* MAIN BUTTON */}
                <button
                  onClick={() => {
                    if (item.href) handleNavigate(item.href, item.label);
                    else setActive(item.label);
                  }}
                  className={`flex items-center gap-1 px-2 py-3 transition
                    ${
                      active === item.label
                        ? "bg-[#DF562C] text-white"
                        : "hover:text-gray-200"
                    }`}
                >
                  {item.label === "HOME" && <Home size={16} />}
                  {item.label}
                  {item.dropdown && <ChevronDown size={14} />}
                </button>

                {/* DROPDOWN */}
                {item.dropdown && (
                  <div className="absolute left-0 mt-0 w-50 bg-white text-gray-800 rounded shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    {(item.label === "OBJECTIVES"
                      ? objectiveDropdown
                      : item.dropdown
                    ).map((drop) => (
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

          {/* DONATE BUTTON */}
          <div className="items-center justify-center bg-[#DF562C]">
            <button
              onClick={() => router.push("/donate")}
              className="flex items-center gap-2 px-10 h-11 bg-[#DF562C] text-white text-base font-semibold hover:bg-[#c44b22] transition"
            >
              DONATE <span className="text-lg">🤝🏻</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ======================= MOBILE ======================= */}
      <nav className="md:hidden bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <Image src={logo} width={120} alt="logo" />

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
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <Image src={logo} width={120} alt="logo" />
                <button onClick={() => setMobileOpen(false)}>
                  <X size={32} />
                </button>
              </div>

              {/* MENU */}
              <div className="flex flex-col gap-2 text-[#063D8E] font-medium text-[13px]">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    <button
                      className={`w-full flex items-center justify-between px-4 py-1
                        ${
                          active === item.label
                            ? "bg-[#DF562C] text-white"
                            : ""
                        }`}
                      onClick={() => {
                        if (item.href) handleNavigate(item.href, item.label);
                        if (item.dropdown)
                          setOpenDropdown(
                            openDropdown === item.label ? null : item.label
                          );
                      }}
                    >
                      <span className="flex items-center gap-2">
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
                    {item.dropdown &&
                      openDropdown === item.label &&
                      (item.label === "OBJECTIVES"
                        ? objectiveDropdown
                        : item.dropdown
                      ).map((drop) => (
                        <button
                          key={drop.label}
                          onClick={() =>
                            handleNavigate(drop.href, drop.label)
                          }
                          className="ml-6 block text-left py-1 text-[12px] hover:text-[#DF562C]"
                        >
                          {drop.label}
                        </button>
                      ))}
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
