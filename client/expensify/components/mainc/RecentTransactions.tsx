"use client";
import React from "react";

export interface Transaction {
  date: string;
  title: string;
  category: string;
  amount: number;
  paymentType: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
}) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        boxShadow: "0 0 5px rgba(0,0,0,0.1)",
      }}
    >
      <h3>Recent Transactions</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid #ccc" }}>
            <th style={{ padding: "0.5rem" }}>Date</th>
            <th style={{ padding: "0.5rem" }}>Title</th>
            <th style={{ padding: "0.5rem" }}>Category</th>
            <th style={{ padding: "0.5rem" }}>Amount</th>
            <th style={{ padding: "0.5rem" }}>Payment Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, idx) => (
            <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "0.5rem" }}>{tx.date}</td>
              <td style={{ padding: "0.5rem" }}>{tx.title}</td>
              <td style={{ padding: "0.5rem" }}>{tx.category}</td>
              <td style={{ padding: "0.5rem" }}>${tx.amount}</td>
              <td style={{ padding: "0.5rem" }}>{tx.paymentType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions;
