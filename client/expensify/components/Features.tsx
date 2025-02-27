import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function Features() {
  return (
    <div>
      <motion.section
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="py-6 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-12 overflow-hidden"
      >
        {[
          {
            src: "/h1.webp",
            title: "Real-time Expense Tracking",
            text: "Log expenses instantly and stay updated.",
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
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -100 }} // Start from the left (-100px)
            whileInView={{ opacity: 1, x: 0 }} // Move to its normal position
            transition={{ duration: 0.6, delay: index * 0.2 }} // Delay each card
            viewport={{ once: false, amount: 0.5 }}
            className="text-center"
          >
            <Image
              src={feature.src}
              alt={feature.title}
              width={200}
              height={200}
              className="mx-auto rounded-lg shadow-lg object-cover"
            />
            <h3 className="text-2xl font-semibold mt-6">{feature.title}</h3>
            <p className="text-gray-600 mt-2 text-lg">{feature.text}</p>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}

export default Features;
