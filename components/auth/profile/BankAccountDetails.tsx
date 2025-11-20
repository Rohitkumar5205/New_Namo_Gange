"use client";
import { useState } from "react";
import BankAccountImageModal from "./BankAccountImageModal";

export default function BankAccountDetails() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h2 className="text-lg font-semibold text-[#7a0d0d] mb-4 border-b pb-2">
        Bank Account Details
      </h2>

      <p className="text-gray-700 mb-4">
        You can directly transfer money to this account number/UPI ID. Your
        donation receipt will be generated automatically and sent to you.
      </p>

      <p className="text-gray-700 mb-6">
        This account detail is valid for you only and doesn’t expire.
      </p>

      <div className="text-center">
        <button
          onClick={() => setShowModal(true)}
          className="border border-[#f36b2a] text-[#f36b2a] hover:bg-[#f36b2a] hover:text-white px-6 py-2 rounded-full transition"
        >
          Generate Bank Account
        </button>
      </div>

      {/* Image Modal */}
      {showModal && (
        <BankAccountImageModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
