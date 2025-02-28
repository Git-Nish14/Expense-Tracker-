"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowUp } from "react-icons/fa";

function Footer() {
  const [year, setYear] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="bg-gradient-to-r from-indigo-500 to-indigo-900 text-white text-center py-4 bottom-0 left-0 w-full text-sm flex flex-col sm:flex-row sm:justify-between items-center px-6">
      <p className="text-lg">
        © {year ?? "Loading..."} Expensify. All rights reserved by team{"  "}
        <Link
          target="_blank"
          href="https://www.techifive.com"
          className="underline cursor-pointer font-bold"
        >
          Techifive.
        </Link>
      </p>

      <div className="mt-4 flex items-center gap-3">
        <Link
          target="_blank"
          href="https://github.com/Git-Nish14"
          className="hover:text-gray-400 text-lg text-white transition"
        >
          Github
        </Link>
        <Link
          target="_blank"
          href="https://www.linkedin.com/in/nishpatel14"
          className="hover:text-gray-400 text-lg text-white transition"
        >
          LinkedIn
        </Link>
        <Link
          href="/contact"
          className="hover:text-gray-400 text-lg text-white transition"
        >
          Contact
        </Link>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full shadow-md hover:bg-black transition-all dark:bg-white"
          aria-label="Back to top"
        >
          <FaArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
