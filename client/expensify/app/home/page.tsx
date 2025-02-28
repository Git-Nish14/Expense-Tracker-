"use client";
import React from "react";
import Header from "@/components/Header";
import WelcomeMessage from "@/components/mainc/WelcomeMessage";
import RecentTransactions, {
  Transaction,
} from "@/components/mainc/RecentTransactions";
import Footer from "@/components/Footer";

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
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex flex-col px-6 py-8">
        {/* Welcome Message Section (Left-Aligned) */}
        <div className="w-full max-w-5xl">
          <WelcomeMessage userName="Nish Patel" />
        </div>

        {/* Recent Transactions Table - Bigger & Centered */}
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 mt-6 mx-auto">
          <RecentTransactions transactions={dummyTransactions} />
        </div>
      </main>

      {/* Footer (Always at Bottom) */}
      <Footer />
    </div>
  );
};

export default Home;
