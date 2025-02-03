import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Market from "./pages/Market";

function App() {
    const [account, setAccount] = useState(null);

    return (
        <Router>
            <Navbar setAccount={setAccount} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/market" element={<Market />} />
            </Routes>
        </Router>
    );
}

export default App;
