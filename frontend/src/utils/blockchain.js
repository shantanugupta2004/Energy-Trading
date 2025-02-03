import { ethers } from "ethers";

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const contractABI = require("../EnergyTradingABI.json");

export const connectWallet = async () => {
    if (!window.ethereum) return { error: "MetaMask not installed" };

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        return { provider, signer };
    } catch (error) {
        return { error: error.message };
    }
};

export const getContract = async (signer) => {
    return new ethers.Contract(contractAddress, contractABI, signer);
};
