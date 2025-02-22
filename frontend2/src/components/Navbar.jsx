import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ handleLogout }) => {
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    handleLogout();
    navigate("/login");
  };
  const isHomePage = location.pathname === "/";

  return (
    // <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-40 backdrop-blur-md text-white py-4 px-8 flex justify-between items-center shadow-lg z-50">
    <nav
      className={`fixed top-0 left-0 w-full flex py-4 px-8 justify-between items-center shadow-lg z-50 transition-all ${
        isHomePage
          ? "bg-black bg-opacity-40 backdrop-blur-md py-4 px-8"
          : "bg-gray-900" 
      }`}
    >
      {/* Logo / Title */}
      <h1 className="text-white text-2xl font-extrabold tracking-wide">
        ⚡ Energy Trading
      </h1>

      {/* Navigation Links */}
      <div className="space-x-6">
        <Link to="/" className="text-white hover:text-green-400 transition">Home</Link>
        <Link to="/dashboard" className="text-white hover:text-green-400 transition">Dashboard</Link>
        <Link to="/market" className="text-white hover:text-green-400 transition">Market</Link>
        <Link to="/buy" className="text-white hover:text-green-400 transition">Buy</Link>
        <Link to="/sell" className="text-white hover:text-green-400 transition">Sell</Link>
        <button 
        onClick={logoutAndRedirect}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-lg transition shadow-md"
      >
        Logout
      </button>
      </div>

      {/* Logout Button */}
      
    </nav>
  );
};

export default Navbar;
