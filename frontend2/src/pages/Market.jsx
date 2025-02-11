import { useState, useEffect } from "react";
import { ethers } from "ethers";
import getBlockchain from "../utils/blockchain";

const Market = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);

      try {
        const { contract } = await getBlockchain();
        if (!contract) return;

        const totalListings = await contract.nextOfferId();
        let fetchedListings = [];

        for (let i = 0; i < totalListings; i++) {
          const offer = await contract.getOffer(i);
          if (offer.isAvailable) {
            fetchedListings.push({
              id: i,
              seller: offer.seller,
              amount: offer.amount.toString(),
              price: ethers.formatEther(offer.price),
            });
          }
        }

        setListings(fetchedListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }

      setLoading(false);
    };

    fetchListings();
  }, []);

  return (
    <div className="container mx-auto p-6 pt-20">
      <h1 className="text-2xl font-bold mb-4">Energy Market</h1>

      {loading ? (
        <p className="text-gray-500">Loading market data...</p>
      ) : listings.length === 0 ? (
        <p>No energy listings available.</p>
      ) : (
        <ul className="space-y-4">
          {listings.map((listing) => (
            <li key={listing.id} className="p-4 border rounded-lg shadow-md">
              <p><strong>Offer ID:</strong> {listing.id}</p>
              <p><strong>Seller:</strong> {listing.seller}</p>
              <p><strong>Amount:</strong> {listing.amount} kWh</p>
              <p><strong>Price:</strong> {listing.price} ETH</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Market;
