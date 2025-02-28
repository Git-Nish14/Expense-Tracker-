"use client";
import React from "react";
import Image from "next/image";
import AnimationWrapper from "./AnimationWrapper";

function Features() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {" "}
      <section className="grid md:grid-cols-3 gap-12">
        {[
          {
            src: "/h1.webp",
            title: "Real-time Expense Tracking",
            text: "Log expenses instantly and stay updated.",
            priority: true,
          },
          {
            src: "/h2.jpg",
            title: "Insightful Reports",
            text: "Visualize your spending habits with charts.",
          },
          {
            src: "/sec.webp",
            title: "Secure & Private",
            text: "Bank-level security ensures data safety.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 text-center transition-all duration-300 hover:shadow-xl"
          >
            <div className="relative w-full h-[220px] md:h-[250px] mx-auto overflow-hidden rounded-lg">
              <Image
                src={feature.src}
                alt={feature.title}
                layout="fill"
                objectFit="cover"
                priority={feature.priority || false}
                className="rounded-lg"
              />
            </div>

            <h3 className="text-2xl font-semibold mt-6">{feature.title}</h3>
            <p className="text-gray-600 mt-2 text-lg">{feature.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Features;
