import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">Energy Trading</h1>
      <div>
        <Link to="/" className="px-4">Home</Link>
        <Link to="/market" className="px-4">Market</Link>
        <Link to="/sell" className="px-4">Sell</Link>
      </div>
    </nav>
  );
};

export default Navbar;
