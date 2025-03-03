"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 text-lg text-center max-w-lg mb-6">
        Oops! The page you are looking for does not exist or has been moved.
      </p>

      <div className="bg-white shadow-lg rounded-lg p-4 text-center">
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
