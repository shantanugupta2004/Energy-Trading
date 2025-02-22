import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Market from "./pages/Market";
import SellEnergy from "./components/SellEnergy";
import BuyEnergy from "./components/BuyEnergy"
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./pages/Dashboard";
import {getUser, removeToken} from './utils/auth'

function App() {
    const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = getUser();
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    removeToken();
    setUser(null);
  };

    return (
        <Router>
      {user && <Navbar handleLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
        <Route path="/market" element={user ? <Market /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/buy" element={user ? <BuyEnergy /> : <Navigate to="/login" />} />
        <Route path="/sell" element={user ? <SellEnergy /> : <Navigate to="/login" />} />
        <Route path="/" element={!user ? <Navigate to="/login"/> : <Home/>}/>
        <Route path="/home" element={!user ? <Navigate to="/login"/> : <Home/>}/>
      </Routes>
    </Router>
    );
}

export default App;
