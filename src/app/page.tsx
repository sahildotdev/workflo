import React from "react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to My Trello App</h1>
      <div className="flex space-x-4">
        <Link href="/auth/login">
          <div className="bg-blue-500 text-white p-4 rounded cursor-pointer">
            Login
          </div>
        </Link>
        <Link href="/auth/signup">
          <div className="bg-green-500 text-white p-4 rounded cursor-pointer">
            Signup
          </div>
        </Link>
      </div>
    </div>
  );
}
