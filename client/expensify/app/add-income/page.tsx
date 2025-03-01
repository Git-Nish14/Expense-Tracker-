"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_INCOMES } from "@/graphql/queries";
import {
  CREATE_INCOME,
  UPDATE_INCOME,
  DELETE_INCOME,
} from "@/graphql/mutations";

interface Income {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}

const ManageIncome: React.FC = () => {
  const [newIncome, setNewIncome] = useState<Partial<Income>>({
    title: "",
    amount: 0,
    date: "",
    category: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterMonth, setFilterMonth] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");

  // Fetch incomes
  const { loading, error, data, refetch } = useQuery(GET_INCOMES);
  const incomes: Income[] = data?.getIncomes || [];

  // Mutations with refetch
  const [createIncome] = useMutation(CREATE_INCOME, {
    onCompleted: () => refetch(),
  });
  const [updateIncome] = useMutation(UPDATE_INCOME, {
    onCompleted: () => refetch(),
  });
  const [deleteIncome] = useMutation(DELETE_INCOME, {
    onCompleted: () => refetch(),
  });

  const filteredIncomes = useMemo(() => {
    return incomes.filter((income) => {
      const incomeDate = new Date(income.date);
      const incMonth = (incomeDate.getMonth() + 1).toString().padStart(2, "0");
      const incYear = incomeDate.getFullYear().toString();
      return (
        (filterMonth ? filterMonth === incMonth : true) &&
        (filterYear ? filterYear === incYear : true)
      );
    });
  }, [filterMonth, filterYear, incomes]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNewIncome({ ...newIncome, [e.target.name]: e.target.value });
  };

  const handleAddIncome = async () => {
    if (
      newIncome.title &&
      newIncome.amount &&
      newIncome.date &&
      newIncome.category
    ) {
      await createIncome({
        variables: {
          title: newIncome.title,
          amount: parseFloat(newIncome.amount as unknown as string),
          date: new Date(newIncome.date as string).toISOString(),
          category: newIncome.category,
        },
      });
      setNewIncome({ title: "", amount: 0, date: "", category: "" });
    }
  };

  const handleEditIncome = (id: string) => {
    const incomeToEdit = incomes.find((inc) => inc.id === id);
    if (incomeToEdit) {
      setNewIncome(incomeToEdit);
      setEditingId(id);
    }
  };

  const handleUpdateIncome = async () => {
    if (
      editingId &&
      newIncome.title &&
      newIncome.amount &&
      newIncome.date &&
      newIncome.category
    ) {
      await updateIncome({
        variables: {
          id: editingId,
          title: newIncome.title,
          amount: parseFloat(newIncome.amount as unknown as string),
          date: new Date(newIncome.date as string).toISOString(),
          category: newIncome.category,
        },
      });
      setNewIncome({ title: "", amount: 0, date: "", category: "" });
      setEditingId(null);
    }
  };

  const handleDeleteIncome = async (id: string) => {
    await deleteIncome({ variables: { id } });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex-1 w-full max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Income Dashboard
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">
            {editingId ? "Update Income" : "Add Income"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newIncome.title || ""}
              onChange={handleInputChange}
              className="border rounded-lg p-3 w-full"
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={newIncome.amount || ""}
              onChange={handleInputChange}
              className="border rounded-lg p-3 w-full"
            />
            <input
              type="date"
              name="date"
              value={newIncome.date || ""}
              onChange={handleInputChange}
              className="border rounded-lg p-3 w-full"
            />
            <select
              name="category"
              value={newIncome.category || ""}
              onChange={handleInputChange}
              className="border rounded-lg p-3 w-full"
            >
              <option value="">Select Category</option>
              <option value="Salary">Salary</option>
              <option value="Business">Business</option>
              <option value="Investments">Investments</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button
            onClick={editingId ? handleUpdateIncome : handleAddIncome}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-green-900 hover:bg-green-400 text-white rounded-lg transition w-full text-lg"
          >
            {editingId ? "Update Income" : "Add Income"}
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error.message}</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto mt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">
              Income List
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
                {filteredIncomes.map((income, index) => (
                  <tr
                    key={income.id}
                    className="border border-gray-300 text-center"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{income.title}</td>
                    <td className="p-3">${income.amount}</td>
                    <td className="p-3">{income.category}</td>
                    <td className="p-3">
                      {new Date(income.date).toLocaleDateString()}
                    </td>
                    <td className="p-3 flex justify-center gap-2">
                      <button
                        onClick={() => handleEditIncome(income.id)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteIncome(income.id)}
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

export default ManageIncome;
