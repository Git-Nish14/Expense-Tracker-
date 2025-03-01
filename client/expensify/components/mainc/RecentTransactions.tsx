import React from "react";

export interface Transaction {
  id: string;
  date: string;
  title: string;
  category: string;
  amount: number;
  type: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
}) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Recent Transactions
      </h2>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-100 text-gray-700 border-b">
                <th className="p-3 border border-gray-300">#</th>
                <th className="p-3 border border-gray-300">Title</th>
                <th className="p-3 border border-gray-300">Amount</th>
                <th className="p-3 border border-gray-300">Type</th>
                <th className="p-3 border border-gray-300">Category</th>
                <th className="p-3 border border-gray-300">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => {
                const transactionType = transaction.type?.toLowerCase();
                const formattedType = transactionType
                  ? transactionType.charAt(0).toUpperCase() +
                    transactionType.slice(1)
                  : "Unknown";

                const isExpense = transactionType === "expense";
                const isIncome = transactionType === "income";
                const formattedDate = new Date(
                  transaction.date
                ).toLocaleDateString();

                return (
                  <tr
                    key={transaction.id}
                    className="border-b text-gray-700 text-center"
                  >
                    <td className="p-3 border border-gray-300">{index + 1}</td>
                    <td className="p-3 border border-gray-300">
                      {transaction.title}
                    </td>
                    <td className="p-3 border border-gray-300">
                      ${Math.abs(transaction.amount)}
                    </td>
                    <td
                      className={`p-3 font-semibold border border-gray-300 ${
                        isExpense
                          ? "text-red-500"
                          : isIncome
                          ? "text-green-500"
                          : "text-gray-500"
                      }`}
                    >
                      {formattedType.toUpperCase()}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {transaction.category}
                    </td>
                    <td className="p-3 border border-gray-300">
                      {formattedDate}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentTransactions;
