import React, { useState } from "react";
import getBlockchain from "../utils/blockchain";

const BuyEnergy = () => {
  const [offerId, setOfferId] = useState("");
  const [amount, setAmount] = useState("");

  const handleBuy = async () => {
    const { contract } = await getBlockchain();
    if (contract) {
      try {
        const price = await contract.getOffer(offerId);
        const totalCost = price.price * amount;

        const tx = await contract.buyEnergy(offerId, { value: totalCost });
        await tx.wait();
        alert("Purchase successful!");
      } catch (error) {
        console.error(error);
        alert("Transaction failed!");
      }
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
      <button onClick={handleBuy} className="w-full bg-green-500 text-white py-2 rounded">
        Buy Energy
      </button>
    </div>
  );
};

export default BuyEnergy;
