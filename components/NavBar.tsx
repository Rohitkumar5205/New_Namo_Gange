"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import logo from "@/public/logo.png";
import { useRouter, usePathname } from "next/navigation";
import axiosClient from "@/lib/axiosClient";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import SpeakerButton from "./SpeakerButton";

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
  { label: "OBJECTIVES", dropdown: [] },
  { label: "INITIATIVES", href: "/initiatives" },
  {
    label: "EVENTS",
    dropdown: [
      { label: "Upcoming Events", href: "/event/upcoming" },
      { label: "Past Events", href: "/event/past" },
    ],
  },
  {
    label: "UPDATES",
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
  const pathname = usePathname();

  const [active, setActive] = useState("HOME");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [objectiveDropdown, setObjectiveDropdown] = useState<DropdownItem[]>(
    [],
  );

  /* ================= FETCH OBJECTIVES ================= */
  useEffect(() => {
    const fetchObjectives = async () => {
      try {
        const res = await axiosClient.get("/objectives");
        if (Array.isArray(res.data?.data)) {
          setObjectiveDropdown(
            res.data.data
              .filter((i: any) => i.status === "Active")
              .map((i: any) => ({
                label: i.title,
                href: `/objectives/${i.slug}`,
              })),
          );
        }
      } catch (e) {
        console.error("Objectives API error", e);
      }
    };
    fetchObjectives();
  }, []);

  /* ================= SYNC ACTIVE STATE WITH URL ================= */
  useEffect(() => {
    const findActiveItem = () => {
      if (pathname === "/") {
        return "HOME";
      }

      // Reverse to check deeper paths first (e.g., /event/upcoming before /event)
      for (const item of [...NAV_ITEMS].reverse()) {
        const itemsToCheck =
          item.label === "OBJECTIVES" ? objectiveDropdown : item.dropdown;

        if (
          itemsToCheck &&
          itemsToCheck.some((d) => pathname.startsWith(d.href))
        ) {
          return item.label;
        }

        if (item.href && pathname.startsWith(item.href)) {
          return item.label;
        }
      }
      return null;
    };

    const activeLabel = findActiveItem();
    if (activeLabel) setActive(activeLabel);
  }, [pathname, objectiveDropdown]);

  /* ================= NAVIGATE ================= */
  const handleNavigate = (href: string, label: string) => {
    setActive(label);
    router.push(href);
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <nav className="hidden md:block bg-white shadow-sm">
        <div className="w-full px-10">
          <div className="flex items-center justify-between h-20 text-sm font-medium">
            {/* LOGO */}
            <Link
              href="/"
              onClick={() => {
                setActive("HOME");
                setMobileOpen(false);
                setOpenDropdown(null);
              }}
            >
              <Image src={logo} alt="Namo Gange" width={170} priority />
            </Link>

            {/* MENU */}
            <div className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative group">
                  {/* PARENT BUTTON */}
                  <button
                    onClick={() => {
                      if (item.href) {
                        handleNavigate(item.href, item.label);
                      }
                      // ❌ dropdown parent ko active nahi banate
                    }}
                    className={`flex items-center gap-1 py-2 transition-all
                      ${
                        active === item.label
                          ? "text-[#DF562C] font-semibold border-b-2 border-[#DF562C]"
                          : "text-gray-700 hover:text-[#DF562C]"
                      }`}
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown size={14} />}
                  </button>

                  {/* DROPDOWN */}
                  {item.dropdown && (
                    <div className="absolute left-0 top-full mt-3 min-w-[220px] bg-white rounded-md shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                      {(item.label === "OBJECTIVES"
                        ? objectiveDropdown
                        : item.dropdown
                      ).map((drop) => (
                        <button
                          key={drop.label}
                          onClick={() => {
                            setActive(item.label); // ✅ parent active only after select
                            handleNavigate(drop.href, item.label);
                          }}
                          className="w-full text-left px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#DF562C]"
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
      </nav>

      {/* ================= MOBILE ================= */}
      <nav className="md:hidden bg-white shadow-sm">
        <div className="flex items-center justify-between px-2 py-1">
          <Image src={logo} width={100} alt="logo" />
          <SpeakerButton />
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 transition"
            aria-label="Open menu"
          >
            <FaBars size={22} className="text-gray-700" />
          </button>
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 bg-black/40 z-50">
            <div className="w-[80%] bg-white h-full px-4 py-1 overflow-y-auto">
              <div className="flex justify-between items-center  mb-2">
                <Image src={logo} width={100} alt="logo" />
                <button onClick={() => setMobileOpen(false)}>
                  <X size={22} />
                </button>
              </div>

              <div className="flex flex-col gap-2 text-[#063D8E] border-t border-gray-300 font-medium text-[13px]">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    <button
                      className={`w-full flex items-center justify-between px-4 py-1 ${
                        active === item.label
                          ? "bg-[#DF562C] text-white rounded"
                          : ""
                      }`}
                      onClick={() => {
                        if (item.href) handleNavigate(item.href, item.label);
                        if (item.dropdown)
                          setOpenDropdown(
                            openDropdown === item.label ? null : item.label,
                          );
                      }}
                    >
                      {item.label}
                      {item.dropdown &&
                        (openDropdown === item.label ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        ))}
                    </button>

                    {item.dropdown &&
                      openDropdown === item.label &&
                      (item.label === "OBJECTIVES"
                        ? objectiveDropdown
                        : item.dropdown
                      ).map((drop) => (
                        <button
                          key={drop.label}
                          onClick={() => {
                            setActive(item.label);
                            handleNavigate(drop.href, item.label);
                          }}
                          className="ml-6 block text-left py-1 text-[12px] hover:text-[#DF562C]"
                        >
                          {drop.label}
                        </button>
                      ))}
                  </div>
                ))}
                <div className="py-2 border-t border-gray-200 pt-2 flex flex-col gap-4 text-sm">
                  {/* Donate */}
                  <button
                    onClick={() => handleNavigate("/donate", "DONATE")}
                    className="
    w-full bg-[#DF562C] text-white py-1
    rounded font-semibold tracking-wide
    shadow-sm active:scale-[0.98] transition
  "
                  >
                    Donate
                  </button>

                  {/* SEWA */}
                  <div className="border rounded overflow-hidden">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === "SEWA" ? null : "SEWA")
                      }
                      className="
      w-full flex justify-between items-center
      px-4 py-1 font-medium text-gray-800
      bg-gray-50
    "
                    >
                      Sewa
                      {openDropdown === "SEWA" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>

                    {openDropdown === "SEWA" && (
                      <div className="bg-white flex flex-col text-[13px]">
                        <button
                          onClick={() =>
                            handleNavigate("/sewa/ann-sewa", "SEWA")
                          }
                          className="px-6 py-1 text-left hover:bg-gray-100"
                        >
                          Ann Sewa
                        </button>
                        <button
                          onClick={() =>
                            handleNavigate("/sewa/moksha-sewa", "SEWA")
                          }
                          className="px-6 py-1 text-left hover:bg-gray-100"
                        >
                          Moksha Sewa
                        </button>
                      </div>
                    )}
                  </div>

                  {/* JOIN US */}
                  <div className="border rounded overflow-hidden">
                    <button
                      onClick={() =>
                        setOpenDropdown(openDropdown === "JOIN" ? null : "JOIN")
                      }
                      className="
      w-full flex justify-between items-center
      px-4 py-1 font-medium text-gray-800
      bg-gray-50
    "
                    >
                      Join Us
                      {openDropdown === "JOIN" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>

                    {openDropdown === "JOIN" && (
                      <div className="bg-white flex flex-col text-[13px]">
                        <button
                          onClick={() =>
                            handleNavigate("/join/volunteer", "JOIN")
                          }
                          className="px-6 py-1 text-left hover:bg-gray-100"
                        >
                          Join as Volunteer
                        </button>
                        <button
                          onClick={() => handleNavigate("/join/member", "JOIN")}
                          className="px-6 py-1 text-left hover:bg-gray-100"
                        >
                          Become a Member
                        </button>
                      </div>
                    )}
                  </div>

                  {/* LOGIN */}
                  <button
                    onClick={() => handleNavigate("/auth/login", "LOGIN")}
                    className="
    w-full border border-[#DF562C] text-[#DF562C]
    py-1 rounded font-semibold
    hover:bg-[#DF562C] hover:text-white
    transition
  "
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
