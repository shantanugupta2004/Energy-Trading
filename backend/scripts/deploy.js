require("dotenv").config();
const hre = require("hardhat");

async function main() {
    const EnergyTrading = await hre.ethers.getContractFactory("EnergyTrading");
    const energyTrading = await EnergyTrading.deploy();

    await energyTrading.waitForDeployment();

    console.log("EnergyTrading Contract deployed at:", energyTrading.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
