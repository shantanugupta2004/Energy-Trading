import React, { useState } from "react";
import getBlockchain from "../utils/blockchain";

const EnergyList = () => {
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { contract } = await getBlockchain();
    if (contract) {
      try {
        const tx = await contract.listEnergy(
          ethers.parseUnits(amount, "ether"),
          ethers.parseUnits(price, "ether")
        );
        await tx.wait();
        alert("Energy listed successfully!");
      } catch (error) {
        console.error(error);
        alert("Transaction failed!");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-bold">List Energy</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Amount (in kWh)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Price (ETH)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          List Energy
        </button>
      </form>
    </div>
  );
};

export default EnergyList;
