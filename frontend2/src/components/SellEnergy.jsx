import { useState } from "react";
import { ethers } from "ethers";
import getBlockchain from "../utils/blockchain";

const SellEnergy = () => {
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const listEnergy = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed! Please install MetaMask and try again.");
      return;
    }

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length === 0) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } catch (error) {
        alert("Please connect MetaMask to proceed.");
        return;
      }
    }

    try {
      setLoading(true);
      setMessage("Waiting for transaction confirmation...");

      const { contract } = await getBlockchain();
      if (!contract) return;

      const tx = await contract.listEnergy(
        ethers.parseUnits(amount, 0),
        ethers.parseEther(price)
      );
      await tx.wait();

      setMessage("Energy listed successfully!");
      setAmount("");
      setPrice("");
    } catch (error) {
      console.error(error);
      setMessage("Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Sell Energy</h1>
      <div className="mt-4 space-y-4">
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
          onClick={listEnergy}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Processing..." : "List Energy"}
        </button>
        {message && <p className="text-center text-gray-600 mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default SellEnergy;
