import { ethers } from "ethers";
import contractABI from "../contracts/EnergyTrading.json"; // Ensure this path is correct

const contractAddress = "0x0278d2529d459e7383af2a0A8D7B4Df77A97467A"; 

const getBlockchain = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI.abi, signer);
    return { contract, signer };
  } else {
    alert("Please install MetaMask!");
    return null;
  }
};

export default getBlockchain;
