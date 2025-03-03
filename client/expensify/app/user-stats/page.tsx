"use client";
import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "@/graphql/queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "../loading";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  isIncome: boolean;
}
const months = [
  { value: "", label: "All Months" },
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];
const years = [
  { value: "", label: "All Years" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
  { value: "2027", label: "2027" },
  { value: "2028", label: "2028" },
  { value: "2029", label: "2029" },
  { value: "2030", label: "2030" },
];
function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}
const INCOME_COLOR = "#4CAF50";
const EXPENSE_COLOR = "#F44336";
const generateColor = (): string =>
  `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;

const UserStats: React.FC = () => {
  const [barMonth, setBarMonth] = useState<string>("");
  const [barYear, setBarYear] = useState<string>("");
  const [pieIncomeMonth, setPieIncomeMonth] = useState<string>("");
  const [pieIncomeYear, setPieIncomeYear] = useState<string>("");
  const [pieExpenseMonth, setPieExpenseMonth] = useState<string>("");
  const [pieExpenseYear, setPieExpenseYear] = useState<string>("");
  const [lineYear, setLineYear] = useState<string>("");
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);
  const transactions: Transaction[] = data?.getTransactions || [];
  const barFiltered = useMemo(() => {
    return transactions.filter((t) => {
      const date = new Date(t.date);
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();

      const matchMonth = barMonth ? month === barMonth : true;
      const matchYear = barYear ? year === barYear : true;
      return matchMonth && matchYear;
    });
  }, [transactions, barMonth, barYear]);
  const barYearNum = parseInt(barYear || "0", 10);
  const barMonthNum = parseInt(barMonth || "0", 10);
  const daysInSelectedMonth =
    barMonth && barYear ? getDaysInMonth(barYearNum, barMonthNum) : 31;

  const dailyBarData = useMemo(() => {
    const map: Record<
      number,
      { day: number; income: number; expense: number }
    > = {};
    for (let d = 1; d <= daysInSelectedMonth; d++) {
      map[d] = { day: d, income: 0, expense: 0 };
    }

    barFiltered.forEach((t) => {
      const date = new Date(t.date);
      const day = date.getDate();
      if (map[day]) {
        if (t.isIncome) {
          map[day].income += t.amount;
        } else {
          map[day].expense += t.amount;
        }
      }
    });

    return Object.values(map);
  }, [barFiltered, daysInSelectedMonth]);
  const incomePieFiltered = useMemo(() => {
    return transactions.filter((t) => {
      if (!t.isIncome) return false;
      const date = new Date(t.date);
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();

      const matchMonth = pieIncomeMonth ? month === pieIncomeMonth : true;
      const matchYear = pieIncomeYear ? year === pieIncomeYear : true;
      return matchMonth && matchYear;
    });
  }, [transactions, pieIncomeMonth, pieIncomeYear]);
  const incomePieData = useMemo(() => {
    const categoryMap: Record<string, number> = {};
    incomePieFiltered.forEach((t) => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });
    return Object.entries(categoryMap).map(([cat, val]) => ({
      name: cat,
      value: val,
      color: generateColor(),
    }));
  }, [incomePieFiltered]);
  const expensePieFiltered = useMemo(() => {
    return transactions.filter((t) => {
      if (t.isIncome) return false;
      const date = new Date(t.date);
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();

      const matchMonth = pieExpenseMonth ? month === pieExpenseMonth : true;
      const matchYear = pieExpenseYear ? year === pieExpenseYear : true;
      return matchMonth && matchYear;
    });
  }, [transactions, pieExpenseMonth, pieExpenseYear]);
  const expensePieData = useMemo(() => {
    const categoryMap: Record<string, number> = {};
    expensePieFiltered.forEach((t) => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });
    return Object.entries(categoryMap).map(([cat, val]) => ({
      name: cat,
      value: val,
      color: generateColor(),
    }));
  }, [expensePieFiltered]);
  const lineData = useMemo(() => {
    const year = lineYear || "2025";
    return months.slice(1).map((m) => {
      const monthLabel = m.label;
      const monthValue = m.value;
      const incomeSum = transactions.reduce((sum, t) => {
        const d = new Date(t.date);
        const dMonth = (d.getMonth() + 1).toString().padStart(2, "0");
        const dYear = d.getFullYear().toString();
        if (t.isIncome && dMonth === monthValue && dYear === year) {
          return sum + t.amount;
        }
        return sum;
      }, 0);
      const expenseSum = transactions.reduce((sum, t) => {
        const d = new Date(t.date);
        const dMonth = (d.getMonth() + 1).toString().padStart(2, "0");
        const dYear = d.getFullYear().toString();
        if (!t.isIncome && dMonth === monthValue && dYear === year) {
          return sum + t.amount;
        }
        return sum;
      }, 0);

      return {
        month: monthLabel,
        income: incomeSum,
        expense: expenseSum,
      };
    });
  }, [transactions, lineYear]);
  if (loading) {
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
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Your Statistics</h2>
        <div className="mb-10 bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Daily Income vs. Expense
          </h3>
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            <div className="flex flex-col">
              <label className="mb-1">Month:</label>
              <select
                value={barMonth}
                onChange={(e) => setBarMonth(e.target.value)}
                className="border p-2 rounded w-full sm:w-auto"
              >
                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Year:</label>
              <select
                value={barYear}
                onChange={(e) => setBarYear(e.target.value)}
                className="border p-2 rounded w-full sm:w-auto"
              >
                {years.map((y) => (
                  <option key={y.value} value={y.value}>
                    {y.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyBarData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill={INCOME_COLOR} />
              <Bar dataKey="expense" fill={EXPENSE_COLOR} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mb-10 bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Income by Category
          </h3>
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            <div className="flex flex-col">
              <label className="mb-1">Month:</label>
              <select
                value={pieIncomeMonth}
                onChange={(e) => setPieIncomeMonth(e.target.value)}
                className="border p-2 rounded w-full sm:w-auto"
              >
                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Year:</label>
              <select
                value={pieIncomeYear}
                onChange={(e) => setPieIncomeYear(e.target.value)}
                className="border p-2 rounded w-full sm:w-auto"
              >
                {years.map((y) => (
                  <option key={y.value} value={y.value}>
                    {y.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {incomePieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={incomePieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {incomePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center">No income data for this filter.</p>
          )}
        </div>

        <div className="mb-10 bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Expense by Category
          </h3>
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            <div className="flex flex-col">
              <label className="mb-1">Month:</label>
              <select
                value={pieExpenseMonth}
                onChange={(e) => setPieExpenseMonth(e.target.value)}
                className="border p-2 rounded w-full sm:w-auto"
              >
                {months.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1">Year:</label>
              <select
                value={pieExpenseYear}
                onChange={(e) => setPieExpenseYear(e.target.value)}
                className="border p-2 rounded w-full sm:w-auto"
              >
                {years.map((y) => (
                  <option key={y.value} value={y.value}>
                    {y.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {expensePieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expensePieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {expensePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-center">No expense data for this filter.</p>
          )}
        </div>
        <div className="mb-10 bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Yearly Income vs. Expense
          </h3>
          <div className="flex flex-wrap gap-4 justify-center mb-4">
            <div className="flex flex-col">
              <label className="mb-1">Year:</label>
              <select
                value={lineYear}
                onChange={(e) => setLineYear(e.target.value)}
                className="border p-2 rounded w-full sm:w-auto"
              >
                {years.map((y) => (
                  <option key={y.value} value={y.value}>
                    {y.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke={INCOME_COLOR} />
              <Line type="monotone" dataKey="expense" stroke={EXPENSE_COLOR} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserStats;
