import { useState, useEffect } from "react";

const Market = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true); // Show loading spinner
      try {
        const response = await fetch("http://localhost:5000/api/energy/listings");
        const data = await response.json();
        setListings(data.listings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
      setLoading(false); // Hide loading spinner
    };

    fetchListings();
  }, []);

  return (
    <div className="container mx-auto p-6">
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
