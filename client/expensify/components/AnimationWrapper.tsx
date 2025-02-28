"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimationWrapperProps {
  children: React.ReactNode;
}

export default function AnimationWrapper({ children }: AnimationWrapperProps) {
  return (
    <motion.div
      className="bg-gray-50 flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// just for future if needed
