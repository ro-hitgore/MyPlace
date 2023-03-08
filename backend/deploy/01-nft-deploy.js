const {
  networkConfig,
  developmentChains,
} = require("../hardhat-helper.config");
const { network } = require("hardhat");
const { verify } = require("../utils/verify");
require("dotenv").config();

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  const arguments = [networkConfig[chainId]["marketPlaceAddress"]];
  try {
    log("----------------------------------------------");
    log("1) Deploying Contract");
    const NFT = await deploy("NFT", {
      from: deployer,
      args: arguments,
      log: true,
      waitConfirmations: network.config.blockConfirmations || 6,
    });
    log("-------------------------------------------------------");
    log(`2) Contract Deplyed at ${NFT.address}`);
    log("-------------------------------------------------------");
    if (
      !developmentChains.includes(network.name) &&
      process.env.ETHERSCAN_API_KEY
    ) {
      log("Verifying....");
      await verify(NFT.address, arguments);
      log("Verified....");
    }
  } catch (error) {
    log(` Failed because---${error}`);
  }
};

module.exports.tags = ["all", "nft"];
