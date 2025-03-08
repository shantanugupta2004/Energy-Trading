import { useState, useEffect } from "react";
import { ethers } from "ethers";
import getBlockchain from "../utils/blockchain";
import { buyEnergy } from "../utils/energy";

const Market = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyingId, setBuyingId] = useState(null);
  const [message, setMessage] = useState("");

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

  const handleBuy = async (offerId, amount) => {
    setBuyingId(offerId);
    setMessage("Waiting for transaction confirmation...");

    try {
      const result = await buyEnergy(offerId, amount);
      if (result.success) {
        setMessage(result.message);
        // Refresh listings after successful purchase
        const updatedListings = listings.filter(listing => listing.id !== offerId);
        setListings(updatedListings);
      } else {
        setMessage("Transaction failed. Check funds or please try again.");
      }
    } catch (error) {
      console.error("Error buying energy:", error);
      setMessage("Transaction error: " + error.message);
    }

    setBuyingId(null);
    // Clear message after 5 seconds
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <div className="container mx-auto p-6 pt-20">
      <h1 className="text-2xl font-bold mb-4">Energy Market</h1>

      {message && (
        <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded border border-blue-200">
          {message}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500">Loading market data...</p>
      ) : listings.length === 0 ? (
        <p>No energy listings available.</p>
      ) : (
        <ul className="space-y-4">
          {listings.map((listing) => (
            <li key={listing.id} className="p-4 border rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <p><strong>Offer ID:</strong> {listing.id}</p>
                  <p><strong>Seller:</strong> {listing.seller}</p>
                  <p><strong>Amount:</strong> {listing.amount} kWh</p>
                  <p><strong>Price:</strong> {listing.price} ETH</p>
                </div>
                <div className="mt-3 md:mt-0">
                  <button
                    onClick={() => handleBuy(listing.id, listing.amount)}
                    disabled={buyingId === listing.id}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:bg-green-300"
                  >
                    {buyingId === listing.id ? "Processing..." : "Buy Now"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Market;