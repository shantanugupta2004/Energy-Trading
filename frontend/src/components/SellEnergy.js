import React, { useState } from "react";
import { getContract, connectWallet } from "../utils/blockchain";
import { ethers } from "ethers";

const SellEnergy = () => {
    const [energyAmount, setEnergyAmount] = useState("");
    const [price, setPrice] = useState("");
    const [message, setMessage] = useState("");

    const handleSell = async () => {
        if (!energyAmount || !price) {
            setMessage("Please enter valid values.");
            return;
        }

        const { signer } = await connectWallet();
        if (!signer) {
            setMessage("Please connect your wallet.");
            return;
        }

        try {
            const contract = await getContract(signer);
            const priceInWei = ethers.parseEther(price);
            const tx = await contract.createOffer(energyAmount, priceInWei);
            await tx.wait();
            setMessage("Energy listed for sale!");
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Sell Energy</h2>
            <input
                type="number"
                placeholder="Energy Amount (kWh)"
                className="w-full p-2 border rounded mb-2"
                value={energyAmount}
                onChange={(e) => setEnergyAmount(e.target.value)}
            />
            <input
                type="text"
                placeholder="Price in ETH"
                className="w-full p-2 border rounded mb-2"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <button
                onClick={handleSell}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
                Sell Energy
            </button>
            {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
        </div>
    );
};

export default SellEnergy;
