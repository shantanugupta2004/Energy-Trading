import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative h-screen flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('/images/energy-bg.jpg')" }}>
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 p-6 max-w-2xl text-white">
        <h1 className="text-5xl font-extrabold mb-4">
          Powering the Future with Decentralized Energy
        </h1>
        <p className="text-lg text-gray-300 mb-6">
          Buy and sell renewable energy seamlessly on the Ethereum (Sepolia Testnet) blockchain. Join the revolution today.
          <p>View the contract on <a href="https://sepolia.etherscan.io/address/0x0278d2529d459e7383af2a0A8D7B4Df77A97467A" target="_blank">Etherscan</a></p>
        </p>
         
        <div className="space-x-4">
          <Link to="/market" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition">
            Explore Market
          </Link>
          <Link to="/sell" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition">
            Sell Energy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
