"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

interface ContactProps {}

const Contact: React.FC<ContactProps> = ({}) => {
  const [showPopup, setShowPopup] = useState(false);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setShowPopup(false);
    const formData = new FormData(event.target);

    formData.append("access_key", "7d57e162-925b-41cf-86a2-1d66b143f60e");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setShowPopup(true);
      event.target.reset();
      setTimeout(() => setShowPopup(false), 3000);
    } else {
      console.log("Error", data);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="contact"
      className="w-full px-[12%] py-[75px] scroll-mt-20 bg-gradient-to-br from-gray-200 to-blue-400 "
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-lg font-Ovo text-gray-600"
      >
        Connect with me
      </motion.h4>
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center text-5xl font-Ovo font-semibold"
      >
        Get in Touch
      </motion.h2>
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center max-w-full mx-auto mt-5 mb-12 font-Ovo"
      >
        I'd love to hear from you! Whether you have a question, feedback, or
        just want to say hello, feel free to reach out using the form below.
      </motion.p>

      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onSubmit={onSubmit}
        className="max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-auto gap-6 mt-10 mb-8">
          <motion.input
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            type="text"
            placeholder="Enter your name"
            required
            className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white"
            name="name"
          />
          <motion.input
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white"
            name="email"
          />
        </div>
        <motion.textarea
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          rows={6}
          placeholder="Enter your message"
          required
          className="w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6"
          name="message"
        ></motion.textarea>
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          type="submit"
          className="py-3 px-8 w-max flex items-center justify-between gap-2 bg-black text-white rounded-full mx-auto hover:bg-gradient-to-r from-indigo-500 to-indigo-900"
        >
          Submit to connect
          <Image
            src="/right-arrow.png"
            alt=""
            className="w-4"
            width={12}
            height={12}
          />
        </motion.button>
      </motion.form>

      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-10 right-10 bg-green-500 text-white p-4 rounded-lg shadow-lg"
        >
          Form submitted successfully!
        </motion.div>
      )}
    </motion.div>
  );
};

export default Contact;
