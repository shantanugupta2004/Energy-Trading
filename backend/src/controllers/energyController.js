const { ethers } = require("ethers");
require("dotenv").config();
const contractABI = require("../../artifacts/contracts/EnergyTrading.sol/EnergyTrading.json").abi;

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_SEPOLIA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contractAddress = "0x0278d2529d459e7383af2a0A8D7B4Df77A97467A";
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

const createOffer = async (req, res) => {
  try {
    const { amount, price } = req.body;
    const tx = await contract.createOffer(amount, price);
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOffers = async (req, res) => {
  try {
    let offers = [];
    for (let i = 1; i <= 100; i++) {
      try {
        const offer = await contract.offers(i);
        if (offer.active) {
          offers.push(offer);
        }
      } catch (error) {
        break;
      }
    }
    res.json({ offers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buyOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await contract.offers(id);
    if (!offer.active) return res.status(400).json({ error: "Offer not available" });

    const tx = await contract.buyOffer(id, { value: offer.price });
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createOffer, getOffers, buyOffer };
