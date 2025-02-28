"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState, useEffect } from "react";

interface Expense {
  id: number;
  title: string;
  amount: number;
  date: string;
  category: string;
}

const ManageExpense: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: 1,
      title: "Grocery Shopping",
      amount: 80,
      date: "2025-02-25",
      category: "Grocery",
    },
    {
      id: 2,
      title: "Electricity Bill",
      amount: 60,
      date: "2025-02-26",
      category: "Home",
    },
  ]);

  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    title: "",
    amount: 0,
    date: "",
    category: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  // Filter states for month and year and filtered expenses list
  const [filterMonth, setFilterMonth] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>(expenses);

  // When expenses change and no filter is applied, update the filteredExpenses list.
  useEffect(() => {
    if (!filterMonth && !filterYear) {
      setFilteredExpenses(expenses);
    }
  }, [expenses, filterMonth, filterYear]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleAddExpense = () => {
    if (
      newExpense.title &&
      newExpense.amount &&
      newExpense.date &&
      newExpense.category
    ) {
      const expense: Expense = {
        id: expenses.length + 1,
        title: newExpense.title as string,
        amount: Number(newExpense.amount),
        date: newExpense.date as string,
        category: newExpense.category as string,
      };
      const updatedExpenses = [...expenses, expense];
      setExpenses(updatedExpenses);
      // Update filteredExpenses if no filter is applied
      if (!filterMonth && !filterYear) {
        setFilteredExpenses(updatedExpenses);
      }
      setNewExpense({ title: "", amount: 0, date: "", category: "" });
    }
  };

  const handleEditExpense = (id: number) => {
    const expenseToEdit = expenses.find((exp) => exp.id === id);
    if (expenseToEdit) {
      setNewExpense(expenseToEdit);
      setEditingId(id);
    }
  };

  const handleUpdateExpense = () => {
    if (
      editingId !== null &&
      newExpense.title &&
      newExpense.amount &&
      newExpense.date &&
      newExpense.category
    ) {
      const updatedExpenses = expenses.map((exp) =>
        exp.id === editingId ? { ...exp, ...newExpense } : exp
      );
      setExpenses(updatedExpenses);
      if (!filterMonth && !filterYear) {
        setFilteredExpenses(updatedExpenses);
      }
      setNewExpense({ title: "", amount: 0, date: "", category: "" });
      setEditingId(null);
    }
  };

  const handleDeleteExpense = (id: number) => {
    const updatedExpenses = expenses.filter((exp) => exp.id !== id);
    setExpenses(updatedExpenses);
    if (!filterMonth && !filterYear) {
      setFilteredExpenses(updatedExpenses);
    }
  };

  // Filter expenses based on selected month and year
  const handleSearch = () => {
    const filtered = expenses.filter((exp) => {
      const expenseDate = new Date(exp.date);
      const expMonth = (expenseDate.getMonth() + 1).toString().padStart(2, "0");
      const expYear = expenseDate.getFullYear().toString();
      return (
        (filterMonth ? filterMonth === expMonth : true) &&
        (filterYear ? filterYear === expYear : true)
      );
    });
    setFilteredExpenses(filtered);
  };

  // Calculate statistics from filteredExpenses
  const totalExpenseAmount = filteredExpenses.reduce(
    (acc, exp) => acc + exp.amount,
    0
  );
  const totalEntries = filteredExpenses.length;
  const expenseCategories = [
    ...new Set(filteredExpenses.map((exp) => exp.category)),
  ].join(", ");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-1 w-full max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Expense Dashboard
        </h2>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Total Expenses
            </h3>
            <p className="text-2xl font-bold text-red-500">
              ${totalExpenseAmount}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Expense Categories
            </h3>
            <p className="text-lg text-gray-600">
              {expenseCategories || "None"}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Total Entries
            </h3>
            <p className="text-2xl font-bold text-blue-500">{totalEntries}</p>
          </div>
        </div>

        {/* Main Content - Form & Expense List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Expense Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">
              {editingId ? "Update Expense" : "Add Expense"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newExpense.title || ""}
                onChange={handleInputChange}
                className="border rounded-lg p-3 w-full"
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                value={newExpense.amount || ""}
                onChange={handleInputChange}
                className="border rounded-lg p-3 w-full"
              />
              <input
                type="date"
                name="date"
                value={newExpense.date || ""}
                onChange={handleInputChange}
                className="border rounded-lg p-3 w-full"
              />
              <select
                name="category"
                value={newExpense.category || ""}
                onChange={handleInputChange}
                className="border rounded-lg p-3 w-full"
              >
                <option value="">Select Category</option>
                <option value="Grocery">Grocery</option>
                <option value="Home">Home</option>
                <option value="Transport">Transport</option>
                <option value="Health">Health</option>
                <option value="Entertainment">Entertainment</option>
              </select>
            </div>
            <button
              onClick={editingId ? handleUpdateExpense : handleAddExpense}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full text-lg"
            >
              {editingId ? "Update Expense" : "Add Expense"}
            </button>
          </div>

          {/* Expense List */}
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
            <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">
              Expense List
            </h3>

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

            <table className="w-full border-collapse border rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-left">
                  <th className="p-3">#</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense, index) => (
                  <tr
                    key={expense.id}
                    className="border-b border-gray-300 text-gray-700"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{expense.title}</td>
                    <td className="p-3">${expense.amount}</td>
                    <td className="p-3">{expense.date}</td>
                    <td className="p-3">{expense.category}</td>
                    <td className="p-3 flex space-x-2">
                      <button
                        onClick={() => handleEditExpense(expense.id)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredExpenses.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-3 text-center text-gray-500">
                      No expenses found for the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ManageExpense;
