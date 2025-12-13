"use client";
import React, { useState } from "react";
import { Phone, Mail, MapPin, Briefcase } from "lucide-react";

const Career = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<null | typeof jobs[0]>(null);

  const jobs = [
    {
      title: "Telemarketing Executive",
      exp: "Minimum 1 Year",
      salary: "Not disclosed",
      location: "Ghaziabad",
      desc: [
        "Strong communication and persuasive skills.",
        "Experience in cold calling and lead generation.",
        "Ability to handle objections and negotiate effectively.",
        "Target-driven with focus on achieving goals.",
        "Basic knowledge of exhibitions, events & stall marketing.",
      ],
    },
    {
      title: "Receptionist",
      exp: "Minimum 1 Year",
      salary: "Not disclosed",
      location: "Ghaziabad",
      desc: [
        "Must have good communication skills.",
        "Should be presentable.",
        "Should have ability to manage guests.",
        "Manage front desk.",
      ],
    },
    {
      title: "Sr. Accountant",
      exp: "2 - 3 Years",
      salary: "Not disclosed",
      location: "Ghaziabad",
      desc: [
        "Daily accounting functions.",
        "Balance sheet preparation.",
        "Income Tax, GST, TDS handling.",
        "Account reconciliation.",
        "Statutory compliance & audits.",
      ],
    },
  ];
  return (
    <>
      {/* ================= MAIN SECTION ================= */}
      <div className="w-full px-6 mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 shadow-sm rounded-lg p-2 md:px-6 md:py-4 hover:shadow-md 
                 transition-all flex flex-col justify-between h-full"
          >
            {/* Job Title */}
            <h3 className="text-lg font-semibold text-[#0C55A0] mb-2">
              {job.title}
            </h3>

            {/* Job Info */}
            <div className="text-sm text-gray-700 space-y-1 border-b pb-3">
              <p className="flex items-center gap-2">
                <Briefcase size={16} /> {job.exp}
              </p>

              <p className="flex items-center gap-2">
                <span className="ml-1">₹</span> {job.salary}
              </p>

              <p className="flex items-center gap-2">
                <MapPin size={16} /> {job.location}
              </p>
            </div>

            {/* Description */}
            <div className="mt-3 text-sm text-gray-700 text-justify space-y-1 leading-relaxed flex-1">
              {job.desc.map((line, i) => (
                <p key={i}>• {line}</p>
              ))}
            </div>

            {/* BUTTON */}
            <button
              className="mt-5 w-full bg-[#0C55A0] hover:bg-[#08467c] text-white py-2 rounded-md text-sm shadow transition"
              onClick={() => {
                setSelectedJob(job);
                setOpenModal(true);
              }}
            >
              Apply
            </button>
          </div>
        ))}
      </div>

      {/* ========= POPUP MODAL ========= */}
      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white w-[95%] md:w-[85%] lg:w-[75%] h-[90vh] rounded-2xl shadow-2xl overflow-hidden relative flex">
            {/* Close Button */}
            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-6 top-6 text-gray-600 text-2xl hover:text-black z-50"
            >
              ✕
            </button>

            {/* LEFT IMAGE SECTION */}
            <div
              className="hidden md:flex w-[40%] relative items-end justify-center bg-cover bg-center"
              style={{ backgroundImage: "url('/banner/career.png')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C55A0]/70 to-transparent"></div>

              <div className="relative p-6 text-white text-center">
                <h3 className="text-xl font-semibold">Namo Gange Trust</h3>
                <p className="text-sm mt-2 opacity-90">
                  Join a mission-driven organisation working for social,
                  cultural, environmental & spiritual upliftment.
                </p>
              </div>
            </div>

            {/* RIGHT FORM SECTION */}
            <div className="w-full md:w-[60%] overflow-y-auto p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Fill the form
              </h2>

              <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* NAME */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#0C55A0] outline-none"
                  />
                </div>

                {/* EMAIL */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#0C55A0] outline-none"
                  />
                </div>

                {/* PHONE */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter mobile number"
                    className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#0C55A0] outline-none"
                  />
                </div>

                {/* CITY */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#0C55A0] outline-none"
                  />
                </div>

                {/* STATE */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">State</label>
                  <input
                    type="text"
                    placeholder="State"
                    className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#0C55A0] outline-none"
                  />
                </div>

                {/* CURRENT LOCATION */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium mb-1">
                    Current Location
                  </label>
                  <input
                    type="text"
                    placeholder="Current Location"
                    className="border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-[#0C55A0] outline-none"
                  />
                </div>

                {/* ROLE */}
                <div className="flex flex-col md:col-span-2">
                  <label className="text-sm font-medium mb-1">
                    Role Applying For
                  </label>
                  <input
                    type="text"
                    readOnly
                    // value={selectedJob?.title}
                    className="border rounded-lg px-4 py-2 text-sm bg-gray-100"
                  />
                </div>

                {/* MESSAGE */}
                <div className="flex flex-col md:col-span-2">
                  <label className="text-sm font-medium mb-1">
                    Your Message
                  </label>
                  <textarea
                    placeholder="Write your message..."
                    className="border rounded-lg px-4 py-2 text-sm h-28 focus:ring-2 focus:ring-[#0C55A0] outline-none"
                  ></textarea>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="md:col-span-2 flex justify-center">
                  <button className="bg-[#0C55A0] hover:bg-[#08467c] text-white px-8 py-2.5 rounded-lg shadow-md text-sm flex items-center gap-2">
                    Submit →
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Career;
