"use client";
import React, { useState, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  CREATE_TRANSACTION,
  UPDATE_TRANSACTION,
  DELETE_TRANSACTION,
} from "@/graphql/mutations";
import { GET_TRANSACTIONS } from "@/graphql/queries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loading from "../loading";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  isIncome: boolean;
}

const ManageTransactions: React.FC = () => {
  const [transactionForm, setTransactionForm] = useState<Partial<Transaction>>({
    title: "",
    amount: 0,
    date: "",
    category: "",
    isIncome: false,
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterMonth, setFilterMonth] = useState<string>("");
  const [filterYear, setFilterYear] = useState<string>("");
  const { loading, error, data, refetch } = useQuery(GET_TRANSACTIONS, {
    variables: { skip: 0, take: 50 },
    fetchPolicy: "network-only",
  });
  const transactions: Transaction[] = data?.getTransactions || [];
  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    onCompleted: () => refetch(),
  });
  const [updateTransaction] = useMutation(UPDATE_TRANSACTION, {
    onCompleted: () => refetch(),
  });
  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    onCompleted: () => refetch(),
  });
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const tDate = new Date(t.date);
      const tMonth = (tDate.getMonth() + 1).toString().padStart(2, "0");
      const tYear = tDate.getFullYear().toString();

      const matchMonth = filterMonth ? filterMonth === tMonth : true;
      const matchYear = filterYear ? filterYear === tYear : true;

      return matchMonth && matchYear;
    });
  }, [transactions, filterMonth, filterYear]);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTransactionForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleIncomeCheckbox = () => {
    setTransactionForm((prev) => ({ ...prev, isIncome: true }));
  };

  const handleExpenseCheckbox = () => {
    setTransactionForm((prev) => ({ ...prev, isIncome: false }));
  };
  const handleSaveTransaction = async () => {
    const { title, amount, date, category, isIncome } = transactionForm;
    if (!title || !amount || !date || !category) return;

    try {
      if (editingId) {
        await updateTransaction({
          variables: {
            id: editingId,
            title,
            amount: parseFloat(String(amount)),
            date: new Date(date).toISOString(),
            category,
            isIncome,
          },
        });
        setEditingId(null);
      } else {
        await createTransaction({
          variables: {
            title,
            amount: parseFloat(String(amount)),
            date: new Date(date).toISOString(),
            category,
            isIncome,
          },
        });
      }
      setTransactionForm({
        title: "",
        amount: 0,
        date: "",
        category: "",
        isIncome: false,
      });
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };
  const handleEditTransaction = (id: string) => {
    const tToEdit = transactions.find((t) => t.id === id);
    if (tToEdit) {
      setTransactionForm(tToEdit);
      setEditingId(id);
    }
  };
  const handleDeleteTransaction = async (id: string) => {
    try {
      await deleteTransaction({ variables: { id } });
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <div className="flex-1 w-full max-w-7xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          Manage Transactions
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">
            {editingId ? "Update Transaction" : "Add Transaction"}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={transactionForm.title || ""}
              onChange={handleInputChange}
              className="border rounded-lg p-3 w-full"
            />
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={transactionForm.amount || ""}
              onChange={handleInputChange}
              className="border rounded-lg p-3 w-full"
            />
            <input
              type="date"
              name="date"
              value={transactionForm.date || ""}
              onChange={handleInputChange}
              className="border rounded-lg p-3 w-full"
            />
            <select
              name="category"
              value={transactionForm.category || ""}
              onChange={handleInputChange}
              className="border rounded-lg p-3 w-full"
            >
              <option value="">Select Category</option>
              <option value="Groceries">Groceries</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Salary">Salary</option>
              <option value="Business">Business</option>
              <option value="Investments">Investments</option>
              <option value="Other">Other</option>
            </select>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="incomeCheckbox"
                  checked={transactionForm.isIncome === true}
                  onChange={handleIncomeCheckbox}
                />
                Income
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="expenseCheckbox"
                  checked={transactionForm.isIncome === false}
                  onChange={handleExpenseCheckbox}
                />
                Expense
              </label>
            </div>
          </div>

          <button
            onClick={handleSaveTransaction}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-green-900 hover:bg-green-400 text-white rounded-lg transition w-full text-lg"
          >
            {editingId ? "Update Transaction" : "Add Transaction"}
          </button>
        </div>
        <div className="flex flex-wrap items-center mb-4">
          <label className="mr-2">Filter by Month:</label>
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="border rounded-lg p-2 mr-4"
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

          <label className="mr-2">Filter by Year:</label>
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            className="border rounded-lg p-2"
          >
            <option value="">All Years</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
            <option value="2030">2030</option>
          </select>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error.message}</p>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
            <h3 className="text-lg font-medium text-gray-800 mb-4 text-center">
              Transaction List
            </h3>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 border border-gray-300">#</th>
                  <th className="p-3 border border-gray-300">Title</th>
                  <th className="p-3 border border-gray-300">Amount</th>
                  <th className="p-3 border border-gray-300">Category</th>
                  <th className="p-3 border border-gray-300">Date</th>
                  <th className="p-3 border border-gray-300">Type</th>
                  <th className="p-3 border border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    className="border border-gray-300 text-center"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{transaction.title}</td>
                    <td className="p-3">${transaction.amount}</td>
                    <td className="p-3">{transaction.category}</td>
                    <td className="p-3">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      {transaction.isIncome ? "Income" : "Expense"}
                    </td>
                    <td className="p-3 flex justify-center gap-2">
                      <button
                        onClick={() => handleEditTransaction(transaction.id)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTransaction(transaction.id)}
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

export default ManageTransactions;
