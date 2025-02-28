"use client";
import Header from "@/components/Header";
import React, { useState } from "react";

interface Income {
  id: number;
  title: string;
  amount: number;
  date: string;
}

const AddIncome: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([
    { id: 1, title: "Salary", amount: 3000, date: "2025-02-28" },
  ]);

  const [newIncome, setNewIncome] = useState<Partial<Income>>({
    title: "",
    amount: 0,
    date: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewIncome({ ...newIncome, [e.target.name]: e.target.value });
  };

  const handleAddIncome = () => {
    if (newIncome.title && newIncome.amount && newIncome.date) {
      const income: Income = {
        id: incomes.length + 1,
        title: newIncome.title as string,
        amount: Number(newIncome.amount),
        date: newIncome.date as string,
      };
      setIncomes([...incomes, income]);
      setNewIncome({ title: "", amount: 0, date: "" });
    }
  };

  const handleDeleteIncome = (id: number) => {
    setIncomes(incomes.filter((income) => income.id !== id));
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      <Header />
      <h2>Add Income</h2>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newIncome.title || ""}
          onChange={handleInputChange}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newIncome.amount || ""}
          onChange={handleInputChange}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="date"
          name="date"
          value={newIncome.date || ""}
          onChange={handleInputChange}
          style={{ marginRight: "0.5rem" }}
        />
        <button onClick={handleAddIncome}>Add Income</button>
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
          {incomes.map((income, index) => (
            <tr key={income.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "0.5rem" }}>{index + 1}</td>
              <td style={{ padding: "0.5rem" }}>{income.title}</td>
              <td style={{ padding: "0.5rem" }}>${income.amount}</td>
              <td style={{ padding: "0.5rem" }}>{income.date}</td>
              <td style={{ padding: "0.5rem" }}>
                <button onClick={() => handleDeleteIncome(income.id)}>
                  Delete
                </button>
                {/* Add edit functionality if needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AddIncome;
