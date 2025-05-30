import { useState } from "react";
import { listEnergy } from "../utils/energy";

const SellEnergy = () => {
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleListEnergy = async () => {
    if (!amount || !price) {
      alert("Please enter a valid amount and price.");
      return;
    }

    setLoading(true);
    setMessage("Waiting for transaction confirmation...");

    const result = await listEnergy(amount, price);
    if (result.success) {
      setMessage(result.message);
      setAmount("");
      setPrice("");
    } else {
      setMessage("Transaction failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Sell Energy</h1>

        <div className="space-y-4">
          <input
            type="number"
            className="border p-2 w-full rounded"
            placeholder="Amount (kWh)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="text"
            className="border p-2 w-full rounded"
            placeholder="Price in ETH"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button
            onClick={handleListEnergy}
            className="bg-green-500 text-white px-4 py-2 rounded w-full transition hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Processing..." : "List Energy"}
          </button>

          {message && <p className="text-center text-gray-600 mt-2">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default SellEnergy;
