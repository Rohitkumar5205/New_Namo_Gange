"use client";
import React, { useState } from "react";

interface SupportFormData {
  name: string;
  email: string;
  phone: string;
  gender: string;
  ageGroup: string;
  supportType: string;
  address: string;
  city: string;
  state: string;
  contribution: string;
  message: string;
}

const initialForm: SupportFormData = {
  name: "",
  email: "",
  phone: "",
  gender: "",
  ageGroup: "",
  supportType: "",
  address: "",
  city: "",
  state: "",
  contribution: "",
  message: "",
};

const Support = () => {
  const [form, setForm] = useState<SupportFormData>(initialForm);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", form);
    alert("Support Form Submitted Successfully!");
  };
  return (
    <section className="w-full md:max-w-7xl mx-auto relative py-4 md:py-6 overflow-hidden">
      <div className=" w-full lg:px-0">
        {/* Header */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 text-center">
          <span className="bg-gradient-to-r from-[#f36b2a] to-[#1e7ed3] bg-clip-text text-transparent">
            {" "}
            Join the Mission
          </span>
        </h2>
        <div className="flex justify-center w-full mb-6">
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
              Each milestone we achieve brings us closer to a more
              compassionate, environmentally balanced society. Our programs are
              growing thanks to the dedication of volunteers, partners, and
              supporters who believe in positive change. As we expand, we remain
              committed to empowering communities through education, healthcare,
              spiritual development, and environmental conservation. Guided by
              integrity and transparency, we strive to build a future that
              inspires hope, unity and lasting transformation — nurturing
              meaningful progress for generations to come. Your support helps us
              innovate, stay inclusive, and scale sustainable solutions for all.
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-center mb-2 text-xl font-medium">
        Please Complete the Support Form
      </h1>
      <div
        className="w-full md:max-w-6xl mx-auto bg-white border border-gray-200 
rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-6 md:p-10"
      >
        {/* ========== FORM GRID START ========== */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Full Name */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="border rounded px-3 py-1.5 text-sm focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="border rounded px-3 py-1.5 text-sm focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Mobile Number *
            </label>
            <input
              type="tel"
              name="phone"
              maxLength={10}
              value={form.phone}
              onChange={(e) =>
                handleChange({
                  ...e,
                  target: {
                    ...e.target,
                    value: e.target.value.replace(/[^0-9]/g, ""),
                  },
                })
              }
              required
              className="border rounded px-3 py-1.5 text-sm focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none"
              placeholder="10-digit mobile number"
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Gender *
            </label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="border rounded px-3 py-1.5 text-sm bg-white focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Age Group */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Age Group *
            </label>
            <select
              name="ageGroup"
              value={form.ageGroup}
              onChange={handleChange}
              required
              className="border rounded px-3 py-1.5 text-sm bg-white focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none"
            >
              <option value="">Select age group</option>
              <option value="Below 18">Below 18</option>
              <option value="18-30">18 - 30</option>
              <option value="31-50">31 - 50</option>
              <option value="Above 50">Above 50</option>
            </select>
          </div>

          {/* Support Type */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Support Type *
            </label>
            <select
              name="supportType"
              value={form.supportType}
              onChange={handleChange}
              required
              className="border rounded px-3 py-1.5 text-sm bg-white focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none"
            >
              <option value="">Select support type</option>
              <option value="Volunteer">Volunteer</option>
              <option value="Donation">Donation</option>
              <option value="Partnership">Partnership</option>
              <option value="Awareness">Awareness</option>
              <option value="Service">Service</option>
            </select>
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2 lg:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Full Address *
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              rows={1}
              className="border rounded px-3 py-1.5 text-sm focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none"
              placeholder="Enter your complete address"
            />
          </div>

          {/* State */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">State *</label>
            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              required
              className="border rounded px-3 py-1.5 text-sm focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none bg-white"
            >
              <option value="">Select State</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Delhi">Delhi</option>
              <option value="Haryana">Haryana</option>
              <option value="Bihar">Bihar</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="West Bengal">West Bengal</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Telangana">Telangana</option>
              <option value="Assam">Assam</option>
            </select>
          </div>

          {/* City */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">City *</label>
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="border rounded px-3 py-1.5 text-sm focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none bg-white"
            >
              <option value="">Select City</option>

              {/* Common Cities */}
              <option value="Delhi">Delhi</option>
              <option value="Noida">Noida</option>
              <option value="Gurugram">Gurugram</option>
              <option value="Ghaziabad">Ghaziabad</option>
              <option value="Lucknow">Lucknow</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Chennai">Chennai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Patna">Patna</option>
              <option value="Varanasi">Varanasi</option>
              <option value="Kanpur">Kanpur</option>
              <option value="Ahmedabad">Ahmedabad</option>
              <option value="Bhopal">Bhopal</option>
            </select>
          </div>

          {/* Contribution */}
          <div className="flex flex-col ">
            <label className="text-sm font-medium text-gray-700">
              Preferred Contribution *
            </label>
            <select
              name="contribution"
              value={form.contribution}
              onChange={handleChange}
              required
              className="border rounded px-3 py-1.5 text-sm bg-white focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none"
            >
              <option value="">Choose contribution</option>
              <option value="Time">Time (Volunteering)</option>
              <option value="Skills">Skills / Services</option>
              <option value="Financial">Financial Contribution</option>
              <option value="Resources">Resources Support</option>
            </select>
          </div>

          {/* Message */}
          <div className="flex flex-col md:col-span-2 lg:col-span-4">
            <label className="text-sm font-medium text-gray-700">
              Message / Reason to Support *
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className="border rounded px-3 py-1.5 text-sm focus:border-[#1e7ed3] focus:ring-[#1e7ed3] outline-none"
              placeholder="Write your message"
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 mt-3 lg:col-span-4 flex justify-center">
            <button
              type="submit"
              className="px-8 py-2 bg-[#DF562C] text-white font-semibold text-sm rounded-lg shadow hover:bg-orange-600 transition duration-200"
            >
              Submit Support Form
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Support;
