"use client";

import { useState } from "react";

export default function PersonalDetailsForm() {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "Rohit Kumar",
    gender: "Male",
    dob: "1998-10-12",
    mobile: "9876543210",
    whatsapp: "9876543210",
    email: "rohit@example.com",
    pan: "ABCDE1234F",
    pincode: "110001",
    country: "India",
    state: "Delhi",
    district: "New Delhi",
    city: "Delhi",
    address: "Street 21, Central Market, Delhi",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const saveData = () => {
    setIsEditing(false);
    console.log("Saved Successfully", formData);
  };

  return (
    <div className="bg-white border border-gray-300 rounded                    shadow-md p-3 py-4 px-5">
      {/* ====================== HEADER ====================== */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-normal ">My Profile</h2>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-1 text-sm bg-[#0C55A0] text-white hover:bg-[#084783] cursor-pointer transition "
          >
            Edit
          </button>
        )}
      </div>

      {/* ====================== FULL FORM (ONE BLOCK) ====================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Full Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          {!isEditing ? (
            <p className="mt-1 font-normal text-sm text-gray-900">
              {formData.fullName}
            </p>
          ) : (
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border mt-1 "
            />
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="text-sm font-medium text-gray-700">Gender</label>
          {!isEditing ? (
            <p className="mt-1 font-normal text-sm text-gray-900">
              {formData.gender}
            </p>
          ) : (
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border text-sm mt-1 "
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          )}
        </div>

        {/* DOB */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          {!isEditing ? (
            <p className="mt-1 font-normal text-sm text-gray-900">
              {formData.dob}
            </p>
          ) : (
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full px-3 py-1.5 border text-sm mt-1 "
            />
          )}
        </div>

        {/* PAN */}
        <div>
          <label className="text-sm font-medium text-gray-700">PAN No</label>
          {!isEditing ? (
            <p className="mt-1 font-normal text-sm text-gray-900">
              {formData.pan}
            </p>
          ) : (
            <input
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border mt-1 "
            />
          )}
        </div>

        {/* Mobile */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          {!isEditing ? (
            <p className="mt-1 font-normal text-gray-900">
              +91 {formData.mobile}
            </p>
          ) : (
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border  mt-1 "
            />
          )}
        </div>

        {/* WhatsApp */}
        <div>
          <label className="text-sm font-medium text-gray-700">WhatsApp</label>
          {!isEditing ? (
            <p className="mt-1 font-normal text-sm text-gray-900">
              +91 {formData.whatsapp}
            </p>
          ) : (
            <input
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border mt-1 "
            />
          )}
        </div>

        {/* Email */}
        <div className="">
          <label className="text-sm font-medium text-gray-700">Email</label>
          {!isEditing ? (
            <p className="mt-1 font-normal text-sm text-gray-900">
              {formData.email}
            </p>
          ) : (
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border mt-1 "
            />
          )}
        </div>

        {/* PIN */}
        <div>
          <label className="text-sm font-medium text-gray-700">Pin Code</label>
          {!isEditing ? (
            <p className="mt-1 font-normal text-sm text-gray-900">
              {formData.pincode}
            </p>
          ) : (
            <input
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border mt-1 "
            />
          )}
        </div>

        {/* Country */}
        <div>
          <label className="text-sm font-medium text-gray-700">Country</label>
          {!isEditing ? (
            <p className="mt-1 font-normal text-sm text-gray-900">
              {formData.country}
            </p>
          ) : (
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border mt-1 "
            >
              <option>India</option>
            </select>
          )}
        </div>

        {/* State */}
        <div>
          <label className="text-sm font-medium text-gray-700">State</label>
          {!isEditing ? (
            <p className="mt-1 font-normal text-sm text-gray-900">
              {formData.state}
            </p>
          ) : (
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border mt-1 "
            >
              <option>Delhi</option>
              <option>Uttar Pradesh</option>
            </select>
          )}
        </div>

        {/* District */}
        <div>
          <label className="text-sm font-medium text-gray-700">District</label>
          {!isEditing ? (
            <p className="mt-1 font-normal text-sm text-gray-900">
              {formData.district}
            </p>
          ) : (
            <input
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border mt-1 "
            />
          )}
        </div>

        {/* City */}
        <div>
          <label className="text-sm font-medium text-gray-700">City</label>
          {!isEditing ? (
            <p className="mt-1 font-normal text-sm text-gray-900">
              {formData.city}
            </p>
          ) : (
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-3 py-1.5 text-sm border mt-1 "
            />
          )}
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Full Address
          </label>
          {!isEditing ? (
            <p className="mt-1 font-normal text-sm text-gray-900 leading-relaxed">
              {formData.address}
            </p>
          ) : (
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-1.5 text-sm border mt-1 "
            />
          )}
        </div>
      </div>

      {/* ====================== SAVE + CANCEL BUTTONS ====================== */}
      {isEditing && (
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={cancelEdit}
            className="px-6 py-1.5 text-sm border border-[#DF562C] text-[#DF562C] hover:bg-[#DF562C] hover:text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={saveData}
            className="px-4 py-1.5 text-sm bg-[#0C55A0] text-white hover:bg-sky-600 transition "
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}
