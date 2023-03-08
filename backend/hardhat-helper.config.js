require("dotenv").config();

const networkConfig = {
  default: {
    name: "hardhat",
    marketPlaceAddress: process.env.MYPLACE_CONTRACT_ADDRESS,
    tokenName: "ArsyToken",
    symbol: "ARSY",
    decimals: "18",
    totalSupply: ethers.utils.parseEther("10000000"),
  },
  31337: {
    name: "localhost",
    marketPlaceAddress: process.env.MYPLACE_CONTRACT_ADDRESS,
    tokenName: "ArsyToken",
    symbol: "ARSY",
    decimals: "18",
    totalSupply: ethers.utils.parseEther("10000000"),
  },
  5: {
    name: "goerli",
    marketPlaceAddress: process.env.MYPLACE_CONTRACT_ADDRESS,
    tokenName: "ArsyToken",
    symbol: "ARSY",
    decimals: "18",
    totalSupply: ethers.utils.parseEther("10000000"),
  },
};

const developmentChains = ["hardhat", "localhost"];

module.exports = {
  networkConfig,
  developmentChains,
};
