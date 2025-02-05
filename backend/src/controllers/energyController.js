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
    const { listingId } = req.body;

    // Fetch price from contract
    const offer = await energyTradingContract.getOffer(listingId);
    const price = offer.price;

    // Ensure the offer is available
    if (!offer.isAvailable) {
      return res.status(400).json({ error: "This offer is not available" });
    }

    // Execute transaction
    const tx = await energyTradingContract.buyEnergy(listingId, { value: price });
    await tx.wait();

    res.json({ message: "Energy purchased successfully!", transactionHash: tx.hash });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to buy energy" });
  }
};

// Get Energy Offer Details
exports.getMarketListings = async (req, res) => {
  try {
    let listings = [];
    
    for (let i = 0; i < await energyTradingContract.nextOfferId(); i++) {
      const offer = await energyTradingContract.getOffer(i);
      if (offer.isAvailable) {
        listings.push({
          id: offer.id.toString(),
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

