"use client";
import Link from "next/link";
import { useState } from "react";
import { User, Phone, Mail, Briefcase, Calendar, MapPin } from "lucide-react";
import Image from "next/image";


const MemberRegistrationForm = () => {
  const [membership, setMembership] = useState("1year");
  return (
    <div>
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/banner/member.jpg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/0 w-full h-full md:h-[300px] py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
              Membership Registration
            </h2>
            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Membership Registration
            </p>
          </div>
        </div>
      </div>

      <div className="w-full p-4 md:p-8 max-w-8xl mx-auto">
        <h2 className="text-lg text-center md:text-xl font-medium text-gray-900 mb-2">
          Membership Registration
        </h2>
        <div className="flex justify-center w-full">
          <div
            className="
      w-full 
      py-4
      relative 
      overflow-hidden
      text-center
    "
          >
            {/* Decorative Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

            <p className="text-gray-700 text-sm md:text-[15px] leading-relaxed font-normal">
              Becoming a Member is not just a registration — it is a heartfelt
              commitment to stand with a mission that serves humanity, protects
              nature, and uplifts society at every level. As a valued member,
              you become an integral part of a growing community that believes
              in compassion, collective responsibility, and meaningful action.
              Your involvement strengthens initiatives that support education,
              healthcare, environmental conservation, women empowerment, youth
              guidance, and the preservation of our nation’s spiritual and
              cultural heritage.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:mb-4 px-4 md:px-8">
        {/* ================= 1. FORM SECTION (80% on Desktop) ================= */}
        <div
          className="w-full md:w-[75%] bg-white p-6 rounded-lg 
     shadow-[0_0_20px_rgba(0,0,0,0.1)] order-2 md:order-1"
        >
          <form className="space-y-2">
            {/* =================== HEADING =================== */}
            <div>
              <h2 className="text-lg font-medium text-gray-800">
                Membership Registration Form
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                (REGD: 168/4/37/110-115/2015 & NITI AYOG, GOVT. OF INDIA UNIQUE
                ID - DL/2016/0113537)
              </p>
            </div>
            <div className="w-full">
              <h4 className="text-center text-gray-800 text-[15px] font-medium">
                Membership Personal Information
              </h4>
              <hr className="w-full border-t-1 border-gray-300 mt-2 mb-3" />
              <div className="grid md:grid-cols-5 gap-4">
                <div className="">
                  <label className="text-sm font-normal">
                    Select Title <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center border px-3 mt-1 rounded rounded focus-within:border-[#DF562C] transition-colors">
                    <select
                      className="w-full px-2 py-1 text-sm  outline-none bg-white text-gray-700"
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

                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
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
                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
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
                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
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

                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
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
                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
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

                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
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

                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
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

                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
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

                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
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
                  <label className="text-sm font-normal">Alternate No.</label>
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
                    Email Address <span className="text-red-500">*</span>
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
                <div>
                  <label className="text-sm font-normal">
                    Aadhar / ID Proof No.{" "}
                    <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
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
                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
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
                  <select className="border px-2 rounded py-1 text-sm w-full mt-1 focus:border-[#DF562C] focus:ring-[#DF562C] outline-none">
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
                    className="border px-2 py-1 rounded text-sm w-full mt-1 focus:border-[#DF562C] outline-none"
                  />
                </div>
                {/* Blood Group */}
                <div>
                  <label className="text-sm font-normal">
                    Blood Group <span className="text-red-500">*</span>
                  </label>

                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
                    <select
                      name="blood_group"
                      className="w-full px-2 py-1.5 text-sm outline-none bg-white text-gray-700"
                      required
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select blood group
                      </option>

                      <option value="a_pos">A+</option>
                      <option value="a_neg">A-</option>
                      <option value="b_pos">B+</option>
                      <option value="b_neg">B-</option>
                      <option value="ab_pos">AB+</option>
                      <option value="ab_neg">AB-</option>
                      <option value="o_pos">O+</option>
                      <option value="o_neg">O-</option>
                      <option value="unknown">
                        Prefer not to say / Unknown
                      </option>
                    </select>
                  </div>
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
                  <div className="flex items-center border px-3 mt-1 rounded focus-within:border-[#DF562C] transition-colors">
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
              </div>
            </div>
            {/* initiatives of namo gange trust */}
            <div className="w-full">
              <h4 className="text-center text-gray-800 text-[15px] font-medium">
                Initiatives of Namo Gange Trust
              </h4>

              <hr className="w-full border-t-1 border-gray-300 mt-2 mb-4" />
              <h3 className="font-medium text-sm text-gray-700 mb-2">
                Aviral Ganga <span className="text-red-500">*</span>
              </h3>
              <div className="grid md:grid-cols-4 gap-3 text-sm">
                {[
                  { label: "Arogya Sangoshthi", value: "arogya_sangoshthi" },
                  { label: "Panchkarma Clinic", value: "panchkarma_clinic" },
                  {
                    label: "The Grand Master of Yoga",
                    value: "grand_master_of_yoga",
                  },
                  {
                    label: "Arogya Film Festival",
                    value: "arogya_film_festival",
                  },
                  {
                    label: "Bachchon Ki Rangshala",
                    value: "bachchon_ki_rangshala",
                  },
                  {
                    label: "Shrimad Bhagwat Katha",
                    value: "shrimad_bhagwat_katha",
                  },
                  { label: "The Yogshalajobs.com", value: "yogshalajobs" },
                  { label: "Ayush Mitra", value: "ayush_mitra" },
                  { label: "Indian Contemporary Art (ICOA)", value: "icoa" },
                  {
                    label: "Swachh Bharat Sankalp",
                    value: "swachh_bharat_sankalp",
                  },
                  { label: "The Yogshala Expo", value: "yogshala_expo" },
                  { label: "Ann Sewa", value: "ann_sewa" },
                  {
                    label: "Meri Beti Mera Abhimaan",
                    value: "meri_beti_mera_abhimaan",
                  },
                  { label: "The Yogshala Clinic", value: "yogshala_clinic" },
                  { label: "AcharyajiOnline.com", value: "acharyaji_online" },
                  { label: "NGT Farms", value: "ngt_farms" },
                  {
                    label: "Vaidhyashala Clinic",
                    value: "vaidhyashala_clinic",
                  },
                  {
                    label: "Swachh Ghaziabad Swasth Ghaziabad",
                    value: "swachh_gzb_swasth_gzb",
                  },
                ].map((item, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="initiatives"
                      value={item.value}
                      className="accent-[#DF562C]"
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
                  className="w-full text-sm text-gray-700 file:mr-4 file:py-1 file:px-4
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

            <h4 className="text-lg font-semibold">Become a Membership</h4>

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

export default MemberRegistrationForm;
