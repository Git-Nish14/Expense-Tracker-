"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
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
  year: string;
}

// Dummy Data for Monthly Savings (Different Years)
const savingsData: SavingsEntry[] = [
  { month: "Jan", amount: 500, year: "2024" },
  { month: "Feb", amount: 700, year: "2024" },
  { month: "Mar", amount: 600, year: "2024" },
  { month: "Apr", amount: 800, year: "2024" },
  { month: "May", amount: 1200, year: "2024" },
  { month: "Jun", amount: 1500, year: "2024" },
  { month: "Jul", amount: 1300, year: "2024" },
  { month: "Aug", amount: 1100, year: "2024" },
  { month: "Sep", amount: 1400, year: "2024" },
  { month: "Oct", amount: 1600, year: "2024" },
  { month: "Nov", amount: 1800, year: "2024" },
  { month: "Dec", amount: 2000, year: "2024" },
  { month: "Jan", amount: 550, year: "2025" },
  { month: "Feb", amount: 800, year: "2025" },
  { month: "Mar", amount: 700, year: "2025" },
  { month: "Apr", amount: 850, year: "2025" },
  { month: "May", amount: 1250, year: "2025" },
  { month: "Jun", amount: 1550, year: "2025" },
  { month: "Jul", amount: 1350, year: "2025" },
  { month: "Aug", amount: 1150, year: "2025" },
  { month: "Sep", amount: 1450, year: "2025" },
  { month: "Oct", amount: 1650, year: "2025" },
  { month: "Nov", amount: 1850, year: "2025" },
  { month: "Dec", amount: 2050, year: "2025" },
];

export default function SavingsPage() {
  // Filter states for month and year
  const [filterMonth, setFilterMonth] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");

  // Local state for filtered savings data
  const [filteredSavings, setFilteredSavings] =
    useState<SavingsEntry[]>(savingsData);

  // If no filter is applied, keep the filtered list same as the savings data
  useEffect(() => {
    if (!filterMonth && !filterYear) {
      setFilteredSavings(savingsData);
    }
  }, [filterMonth, filterYear]);

  // Handle filtering of savings data
  const handleSearch = () => {
    const filtered = savingsData.filter((entry) => {
      return (
        (filterMonth ? filterMonth === entry.month : true) &&
        (filterYear ? filterYear === entry.year : true)
      );
    });
    setFilteredSavings(filtered);
  };

  // Calculate total savings for the filtered data
  const totalSavings = filteredSavings.reduce(
    (sum, entry) => sum + entry.amount,
    0
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Sticky Header */}
      <div className=" top-0 z-50 bg-white shadow-md">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Monthly Savings Overview
        </h2>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-6xl mb-6">
          <select
            name="filterMonth"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="border p-2 rounded w-full sm:w-auto"
          >
            <option value="">All Months</option>
            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>

          <select
            name="filterYear"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="border p-2 rounded w-full sm:w-auto"
          >
            <option value="">All Years</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>

          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Search
          </button>
        </div>

        {/* Statistics Section */}
        <div className="bg-white p-4 rounded-lg shadow-md text-center w-full max-w-4xl mb-6">
          <h3 className="text-lg font-semibold">Total Savings</h3>
          <p className="text-2xl text-green-600 font-bold">${totalSavings}</p>
        </div>

        {/* Savings Table */}
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Savings Details
          </h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 border border-gray-300">Month</th>
                <th className="p-3 border border-gray-300">Year</th>
                <th className="p-3 border border-gray-300">Savings ($)</th>
              </tr>
            </thead>
            <tbody>
              {filteredSavings.map((entry, index) => (
                <tr key={index} className="border border-gray-300 text-center">
                  <td className="p-3">{entry.month}</td>
                  <td className="p-3">{entry.year}</td>
                  <td className="p-3 font-semibold text-green-500">
                    ${entry.amount}
                  </td>
                </tr>
              ))}
              {filteredSavings.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-3 text-center text-gray-500">
                    No savings found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Savings Trend Chart */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl mt-8">
          <h3 className="text-lg font-semibold text-center mb-4">
            Savings Trend Over the Year
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={filteredSavings}>
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

      {/* Sticky Footer */}
      <Footer />
    </div>
  );
}
