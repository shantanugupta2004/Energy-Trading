const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with:", deployer.address);

  const EnergyTrading = await hre.ethers.getContractFactory("EnergyTrading");
  const contract = await EnergyTrading.deploy("0xYourTokenAddressHere");

  await contract.deployed();
  console.log("Contract deployed at:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
