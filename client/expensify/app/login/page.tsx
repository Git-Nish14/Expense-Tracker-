"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { SIGNIN } from "@/graphql/mutations";
import Cookies from "js-cookie";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

import handWave from "@/public/hand_wave.png";
import mailIcon from "@/public/mail_icon.svg";
import lockIcon from "@/public/lock_icon.svg";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [signin, { loading, error }] = useMutation(SIGNIN);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (formData: LoginFormInputs) => {
    try {
      const response = await signin({
        variables: { email: formData.email, password: formData.password },
      });

      if (response.data) {
        Cookies.set("token", response.data.signin.token, {
          secure: true,
          sameSite: "strict",
        });
        router.push("/home");
      }
    } catch (err) {
      console.error("Login Error:", err);
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
          className="text-white text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Welcome Back
          <Image src={handWave} alt="Wave" width={30} height={30} />
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
          <motion.div
            className="relative"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
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
          <motion.div
            className="relative"
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
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
              className="absolute left-4 top-3 text-gray-400 "
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
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>
        <motion.p
          className="text-gray-400 text-center text-xs mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Already a member?{" "}
          <Link
            href="/signup"
            className="text-blue-400 cursor-pointer underline"
          >
            Sign up
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
