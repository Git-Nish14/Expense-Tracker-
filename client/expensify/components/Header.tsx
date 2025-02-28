"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();

  const routeOptions = [
    { label: "Your Statistics", value: "/user-stats" },
    { label: "Manage Expenses", value: "/manage-expense" },
    { label: "Add Income", value: "/add-income" },
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
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        background: "#f2f2f2",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "1.25rem" }}>Expensify</div>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <select
          value={selectedRoute}
          onChange={handleRouteChange}
          style={{ padding: "0.3rem" }}
        >
          <option value="" disabled>
            Select an option
          </option>
          {routeOptions.map((route) => (
            <option key={route.value} value={route.value}>
              {route.label}
            </option>
          ))}
        </select>
        <button onClick={handleHome} style={{ padding: "0.3rem 0.5rem" }}>
          Home
        </button>
      </div>
    </header>
  );
};

export default Header;
