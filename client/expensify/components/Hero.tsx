"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/Button";
import AnimationWrapper from "./AnimationWrapper";

export default function Hero() {
  return (
    <section className="text-center py-16 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white">
      <h1 className="text-5xl font-bold">Welcome to Expensify</h1>
      <h2 className="text-2xl font-bold">Take Control of Your Finances</h2>
      <p className="mt-4 text-lg">
        Track expenses, budget better, and achieve financial freedom
        effortlessly.
      </p>
      <Link href="/login">
        <Button className="mt-6 font-semibold px-8 py-4 rounded-lg text-lg">
          Get Started for Free
        </Button>
      </Link>
    </section>
  );
}
