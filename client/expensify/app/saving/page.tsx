"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "@/graphql/queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "../loading";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Define a union type for month abbreviations
type MonthAbbr =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

// Mapping for month abbreviations to their numeric values
const monthMap: Record<MonthAbbr, number> = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

// Helper: Given a string label, return the month index if valid, or 0 as fallback.
function getMonthIndex(label: string): number {
  if (
    label === "Jan" ||
    label === "Feb" ||
    label === "Mar" ||
    label === "Apr" ||
    label === "May" ||
    label === "Jun" ||
    label === "Jul" ||
    label === "Aug" ||
    label === "Sep" ||
    label === "Oct" ||
    label === "Nov" ||
    label === "Dec"
  ) {
    return monthMap[label as MonthAbbr];
  }
  return 0;
}

// Helper: Convert numeric month (e.g. 1) to month abbreviation (e.g. "Jan")
function getMonthLabel(monthNumber: number): MonthAbbr {
  const months: MonthAbbr[] = [
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
  ];
  return months[monthNumber - 1];
}

// Interface for a savings entry (can be negative)
interface SavingsEntry {
  month: string;
  year: string;
  amount: number;
}

// Interface for a transaction (adjust as needed)
interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  isIncome: boolean;
}

// Filter dropdown arrays
const monthsDropdown = [
  { value: "", label: "All Months" },
  { value: "Jan", label: "January" },
  { value: "Feb", label: "February" },
  { value: "Mar", label: "March" },
  { value: "Apr", label: "April" },
  { value: "May", label: "May" },
  { value: "Jun", label: "June" },
  { value: "Jul", label: "July" },
  { value: "Aug", label: "August" },
  { value: "Sep", label: "September" },
  { value: "Oct", label: "October" },
  { value: "Nov", label: "November" },
  { value: "Dec", label: "December" },
];

const yearsDropdown = [
  { value: "", label: "All Years" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
];

export default function SavingsPage() {
  // Page loading state (simulate loading after page change)
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  // Filter states
  const [filterMonth, setFilterMonth] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");

  // Simulate a loading spinner when the page mounts (e.g., when user returns to this page)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 500); // Adjust delay as needed
    return () => clearTimeout(timer);
  }, []);

  // Fetch transactions dynamically
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  if (loading || pageLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">Error: {error.message}</p>
      </div>
    );
  }

  const transactions: Transaction[] = data?.getTransactions || [];

  // Compute monthly savings from transactions:
  // Group transactions by year and month then subtract total expense from total income.
  const monthlySavings: SavingsEntry[] = useMemo(() => {
    type MonthKey = string; // "YYYY-MM"
    interface MonthData {
      totalIncome: number;
      totalExpense: number;
    }
    const map: Record<MonthKey, MonthData> = {};

    transactions.forEach((t) => {
      const d = new Date(t.date);
      const year = d.getFullYear().toString();
      const monthNum = d.getMonth() + 1; // 1-based
      const key = `${year}-${String(monthNum).padStart(2, "0")}`;
      if (!map[key]) {
        map[key] = { totalIncome: 0, totalExpense: 0 };
      }
      if (t.isIncome) {
        map[key].totalIncome += t.amount;
      } else {
        map[key].totalExpense += t.amount;
      }
    });

    const result: SavingsEntry[] = Object.entries(map).map(([key, val]) => {
      const [yearStr, monthStr] = key.split("-");
      const monthNumber = parseInt(monthStr, 10);
      const monthAbbr = getMonthLabel(monthNumber);
      const savings = val.totalIncome - val.totalExpense;
      return {
        month: monthAbbr,
        year: yearStr,
        amount: savings,
      };
    });

    // Sort the results by year, then by month
    result.sort((a, b) => {
      if (a.year === b.year) {
        return getMonthIndex(a.month) - getMonthIndex(b.month);
      }
      return parseInt(a.year) - parseInt(b.year);
    });
    return result;
  }, [transactions]);

  // Filter monthly savings based on selected month and year
  const filteredSavings = useMemo(() => {
    return monthlySavings.filter((entry) => {
      const matchMonth = filterMonth ? entry.month === filterMonth : true;
      const matchYear = filterYear ? entry.year === filterYear : true;
      return matchMonth && matchYear;
    });
  }, [monthlySavings, filterMonth, filterYear]);

  // Calculate total savings from filtered data
  const totalSavings = filteredSavings.reduce(
    (sum, entry) => sum + entry.amount,
    0
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Sticky Header */}
      <div className="top-0 z-50 bg-white shadow-md">
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
            {monthsDropdown.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>

          <select
            name="filterYear"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="border p-2 rounded w-full sm:w-auto"
          >
            {yearsDropdown.map((y) => (
              <option key={y.value} value={y.value}>
                {y.label}
              </option>
            ))}
          </select>
        </div>

        {/* Statistics Section */}
        <div className="bg-white p-4 rounded-lg shadow-md text-center w-full max-w-4xl mb-6">
          <h3 className="text-lg font-semibold">Total Savings</h3>
          <p
            className={`text-2xl font-bold ${
              totalSavings < 0 ? "text-red-600" : "text-green-600"
            }`}
          >
            ${totalSavings}
          </p>
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
                  <td
                    className={`p-3 font-semibold ${
                      entry.amount < 0 ? "text-red-500" : "text-green-500"
                    }`}
                  >
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
