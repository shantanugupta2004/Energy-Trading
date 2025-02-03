import React from "react";

const EnergyList = () => {
  const energyOffers = [
    { id: 1, seller: "0x1234...abcd", amount: "10 kWh", price: "0.05 ETH" },
    { id: 2, seller: "0x5678...efgh", amount: "25 kWh", price: "0.12 ETH" },
    { id: 3, seller: "0x9abc...ijkl", amount: "50 kWh", price: "0.22 ETH" },
  ];

  return (
    <div className="mt-6 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">⚡ Available Energy Offers</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-gray-700">Seller</th>
              <th className="p-3 text-gray-700">Amount</th>
              <th className="p-3 text-gray-700">Price</th>
            </tr>
          </thead>
          <tbody>
            {energyOffers.map((offer) => (
              <tr key={offer.id} className="border-b hover:bg-gray-100">
                <td className="p-3 text-gray-600">{offer.seller}</td>
                <td className="p-3 text-gray-600">{offer.amount}</td>
                <td className="p-3 text-gray-600">{offer.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnergyList;
