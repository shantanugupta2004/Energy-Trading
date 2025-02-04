const hre = require("hardhat");

async function main() {
    const EnergyTrading = await hre.ethers.getContractFactory("EnergyTrading");
    const energyTrading = await EnergyTrading.deploy(); // Deploy contract

    await energyTrading.waitForDeployment(); // Wait for contract deployment

    console.log("EnergyTrading Contract deployed at:", await energyTrading.getAddress()); // Correct way to get address
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
