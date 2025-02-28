"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { SIGNUP } from "@/graphql/mutations";
import Cookies from "js-cookie";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import personIcon from "@/public/person_icon.svg";
import mailIcon from "@/public/mail_icon.svg";
import lockIcon from "@/public/lock_icon.svg";

interface SignupFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [signup, { loading, error }] = useMutation(SIGNUP);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const onSubmit = async (formData: SignupFormInputs) => {
    try {
      const response = await signup({ variables: formData });
      if (response.data) {
        Cookies.set("token", response.data.signup.token, {
          secure: true,
          sameSite: "strict",
        });
        router.push("/home");
      }
    } catch (err) {
      console.error("Signup Error:", err);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-gray-200 to-blue-400"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-colour text-sm"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.h2
          className="text-white text-2xl font-bold text-center mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Create Your Account
        </motion.h2>
        {error && (
          <motion.p
            className="text-red-500 text-center bg-gray-700 p-2 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {error.message}
          </motion.p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <motion.div className="relative">
            <input
              type="text"
              placeholder="First Name"
              className="mb-4 flex items-center gap-3 w-full px-12 py-2.5 rounded-full bg-[#5C6691]"
              {...register("firstName", { required: "First name is required" })}
            />
            <Image
              src={personIcon}
              alt="Person"
              width={15}
              height={15}
              className="absolute left-4 top-3 text-gray-400"
            />
            {errors.firstName && (
              <p className="text-red-400 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </motion.div>
          <motion.div className="relative">
            <input
              type="text"
              placeholder="Last Name"
              className="mb-4 flex items-center gap-3 w-full px-12 py-2.5 rounded-full bg-[#5C6691]"
              {...register("lastName", { required: "Last name is required" })}
            />
            <Image
              src={personIcon}
              alt="Person"
              width={15}
              height={15}
              className="absolute left-4 top-3 text-gray-400"
            />
            {errors.lastName && (
              <p className="text-red-400 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </motion.div>
          <motion.div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="mb-4 flex items-center gap-3 w-full px-12 py-2.5 rounded-full bg-[#5C6691]"
              {...register("email", { required: "Email is required" })}
            />
            <Image
              src={mailIcon}
              alt="Email"
              width={20}
              height={20}
              className="absolute left-4 top-3 text-gray-400"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </motion.div>
          <motion.div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="mb-4 flex items-center gap-3 w-full px-12 py-2.5 rounded-full bg-[#5C6691]"
              {...register("password", { required: "Password is required" })}
            />
            <Image
              src={lockIcon}
              alt="Lock"
              width={15}
              height={15}
              className="absolute left-4 top-3 text-gray-400"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </motion.div>
          <motion.button
            type="submit"
            className="text-white font-medium w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </motion.button>
        </form>
        <motion.p className="text-gray-400 text-center text-xs mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-400 cursor-pointer underline"
          >
            Log in
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
