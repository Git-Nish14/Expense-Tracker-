"use client";
import React from "react";
import Header from "@/components/Header";
import WelcomeMessage from "@/components/mainc/WelcomeMessage";
import RecentTransactions, {
  Transaction,
} from "@/components/mainc/RecentTransactions";

const dummyTransactions: Transaction[] = [
  {
    date: "2025-02-25",
    title: "Grocery Shopping",
    category: "Food",
    amount: 80,
    paymentType: "Credit Card",
  },
  {
    date: "2025-02-26",
    title: "Electricity Bill",
    category: "Bills & Utilities",
    amount: 60,
    paymentType: "Debit Card",
  },
  {
    date: "2025-02-26",
    title: "Movie Tickets",
    category: "Personal",
    amount: 30,
    paymentType: "Cash",
  },
];

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
        <WelcomeMessage userName="Sophie Campbell" />
        <RecentTransactions transactions={dummyTransactions} />
      </div>
    </>
  );
};

export default Home;
