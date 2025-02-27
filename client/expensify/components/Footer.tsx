import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaArrowUp } from "react-icons/fa";

function Footer() {
  return (
    <div>
      {" "}
      <motion.footer
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-gray-800 text-white text-center py-4 bottom-0 left-0 w-full text-sm flex flex-col sm:flex-row sm:justify-between items-center px-6"
      >
        <p className="text-lg">
          © {new Date().getFullYear()} Expensify. All rights reserved.
        </p>
        <div className="mt-4">
          <Link
            target="_blank"
            href="https://github.com/Git-Nish14"
            className="text-gray-400 mx-3 text-lg"
          >
            Github
          </Link>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/nishpatel14"
            className="text-gray-400 mx-3 text-lg"
          >
            LinkedIn
          </Link>
          <Link href="/contact" className="text-gray-400 mx-3 text-lg">
            Contact
          </Link>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bottom-6 right-6 sm:right-10 md:right-14 lg:right-20 p-3 bg-gray-800 text-white rounded-full shadow-md hover:bg-gray-700 transition-all dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
            aria-label="Back to top"
          >
            <FaArrowUp size={20} />
          </button>
        </div>
      </motion.footer>
    </div>
  );
}

export default Footer;
