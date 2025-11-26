"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Portal from "./Portal";

// हम एक टाइमर वेरिएबल को बाहर रखते हैं ताकि उसे दोनों फंक्शन्स में एक्सेस किया जा सके
let closeTimer: NodeJS.Timeout | null = null;

const JoinDropdown: React.FC = () => {
  const [isJoinOpen, setIsJoinOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  // 1. टाइमर को साफ करने के लिए एक फ़ंक्शन
  const clearCloseTimer = () => {
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
  };

  // 2. ड्रॉपडाउन को खोलने/खुला रखने के लिए
  const handleMouseEnter = () => {
    clearCloseTimer(); // यदि बंद होने वाला था, तो टाइमर साफ़ कर दें
    setIsJoinOpen(true);
  };

  // 3. ड्रॉपडाउन को बंद करने के लिए (एक छोटे विलंब के साथ)
  const handleMouseLeave = () => {
    clearCloseTimer(); // सुनिश्चित करें कि कोई पुराना टाइमर न हो
    // 200ms का विलंब देते हैं
    closeTimer = setTimeout(() => {
      setIsJoinOpen(false);
    }, 200);
  };

  // Position calculation (Kept the same)
  useEffect(() => {
    if (isJoinOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 10,
        left: rect.right - 192,
      });
    }

    // कॉम्पोनेंट अनमाउंट होने पर टाइमर को साफ़ करें
    return () => clearCloseTimer();
  }, [isJoinOpen]);

  const toggleOpen = () => setIsJoinOpen(!isJoinOpen);

  return (
    // FIX: onMouseEnter/onMouseLeave को इस बाहरी div पर वापस ले आएं
    <div
      className="relative"
      onMouseEnter={handleMouseEnter} // विलंब अब mouseEnter पर साफ़ हो जाएगा
      onMouseLeave={handleMouseLeave} // mouseLeave पर विलंब से बंद होगा
    >
      {/* Main Button (Trigger) */}
      <button
        ref={btnRef}
        onClick={toggleOpen}
        className="
          flex items-center space-x-1.5 
          px-4 py-2 
          border border-[#DF562C] 
          text-white 
          bg-[#DF562C] 
          hover:bg-[#c94b26] 
          transition 
          shadow-md
      "
      >
        <span className="font-medium text-sm">Join With Us</span>
        <ChevronDown
          size={16}
          className={`transition ${isJoinOpen ? "rotate-180" : "rotate-0"}`}
        />
      </button>

      {/* DROPDOWN RENDERED IN PORTAL */}
      <Portal>
        {isJoinOpen && (
          <div
            // ref: Removed dropdownRef as it's not needed for logic here
            // FIX: Dropdown content onMouseEnter/onMouseLeave लॉजिक को बाहरी div से inherit करेगा
            className="
              fixed 
              w-48 
              bg-white 
              border border-gray-200 
              rounded-md 
              shadow-lg 
              z-[9999] 
          "
            style={{
              top: pos.top,
              left: pos.left,
            }}
          >
            <Link
              href="/join/volunteer"
              className="
                block px-4 py-2 
                text-sm text-gray-700 
                hover:bg-gray-100 
                border-b border-gray-100
              "
              onClick={handleMouseLeave} // Click के बाद mouseLeave लॉजिक चलेगा (जो इसे बंद कर देगा)
            >
              Join as Volunteer
            </Link>
            <Link
              href="/join/member"
              className="
                block px-4 py-2 
                text-sm text-gray-700 
                hover:bg-gray-100
              "
              onClick={handleMouseLeave} // Click के बाद mouseLeave लॉजिक चलेगा
            >
              Become a Member
            </Link>
          </div>
        )}
      </Portal>
    </div>
  );
};

export default JoinDropdown;
