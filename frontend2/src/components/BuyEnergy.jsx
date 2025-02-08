import React, { useState } from "react";
import getBlockchain from "../utils/blockchain";

const BuyEnergy = () => {
  const [offerId, setOfferId] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBuy = async () => {
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

      const offer = await contract.getOffer(offerId);
      // eslint-disable-next-line no-undef
      const totalCost = BigInt(offer.price) * BigInt(amount);

      const tx = await contract.buyEnergy(offerId, { value: totalCost });
      await tx.wait();

      setMessage("Purchase successful!");
    } catch (error) {
      console.error(error);
      if (error.code === "INSUFFICIENT_FUNDS" || error.message.includes("insufficient funds")) {
        alert("You do not have enough ETH to complete this transaction.");
      } else {
        alert("Transaction failed! Please check the details and try again.");
      }
      setMessage("Transaction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold">Buy Energy</h2>
      <input
        type="text"
        placeholder="Offer ID"
        value={offerId}
        onChange={(e) => setOfferId(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleBuy}
        className="w-full bg-green-500 text-white py-2 rounded"
        disabled={loading}
      >
        {loading ? "Processing..." : "Buy Energy"}
      </button>
      {message && <p className="text-center text-gray-600 mt-2">{message}</p>}
    </div>
  );
};

export default BuyEnergy;
