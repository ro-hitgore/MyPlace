import { Toaster } from "react-hot-toast";
import CreateNft from "../components/CreateNft";
import HeroSection from "../components/HeroSection";
import LatestNft from "../components/LatestNft";
import Head from "next/head";
import { useContext } from "react";
import { MyPlaceContext } from "../context/MyPlaceContext";
import Link from "next/link";

export default function Home() {
  const { currentAccount } = useContext(MyPlaceContext);
  return (
    <>
      <Head>
        <title>MyPlace - NFT Marketplace</title>
      </Head>
      <div>
        <Toaster position="top-center" reverseOrder={false} />

        {currentAccount ? (
          <div>
            <HeroSection />
            <h1 className="text-6xl font-bold text-center mt-16 text-gray-800">
              Latest NFTs
            </h1>
            <LatestNft />
            <div className="gradient-bg">
              <div className="max-w-screen-2xl mx-auto flex flex-col items-start justify-between md:flex-row py-24 px-8">
                <div className="w-full  md:w-1/2 lg:w-1/2 py-4">
                  <h1 className="font-bold text-2xl md:text-6xl lg:text-8xl uppercase text-white">
                    Unlock the value of your digital assets with NFTs
                  </h1>
                  <p className="my-4 pr-4 md:text-md lg:text-lg text-white font-semibold leading-5 ">
                    Welcome to MyPlace, the go-to destination for buying and
                    selling the most unique and valuable non-fungible tokens
                    (NFTs) on the market. Our marketplace is home to a curated
                    selection of NFTs from top creators and artists, and we're
                    dedicated to providing a seamless and secure experience for
                    our users.
                  </p>
                  <p className="my-4 pr-4 md:text-md lg:text-lg text-white font-semibold leading-5">
                    Our marketplace is designed to make it easy for buyers and
                    sellers to connect and transact with each other. We offer a
                    wide selection of NFTs from a diverse group of creators, and
                    our platform is user-friendly and intuitive. We also have a
                    team of support staff on hand to help with any questions or
                    issues that may arise.
                  </p>
                </div>
                <CreateNft />
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto p-8 flex flex-col items-center w-screen h-screen justify-center">
            <div className="max-w-md w-full pointer-events-auto flex flex-col items-start mx-auto p-4 text-center">
              <p className="text-xl font-medium text-gray-900 w-full">
                Welcome to MyPlace!
              </p>
              <p className="mt-2 text-sm text-gray-500">
                To use MySpace, make sure you have{" "}
                <Link
                  href="https://metamask.io/"
                  target="_blank"
                  className="text-blue-600 cursor-pointer"
                >
                  Metamask
                </Link>{" "}
                installed. Make an account in Metamask Wallet. Then switch the
                network from Ethereum Mainnet to Goerli Test network. After
                that, fund that account with some test ETH using{" "}
                <Link
                  href="https://goerlifaucet.com/"
                  target="_blank"
                  className="text-blue-600 cursor-pointer"
                >
                  Goerli Faucet.
                </Link>
              </p>
              <p className="text-sm mt-4 text-gray-500 w-full">
                After that, connect the wallet using Connect button.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
