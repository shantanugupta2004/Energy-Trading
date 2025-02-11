import React, { useState } from "react";
import { buyEnergy } from "../utils/energy";

const BuyEnergy = () => {
  const [offerId, setOfferId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBuy = async () => {
    if (!offerId || !amount) {
      alert("Please enter a valid Offer ID and amount.");
      return;
    }

    setLoading(true);
    setMessage("Waiting for transaction confirmation...");

    const result = await buyEnergy(offerId, amount);
    if (result.success) {
      setMessage(result.message);
    } else {
      setMessage("Transaction failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4 text-center">Buy Energy</h2>

        <input
          type="text"
          placeholder="Offer ID"
          value={offerId}
          onChange={(e) => setOfferId(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <button
          onClick={handleBuy}
          className="w-full bg-green-500 text-white py-2 rounded transition hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Processing..." : "Buy Energy"}
        </button>

        {message && <p className="text-center text-gray-600 mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default BuyEnergy;
