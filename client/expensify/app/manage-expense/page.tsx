"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EXPENSES } from "@/graphql/queries";
import {
  CREATE_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
} from "@/graphql/mutations";

interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}

const ManageExpense: React.FC = () => {
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    title: "",
    amount: 0,
    date: "",
    category: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterMonth, setFilterMonth] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");

  const { loading, error, data, refetch } = useQuery(GET_EXPENSES);
  const expenses: Expense[] = data?.getExpenses || [];

  const [createExpense] = useMutation(CREATE_EXPENSE, {
    onCompleted: () => refetch(),
  });
  const [updateExpense] = useMutation(UPDATE_EXPENSE, {
    onCompleted: () => refetch(),
  });
  const [deleteExpense] = useMutation(DELETE_EXPENSE, {
    onCompleted: () => refetch(),
  });

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const expMonth = (expenseDate.getMonth() + 1).toString().padStart(2, "0");
      const expYear = expenseDate.getFullYear().toString();
      return (
        (filterMonth ? filterMonth === expMonth : true) &&
        (filterYear ? filterYear === expYear : true)
      );
    });
  }, [filterMonth, filterYear, expenses]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleAddExpense = async () => {
    if (
      newExpense.title &&
      newExpense.amount &&
      newExpense.date &&
      newExpense.category
    ) {
      await createExpense({
        variables: {
          title: newExpense.title,
          amount: parseFloat(newExpense.amount as unknown as string),
          date: new Date(newExpense.date as string).toISOString(),
          category: newExpense.category,
        },
      });
      setNewExpense({ title: "", amount: 0, date: "", category: "" });
    }
  };

  const handleEditExpense = (id: string) => {
    const expenseToEdit = expenses.find((exp) => exp.id === id);
    if (expenseToEdit) {
      setNewExpense(expenseToEdit);
      setEditingId(id);
    }
  };

  const handleUpdateExpense = async () => {
    if (
      editingId &&
      newExpense.title &&
      newExpense.amount &&
      newExpense.date &&
      newExpense.category
    ) {
      await updateExpense({
        variables: {
          id: editingId,
          title: newExpense.title,
          amount: parseFloat(newExpense.amount as unknown as string),
          date: new Date(newExpense.date as string).toISOString(),
          category: newExpense.category,
        },
      });
      setNewExpense({ title: "", amount: 0, date: "", category: "" });
      setEditingId(null);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    await deleteExpense({ variables: { id } });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-1 w-full max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Expense Dashboard
        </h2>

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
              <option value="Other">Other</option>
            </select>
          </div>
          <button
            onClick={editingId ? handleUpdateExpense : handleAddExpense}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 hover:bg-indigo-400 text-white rounded-lg transition w-full text-lg"
          >
            {editingId ? "Update Expense" : "Add Expense"}
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error.message}</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">
              Expense List
            </h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 border border-gray-300">#</th>
                  <th className="p-3 border border-gray-300">Title</th>
                  <th className="p-3 border border-gray-300">Amount</th>
                  <th className="p-3 border border-gray-300">Category</th>
                  <th className="p-3 border border-gray-300">Date</th>
                  <th className="p-3 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense, index) => (
                  <tr
                    key={expense.id}
                    className="border border-gray-300 text-center"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{expense.title}</td>
                    <td className="p-3">${expense.amount}</td>
                    <td className="p-3">{expense.category}</td>
                    <td className="p-3">
                      {new Date(expense.date).toLocaleDateString()}
                    </td>
                    <td className="p-3 flex justify-center gap-2">
                      <button
                        onClick={() => handleEditExpense(expense.id)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                      >
                        Edit
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
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ManageExpense;
