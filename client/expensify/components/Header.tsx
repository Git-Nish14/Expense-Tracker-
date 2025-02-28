"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();

  const routeOptions = [
    { label: "Your Statistics", value: "/user-stats" },
    { label: "Manage Expenses", value: "/manage-expense" },
    { label: "Add Income", value: "/add-income" },
    { label: "Savings", value: "/saving" },
  ];

  const [selectedRoute, setSelectedRoute] = useState<string>("");

  const handleRouteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      setSelectedRoute(selectedValue);
      router.push(selectedValue);
    }
  };

  const handleHome = () => {
    router.push("/home");
  };

  return (
    <header className="bg-gradient-to-r from-indigo-500 to-indigo-900 text-white text-center py-4 bottom-0 left-0 w-full text-sm flex flex-col sm:flex-row sm:justify-between items-center px-6 shadow-lg">
      {/* Left - App Name */}
      <div className="text-2xl font-bold tracking-wide">Expensify</div>

      {/* Right - Dropdown & Home Button */}
      <div className="flex flex-col sm:flex-row gap-4 items-center mt-3 sm:mt-0">
        {/* Dropdown Container */}
        <div className="relative w-64">
          <select
            value={selectedRoute}
            onChange={handleRouteChange}
            className="appearance-none w-full bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-white/30 focus:ring-2 focus:ring-blue-300 focus:outline-none transition duration-300 cursor-pointer shadow-md"
          >
            <option value="" disabled>
              Select an option
            </option>
            {routeOptions.map((route) => (
              <option
                key={route.value}
                value={route.value}
                className="text-black"
              >
                {route.label}
              </option>
            ))}
          </select>
          {/* Dropdown Arrow */}
          <div className="dropdown-arrow"></div>
        </div>

        {/* Home Button */}
        <button
          onClick={handleHome}
          className="px-5 py-2 bg-white text-indigo-700 font-semibold rounded-lg shadow-lg hover:bg-indigo-100 transition duration-300"
        >
          Home
        </button>
      </div>
    </header>
  );
};

export default Header;
