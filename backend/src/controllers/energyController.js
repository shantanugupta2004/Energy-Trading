const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Import Smart Contract ABI
const contractABI = require("/home/shantanu2004/blockchain-project/backend/artifacts/contracts/EnergyTrading.sol/EnergyTrading.json").abi;
const contractAddress = process.env.CONTRACT_ADDRESS;

// Initialize Smart Contract
const energyTradingContract = new ethers.Contract(contractAddress, contractABI, wallet);

// List Energy for Sale
exports.listEnergy = async (req, res) => {
  try {
    const { amount, price } = req.body;
    const tx = await energyTradingContract.listEnergy(amount, ethers.parseEther(price));
    await tx.wait();

    res.json({ message: "Energy listed successfully!", transactionHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to list energy" });
  }
};

// Buy Energy
exports.buyEnergy = async (req, res) => {
  try {
    const { listingId, amount } = req.body;
    const price = await energyTradingContract.getPrice(listingId);
    const totalCost = price * amount;

    const tx = await energyTradingContract.buyEnergy(listingId, amount, { value: totalCost });
    await tx.wait();

    res.json({ message: "Energy purchased successfully!", transactionHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to buy energy" });
  }
};

// Fetch Market Listings
exports.getMarketListings = async (req, res) => {
  try {
    const listings = await energyTradingContract.getMarketListings();
    res.json({ listings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch market listings" });
  }
};
