"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface Expense {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  date: string;
}

const UserStates: React.FC = () => {
  const COLORS = ["#FF4D4D", "#4CAF50", "#FFBB28", "#FF8042"];
  const [filterMonth, setFilterMonth] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");

  const { loading, error, data } = useQuery(GET_USER);
  const expenses: Expense[] = data?.user?.expenses || [];

  const filteredData = useMemo(() => {
    if (!filterMonth && !filterYear) return expenses;

    return expenses.filter((entry) => {
      const entryDate = new Date(entry.date);
      const entryMonth = (entryDate.getMonth() + 1).toString().padStart(2, "0");
      const entryYear = entryDate.getFullYear().toString();
      return (
        (filterMonth ? filterMonth === entryMonth : true) &&
        (filterYear ? filterYear === entryYear : true)
      );
    });
  }, [filterMonth, filterYear, expenses]);

  const sortedData = [...filteredData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const totalIncome = useMemo(() => {
    return filteredData
      .filter((entry) => entry.type.toLowerCase() === "income")
      .reduce((sum, entry) => sum + entry.amount, 0);
  }, [filteredData]);

  const totalExpense = useMemo(() => {
    return filteredData
      .filter((entry) => entry.type.toLowerCase() === "expense")
      .reduce((sum, entry) => sum + entry.amount, 0);
  }, [filteredData]);

  const categoryData = useMemo(() => {
    const categoryMap = new Map<string, number>();

    filteredData.forEach((entry) => {
      if (entry.type.toLowerCase() === "expense") {
        categoryMap.set(
          entry.category,
          (categoryMap.get(entry.category) || 0) + entry.amount
        );
      }
    });

    return Array.from(categoryMap.entries()).map(([name, value], index) => ({
      name,
      value,
      color: COLORS[index % COLORS.length],
    }));
  }, [filteredData]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col items-center px-4 sm:px-6 py-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Your Statistics
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center justify-center">
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="border rounded-lg p-3 text-sm md:text-base"
          >
            <option value="">All Months</option>
            {Array.from({ length: 12 }, (_, i) => {
              const month = (i + 1).toString().padStart(2, "0");
              return (
                <option key={month} value={month}>
                  {new Date(2025, i, 1).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              );
            })}
          </select>

          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="border rounded-lg p-3 text-sm md:text-base"
          >
            <option value="">All Years</option>
            {[2023, 2024, 2025, 2026].map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 mb-6 text-center w-full justify-center">
          <div className="p-4 bg-gray-100 rounded-lg shadow-md w-full sm:w-auto">
            <h3 className="text-sm md:text-lg font-semibold text-gray-700">
              Total Expense
            </h3>
            <p className="text-xl md:text-2xl font-bold text-red-500">
              ${totalExpense}
            </p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg shadow-md w-full sm:w-auto">
            <h3 className="text-sm md:text-lg font-semibold text-gray-700">
              Total Income
            </h3>
            <p className="text-xl md:text-2xl font-bold text-green-500">
              ${totalIncome}
            </p>
          </div>
        </div>

        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-4 sm:p-8 mb-8">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-2 sm:p-3 border border-gray-300">#</th>
                  <th className="p-2 sm:p-3 border border-gray-300">Title</th>
                  <th className="p-2 sm:p-3 border border-gray-300">Amount</th>
                  <th className="p-2 sm:p-3 border border-gray-300">Type</th>
                  <th className="p-2 sm:p-3 border border-gray-300">
                    Category
                  </th>
                  <th className="p-2 sm:p-3 border border-gray-300">Date</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className="border border-gray-300 text-center"
                  >
                    <td className="p-2 sm:p-3">{index + 1}</td>
                    <td className="p-2 sm:p-3">{entry.title}</td>
                    <td className="p-2 sm:p-3">${entry.amount}</td>
                    <td
                      className={`p-2 sm:p-3 font-semibold ${
                        entry.type.toLowerCase() === "expense"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {entry.type.toUpperCase()}
                    </td>
                    <td className="p-2 sm:p-3">{entry.category}</td>
                    <td className="p-2 sm:p-3">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-full max-w-md min-w-[300px] bg-white shadow-lg rounded-lg p-4 sm:p-8">
          <h3 className="text-lg font-semibold text-center mb-4">
            Expense Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserStates;
