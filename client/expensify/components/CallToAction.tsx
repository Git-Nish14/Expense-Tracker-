"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AnimationWrapper from "./AnimationWrapper";

function CallToAction() {
  const [monthlyVisits, setMonthlyVisits] = useState<number | null>(null);

  useEffect(() => {
    setMonthlyVisits(Math.floor(Math.random() * 5000) + 10000);
  }, []);

  const reviews = [
    {
      name: "Emily R.",
      text: "This app completely changed how I track my expenses! So easy to use and very detailed.",
      img: "/emily.jpg",
    },
    {
      name: "John D.",
      text: "I love the financial insights! The real-time tracking keeps me on top of my budget.",
      img: "/john.jpg",
    },
    {
      name: "Sophia W.",
      text: "Secure, fast, and user-friendly! Highly recommended for anyone serious about finance.",
      img: "/sophia.jpg",
    },
    {
      name: "Michael B.",
      text: "A must-have tool! Helped me cut unnecessary expenses and save more each month.",
      img: "/michael.webp",
    },
  ];

  return (
    <section className="text-center py-10 px-4 sm:px-6 bg-gray-50">
      <div className="text-3xl sm:text-4xl font-bold text-indigo-900 mt-6">
        {monthlyVisits
          ? `🌍 Monthly Visits: ${monthlyVisits.toLocaleString()}`
          : "Loading..."}
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 sm:p-8 flex flex-col items-center space-y-4 sm:space-y-6 w-full max-w-[90%] sm:max-w-[400px] mx-auto"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24">
              <Image
                src={review.img}
                alt={review.name}
                width={96} // Desktop size
                height={96}
                className="rounded-full object-cover w-full h-full"
              />
            </div>

            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-semibold">
                {review.name}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {review.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CallToAction;
