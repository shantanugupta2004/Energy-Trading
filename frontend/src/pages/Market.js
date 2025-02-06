import { useEffect, useState } from "react";
import { ethers } from "ethers";
import getBlockchain from "../utils/blockchain";

const Market = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      const { contract } = await getBlockchain();
      if (!contract) return;

      let fetchedListings = [];
      let offerId = 0;

      while (true) {
        try {
          const offer = await contract.getOffer(offerId);
          if (offer.isAvailable) {
            fetchedListings.push({
              id: offerId,
              seller: offer.seller,
              amount: Number(offer.amount),
              price: ethers.formatEther(offer.price), // Convert price to ETH
            });
          }
          offerId++;
        } catch (error) {
          break; // Stop when we reach an invalid ID
        }
      }

      setListings(fetchedListings);
    };

    fetchListings();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Market Listings</h1>
      {listings.length === 0 ? (
        <p>No energy listings available.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {listings.map((listing) => (
            <li key={listing.id} className="border p-4 rounded-lg shadow">
              <p>Seller: {listing.seller}</p>
              <p>Amount: {listing.amount} kWh</p>
              <p>Price: {listing.price} ETH</p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                Buy
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Market;
