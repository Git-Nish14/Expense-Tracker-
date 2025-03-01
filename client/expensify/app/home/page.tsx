"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_RECENT_TRANSACTIONS } from "@/graphql/queries";
import Header from "@/components/Header";
import WelcomeMessage from "@/components/mainc/WelcomeMessage";
import RecentTransactions from "@/components/mainc/RecentTransactions";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Loading from "../loading";

const Home: React.FC = () => {
  const router = useRouter();

  const { data, loading, error } = useQuery(GET_RECENT_TRANSACTIONS, {
    variables: { skip: 0, take: 10 },
  });

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">Error: {error.message}</p>
      </div>
    );

  const transactions = data?.transactions || [];

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center w-full max-w-5xl mx-auto">
          <WelcomeMessage userName="Nish Patel" />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200 mt-4 sm:mt-0"
          >
            Logout
          </button>
        </div>
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 mt-6 mx-auto">
          <RecentTransactions transactions={transactions} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
