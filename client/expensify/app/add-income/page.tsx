"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from "react";

interface Income {
  id: number;
  title: string;
  amount: number;
  date: string;
}

const AddIncome: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([
    {
      id: 1,
      title: "Salary",
      amount: 3000,
      date: "2025-02-28",
    },
  ]);

  const [filteredIncomes, setFilteredIncomes] = useState<Income[]>(incomes);

  const [newIncome, setNewIncome] = useState<Partial<Income>>({
    title: "",
    amount: 0,
    date: "",
  });

  const [editId, setEditId] = useState<number | null>(null);

  // Filter states for month and year
  const [filterMonth, setFilterMonth] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");

  // If no filter is applied, keep the filtered list up-to-date with incomes
  useEffect(() => {
    if (!filterMonth && !filterYear) {
      setFilteredIncomes(incomes);
    }
  }, [incomes, filterMonth, filterYear]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewIncome({ ...newIncome, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdateIncome = () => {
    if (newIncome.title && newIncome.amount && newIncome.date) {
      if (editId !== null) {
        setIncomes((prev) =>
          prev.map((inc) =>
            inc.id === editId ? { ...inc, ...newIncome } : inc
          )
        );
        setEditId(null);
      } else {
        const income: Income = {
          id: incomes.length + 1,
          title: newIncome.title as string,
          amount: Number(newIncome.amount),
          date: newIncome.date as string,
        };
        setIncomes([...incomes, income]);
      }
      setNewIncome({ title: "", amount: 0, date: "" });
    }
  };

  const handleDeleteIncome = (id: number) => {
    setIncomes(incomes.filter((income) => income.id !== id));
  };

  const handleEditIncome = (income: Income) => {
    setNewIncome(income);
    setEditId(income.id);
  };

  // Filter incomes based on selected month and year when Search is clicked
  const handleSearch = () => {
    const filtered = incomes.filter((income) => {
      const incomeDate = new Date(income.date);
      const month = (incomeDate.getMonth() + 1).toString().padStart(2, "0");
      const year = incomeDate.getFullYear().toString();
      return (
        (filterMonth ? filterMonth === month : true) &&
        (filterYear ? filterYear === year : true)
      );
    });
    setFilteredIncomes(filtered);
  };

  // Compute statistics from filtered incomes
  const totalIncome = filteredIncomes.reduce(
    (sum, income) => sum + income.amount,
    0
  );
  const totalEntries = filteredIncomes.length;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Sticky Header */}
      <div className="top-0 z-50 bg-white shadow-md">
        <Header />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center p-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Income Dashboard
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
            className="border p-2 rounded w-full sm:w-auto"
          >
            <option value="">All Years</option>
            <option value="2023">2023</option>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 w-full max-w-6xl">
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">Total Income</h3>
            <p className="text-2xl text-green-600 font-bold">${totalIncome}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold">Total Entries</h3>
            <p className="text-2xl font-bold">{totalEntries}</p>
          </div>
        </div>

        {/* Income List */}
        <div className="w-full max-w-6xl bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4">Income List</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">#</th>
                <th className="p-2">Title</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Date</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIncomes.length > 0 ? (
                filteredIncomes.map((income, index) => (
                  <tr key={income.id} className="border-t text-center">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{income.title}</td>
                    <td className="p-2">${income.amount}</td>
                    <td className="p-2">{income.date}</td>
                    <td className="p-2 flex space-x-2 justify-center">
                      <button
                        onClick={() => handleEditIncome(income)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteIncome(income.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-2 text-center text-gray-500">
                    No incomes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Sticky Footer */}
      <Footer />
    </div>
  );
};

export default AddIncome;
