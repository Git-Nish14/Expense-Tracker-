"use client";
import React, { useState, useEffect } from "react";

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

interface WelcomeMessageProps {
  userName: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName }) => {
  const greeting = getGreeting();
  const formattedDate = getFormattedDate();

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    // Generate a random image URL after component mounts
    setImageSrc(
      `https://picsum.photos/100/100?random=${Math.floor(Math.random() * 1000)}`
    );
  }, []);

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
