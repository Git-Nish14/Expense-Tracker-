"use client";
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "@/graphql/queries";

function getGreeting() {
  const now = new Date();
  const hours = now.getHours();
  if (hours < 12) return "Good Morning";
  if (hours < 17) return "Good Afternoon";
  return "Good Evening";
}

function getFormattedDate() {
  const now = new Date();
  const day = now.getDate();
  const monthName = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();
  return `${monthName} ${day}, ${year}`;
}

const WelcomeMessage: React.FC = () => {
  const { data, loading, error } = useQuery(GET_USER);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    setImageSrc(
      `https://picsum.photos/100/100?random=${Math.floor(Math.random() * 1000)}`
    );
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user information</p>;

  const firstName = data?.user?.firstName || "User";
  const lastName = data?.user?.lastName || "";
  const userName = `${firstName} ${lastName}`;

  const greeting = getGreeting();
  const formattedDate = getFormattedDate();

  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt="User Avatar"
          style={{
            borderRadius: "50%",
            width: "80px",
            height: "80px",
            marginRight: "1rem",
          }}
        />
      )}
      <div>
        <h2 style={{ margin: 0 }}>{`${greeting}, ${userName}!`}</h2>
        <p style={{ margin: 0 }}>{formattedDate}</p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
