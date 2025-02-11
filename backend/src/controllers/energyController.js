const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_URL);

const contractABI = require("../../artifacts/contracts/EnergyTrading.sol/EnergyTrading.json").abi;
const contractAddress = process.env.CONTRACT_ADDRESS;

const energyTradingContract = new ethers.Contract(contractAddress, contractABI, provider);

// Get Energy Offer Details
exports.getMarketListings = async (req, res) => {
  try {
    let listings = [];

    const totalListings = await energyTradingContract.nextOfferId();
    for (let i = 0; i < totalListings; i++) {
      const offer = await energyTradingContract.getOffer(i);
      if (offer.isAvailable) {
        listings.push({
          id: i,
          seller: offer.seller,
          amount: offer.amount.toString(),
          price: ethers.formatEther(offer.price),
          isAvailable: offer.isAvailable
        });
      }
    }

    res.json({ listings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch market listings", details: error.message });
  }
};
