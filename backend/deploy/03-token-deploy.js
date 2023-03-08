const { network } = require("hardhat");
const {
  developmentChains,
  networkConfig,
} = require("../hardhat-helper.config");
const { verify } = require("../utils/verify");
require("dotenv").config();

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  const args = [
    networkConfig[chainId]["tokenName"],
    networkConfig[chainId]["symbol"],
    networkConfig[chainId]["decimals"],
    networkConfig[chainId]["totalSupply"],
  ];

  try {
    log("1) Deploying Contract----------------");
    const token = await deploy("Token", {
      from: deployer,
      args: args,
      log: true,
      waitConfirmations: network.config.blockConfirmations || 1,
    });
    log(`2) Token deployed at ${token.address}---------------- `);
  } catch (error) {
    log(`Deployment failed because... ${error}--------`);
  }

  // Verify Contract
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying------------------------------");
    await verify(token.address, arguments);
    log("Verified-------------------------------");
  }
};
