import React from "react";
import { HeartHandshake, HandCoins, Users, Leaf,  Sparkles } from "lucide-react";

const DonationContent = () => {
  return (
    <div
      className="w-full md:w-[35%] bg-white border border-gray-200 rounded-xl shadow-md 
                 p-6 md:p-8 h-fit sticky top-4"
    >
      {/* Heading */}
      <h2 className="text-xl font-semibold text-gray-900 text-center mb-3">
        Why Your{" "}
        <span className="bg-gradient-to-r from-[#DF562C] to-[#0C55A0] bg-clip-text text-transparent">
          Donation Matters
        </span>
      </h2>

      <p className="text-gray-600 text-sm leading-relaxed text-center mb-6">
        Your contribution helps us serve the needy, support Ann Sewa, Moksha
        Sewa, and uplift countless lives with dignity, compassion, and care.
      </p>

      {/* Info Cards */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-orange-100 text-[#DF562C]">
            <HeartHandshake size={20} />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold">Ann Sewa:</span> Providing fresh,
            nutritious food to the poor, homeless, and needy individuals every
            single day.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-100 text-[#0C55A0]">
            <HandCoins size={20} />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            <span className="font-semibold">Moksha Sewa:</span> Helping families
            perform final rites with dignity, care, and complete spiritual
            assistance.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-green-100 text-green-700">
            <Leaf size={20} />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Supporting various welfare activities including environment care,
            health support, and community upliftment.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-yellow-100 text-yellow-700">
            <Users size={20} />
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            Every donation, small or big, brings hope, relief, and positivity to
            those who need it the most.
          </p>
        </div>

        <div className="flex items-start gap-3">
  <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
    <Sparkles size={20} />
  </div>
  <p className="text-sm text-gray-700 leading-relaxed">
    Your contribution helps create long-lasting impact by supporting
    education, social welfare, and spiritual upliftment programs across
    various communities.
  </p>
</div>

      </div>

      {/* Bottom Highlight Box */}
      <div
        className="mt-6 p-4 bg-gradient-to-r from-[#DF562C]/10 to-[#0C55A0]/10 
                      border rounded-lg text-center"
      >
        <p className="text-sm font-medium text-gray-800">
          “Your kindness today becomes someone’s blessing tomorrow.”
        </p>
      </div>
    </div>
  );
};

export default DonationContent;
