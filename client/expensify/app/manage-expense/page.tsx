"use client";
import Header from "@/components/Header";
import React, { useState } from "react";

interface Expense {
  id: number;
  title: string;
  amount: number;
  date: string;
}

const ManageExpense: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, title: "Grocery Shopping", amount: 80, date: "2025-02-25" },
    { id: 2, title: "Electricity Bill", amount: 60, date: "2025-02-26" },
  ]);

  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    title: "",
    amount: 0,
    date: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleAddExpense = () => {
    if (newExpense.title && newExpense.amount && newExpense.date) {
      const expense: Expense = {
        id: expenses.length + 1,
        title: newExpense.title as string,
        amount: Number(newExpense.amount),
        date: newExpense.date as string,
      };
      setExpenses([...expenses, expense]);
      setNewExpense({ title: "", amount: 0, date: "" });
    }
  };

  const handleDeleteExpense = (id: number) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <Header />
      <h2>Manage Expenses</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newExpense.title || ""}
          onChange={handleInputChange}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newExpense.amount || ""}
          onChange={handleInputChange}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="date"
          name="date"
          value={newExpense.date || ""}
          onChange={handleInputChange}
          style={{ marginRight: "0.5rem" }}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid #ccc" }}>
            <th style={{ padding: "0.5rem" }}>#</th>
            <th style={{ padding: "0.5rem" }}>Title</th>
            <th style={{ padding: "0.5rem" }}>Amount</th>
            <th style={{ padding: "0.5rem" }}>Date</th>
            <th style={{ padding: "0.5rem" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "0.5rem" }}>{index + 1}</td>
              <td style={{ padding: "0.5rem" }}>{expense.title}</td>
              <td style={{ padding: "0.5rem" }}>${expense.amount}</td>
              <td style={{ padding: "0.5rem" }}>{expense.date}</td>
              <td style={{ padding: "0.5rem" }}>
                <button onClick={() => handleDeleteExpense(expense.id)}>
                  Delete
                </button>
                {/* You could add an Edit button and functionality here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageExpense;
