import React, { useContext } from "react";
import { MyPlaceContext } from "../../context/MyPlaceContext";
import NftCard from "../../components/NftCard";
import { HashLoader } from "react-spinners";
import Banner from "../../components/Banner";
import Heading from "../../components/Heading";
import Head from "next/head";
import Illustrations from "../../assets/illustrations.png";

export default function illustration() {
  const { isLoading, allItems, currentAccount } = useContext(MyPlaceContext);
  return (
    <>
      <Head>
        <title>MyPlace - Illustrations Collection</title>
      </Head>
      {currentAccount ? (
        <div>
          {" "}
          <Banner img={Illustrations} />
          <Heading
            heading={"Explore Illustration"}
            description={
              "The way we value internet-native items is changing with the development of blockchain technology. Kittens, punks, and memes are now trading digital wallets for cryptocurrencies, and the online collectibles market is taking shape before our eyes."
            }
          />
          <section className="max-w-screen-2xl mx-auto py-12  h-screen">
            {isLoading ? (
              <div className="w-full h-screen flex items-center justify-center ">
                <HashLoader color="#2193b0" />
              </div>
            ) : (
              <div>
                <div className="card-box">
                  {allItems.map((item) => {
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
                      sold,
                    } = item;

                    if (
                      category === "illustration" &&
                      currentAccount !== seller &&
                      currentAccount !== owner &&
                      sold == false
                    ) {
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
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="h-screen w-full flex items-center justify-center">
          Please Connect Wallet First
        </div>
      )}
    </>
  );
}
