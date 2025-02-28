"use client";
import Header from "@/components/Header";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
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
  // Example color palette
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Chart data – for demo purposes, we use the title as the name and amount as value
  const chartData = data.map((entry) => ({
    name: entry.title,
    amount: entry.amount,
  }));

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <Header />
      <h2>User States</h2>
      <div style={{ marginBottom: "2rem" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "2px solid #ccc" }}>
              <th style={{ padding: "0.5rem" }}>#</th>
              <th style={{ padding: "0.5rem" }}>Title</th>
              <th style={{ padding: "0.5rem" }}>Amount</th>
              <th style={{ padding: "0.5rem" }}>Type</th>
              <th style={{ padding: "0.5rem" }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, idx) => (
              <tr key={entry.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "0.5rem" }}>{entry.id}</td>
                <td style={{ padding: "0.5rem" }}>{entry.title}</td>
                <td style={{ padding: "0.5rem" }}>${entry.amount}</td>
                <td style={{ padding: "0.5rem" }}>{entry.type}</td>
                <td style={{ padding: "0.5rem" }}>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}
      >
        {/* Bar Chart */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Amount Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "1rem",
            borderRadius: "8px",
            boxShadow: "0 0 5px rgba(0,0,0,0.1)",
          }}
        >
          <h3>Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
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
    </div>
  );
};

// Dummy data for demonstration
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
];

export default function UserStatesPage() {
  return <UserStates data={dummyUserStatesData} />;
}
