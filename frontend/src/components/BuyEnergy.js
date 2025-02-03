import React, { useState } from "react";
import { getContract, connectWallet } from "../utils/blockchain";
import { ethers } from "ethers";

const BuyEnergy = () => {
    const [offerId, setOfferId] = useState("");
    const [message, setMessage] = useState("");

    const handleBuy = async () => {
        if (!offerId) {
            setMessage("Enter a valid offer ID.");
            return;
        }

        const { signer } = await connectWallet();
        if (!signer) {
            setMessage("Please connect your wallet.");
            return;
        }

        try {
            const contract = await getContract(signer);
            const offer = await contract.offers(offerId);
            if (!offer.isAvailable) {
                setMessage("Offer not available.");
                return;
            }

            const price = offer.price;
            const tx = await contract.buyEnergy(offerId, { value: price });
            await tx.wait();
            setMessage("Purchase successful!");
        } catch (error) {
            setMessage("Error: " + error.message);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-2">Buy Energy</h2>
            <input
                type="number"
                placeholder="Enter Offer ID"
                className="w-full p-2 border rounded mb-2"
                value={offerId}
                onChange={(e) => setOfferId(e.target.value)}
            />
            <button
                onClick={handleBuy}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                Buy Energy
            </button>
            {message && <p className="mt-2 text-sm text-red-600">{message}</p>}
        </div>
    );
};

export default BuyEnergy;
