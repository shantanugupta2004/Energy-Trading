import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">⚡ Energy Trading</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/market" className="hover:underline">Market</Link>
      </div>
    </nav>
  );
};

export default Navbar;
