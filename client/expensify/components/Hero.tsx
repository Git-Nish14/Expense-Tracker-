import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/Button";

function Hero() {
  return (
    <div>
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center py-20 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white"
      >
        <h1 className="text-5xl font-bold">Welcome to Expensify</h1>
        <h2 className="text-2xl font-bold">Take Control of Your Finances</h2>
        <p className="mt-4 text-lg">
          Track expenses, budget better, and achieve financial freedom
          effortlessly.
        </p>
        <Link href="/signup">
          <Button className="mt-6 font-semibold px-8 py-4 rounded-lg text-lg">
            Get Started for Free
          </Button>
        </Link>
      </motion.section>
    </div>
  );
}

export default Hero;
