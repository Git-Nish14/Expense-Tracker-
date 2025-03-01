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
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(now);
}

const WelcomeMessage: React.FC = () => {
  const { data, loading, error } = useQuery(GET_USER);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    setImageSrc(
      `https://picsum.photos/100/100?random=${Math.floor(Math.random() * 1000)}`
    );
  }, []);

  if (loading)
    return <p className="text-center text-gray-500">Loading user details...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  const user = data?.user;
  const userName = user ? `${user.firstName} ${user.lastName}` : "User";

  return (
    <div className="flex items-center mb-6">
      {imageSrc && (
        <img
          src={imageSrc}
          alt="User Avatar"
          className="rounded-full w-20 h-20 mr-4"
        />
      )}
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{`${getGreeting()}, ${userName}!`}</h2>
        <p className="text-gray-500">{getFormattedDate()}</p>
      </div>
    </div>
  );
};

export default WelcomeMessage;
