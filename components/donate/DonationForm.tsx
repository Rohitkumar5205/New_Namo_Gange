"use client";

import React, { useState } from "react";

const donationOptions: Record<
  string,
  { label: string; amount: number | "custom" }[]
> = {
  "Ann Sewa": [
    { label: "₹101 – One Meal", amount: 101 },
    { label: "₹501 – Food Package", amount: 501 },
    { label: "₹1100 – Full Ann Sewa", amount: 1100 },
    { label: "Custom Amount", amount: "custom" },
  ],
  "Moksha Sewa": [
    { label: "₹2100 – Last Rites Support", amount: 2100 },
    { label: "₹5100 – Complete Moksha Sewa", amount: 5100 },
    { label: "₹11000 – Premium Moksha Support", amount: 11000 },
    { label: "Custom Amount", amount: "custom" },
  ],
};

interface DonationFormData {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  address: string;
  SewaType: string;
  donationPackage: string;
  amount: string;
  pan: string;
  message: string;
  anonymous: boolean;
}

const initialForm: DonationFormData = {
  fullName: "",
  email: "",
  phone: "",
  gender: "",
  country: "",
  state: "",
  city: "",
  address: "",
  SewaType: "",
  donationPackage: "",
  amount: "",
  pan: "",
  message: "",
  anonymous: false,
};

export default function DonationForm() {
  const [form, setForm] = useState(initialForm);

  /* ------------------------- HANDLE CHANGE ------------------------ */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Checkbox
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
      return;
    }

    // When SEWA changes
    if (name === "SewaType") {
      setForm((prev) => ({
        ...prev,
        SewaType: value,
        donationPackage: "",
        amount: "",
      }));
      return;
    }

    // When PACKAGE changes → auto-set amount
    if (name === "donationPackage") {
      const selected = donationOptions[form.SewaType]?.find(
        (pkg) => pkg.label === value
      );

      setForm((prev) => ({
        ...prev,
        donationPackage: value,
        amount:
          selected?.amount === "custom" ? "" : String(selected?.amount || ""),
      }));
      return;
    }

    // Normal input
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Donation Submitted Successfully!");
    console.log(form);
  };

  return (
    <section className="w-full md:w-[65%] bg-gray-50 ">
      {/* FORM CONTAINER */}
      <div className="w-full flex justify-center">
        <div className="w-full bg-white border border-gray-300 rounded-xl shadow p-6 md:p-8">
          <h2 className="text-lg md:text-xl font-medium text-center mb-6 underline underline-offset-4">
            Support Through{" "}
            <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
              Ann Sewa / Moksha Sewa
            </span>
          </h2>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-2"
          >
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium">Full Name *</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                className="w-full border rounded px-3 py-2 mt-1 text-sm 
             focus:outline-none focus:ring-0 focus:border-gray-400"
                placeholder="Enter full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email *</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 text-sm 
             focus:outline-none focus:ring-0 focus:border-gray-400"
                placeholder="Enter email"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium">Phone *</label>
              <input
                type="text"
                maxLength={10}
                name="phone"
                required
                value={form.phone}
                onChange={(e) =>
                  handleChange({
                    ...e,
                    target: {
                      ...e.target,
                      value: e.target.value.replace(/\D/g, ""),
                    },
                  })
                }
                className="w-full border rounded px-3 py-2 mt-1 text-sm 
             focus:outline-none focus:ring-0 focus:border-gray-400"
                placeholder="10-digit number"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 text-sm 
             focus:outline-none focus:ring-0 focus:border-gray-400"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Sewa Type */}
            <div>
              <label className="text-sm font-medium">Choose Sewa *</label>
              <select
                name="SewaType"
                required
                value={form.SewaType}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 text-sm 
             focus:outline-none focus:ring-0 focus:border-gray-400"
              >
                <option value="">Select Sewa</option>
                <option>Ann Sewa</option>
                <option>Moksha Sewa</option>
              </select>
            </div>

            {/* Donation Package */}
            <div>
              <label className="text-sm font-medium">Donation Package *</label>
              <select
                name="donationPackage"
                required
                disabled={!form.SewaType}
                value={form.donationPackage}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 text-sm disabled:bg-gray-100"
              >
                <option value="">Select Package</option>
                {form.SewaType &&
                  donationOptions[form.SewaType].map((pkg, i) => (
                    <option key={i} value={pkg.label}>
                      {pkg.label}
                    </option>
                  ))}
              </select>
            </div>

            {/* Amount */}
            <div>
              <label className="text-sm font-medium">Amount (₹) *</label>
              <input
                type="number"
                name="amount"
                required
                value={form.amount}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 text-sm 
             focus:outline-none focus:ring-0 focus:border-gray-400"
                placeholder="Enter amount"
              />
            </div>

            {/* PAN */}
            <div>
              <label className="text-sm font-medium">PAN (Optional)</label>
              <input
                name="pan"
                value={form.pan}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 text-sm 
             focus:outline-none focus:ring-0 focus:border-gray-400"
                placeholder="For 80G receipt"
              />
            </div>

            {/* Country */}
            <div>
              <label className="text-sm font-medium">Country *</label>
              <input
                name="country"
                required
                value={form.country}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 text-sm 
             focus:outline-none focus:ring-0 focus:border-gray-400"
                placeholder="India"
              />
            </div>

            {/* State */}
            <div>
              <label className="text-sm font-medium">State *</label>
              <input
                name="state"
                required
                value={form.state}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 text-sm 
             focus:outline-none focus:ring-0 focus:border-gray-400"
                placeholder="State"
              />
            </div>

            {/* City */}
            <div>
              <label className="text-sm font-medium">City *</label>
              <input
                name="city"
                required
                value={form.city}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 text-sm 
             focus:outline-none focus:ring-0 focus:border-gray-400"
                placeholder="City"
              />
            </div>

            {/* Address */}
            <div className="md:col-span-1">
              <label className="text-sm font-medium">Full Address *</label>
              <textarea
                name="address"
                required
                rows={1}
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 text-sm 
             focus:outline-none focus:ring-0 focus:border-gray-400"
                placeholder="Complete address"
              />
            </div>

            {/* Message */}
            <div className="md:col-span-3">
              <label className="text-sm font-medium">Message (Optional)</label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 mt-1 text-sm 
             focus:outline-none focus:ring-0 focus:border-gray-400"
                placeholder="Write your message"
              />
            </div>

            {/* Anonymous */}
            <div className="flex items-center gap-2 md:col-span-2">
              <input
                type="checkbox"
                name="anonymous"
                checked={form.anonymous}
                onChange={handleChange}
              />
              <label className="text-sm">Donate anonymously</label>
            </div>

            {/* Submit */}
            <div className="md:col-span-3 text-center mt-2">
              <button
                type="submit"
                className="px-6 py-1.5 md:py-2.5 lg:py-2.5 bg-[#DF562C] text-white rounded text-sm font-semibold shadow hover:bg-orange-600"
              >
                Proceed to Donate
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
