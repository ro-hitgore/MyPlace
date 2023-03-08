import React, { useContext, useEffect, useState } from "react";
import CreateNft from "../components/CreateNft";
import { Toaster } from "react-hot-toast";
import { MyPlaceContext } from "../context/MyPlaceContext";
import Head from "next/head";
import NftCard from "../components/NftCard";
import { HashLoader } from "react-spinners";
import { all } from "axios";

export default function createNFT() {
  const { currentAccount, isLoading, allItems } = useContext(MyPlaceContext);
  const [items, setItems] = useState(allItems);

  const handleMyNfts = () => {
    const updatedItems = allItems.filter((item) => {
      return item.seller == currentAccount;
    });
    setItems(updatedItems);
  };

  const handlePurchasedNfts = () => {
    const updatedItems = allItems.filter((item) => {
      return item.owner === currentAccount;
    });
    setItems(updatedItems);
  };
  return (
    <>
      <Head>
        <title>MyPlace - My NFTs</title>
      </Head>
      <Toaster position="top-center" reverseOrder={false} />
      {currentAccount ? (
        isLoading ? (
          <div className="w-full h-screen flex items-center justify-center ">
            <HashLoader color="#2193b0" />
          </div>
        ) : (
          <div>
            <section className="max-w-screen-2xl mx-auto flex flex-col items-start justify-start md:flex-row py-24">
              <CreateNft />
              <div className="w-full mt-1  md:w-1/2 md:ml-8 md:mt-0  lg:w-2/3">
                <div className="flex items-start justify-between sm:w-full lg:w-2/3 xl:w-1/2 px-4">
                  <div
                    className="filter-btn"
                    onClick={() => setItems(allItems)}
                  >
                    All NFTs
                  </div>
                  <div className="filter-btn" onClick={() => handleMyNfts()}>
                    My NFTs
                  </div>
                  <div
                    className="filter-btn"
                    onClick={() => handlePurchasedNfts()}
                  >
                    Purchased NFTs
                  </div>
                </div>
                <div className="card-wrapper">
                  {items.map((item) => {
                    let {
                      price,
                      category,
                      itemId,
                      owner,
                      tokenId,
                      seller,
                      name,
                      image,
                      description,
                      nftContract,
                      sold,
                    } = item;

                    return (
                      <div key={itemId}>
                        <NftCard
                          image={image}
                          name={name}
                          price={price}
                          category={category}
                          itemId={itemId}
                          owner={owner}
                          tokenId={tokenId}
                          description={description}
                          seller={seller}
                          nftContract={nftContract}
                          sold={sold}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        )
      ) : (
        <div className="h-screen w-full flex items-center justify-center">
          Please Connect Wallet First
        </div>
      )}
    </>
  );
}
