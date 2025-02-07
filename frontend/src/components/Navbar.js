import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ handleLogout }) => {
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    handleLogout(); 
    navigate("/login"); 
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">Energy Trading</h1>
      <div>
        <Link to="/" className="px-4">Home</Link>
        <Link to="/market" className="px-4">Market</Link>
        <Link to="/buy" className="px-4">Buy</Link>
        <Link to="/sell" className="px-4">Sell</Link>
        <button onClick={logoutAndRedirect} className="px-4">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
