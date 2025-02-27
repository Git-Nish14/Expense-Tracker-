"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 text-blue-600  font-semibold rounded-lg transition-all duration-300 bg-white hover:bg-gradient-to-r from-indigo-500 to-indigo-900 hover:text-white focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${className}`}
    >
      {children}
    </button>
  );
}
