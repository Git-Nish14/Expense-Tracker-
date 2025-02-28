"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define Savings Data Interface
interface SavingsEntry {
  month: string;
  amount: number;
}

// Dummy Data for Monthly Savings
const savingsData: SavingsEntry[] = [
  { month: "Jan", amount: 500 },
  { month: "Feb", amount: 700 },
  { month: "Mar", amount: 600 },
  { month: "Apr", amount: 800 },
  { month: "May", amount: 1200 },
  { month: "Jun", amount: 1500 },
  { month: "Jul", amount: 1300 },
  { month: "Aug", amount: 1100 },
  { month: "Sep", amount: 1400 },
  { month: "Oct", amount: 1600 },
  { month: "Nov", amount: 1800 },
  { month: "Dec", amount: 2000 },
];

export default function SavingsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center px-6 py-8">
        {/* Savings Table */}
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Monthly Savings Overview
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 border border-gray-300">Month</th>
                  <th className="p-3 border border-gray-300">Savings ($)</th>
                </tr>
              </thead>
              <tbody>
                {savingsData.map((entry, index) => (
                  <tr
                    key={index}
                    className="border border-gray-300 text-center"
                  >
                    <td className="p-3">{entry.month}</td>
                    <td className="p-3 font-semibold text-green-500">
                      ${entry.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Savings Trend Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl mt-8">
          <h3 className="text-lg font-semibold text-center mb-4">
            Savings Trend Over the Year
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#4CAF50"
                strokeWidth={2}
                dot={{ fill: "#4CAF50", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
