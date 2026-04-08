import React from "react";
import { User, Phone, Mail, Calendar, MapPin } from "lucide-react";
import Image from "next/image";

const VolunteerRegistrationForm = () => {
  return (
    <div className="w-full p-4 md:p-8 max-w-8xl mx-auto">
      <h2 className="text-lg text-center md:text-xl font-medium text-gray-900 mb-2">
        Volunteer Registration
      </h2>

      <div className="flex justify-center w-full mb-2">
        <div
          className="
      w-full 
      py-6
      relative 
      overflow-hidden
      text-center
    "
        >
          {/* Decorative Top Accent Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

          <p className="text-gray-700 text-sm md:text-[15px] leading-relaxed font-normal mb-3">
            Becoming a volunteer is more than just offering your time — it is a
            noble act of compassion, responsibility, and commitment toward
            building a better society. By joining us, you become a part of a
            growing movement dedicated to uplifting communities, supporting
            environmental conservation, promoting health and wellness, and
            spreading awareness on key social issues. Volunteers play a crucial
            role in bridging gaps, extending help to the underprivileged, and
            inspiring positive change. Your contribution, no matter how big or
            small, creates ripples of hope and transformation. Together, we aim
            to nurture a more peaceful, sustainable, and inclusive world where
            every effort counts and every individual matters.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* ================= 1. FORM SECTION (80% on Desktop) ================= */}
        <div className="w-full md:w-[75%] bg-white p-6 rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.1)] order-2 md:order-1">
          <h2 className="text-lg font-normal text-gray-800 mb-4">
            Volunteer Registration Form
          </h2>

          <form className="space-y-2">
            {" "}
            <div className="mb-3">
              <p className="text-gray-700 text-sm leading-relaxed">
                <span className="font-semibold text-[#DF562C]">
                  Namo Gange Trust
                </span>{" "}
                is looking for volunteers to support with
                <strong>
                  {" "}
                  Campaigning, Fundraising, Marketing and Social Media
                  Attention.
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
                  <input
                    type="radio"
                    name="vtype"
                    className="accent-[#DF562C]"
                  />
                  Groups
                </label>
              </div>
            </div>
            {/* ---------------- NAME FIELDS ---------------- */}
            <div className="w-full">
              <h4 className="text-center text-gray-800 text-[15px] font-medium">
                Volunteer Personal Information
              </h4>
              <hr className="w-full border-t-1 border-gray-300 mt-2 mb-3" />
              <div className="grid md:grid-cols-5 gap-4">
                <div className="">
                  <label className="text-sm font-normal">
                    Select Title <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center border px-3 rounded mt-1 focus-within:border-[#DF562C] transition-colors">
                    <select
                      className="w-full px-2 py-1 text-sm outline-none bg-white text-gray-700 "
                      required
                    >
                      <option value="">Select title</option>
                      <option value="mr">Mr.</option>
                      <option value="mrs">Mrs.</option>
                      <option value="miss">Miss</option>
                      <option value="dr">Dr.</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Applicant's Name <span className="text-red-500">*</span>
                  </label>

                  <div className="flex rounded items-center border px-3 mt-1 focus-within:border-[#DF562C] transition-colors">
                    <input
                      type="text"
                      placeholder="Enter applicant's name"
                      className="w-full px-2 py-1 text-sm outline-none placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Surname <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="text"
                      placeholder="Enter Surname"
                      className="w-full px-2 py-1 text-sm outline-none placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Father's Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="text"
                      placeholder="Enter father's name"
                      className="w-full px-2 py-1 text-sm outline-none placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Gender <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <select
                      className="w-full px-2 py-1 text-sm outline-none bg-white text-gray-700"
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Qualification <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="text"
                      placeholder="Enter qualification"
                      className="w-full px-2 py-1 text-sm outline-none placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Occupation <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <select
                      className="w-full px-2 py-1 text-sm outline-none bg-white text-gray-700"
                      required
                    >
                      <option value="">Select occupation</option>
                      <option value="business">Business</option>
                      <option value="job">Job</option>
                      <option value="student">Student</option>
                      <option value="self_employed">Self Employed</option>
                      <option value="unemployed">Unemployed</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Organisation Type <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <select
                      className="w-full px-2 py-1 text-sm outline-none bg-white text-gray-700"
                      required
                    >
                      <option value="">Select organisation type</option>
                      <option value="government">Government</option>
                      <option value="private">Private</option>
                      <option value="ngo">NGO</option>
                      <option value="trust">Trust</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Designation <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <select
                      className="w-full px-2 py-1 text-sm outline-none bg-white text-gray-700"
                      required
                    >
                      <option value="">Select designation</option>
                      <option value="manager">Manager</option>
                      <option value="executive">Executive</option>
                      <option value="director">Director</option>
                      <option value="assistant">Assistant</option>
                      <option value="team_lead">Team Lead</option>
                      <option value="officer">Officer</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="date"
                      className="w-full px-2 py-1 text-sm outline-none text-gray-700"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Mobile No. <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="text"
                      placeholder="Enter 10-digit mobile number"
                      className="w-full px-2 py-1 text-sm outline-none"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">Alternate No.</label>
                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="text"
                      placeholder="Enter 10-digit mobile number"
                      className="w-full px-2 py-1 text-sm outline-none"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-2 py-1 text-sm outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Aadhar / ID Proof No.{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="text"
                      placeholder="Enter Aadhar / ID number"
                      className="w-full px-2 py-1 text-sm outline-none text-gray-700"
                      maxLength={16}
                      required
                    />
                  </div>
                </div>
                <div className="">
                  <label className="text-sm font-normal">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="text"
                      placeholder="Enter your complete address"
                      className="w-full px-2 py-1 text-sm outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select className="border rounded px-2 py-1 text-sm w-full mt-1 focus:border-[#DF562C] focus:ring-[#DF562C] outline-none">
                    <option value="">Select your country</option>
                    {/* Add country options here */}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select className="border rounded px-2 py-1 text-sm w-full mt-1 focus:border-[#DF562C] focus:ring-[#DF562C] outline-none">
                    <option value="">Select your state</option>
                    {/* Add state options here */}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-normal">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select className="border rounded px-2 py-1 text-sm w-full mt-1 focus:border-[#DF562C] focus:ring-[#DF562C] outline-none">
                    <option value="">Select your city</option>
                    {/* Add city options here */}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-normal">
                    Pin Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter pin code"
                    className="border rounded px-2 py-1 text-sm w-full mt-1 focus:border-[#DF562C] outline-none"
                  />
                </div>
              </div>
            </div>
            {/* Emergency Details */}
            <div className="w-full">
              <h4 className="text-center text-gray-800 text-[15px] font-medium">
                Emergency Details
              </h4>
              <hr className="w-full border-t-1 border-gray-300 mt-2 mb-3" />
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="text-sm font-normal">
                    Relation <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="text"
                      placeholder="Enter your relation"
                      className="w-full px-2 py-1 text-sm outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Emergency Contact <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="text"
                      placeholder="Enter 10-digit mobile number"
                      className="w-full px-2 py-1 text-sm outline-none"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Initiatives Of Namo Gange Trust */}
            <div className="w-full">
              <h4 className="text-center text-gray-800 text-[15px] font-medium">
                Initiatives Of Namo Gange Trust
              </h4>

              <hr className="w-full border-t-1 border-gray-300 mt-2 mb-4" />
              <h3 className="font-medium text-sm text-gray-700 mb-2">
                Aviral Ganga <span className="text-red-500">*</span>
              </h3>
              <div className="grid md:grid-cols-4 gap-3 text-sm">
                {/* Radio Options */}
                {[
                  {
                    label: "Meri Beti Mera Abhiman",
                    value: "meri_beti_mera_abhiman",
                  },
                  {
                    label: "Bachchon Ki Rangshala",
                    value: "bachchon_ki_rangshala",
                  },
                  { label: "Ayuryujam", value: "ayuryujam" },
                  {
                    label: "Arogya Film Festival",
                    value: "arogya_film_festival",
                  },
                  {
                    label: "The Grand Master Of Yoga",
                    value: "the_grand_master_of_yoga",
                  },
                  { label: "Arogya Sangoshthi", value: "arogya_sangoshthi" },
                  { label: "The Yogshalajobs.com", value: "the_yogshalajobs" },
                  {
                    label: "Shrimad Bhagwat Katha",
                    value: "shrimad_bhagwat_katha",
                  },
                  {
                    label: "Swachh Bharat Sankalp",
                    value: "swachh_bharat_sankalp",
                  },
                  {
                    label: "Indian Folk & Tribal Art",
                    value: "indian_folk_and_tribal_art",
                  },
                  { label: "Others, if any", value: "others" },
                ].map((item, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      name="initiative"
                      value={item.value}
                      className="accent-[#DF562C]"
                      required
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>
            {/* Area Of Contribution And Support */}
            <div className="w-full">
              <h4 className="text-center text-gray-800 text-[15px] font-medium">
                Area Of Contribution And Support
              </h4>

              <hr className="w-full border-t-1 border-gray-300 mt-2 mb-4" />

              <h3 className="font-medium text-sm text-gray-700 mb-2">
                Volunteering For <span className="text-red-500">*</span>
              </h3>
              <hr className="w-full border-t-1 border-gray-300" />
              <div className="grid md:grid-cols-4 gap-3 text-sm mt-1">
                <label className="flex items-center gap-2 cursor-pointer ">
                  <input
                    type="radio"
                    name="vtype"
                    value="7_days"
                    className="accent-[#DF562C]"
                    required
                  />
                  7 Days in a Month
                </label>

                <label className="flex items-center gap-2 cursor-pointer ">
                  <input
                    type="radio"
                    name="vtype"
                    value="15_days"
                    className="accent-[#DF562C]"
                  />
                  15 Days in a Month
                </label>

                <label className="flex items-center gap-2 cursor-pointer ">
                  <input
                    type="radio"
                    name="vtype"
                    value="weekends"
                    className="accent-[#DF562C]"
                  />
                  Weekends
                </label>

                <label className="flex items-center gap-2 cursor-pointer ">
                  <input
                    type="radio"
                    name="vtype"
                    value="specific_events"
                    className="accent-[#DF562C]"
                  />
                  Specific Events & Campaigns
                </label>
              </div>
              <h3 className="font-medium text-sm text-gray-700 py-2">
                Networking For <span className="text-red-500">*</span>
              </h3>
              <hr className="w-full border-t-1 border-gray-300" />
              <div className="grid md:grid-cols-4 gap-3 text-sm mt-1">
                <label className="flex items-center gap-2 cursor-pointer ">
                  <input
                    type="radio"
                    name="networking"
                    value="ngt_membership"
                    className="accent-[#DF562C]"
                    required
                  />
                  NGT Membership
                </label>

                <label className="flex items-center gap-2 cursor-pointer ">
                  <input
                    type="radio"
                    name="networking"
                    value="partnership"
                    className="accent-[#DF562C]"
                  />
                  Partnership
                </label>

                <label className="flex items-center gap-2 cursor-pointer ">
                  <input
                    type="radio"
                    name="networking"
                    value="associations"
                    className="accent-[#DF562C]"
                  />
                  Associations
                </label>

                <label className="flex items-center gap-2 cursor-pointer ">
                  <input
                    type="radio"
                    name="networking"
                    value="awareness_drives"
                    className="accent-[#DF562C]"
                  />
                  Awareness Drives
                </label>
              </div>
              <h3 className="font-medium text-sm text-gray-700 py-2">
                Area Of Interest <span className="text-red-500">*</span>
              </h3>
              <hr className="w-full border-t-1 border-gray-300" />
              <div className="grid md:grid-cols-4 gap-3 text-sm mt-1">
                <label className="flex items-center gap-2 cursor-pointer ">
                  <input
                    type="radio"
                    name="interest"
                    value="health_education"
                    className="accent-[#DF562C]"
                    required
                  />
                  Health & Education
                </label>

                <label className="flex items-center gap-2 cursor-pointer ">
                  <input
                    type="radio"
                    name="interest"
                    value="art_culture"
                    className="accent-[#DF562C]"
                  />
                  Art & Culture
                </label>

                <label className="flex items-center gap-2 cursor-pointer ">
                  <input
                    type="radio"
                    name="interest"
                    value="environment"
                    className="accent-[#DF562C]"
                  />
                  Environment
                </label>

                <label className="flex items-center gap-2 cursor-pointer ">
                  <input
                    type="radio"
                    name="interest"
                    value="women_empowerment"
                    className="accent-[#DF562C]"
                  />
                  Women Empowerment
                </label>
              </div>
              <h3 className="font-medium text-sm text-gray-700 py-2">
                Monetary Support <span className="text-red-500">*</span>
              </h3>
              <hr className="w-full border-t-1 border-gray-300" />
              <div className="grid md:grid-cols-4 gap-3 text-sm mt-1">
                {/* Donation */}
                <label className="flex items-center gap-2 cursor-pointer ">
                  <input
                    type="radio"
                    name="monetary_support"
                    value="donation"
                    className="accent-[#DF562C]"
                    required
                  />
                  Donation
                </label>

                {/* Charity */}
                <label className="flex items-center gap-2 cursor-pointer ">
                  <input
                    type="radio"
                    name="monetary_support"
                    value="charity"
                    className="accent-[#DF562C]"
                  />
                  Charity
                </label>

                {/* Sponsorships */}
                <label className="flex items-center gap-2 cursor-pointer ">
                  <input
                    type="radio"
                    name="monetary_support"
                    value="sponsorships"
                    className="accent-[#DF562C]"
                  />
                  Sponsorships
                </label>

                {/* Fund Raising Activities */}
                <label className="flex items-center gap-2 cursor-pointer ">
                  <input
                    type="radio"
                    name="monetary_support"
                    value="fund_raising_activities"
                    className="accent-[#DF562C]"
                  />
                  Fund Raising Activities
                </label>
              </div>
            </div>
            {/* Name Of Two References */}
            <div className="w-full">
              <h4 className="text-center text-gray-800 text-[15px] font-medium">
                Name Of Two References
              </h4>

              <hr className="w-full border-t-1 border-gray-300 mt-2 mb-4" />
              <div className="grid md:grid-cols-4 gap-3 text-sm">
                <div>
                  <label className="text-sm font-normal">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
                    <input
                      type="text"
                      placeholder="Enter name"
                      className="w-full px-2 py-1 text-sm outline-none placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Mobile No. <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
                    <input
                      type="text"
                      placeholder="Enter 10-digit mobile number"
                      className="w-full px-2 py-1 text-sm outline-none"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Email Id <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-2 py-1 text-sm outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-3 text-sm mt-2">
                <div>
                  <label className="text-sm font-normal">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
                    <input
                      type="text"
                      placeholder="Enter name"
                      className="w-full px-2 py-1 text-sm outline-none placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Mobile No. <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
                    <input
                      type="text"
                      placeholder="Enter 10-digit mobile number"
                      className="w-full px-2 py-1 text-sm outline-none"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Email Id <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="w-full px-2 py-1 text-sm outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Volunteer Information */}
            <div className="w-full">
              <h4 className="text-center text-gray-800 text-[15px] font-medium">
                Volunteer Information
              </h4>
              <hr className="w-full border-t-1 border-gray-300 mt-2 mb-4" />
              <div className="grid md:grid-cols-4 gap-3 text-sm">
                <div>
                  <label className="text-sm font-normal">
                    Area Of Region <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="text"
                      placeholder="Enter name"
                      className="w-full px-2 py-1 text-sm outline-none placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Report To <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="text"
                      placeholder="Enter Report To"
                      className="w-full px-2 py-1 text-sm outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Designation <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <select
                      className="w-full px-2 py-1 text-sm outline-none bg-white text-gray-700"
                      required
                    >
                      <option value="">Select designation</option>
                      <option value="manager">Manager</option>
                      <option value="executive">Executive</option>
                      <option value="director">Director</option>
                      <option value="assistant">Assistant</option>
                      <option value="team_lead">Team Lead</option>
                      <option value="officer">Officer</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* Volunteer Bank Details */}
            <div className="w-full">
              <h4 className="text-center text-gray-800 text-[15px] font-medium">
                Volunteer Bank Details
              </h4>
              <hr className="w-full border-t-1 border-gray-300 mt-2 mb-4" />
              <div className="grid md:grid-cols-4 gap-3 text-sm">
                <div>
                  <label className="text-sm font-normal">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="text"
                      placeholder="Enter your bank name"
                      className="w-full px-2 py-1 text-sm outline-none placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Account No <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="text"
                      placeholder="Enter account no"
                      className="w-full px-2 py-1 text-sm outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    IFSC Code <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="text"
                      placeholder="Enter ifsc code"
                      className="w-full px-2 py-1 text-sm outline-none"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Volunteer Business Details */}
            <div className="w-full">
              <h4 className="text-center text-gray-800 text-[15px] font-medium">
                Volunteer Business Details
              </h4>
              <hr className="w-full border-t-1 border-gray-300 mt-2 mb-4" />
              <div className="grid md:grid-cols-4 gap-3 text-sm">
                <div>
                  <label className="text-sm font-normal">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="text"
                      placeholder="Enter your company name"
                      className="w-full px-2 py-1 text-sm outline-none placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="text"
                      placeholder="Enter address"
                      className="w-full px-2 py-1 text-sm outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select className="border rounded px-2 py-1 text-sm w-full mt-1 focus:border-[#DF562C] focus:ring-[#DF562C] outline-none">
                    <option value="">Select your country</option>
                    {/* Add country options here */}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select className="border rounded px-2 py-1 text-sm w-full mt-1 focus:border-[#DF562C] focus:ring-[#DF562C] outline-none">
                    <option value="">Select your state</option>
                    {/* Add state options here */}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select className="border rounded px-2 py-1 text-sm w-full mt-1 focus:border-[#DF562C] focus:ring-[#DF562C] outline-none">
                    <option value="">Select your city</option>
                    {/* Add city options here */}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Pin Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter pin code"
                    className="border rounded px-2 py-1 text-sm w-full mt-1 focus:border-[#DF562C] outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Designation <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <select
                      className="w-full px-2 py-1 text-sm outline-none bg-white text-gray-700"
                      required
                    >
                      <option value="">Select designation</option>
                      <option value="manager">Manager</option>
                      <option value="executive">Executive</option>
                      <option value="director">Director</option>
                      <option value="assistant">Assistant</option>
                      <option value="team_lead">Team Lead</option>
                      <option value="officer">Officer</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-normal">
                    Contant No. <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center border px-3 mt-1 focus-within:border-[#DF562C] rounded transition-colors">
                    <input
                      type="text"
                      placeholder="Enter 10-digit contant number"
                      className="w-full px-2 py-1 text-sm outline-none"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Upload Profile Picture */}
            <div className="w-full ">
              <h4 className="text-center text-gray-800 text-[15px] font-medium">
                Upload Profile Picture
              </h4>

              <hr className="w-full border-t-1 border-gray-300 mt-2 mb-4" />
              <label className="text-sm font-normal">
                Profile Picture <span className="text-red-500">*</span>
              </label>
              <div className="flex md:w-[50%] items-center rounded border px-3 py-1  bg-white focus-within:border-[#DF562C] transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  className="w-full rounded text-sm text-gray-700 file:mr-4 file:py-1 file:px-4
                  file:border-0 file:text-sm file:bg-gray-100
                 file:text-gray-700 file:cursor-pointer cursor-pointer"
                  required
                />
              </div>
            </div>
            {/* ---------------- BUTTONS ---------------- */}
            <div className="flex gap-4 pt-2">
              {" "}
              {/* Added pt-4 for spacing above buttons */}
              <button className="bg-[#063D8E] rounded border border-[#063D8E] hover:bg-sky-600 text-white px-6 py-1 text-base font-normal  transition-colors">
                Register Now
              </button>
              <button
                type="button"
                className="px-6 py-1 font-normal rounded border border-[#DF562C] bg-[#DF562C] hover:bg-red-600 text-white text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* ================= 2. DATA/SIDEBAR SECTION (20% on Desktop) ================= */}
        <div className="w-full md:w-[25%] space-y-6 order-1 md:order-2  self-start sticky top-4">
          {/* NEED HELP BOX */}
          <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] rounded p-5 text-center">
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
              We would be more than happy to help you. Our team advisor is
              **24/7 at your service** to help you.
            </p>

            <p className="text-sm text-[#DF562C] mt-2 font-semibold">
              info@namogange.org
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Monday to Friday 9:00am - 7:30pm
            </p>
          </div>

          {/* VOLUNTEER CTA */}
          <div className="bg-[#2d70c8] rounded shadow-[0_0_20px_rgba(0,0,0,0.1)] p-5 text-center text-white">
            <div className="flex justify-center mb-3">
              <Image
                                       width={100}
                                       height={100}
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
    </div>
  );
};

export default VolunteerRegistrationForm;
