import React from "react";
import EnergyList from "../components/EnergyList";
import SellEnergy from "../components/SellEnergy";
import BuyEnergy from "../components/BuyEnergy";

const Market = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🔄 Energy Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white shadow-md rounded-lg">
          <SellEnergy />
        </div>
        <div className="p-4 bg-white shadow-md rounded-lg">
          <BuyEnergy />
        </div>
      </div>
      <div className="mt-6">
        <EnergyList />
      </div>
    </div>
  );
};

export default Market;
