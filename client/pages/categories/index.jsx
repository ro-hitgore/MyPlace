import React, { useContext } from "react";
import { MyPlaceContext } from "../../context/MyPlaceContext";
import NftCard from "../../components/NftCard";
import { HashLoader } from "react-spinners";
import Banner from "../../components/Banner";
import Heading from "../../components/Heading";
import Head from "next/head";
import AllCat from "../../assets/allCat.png";

export default function index() {
  const { isLoading, allItems, currentAccount } = useContext(MyPlaceContext);

  return (
    <>
      {" "}
      <Head>
        <title>MyPlace - Explore</title>
      </Head>
      {currentAccount ? (
        <div>
          {" "}
          <Banner img={AllCat} />
          <Heading heading={"Explore All Categories"} />
          <section className="max-w-screen-2xl mx-auto py-12">
            {isLoading ? (
              <div className="w-full h-screen flex items-center justify-center ">
                <HashLoader color="#2193b0" />
              </div>
            ) : (
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
                    nftContract,
                    sold,
                  } = item;

                  if (
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
                          nftContract={nftContract}
                        />
                      </div>
                    );
                  }
                })}
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
