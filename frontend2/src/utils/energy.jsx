import getBlockchain from "./blockchain";
import { ethers } from "ethers";

export const listEnergy = async (amount, price) => {
  try {
    const { contract, signer } = await getBlockchain();
    if (!contract) return;

    const priceInWei = ethers.parseEther(price.toString());
    const tx = await contract.listEnergy(amount, priceInWei);
    await tx.wait();
    return { success: true, message: "Energy listed successfully!", txHash: tx.hash };
  } catch (error) {
    console.error("Listing error:", error);
    return { success: false, message: "Failed to list energy" };
  }
};

export const buyEnergy = async (listingId, price) => {
  try {
    const { contract, signer } = await getBlockchain();
    if (!contract) return;

    const tx = await contract.buyEnergy(listingId, { value: ethers.parseEther(price.toString()) });
    await tx.wait();
    return { success: true, message: "Energy purchased successfully!", txHash: tx.hash };
  } catch (error) {
    console.error("Purchase error:", error);
    return { success: false, message: "Failed to buy energy" };
  }
};

export const getMarketListings = async () => {
  try {
    const { contract } = await getBlockchain();
    if (!contract) return [];

    const listings = [];
    const totalListings = await contract.nextOfferId();

    for (let i = 0; i < totalListings; i++) {
      const offer = await contract.getOffer(i);
      if (offer.isAvailable) {
        listings.push({
          id: i,
          seller: offer.seller,
          amount: offer.amount.toString(),
          price: ethers.formatEther(offer.price),
          isAvailable: offer.isAvailable,
        });
      }
    }
    return listings;
  } catch (error) {
    console.error("Fetching listings error:", error);
    return [];
  }
};
