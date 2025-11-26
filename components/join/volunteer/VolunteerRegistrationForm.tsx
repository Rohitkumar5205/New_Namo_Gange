import React from "react";
import { User, Phone, Mail, Calendar, MapPin } from "lucide-react";

const VolunteerRegistrationForm = () => {
  return (
    // Outer container for layout: Stacked on Mobile, 4/5 + 1/5 on Desktop
    <div className="w-full flex flex-col md:flex-row gap-6 p-4 md:p-8 max-w-8xl mx-auto">
      {/* ================= 1. FORM SECTION (80% on Desktop) ================= */}
      <div className="w-full md:w-[75%] bg-white p-6 rounded-lg shadow-lg order-2 md:order-1">
        <h2 className="text-xl font-medium text-gray-800 mb-4">
          Volunteer Registration Form
        </h2>

        <form className="space-y-4">
          {" "}
          <div className="mb-3">
            <p className="text-gray-700 text-sm leading-relaxed">
              <span className="font-semibold text-[#DF562C]">
                Namo Gange Trust
              </span>{" "}
              is looking for volunteers to support with
              <strong>
                {" "}
                Campaigning, Fundraising, Marketing and Social Media Attention.
              </strong>
              Register yourself below and we will contact you soon.
            </p>
          </div>
          {/* ---------------- VOLUNTEER TYPE ---------------- */}
          <div>
            <h3 className="font-medium text-sm text-gray-700 mb-2">
              Volunteer Types <span className="text-red-500">*</span>
            </h3>
            <div className="flex gap-8 md:gap-16">
              <label className="flex text-sm items-center gap-2">
                <input
                  type="radio"
                  name="vtype"
                  className="accent-[#DF562C]"
                  defaultChecked
                />
                Individual
              </label>

              <label className="flex text-sm items-center gap-2">
                <input type="radio" name="vtype" className="accent-[#DF562C]" />
                Groups
              </label>
            </div>
          </div>
          {/* ---------------- NAME FIELDS ---------------- */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-normal">
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] transition-colors">
                <User size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="
                    w-full px-2 py-1.5 text-sm outline-none 
                    placeholder:text-gray-500
                  "
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-normal">
                Last Name <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] transition-colors">
                <User size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="
                    w-full px-2 py-1.5 text-sm outline-none
                    placeholder:text-gray-500
                  "
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-normal">
                Mobile No. <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] transition-colors">
                <Phone size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Enter 10-digit mobile number"
                  className="w-full px-2 py-1.5 text-sm outline-none"
                  maxLength={10}
                  required
                />
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-normal">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] transition-colors">
                <Mail size={18} className="text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-2 py-1.5 text-sm outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-normal">
                Address <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] transition-colors">
                <MapPin size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Enter your complete address"
                  className="w-full px-2 py-1.5 text-sm outline-none"
                  required
                />
              </div>
            </div>
          </div>
          {/* ---------------- COUNTRY / STATE / CITY ---------------- */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-normal">
                Country <span className="text-red-500">*</span>
              </label>
              <select className="border px-2 py-1.5 text-sm w-full mt-1 focus:border-[#DF562C] focus:ring-[#DF562C] outline-none">
                <option value="">Select your country</option>
                {/* Add country options here */}
              </select>
            </div>

            <div>
              <label className="text-sm font-normal">
                State <span className="text-red-500">*</span>
              </label>
              <select className="border px-2 py-1.5 text-sm w-full mt-1 focus:border-[#DF562C] focus:ring-[#DF562C] outline-none">
                <option value="">Select your state</option>
                {/* Add state options here */}
              </select>
            </div>

            <div>
              <label className="text-sm font-normal">
                City <span className="text-red-500">*</span>
              </label>
              <select className="border px-2 py-1.5 text-sm w-full mt-1 focus:border-[#DF562C] focus:ring-[#DF562C] outline-none">
                <option value="">Select your city</option>
                {/* Add city options here */}
              </select>
            </div>
          </div>
          {/* ---------------- PINCODE + DOB + GENDER ---------------- */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-normal">
                Pin Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter pin code"
                className="border px-2 py-1.5 text-sm w-full mt-1 focus:border-[#DF562C] outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-normal">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] transition-colors">
                <Calendar size={18} className="text-gray-500" />
                <input
                  type="date"
                  className="w-full px-2 py-1.5 text-sm outline-none text-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-normal">
                Gender <span className="text-red-500">*</span>
              </label>
              <select className="border px-2 py-1.5 text-sm w-full mt-1 focus:border-[#DF562C] focus:ring-[#DF562C] outline-none">
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          {/* ---------------- OBJECTIVES ---------------- */}
          <div>
            <h3 className="font-medium text-[15px] mb-1">
              In which of our objectives you'd like to work?{" "}
              <span className="text-red-500">*</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 text-sm gap-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#DF562C]" /> Health &
                Wellness
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#DF562C]" /> Woman
                Empowerment
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#DF562C]" /> Nature &
                Environment
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#DF562C]" /> Kala
                Sanskriti
              </label>
            </div>
          </div>
          {/* ---------------- SPECIAL SKILL ---------------- */}
          <div>
            <label className="font-medium text-[15px]">
              Special Skill (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Mention any special skill you have..."
              className="border text-sm p-3 w-full mt-1 focus:border-[#DF562C] outline-none"
            />
          </div>
          {/* ---------------- CONTRIBUTION AREA ---------------- */}
          <div>
            <h3 className="font-normal text-[15px] mb-1">
              Which of the following areas would you like to contribute?{" "}
              <span className="text-red-500">*</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 text-sm gap-2 mt-1">
              {/* Added flex items-center gap-2 for better alignment */}
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#DF562C]" /> Health
                Camp
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#DF562C]" />{" "}
                Organizational Networking
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#DF562C]" /> Fund
                Raising
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#DF562C]" /> Campaign
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#DF562C]" />{" "}
                Organisational Surveys
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#DF562C]" /> Graphic
                Design
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#DF562C]" /> Event
                Management
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#DF562C]" /> Media
                Management
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#DF562C]" /> Social
                Media/Blogging
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#DF562C]" /> Research
                Support
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#DF562C]" /> Add
                Volunteer Networking
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#DF562C]" /> Others
              </label>
            </div>
          </div>
          {/* ---------------- WORK DAYS ---------------- */}
          <div>
            <h3 className="font-normal text-[15px] mb-1">
              How many days can you work with us in a week?{" "}
              <span className="text-red-500">*</span>
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 text-sm gap-2 mt-1">
              <label className="flex items-center gap-2">
                <input type="radio" name="days" className="accent-[#DF562C]" />{" "}
                01 Day
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="days" className="accent-[#DF562C]" />{" "}
                02 Days
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="days" className="accent-[#DF562C]" />{" "}
                03 Days
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="days" className="accent-[#DF562C]" />{" "}
                04 Days
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="days" className="accent-[#DF562C]" />{" "}
                05 Days
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="days" className="accent-[#DF562C]" />{" "}
                Only Weekends
              </label>
            </div>
          </div>
          {/* ---------------- KNOW ABOUT US ---------------- */}
          <div>
            <h3 className="font-normal text-[15px] mb-1">
              How did you come to know about us?{" "}
              <span className="text-red-500">*</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 text-sm gap-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="know" className="accent-[#DF562C]" />{" "}
                Namo Gange Trust Website
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="know" className="accent-[#DF562C]" />{" "}
                Email Referral
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="know" className="accent-[#DF562C]" />{" "}
                Staff Volunteer Reference
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="know" className="accent-[#DF562C]" />{" "}
                Advertisements
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="know" className="accent-[#DF562C]" />{" "}
                Through Events
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="know" className="accent-[#DF562C]" />{" "}
                Social Media (Facebook etc.)
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="know" className="accent-[#DF562C]" />{" "}
                Others
              </label>
            </div>
          </div>
          {/* ---------------- COMMENTS ---------------- */}
          <div>
            <label className="font-normal text-[15px]">
              Message or Comments <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              placeholder="Write your comments or message here..."
              className="border w-full p-3 mt-1 focus:border-[#DF562C] outline-none"
            />
          </div>
          {/* ---------------- CAPTCHA ---------------- */}
          <div>
            <h3 className="font-normal text-[15px]">Complete reCAPTCHA</h3>

            <div className="border p-2 w-64 bg-gray-50 mt-1">
              <input
                type="checkbox"
                className="mr-2 accent-[#DF562C] text-base text-normal"
              />{" "}
              I'm not a robot
            </div>
          </div>
          {/* ---------------- BUTTONS ---------------- */}
          <div className="flex gap-4 pt-2">
            {" "}
            {/* Added pt-4 for spacing above buttons */}
            <button className="bg-[#063D8E] border border-[#063D8E] hover:bg-sky-600 text-white px-6 py-1.5 text-base font-normal  transition-colors">
              Register Now
            </button>
            <button
              type="button"
              className="px-6 py-1.5 font-normal border border-[#DF562C] bg-[#DF562C] hover:bg-red-600 text-white text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* ================= 2. DATA/SIDEBAR SECTION (20% on Desktop) ================= */}
      <div className="w-full md:w-[25%] space-y-6 order-1 md:order-2  self-start sticky top-4">
        {/* NEED HELP BOX */}
        <div className="bg-white shadow-md shadow-lg rounded p-5 text-center">
          <div className="flex justify-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-14 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 18v.01M8 21h8a2 2 0 002-2v-6a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2zM15 3H9a2 2 0 00-2 2v1h10V5a2 2 0 00-2-2z"
              />
            </svg>
          </div>

          <h4 className="font-semibold text-gray-800 mb-2">Need Help?</h4>

          <p className="text-sm text-gray-600 leading-relaxed">
            We would be more than happy to help you. Our team advisor is **24/7
            at your service** to help you.
          </p>

          <p className="text-sm text-[#DF562C] mt-2 font-semibold">
            info@namogange.org
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Monday to Friday 9:00am - 7:30pm
          </p>
        </div>

        {/* VOLUNTEER CTA */}
        <div className="bg-[#2d70c8] rounded shadow-md p-5 text-center text-white">
          <div className="flex justify-center mb-3">
            <img
              src="/home/volunteer-icons.png"
              alt="volunteer"
              className="w-40 h-42"
            />
          </div>

          <h4 className="text-lg font-semibold">Become a Volunteer</h4>

          <p className="text-sm leading-relaxed mt-2 text-blue-100">
            Join <span className="font-semibold">Namo Gange Mission</span>
            to serve the nation with pride and dignity.
          </p>

          <button className="mt-4 bg-white text-[#2d70c8] font-semibold px-4 py-1 text-sm rounded hover:bg-gray-100">
            APPLY NOW
          </button>
        </div>

        {/* FACEBOOK PAGE EMBED */}
        <div className="bg-white rounded shadow-md p-3">
          <div
            className="fb-page"
            data-href="https://www.facebook.com/NamoGangeTrust"
            data-tabs="timeline"
            data-width="250"
            data-height="380"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true"
          >
            <blockquote
              cite="https://www.facebook.com/NamoGangeTrust"
              className="fb-xfbml-parse-ignore"
            >
              <a href="https://www.facebook.com/NamoGangeTrust">
                Namo Gange Trust
              </a>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerRegistrationForm;
