"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataEntry {
  id: number;
  title: string;
  amount: number;
  type: "Expense" | "Income";
  date: string;
}

interface UserStatesProps {
  data: DataEntry[];
}

const UserStates: React.FC<UserStatesProps> = ({ data }) => {
  // Example color palette for Expense Distribution chart
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Filter states for month and year
  const [filterMonth, setFilterMonth] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");

  // Local state for filtered data; initially show all data
  const [filteredData, setFilteredData] = useState<DataEntry[]>(data);

  // Update filteredData if data changes and no filter is applied
  useEffect(() => {
    if (!filterMonth && !filterYear) {
      setFilteredData(data);
    }
  }, [data, filterMonth, filterYear]);

  // Filter logic based on selected month and year
  const handleSearch = () => {
    const filtered = data.filter((entry) => {
      const entryDate = new Date(entry.date);
      const entryMonth = (entryDate.getMonth() + 1).toString().padStart(2, "0");
      const entryYear = entryDate.getFullYear().toString();
      return (
        (filterMonth ? filterMonth === entryMonth : true) &&
        (filterYear ? filterYear === entryYear : true)
      );
    });
    setFilteredData(filtered);
  };

  // Sort the filtered data (latest first)
  const sortedData = [...filteredData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Calculate totals from filtered data
  const totalIncome = sortedData
    .filter((entry) => entry.type === "Income")
    .reduce((sum, entry) => sum + entry.amount, 0);
  const totalExpense = sortedData
    .filter((entry) => entry.type === "Expense")
    .reduce((sum, entry) => sum + entry.amount, 0);

  // Chart data for the progress arc (Budget vs Expense)
  const progressData = [
    { name: "Expense", value: totalExpense, color: "#007bff" },
    { name: "Remaining", value: totalIncome - totalExpense, color: "#d3e3fc" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center px-6 py-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Your Statistics
        </h2>

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4 items-center justify-center">
          <select
            name="filterMonth"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">All Months</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <select
            name="filterYear"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="border rounded-lg p-3"
          >
            <option value="">All Years</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Search
          </button>
        </div>

        {/* Table Section */}
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 mb-8">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 border border-gray-300">#</th>
                  <th className="p-3 border border-gray-300">Title</th>
                  <th className="p-3 border border-gray-300">Amount</th>
                  <th className="p-3 border border-gray-300">Type</th>
                  <th className="p-3 border border-gray-300">Date</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className="border border-gray-300 text-center"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{entry.title}</td>
                    <td className="p-3">${entry.amount}</td>
                    <td
                      className={`p-3 font-semibold ${
                        entry.type === "Expense"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {entry.type}
                    </td>
                    <td className="p-3">{entry.date}</td>
                  </tr>
                ))}
                {sortedData.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-3 text-center text-gray-500">
                      No records found for the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          {/* Progress Arc Graph - Budget vs Expense */}
          <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-center mb-4">
              Budget vs Expense
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={progressData}
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={90}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={5}
                  label={false}
                >
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <p className="text-2xl font-bold">${totalExpense}</p>
              <p className="text-gray-600 text-sm">of ${totalIncome}</p>
            </div>
          </div>

          {/* Pie Chart - Expense Distribution */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold text-center mb-4">
              Expense Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sortedData.filter((entry) => entry.type === "Expense")}
                  dataKey="amount"
                  nameKey="title"
                  outerRadius={100}
                  label
                >
                  {sortedData
                    .filter((entry) => entry.type === "Expense")
                    .map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// Dummy data for demonstration (dates in different order)
const dummyUserStatesData: DataEntry[] = [
  { id: 1, title: "Grocery", amount: 80, type: "Expense", date: "2025-02-25" },
  { id: 2, title: "Salary", amount: 3000, type: "Income", date: "2025-02-28" },
  {
    id: 3,
    title: "Electricity Bill",
    amount: 60,
    type: "Expense",
    date: "2025-02-26",
  },
  {
    id: 4,
    title: "Freelance",
    amount: 1200,
    type: "Income",
    date: "2025-02-22",
  },
  {
    id: 5,
    title: "Dining Out",
    amount: 45,
    type: "Expense",
    date: "2025-02-24",
  },
];

export default function UserStatesPage() {
  return <UserStates data={dummyUserStatesData} />;
}
