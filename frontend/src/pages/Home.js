import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to Blockchain Energy Trading</h1>
      <p className="mt-4 text-gray-600">Buy and sell renewable energy securely.</p>
      <Link to="/market">
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
          Go to Market
        </button>
      </Link>
    </div>
  );
};

export default Home;
