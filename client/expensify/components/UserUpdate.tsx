import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function CallToAction() {
  // Generate a random visit count >10,000 (fixed per session)
  const [monthlyVisits] = useState(
    () => Math.floor(Math.random() * 5000) + 10000
  );

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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 100 }}
      className="text-center py-5 px-6 bg-gray-50"
    >
      {/* Live Counter */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl font-bold text-indigo-900 mt-6"
      >
        🌍 Monthly Visits: {monthlyVisits.toLocaleString()}
      </motion.div>

      {/* Reviews Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 w-full max-w-[400px] mx-auto"
          >
            {/* User Image */}
            <div className="w-16 h-16 flex-shrink-0">
              <Image
                src={review.img}
                alt={review.name}
                width={64}
                height={64}
                className="rounded-full object-cover w-full h-full"
              />
            </div>

            {/* User Review Text */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{review.name}</h3>
              <p className="text-gray-600 text-sm">{review.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
