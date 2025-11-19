"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

export default function ReviewPageWrapper() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <ReviewPage />
    </Suspense>
  );
}

function ReviewPage() {
  const params = useSearchParams();
  const router = useRouter();

  const amount = params.get("amount");
  const name = params.get("name");
  const mobile = params.get("mobile");
  const email = params.get("email");

  return (
    <div className="max-w-xl mx-auto py-14 px-4">
      <h1 className="text-2xl font-bold text-[#DF562C] mb-6 text-center">
        Review Your Donation
      </h1>

      <div className="bg-white border shadow-md rounded-xl p-6 space-y-4">
        <div className="space-y-2 text-gray-700">
          <ReviewItem label="Name" value={name} />
          <ReviewItem label="Mobile" value={mobile} />
          <ReviewItem label="Email" value={email} />

          <p className="text-lg font-semibold mt-3 text-gray-800">
            Donation Amount: <span className="text-[#DF562C]">₹{amount}</span>
          </p>
        </div>

        <button
          onClick={() => router.push("/donate/success")}
          className="w-full bg-[#0C55A0] text-white py-3 rounded-lg font-semibold hover:bg-[#084783] transition"
        >
          Confirm & Proceed
        </button>
      </div>

      <button
        onClick={() => router.push("/donate")}
        className="mt-4 w-full border py-3 rounded-lg font-medium hover:bg-gray-50 transition"
      >
        Go Back
      </button>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: any }) {
  return (
    <p>
      <strong>{label}: </strong>
      <span className="text-gray-800">{value}</span>
    </p>
  );
}
