import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 px-6">
      <div className="max-w-5xl w-full flex flex-col-reverse md:flex-row items-center gap-10">
        {/* LEFT: TEXT CONTENT */}
        <div className="w-full md:w-1/2">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#0C55A0] leading-tight">
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mt-2">
            Page Not Found
          </h2>

          <p className="mt-4 text-gray-600 text-base leading-relaxed">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable. Please double-check the URL
            or return to the homepage.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link
              href="/"
              className="px-6 py-2 text-white bg-[#0C55A0]  shadow hover:bg-[#084783] transition text-center"
            >
              Go Back Home
            </Link>

            <Link
              href="/contact"
              className="px-6 py-2 border border-gray-300  text-gray-700 hover:bg-gray-100 transition text-center"
            >
              Contact Support
            </Link>
          </div>
        </div>

        {/* RIGHT: ILLUSTRATION */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            width={600}
            height={400}
            src="https://cdn.pixabay.com/photo/2017/06/08/17/32/not-found-2384304_1280.jpg"
            alt="404 Illustration"
            className=" drop-shadow-md rounded-xl"
          />
        </div>
      </div>
    </main>
  );
}
