"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface BankAccountImageModalProps {
  onClose: () => void;
}

export default function BankAccountImageModal({
  onClose,
}: BankAccountImageModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600 transition"
        >
          <X size={22} />
        </button>

        <h2 className="text-lg font-semibold text-[#7a0d0d] mb-4">
          Your Bank Account Details
        </h2>

        <p className="text-sm text-gray-500 mb-3">
          Scan the QR code below to make a donation securely.
        </p>

        {/* QR Image */}
        <div className="flex justify-center">
          <Image
            src="/myProfile/qrCode.png"
            alt="Bank Account QR"
            width={250}
            height={250}
            className="rounded-xl border p-2 bg-white shadow-md"
          />
        </div>

        {/* Account Info */}
        <div className="mt-5 text-sm text-gray-700 text-left space-y-1 bg-[#fef4ec] rounded-lg p-4">
          <p>
            <span className="font-semibold text-[#7a0d0d]">Account Name:</span>{" "}
            Shree Krishnayan Gaushala
          </p>
          <p>
            <span className="font-semibold text-[#7a0d0d]">Account No:</span>{" "}
            123456789012
          </p>
          <p>
            <span className="font-semibold text-[#7a0d0d]">IFSC Code:</span>{" "}
            SBIN0001234
          </p>
          <p>
            <span className="font-semibold text-[#7a0d0d]">UPI ID:</span>{" "}
            namogange@upi
          </p>
        </div>

        {/* Close Button */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="bg-[#f36b2a] text-white px-6 py-2 rounded-full hover:bg-[#d95b22] transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
