"use client";

import { motion } from "framer-motion";
import CallToAction from "@/components/UserUpdate";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

export default function LandingPage() {
  return (
    <motion.div
      className="min-h-screen bg-gray-50 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />
      {/* Call to Action Section */}
      <CallToAction />

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}
